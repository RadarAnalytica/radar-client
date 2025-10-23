import { ConfigProvider, Modal, Flex, Button, Tooltip, Checkbox, Radio, Form, Row, Col, Select, Input } from 'antd';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared';
import styles from './expenseMainModal.module.css';
import { CloseIcon, InfoIcon } from '../../shared/Icons';
import { TimeSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/timeSelect/timeSelect';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import HowToLink from '@/components/sharedComponents/howToLink/howToLink';
import DatePickerCustomDropdown from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/datePickerCustomDropdown/datePickerCustomDropdown';
import { RadioGroup } from './RadioGroup';
import { DateSelect } from './DateSelect';
import { MultiSelect } from './MultiSelect';
import { formatDate, parse } from 'date-fns';
import { useDemoMode } from '@/app/providers/DemoDataProvider';


const getRequestObject = (values, editData) => {
	let requestObject = {}
	let requestUrl = '';
	const formattedDateStart = formatDate(parse(values.date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd');

	if (editData.is_periodic) {
		requestUrl = 'operating-expenses/periodic-expense/update';
		let formattedDateEnd;
		if (values.end_date) {
			formattedDateEnd = formatDate(parse(values.end_date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd');
		}
		requestObject = {
			type: 'plan',
			expense_categories: values.expense_categories,
			description: values.description,
			value: values.value,
			date_from: formattedDateStart,
			vendor_codes: values.vendor_codes,
			brand_names: values.brand_names,
			shops: values.shops,
			period_type: values.frequency,
			period_values: values.frequency === 'week'
				? values.week
				: values.month
					? values.month.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n))
					: [],
			finished_at: formattedDateEnd,
			id: editData?.periodic_expense_id,
		}
	}
	if (!editData.is_periodic) {
		requestUrl = 'operating-expenses/expense/update';
		requestObject = {
			type: 'once',
			expense_categories: values.expense_categories,
			description: values.description,
			value: values.value,
			date: formattedDateStart,
			shop: values.shop,
			vendor_code: values.vendor_code,
			brand_name: values.brand_name,
			id: editData?.id,
		}
	}
	return { requestObject, requestUrl };
}

export default function ExpenseEditModal({
	open = true,
	onCancel,
	setModalCreateCategoryOpen,
	category,
	editData,
	handle,
	loading,
	...props
}) {
	const { shops, filters } = useAppSelector((state) => state.filters);
	const [form] = Form.useForm();
	const dateFrom = Form.useWatch('date', form);
	const { isDemoMode } = useDemoMode();
	const selection = Form.useWatch('selection', form);
	const frequency = Form.useWatch('frequency', form);
	const typeValue = Form.useWatch('type', form);

	const today = new Date();
	const minDateFrom = new Date(today);
	const maxDateFrom = new Date(today);
	minDateFrom.setDate(today.getDate() - 90);
	maxDateFrom.setDate(today.getDate() + 90);

	const minDateTo = dateFrom
		? (() => {
			const parsedDate = parse(dateFrom, 'dd.MM.yyyy', new Date());
			parsedDate.setDate(parsedDate.getDate() + 1);
			return parsedDate;
		})()
		: today;


	const onFinish = (values) => {
		handle(getRequestObject(values, editData));
	};

	const cancelHandler = () => {
		onCancel();
		form.resetFields();
	};

	useEffect(() => {
		if (editData && !editData.is_periodic) {
			const selectionType = editData.shop ? 'shop' : editData.brand_name ? 'brand_name' : 'vendor_code';

			const formattedDate = editData.date
				? format(parse(editData.date, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy')
				: null;

			const formattedEndDate = editData.end_date
				? format(parse(editData.end_date, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy')
				: null;

			form.setFieldsValue({
				date: formattedDate,
				expense_categories: category.map((el) => editData.expense_categories.includes(el.name) ? el.id : false).filter(Boolean),
				selection: selectionType,
				shop: editData.shop?.id,
				vendor_code: editData.vendor_code?.id,
				brand_name: editData.brand_name?.id,
				frequency: editData.frequency,
				week: editData.week,
				month: editData.month,
				end_date: formattedEndDate,
				description: editData.description,
				value: editData.value,
			});
		}
		if (editData && editData.is_periodic) {
			const selectionType = editData.shops ? 'shop' : editData.brand_names ? 'brand_name' : 'vendor_code';

			const formattedDate = editData.date
				? format(parse(editData.date, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy')
				: null;

			const formattedEndDate = editData.end_date
				? format(parse(editData.end_date, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy')
				: null;

			const expenseCategories = typeof editData.expense_categories === 'string' 
				? [editData.expense_categories] 
				: Array.isArray(editData.expense_categories) 
					? editData.expense_categories.map((el) => el.id)
					: [];
			
			form.setFieldsValue({
				date: formattedDate,
				expense_categories: expenseCategories,
				selection: selectionType,
				shops: editData.shops,
				vendor_codes: editData.vendor_code?.id,
				brand_names: editData.brand_name?.id,
				frequency: editData.frequency,
				week: editData.week,
				month: editData.month,
				end_date: formattedEndDate,
				description: editData.description,
				value: editData.value,
			});
		}
	}, [editData]);


	return (
		<ConfigProvider
			theme={{
				token: {
					borderRadiusSM: 24,
					colorPrimary: '#5329ff',
					colorLink: '#5329ff',
					colorText: '#1a1a1a',
					colorBorder: '#e8e8e8',
				},
				components: {
					Modal: {},
					Form: {
						itemMarginBottom: 8,
						labelFontSize: 12,
						labelColor: '#1a1a1a',
						labelColonMarginInlineEnd: 10,
						//labelRequiredMarkColor: '#000'
					},
					Button: {
						paddingInline: 0,
						padding: 0,
						fontWeight: 700,
						controlHeight: 26,
					},
					Radio: {
						wrapperMarginInlineEnd: 16,
						radioSize: 20,
						// dotSize: 12,
					},
				},
			}}
		>
			<Modal
				className={styles.modal}
				open={true}
				centered={true}
				closable={true}
				footer={null}
				width={960}
				onCancel={onCancel}
				props
			>
				<div className={styles.modal__body}>
					<header className={styles.modal__header}>
						<h2 className={styles.modal__title}>
							{'Редактирование расхода'}
						</h2>
						{/* <HowToLink text='Как это работает?' link='#' /> */}
					</header>

					<Form
						form={form}
						onFinish={onFinish}
						layout="vertical"
						className={styles.modal__form}
						initialValues={{
							type: 'once',
							date: format(new Date(), 'dd.MM.yyyy'),
							selection: 'shop',
							frequency: 'week',
							week: [],
							vendor_codes: [],
							brand_names: [],
							shops: [],
							expense_categories: [],
						}}
					>
						<p className={styles.modal__typeSubtitle}>{!editData.is_periodic ? 'Разовый расход' : 'Плановый расход'}</p>

						{/* Выбор даты и суммы расхода */}
						<Row className={styles.modal__part} gutter={16}>
							<Col span={12}>
								<DateSelect
									form={form}
									label="Дата"
									formId='date'
									minDate={minDateFrom}
									maxDate={maxDateFrom}
								/>
							</Col>
							<Col span={12}>
								<ConfigProvider
									renderEmpty={() => (<div>Нет данных</div>)}
									theme={{
										token: {
											colorBgContainer: 'white',
											colorBorder: '#5329FF1A',
											borderRadius: 8,
											fontFamily: 'Mulish',
											fontSize: 12,
											fontWeight: 500,
											controlHeightLG: 40,
										},
										components: {
											Input: {
												activeBorderColor: '#5329FF1A',
												hoverBorderColor: '#5329FF1A',
												activeOutlineColor: 'transparent',
												activeBg: 'transparent',
												hoverBg: 'transparent',
												activeBg: 'transparent',
												activeShadow: 'transparent'
											}
										}
									}}
								>
								<Form.Item
									label="Сумма, руб"
									name='value'
									rules={[
										{ required: true, message: 'Пожалуйста, введите сумму расхода!' },
										{
											validator: (_, value) => {
												if (!value) {
													return Promise.resolve();
												}
												// Проверяем, что число имеет не более 2 знаков после запятой
												const decimalPart = String(value).split('.')[1];
												if (decimalPart && decimalPart.length > 2) {
													return Promise.reject(new Error('Максимум 2 знака после запятой'));
												}
												return Promise.resolve();
											}
										}
									]}
								>
									<Input
										size="large"
										type='number'
										min={0}
										step="0.01"
										onWheel={(e) => e.currentTarget.blur()}
										onChange={(e) => {
											let value = e.target.value;
											// Ограничение на длину целой части (до 9 символов для всего числа)
											const parts = value.split('.');
											if (parts[0].length > 9) {
												parts[0] = parts[0].slice(0, 9);
												value = parts.join('.');
											}
											// Ограничение на количество знаков после запятой (максимум 2)
											if (parts[1] && parts[1].length > 2) {
												parts[1] = parts[1].slice(0, 2);
												value = parts.join('.');
											}
											form.setFieldValue('value', value ? parseFloat(value) : '');
										}}
										suffix={<svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path opacity="0.5" d="M0.519063 6.685V5.586H5.30006C5.3794 5.586 5.47273 5.58133 5.58006 5.572C5.69206 5.56267 5.80873 5.544 5.93006 5.516C6.39673 5.404 6.74206 5.173 6.96606 4.823C7.19006 4.473 7.30206 4.07167 7.30206 3.619C7.30206 3.32967 7.2554 3.04967 7.16206 2.779C7.06873 2.50833 6.9194 2.27267 6.71406 2.072C6.5134 1.87133 6.25206 1.736 5.93006 1.666C5.81806 1.63333 5.7014 1.61467 5.58006 1.61C5.4634 1.60533 5.37006 1.603 5.30006 1.603H2.46506V0.42H5.34206C5.41206 0.42 5.5124 0.422333 5.64306 0.427C5.7784 0.431666 5.9254 0.448 6.08406 0.476C6.63006 0.56 7.0874 0.746666 7.45606 1.036C7.8294 1.32533 8.1094 1.68933 8.29606 2.128C8.48273 2.56667 8.57606 3.05433 8.57606 3.591C8.57606 4.389 8.36606 5.06333 7.94606 5.614C7.52606 6.16 6.9054 6.49833 6.08406 6.629C5.9254 6.65233 5.7784 6.66867 5.64306 6.678C5.5124 6.68267 5.41206 6.685 5.34206 6.685H0.519063ZM0.519063 8.904V7.875H6.11906V8.904H0.519063ZM1.56906 10.5V0.42H2.81506V10.5H1.56906Z" fill="#1A1A1A" />
										</svg>
										}
										placeholder='0'
									/>
								</Form.Item>
								</ConfigProvider>
							</Col>
						</Row>
						{/* -------------------*/}

						{/* Допы для плановых расходов */}
						{editData?.is_periodic &&
							<Row className={styles.modal__part} gutter={16}>
								<Col span={8}>
									<ConfigProvider
										renderEmpty={() => (<div>Нет данных</div>)}
										theme={{
											token: {
												colorBgContainer: 'white !important',
												colorBorder: '#5329FF1A',
												borderRadius: 8,
												fontFamily: 'Mulish',
												fontSize: 12,
												fontWeight: 500,
												controlHeightLG: 40,
											},
											components: {
												Select: {
													activeBorderColor: '#5329FF1A',
													activeOutlineColor: 'transparent',
													hoverBorderColor: '#5329FF1A',
													optionActiveBg: 'transparent',
													optionFontSize: 14,
													optionSelectedBg: 'transparent',
													optionSelectedColor: '#5329FF',
												}
											}
										}}
									>
										<Form.Item
											label="Частота расхода"
											name='frequency'
											rules={[
												{ required: true, message: 'Пожалуйста, выберите значение!' }
											]}
										>
											<Select
												size="large"
												placeholder="Частота расхода"
												suffixIcon={<SelectIcon />}
												defaultValue={frequency}
												options={[
													{ value: 'week', label: 'Каждую неделю' },
													{ value: 'month', label: 'Каждый месяц' },
												]}
											/>
										</Form.Item>
									</ConfigProvider>
								</Col>

								{frequency === 'month' && <Col span={8}>
									<ConfigProvider
										renderEmpty={() => (<div>Нет данных</div>)}
										theme={{
											token: {
												colorBgContainer: 'white',
												colorBorder: '#5329FF1A',
												borderRadius: 8,
												fontFamily: 'Mulish',
												fontSize: 12,
												fontWeight: 500,
												controlHeightLG: 40,
											},
											components: {
												Input: {
													activeBorderColor: '#5329FF1A',
													hoverBorderColor: '#5329FF1A',
													activeOutlineColor: 'transparent',
													activeBg: 'transparent',
													hoverBg: 'transparent',
													activeBg: 'transparent',
													activeShadow: 'transparent'
												}
											}
										}}
									>
										<Form.Item
											label="Число или день"
											name='month'
											rules={[
												{
													validator: (_, value) => {
														if (!value) {
															return Promise.resolve();
														}

														// Проверяем, что строка содержит только цифры и запятые
														if (!/^[0-9,\s]+$/.test(value)) {
															return Promise.reject(new Error('Используйте только цифры и запятые'));
														}

														// Разбиваем по запятым и проверяем каждое число
														const numbers = value.split(',').map(n => n.trim()).filter(n => n !== '');

														for (let num of numbers) {
															const parsed = parseInt(num, 10);
															if (isNaN(parsed)) {
																return Promise.reject(new Error('Некорректное число'));
															}
															if (parsed < 1 || parsed > 31) {
																return Promise.reject(new Error('Числа должны быть от 1 до 31'));
															}
														}

														return Promise.resolve();
													}
												}
											]}
										>

											<Input
												size="large"
												type='text'
												placeholder='Например: 1, 15, 28'
												onChange={(e) => {
													// Фильтруем ввод: оставляем только цифры, запятые и пробелы
													const filtered = e.target.value.replace(/[^0-9,\s]/g, '');
													form.setFieldValue('month', filtered);
												}}
											/>
										</Form.Item>
									</ConfigProvider>
								</Col>}

								{frequency === 'week' && <Col span={8}>
									<ConfigProvider
										renderEmpty={() => (<div>Нет данных</div>)}
										theme={{
											token: {
												colorBgContainer: 'white',
												colorBorder: '#5329FF1A',
												borderRadius: 8,
												fontFamily: 'Mulish',
												fontSize: 12,
											},
											components: {
												Select: {
													activeBorderColor: '#5329FF1A',
													activeOutlineColor: 'transparent',
													hoverBorderColor: '#5329FF1A',
													optionActiveBg: 'transparent',
													optionFontSize: 14,
													optionSelectedBg: 'transparent',
													optionSelectedColor: '#5329FF',
												}
											}
										}}
									>
										<Form.Item
											label="День недели"
											name='week'
											rules={[
												{ required: true, message: 'Пожалуйста, выберите значение!' }
											]}
										>
											<MultiSelect
												form={form}
												optionsData={[
													{ value: 1, label: 'Понедельник' },
													{ value: 2, label: 'Вторник' },
													{ value: 3, label: 'Среда' },
													{ value: 4, label: 'Четверг' },
													{ value: 5, label: 'Пятница' },
													{ value: 6, label: 'Суббота' },
													{ value: 7, label: 'Воскресенье' },
												]}
												selectId='week'
												hasSearch={false}
												selectPlaceholder='Выберите дни'
												hasSelectAll
											/>
										</Form.Item>
									</ConfigProvider>
								</Col>}
								<Col span={8}>
									<ConfigProvider
										renderEmpty={() => (<div>Нет данных</div>)}
										theme={{
											token: {
												colorBgContainer: 'white !important',
												colorBorder: '#5329FF1A',
												borderRadius: 8,
												fontFamily: 'Mulish',
												fontSize: 12,
												fontWeight: 500,
												controlHeightLG: 40,
											},
											components: {
												Select: {
													activeBorderColor: '#5329FF1A',
													activeOutlineColor: 'transparent',
													hoverBorderColor: '#5329FF1A',
													optionActiveBg: 'transparent',
													optionFontSize: 14,
													optionSelectedBg: 'transparent',
													optionSelectedColor: '#5329FF',
												}
											}
										}}
									>
										<DateSelect
											form={form}
											label="Дата окончания"
											formId='end_date'
											minDate={minDateTo}
											maxDate={undefined}
											required={false}
											allowClear
										/>
									</ConfigProvider>
								</Col>
							</Row>}
						{/* -------------------*/}

						{/* Выбор статьи */}
						<div className={styles.modal__wrapper}>
							<ConfigProvider
								renderEmpty={() => (<div>Нет данных</div>)}
								theme={{
									token: {
										colorBgContainer: 'white',
										colorBorder: '#5329FF1A',
										borderRadius: 8,
										fontFamily: 'Mulish',
										fontSize: 12,
									},
									components: {
										Select: {
											activeBorderColor: '#5329FF1A',
											activeOutlineColor: 'transparent',
											hoverBorderColor: '#5329FF1A',
											optionActiveBg: 'transparent',
											optionFontSize: 14,
											optionSelectedBg: 'transparent',
											optionSelectedColor: '#5329FF',
										}
									}
								}}
							>
								<Form.Item
									label="Статья"
									name='expense_categories'
									rules={[
										{ required: false, message: 'Пожалуйста, выберите значение!' }
									]}
									style={{ width: '100%' }}
								>
									<MultiSelect
										form={form}
										optionsData={category.map((el, i) => ({
											key: el.id,
											value: el.id,
											label: el.name,
										}))}
										selectId='expense_categories'
										searchFieldPlaceholder='Поиск по названию статьи'
										selectPlaceholder='Выберите статьи'
									/>
								</Form.Item>
							</ConfigProvider>

							<ConfigProvider
								theme={{
									token: {
										fontSize: 14,
										fontWeight: 600,
									}
								}}>
								<Button
									type="link"
									onClick={() => {
										setModalCreateCategoryOpen(true);
									}}
									style={{ marginBottom: 16 }}
								>
									Добавить статью
								</Button>
							</ConfigProvider>
						</div>
						{/* -------------------*/}

						{/* Описание */}
						<div className={styles.modal__part}>
							<ConfigProvider
								theme={{
									token: {
										colorBgContainer: 'white',
										colorBorder: '#5329FF1A',
										borderRadius: 8,
										fontFamily: 'Mulish',
										fontSize: 12,
										fontWeight: 500,
										controlHeightLG: 40,
									},
									components: {
										Input: {
											activeBorderColor: '#5329FF1A',
											hoverBorderColor: '#5329FF1A',
											activeOutlineColor: 'transparent',
											activeBg: 'transparent',
											hoverBg: 'transparent',
											activeBg: 'transparent',
											activeShadow: 'transparent'
										}
									}
								}}>
								<Form.Item
									label="Описание"
									name='description'
									rules={[
										{ required: true, message: 'Пожалуйста, введите значение!', min: 0 },
										{ message: 'Описание не должно быть больше 150 символов!', max: 150 }
									]}
								>
									<Input.TextArea
										size="large"
										autoSize={{ minRows: 1, maxRows: 3 }}
										placeholder='Описание'
									/>
								</Form.Item>
							</ConfigProvider>
						</div>
						{/* -------------------*/}


						<div className={styles.modal__part}>
							<h3 className={styles.modal__subtitle}>
								Распределять на
							</h3>

							{/* РАспределить на магазины, артикулы, бренды */}
							<RadioGroup
								name="selection"
								//label='Тип операции'
								options={[
									{ value: 'shop', label: 'Магазины' },
									{ value: 'vendor_code', label: 'Артикулы' },
									{ value: 'brand_name', label: 'Бренды' },
								]}
							/>

							{editData.is_periodic &&
								<>
									{selection === 'shop' &&
										<ConfigProvider
											renderEmpty={() => (<div>Нет данных</div>)}
											theme={{
												token: {
													colorBgContainer: 'white',
													colorBorder: '#5329FF1A',
													borderRadius: 8,
													fontFamily: 'Mulish',
													fontSize: 12,
												},
												components: {
													Select: {
														activeBorderColor: '#5329FF1A',
														activeOutlineColor: 'transparent',
														hoverBorderColor: '#5329FF1A',
														optionActiveBg: 'transparent',
														optionFontSize: 14,
														optionSelectedBg: 'transparent',
														optionSelectedColor: '#5329FF',
													}
												}
											}}
										>
											<Form.Item
												name="shops"
												rules={[
													{ required: true, message: 'Пожалуйста, выберите значение!' }
												]}
											>
												<MultiSelect
													form={form}
													hasSelectAll
													optionsData={shops?.map((el) => {
														if ((isDemoMode || el.id !== 0) && el.is_primary_collect) {
															return {
																key: el.id,
																value: el.id,
																label: el.brand_name,
																disabled: !el.is_active,
															};
														}
														return false;
													}).filter(Boolean)}
													selectId='shops'
													searchFieldPlaceholder='Поиск по названию магазина'
													selectPlaceholder='Выберите магазины'
												/>
											</Form.Item>
										</ConfigProvider>}
									<ConfigProvider
										renderEmpty={() => (<div>Нет данных</div>)}
										theme={{
											token: {
												colorBgContainer: 'white',
												colorBorder: '#5329FF1A',
												borderRadius: 8,
												fontFamily: 'Mulish',
												fontSize: 12,
											},
											components: {
												Select: {
													activeBorderColor: '#5329FF1A',
													activeOutlineColor: 'transparent',
													hoverBorderColor: '#5329FF1A',
													optionActiveBg: 'transparent',
													optionFontSize: 14,
													optionSelectedBg: 'transparent',
													optionSelectedColor: '#5329FF',
												}
											}
										}}
									>
										{selection === 'vendor_code' &&
											<Form.Item
												name="vendor_codes"
												rules={[
													{ required: true, message: 'Пожалуйста, выберите значение!' }
												]}
											>
												<MultiSelect
													form={form}
													optionsData={filters[0]?.articles.data.map((el, i) => ({
														key: el.value,
														value: el.value,
														label: el.name,
													}))}
													selectId='vendor_codes'
													searchFieldPlaceholder='Поиск по названию артикула'
													selectPlaceholder='Выберите артикулы'
												/>
											</Form.Item>}
										{selection === 'brand_name' &&
											<Form.Item
												name="brand_names"
												rules={[
													{ required: true, message: 'Пожалуйста, выберите значение!' }
												]}
											>
												<MultiSelect
													form={form}
													optionsData={filters[0]?.brands.data.map((el, i) => ({
														key: el.value,
														value: el.value,
														label: el.name,
													}))}
													selectId='brand_names'
													searchFieldPlaceholder='Поиск по названию бренда'
													selectPlaceholder='Выберите бренды'
												/>
											</Form.Item>}
									</ConfigProvider>
								</>
							}


							{!editData.is_periodic &&
								<>
									{/* Селекты магазинов, брендов, артикулов */}
									<ConfigProvider
										renderEmpty={() => (<div>Нет данных</div>)}
										theme={{
											token: {
												colorBgContainer: 'white !important',
												colorBorder: '#5329FF1A',
												borderRadius: 8,
												fontFamily: 'Mulish',
												fontSize: 12,
												fontWeight: 500,
												controlHeightLG: 40,
											},
											components: {
												Select: {
													activeBorderColor: '#5329FF1A',
													activeOutlineColor: 'transparent',
													hoverBorderColor: '#5329FF1A',
													optionActiveBg: 'transparent',
													optionFontSize: 14,
													optionSelectedBg: 'transparent',
													optionSelectedColor: '#5329FF',
												}
											}
										}}
									>

										{selection === 'shop' && editData && !editData.is_periodic &&

											<Form.Item
												name="shop"
												rules={[
													{ required: true, message: 'Пожалуйста, выберите значение!' }
												]}
											>
												<Select
													size="large"
													placeholder="Выберите магазин"
													suffixIcon={<SelectIcon />}
													options={shops?.map((el) => {
														if (el.id === 0) {
															return false
														} else {
															return {
																key: el.id,
																value: el.id,
																label: el.brand_name,
																disabled: !el.is_active,
															}
														}
													}).filter(Boolean)}
												/>
											</Form.Item>

										}
										{selection === 'vendor_code' &&
											<Form.Item
												name="vendor_code"
												rules={[
													{ required: true, message: 'Пожалуйста, выберите значение!' }
												]}
											>
												<Select
													size="large"
													placeholder="Выберите артикул"
													suffixIcon={<SelectIcon />}
													options={filters[0]?.articles.data.map((el, i) => ({
														key: el.value,
														value: el.value,
														label: el.name,
													}))}
												/>
											</Form.Item>}
										{selection === 'brand_name' &&
											<Form.Item
												name="brand_name"
												rules={[
													{ required: true, message: 'Пожалуйста, выберите значение!' }
												]}
											>
												<Select
													size="large"
													placeholder="Выберите бренд"
													suffixIcon={<SelectIcon />}
													options={filters[0]?.brands.data.map((el, i) => ({
														key: el.value,
														value: el.value,
														label: el.name,
													}))}
												/>
											</Form.Item>}
									</ConfigProvider>
								</>
							}

						</div>
						<ConfigProvider
							theme={{
								components: {
									Button: {
										controlHeightLG: 43,
										paddingInlineLG: 12,
										fontWeight: 600,
									},
								},
							}}
						>
							<Flex gap={12} justify="flex-end">
								<ConfigProvider
									theme={{
										token: {
											colorPrimary: 'rgba(83, 41, 255, 0.1)',
											defaultBorderColor: 'transparent',
										},
										components: {
											Button: {
												primaryColor: '#5329FF',
												colorPrimaryHover:
													'rgba(83, 41, 255, 0.1)',
												colorPrimaryActive:
													'rgba(83, 41, 255, 0.3)',
												defaultActiveColor: '#1a1a1a',
												fontWeight: 600,
											},
										},
									}}
								>
									<Button
										type="primary"
										size="large"
										onClick={onCancel}
										htmlType="button"
										loading={loading}
										style={{ fontSize: 14, width: 101, height: 46 }}
									>
										Отменить
									</Button>
								</ConfigProvider>

								<ConfigProvider
									theme={{
										token: {
											colorBorder: '#00000033',
											colorPrimary: '#5329FF',
										},
										components: {
											Button: {
												defaultShadow: '',
												primaryColor: '#FFF',
												controlHeightLG: 45,
												fontWeight: 600,
											},
										},
									}}
								>
									<Button
										type="primary"
										size="large"
										htmlType="submit"
										loading={loading}
										style={{ fontSize: 14, height: 46, width: 151 }}
									>
										{'Сохранить расход'}
									</Button>
								</ConfigProvider>
							</Flex>
						</ConfigProvider>
					</Form>
				</div>
			</Modal >
		</ConfigProvider >
	);
}
