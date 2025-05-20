import React, { useState, useEffect, useContext } from 'react';
import styles from './addSkuModal.module.css'
import { addSkuTableConfig } from '../../../shared';
import { AddSkuModalFooter } from '../../../entities'
import { Modal, Checkbox, ConfigProvider, Pagination, Input } from 'antd';
import wb_icon from '../../../../../assets/wb_icon.png'
import { URL } from '../../../../../service/config';
import AuthContext from '../../../../../service/AuthContext';

const getFilteredData = (query, data) => {
    let filteredData = data;

    if (data && query) {
        filteredData = data.filter((item) =>
            // item?.sku?.toLowerCase().includes(query.toLowerCase()) ||
            item?.article?.toLowerCase().includes(query.toLowerCase())
            // item?.productName?.toLowerCase().includes(query.toLowerCase())
        );
    }

    return filteredData;
}

const AddSkuModal = ({ isAddSkuModalVisible, setIsAddSkuModalVisible, groupData, getGroupData, initDataFetchingStatus, setDataFetchingStatus, dataFetchingStatus, shops }) => {
    const { authToken } = useContext(AuthContext)
    const [tableData, setTableData] = useState()
    const [initData, setInitData] = useState()
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [checkedList, setCheckedList] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('')
    const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 50 });
    const checkAll = tableData && tableData.length === checkedList.length;
    const indeterminate = tableData && checkedList.length > 0 && checkedList.length < tableData.length;


    const onCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedList([...checkedList, value])
        } else {
            const index = checkedList.findIndex(_ => _ === value)
            const newList = checkedList
            newList.splice(index, 1)
            setCheckedList([...newList])
        }
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? tableData.map(_ => _.id) : tableData.filter(_ => _.in_group).map(_ => _.id));
    };

    const getProductsList = async (authToken, groupId) => {
        //setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true })
        try {
            const res = await fetch(`${URL}/api/product/product_groups/${groupId}/products`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: parsedData?.detail || 'Что-то пошло не так :(' })
                return;
            }
            const parsedRes = await res.json();
            setTableData(parsedRes.data.products)
            setInitData(parsedRes.data.products)
            setPaginationState({ ...paginationState, total: parsedRes.data.products.length })
            setCheckedList(parsedRes.data.products.filter(_ => _.in_group).map(_ => _.id))
            //setGroupData(parsedRes.data)
            setDataFetchingStatus(initDataFetchingStatus)
        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    const addProducts = async () => {
        const requestObject = {
            name: groupData.name,
            description: groupData.description,
            product_ids: checkedList
        }
        try {
            const res = await fetch(`${URL}/api/product/product_groups/${groupData.id}`, {
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
            setIsAddSkuModalVisible(false)
            getGroupData(authToken, groupData.id)
            //setGroupData(parsedRes.data)
            //setDataFetchingStatus(initDataFetchingStatus)
        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    const paginationHandler = (page) => {
        setPaginationState({ ...paginationState, current: page })
    }

    const inputKeydownHandler = (e) => {
        if (e && e.key !== 'Enter') return
        setTableData(getFilteredData(searchInputValue.trim(), initData))
    }
    const searchButtonClickHandler = () => {
        setTableData(getFilteredData(searchInputValue.trim(), initData))
    }
    const inputChangeHandler = (e) => {
        if (e.target.value === '') {
            setTableData([...initData])
        }
        const regex = /^[a-zA-Zа-яА-Я0-9\s]*$/;
        if (regex.test(e.target.value)) {
            setSearchInputValue(e.target.value)
        }
    }

    useEffect(() => {
        if (groupData && groupData.id) {
            getProductsList(authToken, groupData.id)
        }
    }, [groupData])

    useEffect(() => {
        setPaginationState({ current: 1, total: tableData?.length, pageSize: 50 })
    }, [tableData])

    return (
        <Modal
            footer={
                <AddSkuModalFooter
                    addProducts={addProducts}
                    setIsAddSkuModalVisible={setIsAddSkuModalVisible}
                    isDataLoading={dataFetchingStatus.isLoading}
                    isCheckedListEmpty={checkedList.length === 0}
                />
            }
            onOk={() => setIsAddSkuModalVisible(false)}
            onCancel={() => setIsAddSkuModalVisible(false)}
            onClose={() => setIsAddSkuModalVisible(false)}
            open={isAddSkuModalVisible}
            width={1200}
            centered
        >
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <p className={styles.modal__title}>Добавьте артикулы</p>
                </div>
                {/* loader */}
                {/* {isDataLoading &&
                    <div className={styles.modal__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                } */}
                {/* main data */}
                {tableData &&
                    <div className={styles.modal__tableWrapper}>

                        {/* table */}
                        <div className={styles.table}>
                            {/* Хэдер */}
                            <div className={styles.table__headerContainer}>
                                <div className={styles.table__header}>
                                    {/* Мапим массив значений заголовков */}
                                    {tableData && addSkuTableConfig.values.map((v, id) => {
                                        /* Рендерим айтем заголовка таблицы с кнопками сортировки (если они нужны) */
                                        return (

                                            <div className={v.hasSearch ? styles.table__headerItem_wide : styles.table__headerItem} key={id}>

                                                {v.hasSelect &&
                                                    <div className={styles.sortControls}>
                                                        <ConfigProvider
                                                            theme={{
                                                                token: {
                                                                    colorPrimary: '#5329FF',
                                                                    colorBgContainer: 'transparent'
                                                                }
                                                            }}
                                                        >
                                                            <Checkbox
                                                                indeterminate={indeterminate}
                                                                onChange={onCheckAllChange}
                                                                checked={checkAll}
                                                            />
                                                        </ConfigProvider>
                                                    </div>
                                                }
                                                <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                                {v.hasSearch &&
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorPrimary: '#5329FF',
                                                                colorBgContainer: 'transparent'
                                                            }
                                                        }}
                                                    >
                                                        <Input
                                                            allowClear
                                                            value={searchInputValue}
                                                            onKeyDown={(e) => inputKeydownHandler(e)}
                                                            onChange={inputChangeHandler}
                                                            autoCorrect='off'
                                                            spellCheck={false}
                                                            autoComplete='off'
                                                            style={{paddingRight: 0}}
                                                            suffix={
                                                                <button className={styles.table__searchButton} onClick={searchButtonClickHandler}>
                                                                    <svg width="10" height="10" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px'}}>
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9.60353C1.5 5.25398 5.02601 1.72797 9.37556 1.72797C13.7251 1.72797 17.2511 5.25398 17.2511 9.60353C17.2511 13.9531 13.7251 17.4791 9.37556 17.4791C5.02601 17.4791 1.5 13.9531 1.5 9.60353ZM9.37556 0.227966C4.19758 0.227966 0 4.42555 0 9.60353C0 14.7815 4.19758 18.9791 9.37556 18.9791C11.6946 18.9791 13.8169 18.1371 15.4537 16.7423L19.4834 20.772L20.5441 19.7114L16.5143 15.6816C17.9092 14.0449 18.7511 11.9225 18.7511 9.60353C18.7511 4.42555 14.5535 0.227966 9.37556 0.227966Z" fill="#5329FF" />
                                                                    </svg>

                                                                </button>
                                                            }
                                                        />
                                                    </ConfigProvider>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Тело таблицы */}
                            <div className={styles.table__body}>
                                {/* Мапим данные о товарах */}
                                {tableData && tableData.length > 0 && paginationState && shops && tableData.map((product, id) => {
                                    const minRange = (paginationState.current - 1) * paginationState.pageSize;
                                    const maxRange = paginationState.current * paginationState.pageSize;

                                    return id >= minRange && id < maxRange && (
                                        <div
                                            className={styles.table__row}
                                            key={id}
                                            id={`table_row_${id}`}
                                        >
                                            {/* Для каждого товара мапим заголовки таблицы еще раз и забираем из товара нужны данные (в первой колонке одновременно фото и название) */}
                                            {addSkuTableConfig.values.map(((v, id) => {

                                                if (v.engName === 'sku') {
                                                    return (
                                                        <div className={styles.table__rowItem} key={id}>
                                                            <img src={wb_icon} width={20} height={20} alt='' />
                                                            {product[v.engName]}
                                                        </div>
                                                    )
                                                }

                                                if (v.engName === 'shop') {
                                                    const currentShopName = shops.find(_ => _.id === product[v.engName])?.brand_name
                                                    return (
                                                        <div className={styles.table__rowItem} key={id}>
                                                            {currentShopName ? currentShopName : product[v.engName]}
                                                        </div>
                                                    )
                                                }

                                                return (
                                                    <div className={v.hasPhoto ? styles.table__rowItem_wide : styles.table__rowItem} key={id}>
                                                        {v.hasPhoto ?
                                                            <>
                                                                {v.hasSelect &&
                                                                    <ConfigProvider
                                                                        theme={{
                                                                            token: {
                                                                                colorPrimary: '#5329FF',
                                                                                colorBgContainer: 'transparent'
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Checkbox
                                                                            checked={checkedList.some(_ => _ === product.id)}
                                                                            value={product.id}
                                                                            onChange={onCheckboxChange}
                                                                        />
                                                                    </ConfigProvider>
                                                                }
                                                                <div className={styles.table__rowImgWrapper}>
                                                                    {product[v.photoFieldName] && <img src={product[v.photoFieldName]} width={30} height={40} />}
                                                                </div>
                                                                <p className={styles.table__rowTitle}>{product[v.engName]}</p>
                                                            </>
                                                            :
                                                            <>{product[v.engName]}</>
                                                        }
                                                    </div>
                                                )
                                            }))}
                                        </div>
                                    )
                                })}
                                {/* No data */}
                                {/* {tableData && tableData.length === 0 && id === 0 &&
                                    <div className={styles.table__row}>
                                        <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`}>
                                            Товары отсутствуют
                                        </div>
                                    </div>
                                } */}
                            </div>
                        </div>
                        {/* !table */}


                    </div>}
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: '#5329FF',
                            lineWidth: 0,
                        },
                        components: {
                            Pagination: {
                                itemActiveBg: '#EEEAFF',
                                itemBg: '#F7F7F7',
                                itemColor: '#8C8C8C',
                            }
                        }
                    }}
                >
                    <Pagination
                        defaultCurrent={1}
                        current={paginationState.current}
                        onChange={paginationHandler}
                        total={paginationState.total}
                        pageSize={paginationState.pageSize}
                        showSizeChanger={false}
                    //showTotal={(total) => `Всего ${total} товаров`}
                    />
                </ConfigProvider>
            </div>
        </Modal>
    )
}

export default AddSkuModal;