import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import InputField from '../components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../service/config';
import ErrorModal from '../components/sharedComponents/modals/errorModal/errorModal';
import SuccessModal from '../components/sharedComponents/modals/successModal/successModal';
import styles from './EmailForReset.module.css';
import { ConfigProvider, Form, Input, Button } from 'antd';

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

const EmailForReset = () => {

    const [requestState, setRequestState] = useState(initRequestStatus);
    const [form] = Form.useForm()


    const submitHandler = async (fields) => {
        setRequestState({ ...initRequestStatus, isLoading: true });
        const {email} = fields;
        try {
            let res = await fetch(`${URL}/api/user/reset`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!res.ok) {
                res = await res.json();
                return setRequestState({ ...initRequestStatus, isError: true, message: res?.detail && typeof (res.detail) === 'string' ? res.detail : 'Что-то пошло не так :(' });
            }
            setRequestState({ ...initRequestStatus, isSuccess: true, message: 'success' });
            form.resetFields();
        } catch (e) {
            console.log(e);
            setRequestState({ ...initRequestStatus, isError: true, message: res.detail || 'Что-то пошло не так :(' });
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6083E7',
                    //controlHeightLG: 60,
                    colorBorder: '#E0EBFF',
                    fontFamily: 'Manrope'
                },
                components: {
                    Form: {
                        labelColor: '#8F8F8F',
                        labelFontSize: 16
                    },
                    Select: {
                        optionFontSize: 14
                    }
                }
            }}
        >
            <Form
                form={form}
                scrollToFirstError
                layout='vertical'
                className={styles.form}
                onFinish={submitHandler}
            >
                <Form.Item
                    className={styles.form__item}
                    name='email'
                    label='E-mail *'
                    rules={[
                        { required: true, message: 'Пожалуйста, заполните это поле!' },
                        { type: 'email', message: 'Пожалуйста, введите корректный email!' },
                    ]}
                >
                    <Input
                        className={styles.form__input}
                        size='large'
                        placeholder='Указанный при регистрации'
                        // disabled={isDemoMode}
                    />
                </Form.Item>

                <ConfigProvider
                    theme={{
                        token: {
                            //controlHeightLG: 68
                        }
                    }}
                >
                    <Button
                        htmlType='submit'
                        type='primary'
                        size='large'
                        className={styles.form__button}
                        loading={requestState.isLoading}
                        disabled={requestState.isError}
                    >
                        Получить ссылку
                    </Button>
                </ConfigProvider>
                <div className={styles.form__textWrapper}>
                    <div className={styles.form__text}>
                        Если у вас ещё нет личного кабинета, <Link to='https://radar-analytica.ru/signup' style={{ color: '#6083E7', textDecoration: 'none' }}>Зарегистрируйтесь</Link>
                    </div>
                    <div className={styles.form__text}>
                        Вспомнили пароль? <Link to='https://radar-analytica.ru/signin' style={{ color: '#6083E7', textDecoration: 'none' }}>Вход</Link>
                    </div>
                </div>
            </Form>

            {/* modal */}
            <ErrorModal
                open={requestState.isError}
                onOk={() => setRequestState(initRequestStatus)}
                onCancel={() => setRequestState(initRequestStatus)}
                onClose={() => setRequestState(initRequestStatus)}
                footer={null}
                message={requestState.message}
            />
            <SuccessModal
                open={requestState.isSuccess}
                onOk={() => { location.href = 'https://radar-analytica.ru/signin'; }}
                onClose={() => { location.href = 'https://radar-analytica.ru/signin'; }}
                onCancel={() => { location.href = 'https://radar-analytica.ru/signin'; }}
                footer={null}
                message={'Ссылка на сброс пароля была направлена на Вашу почту'}
            />
        </ConfigProvider>
    )
}

export default EmailForReset;
