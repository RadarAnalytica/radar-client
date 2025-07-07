import { useState, useEffect } from 'react'
import styles from './shopCardWidget.module.css'
import WbIcon from '../../../../assets/WbIcon'
import moment from 'moment'
import { Modal, Button, ConfigProvider, Form, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { deleteShop } from '../../../../redux/deleteShop/deleteShopActions'
import { editShop } from '../../../../redux/editShop/editShopActions'
import { fetchFilters } from '../../../../redux/apiServicePagesFiltersState/filterActions'
import { fetchShops } from '../../../../redux/shops/shopsActions'
import { useAppDispatch } from '../../../../redux/hooks'



/**
 * 
brand_name
: 
"JuliaShine111"
id
: 
88
is_active
: 
true
is_primary_collect
: 
true
is_self_cost_set
: 
false
is_valid
: 
false
updated_at
: 
"2025-05-15 20:10:33.174770"
 */

const getShopStatus = (isActive, isValid, isPrimaryCollect) => {
    if (isActive && isValid && isPrimaryCollect) {
        return (
            <div className={`${styles.widget__shopStatusIcon} ${styles.widget__shopStatusIcon_active}`}>
                Активен
            </div>
        )
    }
    if (isActive && isValid && !isPrimaryCollect) {
        return (
            <div className={`${styles.widget__shopStatusIcon} ${styles.widget__shopStatusIcon_loading}`}>
                Сбор данных
            </div>
        )
    }
    if (isActive && !isValid) {
        return (
            <div className={`${styles.widget__shopStatusIcon} ${styles.widget__shopStatusIcon_error}`}>
                Ошибка
            </div>
        )
    }
}
const getShopSelfCostStatus = (is_self_cost_set) => {
    if (is_self_cost_set) {
        return (
            <div className={`${styles.widget__shopStatusIcon} ${styles.widget__shopStatusIcon_active}`}>
                Установлена
            </div>
        )
    }
    if (!is_self_cost_set) {
        return (
            <div className={`${styles.widget__shopStatusIcon} ${styles.widget__shopStatusIcon_error}`}>
                Не установлена
            </div>
        )
    }
}

const initRequestStatus = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}


