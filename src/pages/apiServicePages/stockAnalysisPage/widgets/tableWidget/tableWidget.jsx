import React, { useRef, useState } from 'react'
import styles from './tableWidget.module.css'
import { tableConfig } from '../../shared'
import { formatPrice } from '../../../../../service/utils'

const TableWidget = ({ stockAnalysisData }) => {

    const containerRef = useRef(null)
    const [isXScrolled, setIsXScrolled] = useState(false)
    const [isEndOfXScroll, setIsEndOfXScroll] = useState(false)

    const scrollHandler = () => {
        if (containerRef && containerRef.current) {
            if (containerRef.current.scrollLeft > 1) {
                setIsXScrolled(true)
            } else {
                setIsXScrolled(false)
            }

            const delta = containerRef.current.scrollWidth - (containerRef.current.scrollLeft + containerRef.current.clientWidth);
            if (delta < 16) {
                setIsEndOfXScroll(true)
            } else {
                setIsEndOfXScroll(false)
            }
        }
    }

    return (
        <div className={styles.widget} style={{ borderRadius: isEndOfXScroll ? '16px' : '' }} onScroll={scrollHandler} ref={containerRef}>

            {tableConfig.map((t, id) => {
                const tableStyle = id === 0 ? `${styles.table} ${styles.table_leftMargin}` : id === tableConfig.length - 1 ? `${styles.table} ${styles.table_rightMargin}` : styles.table;
                const headerStyle = id === 0 ? `${styles.table__header} ${styles.table__header_leftRounded}` : id === tableConfig.length - 1 ? `${styles.table__header} ${styles.table__header_rightRounded}` : styles.table__header;

                return (
                    <div className={tableStyle} key={id} style={{ boxShadow: t.tableName === 'О товаре' && isXScrolled ? '10px 0 10px -5px rgba(0, 0, 0, 0.1)' : 'none' }}>
                        <p
                            className={id === 0 ? `${styles.table__title} ${styles.table__title_bigMargin}` : styles.table__title}
                            style={{ marginTop: t.tableName ? 0 : 24 }}
                        >
                            {t.tableName}
                        </p>

                        <div className={headerStyle}>
                            {t.values.map((v, id) => {
                                const headerCellStyle = v.ruName === 'Товар' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : styles.table__headerItem
                                return (
                                    <>
                                        <div className={headerCellStyle} key={id}>
                                            <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                        </div>
                                    </>
                                )
                            })}
                        </div>

                        <div className={styles.table__body}>
                            {stockAnalysisData && stockAnalysisData.map((product, id) => {
                                return (
                                    <div className={styles.table__row} key={id}>
                                        {t.values.map(((v, id) => {
                                            if (v.ruName === 'Товар') {
                                                return (
                                                    <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`}>
                                                        <div className={styles.table__rowImgWrapper}>
                                                            <img src={product.photo} width={30} height={40} />
                                                        </div>
                                                        <p className={styles.table__rowTitle}>{product[v.engName]}</p>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className={styles.table__rowItem}>{v.units ? formatPrice(product[v.engName], v.units) : product[v.engName]}</div>
                                                )
                                            }
                                        }))}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TableWidget;