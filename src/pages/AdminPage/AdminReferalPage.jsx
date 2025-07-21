import React, { useState, useContext } from 'react';
import styles from './AdminReferalPage.module.css'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import { SearchWidget } from './widgets';
import { Input, Button, ConfigProvider } from 'antd';
import { formatPrice } from '../../service/utils';
import SuccessModal from '../../components/sharedComponents/modals/successModal/successModal';
import moment from 'moment';



const initStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const fetchUserData = async (token, userId, setStatus, initStatus, setData) => {
    setStatus({ ...initStatus, isLoading: true })
    try {
        let res = await fetch(`${URL}/api/admin/referral-system/${userId}/bonuses`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + token
            },
        })

        if (!res.ok) {
            setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' })
            return
        }

        res = await res.json();
        setStatus({ ...initStatus, isSuccess: true })
        setData(res.data)

    } catch {
        setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' })
    }
}

const accountRefill = async (token, reqData, setStatus, initStatus, setData, setSuccessRefill) => {
    setStatus({ ...initStatus, isLoading: true })
    try {
        let res = await fetch(`${URL}/api/admin/service-analysis/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify(reqData)
        })

        if (!res.ok) {
            setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' })
            return
        }
        await fetchUserData(token, reqData.referrer, setStatus, initStatus, setData)
        setStatus(initStatus)
        setSuccessRefill(true)
    } catch {
        setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' })
    }
}

const AdminReferalPage = () => {

    const { authToken } = useContext(AuthContext)
    const [status, setStatus] = useState(initStatus)
    const [data, setData] = useState()
    const [inputValue, setInputValue] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')
    const [successRefill, setSuccessRefill] = useState(false)

    const submitHandler = () => {
        const dataObject = {
            referrer: searchInputValue,
            amount: inputValue
        }
        accountRefill(authToken, dataObject, setStatus, initStatus, setData, setSuccessRefill)
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
                    inputValue={searchInputValue}
                    setInputValue={setSearchInputValue}
                    fetchUserData={fetchUserData}
                />

                {status.isSuccess &&
                    <div className={styles.page__dataWrapper}>
                        <div className={styles.mainData}>
                            <p className={styles.mainData__title}>Начислить бонусы</p>
                            <div className={styles.mainData__userBlock}>
                                <div className={styles.mainData__row}>
                                    <p className={styles.mainData__rowText}>userId</p>
                                    <p className={styles.mainData__rowText}>{searchInputValue}</p>
                                </div>
                                {/* <div className={styles.mainData__row}>
                                    <p className={styles.mainData__rowText}>email:</p>
                                    <p className={styles.mainData__rowText}>x@xx.xx</p>
                                </div> */}
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
                                {data && data.length > 0 && data.map((_, id) => (
                                    <div className={styles.userHistoryData__row} key={id}>
                                        <p className={styles.userHistoryData__rowText}>{moment(_.created_at).format('DD.MM.YYYY HH:mm')}</p>
                                        <p className={styles.userHistoryData__rowText}>{formatPrice(_.amount, '₽')}</p>
                                    </div>
                                ))}
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
                message={status.message}
            />
            <SuccessModal
                open={successRefill}
                footer={null}
                onOk={() => {
                    setSuccessRefill(false);
                    setInputValue('')
                }}
                onClose={() => {
                    setSuccessRefill(false);
                    setInputValue('')
                }}
                onCancel={() => {
                    setSuccessRefill(false);
                    setInputValue('')
                }}
                message={`Успешно начислено ${inputValue} Р. ID пользователя: ${searchInputValue}`}
            />
        </main>

    )
}

export default AdminReferalPage;