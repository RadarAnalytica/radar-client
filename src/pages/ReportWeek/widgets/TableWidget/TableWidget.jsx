import { ConfigProvider, Table, Button, Progress } from 'antd';
import { useRef, useMemo, useCallback, useState } from 'react';
import { Table as RadarTable, Tooltip as RadarTooltip } from 'radar-ui';
import { Tooltip }from 'antd';
import styles from './TableWidget.module.css';


const customCellRender = (value, record, index, dataIndex) => {
    if (record.key === 'summary') {
        return (
            <div className={styles.summaryCell}>
                {value}
                <Tooltip title='Суммарные показатели за период'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}>
                        <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                        <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                </Tooltip>
            </div>
        )
    }
    return value;
}

export default function TableWidget({ loading, columns, data, rowSelection = false, virtual = true, is_primary_collect, progress = null, setTableColumns }) {
    const tableContainerRef = useRef(null);
    const [sortState, setSortState] = useState({ sort_field: undefined, sort_order: undefined });

    const onResize = (columnKey, newWidth) => {
        // console.log('onResize', { columnKey, newWidth });
        const mouseHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
        }

        document.addEventListener('mousemove', mouseHandler);
        const newConfig = columns.map((col, index) => {
            if (col.key === columnKey) {
                if (index === columns.length - 1) {
                    tableContainerRef.current?.scrollTo({
                        left: tableContainerRef.current?.scrollWidth - tableContainerRef.current?.clientWidth,
                        behavior: 'smooth'
                    });
                }
                return { ...col, width: newWidth, minWidth: newWidth };
            }
            return col;
        });
        localStorage.setItem('reportWeekTableConfig', JSON.stringify(newConfig))
        setTableColumns(newConfig);
        document.removeEventListener('mousemove', mouseHandler);
    }

    if (!loading && !is_primary_collect) {
        return <></>
    }

    return (
        <div className={styles.container} style={{ height: loading ? 'calc(100vh - 210px)' : 'auto' }}>
            <div className={styles.tableContainer} ref={tableContainerRef}>
                {loading && <div className={styles.loading}>
                    <span className='loader'></span>
                    {progress !== null && <div className={styles.loadingProgress}>
                        <Progress
                            percent={progress}
                            size='small'
                            showInfo={false}
                            strokeColor='#5329FF'
                            strokeLinecap={1}
                        />
                    </div>}
                </div>}
                {!loading &&
                    <RadarTable
                        resizeable
                        onResize={onResize}
                        preset='radar-table-default'
                        config={columns}
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
                            idx: ['week_label'],
                            renderer: customCellRender,
                        }}
                        scrollContainerRef={tableContainerRef}
                        stickyHeader={true}
                        style={{ fontFamily: 'Mulish' }}
                        pagination={false}
                        paginationContainerStyle={{ display: 'none' }}
                        bodyRowClassName={styles.bodyRowSpecial}
                        onSort={(sort_field, sort_order) => setSortState({ sort_field, sort_order })}
                    />
                }
            </div>
        </div>
    );
}


