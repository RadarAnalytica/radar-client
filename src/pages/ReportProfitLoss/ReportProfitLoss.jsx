import React from 'react';
import AuthContext from '@/service/AuthContext';
import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
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
import TableSettingsModal from '@/components/TableSettingsModal';
import TableSettingsButton from '@/components/TableSettingsButton';

const ROWS_CONFIG_STORAGE_KEY = 'reportProfitLoss_rowsConfig';
const ROWS_CONFIG_VERSION = '1.0.0';

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
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [rowsConfig, setRowsConfig] = useState(null); // Saved rows visibility/order config
	const [rawResponseData, setRawResponseData] = useState(null); // Store raw API response for reprocessing

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

	// Load rows config from localStorage on mount
	useEffect(() => {
		try {
			const savedConfig = localStorage.getItem(ROWS_CONFIG_STORAGE_KEY);
			if (savedConfig) {
				const parsed = JSON.parse(savedConfig);
				if (parsed.version === ROWS_CONFIG_VERSION) {
					setRowsConfig(parsed.config);
				}
			}
		} catch (error) {
			console.error('Error loading rows config:', error);
		}
	}, []);

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

	// Get default metrics order (static rows configuration)
	const getDefaultMetricsOrder = useCallback((apiData) => {
		const baseMetrics = [
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

		// Add dynamic operating expenses children from API data
		if (apiData) {
			try {
				// Data structure: apiData[0].data.operating_expenses.items
				const operatingExpensesItems = apiData[0]?.data?.operating_expenses?.items;

				if (Array.isArray(operatingExpensesItems) && operatingExpensesItems.length > 0) {
					const categories = [...new Set(operatingExpensesItems.map(item => item.category || 'Без статьи'))];
					categories.sort().forEach(category => {
						baseMetrics.push({
							key: category,
							title: category,
							isChildren: true,
							parentKey: 'operating_expenses',
							inverseIndication: true,
							isDynamic: true, // Mark as dynamic (from API)
						});
					});
				}
			} catch (error) {
				console.warn('Operating expenses not found:', error);
			}
		}

		return baseMetrics;
	}, []);

	// Apply saved config to metrics order
	const applyRowsConfig = useCallback((metricsOrder, config) => {
		if (!config) return metricsOrder;

		// Create maps for quick lookup
		const configMap = new Map(config.map((item) => [item.key, item]));

		// Separate parents and children from config for ordering
		const parentOrders = new Map();
		const childOrdersByParent = new Map();

		config.forEach((item, idx) => {
			if (item.parentKey) {
				// It's a child
				if (!childOrdersByParent.has(item.parentKey)) {
					childOrdersByParent.set(item.parentKey, new Map());
				}
				childOrdersByParent.get(item.parentKey).set(item.key, item.order ?? idx);
			} else {
				// It's a parent
				parentOrders.set(item.key, item.order ?? idx);
			}
		});

		// Apply visibility, order, and isExpanded from config
		const result = metricsOrder.map(metric => {
			const savedConfig = configMap.get(metric.key);
			if (savedConfig) {
				let order;
				if (metric.isChildren && metric.parentKey) {
					// For children, use child-specific ordering
					const childOrders = childOrdersByParent.get(metric.parentKey);
					order = childOrders?.get(metric.key) ?? 999;
				} else {
					// For parents, use parent ordering
					order = parentOrders.get(metric.key) ?? 999;
				}
				return {
					...metric,
					hidden: savedConfig.hidden,
					order,
					// Restore isExpanded from saved config (if it exists), otherwise keep default
					isExpanded: savedConfig.isExpanded !== undefined ? savedConfig.isExpanded : metric.isExpanded,
				};
			}
			return { ...metric, hidden: false, order: 999 }; // New items go to the end
		});

		// Sort: first separate parents and children
		const parents = result.filter(item => !item.isChildren);
		const childrenByParent = {};
		result.filter(item => item.isChildren).forEach(child => {
			if (!childrenByParent[child.parentKey]) {
				childrenByParent[child.parentKey] = [];
			}
			childrenByParent[child.parentKey].push(child);
		});

		// Sort parents
		parents.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

		// Sort children within each parent and rebuild flat array
		const sortedResult = [];
		parents.forEach(parent => {
			if (!parent.hidden) {
				sortedResult.push(parent);
			}
			const children = childrenByParent[parent.key] || [];
			children.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
			children.forEach(child => {
				if (!child.hidden) {
					sortedResult.push(child);
				}
			});
		});

		return sortedResult;
	}, []);

	const dataToTableData = useCallback((response, config = rowsConfig) => {
		if (!response?.data?.length) {
			setColumns([]);
			setData([]);
			return;
		}

		const { data } = response;

		// Get metrics order with dynamic items from API
		let metricsOrder = getDefaultMetricsOrder(data);

		// Apply saved configuration (visibility and order)
		metricsOrder = applyRowsConfig(metricsOrder, config);

		setData([...getData(data, metricsOrder)]);
		setColumns(getConfig(data));
	}, [rowsConfig, getDefaultMetricsOrder, applyRowsConfig]);

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
				setRawResponseData(response); // Store raw response for settings modal
				dataToTableData(response);
				progress.reset();
				setLoading(false);
			}, 500);
		} catch (e) {
			console.error(e);
			setRawResponseData(null);
			dataToTableData(null);
			progress.reset();
			setLoading(false);
		}
	};

	// Helper to group metrics into hierarchical structure
	const groupMetricsToHierarchy = useCallback((metricsOrder, configMap = null) => {
		const parents = [];
		const childrenByParent = {};

		// First pass: separate parents and children
		metricsOrder.forEach((metric, index) => {
			const savedConfig = configMap?.get(metric.key);
			const isVisible = savedConfig ? !savedConfig.hidden : true;
			const order = savedConfig?.order ?? index;

			const item = {
				...metric,
				id: metric.key,
				isVisible,
				order,
			};

			if (metric.isChildren && metric.parentKey) {
				if (!childrenByParent[metric.parentKey]) {
					childrenByParent[metric.parentKey] = [];
				}
				childrenByParent[metric.parentKey].push(item);
			} else {
				parents.push(item);
			}
		});

		// Sort parents by order
		parents.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

		// Attach children to parents and sort children
		return parents.map(parent => {
			const children = childrenByParent[parent.key] || [];
			children.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
			return {
				...parent,
				// Important: always include children array for parents that have isParent: true
				// This ensures the expand icon is shown in the modal
				children: parent.isParent ? (children.length > 0 ? children : []) : undefined,
			};
		});
	}, []);

	// Prepare rows for settings modal - transform to hierarchical structure
	const rowsForSettings = useMemo(() => {
		if (!rawResponseData?.data?.length) return [];

		const metricsOrder = getDefaultMetricsOrder(rawResponseData.data);

		// Apply current config to get visibility and order
		const configMap = rowsConfig ? new Map(rowsConfig.map((item) => [item.key, item])) : null;

		return groupMetricsToHierarchy(metricsOrder, configMap);
	}, [rawResponseData, rowsConfig, getDefaultMetricsOrder, groupMetricsToHierarchy]);

	// Original rows for "Reset to default" button
	const originalRowsForSettings = useMemo(() => {
		if (!rawResponseData?.data?.length) return [];

		const metricsOrder = getDefaultMetricsOrder(rawResponseData.data);

		return groupMetricsToHierarchy(metricsOrder, null);
	}, [rawResponseData, getDefaultMetricsOrder, groupMetricsToHierarchy]);

	// Handle settings save
	const handleSettingsSave = useCallback((updatedItems) => {
		// Flatten hierarchical structure back to flat config
		const flatConfig = [];
		let orderIndex = 0;

		updatedItems.forEach(item => {
			flatConfig.push({
				key: item.id,
				hidden: !item.isVisible,
				order: orderIndex++,
				isParent: item.isParent,
				isExpanded: item.isExpanded,
			});

			if (item.children && item.children.length > 0) {
				item.children.forEach(child => {
					flatConfig.push({
						key: child.id,
						hidden: !child.isVisible,
						order: orderIndex++,
						parentKey: item.id,
						isChildren: true,
					});
				});
			}
		});

		// Save to state and localStorage
		setRowsConfig(flatConfig);
		localStorage.setItem(ROWS_CONFIG_STORAGE_KEY, JSON.stringify({
			version: ROWS_CONFIG_VERSION,
			config: flatConfig,
		}));

		// Reprocess data with new config
		if (rawResponseData) {
			dataToTableData(rawResponseData, flatConfig);
		}
	}, [rawResponseData, dataToTableData]);

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
					<div className={styles.controlsButtons}>
						<DownloadButton
							handleDownload={handleDownload}
							loading={loading || downloadLoading}
						/>
						<TableSettingsButton
							className={styles.settingsButton}
							onClick={() => setIsSettingsOpen(true)}
							disabled={loading || !rawResponseData}
						/>
					</div>
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

				<TableSettingsModal
					isOpen={isSettingsOpen}
					onClose={() => setIsSettingsOpen(false)}
					title="Настройки строк отчёта"
					items={rowsForSettings}
					onSave={handleSettingsSave}
					originalItems={originalRowsForSettings}
					idKey="id"
					titleKey="title"
					childrenKey="children"
				/>
			</section>
		</main>
	);
}
