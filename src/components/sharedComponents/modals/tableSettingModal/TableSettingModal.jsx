import {
	ConfigProvider,
	Modal,
	Form,
	Checkbox,
	Flex,
	Row,
	Col,
	Button,
	Input,
} from 'antd';
import styles from './TableSettingModal.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'antd/es/form/Form';

export default function TableSettingModal({
	isModalOpen = true,
	closeModal,
	columnsList,
	tableColumns,
	setTableColumns,
	filter = true,
	footer = null
}) {
	const [shownColumns, setShownColumns] = useState(columnsList);
	const [checked, setChecked] = useState(tableColumns.map((el) => el.dataIndex));
		
	// const checkAll = useMemo(() => checked.length == shownColumns.length, [shownColumns])
	
	const checkAll = checked.length == columnsList.length
	const indeterminateAll = checked.length > 0 && checked.length < shownColumns.length


	const [form] = useForm();

	function filterColumns(data) {
		const value = data.filter.trim();
		if (!value) {
			setShownColumns(columnsList);
			return
		}
		setShownColumns(() => (
			columnsList.filter((el) => {
				return el.title.toLowerCase().includes(value);
			})
		));
	}

	function onFinish(data) {
		if (data.length == 0) {
			closeModal();
			return;
		}
		
		setTableColumns(() => {
			return columnsList.reduce((res, el) => {
				if (
					el.dataIndex in data && data[el.dataIndex] || 
					( Object.keys(data).length !== columnsList.length && tableColumns.find((column) => column.dataIndex === el.dataIndex))
				){
					res.push(el);
				}
				return res;
			}, []);
		});

		closeModal();
	}

	function сheckAllHandler(){
		const data = form.getFieldsValue()
		for (const check in data) {
      form.setFieldValue(check, shownColumns.length > checked.length ? true : false)
    }
		if (checked.length == shownColumns.length){
			setChecked([])
		} else {
			setChecked(shownColumns.map((el) => el.dataIndex))
		}
	}

	function checkChangeHandler(){
		const data = form.getFieldsValue()
    let result = [];
    for (const week in data){
      data[week] && result.push(Number(week))
    }
		setChecked(result)
	}

	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Mulish, sans-serif',
				},
				components: {
					Modal: {
						padding: 24,
						borderRadiusLG: 16,
						titleFontSize: 24,
						titleColor: '#1a1a1a',
					},
					Button: {
						paddingInlineSM: 0,
						paddingBlockLG: 9.5,
						paddingInlineLG: 12,
						controlHeightLG: 44,
						defaultShadow: false,
						contentFontSize: 16,
						contentFontSizeSM: 16,
						colorBorder: '#00000033',
						defaultColor: '#5329FF',
						defaultBg: '#e7e1fe',
						defaultBorderColor: '#e7e1fe',
						defaultHoverColor: '#5329FF',
						defaultHoverBg: '#f3f0ff',
						defaultHoverBorderColor: '#f3f0ff',
						defaultActiveBorderColor: '#bcb6d9',
						defaultActiveBg: '#bcb6d9',
						colorPrimary: '#5329FF',
						primaryColor: '#fff',
						colorPrimaryBg: '#5329FF',
						colorPrimaryBorder: '#5329FF',
						colorPrimaryBgHover: '#7a52ff',
						colorPrimaryBorderHover: '#7a52ff',
						colorPrimaryHover: '#7a52ff',
						colorPrimaryActive: '#3818d9',
						LinkInlinePadding: 0,
						colorLink: '#5329FF',
						colorLinkHover: '#7a52ff',
						colorLinkActive: '#3818d9',
					},
					Checkbox: {
						fontSize: 16,
						padding: 8,
						colorBorder: '#ccc',
						colorPrimary: '#5329ff',
						colorPrimaryBorder: '#5329ff',
						colorPrimaryHover: '#5329ff',
					},
					Input: {
						controlHeight: 45,
						paddingBlockLG: 9,
						paddingInlineLG: 16,
						borderRadiusLG: 8,
						fontSize: 16,
						lineHeight: 1,
					},
					Form: {
						itemMarginBottom: 0,
					},
				},
			}}
		>
			<Modal
				open={isModalOpen}
				onCancel={closeModal}
				title="Настройки таблицы"
				closeIcon={
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z"
							fill="#1A1A1A"
							fillOpacity="0.5"
						/>
					</svg>
				}
				width={1200}
				footer={footer}
				centered={true}
			>
				{filter && <Flex className={styles.filter} gap={8}>
					<Form
						className={styles.form} 
						onFinish={filterColumns} 
					>
						<Flex gap={8}>
							<Form.Item className={styles.input} name="filter">
								<Input
									size="large"
									placeholder="Название столбца"
									allowClear={{
										clearIcon: (
											<svg
												className={styles.clear__icon}
												viewBox="0 0 15 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M14.7074 2.60356C15.0979 2.21304 15.0979 1.57987 14.7074 1.18935C14.3168 0.798823 13.6837 0.798823 13.2931 1.18935L7.58602 6.89646L2.08601 1.39645C1.69549 1.00593 1.06232 1.00593 0.671799 1.39645C0.281275 1.78698 0.281275 2.42014 0.671799 2.81067L5.96469 8.10356L0.671799 13.3965C0.281275 13.787 0.281275 14.4201 0.671799 14.8107C1.06232 15.2012 1.69549 15.2012 2.08601 14.8107L7.79313 9.10355L13.2931 14.6036C13.6837 14.9941 14.3168 14.9941 14.7074 14.6036C15.0979 14.213 15.0979 13.5799 14.7074 13.1893L9.41446 7.89645L14.7074 2.60356Z"
												/>
											</svg>
										),
									}}
									onClear={() => setShownColumns(columnsList)}
								/>
							</Form.Item>

							<Button
								type="primary"
								size="large"
								iconPosition="start"
								htmlType="submit"
								icon={
									<svg
										width="21"
										height="21"
										viewBox="0 0 21 21"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M1.95312 9.60359C1.95312 5.25404 5.47914 1.72803 9.82869 1.72803C14.1782 1.72803 17.7043 5.25404 17.7043 9.60359C17.7043 13.9531 14.1782 17.4792 9.82869 17.4792C5.47914 17.4792 1.95312 13.9531 1.95312 9.60359ZM9.82869 0.228027C4.65071 0.228027 0.453125 4.42561 0.453125 9.60359C0.453125 14.7816 4.65071 18.9792 9.82869 18.9792C12.1477 18.9792 14.2701 18.1372 15.9068 16.7423L19.9365 20.7721L20.9972 19.7114L16.9674 15.6817C18.3623 14.0449 19.2043 11.9226 19.2043 9.60359C19.2043 4.42561 15.0067 0.228027 9.82869 0.228027Z"
											fill="white"
										/>
									</svg>
								}
							>
								Найти
							</Button>
						</Flex>
					</Form>
					{/* <Button type="link" size="large" onClick={checkAllHandler}>
						Выбрать все
					</Button> */}
				</Flex>}
				<div className={styles.check_all}>
					<Button type='link' size='small' onClick={сheckAllHandler}>
						{shownColumns.every( (el) => checked.includes(el.dataIndex)) ? 'Снять все' : 'Выбрать все'}
					</Button>
					{/* <Checkbox
						className={styles.item}
						indeterminate={indeterminateAll}
						onChange={сheckAllHandler}
						defaultChecked={checkAll}
					>
						Выбрать все
					</Checkbox> */}
				</div>
				<Form form={form} onFinish={onFinish}>
					<Flex gap={[16, 12]} vertical wrap className={styles.list}>
						{shownColumns.map((el, i) => (
							<Col span={8} className={styles.item}>
								<Form.Item
									key={i}
									name={el.dataIndex}
									valuePropName="checked"
									value={el.dataIndex}
									initialValue={checked.includes(
											el.dataIndex
									)}
									onChange={checkChangeHandler}
								>
									<Checkbox >
										{el.title}
									</Checkbox>
								</Form.Item>
							</Col>
						))}

					</Flex>
					<Flex
						gap={12}
						justify="end"
						align="end"
						className={styles.controls}
					>
						<Button size="large" onClick={closeModal}>
							Отменить
						</Button>
						<Button
							type="primary"
							size="large"
							htmlType="submit"
						>
							Применить
						</Button>
					</Flex>
				</Form>
			</Modal>
		</ConfigProvider>
	);
}
