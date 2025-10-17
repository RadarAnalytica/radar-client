import { useState, useEffect, useContext, useMemo, useRef, useLayoutEffect } from 'react';
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
import ExpenseEditModal from './features/CreateExpense/expenseEditModal';
import ExpenseCopyModal from './features/CreateExpense/expenseCopyModal';
import ModalCreateCategory from './features/CreateCategory/CreateCategory';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from './shared/Icons';
import TableWidget from './widgets/table/tableWidget';
import { formatDate, parse } from 'date-fns';
import { Tooltip as RadarTooltip } from 'radar-ui';
import { useAppDispatch } from '@/redux/hooks';
import { actions as filtersActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';

const initAlertState = {
	status: '',
	isVisible: false,
	message: '',
};

export default function OperatingExpenses() {
	const dispatch = useAppDispatch();
	const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange, shops, activeBrandName, activeArticle, activeExpenseCategory, expenseCategories } = useAppSelector((state) => state.filters);
	const firstLoad = useRef(true);
	const [loading, setLoading] = useState(true);
	const [view, setView] = useState('expense'); // costs | category
	const [modalCreateExpenseOpen, setModalCreateExpenseOpen] = useState(false);
	const [modalCreateCategoryOpen, setModalCreateCategoryOpen] = useState(false);
	const [modalEditExpenseOpen, setModalEditExpenseOpen] = useState(false);
	const [modalCopyExpenseOpen, setModalCopyExpenseOpen] = useState(false);
	const [deleteExpenseId, setDeleteExpenseId] = useState(null);
	const [deleteCategoryId, setDeleteCategoryId] = useState(null);
	const [alertState, setAlertState] = useState(initAlertState);
	const [expense, setExpense] = useState([]);
	const [expPagination, setExpPagination] = useState({
		page: 1,
		limit: 25,
		total: 1,
	});
	const [categoryPagination, setCategoryPagination] = useState({
		page: 1,
		limit: 25,
		total: 1,
	});
	const [expenseEdit, setExpenseEdit] = useState(null);
	const [expenseCopy, setExpenseCopy] = useState(null);

	const expenseData = useMemo(() => {
		const columns = EXPENSE_COLUMNS.map((column, i) => {
			return ({ ...column, key: column.i })
		})

		let data = expense?.map((item) => ({
			...item,
			key: item.id,
			expense_categories: item.expense_categories.map((el) => el.name).join(', ')
		}));

		if (data?.length > 0) {
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
		}

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

	const updateCategories = async (resetPagination = false) => {
		setLoading(true);
		setCategoryLoading(true);

		// Сбрасываем пагинацию если нужно
		const pagination = resetPagination ? { page: 1, limit: 25, total: 1 } : categoryPagination;
		if (resetPagination) {
			setCategoryPagination(pagination);
		}

		try {
			const res = await ServiceFunctions.getOperatingExpensesCategoryGetAll(authToken, pagination);
			setCategory(res.data);
			dispatch(filtersActions.setExpenseCategories(res.data.map(_ => ({ ..._, value: _.name, key: _.id }))));
			!activeExpenseCategory && dispatch(filtersActions.setActiveFilters({ stateKey: 'activeExpenseCategory', data: { value: 'Все', id: 0 } }));
		} catch (error) {
			setCategory([]);
		} finally {
			setCategoryLoading(false);
			setLoading(false);
		}
	};

	const updateExpenses = async (resetPagination = false, showLoader = true) => {
		setLoading(showLoader);

		// Сбрасываем пагинацию если нужно
		const pagination = resetPagination ? { page: 1, limit: 25, total: 1 } : expPagination;
		if (resetPagination) {
			setExpPagination(pagination);
		}

		const requestObject = {
			page: pagination.page,
			limit: pagination.limit,
			period: selectedRange.period ? selectedRange.period : selectedRange,
			shops: activeBrand.id === 0 ? undefined : [activeBrand.id],
			brand_names: activeBrandName.map((el) => el.value !== 'Все' ? el.value : null).filter(Boolean),
			vendor_codes: activeArticle.map((el) => el.value !== 'Все' ? el.value : null).filter(Boolean),
			expense_categories: activeExpenseCategory && Array.isArray(activeExpenseCategory) ? activeExpenseCategory?.map((el) => el.value !== 'Все' ? el.id : null).filter(Boolean) : null,
		}

		try {
			const res = await ServiceFunctions.getOperatingExpensesExpenseGetAll(authToken, requestObject);
			setExpense(res.data)
			setExpPagination({
				page: res.page,
				limit: res.limit,
				total: res.total_pages,
			})
			return
		} catch (error) {
			console.error('updateExpenses error', error);
			setExpense([]);
		} finally {
			setLoading(false);
		}
	};

	useLayoutEffect(() => {
		if (firstLoad.current) {
			updateCategories().then(() => {
				firstLoad.current = false;
				setLoading(false);
			});
			return
		}
	}, [])

	useEffect(() => {
		if (!activeBrand && !activeBrand?.is_primary_collect) {
			return
		}

		if (view === 'expense' && expenseCategories) {
			updateExpenses();
		}

		if (view === 'category') {
			//console.log('updateArticles');
			//updateCategories();
		}
	}, [activeBrand, selectedRange, expPagination.page, categoryPagination.page, activeBrandName, activeArticle, activeExpenseCategory])

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
		try {
			const res = await ServiceFunctions.postOperatingExpensesCategoryCreate(authToken, category);
			// Обновляем данные с сбросом пагинации
			await updateCategories(true);
		} catch (error) {
			console.error('createCategory error', error);
		} finally {
			setModalCreateCategoryOpen(false);
			setCategoryLoading(false);
		}
	};

	const editCategory = async (category) => {
		setModalCreateCategoryOpen(false);
		try {
			const res = await ServiceFunctions.patchOperatingExpensesCategory(authToken, category);
			// Обновляем данные без сброса пагинации
			await updateCategories();
		} catch (error) {
			console.error('editCategory error', error);
		} finally {
			setCategoryEdit(null);
			updateExpenses(false, false);
		}
	};

	const handleCategory = (category) => {
		setModalCreateCategoryOpen(false);
		if (!!categoryEdit) {
			//console.log('editCategory')
			const editedCategory = { ...categoryEdit, ...category }
			editCategory(editedCategory);
			return;
		}
		createCategory(category);
		// setExpenses((category) => category.push(article) );
	};

	const handleExpanse = (expense) => {
		//console.log('handleExpanse', expense)
		if (!!expenseEdit) {
			//console.log('editExpanse', expense)
			editExpanse(expense);
			return;
		}
		createExpense(expense);
		// setExpenses((category) => category.push(article) );
	};

	const createExpense = async (requestData) => {
		const { requestObject, requestUrl } = requestData;
		setLoading(true);
		try {
			const res = await ServiceFunctions.postOperatingExpensesExpenseCreate(authToken, requestObject, requestUrl);
			await updateExpenses(true); // Сбрасываем пагинацию и обновляем данные
		} catch (error) {
			console.error('createExpense error', error);
		} finally {
			setModalCreateExpenseOpen(false);
			setCategoryLoading(false);
			setExpenseCopy(null);
			setModalCopyExpenseOpen(false);
			setLoading(false);
		}
	}

	const editExpanse = async (requestData) => {
		const { requestObject, requestUrl } = requestData;
		setLoading(true);
		setModalCreateExpenseOpen(false);
		try {
			const res = await ServiceFunctions.patchOperatingExpensesExpense(authToken, requestObject, requestUrl);
			await updateExpenses(); // Обновляем данные без сброса пагинации
		} catch (error) {
			console.error('editExpense error', error);
		} finally {
			setExpenseEdit(null);
			setLoading(false);
		}
	}

	const copyExpense = async (expenseId) => {
		try {
			let expenseToCopy = expense.find((item) => item.id === expenseId);
			if (!expenseToCopy) {
				console.error('Expense not found');
				return;
			}
			setLoading(true);

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

			const res = await ServiceFunctions.postOperatingExpensesExpenseCreate(authToken, expenseData, `/operating-expenses/expense/copy?expense_id=${expenseId}`);
			setAlertState({
				status: 'success',
				isVisible: true,
				message: 'Расход успешно скопирован',
			});
			await updateExpenses(true);
		} catch (error) {
			console.error('copyExpense error', error);
			setLoading(false);
			setAlertState({
				status: 'error',
				isVisible: true,
				message: 'Не удалось скопировать расход',
			});
		}
	}

	const deleteExpense = async (id, isPeriodic) => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperatingExpensesExpenseDelete(authToken, id, isPeriodic);
			// Обновляем данные без сброса пагинации
			await updateExpenses();
		} catch (error) {
			console.error('deleteExpense error', error);
		} finally {
			setDeleteExpenseId(null);
			setLoading(false);
		}
	}

	const deleteCategoryHandler = async (id) => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperatingExpensesCategory(authToken, id);
			// Обновляем данные без сброса пагинации
			await updateCategories();
		} catch (error) {
			console.error('deleteCategoryHandler error', error);
		} finally {
			setDeleteCategoryId(null);
			updateExpenses(false, false);
		}
	};

	useEffect(() => {
		let timeout;
		if (alertState.isVisible) {
			timeout = setTimeout(() => { setAlertState(initAlertState); }, 1500);
		}

		return () => clearTimeout(timeout);
	}, [alertState]);

	return (
		<main className={styles.page}>
			<MobilePlug />

			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>

			<section className={styles.page__content}>
				<div className={styles.page__headerWrapper}>
					<Header
						title="Операционные расходы"
						titlePrefix={null}
						children={null}
						videoReviewLink={null}
						// howToLink={'#'}
						// howToLinkText={'Как загрузить?'}
					/>
				</div>

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
						isDataLoading={loading}
						groupSelect={false}
						opExpensesArticles
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
							tableType='expense'
							pagination={expPagination}
							setPagination={setExpPagination}
							setModalEditExpenseOpen={setModalEditExpenseOpen}
							authToken={authToken}
							setModalCopyExpenseOpen={setModalCopyExpenseOpen}
							setExpenseCopy={setExpenseCopy}
							setAlertState={setAlertState}
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
							pagination={categoryPagination}
							setPagination={setCategoryPagination}
						/>
					</div>
				}

				{modalCreateExpenseOpen &&
					<ExpenseMainModal
						open={modalCreateExpenseOpen}
						onCancel={modalExpenseHandlerClose}
						setModalCreateCategoryOpen={setModalCreateCategoryOpen}
						category={category}
						zIndex={1000}
						handle={handleExpanse}
						expenseCopy={expenseCopy}
						setExpenseCopy={setExpenseCopy}
						loading={loading}
					/>
				}

				{modalEditExpenseOpen && expenseEdit &&
					<ExpenseEditModal
						open={modalEditExpenseOpen}
						onCancel={() => setModalEditExpenseOpen(false)}
						setModalCreateCategoryOpen={setModalCreateCategoryOpen}
						category={category}
						editData={expenseEdit}
						handle={handleExpanse}
						loading={loading}
					/>
				}

				{modalCopyExpenseOpen && expenseCopy &&
					<ExpenseCopyModal
						open={modalCopyExpenseOpen}
						onCancel={() => { setExpenseCopy(null); setModalCopyExpenseOpen(false) }}
						setModalCreateCategoryOpen={setModalCreateCategoryOpen}
						category={category}
						editData={expenseCopy}
						handle={createExpense}
						loading={loading}
					/>
				}

				{modalCreateCategoryOpen && 
					<ModalCreateCategory
						open={modalCreateCategoryOpen}
						onCancel={modalCategoryHandlerClose}
						onSubmit={handleCategory}
						zIndex={1001}
						data={categoryEdit}
						confirmLoading={categoryLoading}
						loading={categoryLoading}
					/>
				}

				{deleteExpenseId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить расход?'}
					onCancel={() => setDeleteExpenseId(null)}
					text={expenseData.data.find((el) => el.id === deleteExpenseId)?.is_periodic ? (
						<div className={styles.deleteModal__text}>
							Вы удаляете периодический расход. Это действие также удалит все созданные расходы по этому шаблону.
							<RadarTooltip
								text='Вы также можете запретить создавать новые расходы по этому шаблону. Для этого зайдите в редактирование планового расхода и установите/измените дату окончания расхода.'
							>
								<span
									style={{ color: '#F93C65', textDecoration: 'underline' }}
								>Подробнее</span>
							</RadarTooltip>
						</div>
					) : null}
					onOk={() => deleteExpense(deleteExpenseId, expenseData.data.find((el) => el.id === deleteExpenseId)?.is_periodic)}
					isLoading={loading}
				/>}

				{deleteCategoryId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить статью?'}
					onCancel={() => setDeleteCategoryId(null)}
					onOk={() => deleteCategoryHandler(deleteCategoryId)}
					isLoading={loading}
				/>}

				{loading && <div className={styles.loading}>
					<span className='loader'></span>
				</div>}

				{alertState.isVisible &&
					<div className={styles.page__alert}>
						{alertState.status === 'success' && (
							<svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="32" height="32" rx="6.4" fill="#00B69B" fillOpacity="0.1" />
								<path d="M14.1999 19.1063L23.1548 10.1333L24.5333 11.5135L14.1999 21.8666L8 15.6549L9.37753 14.2748L14.1999 19.1063Z" fill="#00B69B" />
							</svg>)
						}

						{alertState.status === 'error' && (
							<svg width="16" height="16" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
								<path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
							</svg>
						)}

						{alertState.message}
					</div>
				}
			</section>
		</main>
	);
}
