import { useEffect, useContext, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import AuthContext from "../../../service/AuthContext"
import { URL } from "../../../service/config"
import { Modal } from "antd"
import styles from './uploadProvider.module.css'
import { Link } from "react-router-dom"

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

const UploadProvider = ({ children }) => {
    const { authToken } = useContext(AuthContext)
    const { pathname } = useLocation()
    const [finalStatus, setFinalStatus] = useState()
    const [requestCounter, setRequestCounter] = useState(0)
    const intervalRef = useRef(null)

    const initialCheck = async (counter, list) => {
        if (intervalRef && intervalRef.current) {
            setRequestCounter((prev) => prev + 1)
        }
        try {
            let res = await fetch(`${URL}/api/file-process/status-count`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                }
            })
            if (!res.ok) {
                if (intervalRef?.current) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                }
                setFinalStatus(undefined)

                setRequestCounter(0)

                return
            }

            res = await res.json()
            const totalAmount = res.pending + res.processing;
            if (totalAmount === 0) {
                localStorage.removeItem('isFilesUploading')
                if (intervalRef?.current) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                }
                const finalResult = await checkFinalStatus(authToken)
                const filteredArr = []
                list.forEach(_ => {
                    const item = finalResult?.filter(i => i.original_filename === _.name).sort((a,b) => a.id - b.id).pop()
                    if (item) {
                        filteredArr.push(item)
                    }
                })
                setFinalStatus(filteredArr)
                setRequestCounter(0)
                return
            }
            if (!intervalRef?.current) {
                intervalRef.current = setInterval(() => {
                    initialCheck(counter, list)
                }, 1000)
            }
        } catch {
            if (intervalRef?.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            setFinalStatus(undefined)
            setRequestCounter(0)
            throw new Error('Не удалось получить статус загрузок')
        }
    }

    useEffect(() => {
        return () => {
            if (intervalRef?.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [])


    useEffect(() => {
        if (pathname === '/report-main') return;
        let filesUploading = localStorage.getItem('isFilesUploading')
        if (filesUploading) {
            filesUploading = JSON.parse(filesUploading)
        }
        if (filesUploading) initialCheck(filesUploading.length, filesUploading)
    }, [pathname])

    useEffect(() => {
        if (intervalRef?.current && requestCounter >= 60) {
            intervalRef?.current && clearInterval(intervalRef.current)
            intervalRef.current = null
            setRequestCounter(0)
            setFinalStatus(undefined)
        }
    }, [requestCounter, intervalRef])

    return (
        <>
            {children}
            {finalStatus &&
                <Modal
                    footer={null}
                    open={finalStatus}
                    onOk={() => { setFinalStatus(undefined) }}
                    onClose={() => { setFinalStatus(undefined) }}
                    onCancel={() => { setFinalStatus(undefined) }}
                >
                    <div className={styles.modal}>
                        <p className={styles.modal__title}>Отчеты загружены:</p>

                        <div className={styles.modal__table}>
                            {finalStatus.map((_, id) => {
                                const statusMessage = _.status === 'failed' ? 'Ошибка' : _.status === 'success' ? 'Успешно' : 'Неизвестно';
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
                                            <span className={styles.modal__filename} style={{ fontWeight: 700, color: statusColor }}>{_.status === 'failed' ? 'Ошибка' : _.status === 'success' ? 'Успешно' : 'Неизвестно'}</span>
                                            <div className={styles.modal__icon} style={{ background: statusColor }}></div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>

                        <Link
                            to='/report-main'
                            onClick={() => { setFinalStatus(undefined) }}
                            className={styles.modal__link}
                        >
                            Смотреть
                        </Link>
                    </div>
                </Modal>}
        </>
    )
}

export default UploadProvider;