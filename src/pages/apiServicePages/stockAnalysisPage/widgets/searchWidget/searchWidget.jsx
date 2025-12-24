import React, { useState, useContext, useEffect } from 'react';
import styles from './searchWidget.module.css';
import { Input, ConfigProvider, Button } from 'antd';
import { getFilteredData } from '../../shared';
import DragDropFile from '../../../../../components/DragAndDropFiles';
import Modal from "react-bootstrap/Modal";
import { saveFileClickHandler, getFileClickHandler } from '../../../../../service/getSaveFile';
import AuthContext from '../../../../../service/AuthContext';
import { useAppSelector } from '../../../../../redux/hooks';
import { ServiceFunctions } from '../../../../../service/serviceFunctions';
import { fileDownload } from '../../../../../service/utils';
import { useNavigate } from 'react-router-dom';

const SearchWidget = ({ stockAnalysisData, setStockAnalysisFilteredData, filters }) => {

    const { authToken, user } = useContext(AuthContext);
    const { activeBrand, selectedRange } = useAppSelector(store => store.filters);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [isSelfCostModalVisible, setIsSelfCostModalVisible] = useState(false);
    const [isExelLoading, setIsExelLoading] = useState(false);
    const [file, setFile] = useState(); // это видимо загрузка файла себестоимости
    const navigate = useNavigate();

    const inputKeydownHandler = (e) => {
        if (e && e.key !== 'Enter') return;
        console.log('SA stockAnalysisData filtered', getFilteredData(searchInputValue.trim(), stockAnalysisData));
        setStockAnalysisFilteredData(getFilteredData(searchInputValue.trim(), stockAnalysisData));
    };
    const searchButtonClickHandler = () => {
        console.log('SA stockAnalysisData filtered', getFilteredData(searchInputValue.trim(), stockAnalysisData));
        setStockAnalysisFilteredData(getFilteredData(searchInputValue.trim(), stockAnalysisData));
    };
    const inputChangeHandler = (e) => {
        if (e.target.value === '') {
            setStockAnalysisFilteredData(stockAnalysisData);
        }
        setSearchInputValue(e.target.value);
        // const regex = /^[a-zA-Zа-яА-Я0-9\s]*$/;
        // if (regex.test(e.target.value)) {
        //     setSearchInputValue(e.target.value)
        // }
    };

    const getProdAnalyticXlsxHandler = async () => {
        setIsExelLoading(true);
        const fileBlob = await ServiceFunctions.getProdAnalyticXlsx(
            authToken,
            selectedRange,
            activeBrand.id,
            filters
        );
        fileDownload(fileBlob, "Товарная_аналитика.xlsx", setIsExelLoading);
    };

    useEffect(() => {
        if (stockAnalysisData && searchInputValue) {
            console.log('SA stockAnalysisData filtered', getFilteredData(searchInputValue.trim(), stockAnalysisData));
            setStockAnalysisFilteredData([...getFilteredData(searchInputValue.trim(), stockAnalysisData)]);
        }
    }, [stockAnalysisData]);

    return (
        <div className={styles.widget}>
            <div className={styles.widget__searchBlockWrapper}>
                {/* INPUT */}
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Manrope',
                            fontSize: 12,
                            fontWeight: 500,
                            controlHeightLG: 38,
                        },
                        components: {
                            Input: {
                                activeBorderColor: '#5329FF1A',
                                hoverBorderColor: '#5329FF1A',
                                activeOutlineColor: 'transparent',
                                activeBg: 'transparent',
                                hoverBg: 'transparent',
                                activeBg: 'transparent',
                                activeShadow: 'transparent',
                                activeBg: 'white',
                            }
                        }
                    }}
                >
                    <Input
                        prefix={
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.12793 0C14.1687 0.000149462 18.2549 4.08714 18.2549 9.12793C18.2548 11.3852 17.4328 13.4488 16.0752 15.042L20 18.9678L19.4834 19.4834L18.9678 20L15.042 16.0752C13.4488 17.4328 11.3852 18.2548 9.12793 18.2549C4.08714 18.2549 0.000149459 14.1687 0 9.12793C0 4.08705 4.08705 0 9.12793 0ZM9.12793 1.46094C4.89354 1.46094 1.46094 4.89354 1.46094 9.12793C1.46109 13.3622 4.89363 16.7949 9.12793 16.7949C13.3621 16.7948 16.7948 13.3621 16.7949 9.12793C16.7949 4.89363 13.3622 1.46109 9.12793 1.46094Z" fill="#8C8C8C" />
                            </svg>
                        }
                        size='large'
                        placeholder='Поиск по SKU или артикулу'
                        value={searchInputValue}
                        onKeyDown={(e) => inputKeydownHandler(e)}
                        onChange={inputChangeHandler}
                        autoCorrect='off'
                        spellCheck={false}
                        autoComplete='off'
                        allowClear={{
                            clearIcon: (<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.71991 0.556763C9.01281 0.263923 9.48758 0.263887 9.78046 0.556763C10.0732 0.849645 10.0733 1.32444 9.78046 1.61731L6.39764 5.00012L9.78046 8.38293C10.0732 8.67584 10.0733 9.15064 9.78046 9.44348C9.48761 9.73633 9.01281 9.73623 8.71991 9.44348L5.3371 6.06067L1.95428 9.44348C1.66143 9.73627 1.18662 9.73621 0.893738 9.44348C0.600915 9.1506 0.600915 8.67581 0.893738 8.38293L4.27655 5.00012L0.893738 1.61731C0.600845 1.32442 0.600845 0.849656 0.893738 0.556763C1.18663 0.26387 1.66139 0.263869 1.95428 0.556763L5.3371 3.93958L8.71991 0.556763Z" fill="#8C8C8C" />
                            </svg>)
                        }}
                    />
                </ConfigProvider>
                 {/* SEARCH BUTTON */}
                 <ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            colorPrimary: '#EFECFE',
                            colorTextLightSolid: '#5329FF',
                            fontSize: 12,
                            controlHeightLG: 38,
                            fontWeight: 600,
                        },
                        Button: {
                            defaultShadow: 'none',
                            primaryShadow: 'none'
                        }
                    }}
                >
                    <Button
                        type='primary'
                        size='large'
                        onClick={searchButtonClickHandler}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            fontWeight: 600,
                            lineHeight: '16px',
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9.60353C1.5 5.25398 5.02601 1.72797 9.37556 1.72797C13.7251 1.72797 17.2511 5.25398 17.2511 9.60353C17.2511 13.9531 13.7251 17.4791 9.37556 17.4791C5.02601 17.4791 1.5 13.9531 1.5 9.60353ZM9.37556 0.227966C4.19758 0.227966 0 4.42555 0 9.60353C0 14.7815 4.19758 18.9791 9.37556 18.9791C11.6946 18.9791 13.8169 18.1371 15.4537 16.7423L19.4834 20.772L20.5441 19.7114L16.5143 15.6816C17.9092 14.0449 18.7511 11.9225 18.7511 9.60353C18.7511 4.42555 14.5535 0.227966 9.37556 0.227966Z" fill="#5329FF" />
                        </svg>
                        Найти
                    </Button>
                </ConfigProvider>
            </div>

            <div className={styles.widget__buttonsWrapper}>
                {/* Скрыто 16.10.25 по Просьбе Вовы */}
                {/* <ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            colorPrimary: '#EFECFE',
                            colorTextLightSolid: '#5329FF',
                            fontSize: 12,
                            controlHeightLG: 38,
                            fontWeight: 600,
                        },
                        Button: {
                            defaultShadow: 'none',
                            primaryShadow: 'none'
                        }
                    }}
                >
                    <Button
                        type='primary'
                        size='large'
                        onClick={() => navigate('/selfcost')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            fontWeight: 600,
                        }}
                    >
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18.5C4.0293 18.5 0 14.4707 0 9.5C0 4.5293 4.0293 0.5 9 0.5C13.9707 0.5 18 4.5293 18 9.5C18 14.4707 13.9707 18.5 9 18.5ZM9 16.7C10.9096 16.7 12.7409 15.9414 14.0912 14.5912C15.4414 13.2409 16.2 11.4096 16.2 9.5C16.2 7.59044 15.4414 5.75909 14.0912 4.40883C12.7409 3.05857 10.9096 2.3 9 2.3C7.09044 2.3 5.25909 3.05857 3.90883 4.40883C2.55857 5.75909 1.8 7.59044 1.8 9.5C1.8 11.4096 2.55857 13.2409 3.90883 14.5912C5.25909 15.9414 7.09044 16.7 9 16.7ZM9 5.045L13.455 9.5L9 13.955L4.545 9.5L9 5.045ZM9 7.5911L7.0911 9.5L9 11.4089L10.9089 9.5L9 7.5911Z" fill="#5329FF" />
                        </svg>
                        Установить себестоимость
                    </Button>
                </ConfigProvider> */}

                {/* EXEL DOWNLOAD BUTTON */}
                {user && user.subscription_status !== null && <ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            colorTextLightSolid: 'white',
                            fontSize: 12,
                            controlHeightLG: 38,
                            fontWeight: 600,
                        },
                        Button: {
                            defaultShadow: 'none',
                            primaryShadow: 'none'
                        }
                    }}
                >
                    <Button
                        type='primary'
                        size='large'
                        loading={isExelLoading}
                        onClick={getProdAnalyticXlsxHandler}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            fontWeight: 600,
                        }}
                    >
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99967 5.5625C8.37937 5.5625 8.68717 5.8703 8.68717 6.25V10.0902L9.34687 9.43053C9.61536 9.16205 10.0507 9.16205 10.3191 9.43053C10.5876 9.69902 10.5876 10.1343 10.3191 10.4028L8.48581 12.2361C8.41989 12.3021 8.34393 12.3518 8.26284 12.3853C8.18178 12.4189 8.09289 12.4375 7.99967 12.4375C7.90646 12.4375 7.81757 12.4189 7.73651 12.3853C7.65542 12.3518 7.57945 12.3021 7.51354 12.2361L5.6802 10.4028C5.41172 10.1343 5.41172 9.69902 5.6802 9.43053C5.94869 9.16205 6.38399 9.16205 6.65248 9.43053L7.31217 10.0902L7.31217 6.25C7.31217 5.8703 7.61998 5.5625 7.99967 5.5625Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.895508 4.41667C0.895508 2.01193 2.84493 0.0625 5.24967 0.0625H9.23089C10.3857 0.0625 11.4932 0.521241 12.3098 1.33781L13.8285 2.85659C14.6451 3.67316 15.1038 4.78065 15.1038 5.93545V13.5833C15.1038 15.9881 13.1544 17.9375 10.7497 17.9375H5.24967C2.84493 17.9375 0.895508 15.9881 0.895508 13.5833V4.41667ZM5.24967 1.4375C3.60433 1.4375 2.27051 2.77132 2.27051 4.41667V13.5833C2.27051 15.2287 3.60433 16.5625 5.24967 16.5625H10.7497C12.395 16.5625 13.7288 15.2287 13.7288 13.5833V5.93545C13.7288 5.14533 13.415 4.38756 12.8563 3.82886L11.3375 2.31008C10.7788 1.75138 10.021 1.4375 9.23089 1.4375H5.24967Z" fill="white" />
                        </svg>

                        Скачать Excel
                    </Button>
                </ConfigProvider>}
            </div>

            <Modal
                show={isSelfCostModalVisible}
                onHide={() => setIsSelfCostModalVisible(false)}
                className="add-token-modal"
            >
                <Modal.Header closeButton>
                    <div className="d-flex align-items-center gap-2">
                        <div style={{ width: "100%" }}>
                            <div className="d-flex justify-content-between">
                                <h4 className="fw-bold mb-0">Установка себестоимости товара</h4>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {file ? (
                        <div>
                            <div className="d-flex align-items-center justify-content-between w-100 mt-2 gap-2">
                                <div className="d-flex gap-2">
                                    <svg
                                        width="17"
                                        height="23"
                                        viewBox="0 0 17 23"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14 21.75H3C1.75736 21.75 0.75 20.7426 0.75 19.5V3.5C0.75 2.25736 1.75736 1.25 3 1.25H10.8588L16.25 6.32405V19.5C16.25 20.7426 15.2426 21.75 14 21.75Z"
                                            stroke="black"
                                            strokeOpacity="0.5"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                    <span>{file ? file.name : ""}</span>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="link"
                                        onClick={() => setFile(null)}
                                        style={{ color: "red", cursor: "pointer" }}
                                    >
                                        Удалить
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center w-100 mt-2 gap-2">
                                <button
                                    onClick={() => {
                                        saveFileClickHandler(file, authToken, activeBrand.id);
                                        setFile(null);
                                        setIsSelfCostModalVisible(false);
                                    }}
                                    className="prime-btn"
                                    style={{ height: "52px" }}
                                >
                                    Сохранить
                                </button>
                            </div>
                            <div className="d-flex justify-content-center w-100 mt-2 gap-2">
                                <a href="#" className="link" onClick={() => setIsSelfCostModalVisible(false)}>
                                    Отмена
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-around w-100">
                            <DragDropFile files={file} setFiles={setFile} />
                            <div className="d-flex justify-content-center w-100 mt-2 gap-2">
                                <a
                                    href="#"
                                    className="link"
                                    onClick={() => getFileClickHandler(authToken, activeBrand.id)}
                                >
                                    Скачать шаблон
                                </a>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SearchWidget;
