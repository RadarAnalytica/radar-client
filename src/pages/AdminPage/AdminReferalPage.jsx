import React, { useState, useContext, useEffect } from 'react';
import styles from './AdminReferalPage.module.css';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';
import Header from '../../components/sharedComponents/header/header';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import { SearchWidget } from './widgets';
import { Input, Button, ConfigProvider, Form, Table } from 'antd';
import { formatPrice } from '../../service/utils';
import SuccessModal from '../../components/sharedComponents/modals/successModal/successModal';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { URL } from '../../service/config';

const initStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

const HISTORY_COLUMNS = [
    { title: 'Дата', dataIndex: 'transaction_date', width: 100 },
    { title: 'ID реферала', dataIndex: 'referral_id', width: 100 },
    { title: 'Сумма', dataIndex: 'bonus_amount', width: 100 },
    { title: 'Админ', dataIndex: 'admin_id', width: 100 },
    { title: 'Тип', dataIndex: 'transaction_type', width: 100 },
    { title: 'Вид', dataIndex: 'transaction_direction', width: 100 },
];

const USER_COLUMNS = [
    { title: 'ID', dataIndex: 'id', width: 100 },
    { title: 'Ссылка', dataIndex: 'referral_link', width: 100 },
    { title: 'Количество', dataIndex: 'referral_count', width: 100 },
    { title: 'Баланс', dataIndex: 'bonus_balance', width: 100 },
];

const fetchUserData = async (token, userId, setStatus, initStatus, setData) => {
    if (!userId) {
        setStatus({ ...initStatus, isError: true, message: 'Пожалуйста введите id пользователя' });
        return;
    }

    setStatus({ ...initStatus, isLoading: true });
    try {
        let res = await fetch(`${URL}/api/admin/referral-system/${userId}/bonuses`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + token
            },
        });

        if (!res.ok) {
            setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' });
            return;
        }

        res = await res.json();
        setStatus({ ...initStatus, isSuccess: true });
        setData(res.data);

    } catch {
        setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' });
    }
};

const accountRefill = async (token, reqData, setStatus, initStatus, setData, setSuccessRefill) => {
    setStatus({ ...initStatus, isLoading: true });
    try {
        let res = await fetch(`${URL}/api/admin/referral-system/bonus/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify(reqData)
        });

        if (!res.ok) {
            const errorData = await res.json();
            setStatus({ ...initStatus, isError: true, message: errorData.detail || 'Не удалось получить данные' });
            return;
        }
        await fetchUserData(token, reqData.referrer_id, setStatus, initStatus, setData);
        setStatus(initStatus);
        setSuccessRefill(true);
    } catch (error) {
        console.error('Error in accountRefill:', error);
        setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' });
    }
};

const AdminReferalPage = () => {

    const { authToken, user } = useContext(AuthContext);
    const [status, setStatus] = useState(initStatus);
    const [data, setData] = useState();
    const [searchInputValue, setSearchInputValue] = useState('');
    const [successRefill, setSuccessRefill] = useState(false);
    const [form] = Form.useForm();
    const location = useLocation();
    const { id } = location.state || {};

    const submitHandler = (fields) => {
        const dataObject = {
            ...fields,
            "referrer_id": data.id,
            "admin_id": user.id,
            "transaction_date": moment().toISOString(),
        };
        accountRefill(authToken, dataObject, setStatus, initStatus, setData, setSuccessRefill);
    };

    useEffect(() => {
        if (id) {
            setSearchInputValue(id);
            fetchUserData(authToken, id, setStatus, initStatus, setData);
        }
    }, [id]);

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

                {data &&
                    <div className={styles.page__dataWrapper}>
                        <div className={styles.mainData}>
                            {/* <p className={styles.mainData__title}>Начислить бонусы</p> */}
                            <div className={styles.mainData__userBlock}>
                                <Table
                                    columns={USER_COLUMNS}
                                    dataSource={[data]}
                                    pagination={false}
                                />
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
                                {data &&
                                    <Table
                                        columns={HISTORY_COLUMNS}
                                        dataSource={data.transactions?.transactions_data?.map(_ => _.transactions_history).flat()}
                                        pagination={false}
                                    />
                                }
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

    );
};

export default AdminReferalPage;
