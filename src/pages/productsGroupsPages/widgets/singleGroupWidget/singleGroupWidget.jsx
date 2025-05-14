import React, { useState, useEffect } from 'react';
import styles from './singleGroupWidget.module.css'
import HowToLink from '../../../../components/sharedComponents/howToLink/howToLink';
import { Checkbox, ConfigProvider } from 'antd';
import { singleGroupTableConfig, buttonIcons } from '../../shared';
import wb_icon from '../../../../assets/wb_icon.png'

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

const SingleGroupWidget = ({ setIsAddSkuModalVisible }) => {

    const [tableData, setTableData] = useState()
    const [isDataLoading, setIsDataLoading] = useState(false)
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

    useEffect(() => {
        let timeout;
        const getTableData = async () => {
            setIsDataLoading(true)
            timeout = setTimeout(() => { setTableData(mockData); setIsDataLoading(false) }, 2000)
        }
        getTableData()
        return () => { timeout && clearTimeout(timeout) }
    }, [])

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
            {isDataLoading &&
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            }
            {!isDataLoading && tableData &&
                <div className={styles.widget__tableWrapper}>

                    {/* table */}
                    <div className={styles.table}>
                        {/* Хэдер */}
                        <div className={styles.table__header}>
                            {/* Мапим массив значений заголовков */}
                            {tableData && singleGroupTableConfig.values.map((v, id) => {
                                return (
                                    <>
                                        {/* Рендерим айтем заголовка таблицы с кнопками сортировки (если они нужны) */}
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
                                    </>
                                )
                            })}
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
                                        onMouseOver={(e) => {
                                            const { id } = e.target
                                            const rows = id && document.querySelectorAll(`#${id}`);
                                            if (rows) {
                                                rows.forEach(row => {
                                                    row.style.background = '#F2F2F2'
                                                })
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const { id } = e.target
                                            const rows = id && document.querySelectorAll(`#${id}`);
                                            if (rows) {
                                                rows.forEach(row => {
                                                    row.style.background = 'none'
                                                })
                                            }
                                        }}
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

                                            if (v.engName === 'actions') {

                                                return (
                                                    <div className={styles.table__rowItem} key={id}>
                                                        {v.actionTypes.map((a, id) => {
                                                            return (
                                                                <button className={styles.table__actionButton} key={id}>
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
                                                                <img src={product[v.photoFieldName]} width={30} height={40} />
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
                            {tableData && tableData.length === 0 && id === 0 &&
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
        </div>
    )
}

export default SingleGroupWidget;