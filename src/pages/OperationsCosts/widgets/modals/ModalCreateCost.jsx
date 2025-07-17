import {
	ConfigProvider,
	Modal,
	Flex,
	Button,
	Tooltip,
	Checkbox,
	Radio,
	Form,
	Row,
	Col,
	Select,
	Input,
} from 'antd';
import { SelectIcon } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent/shared';
import styles from './modals.module.css';
import { CloseIcon, InfoIcon } from '../Icons';
import { TimeSelect } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent/features/timeSelect/timeSelect';
import { useState } from 'react';
// import ModalFooter from './ModalFooter';
export default function ModalCreateCost({
	open = true,
	onCancel,
	shops,
	createArticleOpen,
	articles,
	brands,
	sku,
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
				align="center"
				gap={16}
				className={styles.modal__header}
			>
				<h2 className={styles.modal__title}>Добавление расхода</h2>
				<Tooltip title={'Как это работает'}>
					<Flex gap={10}>
						<InfoIcon className={styles.info__icon} />
						Как это работает
					</Flex>
				</Tooltip>
			</Flex>
		</ConfigProvider>
	);

	const [selection, setSelection] = useState('shop');

	const icon = <SelectIcon />;

	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('onFinish', values);
	};

	const cancelHandler = () => {
		onCancel();
		form.resetFields();
	};

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
				closeIcon={<CloseIcon className={styles.close__icon} />}
				title={<Title />}
				footer={null}
				width={600}
				onCancel={onCancel}
				props
			>
				<Form form={form} onFinish={onFinish} layout="vertical">
					<h3 className={styles.modal__subtitle}>Тип операции</h3>
					<Form.Item className={styles.modal__part}>
						<Radio.Group>
							<Radio value="once"> Разовая </Radio>
							<Radio value="plan"> Плановая </Radio>
						</Radio.Group>
					</Form.Item>
					<Row className="" gutter={16}>
						<Col span={12}>
							<Form.Item label="Дата">
								<Select
									size="large"
									variant="filled"
									placeholder="Выберите дату"
									suffixIcon={icon}
									variant="filled"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Сумма, руб">
								<Input size="large" />
							</Form.Item>
						</Col>
					</Row>
					<div className={styles.modal__part}>
						<Form.Item label="Статья">
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
						<h3 className={styles.modal__subtitle}>
							Распределять на
						</h3>
						<Form.Item name="selection" onChange={(e) => {
							setSelection(e.target.value);
						}}>
							<Radio.Group defaultValue='shop'>
								<Radio value="shop">Магазины</Radio>
								<Radio value="sku">Артикулы</Radio>
								<Radio value="brands">Бренды</Radio>
							</Radio.Group>
						</Form.Item>

						{selection === 'shop' && <Form.Item name="shop">
							<Select
								size="large"
								options={shops.map((el) => ({
									key: el.id,
									value: el.id,
									label: el.brand_name,
									disabled: !el.is_active,
								}))}
								placeholder="Выберите магазины"
								mode="multiple"
								suffixIcon={icon}
							/>
						</Form.Item>}
						{selection === 'sku' && <Form.Item name="sku">
							<Select
								size="large"
								options={sku.map((el, i) => ({
									key: i,
									value: el.value,
									label: el.name,
								}))}
								placeholder="Выберите артикулы"
								mode="multiple"
								suffixIcon={icon}
							/>
						</Form.Item>}
						{selection === 'brands' && <Form.Item name="brands">
							<Select
								size="large"
								options={brands.map((el, i) => ({
									key: i,
									value: el.value,
									label: el.name,
								}))}
								placeholder="Выберите бренды"
								mode="multiple"
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
