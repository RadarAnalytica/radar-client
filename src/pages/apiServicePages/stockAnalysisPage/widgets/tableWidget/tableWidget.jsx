import React, { useRef, useState, useEffect } from 'react';
import styles from './tableWidget.module.css';
import { tableConfig, sortTableDataFunc, CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER } from '../../shared';
import { formatPrice } from '../../../../../service/utils';
import { Tooltip, Pagination, ConfigProvider, Progress } from 'antd';
import { Table as RadarTable } from 'radar-ui';
import { newTableConfig } from '../../shared/configs/newTableConfig';
import Loader from '@/components/ui/Loader';

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
        return (
            <div className={styles.productCustomCell}>
                <div className={styles.productCustomCellImgWrapper}>
                    <img 
                        src={record.photo} 
                        width={30} 
                        height={40} 
                        alt='Product'
                        onError={(e) => { e.target.style.display = 'none'; }}
                    ></img>
                </div>
                <div className={styles.productCustomCellTitle} title={value}>{value}</div>
            </div>
        );
    }
    if (dataIndex === 'byRevenue' || dataIndex === 'byProfit') {
        return (<div className={styles.productCustomCell} data-border-right={rightBorders.includes(dataIndex)}>
            <div
                className={styles.abcBar}
                style={{ backgroundColor: getABCBarOptions(value) }}
                title={value}
            >
                {value}
            </div>
        </div>);
    }

    return <div className={styles.customCell} data-border-right={rightBorders.includes(dataIndex)} title={typeof value === 'number' ? formatPrice(value, newTableConfig.map(item => item.children).flat().find(item => item.dataIndex === dataIndex)?.units || '') : value}>
        {typeof value === 'number' ? formatPrice(value, newTableConfig.map(item => item.children).flat().find(item => item.dataIndex === dataIndex)?.units || '') : value}
    </div>;
};


