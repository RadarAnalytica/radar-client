import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext, useMemo } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import { ConfigProvider, Button, Popover, Flex } from 'antd';
import styles from './OperationsCosts.module.css';
import ReportTable from '../../components/sharedComponents/ReportTable/ReportTable';
import { useAppSelector } from '../../redux/hooks';
import { COSTS_COLUMNS, ARTICLES_COLUMNS } from './model/model';
import ModalCreateCost from './widgets/modals/ModalCreateCost';
import ModalCreateArticle from './widgets/modals/ModalCreateArticle';
import DataCollectWarningBlock from '../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
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

	const [loading, setLoading] = useState(true);
	const [view, setView] = useState('costs'); // costs | articles
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const [articlesData]

	const [modalCreateCostOpen, setModalCreateCostOpen] = useState(false);
	const [modalCreateArticleOpen, setModalCreateArticleOpen] = useState(false);

	const [deleteId, setDeleteId] = useState(null);

	const [costsSummary, setCostsSummary] = useState([]);
	const [articlesSummary, setArticlesSummary] = useState([]);

	const [costs, setCosts] = useState([
		{
			date: '2025-05-10',
			sum: 12300,
			article: 'Статья',
			sku: 123123123,
			brand: 'Brand',
			shop: 'Магазин',
			action: 123,
		},
	]);
	
	const costsData = useMemo(() => {
		const data = [...costs];
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
		return data;
	}, [costs]);

	const [articles, setArticles] = useState([]);

	const articlesData = useMemo(() => 
		(articles.map((el, i) => ({
			key: i,
			title: el.title
	}))), [articles]);

	const updateAricles = async () => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.getOperationConstsArticles();
			console.log(res)
			
		} catch(error) {
			
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
		if (view === 'costs'){
			console.log('updateCosts');
			updateCosts();
		}
		if (view === 'articles'){
			console.log('updateArticles');
			updateAricles();
		}
	}, [ filters ])

	const actionRender = (value, row) => {
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
				></Button>
			</ConfigProvider>
		</Flex>)
	}

	const modalCostHandlerClose = () => {
		setModalCreateCostOpen(false);
	};

	const modalArticleHandlerClose = () => {
		setModalCreateArticleOpen(false);
	};

	const modalHandler = () => {
		if (view === 'costs') {
			setModalCreateCostOpen(true);
			return;
		}
		setModalCreateArticleOpen(true);
	};

	const addArticle = (article) => {
		setArticles((articles) => {
			articles.push(article);
			return articles;
		});
	};

	const deleteHandler = () => {
		if (view == 'costs') {
			console.log('delete cost');
		}
		if (view == 'articles') {
			console.log('delete article');
		}
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
									<Popover
										arrow={false}
										content={'Как загрузить'}
										// trigger="click"
										open={isPopoverOpen}
										placement="bottomRight"
										// onOpenChange={popoverHandler}
									>
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
									</Popover>
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
					{/* <div className={styles.filter}> */}
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
					{/* </div> */}
					{/* <div className={styles.btns}></div> */}
				</div>
				
				{!loading && shops && shopStatus && !shopStatus?.is_primary_collect && (
						<DataCollectWarningBlock />
				)}

				{!loading && shopStatus && shopStatus?.is_primary_collect && <div className={styles.container}>
						<ReportTable
							loading={loading}
							columns={
								view === 'costs' ? COSTS_COLUMNS : ARTICLES_COLUMNS
							}
							data={view === 'costs' ? costsData : articlesData}
							is_primary_collect={shopStatus?.is_primary_collect}
						/>
				</div>}
				{/* )} */}
				{ modalCreateCostOpen && <ModalCreateCost
					open={modalCreateCostOpen}
					onCancel={modalCostHandlerClose}
					createArticleOpen={setModalCreateArticleOpen}
					shops={shops}
					// brands={brands}
					// sku={sku}
					articles={articles}
					zIndex={1000}
				/> }

				{ modalCreateArticleOpen && <ModalCreateArticle
					open={modalCreateArticleOpen}
					onCancel={modalArticleHandlerClose}
					onSubmit={addArticle}
					zIndex={1001}
				/> }

				{deleteId && <ModalDeleteConfirm
					title={'Удалить данный артикул?'}
					onCancel={() => setDeleteId(null)}
					onOk={() => deleteHandler(deleteId)}
				/>}

				{loading && <div className={styles.loading}>
					<span className='loader'></span>
				</div>}
			</section>
		</main>
	);
}
