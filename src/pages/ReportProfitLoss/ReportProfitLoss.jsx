import React from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext, useMemo } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import TableWidget from '../../components/sharedComponents/ReportTable/newTableWidget';
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

	const getConfig = (data) => {
		const configItemTemplate = {
			//key: 'name',
			//title: 'Name',
			//dataIndex: 'name',
			sortable: false,
			fixed: false,
			fixedLeft: 0,
			width: 350,
			minWidth: 350,
			maxWidth: 700,
			hidden: false,
			style: {
		
			}
		}

		const config = [{
			key: 'article',
			title: 'Статья',
			dataIndex: 'article',
			sortable: false,
			fixed: true,
			fixedLeft: 0,
			width: 400,
			minWidth: 400,
			maxWidth: 800,
			hidden: false,
		}];

		data.forEach(item => {
			config.push({
				...configItemTemplate,
				key: item.year,
				title: item.year,
				dataIndex: item.year,
				groupColor: '#F7F7F7',
				style: {
					backgroundColor: '#F7F6FE'
				}
			});
			if (item.months) {
				[...item.months.reverse()].forEach(month => {
					config.push({
						...configItemTemplate,
						key: month.month_label,
						title: month.month_label,
						dataIndex: month.month_label,
					});
				});
			}
			
		});

		return config;
	}

	const getData = (data, metricsOrder) => {

		const tableData = [];
		metricsOrder.forEach(metric => {
			const { key, title, isChildren } = metric;
			let rowObject = {
				article: title
			}
			data.forEach(item => {
				if (isChildren) {
					rowObject[item.year] = item.data.direct_expenses[key];
				} else {
					rowObject[item.year] = item.data[key];
				}

				if (item.months) {
					item.months.forEach(month => {
						if (isChildren) {
							rowObject[month.month_label] = month.data.direct_expenses[key];
						} else {
							rowObject[month.month_label] = month.data[key];
						}
					});
				}
			});
			tableData.push(rowObject);
		});

		return tableData;
	}

	const dataToTableData = (response) => {
		if (!response || !response.data || response.data.length === 0){
			setColumns([]);
			setData([]);
			return;
		}

		const { data } = response;
		
		// Define the order of metrics (articles) as they should appear in the table
		const metricsOrder = [
			{ key: 'sales', title: 'Фактические продажи'},
			{ key: 'mp_discount', title: 'Скидка за счет МП' },
			{ key: 'realization', title: 'Реализация' },
			{ key: 'compensation', title: 'Компенсация' },
			{ key: 'gross_margin', title: 'Маржинальная прибыль' },
			{ key: 'operating_profit', title: 'Операционная прибыль (EBITDA)' },
			{ key: 'tax', title: 'Налоги' },
			{ key: 'net_profit', title: 'Чистая прибыль' },
			{ key: 'total_expenses', title: 'Прямые расходы', isChildren: true },
			{ key: 'cost', title: 'Себестоимость', isChildren: true },
			{ key: 'advert', title: 'Внутренняя реклама', isChildren: true },
			{ key: 'storage', title: 'Хранение', isChildren: true },
			{ key: 'paid_acceptance', title: 'Платная приемка', isChildren: true },
			{ key: 'commission', title: 'Комиссия', isChildren: true },
			{ key: 'logistic', title: 'Логистика', isChildren: true },
			{ key: 'penalties', title: 'Штрафы', isChildren: true }
		];

		setLoading(false);
		setData([...getData(data, metricsOrder)]);
		setColumns(getConfig(data));
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
					<TableWidget
						loading={loading}
						columns={columns}
						data={data}
						virtual={false}
						is_primary_collect={activeBrand?.is_primary_collect}
						//progress={progress}
						setTableConfig={setColumns}
					/>
				</div>
			</section>
		</main>
	);
}