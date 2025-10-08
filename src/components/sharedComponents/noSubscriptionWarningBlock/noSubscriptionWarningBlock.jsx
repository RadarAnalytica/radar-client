import React, { useState, useContext, useEffect } from 'react';
import styles from './nuSubscriptionWarningBlock.module.css';
import AuthContext from '@/service/AuthContext';
import { getDayDeclension } from '@/service/utils';
import { URL } from '@/service/config';
import { Button, ConfigProvider } from 'antd';
import ErrorModal from '../modals/errorModal/errorModal';
import { useDemoMode } from '@/app/providers/DemoDataProvider';

const INIT_REQUEST_STATUS = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

const NoSubscriptionWarningBlock = ({ className = '' }) => {
    const { user, authToken, logout } = useContext(AuthContext);
    const [requestStatus, setRequestStatus] = useState(INIT_REQUEST_STATUS);
    const { isDemoUser } = useDemoMode();

    const testPeriodActivation = async () => {
        setRequestStatus({ ...INIT_REQUEST_STATUS, isLoading: true });
        try {
            let response = await fetch(`${URL}/api/user/subscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'JWT ' + authToken,
                },
                body: JSON.stringify({
                    ...user,
                    test: true
                })
            });

            if (!response.ok) {
                setRequestStatus({ ...INIT_REQUEST_STATUS, isError: true, message: 'Не удалось активировать тестовый период' });
                return;
            }

            setRequestStatus({ ...INIT_REQUEST_STATUS, isSuccess: true, message: 'Тестовый период активирован' });
            return;

        } catch (error) {
            console.error(error);
            setRequestStatus({ ...INIT_REQUEST_STATUS, isError: true, message: error.message });
        }
    };

    useEffect(() => {
        if (requestStatus.isSuccess) {
            setTimeout(() => {
                setRequestStatus({ ...INIT_REQUEST_STATUS });
            }, 2000);
        }
    }, [requestStatus.isSuccess]);

    const regularBlock = (
        <div className={`${styles.block} ${className}`}>
            <div className={styles.block__column}>
                <div className={styles.block__titleWrapper}>
                    <div className={styles.block__iconWrapper}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.3033 12.8089L17.5701 12.1289L18.3033 12.8089ZM11.2322 5.73783L11.9122 6.47103L11.2322 5.73783ZM21.6606 4.27232L22.6522 4.402L21.6606 4.27232ZM19.7688 2.38046L19.8985 3.37202L19.7688 2.38046ZM6.4941 12.6506L7.392 13.0908L6.4941 12.6506ZM11.3905 17.547L10.9503 16.6491L11.3905 17.547ZM5.20674 17.8674C5.59726 17.4769 5.59727 16.8437 5.20674 16.4532C4.81622 16.0627 4.18305 16.0627 3.79253 16.4532L5.20674 17.8674ZM0.9641 19.2816C0.573576 19.6722 0.573576 20.3053 0.9641 20.6958C1.35462 21.0864 1.98779 21.0864 2.37831 20.6958L0.9641 19.2816ZM7.32806 19.9887C7.71858 19.5982 7.71858 18.965 7.32806 18.5745C6.93754 18.184 6.30437 18.184 5.91385 18.5745L7.32806 19.9887ZM4.49963 19.9887C4.10911 20.3793 4.10911 21.0124 4.49963 21.4029C4.89016 21.7935 5.52332 21.7935 5.91385 21.4029L4.49963 19.9887ZM10.5958 21.082L11.5858 20.9406L11.5858 20.9406L10.5958 21.082ZM15.7577 17.6172L16.7477 17.4758L15.7577 17.6172ZM2.95907 13.4453L3.10049 12.4553L3.10049 12.4553L2.95907 13.4453ZM6.42389 8.2834L6.28247 9.27335L6.28247 9.27335L6.42389 8.2834ZM9.92676 16.4532L7.5879 14.1143L6.17369 15.5286L8.51254 17.8674L9.92676 16.4532ZM17.5701 12.1289C15.7103 14.1341 12.6724 15.8048 10.9503 16.6491L11.8307 18.4449C13.5735 17.5905 16.906 15.786 19.0365 13.4889L17.5701 12.1289ZM7.392 13.0908C8.23627 11.3687 9.90696 8.33084 11.9122 6.47103L10.5522 5.00464C8.25509 7.13512 6.45061 10.4676 5.5962 12.2104L7.392 13.0908ZM20.6691 4.14264C20.366 6.46004 19.5653 9.97761 17.5701 12.1289L19.0365 13.4889C21.4892 10.8444 22.3429 6.76695 22.6522 4.402L20.6691 4.14264ZM11.9122 6.47103C14.0635 4.4758 17.5811 3.6751 19.8985 3.37202L19.6391 1.38891C17.2742 1.69821 13.1967 2.55195 10.5522 5.00464L11.9122 6.47103ZM22.6522 4.402C22.8846 2.62531 21.4158 1.15654 19.6391 1.38891L19.8985 3.37202C20.3726 3.31001 20.7311 3.6685 20.6691 4.14264L22.6522 4.402ZM7.5879 14.1143C7.29549 13.8219 7.23366 13.4138 7.392 13.0908L5.5962 12.2104C5.03802 13.349 5.31513 14.67 6.17369 15.5286L7.5879 14.1143ZM8.51254 17.8674C9.3711 18.726 10.6921 19.0031 11.8307 18.4449L10.9503 16.6491C10.6273 16.8074 10.2192 16.7456 9.92676 16.4532L8.51254 17.8674ZM3.79253 16.4532L0.9641 19.2816L2.37831 20.6958L5.20674 17.8674L3.79253 16.4532ZM5.91385 18.5745L4.49963 19.9887L5.91385 21.4029L7.32806 19.9887L5.91385 18.5745ZM13 6.79845C11.8284 7.97003 11.8284 9.86952 13 11.0411L14.4142 9.62688C14.0237 9.23635 14.0237 8.60319 14.4142 8.21267L13 6.79845ZM13 11.0411C14.1716 12.2127 16.0711 12.2127 17.2426 11.0411L15.8284 9.62688C15.4379 10.0174 14.8047 10.0174 14.4142 9.62688L13 11.0411ZM17.2426 11.0411C18.4142 9.86952 18.4142 7.97003 17.2426 6.79845L15.8284 8.21267C16.219 8.60319 16.219 9.23636 15.8284 9.62688L17.2426 11.0411ZM17.2426 6.79845C16.0711 5.62688 14.1716 5.62688 13 6.79845L14.4142 8.21267C14.8047 7.82214 15.4379 7.82214 15.8284 8.21267L17.2426 6.79845ZM14.7678 17.7586L11.5858 20.9406L13 22.3548L16.182 19.1728L14.7678 17.7586ZM11.5858 20.9406L11.1615 17.9707L9.18163 18.2536L9.60589 21.2234L11.5858 20.9406ZM14.4849 15.7787L14.7678 17.7586L16.7477 17.4758L16.4648 15.4959L14.4849 15.7787ZM11.5858 20.9406L9.60589 21.2234C9.83897 22.855 11.8346 23.5202 13 22.3548L11.5858 20.9406ZM16.182 19.1728C16.6271 18.7277 16.8367 18.099 16.7477 17.4758L14.7678 17.7586L14.7678 17.7586L16.182 19.1728ZM4.86825 7.85913L1.68627 11.0411L3.10049 12.4553L6.28247 9.27335L4.86825 7.85913ZM2.81765 14.4352L5.78749 14.8595L6.07034 12.8796L3.10049 12.4553L2.81765 14.4352ZM8.54521 7.57629L6.56531 7.29345L6.28247 9.27335L8.26237 9.55619L8.54521 7.57629ZM1.68627 11.0411C0.520897 12.2065 1.18612 14.2022 2.81765 14.4352L3.10049 12.4553L3.10049 12.4553L1.68627 11.0411ZM6.28247 9.27335L6.56531 7.29345C5.94212 7.20442 5.31339 7.414 4.86825 7.85913L6.28247 9.27335Z" fill="#5329FF" />
                        </svg>
                    </div>
                    <p className={styles.block__title}>Добро пожаловать в сервис Радар-Аналитика!</p>
                </div>

                <p className={`${styles.block__text} mb-0`}>
                    <b>У вас еще нет активной подписки,</b> а в сервисе представлены лишь тестовые данные для демонстрации функционала.
                </p>

                <div className={styles.block__columnFooter}>
                    <div className={styles.block__footerIconWrapper}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <p className={styles.block__subtext}>
                        Обязательно пройдитесь по всем разделам, чтобы увидеть, какие возможности доступны для работы с финансами и бизнес-показателями.
                    </p>
                </div>
            </div>

            <div className={`${styles.block__column} ${styles.block__column_right}`}>
                <p className={styles.block__text}>
                    Чтобы подключить свой магазин и работать уже <b>с реальными данными, активируйте тестовый период.</b> <span>У вас будет {user.test_days ? getDayDeclension(user.test_days.toString()) : '3 дня'}, чтобы изучить функционал сервиса и убедиться в его удобстве.</span> Желаем удачи!
                </p>

                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                        }
                    }}
                >
                    <Button
                        className={styles.block__actionButton}
                        onClick={testPeriodActivation}
                        size='large'
                        type='primary'
                        style={{
                            height: 64
                        }}
                        loading={requestStatus.isLoading}
                    >
                        {!requestStatus.isSuccess && `Активировать тестовый период – ${user.test_days ? getDayDeclension(user.test_days.toString()) : '3 дня'}`}
                        {requestStatus.isSuccess && requestStatus.message}
                    </Button>
                </ConfigProvider>
            </div>

            <ErrorModal
                footer={null}
                open={requestStatus.isError}
                onOk={() => setRequestStatus({ ...INIT_REQUEST_STATUS })}
                onClose={() => setRequestStatus({ ...INIT_REQUEST_STATUS })}
                onCancel={() => setRequestStatus({ ...INIT_REQUEST_STATUS })}
                message={requestStatus.message}
            />
        </div>
    );

    const demoUserBlock = (
        <div className={`${styles.demoUserBlock} ${className}`}>
            <div className={styles.block__column}>
                <div className={styles.demoUserBlock__welcomeBlock}>
                    <div className={styles.demoUserBlock__iconWrapper}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.3033 12.8089L17.5701 12.1289L18.3033 12.8089ZM11.2322 5.73783L11.9122 6.47103L11.2322 5.73783ZM21.6606 4.27232L22.6522 4.402L21.6606 4.27232ZM19.7688 2.38046L19.8985 3.37202L19.7688 2.38046ZM6.4941 12.6506L7.392 13.0908L6.4941 12.6506ZM11.3905 17.547L10.9503 16.6491L11.3905 17.547ZM5.20674 17.8674C5.59726 17.4769 5.59727 16.8437 5.20674 16.4532C4.81622 16.0627 4.18305 16.0627 3.79253 16.4532L5.20674 17.8674ZM0.9641 19.2816C0.573576 19.6722 0.573576 20.3053 0.9641 20.6958C1.35462 21.0864 1.98779 21.0864 2.37831 20.6958L0.9641 19.2816ZM7.32806 19.9887C7.71858 19.5982 7.71858 18.965 7.32806 18.5745C6.93754 18.184 6.30437 18.184 5.91385 18.5745L7.32806 19.9887ZM4.49963 19.9887C4.10911 20.3793 4.10911 21.0124 4.49963 21.4029C4.89016 21.7935 5.52332 21.7935 5.91385 21.4029L4.49963 19.9887ZM10.5958 21.082L11.5858 20.9406L11.5858 20.9406L10.5958 21.082ZM15.7577 17.6172L16.7477 17.4758L15.7577 17.6172ZM2.95907 13.4453L3.10049 12.4553L3.10049 12.4553L2.95907 13.4453ZM6.42389 8.2834L6.28247 9.27335L6.28247 9.27335L6.42389 8.2834ZM9.92676 16.4532L7.5879 14.1143L6.17369 15.5286L8.51254 17.8674L9.92676 16.4532ZM17.5701 12.1289C15.7103 14.1341 12.6724 15.8048 10.9503 16.6491L11.8307 18.4449C13.5735 17.5905 16.906 15.786 19.0365 13.4889L17.5701 12.1289ZM7.392 13.0908C8.23627 11.3687 9.90696 8.33084 11.9122 6.47103L10.5522 5.00464C8.25509 7.13512 6.45061 10.4676 5.5962 12.2104L7.392 13.0908ZM20.6691 4.14264C20.366 6.46004 19.5653 9.97761 17.5701 12.1289L19.0365 13.4889C21.4892 10.8444 22.3429 6.76695 22.6522 4.402L20.6691 4.14264ZM11.9122 6.47103C14.0635 4.4758 17.5811 3.6751 19.8985 3.37202L19.6391 1.38891C17.2742 1.69821 13.1967 2.55195 10.5522 5.00464L11.9122 6.47103ZM22.6522 4.402C22.8846 2.62531 21.4158 1.15654 19.6391 1.38891L19.8985 3.37202C20.3726 3.31001 20.7311 3.6685 20.6691 4.14264L22.6522 4.402ZM7.5879 14.1143C7.29549 13.8219 7.23366 13.4138 7.392 13.0908L5.5962 12.2104C5.03802 13.349 5.31513 14.67 6.17369 15.5286L7.5879 14.1143ZM8.51254 17.8674C9.3711 18.726 10.6921 19.0031 11.8307 18.4449L10.9503 16.6491C10.6273 16.8074 10.2192 16.7456 9.92676 16.4532L8.51254 17.8674ZM3.79253 16.4532L0.9641 19.2816L2.37831 20.6958L5.20674 17.8674L3.79253 16.4532ZM5.91385 18.5745L4.49963 19.9887L5.91385 21.4029L7.32806 19.9887L5.91385 18.5745ZM13 6.79845C11.8284 7.97003 11.8284 9.86952 13 11.0411L14.4142 9.62688C14.0237 9.23635 14.0237 8.60319 14.4142 8.21267L13 6.79845ZM13 11.0411C14.1716 12.2127 16.0711 12.2127 17.2426 11.0411L15.8284 9.62688C15.4379 10.0174 14.8047 10.0174 14.4142 9.62688L13 11.0411ZM17.2426 11.0411C18.4142 9.86952 18.4142 7.97003 17.2426 6.79845L15.8284 8.21267C16.219 8.60319 16.219 9.23636 15.8284 9.62688L17.2426 11.0411ZM17.2426 6.79845C16.0711 5.62688 14.1716 5.62688 13 6.79845L14.4142 8.21267C14.8047 7.82214 15.4379 7.82214 15.8284 8.21267L17.2426 6.79845ZM14.7678 17.7586L11.5858 20.9406L13 22.3548L16.182 19.1728L14.7678 17.7586ZM11.5858 20.9406L11.1615 17.9707L9.18163 18.2536L9.60589 21.2234L11.5858 20.9406ZM14.4849 15.7787L14.7678 17.7586L16.7477 17.4758L16.4648 15.4959L14.4849 15.7787ZM11.5858 20.9406L9.60589 21.2234C9.83897 22.855 11.8346 23.5202 13 22.3548L11.5858 20.9406ZM16.182 19.1728C16.6271 18.7277 16.8367 18.099 16.7477 17.4758L14.7678 17.7586L14.7678 17.7586L16.182 19.1728ZM4.86825 7.85913L1.68627 11.0411L3.10049 12.4553L6.28247 9.27335L4.86825 7.85913ZM2.81765 14.4352L5.78749 14.8595L6.07034 12.8796L3.10049 12.4553L2.81765 14.4352ZM8.54521 7.57629L6.56531 7.29345L6.28247 9.27335L8.26237 9.55619L8.54521 7.57629ZM1.68627 11.0411C0.520897 12.2065 1.18612 14.2022 2.81765 14.4352L3.10049 12.4553L3.10049 12.4553L1.68627 11.0411ZM6.28247 9.27335L6.56531 7.29345C5.94212 7.20442 5.31339 7.414 4.86825 7.85913L6.28247 9.27335Z" fill="#5329FF" />
                        </svg>
                    </div>
                    <div className={styles.demoUserBlock__welcomeTitle}>
                        <p className={styles.demoUserBlock__title}>Добро пожаловать в сервис Радар-Аналитика!</p>
                        <p className={styles.demoUserBlock__text}>
                            Пока у вас нет активной подписки, и доступны лишь тестовые данные для демонстрации функционала
                        </p>

                        <div className={styles.demoUserBlock__columnFooter}>
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_15589_68256)"> <path d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z" stroke="#5329FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g> <defs> <clipPath id="clip0_15589_68256"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </svg>
                            </div>
                            <p className={styles.block__subtext}>
                                Обязательно загляните во все разделы, чтобы оценить функционал
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.block__column} ${styles.demoUserBlock__column_right}`}>
                <p className={styles.block__text}>
                    Подключите магазин и активируйте 3-дневный тест, чтобы работать с реальными данными и оценить удобство сервиса.
                </p>

                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                        }
                    }}
                >
                    <Button
                        className={styles.block__actionButton}
                        onClick={logout}
                        size='large'
                        type='primary'
                        style={{
                            height: 52,
                            width: '100%',
                        }}
                        loading={requestStatus.isLoading}
                    >
                        {!requestStatus.isSuccess && `Активировать тестовый период – ${user.test_days ? getDayDeclension(user.test_days.toString()) : '3 дня'}`}
                        {requestStatus.isSuccess && requestStatus.message}
                    </Button>
                </ConfigProvider>
            </div>

            <ErrorModal
                footer={null}
                open={requestStatus.isError}
                onOk={() => setRequestStatus({ ...INIT_REQUEST_STATUS })}
                onClose={() => setRequestStatus({ ...INIT_REQUEST_STATUS })}
                onCancel={() => setRequestStatus({ ...INIT_REQUEST_STATUS })}
                message={requestStatus.message}
            />
        </div>
    );

    return isDemoUser ? demoUserBlock : regularBlock;
};
export default NoSubscriptionWarningBlock;
