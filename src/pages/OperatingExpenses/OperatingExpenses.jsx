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
import CreateCategory from './features/CreateCategory/CreateCategory';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from './shared/Icons';
export default function OperatingExpenses() {

	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange } = useAppSelector( (state) => state.filters );
	// const filters = useAppSelector((state) => state.filters)
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
	const [view, setView] = useState('costs'); // costs | category
	// const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const [createCostOpen, setCreateCostOpen] = useState(false);
	const [modalCreateCategoryOpen, setModalCreateCategoryOpen] = useState(false);

	const [deleteCostId, setDeleteCostId] = useState(null);
	const [deleteCategoryId, setDeleteCategoryId] = useState(null);

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

	const [categoryEdit, setCategoryEdit] = useState(null);
	const [category, setCategory] = useState(null);
	const [categoryLoading, setCategoryLoading] = useState(false);

	const actionArticlesRender = (value, row) => {
		return (<Flex justify="start" gap={20}>
			<ConfigProvider>
				<Button
					type="text"
					icon={EditIcon}
					onClick={() => {
						setCategoryEdit((category.find((article) => article.id === row.id)));
						setModalCreateCategoryOpen(true)
					}}
					title='Изменить'
					></Button>
				<Button
					type="text"
					icon={DeleteIcon}
					onClick={() => setDeleteCategoryId(row.id)}
					title='Удалить'
				></Button>
			</ConfigProvider>
		</Flex>)
	}

	const categoryData = useMemo(() => {
		const columns = ARTICLES_COLUMNS.map((column, i) => {
			if (column.dataIndex == 'action'){
				column.render = actionArticlesRender
			}
			return ({ ...column, key: column.i })
		})
		let data = [];
		if (category){
			data = category.map((article) => ({...article, key: article.id}));
		}
		return {data, columns}
	}, [category]);

	const updateCategories = async () => {
		setLoading(true);
		setCategoryLoading(true);
		try {
			const res = await ServiceFunctions.getOperatingExpensesCategoryGetAll(authToken);
			console.log('updateCategories', res);
			setCategory(res.data);
		} catch(error) {
			console.error('updateCategories error', error);
			setCategory([]);
		} finally {
			setCategoryLoading(false);
			if (!firstLoad.current) {
				setLoading(false);
			}
		}
	}

	const updatePeriodicExpenses = async () => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.getAllOperatingExpensesExpense(authToken);
			console.log(res)
			setCosts(res.data)
		} catch(error) {
			console.error('updateExpenses error', error);
			setCosts([]);
		} finally {
			console.log('updateExpenses', !firstLoad.current)
			// if (!firstLoad.current) {
				setLoading(false);
			// }
		}
	}

	const updateExpenses = async () => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.getAllOperatingExpensesExpense(authToken);
			console.log(res)
			setCosts(res.data)
		} catch(error) {
			console.error('updateExpenses error', error);
			setCosts([]);
		} finally {
			console.log('updateExpenses', !firstLoad.current)
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
				updateCategories();
				updateExpenses();
			})
				.then(() => {
					console.log('promise ')
					firstLoad.current = false;
					setLoading(false);
				});
			return
		}

		if (view === 'costs'){
			console.log('updateCosts');
			updateExpenses();
		}
		
		if (view === 'category'){
			console.log('updateArticles');
			updateCategories();
		}
	}, [ activeBrand, selectedRange ])

	const modalCostHandlerClose = () => {
		setCreateCostOpen(false);
		setCostEdit(null);
		setCostCopy(null);
	};

	const modalArticleHandlerClose = () => {
		setModalCreateCategoryOpen(false);
		setCategoryEdit(null);
	};

	const modalHandler = () => {
		if (view === 'costs') {
			setCreateCostOpen(true);
			return;
		}
		setModalCreateCategoryOpen(true);
	};

	const createCategory = async (category) => {
		setCategoryLoading(true);
		console.log('createCategory', category)
		// setModalCreateCategoryOpen(false);
		try {
			const res = await ServiceFunctions.postOperatingExpensesCategoryCreate(authToken, category);
			console.log('createCategory', res);
			// 
			setCategory((list) => [...list, {...article, id: list.length + Math.ceil(Math.random() * 10)}])
			// 
		} catch(error) {
			console.error('createCategory error', error);
		} finally {
			setModalCreateCategoryOpen(false);
			setCategoryLoading(false);
		}
	}

	const editCategory = async (article) => {
		setLoading(true);
		setModalCreateCategoryOpen(false);
		try {
			const res = await ServiceFunctions.patchOperatingExpensesCategory();
			console.log('editCategory', article);
			// 
			setCategory((list) => list.map((el) => {
				if (el.id === article.id){
					return article
				}
				return el
			}))
			// 
		} catch(error) {
			console.error('createArticle error', error);
		} finally {
			setCategoryEdit(null);
			// if (!firstLoad.current) {
				setLoading(false);
			// }
		}
	}

	const handleCategory = (category) => {
		// setModalCreateCategoryOpen(false);
		if (!!categoryEdit){
			console.log('editArticle')
			editCategory(category);
			return
		}
		console.log('createArticle')
		createCategory(category);
		// setExpenses((category) => category.push(article) );
	};

	const handleCost = (cost) => {
		if (!!costEdit){
			console.log('editCost')
			editCost(cost);
			return
		}
		console.log('createCost')
		createCost(cost);
		// setExpenses((category) => category.push(article) );
	};

	const deleteCostHandler = async (id) => {
		console.log('delete cost');
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperatingExpensesExpense();
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
			const res = await ServiceFunctions.deleteOperatingExpensesCategory();
			// 
			setCategory((list) => list.filter((el) => el.id !== id));
			// 
			console.log('deleteArticleHandler', res);
		} catch(error) {
			console.error('deleteArticleHandler error', error);
		} finally {
			setDeleteCategoryId(null);
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
									onClick={() => { setView('category'); }}
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
								view === 'costs' ? costsData.columns : categoryData.columns
							}
							data={view === 'costs' ? costsData.data : categoryData.data}
							is_primary_collect={shopStatus?.is_primary_collect}
							virtual={false}
						/>
				</div>}

				{ createCostOpen && <CreateCost
					open={createCostOpen}
					onCancel={modalCostHandlerClose}
					createArticleOpen={setModalCreateCategoryOpen}
					category={category}
					zIndex={1000}
					edit={costEdit}
					copy={costCopy}
					// state={() => ('edit' && costEdit) || ('copy' && costCopy)}
					// data={costEdit || costCopy}
				/> }

				{ modalCreateCategoryOpen && <CreateCategory
					open={modalCreateCategoryOpen}
					onCancel={modalArticleHandlerClose}
					onSubmit={handleCategory}
					zIndex={1001}
					data={categoryEdit}
					confirmLoading={categoryLoading}
					loading={categoryLoading}
				/> }

				{deleteCostId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить расход?'}
					onCancel={() => setDeleteCostId(null)}
					onOk={() => deleteCostHandler(deleteCostId)}
				/>}

				{deleteCategoryId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить статью?'}
					onCancel={() => setDeleteCategoryId(null)}
					onOk={() => deleteArticleHandler(deleteCategoryId)}
				/>}

				{loading && <div className={styles.loading}>
					<span className='loader'></span>
				</div>}
			</section>
		</main>
	);
}
