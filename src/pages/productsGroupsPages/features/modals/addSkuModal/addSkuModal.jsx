import React, { useState, useEffect, useContext } from 'react';
import styles from './addSkuModal.module.css'
import { addSkuTableConfig } from '../../../shared';
import { AddSkuModalFooter } from '../../../entities'
import { Modal, Checkbox, ConfigProvider, Pagination } from 'antd';
import wb_icon from '../../../../../assets/wb_icon.png'
import { URL } from '../../../../../service/config';
import AuthContext from '../../../../../service/AuthContext';

const mockData = [
    {
        product: 'Some product name',
        brand: 'Some brand name',
        shop: 'Some shop name',
        sku: '0001',
        photo: 'https://basket-16.wbbasket.ru/vol2567/part256714/256714767/images/c246x328/1.webp'
    },
    {
        product: 'Some product name',
        brand: 'Some brand name',
        shop: 'Some shop name',
        sku: '0002',
        photo: 'https://basket-16.wbbasket.ru/vol2567/part256714/256714767/images/c246x328/1.webp'
    },
    {
        product: 'Some product name',
        brand: 'Some brand name',
        shop: 'Some shop name',
        sku: '0003',
        photo: 'https://basket-16.wbbasket.ru/vol2567/part256714/256714767/images/c246x328/1.webp'
    },
]

const AddSkuModal = ({ isAddSkuModalVisible, setIsAddSkuModalVisible, groupData, getGroupData, initDataFetchingStatus, setDataFetchingStatus, dataFetchingStatus, shops }) => {
    const { authToken } = useContext(AuthContext)
    const [tableData, setTableData] = useState()
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [checkedList, setCheckedList] = useState([]);
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
        setCheckedList(e.target.checked ? tableData.map(_ => _.id) : []);
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

    useEffect(() => {
        if (groupData && groupData.id) {
            getProductsList(authToken, groupData.id)
        }
    }, [groupData])

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

                                            <div className={styles.table__headerItem} key={id}>

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
                                                    <div className={styles.table__rowItem} key={id}>
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