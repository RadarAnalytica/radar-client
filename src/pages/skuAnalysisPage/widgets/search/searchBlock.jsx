import React, { useState, useRef, useEffect } from 'react';
import styles from './searchBlock.module.css';
import { Input, ConfigProvider, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { actions as skuAnalysisActions } from '../../../../redux/skuAnalysis/skuAnalysisSlice';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';


const requestInitState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

const SearchBlock = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [requestStatus, setRequestStatus] = useState(requestInitState);
    const { skuSearchHistory } = useAppSelector(store => store.skuAnalysis);
    const navigate = useNavigate();


    const historyButtonClickHandler = (e) => {
        const { id } = e.target;
        setInputValue(id);
        navigate(`/sku-analysis/${id}`);
    };

    const searchSubmitHandler = (e) => {
        if (e && e.key && e.key !== 'Enter') return;
        let normilizedId;
        if (/^(|\d+)$/.test(inputValue)) {
            normilizedId = inputValue;
        } else {
            const startId = inputValue.indexOf('wildberries.ru/catalog/') + 'wildberries.ru/catalog/'.length;
            const endId = inputValue.indexOf('/detail.aspx');
            if (startId === -1 || endId === -1) {
                setRequestStatus({ ...requestInitState, isError: true, message: 'Не верный формат артикула. Вставьте только числа или ссылку вида: https://www.wildberries.ru/catalog/ID/detail.aspx' });
                setInputValue('');
                return;
            }
            normilizedId = inputValue.substring(startId, endId);
        }
        dispatch(skuAnalysisActions.skuSearchHistoryAdd(normilizedId));
        navigate(`/sku-analysis/${normilizedId}`);
    };

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className={styles.search}>
            <p className={styles.search__title}>Поиск по товару</p>
            <div className={styles.search__wrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            fontFamily: 'Mulish',
                            fontSize: 16,
                        },
                        components: {
                            Input: {
                                activeBorderColor: '#5329FF',
                                hoverBorderColor: '#5329FF'
                            }
                        }
                    }}
                >
                    <Input
                        ref={inputRef}
                        placeholder='Артикул или ссылка'
                        size='large'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => { searchSubmitHandler(e); }}
                        className={styles.search__input}
                    />
                    <Button
                        size='large'
                        type='primary'
                        onClick={searchSubmitHandler}
                        className={styles.search__button}
                    >
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.95312 9.60353C1.95312 5.25398 5.47914 1.72797 9.82869 1.72797C14.1782 1.72797 17.7043 5.25398 17.7043 9.60353C17.7043 13.9531 14.1782 17.4791 9.82869 17.4791C5.47914 17.4791 1.95312 13.9531 1.95312 9.60353ZM9.82869 0.227966C4.65071 0.227966 0.453125 4.42555 0.453125 9.60353C0.453125 14.7815 4.65071 18.9791 9.82869 18.9791C12.1477 18.9791 14.2701 18.1371 15.9068 16.7423L19.9365 20.772L20.9972 19.7114L16.9674 15.6816C18.3623 14.0449 19.2043 11.9225 19.2043 9.60353C19.2043 4.42555 15.0067 0.227966 9.82869 0.227966Z" fill="white" />
                        </svg>

                        Найти
                    </Button>
                </ConfigProvider>
            </div>
            {skuSearchHistory && skuSearchHistory.length > 0 &&
                <div className={styles.search__searchHistory}>
                    {skuSearchHistory.map((i, id) => {

                        return (
                            <button
                                className={styles.search__historyItem}
                                key={id}
                                id={i}
                                onClick={historyButtonClickHandler}
                            >
                                {i}
                            </button>
                        );
                    })}

                    <button className={styles.search__historyDeleteButton} onClick={() => dispatch(skuAnalysisActions.resetSkuSearchHistory())}>
                        Очистить историю
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5M9 9L5 5M5 5L9 1M5 5L1 9" stroke="#8C8C8C" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            }


            <ErrorModal
                footer={null}
                open={requestStatus.isError}
                onOk={() => setRequestStatus(requestInitState)}
                onClose={() => setRequestStatus(requestInitState)}
                onCancel={() => setRequestStatus(requestInitState)}
                message={requestStatus.message}
            />
        </div>
    );
};

export default SearchBlock;
