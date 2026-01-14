import React, { useRef, useState, useEffect } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { formatPrice } from '../../../../service/utils';
import styles from './RnpTable.module.css';
import { RadarRateMark } from '@/shared';
import { ConfigProvider, Tooltip } from 'antd';

const customCellRender = (value, record, index, dataIndex) => {
	if (dataIndex === 'summary') {
		return (
			<>
				{typeof value === 'object' ?
					<div className={`${styles.customCell_WithRateMark}`}>
						<div className={styles.customCellBold}>{formatPrice(value.value, '')}</div>
						{(value.comparison_percentage !== undefined && value.comparison_percentage !== null) && <RadarRateMark value={value.comparison_percentage} units='%' />}
					</div> :
					<div className={styles.customCell}>{formatPrice(value, '')}</div>}
			</>
		)
	}
	if (dataIndex === 'period' && record.isParent && value !== 'Переходы (шт)') {
		return <div className={styles.customCellBold}>
			{value}
			{record?.tooltip && (
				<ConfigProvider
					theme={{
						components: {
							Tooltip: {
								colorBgSpotlight: '#FFFFFF',
								colorTextLightSolid: '#000000',
								fontSize: 12,
							},
						},
					}}
				>
					<Tooltip title={record?.tooltip}>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', minWidth: '20px', minHeight: '20px', marginLeft: '8px' }}>
							<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
							<path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
						</svg>
					</Tooltip>
				</ConfigProvider>
			)}
		</div>;
	}
	if (dataIndex === 'period' && record.isParent && value === 'Переходы (шт)') {
		return <div className={styles.customCellBoldTooltip}>
			<>
				{value}
				{record?.tooltip && (
					<ConfigProvider
						theme={{
							components: {
								Tooltip: {
									colorBgSpotlight: '#FFFFFF',
									colorTextLightSolid: '#000000',
									fontSize: 12,
								},
							},
						}}
					>
						<Tooltip title={record?.tooltip}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', minWidth: '20px', minHeight: '20px', marginLeft: '8px' }}>
								<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
								<path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
							</svg>
						</Tooltip>
					</ConfigProvider>
				)}
			</>
		</div>;
	}
	if (dataIndex === 'period' && !record.isParent) {
		return <div className={`${styles.customCell} ${styles.customCellIdent}`} data-rnp-is-last-child={record.isLastChild ? 'lastChild' : ''}>
			{value}
			{record?.tooltip && (
				<ConfigProvider
					theme={{
						components: {
							Tooltip: {
								colorBgSpotlight: '#FFFFFF',
								colorTextLightSolid: '#000000',
								fontSize: 12,
							},
						},
					}}
				>
					<Tooltip title={record?.tooltip}>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', minWidth: '20px', minHeight: '20px', marginLeft: '8px' }}>
							<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
							<path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
						</svg>
					</Tooltip>
				</ConfigProvider>
			)}
		</div>;
	}
	return (
		<>
			{typeof value === 'object' ?
				<div className={`${styles.customCell_WithRateMark}`}>
					<div className={styles.customCell}>{formatPrice(value.value, '')}</div>
					{(value.comparison_percentage !== undefined && value.comparison_percentage !== null) && <RadarRateMark value={value.comparison_percentage} units='%' />}
				</div> :
				<div className={styles.customCell}>{formatPrice(value, '')}</div>}
		</>
	);
};

export default function RnpTableTotal({ loading, columns, data, columns2, data2, expanded, el, resizeMode }) {
	// table config
	const [tableConfig, setTableConfig] = useState();
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
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
				return { ...col, width: newWidth };
			}
			return col;
		});
		setTableConfig(newConfig);
	};

	// update table config when columns2 changes
	useEffect(() => {
		setTableConfig(columns2);
	}, [columns2]);

	// Инициализация состояния раскрытых строк
	useEffect(() => {
		if (!data2 || data2.length === 0) return;

		// Пытаемся загрузить сохраненное состояние
		const savedState = localStorage.getItem('RNP_EXPANDED_TOTAL_TABLE_ROWS_STATE');

		if (savedState) {
			try {
				const parsedState = JSON.parse(savedState);
				setExpandedRowKeys(parsedState);
				return;
			} catch (error) {
				console.error('Ошибка при парсинге сохраненного состояния:', error);
			}
		}

		// Если нет сохраненного состояния или это другой элемент, раскрываем все строки
		const allKeys = data2.map((item) => item.id);
		setExpandedRowKeys(allKeys);
		localStorage.setItem('RNP_EXPANDED_TOTAL_TABLE_ROWS_STATE', JSON.stringify(allKeys));
	}, [data2]);

	// Сохранение состояния при изменении раскрытых строк
	const handleExpandedRowsChange = (keys) => {
		setExpandedRowKeys(keys);
		localStorage.setItem('RNP_EXPANDED_TOTAL_TABLE_ROWS_STATE', JSON.stringify(keys));
	};

	return (
		<div className={styles.container} >
			<div className={styles.tableContainer}>
				{loading && <div className={styles.loading}>
					<span className='loader'></span>
				</div>}
			</div>
			{tableConfig &&
				<div className={styles.tableContainer} ref={containerRef}>
					<RadarTable
						rowKey={(record) => record.id}

						dataSource={data2}
						config={tableConfig}

						treeMode
						indentSize={45}
						expandedRowKeys={expandedRowKeys}
						onExpandedRowsChange={handleExpandedRowsChange}
						resizeMode={resizeMode}
						resizeable
						onResize={onResize}

						pagination={false}
						paginationContainerStyle={{ display: 'none' }}

						stickyHeader={true}
						scrollContainerRef={containerRef}

						preset="radar-table-default"
						bodyRowClassName={styles.bodyRowSpecial}
						bodyCellWrapperStyle={{ borderBottom: 'none', padding: '10.5px 12px' }}
						headerCellWrapperClassName={styles.headerCellWrapperCustomClassName}
						customCellRender={{
							idx: tableConfig?.map((col) => col.dataIndex) || [],
							renderer: customCellRender,
						}}
					/>
				</div>
			}
		</div>
	);
}
