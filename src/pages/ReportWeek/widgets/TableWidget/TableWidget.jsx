import { useEffect } from 'react';
import { ConfigProvider, Table, Button, Progress } from 'antd';
import { useRef, useMemo, useCallback, useState } from 'react';
import { Table as RadarTable, Tooltip as RadarTooltip } from 'radar-ui';
import { Tooltip } from 'antd';
import styles from './TableWidget.module.css';
import { RadarRateMark } from '@/shared';
import { formatPrice } from '@/service/utils';

// Поля с обратным цветом индикации
const REVERT_INDICATION_FIELDS = new Set([
    'wb_commission_rub',
    'acquiring_rub',
    'advert_amount',
    'drr',
    'wb_retentions_amount',
    'return_rub', 
    'return_quantity',
    'logistics_straight_rub',
    'logistics_reverse_rub',
    'logistics_total_rub',
    'logistics_per_product',
    'storage_rub',
    'acceptance_rub',
    'tax_base',
    'tax',
    'penalties',
]);

// Поля с обратным цветом индикации
const NO_INDICATION_FIELDS = new Set([
    'cost_price',
    'cost_price_per_one',
]);

const customCellRender = (value, record, index, dataIndex) => {
    if (record.key === 'summary' && dataIndex === 'week_label') {
        return (
            <div className={styles.summaryCell}>
                {value}:
                <ConfigProvider
                    theme={{
                        components: {
                            Tooltip: {
                                colorBgSpotlight: '#ffffff',
                                colorTextLightSolid: '#000000',
                                colorBorder: '#d9d9d9'
                            }
                        }
                    }}
                >
                    <Tooltip title='Суммарные показатели за период'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                            <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                            <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                        </svg>
                    </Tooltip>
                </ConfigProvider>
            </div>
        );
    }
    
    if (record.key === 'summary' && dataIndex !== 'week_label') {
        return (
            <div className={styles.customCell}>
                {formatPrice(value, '')}
            </div>
        );
    }

    // Вариант с отображением tooltip при отсутствии данных за текущий период
    if (dataIndex === 'week_label' && record.noData) {
        return (
            <div className={styles.noDataCell}>
                {value}
                <ConfigProvider
                    theme={{
                        components: {
                            Tooltip: {
                                colorBgSpotlight: '#ffffff',
                                colorTextLightSolid: '#F93C65',
                                colorBorder: '#d9d9d9'
                            }
                        }
                    }}
                >
                    <Tooltip title='Данные за этот период еще собираются. Попробуйте позже'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                            <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" stroke="#F93C65" />
                            <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#F93C65" fillOpacity="0.5" />
                        </svg>
                    </Tooltip>
                </ConfigProvider>
            </div>
        );
    }

    if (typeof value === 'object') {
        return (
            <div className={styles.customCell}>
                {formatPrice(value.value, '')}
                <RadarRateMark 
                    value={value.comparison_percentage} 
                    units='%' 
                    inverseColors={REVERT_INDICATION_FIELDS.has(dataIndex)}
                    noColored={NO_INDICATION_FIELDS.has(dataIndex)}
                />
            </div>
        );
    }

    return (
        <>
            {value}
        </>
    );
};

export default function TableWidget({ loading, columns, data, rowSelection = false, virtual = true, is_primary_collect, progress = null, setTableColumns, configVersion }) {
    // console.log('columns', columns[0]);
    const tableContainerRef = useRef(null);
    const [sortState, setSortState] = useState({ sort_field: undefined, sort_order: undefined });

    const onResize = (columnKey, newWidth) => {

        // console.log('onResize', { columnKey, newWidth });
        const mouseHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        document.addEventListener('mousemove', mouseHandler);
        const newConfig = columns.map((col, index) => {
            if (col.key === columnKey) {
                return { ...col, width: newWidth };
            }
            return col;
        });
        localStorage.setItem('reportWeekTableConfig', JSON.stringify({
            version: configVersion,
            config: newConfig
        }));

        setTableColumns(newConfig);
    };

    useEffect(() => {
        setSortState({ sort_field: undefined, sort_order: undefined });
    }, [data]);

    if (loading) {
        return (
            <div className={styles.container} style={{ height: loading ? 'calc(100vh - 210px)' : 'auto' }}>
                <div className={styles.tableContainer} ref={tableContainerRef}>

                    <div className={styles.loading}>
                        <span className='loader'></span>
                        {progress !== null && <div className={styles.loadingProgress}>
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
            </div>
        );
    }

    if (!loading && !is_primary_collect) {
        return <></>;
    }

    return (
        <div className={styles.container} style={{ height: loading ? 'calc(100vh - 210px)' : 'auto' }}>
            {!loading && columns &&
                <div className={styles.tableContainer} ref={tableContainerRef}>
                    <RadarTable
                        key={JSON.stringify(columns)}
                        resizeable
                        onResize={onResize}
                        preset='radar-table-default'
                        config={columns.filter(col => !col.hidden)}
                        dataSource={(sortState.sort_field === undefined || sortState.sort_order === undefined) ? [...data] : [...data].sort((a, b) => {
                            if (a.key == 'summary' || b.key == 'summary') {
                                return 0;
                            }


                            let v1 = typeof a[sortState.sort_field] == 'object' ? a[sortState.sort_field]['rub'] : a[sortState.sort_field];
                            let v2 = typeof b[sortState.sort_field] == 'object' ? b[sortState.sort_field]['rub'] : b[sortState.sort_field];

                            if (sortState.sort_order === 'ASC') {
                                return Number(v1 - v2);
                            } else {
                                return Number(v2 - v1);
                            }
                        })}
                        customCellRender={{
                            idx: [],
                            renderer: customCellRender,
                        }}
                        scrollContainerRef={tableContainerRef}
                        stickyHeader={true}
                        style={{ fontFamily: 'Manrope', tableLayout: 'fixed' }}
                        pagination={false}
                        paginationContainerStyle={{ display: 'none' }}
                        bodyRowClassName={styles.bodyRowSpecial}
                        onSort={(sort_field, sort_order) => setSortState({ sort_field, sort_order })}
                        headerCellWrapperClassName={styles.headerCellWrapperCustomClass}
                        bodyCellWrapperClassName={styles.bodyCellWrapperCustomClass}
                    />
                </div>
            }
        </div>
    );
}

