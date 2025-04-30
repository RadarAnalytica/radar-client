import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import styles from './selfCostTableWidget.module.css'
import { tableConfig } from '../../shared'

const mockData = [
    {product: '1', self_cost: 0, fullfillment: 0, history: [{ date: '2024-04-18', self_cost: 0, fullfillment: 0}, { date: '2024-08-18', self_cost: 0, fullfillment: 0}]},
    {product: '2', self_cost: 100, fullfillment: 100, history: [{ date: '2024-04-18', self_cost: 50, fullfillment: 50}, { date: '2024-08-18', self_cost: 75, fullfillment: 75}]}
]

const SelfCostTableWidget = () => {

    const [tableData, setTableData] = useState() // данные для рендера таблицы

    // задаем начальную дату
    // useEffect(() => {
    //     setTableData(stockAnalysisFilteredData)
    // }, [stockAnalysisFilteredData])


    // if (loading) {
    //     return (
    //         <div className={styles.widget}>
    //             <div className={styles.widget__loaderWrapper}>
    //                 <span className='loader'></span>
    //             </div>
    //         </div>
    //     )
    // }



    return (
        <div className={styles.widget}>

            <div className={`${styles.table} ${styles.table_leftMargin} ${styles.table_rightMargin}`}>

                {/* Хэдер */}
                <div className={styles.table__header}>
                    {/* Мапим массив значений заголовков */}
                    {tableConfig.values.map((v, id) => {

                        // определяем необходимые стили
                        const headerCellStyle = v.ruName === 'Товар' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : styles.table__headerItem
                        return (
                            <>
                                {/* Рендерим айтем заголовка таблицы с кнопками сортировки (если они нужны) */}
                                <div className={headerCellStyle} key={id}>
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
                                className={styles.table__row} key={id} id={`table_row_${id}`}
                                onMouseOver={(e) => {
                                    const { id } = e.target
                                    const rows = document.querySelectorAll(`#${id}`);
                                    if (rows) {
                                        rows.forEach(row => {
                                            row.style.background = '#F2F2F2'
                                        })
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const { id } = e.target
                                    const rows = document.querySelectorAll(`#${id}`);
                                    if (rows) {
                                        rows.forEach(row => {
                                            row.style.background = 'none'
                                        })
                                    }
                                }}
                            >
                                {/* Для каждого товара мапим заголовки таблицы еще раз и забираем из товара нужны данные (в первой колонке одновременно фото и название) */}
                                {t.values.map(((v, id) => {
                                    if (v.ruName === 'Товар') {
                                        return (
                                            <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`} key={id}>
                                                <div className={styles.table__rowImgWrapper}>
                                                    <img src={product.photo} width={30} height={40} />
                                                </div>
                                                <p className={styles.table__rowTitle}>{product[v.engName]}</p>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className={styles.table__rowItem} key={id}>{v.units ? formatPrice(product[v.engName], v.units) : product[v.engName]}</div>
                                        )
                                    }
                                }))}
                            </div>
                        )
                    })}
                    {tableData && tableData.length === 0 && id === 0 &&
                        <div className={styles.table__row}>
                            <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`}>
                                Ничего не найдено
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default SelfCostTableWidget;