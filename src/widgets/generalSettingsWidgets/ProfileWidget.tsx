import React, { useContext, useState, useEffect } from 'react'
import styles from './ProfileWidget.module.css';
import AuthContext from '@/service/AuthContext';
import TestSub from "@/assets/TestSub.svg";
import CloseIcon from "@/assets/CloseIcon.svg";
import SunIcon from "@/assets/SunIcon.svg";
import moment from "moment";
import "moment/locale/ru";
import { URL } from "@/service/config";
import { useNavigate } from "react-router";
import { Modal, Input, ConfigProvider, Dropdown, Form } from "antd";
import type { MenuProps } from 'antd';
import MobilePlug from "@/components/sharedComponents/mobilePlug/mobilePlug";
import Header from "@/components/sharedComponents/header/header";
import { getDayDeclension } from "@/service/utils";
import { fetchApi } from "@/service/fetchApi";
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import Breadcrumbs from "@/components/sharedComponents/header/headerBreadcrumbs/breadcrumbs";
import SubscriptionModal from "@/components/sharedComponents/modals/subscriptionModal/subscriptionModal";
import { ServiceFunctions } from '@/service/serviceFunctions';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { Link } from 'react-router-dom';

const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: 500,
        controlHeightLG: 38,
        colorError: '#ff4d4f',
        colorErrorBorder: '#ff4d4f',
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            hoverBg: 'white',
            activeShadow: 'transparent',
            activeBg: 'white',
        },
        Form: {
            labelColor: '#1A1A1A',
            labelFontSize: 12,
            verticalLabelPadding: '0 0 8px',
        }
    }
}

const dropdownTheme = {
    token: {
        borderRadiusLG: 8,
        boxShadowSecondary: '0px 4px 16px rgba(0, 0, 0, 0.08)',
    },
    components: {
        Dropdown: {
            paddingBlock: 8,
        }
    }
}

const initStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const ProfileWidget = () => {

    const { user, authToken, fullUserData, refreshUser } = useContext(AuthContext)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const [status, setStatus] = useState(initStatus)
    const { isDemoMode } = useDemoMode()

    useEffect(() => {
        if (fullUserData) {
            setFormData({
                name: fullUserData?.firstname || '',
                email: fullUserData?.email || '',
                phone: fullUserData?.phone || ''
            })
        }
    }, [fullUserData])

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true)
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false)
        // Сброс формы к исходным данным пользователя
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || ''
        })
    }

    const handleOpenChangePasswordModal = () => {
        setIsChangePasswordModalOpen(true)
    }

    const handleCloseChangePasswordModal = () => {
        setIsChangePasswordModalOpen(false)
    }

    const handleSaveChanges = async (values: any) => {
        if (!status.isLoading) {
            setStatus({ ...initStatus, isLoading: true })
        }
        try {
            let res = await ServiceFunctions.updatUser(authToken, values);
            if (!res.ok) {
                setStatus({ ...initStatus, isError: true, message: 'Не удалось обновить данные пользователя' });
                return;
            }
            setStatus({ ...initStatus, isSuccess: true, message: 'Данные успешно обновлены' })
            refreshUser()
        } catch (error) {
            console.error('Ошибка при сохранении:', error)
            setStatus({ ...initStatus, isError: true, message: 'Не удалось обновить данные пользователя' })
        }
    }

    const handleChangePassword = async (values: any) => {
        if (!status.isLoading) {
            setStatus({ ...initStatus, isLoading: true })
        }
        try {
            let res = await ServiceFunctions.updatUserPwd(authToken, values);
            if (!res.ok) {
                setStatus({ ...initStatus, isError: true, message: 'Не удалось обновить данные пользователя' });
                return;
            }
            setStatus({ ...initStatus, isSuccess: true, message: 'Пароль успешно изменен' })
        } catch (error) {
            console.error('Ошибка при сохранении:', error)
            setStatus({ ...initStatus, isError: true, message: 'Не удалось обновить данные пользователя' })
        }
    }

    const handleForgotPassword = () => {
        // Логика для восстановления пароля
        console.log('Восстановление пароля')
    }

    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 0'
                }}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 1.03553L0.292893 11.2426C0.105357 11.4302 0 11.6845 0 11.9497V15.5355C0 16.0878 0.447715 16.5355 1 16.5355H4.58579C4.851 16.5355 5.10536 16.4302 5.29289 16.2426L15.5 6.03554C16.8807 4.65482 16.8807 2.41625 15.5 1.03553C14.1193 -0.345179 11.8807 -0.345178 10.5 1.03553Z" fill="#363538" />
                        <path d="M9 14.7855C8.58579 14.7855 8.25 15.1213 8.25 15.5355C8.25 15.9497 8.58579 16.2855 9 16.2855H16C16.4142 16.2855 16.75 15.9497 16.75 15.5355C16.75 15.1213 16.4142 14.7855 16 14.7855H9Z" fill="#363538" />
                    </svg>

                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Редактировать</span>
                </div>
            ),
            onClick: handleOpenEditModal
        },
        {
            key: 'changePassword',
            label: (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 0'
                }}>
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.25 6.75V4.75C4.25 2.12665 6.37665 0 9 0C11.6234 0 13.75 2.12665 13.75 4.75V6.75H14C16.2091 6.75 18 8.54086 18 10.75V16.75C18 18.9591 16.2091 20.75 14 20.75H4C1.79086 20.75 0 18.9591 0 16.75V10.75C0 8.54086 1.79086 6.75 4 6.75H4.25ZM5.75 4.75C5.75 2.95507 7.20507 1.5 9 1.5C10.7949 1.5 12.25 2.95507 12.25 4.75V6.75H5.75V4.75ZM10 12.75C10 13.0036 9.90559 13.2352 9.75 13.4115V16.75C9.75 17.1642 9.41421 17.5 9 17.5C8.58579 17.5 8.25 17.1642 8.25 16.75V13.4115C8.09441 13.2352 8 13.0036 8 12.75C8 12.1977 8.44771 11.75 9 11.75C9.55229 11.75 10 12.1977 10 12.75Z" fill="#363538" />
                    </svg>

                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Изменить пароль</span>
                </div>
            ),
            onClick: handleOpenChangePasswordModal
        }
    ];

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | undefined;
        if (status.isSuccess) {
            timeout = setTimeout(() => {
                setIsChangePasswordModalOpen(false)
                setIsEditModalOpen(false)
                setStatus(initStatus)
            }, 2000)
        }

        return () => timeout && clearTimeout(timeout)
    }, [status])

    return (
        <>
            <div className={styles.widget__userInfoBlock}>
                <ConfigProvider theme={dropdownTheme}>
                    <Dropdown
                        menu={{ items: menuItems }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <button className={styles.widget__settingsButton}>
                            <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="1.5" cy="1.5" r="1.5" fill="#8C8C8C" />
                                <circle cx="1.5" cy="7.5" r="1.5" fill="#8C8C8C" />
                                <circle cx="1.5" cy="13.5" r="1.5" fill="#8C8C8C" />
                            </svg>
                        </button>
                    </Dropdown>
                </ConfigProvider>
                <div className={styles.widget__userInfoTitleWrapper}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="16" fill="#5329FF" fillOpacity="0.1" />
                        <path d="M16 16C18.7614 16 21 13.7614 21 11C21 8.23858 18.7614 6 16 6C13.2386 6 11 8.23858 11 11C11 13.7614 13.2386 16 16 16Z" fill="#5329FF" />
                        <path d="M16 26C20.4183 26 24 23.9853 24 21.5C24 19.0147 20.4183 17 16 17C11.5817 17 8 19.0147 8 21.5C8 23.9853 11.5817 26 16 26Z" fill="#5329FF" />
                    </svg>
                    {fullUserData?.firstname ?? 'Железный человек'}
                </div>

                <hr style={{ height: '1px', backgroundColor: '#E8E8E8', margin: 0, padding: 0, opacity: '10%' }} />

                <div className={styles.widget__mainInfoBlock}>
                    <div className={styles.widget__mainInfoItem}>
                        <span className={styles.widget__mainInfoTitle}>
                            Телефон
                        </span>
                        <span className={styles.widget__mainInfoValue}>
                            {(!fullUserData?.phone || fullUserData?.phone?.trim() === '+7') ? '—' : fullUserData?.phone}
                        </span>
                    </div>
                    <div className={styles.widget__mainInfoItem}>
                        <span className={styles.widget__mainInfoTitle}>
                            Почта
                        </span>
                        <span className={styles.widget__mainInfoValue}>
                            {user?.email ?? '—'}
                        </span>
                    </div>
                </div>
            </div>

            <EditUserModal
                isEditModalOpen={isEditModalOpen}
                handleCloseEditModal={handleCloseEditModal}
                formData={formData}
                handleSaveChanges={handleSaveChanges}
                status={status}
            />

            <ChangePasswordModal
                isChangePasswordModalOpen={isChangePasswordModalOpen}
                handleCloseChangePasswordModal={handleCloseChangePasswordModal}
                handleChangePassword={handleChangePassword}
                handleForgotPassword={handleForgotPassword}
                status={status}
            />

            {!isDemoMode && <SubscriptonInfo />}

            <ErrorModal
                open={status.isError}
                footer={null}
                onOk={() => setStatus(initStatus)}
                onClose={() => setStatus(initStatus)}
                onCancel={() => setStatus(initStatus)}
                message={status.message}
            />
        </>
    )
}

