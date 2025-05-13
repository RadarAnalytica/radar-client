import React from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
// import Filter from './Components/Filter/ReportWeekFilter';
import { ServiceFunctions } from '../../service/serviceFunctions';
// import { fileDownload } from '../../service/utils';

import { ConfigProvider, Table, Button, Popover, Modal, Form, Checkbox } from 'antd';
import styles from './ReportProfitLoss.module.css';
// import downloadIcon from '../images/Download.svg';
// import ReportTable from './Components/Table/ReportWeekTable';
// import ModalTableSetting from '../../components/sharedComponents/ModalTableSetting/ModalTableSetting';
import { useAppSelector } from '../../redux/hooks';

import { COLUMNS, ROWS } from './tableConfig';

export default function ReportWeek() {
	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange } = useAppSelector(
		(state) => state.filters
	);
	// const [isPopoverOpen, setPopoverOpen] = useState(false);
	// const [isConfigOpen, setConfigOpen] = useState(false);
	// const [data, setData] = useState();
	// const [tableColumns, setTableColumns] = useState(COLUMNS);
	
	const [loading, setLoading] = useState(false);
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);

	function renderColumn(value, record, index) {
		console.log('renderColumn', value, record, index)
		return (<div><span>{value}</span> - </div>)
	}

	const updateDataReportProfitLoss = async () => {
		setLoading(true)
		try {
			const response = await ServiceFunctions.getReportProfitLoss()
			const dataColumns = [{
				dataindex: 'title',
				key: 'title',
				title: 'Статья'
			}]
			console.log('response', response)
			response.periods.forEach( (el, i) => {
				dataColumns.push({
					dataindex: el,
					key: el,
					title: el,
					render: renderColumn
				})
			})
			console.log(dataColumns)
			// setColumns(dataColumns)
			const dataRows = [];
			let i = 0;
			for (const column in response.data){
				console.log('column', column, ROWS[column])
				const row = {
					key: i,
					title: ROWS[column],
				}
				for (let j = 0; j < column.length; j++){
					row[`period_${j}`] = response.data[column][j];
				}
				i++
				dataRows.push(row)
			}
			console.log('dataRows', response.data)
			setData(response.data)

		}
		catch (e) {
			console.error(e)
		}
		finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		updateDataReportProfitLoss()
	}, [])

	const columnsE = [
  {
    title: 'Статья',
    dataIndex: 'title',
    key: 'title',
		render: renderColumn
  },
  {
    title: '2025',
    dataIndex: 'period_0',
    key: 'period_0',
  },
  {
    title: 'Апрель 2025',
    dataIndex: 'period_1',
    key: 'period_1',
  },
  {
    title: 'Март 2025',
    dataIndex: 'period_2',
    key: 'period_2',
  },
  {
    title: 'Февраль 2025',
    dataIndex: 'period_3',
    key: 'period_3',
  },
  {
    title: 'Январь 2025',
    dataIndex: 'period_4',
    key: 'period_4',
  },
  {
    title: 'Декабрь 2024',
    dataIndex: 'period_5',
    key: 'period_5',
  },
];
const dataE = [
  {
    key: 1,
    title: 'Реализация',
		period_0: {value: 123123, procent: 10},
		period_1: {value: 123123, procent: 10},
		period_2: {value: 123123, procent: 10},
		period_3: {value: 123123, procent: 10},
		period_4: {value: 123123, procent: 10},
		period_5: {value: 123123, procent: 10},
  },
  {
    key: 2,
    title: 'Скидка за счет МП',
		period_0: {value: 123123, procent: 10},
		period_1: {value: 123123, procent: 10},
		period_2: {value: 123123, procent: 10},
		period_3: {value: 123123, procent: 10},
		period_4: {value: 123123, procent: 10},
		period_5: {value: 123123, procent: 10},
  },
  {
    key: 3,
    title: 'Фактические продажи',
		period_0: {value: 123123, procent: 10},
		period_1: {value: 123123, procent: 10},
		period_2: {value: 123123, procent: 10},
		period_3: {value: 123123, procent: 10},
		period_4: {value: 123123, procent: 10},
		period_5: {value: 123123, procent: 10},
  },
  {
    key: 4,
    title: 'Прямые расходы',
		period_0: {value: 123123, procent: 10},
		period_1: {value: 123123, procent: 10},
		period_2: {value: 123123, procent: 10},
		period_3: {value: 123123, procent: 10},
		period_4: {value: 123123, procent: 10},
		period_5: {value: 123123, procent: 10},
		children: [
			{
				key: 5,
				title: 'Себестоимость',
				period_0: {value: 123123, procent: 10},
				period_1: {value: 123123, procent: 10},
				period_2: {value: 123123, procent: 10},
				period_3: {value: 123123, procent: 10},
				period_4: {value: 123123, procent: 10},
				period_5: {value: 123123, procent: 10},
			},
		]
  },
];

	return (
		<main className={styles.page}>
			{/* {Loading(isLoading)} */}
			<MobilePlug />
			{/* ------ SIDE BAR ------ */}
			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>
			{/* ------ CONTENT ------ */}
			<section className={styles.page__content}>
				{/* header */}
				<div className={styles.page__headerWrapper}>
					<Header title="Отчет о прибылях и убытках"></Header>
				</div>
				<div>
					<ConfigProvider
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
							expandIconBg: 'red'
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
					columns={columnsE}
					dataSource={dataE}
					pagination={false}
					tableLayout="fixed"
					showSorterTooltip={false}
					scroll={{ x: 'max-content' }}
					locale={{ emptyText: <div description="No Data">Нет данных</div> }}
				></Table>
			</ConfigProvider>
				</div>
			</section>
			
		</main>
	);
}

function Loading(status) {
	if (!status) {
		return;
	}
	return (
		<div
			className="d-flex flex-column align-items-center justify-content-center"
			style={{
				height: '100%',
				width: '100%',
				position: 'absolute',
				backgroundColor: '#fff',
				zIndex: 999,
			}}
		>
			<span className="loader"></span>
		</div>
	);
}
