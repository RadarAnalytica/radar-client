import React, { useState, useEffect, useRef } from 'react';
import styles from './searchBlock.module.css';
import { ConfigProvider, Button, AutoComplete } from 'antd';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import useDebouncedFunction from '@/service/hooks/useDebounce';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as supplierActions } from '@/redux/supplierAnalysis/supplierAnalysisSlice';
import { selectMainSupplierData, selectCompareSupplierData } from '@/redux/supplierAnalysis/supplierAnalysisSelectors';
import { useDemoMode } from '@/app/providers';


const requestInitState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

const SearchBlock = ({ supplierType = 'main' }) => {
    const dispatch = useAppDispatch();
    const { isDemoMode } = useDemoMode();
    const mainSupplierData = useAppSelector(selectMainSupplierData);
    const compareSupplierData = useAppSelector(selectCompareSupplierData);
    const [requestStatus, setRequestStatus] = useState(requestInitState);
    const [autocompleteOptions, setAutocompleteOptions] = useState();
    const [currentData, setCurrentData] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [loadingOptions, setLoadingOptions] = useState(false);
    const navigate = useNavigate();
    const ref = useRef(null);

    const getSuggestDataWrapperFunc = async (value) => {
        const res = await ServiceFunctions.getSupplierAnalysisSuggestData(value, setLoadingOptions);

        if (res) {
            setAutocompleteOptions(res);
        }
    };

    const debouncedDataFetch = useDebouncedFunction(getSuggestDataWrapperFunc, 500);


    const handleSearch = (value) => { // обработка ввода пользователя вручную
        setSearchValue(value);
        if (value) {
            debouncedDataFetch(value);
        }
        if (!value && supplierType === 'main') {
            dispatch(supplierActions.setSupplierMainData(undefined));
        }
        if (!value && supplierType === 'compare') {
            dispatch(supplierActions.setSupplierCompareData(undefined));
        }
    };

    const handleSelect = (value) => { // обработка клика на опцию
        const item = autocompleteOptions.find(_ => _.supplier_id === value);
        if (item && supplierType === 'main') {
            dispatch(supplierActions.setSupplierMainData(item));
            setSearchValue(item.display_name);
        }
        if (item && supplierType === 'compare') {
            dispatch(supplierActions.setSupplierCompareData(item));
            setSearchValue(item.display_name);
        }
    };

    useEffect(() => {
        if (supplierType === 'main') {
            setCurrentData(mainSupplierData);
        }
        if (supplierType === 'compare') {
            setCurrentData(compareSupplierData);
        }
    }, [supplierType, mainSupplierData, compareSupplierData]);

    return (
        <div className={supplierType === 'main' ? styles.search : supplierType === 'compare' ? styles.search_compare : ''}>
            {supplierType === 'main' && <p className={styles.search__title}>Поиск по поставщику</p>}
            <div className={styles.search__wrapper}>
                <ConfigProvider
                    renderEmpty={() => (<div>Нет данных</div>)}
                    theme={{
                        token: {
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Mulish',
                            fontSize: 12,
                            fontWeight: 500,
                        },
                        components: {
                            Select: {
                                activeBorderColor: '#5329FF1A',
                                activeOutlineColor: 'transparent',
                                hoverBorderColor: '#5329FF1A',
                                optionActiveBg: 'transparent',
                                optionFontSize: 14,
                                optionSelectedBg: 'transparent',
                                optionSelectedColor: '#5329FF',
                            },
                            Button: {
                                colorPrimaryHover: '#5329FF90',
                            }
                        }
                    }}
                >
                    <AutoComplete
                        ref={ref}
                        showSearch
                        size='large'
                        disabled={isDemoMode}
                        placeholder={supplierType === 'main' ? 'Введите название поставщика' : supplierType === 'compare' ? 'Поставщик для сравнения' : ''}
                        className={styles.search__input}
                        style={{ background: currentData ? '#F2F2F2' : '', width: '100%' }}
                        id='autocomp'
                        loading={loadingOptions}
                        suffixIcon={
                            <svg
                                style={{
                                    // transform: 'translateY(-50%)',
                                    width: '14px',
                                    height: '9px',
                                    pointerEvents: 'none',
                                }}
                                viewBox='0 0 28 17'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M2 2L14 14L26 2'
                                    stroke='rgba(140, 140, 140, 1)'
                                    strokeWidth='4'
                                    strokeLinecap='round'
                                />
                            </svg>
                        }
                        notFoundContent={<div style={{ color: 'black', padding: '8px' }}>
                            {!loadingOptions && !autocompleteOptions && 'Введите название поставщика'}
                            {!loadingOptions && autocompleteOptions && autocompleteOptions.length === 0 && 'Ничего не найдено'}
                            {loadingOptions && 'Идет загрузка...'}
                        </div>}
                        value={searchValue}
                        onSearch={handleSearch}
                        onSelect={handleSelect}
                        options={autocompleteOptions && [...autocompleteOptions]?.sort((a, b) => {
                            const a_index = a.display_name.toLowerCase().indexOf(searchValue.toLowerCase());
                            const b_index = b.display_name.toLowerCase().indexOf(searchValue.toLowerCase());

                            if (a_index === 0) {
                                return -1;
                            }
                            if (b_index === 0) {
                                return 1;
                            }
                            if (a_index > 0 && b_index > 0) {
                                return a_index - b_index;
                            }
                            if (a_index > 0 && b_index < 0) {
                                return -1;
                            }
                            if (b_index > 0 && a_index < 0) {
                                return 1;
                            }
                            if (b_index < 0 && a_index < 0) {
                                return 0;
                            }
                        })?.map(_ => ({ label: _?.display_name, value: _?.supplier_id, key: _?.supplier_id }))}

                    />
                    {supplierType === 'main' &&
                        <Button
                            size='large'
                            type='primary'
                            className={styles.search__button}
                            disabled={!currentData}
                            loading={loadingOptions}
                            onClick={() => {
                                if (currentData) {
                                    navigate(`/supplier-analysis/${mainSupplierData.supplier_id}`);
                                }
                            }}
                        >
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.95312 9.60353C1.95312 5.25398 5.47914 1.72797 9.82869 1.72797C14.1782 1.72797 17.7043 5.25398 17.7043 9.60353C17.7043 13.9531 14.1782 17.4791 9.82869 17.4791C5.47914 17.4791 1.95312 13.9531 1.95312 9.60353ZM9.82869 0.227966C4.65071 0.227966 0.453125 4.42555 0.453125 9.60353C0.453125 14.7815 4.65071 18.9791 9.82869 18.9791C12.1477 18.9791 14.2701 18.1371 15.9068 16.7423L19.9365 20.772L20.9972 19.7114L16.9674 15.6816C18.3623 14.0449 19.2043 11.9225 19.2043 9.60353C19.2043 4.42555 15.0067 0.227966 9.82869 0.227966Z" fill="currentColor" />
                            </svg>

                            Найти
                        </Button>
                    }
                </ConfigProvider>
            </div>

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
