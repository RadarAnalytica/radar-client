import React, { useLayoutEffect, useMemo, useRef } from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import { ConfigProvider, Flex, Button } from 'antd';
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/entry-point/element';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { NoDataWidget } from '@/pages/productsGroupsPages/widgets';
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
import { actions as filtersRnpAddActions } from '../../redux/filtersRnpAdd/filtersRnpAddSlice';
import { actions as filterActions } from '../../redux/filtersRnp/filtersRnpSlice';
import { actions as filtersActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import HowToLink from '../../components/sharedComponents/howToLink/howToLink';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import Loader from '@/components/ui/Loader';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import NoData from '@/components/sharedComponents/NoData/NoData';
import { useSearchParams } from 'react-router-dom';
import { encodeUnicodeToBase64, decodeBase64ToUnicode } from '@/components/unitCalculatorPageComponents/UnitCalcUtils';
import { fileDownload } from '@/service/utils';
import DownloadButton from '@/components/DownloadButton';

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
};

export default function Rnp({
	isPublicVersion = false  // 'public' or 'private'
}) {
	const { user, authToken } = useContext(AuthContext);
	const { isDemoMode } = useDemoMode();
	const dispatch = useAppDispatch();
	const { selectedRange, activeBrand, shops, activeBrandName, isFiltersLoaded } = useAppSelector((state) => state.filters);
	const filters = useAppSelector((state) => state.filters);
	const initLoad = useRef(true);
	const pageContentRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [downloadLoading, setDownloadLoading] = useState(false);
	const progress = useLoadingProgress({ loading });
	const [addRnpModalShow, setAddRnpModalShow] = useState(false);
	const [page, setPage] = useState(1);
	const [view, setView] = useState('articles');
	const [rnpDataByArticle, setRnpDataByArticle] = useState(null);
	const [rnpDataTotal, setRnpDataTotal] = useState(null);
	const [deleteRnpId, setDeleteRnpId] = useState(null);
	const [error, setError] = useState(null);
	const [expanded, setExpanded] = useState('collapsed');
	const [searchParams, setSearchParams] = useSearchParams();
	const [shareButtonState, setShareButtonState] = useState('Поделиться');
	const [publicUserCredentials, setPublicUserCredentials] = useState(null) // user_id & secret for requests from public version of te page
	const abortControllerRef = useRef(null);

	const updateRnpListByArticle = async (signal, filters, authToken, publicUserCredentials, isPublicVersion) => {
		setLoading(true);
		progress.start();
		const handler = isPublicVersion ? ServiceFunctions.postRnpByArticlePublic : ServiceFunctions.postRnpByArticle;

		if (isPublicVersion) {
			try {
				if (activeBrand) {
					const response = await handler(
						authToken,
						filters.selectedRange,
						filters.activeBrand.id,
						filters,
						signal,
						publicUserCredentials
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
			}
		} else {
			try {
				if (activeBrand) {
					const response = await handler(
						authToken,
						filters.selectedRange,
						filters.activeBrand.id,
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
			}
		}
	};

	const updateRnpListSummary = async (signal, filters, authToken, publicUserCredentials, isPublicVersion) => {
		setLoading(true);
		progress.start();
		const handler = isPublicVersion ? ServiceFunctions.postRnpSummaryPublic : ServiceFunctions.postRnpSummary;
		if (isPublicVersion) {
			try {
				if (activeBrand) {
					const response = await handler(
						authToken,
						filters.selectedRange,
						filters.activeBrand.id,
						filters,
						signal,
						publicUserCredentials
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
			}
		} else {
			try {
				if (activeBrand) {
					const response = await handler(
						authToken,
						filters.selectedRange,
						filters.activeBrand.id,
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
			}
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
			updateRnpListByArticle(abortControllerRef?.current?.signal, filters, authToken);
		}
	};

	const handleDownload = async () => {
		setDownloadLoading(true);
		try {
			const fileBlob = await ServiceFunctions.getDownloadReportRnp(
				authToken,
				selectedRange,
				activeBrand.id,
				filters,
			);
			fileDownload(fileBlob, `РНП_сводный_отчет.xlsx`);
		} catch (e) {
			console.error('Ошибка скачивания: ', e);
		} finally {
			setDownloadLoading(false);
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
			updateRnpListByArticle(abortControllerRef?.current?.signal, filters, authToken);
		}
	};

	const viewHandler = (value) => {
		if (view !== value) {
			setView(value);
			setLoading(true);
		}
	};

	const shareButtonClickHandler = () => {
		const filtersToEncode = {
			selectedRange,
			activeBrand: { id: activeBrand.id, brand_name: activeBrand.brand_name },
			activeBrandName,
			secret: 'RADAR_SECRET',
			user_id: user?.id

		}
		const json = JSON.stringify(filtersToEncode);
		const token = encodeUnicodeToBase64(json);
		if (token) {
			const currentDomain = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
			navigator.clipboard.writeText(`${currentDomain}/rnp-public?filters=${token}`)
				.catch(err => console.log('Error'));
			setShareButtonState('Ссылка скопирована');
		}
	};

	// Поулчаем параметры фильтров из URL если это публичная страница
	useEffect(() => {
		if (isPublicVersion) {
			const filters = searchParams.get('filters');
			if (!filters) return;
			const decodedFilters = decodeBase64ToUnicode(filters);
			if (!decodedFilters) { setError('Не удалось получить параметры фильтрации'); return; }
			const { selectedRange, activeBrand, activeBrandName, user_id, secret } = decodedFilters;
			dispatch(filtersActions.setActiveFilters({ stateKey: 'activeBrand', data: activeBrand }));
			dispatch(filtersActions.setPeriod(selectedRange));
			dispatch(filtersActions.setActiveFilters({ stateKey: 'activeBrandName', data: activeBrandName }));
			setPublicUserCredentials({ user_id, secret })
		}
	}, [searchParams, isPublicVersion])

	useLayoutEffect(() => {
		abortControllerRef.current = new AbortController();

		if (
			activeBrand
			&& !isPublicVersion
		) {
			if (activeBrand?.is_primary_collect) {
				if (view === 'articles') {
					updateRnpListByArticle(abortControllerRef?.current?.signal, filters, authToken);
				} else {
					updateRnpListSummary(abortControllerRef?.current?.signal, filters, authToken);
				}
			} else {
				setLoading(false);
			}
		}

		if (isPublicVersion && publicUserCredentials) {
			if (view === 'articles') {
				updateRnpListByArticle(abortControllerRef?.current?.signal, filters, authToken, publicUserCredentials, isPublicVersion);
			} else {
				updateRnpListSummary(abortControllerRef?.current?.signal, filters, authToken, publicUserCredentials, isPublicVersion);
			}
		}

		return () => {
			abortControllerRef?.current?.abort();
		};
	}, [isFiltersLoaded, view, activeBrand, selectedRange, activeBrandName, publicUserCredentials]);

	// Добавляем автоскролл к контейнеру страницы
	useEffect(() => {
		if (!pageContentRef.current) return;
		const element = pageContentRef.current;
		return () => {
			autoScrollForElements({ element });
		};
	}, []);

	useEffect(() => {
		if (activeBrand && !isPublicVersion) {
			dispatch(filtersRnpAddActions.setActiveShop(activeBrand));
		}
	}, [activeBrand]);

	useEffect(() => {
		if (selectedRange && !isPublicVersion) {
			const today = format(new Date(), 'yyyy-MM-dd');
			if (selectedRange.to === today || selectedRange.from === today) {
				const defaultPeriod = { period: 7 };
				dispatch(filtersActions.setPeriod(defaultPeriod));
				localStorage.setItem('selectedRange', JSON.stringify(defaultPeriod));
			}
		}

		return () => {
			if (!isPublicVersion) {
				localStorage.removeItem('RNP_EXPANDED_TABLE_ROWS_STATE');
				localStorage.removeItem('RNP_EXPANDED_TOTAL_TABLE_ROWS_STATE');
				localStorage.removeItem('RNP_EXPANDED_STATE');
				shops?.forEach((shop) => {
					localStorage.removeItem(`RNP_SAVED_ORDER_${shop.id}`);
				});
			}
		};
	}, []);


	useEffect(() => {
		if (rnpDataByArticle && !isPublicVersion) {
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

	useEffect(() => {
		let timeout;
		if (shareButtonState === 'Ссылка скопирована') {
			timeout = setTimeout(() => {
				setShareButtonState('Поделиться');
			}, 1500);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [shareButtonState])

	const addRnpHandler = (list) => {
		setAddRnpModalShow(false);
		addRnpList(list);
	};


	return (
		<main className={styles.page}>
			<MobilePlug />
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

				{isDemoMode && !isPublicVersion && <NoSubscriptionWarningBlock />}

				{!loading && activeBrand?.is_primary_collect && !activeBrand?.is_self_cost_set && !isPublicVersion && (
					<SelfCostWarningBlock
						shopId={activeBrand.id}
					/>
				)}

				{!loading && ((rnpDataByArticle?.length > 0 && view === 'articles') || (view === 'total' && rnpDataTotal)) && (
					<ConfigProvider
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

								<div className={styles.page__shareAndAddButtonsWrapper}>
									{!isPublicVersion &&
										<ConfigProvider
											theme={{
												token: {
													colorBorder: '#00000033',
													colorPrimary: '#E7E1FE',
												},
												components: {
													Button: {
														primaryColor: '#5329FF',
														//paddingInline: 8,
														paddingBlockLG: 10,
														paddingInlineLG: 8,
														defaultShadow: false,
													}
												}
											}}
										>
											<Button
												type='primary'
												iconPosition='start'
												icon={shareButtonState === 'Поделиться' ? <ShareIcon /> : undefined}
												disabled={loading || isDemoMode}
												size='large'
												onClick={() => { shareButtonClickHandler(); }}
												style={{
													fontWeight: 600,
													fontSize: 14,
													width: shareButtonState === 'Поделиться' ? 145 : 175,
													transition: 'width 0.3s ease',
													overflow: 'hidden',
													whiteSpace: 'nowrap'
												}}
											>{shareButtonState}</Button>
										</ConfigProvider>}
									{!isPublicVersion &&
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
									}
									{!isPublicVersion && view === 'total' &&
										<DownloadButton
											handleDownload={handleDownload}
											loading={loading || downloadLoading}
										/>
									}
								</div>
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
						disabled={isPublicVersion}
					/>
				</div>

				{!loading && activeBrand && !activeBrand?.is_primary_collect && !isPublicVersion && (
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

				{!loading && ((rnpDataByArticle && view === 'articles') || (view === 'total' && rnpDataTotal)) && (
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
						isPublicVersion={isPublicVersion}
						authToken={authToken}
						filters={filters}
					/>
				)}

				{!loading && activeBrand && ((view === 'articles' && !rnpDataByArticle) || (view === 'total' && !rnpDataTotal)) && (
					<NoData />
				)}

				{addRnpModalShow && !isPublicVersion &&
					<AddRnpModal
						isAddRnpModalVisible={addRnpModalShow}
						setIsAddRnpModalVisible={setAddRnpModalShow}
						addRnp={addRnpHandler}
						rnpDataArticle={rnpDataByArticle}
					/>
				}

				{deleteRnpId && !isPublicVersion &&
					<ModalDeleteConfirm
						title={'Удалить данный артикул?'}
						onCancel={() => setDeleteRnpId(null)}
						onOk={() => deleteHandler(deleteRnpId)}
					/>}

				<ErrorModal open={!!error} message={error} onCancel={() => setError(null)} />
			</section>
		</main>
	);
}

const ShareIcon = () => {
	return (
		<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 2 }}>
			<path d="M15.3367 3.16335C13.958 1.7847 11.7228 1.7847 10.3441 3.16335L8.80798 4.69951C8.48983 5.01766 7.97401 5.01766 7.65586 4.69951C7.33771 4.38136 7.33771 3.86554 7.65586 3.54739L9.19202 2.01123C11.207 -0.00372148 14.4738 -0.00372148 16.4888 2.01123C18.5037 4.02617 18.5037 7.29305 16.4888 9.30799L14.9526 10.8442C14.6345 11.1623 14.1187 11.1623 13.8005 10.8442C13.4824 10.526 13.4824 10.0102 13.8005 9.69203L15.3367 8.15587C16.7153 6.77722 16.7153 4.54199 15.3367 3.16335Z" fill="#5329FF" />
			<path d="M4.19949 8.15587C4.51764 8.47402 4.51764 8.98985 4.19949 9.308L2.66333 10.8442C1.28468 12.2228 1.28468 14.458 2.66333 15.8367C4.04198 17.2153 6.27721 17.2153 7.65586 15.8367L9.19202 14.3005C9.51017 13.9824 10.026 13.9824 10.3441 14.3005C10.6623 14.6187 10.6623 15.1345 10.3441 15.4526L8.80798 16.9888C6.79303 19.0038 3.52616 19.0038 1.51121 16.9888C-0.503737 14.9739 -0.503737 11.707 1.51121 9.69204L3.04737 8.15587C3.36552 7.83773 3.88134 7.83773 4.19949 8.15587Z" fill="#5329FF" />
			<path d="M6.11966 11.2282C5.80151 11.5464 5.80151 12.0622 6.11966 12.3803C6.43781 12.6985 6.95363 12.6985 7.27178 12.3803L11.8803 7.77184C12.1984 7.45369 12.1984 6.93787 11.8803 6.61972C11.5621 6.30157 11.0463 6.30157 10.7281 6.61972L6.11966 11.2282Z" fill="#5329FF" />
		</svg>
	);
};
