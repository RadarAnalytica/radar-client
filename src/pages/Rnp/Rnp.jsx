import React, { useMemo } from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { NoDataWidget } from '../productsGroupsPages/widgets';
import AddSkuModal from './widget/AddSkuModal/AddSkuModal';
import styles from './Rnp.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import downloadIcon from '../images/Download.svg';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import { COLUMNS, RESPONSE_BY_ARTICLE, ROWS } from './config';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ConfigProvider, Button, Flex } from 'antd';
import { grip, remove, expand } from './widget/icons';
import SkuItem from './widget/SkuItem/SkuItem';
import SkuTable from './widget/SkuTable/SkuTable';
import { fetchShops } from '../../redux/shops/shopsActions';
import { fetchFilters } from '../../redux/apiServicePagesFiltersState/filterActions';

export default function Rnp() {
	const dispatch = useAppDispatch()
	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange, shops } = useAppSelector(
		(state) => state.filters
	);
	const filters = useAppSelector((state) => state.filters);
	
	// const filters = useAppSelector((state) => state.filters);
	// const { shops } = useAppSelector((state) => state.shopsSlice);
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
	const [addSkuModalShow, setAddSkuModalShow] = useState(false);
	const [dateRange, setDateRange] = useState(null);
	const [page, setPage] = useState(1);
	const [columnsList, setColumnsList] = useState(COLUMNS);
	const [view, setView] = useState('sku');
	const [expanded, setExpanded] = useState(null);
	const [skuDataByArticle, setSkuDataByArticle] = useState(null);
	const [skuDataTotal, setSkuDataTotal] = useState(null)

	useEffect(() => {
		if (skuDataByArticle?.length > 0 && view === 'sku') {
			setExpanded(skuDataByArticle[0].id);
		}
	}, [skuDataByArticle]);

	const updateSkuListByArticle = async () => {
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.getRnpByArticle(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					page,
					dateRange
				);
				dataToSkuList(response);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const updateSkuListSummary = async () => {
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.getRnpSummary(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					page,
					dateRange
				);
				dataToSkuTotalList(response);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const dataToSkuList = (response) => {
		const list = response.data.map((article, i) => {
			// for (const article of response.data){
			const item = {
				table: {
					columns: [...COLUMNS],
					rows: [...ROWS],
				},
				article_data: article.article_data || null,
			};
			// сборка колонок по датам из ответа
			for (const dateData of article.by_date_data) {
				item.table.columns.push({
					key: dateData.date,
					dataIndex: dateData.date,
					title: format(dateData.date, 'd MMMM', { locale: ru }),
					width: 90,
				});
			}
			// сборка суммарных значений
			for (const row of item.table.rows) {
				const dataRow = article.summary_data[row.key];
				row['sum'] = dataRow[row?.key?.slice(0, -5)];
				if (row.children) {
					for (const childrenRow of row.children) {
						childrenRow.key = `${row.key}_${childrenRow.dataIndex}`;
						childrenRow['sum'] = dataRow[childrenRow.dataIndex];
					}
				}
			}
			// сборка данных по датам
			for (const dateData of article.by_date_data) {
				const date = dateData.date;
				for (const row of item.table.rows) {
					const dataRow = dateData.rnp_data;
					row[date] = dataRow[row.key][row?.key?.slice(0, -5)];
					if (row.children) {
						for (const childrenRow of row.children) {
							childrenRow[date] =
								dataRow[row.key][childrenRow.dataIndex];
						}
					}
				}
			}

			return item;
		});

		setSkuDataByArticle(list);
	};

	const dataToSkuTotalList = (response) => {
		const article = response.data;
		const item = {
			table: {
				columns: [...COLUMNS],
				rows: [...ROWS],
			}
		};
		// сборка колонок по датам из ответа
		for (const dateData of article.by_date_data) {
			item.table.columns.push({
				key: dateData.date,
				dataIndex: dateData.date,
				title: format(dateData.date, 'd MMMM', { locale: ru }),
				width: 90,
			});
		}
		// сборка суммарных значений
		for (const row of item.table.rows) {
			const dataRow = article.summary_data[row.key];
			row['sum'] = dataRow[row?.key?.slice(0, -5)];
			if (row.children) {
				for (const childrenRow of row.children) {
					childrenRow.key = `${row.key}_${childrenRow.dataIndex}`;
					childrenRow['sum'] = dataRow[childrenRow.dataIndex];
					// console.log('childrenRow', childrenRow.key)
				}
			}
		}
		// сборка данных по датам
		for (const dateData of article.by_date_data) {
			const date = dateData.date;
			for (const row of item.table.rows) {
				const dataRow = dateData.rnp_data;
				row[date] = dataRow[row.key][row?.key?.slice(0, -5)];
				if (row.children) {
					for (const childrenRow of row.children) {
						childrenRow[date] =
							dataRow[row.key][childrenRow.dataIndex];
					}
				}
			}
		}

		setSkuDataTotal(item);
	};

	const expandHandler = (value) => {
		setExpanded((id) => id !== value ? value : null)
	}
	
	const removeHandler = (value) => {
		console.log('removeHandler', value)
		// setSkuList((list) => list.filter((el) => el.id !== value))
	}

	useEffect(() => {
		if (activeBrand && activeBrand.is_primary_collect) {
			if (view === 'sku'){
				updateSkuListByArticle();
				return
			}
			updateSkuListSummary();
		}
	}, [activeBrand, shopStatus, shops, filters, page, view]);

	

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
					<Header title="Рука на пульсе"></Header>
				</div>

				<div style={{display: 'none'}}>
					<Filters />
				</div>

				{loading && (
					<div className={styles.loading}>
						<span className="loader"></span>
					</div>
				)}

				{/* {!loading && shopStatus && !shopStatus?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}
				{!loading && !shopStatus?.is_primary_collect && (
						<DataCollectWarningBlock
								title='Ваши данные еще формируются и обрабатываются.'
						/>
				)} */}

				{/* {!loading && skuList?.length !== 0 && (
					<SkuList data={skuList} setAddSkuModalShow={setAddSkuModalShow} setSkuList={setSkuList} />
					)} */}

				{!loading && !!skuDataByArticle && (
					<>
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
										paddingBlockLG: 10,
										paddingInlineLG: 20,
										controlHeightLG: 45,
										defaultShadow: false,
										contentFontSize: 16,
										fontWeight: 500,
										defaultBorderColor: 'transparent',
										defaultColor: 'rgba(26, 26, 26, 0.5)',
										defaultBg: 'transparent',
										defaultHoverBg: '#EEEAFF',
										defaultHoverColor: '#1a1a1a',
										defaultHoverBorderColor: 'transparent',
										defaultActiveColor:
											'rgba(26, 26, 26, 1)',
										defaultActiveBg: '#EEEAFF',
										defaultActiveBorderColor: '#EEEAFF',
									},
								},
							}}
						>
							<Flex justify="space-between">
								<Flex>
									<Button
										type={
											view === 'sku'
												? 'primary'
												: 'default'
										}
										size="large"
										onClick={() => {
											// setSkuList(null);
											setView('sku');
										}}
									>
										По артикулам
									</Button>
									<Button
										type={
											view === 'total'
												? 'primary'
												: 'default'
										}
										size="large"
										onClick={() => {
											// setSkuList(null);
											setView('total');
										}}
									>
										Сводный
									</Button>
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
											},
										},
									}}
								>
									<Button
										type="primary"
										size="large"
										onClick={setAddSkuModalShow}
									>
										Добавить артикул
									</Button>
								</ConfigProvider>
							</Flex>
						</ConfigProvider>
						<div>
							<Filters timeSelect={false}/>
						</div>
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
										paddingBlockLG: 10,
										paddingInlineLG: 20,
										controlHeightLG: 45,
										defaultShadow: false,
										contentFontSize: 16,
										fontWeight: 500,
										defaultBorderColor: 'transparent',
										defaultColor: 'rgba(26, 26, 26, 0.5)',
										defaultBg: 'transparent',
										defaultHoverBg: '#EEEAFF',
										defaultHoverColor: '#1a1a1a',
										defaultHoverBorderColor: 'transparent',
										defaultActiveColor:
											'rgba(26, 26, 26, 1)',
										defaultActiveBg: '#EEEAFF',
										defaultActiveBorderColor: '#EEEAFF',
									},
								},
							}}
						>
							{view === 'sku' && (
								<>
									{skuDataByArticle?.map((el, i) => (
										<div key={i} className={styles.item}>
											<header
												className={styles.item__header}
											>
												<Flex gap={20} align="center">
													<Button
														className={
															styles.item__button
														}
														icon={grip}
													/>
													<div
														className={
															styles.item__product
														}
													>
														<SkuItem
															title={
																el.article_data
																	.title
															}
															photo={
																el.article_data
																	.photo
															}
															sku={
																el.article_data
																	.wb_id
															}
															shop={
																el.article_data
																	.shop_name
															}
														/>
													</div>
													<Button
														className={
															styles.item__button
														}
														onClick={() =>
															removeHandler(el.article_data.product_id)
														}
														icon={remove}
													/>
													<Button
														className={`${
															styles.item__button
														} ${
															expanded ===
																el.id &&
															styles.item__button_expand
														}`}
														value={el.id}
														onClick={() =>
															expandHandler(el.id)
														}
														icon={expand}
													></Button>
												</Flex>
											</header>
											{expanded === el.id && (
												<div
													className={`${styles.item__table} ${styles.item}`}
												>
													<SkuTable
														data={el.table.rows}
														columns={
															el.table.columns
														}
														defaultExpandAllRows={
															view === 'sku'
														}
													/>
												</div>
											)}
										</div>
									))}
								</>
							)}
							{view === 'total' && (
								<div className={styles.item}>
									<SkuTable
										// data={null}
										data={skuDataTotal?.table?.rows}
										// columns={null}
										columns={skuDataTotal?.table?.columns}
										defaultExpandAllRows={false}
									/>
								</div>
							)}
						</ConfigProvider>
					</>
				)}
				{!loading && skuDataByArticle?.length === 0 &&
					<NoDataWidget
						mainTitle='Здесь пока нет ни одного артикула'
						mainText='Добавьте артикулы для отчета «Рука на пульсе»'
						buttonTitle='Добавить'
						action={() => setAddSkuModalShow(true)}
						how={false}
					/>
				}

				<AddSkuModal
					isAddSkuModalVisible={addSkuModalShow}
					setIsAddSkuModalVisible={setAddSkuModalShow}
					addSku={console.log}
					skuDataArticle={skuDataByArticle}
				/> 
			</section>
		</main>
	);
}
