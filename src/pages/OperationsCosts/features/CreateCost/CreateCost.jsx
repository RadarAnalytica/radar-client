import { ConfigProvider, Modal, Flex, Button, Tooltip, Checkbox, Radio, Form, Row, Col, Select, Input } from 'antd';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared';
import styles from '../../shared/styles/modals.module.css';
import { CloseIcon, InfoIcon } from '../../shared/Icons';
import { TimeSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/timeSelect/timeSelect';
import { useState, useMemo, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { DayPicker } from 'react-day-picker';
import { ru } from 'date-fns/locale';
// import ModalFooter from './ModalFooter';
export default function CreateCost({
	open = true,
	onCancel,
	createArticleOpen,
	articles,
	data,
	...props
}) {
	const Title = () => (
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
				<h2 className={styles.modal__title}>Добавление расхода</h2>
				<Tooltip title={'Как это работает'}>
					<Flex gap={10}>
						{InfoIcon} Как это работает
					</Flex>
				</Tooltip>
			</Flex>
		</ConfigProvider>
	);

	console.log('CreateCost', data)
	
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

	const [description, setDescription] = useState(data?.description);

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
		console.log('onFinish', values);
	};

	const cancelHandler = () => {
		onCancel();
		form.resetFields();
	};

	const dateHandler = () => {
		setOpenCalendar((state) => !state)
	}

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
				open={open}
				centered={true}
				closable={true}
				// closeIcon={<CloseIcon className={styles.close__icon} />}
				title={<Title />}
				footer={null}
				width={600}
				onCancel={onCancel}
				props
			>
				<Form form={form} onFinish={onFinish} layout="vertical">
					<h3 className={styles.modal__subtitle}>Тип операции</h3>
					<Form.Item
						className={styles.modal__part}
						name='type'
						// required={true}
						initialValue={data?.type || 'once'}
					>
						<Radio.Group>
							<Radio value="once">Разовая</Radio>
							<Radio value="plan">Плановая</Radio>
						</Radio.Group>
					</Form.Item>
					<Row className="" gutter={16}>
						<Col span={12}>
							<Form.Item label="Дата" name='date' initialValue={data?.date}>
								<Select
									size="large"
									variant="filled"
									placeholder="Выберите дату"
									suffixIcon={icon}
									variant="filled"
									onClick={dateHandler}
									popupRender={() => {}}
									optionRender={() => {}}
								/>
							</Form.Item>
							<div className={`${styles.calendarPopup} ${openCalendar ? styles.visible : ''}`}>
								{openCalendar &&
									<DayPicker
											// minDate={minDate}
											maxDate={new Date()}
											mode=""
											// selected={localSelectedRange}
											// month={month}
											// onMonthChange={setMonth}
											captionLayout="dropdown"
											className={styles.customDayPicker}
											locale={customRuLocale}
											// onDayClick={handleDayClick}
											// disabled={[
													// { before: minDate },
													// { after: maxDate },
											// ]}
											// startMonth={startMonth}
											// endMonth={endMonth}
											// components={{
											// 		Dropdown: DatePickerCustomDropdown
											// }}
									/>}
								</div>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Сумма, руб"
								name='value'
								// required={true}
								initialValue={data?.sum}
							>
								<Input size="large" />
							</Form.Item>
						</Col>
					</Row>
					<div className={styles.modal__part}>
						<Form.Item
							label="Статья"
							name='article'
							initialValue={data?.article}
							// required={true}
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
							initialValue={data?.description}
						>
							<Input.TextArea
								size="large"
								autoSize={{ minRows: 1, maxRows: 6 }}
								onInput={(e) => setDescription(e.target.value)}
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
							<Radio.Group>
								<Radio value="shop">Магазины</Radio>
								<Radio value="sku">Артикулы</Radio>
								<Radio value="brand">Бренды</Radio>
							</Radio.Group>
						</Form.Item>

						{selection === 'shop' && <Form.Item name="shop" initialValue={data?.shop}>
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
								// required={true}
							/>
						</Form.Item>}
						{selection === 'sku' && <Form.Item name="sku">
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
								// required={true}
							/>
						</Form.Item>}
						{selection === 'brand' && <Form.Item name="brands" initialValue={data?.brand}>
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
								// required={true}
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
											controlHeightLG: 43,
											paddingInlineLG: 12,
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
											controlHeightLG: 43,
											paddingInlineLG: 12,
											primaryColor: '#FFF',
											colorPrimaryHover:
												'rgba(83, 41, 255, 0.1)',

											defaultShadow: false,
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
