import React, { useMemo } from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import { ConfigProvider, Button, Popover, Flex } from 'antd';
import styles from './OperationsCosts.module.css';
import ReportTable from '../../components/sharedComponents/ReportTable/ReportTable';
import { useAppSelector } from '../../redux/hooks';
import { COSTS_COLUMNS, ARTICLES_COLUMNS } from './columnsConfig';
import ModalCreateCost from './widgets/modals/ModalCreateCost';
import ModalCreateArticle from './widgets/modals/ModalCreateArticle';

export default function OperationsCosts() {
	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange, filters } = useAppSelector(
		(state) => state.filters
	);
	const { shops } = useAppSelector((state) => state.shopsSlice);
	const brands = useMemo(() => {
		if (!filters){
			return
		}
		return filters.reduce((res, el) => {
			return res.concat(el?.brands?.data)
		}, [])
	}, [filters]);
	
	const sku = useMemo(() => {
		if (!filters){
			return
		}
		return filters.reduce((res, el) => {
			return res.concat(el?.articles?.data)
		}, [])
	}, [filters]);

	console.log('brands', brands)
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
	console.log(filters)
	const [loading, setLoading] = useState(false);
	const [contentCosts, setContentCosts] = useState(true);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const [modalCreateCostOpen, setModalCreateCostOpen] = useState(false);
	const [modalCreateArticleOpen, setModalCreateArticleOpen] = useState(false);

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
			const data = costs.filter((el) => el?.key !== 'summary');
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
		const [articles, setArticles] = useState([
			{
				title: 'article',
			},
		]);
		console.log('articles', articles)
			const articlesData = useMemo(() => {
				const data = articles.map((el, i) => ({
					key: i,
					title: el.title
				}));


				return data;
			}, [articles]);

	const modalCostHandlerClose = () => {
		setModalCreateCostOpen(false);
	};

	const modalArticleHandlerClose = () => {
		setModalCreateArticleOpen(false);
	};

	const modalHandler = () => {
		if (contentCosts) {
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

	console.log('brands', brands)
	console.log('sku', sku)

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
					<Header title="Операционные расходы"></Header>
				</div>
				<Flex justify="space-between">
					<ConfigProvider
						theme={{
							token: {
								fontFamily: '"Mulish", "Arial", sans-serif',
								colorPrimary: 'rgba(83, 41, 255, 0.1)',
								defaultBorderColor: 'transparent',
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
									defaultActiveBg: 'rgba(83, 41, 255, 0.3)',
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
								type={contentCosts ? 'primary' : 'default'}
								onClick={() => {
									setContentCosts(true);
								}}
							>
								Расходы
							</Button>
							<Button
								size="large"
								type={contentCosts ? 'default' : 'primary'}
								onClick={() => {
									setContentCosts(false);
								}}
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
										paddingInlineLG: 9.5,
										defaultShadow: false,
										controlHeightLG: 45,
										paddingInlineLG: 16,
										fontWeight: 600,
									},
								},
							}}
						>
							{contentCosts && (
								<Popover
									arrow={false}
									content={'Как загрузить'}
									trigger="click"
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
				{/* {!loading && shopStatus && !shopStatus?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}
				{!loading && !shopStatus?.is_primary_collect && (
					<DataCollectWarningBlock title="Ваши данные еще формируются и обрабатываются." />
				)} */}
				<div className={styles.controls}>
					<div className={styles.filter}>
						<Filters
							timeSelect={false}
							setLoading={setLoading}
							shopSelect={false}
							// brandSelect={false}
							// articleSelect={false}
							// groupSelect={false}
						/>
					</div>
					<div className={styles.btns}></div>
				</div>
				{/* {shopStatus?.is_primary_collect && ( */}
				{!loading && <div className={styles.container}>
					<div className={styles.tableContainer}>
						<ReportTable
							// virtual={false}
							loading={loading}
							columns={
								contentCosts ? COSTS_COLUMNS : ARTICLES_COLUMNS
							}
							data={contentCosts ? costsData : articlesData}
						/>
					</div>
				</div>}
				{/* )} */}
				{ modalCreateCostOpen && <ModalCreateCost
					open={modalCreateCostOpen}
					onCancel={modalCostHandlerClose}
					createArticleOpen={setModalCreateArticleOpen}
					shops={shops}
					brands={brands}
					sku={sku}
					articles={articles}
					zIndex={1000}
				/> }
				{ modalCreateArticleOpen && <ModalCreateArticle
					open={modalCreateArticleOpen}
					onCancel={modalArticleHandlerClose}
					onSubmit={addArticle}
					zIndex={1001}
				/> }
				{loading && <div className={styles.loading}>
					<span className='loader'></span>
				</div>}
			</section>
		</main>
	);
}
