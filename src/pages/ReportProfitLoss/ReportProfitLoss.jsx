import React from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import ReportTable from '../../components/sharedComponents/ReportTable/ReportTable';
import { ServiceFunctions } from '../../service/serviceFunctions';
// import { fileDownload } from '../../service/utils';
import { formatPrice } from '../../service/utils';
import {
	ConfigProvider,
	Table,
	Button,
	Popover,
	Modal,
	Form,
	Checkbox,
	Flex,
} from 'antd';
import styles from './ReportProfitLoss.module.css';
// import downloadIcon from '../images/Download.svg';
// import ReportTable from './Components/Table/ReportWeekTable';
// import ModalTableSetting from '../../components/sharedComponents/ModalTableSetting/ModalTableSetting';
import { useAppSelector } from '../../redux/hooks';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import dayjs from 'dayjs';
import { COLUMNS, ROWS, SCHEMA, RenderCell, TESTDATA } from './config';

export default function ReportProfitLoss() {
	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange } = useAppSelector(
		(state) => state.filters
	);
	const filters = useAppSelector((state) => state.filters);
	const { shops } = useAppSelector((state) => state.shopsSlice);
	const [primaryCollect, setPrimaryCollect] = useState(null);
	const [shopStatus, setShopStatus] = useState(null);

	const [loading, setLoading] = useState(true);
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [monthRange, setMonthRange] = useState({
		month_to: dayjs().format('YYYY-MM'),
		month_from: dayjs('2024-02-01').format('YYYY-MM')
	});

	function renderColumn(data, row) {
		return (
			<Flex className={styles.cell} justify="space-between" gap={8}>
				<span>{formatPrice(3123.01)} ₽</span>{' '}
				<span className={styles.cellProcent}>
					{formatPrice(50.1)} %
				</span>
			</Flex>
		);
	}

	const dataToTableData = (response) => {
		// тестовые данные
		const data = TESTDATA.data.map((el) => el)
		const data2025 = TESTDATA.data[0];

		const columns = [...COLUMNS];

		columns.push({
			title: '2025',
			key: 'year',
			dataIndex: 'year',
			width: 200,
			className: styles.summary,
			render: renderColumn,
		});

		for (const month of data2025.months) {
			columns.push({
				title: month.month_label,
				key: 'month',
				dataIndex: 'month',
				width: 200,
				render: renderColumn,
			});
		}

		// const tableData = [];
		const tableData = ROWS.map((el, i) => {
			const rowData = {
				...el,
			};
			// for (const column of columns){
			// 	console.log(column)
			// 	if (column.title == '2025'){
			// 		// rowData[column.key] = data2025.data[el.key]
			// 		console.log(data2025.data[el.key])
			// 	} else {
			// 		const monthData = data2025.months.find((el) => el.title === 'column.title');
			// 		console.log('monthData', monthData)
			// 	}
			// }

			return rowData;
		});

		console.log('tableData', tableData);
		console.log('columns', columns);
		setColumns(columns);
		setData(tableData);
	};

	const updateDataReportProfitLoss = async () => {
		setLoading(true);
		try {
			if (activeBrand !== null && activeBrand !== undefined) {
				const response = await ServiceFunctions.getReportProfitLoss(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					monthRange
				);

				dataToTableData(response);
				// setData(weeks);
				// dataToTableData(weeks);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setPrimaryCollect(activeBrand?.is_primary_collect);
		if (activeBrand && activeBrand.is_primary_collect) {
			updateDataReportProfitLoss();
		} else {
			setData([]);
		}
	}, [activeBrand, selectedRange, filters, monthRange]);

	useEffect(() => {
		if (activeBrand && activeBrand.id === 0 && shops) {
			const allShop = {
				id: 0,
				brand_name: 'Все',
				is_active: shops.some((_) => _.is_primary_collect),
				is_valid: true,
				is_primary_collect: shops.some((_) => _.is_primary_collect),
				is_self_cost_set: !shops.some((_) => !_.is_self_cost_set),
			};
			setShopStatus(allShop);
		}

		if (activeBrand && activeBrand.id !== 0 && shops) {
			const currShop = shops.find((_) => _.id === activeBrand.id);
			setShopStatus(currShop);
		}
	}, [activeBrand, shops, filters]);

	const monthHandler = (data) => {
		const [start, end] = data;
		setMonthRange({
			month_from: dayjs(start).format('YYYY-MM'),
			month_to: dayjs(end).format('YYYY-MM')
		})
	}

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
				<div className={styles.controls}>
					<Filters
						timeSelect={false}
						setLoading={setLoading}
						monthSelect={true}
						monthHandler={monthHandler}
						// brandSelect={false}
						// articleSelect={false}
						// groupSelect={false}
					/>
				</div>
				<div className={styles.container}>
					<ReportTable
						loading={loading}
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
