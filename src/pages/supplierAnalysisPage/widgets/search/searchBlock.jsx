import React, { useState } from 'react'
import styles from './searchBlock.module.css'
import { ConfigProvider, Button, AutoComplete } from 'antd';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';
import useDebouncedFunction from '../../../../service/hooks/useDebounce';
import { ServiceFunctions } from '../../../../service/serviceFunctions';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actions as supplierActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';



const requestInitState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const SearchBlock = () => {
    const dispatch = useAppDispatch()
    const { mainSupplierData } = useAppSelector(store => store.supplierAnalysis)
    const [requestStatus, setRequestStatus] = useState(requestInitState)
    const [autocompleteOptions, setAutocompleteOptions] = useState();
    const [loadingOptions, setLoadingOptions] = useState(false);
    const navigate = useNavigate()

    const getSuggestDataWrapperFunc = async (value) => {
        const res = await ServiceFunctions.getSupplierAnalysisSuggestData(value, setLoadingOptions)

        if (res) {
            setAutocompleteOptions(res)
        }
    }

    const debouncedDataFetch = useDebouncedFunction(getSuggestDataWrapperFunc, 500)

    

    const handleSearch = (value) => { // обработка ввода пользователя вручную
        if (value) {
            debouncedDataFetch(value)
        }
    };

    const handleSelect = (value) => { // обработка клика на опцию
        const item = autocompleteOptions.find(_ => _.supplier_id === value);
        if (item) {
            dispatch(supplierActions.setSupplierMainData(item))
        }
    };

    return (
        <div className={styles.search}>
            <p className={styles.search__title}>Поиск по поставщику</p>
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
                    <AutoComplete
                        showSearch
                        size='large'
                        placeholder='Введите название товара'
                        className={styles.search__input}
                        style={{ background: mainSupplierData ? '#F2F2F2' : '', width: '100%' }}
                        id='autocomp'
                        loading={loadingOptions}
                        suffixIcon={
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L13 1" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                            </svg>

                        }
                        notFoundContent={<div style={{ color: 'black' }}>
                            {!loadingOptions && !autocompleteOptions && 'Введите название поставщика'}
                            {!loadingOptions && autocompleteOptions && autocompleteOptions.length === 0 && 'Ничего не найдено'}
                            {loadingOptions && 'Идет загрузка...'}
                        </div>}
                        // allowClear={{
                        //     clearIcon: (
                        //         <div style={{ marginLeft: -20, background: 'transparent' }}>
                        //             <svg width="10" height="10" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        //                 <path fillRule="evenodd" clipRule="evenodd" d="M14.7074 2.60356C15.0979 2.21304 15.0979 1.57987 14.7074 1.18935C14.3168 0.798823 13.6837 0.798823 13.2931 1.18935L7.58602 6.89646L2.08601 1.39645C1.69549 1.00593 1.06232 1.00593 0.671799 1.39645C0.281275 1.78698 0.281275 2.42014 0.671799 2.81067L5.96469 8.10356L0.671799 13.3965C0.281275 13.787 0.281275 14.4201 0.671799 14.8107C1.06232 15.2012 1.69549 15.2012 2.08601 14.8107L7.79313 9.10355L13.2931 14.6036C13.6837 14.9941 14.3168 14.9941 14.7074 14.6036C15.0979 14.213 15.0979 13.5799 14.7074 13.1893L9.41446 7.89645L14.7074 2.60356Z" fill="currentColor" />
                        //             </svg>
                        //         </div>
                        //     )
                        // }}
                        value={mainSupplierData?.trademark}
                        onSearch={handleSearch}
                        onSelect={handleSelect}
                        options={autocompleteOptions && [...autocompleteOptions]?.map(_ => ({ label: _.trademark, value: _.supplier_id }))}
                    />
                    <Button
                        size='large'
                        type='primary'
                        className={styles.search__button}
                        disabled={!mainSupplierData}
                        loading={loadingOptions}
                        onClick={() => {
                            if (mainSupplierData) {
                                navigate(`/supplier-analysis/${mainSupplierData.supplier_id}`);
                              }
                        }}
                    >
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.95312 9.60353C1.95312 5.25398 5.47914 1.72797 9.82869 1.72797C14.1782 1.72797 17.7043 5.25398 17.7043 9.60353C17.7043 13.9531 14.1782 17.4791 9.82869 17.4791C5.47914 17.4791 1.95312 13.9531 1.95312 9.60353ZM9.82869 0.227966C4.65071 0.227966 0.453125 4.42555 0.453125 9.60353C0.453125 14.7815 4.65071 18.9791 9.82869 18.9791C12.1477 18.9791 14.2701 18.1371 15.9068 16.7423L19.9365 20.772L20.9972 19.7114L16.9674 15.6816C18.3623 14.0449 19.2043 11.9225 19.2043 9.60353C19.2043 4.42555 15.0067 0.227966 9.82869 0.227966Z" fill="currentColor" />
                        </svg>

                        Найти
                    </Button>
                </ConfigProvider>
            </div>
            {/* {skuSearchHistory && skuSearchHistory.length > 0 &&
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
                        )
                    })}

                    <button className={styles.search__historyDeleteButton} onClick={() => dispatch(skuAnalysisActions.resetSkuSearchHistory())}>
                        Очистить историю
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5M9 9L5 5M5 5L9 1M5 5L1 9" stroke="#8C8C8C" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            } */}



            <ErrorModal
                footer={null}
                open={requestStatus.isError}
                onOk={() => setRequestStatus(requestInitState)}
                onClose={() => setRequestStatus(requestInitState)}
                onCancel={() => setRequestStatus(requestInitState)}
                message={requestStatus.message}
            />
        </div>
    )
}

export default SearchBlock;