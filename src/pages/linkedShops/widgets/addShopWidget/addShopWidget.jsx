import { useState, useEffect } from 'react';
import styles from './addShopWidget.module.css';
import { Button, ConfigProvider, Modal, Form, Input } from 'antd';
import WbIcon from "../../../../assets/WbIcon";
import { addShop } from '../../../../service/api/api';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchFilters } from '../../../../redux/apiServicePagesFiltersState/filterActions';
import { fetchShops } from '../../../../redux/shops/shopsActions';

const initRequestStatus = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const AddShopWidget = ({ authToken, setStatusBarState }) => {
    const dispatch = useAppDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [ addShopRequestStatus, setAddShopRequestStatus ] = useState(initRequestStatus)
    const [form] = Form.useForm()

    const addShopHandler = async (fields) => {
        const addShopData = {
            brandName: fields.name,
            tkn: fields.token,
            authToken
        }
        setAddShopRequestStatus({...initRequestStatus, isLoading: true})
        try {
            let res = await addShop(addShopData)
            if (!res.ok) {
                setAddShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось добавить магазин'})
                return
            }
            setAddShopRequestStatus({...initRequestStatus, isLoading: false, isSuccess: true, message: 'Магазин успешно добавлен'})
        } catch {
            setAddShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось добавить магазин'})
        }
    }


    useEffect(() => {
        if (addShopRequestStatus.isSuccess) {
            form.resetFields()
            setIsModalVisible(false)
            dispatch(fetchFilters(authToken))
            dispatch(fetchShops(authToken))
            setStatusBarState({
                isActive: true,
                type: 'Success',
                message: addShopRequestStatus.message
            })
            setAddShopRequestStatus(initRequestStatus)
        }
        if (addShopRequestStatus.isError) {
            setIsModalVisible(false)
            setStatusBarState({
                isActive: true,
                type: 'Error',
                message: addShopRequestStatus.message
            })
            setAddShopRequestStatus(initRequestStatus)
        }
    }, [addShopRequestStatus])

    return (
        <div className={styles.widget}>
            <div className={styles.widget__header}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="10" fill="#5329FF" fillOpacity="0.15" />
                    <path d="M38.5457 42H19.4548C19.0931 42 18.7463 41.8606 18.4906 41.6124C18.2348 41.3643 18.0912 41.0277 18.0912 40.6767V28.7673H14.0002L28.0825 16.3445C28.3336 16.1228 28.6608 16 29.0002 16C29.3397 16 29.6669 16.1228 29.918 16.3445L44.0002 28.7673H39.9093V40.6767C39.9093 41.0277 39.7657 41.3643 39.5099 41.6124C39.2542 41.8606 38.9074 42 38.5457 42ZM20.8184 39.3535H37.1821V26.3286L29.0002 19.1115L20.8184 26.3286V39.3535ZM23.5457 34.0604H34.4548V36.7069H23.5457V34.0604Z" fill="#5329FF" />
                </svg>
                <p className={styles.widget__title}>Новый магазин</p>
            </div>

            <p className={styles.widget__text}>
                Добавьте новые данные, чтобы отслеживать
                статистику по&nbsp;всем вашим магазинам в&nbsp;одном месте
            </p>

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#5329FF',
                        fontSize: 16,
                    }
                }}
            >
                <Button
                    type='primary'
                    style={{ width: 150, height: 60, fontWeight: 700, marginTop: 16, flexShrink: 0 }}
                    onClick={() => setIsModalVisible(true)}
                >
                    Подключить
                </Button>
            </ConfigProvider>

            {/* add shop modal */}
            <Modal
                open={isModalVisible}
                footer={null}
                width={700}
                centered
                onOk={() => setIsModalVisible(false)}
                onClose={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                closeIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>

                }
            >
                <div className={styles.modal}>
                    <div className={styles.modal__header}>
                        <WbIcon />
                        <p className={styles.modal__title}>Подключение магазина</p>
                    </div>

                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                                fontFamily: 'Mulish'
                            },
                            components: {
                                Form: {
                                    labelFontSize: 18,
                                }
                            }
                        }}
                    >
                        <Form
                            form={form}
                            layout='vertical'
                            className={styles.form}
                            onFinish={addShopHandler}
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
                                                return Promise.reject(new Error('Пожалуйста, заполните это поле!'))
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder='Например: "тестовый"'
                                    size='large'
                                    style={{ height: 55 }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='token'
                                label='Токен'
                                className={styles.form__item}
                                rules={[
                                    { required: true, message: 'Пожалуйста, заполните это поле!' },
                                    () => ({
                                        validator(_, value) {
                                            if (value && !value.trim()) {
                                                return Promise.reject(new Error('Пожалуйста, заполните это поле!'))
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder='Что-то вроде: GJys67G7sbNw178F'
                                    size='large'
                                    style={{ height: 55 }}
                                />
                            </Form.Item>
                            <Button
                                htmlType='submit'
                                type='primary'
                                style={{ height: 63, fontSize: 16, fontWeight: 700, width: '100%', marginTop: 24 }}
                            >
                                Сохранить
                            </Button>
                        </Form>
                    </ConfigProvider>
                </div>
            </Modal>
        </div>
    )
}