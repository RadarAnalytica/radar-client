import { useState, useEffect } from 'react';
import styles from './turnoverBlock.module.css'
import { formatPrice } from '../../../../service/utils';
import { Tooltip, ConfigProvider, Modal } from 'antd';
import { ServiceFunctions } from '../../../../service/serviceFunctions';

export const addSkuTableConfig = {
    tableName: null,
    values: [
        { ruName: 'Товар', engName: 'title', isSortable: true, hasSelect: true, hasPhoto: true, photoFieldName: 'photo' },
        { ruName: 'Артикул', engName: 'vendor_code', isSortable: false, hasSelect: false },
        { ruName: 'Остаток', engName: 'stocks', units: 'шт', isSortable: true, hasSelect: false },
        { ruName: 'Продажи за период', engName: 'sales_count', units: 'шт', isSortable: true, hasSelect: false },
        { ruName: 'Обрачиваемость', engName: 'turnover', isSortable: false, hasSelect: false },
    ]
}

const initSortState = {
    sortedValue: '',
    sortType: 'DESC',
}

const getTurnoverBarParams = (turnoverValue) => {
    let params = {
        title: 'Хорошо',
        color: '#DBF7E9'
    }
    if (turnoverValue === 0) {
        params = {
            title: 'Плохо',
            color: '#FEDACC'
        }
    }
    if (turnoverValue <= 30) { return params }
    if (turnoverValue > 30 && turnoverValue <= 60) {
        params = {
            title: 'Умеренно',
            color: '#F2F2F2'
        }
    }
    if (turnoverValue > 60 && turnoverValue <= 90) {
        params = {
            title: 'Слабо',
            color: '#FCEFCC'
        }
    }
    if (turnoverValue > 90) {
        params = {
            title: 'Плохо',
            color: '#FEDACC'
        }
    }
    return params;
}

export const sortTableDataFunc = (sortType, sortedValue, dataToSort) => {
    let sortedData = dataToSort;

    if (sortType === 'ASC') {
        sortedData = [...dataToSort].sort((a, b) => {
            if (typeof a[sortedValue] === 'number' && typeof b[sortedValue] === 'number') {
                return b[sortedValue] - a[sortedValue]
            } else {
                return b[sortedValue].localeCompare(a[sortedValue])
            }
        })
    }

    if (sortType === 'DESC') {
        sortedData = [...dataToSort].sort((a, b) => {
            if (typeof a[sortedValue] === 'number' && typeof b[sortedValue] === 'number') {
                return a[sortedValue] - b[sortedValue]
            } else {
                return a[sortedValue].localeCompare(b[sortedValue])
            }
        })
    }
    return sortedData;
}


