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
import { EXPENSE_COLUMNS, CATEGORY_COLUMNS, TEMPLATE_COLUMNS } from './config/config';
import ExpenseFormModal from './features/CreateExpense/expenseFormModal';
import ModalCreateCategory from './features/CreateCategory/CreateCategory';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from './shared/Icons';
import TableWidget from './widgets/table/tableWidget';
import Tabs from './widgets/Tabs/Tabs';
import { formatDate, parse } from 'date-fns';
import { Tooltip as RadarTooltip } from 'radar-ui';
import { useAppDispatch } from '@/redux/hooks';
import { actions as filtersActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import AlertWidget from '@/components/sharedComponents/AlertWidget/AlertWidget';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import NoData from '@/components/sharedComponents/NoData/NoData';
import { useDemoMode } from '@/app/providers';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';
import SuccessModal from '@/components/sharedComponents/modals/successModal/successModal';
import UploadExcelButton from '@/components/UploadExcelButton';
import UploadExcelModal from '@/components/sharedComponents/modals/uploadExcelModal/uploadExcelModal';
import { fileDownload } from '@/service/utils';

const initAlertState = {
	status: '',
	isVisible: false,
	message: '',
};

const FILE_PROCESS_ID_KEY = 'operatingExpensesUploadProcessId';

export default function OperatingExpenses() {
	const dispatch = useAppDispatch();
	const { authToken } = useContext(AuthContext);
	const { isDemoMode } = useDemoMode();
	const { activeBrand, selectedRange, shops, activeBrandName, activeArticle, activeExpenseCategory, expenseCategories, isFiltersLoaded } = useAppSelector((state) => state.filters);
	const firstLoad = useRef(true);
	const [loading, setLoading] = useState(true);
	const progress = useLoadingProgress({ loading });
	const [view, setView] = useState('expense'); // expense | category | template
	const [expenseModal, setExpenseModal] = useState({ mode: null, isOpen: false, data: null });
	const [templateModal, setTemplateModal] = useState({ mode: null, isOpen: false, data: null });
	const [modalCreateCategoryOpen, setModalCreateCategoryOpen] = useState(false);
	const [isPlanExpenseCreated, setIsPlanExpenseCreated] = useState(false);
	const [deleteExpenseId, setDeleteExpenseId] = useState(null);
	const [deleteCategoryId, setDeleteCategoryId] = useState(null);
	const [deleteTemplateId, setDeleteTemplateId] = useState(null);
	const [alertState, setAlertState] = useState(initAlertState);
	const [expense, setExpense] = useState([]);
	const [totalSum, setTotalSum] = useState(0);
	const [expPagination, setExpPagination] = useState({
		page: 1,
		limit: 25,
		total: 1,
	});
	const prevPageRef = useRef(expPagination.page);
	const [categoryPagination, setCategoryPagination] = useState({
		page: 1,
		limit: 25,
		total: 1,
	});
	const [templatePagination, setTemplatePagination] = useState({
		page: 1,
		limit: 25,
		total: 1,
	});
	const [templates, setTemplates] = useState([]);
	const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
	const [uploadFile, setUploadFile] = useState(null);
	const [uploadResult, setUploadResult] = useState(null);
	const [uploadError, setUploadError] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [fileProcessId, setFileProcessId] = useState(() => localStorage.getItem(FILE_PROCESS_ID_KEY));
	const [isFileProcessing, setIsFileProcessing] = useState(() => Boolean(localStorage.getItem(FILE_PROCESS_ID_KEY)));

	const expenseData = useMemo(() => {
		const columns = EXPENSE_COLUMNS.map((column, i) => {
			return ({ ...column, key: column.i });
		});

		let data = expense?.map((item) => ({
			...item,
			key: item.id,
			expense_categories: item.expense_categories.map((el) => el.name).join(', ')
		}));

		if (data?.length > 0) {
			const result = {
				key: 'summary',
				date: 'Итого:',
				value: totalSum || '-',
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
	const [category, setCategory] = useState(null);
	const [categoryLoading, setCategoryLoading] = useState(false);

	const categoryData = useMemo(() => {
		const columns = CATEGORY_COLUMNS.map((column, i) => {
			return ({ ...column, key: column.i });
		});
		let data = [];
		if (category) {
			data = category.map((article) => ({ ...article, key: article.id }));
		}
		return { data, columns };
	}, [category]);

	const templateData = useMemo(() => {
		const columns = EXPENSE_COLUMNS.map((column, i) => {
			return ({ ...column, key: column.i });
		});

		let data = templates?.map((item) => ({
			...item,
			key: item.id,
			expense_categories: Array.isArray(item.expense_categories) 
				? item.expense_categories.map((el) => typeof el === 'object' ? el.name : el).join(', ')
				: item.expense_categories || '-'
		})) || [];

		return { data, columns };
	}, [templates]);

	const updateCategories = async (resetPagination = false) => {
		setLoading(true);
		setCategoryLoading(true);
		progress.start();

		// Сбрасываем пагинацию если нужно
		const pagination = resetPagination ? { page: 1, limit: 25, total: 1 } : categoryPagination;
		if (resetPagination) {
			setCategoryPagination(pagination);
		}

		try {
			const res = await ServiceFunctions.getOperatingExpensesCategoryGetAll(authToken, pagination);
			setCategory(res.data);
			const categories = [
				{ value: 'Без статьи', id: -1, name: 'Без статьи', key: 0 },
				...res.data.map(_ => ({ ..._, value: _.name, key: _.id }))
			];
			dispatch(filtersActions.setExpenseCategories(categories));
			progress.complete();
			setTimeout(() => {
				progress.reset();
				setLoading(false);
				setCategoryLoading(false);
			}, 500);
		} catch (error) {
			console.error('updateCategories error', error);
			setCategory([]);
			setCategoryLoading(false);
			setLoading(false);
		}
	};

	const updateExpenses = async (resetPagination = false, showLoader = true) => {
		setLoading(showLoader);
		progress.start();

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
		};

		try {
			const res = await ServiceFunctions.getOperatingExpensesExpenseGetAll(authToken, requestObject);
			setExpense(res.data);
			setTotalSum(res.total_sum || 0);
			progress.complete();
			setExpPagination((prev) => ({ ...prev, total: res.total_pages }));
			setTimeout(() => {
				progress.reset();
				setLoading(false);
			}, 500);
		} catch (error) {
			console.error('updateExpenses error', error);
			setExpense([]);
			setLoading(false);
		}
	};

	const updateTemplates = async (resetPagination = false, showLoader = true) => {
		setLoading(showLoader);
		progress.start();

		// Сбрасываем пагинацию если нужно
		const pagination = resetPagination ? { page: 1, limit: 25, total: 1 } : templatePagination;
		if (resetPagination) {
			setTemplatePagination(pagination);
		}

		try {
			const res = await ServiceFunctions.getOperatingExpensesTemplateGetAll(authToken, pagination.page, pagination.limit);
			setTemplates(res.data || []);
			progress.complete();
			setTemplatePagination((prev) => ({ ...prev, total: res.total_pages || 1 }));
			setTimeout(() => {
				progress.reset();
				setLoading(false);
			}, 500);
		} catch (error) {
			console.error('updateTemplates error', error);
			setTemplates([]);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (activeBrand) {
			if (activeBrand?.is_primary_collect) {
            	updateCategories();
			} else {
				setCategoryLoading(false);
			}
        }
    }, [activeBrand, categoryPagination.page]);

	useEffect(() => {
		if (activeBrand) {
			if (activeBrand?.is_primary_collect) {
				if (prevPageRef.current === expPagination.page) {
                    setExpPagination((prev) => (prev.page === 1 ? prev : { ...prev, page: 1 }));
                } else {
                    prevPageRef.current = expPagination.page;
                }
            	updateExpenses();
			} else {
				setLoading(false);
			}
        }
    }, [expPagination.page, isFiltersLoaded, selectedRange, activeExpenseCategory, activeBrand, activeBrandName, activeArticle]);

	useEffect(() => {
		if (activeBrand) {
			if (activeBrand?.is_primary_collect) {
				updateTemplates();
			} else {
				setLoading(false);
			}
		}
	}, [activeBrand, templatePagination.page]);

	const clearFileProcess = () => {
		localStorage.removeItem(FILE_PROCESS_ID_KEY);
		setFileProcessId(null);
		setIsFileProcessing(false);
	};

	useEffect(() => {
		if (!fileProcessId || !authToken) {
			setIsFileProcessing(false);
			return;
		}

		let isMounted = true;

		const checkFileStatus = async () => {
			try {
				const res = await ServiceFunctions.getOperatingExpensesFileStatus(authToken, fileProcessId);
				if (!isMounted) return;

				const status = res?.status;
				if (status === 'processing') {
					setIsFileProcessing(true);
					return;
				}

				clearFileProcess();

				if (status === 'success') {
					setAlertState({ message: res?.message || 'Файл успешно обработан', status: 'success', isVisible: true });
					await updateExpenses(true);
				} else {
					setAlertState({ message: res?.message || 'Не удалось обработать файл', status: 'error', isVisible: true });
				}
			} catch (error) {
				if (!isMounted) return;
				clearFileProcess();
				setAlertState({ message: 'Не удалось проверить статус файла', status: 'error', isVisible: true });
			}
		};

		checkFileStatus();
		const intervalId = setInterval(checkFileStatus, 1000);

		return () => {
			isMounted = false;
			clearInterval(intervalId);
		};
	}, [fileProcessId, authToken]);

	const modalExpenseHandlerClose = () => {
		setExpenseModal({ mode: null, isOpen: false, data: null });
	};

	const modalTemplateHandlerClose = () => {
		setTemplateModal({ mode: null, isOpen: false, data: null });
	};

	const modalCategoryHandlerClose = () => {
		setModalCreateCategoryOpen(false);
		setCategoryEdit(null);
	};

	const modalHandler = () => {
		if (view === 'expense') {
			setExpenseModal({ mode: 'create', isOpen: true, data: null });
		} else if (view === 'template') {
			setTemplateModal({ mode: 'create', isOpen: true, data: null });
		} else {
			setModalCreateCategoryOpen(true);
		}
	};

	const createCategory = async (category) => {
		setCategoryLoading(true);
		try {
			const res = await ServiceFunctions.postOperatingExpensesCategoryCreate(authToken, category);
			await updateCategories(true); // Обновляем данные с сбросом пагинации
			setAlertState({ message: 'Статья добавлена', status: 'success', isVisible: true });
		} catch (error) {
			console.error('createCategory error', error);
			setAlertState({ message: 'Не удалось добавить статью', status: 'error', isVisible: true });
		} finally {
			setModalCreateCategoryOpen(false);
			setCategoryLoading(false);
		}
	};

	const editCategory = async (category) => {
		setModalCreateCategoryOpen(false);
		try {
			const res = await ServiceFunctions.patchOperatingExpensesCategory(authToken, category);
			await updateCategories(); // Обновляем данные без сброса пагинации
			setAlertState({ message: 'Статья обновлена', status: 'success', isVisible: true });
		} catch (error) {
			console.error('editCategory error', error);
			setAlertState({ message: 'Не удалось обновить статью', status: 'error', isVisible: true });
		} finally {
			setCategoryEdit(null);
			updateExpenses(false, false);
			updateTemplates();
		}
	};

	const handleCategory = (category) => {
		setModalCreateCategoryOpen(false);
		if (categoryEdit) {
			editCategory({ ...categoryEdit, ...category });
		} else {
			createCategory(category);
		}
	};

	const handleExpanse = async (expense) => {
		if (expenseModal.mode === 'edit') {
			await editExpanse(expense);
		} else {
			await createExpense(expense);
			if (expense.isPeriodicExpense) setIsPlanExpenseCreated(true);
		}
	};

	const createExpense = async (requestData) => {
		const { requestObject, requestUrl } = requestData;
		setLoading(true);
		try {
			const res = await ServiceFunctions.postOperatingExpensesExpenseCreate(authToken, requestObject, requestUrl);
			await updateExpenses(true); // Сбрасываем пагинацию и обновляем данные
			await updateTemplates();
			const successMessage = expenseModal.mode === 'copy' ? 'Расход скопирован' : 'Расход добавлен';
			setAlertState({ message: successMessage, status: 'success', isVisible: true });
		} catch (error) {
			console.error('createExpense error', error);
			const errorMessage = expenseModal.mode === 'copy' ? 'Не удалось скопировать расход' : 'Не удалось добавить расход';
			setAlertState({ message: errorMessage, status: 'error', isVisible: true });
		} finally {
			setExpenseModal({ mode: null, isOpen: false, data: null });
			setCategoryLoading(false);
			setLoading(false);
		}
	};

	const editExpanse = async (requestData) => {
		const { requestObject, requestUrl } = requestData;
		setLoading(true);
		try {
			const res = await ServiceFunctions.patchOperatingExpensesExpense(authToken, requestObject, requestUrl);
			await updateExpenses(); // Обновляем данные без сброса пагинации
			await updateTemplates();
			setAlertState({ message: 'Расход обновлен', status: 'success', isVisible: true });
		} catch (error) {
			console.error('editExpense error', error);
			setAlertState({ message: 'Не удалось обновить расход', status: 'error', isVisible: true });
		} finally {
			setExpenseModal({ mode: null, isOpen: false, data: null });
			setLoading(false);
		}
	};

	const copyExpense = async (expenseId) => {
		setLoading(true);
		try {
			let expenseToCopy = expense.find((item) => item.id === expenseId);
			if (!expenseToCopy) {
				throw new Error('Расход не найден');
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

			await ServiceFunctions.postOperatingExpensesExpenseCreate(authToken, expenseData, `/operating-expenses/expense/copy?expense_id=${expenseId}`);
			await updateExpenses(true);
			await updateTemplates();
			setAlertState({ message: 'Расход скопирован', status: 'success', isVisible: true });
		} catch (error) {
			console.error('copyExpense error', error);
			setAlertState({ message: 'Не удалось скопировать расход', status: 'error', isVisible: true });
		} finally {
			setLoading(false);
		}
	};

	const deleteExpense = async (id, isPeriodic) => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperatingExpensesExpenseDelete(authToken, id, isPeriodic);
			await updateExpenses(); // Обновляем данные без сброса пагинации
			await updateTemplates();
			setAlertState({ message: 'Расход удален', status: 'success', isVisible: true });
		} catch (error) {
			console.error('deleteExpense error', error);
			setAlertState({ message: 'Не удалось удалить расход', status: 'error', isVisible: true });
		} finally {
			setDeleteExpenseId(null);
			setDeleteTemplateId(null);
			setLoading(false);
		}
	};

	const deleteCategoryHandler = async (id) => {
		setLoading(true);
		try {
			const res = await ServiceFunctions.deleteOperatingExpensesCategory(authToken, id);
			await updateCategories(); // Обновляем данные без сброса пагинации
			setAlertState({ message: 'Статья удалена', status: 'success', isVisible: true });
		} catch (error) {
			console.error('deleteCategoryHandler error', error);
			setAlertState({ message: 'Не удалось удалить статью', status: 'error', isVisible: true });
		} finally {
			setDeleteCategoryId(null);
			updateExpenses(false, false);
			updateTemplates();
			setLoading(false);
		}
	};

	const handleTemplate = async (template) => {
		if (templateModal.mode === 'edit') {
			await editTemplate(template);
		} else {
			await createTemplate(template);
		}
	};

	const createTemplate = async (requestData) => {
		const { requestObject, requestUrl } = requestData;
		setLoading(true);
		try {
			const res = await ServiceFunctions.postOperatingExpensesTemplateCreate(authToken, requestObject, requestUrl);
			await updateTemplates(true); // Сбрасываем пагинацию и обновляем данные
			await updateExpenses(true);
			const successMessage = templateModal.mode === 'copy' ? 'Запланированный расход скопирован' : 'Запланированный расход добавлен';
			setAlertState({ message: successMessage, status: 'success', isVisible: true });
		} catch (error) {
			console.error('createTemplate error', error);
			const errorMessage = templateModal.mode === 'copy' ? 'Не удалось скопировать запланированный расход' : 'Не удалось добавить запланированный расход';
			setAlertState({ message: errorMessage, status: 'error', isVisible: true });
		} finally {
			setTemplateModal({ mode: null, isOpen: false, data: null });
			setLoading(false);
		}
	};

	const editTemplate = async (requestData) => {
		const { requestObject, requestUrl } = requestData;
		setLoading(true);
		try {
			const res = await ServiceFunctions.patchOperatingExpensesTemplate(authToken, requestObject, requestUrl);
			await updateTemplates(); // Обновляем данные без сброса пагинации
			await updateExpenses();
			setAlertState({ message: 'Запланированный расход обновлен', status: 'success', isVisible: true });
		} catch (error) {
			console.error('editTemplate error', error);
			setAlertState({ message: 'Не удалось обновить запланированный расход', status: 'error', isVisible: true });
		} finally {
			setTemplateModal({ mode: null, isOpen: false, data: null });
			setLoading(false);
		}
	};

	const copyTemplate = async (templateId, isPeriodic) => {
		setLoading(true);
		try {
			let templateToCopy = templates.find((item) => item.id === templateId);
			if (!templateToCopy) {
				throw new Error('Запланированный расход не найден');
			}
			// Prepare template data for copying (remove id and any timestamps)
			const { id, ...templateData } = templateToCopy;

			// Transform expense_categories: extract IDs if it's an array of objects
			if (templateData.expense_categories && Array.isArray(templateData.expense_categories)) {
				templateData.expense_categories = templateData.expense_categories.map(cat =>
					typeof cat === 'object' ? cat.id : cat
				);
			}
			if (!templateData.items || templateData.items.length === 0) {
				const items = [];
				if (templateData.shops && templateData.shops.length > 0) {
					items.push(...templateData.shops.map(s => ({ shop: typeof s === 'object' ? s.id : s })));
				}
				if (templateData.vendor_codes && templateData.vendor_codes.length > 0) {
					items.push(...templateData.vendor_codes.map(v => ({ 
						vendor_code: typeof v === 'object' ? v.id || v.vendor_code : v,
						brand_name: typeof v === 'object' ? v.brand_name : undefined
					})));
				}
				if (templateData.brand_names && templateData.brand_names.length > 0) {
					items.push(...templateData.brand_names.map(b => ({ 
						brand_name: typeof b === 'object' ? b.id || b.brand_name : b
					})));
				}
				if (items.length > 0) {
					templateData.items = items;
				}
			}
			if (!isPeriodic) {
				templateData.date = templateData.date_from;
			}

			const url = isPeriodic ? 'operating-expenses/periodic-templates/create' : `operating-expenses/expense/copy?expense_id=${templateId}`;
			await ServiceFunctions.postOperatingExpensesTemplateCreate(authToken, templateData, url);
			await updateTemplates(true);
			await updateExpenses();
			setAlertState({ message: 'Запланированный расход скопирован', status: 'success', isVisible: true });
		} catch (error) {
			console.error('copyTemplate error', error);
			setAlertState({ message: 'Не удалось скопировать запланированный расход', status: 'error', isVisible: true });
		} finally {
			setLoading(false);
		}
	};

	const deleteTemplate = async (id, isPeriodic) => {
		setLoading(true);
		try {
			if (isPeriodic) {
				await ServiceFunctions.deleteOperatingExpensesTemplateDelete(authToken, id);
			} else {
				await ServiceFunctions.deleteOperatingExpensesExpenseDelete(authToken, id, false);
			}
			await updateExpenses();
			await updateTemplates(); // Обновляем данные без сброса пагинации
			setAlertState({ message: 'Запланированный расход удален', status: 'success', isVisible: true });
		} catch (error) {
			console.error('deleteTemplate error', error);
			setAlertState({ message: 'Не удалось удалить запланированный расход', status: 'error', isVisible: true });
		} finally {
			setDeleteTemplateId(null);
			setLoading(false);
		}
	};

	const handleExcelUpload = async (file) => {
		setIsUploading(true);
		setUploadError(null);
		setUploadResult(null);
		try {
			const response = await ServiceFunctions.postOperatingExpensesUpload(authToken, file);
			if (response?.process_id) {
				localStorage.setItem(FILE_PROCESS_ID_KEY, response.process_id);
				setFileProcessId(response.process_id);
				setIsFileProcessing(true);
			} else if (response?.message === 'success') {
				await updateExpenses(true);
				setAlertState({ message: 'Данные успешно загружены', status: 'success', isVisible: true });
			} else {
				setAlertState({ message: 'Данные загружены с ошибками', status: 'warning', isVisible: true });
			}
		} catch (error) {
			console.error('handleExcelUpload error', error);
			setUploadError('Что-то пошло не так :( Попробуйте обновить страницу');
			setAlertState({ message: 'Не удалось загрузить файл', status: 'error', isVisible: true });
		} finally {
			setIsUploadModalVisible(false);
			setIsUploading(false);
		}
	};

	const handleUploadModalClose = () => {
		if (isUploading) return;
		setIsUploadModalVisible(false);
		setUploadFile(null);
		setUploadResult(null);
		setUploadError(null);
	};

	const handleTemplateDownload = async () => {
		setIsUploading(true);
		setUploadError(null);
		try {
			const fileBlob = await ServiceFunctions.getOperatingExpensesTemplateDownload(authToken);
			fileDownload(fileBlob, 'Операционные_расходы.xlsx');
		} catch (error) {
			console.error('handleTemplateDownload error', error);
			setUploadError('Что-то пошло не так :( Попробуйте обновить страницу');
		} finally {
			setIsUploading(false);
		}
	};

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
						howToLink={'https://radar.usedocs.com/article/80129'}
						howToLinkText={'Как использовать раздел?'}
					/>
				</div>

				{isDemoMode && <NoSubscriptionWarningBlock />}

				{!loading && (
					<Flex justify="space-between">
						<Tabs view={view} setView={setView} />
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
								<UploadExcelButton
									onClick={() => setIsUploadModalVisible(true)}
									loading={isUploading || isFileProcessing}
									disabled={loading || isFileProcessing}
									title={isFileProcessing ? 'Файл обрабатывается' : undefined}
								/>
								{view !== 'template' && (
									<Button
										type="primary"
										size="large"
										onClick={modalHandler}
										style={{ fontWeight: 600, fontSize: 14, width: 121 }}
									>
										<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9 1V9M9 17V9M9 9H1H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										Добавить
									</Button>
								)}
							</ConfigProvider>
						</Flex>
					</Flex>
				)}

				{view === 'expense' && (
					<div className={styles.controls}>
						<Filters
							isDataLoading={loading}
							groupSelect={false}
							opExpensesArticles
						/>
					</div>
				)}

				{/* Заглушка для не активированных брендов */}
				{activeBrand && !activeBrand?.is_primary_collect && 
					<DataCollectWarningBlock />
				}

				{/* Лоадер */}
				{loading && <Loader loading={loading} progress={progress.value} />}

				{/* Расходы */}
				{view === 'expense' && !loading && activeBrand && activeBrand?.is_primary_collect && (
					expenseData.data?.length > 0
					? <TableWidget
						loading={loading}
						columns={EXPENSE_COLUMNS}
						data={expenseData.data}
						setExpenseModal={setExpenseModal}
						setDeleteExpenseId={setDeleteExpenseId}
						copyExpense={copyExpense}
						tableType='expense'
						pagination={expPagination}
						setPagination={setExpPagination}
						authToken={authToken}
						setAlertState={setAlertState}
					/>
					: <NoData />
				)}

				{/* Статьи */}
				{view === 'category' && !loading && activeBrand && activeBrand?.is_primary_collect && (
					categoryData.data?.length > 0 
					? <div className={styles.container}>
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
					: <NoData />
				)}

				{/* Запланированные расходы */}
				{view === 'template' && !loading && activeBrand && activeBrand?.is_primary_collect && (
					templateData.data?.length > 0
					? <TableWidget
						loading={loading}
						columns={TEMPLATE_COLUMNS}
						data={templateData.data}
						setExpenseModal={setTemplateModal}
						setDeleteExpenseId={setDeleteTemplateId}
						copyExpense={copyTemplate}
						tableType='expense'
						pagination={templatePagination}
						setPagination={setTemplatePagination}
						authToken={authToken}
						setAlertState={setAlertState}
						isTemplate={true}
					/>
					: <NoData />
				)}

				{expenseModal.isOpen && expenseModal.mode &&
					<ExpenseFormModal
						mode={expenseModal.mode}
						open={expenseModal.isOpen}
						onCancel={modalExpenseHandlerClose}
						setModalCreateCategoryOpen={setModalCreateCategoryOpen}
						category={category}
						editData={expenseModal.data}
						handle={handleExpanse}
						loading={loading}
						zIndex={1000}
					/>
				}

				{templateModal.isOpen && templateModal.mode &&
					<ExpenseFormModal
						mode={templateModal.mode}
						open={templateModal.isOpen}
						onCancel={modalTemplateHandlerClose}
						setModalCreateCategoryOpen={setModalCreateCategoryOpen}
						category={category}
						editData={templateModal.data}
						handle={handleTemplate}
						loading={loading}
						zIndex={1000}
						isTemplate={true}
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
					text={expenseData.data.find((el) => el.id === deleteExpenseId)?.is_periodic ? (
						<div className={styles.deleteModal__text}>
							Вы удаляете периодический расход. Это действие также удалит все созданные расходы по этому шаблону и сам шаблон.
							<RadarTooltip
								text='Вы также можете запретить создавать новые расходы по этому шаблону. Для этого зайдите в редактирование планового расхода и установите/измените дату окончания расхода.'
							>
								<span
									style={{ color: '#F93C65', textDecoration: 'underline' }}
								>Подробнее</span>
							</RadarTooltip>
						</div>
					) : null}
					onOk={() => {
						const currentExpense = expenseData.data.find((el) => el.id === deleteExpenseId);
						deleteExpense(currentExpense?.periodic_expense_id ? currentExpense.periodic_expense_id : deleteExpenseId, currentExpense?.is_periodic);
					}}
					onCancel={() => setDeleteExpenseId(null)}
					isLoading={loading}
					buttonText='Удалить расход'
				/>}

				{deleteCategoryId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить статью?'}
					onOk={() => deleteCategoryHandler(deleteCategoryId)}
					onCancel={() => setDeleteCategoryId(null)}
					isLoading={loading}
				/>}

				{deleteTemplateId && <ModalDeleteConfirm
					title={'Вы уверены, что хотите удалить запланированный расход?'}
					text={templateData.data.find((el) => el.id === deleteTemplateId)?.is_template ? (
						<div className={styles.deleteModal__text}>
							Вы удаляете запланированный расход. Это действие также удалит все расходы, связанные с ним.
							<RadarTooltip
								text='Вы также можете запретить создавать новые расходы по этому запланированному расходу. Для этого зайдите в редактирование запланированного расхода и установите/измените дату окончания.'
							>
								<span
									style={{ color: '#F93C65', textDecoration: 'underline' }}
								>Подробнее</span>
							</RadarTooltip>
						</div>
					) : null}
					onOk={() => {
						const currentTemplate = templateData.data.find((el) => el.id === deleteTemplateId);
						deleteTemplate(deleteTemplateId, currentTemplate?.is_template);
					}}
					onCancel={() => setDeleteTemplateId(null)}
					isLoading={loading}
					buttonText='Удалить'
				/>}

				<SuccessModal
					title={'Плановый расход создан и сохранен'}
					message={'Ваш расход добавлен, но может не отображаться, если вы выбрали дату из будущего периода. В этом случае расход появится в списке в день, на который он запланирован.'}
					open={isPlanExpenseCreated}
					onCancel={() => setIsPlanExpenseCreated(false)}
				/>

				<AlertWidget 
					isVisible={alertState.isVisible}
					setIsVisible={(isVisible) => setAlertState({ ...alertState, isVisible })}
					message={alertState.message}
					type={alertState.status}
				/>

				<UploadExcelModal
					open={isUploadModalVisible}
					onClose={handleUploadModalClose}
					onUpload={handleExcelUpload}
					loading={isUploading}
					error={uploadError}
					result={uploadResult}
					title="Загрузка файла"
					file={uploadFile}
					setFile={setUploadFile}
					onDownloadTemplate={handleTemplateDownload}
				/>
			</section>
		</main>
	);
}
