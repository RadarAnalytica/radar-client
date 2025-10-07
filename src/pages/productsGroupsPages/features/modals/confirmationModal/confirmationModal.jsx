import React, { useState, useContext, useEffect } from 'react';
import styles from './confirmationModal.module.css';
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
};

const ConfirmationModal = ({
    open,
    title,
    actionTitle = 'Ok',
    message,
    mainAction,
    returnAction
}) => {
    return (
        <Modal
            footer={null}
            onOk={returnAction}
            onCancel={returnAction}
            onClose={returnAction}
            open={open}
            width={700}
            centered
        >
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <svg width="60" height="60" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60px', heigth: '60px' }}>
                        <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                        <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                    </svg>
                    <p className={styles.modal__title}>{title}</p>
                </div>


                <p className={styles.modal__message}>{message}</p>
                <div className={styles.modal__buttonsWrapper}>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                                fontSize: 18,
                                fontFamily: 'Mulish'
                            },
                            components: {
                                Button: {
                                    colorBorder: '#5329FF',
                                    colorText: '#5329FF',
                                }
                            }
                        }}
                    >
                        <Button
                            variant='outlined'
                            color='#5329FF'
                            className={styles.modal__submitButton}
                            onClick={returnAction}
                        >
                            Отмена
                        </Button>
                    </ConfigProvider>
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
                            onClick={() => { mainAction(); returnAction(); }}
                        >
                            {actionTitle}
                        </Button>
                    </ConfigProvider>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
