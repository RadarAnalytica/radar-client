import { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import styles from './AbcAnalysisPage.module.css';
import SideNav from '../../components/SideNav';
import TopNav from '../../components/TopNav';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AuthContext from '../../service/AuthContext';
import NoSubscriptionPage from '../NoSubscriptionPage';
import { ServiceFunctions } from '../../service/serviceFunctions';
import TableAbcData from './widgets/table/TableAbcData';
import SelfCostWarning from '../../components/SelfCostWarning';
import DataCollectionNotification from '../../components/DataCollectionNotification';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Header from '../../components/sharedComponents/header/header';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import { mockGetAbcData } from '../../service/mockServiceFunctions';
import NoSubscriptionWarningBlock from '../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import SelfCostWarningBlock from '../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import { ConfigProvider, Table } from 'antd';
import { COLUMNS } from './widgets/table/config';
import "../../App.css";

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
	const [sorting, setSorting] = useState('asc');
	const [loading, setLoading] = useState(true);
	const [primaryCollect, setPrimaryCollect] = useState(null);
	const [shopStatus, setShopStatus] = useState(null);

	const [page, setPage] = useState(1);

	// console.log('---------- base ----------')
	// console.log(loading)
	// console.log(dataAbcAnalysis)
	// console.log(activeBrand)
	// console.log(viewType)
	// console.log('--------------------------')

	const sorterHandler = useCallback((a, b, direction) => {
		setSorting(direction);
		setPage(1);
	}, []);

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
					sorting
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
      proceeds: 'Выручка'
    }
		const amountPercentTitle = {
			profit: 'Доля выручки',
      proceeds: 'Доля прибыли'
		}
    return COLUMNS.map((el) => {
      if (el.key === 'amount'){
        el.title = amountTitle[viewType]
      }
			if (el.key === 'amount_percent'){
				el.title = amountPercentTitle[viewType]
			}
			if (el.sorter) {
				el.sorter = sorterHandler
			}
      return el
    })
  }, [dataAbcAnalysis])

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
		}
	}, [activeBrand, viewType, days, filters, page, sorting]);
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

	//for SelfCostWarning
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

				{/* DEMO BLOCK */}
				{user.subscription_status === null && (
					<NoSubscriptionWarningBlock />
				)}
				{/* SELF-COST WARNING */}
				{shopStatus && !shopStatus.is_self_cost_set && !loading && (
					<div>
						<SelfCostWarningBlock
							shopId={activeBrand.id}
							onUpdateDashboard={handleUpdateAbcAnalysis} //
						/>
					</div>
				)}

				<div styles=''>
					<Filters setLoading={setLoading} />
				</div>
        {loading && (
          <div className={styles.loading}>
            <span className='loader'></span>
          </div>
        )}
				{!loading && (<div className={styles.container}>
          <div className='abcAnalysis'>
					<div className="filter abc-filter-container dash-container d-flex" style={{position: 'static', marginBottom: 20, padding: 0, }}>
						<div className="filter-btn-p">Выбрать вид: </div>
						<div
							className={`filter-btn ${
								viewType === 'proceeds' ? 'active' : ''
							}`}
							onClick={() => viewTypeHandler('proceeds')}
						>
							По выручке
						</div>
						<div
							className={`filter-btn ${
								viewType === 'profit' ? 'active' : ''
							}`}
							onClick={() => viewTypeHandler('profit')}
						>
							По прибыли
						</div>
					</div>
          {shopStatus && !shopStatus.is_primary_collect && (
							<DataCollectionNotification
								title={
									'Ваши данные еще формируются и обрабатываются.'
								}
							/>
					)}
					{shopStatus && shopStatus.is_primary_collect && (
						<ConfigProvider
							renderEmpty={() => <div>Нет данных</div>}
							theme={{
								token: {
									colorPrimary: '#5329FF',
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
								},
							}}
						>
							<Table
								columns={columnsList}
								// columns={COLUMNS}
								dataSource={tableData}
								scroll={{ y: 600 }}
								sticky={true}
								showSorterTooltip={false}
								sortOrder={sorting}
								pagination={{
									align: 'end',
									defaultCurrent: 1,
									defaultPageSize: 100,
									hideOnSinglePage: true,
									showSizeChanger: false,
									onChange: setPage,
									current: page,
									total: dataAbcAnalysis?.total,
								}}
								sortDirections={['asc', 'desc']}
							/>
						</ConfigProvider>
					)}
				</div>
        </div>)}
			</section>
			{/* ---------------------- */}
		</main>
	);
};

export default AbcAnalysisPage;