export const ShopCardWidget = ({ shop, authToken, setStatusBarState }) => {
    const dispatch = useAppDispatch();
    const [ deleteModalVisible, setDeleteModalVisible ] = useState(false)
    const [ editModalVisible, setEditModalVisible ] = useState(false)
    const [ deleteShopRequestStatus, setDeleteShopRequestStatus ] = useState(initRequestStatus)
    const [ editShopRequestStatus, setEditShopRequestStatus ] = useState(initRequestStatus)
    const [form] = Form.useForm()


    const deleteShopHandler = async () => {
        const deleteShopData = {
            shop,
            authToken
        }
        dispatch(deleteShop({deleteShopData, setDeleteShopRequestStatus, initRequestStatus}));
    }

    const editShopHandler = (fields) => {
        const editData = {
            shopId: shop.id,
            name: fields.name,
            shopToken: fields.shopToken,
            authToken
        }
        dispatch(editShop({editData, setEditShopRequestStatus, initRequestStatus }));
    }

    useEffect(() => {
        if (deleteShopRequestStatus.isSuccess) {
            dispatch(fetchShops(authToken))
            dispatch(fetchFilters(authToken));
            setStatusBarState({
                isActive: true,
                type: 'Success',
                message: deleteShopRequestStatus.message
            })
            setDeleteShopRequestStatus(initRequestStatus)
            setDeleteModalVisible(false)
        }
        if (deleteShopRequestStatus.isError) {
            setStatusBarState({
                isActive: true,
                type: 'Error',
                message: deleteShopRequestStatus.message
            })
            setDeleteShopRequestStatus(initRequestStatus)
            setDeleteModalVisible(false)
        }
        if (editShopRequestStatus.isSuccess) {
            form.resetFields()
            dispatch(fetchShops(authToken))
            dispatch(fetchFilters(authToken));
            setStatusBarState({
                isActive: true,
                type: 'Success',
                message: editShopRequestStatus.message
            })
            setEditShopRequestStatus(initRequestStatus)
            setEditModalVisible(false)
        }
        if (editShopRequestStatus.isError) {
            setStatusBarState({
                isActive: true,
                type: 'Error',
                message: editShopRequestStatus.message
            })
            setEditShopRequestStatus(initRequestStatus)
            setEditModalVisible(false)
        }
    }, [deleteShopRequestStatus, editShopRequestStatus])

    return (
        <div className={styles.widget}>
            {/* header */}
            <div className={styles.widget__header}>
                <WbIcon />
                <div className={styles.widget__titleWrapper}>
                    <p className={styles.widget__title}>{shop.brand_name}</p>
                    <p className={styles.widget__subtitle}>Последнее обновление: {moment(shop.updated_at).format('DD.MM.YYYY HH:mm')}</p>
                </div>
            </div>

            {/* controls */}
            <div className={styles.widget__controls}>
                <button className={`${styles.widget__controlButton} ${styles.widget__controlButton_edit}`} onClick={() => setEditModalVisible(true)} disabled={!shop.is_primary_collect && shop.is_active && shop.is_valid}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.94 12.036C3.707 12.66 3.51 13.236 3.334 13.819C4.294 13.122 5.435 12.68 6.752 12.515C9.265 12.201 11.498 10.542 12.628 8.457L11.172 7.002L12.585 5.587L13.585 4.586C14.015 4.156 14.5 3.362 15.013 2.218C9.42 3.085 5.995 6.51 3.939 12.036H3.94ZM14 7.001L15 8C14 11 11 14 7 14.5C4.331 14.834 2.664 16.667 1.998 20H0C1 14 3 0 18 0C17 2.997 16.002 4.996 15.003 5.997L14 7.001Z" fill="#5329FF" />
                    </svg>
                    Редактировать
                </button>
                <button className={`${styles.widget__controlButton} ${styles.widget__controlButton_delete}`} onClick={() => setDeleteModalVisible(true)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6H18V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V6ZM4 8V18H16V8H4ZM7 10H9V16H7V10ZM11 10H13V16H11V10ZM5 3V1C5 0.734784 5.10536 0.48043 5.29289 0.292893C5.48043 0.105357 5.73478 0 6 0H14C14.2652 0 14.5196 0.105357 14.7071 0.292893C14.8946 0.48043 15 0.734784 15 1V3H20V5H0V3H5ZM7 2V3H13V2H7Z" fill="#F93C65" />
                    </svg>
                    Удалить
                </button>
            </div>

            {/* footer */}
            <div className={styles.widget__footer}>
                {getShopStatus(shop.is_active, shop.is_valid)}
            </div>


            {/* end of the card */}




            {/* modals */}
            {/* delete shop confirmation */}
            <Modal
                footer={null}
                open={deleteModalVisible}
                onOk={() => setDeleteModalVisible(false)}
                onClose={() => setDeleteModalVisible(false)}
                onCancel={() => setDeleteModalVisible(false)}
                closeIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>

                }
            >
                <div className={styles.deleteModal}>
                    <div className={styles.deleteModal__header}>
                        <WbIcon />
                        Удаление магазина
                    </div>
                    <p className={styles.deleteModal__text}>Вы действительно хотите удалить магазин {shop.brand_name}?</p>
                    <div className={styles.deleteModal__footer}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                }
                            }}
                        >
                            <Button
                                type='primary'
                                size='large'
                                style={{ fontWeight: 700, height: 60 }}
                                loading={deleteShopRequestStatus.isLoading}
                                onClick={() => setDeleteModalVisible(false)}
                            >
                                Отменить
                            </Button>
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#F93C65',
                                }
                            }}
                        >
                            <Button
                                type='primary'
                                size='large'
                                style={{ fontWeight: 700, height: 60 }}
                                onClick={() => deleteShopHandler()}
                                loading={deleteShopRequestStatus.isLoading}
                            >
                                Удалить
                            </Button>
                        </ConfigProvider>
                    </div>
                </div>
            </Modal>



            {/* edit modal */}
            <Modal
                open={editModalVisible}
                footer={null}
                width={700}
                centered
                onOk={() => {setEditModalVisible(false); form.resetFields()}}
                onClose={() => {setEditModalVisible(false); form.resetFields()}}
                onCancel={() => {setEditModalVisible(false); form.resetFields()}}
                closeIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>

                }
            >
                <div className={styles.modal}>
                    <div className={styles.modal__header}>
                        <WbIcon />
                        <p className={styles.modal__title}>Редактирование магазина</p>
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
                            onFinish={editShopHandler}
                            initialValues={{
                                name: shop.brand_name
                            }}
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
                                name='shopToken'
                                label='Токен'
                                className={styles.form__item}
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && !value.trim()) {
                                                return Promise.reject(new Error('Пожалуйста, заполните поле корректно!!'))
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
                            <div className={styles.modal__selfCostBlock}>
                                Себестоимость
                                <div className={styles.modal__ssControls}>
                                    {getShopSelfCostStatus(shop.is_self_cost_set)}
                                    <Link
                                        to='/selfcost'
                                        target='_blank'
                                        className={styles.modal__ssLink}
                                    >
                                        Изменить
                                    </Link>
                                </div>
                            </div>
                            <Button
                                htmlType='submit'
                                type='primary'
                                loading={editShopRequestStatus.isLoading}
                                style={{ height: 63, fontSize: 16, fontWeight: 700, width: '100%', marginTop: 4 }}
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