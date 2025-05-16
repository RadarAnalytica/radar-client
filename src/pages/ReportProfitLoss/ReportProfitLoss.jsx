import React from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import ReportTable from '../../components/sharedComponents/ReportTable/ReportTable';
import { ServiceFunctions } from '../../service/serviceFunctions';
// import { fileDownload } from '../../service/utils';

import { ConfigProvider, Table, Button, Popover, Modal, Form, Checkbox, Flex } from 'antd';
import styles from './ReportProfitLoss.module.css';
// import downloadIcon from '../images/Download.svg';
// import ReportTable from './Components/Table/ReportWeekTable';
// import ModalTableSetting from '../../components/sharedComponents/ModalTableSetting/ModalTableSetting';
import { useAppSelector } from '../../redux/hooks';

// import { COLUMNS, ROWS } from './tableConfig';

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

	function renderColumn(data) {
		console.log('renderColumn', data)
		if (data.value || data.procent){
			return (<Flex
				className={styles.cell}
				justify='space-between'
				gap={8}
				><span>{data.value} ₽</span> {data.procent && <span className={styles.cellProcent}>{data.procent} %</span>}
			</Flex>)
		}
		return data
	}

	const updateDataReportProfitLoss = async () => {
		setLoading(true)
		try {
			const response = await ServiceFunctions.getReportProfitLoss()
			// setTimeout(() => {
				setColumns(response.columns.map( (cell) => ({
					...cell,
					render: (data) => renderColumn(data)
				})))
				setData(response.data)
				setLoading(false)
			// }, 1500);
			// console.log(response)
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
				<div className={styles.container}>
					<ReportTable
						columns={columns}
						data={data}
					></ReportTable>
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
