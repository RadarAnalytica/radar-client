import { ConfigProvider, Table, Button } from 'antd';
import styles from './ReportTable.module.css';

export default function ReportTable({ columns, data, rowSelection = false }) {

	const CustomExpandIcon = ({ expanded, onExpand, record }) => {
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
					onClick={(e) => {
						onExpand(record, e);
					}}
				>
					<svg className={`${styles.expandIcon} ${expanded ? styles.expandIconExpanded : ''}`} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L7 7L13 1" stroke='currentColor' stroke-width="2" stroke-linecap="round"/>
					</svg>
				</Button>
			</ConfigProvider>
	};

	return (
		<div className={styles.container}>
			<div className={styles.tableContainer}>
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
								cellPaddingBlock: 15,
								bodySortBg: '#f7f6fe',
								headerSortActiveBg: '#e7e1fe',
								headerSortHoverBg: '#e7e1fe',
								rowSelectedBg: '#f7f6fe',
								rowSelectedHoverBg: '#e7e1fe',
								colorText: '#1A1A1A'
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
						columns={columns}
						dataSource={data}
						pagination={false}
						tableLayout="fixed"
						rowSelection={rowSelection}
						showSorterTooltip={false}
						// scroll={true}
						expandable={{
							// expandedRowRender: (record) => <p>{record.description}</p>,
							expandIcon: CustomExpandIcon,
							rowExpandable: (record) => !!record.description,
							expandedRowClassName: styles.expandRow,

						}}
						scroll={{ x: 'max-content' }}
					></Table>
				</ConfigProvider>
			</div>
		</div>
	);
}