const TableWidget = ({ stockAnalysisFilteredData, loading, progress }) => {

    const containerRef = useRef(null); // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [tableData, setTableData] = useState(); // данные для рендера таблицы
    const [sortState, setSortState] = useState(initSortState); // стейт сортировки (см initSortState)
    const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 25 });
    const [tableConfig, setTableConfig] = useState();

    // задаем начальную дату
    useEffect(() => {
        if (stockAnalysisFilteredData) {
            if (sortState.sortedValue && sortState.sortType) {
                setTableData([...sortTableDataFunc(sortState.sortType, sortState.sortedValue, stockAnalysisFilteredData)]);
                setPaginationState({ current: 1, pageSize: paginationState.pageSize, total: Math.ceil([...sortTableDataFunc(sortState.sortType, sortState.sortedValue, stockAnalysisFilteredData)].length / paginationState.pageSize) });
            } else {
                setTableData(stockAnalysisFilteredData);
                setPaginationState({ current: 1, pageSize: paginationState.pageSize, total: Math.ceil(stockAnalysisFilteredData.length / paginationState.pageSize) });
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
        setPaginationState({ ...paginationState, total: Math.ceil([...sortTableDataFunc(sort_order, sort_field, stockAnalysisFilteredData)].length / paginationState.pageSize), current: 1 });
    };

    const paginationHandler = (page) => {
        setPaginationState({ ...paginationState, current: page });
    };

    const onResizeGroup = (columnKey, width) => {
        
        // Обновляем конфигурацию колонок с группированной структурой
        const updateColumnWidth = (columns) => {
          return columns.map(col => {
            // Если это группа с children
            if (col.children && col.children.length > 0) {
              const updatedChildren = updateColumnWidth(col.children);

              // Всегда пересчитываем ширину группы на основе суммы ширин дочерних колонок
              const totalWidth = updatedChildren.reduce((sum, child) => {
                if (child.hidden) return sum; // Пропускаем скрытые колонки
                return sum + (child.width || child.minWidth || 200);
              }, 0);
              return { ...col, width: totalWidth, children: updatedChildren, minWidth: totalWidth };
            }

            // Если это листовая колонка
            if (col.key === columnKey) {
              // Применяем минимальную ширину
              const newWidth = width;
              return { ...col, width: newWidth };
            }

            return col;
          });
        };

        // Обновляем состояние
        setTableConfig(prevConfig => {
            const updatedConfig = updateColumnWidth(prevConfig);
            localStorage.setItem('STOCK_ANALYSIS_TABLE_CONFIG', JSON.stringify({
                version: CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER,
                config: updatedConfig
            }));
            return updatedConfig;
        });
    };

    useEffect(() => {
        let savedTableConfigData = localStorage.getItem('STOCK_ANALYSIS_TABLE_CONFIG');
        if (savedTableConfigData) {
            try {
                const parsed = JSON.parse(savedTableConfigData);
                
                // Проверяем версию конфига
                if (parsed.version === CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER) {
                    setTableConfig(parsed.config);
                } else {
                    // Версия не совпадает, используем дефолтный конфиг
                    console.log('Table config version mismatch, using default config');
                    setTableConfig(newTableConfig);
                    localStorage.setItem('STOCK_ANALYSIS_TABLE_CONFIG', JSON.stringify({
                        version: CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER,
                        config: newTableConfig
                    }));
                }
            } catch (error) {
                console.error('Error parsing saved table config:', error);
                setTableConfig(newTableConfig);
                localStorage.setItem('STOCK_ANALYSIS_TABLE_CONFIG', JSON.stringify({
                    version: CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER,
                    config: newTableConfig
                }));
            }
        } else {
            setTableConfig(newTableConfig);
            localStorage.setItem('STOCK_ANALYSIS_TABLE_CONFIG', JSON.stringify({
                version: CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER,
                config: newTableConfig
            }));
        }
    }, []);

    useEffect(() => {
        const { current } = containerRef;
        current?.scrollTo({ top: 0, behavior: 'smooth', duration: 100 });
    }, [paginationState.current]);


    if (loading) {
        return <Loader loading={loading} progress={progress} />;
    }

    console.log('tableConfig', tableConfig);

    return (
        <div className={styles.widget__container}>
            <div className={styles.widget__scrollContainer} ref={containerRef}>
                {tableData && tableData.length > 0 && tableConfig &&
                    <RadarTable
                        config={tableConfig}
                        dataSource={[...tableData.slice((paginationState.current - 1) * paginationState.pageSize, paginationState.current * paginationState.pageSize)]}
                        preset='radar-table-simple'
                        stickyHeader
                        resizeable
                        resizeThrottle={33}
                        onResize={onResizeGroup}
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
                        sorting={{ sort_field: sortState?.sortedValue, sort_order: sortState?.sortType }}
                        scrollContainerRef={containerRef}
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
                            //minWidth: 'inherit',
                            //width: 'inherit',
                            //maxWidth: 'inherit',
                            border: 'none',
                        }}
                        bodyCellStyle={{
                            borderBottom: '1px solid #E8E8E8',
                            height: '50px',
                        }}
                        bodyRowClassName={styles.bodyRowSpecial}
                    />
                }
                {tableData && tableData.length === 0 && tableConfig &&
                    <RadarTable
                        config={tableConfig}
                        dataSource={tableData}
                        preset='radar-table-simple'
                        stickyHeader
                        resizeable
                        onResize={onResizeGroup}
                        onSort={sortButtonClickHandler}
                        style={{ width: 'max-content', tableLayout: 'fixed' }}
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
                        sorting={{ sort_field: sortState?.sortedValue, sort_order: sortState?.sortType }}
                        scrollContainerRef={containerRef}
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
                            height: '50px',
                        }}
                        bodyRowClassName={styles.bodyRowSpecial}
                    />
                }
            </div>
        </div>
    );
};

export default TableWidget;
