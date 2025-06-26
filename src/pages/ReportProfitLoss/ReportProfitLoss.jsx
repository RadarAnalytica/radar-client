import React from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext, useMemo } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import ReportTable from '../../components/sharedComponents/ReportTable/ReportTable';
import { ServiceFunctions } from '../../service/serviceFunctions';
// import { fileDownload } from '../../service/utils';
import { formatPrice } from '../../service/utils';
import { Flex } from 'antd';
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


	const initialRange = useMemo(() => ({
		month_to: dayjs().format('YYYY-MM'),
		month_from: dayjs().startOf('year').format('YYYY-MM')
	}), [])
	
	const [monthRange, setMonthRange] = useState(initialRange);

	function renderColumn(data, row) {
		if (typeof data !== 'object'){
			return(
				// <span>{formatPrice(data)} ₽</span>
				<div className={styles.cell}>{formatPrice(data, '₽')}</div>
			)
		}
		return (
			<Flex className={styles.cell} justify="space-between" gap={8}>
				<span>{formatPrice(data?.rub, '₽')}</span>
				<span className={styles.cellProcent}>
					{formatPrice(data?.percent, '%')}
				</span>
			</Flex>
		);
	}

	const dataToTableData = (response) => {
		if (!response.data.length){
			setData([])
			return
		}
		// !!!!! перепроверить ключ operating_expenses

		const data = response.data.map((el) => el);

		const columns = [...COLUMNS];
		const rows = [...ROWS];

		if (data[0].data.operating_expenses?.length){
			const operating = rows.find((el) => el.key === 'operating_expenses');
			operating.children = [];
			data[0].data.operating_expenses.forEach((el, i) => {
				operating.children.push({
					key: `operating${i}`,
					title: el.name
				})
			})
		}

		const tableData = [];
		data.forEach((year) => {
			// собираем все колонки на основе данных
			columns.push({
				title: year.year,
				key: year.year,
				dataIndex: year.year,
				width: 240,
				className: styles.summary,
				render: renderColumn,
			})
			for (const month of year.months.reverse()) {
				columns.push({
					title: month.month_label,
					key: month.month_label,
					dataIndex: month.month_label,
					width: 240,
					render: renderColumn,
				});
			}

		})

		// перебираем данные по годам
		data.forEach((year) => {
			for (const row of rows) {
				// перебираем данные по собранному списку строк
				for (const column of columns){
					if (column.key == 'title'){
						continue
					}
					
					// определяем исходные данные 
					const data = column.key === year.year ? year?.data : year.months.find((el) => el.month_label == column.key)?.data;

					if (!data){
						continue
					}
					
					// проверка на данные в разделе Прямые расходы
					if (row.key == 'direct_expenses'){
						row.children.forEach((childrenRow) => {
							if (data[row.key][childrenRow.key]){
								childrenRow[column.key] = data[row.key][childrenRow.key]
							}
						})
						row[column.key] = data[row.key]['total_expenses']
						continue
					}

					// проверка на данные в разделе Операционные расходы
					if (row.key == 'operating_expenses' && row.children){
						row.children.forEach((childrenRow, i) => {
							if (data[row.key][i]){
								childrenRow[`operating${i}`] = {
									rub: data[row.key][i].rub,
									percent: data[row.key][i].percent
								}
							}
						})
					}

					if (data[row.key]){
						row[column.key] = data[row.key]
					}


				}
			}
		})
		setColumns(columns);
		setData(rows);
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
		let selectedRange = initialRange;
		if (data){
			const [start, end] = data;
			selectedRange = {
				month_from: dayjs(start).format('YYYY-MM'),
				month_to: dayjs(end).format('YYYY-MM')
			}
		}
		
		setMonthRange(selectedRange);
		saveMonthRange(selectedRange);
	}

	const saveMonthRange = (range) => {
		const savedMonthRange = JSON.parse(localStorage.getItem('reportProfitLossMonth')) || {};
		savedMonthRange[activeBrand.id] = range;
		localStorage.setItem(
			'reportProfitLossMonth',
			JSON.stringify(savedMonthRange)
		);
	}

	const updateSavedMonthRange = () => {
		const savedMonthRange = localStorage.getItem('reportProfitLossMonth');
		if (savedMonthRange) {
			const data = JSON.parse(savedMonthRange);
			if (activeBrand?.id in data) {
				console.log(activeBrand.id, data[activeBrand.id])
				setMonthRange(data[activeBrand.id]);
				return
			}
		}
		setMonthRange(initialRange);
	};

	useEffect(() => {
		updateSavedMonthRange()
	}, [activeBrand])

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
						monthValue={monthRange}
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
						virtual={false}
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
