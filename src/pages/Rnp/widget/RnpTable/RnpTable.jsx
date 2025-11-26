import React, { useRef, useState, useEffect } from 'react';
import { ConfigProvider, Table, Button, Tooltip } from 'antd';
import { Table as RadarTable, Tooltip as RadarTooltip } from 'radar-ui';
import { formatPrice } from '../../../../service/utils';
import styles from './RnpTable.module.css';
import { RadarRateMark } from '@/shared';
import { URL } from '@/service/config';

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
		</div>;
	}
	if (dataIndex === 'period' && record.isParent && value === 'Переходы (шт)') {
		return <div className={styles.customCellBoldTooltip}>
			<>{value}</>
			{/* {value === 'Переходы (шт)' &&
					<Tooltip
						title="Отображены только значения из аналитики рекламных кампаний"
						color="#FFFFFF"
						overlayInnerStyle={{ color: '#1A1A1A', fontSize: '14px' }}
					>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
						<path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
					</svg>
				</Tooltip>
				} */}
		</div>;
	}
	if (dataIndex === 'period' && !record.isParent) {
		return <div className={`${styles.customCell} ${styles.customCellIdent}`} data-rnp-is-last-child={record.isLastChild ? 'lastChild' : ''}>{value}</div>;
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

export default function RnpTable({ columns, data, columns2, data2, expanded, el }) {
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

		const currentId = el?.article_data?.wb_id;
		if (!currentId) return;

		// Пытаемся загрузить сохраненное состояние
		const savedState = localStorage.getItem('RNP_EXPANDED_TABLE_ROWS_STATE');

		if (savedState) {
			try {
				const parsedState = JSON.parse(savedState);
				// Если это состояние для текущего элемента, используем его
				if (parsedState.id === currentId && Array.isArray(parsedState.keys)) {
					setExpandedRowKeys(parsedState.keys);
					return;
				}
			} catch (error) {
				console.error('Ошибка при парсинге сохраненного состояния:', error);
			}
		}

		// Если нет сохраненного состояния или это другой элемент, раскрываем все строки
		const allKeys = data2.map((item) => item.id);
		setExpandedRowKeys(allKeys);
		localStorage.setItem('RNP_EXPANDED_TABLE_ROWS_STATE', JSON.stringify({ id: el.article_data.wb_id, keys: allKeys }));
	}, [data2, el?.article_data?.wb_id]);

	// Сохранение состояния при изменении раскрытых строк
	const handleExpandedRowsChange = (keys) => {
		setExpandedRowKeys(keys);

		// Сохраняем состояние в localStorage
		const currentId = el?.article_data?.wb_id;
		if (currentId) {
			const stateToSave = {
				id: currentId,
				keys: keys
			};
			localStorage.setItem('RNP_EXPANDED_TABLE_ROWS_STATE', JSON.stringify(stateToSave));
		}
	};

	return (
		<div className={styles.container}>
			{tableConfig && data2 &&
				<div className={styles.tableContainer} ref={containerRef}>
					<RadarTable
						key={containerRef?.current}
						rowKey={(record) => record.id}
						dataSource={data2}
						config={tableConfig}
						treeMode
						indentSize={45}
						expandedRowKeys={expandedRowKeys}
						onExpandedRowsChange={handleExpandedRowsChange}

						resizeable
						onResize={onResize}

						pagination={false}
						paginationContainerStyle={{ display: 'none' }}
						virtualization={{
							enabled: true,
							overscan: 10,
							estimateSize: 38,
						}}
						stickyHeader={true}
						scrollContainerRef={containerRef}
						style={{tableLayout: 'fixed', width: 'max-content'}}
						preset="radar-table-default"
						bodyRowClassName={styles.bodyRowSpecial}
						bodyRowStyle={{ height: '38px' }}
						bodyCellWrapperStyle={{ borderBottom: 'none', padding: '10.5px 12px', height: '38px' }}
						headerCellWrapperClassName={styles.headerCellWrapperCustomClassName}
						customCellRender={{
							idx: [],
							renderer: customCellRender,
						}}
						//benchmark={URL === 'https://test-server-pro.ru'}
					/>
				</div>}
		</div>
	);
}
