import { useMemo } from 'react';
import AuthContext from '@/service/AuthContext';
import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { fileDownload } from '@/service/utils';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import styles from './ReportWeek.module.css';
import TableSettingsModal from '@/components/TableSettingsModal';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { actions as filterActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import {
	eachWeekOfInterval,
	format,
	formatISO,
	endOfWeek,
	getISOWeek,
} from 'date-fns';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { COLUMNS, CURR_REPORT_WEEK_COLUMNS_CONFIG_VER } from './columnsConfig';
import TableWidget from './widgets/TableWidget/TableWidget';
import { useDemoMode } from '@/app/providers/DemoDataProvider';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import DownloadButton from '@/components/DownloadButton';
import TableSettingsButton from '@/components/TableSettingsButton';

export default function ReportWeek() {
	const { user, authToken } = useContext(AuthContext);
	const { isDemoMode } = useDemoMode();
	const dispatch = useAppDispatch();
	const { activeBrand, selectedRange, activeBrandName, activeArticle, activeGroup, activeWeeks, isFiltersLoaded, shops } = useAppSelector(state => state.filters);
	const filters = useAppSelector((state) => state.filters);
	//const { shops } = useAppSelector((state) => state.shopsSlice);
	const [loading, setLoading] = useState(true);
	const progress = useLoadingProgress({ loading });
	const [downloadLoading, setDownloadLoading] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [tableRows, setTableRows] = useState(null);
	const [tableColumns, setTableColumns] = useState(COLUMNS);

	useEffect(() => {
		const savedTableConfigData = localStorage.getItem('reportWeekTableConfig');
		if (savedTableConfigData) {
			try {
				const parsed = JSON.parse(savedTableConfigData);

				// Проверяем версию конфига
				if (parsed.version === CURR_REPORT_WEEK_COLUMNS_CONFIG_VER) {
					setTableColumns(parsed.config);
				} else {
					// Версия не совпадает, используем дефолтный конфиг
					console.warn('Report Week config version mismatch, using default config');
					setTableColumns(COLUMNS);
				}
			} catch (error) {
				console.error('Error parsing saved table config:', error);
				setTableColumns(COLUMNS);
			}
		} else {
			setTableColumns(COLUMNS);
		}
	}, []);

	const weekOptions = useMemo(() => {
		// шаблон для создания списка опций для фильтра
		const optionTemplate = (date) => {
			const weekValue = formatISO(date, { representation: 'date' });
			const weekStart = format(date, 'dd.MM.yyyy');
			const weekEnd = format(
				endOfWeek(date, { weekStartsOn: 1 }),
				'dd.MM.yyyy'
			);
			const weekNumber = getISOWeek(date);
			return {
				key: date.getTime(),
				value: weekValue,
				label: `${weekNumber} неделя (${weekStart} - ${weekEnd})`,
			};
		};

		// Выборка дат с 2024-01-29
		const weeks = eachWeekOfInterval(
			{
				start: new Date(2024, 0, 29),
				end: Date.now(),
			},
			{
				weekStartsOn: 1,
			}
		);

		// удаляем последнюю неделю
		weeks.pop();
		return weeks.map((el, i) => optionTemplate(el)).reverse();
	}, []);

	useEffect(() => {
		if (isDemoMode && weekOptions?.length) {
			dispatch(fetchFilters(authToken));
		}
	}, [isDemoMode, weekOptions]);

	useEffect(() => {
		if (isDemoMode && weekOptions?.length) {
			dispatch(filterActions.setActiveFilters({
				stateKey: 'activeWeeks',
				data: weekOptions.slice(0, 12),
			}));
		}
	}, [filters.filters, weekOptions, isDemoMode]);

	const updateDataReportWeek = async (filters, authToken) => {
		setLoading(true);
		progress.start();
		try {
			const response = await ServiceFunctions.getReportWeek(
				authToken,
				filters.selectedRange,
				filters.activeBrand.id,
				filters,
				filters.activeWeeks
			);

			// Собираем общий массив неделей по всем годам из ответа
			let weeks = [];

			for (const year of response.data) {
				for (const week of year.weeks) {
					weeks.push(week);
				}
			}

			progress.complete();
			await setTimeout(() => {
				dataToTableData(weeks); 
				progress.reset();
			}, 500);
		} catch (e) {
			console.error(e);
			dataToTableData(null);
		}
	};

	const dataToTableData = (weeks) => {
		if (!weeks || weeks?.length === 0) {
			setTableRows([]);
			progress.complete();
			setLoading(false);
			return;
		}

		let summary = {};

		let rows = weeks;

		rows = rows.map((el, i) => {
			let row = {
				key: i,
				week_label: el.week_label,
			};
			Object.keys(el.data).forEach(key => {
				if (el.data[key]?.rub || el.data[key]?.percent) {
					Object.keys(el.data[key]).forEach(k => {
						row[`${key}_${k}`] = el.data[key][k];
					});

				} else {
					row[key] = el.data[key];
				}
			});
			return row;
		});

		rows.forEach(row => {
			Object.keys(row).forEach(key => {
				if (!summary[key]) {
					if (typeof row[key] === 'object' && row[key]?.value) {
						summary[key] = row[key].value;
					} else {
						summary[key] = row[key];
					}
				} else {
					if (typeof row[key] === 'object' && row[key]?.value) {
						summary[key] += row[key].value;
					} else {
						summary[key] += row[key];
					}
				}
			});
		});

		//проверяем, попадает ли сегодня в интервал
		const parseDdMmYyyy = (str) => {
			const [dd, mm, yyyy] = str.split('.').map(Number);
			return new Date(yyyy, mm - 1, dd);
		};

		const isTodayInWeekLabel = (weekLabel) => {
			// достаем диапазон внутри скобок: "13.10.2025 - 19.10.2025"
			const m = weekLabel.match(/\(([^)]+)\)/);
			if (!m) return false;

			const [fromStr, toStr] = m[1].split('-').map(s => s.trim());
			const from = parseDdMmYyyy(fromStr);
			const to = parseDdMmYyyy(toStr);

			// нормализуем к полуночи и сравниваем включительно
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			from.setHours(0, 0, 0, 0);
			to.setHours(0, 0, 0, 0);

			return today >= from && today <= to;
		};

		// нахождение объекта с текущей неделей
		const currentRowIndex = rows.findIndex(r => isTodayInWeekLabel(r.week_label));
		if (currentRowIndex !== -1) {
			const summaryValue = Object.keys(rows[currentRowIndex]).reduce((acc, key) => {
				if (typeof rows[currentRowIndex][key] === 'object') {
					acc += rows[currentRowIndex][key].value;
				} else {
					return acc;
				}
			}, 0);

			// Вариант с тултипом
			if (summaryValue === 0) {
				rows[currentRowIndex].noData = true;
			}

			// Вариант с удалением строки
			// if (summaryValue === 0) {
			// 	rows.splice(currentRowIndex, 1);
			// }
		}

		if (rows.length > 0) {
			// приcвоение расчетных значений
			summary = {
				...summary,
				key: 'summary',
				week_label: 'Итого за период',
				drr: summary.revenue_rub !== 0 ? (summary.advert_amount / summary.revenue_rub) * 100 : 0,
				avg_spp: rows.length !== 0 ? summary.avg_spp / rows.length : 0,
				return_on_investment: rows.length !== 0 ? summary.return_on_investment / rows.length : 0,
				marginality: rows.length !== 0 ? summary.marginality / rows.length : 0,
				purchase_percent: rows.length !== 0 ? summary.purchase_percent / rows.length : 0,
				logistics_per_product: summary.revenue_quantity !== 0 ? summary.logistics_total_rub / summary.revenue_quantity : 0,
				cost_price_per_one: summary.revenue_quantity !== 0 ? summary.cost_price / summary.revenue_quantity : 0,
				profit_per_one: summary.revenue_quantity !== 0 ? summary.profit / summary.revenue_quantity : 0,
				avg_check: summary.revenue_quantity !== 0 ? summary.revenue_rub / summary.revenue_quantity : 0,
			};

			rows.unshift(summary);
		}
		setTableRows(rows);
		progress.complete();
		setLoading(false);
	};

	useLayoutEffect(() => {
		if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded) {
			updateDataReportWeek(filters, authToken);
		}
		if (activeBrand && !activeBrand.is_primary_collect && isFiltersLoaded) {
			setLoading(false);
		}
	}, [isFiltersLoaded, activeBrand, activeWeeks, activeBrandName, activeArticle, activeGroup]);

	// Преобразуем колонки для TableSettingsModal
	const columnsForSettings = useMemo(() => {
		return tableColumns.map((col) => ({
			...col,
			id: col.dataIndex,
			title: col.title,
			isVisible: !col.hidden,
		}));
	}, [tableColumns]);

	const originalColumnsForSettings = useMemo(() => {
		return COLUMNS.map((col) => ({
			...col,
			id: col.dataIndex,
			title: col.title,
			isVisible: !col.hidden,
		}));
	}, []);

	const handleSettingsSave = (updatedColumns) => {
		// Преобразуем обратно в формат таблицы
		const newTableColumns = updatedColumns.map((col) => ({
			...col,
			dataIndex: col.id,
			hidden: !col.isVisible,
		}));
		setTableColumns(newTableColumns);
		localStorage.setItem('reportWeekTableConfig', JSON.stringify({
			version: CURR_REPORT_WEEK_COLUMNS_CONFIG_VER,
			config: newTableColumns
		}));
	};

	const handleDownload = async () => {
		setDownloadLoading(true);
		try {
			const fileBlob = await ServiceFunctions.getDownloadReportWeek(
				authToken,
				selectedRange,
				activeBrand.id,
				filters,
				activeWeeks
			);
			fileDownload(fileBlob, 'Отчет_по_неделям.xlsx');
		} catch (e) {
			console.error('Ошибка скачивания: ', e);
		} finally {
			setDownloadLoading(false);
		}
	};

	return (
		<main className={styles.page}>
			<MobilePlug />

			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>

			<section className={styles.page__content}>
				<div className={styles.page__headerWrapper}>
					<Header title="По неделям" hasShadow={false}></Header>
				</div>

				{!loading && activeBrand?.is_primary_collect && !activeBrand?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}

				{isDemoMode && (
					<NoSubscriptionWarningBlock />
				)}

				{shops && (<div className={styles.controls}>
					<div className={styles.filter}>
						<Filters
							timeSelect={false}
							setLoading={setLoading}
							weekSelect={true}
							isDataLoading={loading}
						/>
					</div>
					<div className={styles.btns}>
						<DownloadButton
							handleDownload={handleDownload}
							loading={loading || downloadLoading}
						/>
						<TableSettingsButton
							className={styles.settingsButton}
							onClick={() => setIsSettingsOpen(true)}
							disabled={loading}
						/>
					</div>
				</div>)}

				{!loading && shops && user?.subscription_status && !activeBrand?.is_primary_collect && (
					<DataCollectWarningBlock
						title='Ваши данные еще формируются и обрабатываются.'
					/>
				)}

				<div className={styles.container}>
					<TableWidget
						loading={loading}
						columns={tableColumns}
						data={tableRows ?? []}
						is_primary_collect={activeBrand?.is_primary_collect}
						progress={progress.value}
						setTableColumns={setTableColumns}
						configVersion={CURR_REPORT_WEEK_COLUMNS_CONFIG_VER}
					/>
				</div>
			</section>

			<TableSettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				title="Настройки таблицы"
				items={columnsForSettings}
				onSave={handleSettingsSave}
				originalItems={originalColumnsForSettings}
				idKey="id"
				titleKey="title"
			/>
		</main>
	);
}
