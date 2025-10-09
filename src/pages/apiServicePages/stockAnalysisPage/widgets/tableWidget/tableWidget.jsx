import React, { useRef, useState, useEffect } from 'react';
import styles from './tableWidget.module.css';
import { tableConfig, sortTableDataFunc } from '../../shared';
import { formatPrice } from '../../../../../service/utils';
import { Tooltip, Pagination, ConfigProvider, Progress } from 'antd';
import { Table as RadarTable } from 'radar-ui';
import { newTableConfig } from '../../shared/configs/newTableConfig';

/**
 * Краткое описание:
 *
 * Общая таблица (супертаблица) рендерится на основе конфига (tableConfig) и состоит из нескольких маленьких таблиц
 * Разделил их по наличию заголовка, кроме самой перой (Товар) - тут искуственно отделен первый столбец для реализации фиксации первого столбца при
 * горизонтальном скроле.
 *
 * 1. Сначала мапим весь конфиг (сами таблицы)
 * 2. Далее внутри для каждой таблицы мапим массив заголовков
 * 3. Далее под хэдером таблицы еще раз мапим массив заголовков и внутри для каждого заголовка мапим уже данные забирая только нужные для конкретного заголовка и конкретной
 * таблицы
 * 4. В процессе расставляем стили в зависимости от позиции таблицы, элемента и тд
 */
//инит стейт сортировки
const initSortState = {
    sortedValue: 'saleSum',
    sortType: 'DESC',
};

const getABCBarOptions = (value) => {
    let bgColor = '#4AD99133';
    if (value === 'B') {
        bgColor = '#F0AD0033';
    }
    if (value === 'C') {
        bgColor = '#FB450033';
    }
    return bgColor;
}

const customCellRender = (value, record, index, dataIndex) => {
    const rightBorders = ['category', 'sold_cost', 'return_cost', 'product_cost_stock', 'from_client_sum', 'additionalPayment', 'lostRevenue', 'byProfit', 'minDiscountPrice', 'orderSum', 'completed', 'saleCountDay'];
    if (dataIndex === 'productName') {
        return <div className={styles.productCustomCell}>
            <img src={record.photo} width={30} height={40} alt='Product'></img>
            <div className={styles.productCustomCellTitle}>{value}</div>
            </div>;
    }
    if (dataIndex === 'byRevenue' || dataIndex === 'byProfit') {
        return (<div className={styles.productCustomCell} data-border-right={rightBorders.includes(dataIndex)}>
            <div
                className={styles.abcBar}
                style={{ backgroundColor: getABCBarOptions(value) }}
            >
                {value}
            </div>
        </div>);
    }

    return <div className={styles.customCell} data-border-right={rightBorders.includes(dataIndex)}>
        {typeof value === 'number' ? formatPrice(value, newTableConfig.map(item => item.children).flat().find(item => item.dataIndex === dataIndex)?.units || '') : value}
    </div>;
};


const TableWidget = ({ stockAnalysisFilteredData, loading, progress }) => {

    const containerRef = useRef(null); // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [tableData, setTableData] = useState(); // данные для рендера таблицы
    const [sortState, setSortState] = useState(initSortState); // стейт сортировки (см initSortState)
    const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 50 });

    // задаем начальную дату
    useEffect(() => {
        if (stockAnalysisFilteredData) {
            if (sortState.sortedValue && sortState.sortType) {
                setTableData([...sortTableDataFunc(sortState.sortType, sortState.sortedValue, stockAnalysisFilteredData)]);
                setPaginationState({ ...paginationState, total: Math.ceil([...sortTableDataFunc(sortState.sortType, sortState.sortedValue, stockAnalysisFilteredData)].length / paginationState.pageSize) });
            } else {
                setTableData(stockAnalysisFilteredData);
                setPaginationState({ ...paginationState, total: Math.ceil(stockAnalysisFilteredData.length / paginationState.pageSize) });
            }
        }
    }, [stockAnalysisFilteredData]);

    // хэндлер сортировки
    const sortButtonClickHandler = (sort_field, sort_order) => {
        // выключаем сортировку если нажата уже активная клавиша
        if (sortState.sortType === sort_order && sortState.sortedValue === sort_field) {
            setSortState(initSortState);
            setTableData(stockAnalysisFilteredData);
            setPaginationState({ ...paginationState, total: Math.ceil(stockAnalysisFilteredData.length / paginationState.pageSize), current: 1 });
            return;
        }

        // включаем сортировку и сортируем дату
        setSortState({
            sortedValue: sort_field,
            sortType: sort_order,
        });
        setTableData([...sortTableDataFunc(sort_order, sort_field, stockAnalysisFilteredData)]);
        setPaginationState({ ...paginationState, total: [...sortTableDataFunc(sort_order, sort_field, stockAnalysisFilteredData)].length, current: 1 });
    };

    const paginationHandler = (page) => {
        setPaginationState({ ...paginationState, current: page });
    };

    useEffect(() => {
        const { current } = containerRef;
        current?.scrollTo({ top: 0, behavior: 'smooth', duration: 100 });
    }, [paginationState.current]);

    if (loading) {
        return (
            <div className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                    {progress !== null && 
                        <div className={styles.loadingProgress}>
                            <Progress
                                percent={progress}
                                size='small'
                                showInfo={false}
                                strokeColor='#5329FF'
                                strokeLinecap={1}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }

    return (
        <div className={styles.widget__container}>
            <div className={styles.widget__scrollContainer} ref={containerRef}>
                {tableData && paginationState &&
                    <RadarTable
                        config={newTableConfig}
                        dataSource={tableData.slice((paginationState.current - 1) * paginationState.pageSize, paginationState.current * paginationState.pageSize)}
                        preset='radar-table-simple'
                        stickyHeader
                        onSort={sortButtonClickHandler}
                        pagination={{
                            current: paginationState.current,
                            pageSize: paginationState.pageSize,
                            total: paginationState.total,
                            onChange: (page, pageSize) => {
                                paginationHandler(page);
                            },
                            showQuickJumper: true,
                        }}
                        paginationContainerStyle={{
                            bottom: 0
                        }}
                        sorting={{sort_field: sortState?.sortedValue, sort_order: sortState?.sortType}}
                        scrollContainerRef={containerRef}
                        // bodyCellWrapperStyle={{
                        //     minHeight: '85px'
                        // }}
                        customCellRender={{
                            idx: [],
                            renderer: customCellRender,
                        }}
                        headerCellWrapperStyle={{
                            minHeight: '0px',
                            padding: '12px 10px',
                            fontSize: 'inherit',
                            //overflow: 'hidden',
                            //wekitBoxOrient: 'vertical',
                            //webkitLineClamp: 1,
                            //textWrap: 'nowrap',
                        }}
                        bodyCellWrapperStyle={{
                            padding: '5px 10px',
                            minWidth: 'inherit',
                            width: 'inherit',
                            maxWidth: 'inherit',
                            border: 'none',
                        }}
                        bodyCellStyle={{
                            borderBottom: '1px solid #E8E8E8',
                        }}
                        bodyRowClassName={styles.bodyRowSpecial}
                    />
                }
            </div>
        </div>
    );
};

export default TableWidget;
