import { useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styles from './AbcAnalysisPage.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AuthContext from '../../service/AuthContext';
import NoSubscriptionPage from '../NoSubscriptionPage';
import { ServiceFunctions } from '../../service/serviceFunctions';
import DataCollectionNotification from '../../components/DataCollectionNotification';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Header from '../../components/sharedComponents/header/header';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import { mockGetAbcData } from '../../service/mockServiceFunctions';
// import NoSubscriptionWarningBlock from '../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import SelfCostWarningBlock from '../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import DataCollectWarningBlock from '../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { ConfigProvider, Table, Button, Flex } from 'antd';
import ruRU from 'antd/locale/ru_RU'
import { COLUMNS } from './widgets/table/config';

const AbcAnalysisPage = () => {
	const { activeBrand, selectedRange: days } = useAppSelector(
		(store) => store.filters
	);
	const filters = useAppSelector((store) => store.filters);
	const shops = useAppSelector((state) => state.shopsSlice.shops);
	const { user, authToken } = useContext(AuthContext);
	const dispatch = useAppDispatch();
	const [dataAbcAnalysis, setDataAbcAnalysis] = useState(null);
	const [isNeedCost, setIsNeedCost] = useState([]);
	const [viewType, setViewType] = useState('proceeds');
	const [sorting, setSorting] = useState({ key: null, direction: 'desc' });
	const [loading, setLoading] = useState(true);
	const [primaryCollect, setPrimaryCollect] = useState(null);
	const [shopStatus, setShopStatus] = useState(null);

	const [page, setPage] = useState(1);
	const tableContainerRef = useRef(null);
	const tableScroll = useMemo(() => {
		if (!tableContainerRef.current){
			return ({ x: '100%', y: 400 })
		}
		const container = tableContainerRef.current;
		const {height} = container.getBoundingClientRect();
		// расчет высоты относительно контента, высоты фильтров и отступов
		const availableHeight = height - 230 > 350 ? height - 230 : 400;
		return ({ x: '100%', y: availableHeight })
	}, [dataAbcAnalysis])

	const updateDataAbcAnalysis = async (
		viewType,
		authToken,
		days,
		activeBrand
	) => {
    try {
      setLoading(true);
			let data = null;
			if (user.subscription_status === null) {
				data = await mockGetAbcData(viewType, days);
			} else {
				data = await ServiceFunctions.getAbcData(
					viewType,
					authToken,
					days,
					activeBrand,
					filters,
					page,
					sorting.direction
				);
			}

			setIsNeedCost(data.is_need_cost);

			const result = data.results;

			if (!!result) {
				setDataAbcAnalysis(data);
			} else {
				setDataAbcAnalysis([]);
			}
		} catch (e) {
			console.error(e);
			setDataAbcAnalysis([]);
		} finally {
			setLoading(false);
		}
	};

	const tableData = useMemo(() => {
		if (!dataAbcAnalysis && !dataAbcAnalysis?.results) {
			return [];
		}
		return dataAbcAnalysis.results.map((el, i) => ({
			key: i,
			...el,
		}));
	}, [dataAbcAnalysis]);

	const columnsList = useMemo(() => {
		const amountTitle = {
			profit: 'Прибыль',
			proceeds: 'Выручка',
		};
		const amountPercentTitle = {
			profit: 'Доля прибыли',
			proceeds: 'Доля выручки',
		};
		return COLUMNS.map((el) => {
			if (el.key === 'amount') {
				el.title = amountTitle[viewType];
			}
			if (el.key === 'amount_percent') {
				el.title = amountPercentTitle[viewType];
			}
			// отчистка предыдущей сортировки
			if (el.sorter) {
				el.defaultSortOrder = null;
			}
			// отображение текущей сортировки
			if (sorting.key && el.dataIndex === sorting.key) {
				el.defaultSortOrder = sorting.direction;
			}
			return el;
		});
	}, [dataAbcAnalysis]);

	// 2.1 Получаем данные по выбранному магазину и проверяем себестоимость

	useEffect(() => {
		setPrimaryCollect(activeBrand?.is_primary_collect);
		if (activeBrand?.is_primary_collect && viewType && days && authToken) {
			updateDataAbcAnalysis(
				viewType,
				authToken,
				days,
				activeBrand.id.toString()
			);
			return
		} else {
			shops.length > 0 && setLoading(false);
		}
	}, [activeBrand, viewType, days, filters, page, sorting]);

	useEffect(() => {
		setPage(1)
	}, [filters])

	//---------------------------------------------------------------------------------------//

	// 2.1.1 Проверям изменился ли магазин при обновлении токена

	useEffect(() => {
		if (
			activeBrand &&
			activeBrand.is_primary_collect &&
			activeBrand.is_primary_collect !== primaryCollect
		) {
			setPrimaryCollect(activeBrand.is_primary_collect);
			updateDataAbcAnalysis(
				viewType,
				authToken,
				days,
				activeBrand.id.toString()
			);
		}
	}, [authToken]);

	const handleUpdateAbcAnalysis = () => {
		setTimeout(() => {
			updateAbcAnalysisCaller();
		}, 3000);
	};

	const updateAbcAnalysisCaller = async () => {
		if (activeBrand !== undefined) {
			updateDataAbcAnalysis(viewType, days, activeBrand, authToken);
		}
	};

	useEffect(() => {
		const calculateNextEvenHourPlus30 = () => {
			const now = new Date();
			let targetTime = new Date(now);

			// Set to the next half hour
			targetTime.setMinutes(
				targetTime.getMinutes() <= 30 ? 30 : 60,
				0,
				0
			);

			// If we're already past an even hour + 30 minutes, move to the next even hour
			if (
				targetTime.getHours() % 2 !== 0 ||
				(targetTime.getHours() % 2 === 0 && targetTime <= now)
			) {
				targetTime.setHours(targetTime.getHours() + 1);
			}

			// Ensure we're on an even hour
			if (targetTime.getHours() % 2 !== 0) {
				targetTime.setHours(targetTime.getHours() + 1);
			}

			return targetTime;
		};

		const targetTime = calculateNextEvenHourPlus30();
		const timeToTarget = targetTime.getTime() - Date.now();

		const intervalId = setTimeout(() => {
			updateDataAbcAnalysis(viewType, authToken, days, activeBrand);
		}, timeToTarget);

		return () => {
			clearTimeout(intervalId);
		};
	}, [dispatch, viewType, authToken, days, activeBrand]);

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

	if (user?.subscription_status === 'expired') {
		return <NoSubscriptionPage title={'ABC-анализ'} />;
	}

	const viewTypeHandler = (view) => {
		setViewType(view);
		setPage(1)
	}

	const tableChangeHandler = (pagination, filters, sorter, extra) => {
		if (extra.action === 'sort'){
			setSorting({ key: sorter.field, direction: sorter.order || 'desc' });
			setPage(1)
		}
		if (extra.action === 'paginate'){
			setPage(pagination.current)
		}
	}

	return (
		// isVisible && (
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
					<Header title="ABC-анализ" />
				</div>
				{/* !header */}
				<div>
					<Filters setLoading={setLoading} isDataLoading={loading} />
				</div>

				{/* SELF-COST WARNING */}
				{!loading && shops && shopStatus?.is_primary_collect && !shopStatus.is_self_cost_set && (
						<SelfCostWarningBlock
							shopId={activeBrand.id}
							onUpdateDashboard={handleUpdateAbcAnalysis} //
						/>
				)}

				{!loading && shops && !shopStatus?.is_primary_collect && (
						<DataCollectWarningBlock
								title='Ваши данные еще формируются и обрабатываются.'
						/>
				)}
				
				<div className={styles.wrapper} ref={tableContainerRef}>
					{loading && (
						<div className={styles.loading}>
							<span className="loader"></span>
						</div>
					)}
					{!loading && shops && shopStatus?.is_primary_collect && (
						<div className={styles.container}>
							<ConfigProvider
								locale={ruRU}
								renderEmpty={() => <div>Нет данных</div>}
								theme={{
									token: {
										colorPrimary: '#5329FF',
										colorText: '#5329FF',
										colorBgTextHover: '#5329FF0D',
									},
									components: {
										Table: {
											headerColor: '#8c8c8c',
											headerBg: '#f7f6fe',
											headerBorderRadius: 20,
											selectionColumnWidth: 32,
											cellFontSize: 16,
											borderColor: '#e8e8e8',
											cellPaddingInline: 16,
											cellPaddingBlock: 17,
											bodySortBg: '#f7f6fe',
											headerSortActiveBg: '#e7e1fe',
											headerSortHoverBg: '#e7e1fe',
											rowSelectedBg: '#f7f6fe',
											rowSelectedHoverBg: '#e7e1fe',
											colorText: '#1A1A1A',
											lineHeight: 1.2,
											fontWeightStrong: 500,
										},
										Checkbox: {
											colorBorder: '#ccc',
											colorPrimary: '#5329ff',
											colorPrimaryBorder: '#5329ff',
											colorPrimaryHover: '#5329ff',
										},
										Pagination: {
											itemActiveBg: '#EEEAFF',
											itemBg: '#F7F7F7',
											itemColor: '#8C8C8C',
										},
										Button: {
											paddingBlockLG: 10,
											paddingInlineLG: 20,
											controlHeightLG: 45,
											defaultShadow: false,
											defaultColor: 'grey',
											contentFontSize: 16,
											defaultBorderColor: 'transparent'
										}
									},
								}}
							>
							
							{!loading && (<div className="abcAnalysis">
								<Flex gap={12} className={styles.view} align='center'>
									<span>Выбрать вид:</span>
									<Button
										type={viewType == 'proceeds' ? 'primary' : 'default'}
										size="large"
										onClick={() => viewTypeHandler('proceeds')}
									>
										По выручке
									</Button>
									<Button
										type={viewType == 'profit' ? 'primary' : 'default'}
										size="large"
										onClick={() => viewTypeHandler('profit')}
									>
										По прибыли
									</Button>
								</Flex>

										<div className={styles.tableContainer}>
											<Table
												columns={columnsList}
												dataSource={tableData}
												scroll={tableScroll}
												sticky={true}
												showSorterTooltip={false}
												onChange={tableChangeHandler}
												pagination={{
													locale: {
														items_per_page: 'записей на странице',
														jump_to: 'Перейти',
														jump_to_confirm: 'подтвердить',
														page: 'Страница',
														prev_page: 'Предыдущая страница',
														next_page: 'Следующая страница',
														prev_5: 'Предыдущие 5 страниц',
														next_5: 'Следующие 5 страниц',
														prev_3: 'Предыдущие 3 страниц',
														next_3: 'Следующие 3 страниц',
													},
													position: ['bottomLeft'],
													defaultCurrent: 1,
													defaultPageSize: dataAbcAnalysis?.per_page,
													hideOnSinglePage: true,
													showSizeChanger: false,
													current: page,
													total: dataAbcAnalysis?.total,
												}}
												sortDirections={['asc', 'desc']}
											/>
										</div>
							</div>
							)}
							</ConfigProvider>
						</div>
					)}
				</div>
			</section>
			{/* ---------------------- */}
		</main>
	);
};

export default AbcAnalysisPage;
