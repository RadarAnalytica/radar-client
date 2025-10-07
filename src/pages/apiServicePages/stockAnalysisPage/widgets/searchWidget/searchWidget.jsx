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
        setStockAnalysisFilteredData(getFilteredData(searchInputValue.trim(), stockAnalysisData));
    };
    const searchButtonClickHandler = () => {
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
            setStockAnalysisFilteredData(getFilteredData(searchInputValue.trim(), stockAnalysisData));
        }
    }, [stockAnalysisData]);

    return (
        <div className={styles.widget}>
            <div className={styles.widget__searchBlockWrapper}>
                {/* INPUT */}
                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: '#5329FF80 !important'
                        },
                        components: {
                            Input: {
                                activeBg: 'transparent',
                                hoverBg: 'transparent',
                                colorBgContainer: 'transparent',
                            }
                        }
                    }}
                >
                    <Input
                        size='large'
                        placeholder='Поиск по SKU или артикулу'
                        value={searchInputValue}
                        onKeyDown={(e) => inputKeydownHandler(e)}
                        onChange={inputChangeHandler}
                        autoCorrect='off'
                        spellCheck={false}
                        autoComplete='off'
                    />
                </ConfigProvider>
                {/* SEARCH BUTTON */}
                <ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            colorPrimary: '#E7E1FE',
                            colorTextLightSolid: '#5329FF',
                            fontSize: 16,
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
                    >
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9.60353C1.5 5.25398 5.02601 1.72797 9.37556 1.72797C13.7251 1.72797 17.2511 5.25398 17.2511 9.60353C17.2511 13.9531 13.7251 17.4791 9.37556 17.4791C5.02601 17.4791 1.5 13.9531 1.5 9.60353ZM9.37556 0.227966C4.19758 0.227966 0 4.42555 0 9.60353C0 14.7815 4.19758 18.9791 9.37556 18.9791C11.6946 18.9791 13.8169 18.1371 15.4537 16.7423L19.4834 20.772L20.5441 19.7114L16.5143 15.6816C17.9092 14.0449 18.7511 11.9225 18.7511 9.60353C18.7511 4.42555 14.5535 0.227966 9.37556 0.227966Z" fill="#5329FF" />
                        </svg>

                        Найти
                    </Button>
                </ConfigProvider>
            </div>

            <div className={styles.widget__buttonsWrapper}>
                <ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            colorPrimary: '#EFECFE',
                            colorTextLightSolid: '#5329FF',
                            fontSize: 16,
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
                    >
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18.5C4.0293 18.5 0 14.4707 0 9.5C0 4.5293 4.0293 0.5 9 0.5C13.9707 0.5 18 4.5293 18 9.5C18 14.4707 13.9707 18.5 9 18.5ZM9 16.7C10.9096 16.7 12.7409 15.9414 14.0912 14.5912C15.4414 13.2409 16.2 11.4096 16.2 9.5C16.2 7.59044 15.4414 5.75909 14.0912 4.40883C12.7409 3.05857 10.9096 2.3 9 2.3C7.09044 2.3 5.25909 3.05857 3.90883 4.40883C2.55857 5.75909 1.8 7.59044 1.8 9.5C1.8 11.4096 2.55857 13.2409 3.90883 14.5912C5.25909 15.9414 7.09044 16.7 9 16.7ZM9 5.045L13.455 9.5L9 13.955L4.545 9.5L9 5.045ZM9 7.5911L7.0911 9.5L9 11.4089L10.9089 9.5L9 7.5911Z" fill="#5329FF" />
                        </svg>

                        Установить себестоимость
                    </Button>
                </ConfigProvider>

                {/* EXEL DOWNLOAD BUTTON */}
                {user && user.subscription_status !== null && <ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            colorTextLightSolid: 'white',
                            fontSize: 16,
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
                    >
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.9 6.69999H14.4L9 12.1L3.6 6.69999H8.1V0.399994H9.9V6.69999ZM1.8 14.8H16.2V8.49999H18V15.7C18 15.9387 17.9052 16.1676 17.7364 16.3364C17.5676 16.5052 17.3387 16.6 17.1 16.6H0.9C0.661305 16.6 0.432387 16.5052 0.263604 16.3364C0.0948211 16.1676 0 15.9387 0 15.7V8.49999H1.8V14.8Z" fill="white" />
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
