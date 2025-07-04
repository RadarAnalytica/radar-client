import React, { useState, useContext, useEffect, useRef } from 'react'
import styles from './fileUploader.module.css'
import { Upload, ConfigProvider, Button, Progress, Modal } from 'antd'
import uploadIcon from '../../../pages/images/upload.svg'
import AuthContext from '../../../service/AuthContext'
import { URL } from '../../../service/config'
import ErrorModal from '../modals/errorModal/errorModal'
import SuccessModal from '../modals/successModal/successModal'

const initUploadStatus = {
    isUploading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


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
    const [finalResult, setFinalResult] = useState()
    const [requestCounter, setRequestCounter] = useState(0)
    console.log(requestCounter)
    const intervalRef = useRef(null)



    const checkAllUploads = async (token, counter) => {
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
            if (!res.ok) {
                setUploadStatus({ ...initUploadStatus, isError: true, message: 'Не удалось загрузить файлы' })
                setProgressBarState(0)
                setRequestCounter(0)
                intervalRef?.current && clearInterval(intervalRef.current)
                intervalRef.current = null
                return
            }
            res = await res.json()
            const totalAmount = res.pending + res.processing;
            const step = 100 / counter
            const progress = step * (counter - totalAmount)
            setProgressBarState((prev) => prev > progress ? prev : progress)
            if (progress >= 100) {
                const finalResult = await checkFinalStatus(token)

                const filteredArr = []
                fileList.forEach(_ => {
                    const item = finalResult?.filter(i => i.original_filename === _.name).sort((a, b) => a.id - b.id).pop()
                    if (item) {
                        filteredArr.push(item)
                    }
                })
                setFinalResult(filteredArr)
                setUploadStatus({ ...uploadStatus, isUploading: true, isSuccess: true, message: 'Файлы успешно загружены!' })
                await getListOfReports();
                intervalRef?.current && clearInterval(intervalRef.current)
                intervalRef.current = null
                localStorage.removeItem('isFilesUploading')
                setRequestCounter(0)
            }
        } catch {
            setUploadStatus({ ...initUploadStatus, isError: true, message: 'Не удалось загрузить файлы' })
            intervalRef?.current && clearInterval(intervalRef.current)
            intervalRef.current = null
            setRequestCounter(0)
        }
    }

    const uploadHandler = async () => {
        const filenamesArr = fileList.map(_ => ({ name: _.name }))
        localStorage.setItem('isFilesUploading', JSON.stringify(filenamesArr))
        setUploadStatus({ ...initUploadStatus, isUploading: true })
        setProgressBarState(1)
        const formData = new FormData();
        fileList.forEach((file, id) => {
            formData.append(`files`, file);
        });
        try {
            let response = await fetch(`${URL}/api/report/upload/test`, {
                method: 'POST',
                headers: {
                    authorization: 'JWT ' + authToken,
                },
                body: formData,
            });

            if (!response.ok) {
                setUploadStatus({ ...initUploadStatus, isUploading: false, isError: true, message: response.detail || 'Не удалось загрузить файлы' });
                localStorage.removeItem('isFilesUploading')
                return
            }
            response = await response.json()
            setProgressBarState(2)
            intervalRef.current = setInterval(() => {
                checkAllUploads(authToken, response.processed_files_count)
            }, 1000)

        } catch (error) {
            setUploadStatus({ ...initUploadStatus, isUploading: false, isError: true, message: response.detail || 'Не удалось загрузить файлы' });
            localStorage.removeItem('isFilesUploading')
        }
    }

    useEffect(() => {
        const initialCheck = async () => {
            setUploadStatus({ ...initUploadStatus, isUploading: true })
            setProgressBarState(1)
            try {
                let res = await fetch(`${URL}/api/file-process/status-count`, {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'JWT ' + authToken
                    }
                })
                if (!res.ok) {
                    setUploadStatus(initUploadStatus)
                    setProgressBarState(0)
                    intervalRef?.current && clearInterval(intervalRef.current)
                    intervalRef.current = null
                    return
                }

                res = await res.json()
                const totalAmount = res.pending + res.processing;
                if (totalAmount === 0) {
                    setUploadStatus(initUploadStatus)
                    setProgressBarState(0)
                    return
                }
                setProgressBarState(2)
                if (!intervalRef?.current) {
                    intervalRef.current = setInterval(() => {
                        checkAllUploads(authToken, totalAmount)
                    }, 1000)
                }
              
            } catch {
                setUploadStatus(initUploadStatus)
                intervalRef?.current && clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        initialCheck()

        return () => {
            intervalRef?.current && clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    useEffect(() => {
        const delButton = document.querySelector('.ant-upload-list-item-action');
        if (delButton) {
            delButton.title = 'Удалить файл'
        }
    }, [fileList])

    useEffect(() => {
        if (intervalRef?.current && requestCounter >= 60) {
            setUploadStatus({ ...initUploadStatus, isError: true, message: 'Не удалось обработать файлы. Пожалуйста, обратитесь в поддержку' })
            intervalRef?.current && clearInterval(intervalRef.current)
            intervalRef.current = null
            setProgressBarState(0)
            setRequestCounter(0)
        }
    }, [requestCounter, intervalRef])


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
                <Upload.Dragger
                    accept='.xlsx,.zip'
                    name='file_uploader'
                    multiple
                    disabled={uploadStatus.isUploading}
                    className={styles.uploader__component}
                    pastable
                    maxCount={10}
                    onRemove={file => {
                        const index = fileList.indexOf(file);
                        const newFileList = fileList.slice();
                        newFileList.splice(index, 1);
                        setFileList(newFileList);
                    }}
                    beforeUpload={file => {
                        //setFileList([...fileList, file]);
                        setFileList(prevFileList => [...prevFileList, file])
                        return false;
                    }}
                    fileList={fileList}
                >
                    <div className={styles.uploader__wrapper}>
                        <p className={styles.uploader__title}>Загрузите отчеты</p>
                        <img src={uploadIcon} alt='upload' />
                        <p className={styles.uploader__text}>Перетащите мышкой файлы или <span>загрузите с компьютера</span></p>
                    </div>

                </Upload.Dragger>


                {fileList?.length > 0 && !uploadStatus.isUploading &&
                    <Button
                        className={styles.uploader__uploadButton}
                        type='primary'
                        onClick={uploadHandler}
                        loading={uploadStatus.isUploading}
                    >
                        {uploadStatus.isSuccess && uploadStatus.message ? uploadStatus.message : 'Загрузить'}
                    </Button>
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
            <ErrorModal
                footer={null}
                open={uploadStatus.isError}
                onOk={() => { setUploadStatus(initUploadStatus); setProgressBarState(0) }}
                onClose={() => { setUploadStatus(initUploadStatus); setProgressBarState(0) }}
                onCancel={() => { setUploadStatus(initUploadStatus); setProgressBarState(0) }}
                message={uploadStatus.message}
            />
            {finalResult &&
                <Modal
                    footer={null}
                    open={uploadStatus.isSuccess}
                    onOk={() => { setUploadStatus(initUploadStatus); setProgressBarState(0); setFileList([]) }}
                    onClose={() => { setUploadStatus(initUploadStatus); setProgressBarState(0); setFileList([]) }}
                    onCancel={() => { setUploadStatus(initUploadStatus); setProgressBarState(0); setFileList([]) }}
                >
                    <div className={styles.modal}>
                        <p className={styles.modal__title}>Результат загрузки:</p>

                        <div className={styles.modal__table}>
                            {finalResult.map((_, id) => {
                                const statusMessage = _.status === 'failed' ? 'Ошибка' : _.status === 'completed' ? 'Успешно' : 'Неизвестно';
                                let statusColor = '#E8E8E8'
                                if (statusMessage === 'Ошибка') {
                                    statusColor = '#F93C65'
                                }
                                if (statusMessage === 'Успешно') {
                                    statusColor = '#00B69B'
                                }
                                return (
                                    <div key={id} className={styles.modal__tableItem}>
                                        <p className={styles.modal__filename} title={_.original_filename}>{_.original_filename}</p>
                                        <div className={styles.modal__statusWrapper}>
                                            <span className={styles.modal__filename} style={{ fontWeight: 700, color: statusColor }}>{_.status === 'failed' ? 'Ошибка' : _.status === 'completed' ? 'Успешно' : 'Неизвестно'}</span>
                                            <div className={styles.modal__icon} style={{ background: statusColor }}></div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Modal>}
        </div >
    )
}

export default FileUploader;