import React, { useState, useContext, useEffect } from 'react'
import styles from './fileUploader.module.css'
import { Upload, ConfigProvider, Button } from 'antd'
import uploadIcon from '../../../pages/images/upload.svg'
import AuthContext from '../../../service/AuthContext'
import { URL } from '../../../service/config'

const initUploadStatus = {
    isUploading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const FileUploader = ({ setShow, setError, getListOfReports}) => {

    const { authToken } = useContext(AuthContext)
    const [fileList, setFileList] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(initUploadStatus);

    useEffect(() => {
        let timeout;
        if (uploadStatus.isSuccess) {
            timeout = setTimeout(() => {setUploadStatus(initUploadStatus);  setFileList([])}, 3000)
        }

        return () => {timeout && clearTimeout(timeout)}
    }, [uploadStatus])

    const uploadHandler = async () => {

        setUploadStatus({ ...initUploadStatus, isUploading: true })
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });
        try {
            const response = await fetch(`${URL}/api/report/upload`, {
                method: 'POST',
                headers: {
                    authorization: 'JWT ' + authToken,
                },
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                await getListOfReports();
                setUploadStatus({ ...initUploadStatus, isSuccess: true, message: 'Успешно загружено' })
            } else {
                setUploadStatus({ ...initUploadStatus, isError: true, message: 'Что-то пошло не так :(' })
                setError(data.message);
                setShow(true);
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus({ ...initUploadStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }


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
                    accept='.xls,.xlsx,.zip'
                    name='file_uploader'
                    multiple
                    disabled={uploadStatus.isUploading}
                    className={styles.uploader__component}
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
                        <p className={styles.uploader__text}>Перетащите мышкой файл или <span>загрузите с компьютера</span></p>
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
            </ConfigProvider>
        </div >
    )
}

export default FileUploader;