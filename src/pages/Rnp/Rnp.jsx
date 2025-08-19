import React, { useMemo } from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { NoDataWidget } from '../productsGroupsPages/widgets';
import AddSkuModal from './widget/AddSkuModal/AddSkuModal';
import styles from './Rnp.module.css';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { Filters } from './widget/Filters/Filters';
import { COLUMNS, ROWS, renderFunction } from './config';
import { format } from 'date-fns';
import { ar, ru } from 'date-fns/locale';
import SkuList from './widget/SkuList/SkuList';
import ModalDeleteConfirm from '../../components/sharedComponents/ModalDeleteConfirm/ModalDeleteConfirm';
import DataCollectWarningBlock from '../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import SelfCostWarningBlock from '../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import { actions as rnpSelectedActions } from '../../redux/rnpSelected/rnpSelectedSlice'

export default function Rnp() {
	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange } = useAppSelector(
		(state) => state.filtersRnp
	);
	const filters = useAppSelector((state) => state.filtersRnp);
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
	const [addSkuModalShow, setAddSkuModalShow] = useState(false);
	const [dateRange, setDateRange] = useState(null);
	const [page, setPage] = useState(1);
	const [paginationState, setPaginationState] = useState(null);
	const [view, setView] = useState('sku');
	const [skuDataByArticle, setSkuDataByArticle] = useState(null);
	const [skuDataTotal, setSkuDataTotal] = useState(null)

	const [deleteSkuId, setDeleteSkuId] = useState(null);

	const [skuSelectedList, setSkuSelectedList] = useState([]);

	const dispatch = useAppDispatch();

	const updateSkuListByArticle = async () => {
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.postRnpByArticle(
					authToken,
					selectedRange,
					activeBrand.id,
					filters,
					page,
					dateRange
				);
				dataToSkuList(response);
				dispatch(rnpSelectedActions.setList(response?.data?.map((article) => article.article_data.wb_id)));
			}
		} catch (error) {
			console.error('updateSkuListByArticle error', error)
		} finally {
			setLoading(false);
		}
	};

	const updateSkuListSummary = async () => {
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.postRnpSummary(
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
			console.error('updateSkuListSummary error', error)
		} finally {
			setLoading(false);
		}
	};

	const deleteSku = async (id) => {
		setDeleteSkuId(null);
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.deleteRnpId(
					authToken,
					id
				);
			}
		} catch (error) {
			console.error('deleteSku error', error)
		} finally {
			setPage(1);
			updateSkuListByArticle();
		}
	}

	const dataToSkuList = (response) => {
		const list = response.data.map((article, i) => {
			// for (const article of response.data){
			const item = {
				table: {
					columns: [],
					rows: [],
				},
				article_data: article.article_data,
			};
			// сборка колонок по датам из ответа
			for (const column of COLUMNS){
				item.table.columns.push(column)
			}
			for (const dateData of article.by_date_data) {
				item.table.columns.push({
					key: dateData.date,
					dataIndex: dateData.date,
					title: format(dateData.date, 'd MMMM', { locale: ru }),
					width: 160,
					render: renderFunction
				});
			}
			// сборка суммарных значений
			for (const row of ROWS) {
				const rowItem = {
					key: row.key,
					period: row.period,
				};
				const dataRow = article.summary_data[row.key];
				rowItem['sum'] = dataRow[row.key.slice(0, -5)];
				// rowItem['sum'] = article.article_data.wb_id;
				if (row.children) {
					rowItem.children = [];
					for (const childrenRow of row.children) {
						const rowItemChildren = {};
						rowItemChildren.key = `${row.key}_${childrenRow.dataIndex}`;
						rowItemChildren.dataIndex = childrenRow.dataIndex;
						rowItemChildren.period = childrenRow.period;
						rowItemChildren['sum'] = dataRow[childrenRow.dataIndex];
						rowItem.children.push(rowItemChildren);
					}
				}
				item.table.rows.push(rowItem);
			}
			// сборка данных по датам
			for (const dateData of article.by_date_data) {
				const date = dateData.date;
				for (const row of item.table.rows) {
					const dataRow = dateData.rnp_data;
					row[date] = dataRow[row.key][row?.key?.slice(0, -5)];
					// row[date] = article.article_data.wb_id
					if (row.children) {
						for (const childrenRow of row.children) {
							childrenRow[date] = dataRow[row.key][childrenRow.dataIndex];
							// childrenRow[date] = childrenRow.key
						}
					}
				}
			}

			return item;
		});

		setSkuSelectedList(list.map((sku) => sku.article_data.wb_id));
		setSkuDataByArticle(list);
		setPaginationState({
			total: response.total_count,
			pageSize: response.per_page
		})
	};

	const dataToSkuTotalList = (response) => {
		const article = response.data;
		const item = {
				table: {
					columns: [],
					rows: [],
				},
				article_data: article.article_data,
			};
			// сборка колонок по датам из ответа
			for (const column of COLUMNS){
				item.table.columns.push(column)
			}
			for (const dateData of article.by_date_data) {
				item.table.columns.push({
					key: dateData.date,
					dataIndex: dateData.date,
					title: format(dateData.date, 'd MMMM', { locale: ru }),
					width: 160,
					render: renderFunction
				});
			}
			// сборка суммарных значений
			for (const row of ROWS) {
				const rowItem = {
					key: row.key,
					period: row.period,
				};
				const dataRow = article.summary_data[row.key];
				rowItem['sum'] = dataRow[row.key.slice(0, -5)];
				// rowItem['sum'] = article.article_data.wb_id;
				if (row.children) {
					rowItem.children = [];
					for (const childrenRow of row.children) {
						const rowItemChildren = {};
						rowItemChildren.key = `${row.key}_${childrenRow.dataIndex}`;
						rowItemChildren.dataIndex = childrenRow.dataIndex;
						rowItemChildren.period = childrenRow.period;
						rowItemChildren['sum'] = dataRow[childrenRow.dataIndex];
						rowItem.children.push(rowItemChildren);
					}
				}
				item.table.rows.push(rowItem);
			}
			// сборка данных по датам
			for (const dateData of article.by_date_data) {
				const date = dateData.date;
				for (const row of item.table.rows) {
					const dataRow = dateData.rnp_data;
					row[date] = dataRow[row.key][row?.key?.slice(0, -5)];
					// row[date] = article.article_data.wb_id
					if (row.children) {
						for (const childrenRow of row.children) {
							childrenRow[date] = dataRow[row.key][childrenRow.dataIndex];
							// childrenRow[date] = childrenRow.key
						}
					}
				}
			}

		setSkuDataTotal(item);
	};

	const deleteHandler = (value) => {
		deleteSku(value)
	}
	
	const addSkuList = async (porductIds) => {
		setLoading(true);
		try {
			if (!!activeBrand) {
				const response = await ServiceFunctions.postUpdateRnpProducts(
					authToken,
					porductIds
				);
			}
		} catch (error) {
			console.error('addSkuList error', error)
		} finally {
			setPage(1);
			updateSkuListByArticle();
		}
	};

	const viewHandler = (value) => {
		setLoading(true);
		setView(value);
	}

	useEffect(() => {
		if (activeBrand && activeBrand.is_primary_collect) {
			if (view === 'sku'){
				updateSkuListByArticle();
				return
			}
			updateSkuListSummary();
		}
		if (activeBrand && !activeBrand?.is_primary_collect){
			setLoading(false)
		}
	}, [activeBrand, shopStatus, shops, filters, page, view, selectedRange]);

	const addSkuHandler = (list) => {
		setAddSkuModalShow(false);
		addSkuList(list);
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
					<Header title="Рука на пульсе"></Header>
				</div>

				{loading && (
					<div className={styles.loading}>
						<div className={styles.loading__loader}>
							<span className="loader"></span>
						</div>
					</div>
				)}

				<div style={{display: 'none'}}>
					<Filters />
				</div>
				
				{!loading  && shopStatus && !shopStatus?.is_primary_collect && (
					<>
						<div><Filters /></div>
						<DataCollectWarningBlock
							title='Ваши данные еще формируются и обрабатываются.'
						/>
					</>
				)}

				{!loading && shopStatus && shopStatus?.is_primary_collect && skuDataByArticle?.length > 0 && (
					<SkuList
						view={view}
						setView={viewHandler}
						setAddSkuModalShow={setAddSkuModalShow}
						skuDataByArticle={skuDataByArticle}
						skuDataTotal={skuDataTotal}
						setDeleteSkuId={setDeleteSkuId}
						addSku={addSkuHandler}
						page={page}
						setPage={setPage}
						paginationState={paginationState}
					/>
				)}

				{!loading && skuDataByArticle?.length === 0 &&
					<NoDataWidget
						mainTitle='Здесь пока нет ни одного артикула'
						mainText='Добавьте артикулы для отчета «Рука на пульсе»'
						buttonTitle='Добавить'
						action={() => setAddSkuModalShow(true)}
						howLinkGroup={false}
					/>
				}

				{addSkuModalShow && <AddSkuModal
					isAddSkuModalVisible={addSkuModalShow}
					setIsAddSkuModalVisible={setAddSkuModalShow}
					addSku={addSkuHandler}
					skuDataArticle={skuDataByArticle}
					skuList={skuSelectedList}
				/>}

				{deleteSkuId && <ModalDeleteConfirm
					title={'Удалить данный артикул?'}
					onCancel={() => setDeleteSkuId(null)}
					onOk={() => deleteHandler(deleteSkuId)}
				/>}
			</section>
		</main>
	);
}
