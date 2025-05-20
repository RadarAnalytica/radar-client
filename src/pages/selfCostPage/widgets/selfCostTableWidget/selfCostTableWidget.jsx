import React, { useEffect, useRef, useState, useContext } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import styles from './selfCostTableWidget.module.css'
import { tableConfig } from '../../shared'
import { TableRow } from '../../features'
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal'
import { URL } from '../../../../service/config'
import AuthContext from '../../../../service/AuthContext'

const initDataStatus = {
    isError: false,
    isLoading: false,
    message: ''
}

const SelfCostTableWidget = ({ 
    setIsSuccess,
    dataStatus,
    tableData,
    authToken,
    activeBrand,
    getTableData,
    setDataStatus
 }) => {

    if (dataStatus.isLoading) {
        return (
            <div className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }



    return (
        <div className={styles.widget}>
            <div className={styles.widget__container}>
                <div className={`${styles.table} ${styles.table_leftMargin} ${styles.table_rightMargin}`}>

                    {/* Хэдер */}
                    <div className={styles.table__header}>
                        {/* Мапим массив значений заголовков */}
                        <div className={styles.table__headerContainer}>
                            {tableConfig.values.map((v, id) => {

                                // определяем необходимые стили
                                const headerCellStyle = v.ruName === 'Продукт' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : v.ruName === 'Фулфилмент' ? `${styles.table__headerItem} ${styles.table__headerItem_full}` : styles.table__headerItem
                                return (
                                        <div className={headerCellStyle} key={id}>
                                            <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                        </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Тело таблицы */}
                    <div className={styles.table__body}>
                        {/* Мапим данные о товарах */}
                        {tableData && tableData.length > 0 && activeBrand && tableData?.map((product, id) => {
                            return (
                                <TableRow
                                    key={id}
                                    currentProduct={product}
                                    getTableData={getTableData}
                                    authToken={authToken}
                                    setDataStatus={setDataStatus}
                                    initDataStatus={initDataStatus}
                                    shopId={activeBrand?.id}
                                    setIsSuccess={setIsSuccess}
                                />
                            )
                        })}
                        {tableData && tableData.length === 0 &&
                            <div className={styles.table__row}>
                                <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`}>
                                    Ничего не найдено
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelfCostTableWidget;
