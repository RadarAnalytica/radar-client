import React, { useState, useContext } from 'react';
import styles from './AdminReferalPage.module.css'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import { SearchWidget } from './widgets';
import { Input, Button, ConfigProvider, Form } from 'antd';
import { formatPrice } from '../../service/utils';
import SuccessModal from '../../components/sharedComponents/modals/successModal/successModal';
import moment from 'moment';
import { URL } from '../../service/config';



const initStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const mockData = {
    "id": 1,
    "referral_link": "https://radar-analytica.ru/asdfhgiu230sadfuyhahncapsdef23",
    "referral_count": 10,
    "bonus_balance": 1000,
    "transactions": {
        "page": 1,
        "per_page": 10,
        "total": 100,
        "transactions_data": [
            {
                "date": "2023-01-01",
                "transactions_history": [
                    {
                        "id": 1,
                        "referral_id": 1,
                        "bonus_amount": 100,
                        "transaction_date": "2023-01-01 12:00:00",
                        "admin_id": 1,
                        "transaction_type": "поступление от рефералов",
                        "transaction_direction": "начисление"
                    }
                ]
            }
        ]
    }
}

const fetchUserData = async (token, userId, setStatus, initStatus, setData) => {

    setData(undefined)
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
        let res = await fetch(`${URL}/api/admin/referral-system/bonus/`, {
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

    const { authToken, user } = useContext(AuthContext)
    const [status, setStatus] = useState(initStatus)
    const [data, setData] = useState(mockData)
    const [searchInputValue, setSearchInputValue] = useState('')
    const [successRefill, setSuccessRefill] = useState(false)
    const [form] = Form.useForm()

    const submitHandler = (fields) => {
        const dataObject = {
            ...fields,
            "referrer_id": data.id,
            "admin_id": user.id,
            "transaction_date": moment().toISOString(),
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
                                    <p className={styles.mainData__rowText}>USER_ID</p>
                                    <p className={styles.mainData__rowText}>{data.id}</p>
                                </div>
                                <div className={styles.mainData__row}>
                                    <p className={styles.mainData__rowText}>Ссылка</p>
                                    <p
                                        title={data.referral_link}
                                        className={styles.mainData__rowText}
                                    // style={{
                                    //     maxWidth: 200,
                                    //     whiteSpace: 'nowrap',
                                    //     textOverflow: 'ellipsis',
                                    //     overflow: 'hidden'
                                    // }}
                                    >{data.referral_link}</p>
                                </div>
                                <div className={styles.mainData__row}>
                                    <p className={styles.mainData__rowText}>Количество рефералов</p>
                                    <p className={styles.mainData__rowText}>{data.referral_count}</p>
                                </div>
                                <div className={styles.mainData__row}>
                                    <p className={styles.mainData__rowText}>Баланс</p>
                                    <p className={styles.mainData__rowText}>{data.bonus_balance}</p>
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
                                <Form
                                    form={form}
                                    layout='vertical'
                                    className={styles.form}
                                    onFinish={submitHandler}
                                >
                                    <Form.Item
                                        name='bonus_amount'
                                        label='Сумма к начислению'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input
                                            placeholder='Введите сумму'
                                            size='large'
                                            type='number'
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name='referral_id'
                                        label='ID реферала'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input
                                            placeholder='Введите id'
                                            size='large'
                                            type='number'
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name='description'
                                        label='Комментарий'
                                        className={`${styles.form__item} ${styles.form__item_wide}`}
                                    // rules={[
                                    //     {required: true}
                                    // ]}
                                    >
                                        <Input.TextArea
                                            placeholder='Напишите что-нибудь'
                                            autosize={{
                                                minRows: 3,
                                                maxRows: 3
                                            }}
                                        />
                                    </Form.Item>
                                    <div className={styles.mainData__inputWrapper}>
                                        <Button
                                            htmlType='submit'
                                            size='large'
                                            type='primary'
                                        >
                                            Отправить
                                        </Button>
                                    </div>
                                </Form>
                            </ConfigProvider>
                        </div>

                        <div className={styles.userHistoryData}>
                            <p className={styles.mainData__title}>История начислений</p>
                            <div className={styles.userHistoryData__userBlock}>
                                {data?.transactions?.transactions_data?.map((_, id) => (
                                    <React.Fragment key={id}>
                                        <div className={styles.userHistoryData__row} key={id}>
                                            <p className={styles.userHistoryData__rowDate}>{moment(_.date).format('DD.MM.YYYY')}</p>
                                        </div>
                                        {
                                            _.transactions_history.map((_, id) => {
                                                return (
                                                    <div className={styles.userHistoryData__row} key={id}>
                                                        <p className={styles.userHistoryData__rowText}>{formatPrice(_.amount, '₽')}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </React.Fragment>
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
                }}
                onClose={() => {
                    setSuccessRefill(false);
                }}
                onCancel={() => {
                    setSuccessRefill(false);
                }}
                message={`Успешно начислено`}
            />
        </main>

    )
}

export default AdminReferalPage;