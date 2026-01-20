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
import { ConfigProvider, Flex } from 'antd';
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
import { getWordDeclension } from '@/service/utils';
import TableSettingsModal from '@/components/TableSettingsModal';
import TableSettingsButton from '@/components/TableSettingsButton';

const ABC_CONFIG_STORAGE_KEY_PREFIX = 'abcAnalysisTableConfig_';

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
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	// Получаем текущую конфигурацию для активного viewType
	const tableConfig = useMemo(() => tableConfigs[viewType] || getAbcAnalysisTableConfig(viewType), [tableConfigs, viewType]);

	// Load saved configs from localStorage on mount
	useEffect(() => {
		['proceeds', 'profit'].forEach(type => {
			const storageKey = `${ABC_CONFIG_STORAGE_KEY_PREFIX}${type}`;
			const savedConfigData = localStorage.getItem(storageKey);
			if (savedConfigData) {
				try {
					const parsed = JSON.parse(savedConfigData);
					if (parsed.version === ABC_ANALYSIS_TABLE_CONFIG_VER) {
						setTableConfigs(prev => ({
							...prev,
							[type]: parsed.config
						}));
					}
				} catch (error) {
					console.error('Error parsing saved table config:', error);
				}
			}
		});
	}, []);

	// Get original config to determine which columns should be available for current viewType
	const originalConfig = useMemo(() => getAbcAnalysisTableConfig(viewType), [viewType]);

	// Get keys of columns that are hidden by default in original config (not available for this viewType)
	const hiddenByDefaultKeys = useMemo(() => {
		return new Set(originalConfig.filter(col => col.hidden).map(col => col.key || col.dataIndex));
	}, [originalConfig]);

	// Prepare columns for settings modal - exclude columns hidden by default in original config
	const columnsForSettings = useMemo(() => {
		return tableConfig
			.filter(col => !hiddenByDefaultKeys.has(col.key || col.dataIndex))
			.map((col) => ({
				...col,
				id: col.key || col.dataIndex,
				title: col.title,
				isVisible: !col.hidden,
			}));
	}, [tableConfig, hiddenByDefaultKeys]);

	const originalColumnsForSettings = useMemo(() => {
		return originalConfig
			.filter(col => !col.hidden)
			.map((col) => ({
				...col,
				id: col.key || col.dataIndex,
				title: col.title,
				isVisible: true,
			}));
	}, [originalConfig]);

	const handleSettingsSave = (updatedColumns) => {
		// Get the columns that are hidden by default (not shown in settings)
		const hiddenByDefaultColumns = tableConfig.filter(col => 
			hiddenByDefaultKeys.has(col.key || col.dataIndex)
		);
		
		// Transform updated columns back to table config format
		const updatedVisibleColumns = updatedColumns.map((col) => ({
			...col,
			hidden: !col.isVisible,
		}));
		
		// Reorder based on updatedColumns order, keeping hidden-by-default columns at the end
		const reorderedConfig = [
			...updatedVisibleColumns,
			...hiddenByDefaultColumns
		];
		
		// Update current viewType config
		setTableConfigs(prev => ({
			...prev,
			[viewType]: reorderedConfig
		}));
		
		// Save to localStorage
		const storageKey = `${ABC_CONFIG_STORAGE_KEY_PREFIX}${viewType}`;
		localStorage.setItem(storageKey, JSON.stringify({
			version: ABC_ANALYSIS_TABLE_CONFIG_VER,
			config: reorderedConfig
		}));
	};

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
				sorting
			);

			progress.complete();
			await setTimeout(() => {
				setIsNeedCost(data.is_need_cost);
				setDataAbcAnalysis(data?.results ? data : []);
				setPaginationState(prev => ({ ...prev, total: data?.total ? Math.ceil(data.total / data.per_page) : 0 }));
				setLoading(false);
				progress.reset();
			}, 500);
		} catch (e) {
			console.error(e);
			setDataAbcAnalysis([]);
			progress.reset();
			setLoading(false);
		}
	};

	const tableData = useMemo(() => {
		if (dataAbcAnalysis?.results?.length > 0 ) {
			const data = dataAbcAnalysis.results.map((item) => {
				const sizesLength = item?.sizes?.length ?? 0;
				const showSizes = sizesLength > 1;

				if (sizesLength === 1) {
					item.article_data.tech_size = item.sizes[0].size;
				}

				return {
					article: item.article,
					...item.article_data,
					tech_size: showSizes ? `${sizesLength} ${getWordDeclension('размер', sizesLength )}` : item.article_data?.tech_size,
					expandedKey: `${item.article_data?.wb_id}_${sizesLength}`,
                    isParent: showSizes,
                    children: showSizes ? item.sizes?.map(child => ({
                        size: child.size,
						...child.size_data,
                    })) : null,
				};
			});
			return data;
		}
		return [];
	}, [dataAbcAnalysis]);

	useEffect(() => {
		const logData = {
			timestamp: new Date().toISOString(),
			viewType,
			paginationCurrent: paginationState.current,
			sorting: JSON.stringify(sorting),
			isFiltersLoaded,
			activeBrand: activeBrand ? { id: activeBrand.id, name: activeBrand.brand_name } : null,
			activeBrandName: JSON.stringify(activeBrandName),
			activeArticle: JSON.stringify(activeArticle),
			activeGroup: JSON.stringify(activeGroup),
			selectedRange: JSON.stringify(selectedRange),
		};
		
		console.log('🔍 [AbcAnalysis] useEffect triggered:', logData);
		console.trace('📍 Call stack:');

		if (activeBrand) {
			if (activeBrand?.is_primary_collect && viewType && isFiltersLoaded) {
				console.log('✅ [AbcAnalysis] Calling updateDataAbcAnalysis');
				updateDataAbcAnalysis(
					viewType,
					authToken,
					selectedRange,
					activeBrand.id.toString()
				);
			} else {
				console.log('⏸️ [AbcAnalysis] Skipping update:', {
					is_primary_collect: activeBrand?.is_primary_collect,
					viewType,
					isFiltersLoaded
				});
				setLoading(false);
			}
		}
	}, [viewType, paginationState.current, sorting, isFiltersLoaded, activeBrand, activeBrandName, activeArticle, activeGroup, selectedRange]);

	useEffect(() => {
		console.log('🔄 [AbcAnalysis] Pagination reset useEffect triggered:', {
			activeBrand: activeBrand?.id,
			selectedRange: JSON.stringify(selectedRange),
			isFiltersLoaded,
			activeBrandName: JSON.stringify(activeBrandName),
			activeArticle: JSON.stringify(activeArticle),
			activeGroup: JSON.stringify(activeGroup),
		});
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
		// TODO: Убрать, когда будет фикс radar-table: клик по !sortable заголовку - срабатывает сортировка
		if (['item', 'supplier_id', 'tech_size', 'wb_id'].includes(sort_field)) return;

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
			const paddingLeft = record.isParent === false ? '30px' : !record.children?.length ? '36px' : '0px';
			return (
				<div className={styles.productNameCell} style={{ paddingLeft }}>
					<div className={styles.productNameCellImg}>
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
					<div title={record.title}>
						{record.title}
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
					<Filters setLoading={setLoading} isDataLoading={loading} hasShopCreationLimit />
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
								<Flex gap={12} className={styles.view} align='center' justify='space-between'>
									<Flex gap={12} align='center'>
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
									<TableSettingsButton
										className={styles.settingsButton}
										onClick={() => setIsSettingsOpen(true)}
										disabled={loading}
									/>
								</Flex>

								<div className={styles.tableContainer}>
									<div className={styles.tableScrollContainer} ref={scrollContainerRef}>
										{tableData && tableData.length > 0 && currentTableConfig && (
											<RadarTable
												rowKey={(record) => record.expandedKey}
												config={currentTableConfig.filter(col => !col.hidden)}
												dataSource={tableData}
												preset='radar-table-simple'
												className='abc-analysis-table'
												stickyHeader
												resizeable
												onResize={onResizeGroup}
												onSort={sortButtonClickHandler}
												treeMode
												expandedRowKeys={expandedRowKeys}
												onExpandedRowsChange={setExpandedRowKeys}
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
};

export default AbcAnalysisPage;
