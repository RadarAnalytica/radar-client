import { useContext, useState, useEffect, useMemo, useRef } from 'react';
import styles from './AbcAnalysisPage.module.css';
import { useAppSelector } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import NoSubscriptionPage from '../NoSubscriptionPage';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { ConfigProvider, Button, Flex } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Table as RadarTable } from 'radar-ui';
import { getAbcAnalysisTableConfig, ABC_ANALYSIS_TABLE_CONFIG_VER } from './widgets/table/radarTableConfig';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';
import { formatPrice } from '@/service/utils';
import { Tooltip } from 'antd';
import { useTableColumnResize } from '@/service/hooks/useTableColumnResize';

const AbcAnalysisPage = () => {
	const filters = useAppSelector(state => state.filters);
	const { activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup, shops } = filters;
	const { user, authToken } = useContext(AuthContext);
  	const { isDemoMode } = useDemoMode();
	const [dataAbcAnalysis, setDataAbcAnalysis] = useState(null);
	const [paginationState, setPaginationState] = useState({ current: 1, total: 1, pageSize: 25 });
	const [isNeedCost, setIsNeedCost] = useState([]);
	const [viewType, setViewType] = useState('proceeds');
	const [sorting, setSorting] = useState({ key: null, direction: 'desc' });
	const [loading, setLoading] = useState(true);
	const progress = useLoadingProgress({ loading });
	const [shopStatus, setShopStatus] = useState(null);
	const tableContainerRef = useRef(null);
	const scrollContainerRef = useRef(null);
	// Храним отдельные конфигурации для каждого viewType
	const [tableConfigs, setTableConfigs] = useState(() => ({
		proceeds: getAbcAnalysisTableConfig('proceeds'),
		profit: getAbcAnalysisTableConfig('profit'),
	}));
	const [sortState, setSortState] = useState({ sort_field: null, sort_order: null });

	// Получаем текущую конфигурацию для активного viewType
	const tableConfig = useMemo(() => tableConfigs[viewType] || getAbcAnalysisTableConfig(viewType), [tableConfigs, viewType]);

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
				paginationState.current,
				sorting.direction.toLowerCase()
			);

			progress.complete();
			await setTimeout(() => {
				setIsNeedCost(data.is_need_cost);
				setDataAbcAnalysis(data?.results ? data : []);
				setPaginationState(prev => ({ ...prev, total: data?.total ? Math.ceil(data.total / data.per_page) : 0 }));
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

	useEffect(() => {
		if (activeBrand) {
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
	}, [viewType, paginationState.current, sorting, activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup, authToken]);

	useEffect(() => {
		setPaginationState({ ...paginationState, current: 1 });
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
		setPaginationState({ ...paginationState, current: 1 });
		setSortState({ sort_field: null, sort_order: null });
	};

	const sortButtonClickHandler = (sort_field, sort_order) => {
		// выключаем сортировку если нажата уже активная клавиша
		if (sortState.sort_field === sort_field && sortState.sort_order === sort_order) {
			setSortState({ sort_field: null, sort_order: null });
			setSorting({ key: null, direction: 'desc' });
			setPaginationState({ ...paginationState, current: 1 });
			return;
		}

		// включаем сортировку
		setSortState({ sort_field, sort_order });
		setSorting({ key: sort_field, direction: sort_order || 'desc' });
		setPaginationState({ ...paginationState, current: 1 });
	};

	const paginationHandler = (page) => {
		setPaginationState({ ...paginationState, current: page });
	};

	// Custom cell render для RadarTable
	const customCellRender = (value, record, index, dataIndex) => {
		if (dataIndex === 'item') {
			return (
				<div
					style={{
						color: '#5329FF',
						display: 'flex',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<div
						style={{
							width: '30px',
							height: '40px',
							borderRadius: '5px',
							backgroundColor: '#D3D3D3',
							flexGrow: 0,
							flexShrink: 0,
						}}
					>
						{record.photo ? (
							<img
								src={record.photo}
								alt={record.title}
								style={{
									width: '100%',
									height: '100%',
									borderRadius: '5px',
									objectFit: 'cover',
								}}
								onError={(e) => {
									e.target.style.backgroundColor = '#D3D3D3';
									e.target.alt = '';
									e.target.src =
										'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
								}}
							/>
						) : null}
					</div>
					<div>
						<Tooltip title={record.title}>{record.title}</Tooltip>
					</div>
				</div>
			);
		}

		if (dataIndex === 'category') {
			let className = styles.category__icon + ' ';
			if (value === 'A') {
				className += styles.category__icon_green;
			}
			if (value === 'B') {
				className += styles.category__icon_yellow;
			}
			if (value === 'C') {
				className += styles.category__icon_red;
			}
			return <span className={className}>{value}</span>;
		}

		// Для числовых значений используем formatPrice
		const columnConfig = tableConfig.find(col => col.dataIndex === dataIndex);
		if (typeof value === 'number' && columnConfig?.units) {
			return formatPrice(value, columnConfig.units);
		}

		// Для остальных значений просто показываем с тултипом
		return <Tooltip title={value}>{value}</Tooltip>;
	};

	// Используем хук для управления изменением размеров колонок
    const { config: currentTableConfig, onResize: onResizeGroup } = useTableColumnResize(
        tableConfig, 
        `abcAnalysisTableConfig_${viewType}`,
        0,
        400,
        ABC_ANALYSIS_TABLE_CONFIG_VER
    );

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
								theme={{
									token: {
										colorPrimary: '#5329FF',
										colorText: '#5329FF',
										colorBgTextHover: '#5329FF0D',
									},
									components: {
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
									<button
										className={`${styles.viewButton} ${viewType == 'proceeds' ? styles.viewButtonActive : ''}`}
										onClick={() => viewTypeHandler('proceeds')}
									>
										По выручке
									</button>
									<button
										className={`${styles.viewButton} ${viewType == 'profit' ? styles.viewButtonActive : ''}`}
										onClick={() => viewTypeHandler('profit')}
									>
										По прибыли
									</button>
								</Flex>

								<div className={styles.tableContainer}>
									<div className={styles.tableScrollContainer} ref={scrollContainerRef}>
										{tableData && tableData.length > 0 && currentTableConfig && (
											<RadarTable
												config={currentTableConfig}
												dataSource={tableData}
												preset='radar-table-simple'
												className='abc-analysis-table'
												stickyHeader
												// resizeable
												onResize={onResizeGroup}
												onSort={sortButtonClickHandler}
												pagination={{
													current: paginationState.current,
													pageSize: paginationState.pageSize,
													total: paginationState.total,
													onChange: (page) => {
														paginationHandler(page);
													},
													showQuickJumper: true,
													hideOnSinglePage: true,
												}}
												paginationContainerStyle={{
													bottom: 0
												}}
												sorting={{ sort_field: sortState?.sort_field, sort_order: sortState?.sort_order }}
												scrollContainerRef={scrollContainerRef}
												customCellRender={{
													idx: ['item', 'category', 'amount', 'amount_percent', 'marginality', 'roi', 'gmroi', 'logistics'],
													renderer: customCellRender,
												}}
												headerCellWrapperStyle={{
													fontSize: 'inherit',
													padding: '12px 25px 12px 10px'
												}}
												bodyCellWrapperStyle={{
													padding: '5px 10px',
													border: 'none',
												}}
												headerCellClassName={styles.customHeaderCell}
												bodyCellStyle={{
													borderBottom: '1px solid #E8E8E8',
													height: '50px',
												}}
												style={{
													tableLayout: 'fixed',
													minWidth: '100%',
													width: 'max-content',
												}}
											/>
										)}
									</div>
								</div>
							</div>
							)}
							</ConfigProvider>
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default AbcAnalysisPage;
