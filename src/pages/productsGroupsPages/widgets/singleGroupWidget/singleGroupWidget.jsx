import React, { useState, useEffect, useContext } from 'react';
import styles from './singleGroupWidget.module.css'
import HowToLink from '../../../../components/sharedComponents/howToLink/howToLink';
import { Checkbox, ConfigProvider } from 'antd';
import { singleGroupTableConfig, buttonIcons } from '../../shared';
import wb_icon from '../../../../assets/wb_icon.png'
import { URL } from '../../../../service/config';
import AuthContext from '../../../../service/AuthContext';



const SingleGroupWidget = ({
    setIsAddSkuModalVisible,
    data,
    setDataFetchingStatus,
    dataFetchingStatus,
    initDataFetchingStatus,
    groupId,
    getGroupData,
    shops,
    setConfirmationModalState,
    initConfirmationState
}) => {
    const { authToken } = useContext(AuthContext)
    const [tableData, setTableData] = useState([])
    const [checkedList, setCheckedList] = useState([]);
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
        setCheckedList(e.target.checked ? tableData.map(_ => _.sku) : []);
    };

    const deleteSkuFromGroup = async (product) => {
        const updatedTableData = tableData;
        const index = updatedTableData.findIndex(_ => _.id === product.id);
        updatedTableData.splice(index, 1)
        const requestObject = {
            product_ids: updatedTableData.map(_ => _.id)
        }
        try {
            const res = await fetch(`${URL}/api/product/product_groups/${groupId}`, {
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
            setTableData(updatedTableData)
            //getGroupData(authToken, groupId)
            // успешно обновлено

        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    useEffect(() => {
        data && setTableData(data.products)
    }, [data])

    return (
        <div className={styles.widget}>
            <div className={styles.widget__controlsWrapper}>
                <HowToLink
                    text='Как использовать?'
                    target='_blank'
                    url='/'
                />
                <button className={styles.widget__addButton} onClick={() => setIsAddSkuModalVisible(true)}>
                    Добавить артикул
                </button>
            </div>
            {tableData && shops &&
                <div className={styles.widget__tableWrapper}>

                    {/* table */}
                    <div className={styles.table}>
                        {/* Хэдер */}
                        <div className={styles.table__headerContainer}>
                            <div className={styles.table__header}>
                                {/* Мапим массив значений заголовков */}
                                {tableData && singleGroupTableConfig.values.map((v, id) => {
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
                            {tableData && tableData.length > 0 && shops && tableData.map((product, id) => {
                                return (
                                    <div
                                        className={styles.table__row}
                                        key={id}
                                        id={`table_row_${id}`}
                                    >
                                        {/* Для каждого товара мапим заголовки таблицы еще раз и забираем из товара нужны данные (в первой колонке одновременно фото и название) */}
                                        {singleGroupTableConfig.values.map(((v, id) => {

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

                                            if (v.engName === 'actions') {

                                                return (
                                                    <div className={styles.table__rowItem} key={id}>
                                                        {v.actionTypes.map((a, id) => {
                                                            return (
                                                                <button 
                                                                    className={styles.table__actionButton} 
                                                                    key={id} 
                                                                    //onClick={() => { deleteSkuFromGroup(product) }}
                                                                    onClick={() => {setConfirmationModalState({open: true, title: 'Удаление товара', actionTitle: 'Удалить', message: `Вы уверены, что хотите удалить товар "${product.article}"?`, mainAction: () => {deleteSkuFromGroup(product)}, returnAction: () => {setConfirmationModalState(initConfirmationState)}})}}
                                                                >
                                                                    {buttonIcons[a]}
                                                                </button>
                                                            )
                                                        })}
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
                                                                        checked={checkedList.some(_ => _ === product.sku)}
                                                                        value={product.sku}
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
                        </div>
                    </div>
                    {/* !table */}


                </div>}
        </div>
    )
}

export default SingleGroupWidget;