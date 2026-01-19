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
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from '@/app/providers';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
// import { getMinCustomDate } from '@/service/utils';
import DownloadButton from '@/components/DownloadButton';
import { fileDownload } from '@/service/utils';

export default function ReportProfitLoss() {
	const { user, authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange, activeMonths, activeBrandName, activeArticle, activeGroup, isFiltersLoaded, shops } = useAppSelector((state) => state.filters);
	const { isDemoMode } = useDemoMode();
	const filters = useAppSelector((state) => state.filters);
	const [loading, setLoading] = useState(true);
	const progress = useLoadingProgress({ loading });
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [downloadLoading, setDownloadLoading] = useState(false);

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

	const handleDownload = async () => {
        setDownloadLoading(true);
        try {
            const fileBlob = await ServiceFunctions.getDownloadReportProfitLossExel(
                authToken,
                selectedRange,
                activeBrand.id,
                filters,
            );
            fileDownload(fileBlob, 'Отчет_о_прибылях_и_убытках.xlsx');
        } catch (e) {
            console.error('Ошибка скачивания: ', e);
        } finally {
            setDownloadLoading(false);
        }
    };


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
		const defaultExpenseItem = { rub: { value: 0, comparison_percentage: 0 }, percent: 0 };

		const getCellValue = (dataSource, key, parentKey, isParent, isChildren) => {
			if (!isParent && !isChildren) {
				return dataSource[key];
			}

			if (parentKey === 'operating_expenses') {
				const expenseItem = dataSource.operating_expenses?.items?.find(exp => exp.category === key);
				return expenseItem ? { ...expenseItem, parentKey } : defaultExpenseItem;
			}

			if (key === 'operating_expenses') {
				const expenseItem = dataSource.operating_expenses.total;
				return expenseItem || defaultExpenseItem;
			}

			return dataSource.direct_expenses[key];
		};

		metricsOrder.forEach((metric, index) => {
			const { key, title, isChildren, isParent, parentKey, isExpanded, tooltip, inverseIndication, noIndication } = metric;
			let rowObject = {
				article: title,
				isParent,
				id: index,
				key,
				isExpanded,
				tooltip,
				inverseIndication,
				noIndication,
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
				childrenData[parentKey] = [...(childrenData[parentKey] || []), rowObject].map(item => ({ ...item, parentKey }));
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

		return finalDataSource.map(_ => {
			if (!_.children) return _;
			return {
				..._,
				children: _.children.map(child => {
					return {
						...child,
						isChild: true,
					};
				}),
			};
		});
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
			{ key: 'sales', title: 'Фактические продажи', tooltip: 'Выручка от продаж по ценам до СПП.' },
			{ key: 'mp_discount', title: 'Скидка за счет МП', tooltip: 'Суммарная скидка, предоставленной маркетплейсом.' },
			{ key: 'realization', title: 'Реализация', tooltip: 'Сумма, на которую WB реализовал товар (после СПП).' },
			{ key: 'total_expenses', title: 'Прямые расходы', inverseIndication: true, isParent: true, isExpanded: true, tooltip: 'Сумма всех прямых расходов. Формула: Себестоимость + Реклама + Хранение + Приемка + Комиссия + Логистика + Штрафы – Компенсации' },
			{ key: 'cost', title: 'Себестоимость', isChildren: true, parentKey: 'total_expenses', noIndication: true, tooltip: 'Себестоимость проданных товаров.' },
			{ key: 'advert', title: 'Внутренняя реклама', inverseIndication: true, isChildren: true, parentKey: 'total_expenses', tooltip: 'Расходы на рекламу внутри WB.' },
			{ key: 'storage', title: 'Хранение', inverseIndication: true, isChildren: true, parentKey: 'total_expenses', tooltip: 'Расходы на хранение.' },
			{ key: 'paid_acceptance', title: 'Платная приемка', inverseIndication: true, isChildren: true, parentKey: 'total_expenses', tooltip: 'Расходы на приёмку.' },
			{ key: 'commission', title: 'Комиссия', isChildren: true, inverseIndication: true, parentKey: 'total_expenses', tooltip: 'Комиссия WB.' },
			{ key: 'logistic', title: 'Логистика', isChildren: true, inverseIndication: true, parentKey: 'total_expenses', tooltip: 'Расходы на логистику.' },
			{ key: 'penalties', title: 'Штрафы и прочие удержания', inverseIndication: true, isChildren: true, parentKey: 'total_expenses', tooltip: 'К прочим удержания отнесены: платежи по договору займа, предоставление услуг по подписке «Джем», страхование заказов, услуги по размещению рекламного материала, списания за отзывы, утилизации товара' },
			{ key: 'compensation', title: 'Компенсация', tooltip: 'Компенсации от WB.' },
			{ key: 'gross_margin', title: 'Маржинальная прибыль', tooltip: 'Выручка за вычетом себестоимости. Формула: Выручка – Себестоимость' },
			{ key: 'operating_expenses', title: 'Операционные расходы', inverseIndication: true, isParent: true, isExpanded: false, tooltip: 'Сумма операционных расходов за период.' },
			{ key: 'operating_profit', title: 'Операционная прибыль (EBITDA)', tooltip: 'Прибыль до вычета налогов, процентов и амортизации. Формула: Маржинальная прибыль – (Комиссии + Логистика + Реклама)' },
			{ key: 'tax', title: 'Налоги', inverseIndication: true },
			{ key: 'net_profit', title: 'Чистая прибыль', tooltip: 'Итоговая прибыль. Формула: Оплата на РС – Себестоимость продаж – Налог – Операционные расходы' },
		];

		try {
			if (Array.isArray(data[0].data.operating_expenses?.items) && data[0].data.operating_expenses?.items?.length > 0) {
				const categories = [...new Set(data[0].data.operating_expenses?.items?.map(item => item.category || 'Без статьи'))];
				categories.sort().forEach(category => {
					metricsOrder.push({
						key: category,
						title: category,
						isChildren: true,
						parentKey: 'operating_expenses',
						inverseIndication: true,
					});
				});
			}
		} catch (error) {
			console.warn('Operating expenses not found:', error);
		}
		
		setData([...getData(data, metricsOrder)]);
		setColumns(getConfig(data));
	};

	const updateDataReportProfitLoss = async (filters, authToken) => {
		setLoading(true);
		progress.start();
		try {
			const response = await ServiceFunctions.getReportProfitLoss(
				authToken,
				filters.selectedRange,
				filters.activeBrand.id,
				filters,
				filters.activeMonths
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
			updateDataReportProfitLoss(filters, authToken);
		}
		if (activeBrand && !activeBrand.is_primary_collect && isFiltersLoaded) {
			setLoading(false);
		}
	}, [isFiltersLoaded, activeBrand, activeMonths, activeBrandName, activeArticle, activeGroup]);

	return (
		<main className={styles.page}>
			<MobilePlug />

			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>
			
			<section className={styles.page__content}>
				<div className={styles.page__headerWrapper}>
					<Header 
						title="Отчет о прибыли и убытках"
						howToLink="https://radar.usedocs.com/article/77557"
						howToLinkText="Как использовать раздел?"
						hasShadow={false} 
					/>
				</div>

				{!loading && activeBrand?.is_primary_collect && !activeBrand?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}

				{!loading && isDemoMode && (
					<NoSubscriptionWarningBlock />
				)}

				<div className={styles.controls}>
					<Filters
						timeSelect={false}
						monthSelect={true}
						isDataLoading={loading}
						//minCustomDate={getMinCustomDate(activeBrand?.created_at, 6, 'month')}
					/>
					 <DownloadButton
                        handleDownload={handleDownload}
                        loading={loading || downloadLoading}
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
