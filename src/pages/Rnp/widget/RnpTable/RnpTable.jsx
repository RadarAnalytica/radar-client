import React, { useRef, useState, useEffect } from 'react';
import { ConfigProvider, Table, Button } from 'antd';
import { Table as RadarTable } from 'radar-ui';
import { formatPrice } from '../../../../service/utils';
import styles from './RnpTable.module.css';

const customCellRender = (value, record, index, dataIndex) => {

	if (dataIndex === 'summary') {
		return <div className={styles.customCellBold}>{formatPrice(value, '')}</div>
	}
	if (dataIndex === 'period' && record.isParent) {
		return <div className={styles.customCellBold}>{value}</div>
	}
	if (dataIndex === 'period' && !record.isParent) {
		return <div className={styles.customCell} data-rnp-is-last-child={record.isLastChild ? 'lastChild' : ''}>{value}</div>
	}
	return (
		<div className={styles.customCell}>{value}</div>
	);
}

export default function RnpTable({ loading, columns, data, columns2, data2 }) {
	// table config
	const [tableConfig, setTableConfig] = useState()
	// ref of scroll container
	const containerRef = useRef(null);

	// resize handler for radar table
	const onResize = (columnKey, newWidth) => {
		const newConfig = tableConfig.map((col, index) => {
			if (col.key === columnKey) {
				if (index === tableConfig.length - 1) {
					containerRef.current?.scrollTo({
						left: containerRef.current?.scrollWidth - containerRef.current?.clientWidth,
						behavior: 'smooth'
					});
				}
				return { ...col, width: newWidth, minWidth: newWidth };
			}
			return col;
		});
		setTableConfig(newConfig);
	}

	// update table config when columns2 changes
	useEffect(() => {
		setTableConfig(columns2)
	}, [columns2])

	return (
		<div className={styles.container} >
			<div className={styles.tableContainer}>
				{loading && <div className={styles.loading}>
					<span className='loader'></span>
				</div>}
			</div>
			{!loading && tableConfig &&
				<div className={styles.tableContainer} ref={containerRef}>
					<RadarTable
						dataSource={data2}
						config={tableConfig}

						treeMode
						indentSize={45}
						defaultExpandedRowKeys={[JSON.stringify(data2[0])]}

						resizeable
						onResize={onResize}

						pagination={false}
						paginationContainerStyle={{ display: 'none' }}
						
						stickyHeader={true}
						scrollContainerRef={containerRef}

						preset="radar-table-default"
						bodyRowClassName={styles.bodyRowSpecial}
						bodyCellWrapperStyle={{ borderBottom: 'none' }}
						headerCellWrapperClassName={styles.headerCellWrapperCustomClassName}

						customCellRender={{
							idx: ['summary', 'period'],
							renderer: customCellRender,
						}}
					/>
				</div>
			}
		</div>
	);
}