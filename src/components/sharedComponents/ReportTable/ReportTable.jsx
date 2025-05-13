import { ConfigProvider, Table } from 'antd';
import styles from './ReportTable.module.css';

export default function ReportTable({ columns, data, rowSelection = false }) {
	return (
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
							cellPaddingInline: 20,
							cellPaddingBlock: 8,
							bodySortBg: '#f7f6fe',
							headerSortActiveBg: '#e7e1fe',
							headerSortHoverBg: '#e7e1fe',
							rowSelectedBg: '#f7f6fe',
							rowSelectedHoverBg: '#e7e1fe',
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
					scroll={{ x: 'max-content' }}
				></Table>
			</ConfigProvider>
		</div>
	);
}
