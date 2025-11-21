import React, { useRef, useState, useEffect } from 'react';
import styles from './tableWidget.module.css';
import { tableConfig, sortTableDataFunc, CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER } from '../../shared';
import { formatPrice } from '../../../../../service/utils';
import { Tooltip, Pagination, ConfigProvider, Progress } from 'antd';
import { Table as RadarTable } from 'radar-ui';
import { newTableConfig } from '../../shared/configs/newTableConfig';
import { RadarRateMark } from '@/shared';
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

const comparsionsList = {
    "saleSum": "sale_sum_comparison",
    "quantity": "quantity_comparison",
    "lessReturns": "less_returns_comparison",
    "costGoodsSold": "sold_cost_comparison",
    "sold_cost": "sold_cost_comparison",
    "returnsSum": "returns_sum_comparison",
    "returnsQuantity": "returns_quantity_comparison",
    "returnsCostSold": "return_cost_comparison",
    "return_cost": "return_cost_comparison",
    "toClient": "to_client_comparison",
    "to_client_sum": "to_client_sum_comparison",
    "fromClient": "from_client_comparison",
    "from_client_sum": "from_client_sum_comparison",
    "commissionWB": "commission_wb_comparison",
    "fines": "fines_comparison",
    "additionalPayment": "additional_payment_comparison",
    "toPayoff": "to_payoff_comparison",
    "marginalProfit": "marginal_profit_comparison",
    "averageProfit": "average_profit_comparison",
    "profitabilityOfProductsSold": "profitability_of_products_sold_comparison",
    "marginal": "marginal_comparison",
    "annualReturnOnInventory": "annual_return_on_inventory_comparison",
    "lostRevenue": "lost_revenue_comparison",
    "purchased": "purchased_comparison",
    "notPurchased": "not_purchased_comparison",
    "purchasedPercent": "purchased_percent_comparison",
    "completed": "completed_comparison",
    "saleCountDay": "sale_count_day_comparison"
  }

const customCellRender = (value, record, index, dataIndex) => {
    const [isImgVisible, setIsImgVisible] = useState(true);
    const comparsionKey = comparsionsList[dataIndex]
    const comparsion = record[comparsionKey]
    const rightBorders = ['category', 'sold_cost', 'return_cost', 'product_cost_stock', 'from_client_sum', 'additionalPayment', 'lostRevenue', 'byProfit', 'minDiscountPrice', 'orderSum', 'completed', 'saleCountDay'];
   
    if (dataIndex === 'productName') {
        return (
            <div className={styles.productCustomCell}>
                <div className={styles.productCustomCellImgWrapper}>
                    {isImgVisible && <img 
                        src={record.photo} 
                        width={30} 
                        height={40} 
                        alt='Product'
                        onError={(e) => { e.target.style.display = 'none'; setIsImgVisible(false); }}
                    ></img>}
                </div>
                <div className={styles.productCustomCellTitle} title={value}><span>{value}</span></div>
            </div>
        );
    }
    if (dataIndex === 'vendorСode' || dataIndex === 'sku' || dataIndex === 'size') {
        return (
            <div className={styles.fixedCell}>
                <div className={styles.fixedCellTitle} title={value}><span>{value?.toString()}</span></div>
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
        {comparsion !== null && comparsion !== undefined && <RadarRateMark value={comparsion} units='%' />}
    </div>;
};


const TableWidget = ({ stockAnalysisFilteredData, loading, progress, config, initPaginationState, hasShadow = true, configVersion, configKey, maxHeight }) => {
    const containerRef = useRef(null); // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [tableData, setTableData] = useState(); // данные для рендера таблицы
    const [sortState, setSortState] = useState(initSortState); // стейт сортировки (см initSortState)
    const [paginationState, setPaginationState] = useState(initPaginationState || { current: 1, total: 1, pageSize: 25 });
    const [tableConfig, setTableConfig] = useState(config || newTableConfig);

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
                return sum + child.width;
              }, 0);
              return { ...col, children: updatedChildren };
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
            localStorage.setItem(configKey, JSON.stringify({
                version: configVersion,
                config: updatedConfig
            }));
            return [...updatedConfig];
        });
    };

    useEffect(() => {
        let savedTableConfigData = localStorage.getItem(configKey);
        if (savedTableConfigData) {
            try {
                const parsed = JSON.parse(savedTableConfigData);
                
                // Проверяем версию конфига
                if (parsed.version === configVersion) {
                    setTableConfig(parsed.config);
                } else {
                    // Версия не совпадает, используем дефолтный конфиг
                    console.log('Table config version mismatch, using default config');
                    setTableConfig(newTableConfig);
                    // localStorage.setItem(configKey, JSON.stringify({
                    //     version: configVersion,
                    //     config: newTableConfig
                    // }));
                }
            } catch (error) {
                console.error('Error parsing saved table config:', error);
                setTableConfig(newTableConfig);
                // localStorage.setItem(configKey, JSON.stringify({
                //     version: configVersion,
                //     config: newTableConfig
                // }));
            }
        } else {
            setTableConfig(newTableConfig);
            // localStorage.setItem(configKey, JSON.stringify({
            //     version: configVersion,
            //     config: newTableConfig
            // }));
        }
    }, []);

    useEffect(() => {
        const { current } = containerRef;
        current?.scrollTo({ top: 0, behavior: 'smooth', duration: 100 });
    }, [paginationState.current]);


    if (loading) {
        return <Loader loading={loading} progress={progress} />;
    }


    return (
        <div className={styles.widget__container} style={{ boxShadow: hasShadow ? '' : 'none' }}>
            <div className={styles.widget__scrollContainer} ref={containerRef} style={{ maxHeight: maxHeight ?? '100%' }}>
                {tableData && tableData.length > 0 && tableConfig &&
                    <RadarTable
                        config={tableConfig}
                        dataSource={[...tableData.slice((paginationState.current - 1) * paginationState.pageSize, paginationState.current * paginationState.pageSize)]}
                        preset='radar-table-simple'
                        stickyHeader
                        resizeable
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
                            hideOnSinglePage: true,
                        }}
                        paginationContainerStyle={{
                            bottom: 0
                        }}
                        //sorting={{ sort_field: sortState?.sortedValue, sort_order: sortState?.sortType }}
                        scrollContainerRef={containerRef}
                        customCellRender={{
                            idx: [],
                            renderer: customCellRender,
                        }}
                        headerCellWrapperStyle={{
                            fontSize: 'inherit',
                            //overflow: 'hidden',
                            //wekitBoxOrient: 'vertical',
                            //webkitLineClamp: 1,
                            //textWrap: 'nowrap',
                            padding: '12px 25px 12px 10px'
                        }}
                        bodyCellWrapperStyle={{
                            //minWidth: 'inherit',
                            //width: 'inherit',
                            //maxWidth: 'inherit',
                            padding: '5px 10px',
                            border: 'none',
                        }}
                        bodyCellStyle={{
                            borderBottom: '1px solid #E8E8E8',
                            height: '50px',
                        }}
                        bodyRowClassName={styles.bodyRowSpecial}
                        style={{ width: 'max-content', tableLayout: 'fixed' }}
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
                            hideOnSinglePage: true,
                        }}
                        paginationContainerStyle={{
                            bottom: 0,
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
                            padding: '12px 10px',
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
