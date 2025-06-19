import React, { useState, useContext, useEffect } from 'react'
import styles from './fileUploader.module.css'
import { Upload, ConfigProvider, Button, Progress } from 'antd'
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


// const checkUploadStatus = async (token) => {
//     try {
//         let res = await fetch(`${URL}/api/file-process`, {
//             headers: {
//                 'content-type': 'application/json',
//                 'authorization': 'JWT ' + token
//             }
//         })
//         res = await res.json() 
//         console.log('single', res)
//     } catch {

//     }
// }

const FileUploader = ({ setShow, setError, getListOfReports }) => {

    const { authToken } = useContext(AuthContext)
    const [fileList, setFileList] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(initUploadStatus);
    const [ progressBarState, setProgressBarState] = useState(0)

    const checkAllUploads = async (token, counter, interval) => {
        try {
            let res = await fetch(`${URL}/api/file-process/status-count`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + token
                }
            })
            if (!res.ok) {
                setUploadStatus({ ...initUploadStatus, isError: true, message: 'Что-то пошло не так :(' })
            }
            res = await res.json()
            const totalAmount = res.pending + res.processing;
            const step = 100 / counter
            const progress = step * (counter - totalAmount)
            setProgressBarState(progress)
            if (progress >= 100) {
                interval && clearInterval(interval)
            }
        } catch {
    
        }
    }

    const uploadHandler = async () => {

        setUploadStatus({ ...initUploadStatus, isUploading: true })
        const formData = new FormData();
        fileList.forEach((file, id) => {
            formData.append(`files`, file);
        });
        // const interval = setInterval(() => {
        //     checkAllUploads(authToken, 4, interval)
        // }, 3000)
        try {
            let response = await fetch(`${URL}/api/report/upload/test`, {
                method: 'POST',
                headers: {
                    authorization: 'JWT ' + authToken,
                },
                body: formData,
            });

            if (!response.ok) {
                // setUploadStatus({ ...initUploadStatus,isSuccess: true, isUploading: false, message: '' });
                // setFileList([])
                setUploadStatus({ ...initUploadStatus, isUploading: false, isError: true, message: 'Что-то пошло не так :(' });
                setError(data.message);
                setShow(true);
                throw new Error('Upload failed');
            }
            response = await response.json()

            setUploadStatus({ ...initUploadStatus,isSuccess: true, isUploading: false, message: '' });
            setFileList([])
            const interval = setInterval(() => {
                checkAllUploads(authToken, response.processed_files_count, interval)
            }, 3000)
            //await getListOfReports();

        } catch (error) {
            // setUploadStatus({ ...initUploadStatus,isSuccess: true, isUploading: false, message: '' });
            // setFileList([])
            setUploadStatus({ ...initUploadStatus, isError: true, message: 'Что-то пошло не так :(' })
            setError('Что-то пошло не так :(');
            setShow(true);
        }
    }

    useEffect(() => {
        let interval;
        if (uploadStatus.isSuccess && !interval) {
            setProgressBarState(2)
            // interval = setInterval(() => {
            //     setProgressBarState((prev) => prev < 100 && prev + .1)
            // }, 500)
        }
        return () => {interval && clearInterval(interval)}
    }, [uploadStatus])

    useEffect(() => {
        let timeout;
        if (progressBarState >= 100) {
            timeout = setTimeout(() => {
                alert('успешно загружено')
                setUploadStatus(initUploadStatus)
                setProgressBarState(0)
            }, 1000)
        }

    }, [progressBarState])


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


                {fileList?.length > 0 &&
                    <Button
                        className={styles.uploader__uploadButton}
                        type='primary'
                        onClick={uploadHandler}
                        loading={uploadStatus.isUploading}
                    >
                        {uploadStatus.isSuccess && uploadStatus.message ? uploadStatus.message : 'Загрузить'}
                    </Button>
                }

                {uploadStatus.isSuccess &&
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
        </div >
    )
}

export default FileUploader;