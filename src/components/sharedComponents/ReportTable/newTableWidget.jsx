import { ConfigProvider, Table, Button, Progress } from 'antd';
import { useRef, useMemo, useCallback, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { formatPrice } from '../../../service/utils';
import styles from './newTableWidget.module.css';

const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];


const customCellRender = (value, record, index, dataIndex) => {

	let yearAttribute = '';
	if (years.some(year => year.toString() === dataIndex.toString())) {
		yearAttribute = 'profitLossYearCell';
	}

	if (record.article === 'Прямые расходы') {
		if (typeof value === 'object') {
			return (
				<div className={styles.customCell} data-year-attribute={yearAttribute}>
					<span className={styles.customCellValueRub} title={formatPrice(value.rub, '₽')}><b>{formatPrice(value.rub, '₽')}</b></span>
					<span className={styles.customCellValuePercent} title={formatPrice(value.percent, '%')}><b>{formatPrice(value.percent, '%')}</b></span>
				</div>
			);
		}
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} title={value}><b>{value}</b></span>
			</div>
		);
	}

	if (
		dataIndex === 'article' &&
		(record.article === 'Себестоимость' || record.article === 'Внутренняя реклама' || record.article === 'Хранение' || record.article === 'Платная приемка' || record.article === 'Комиссия' || record.article === 'Логистика' || record.article === 'Штрафы')
	) {
		return (
			<div className={`${styles.customCell} ${styles.customCellChildren}`} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} style={{ color: 'rgba(0, 0, 0, .5)'}} title={value}>{value}</span>
			</div>
		);
	}
	if (dataIndex !== 'article' &&
		(record.article === 'Себестоимость' || record.article === 'Внутренняя реклама' || record.article === 'Хранение' || record.article === 'Платная приемка' || record.article === 'Комиссия' || record.article === 'Логистика' || record.article === 'Штрафы')
	) {
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueRub} style={{ color: 'rgba(0, 0, 0, .5)'}} title={formatPrice(value.rub, '₽')}>{formatPrice(value.rub, '₽')}</span>
				<span className={styles.customCellValuePercent} style={{ color: 'rgba(0, 0, 0, .5)'}} title={formatPrice(value.percent, '%')}>{formatPrice(value.percent, '%')}</span>
			</div>
		);
	}
	if (typeof value === 'object') {
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueRub} title={formatPrice(value.rub, '₽')}>{formatPrice(value.rub, '₽')}</span>
				{record.article !== 'Фактические продажи' && <span className={styles.customCellValuePercent} title={formatPrice(value.percent, '%')}>{formatPrice(value.percent, '%')}</span>}
			</div>
		);
	}
	return (
		<div className={styles.customCell} data-year-attribute={yearAttribute}>
			<span className={styles.customCellValueText} title={value}>{value}</span>
		</div>
	);


};


const TableWidget = ({ loading, columns, data, rowSelection = false, virtual = true, is_primary_collect, progress = null, setTableConfig }) => {
	const tableContainerRef = useRef(null);
	const expandedRows = [...data].filter(_ => _.isExpanded).map(_ => JSON.stringify(_)).filter(Boolean);

	const onResize = (columnKey, newWidth) => {
		const mouseHandler = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};

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
		setTableConfig(newConfig);
		document.removeEventListener('mousemove', mouseHandler);
	};


	if (!loading && !is_primary_collect) {
		return <></>;
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
						treeMode={true}
						indentSize={30}
						onResize={onResize}
						layout='vertical'
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
						defaultExpandedRowKeys={expandedRows}
					/>
				}
			</div>
		</div>
	);
};

export default TableWidget;

