import React from 'react';
import AuthContext from '@/service/AuthContext';
import { useState, useEffect, useContext, useMemo } from 'react';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import TableWidget from '@/components/sharedComponents/ReportTable/newTableWidget';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { formatPrice } from '@/service/utils';
import { Flex } from 'antd';
import styles from './ReportProfitLoss.module.css';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { useAppSelector } from '@/redux/hooks';
import HowToLink from '@/components/sharedComponents/howToLink/howToLink';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from '@/app/providers/DemoDataProvider';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';

export default function ReportProfitLoss() {
	const { user, authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange, activeMonths, activeBrandName, activeArticle, activeGroup, isFiltersLoaded, shops } = useAppSelector((state) => state.filters);
	const { isDemoMode } = useDemoMode();
	const filters = useAppSelector((state) => state.filters);
	const [loading, setLoading] = useState(true);
	const progress = useLoadingProgress({ loading });
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

	function renderColumn(data) {
		if (typeof data !== 'object') {
			return (
				<div className={styles.cell}>{formatPrice(data, '₽')}</div>
			);
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
			sortable: false,
			fixed: false,
			fixedLeft: 0,
			width: 210,
			minWidth: 210,
			maxWidth: 420,
			hidden: false,
			style: {}
		};

		const config = [{
			key: 'article',
			title: 'Статья',
			dataIndex: 'article',
			sortable: false,
			fixed: true,
			fixedLeft: 0,
			width: 220,
			minWidth: 220,
			maxWidth: 440,
			hidden: false,
		}];

		data.forEach(item => {
			config.push({
				...configItemTemplate,
				key: item.year,
				title: item.year,
				dataIndex: item.year,
				groupColor: 'white',
				style: {
					backgroundColor: '#F7F6FE',
					borderRight: '1px solid #E8E8E8',
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
	};

	const getData = (data, metricsOrder) => {
		const tableData = [];
		const childrenData = {};

		const getCellValue = (dataSource, key, parentKey, isParent, isChildren) => {
			if (!isParent && !isChildren) {
				return dataSource[key];
			}

			if (parentKey === 'operating_expenses') {
				const expenseItem = dataSource.operating_expenses?.find(exp => exp.category === key);
				return expenseItem || { rub: 0, percent: 0 };
			}

			if (key === 'operating_expenses') {
				const accSum = dataSource.operating_expenses?.reduce((acc, exp) => acc + exp.rub, 0) || 0;
				const accPercent = dataSource.operating_expenses?.reduce((acc, exp) => acc + exp.percent, 0) || 0;
				return { rub: accSum, percent: accPercent };
			}

			return dataSource.direct_expenses[key];
		};

		metricsOrder.forEach((metric, index) => {
			const { key, title, isChildren, isParent, parentKey, isExpanded } = metric;
			let rowObject = {
				article: title,
				isParent,
				id: index,
				key,
				isExpanded,
			};

			data.forEach(item => {
				rowObject[item.year] = getCellValue(item.data, key, parentKey, isParent, isChildren);

				if (item.months) {
					item.months.forEach(month => {
						rowObject[month.month_label] = getCellValue(month.data, key, parentKey, isParent, isChildren);
					});
				}
			});

			if (isChildren) {
				childrenData[parentKey] = [...(childrenData[parentKey] || []), rowObject];
			} else {
				tableData.push(rowObject);
			}
		});

		const finalDataSource = tableData.map(row => {
			return row.isChildren ? row : {
				...row,
				children: childrenData[row.key] || [],
			};
		});

		return finalDataSource;
	};

	const dataToTableData = (response) => {
		if (!response?.data?.length) {
			setColumns([]);
			setData([]);
			return;
		}

		const { data } = response;

		// Define the order of metrics (articles) as they should appear in the table
		const metricsOrder = [
			{ key: 'sales', title: 'Фактические продажи' },
			{ key: 'mp_discount', title: 'Скидка за счет МП' },
			{ key: 'realization', title: 'Реализация' },
			{ key: 'total_expenses', title: 'Прямые расходы', isParent: true, isExpanded: true },
			{ key: 'cost', title: 'Себестоимость', isChildren: true, parentKey: 'total_expenses' },
			{ key: 'advert', title: 'Внутренняя реклама', isChildren: true, parentKey: 'total_expenses' },
			{ key: 'storage', title: 'Хранение', isChildren: true, parentKey: 'total_expenses' },
			{ key: 'paid_acceptance', title: 'Платная приемка', isChildren: true, parentKey: 'total_expenses' },
			{ key: 'commission', title: 'Комиссия', isChildren: true, parentKey: 'total_expenses' },
			{ key: 'logistic', title: 'Логистика', isChildren: true, parentKey: 'total_expenses' },
			{ key: 'penalties', title: 'Штрафы', isChildren: true, parentKey: 'total_expenses' },
			{ key: 'compensation', title: 'Компенсация' },
			{ key: 'gross_margin', title: 'Маржинальная прибыль' },
			{ key: 'operating_expenses', title: 'Операционные расходы', isParent: true, isExpanded: false },
			{ key: 'operating_profit', title: 'Операционная прибыль (EBITDA)' },
			{ key: 'tax', title: 'Налоги' },
			{ key: 'net_profit', title: 'Чистая прибыль' },
		];

		try {
			if (Array.isArray(data[0].data.operating_expenses) && data[0].data.operating_expenses.length > 0) {
				const categories = [...new Set(data[0].data.operating_expenses.map(item => item.category))];
				
				categories.forEach(category => {
					metricsOrder.push({
						key: category,
						title: category,
						isChildren: true,
						parentKey: 'operating_expenses'
					});
				});
			}
		} catch (error) {
			console.warn('Operating expenses not found:', error);
		}
		
		setData([...getData(data, metricsOrder)]);
		setColumns(getConfig(data));
	};

	const updateDataReportProfitLoss = async () => {
		setLoading(true);
		progress.start();
		try {
			const response = await ServiceFunctions.getReportProfitLoss(
				authToken,
				selectedRange,
				activeBrand.id,
				filters,
				activeMonths
			);
			progress.complete();
			await setTimeout(() => {
				dataToTableData(response);
				progress.reset();
				setLoading(false);
			}, 500);
		} catch (e) {
			console.error(e);
			dataToTableData(null);
			progress.reset();
			setLoading(false);
		}
	};

	useEffect(() => {
		if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded) {
			updateDataReportProfitLoss();
		}
		if (activeBrand && !activeBrand.is_primary_collect && isFiltersLoaded) {
			setLoading(false);
		}
	}, [activeBrand, selectedRange, activeMonths, activeBrandName, activeArticle, activeGroup, isFiltersLoaded]);

	useEffect(() => {
		if (!activeBrand) return;
		let savedFilterMonths = JSON.parse(localStorage.getItem('activeMonths')) || {};
		savedFilterMonths[activeBrand.id] = activeMonths;
		localStorage.setItem(
			'activeMonths',
			JSON.stringify(savedFilterMonths)
		);
	}, [activeMonths]);

	return (
		<main className={styles.page}>
			<MobilePlug />

			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>
			
			<section className={styles.page__content}>
				<div className={styles.page__headerWrapper}>
					<Header title="Отчет о прибыли и убытках"></Header>
				</div>

				{!loading && activeBrand?.is_primary_collect && !activeBrand?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}

				<div className={styles.how}>
					<HowToLink text='Как использовать раздел' url='https://radar.usedocs.com/article/77557' target='_blank' />
				</div>

				{!loading && isDemoMode && (
					<NoSubscriptionWarningBlock />
				)}

				<div className={styles.controls}>
					<Filters
						timeSelect={false}
						monthSelect={true}
						isDataLoading={loading}
					/>
				</div>

				{!loading && shops && user?.subscription_status && !shopStatus?.is_primary_collect && (
					<DataCollectWarningBlock
						title='Ваши данные еще формируются и обрабатываются.'
					/>
				)}

				<TableWidget
					loading={loading}
					columns={columns}
					data={data}
					virtual={false}
					is_primary_collect={activeBrand?.is_primary_collect}
					progress={progress.value}
					setTableConfig={setColumns}
				/>
			</section>
		</main>
	);
}
