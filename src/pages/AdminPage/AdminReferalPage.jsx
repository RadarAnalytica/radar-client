import React, { useState, useContext } from 'react';
import styles from './AdminReferalPage.module.css'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import { SearchWidget } from './widgets';
import { Input, Button, ConfigProvider } from 'antd';



const initStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const accountRefill = async (token, reqData, setStatus, initStatus) => {
    setStatus({ ...initStatus, isLoading: true })
    try {
        let res = await fetch(`${URL}/api/admin/service-analysis/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            //body: JSON.stringify(reqData)
        })

        if (!res.ok) {
            setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' })
            return
        }

        setStatus({ ...initStatus, isSuccess: true })
    } catch {
        setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' })
    }
}

const AdminReferalPage = () => {

    const { authToken } = useContext(AuthContext)
    const [status, setStatus] = useState(initStatus)
    const [data, setData] = useState()
    const [inputValue, setInputValue] = useState('')

    const submitHandler = () => {
        const dataObject = {
            id: data.id,
            amount: inputValue
        }
        accountRefill(authToken, dataObject, setStatus, initStatus)
    }

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='Реферальная программа' titlePrefix='Админ панель' />
                </div>
                {/* !header */}

                <SearchWidget
                    setData={setData}
                    setStatus={setStatus}
                    initStatus={initStatus}
                    authToken={authToken}
                />

                {data || !data &&
                    <div className={styles.page__dataWrapper}>
                        <div className={styles.mainData}>
                            <p className={styles.mainData__title}>Начислить бонусы</p>
                            <div className={styles.mainData__userBlock}>
                                <div className={styles.mainData__row}>
                                    <p className={styles.mainData__rowText}>userId:</p>
                                    <p className={styles.mainData__rowText}>10</p>
                                </div>
                                <div className={styles.mainData__row}>
                                    <p className={styles.mainData__rowText}>email:</p>
                                    <p className={styles.mainData__rowText}>x@xx.xx</p>
                                </div>
                            </div>

                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#5329FF',
                                        fontFamily: 'Mulish'
                                    }
                                }}
                            >
                                <div className={styles.mainData__inputWrapper}>
                                    <Input
                                        placeholder='Введите сумму'
                                        size='large'
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        type='number'
                                    />
                                    <Button
                                        size='large'
                                        type='primary'
                                        onClick={submitHandler}
                                    >
                                        Начислить
                                    </Button>

                                </div>
                            </ConfigProvider>
                        </div>

                        <div className={styles.userHistoryData}>
                            <p className={styles.mainData__title}>История начислений</p>
                            <div className={styles.userHistoryData__userBlock}>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                                <div className={styles.userHistoryData__row}>
                                    <p className={styles.userHistoryData__rowText}>17.06.2025</p>
                                    <p className={styles.userHistoryData__rowText}>1000 Р</p>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </section>
            {/* ---------------------- */}




            {/*  modals */}
            <ErrorModal
                open={status.isError}
                footer={null}
                onOk={() => setStatus(initStatus)}
                onClose={() => setStatus(initStatus)}
                onCancel={() => setStatus(initStatus)}
            />
        </main>

    )
}

export default AdminReferalPage;