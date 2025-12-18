import { useEffect, useContext, useState, useMemo, useRef } from 'react';
import styles from './linkedShops.module.css';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchShops } from '@/redux/shops/shopsActions';
import AuthContext from '@/service/AuthContext';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { GeneralLayout } from '@/shared';
import { RadarShopCard } from '@/features';
import { Input, Form, Button, ConfigProvider, Modal, InputNumber } from 'antd';
import { addShop } from '../../service/api/api';
import WbIcon from "../../assets/WbIcon";
import { Link, useLocation } from 'react-router-dom';
import { editShop } from '@/redux/editShop/editShopActions';
import { deleteShop } from '@/redux/deleteShop/deleteShopActions';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';

const initRequestStatus = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

const LinkedShopsPage = () => {
    const { isDemoMode } = useDemoMode();
    const { authToken } = useContext(AuthContext);
    const location = useLocation();
    const isFirstMount = useRef(true);
    const [statusBarState, setStatusBarState] = useState({
        type: '',
        message: '',
        isActive: false
    });
    const [addAndEditModalState, setAddAndEditModalState] = useState<{ type: 'edit' | 'add' | 'delete' | 'tax', shop?: Record<string, any> } | null>(null);
    const [addShopRequestStatus, setAddShopRequestStatus] = useState(initRequestStatus);
    const [taxModalOpen, setTaxModalOpen] = useState(false);
    const [taxValue, setTaxValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const shops = useAppSelector((state) => state.shopsSlice.shops);

    const addOrEditSubmitHandler = async (fields) => {
        setAddShopRequestStatus({ ...initRequestStatus, isLoading: true })
        if (addAndEditModalState?.type === 'add' && fields) {
            const addShopData = {
                brandName: fields.name,
                tkn: fields.token,
                authToken
            };
            try {
                let res = await addShop(addShopData);
                if (!res.ok) {
                    res = await res.json();
                    //@ts-ignore
                    setAddShopRequestStatus({ ...initRequestStatus, isLoading: false, isError: true, message: res.message || 'Не удалось добавить магазин' });
                    return;
                }
                setAddShopRequestStatus({ ...initRequestStatus, isLoading: false, isSuccess: true, message: 'Магазин успешно добавлен' });
            } catch {
                setAddShopRequestStatus({ ...initRequestStatus, isLoading: false, isError: true, message: 'Что-то пошло не так :(' });
            }
        }
        if (addAndEditModalState?.type === 'edit' && addAndEditModalState?.shop && fields) {
            const editData = {
                shopId: addAndEditModalState.shop.id,
                name: fields.name,
                shopToken: fields.token,
                authToken
            };
            //@ts-ignore
            dispatch(editShop({ editData, setAddShopRequestStatus, initRequestStatus }));
        }
        if (addAndEditModalState?.type === 'delete' && addAndEditModalState?.shop) {
            const deleteShopData = {
                shop: addAndEditModalState?.shop,
                authToken
            };
            //@ts-ignore
            dispatch(deleteShop({ deleteShopData, setAddShopRequestStatus, initRequestStatus }));
        }
        if (addAndEditModalState?.type === 'tax' && addAndEditModalState?.shop && fields) {
            // логика добавления налога здесь
            setAddShopRequestStatus({ ...initRequestStatus, isLoading: false, isSuccess: true, message: 'Налог успешно установлен' });
        }

    }


    useEffect(() => {
        // View Transition при входе на страницу
        if (isFirstMount.current && document.startViewTransition) {
            isFirstMount.current = false;
            const transition = document.startViewTransition(() => {
                // View Transition запущен
            });
        } else if (isFirstMount.current) {
            isFirstMount.current = false;
        }
        (!shops || shops.length === 0) && dispatch(fetchShops(authToken));
    }, [location.pathname]);


    useEffect(() => {
        if (addShopRequestStatus.isSuccess) {
            dispatch(fetchShops(authToken))
            //@ts-ignore
            dispatch(fetchFilters(authToken));
            setAddShopRequestStatus(initRequestStatus);
        }
    }, [addShopRequestStatus]);

    return (
        <GeneralLayout
            headerProps={{
                title: 'Подключенные магазины',
                hasShadow: false
            }}
        >
            {isDemoMode && <NoSubscriptionWarningBlock />}

            <div className={styles.page__layout}>
                {shops && shops.length > 0 && [...shops].sort((a, b) => a.id - b.id).map((shop) => (
                    <div 
                        key={shop.id} 
                        className={styles.shopCardWrapper}
                        style={{
                            '--shop-id': `shop-card-${shop.id}`
                        } as React.CSSProperties}
                    >
                        <RadarShopCard
                            shop={shop}
                            editButtonAction={() => setAddAndEditModalState({ type: 'edit', shop })}
                            deleteButtonAction={() => setAddAndEditModalState({ type: 'delete', shop })}
                            setTaxAction={() => setAddAndEditModalState({ type: 'tax', shop })}
                        />
                    </div>
                ))}
                <div className={`${styles.addShopBlock} ${styles.addShopBlock_animated}`}>
                    <div className={styles.addShopBlock__header}>
                        <svg width="46" height="46" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="60" height="60" rx="10" fill="#5329FF" fillOpacity="0.15" />
                            <path d="M38.5457 42H19.4548C19.0931 42 18.7463 41.8606 18.4906 41.6124C18.2348 41.3643 18.0912 41.0277 18.0912 40.6767V28.7673H14.0002L28.0825 16.3445C28.3336 16.1228 28.6608 16 29.0002 16C29.3397 16 29.6669 16.1228 29.918 16.3445L44.0002 28.7673H39.9093V40.6767C39.9093 41.0277 39.7657 41.3643 39.5099 41.6124C39.2542 41.8606 38.9074 42 38.5457 42ZM20.8184 39.3535H37.1821V26.3286L29.0002 19.1115L20.8184 26.3286V39.3535ZM23.5457 34.0604H34.4548V36.7069H23.5457V34.0604Z" fill="#5329FF" />
                        </svg>
                        <p className={styles.addShopBlock__title}>Новый магазин</p>
                    </div>

                    {/* <p className={styles.addShopBlock__text}>
                Добавьте новые данные, чтобы отслеживать
                статистику по&nbsp;всем вашим магазинам в&nbsp;одном месте
            </p> */}
                    <div className={styles.addShopBlock__decorativeWrapper}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                    fontSize: 14,
                                }
                            }}
                        >
                            <Button
                                type='primary'
                                style={{ height: 46, fontWeight: 700, flexShrink: 0, padding: '0 16px', width: 'max-content' }}
                                onClick={() => setAddAndEditModalState({ type: 'add' })}
                                disabled={isDemoMode}
                                title={isDemoMode && 'Функция доступна для пользователей с подпиской'}
                            >
                                Подключить
                            </Button>
                        </ConfigProvider>
                    </div>
                </div>
            </div>

            {statusBarState.isActive &&
                <div className={styles.page__statusBar}>
                    {statusBarState.type === 'Success' &&
                        <div className={styles.page__iconWrapper}>
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                <rect width="60" height="60" rx="12" fill="#00B69B" fillOpacity="0.1" />
                                <path d="M26.6248 35.8244L43.4153 19L46 21.5878L26.6248 41L15 29.353L17.5829 26.7652L26.6248 35.8244Z" fill="#00B69B" />
                            </svg>
                        </div>
                    }
                    {statusBarState.type === 'Error' &&
                        <div className={styles.page__iconWrapper}>
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                <rect width="60" height="60" rx="12" fill="#F93C65" fillOpacity="0.1" />
                                <path d="M28.5828 35.5887L27 18H33.25L31.6672 35.5887H28.5828ZM27.2841 43V38.0709H32.9659V43H27.2841Z" fill="#F93C65" />
                            </svg>
                        </div>
                    }
                    {statusBarState.message}
                </div>
            }

            {/* edit and add shop modal */}
            <EditAndCreateModal
                setAddAndEditModalState={setAddAndEditModalState}
                addAndEditModalState={addAndEditModalState}
                addShopRequestStatus={addShopRequestStatus}
                submitHandler={addOrEditSubmitHandler}
            />

            {/* delete modal */}

            {/* Tax setup modal */}
            <TaxSetupModal
                 setAddAndEditModalState={setAddAndEditModalState}
                 addAndEditModalState={addAndEditModalState}
                 addShopRequestStatus={addShopRequestStatus}
                 submitHandler={addOrEditSubmitHandler}
            />

        </GeneralLayout>
    );
};

