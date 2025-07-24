import React, { useState, useContext, useEffect, useRef } from 'react'
import styles from './fileUploader.module.css'
import { Upload, ConfigProvider, Button, Progress, Tooltip } from 'antd'
import uploadIcon from '../../../pages/images/upload.svg'
import AuthContext from '../../../service/AuthContext'
import { URL } from '../../../service/config'
import ErrorModal from '../modals/errorModal/errorModal'


/** Ответ начальной загрузки файлов
 * {
    "processed_files_count": 3,
    "message": "Отправлено на обработку 3 файлов. 1 файлов имеют недопустимый формат или не прошли проверку и не были обработаны.",
    "invalid_files_count": 1,
    "invalid_files": [
        {
            "filename": "Поиск_трендовых_запросов.xlsx",
            "error": "В Excel файле не обнаружен столбец с датой"
        }
    ]
}
 */

const initUploadStatus = {
    isUploading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


// Общая проверка статусов загрузок
const checkFinalStatus = async (token) => {
    try {
        let res = await fetch(`${URL}/api/file-process`, {
            headers: {
                authorization: 'JWT ' + token
            }
        })

        if (!res.ok) {
            return
        }

        res = await res.json()
        return res?.data?.items
    } catch {

    }
}

const FileUploader = ({ setShow, setError, getListOfReports }) => {

    const { authToken } = useContext(AuthContext)
    const [fileList, setFileList] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(initUploadStatus);
    const [progressBarState, setProgressBarState] = useState(0)
    const [requestCounter, setRequestCounter] = useState(0)
    const intervalRef = useRef(null)
    // use it to abort  uploadHandler whe unmounting
    const uploadAbortControllerRef = useRef(null);

    // ------------- функция для начальной отправки файлов ----------//
    const uploadHandler = async () => {
        // --//--
        uploadAbortControllerRef.current = new AbortController();

        // меняем статус загрузки
        setUploadStatus({ ...initUploadStatus, isUploading: true })
        // меняем значение прогрессбара
        setProgressBarState(1)
        // готовим формдату для отправки
        const formData = new FormData();
        fileList.forEach((item, id) => {
            formData.append(`files`, item.file);
        });

        // обновляем статус каждого файла
        setFileList(prev => {
            const upd = prev.map(_ => ({
                ..._,
                status: {
                    isLoading: true,
                    isError: false,
                    isSuccess: false,
                    isUninitialized: false,
                    message: ''
                }
            }))
            // подготавливаем и сохраняем список файлов 
            const fileListToSave = upd.map(_ => ({
                ..._,
                file: { name: _.file.name },
            }))
            localStorage.setItem('uploadingFiles', JSON.stringify(fileListToSave))
            return upd
        })

        // загружаем
        try {
            let response = await fetch(`${URL}/api/report/upload/test`, {
                method: 'POST',
                headers: {
                    authorization: 'JWT ' + authToken,
                },
                body: formData,
                signal: uploadAbortControllerRef.current.signal, // <-- вот здесь!
            });

            // обрабатываем упавший запрос
            if (!response.ok) {
                // меняем статус загрузки
                response = await response.json()
                setUploadStatus({ ...initUploadStatus, isUploading: false, isError: true, message: response.message || 'Не удалось загрузить файлы' });
                setProgressBarState(0)
                // меняем статус файлов
                setFileList(prev => prev.map(_ => ({
                    ..._,
                    status: {
                        isLoading: false,
                        isError: true,
                        isSuccess: false,
                        isUninitialized: false,
                        message: 'Ошибка'
                    }
                })))
                localStorage.removeItem('uploadingFiles')
                // выходим
                return
            }

            // парсим запрос
            response = await response.json()

            // обновляем статусы файлов если среди них есть не прошедшие первичную валидацию
            if (response.invalid_files && response.invalid_files.length > 0) {
                setFileList(prev => {
                    const upd = prev.map(_ => {
                        const index = response.invalid_files.findIndex(i => i.filename === _.file.name)
                        if (index === -1) {
                            return _
                        } else {
                            return {
                                ..._,
                                status: {
                                    isLoading: false,
                                    isError: true,
                                    isSuccess: false,
                                    isUninitialized: false,
                                    message: `Ошибка валидации: ${response.invalid_files[index].error}`
                                }
                            }
                        }
                    })
                    // подготавливаем и сохраняем список файлов 
                    const fileListToSave = upd.map(_ => ({
                        ..._,
                        file: { name: _.file.name },
                    }))
                    localStorage.setItem('uploadingFiles', JSON.stringify(fileListToSave))
                    return upd
                })
            }



            // если есть принятые в обработку файлы, то
            if (response.processed_files_count > 0) {
                // обновляем статус прогрессбара
                setProgressBarState(2)
                // запускаем проверку статуса файлов
                intervalRef.current = setInterval(() => {
                    checkAllUploads(authToken, response.processed_files_count)
                }, 1000)
            } else {
                setUploadStatus(initUploadStatus)
                setProgressBarState(0)
                return
            }
        } catch (error) {
            setUploadStatus({ ...initUploadStatus, isUploading: false, isError: true, message: 'Не удалось загрузить файлы' });
            localStorage.removeItem('uploadingFiles')
        }
    }

    // ------------- функция для периодической проверки статуса загруженных файлов --------------//
    const checkAllUploads = async (token, counter) => {

        // обновляем счетчик запросов (покажем ошибку если он будет больше 600 (10 минут))
        if (intervalRef && intervalRef.current) {
            setRequestCounter((prev) => prev + 1)
        }

        try {
            let res = await fetch(`${URL}/api/file-process/status-count`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + token
                }
            })

            // обрабатываем упавший запрос
            if (!res.ok) {

                // меняем статус загрузки
                setUploadStatus({ ...initUploadStatus, isError: true, message: 'Не удалось загрузить файлы' })
                // обнуляем прогресс бар
                setProgressBarState(0)
                // обнуляем счетчик запросов
                setRequestCounter(0)
                // удаляем интервал
                intervalRef?.current && clearInterval(intervalRef.current)
                intervalRef.current = null
                // удаляем сохраненные файлы и выходим
                localStorage.removeItem('uploadingFiles')
                return
            }

            // парсим запрос
            res = await res.json()
            // смотрим количество файлов в статусе ожидают и в процессе
            const totalAmount = res.pending.count + res.processing.count;

            // высчитываем статус прогресс бара и обновляем
            const step = 100 / counter
            const progress = step * (counter - totalAmount)
            setProgressBarState((prev) => prev > progress ? prev : progress)

            // финальные статусы
            const { completed, failed } = res;
            // обновляем статус успешно загруженных
            if (completed.count > 0) {
                setFileList(prev => prev.map(_ => {
                    const index = completed.files.findIndex(i => i === _.file.name)
                    if (index === -1) {
                        return { ..._ }
                    } else {
                        return {
                            ..._,
                            status: {
                                isLoading: false,
                                isError: false,
                                isSuccess: true,
                                isUninitialized: false,
                                message: 'Файл успешно загружен'
                            }
                        }
                    }
                }))
            }

            // обновляем статус ошибок
            if (failed.count > 0) {
                setFileList(prev => prev.map(_ => {
                    const index = failed.files.findIndex(i => i === _.file.name)
                    if (index === -1) {
                        return { ..._ }
                    } else {
                        return {
                            ..._,
                            status: {
                                isLoading: false,
                                isError: true,
                                isSuccess: false,
                                isUninitialized: false,
                                message: 'Ошибка: Не удалось обработать файл'
                            }
                        }
                    }
                }))
            }

            // выходим когда прогресс бар дошел до 100%
            if (progress >= 100) {
                const finalResult = await checkFinalStatus(token)
                setFileList(prev => prev.map(_ => {
                    // ищем в списке файлы с именем айтем, фильтруем по айди и берем с наибольшим
                    const item = finalResult?.filter(i => i.original_filename === _.file.name).sort((a, b) => a.id - b.id).pop()
                    // если нашли то обновляем статус файла
                    if (item) {
                        let status = _.status;
                        if (item.status === 'failed') {
                            status = {
                                isLoading: false,
                                isUninitialized: false,
                                isError: true,
                                isSuccess: false,
                                message: item.error_message || 'Не удалось обработать файл'
                            }
                        }
                        if (item.status === 'completed') {
                            status = {
                                isLoading: false,
                                isUninitialized: false,
                                isError: false,
                                isSuccess: true,
                                message: 'Файл успешно загружен'
                            }
                        }
                        return {
                            ..._,
                            status: status
                        }

                        // если не нашли то возвращаем текущий
                    } else {
                        return {
                            ..._,
                        }
                    }
                }))

                // обновляем статус загрузки
                setUploadStatus(initUploadStatus)
                // обновляем список отчетов
                await getListOfReports();

                //удаляем интервал
                intervalRef?.current && clearInterval(intervalRef.current)
                intervalRef.current = null
                // сбрасываем бар
                setRequestCounter(0)
                localStorage.removeItem('uploadingFiles')
            }
        } catch {
            setUploadStatus({ ...initUploadStatus, isError: true, message: 'Не удалось загрузить файлы' })
            intervalRef?.current && clearInterval(intervalRef.current)
            intervalRef.current = null
            setRequestCounter(0)
            localStorage.removeItem('uploadingFiles')
        }
    }

    //-------- проверка на наличие файлов в процессинге при загрузке страницы ----------//
    useEffect(() => {
        // функция для инит проверки
        const initialCheck = async (hasNoSavedList = false, list) => {

            // меняем статус загрузки
            setUploadStatus(_ => ({ ...initUploadStatus, isUploading: true }))
            // меняем статус бара
            setProgressBarState(_ => 1)
            try {
                let res = await fetch(`${URL}/api/file-process/status-count`, {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'JWT ' + authToken
                    }
                })

                // выходим если запрос упал
                if (!res.ok) {
                    setUploadStatus({ ...initUploadStatus, isError: false, message: 'Не удалось проверить статус файлов в обработке' })
                    setProgressBarState(0)
                    setFileList([])
                    intervalRef?.current && clearInterval(intervalRef.current)
                    intervalRef.current = null
                    localStorage.removeItem('uploadingFiles')
                    return
                }
                // парсим запрос
                res = await res.json()

                // проверяем есть ли файлы в процессе
                const { pending, processing } = res
                const totalAmount = pending.count + processing.count;


                // если нет сохраненного списка файлов выходим если нет в процессинге ничего
                if (hasNoSavedList && totalAmount === 0) {
                    setUploadStatus(initUploadStatus)
                    setProgressBarState(0)
                    localStorage.removeItem('uploadingFiles')
                }
                // если есть то формируем список фалов на основе того что в процессинге и работаем с этим
                if (hasNoSavedList && totalAmount > 0) {
                    list = [
                        ...pending.files.map(_ =>
                        ({
                            file: {
                                name: _
                            },
                            status: {
                                isLoading: true,
                                isUninitialized: false,
                                isError: false,
                                isSuccess: false,
                                message: ''
                            }
                        })
                        ),
                        ...processing.files.map(_ => ({
                            file: {
                                name: _
                            },
                            status: {
                                isLoading: true,
                                isUninitialized: false,
                                isError: false,
                                isSuccess: false,
                                message: ''
                            }
                        }))

                    ]

                    setFileList(list)
                }

                // если нет то чекаем статус по сохраненным файлам и выходим
                if (totalAmount === 0) {
                    // получаем список загруженных файлов
                    const finalResult = await checkFinalStatus(authToken)
                    list = list.map(_ => {
                        // ищем в списке файлы с именем айтем, фильтруем по айди и берем с наибольшим
                        const item = finalResult?.filter(i => i.original_filename === _.file.name).sort((a, b) => a.id - b.id).pop()
                        // если нашли то обновляем статус файла
                        if (item) {
                            let status = _.status;
                            if (item.status === 'failed') {
                                status = {
                                    isLoading: false,
                                    isUninitialized: false,
                                    isError: true,
                                    isSuccess: false,
                                    message: item.error_message || 'Не удалось обработать файл'
                                }
                            }
                            if (item.status === 'completed') {
                                status = {
                                    isLoading: false,
                                    isUninitialized: false,
                                    isError: false,
                                    isSuccess: true,
                                    message: 'Файл успешно загружен'
                                }
                            }
                            return {
                                ..._,
                                status: status
                            }

                            // если вдруг файл все еще висит в загрузке, то уходим в ошибку или возвращаем текущий статус
                        } else {
                            if (_.status.isLoading) {
                                return {
                                    ..._,
                                    status: {
                                        isLoading: false,
                                        isUninitialized: false,
                                        isError: true,
                                        isSuccess: false,
                                        message: 'Не удалось определить статус файла'
                                    }
                                }
                            }
                            return {
                                ..._,
                            }
                        }
                    })
                    setFileList([...list])
                    setUploadStatus(initUploadStatus)
                    setProgressBarState(0)
                    localStorage.removeItem('uploadingFiles')
                    return
                }


                // если в процессе файлов меньше чем сохранено (нужно проверить статус некоторых)
                if (totalAmount <= fileList?.length) {
                    // получаем список загруженных файлов
                    const finalResult = await checkFinalStatus(authToken)
                    list = list.map(_ => {
                        // сначала проверяем что файл есть в процессинге (в статусах pending || processing) т.к. если он завершен, то мы увидим его статус через checkFinalStatus()
                        const isInPendingList = pending.files.some(pe => pe === _.file.name);
                        const isInProcessingList = pending.files.some(pc => pc === _.file.name);


                        // если находим в процессинге, то ставим статус в "Загрузка", а если нет то проверяем по финалке
                        if (isInPendingList || isInProcessingList) {
                            return {
                                ..._,
                                status: {
                                    isLoading: true,
                                    isUninitialized: false,
                                    isError: false,
                                    isSuccess: false,
                                    message: ''
                                }
                            }
                        } else {
                            const item = finalResult?.filter(i => i.original_filename === _.file.name).sort((a, b) => a.id - b.id).pop()
                            // если нашли то обновляем статус файла а если нет, то уводим в ошибку
                            if (item) {
                                let status = _.status;
                                if (item.status === 'failed') {
                                    status = {
                                        isLoading: false,
                                        isUninitialized: false,
                                        isError: true,
                                        isSuccess: false,
                                        message: item.error_message || 'Не удалось обработать файл'
                                    }
                                }
                                if (item.status === 'completed') {
                                    status = {
                                        isLoading: false,
                                        isUninitialized: false,
                                        isError: false,
                                        isSuccess: true,
                                        message: 'Файл успешно загружен'
                                    }
                                }
                                return {
                                    ..._,
                                    status: status
                                }

                                // если не нашли то возвращаем текущий
                            } else {
                                return {
                                    ..._,
                                    status: {
                                        isLoading: false,
                                        isUninitialized: false,
                                        isError: true,
                                        isSuccess: false,
                                        message: 'Не удалось получить статус файла'
                                    }

                                }
                            }
                        }
                    })
                    setFileList([...list])
                }


                // Проверяем что в списке файлов есть файлы со статусом "Загрузка" и запустим проверку для них. 
                // Если таких файлов нет, то выходим
                const isHasLoadingStatus = list.some(_ => _.status.isLoading);
                if (!isHasLoadingStatus) {
                    setUploadStatus(initUploadStatus)
                    setProgressBarState(0)
                    return
                } else {
                    // обновляем статус бар
                    setProgressBarState(_ => 2)

                    // и запускаем цикл проверки
                    if (!intervalRef?.current) {
                        intervalRef.current = setInterval(() => {
                            checkAllUploads(authToken, totalAmount)
                        }, 1000)
                    }
                }

            } catch {
                setUploadStatus(initUploadStatus)
                setUploadStatus({ ...initUploadStatus, isError: false, message: 'Не удалось проверить статус файлов в обработке' })
                setFileList([])
                intervalRef?.current && clearInterval(intervalRef.current)
                intervalRef.current = null
                localStorage.removeItem('uploadingFiles')
            }
        }


        // поднимаем сохраненные файлы
        let uploadingFiles = localStorage.getItem('uploadingFiles')
        if (uploadingFiles) {
            uploadingFiles = JSON.parse(uploadingFiles)
            setFileList(uploadingFiles)
            initialCheck(false, uploadingFiles)
        } else {
            initialCheck(true, undefined)
        }


        return () => {
            intervalRef?.current && clearInterval(intervalRef.current)
            intervalRef.current = null
            uploadAbortControllerRef?.current?.abort();
        }
    }, [])


    // ---------- меняем всплывашку у кнопки "удалить" ----------//
    useEffect(() => {
        const delButton = document.querySelectorAll('.ant-upload-list-item-action');
        const listItem = document.querySelectorAll('.ant-upload-list-item')
        const list = document.querySelector('.ant-upload-list')
        if (list) {
            list.style.width = '100%'
        }
        if (listItem) {
            listItem.forEach(_ => _.style.margin = 0)
        }
        if (delButton) {
            delButton.forEach(_ => _.title = 'Удалить файл')
        }
    }, [fileList])


    // --------- сбрасываем интервал проверки по условию ------------//
    useEffect(() => {
        if (intervalRef?.current && requestCounter >= 600) {
            setUploadStatus({ ...initUploadStatus, isError: true, message: 'Не удалось обработать файлы. Пожалуйста, обратитесь в поддержку' })
            intervalRef?.current && clearInterval(intervalRef.current)
            intervalRef.current = null
            setProgressBarState(0)
            setRequestCounter(0)
            setFileList(prev => prev.map(_ => {
                if (_.status.isLoading) {
                    return {
                        ..._,
                        status: {
                            isLoading: false,
                            isUninitialized: false,
                            isError: false,
                            isSuccess: false,
                            message: 'Ошибка'
                        }
                    }
                }
            }))
            localStorage.removeItem('uploadingFiles')
        }
    }, [requestCounter, intervalRef])
    // --------- скрываем ошибку количества файлов через 2 секунды ---------//
    // useEffect(() => {
    //     let timeout;
    //     if (filesQuantityError) {
    //         timeout = setTimeout(() => {setFilesQuantityError(false)}, 2000)
    //     }

    //     return () => {timeout && clearTimeout(timeout)}
    // }, [filesQuantityError])


    return (
        <div className={styles.uploader}>
            <ConfigProvider
                theme={{
                    token: {
                        colorBorder: '#d9d9d9',
                        colorPrimary: '#5329FF',
                        colorFillAlter: 'white'
                    },
                }}
            >


                {/* дропзона + список файлов */}


                <Upload.Dragger
                    accept='.xlsx,.zip'
                    name='file_uploader'
                    multiple
                    disabled={uploadStatus.isUploading}
                    className={styles.uploader__component}
                    pastable
                    //maxCount={10}
                    onRemove={file => {
                        const index = fileList.findIndex(_ => _.file.name === file.name);
                        setFileList(prev => {
                            if (index !== -1) {
                                prev.splice(index, 1)
                                return [...prev]
                            } else {
                                return prev
                            }
                        });
                    }}
                    beforeUpload={file => {
                        setFileList(prevFileList => {
                            if (prevFileList.some(_ => _.file.name === file.name)) {
                                return prevFileList
                            }
                            return [...prevFileList, {
                                file: file,
                                status: {
                                    isLoading: false,
                                    isUninitialized: true,
                                    isError: false,
                                    isSuccess: false,
                                    message: ''
                                }
                            }]
                        })
                    }}
                    fileList={fileList.map(_ => _.file)}
                    itemRender={(originNode, file, currList, actions) => {
                        // originNode — стандартный элемент
                        // file — объект файла
                        // currList — весь список файлов
                        // actions — { download, preview, remove }
                        const index = fileList.findIndex(_ => _.file === file);
                        const item = fileList[index]

                        return (
                            <>
                                <div className={styles.fileList__item}>
                                    {originNode}
                                    {item?.status &&
                                        <>
                                            {item.status.isLoading &&
                                                <div className={`${styles.fileList__statusBlock} ${styles.fileList__statusBlock_gray}`}>
                                                    {item.status.message || 'Загрузка'}
                                                </div>
                                            }
                                            {item.status.isError &&
                                                <div className={`${styles.fileList__statusBlock} ${styles.fileList__statusBlock_error}`}>
                                                    {item.status.message ? (
                                                        <Tooltip
                                                            title={item.status.message}
                                                            arrow={false}
                                                        >
                                                            {item.status.message}
                                                        </Tooltip>
                                                    ) : 'Ошибка'}
                                                </div>
                                            }
                                            {item.status.isSuccess &&
                                                <div className={`${styles.fileList__statusBlock} ${styles.fileList__statusBlock_success}`}>
                                                    {item.status.message || 'Успешно'}
                                                </div>
                                            }
                                            {item.status.isUninitialized &&
                                                <div className={`${styles.fileList__statusBlock} ${styles.fileList__statusBlock_gray}`}>
                                                    {item.status.message || 'Готово к загрузке'}
                                                </div>
                                            }
                                        </>

                                    }
                                    {!item && uploadStatus.isUploading &&
                                        <div className={`${styles.fileList__statusBlock} ${styles.fileList__statusBlock_gray}`}>
                                            {'У вас есть файлы в обработке. Проверяем статус.'}
                                        </div>
                                    }
                                </div>
                            </>
                        );
                    }}
                >
                    <div className={styles.uploader__wrapper}>
                        <p className={styles.uploader__title}>Загрузите отчеты</p>
                        <img src={uploadIcon} alt='upload' />
                        <p className={styles.uploader__text}>Перетащите мышкой файлы или <span>загрузите с компьютера</span></p>
                    </div>

                </Upload.Dragger>


                {/* кнопки управления */}
                {fileList?.length > 10 &&
                    <div className={`${styles.fileList__statusBlock} ${styles.fileList__statusBlock_error}`} style={{ marginLeft: 16, marginBottom: 16, fontSize: 16, overflow: 'hidden' }}>
                        {'Превышен лимит: вы можете загрузить не более 10 файлов одновременно.'}
                    </div>
                }


                {fileList?.length > 0 && fileList.every(_ => _?.status?.isUninitialized) && !uploadStatus.isUploading &&
                    <Button
                        className={styles.uploader__uploadButton}
                        type='primary'
                        onClick={uploadHandler}
                        loading={uploadStatus.isUploading}
                        disabled={fileList.length > 10}
                    >
                        {uploadStatus.isSuccess && uploadStatus.message ? uploadStatus.message : 'Загрузить'}
                    </Button>
                }
                {fileList?.length > 0 && !uploadStatus.isUploading &&
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBorder: '#F93C65',
                                colorPrimary: '#F93C65',
                            },
                            components: {
                                Button: {
                                    defaultColor: '#F93C65'
                                }
                            }
                        }}
                    >
                        <Button
                            className={styles.uploader__uploadButton}
                            type='default'
                            variat='outlined'
                            color='#F93C65'
                            onClick={() => { setFileList([]); localStorage.removeItem('uploadingFiles') }}
                            loading={uploadStatus.isUploading}
                        >
                            Сбросить
                            {/* {uploadStatus.isSuccess && uploadStatus.message ? uploadStatus.message : 'Загрузить'} */}
                        </Button>
                    </ConfigProvider>
                }

                {uploadStatus.isUploading &&
                    <div className={styles.progressWrapper}>
                        <Progress
                            percent={progressBarState}
                            size='small'
                            showInfo={false}
                            strokeColor='#5329FF'
                            strokeLinecap={1}
                        />
                    </div>
                }
            </ConfigProvider>






            {/* modals */}






            {/* error modal */}
            <ErrorModal
                footer={null}
                open={uploadStatus.isError}
                onOk={() => { setUploadStatus(initUploadStatus); setProgressBarState(0) }}
                onClose={() => { setUploadStatus(initUploadStatus); setProgressBarState(0) }}
                onCancel={() => { setUploadStatus(initUploadStatus); setProgressBarState(0) }}
                message={uploadStatus.message}
            />

        </div >
    )
}

export default FileUploader;

