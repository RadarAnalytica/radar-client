import { Table, Button, Progress } from 'antd';
import { useRef, useMemo, useCallback, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { formatPrice, log } from '../../../service/utils';
import { RadarRateMark } from '@/shared';
import styles from './newTableWidget.module.css';
import { Tooltip, ConfigProvider } from 'antd';
const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
import { URL } from '@/service/config';


const customCellRender = (value, record, index, dataIndex) => {
	let yearAttribute = '';
	if (years.some(year => year.toString() === dataIndex.toString())) {
		yearAttribute = 'profitLossYearCell';
	}

	if (record.article && record.isParent) {
		if (typeof value === 'object') {
			return (
				<div className={styles.customCell} data-year-attribute={yearAttribute}>
					<span className={styles.customCellValueText} title={formatPrice(value.rub.value, '₽')}><b>{formatPrice(value.rub.value, '₽')}</b></span>
					{!yearAttribute && 
						<RadarRateMark 
							value={value.rub.comparison_percentage} 
							units='%' 
							inverseColors={Boolean(record.inverseIndication)}
						/>
					}
				</div>
			);
		}
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} title={value}><b>{value}</b>
					{record.tooltip &&
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
							<Tooltip title={record.tooltip}>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', minWidth: '20px', minHeight: '20px', marginLeft: '8px' }}>
									<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
									<path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
								</svg>
							</Tooltip>
						</ConfigProvider>
					}
				</span>

			</div>
		);
	}

	if (dataIndex === 'article' && record.isChild) {
		return (
			<div className={`${styles.customCell} ${styles.customCellChildren}`} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} style={{ color: 'rgba(0, 0, 0, .5)' }} title={value}>{value}
					{record.tooltip &&
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
							<Tooltip title={record.tooltip}>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', minWidth: '20px', minHeight: '20px', marginLeft: '8px' }}>
									<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
									<path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
								</svg>
							</Tooltip>
						</ConfigProvider>
					}
				</span>
			</div>
		);
	}
	if (dataIndex !== 'article' && record.isChild) {
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} style={{ color: 'rgba(0, 0, 0, .5)' }} title={formatPrice(value.rub.value, '₽')}><b>{formatPrice(value.rub.value, '₽')}</b></span>
				
				{!yearAttribute && 
					<RadarRateMark 
						value={value.rub.comparison_percentage} 
						units='%' 
						inverseColors={Boolean(record.inverseIndication)}
						noColored={Boolean(record.noIndication)}
					/>
				}
			</div>
		);
	}
	if (typeof value === 'object') {
		return (
			<div className={styles.customCell} data-year-attribute={yearAttribute}>
				<span className={styles.customCellValueText} title={formatPrice(value.rub.value, '₽')}><b>{formatPrice(value.rub.value, '₽')}</b></span>
				{!yearAttribute && 
					<RadarRateMark 
						value={value.rub.comparison_percentage} 
						units='%' 
						inverseColors={Boolean(record.inverseIndication)} 
					/>
				}
			</div>
		);
	}
	return (
		<div className={styles.customCell} data-year-attribute={yearAttribute}>
			<span className={styles.customCellValueText} title={value}>{value}
				{record.tooltip &&
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
						<Tooltip title={record.tooltip}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', minWidth: '20px', minHeight: '20px', marginLeft: '8px' }}>
								<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
								<path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
							</svg>
						</Tooltip>
					</ConfigProvider>
				}
			</span>
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
				return { ...col, width: newWidth };
			}
			return col;
		});
		// setTableConfig(newConfig);
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
						style={{ fontFamily: 'Manrope', width: 'max-content', tableLayout: 'fixed' }}
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

