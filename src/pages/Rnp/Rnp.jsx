import React, { useLayoutEffect, useMemo, useRef } from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import { ConfigProvider, Flex, Button } from 'antd';
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/entry-point/element';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { NoDataWidget } from '../productsGroupsPages/widgets';
import AddRnpModal from './widget/AddRnpModal/AddRnpModal';
import styles from './Rnp.module.css';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { RnpFilters } from './widget/RnpFilters/RnpFilters';
import { COLUMNS, ROWS, renderFunction, getTableConfig, getTableData } from './config';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import RnpList from './widget/RnpList/RnpList';
import ModalDeleteConfirm from '../../components/sharedComponents/ModalDeleteConfirm/ModalDeleteConfirm';
import DataCollectWarningBlock from '../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import SelfCostWarningBlock from '../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { fetchRnpFilters } from '../../redux/filtersRnp/filterRnpActions';
import { actions as filterActions } from '../../redux/filtersRnp/filtersRnpSlice';
import { actions as filtersActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import HowToLink from '../../components/sharedComponents/howToLink/howToLink';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import Loader from '@/components/ui/Loader';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import FilterLoader from '@/components/ui/FilterLoader';

const sortBySavedSortState = (data, activeBrand) => {
	const { id } = activeBrand;
	let savedSortState = localStorage.getItem(`RNP_SAVED_ORDER_${id}`);
	if (!savedSortState) {
		return data;
	}
	savedSortState = JSON.parse(savedSortState);
	
	// Создаем Map для быстрого поиска элементов по wb_id
	const itemsMap = new Map();
	data.forEach(item => {
		itemsMap.set(item.article_data.wb_id, item);
	});
	
	// Сортируем элементы, которые есть в savedSortState, в порядке savedSortState
	const sortedItems = savedSortState
		.map(wbId => itemsMap.get(wbId))
		.filter(Boolean); // Убираем undefined (элементы, которых уже нет в data)
	
	// Добавляем новые элементы, которых не было в savedSortState, в конец
	data.forEach(item => {
		if (!savedSortState.includes(item.article_data.wb_id)) {
			sortedItems.push(item);
		}
	});
	
	return sortedItems;
}

export default function Rnp() {
	const { user, authToken } = useContext(AuthContext);
	const { isDemoMode } = useDemoMode();
	const dispatch = useAppDispatch();
	const { selectedRange, activeBrand, shops, activeBrandName } = useAppSelector((state) => state.filters);
	const filters = useAppSelector((state) => state.filters);
	const initLoad = useRef(true);
	const pageContentRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const progress = useLoadingProgress({ loading });
	const [addRnpModalShow, setAddRnpModalShow] = useState(false);
	const [page, setPage] = useState(1);
	const [view, setView] = useState('articles');
	const [rnpDataByArticle, setRnpDataByArticle] = useState(null);
	const [rnpDataTotal, setRnpDataTotal] = useState(null);
	const [deleteRnpId, setDeleteRnpId] = useState(null);
	const [error, setError] = useState(null);
	const [expanded, setExpanded] = useState('collapsed');

	const updateRnpListByArticle = async (signal) => {
		setLoading(true);
		progress.start();
		try {
			if (activeBrand) {
				const response = await ServiceFunctions.postRnpByArticle(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					signal
				);

				progress.complete();
				await setTimeout(() => {
					dataToRnpList(response);
					setLoading(false);
					progress.reset();
				}, 500);
			}
		} catch (error) {
			console.error('UpdateRnpListByArticle error', error);
			progress.reset();
			setLoading(false);
		}
	};

	const updateRnpListSummary = async (signal) => {
		setLoading(true);
		progress.start();
		try {
			if (activeBrand) {
				const response = await ServiceFunctions.postRnpSummary(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					signal
				);

				progress.complete();
				await setTimeout(() => {
					dataToRnpTotalList(response);
					setLoading(false);
					progress.reset();
				}, 500);
			}
		} catch (error) {
			console.error('updateRnpListSummary error', error);
			setRnpDataTotal(null);
			progress.reset();
			setLoading(false);
		}
	};

	const deleteRnp = async (id) => {
		setDeleteRnpId(null);
		setLoading(true);
		try {
			if (activeBrand) {
				const response = await ServiceFunctions.deleteRnpId(
					authToken,
					id
				);
			}
		} catch (error) {
			console.error('deleteRnp error', error);
		} finally {
			setPage(1);
			updateRnpListByArticle();
		}
	};

	const dataToRnpList = (response) => {
		const { data } = response;
		const list = response.data.map((article, i) => {
			const tableConfig = getTableConfig(article);
			const tableData = getTableData(article);
			const item = {
				table: {
					columns_new: tableConfig,
					datasource: tableData,
					columns: [],
					rows: [],
				},
				article_data: article?.article_data,
			};

			return item;
		});

		// Применяем сортировку согласно сохраненному порядку
		const sortedList = activeBrand ? sortBySavedSortState(list, activeBrand) : list;
		setRnpDataByArticle(sortedList);
	};

	const dataToRnpTotalList = (response) => {
		const article = response.data;
		if (article.length === 0) {
			setRnpDataTotal(null);
			return;
		}
		const tableConfig = getTableConfig(article);
		const tableData = getTableData(article);
		const item = {
			table: {
				columns_new: tableConfig,
				datasource: tableData,
				columns: [],
				rows: [],
			},
			article_data: article?.article_data,
		};

		setRnpDataTotal(item);
	};

	const deleteHandler = (value) => {
		deleteRnp(value);
	};

	const addRnpList = async (porductIds) => {
		setLoading(true);
		try {
			if (activeBrand) {
				const response = await ServiceFunctions.postUpdateRnpProducts(
					authToken,
					porductIds
				);
				if (response.detail) {
					setError(response.detail);
					return;
				}
			}
		} catch (error) {
			console.error('addRnpList error', error);
		} finally {
			setPage(1);
			updateRnpListByArticle();
		}
	};

	const viewHandler = (value) => {
		if (view !== value) {
			setView(value);
			setLoading(true);
		}
	};

	useLayoutEffect(() => {
		const controller = new AbortController();

		if (activeBrand?.is_primary_collect) {
			if (view === 'articles') {
				updateRnpListByArticle(controller.signal);
			} else {
				updateRnpListSummary(controller.signal);
			}
		} else {
			setLoading(false);
		}

		return () => {
			controller.abort();
		};
	}, [filters, page, view, selectedRange]);

	// Добавляем автоскролл к контейнеру страницы
	useEffect(() => {
		if (!pageContentRef.current) return;

		const element = pageContentRef.current;
		return autoScrollForElements({ element });
	}, []);

	useEffect(() => {
		if (selectedRange) {
			const today = format(new Date(), 'yyyy-MM-dd');
			if (selectedRange.to === today || selectedRange.from === today) {	
				const defaultPeriod = { period: 7 };
				dispatch(filtersActions.setPeriod(defaultPeriod));
				localStorage.setItem('selectedRange', JSON.stringify(defaultPeriod));
			}
		}

		return () => {
			localStorage.removeItem('RNP_EXPANDED_TABLE_ROWS_STATE');
			localStorage.removeItem('RNP_EXPANDED_TOTAL_TABLE_ROWS_STATE');
			localStorage.removeItem('RNP_EXPANDED_STATE');
			shops?.forEach((shop) => {
				localStorage.removeItem(`RNP_SAVED_ORDER_${shop.id}`);
			});
		};
	}, []);


	useEffect(() => {
		if (rnpDataByArticle) {
			let EXPANDED_STATE = JSON.parse(localStorage.getItem('RNP_EXPANDED_STATE'));
			if (EXPANDED_STATE && EXPANDED_STATE !== 'collapsed' && rnpDataByArticle?.length > 0) {
				const isInCurrentList = rnpDataByArticle.some((el) => el?.article_data?.wb_id === EXPANDED_STATE);
				let updatedExpandedState;
				if (!isInCurrentList) {
					EXPANDED_STATE = rnpDataByArticle[0]?.article_data?.wb_id;
				}
				setExpanded(EXPANDED_STATE);
				return;
			}

			if (!EXPANDED_STATE) {
				setExpanded(rnpDataByArticle[0]?.article_data?.wb_id);
			}
		}
	}, [rnpDataByArticle]);

	const addRnpHandler = (list) => {
		setAddRnpModalShow(false);
		addRnpList(list);
	};


	return (
		<main className={styles.page}>
			<MobilePlug />
			<FilterLoader hide={loading} />

			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>

			<section ref={pageContentRef} className={styles.page__content}>
				<div className={styles.page__headerWrapper}>
					<Header 
						title="Рука на пульсе (РНП)"
						howToLink="https://radar.usedocs.com/article/79433"
						howToLinkText="Как проверить данные?"
					/>
				</div>

				{isDemoMode && <NoSubscriptionWarningBlock />}

				{!loading && activeBrand?.is_primary_collect && !activeBrand?.is_self_cost_set && (
					<SelfCostWarningBlock
						shopId={activeBrand.id}
					/>
				)}

				{!loading && ((rnpDataByArticle?.length > 0 && view === 'articles') || (view === 'total' && rnpDataTotal)) && (<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#EEEAFF',
							colorTextLightSolid: '#1a1a1a',
							fontSize: 16,
							borderRadius: 8,
						},
						components: {
							Button: {
								paddingInlineLG: 12,
								controlHeightLG: 38,
								defaultShadow: false,
								contentFontSize: 16,
								fontWeight: 500,
								defaultBorderColor: 'transparent',
								defaultColor: 'rgba(26, 26, 26, 0.5)',
								defaultBg: 'transparent',
								defaultHoverBg: '#EEEAFF',
								defaultHoverColor: '#1a1a1a',
								defaultHoverBorderColor: 'transparent',
								defaultActiveColor: 'rgba(26, 26, 26, 1)',
								defaultActiveBg: '#EEEAFF',
								defaultActiveBorderColor: '#EEEAFF',
							},
						},
					}}
				>
					<Flex justify="space-between">
						<Flex gap={4} align="center">
							<button
								className={view === 'articles' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
								onClick={() => {
									viewHandler('articles');
								}}
								style={{ fontWeight: 500, fontSize: 14 }}
							>
								По артикулам
							</button>
							<button
								className={view === 'total' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
								onClick={() => {
									viewHandler('total');
								}}
								style={{ fontWeight: 500, fontSize: 14 }}
							>
								Сводный
							</button>
						</Flex>
						<ConfigProvider
							theme={{
								token: {
									colorPrimary: '#5329ff',
									colorText: '#fff',
								},
								components: {
									Button: {
										primaryColor: '#fff',
										paddingInlineLG: 16,
										contentFontSizeLG: 16
									},
								},
							}}
						>
							<Button
								type="primary"
								size="large"
								onClick={setAddRnpModalShow}
								style={{ fontWeight: 600, fontSize: 14 }}
							>
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9 1V9M9 17V9M9 9H1H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>

								Добавить артикул
							</Button>
						</ConfigProvider>
					</Flex>
				</ConfigProvider>)}

				<div className={styles.page__filtersWrapper}>
					<Filters
						isDataLoading={loading}
						articleSelect={false}
						groupSelect={false}
						categorySelect={false}
						maxCustomDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
					/>
				</div>

				{!loading && activeBrand && !activeBrand?.is_primary_collect && (
					<>
						<DataCollectWarningBlock
							title='Ваши данные еще формируются и обрабатываются.'
						/>
					</>
				)}

				{loading && 
					<div className={styles.loader__container}>
						<Loader loading={loading} progress={progress.value} />
					</div>
				}

				{!loading && ((rnpDataByArticle && view === 'articles') || (view === 'total' && rnpDataTotal)) && activeBrand?.is_primary_collect && (
					<RnpList
						view={view}
						setView={viewHandler}
						setAddRnpModalShow={setAddRnpModalShow}
						rnpDataByArticle={rnpDataByArticle}
						setRnpDataByArticle={setRnpDataByArticle}
						rnpDataTotal={rnpDataTotal}
						setDeleteRnpId={setDeleteRnpId}
						expanded={expanded}
						setExpanded={setExpanded}
					/>
				)}

				{addRnpModalShow && <AddRnpModal
					isAddRnpModalVisible={addRnpModalShow}
					setIsAddRnpModalVisible={setAddRnpModalShow}
					addRnp={addRnpHandler}
					rnpDataArticle={rnpDataByArticle}
				/>}

				{deleteRnpId && <ModalDeleteConfirm
					title={'Удалить данный артикул?'}
					onCancel={() => setDeleteRnpId(null)}
					onOk={() => deleteHandler(deleteRnpId)}
				/>}

				<ErrorModal open={!!error} message={error} onCancel={() => setError(null)} />
			</section>
		</main>
	);
}
