import {
	ConfigProvider,
	Modal,
	Flex,
	Button,
	Form,
	Input,
} from 'antd';
import { SelectIcon } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent/shared';
import styles from './modals.module.css';
import { CloseIcon } from '../../shared/Icons';
import { useState } from 'react';
export default function ModalCreateExpenses({
	open = true,
	onCancel,
	onSubmit,
	...props
}) {

	const [title, setTitle] = useState(null);

	const [form] = Form.useForm();

	const onFinish = () => {
		onSubmit({title: title.trim()});
		onCancel();
		setTitle(null)
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
				title={
					<h2 className={styles.modal__title}>
						Добавление статьи расходов
					</h2>
				}
				footer={null}
				width={600}
				onCancel={onCancel}
				props
			>
				<Form form={form} onFinish={onFinish} layout="vertical">
					<Form.Item className={styles.modal__part} label="Название" name='title'>
						<Input size="large" onChange={(e) => { setTitle(e.target.value) }}/>
					</Form.Item>
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
									disabled={!title?.trim()}
								>
									Добавить статью
								</Button>
							</ConfigProvider>
						</Flex>
					</ConfigProvider>
				</Form>
			</Modal>
		</ConfigProvider>
	);
}
