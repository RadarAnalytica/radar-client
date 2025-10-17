import { ConfigProvider, Modal, Flex, Button, Form, Input, } from 'antd';
import { SelectIcon } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent/shared';
import styles from '../../shared/styles/modals.module.css';
import { CloseIcon } from '../../shared/Icons';
import { useMemo, useState } from 'react';

export default function ModalCreateCategory({
	open = true,
	onCancel,
	onSubmit,
	data = null,
	loading = false,
	...props
}) {

	const [form] = Form.useForm();
	const name = Form.useWatch('name', form);
	const onFinish = (form) => {
		onSubmit({ name: form.name.trim() });
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
					fontFamily: 'Mulish',
				},
				components: {
					Modal: {},
					Form: {
						itemMarginBottom: 8,
						labelFontSize: 12,
						labelColor: '#1a1a1a',
						labelColonMarginInlineEnd: 10,
					},
					Button: {
						paddingInline: 0,
						padding: 0,
						fontWeight: 700,
						controlHeight: 46,
					},
					Radio: {
						wrapperMarginInlineEnd: 16,
						radioSize: 20,
					},
					Input: {
						activeBorderColor: '#5329FF1A',
						hoverBorderColor: '#5329FF1A',
						activeOutlineColor: 'transparent',
						activeBg: 'transparent',
						hoverBg: 'transparent',
						activeBg: 'transparent',
						activeShadow: 'transparent'
					}
				},
			}}
		>
			<Modal
				className={styles.modal}
				open={open}
				centered={true}
				closable={true}
				closeIcon={
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
					</svg>

				}
				title={
					<h2 className={styles.modal__title}>
						{data?.id ? 'Редактирование статьи расходов' : 'Добавление статьи расходов'}
					</h2>
				}
				footer={null}
				width={600}
				onCancel={onCancel}
				props
			>
				<Form form={form} onFinish={onFinish} layout="vertical">
					<Form.Item
						className={styles.modal__part}
						label="Название"
						name='name'
						initialValue={data?.name}
						rules={[
							{ required: true, message: 'Пожалуйста, введите значение!', min: 0 },
							{ message: 'Название не должно быть больше 30 символов!', max: 30 }
						]}
					>
						<Input
							size="large"
						// onChange={(e) => { setName(e.target.value) }}
						/>
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
										fontSize: 12,
									},
									components: {
										Button: {
											controlHeightLG: 46,
											paddingInlineLG: 16,
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
										fontSize: 12,
										colorTextDisabled: '#fff',
										colorBgContainerDisabled: '#DDD4FF'
									},
									components: {
										Button: {
											controlHeightLG: 46,
											paddingInlineLG: 15,
											primaryColor: '#FFF',
											defaultShadow: 'none',
											borderColorDisabled: 'transparent'
										},
									},
								}}
							>
								<Button
									type="primary"
									size="large"
									htmlType="submit"
									loading={loading}
									disabled={!name?.trim()}
								>
									{data?.id ? 'Изменить статью' : 'Добавить статью'}
								</Button>
							</ConfigProvider>
						</Flex>
					</ConfigProvider>
				</Form>
			</Modal>
		</ConfigProvider>
	);
}
