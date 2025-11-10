import { Table, Button, Progress } from 'antd';
import { useRef, useMemo, useCallback, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { formatPrice } from '../../../service/utils';
import { RadarRateMark } from '@/shared';
import styles from './newTableWidget.module.css';
import { Tooltip, ConfigProvider } from 'antd';
const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];


const customCellRender = (value, record, index, dataIndex) => {
	console.log('record', record);
	let yearAttribute = '';
	if (years.some(year => year.toString() === dataIndex.toString())) {
		yearAttribute = 'profitLossYearCell';
	}

	if (record.article === 'Прямые расходы') {
		if (typeof value === 'object') {
			return (
				<div className={styles.customCell} data-year-attribute={yearAttribute}>
					<span className={styles.customCellValueText} title={formatPrice(value.rub.value, '₽')}><b>{formatPrice(value.rub.value, '₽')}</b></span>
					{!yearAttribute && value.rub.comparison_percentage !== null && value.rub.comparison_percentage !== undefined && <RadarRateMark value={value.rub.comparison_percentage} units='%' />}
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
		(record.article === 'Себестоимость' || record.article === 'Внутренняя реклама' || record.article === 'Хранение' || record.article === 'Платная приемка' || record.article === 'Комиссия' || record.article === 'Логистика' || record.article === 'Штрафы и прочие удержания')
	) {
		return (
			<div className={`${styles.customCell} ${styles.customCellChildren}`} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} style={{ color: 'rgba(0, 0, 0, .5)' }} title={value}>{value}</span>
				{record.article === 'Штрафы и прочие удержания' &&
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
						<Tooltip title='К прочим удержания отнесены: платежи по договору займа, предоставление услуг по подписке «Джем», страхование заказов, услуги по размещению рекламного материала, списания за отзывы, утилизации товара'>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', minWidth: '20px', minHeight: '20px' }}>
								<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
								<path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
							</svg>
						</Tooltip>
					</ConfigProvider>
				}
			</div>
		);
	}
	if (dataIndex !== 'article' &&
		(record.article === 'Себестоимость' || record.article === 'Внутренняя реклама' || record.article === 'Хранение' || record.article === 'Платная приемка' || record.article === 'Комиссия' || record.article === 'Логистика' || record.article === 'Штрафы')
	) {
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} style={{ color: 'rgba(0, 0, 0, .5)' }} title={formatPrice(value.rub.value, '₽')}><b>{formatPrice(value.rub.value, '₽')}</b></span>
				{!yearAttribute && value.rub.comparison_percentage !== null && value.rub.comparison_percentage !== undefined && <RadarRateMark value={value.rub.comparison_percentage} units='%' />}
			</div>
		);
	}
	if (typeof value === 'object') {
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} title={formatPrice(value.rub.value, '₽')}><b>{formatPrice(value.rub.value, '₽')}</b></span>
				{!yearAttribute && value.rub.comparison_percentage !== null && value.rub.comparison_percentage !== undefined && <RadarRateMark value={value.rub.comparison_percentage} units='%' />}
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