const TurnoverBlock = ({ loading, turnover, selectedRange, activeBrand, authToken }) => {
    const [initData, setInitData] = useState([])
    const [tableData, setTableData] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [sortState, setSortState] = useState(initSortState) // стейт сортировки (см initSortState)
    const [isTableDataLoading, setIsTableDataLoading] = useState(false)

    // хэндлер сортировки
    const sortButtonClickHandler = (e, value) => {
        const { id } = e.currentTarget;

        // выключаем сортировку если нажата уже активная клавиша
        if (sortState.sortType === id && sortState.sortedValue === value) {
            setSortState(initSortState)
            setTableData(initData)
            return
        }


        // включаем сортировку и сортируем дату
        setSortState({
            sortedValue: value,
            sortType: id,
        })
        setTableData([...sortTableDataFunc(id, value, initData)])
    }

    const getTurnoverTableData = async (selectedRange, activeBrand, authToken) => {
        setIsTableDataLoading(true);
        try {
            if (activeBrand !== null && activeBrand !== undefined) {
                // CHECK FOR MOCKDATA
                // if (user.subscription_status === null) {
                //     ;
                //     const data = await mockGetDashBoard(selectedRange, activeBrand);
                //     setDataDashboard(data);
                //     return
                // }

                const data = await ServiceFunctions.getDashboardTurnoverData(
                    authToken,
                    selectedRange,
                    activeBrand
                );
                let sortedData = data.sort((a, b) => a.product - b.product);
                sortedData = sortedData.sort((a, b) => {
                    if (a.photo && b.photo) {
                        return 0;
                    }
                    if (a.photo) return -1;
                    if (b.photo) return 1;
                    return 0;
                })
                const arrWODoubled = []
                sortedData.forEach(i => {
                    if (arrWODoubled.length === 0) {
                        arrWODoubled.push(i)
                    } else {
                        const isExist = arrWODoubled.some(_ => JSON.stringify(_) === JSON.stringify(i))
                        if (!isExist) {
                            arrWODoubled.push(i)
                        }
                    }
                })
                setTableData(arrWODoubled);
                setInitData(arrWODoubled)
            }

        } catch (e) {
            console.error(e);
        } finally {
            setIsTableDataLoading(false);
        }
    };

    useEffect(() => {
        if (isModalVisible && selectedRange && activeBrand && authToken) {
            getTurnoverTableData(selectedRange, activeBrand.id, authToken)
        }

        if (!isModalVisible) {
            setSortState(initSortState)
        }
    }, [isModalVisible, selectedRange, activeBrand])


    if (loading) {
        return (
            <div className={styles.block}>
                <div className={styles.block__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.block}>
            <div className={styles.block__header}>
                <p className={styles.block__title}>Оборачиваемость товара</p>
                <ConfigProvider
                    theme={{
                        token: {
                            colorTextLightSolid: '#1A1A1A'
                        }
                    }}
                >
                    <Tooltip
                        arrow={false}
                        color='white'
                        title={'Показатель, который показывает, за сколько дней продаются запасы. Он помогает оценить эффективность управления запасами'}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                            <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                            <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                        </svg>
                    </Tooltip>
                </ConfigProvider>
            </div>

            <div className={styles.block__body}>
                {turnover !== null && turnover !== undefined && <p className={styles.block__mainData}>{formatPrice(turnover, 'дн.')}</p>}
                <button className={styles.block__button} onClick={() => setIsModalVisible(true)}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.2" cx="12.5" cy="12" r="12" fill="#9A81FF" />
                        <rect opacity="0.4" x="5" y="4.5" width="15" height="15" rx="7.5" fill="#9A81FF" />
                        <rect x="5.4" y="4.9" width="14.2" height="14.2" rx="7.1" stroke="#9A81FF" strokeWidth="0.8" />
                        <circle cx="12.6031" cy="11.7" r="1.8" fill="white" stroke="#5030E5" strokeWidth="1.2" />
                    </svg>
                    Смотреть по артикулам
                </button>
            </div>

            <Modal
                open={isModalVisible}
                footer={null}
                onOk={() => setIsModalVisible(false)}
                onClose={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                width={1200}
                style={{ top: 20 }}
            >

                <div className={styles.modal}>
                    <div className={styles.modal__header}>
                        <p className={styles.modal__title}>Оборачиваемость товара</p>
                    </div>
                    {tableData && !isTableDataLoading &&
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

                                                <div className={v.engName === 'title' ? styles.table__headerItem_wide : styles.table__headerItem} key={id}>
                                                    <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                                    {v.isSortable &&
                                                        <div className={styles.sortControls}>
                                                            <button
                                                                className={sortState.sortType === 'DESC' && sortState.sortedValue === v.engName ? `${styles.sortControls__button} ${styles.sortControls__button_active}` : styles.sortControls__button}
                                                                id='DESC'
                                                                onClick={(e) => sortButtonClickHandler(e, v.engName)}
                                                            >
                                                                <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                className={sortState.sortType === 'ASC' && sortState.sortedValue === v.engName ? `${styles.sortControls__button} ${styles.sortControls__button_active}` : styles.sortControls__button}
                                                                id='ASC'
                                                                onClick={(e) => sortButtonClickHandler(e, v.engName)}
                                                            >
                                                                <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.77297 12.1893V0.5H6.27297V12.1893L9.76561 8.6967C10.0585 8.40381 10.5334 8.40381 10.8263 8.6967C11.1192 8.98959 11.1192 9.46447 10.8263 9.75736L6.0533 14.5303C5.76041 14.8232 5.28553 14.8232 4.99264 14.5303L0.21967 9.75736C-0.0732234 9.46447 -0.0732234 8.98959 0.21967 8.6967C0.512563 8.40381 0.987437 8.40381 1.28033 8.6967L4.77297 12.1893Z" />
                                                                </svg>

                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Тело таблицы */}
                                <div className={styles.table__body}>
                                    {/* Мапим данные о товарах */}
                                    {tableData && tableData.length > 0 && tableData.map((product, id) => {

                                        return (
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
                                                                {/* <img src={wb_icon} width={20} height={20} alt='' /> */}
                                                                {product[v.engName]}
                                                            </div>
                                                        )
                                                    }
                                                    if (v.engName === 'turnover') {
                                                        const params = getTurnoverBarParams(product[v.engName]);
                                                        return (
                                                            <div className={styles.table__rowItem} key={id}>
                                                                <div className={styles.table__bar} style={{ background: params.color }}>{params.title}</div>
                                                            </div>
                                                        )
                                                    }

                                                    return (
                                                        <div className={v.engName === 'title' ? styles.table__rowItem_wide : styles.table__rowItem} key={id}>
                                                            {v.hasPhoto ?
                                                                <>
                                                                    <div className={styles.table__rowImgWrapper}>
                                                                        {product[v.photoFieldName] &&
                                                                            <img
                                                                                src={product[v.photoFieldName]}
                                                                                width={30}
                                                                                height={40}
                                                                                onError={(e) => {
                                                                                    e.target.onerror = null;
                                                                                    e.target.style.display = 'none'
                                                                                }}
                                                                            />
                                                                        }
                                                                    </div>
                                                                    <p className={styles.table__rowTitle}>{product[v.engName]}</p>
                                                                </>
                                                                :
                                                                <>{v.units ? formatPrice(product[v.engName], v.units) : product[v.engName]}</>
                                                            }
                                                        </div>
                                                    )
                                                }))}
                                            </div>
                                        )
                                    })}
                                    {/* No data */}
                                    {tableData && tableData.length === 0 &&
                                        <div className={styles.table__row}>
                                            <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`}>
                                                Товары отсутствуют
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {/* !table */}


                        </div>}

                    {isTableDataLoading &&
                        <div className={styles.table}>
                            <div className={styles.table__loaderWrapper}>
                                <span className='loader'></span>
                            </div>
                        </div>
                    }

                    <div className={styles.modal__annotationWrapper}>
                        {'Логика подсчета'}
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorTextLightSolid: '#1A1A1A'
                                }
                            }}
                        >
                            <Tooltip
                                arrow={false}
                                color='white'
                                title={'Оборачиваемость товара показывает, на сколько дней хватит текущего остатка товара при средних темпах продаж. Логика подсчета: Определяется среднее количество продаж в день (общие продажи за период делятся на количество дней). Текущий остаток товара (включая возвращенный товар на пути от клиента на склад) делится на это среднее значение.'}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                    <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                                </svg>
                            </Tooltip>
                        </ConfigProvider>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TurnoverBlock;