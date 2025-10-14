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

export default function ExpenseMainModal({
	open = true,
	onCancel,
	setModalCreateCategoryOpen,
	category,
	editData,
	handle,
	...props
}) {

	const { shops, filters } = useAppSelector((state) => state.filters);
	const [form] = Form.useForm();

	const selection = Form.useWatch('selection', form);
	const frequency = Form.useWatch('frequency', form);
	const typeValue = Form.useWatch('type', form);


	const onFinish = (values) => {
		values.month = [parseInt(values.month)]
		handle(values)
	};

	const cancelHandler = () => {
		onCancel();
		form.resetFields();
	};

	useEffect(() => {
		if (editData) {
			const selectionType = editData.shop ? 'shop' : editData.brand_name ? 'brand_name' : 'vendor_code';
			form.setFieldsValue({
				type: editData.type || 'once',
				date: editData.date,
				expense_categories: editData.expense_categories,
				selection: 'shop',
				shop: Array.isArray(editData.shop) ? editData.shop?.map((el) => el.id) : [editData.shop?.id],
				vendor_code: Array.isArray(editData.vendor_code) ? editData.vendor_code?.map((el) => el.id) : [editData.vendor_code?.id],
				brand_name: Array.isArray(editData.brand_name) ? editData.brand_name?.map((el) => el.id) : [editData.brand_name?.id],
				frequency: 'week',
				week: editData.week,
				month: editData.month,
				end_date: editData.end_date,
				description: editData.description,
				value: editData.value,
			})
		}
	}, [editData])


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
							{editData && 'Редактирование расхода'}
							{!editData && 'Добавление расхода'}
						</h2>
						<HowToLink
							text='Как это работает?'
							link='/'
						/>
					</header>

					<Form
						form={form}
						onFinish={onFinish}
						layout="vertical"
						className={styles.modal__form}
						initialValues={{
							type: 'once',
							date: format(new Date(), 'dd.MM.yyyy'),
							expense_categories: [],
							selection: 'shop',
							shop: [],
							vendor_code: [],
							brand_name: [],
							frequency: 'week',
							week: [],
						}}
					>

						{/* Тип операции (разова / плановая) */}
						{!editData &&
							<RadioGroup
								label='Тип операции'
								name='type'
								options={[
									{ value: 'once', label: 'Разовая' },
									{ value: 'plan', label: 'Плановая' },
								]}
							/>
						}
						{editData &&
							<p className={styles.modal__typeSubtitle}>{editData.type === 'once' ? 'Разовый расход' : 'Плановый расход'}</p>
						}



						{/* Выбор даты и суммы расхода */}
						<Row className={styles.modal__part} gutter={16}>
							<Col span={12}>
								<DateSelect
									form={form}
									label="Дата"
									formId='date'
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
											{ required: true, message: 'Пожалуйста, введите сумму расхода!' }
										]}
									>
										<Input
											size="large"
											type='number'
											min={0}
											onWheel={(e) => e.currentTarget.blur()}
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
						{typeValue === 'plan' &&
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
										>

											<Input
												size="large"
												type='number'
												min={0}
												placeholder='Число от 1 до 28'
												onWheel={(e) => e.currentTarget.blur()}
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
													{ value: 0, label: 'Понедельник' },
													{ value: 1, label: 'Вторник' },
													{ value: 2, label: 'Среда' },
													{ value: 3, label: 'Четверг' },
													{ value: 4, label: 'Пятница' },
													{ value: 5, label: 'Суббота' },
													{ value: 6, label: 'Воскресенье' },
												]}
												selectId='week'
												hasSearch={false}
												selectPlaceholder='Выберите дни'
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
										{ required: true, message: 'Пожалуйста, выберите значение!' }
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


							{/* Селекты магазинов, брендов, артикулов */}
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
										name="shop"
										rules={[
											{ required: true, message: 'Пожалуйста, выберите значение!' }
										]}
									>
										<MultiSelect
											form={form}
											optionsData={shops?.map((el) => {
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
											selectId='shop'
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
										name="vendor_code"
										rules={[
											{ required: true, message: 'Пожалуйста, выберите значение!' }
										]}
									>
										<MultiSelect
											form={form}
											optionsData={shops?.map((el) => {
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
											optionsData={filters.find(_ => _.shop.id === 0)?.articles.data.map((el, i) => ({
												key: el.value,
												value: el.value,
												label: el.name,
											}))}
											selectId='vendor_code'
											searchFieldPlaceholder='Поиск по названию артикула'
											selectPlaceholder='Выберите артикулы'
										/>
									</Form.Item>}
								{selection === 'brand_name' &&
									<Form.Item
										name="brand_name"
										rules={[
											{ required: true, message: 'Пожалуйста, выберите значение!' }
										]}
									>
										<MultiSelect
											form={form}
											optionsData={filters.find(_ => _.shop.id === 0)?.brands.data.map((el, i) => ({
												key: el.value,
												value: el.value,
												label: el.name,
											}))}
											selectId='brand_name'
											searchFieldPlaceholder='Поиск по названию бренда'
											selectPlaceholder='Выберите бренды'
										/>
									</Form.Item>}
							</ConfigProvider>
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
				</div>
			</Modal >
		</ConfigProvider >
	);
}
