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
import { ServiceFunctions } from '../../service/serviceFunctions';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import { COLUMNS, ROWS } from './config';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import SkuList from './widget/SkuList/SkuList';
import ModalDeleteConfirm from '../../components/sharedComponents/ModalDeleteConfirm/ModalDeleteConfirm';

export default function Rnp() {
	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange } = useAppSelector(
		(state) => state.filters
	);
	const filters = useAppSelector((state) => state.filters);
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
	const [view, setView] = useState('sku');
	const [skuDataByArticle, setSkuDataByArticle] = useState(null);
	const [skuDataTotal, setSkuDataTotal] = useState(null)

	const [deleteSkuId, setDeleteSkuId] = useState(null);

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
		} finally {
			setLoading(false);
		}
	}

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
					width: 110,
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
				width: 110,
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
				dataToSkuList(response);
			}
		} catch (error) {
		} finally {
			setLoading(false);
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
	}, [activeBrand, shopStatus, shops, filters, page, view]);

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

				<div style={{display: 'none'}}>
					<Filters />
				</div>

				{loading && (
					<div className={styles.loading}>
						<div className={styles.loading__loader}>
							<span className="loader"></span>
						</div>
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

				{!loading && skuDataByArticle?.length > 0 && (
					<SkuList
						view={view}
						setView={viewHandler}
						setAddSkuModalShow={setAddSkuModalShow}
						skuDataByArticle={skuDataByArticle}
						skuDataTotal={skuDataTotal}
						setDeleteSkuId={deleteSku}
						addSku={addSkuHandler}
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

				<AddSkuModal
					isAddSkuModalVisible={addSkuModalShow}
					setIsAddSkuModalVisible={setAddSkuModalShow}
					addSku={addSkuHandler}
					skuDataArticle={skuDataByArticle}
				/> 

				{deleteSkuId && <ModalDeleteConfirm
					title={'Удалить данный артикул?'}
					onCancel={() => setDeleteSkuId(null)}
					onOk={() => deleteHandler(deleteSkuId)}
				/>}
			</section>
		</main>
	);
}