export default LinkedShopsPage;




const EditAndCreateModal = ({
    setAddAndEditModalState,
    addAndEditModalState,
    addShopRequestStatus,
    submitHandler

}) => {
    const [form] = Form.useForm();

    const modalTitle = useMemo(() => {
        if (!addAndEditModalState) return ''
        if (addAndEditModalState?.type === 'add') return 'Подключение магазина'
        if (addAndEditModalState?.type === 'edit') return 'Редактирование магазина'
        if (addAndEditModalState?.type === 'delete') return 'Удаление магазина'
        return ''
    }, [addAndEditModalState])

    useEffect(() => {
        if (addAndEditModalState?.type === 'edit' && addAndEditModalState?.shop) {
            form.setFieldValue('name', addAndEditModalState.shop.brand_name)
        }
    }, [addAndEditModalState])

    useEffect(() => {
        if (addShopRequestStatus.isSuccess) {
            form.resetFields();
            setAddAndEditModalState(null);
        }
    }, [addShopRequestStatus]);

    return (
        <ConfigProvider
            theme={{
                token: {
                },
                components: {
                    Modal: {
                        borderRadiusLG: 20,
                    }
                }
            }}
        >
            <Modal
                open={addAndEditModalState && addAndEditModalState.type !== 'tax'}
                closeIcon={
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                }
                footer={null}
                width={600}
                centered
                destroyOnHidden
                onOk={() => { setAddAndEditModalState(null); form.resetFields(); }}
                onCancel={() => { setAddAndEditModalState(null); form.resetFields(); }}
            >
                <div className={styles.modal}>
                    <div className={styles.modal__header}>
                        <WbIcon />
                        <p className={styles.modal__title}>{modalTitle}</p>
                    </div>

                    {addAndEditModalState?.type !== 'delete' &&
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                    fontFamily: 'Mulish',
                                    fontSize: 12
                                },
                                components: {
                                    Form: {
                                        labelFontSize: 12,
                                    },
                                    Input: {
                                        activeBorderColor: '#5329FF1A',
                                        hoverBorderColor: '#5329FF1A',
                                        //@ts-ignore
                                        activeOutlineColor: 'transparent',
                                        activeShadow: 'transparent',
                                        controlHeight: 38,
                                        controlHeightLG: 38,
                                        colorBorder: '#5329FF1A',

                                    },
                                    Button: {
                                        controlHeightLG: 46,
                                    }
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
                                    name='name'
                                    label='Название магазина'
                                    className={styles.form__item}
                                    rules={[
                                        { required: true, message: 'Пожалуйста, заполните это поле!' },
                                        () => ({
                                            validator(_, value) {
                                                if (value && !value.trim()) {
                                                    return Promise.reject(new Error('Пожалуйста, заполните это поле!'));
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <Input
                                        placeholder='Например: "тестовый"'
                                        size='large'
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='token'
                                    label='Токен'
                                    className={styles.form__item}
                                    rules={[
                                        { required: addAndEditModalState?.type === 'add', message: 'Пожалуйста, заполните это поле!' },
                                        () => ({
                                            validator(_, value) {
                                                if (value && !value.trim()) {
                                                    return Promise.reject(new Error('Пожалуйста, заполните это поле корректно!'));
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <Input
                                        placeholder='Что-то вроде: GJys67G7sbNw178F'
                                        size='large'
                                    />
                                </Form.Item>
                                <div className={styles.addShopBlock__buttonHelper}>
                                    <Link to='https://radar.usedocs.com/article/79862' target='_blank'>Где найти токен?</Link>
                                </div>

                                <div className={styles.addShopBlock__buttonsWrapper}>
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorPrimary: '#5329FF',
                                                fontSize: 14,
                                                //@ts-ignore
                                                fontWeight: 600,
                                                fontFamily: 'Mulish',
                                                borderRadius: 8,
                                                controlHeight: 46
                                            },
                                            components: {
                                                Button: {
                                                    paddingInline: 24,
                                                    paddingBlock: 16,
                                                    colorBorder: 'transparent',
                                                    //@ts-ignore
                                                    colorBorderHover: 'transparent',
                                                    colorBgContainer: '#F3EEFF',
                                                    colorBgContainerHover: '#E9E1FF',
                                                    colorText: '#5329FF',
                                                    colorTextHover: '#5329FF',
                                                    defaultShadow: 'none',
                                                    boxShadow: 'none',
                                                    controlHeight: 46
                                                },
                                            },
                                        }}
                                    >
                                        <Button
                                            type='default'
                                            size='large'
                                            style={{ fontSize: 14, fontWeight: 600 }}
                                            onClick={() => { setAddAndEditModalState(null); form.resetFields(); }}
                                        >
                                            Отменить
                                        </Button>
                                    </ConfigProvider>
                                    <Button
                                        htmlType='submit'
                                        type='primary'
                                        style={{ fontSize: 14, height: 46, fontWeight: 600, width: 'max-content', padding: '0 16px', alignSelf: 'flex end', borderRadius: '8px' }}
                                        disabled={addShopRequestStatus.isError}
                                        loading={addShopRequestStatus.isLoading}
                                    >
                                        Добавить
                                    </Button>
                                </div>
                                {addShopRequestStatus.isError &&
                                    <div
                                        style={{ color: '#F93C65', fontSize: 14, fontWeight: 500, lineHeight: '100%' }}

                                    >
                                        {addShopRequestStatus.message}
                                    </div>
                                }

                            </Form>
                        </ConfigProvider>
                    }
                    {addAndEditModalState?.type === 'delete' &&
                        <>
                            <p className={styles.deleteModal__text}>Вы действительно хотите удалить магазин?</p>
                            <div className={styles.addShopBlock__buttonsWrapper}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF',
                                            fontSize: 14,
                                            //@ts-ignore
                                            fontWeight: 600,
                                            fontFamily: 'Mulish',
                                            borderRadius: 8,
                                            controlHeight: 46
                                        },
                                        components: {
                                            Button: {
                                                paddingInline: 24,
                                                paddingBlock: 16,
                                                colorBorder: 'transparent',
                                                //@ts-ignore
                                                colorBorderHover: 'transparent',
                                                colorBgContainer: '#F3EEFF',
                                                colorBgContainerHover: '#E9E1FF',
                                                colorText: '#5329FF',
                                                colorTextHover: '#5329FF',
                                                defaultShadow: 'none',
                                                boxShadow: 'none',
                                                controlHeightLG: 46
                                            },
                                        },
                                    }}
                                >
                                    <Button
                                        type='default'
                                        size='large'
                                        style={{ fontSize: 14, fontWeight: 600 }}
                                        onClick={() => { setAddAndEditModalState(null) }}
                                    >
                                        Отменить
                                    </Button>
                                </ConfigProvider>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#F93C65',
                                            fontSize: 14,
                                            //@ts-ignore
                                            fontWeight: 600,
                                            fontFamily: 'Mulish',
                                            borderRadius: 8,
                                            controlHeight: 46
                                        },
                                        components: {
                                            Button: {
                                                paddingInline: 24,
                                                paddingBlock: 16,
                                                colorBorder: 'transparent',
                                                //@ts-ignore
                                                colorBorderHover: 'transparent',
                                                colorBgContainer: '#F3EEFF',
                                                colorBgContainerHover: '#E9E1FF',
                                                colorText: '#5329FF',
                                                colorTextHover: '#5329FF',
                                                defaultShadow: 'none',
                                                boxShadow: 'none',
                                                controlHeightLG: 46
                                            },
                                        },
                                    }}
                                >
                                    <Button
                                        size='large'
                                        type='primary'
                                        style={{ fontSize: 14, height: 46, fontWeight: 600, width: 'max-content', padding: '0 16px', alignSelf: 'flex end', borderRadius: '10px' }}
                                        disabled={addShopRequestStatus.isError}
                                        loading={addShopRequestStatus.isLoading}
                                        onClick={() => submitHandler()}
                                    >
                                        Удалить
                                    </Button>
                                </ConfigProvider>
                            </div>
                            {addShopRequestStatus.isError &&
                                <div
                                    style={{ color: '#F93C65', fontSize: 14, fontWeight: 500, lineHeight: '100%' }}

                                >
                                    {addShopRequestStatus.message}
                                </div>
                            }
                        </>
                    }
                </div>
            </Modal>
        </ConfigProvider>
    )
}

const TaxSetupModal = ({  
    setAddAndEditModalState,
    addAndEditModalState,
    addShopRequestStatus,
    submitHandler 
}) => {
    const [form] = Form.useForm();

    
    useEffect(() => {
        if (addAndEditModalState?.type === 'tax' && addAndEditModalState.shop) {
            form.setFieldValue('tax', addAndEditModalState?.shop?.tax);
        } else {
            form.resetFields();
        }
    }, [addAndEditModalState]);

    return (
        <ConfigProvider
            theme={{
                token: {},
                components: {
                    Modal: {
                        borderRadiusLG: 20,
                    }
                }
            }}
        >
            <Modal
                open={addAndEditModalState && addAndEditModalState?.type === 'tax'}
                closeIcon={
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                }
                footer={null}
                width={600}
                centered
                destroyOnHidden
                onCancel={() => { setAddAndEditModalState(null); form.resetFields(); }}
            >
                <div className={styles.taxModal}>
                    <div className={styles.taxModal__header}>
                        <h2 className={styles.taxModal__title}>Установка налога</h2>
                    </div>
                    
                    <p className={styles.taxModal__description}>
                        Введите процент налога, который наша система будет удерживать в расчетах от ваших показателей
                    </p>

                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                                fontFamily: 'Mulish',
                                fontSize: 12
                            },
                            components: {
                                Form: {
                                    labelFontSize: 12,
                                },
                                Input: {
                                    activeBorderColor: '#5329FF1A',
                                    hoverBorderColor: '#5329FF1A',
                                    //@ts-ignore
                                    activeOutlineColor: 'transparent',
                                    activeShadow: 'transparent',
                                    controlHeight: 38,
                                    controlHeightLG: 38,
                                    colorBorder: '#5329FF1A',

                                },
                                Button: {
                                    controlHeightLG: 46,
                                }
                            }
                        }}
                    >
                        <Form
                            form={form}
                            layout='vertical'
                            className={styles.taxModal__form}
                            onFinish={submitHandler}
                        >
                            <Form.Item
                                name='tax'
                                label='Налог'
                                className={styles.taxModal__formItem}
                                rules={[
                                    { required: true, message: 'Пожалуйста, введите процент налога!' },
                                    () => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.resolve();
                                            }
                                            if (!/^\d+$/.test(value.toString())) {
                                                return Promise.reject(new Error('Разрешён ввод только цифр!'));
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder='Например, 6'
                                    size='large'
                                    style={{ width: '100%' }}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </Form.Item>

                            <div className={styles.taxModal__buttonsWrapper}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF',
                                            fontSize: 14,
                                            //@ts-ignore
                                            fontWeight: 600,
                                            fontFamily: 'Mulish',
                                            borderRadius: 8,
                                            controlHeight: 46
                                        },
                                        components: {
                                            Button: {
                                                paddingInline: 24,
                                                paddingBlock: 16,
                                                colorBorder: 'transparent',
                                                //@ts-ignore
                                                colorBorderHover: 'transparent',
                                                colorBgContainer: '#F3EEFF',
                                                colorBgContainerHover: '#E9E1FF',
                                                colorText: '#5329FF',
                                                colorTextHover: '#5329FF',
                                                defaultShadow: 'none',
                                                boxShadow: 'none',
                                                controlHeight: 46
                                            },
                                        },
                                    }}
                                >
                                    <Button
                                        type='default'
                                        size='large'
                                        style={{ fontSize: 14, fontWeight: 600 }}
                                        onClick={() => { setAddAndEditModalState(null); form.resetFields(); }}
                                    >
                                        Отменить
                                    </Button>
                                </ConfigProvider>
                                <Button
                                    htmlType='submit'
                                    type='primary'
                                    style={{ fontSize: 14, height: 46, fontWeight: 600, width: 'max-content', padding: '0 16px', alignSelf: 'flex end', borderRadius: '8px' }}
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </Form>
                    </ConfigProvider>
                </div>
            </Modal>
        </ConfigProvider>
    );
};