import { ConfigProvider, Table, Button } from 'antd';
import { useRef, useState, useEffect } from 'react';
import styles from './ReportTable.module.css';

export default function ReportTable({ loading, columns, data, rowSelection = false, virtual=true }) {
	const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);

	useEffect(() => {
		const updateHeight = () => {
      if (containerRef.current) {
				// ref контейнера который занимает всю высоту
        const container = containerRef.current;
        
				// расчет высоты шапки и добавление отступов контейнера
        const headerHeight = container.querySelector('.ant-table-header')?.offsetHeight || 70;
        const paddings = 32;
				// расчет и сохранение высоты таблицы
        const availableHeight = container.offsetHeight - headerHeight - paddings;
        setScrollY(availableHeight);
        // расчет ширины контейнера
        setScrollX(container.offsetWidth - 32);
      }
    };

    updateHeight();

	}, [columns, data])

	return (
		<div className={styles.container} ref={containerRef}>
			{loading && <div className={styles.loadingContainer}
					style={{
					position: 'relative',
					height: '100%',
					width: '100%',
					paddingTop: '20%',
					}}
			>
					<div
							className='d-flex flex-column align-items-center justify-content-center'
							style={{
									height: '100%',
									width: '100%',
									position: 'absolute',
									top: 0,
									left: 0
							}}
					>
							<span className='loader'></span>
					</div>
			</div>}
			{!loading && <div className={styles.tableContainer}>
				<ConfigProvider
					renderEmpty={ () => (<div>Нет данных</div>)} 
					theme={{
						components: {
							Table: {
								headerColor: '#8c8c8c',
								headerBg: '#f7f6fe',
								headerBorderRadius: 20,
								selectionColumnWidth: 32,
								cellFontSize: 16,
								borderColor: '#e8e8e8',
								cellPaddingInline: 16,
								cellPaddingBlock: 17,
								bodySortBg: '#f7f6fe',
								headerSortActiveBg: '#e7e1fe',
								headerSortHoverBg: '#e7e1fe',
								rowSelectedBg: '#f7f6fe',
								rowSelectedHoverBg: '#e7e1fe',
								colorText: '#1A1A1A',
								lineHeight: 1.2,
								fontWeightStrong: 500
							},
							Checkbox: {
								colorBorder: '#ccc',
								colorPrimary: '#5329ff',
								colorPrimaryBorder: '#5329ff',
								colorPrimaryHover: '#5329ff',
							},
						},
					}}
				>
					<Table
						virtual={virtual}
						columns={columns}
						dataSource={data}
						pagination={false}
						// tableLayout="fixed"
						rowSelection={rowSelection}
						showSorterTooltip={false}
						sticky={true}
						rowClassName={(record) => {
							return record.key === 'summary' ? styles.summaryRow : '';
						}}
						expandable={{
							expandIcon: ExpandIcon,
							rowExpandable: (row) => row.children,
							expandedRowClassName: styles.expandRow,
							expandRowByClick: true
						}}
						// scroll={{ x: 'max-content' }}
						scroll={{ x: scrollX, y: scrollY }}
					></Table>
				</ConfigProvider>
			</div>}
		</div>
	);
}

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
					<path d="M1 1L7 7L13 1" stroke='currentColor' strokeWidth="2" strokeLinecap="round"/>
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
				fill={sortOrder === 'ascend' ? '#5329FF' : 'currentColor'}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
				fill={sortOrder === 'descend' ? '#5329FF' : 'currentColor'}
			/>
		</svg>
	);
}

export {ExpandIcon, SortIcon}