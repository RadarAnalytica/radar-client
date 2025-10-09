import React, { useState, useEffect } from 'react';
import styles from './selfCostTableWidget.module.css';
import { tableConfig } from '../../shared';
import { TableRow } from '../../features';
import { Pagination, ConfigProvider } from 'antd';

const initDataStatus = {
    isError: false,
    isLoading: false,
    message: ''
};

const SelfCostTableWidget = ({
    setIsSuccess,
    dataStatus,
    tableData,
    authToken,
    activeBrand,
    getTableData,
    setDataStatus,
    setTableData,
    resetSearch
}) => {
    const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 50 });
    
    const paginationHandler = (page) => {
        setPaginationState({ ...paginationState, current: page });
    };

    useEffect(() => {
        setPaginationState({ current: 1, total: tableData?.length, pageSize: 50 });
    }, [tableData]);

    useEffect(() => {
        const paginationNextButton = document.querySelector('.ant-pagination-jump-next');
        const paginationPrevButton = document.querySelector('.ant-pagination-jump-prev');
        const paginationSingleNextButton = document.querySelector('.ant-pagination-next');
        const paginationSinglePrevButton = document.querySelector('.ant-pagination-prev');
        if (paginationNextButton) {
         paginationNextButton.setAttribute('title', 'Следующие 5 страниц');
        }
        if (paginationSingleNextButton) {
         paginationSingleNextButton.setAttribute('title', 'Следующая страница');
        }
        if (paginationSinglePrevButton) {
         paginationSinglePrevButton.setAttribute('title', 'Предыдущая страница');
        }
        if (paginationPrevButton) {
         paginationPrevButton.setAttribute('title', 'Предыдущие 5 страниц');
        }
    }, [paginationState]);

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
                                const headerCellStyle = v.ruName === 'Продукт' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : v.ruName === 'Фулфилмент' ? `${styles.table__headerItem} ${styles.table__headerItem_full}` : styles.table__headerItem;
                                return (
                                    <div className={headerCellStyle} key={id}>
                                        <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Тело таблицы */}
                    <div className={styles.table__body}>
                        {/* Мапим данные о товарах */}
                        {tableData && tableData.length > 0 && activeBrand && tableData?.map((product, id) => {
                            const minRange = (paginationState.current - 1) * paginationState.pageSize;
                            const maxRange = paginationState.current * paginationState.pageSize;
                            return id >= minRange && id < maxRange && (
                                <TableRow
                                    key={product.product}
                                    currentProduct={product}
                                    getTableData={getTableData}
                                    authToken={authToken}
                                    setDataStatus={setDataStatus}
                                    initDataStatus={initDataStatus}
                                    shopId={activeBrand?.id}
                                    setIsSuccess={setIsSuccess}
                                    dataStatus={dataStatus}
                                    setTableData={setTableData}
                                    tableData={tableData}
                                    resetSearch={resetSearch}
                                />
                            );
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
            <ConfigProvider
                theme={{
                    token: {
                        colorText: '#5329FF',
                        lineWidth: 0,
                        colorPrimary: '#5329FF'
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
                />
            </ConfigProvider>
        </div>
    );
};

export default SelfCostTableWidget;
