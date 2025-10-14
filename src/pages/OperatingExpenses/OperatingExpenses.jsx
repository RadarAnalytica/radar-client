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
import { EXPENSE_COLUMNS, CATEGORY_COLUMNS } from './config/config';
import ExpenseMainModal from './features/CreateExpense/expenseMainModal';
import ModalCreateCategory from './features/CreateCategory/CreateCategory';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from './shared/Icons';
import TableWidget from './widgets/table/tableWidget';
export default function OperatingExpenses() {

	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange, shops } = useAppSelector((state) => state.filters);

	const firstLoad = useRef(true);
	const [loading, setLoading] = useState(true);
	const [view, setView] = useState('expense'); // costs | category
	// const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const [modalCreateExpenseOpen, setModalCreateExpenseOpen] = useState(false);
	const [modalCreateCategoryOpen, setModalCreateCategoryOpen] = useState(false);

	const [deleteExpenseId, setDeleteExpenseId] = useState(null);
	const [deleteCategoryId, setDeleteCategoryId] = useState(null);

	const [expense, setExpense] = useState([]);
	const [expenseEdit, setExpenseEdit] = useState(null);
	const [highlightedExpenseId, setHighlightedExpenseId] = useState(null);


	const expenseData = useMemo(() => {
		const columns = EXPENSE_COLUMNS.map((column, i) => {
			return ({ ...column, key: column.i })
		})

		let data = expense?.map((item) => ({
			...item,
			key: item.id,
			expense_categories: item.expense_categories.map((el) => el.name).join(', ')
		}));

		const result = {
			key: 'summary',
			date: 'Итого:',
			value: data.reduce((value, el) => (value += el.value), 0) || '-',
			description: '-',
			expense_categories: '-',
			vendor_code: '-',
			brand_name: '-',
			shop: '-',
			action: '-',
		};
		data.unshift(result);
		return { data, columns };
	}, [expense]);

	const [categoryEdit, setCategoryEdit] = useState(null);
	const [category, setCategory] = useState([]);
	const [categoryLoading, setCategoryLoading] = useState(false);

	const categoryData = useMemo(() => {
		const columns = CATEGORY_COLUMNS.map((column, i) => {
			return ({ ...column, key: column.i })
		})
		let data = [];
		if (category) {
			data = category.map((article) => ({ ...article, key: article.id }));
		}
		return { data, columns }
	}, [category]);

	const updateCategories = async () => {
		setLoading(true);
		setCategoryLoading(true);
		try {
			const res = await ServiceFunctions.getOperatingExpensesCategoryGetAll(authToken);
			// console.log('updateCategories', res);
			setCategory(res.data);
		} catch (error) {
			// console.error('updateCategories error', error);
			setCategory([]);
		} finally {
			setCategoryLoading(false);
			if (!firstLoad.current) {
				setLoading(false);
			}
		}
	};

	const updatePeriodicExpenses = async () => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.getAllOperatingExpensesExpense(authToken);
			console.log(res)
			setExpense(res.data)
		} catch (error) {
			console.error('updateExpenses error', error);
			setExpense([]);
		} finally {
			console.log('updateExpenses', !firstLoad.current);
			// if (!firstLoad.current) {
			setLoading(false);
			// }
		}
	};

	const updateExpenses = async () => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.getOperatingExpensesExpenseGetAll(authToken);
			console.log(res)
			setExpense(res.data)
			return
		} catch (error) {
			console.error('updateExpenses error', error);
			setExpense([]);
		} finally {
			console.log('updateExpenses', !firstLoad.current);
			if (!firstLoad.current) {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (!activeBrand && !activeBrand?.is_primary_collect) {
			return
		}

		if (firstLoad.current) {
			updateCategories().then(() => {
				updateExpenses();
			}).then(() => {
				console.log('promise ')
				firstLoad.current = false;
				setLoading(false);
			});
			return
		}

		if (view === 'expense') {
			console.log('updateCosts');
			updateExpenses();
		}

		if (view === 'category') {
			console.log('updateArticles');
			updateCategories();
		}
	}, [activeBrand, selectedRange])

	const modalExpenseHandlerClose = () => {
		setModalCreateExpenseOpen(false);
		setExpenseEdit(null);
	};

	const modalCategoryHandlerClose = () => {
		setModalCreateCategoryOpen(false);
		setCategoryEdit(null);
	};

	const modalHandler = () => {
		if (view === 'expense') {
			setModalCreateExpenseOpen(true);
			return;
		}
		setModalCreateCategoryOpen(true);
	};

	const createCategory = async (category) => {
		setCategoryLoading(true);
		// console.log('createCategory', category)
		// setModalCreateCategoryOpen(false);
		try {
			const res = await ServiceFunctions.postOperatingExpensesCategoryCreate(authToken, category);
			// console.log('createCategory', res);
			// 
			setCategory((list) => [...list, res])
			// 
		} catch (error) {
			console.error('createCategory error', error);
		} finally {
			setModalCreateCategoryOpen(false);
			setCategoryLoading(false);
		}
	};

	const editCategory = async (category) => {
		setLoading(true);
		setModalCreateCategoryOpen(false);
		try {
			const res = await ServiceFunctions.patchOperatingExpensesCategory(authToken, category);
			//
			setCategory((list) => list.map((el) => {
				if (el.id === category.id) {
					return category
				}
				return el
			}))
			// 
		} catch (error) {
			console.error('createArticle error', error);
		} finally {
			setCategoryEdit(null);
			// if (!firstLoad.current) {
			setLoading(false);
			// }
		}
	};

	const handleCategory = (category) => {
		setModalCreateCategoryOpen(false);
		if (!!categoryEdit) {
			console.log('editCategory')
			const editedCategory = { ...categoryEdit, ...category }
			editCategory(editedCategory);
			return;
		}
		createCategory(category);
		// setExpenses((category) => category.push(article) );
	};

	const handleExpanse = (expense) => {
		console.log('handleExpanse', expense)
		if (!!expenseEdit) {
			editExpanse(expense);
			return;
		}
		createExpense(expense);
		// setExpenses((category) => category.push(article) );
	};

	const createExpense = async (expense) => {
		setCategoryLoading(true);
		// console.log('createCategory', category)
		// setModalCreateCategoryOpen(false);
		console.log('createExpense', expense);
		try {
			const res = await ServiceFunctions.postOperatingExpensesExpenseCreate(authToken, expense);
			// console.log('createCategory', res);
			// 
			setExpense((list) => [...list, res])
			// 
		} catch (error) {
			console.error('createCategory error', error);
		} finally {
			setModalCreateExpenseOpen(false);
			setCategoryLoading(false);
		}
	}



	const copyExpense = async (expenseId) => {
		try {
			let expenseToCopy = expense.find((item) => item.id === expenseId);
			console.log('expenseToCopy', expenseToCopy)
			if (!expenseToCopy) {
				console.error('Expense not found');
				return;
			}

			// Prepare expense data for copying (remove id and any timestamps)
			const { id, created_at, updated_at, ...expenseData } = expenseToCopy;

			// Transform expense_categories: extract IDs if it's an array of objects
			if (expenseData.expense_categories && Array.isArray(expenseData.expense_categories)) {
				expenseData.expense_categories = expenseData.expense_categories.map(cat => 
					typeof cat === 'object' ? cat.id : cat
				);
			}

			// Transform shop, vendor_code, brand_name: extract IDs if they are objects/arrays
			if (expenseData.shop) {
				expenseData.shop = Array.isArray(expenseData.shop) 
					? expenseData.shop.map(s => s.id || s)
					: [expenseData.shop.id || expenseData.shop];
			}
			if (expenseData.vendor_code) {
				expenseData.vendor_code = Array.isArray(expenseData.vendor_code)
					? expenseData.vendor_code.map(v => v.id || v)
					: [expenseData.vendor_code.id || expenseData.vendor_code];
			}
			if (expenseData.brand_name) {
				expenseData.brand_name = Array.isArray(expenseData.brand_name)
					? expenseData.brand_name.map(b => b.id || b)
					: [expenseData.brand_name.id || expenseData.brand_name];
			}

			const res = await ServiceFunctions.postOperatingExpensesExpenseCreate(authToken, expenseData);
			console.log('copyExpense result', res);

			// Add new expense to the list
			setExpense((list) => [...list, res]);

			// Highlight the new expense
			setHighlightedExpenseId(res.id);
			console.log('Highlighted expense ID:', res.id);

			// Remove highlight after 2 seconds
			setTimeout(() => {
				setHighlightedExpenseId(null);
			}, 2000);
		} catch (error) {
			console.error('copyExpense error', error);
		}
	}

	const deleteExpense = async (id) => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperatingExpensesExpenseDelete(authToken, id);
			//
			setExpense((list) => list.filter((el) => el.id !== id));
			// 
		} catch (error) {
			console.error('deleteExpense error', error);
		} finally {
			setDeleteExpenseId(null);
			setLoading(false);
		}
	}

	const deletePeriodicExpense = async (id) => {
		console.log('delete cost');
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperatingExpensesExpense();
			//
			setExpense((list) => list.filter((el) => el.id !== id));
			//
			console.log('deleteExpense', res);
		} catch (error) {
			console.error('deleteExpense error', error);
		} finally {
			setDeleteExpenseId(null);
			setLoading(false);
		}
	};

	const deleteCategoryHandler = async (id) => {
		console.log('deleteCategoryHandler');
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperatingExpensesCategory(authToken, id);
			//
			console.log('id', id);
			setCategory((list) => list.filter((el) => el.id !== id));
			// 
		} catch (error) {
			console.error('deleteCategoryHandler error', error);
		} finally {
			setDeleteCategoryId(null);
			setLoading(false);
		}
	};

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
						howToLink={'/'}
						howToLinkText={'Как загрузить?'}
					/>
				</div>

				{/*
				{!loading && activeBrand && !activeBrand?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}
				*/}

				{!loading && (
					<Flex justify="space-between">
						<Flex gap={4} align="center">
							<button
								className={view === 'expense' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
								onClick={() => { setView('expense'); }}
								style={{ fontWeight: 500, fontSize: 14 }}
							>
								Расходы
							</button>
							<button
								className={view === 'category' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
								onClick={() => { setView('category'); }}
								style={{ fontWeight: 500, fontSize: 14 }}
							>
								Статьи
							</button>
						</Flex>
						<Flex align="center" justify="flex-end" gap={11}>
							<ConfigProvider
								theme={{
									token: {
										colorPrimary: '#5329ff',
										colorText: '#fff',
										controlHeightLG: 38,
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
									onClick={modalHandler}
									style={{ fontWeight: 600, fontSize: 14 }}
								>
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M9 1V9M9 17V9M9 9H1H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>

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
						monthSelect={false}
						monthHandler={null}
						monthValue={null}
						tempPageCondition={null}
					// operationCostsArticles={true}
					// operationCostsArticlesData={[]}
					// operationCostsArticlesHandler={}
					/>
				</div>

				{!loading && shops && activeBrand && !activeBrand?.is_primary_collect && (
					<DataCollectWarningBlock />
				)}

				{!loading && activeBrand && activeBrand?.is_primary_collect && view === 'expense' &&
					<div className={styles.container}>
						<TableWidget
							loading={loading}
							columns={EXPENSE_COLUMNS}
							data={expenseData.data}
							setExpenseEdit={setExpenseEdit}
							setModalCreateExpenseOpen={setModalCreateExpenseOpen}
							setDeleteExpenseId={setDeleteExpenseId}
							copyExpense={copyExpense}
							highlightedExpenseId={highlightedExpenseId}
							tableType='expense'
						/>
					</div>
				}
				{!loading && activeBrand && activeBrand?.is_primary_collect && view === 'category' &&
					<div className={styles.container}>
						<TableWidget
							loading={loading}
							columns={CATEGORY_COLUMNS}
							data={categoryData.data}
							tableType='category'
							setCategoryEdit={setCategoryEdit}
							setModalCreateCategoryOpen={setModalCreateCategoryOpen}
							setDeleteCategoryId={setDeleteCategoryId}
						/>
					</div>
				}

				{modalCreateExpenseOpen && <ExpenseMainModal
					open={modalCreateExpenseOpen}
					onCancel={modalExpenseHandlerClose}
					setModalCreateCategoryOpen={setModalCreateCategoryOpen}
					category={category}
					zIndex={1000}
					handle={handleExpanse}
					editData={expenseEdit}
				/>}

				{modalCreateCategoryOpen && <ModalCreateCategory
					open={modalCreateCategoryOpen}
					onCancel={modalCategoryHandlerClose}
					onSubmit={handleCategory}
					zIndex={1001}
					data={categoryEdit}
					confirmLoading={categoryLoading}
					loading={categoryLoading}
				/>}

				{deleteExpenseId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить расход?'}
					onCancel={() => setDeleteExpenseId(null)}
					onOk={() => deleteExpense(deleteExpenseId)}
				/>}

				{deleteCategoryId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить статью?'}
					onCancel={() => setDeleteCategoryId(null)}
					onOk={() => deleteCategoryHandler(deleteCategoryId)}
				/>}

				{loading && <div className={styles.loading}>
					<span className='loader'></span>
				</div>}
			</section>
		</main>
	);
}
