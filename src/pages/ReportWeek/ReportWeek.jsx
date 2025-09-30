import { useMemo } from 'react';
import AuthContext from '@/service/AuthContext';
import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { fileDownload } from '@/service/utils';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { ConfigProvider, Button, Popover } from 'antd';
import styles from './ReportWeek.module.css';
import ReportTable from '@/components/sharedComponents/ReportTable/ReportTable';
import TableSettingModal from '@/components/sharedComponents/modals/tableSettingModal/TableSettingModal';
import { useAppSelector } from '@/redux/hooks';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import {
	eachWeekOfInterval,
	format,
	formatISO,
	endOfWeek,
	getISOWeek,
} from 'date-fns';
// import downloadIcon from '../images/Download.svg';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock'
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { COLUMNS } from './columnsConfig';
import TableWidget from './widgets/TableWidget/TableWidget';
import { useDemoMode } from '@/app/providers/DemoDataProvider';

export default function ReportWeek() {
	const { user, authToken } = useContext(AuthContext);
	const { isDemoMode } = useDemoMode();
	const { activeBrand, selectedRange, activeBrandName, activeArticle, activeGroup, activeWeeks, isFiltersLoaded } = useAppSelector(
		(state) => state.filters
	);
	const filters = useAppSelector((state) => state.filters);
	const { shops } = useAppSelector((state) => state.shopsSlice);
	const [loading, setLoading] = useState(true);
	const [downloadLoading, setDownloadLoading] = useState(false);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [isConfigOpen, setConfigOpen] = useState(false);
	const [tableRows, setTableRows] = useState(null);
	const [progress, setProgress] = useState(0);
	const [tableColumns, setTableColumns] = useState(COLUMNS);

	useEffect(() => {
		let interval = null;
		if (loading) {
			interval = setInterval(() => {
				setProgress((state) => {
					if (state > 90){
						clearInterval(interval)
						return state
					}
					return Math.ceil(state + (90 / 15))
				})
			}, 1000)
		}
		return () => clearInterval(interval)
	}, [loading]);

	useEffect(() => {
		localStorage.removeItem('reportWeekColumns');
		const savedTableColumns = localStorage.getItem('reportWeekTableConfig');
		if (savedTableColumns) {
			setTableColumns(JSON.parse(savedTableColumns));
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

	const initTableColumns = () => {
		const savedColumnsWeek = localStorage.getItem('reportWeekColumns');
		if (savedColumnsWeek) {
			try {
				const columns = JSON.parse(savedColumnsWeek);
				return columns.map((column) => COLUMNS.find((el) => {
					if (typeof column == 'object'){
						return el.dataIndex == column.dataIndex
					}
					return el.dataIndex == column
				}))
			} catch (error) {
				console.error('Ошибка при обработке сохраненных настроек', error)
				return COLUMNS;
			}
		}
		return COLUMNS;
	}

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

	useEffect(() => {
		if (!activeBrand){
			return
		}
		let savedFilterWeek = JSON.parse(localStorage.getItem('activeWeeks')) || {};
		savedFilterWeek[activeBrand.id] = activeWeeks;
		localStorage.setItem(
			'activeWeeks',
			JSON.stringify(savedFilterWeek)
		);
	}, [activeWeeks]);

	const updateDataReportWeek = async () => {
		setLoading(true);
		setProgress(0);
		try {
			if (activeBrand !== null && activeBrand !== undefined) {
				const response = await ServiceFunctions.getReportWeek(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					activeWeeks
				);

				// Собираем общий массив неделей по всем годам из ответа
				let weeks = [];

				for (const year of response.data) {
					for (const week of year.weeks) {
						weeks.push(week);
					}
				}

				setProgress(100);
				await setTimeout(() => dataToTableData(weeks), 500);
			}
		} catch (e) {
			console.error(e);
			setProgress(100);
			dataToTableData(null);
		}
	};

	const dataToTableData = (weeks) => {
		if (!weeks || weeks?.length === 0) {
			setTableRows([]);
			setProgress(null)
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
				if (typeof el.data[key] === 'object') {
					Object.keys(el.data[key]).forEach(k => {
						row[`${key}_${k}`] = el.data[key][k];
					})

				} else {
					row[key] = el.data[key];
				}
			})
			return row;
		});

		rows.forEach(row => {
			Object.keys(row).forEach(key => {
				if (!summary[key]) {
					summary[key] = row[key];
				} else {
					summary[key] += row[key];
				}
			})
		})

		// приcвоение расчетных значений
		summary = {
			...summary,
			key: 'summary',
			week_label: 'Итого за период',
			drr: (summary.advert_amount / summary.revenue_rub) * 100,
			avg_spp: summary.avg_spp / rows.length,
			return_on_investment: summary.return_on_investment / rows.length,
			marginality: summary.marginality / rows.length,
			purchase_percent: summary.purchase_percent / rows.length,
			logistics_per_product: summary.logistics_total_rub / summary.revenue_quantity,
			cost_price_per_one: summary.cost_price / summary.revenue_quantity,
			profit_per_one: summary.profit / summary.revenue_quantity,
			avg_check: summary.revenue_rub / summary.revenue_quantity,
		};

		rows.unshift(summary);
		setTableRows(rows);
		setProgress(null)
		setLoading(false);
	};

	useLayoutEffect(() => {
		if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded) {
			updateDataReportWeek();
		}
		if (activeBrand && !activeBrand.is_primary_collect && isFiltersLoaded){
			setLoading(false);
		}
	}, [activeBrand, selectedRange, activeBrandName, activeArticle, activeGroup, activeWeeks, isFiltersLoaded]);

	const popoverHandler = (status) => {
		setIsPopoverOpen(status);
	};

	const tableColumnsHandler = (columns) => {
		setTableColumns(columns)
	}

	const configClear = () => {
		tableColumnsHandler(COLUMNS);
		localStorage.setItem('reportWeekTableConfig', JSON.stringify(COLUMNS))
		setIsPopoverOpen(false);
	};

	const configOpen = () => {
		setConfigOpen(true);
		setIsPopoverOpen(false);
	};

	const configCancel = () => {
		setConfigOpen(false);
	};

	const PopoverContent = () => (
		<ConfigProvider
			theme={{
				token: {
					colorBorder: '#fff',
					colorPrimary: '#5329FF',
				},
				components: {
					Button: {
						paddingBlock: 4,
						paddingInline: 4,
						fontWeight: 600,
						fontSize: 16,
					},
				},
			}}
		>
			<div className={styles.popover}>
				<Button type="default" variant="text" onClick={configOpen}>
					Настройки колонок
				</Button>
				<Button type="default" variant="text" onClick={configClear}>
					Исходная таблица
				</Button>
			</div>
		</ConfigProvider>
	);

	const handleDownload = async () => {
		setDownloadLoading(true)
		try {
			const fileBlob = await ServiceFunctions.getDownloadReportWeek(
				authToken,
				selectedRange,
				activeBrand.id,
				filters,
				activeWeeks
			);
			fileDownload(fileBlob, 'Отчет_по_неделям.xlsx');
		} catch(e) {
			console.error('Ошибка скачивания: ', error)
		} finally {
			setDownloadLoading(false)
		}
	};

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
					<Header title="По неделям"></Header>
				</div>

				{!loading && shopStatus?.is_primary_collect && !shopStatus?.is_self_cost_set && (
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
						<ConfigProvider
							theme={{
								token: {
									colorBorder: '#00000033',
									colorPrimary: '#E7E1FE',
								},
								components: {
									Popover: {
										borderRadiusXS: 8,
										boxShadowSecondary:
											'0 0 20px 0 rgba(0, 0, 0, 0.08)',
									},
									Button: {
										primaryColor: '#5329FF',
										paddingInlineLG: 9.5,
										defaultShadow: false,
										controlHeightLG: 45,
									},
								},
							}}
						>
							<Popover
								arrow={false}
								content={PopoverContent}
								trigger="click"
								open={isPopoverOpen}
								placement="bottomRight"
								onOpenChange={popoverHandler}
							>
								<Button
									type="primary"
									iconPosition="start"
									size="large"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1.23731 14.2714C0.920898 12.777 0.920898 11.233 1.23731 9.73858C2.45853 9.88161 3.52573 9.47783 3.87339 8.63728C4.22216 7.79562 3.75457 6.75593 2.78859 5.99349C3.62149 4.71321 4.71321 3.62149 5.99349 2.78859C6.75483 3.75347 7.79562 4.22216 8.63728 3.87339C9.47893 3.52463 9.88271 2.45853 9.73858 1.23731C11.233 0.920898 12.777 0.920898 14.2714 1.23731C14.1284 2.45853 14.5322 3.52573 15.3727 3.87339C16.2144 4.22216 17.2541 3.75457 18.0165 2.78859C19.2968 3.62149 20.3885 4.71321 21.2214 5.99349C20.2565 6.75483 19.7878 7.79562 20.1366 8.63728C20.4854 9.47893 21.5515 9.88271 22.7727 9.73858C23.0891 11.233 23.0891 12.777 22.7727 14.2714C21.5515 14.1284 20.4843 14.5322 20.1366 15.3727C19.7878 16.2144 20.2554 17.2541 21.2214 18.0165C20.3885 19.2968 19.2968 20.3885 18.0165 21.2214C17.2552 20.2565 16.2144 19.7878 15.3727 20.1366C14.5311 20.4854 14.1273 21.5515 14.2714 22.7727C12.777 23.0891 11.233 23.0891 9.73858 22.7727C9.88161 21.5515 9.47783 20.4843 8.63728 20.1366C7.79562 19.7878 6.75593 20.2554 5.99349 21.2214C4.71321 20.3885 3.62149 19.2968 2.78859 18.0165C3.75347 17.2552 4.22216 16.2144 3.87339 15.3727C3.52463 14.5311 2.45853 14.1273 1.23731 14.2714ZM3.20337 12.236C4.41359 12.5716 5.41148 13.3384 5.90657 14.5311C6.40056 15.7248 6.23663 16.9735 5.61832 18.0649C5.72394 18.1771 5.83286 18.2861 5.94508 18.3917C7.03758 17.7734 8.28521 17.6105 9.47893 18.1034C10.6716 18.5985 11.4384 19.5964 11.774 20.8066C11.928 20.811 12.082 20.811 12.236 20.8066C12.5716 19.5964 13.3384 18.5985 14.5311 18.1034C15.7248 17.6094 16.9735 17.7734 18.0649 18.3917C18.1771 18.2861 18.2861 18.1771 18.3917 18.0649C17.7734 16.9724 17.6105 15.7248 18.1034 14.5311C18.5985 13.3384 19.5964 12.5716 20.8066 12.236C20.811 12.082 20.811 11.928 20.8066 11.774C19.5964 11.4384 18.5985 10.6716 18.1034 9.47893C17.6094 8.28521 17.7734 7.03648 18.3917 5.94508C18.2857 5.83329 18.1767 5.72433 18.0649 5.61832C16.9724 6.23663 15.7248 6.39946 14.5311 5.90657C13.3384 5.41148 12.5716 4.41359 12.236 3.20337C12.082 3.19929 11.928 3.19929 11.774 3.20337C11.4384 4.41359 10.6716 5.41148 9.47893 5.90657C8.28521 6.40056 7.03648 6.23663 5.94508 5.61832C5.83286 5.72394 5.72394 5.83286 5.61832 5.94508C6.23663 7.03758 6.39946 8.28521 5.90657 9.47893C5.41148 10.6716 4.41359 11.4384 3.20337 11.774C3.19897 11.928 3.19897 12.082 3.20337 12.236ZM12.005 15.3056C11.1296 15.3056 10.2901 14.9579 9.67111 14.3389C9.05213 13.7199 8.70439 12.8804 8.70439 12.005C8.70439 11.1296 9.05213 10.2901 9.67111 9.67111C10.2901 9.05213 11.1296 8.70439 12.005 8.70439C12.8804 8.70439 13.7199 9.05213 14.3389 9.67111C14.9579 10.2901 15.3056 11.1296 15.3056 12.005C15.3056 12.8804 14.9579 13.7199 14.3389 14.3389C13.7199 14.9579 12.8804 15.3056 12.005 15.3056ZM12.005 13.1052C12.2968 13.1052 12.5766 12.9893 12.783 12.783C12.9893 12.5766 13.1052 12.2968 13.1052 12.005C13.1052 11.7132 12.9893 11.4334 12.783 11.227C12.5766 11.0207 12.2968 10.9048 12.005 10.9048C11.7132 10.9048 11.4334 11.0207 11.227 11.227C11.0207 11.4334 10.9048 11.7132 10.9048 12.005C10.9048 12.2968 11.0207 12.5766 11.227 12.783C11.4334 12.9893 11.7132 13.1052 12.005 13.1052Z"
											fill="currentColor"
										/>
									</svg>
								</Button>
							</Popover>
						</ConfigProvider>
					</div>
				</div>)}

				{!loading && shops && user?.subscription_status && !shopStatus?.is_primary_collect && (
					<DataCollectWarningBlock
						title='Ваши данные еще формируются и обрабатываются.'
					/>
				)}

				{/* { shopStatus?.is_primary_collect && */}
				<div className={styles.container}>
					<TableWidget
						loading={loading}
						columns={tableColumns}
						data={tableRows}
						is_primary_collect={shopStatus?.is_primary_collect}
						progress={progress}
						setTableColumns={setTableColumns}
					/>
				</div>
			</section>

			{isConfigOpen && (
				<TableSettingModal
					isModalOpen={isConfigOpen}
					closeModal={configCancel}
					tableColumns={tableColumns}
					setTableColumns={tableColumnsHandler}
					columnsList={COLUMNS}
				/>
			)}
		</main>
	);
}
