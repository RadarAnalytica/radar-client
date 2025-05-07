import { ConfigProvider, Modal, Form, Checkbox, Flex, Button, Input } from 'antd';
import styles from './ReportWeekConfig.module.css';

export default function ReportModal({
	isConfigOpen,
	configCancel,
	columnsList,
  tableColumns,
  setTableColumns
}) {
	console.log('isConfigOpen', isConfigOpen);
	return (
		<ConfigProvider
			theme={{
				components: {
					Modal: {
						padding: 24,
						borderRadiusLG: 16,
						titleFontSize: 24,
						titleColor: '#1a1a1a',
					},
					Button: {
						paddingBlockLG: 12,
						paddingInlineLG: 9.5,
            controlHeightLG: 45,
						defaultShadow: false,
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
            colorLink: '#5329FF',
            colorLinkHover: '#7a52ff',
            colorLinkActive: '#3818d9'
            
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
            paddingBlockLG: 12,
            paddingInlineLG: 16,
            borderRadiusLG: 8,
            activeBorderColor: '#5329ff',
            fontSize: 16,
            lineHeight: 1
          }
				},
			}}
		>
			<Modal
				open={isConfigOpen}
				onCancel={configCancel}
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
				footer={false}
			>
        <Flex gap={8}>
          <Input
            size='large'
            placeholder='Название столбца'
            allowClear
          />
          <Button
            type='primary'
            size='large'
          >
            Найти
          </Button>
          <Button
            type="link"
            size='large'
          >
            Выбрать все
          </Button>
        </Flex>
				<Form>
					<Flex wrap className={styles.list}>
						{columnsList.map((el) => (
							<Form.Item className={styles.item}>
								<Checkbox>{el.title}</Checkbox>
							</Form.Item>
						))}
						<Flex
							gap={12}
							justify="end"
							align="end"
							className={styles.controls}
						>
							<Button
								size="large"
								onClick={configCancel}
							>
								Отменить
							</Button>
							<Button
								type="primary"
								size="large"
							>
								Применить
							</Button>
						</Flex>
					</Flex>
				</Form>
			</Modal>
		</ConfigProvider>
	);
}