interface EditUserModalProps {
    isEditModalOpen: boolean;
    handleCloseEditModal: () => void;
    formData: {
        name: string;
        email: string;
        phone: string;
    };
    handleSaveChanges: (values: any) => void;
    status: Record<string, any>
}

const EditUserModal: React.FC<EditUserModalProps> = ({
    isEditModalOpen,
    handleCloseEditModal,
    formData,
    handleSaveChanges,
    status
}) => {
    const [form] = Form.useForm();

    // Обновляем значения формы при изменении formData
    useEffect(() => {
        const formattedData = {
            ...formData,
            phone: formData.phone ? formatPhoneNumber(formData.phone) : '+7 '
        };
        form.setFieldsValue(formattedData);

        return () => {
            form.resetFields()
        }
    }, [formData, form]);

    const handleFinish = (values: any) => {
        handleSaveChanges(values);
    };

    // Функция форматирования телефона
    const formatPhoneNumber = (value: string) => {
        if (!value) return '+7 ';

        // Удаляем все нецифровые символы кроме +
        let phone = value.replace(/[^\d]/g, '');

        // Если начинается с 7 или 8, убираем первую цифру
        if (phone.startsWith('7') || phone.startsWith('8')) {
            phone = phone.slice(1);
        }

        // Ограничиваем количество цифр (максимум 10 после +7)
        phone = phone.slice(0, 10);

        // Форматируем: +7 XXX XXX XX XX
        let formatted = '+7';

        if (phone.length > 0) {
            formatted += ' ' + phone.slice(0, 3);
        }
        if (phone.length > 3) {
            formatted += ' ' + phone.slice(3, 6);
        }
        if (phone.length > 6) {
            formatted += ' ' + phone.slice(6, 8);
        }
        if (phone.length > 8) {
            formatted += ' ' + phone.slice(8, 10);
        }

        return formatted;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        form.setFieldsValue({ phone: formatted });
    };

    return (
        <Modal
            open={isEditModalOpen}
            onCancel={handleCloseEditModal}
            footer={null}
            centered
            width={600}
            closeIcon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                </svg>
            }
            title={<span style={{ fontSize: '22px', fontWeight: 600 }}>Редактировать профиль</span>}
        >
            <ConfigProvider
                theme={inputTheme}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    style={{ marginTop: '24px' }}
                    // requiredMark={false}
                >
                    <Form.Item
                        label={<span style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>Имя пользователя</span>}
                        name="name"
                        rules={[
                            { required: true, message: 'Введите имя пользователя' },
                            { whitespace: true, message: 'Имя не может состоять только из пробелов' }
                        ]}
                        style={{ marginBottom: '20px' }}
                    >
                        <Input
                            placeholder="Введите имя"
                            style={{
                                height: '38px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </Form.Item>

                    {/* <Form.Item
                        label={<span style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>Контактная почта</span>}
                        name="email"
                        style={{ marginBottom: '20px' }}
                    >
                        <Input
                            placeholder="Введите email"
                            disabled
                            type="email"
                            style={{
                                height: '38px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </Form.Item> */}

                    <Form.Item
                        label={<span style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>Телефон</span>}
                        name="phone"
                        rules={[
                            {required: true},
                            {
                                validator: (_, value) => {
                                    if (!value || value === '+7 ') {
                                        return Promise.resolve();
                                    }
                                    // Проверяем, что номер полный (16 символов: +7 XXX XXX XX XX)
                                    const digitsOnly = value.replace(/[^\d]/g, '');
                                    if (digitsOnly.length === 11) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Введите полный номер телефона'));
                                },
                            },
                        ]}
                        style={{ marginBottom: '20px' }}
                    >
                        <Input
                            placeholder="Введите телефон"
                            onChange={handlePhoneChange}
                            onFocus={(e) => {
                                // При фокусе, если поле пустое, устанавливаем +7 
                                if (!e.target.value || e.target.value === '') {
                                    form.setFieldsValue({ phone: '+7 ' });
                                }
                            }}
                            onKeyDown={(e) => {
                                const input = e.target as HTMLInputElement;
                                const cursorPosition = input.selectionStart || 0;

                                // Запрещаем удаление +7 (первые 2 символа)
                                if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 3) {
                                    e.preventDefault();
                                }
                            }}
                            onPaste={(e) => {
                                e.preventDefault();
                                const pastedText = e.clipboardData.getData('text');
                                const formatted = formatPhoneNumber(pastedText);
                                form.setFieldsValue({ phone: formatted });
                            }}
                            maxLength={16}
                            style={{
                                height: '38px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={handleCloseEditModal}
                            style={{
                                flex: '0 0 auto',
                                height: '46px',
                                border: 'none',
                                borderRadius: '8px',
                                background: '#5329FF1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#5329FF',
                                cursor: 'pointer',
                                padding: '0 16px'
                            }}
                        >
                            Отменить
                        </button>
                        <button
                            type="submit"
                            style={{
                                flex: '0 0 auto',
                                height: '46px',
                                border: 'none',
                                borderRadius: '8px',
                                background: '#5329FF',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'white',
                                cursor: 'pointer',
                                padding: '0 16px'
                            }}
                        >
                            Сохранить изменения
                        </button>
                    </div>
                    <div className="">
                        {status.message}
                    </div>
                </Form>
            </ConfigProvider>
        </Modal >
    )
}

interface ChangePasswordModalProps {
    isChangePasswordModalOpen: boolean;
    handleCloseChangePasswordModal: () => void;
    handleChangePassword: (values: any) => void;
    handleForgotPassword: () => void;
    status: Record<string, any>
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
    isChangePasswordModalOpen,
    handleCloseChangePasswordModal,
    handleChangePassword,
    handleForgotPassword,
    status
}) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        handleChangePassword(values);
        form.resetFields();
    };

    useEffect(() => {
        return () => {
            form.resetFields()
        }
    }, [])

    return (
        <Modal
            open={isChangePasswordModalOpen}
            onCancel={handleCloseChangePasswordModal}
            footer={null}
            centered
            width={600}
            closeIcon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                </svg>
            }
            title={<span style={{ fontSize: '22px', fontWeight: 600 }}>Изменить пароль</span>}
        >
            <ConfigProvider
                theme={inputTheme}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    style={{ marginTop: '24px' }}
                    // requiredMark={false}
                >
                    <Form.Item
                        label={<span style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>Текущий пароль</span>}
                        name="password"
                        rules={[
                            { required: true, message: 'Введите текущий пароль' }
                        ]}
                        style={{ marginBottom: '8px' }}
                    >
                        <Input.Password
                            placeholder="Введите текущий пароль"
                            style={{
                                height: '38px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </Form.Item>
                    <Link
                        to='/reset'
                        style={{
                            fontSize: '12px',
                            color: '#5329FF',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            display: 'block',
                            textAlign: 'right',
                            marginBottom: '20px',
                            marginTop: '-4px'
                        }}
                    >
                        Не помню текущий пароль
                    </Link>

                    <Form.Item
                        label={<span style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>Новый пароль</span>}
                        name="new_password"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Введите новый пароль' },
                            { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') !== value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Новый пароль не может совпадать с текущим'));
                                },
                            }),
                        ]}
                        style={{ marginBottom: '20px' }}
                    >
                        <Input.Password
                            placeholder="От 6 знаков, используйте заглавные"
                            style={{
                                height: '38px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>Повторите новый пароль</span>}
                        name="confirm_password"
                        dependencies={['new_password']}
                        rules={[
                            { required: true, message: 'Повторите новый пароль' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('new_password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                        style={{ marginBottom: '20px' }}
                    >
                        <Input.Password
                            placeholder="Повторите"
                            style={{
                                height: '38px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={handleCloseChangePasswordModal}
                            style={{
                                flex: '0 0 auto',
                                height: '46px',
                                border: 'none',
                                borderRadius: '8px',
                                background: '#5329FF1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#5329FF',
                                cursor: 'pointer',
                                padding: '0 16px'
                            }}
                        >
                            Отменить
                        </button>
                        <button
                            type="submit"
                            style={{
                                flex: '0 0 auto',
                                height: '46px',
                                border: 'none',
                                borderRadius: '8px',
                                background: '#5329FF',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'white',
                                cursor: 'pointer',
                                padding: '0 16px'
                            }}
                        >
                            Сохранить изменения
                        </button>
                    </div>
                    <div className="">
                        {status.message}
                    </div>
                </Form>
            </ConfigProvider>
        </Modal >
    )
}


const SubscriptonInfo = () => {
    const navigate = useNavigate();
    const { authToken, user } = useContext(AuthContext);
    const [subscriptions, setSubscriptions] = useState([]);
    const [keepSubscriptionId, setKeepSubscriptionId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isTrialModalActive, setIsTrialModalActive] = useState(false)
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const fetchSubscriptions = async () => {
        const response = await fetchApi('/api/user/subscription/all', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: "JWT " + authToken,
            },
        });
        const data = await response.json();
        setSubscriptions(data);
        return data;
    };

    useEffect(() => {
        const checkSubscriptions = async () => {
            await fetchSubscriptions();
        };

        if (user?.subscription_status === 'expired') {
            navigate('/tariffs');
        } else {
            checkSubscriptions();
        }
    }, []);

    const handleRestoreSubscription = async (subscriptionId) => {
        try {
            const response = await fetchApi(
                `/api/user/subscription/restore/${subscriptionId}`,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        authorization: "JWT " + authToken,
                    },
                }
            );
            const data = await response.json();
            setSubscriptions((prevSubscriptions) =>
                prevSubscriptions.map((sub) =>
                    sub.id === subscriptionId ? { ...sub, active: true } : sub
                )
            );
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancelSubscription = async (subscriptionId) => {
        try {
            const response = await fetchApi(
                `/api/user/subscription/cancel/${subscriptionId}`,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        authorization: "JWT " + authToken,
                    },
                }
            );
            const data = await response.json();
            setSubscriptions((prevSubscriptions) =>
                prevSubscriptions.map((sub) =>
                    sub.id === subscriptionId ? { ...sub, active: false } : sub
                )
            );
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };

    const rejectSubscription = ({ subscriptionId }) => {
        return (
            <div
                className="sub-card-toggle"
                onClick={() => {
                    setOpenModal(true);
                    setKeepSubscriptionId(subscriptionId);
                }}
                style={{ height: 41}}
            >
                <img src={CloseIcon} alt="Close subscription" className="mr-5" />
                <span style={{fontSize: 14}}>Отказаться от подписки</span>
            </div>
        );
    };

    const restoreSubscription = ({ subscriptionId }) => {
        return (
            <div
                style={{ backgroundColor: "#5329FF0D", borderRadius: "8px", display: 'flex', alignItems: 'center', padding: '8px 12px', width: 'max-content' }}
                onClick={() => {
                    handleRestoreSubscription(subscriptionId);
                }}
            >
                <div
                    style={{ cursor: "pointer", display: 'flex', alignItems: 'center', gap: 8 }}
                >
                    <img
                        src={SunIcon}
                        alt="Restore subscription"
                        className="mr-5"
                        style={{ width: 24, height: 24 }}
                    />
                    <span
                        style={{
                            color: "#5329FF",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "25px",
                        }}
                    >
                        Восстановить подписку
                    </span>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={styles.page__subscriptionsList}>
                {Array.isArray(subscriptions) && subscriptions && subscriptions.map((item) => {
                    return (
                        <SubscriptionCard key={item.id} item={item} rejectSubscription={rejectSubscription} restoreSubscription={restoreSubscription} />
                    );
                })}
            </div>

            {/* modals */}
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onOk={() => setOpenModal(false)}
                footer={null}
                centered
                width={600}
                closeIcon={
                    < svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg >
                }
                title={
                    < span className="cancel-subscription-modal" >
                        Вы уверены, что хотите отменить подписку ?
                    </span >
                }
            >
                <div>
                    <span className="cancel-subscription-modal-text">
                        Ваши данные могут быть удалены
                    </span>
                    <div className="button-box">
                        <div className="button-stay" onClick={() => setOpenModal(false)}>
                            Остаться
                        </div>
                        <div
                            className="button-cancel"
                            onClick={() => {
                                handleCancelSubscription(keepSubscriptionId);
                                setOpenModal(false);
                            }}
                        >
                            Отменить подписку
                        </div>
                    </div>
                </div>
            </Modal >
            <SubscriptionModal
                visible={isTrialModalActive}
                visibilityHandler={setIsTrialModalActive}
            />
        </>
    )
}

const SubscriptionCard = ({ item, rejectSubscription, restoreSubscription }) => {
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const activeText = item.active ? "Активна" : "Неактивна";
    const activeColor = item.active ? "#00B69B" : "#808080";
    const activeBgColor = item.active ? "#00B69B1A" : "#A5A5A51A";
    const activeWidth = item.active ? 120 : 140;
    const toggleText = item.active
        ? rejectSubscription({
            subscriptionId: item.id,
        })
        : restoreSubscription({
            subscriptionId: item.id,
        });
    const paymentDateEndString = item.validity_period;
    const paymentDateValue = new Date(Date.parse(paymentDateEndString));
    paymentDateValue.setDate(paymentDateValue.getDate() + 1);
    const paymentDate = `${paymentDateValue.getDate()} ${months[paymentDateValue.getMonth()]} ${paymentDateValue.getFullYear()} года`;

    const activeTillPeriodValue = new Date(Date.parse(paymentDateEndString));
    const activeTillPeriod = `${activeTillPeriodValue.getDate()} ${months[activeTillPeriodValue.getMonth()]} ${activeTillPeriodValue.getFullYear()} года`;


    return (
        <div className={styles.subscriptionCard}>
            <div className={styles.subscriptionCard__header}>
                <div className={styles.subscriptionCard__titleBlock}>
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="60" height="60" rx="8.10135" fill="#5329FF" />
                        <path d="M25.8451 19H22.3146C21.3046 19 20.3812 19.5707 19.9295 20.4741L17.1416 26.0498L22.6954 26.7163L25.8451 19Z" fill="white" />
                        <path d="M17.5731 28.116L25.7709 38.2075L22.5863 28.7175L17.5731 28.116Z" fill="white" />
                        <path d="M31.2227 40.8794C30.4292 41.1327 29.5708 41.1327 28.7772 40.8795L24.7584 28.9037C28.2493 29.1204 31.7504 29.1204 35.2414 28.9037L31.2227 40.8794Z" fill="white" />
                        <path d="M34.229 38.2072L42.4266 28.116L37.4134 28.7175L34.229 38.2072Z" fill="white" />
                        <path d="M42.8581 26.0498L40.0702 20.4741C39.6185 19.5707 38.6952 19 37.6851 19H34.1549L37.3043 26.7163L42.8581 26.0498Z" fill="white" />
                        <path d="M31.9947 19H28.0052L24.7802 26.9012C28.2565 27.1213 31.7433 27.1213 35.2196 26.9012L31.9947 19Z" fill="white" />
                    </svg>

                    <div className={styles.subscriptionCard__titleWrapper}>
                        <p className={styles.subscriptionCard__title}>
                            {item.plan_name ?? 'Подписка'}
                        </p>
                        <span style={{ fontSize: '14px' }}>Действует до {activeTillPeriod}</span>
                    </div>

                </div>
                <StatusInfo
                    title={activeText}
                    fill={activeColor}
                    width={activeWidth}
                    bg={activeBgColor}
                />
            </div>

            {!item.is_trial &&
                <>
                    <p className={styles.subscriptionCard__paymentDate}>Следующее списание средств {paymentDate}</p>
                    <div className={styles.subscriptionCard__footer}>
                        {toggleText}
                    </div>
                </>
            }

        </div>
    );
};

const StatusInfo = ({ title, fill, width, bg }) => {
    return (
        <div style={{ fontSize: '14px', background: bg, height: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', borderRadius: 8, alignSelf: 'flex-start' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: fill }}></div>
            {title}
        </div>
    );
};