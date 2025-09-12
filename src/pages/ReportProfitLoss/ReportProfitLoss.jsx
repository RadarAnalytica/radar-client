import React from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext, useMemo } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import ReportTable from '../../components/sharedComponents/ReportTable/ReportTable';
import SelfCostWarningBlock from '../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { formatPrice } from '../../service/utils';
import { Flex } from 'antd';
import styles from './ReportProfitLoss.module.css';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import dayjs from 'dayjs';
import { COLUMNS, ROWS } from './config';
import { useAppSelector } from '../../redux/hooks';
import HowToLink from '../../components/sharedComponents/howToLink/howToLink';
import DataCollectWarningBlock from '../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock'
import NoSubscriptionWarningBlock from '../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
export default function ReportProfitLoss() {
	const { user, authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange } = useAppSelector( (state) => state.filters );
	const filters = useAppSelector((state) => state.filters);
	const { shops } = useAppSelector((state) => state.shopsSlice);

	const [loading, setLoading] = useState(true);
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);

	const shopStatus = useMemo(() => {
		if (!activeBrand || !shops) return null;
		
		if (activeBrand.id === 0) {
				return {
						id: 0,
						brand_name: 'Все',
						is_active: shops.some(shop => shop.is_primary_collect),
						is_valid: true,
						is_primary_collect: shops.some(shop => shop.is_primary_collect),
						is_self_cost_set: !shops.some(shop => !shop.is_self_cost_set)
				};
		}
		
		return shops.find(shop => shop.id === activeBrand.id);
	}, [activeBrand, shops]);

	const initialRange = useMemo(() => ({
		month_to: dayjs().format('YYYY-MM'),
		month_from: dayjs().startOf('year').format('YYYY-MM')
	}), [])

	const updateSavedMonthRange = () => {
		if (!activeBrand){
			return
		}
		const savedMonthRange = localStorage.getItem('reportProfitLossMonth');
		if (savedMonthRange) {
			const data = JSON.parse(savedMonthRange);
			if (activeBrand.id in data) {
				return data[activeBrand.id]
			}
		}
		return initialRange
	};

	const [monthRange, setMonthRange] = useState(updateSavedMonthRange());

	function renderColumn(data) {
		if (typeof data !== 'object'){
			return(
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
		if (!response || response.data && response.data.length === 0){
			setColumns(COLUMNS);
			setData([])
			return
		}
		
		const data = response.data.map((el) => el);
		const columns = [...COLUMNS];
		const rows = [...ROWS];
		
		// !!!!! перепроверить ключ operating_expenses
		// if (data[0].data.operating_expenses?.length){
		// 	const operating = rows.find((el) => el.key === 'operating_expenses');
		// 	operating.children = [];
		// 	data[0].data.operating_expenses.forEach((el, i) => {
		// 		operating.children.push({
		// 			key: `operating${i}`,
		// 			title: el.name
		// 		})
		// 	})
		// }

		data.forEach((year) => {
			// собираем все колонки на основе данных
			columns.push({
				title: year.year,
				key: year.year,
				dataIndex: year.year,
				width: 350,
				className: styles.summary,
				render: renderColumn,
			})
			for (const month of year.months.reverse()) {
				columns.push({
					title: month.month_label,
					key: month.month_label,
					dataIndex: month.month_label,
					width: 350,
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

					if (row.key == 'sales'){
						row[column.key] = data[row.key]?.rub;
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

					row[column.key] = data[row.key]

				}
			}
		})

		// проверка данных себестоимости и обнуление строки Чистая прибыль
		if (!shopStatus?.is_self_cost_set){
			const total = rows.find((el) => el.key === 'net_profit');
			for (const key in total){
				if (key == 'key' || key == 'title'){
					continue
				}
				total[key] = 0
			}
		}

		setLoading(false);
		setColumns(columns);
		setData(rows);
	};

	const updateDataReportProfitLoss = async () => {
		setLoading(true);
		try {
			if (activeBrand !== null && activeBrand !== undefined && monthRange) {
				const response = await ServiceFunctions.getReportProfitLoss(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					// monthRange
					updateSavedMonthRange()
				);
				dataToTableData(response);
				// setData(weeks);
				// dataToTableData(weeks);
			}
		} catch (e) {
			console.error(e);
			dataToTableData(null);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (activeBrand && activeBrand.is_primary_collect) {
			updateDataReportProfitLoss();
		}
		if (activeBrand && !activeBrand.is_primary_collect){
			setLoading(false);
		}
	}, [monthRange, filters]);

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

	useEffect(() => {
		setMonthRange(updateSavedMonthRange())
	}, [shopStatus])

	return (
		<main className={styles.page}>
			<MobilePlug />
			{/* ------ SIDE BAR ------ */}
			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>
			{/* ------ CONTENT ------ */}
			<section className={styles.page__content}>
				{/* header */}
				<div className={styles.page__headerWrapper}>
					<Header title="Отчет о прибыли и убытках"></Header>
				</div>

				{!loading && shops && user?.subscription_status && shopStatus?.is_primary_collect && !shopStatus?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}

				<div className={styles.controls}>
					<Filters
						timeSelect={false}
						monthSelect={true}
						monthHandler={monthHandler}
						monthValue={monthRange}
						isDataLoading={loading}
					/>
				</div>
				
				<div className={styles.how}>
					<HowToLink text='Как использовать раздел' url='https://radar.usedocs.com/article/77557' target='_blank' />
				</div>

				{!loading && shops && user.subscription_status === null && (
					<NoSubscriptionWarningBlock />
				)}

				{!loading && shops && user?.subscription_status && !shopStatus?.is_primary_collect && (
						<DataCollectWarningBlock
								title='Ваши данные еще формируются и обрабатываются.'
						/>
				)}
				<div className={styles.container} style={{ minHeight: !shopStatus?.is_primary_collect ? '0' : '450px' }}>
					<ReportTable
						loading={loading}
						columns={columns}
						data={data}
						virtual={false}
						is_primary_collect={activeBrand?.is_primary_collect}
					></ReportTable>
				</div>
			</section>
		</main>
	);
}