import { ConfigProvider, Table, Button, Progress } from 'antd';
import { useRef, useMemo, useCallback, useState } from 'react';
import { Table as RadarTable } from 'radar-ui';
import styles from './TableWidget.module.css';

export default function TableWidget({ loading, columns, data, rowSelection = false, virtual = true, is_primary_collect, progress = null }) {
    const tableContainerRef = useRef(null);


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
		//setTableConfig(newConfig);
		document.removeEventListener('mousemove', mouseHandler);
	}

    if (!loading && !is_primary_collect) {
        return <></>
    }

    return (
        <div className={styles.container}>
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
                        dataSource={data}
                        scrollContainerRef={tableContainerRef}
                        stickyHeader={true}
                        customCellRender={{
                            idx: [],
                            renderer: customCellRender,
                        }}
                        style={{ fontFamily: 'Mulish' }}
                        pagination={false}
                        paginationContainerStyle={{ display: 'none' }}
                        bodyRowClassName={styles.bodyRowSpecial}
                    />
                }
            </div>
        </div>
    );
}


