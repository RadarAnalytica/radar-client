import { useEffect, useState } from 'react';
import { ConfigProvider, Button, Flex } from 'antd';
import SkuTable from '../SkuTable/SkuTable';
import SkuItem from '../SkuItem/SkuItem';
import styles from './SkuList.module.css';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import SkuHeader from '../SkuItem/SkuItem';
import { useAppSelector } from '../../../../redux/hooks';
import { grip, remove, expand } from '../icons';

export default function SkuList({ skuDataByArticle, skuDataTotal, setAddSkuModalShow, setSkuList, view, setView, setDeleteSkuId }) {
	const { shops } = useAppSelector((state) => state.shopsSlice);
	// const [view, setView] = useState('sku');
	const [expanded, setExpanded] = useState(null);
	useEffect(() => {
		if (skuDataByArticle?.length > 0 && view === 'sku') {
			setExpanded(skuDataByArticle[0].article_data.product_id);
		}
	}, [skuDataByArticle]);

	const expandHandler = (value) => {
		setExpanded((id) => (id !== value ? value : null));
	};

	const removeHandler = (value) => {
		setSkuList((list) => list.filter((el) => el.id !== value));
	};

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#EEEAFF',
						colorTextLightSolid: '#1a1a1a',
						fontSize: 16,
						borderRadius: 8,
					},
					components: {
						Button: {
							paddingBlockLG: 10,
							paddingInlineLG: 20,
							controlHeightLG: 45,
							defaultShadow: false,
							contentFontSize: 16,
							fontWeight: 500,
							defaultBorderColor: 'transparent',
							defaultColor: 'rgba(26, 26, 26, 0.5)',
							defaultBg: 'transparent',
							defaultHoverBg: '#EEEAFF',
							defaultHoverColor: '#1a1a1a',
							defaultHoverBorderColor: 'transparent',
							defaultActiveColor: 'rgba(26, 26, 26, 1)',
							defaultActiveBg: '#EEEAFF',
							defaultActiveBorderColor: '#EEEAFF',
						},
					},
				}}
			>
				<Flex justify="space-between">
					<Flex>
						<Button
							type={view === 'sku' ? 'primary' : 'default'}
							size="large"
							onClick={() => {
								setView('sku');
								// setSkuList(null);
								// setView('sku');
							}}
						>
							По артикулам
						</Button>
						<Button
							type={view === 'total' ? 'primary' : 'default'}
							size="large"
							onClick={() => {
								setView('total');
								// setSkuList(null);
								// setView('total');
							}}
						>
							Сводный
						</Button>
					</Flex>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: '#5329ff',
								colorText: '#fff',
							},
							components: {
								Button: {
									primaryColor: '#fff',
								},
							},
						}}
					>
						<Button
							type="primary"
							size="large"
							onClick={setAddSkuModalShow}
						>
							Добавить артикул
						</Button>
					</ConfigProvider>
				</Flex>
			</ConfigProvider>
			<div>
				<Filters timeSelect={false} />
				<Filters timeSelect={false} />
			</div>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#EEEAFF',
						colorTextLightSolid: '#1a1a1a',
						fontSize: 16,
						borderRadius: 8,
					},
					components: {
						Button: {
							paddingBlockLG: 10,
							paddingInlineLG: 20,
							controlHeightLG: 45,
							defaultShadow: false,
							contentFontSize: 16,
							fontWeight: 500,
							defaultBorderColor: 'transparent',
							defaultColor: 'rgba(26, 26, 26, 0.5)',
							defaultBg: 'transparent',
							defaultHoverBg: '#EEEAFF',
							defaultHoverColor: '#1a1a1a',
							defaultHoverBorderColor: 'transparent',
							defaultActiveColor: 'rgba(26, 26, 26, 1)',
							defaultActiveBg: '#EEEAFF',
							defaultActiveBorderColor: '#EEEAFF',
						},
					},
				}}
			>
				{view === 'sku' && (
					<>
						{skuDataByArticle?.map((el, i) => (
							<div key={i} className={styles.item}>
								<header className={styles.item__header}>
									<Flex gap={20} align="center">
										{/* <Button
											className={styles.item__button}
											icon={grip}
										/> */}
										<div className={styles.item__product}>
											<SkuItem
												title={el.article_data.title}
												photo={el.article_data.photo}
												sku={el.article_data.wb_id}
												shop={el.article_data.shop_name}
											/>
										</div>
										<Button
											className={styles.item__button}
											onClick={
												() =>
													setDeleteSkuId(
														el.article_data
															.product_id
													)
												// deleteHandler(el.article_data.product_id)
											}
											icon={remove}
										/>
										<Button
											className={`${
												styles.item__button
											} ${
												expanded ===
													el.article_data
														.product_id &&
												styles.item__button_expand
											}`}
											value={el.id}
											onClick={() =>
												expandHandler(
													el.article_data.product_id
												)
											}
											icon={expand}
										></Button>
									</Flex>
								</header>
								{expanded === el.article_data.product_id && (
									<div
										className={`${styles.item__table} ${styles.item}`}
									>
										<SkuTable
											data={el.table.rows}
											columns={el.table.columns}
											defaultExpandAllRows={
												view === 'sku'
											}
										/>
									</div>
								)}
							</div>
						))}
					</>
				)}
				{view === 'total' && (
					<div className={styles.item}>
						<SkuTable
							// data={null}
							data={skuDataTotal?.table?.rows}
							// columns={null}
							columns={skuDataTotal?.table?.columns}
							defaultExpandAllRows={false}
						/>
					</div>
				)}
			</ConfigProvider>
		</>
	);
}
