import React, { useState, useEffect } from 'react';
import styles from './groupsMainWidget.module.css'
import HowToLink from '../../../../components/sharedComponents/howToLink/howToLink';
import { groupsMainTableConfig, buttonIcons } from '../../shared';
import { Checkbox, ConfigProvider } from 'antd';
import { formatPrice } from '../../../../service/utils';
import { Link } from 'react-router-dom';

const mockData = [
    { group: 'Тест группа 1', sku: 20 },
    { group: 'Тест группа 2', sku: 30 },
    { group: 'Тест группа 3', sku: 40 },
]

const GroupsMainWidget = ({ setIsAddGroupModalVisible }) => {

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
        setCheckedList(e.target.checked ? tableData.map(_ => _.group) : []);
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
                <button className={styles.widget__addButton} onClick={() => setIsAddGroupModalVisible(true)}>
                    Создать группу
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
                            {tableData && groupsMainTableConfig.values.map((v, id) => {
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
                                        {groupsMainTableConfig.values.map(((v, id) => {

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
                                                    {v.hasSelect ?
                                                        <>
                                                            <ConfigProvider
                                                                theme={{
                                                                    token: {
                                                                        colorPrimary: '#5329FF',
                                                                        colorBgContainer: 'transparent'
                                                                    }
                                                                }}
                                                            >
                                                                <Checkbox
                                                                    checked={checkedList.some(_ => _ === product.group)}
                                                                    value={product.group}
                                                                    onChange={onCheckboxChange}
                                                                />
                                                            </ConfigProvider>
                                                            <Link to={`/dev/groups/${id}`} className={styles.table__rowTitle}>{product[v.engName]}</Link>
                                                        </>
                                                        :
                                                        <>
                                                            {v.units ? formatPrice(product[v.engName], v.units) : product[v.engName]}
                                                        </>
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

export default GroupsMainWidget;