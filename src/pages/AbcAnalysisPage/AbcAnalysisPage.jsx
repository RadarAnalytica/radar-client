import { useContext, useState, useEffect, useMemo, useRef } from 'react';
import styles from './AbcAnalysisPage.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import NoSubscriptionPage from '../NoSubscriptionPage';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { ConfigProvider, Table, Button, Flex } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { COLUMNS } from './widgets/table/config';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';

const AbcAnalysisPage = () => {
	const filters = useAppSelector(state => state.filters);
	const { activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup, shops } = filters;
	const { user, authToken } = useContext(AuthContext);
  	const { isDemoMode } = useDemoMode();
	const dispatch = useAppDispatch();
	const [dataAbcAnalysis, setDataAbcAnalysis] = useState(null);
	const [isNeedCost, setIsNeedCost] = useState([]);
	const [viewType, setViewType] = useState('proceeds');
	const [sorting, setSorting] = useState({ key: null, direction: 'desc' });
	const [loading, setLoading] = useState(true);
	const progress = useLoadingProgress({ loading });
	const [primaryCollect, setPrimaryCollect] = useState(null);
	const [shopStatus, setShopStatus] = useState(null);

	const [page, setPage] = useState(1);
	const tableContainerRef = useRef(null);
	const tableScroll = useMemo(() => {
		if (!tableContainerRef.current){
			return ({ x: '100%', y: 400 });
		}
		const container = tableContainerRef.current;
		const {height} = container.getBoundingClientRect();
		// расчет высоты относительно контента, высоты фильтров и отступов
		const availableHeight = height - 230 > 350 ? height - 230 : 400;
		return ({ x: '100%', y: availableHeight });
	}, [dataAbcAnalysis]);

	const updateDataAbcAnalysis = async (
		viewType,
		authToken,
		selectedRange,
		activeBrand
	) => {
		setLoading(true);
		progress.start();

    	try {
			const data = await ServiceFunctions.getAbcData(
				viewType,
				authToken,
				selectedRange,
				activeBrand,
				filters,
				page,
				sorting.direction
			);

			progress.complete();
			await setTimeout(() => {
				setIsNeedCost(data.is_need_cost);
				setDataAbcAnalysis(data?.results ? data : []);
				setLoading(false);
			}, 500);
		} catch (e) {
			console.error(e);
			setDataAbcAnalysis([]);
			progress.reset();
			setLoading(false);
		}
	};

	const tableData = useMemo(() => {
		return dataAbcAnalysis?.results?.length > 0 ? dataAbcAnalysis.results.map((el, i) => ({
			key: i,
			...el,
		})) : [];
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
		if (activeBrand) {
			setPrimaryCollect(activeBrand?.is_primary_collect);

			if (activeBrand?.is_primary_collect && viewType && isFiltersLoaded) {
				updateDataAbcAnalysis(
					viewType,
					authToken,
					selectedRange,
					activeBrand.id.toString()
				);
			} else {
				setLoading(false);
			}
		}
	}, [viewType, page, sorting, activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup]);

	useEffect(() => {
		setPage(1);
	}, [activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup]);


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
	}, [shops, filters]);

	if (user?.subscription_status === 'expired') {
		return <NoSubscriptionPage title={'ABC-анализ'} />;
	}

	const viewTypeHandler = (view) => {
		setViewType(view);
		setPage(1);
	};

	const tableChangeHandler = (pagination, filters, sorter, extra) => {
		if (extra.action === 'sort'){
			setSorting({ key: sorter.field, direction: sorter.order || 'desc' });
			setPage(1);
		}
		if (extra.action === 'paginate'){
			setPage(pagination.current);
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
					<Header title="ABC-анализ" />
				</div>

        		{isDemoMode && <NoSubscriptionWarningBlock />}

				{!loading && shops && activeBrand?.is_primary_collect && !activeBrand.is_self_cost_set && (
					<SelfCostWarningBlock shopId={activeBrand.id} />
				)}

				<div className="pt-1">
					<Filters setLoading={setLoading} isDataLoading={loading} />
				</div>

				{activeBrand && !activeBrand?.is_primary_collect && 
					<DataCollectWarningBlock />
				}

				<div className={styles.wrapper} ref={tableContainerRef}>
					<Loader loading={loading} progress={progress.value} />

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
