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
import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import RnpList from './widget/RnpList/RnpList';
import ModalDeleteConfirm from '../../components/sharedComponents/ModalDeleteConfirm/ModalDeleteConfirm';
import DataCollectWarningBlock from '../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import SelfCostWarningBlock from '../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { fetchRnpFilters } from '../../redux/filtersRnp/filterRnpActions';
import { actions as filterActions } from '../../redux/filtersRnp/filtersRnpSlice'
import HowToLink from '../../components/sharedComponents/howToLink/howToLink';

export default function Rnp() {
	const { user, authToken } = useContext(AuthContext);
	const dispatch = useAppDispatch();
	const { selectedRange, activeBrand, shops } = useAppSelector((state) => state.filters);
	const filters = useAppSelector((state) => state.filters);

	// const rnpSelected = useAppSelector((state) => state.rnpSelected);

	const initLoad = useRef(true);
	const pageContentRef = useRef(null);

	const [loading, setLoading] = useState(true);
	const [addRnpModalShow, setAddRnpModalShow] = useState(false);
	const [page, setPage] = useState(1);
	const [view, setView] = useState('articles');
	const [rnpDataByArticle, setRnpDataByArticle] = useState(null);
	const [rnpDataTotal, setRnpDataTotal] = useState(null)
	const [deleteRnpId, setDeleteRnpId] = useState(null);
	const [error, setError] = useState(null);
	const [expanded, setExpanded] = useState('collapsed');

	const updateRnpListByArticle = async () => {
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.postRnpByArticle(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					page
				);
				dataToRnpList(response);
			}
		} catch (error) {
			console.error('updateRnpListByArticle error', error)
		} finally {
			setLoading(false);
		}
	};

	const updateRnpListSummary = async () => {
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.postRnpSummary(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					page
				);
				dataToRnpTotalList(response);
			}
		} catch (error) {
			console.error('updateRnpListSummary error', error);
			setRnpDataTotal(null);
		} finally {
			setLoading(false);
		}
	};

	const deleteRnp = async (id) => {
		setDeleteRnpId(null);
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.deleteRnpId(
					authToken,
					id
				);
			}
		} catch (error) {
			console.error('deleteRnp error', error)
		} finally {
			setPage(1);
			updateRnpListByArticle();
		}
	}

	const dataToRnpList = (response) => {

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
				article_data: article.article_data,
			};

			return item;
		});

		setRnpDataByArticle(list);
	};

	const dataToRnpTotalList = (response) => {
		const article = response.data;
		if (article.length === 0) {
			setRnpDataTotal(null);
			return
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
			article_data: article.article_data,
		};

		setRnpDataTotal(item);
	};

	const deleteHandler = (value) => {
		deleteRnp(value)
	}

	const addRnpList = async (porductIds) => {
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.postUpdateRnpProducts(
					authToken,
					porductIds
				);
				if (response.detail) {
					setError(response.detail);
					return
				}
			}
		} catch (error) {
			console.error('addRnpList error', error)
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
	}

	useLayoutEffect(() => {
		if (!activeBrand && !activeBrand?.is_primary_collect) {
			return
		}

		if (activeBrand && activeBrand.is_primary_collect) {
			if (view === 'articles') {
				updateRnpListByArticle();
			} else {
				updateRnpListSummary();
			}
		}

		if (activeBrand && !activeBrand?.is_primary_collect) {
			setLoading(false)
		}

		// }, [activeBrand, activeBrand, shops, filters, page, view, selectedRange]);
	}, [filters, page, view, selectedRange]);

	// Добавляем автоскролл к контейнеру страницы
	useEffect(() => {
		if (!pageContentRef.current) return;

		const element = pageContentRef.current;

		return autoScrollForElements({
			element,
		});
	}, []);

	useEffect(() => {
		return () => {
			localStorage.removeItem('RNP_EXPANDED_TABLE_ROWS_STATE');
			localStorage.removeItem('RNP_EXPANDED_TOTAL_TABLE_ROWS_STATE');
			localStorage.removeItem('RNP_EXPANDED_STATE');
			localStorage.removeItem('SAVED_ORDER');
		}
	}, []);


	useEffect(() => {
		if (rnpDataByArticle) {
			let EXPANDED_STATE = JSON.parse(localStorage.getItem('RNP_EXPANDED_STATE'));
			if (EXPANDED_STATE && EXPANDED_STATE !== 'collapsed' && rnpDataByArticle?.length > 0) {
				const isInCurrentList = rnpDataByArticle.some((el) => el.article_data.wb_id === EXPANDED_STATE);
				let updatedExpandedState;
				if (!isInCurrentList) {
					EXPANDED_STATE = rnpDataByArticle[0].article_data.wb_id;
				}
				setExpanded(EXPANDED_STATE);
				return
			}

			if (!EXPANDED_STATE) {
				setExpanded(rnpDataByArticle[0].article_data.wb_id);
			}
		}
	}, [rnpDataByArticle])

	const addRnpHandler = (list) => {
		setAddRnpModalShow(false);
		addRnpList(list);
	}


	return (
		<main className={styles.page}>
			<MobilePlug />
			{/* ------ SIDE BAR ------ */}
			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>
			{/* ------ CONTENT ------ */}
			<section ref={pageContentRef} className={styles.page__content}>
				{/* header */}
				<div className={styles.page__headerWrapper}>
					<Header title="Рука на пульсе (РНП)"></Header>
				</div>

				{!loading && activeBrand && activeBrand.is_valid && activeBrand?.is_primary_collect && !activeBrand.is_self_cost_set && (
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
					<HowToLink
						text='Как использовать?'
						target='_blank'
						url='https://radar.usedocs.com/article/79433'
					/>
				</div>

				{loading && ((!rnpDataByArticle && view === 'articles') || (view === 'total' && !rnpDataTotal)) && (
					<div className={styles.loading}>
						<div className={styles.loading__loader}>
							<span className="loader"></span>
						</div>
					</div>
				)}

				{!loading && activeBrand && !activeBrand?.is_primary_collect && (
					<>
						<DataCollectWarningBlock
							title='Ваши данные еще формируются и обрабатываются.'
						/>
					</>
				)}

				{((rnpDataByArticle && view === 'articles') || (view === 'total' && rnpDataTotal)) && activeBrand && activeBrand?.is_primary_collect && (
					<RnpList
						view={view}
						setView={viewHandler}
						setAddRnpModalShow={setAddRnpModalShow}
						rnpDataByArticle={rnpDataByArticle}
						rnpDataTotal={rnpDataTotal}
						setDeleteRnpId={setDeleteRnpId}
						expanded={expanded}
						setExpanded={setExpanded}
						loading={loading}
					// page={page}
					// setPage={setPage}
					// paginationState={paginationState}
					/>
				)}

				{/* {!loading && rnpDataByArticle?.length === 0 && 
					<NoDataWidget
						mainTitle='Здесь пока нет ни одного артикула'
						mainText='Добавьте артикулы для отчета «Рука на пульсе»'
						buttonTitle='Добавить'
						action={() => setAddRnpModalShow(true)}
						howLinkGroup={false}
					/>
				} */}

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
