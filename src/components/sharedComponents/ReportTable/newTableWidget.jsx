import { ConfigProvider, Table, Button, Progress } from 'antd';
import { useRef, useMemo, useCallback, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { formatPrice } from '../../../service/utils';
import styles from './newTableWidget.module.css';

const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']


const customCellRender = (value, record, index, dataIndex) => {

	let yearAttribute = ''
	if (years.some(year => year.toString() === dataIndex.toString())) {
		yearAttribute = 'profitLossYearCell'
	}

	if (record.article === 'Прямые расходы') {
		if (typeof value === 'object') {
			return (
				<div className={styles.customCell} data-year-attribute={yearAttribute}>
					<span className={styles.customCellValueRub} title={formatPrice(value.rub, '₽')}><b>{formatPrice(value.rub, '₽')}</b></span>
					<span className={styles.customCellValuePercent} title={formatPrice(value.percent, '%')}><b>{formatPrice(value.percent, '%')}</b></span>
				</div>
			)
		}
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} title={value}><b>{value}</b></span>
			</div>
		)
	}

	if (
		dataIndex === 'article' &&
		(record.article === 'Себестоимость' || record.article === 'Внутренняя реклама' || record.article === 'Хранение' || record.article === 'Платная приемка' || record.article === 'Комиссия' || record.article === 'Логистика' || record.article === 'Штрафы')
	) {
		return (
			<div className={`${styles.customCell} ${styles.customCellChildren}`} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} style={{ color: 'rgba(0, 0, 0, .5)'}} title={value}>{value}</span>
			</div>
		)
	}
	if (dataIndex !== 'article' &&
		(record.article === 'Себестоимость' || record.article === 'Внутренняя реклама' || record.article === 'Хранение' || record.article === 'Платная приемка' || record.article === 'Комиссия' || record.article === 'Логистика' || record.article === 'Штрафы')
	) {
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueRub} style={{ color: 'rgba(0, 0, 0, .5)'}} title={formatPrice(value.rub, '₽')}>{formatPrice(value.rub, '₽')}</span>
				<span className={styles.customCellValuePercent} style={{ color: 'rgba(0, 0, 0, .5)'}} title={formatPrice(value.percent, '%')}>{formatPrice(value.percent, '%')}</span>
			</div>
		)
	}
	if (typeof value === 'object') {
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueRub} title={formatPrice(value.rub, '₽')}>{formatPrice(value.rub, '₽')}</span>
				{record.article !== 'Фактические продажи' && <span className={styles.customCellValuePercent} title={formatPrice(value.percent, '%')}>{formatPrice(value.percent, '%')}</span>}
			</div>
		)
	}
	return (
		<div className={styles.customCell} data-year-attribute={yearAttribute}>
			<span className={styles.customCellValueText} title={value}>{value}</span>
		</div>
	)


}




const TableWidget = ({ loading, columns, data, rowSelection = false, virtual = true, is_primary_collect, progress = null, setTableConfig }) => {
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
		setTableConfig(newConfig);
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
				/>
				}
			</div>
		</div>
	);
};

export default TableWidget;

function ExpandIcon({ expanded, onExpand, record }) {
	const canExpand = !!record?.children && record?.children?.length > 0;
	// const canExpand = false;
	return canExpand &&
		<ConfigProvider
			theme={{
				token: {
					Button: {
						paddingBlock: 0,
						paddingInline: 0,
						textHoverBg: 'transparent',
						textTextColor: '#8C8C8C',
						colorBgTextActive: 'transprent',
						controlHeight: 25
					}
				}
			}}
		>
			<Button
				className={styles.expandBtn}
				type="text"
			// onClick={(e) => {
			// 	console.log(e)
			// 	onExpand(record, e);
			// }}
			>
				<svg className={`${styles.expandIcon} ${expanded ? styles.expandIconExpanded : ''}`} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1L7 7L13 1" stroke='currentColor' strokeWidth="2" strokeLinecap="round" />
				</svg>
			</Button>
		</ConfigProvider>
};

function SortIcon({ sortOrder }) {
	return (
		<svg
			width="24"
			height="16"
			viewBox="0 0 24 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			// style={{ marginLeft: 10, marginRight: 10 }}
			className={styles.sortIcons}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
				fill={sortOrder === 'ascend' || sortOrder === 'asc' ? '#5329FF' : 'currentColor'}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
				fill={sortOrder === 'descend' || sortOrder === 'desc' ? '#5329FF' : 'currentColor'}
			/>
		</svg>
	);
}

export { ExpandIcon, SortIcon }


