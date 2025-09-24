import { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { ConfigProvider, Button, Popover, Flex, Tooltip } from 'antd';
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
import styles from './OperatingExpenses.module.css';
import { COSTS_COLUMNS, ARTICLES_COLUMNS } from './config/config';
import CreateCost from './features/CreateCost/CreateCost';
import CreateArticle from './features/CreateArticle/CreateArticle';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from './shared/Icons';
export default function OperatingExpenses() {

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

	const [createCostOpen, setCreateCostOpen] = useState(false);
	const [modalCreateArticlesOpen, setModalCreateArticlesOpen] = useState(false);

	const [deleteCostId, setDeleteCostId] = useState(null);
	const [deleteArticleId, setDeleteArticleId] = useState(null);

	const [costEdit, setCostEdit] = useState(null);
	const [costCopy, setCostCopy] = useState(null);
	const [costs, setCosts] = useState(null);
	
	const actionCostsRender = (value, row) => {
		if (row.key == 'summary') {
			return null;
		}
		return (<Flex justify="start" gap={20}>
			<ConfigProvider>
				<Button
					type="text"
					icon={EditIcon}
					onClick={() => {
						setCostEdit((costs.find((article) => article.id === row.id)));
						setCreateCostOpen(true)
					}}
					title='Изменить'
					></Button>
				<Button
					type="text"
					icon={CopyIcon}
					onClick={() => {
						setCostCopy((costs.find((article) => article.id === row.id)));
						setCreateCostOpen(true)
					}}
					title='Копировать'
					></Button>
				<Button
					type="text"
					icon={DeleteIcon}
					onClick={() => setDeleteCostId(row.id)}
					title='Удалить'
				></Button>
			</ConfigProvider>
		</Flex>)
	}

	const costsData = useMemo(() => {
		const columns = COSTS_COLUMNS.map((column, i) => {
			if (column.dataIndex == 'action'){
				column.render = actionCostsRender
			}
			return ({ ...column, key: column.i })
		})
		let data = [];
		if (costs){
			data = costs.map((cost) => ({...cost, key: cost.id}));
		}
		const result = {
			key: 'summary',
			date: 'Итого',
			sum: data.reduce((sum, el) => (sum += el.sum), 0),
			description: '-',
			article: '-',
			sku: '-',
			brand: '-',
			shop: '-',
			action: '-',
		};
		data.unshift(result);
		return {data, columns};
	}, [costs]);

	console.log('costsData', costsData)

	const [articleEdit, setArticleEdit] = useState(null);
	const [articles, setArticles] = useState(null);
	const [articlesLoading, setArticlesLoading] = useState(false);

	const actionArticlesRender = (value, row) => {
		return (<Flex justify="start" gap={20}>
			<ConfigProvider>
				<Button
					type="text"
					icon={EditIcon}
					onClick={() => {
						setArticleEdit((articles.find((article) => article.id === row.id)));
						setModalCreateArticlesOpen(true)
					}}
					title='Изменить'
					></Button>
				<Button
					type="text"
					icon={DeleteIcon}
					onClick={() => setDeleteArticleId(row.id)}
					title='Удалить'
				></Button>
			</ConfigProvider>
		</Flex>)
	}

	const articlesData = useMemo(() => {
		const columns = ARTICLES_COLUMNS.map((column, i) => {
			if (column.dataIndex == 'action'){
				column.render = actionArticlesRender
			}
			return ({ ...column, key: column.i })
		})
		let data = [];
		if (articles){
			data = articles.map((article) => ({...article, key: article.id}));
		}
		return {data, columns}
	}, [articles]);

	const updateAricles = async () => {
		setLoading(true);
		setArticlesLoading(true);
		try {
			const res = await ServiceFunctions.getOperationConstsArticles();
			console.log('updateAricles', res);
			setArticles(res.data);
		} catch(error) {
			console.error('updateAricles error', error);
			setArticles([]);
		} finally {
			console.log('updateAricles', !firstLoad.current)
			setArticlesLoading(false);
			// if (!firstLoad.current) {
				setLoading(false);
			// }
		}
	}

	const updateCosts = async () => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.getOperationConstsCosts();
			console.log(res)
			setCosts(res.data)
		} catch(error) {
			console.error('updateCosts error', error);
			setCosts([]);
		} finally {
			console.log('updateCosts', !firstLoad.current)
			// if (!firstLoad.current) {
				setLoading(false);
			// }
		}
	}

	useEffect(() => {
		if (!activeBrand && !activeBrand?.is_primary_collect ){
			return
		}

		if (firstLoad.current) {
			// new Promise
			new Promise(resolve => {
				updateCosts();
				updateAricles();
			})
				.then(() => {
					firstLoad.current = false;
					setLoading(false);
				});
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
		setCreateCostOpen(false);
		setCostEdit(null);
		setCostCopy(null);
	};

	const modalArticleHandlerClose = () => {
		setModalCreateArticlesOpen(false);
		setArticleEdit(null);
	};

	const modalHandler = () => {
		if (view === 'costs') {
			setCreateCostOpen(true);
			return;
		}
		setModalCreateArticlesOpen(true);
	};

	const createArticle = async (article) => {
		setArticlesLoading(true);
		// setModalCreateArticlesOpen(false);
		try {
			const res = await ServiceFunctions.postOperationConstsCreateArticle();
			console.log('createArticle', res);
			// 
			setArticles((list) => [...list, {...article, id: list.length + Math.ceil(Math.random() * 10)}])
			// 
		} catch(error) {
			console.error('createArticle error', error);
		} finally {
			setModalCreateArticlesOpen(false);
			setArticlesLoading(false);
		}
	}

	const editArticle = async (article) => {
		setLoading(true);
		setModalCreateArticlesOpen(false);
		try {
			const res = await ServiceFunctions.aptchOperationConstsEditArticle();
			console.log('editArticle', article);
			// 
			setArticles((list) => list.map((el) => {
				if (el.id === article.id){
					return article
				}
				return el
			}))
			// 
		} catch(error) {
			console.error('createArticle error', error);
		} finally {
			setArticleEdit(null);
			// if (!firstLoad.current) {
				setLoading(false);
			// }
		}
	}

	const handleArticle = (article) => {
		// setModalCreateArticlesOpen(false);
		if (!!articleEdit){
			console.log('editArticle')
			editArticle(article);
			return
		}
		console.log('createArticle')
		createArticle(article);
		// setExpenses((articles) => articles.push(article) );
	};

	const handleCost = (cost) => {
		if (!!costEdit){
			console.log('editCost')
			editCost(cost);
			return
		}
		console.log('createCost')
		createCost(cost);
		// setExpenses((articles) => articles.push(article) );
	};

	const deleteCostHandler = async (id) => {
		console.log('delete cost');
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperationConstsDeleteCost();
			// 
			setCosts((list) => list.filter((el) => el.id !== id));
			// 
			console.log('deleteCostHandler', res);
		} catch(error) {
			console.error('deleteCostHandler error', error);
		} finally {
			setDeleteCostId(null);
			setLoading(false);
		}
	}

	const deleteArticleHandler = async (id) => {
		console.log('delete article');
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperationConstsDeleteArticle();
			// 
			setArticles((list) => list.filter((el) => el.id !== id));
			// 
			console.log('deleteArticleHandler', res);
		} catch(error) {
			console.error('deleteArticleHandler error', error);
		} finally {
			setDeleteArticleId(null);
			setLoading(false);
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
										contentFontSizeLG: 18,
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
									<Flex gap={10} align='center'>
										<Tooltip title={'Как загрузить'}>
											{InfoIcon}
										</Tooltip>
										Как загрузить
									</Flex>
									// <Popover
									// 	arrow={false}
									// 	content={'Как загрузить'}
									// 	// trigger="click"
									// 	open={isPopoverOpen}
									// 	placement="bottomRight"
									// 	// onOpenChange={popoverHandler}
									// >
										// <ConfigProvider
										// 	theme={{
										// 		components: {
										// 			Button: {
										// 				fontSize: 16,
										// 				fontWeight: 500,
										// 			},
										// 		},
										// 	}}
										// >
										// 	<Button
										// 		type="text"
										// 		iconPosition="start"
										// 		size="large"
										// 		icon={InfoIcon}
										// 	>
										// 		Как загрузить
										// 	</Button>
										// </ConfigProvider>
									// </Popover>
								)}

								<Button
									type="primary"
									iconPosition="start"
									size="large"
									onClick={modalHandler}
									title={view === 'costs' ? 'Добавить расход' : 'Добавить статью'}
								>
									Добавить
								</Button>
							</ConfigProvider>
						</Flex>
					</Flex>
				)}
				
				<div className={styles.controls}>
						<Filters
							shopSelect={true}
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
							// operationCostsArticles={true}
							// operationCostsArticlesData={[]}
							// operationCostsArticlesHandler={}
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

				{ createCostOpen && <CreateCost
					open={createCostOpen}
					onCancel={modalCostHandlerClose}
					createArticleOpen={setModalCreateArticlesOpen}
					articles={articles}
					zIndex={1000}
					edit={costEdit}
					copy={costCopy}
					// state={() => ('edit' && costEdit) || ('copy' && costCopy)}
					// data={costEdit || costCopy}
				/> }

				{ modalCreateArticlesOpen && <CreateArticle
					open={modalCreateArticlesOpen}
					onCancel={modalArticleHandlerClose}
					onSubmit={handleArticle}
					zIndex={1001}
					data={articleEdit}
					confirmLoading={articlesLoading}
					loading={articlesLoading}
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
