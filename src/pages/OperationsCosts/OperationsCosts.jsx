import { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { ConfigProvider, Button, Popover, Flex } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import { ServiceFunctions } from '@/service/serviceFunctions';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import ReportTable from '@/components/sharedComponents/ReportTable/ReportTable';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import ModalDeleteConfirm from '@/components/sharedComponents/ModalDeleteConfirm';
import styles from './OperationsCosts.module.css';
import { COSTS_COLUMNS, ARTICLES_COLUMNS } from './config/config';
import ModalCreateCost from './features/CreateCost/ModalCreateCost';
import ModalCreateExpenses from './features/CreateExpense/ModalCreateExpenses';
import { EditIcon, CopyIcon, DeleteIcon } from './shared/Icons';

export default function OperationsCosts() {

	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange } = useAppSelector( (state) => state.filters );
	const filters = useAppSelector((state) => state.filters)
	const { shops } = useAppSelector((state) => state.shopsSlice);
	const shopStatus = useMemo(() => {
		if (!activeBrand || !shops) return null;

		if (activeBrand.id === 0) {
			return {
				id: 0,
				brand_name: 'Все',
				is_active: shops.some((shop) => shop.is_primary_collect),
				is_valid: true,
				is_primary_collect: shops.some(
					(shop) => shop.is_primary_collect
				),
				is_self_cost_set: !shops.some((shop) => !shop.is_self_cost_set),
			};
		}

		return shops.find((shop) => shop.id === activeBrand.id);
	}, [activeBrand, shops]);

	const firstLoad = useRef(true);
	const [loading, setLoading] = useState(true);
	const [view, setView] = useState('costs'); // costs | articles
	// const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const [modalCreateCostOpen, setModalCreateCostOpen] = useState(false);
	const [modalCreateArticlesOpen, setModalCreateArticlesOpen] = useState(false);

	const [deleteCostId, setDeleteCostId] = useState(null);
	const [deleteArticleId, setDeleteArticleId] = useState(null);

	const [costs, setCosts] = useState([
		{
			id: 1,
			date: '2025-05-10',
			sum: 12300,
			article: 'Статья',
			sku: 123123123,
			brand: 'Brand',
			shop: 'Магазин',
			action: 123,
		},
	]);
	
	const actionCostsRender = (value, row) => {
		if (row.key == 'summary') {
			return '-';
		}
		return (<Flex justify="start" gap={20}>
			<ConfigProvider>
				<Button
					type="text"
					icon={EditIcon}
					></Button>
				<Button
					type="text"
					icon={CopyIcon}
					></Button>
				<Button
					type="text"
					icon={DeleteIcon}
					onClick={() => setDeleteCostId(row.id)}
				></Button>
			</ConfigProvider>
		</Flex>)
	}

	const costsData = useMemo(() => {
		const columns = COSTS_COLUMNS.map((column, i) => {
			if (column.dataIndex == 'action'){
				column.render = actionCostsRender
			}
			return ({ ket: column.i, ...column })
		})
		const data = costs.map((cost) => ({...cost, key: cost.id}));
		const result = {
			key: 'summary',
			date: 'Итого',
			sum: costs.reduce((sum, el) => (sum += el.sum), 0),
			article: '-',
			sku: '-',
			brand: '-',
			shop: '-',
			action: '-',
		};
		data.unshift(result);
		return {data, columns};
	}, [costs]);

	const [articles, setArticles] = useState([]);

	const actionArticlesRender = (value, row) => {
		return (<Flex justify="start" gap={20}>
			<ConfigProvider>
				<Button
					type="text"
					icon={EditIcon}
				></Button>
				<Button
					type="text"
					icon={DeleteIcon}
					onClick={() => setDeleteArticleId(row.id)}
				></Button>
			</ConfigProvider>
		</Flex>)
	}

	const articlesData = useMemo(() => {
		const columns = ARTICLES_COLUMNS.map((column, i) => {
			if (column.dataIndex == 'action'){
				column.render = actionArticlesRender
			}
			return ({ ket: column.i, ...column })
		})
		const data = articles.map((article) => ({...article, key: article.id}));

		return {data, columns}
	}, [articles]);

	const updateAricles = async () => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.getOperationConstsArticles();
			console.log(res);
			setArticles([
				{
					id: 1,
					title: 'Статья1'
				},
				{
					id: 2,
					title: 'Статья2'
				},
			]);
		} catch(error) {
			console.error('updateAricles error', error);
			setArticles([]);
			
		} finally {
			setLoading(false);
		}
	}

	const updateCosts = async () => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.getOperationConstsCosts();
			console.log(res)
			
		} catch(error) {
			
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (!activeBrand && !activeBrand?.is_primary_collect ){
			return
		}

		if (firstLoad.current) {
			updateCosts();
			updateAricles();
			firstLoad.current = false;
			return
		}

		if (view === 'costs'){
			console.log('updateCosts');
			updateCosts();
		}
		
		if (view === 'articles'){
			console.log('updateArticles');
			updateAricles();
		}
	}, [ filters ])

	const modalCostHandlerClose = () => {
		setModalCreateCostOpen(false);
	};

	const modalArticleHandlerClose = () => {
		setModalCreateArticlesOpen(false);
	};

	const modalHandler = () => {
		if (view === 'costs') {
			setModalCreateCostOpen(true);
			return;
		}
		setModalCreateArticlesOpen(true);
	};

	const addExpenses = (article) => {
		setExpenses((articles) => articles.push(article) );
	};

	const deleteCostHandler = (id) => {
		console.log('delete cost');
		setDeleteCostId(null);
	}
	const deleteArticleHandler = (id) => {
		console.log('delete article');
		setDeleteArticleId(null);
	}

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
					<Header
						title="Операционные расходы"
						titlePrefix={null}
						children={null}
						videoReviewLink={null}
					/>
				</div>

				{/*
				{!loading && shopStatus && !shopStatus?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}
				*/}

				{!loading && (
					<Flex justify="space-between">
						<ConfigProvider
							theme={{
								token: {
									fontFamily: '"Mulish", "Arial", sans-serif',
									colorPrimary: 'rgba(83, 41, 255, 0.1)',
								},
								components: {
									Button: {
										controlHeightLG: 43,
										paddingInlineLG: 20,
										paddingBlockLG: 8,
										fontSize: 18,
										primaryColor: '#1a1a1a',
										colorPrimaryHover: 'rgba(83, 41, 255, 0.1)',
										colorPrimaryActive:
											'rgba(83, 41, 255, 0.3)',
										defaultActiveColor: '#1a1a1a',
										defaultColor: 'rgba(26, 26, 26, 0.5)',
										// defaultActiveBg: 'rgba(83, 41, 255, 0.3)',
										defaultHoverColor: '#1a1a1a',
										defaultBorderColor: 'transparent',
										defaultActiveBorderColor: 'transparent',
										defaultBg: 'transparent',
										defaultActiveBg: 'transparent',
										defaultHoverBg: 'rgba(83, 41, 255, 0.1)',
										defaultShadow: 'none',
									},
								},
							}}
						>
							<Flex align="center" justify="flex-start">
								<Button
									size="large"
									type={view === 'costs' ? 'primary' : 'default'}
									onClick={() => { setView('costs'); }}
								>
									Расходы
								</Button>
								<Button
									size="large"
									type={view === 'costs' ? 'default' : 'primary'}
									onClick={() => { setView('articles'); }}
								>
									Статьи
								</Button>
							</Flex>
						</ConfigProvider>
						<Flex align="center" justify="flex-end" gap={11}>
							<ConfigProvider
								theme={{
									token: {
										colorBorder: '#00000033',
										colorPrimary: '#5329FF',
									},
									components: {
										Button: {
											defaultShadow: '',
											controlHeightLG: 45,
											paddingInlineLG: 16,
											fontWeight: 600,
										},
									},
								}}
							>
								{view === 'costs' && (
									// <Popover
									// 	arrow={false}
									// 	content={'Как загрузить'}
									// 	// trigger="click"
									// 	open={isPopoverOpen}
									// 	placement="bottomRight"
									// 	// onOpenChange={popoverHandler}
									// >
										<ConfigProvider
											theme={{
												components: {
													Button: {
														fontSize: 16,
														fontWeight: 500,
													},
												},
											}}
										>
											<Button
												type="text"
												iconPosition="start"
												size="large"
												icon={
													<svg
														width="20"
														height="20"
														viewBox="0 0 20 20"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<rect
															x="0.75"
															y="0.75"
															width="18.5"
															height="18.5"
															rx="9.25"
															stroke="black"
															strokeOpacity="0.1"
															strokeWidth="1.5"
														/>
														<path
															d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z"
															fill="#1A1A1A"
															fillOpacity="0.5"
														/>
													</svg>
												}
											>
												Как загрузить
											</Button>
										</ConfigProvider>
									// </Popover>
								)}

								<Button
									type="primary"
									iconPosition="start"
									size="large"
									onClick={modalHandler}
								>
									Добавить
								</Button>
							</ConfigProvider>
						</Flex>
					</Flex>
				)}
				
				<div className={styles.controls}>
						<Filters
							shopSelect={false}
							timeSelect={true}
							isDataLoading={loading}
							skuFrequency={false}
							weekSelect={false}
							weekOptions={null}
							weekValue={null}
							weekHandler={null}
							monthSelect = {false}
							monthHandler={null}
							monthValue={null}
							tempPageCondition={null}
						/>
				</div>
				
				{!loading && shops && shopStatus && !shopStatus?.is_primary_collect && (
						<DataCollectWarningBlock />
				)}

				{!loading && shopStatus && shopStatus?.is_primary_collect && <div className={styles.container}>
						<ReportTable
							loading={loading}
							columns={
								view === 'costs' ? costsData.columns : articlesData.columns
							}
							data={view === 'costs' ? costsData.data : articlesData.data}
							is_primary_collect={shopStatus?.is_primary_collect}
							virtual={false}
						/>
				</div>}

				{ modalCreateCostOpen && <ModalCreateCost
					open={modalCreateCostOpen}
					onCancel={modalCostHandlerClose}
					createArticleOpen={setModalCreateArticlesOpen}
					articles={articles}
					zIndex={1000}
				/> }

				{ modalCreateArticlesOpen && <ModalCreateExpenses
					open={modalCreateArticlesOpen}
					onCancel={modalArticleHandlerClose}
					onSubmit={addExpenses}
					zIndex={1001}
				/> }

				{deleteCostId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить расход?'}
					onCancel={() => setDeleteCostId(null)}
					onOk={() => deleteCostHandler(deleteCostId)}
				/>}

				{deleteArticleId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить статью?'}
					onCancel={() => setDeleteArticleId(null)}
					onOk={() => deleteArticleHandler(deleteArticleId)}
				/>}

				{loading && <div className={styles.loading}>
					<span className='loader'></span>
				</div>}
			</section>
		</main>
	);
}
