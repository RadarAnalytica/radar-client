import { ConfigProvider, Modal, Flex, Button, Tooltip, Checkbox, Radio, Form, Row, Col, Select, Input } from 'antd';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared';
import styles from '../../shared/styles/modals.module.css';
import { CloseIcon, InfoIcon } from '../../shared/Icons';
import { TimeSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/timeSelect/timeSelect';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
// import ModalFooter from './ModalFooter';
export default function CreateCost({
	open = true,
	onCancel,
	createArticleOpen,
	articles,
	edit,
	copy,
	// data,
	state = null,
	...props
}) {
	const Title = ({state}) => (
		<ConfigProvider
			theme={{
				components: {
					Button: {
						defaultBorderColor: 'transparent',
						paddingInline: 0,
						boxShadow: 'none',
					},
				},
			}}
		>
			<Flex
				justify="flex-start"
				align="flex-end"
				gap={16}
				className={styles.modal__header}
			>
				<h2 className={styles.modal__title}>
					{edit && 'Редактирование расхода'}
					{copy && 'Копирование расхода'}
					{!edit && !copy && 'Добавление расхода'}
				</h2>
				<Flex gap={10} align='center'>
					<Tooltip title={'Как это работает'}>
						{InfoIcon}
					</Tooltip>
					Как это работает
				</Flex>
			</Flex>
		</ConfigProvider>
	);

	useEffect(() => {
		document.body.classList.add('red')
		return () => document.body.classList.remove('red')
	}, [])

	const { shops, filters } = useAppSelector((state) => state.filters);

	const allFilters = useMemo(() => {
		// сборка данных для значения фильтра Все
		return filters.find((el) => el.shop.id === 0)
	}, [filters]);

	const shopsList = useMemo(() => {
		if (shops && shops.length > 0){
			// сборка магазинов без сбора данных и магазин не Все
			return shops.filter((shop) => (shop.id !== 0 && shop.is_primary_collect))
		}
		return [];
	}, [shops]);

	const brandsList = useMemo(() => {
		if (allFilters && allFilters.brands){
			return allFilters.brands.data
		}
		return [];
	}, [allFilters]);
	
	const articlesList = useMemo(() => {
		if (allFilters && allFilters.articles){
			return allFilters.articles.data
		}
		return [];
	}, [allFilters]);

	const data = edit || copy || null;

	const [selection, setSelection] = useState(() => {
		if (data?.sku) {
			return 'sku'
		}
		if (data?.brand) {
			return 'brand'
		}
		return 'shop'
	}); // 'shop' | 'sku' | 'brand'

	const [openCalendar, setOpenCalendar] = useState(false);

	const customRuLocale = {
			...ru,
			localize: {
					...ru.localize,
					month: (n, options) => {
							const monthName = ru.localize.month(n, options);
							return monthName.charAt(0).toUpperCase() + monthName.slice(1);
					},
			},
	};

	const icon = <SelectIcon />;

	const [form] = Form.useForm();

	const onFinish = (values) => {
		values.date = date;
		console.log('onFinish', values);
	};

	const cancelHandler = () => {
		onCancel();
		form.resetFields();
	};
	
	// const [date, setDate] = useState(data?.date || '10-10-2024');
	const [frequency, setFrequency] = useState('week');
	// const [type, setType] = useState(data?.type || 'once');
	const [date, setDate] = useState(data?.date || format(new Date(), 'MM-d-yyyy'));
	// 2025-09-15
	const dateContainerRef = useRef(null);
	const datePickerRef = useRef(null);
	const today = new Date();
	const minDate = new Date(today);
	const maxDate = new Date(today);
	minDate.setDate(today.getDate() - 90);
	maxDate.setDate(today.getDate() + 90);
	console.log('today', today)
	console.log('minDate', minDate)

	const dateHandler = () => {
		setOpenCalendar((state) => !state)
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dateContainerRef.current && !dateContainerRef.current.contains(event.target)) {
				setOpenCalendar(false);
				// setLocalSelectedRange({ from: null, to: null })
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleDayClick = (day) => {
		console.log('handleDayClick', day)
		setDate(format(day, 'MM-d-yyyy'));
		setOpenCalendar(false);
	}
	const handleOnBlur = (event) => {
		if (datePickerRef.current && !datePickerRef.current.contains(event.target)){
			setOpenCalendar(false);
		}
	}
	// const [sum, setSum] = useState(data?.sum || 0);
	const [description, setDescription] = useState(data?.description || '');


	const typeValue = Form.useWatch('type', form);

	return (
		<ConfigProvider
			renderEmpty={() => <div>Нет данных</div>}
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
						labelFontSize: 16,
						labelColor: '#1a1a1a',
						labelColonMarginInlineEnd: 10,
						labelRequiredMarkColor: '#000'
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
				// open={open}
				open={true}
				centered={true}
				closable={true}
				closeIcon={<CloseIcon className={styles.close__icon} />}
				title={<Title state={state}/>}
				footer={null}
				width={600}
				onCancel={onCancel}
				props
			>
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
					// initialValues={data}
				>
					<h3 className={styles.modal__subtitle}>Тип операции</h3>
					<ConfigProvider
						theme={{
							token: {
								fontSize: 16
							}
						}}>
							<Form.Item
								className={styles.modal__part}
								name='type'
								initialValue={data?.type || 'once'}
							>
								<Radio.Group>
									<Radio value="once">Разовая</Radio>
									<Radio value="plan">Плановая</Radio>
								</Radio.Group>
							</Form.Item>
					</ConfigProvider>
					<Row className={styles.modal__part} gutter={16}>
						<Col span={12} ref={dateContainerRef}>
							<Form.Item
								label="Дата"
								name='date'
								initialValue={format(new Date(date), 'dd.MM.yyyy')}
								rules={[
									{ required: true, message: 'Пожалуйста, выберите дату!' }
								]}
							>
								<Select
									name='date'
									size="large"
									placeholder="Выберите дату"
									suffixIcon={icon}
									variant="filled"
									value={format(new Date(date), 'dd.MM.yyyy')}
									onClick={dateHandler}
									disabled={openCalendar}
									dropdownStyle={{ display: 'none' }}
									style={{display: 'block'}}
								/>
								<div
									ref={datePickerRef}
									className={`${styles.calendarPopup} ${openCalendar ? styles.visible : ''}`}
									>
										<DayPicker
											minDate={minDate}
											maxDate={new Date()}
											fromDate={minDate}
											toDate={new Date()}
											disabled={[
												{ before: minDate },
												{ after: new Date() },
											]}
											mode="single"
											selected={date}
											// onMonthChange={setMonth}
											captionLayout="dropdown"
											className={styles.customDayPicker}
											locale={customRuLocale}
											onDayClick={handleDayClick}
											// disabled={[
													// { before: minDate },
													// { after: maxDate },
											// ]}
											// startMonth={startMonth}
											// endMonth={endMonth}
											// components={{
											// 		Dropdown: DatePickerCustomDropdown
											// }}
									/>
								</div>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Сумма, руб"
								name='value'
								// required={true}
								initialValue={data?.sum}
								// validateStatus='error'
								rules={[
									{ required: true, message: 'Пожалуйста, введите сумму расхода!' }
								]}
							>
								<Input
									size="large"
									type='number'
									min={0}
									onWheel={(e) => e.currentTarget.blur()}
								/>
							</Form.Item>
						</Col>
					</Row>
					{typeValue === 'plan' && <Row className={styles.modal__part} gutter={16}>
						<Col span={12} ref={dateContainerRef}>
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
									suffixIcon={icon}
									defaultValue={frequency}
									options={[
										{ value: 'week', label: 'Каждую неделю' },
										{ value: 'month', label: 'Каждый месяц' },
									]}
									onChange={setFrequency}
								/>
							</Form.Item>
						</Col>

						{frequency === 'month' && <Col span={12}>
							<Form.Item
								label="Число или день"
								name='month'
								// required={true}
								initialValue={data?.month}
								// validateStatus='error'
							>
								{/* убрать изменения при скролле колесиком */}
								{/* disabled добавить */}
								{/* ! обязательные поля */}
								{/* ! логика копирования */}
								{/* формат дней недели */}
								{/* варианты расходов */}
								{/* проверить точку и запятую */}
								<Input
									size="large"
									type='number'
									min={0}
									placeholder='Число от 1 до 28'
									onWheel={(e) => e.currentTarget.blur()}
								/>
							</Form.Item>
						</Col>}

						{frequency === 'week' && <Col span={12}>
							<Form.Item
								label="День недели"
								name='week'
								// required={true}
								initialValue={data?.week}
								rules={[
									{ required: true, message: 'Пожалуйста, выберите значение!' }
								]}
							>
								<Select
									size="large"
									placeholder="Выберите день"
									suffixIcon={icon}
									options={[
										{ value: 0, label: 'Понедельник' },
										{ value: 1, label: 'Вторник' },
										{ value: 2, label: 'Среда' },
										{ value: 3, label: 'Четверг' },
										{ value: 4, label: 'Пятница' },
										{ value: 5, label: 'Суббота' },
										{ value: 6, label: 'Воскресенье' },
									]}
									onChange={setFrequency}
								/>
							</Form.Item>
						</Col>}
					</Row>}
					<div className={styles.modal__part}>
						<Form.Item
							label="Статья"
							name='expense_categories'
							initialValue={data?.article}
							rules={[
									{ required: true, message: 'Пожалуйста, выберите значение!' }
								]}
						>
							<Select
								size="large"
								placeholder="Выберите статью"
								suffixIcon={icon}
								options={articles.map((el, i) => ({
									key: i,
									value: el.title,
									label: el.title,
								}))}
								showSearch
								mode="multiple"
							/>
						</Form.Item>
						<Flex justify="flex-end">
							<Button
								type="link"
								onClick={() => {
									createArticleOpen(true);
								}}
							>
								Добавить статью
							</Button>
						</Flex>
					</div>
					<div className={styles.modal__part}>
						<Form.Item
							label="Описание"
							name='description'
							// required={true}
							initialValue={data?.description || description}
							rules={[
								{ required: true, message: 'Пожалуйста, введите значение!', min: 0 },
								{ message: 'Описание не должно быть больше 150 символов!', max: 150 }
							]}
						>
							<Input.TextArea
								size="large"
								autoSize={{ minRows: 1, maxRows: 3 }}
								// onInput={(e) => setDescription(e.target.value)}
								// maxLength={150}
							/>
						</Form.Item>
					</div>
					<div className={styles.modal__part}>
						<h3 className={styles.modal__subtitle}>
							Распределять на
						</h3>
						<Form.Item
							name="selection"
							initialValue={selection}
							onChange={(e) => {
								setSelection(e.target.value);
							}}
							// required={true}
						>
							<ConfigProvider
								theme={{
									token: {
										fontSize: 16
									}
								}}>
								<Radio.Group>
									<Radio value="shop">Магазины</Radio>
									<Radio value="vendor_code">Артикулы</Radio>
									<Radio value="brand_name">Бренды</Radio>
								</Radio.Group>
							</ConfigProvider>

						</Form.Item>

						{selection === 'shop' && 
							<Form.Item
								name="shop"
								initialValue={data?.shop}
								rules={[
									{ required: true, message: 'ОПожалуйста, выберите значение!' }
								]}
							>
							<Select
								size="large"
								options={shopsList.map((el) => ({
									key: el.id,
									value: el.id,
									label: el.brand_name,
									disabled: !el.is_active,
								}))}
								placeholder="Выберите магазины"
								showSearch
								suffixIcon={icon}
							/>
						</Form.Item>}
						{selection === 'vendor_code' && 
							<Form.Item
								name="vendor_code"
								initialValue={data?.vendor_code}
								rules={[
									{ required: true, message: 'Пожалуйста, выберите значение!' }
								]}
							>
							<Select
								size="large"
								options={articlesList.map((el, i) => ({
									key: i,
									value: el.value,
									label: el.name,
								}))}
								placeholder="Выберите артикулы"
								showSearch
								suffixIcon={icon}
							/>
						</Form.Item>}
						{selection === 'brand_name' && 
						<Form.Item
							name="brand_name"
							initialValue={data?.brand_name}
							rules={[
								{ required: true, message: 'ОПожалуйста, выберите значение!' }
							]}
						>
							<Select
								size="large"
								options={brandsList.map((el, i) => ({
									key: i,
									value: el.value,
									label: el.name,
								}))}
								placeholder="Выберите бренды"
								showSearch
								suffixIcon={icon}
							/>
						</Form.Item>}
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
								>
									Добавить расход
								</Button>
							</ConfigProvider>
						</Flex>
					</ConfigProvider>
				</Form>
			</Modal>
		</ConfigProvider>
	);
}
