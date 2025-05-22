import React, { useState, useContext, useEffect } from 'react';
import styles from './groupEditModal.module.css'
import { Modal, Input, ConfigProvider, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../../../service/config';
import AuthContext from '../../../../../service/AuthContext';
import { useAppSelector } from '../../../../../redux/hooks';
import { useAppDispatch } from '../../../../../redux/hooks';
import { fetchShops } from '../../../../../redux/shops/shopsActions';
import { actions as filterActions } from '../../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';

const initDataFetchingStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const GroupEditModal = ({ isEditGroupModalVisible, setIsEditGroupModalVisible, dataFetchingStatus, setDataFetchingStatus }) => {
    const { authToken, user } = useContext(AuthContext)
    const { activeBrand } = useAppSelector((state) => state.filters);
    const { shops } = useAppSelector((state) => state.shopsSlice);
    //const [dataFetchingStatus, setDataFetchingStatus] = useState(initDataFetchingStatus)
    const [inputValue, setInputValue] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const updateGroup = async () => {
        setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true })
        const requestObject = {
            name: inputValue,
        }
        try {
            const res = await fetch(`${URL}/api/product/product_groups/2`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
                body: JSON.stringify(requestObject)
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: parsedData?.detail || 'Что-то пошло не так :(' })
                return;
            }

            const parsedData = await res.json()
            setDataFetchingStatus(initDataFetchingStatus)
            navigate(`/groups/${parsedData.data.id}`)
        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    // ------- Фетч массива магазинов -------------//
    const fetchShopData = async () => {
        try {
            if (user.subscription_status === null) {
                dispatch(fetchShops('mockData'));
            } else {
                dispatch(fetchShops(authToken));
            }
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };
    //---------------------------------------------//

    // 0. Получаем данные магазинов
    useEffect(() => {
        if (!shops || shops.length === 0) {
            fetchShopData();
        }
    }, [shops]);

    // устанавливаем первый магазин как выбранный если выбранного нет
    useEffect(() => {
        if (shops && shops.length > 0 && !activeBrand) {
            dispatch(filterActions.setActiveShop(shops[0]))
        }
    }, [shops, activeBrand]);

    return (
        <Modal
            footer={null}
            onOk={() => setIsEditGroupModalVisible(false)}
            onCancel={() => setIsEditGroupModalVisible(false)}
            onClose={() => setIsEditGroupModalVisible(false)}
            open={isEditGroupModalVisible}
            width={700}
            centered
        >
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="0.5" width="60" height="60" rx="10" fill="#5329FF" fillOpacity="0.15" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.3563 25.5614C17.1285 21.9153 20.0241 18.833 23.6773 18.833H29.3336C30.9904 18.833 32.3336 20.1762 32.3336 21.833C32.3336 22.3853 32.7813 22.833 33.3336 22.833H36.4621C40.0187 22.833 42.8253 25.8494 42.5755 29.3916V31.1663C42.5755 31.2878 42.5539 31.4042 42.5142 31.5118C43.0634 32.4799 43.2132 33.6818 42.7775 34.8493C42.7774 34.8496 42.7773 34.8499 42.7772 34.8502L41.2848 38.8493C41.2653 38.9015 41.2415 38.9519 41.2136 39.0001C40.1154 40.8999 38.0611 42.1663 35.7281 42.1663H24.344C22.0087 42.1663 19.9558 40.8982 18.8585 39.0002C18.3825 38.1769 18.0859 37.2349 18.023 36.2281L17.3563 25.5614ZM24.344 40.1663H35.7281C37.2944 40.1663 38.6794 39.3323 39.4418 38.0675L40.9034 34.1509C40.9035 34.1506 40.9036 34.1503 40.9037 34.15C41.3827 32.8667 40.4337 31.4997 39.0639 31.4997H34.0276C32.3483 31.4997 31.0709 29.9918 31.347 28.3353C31.4199 27.8979 31.0826 27.4997 30.6391 27.4997H26.398C24.3271 27.4997 22.5489 28.9723 22.1631 31.0069L21.8446 32.686L21.8403 32.7075L21.1053 36.1674C20.6678 38.2269 22.2385 40.1663 24.344 40.1663ZM33.3198 28.6641C33.2469 29.1015 33.5842 29.4997 34.0276 29.4997H39.0639C39.6055 29.4997 40.1144 29.6055 40.5755 29.7952V29.3549C40.5755 29.3293 40.5765 29.3037 40.5785 29.2782C40.7629 26.8803 38.867 24.833 36.4621 24.833H33.3336C31.6767 24.833 30.3336 23.4899 30.3336 21.833C30.3336 21.2807 29.8859 20.833 29.3336 20.833H23.6773C21.1778 20.833 19.1965 22.942 19.3524 25.4366L19.8043 32.6667L19.8817 32.3026L20.1981 30.6343C20.763 27.6556 23.3663 25.4997 26.398 25.4997H30.6391C32.3184 25.4997 33.5958 27.0076 33.3198 28.6641Z" fill="#5329FF" />
                    </svg>
                    <p className={styles.modal__title}>Редактирование группы товаров</p>
                </div>
                <div className={styles.modal__inputWrapper}>
                    <label className={styles.modal__inputLabel}>Название</label>
                     <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#d9d9d9'
                            }
                        }}
                    >
                    <Input
                        size='large'
                        className={styles.modal__input}
                        placeholder='Введите название'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    </ConfigProvider>
                </div>


                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            fontSize: 18,
                            fontFamily: 'Mulish'
                        }
                    }}
                >
                    <Button
                        type='primary'
                        className={styles.modal__submitButton}
                        onClick={updateGroup}
                        disabled={!inputValue || !activeBrand}
                        loading={dataFetchingStatus.isLoading}
                    >
                        Редактировать
                    </Button>
                </ConfigProvider>
            </div>
        </Modal>
    )
}

export default GroupEditModal;