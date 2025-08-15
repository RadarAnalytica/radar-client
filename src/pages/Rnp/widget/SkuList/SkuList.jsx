import { useEffect, useState } from 'react';
import { ConfigProvider, Button, Flex, Pagination } from 'antd';
import SkuTable from '../SkuTable/SkuTable';
import SkuItem from '../SkuItem/SkuItem';
import styles from './SkuList.module.css';
// import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import { Filters } from '../Filters/Filters';
import { useAppSelector } from '../../../../redux/hooks';
import { grip, remove, expand } from '../icons';

export default function SkuList({ skuDataByArticle, skuDataTotal, setAddSkuModalShow, setSkuList, view, setView, setDeleteSkuId, page, setPage, paginationState }) {
	const { shops } = useAppSelector((state) => state.shopsSlice);
	const [expanded, setExpanded] = useState([]);
	useEffect(() => {
		if (skuDataByArticle?.length > 0 && view === 'sku') {
			setExpanded([skuDataByArticle[0].article_data.product_id]);
		}
	}, [skuDataByArticle]);

	const expandHandler = (value) => {
		setExpanded((list) => {
			if (list.includes(value)){
				return list.filter((id) => id !== value)
			} else {
			 return [...list, value]
		 }
		})
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
							paddingInlineLG: 20,
							controlHeightLG: 45,
							defaultShadow: false,
							contentFontSize: 16,
							fontWeight: 600,
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
							}}
						>
							По артикулам
						</Button>
						<Button
							type={view === 'total' ? 'primary' : 'default'}
							size="large"
							onClick={() => {
								setView('total');
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
									paddingInlineLG: 16,
									contentFontSizeLG: 16
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
				<Filters />
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
								<header>
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
											onClick={ () => setDeleteSkuId(el.article_data.wb_id) }
											icon={remove}
											title='Удалить артикул'
										/>
										<Button
											className={`${
												styles.item__button
											} ${ expanded.includes(el.article_data.product_id) && styles.item__button_expand }`}
											value={el.id}
											onClick={ () => expandHandler( el.article_data.product_id ) }
											icon={expand}
											title='Развернуть'
										></Button>
									</Flex>
								</header>
								{expanded.includes(el.article_data.product_id) && (
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
						<ConfigProvider
                    theme={{
                        token: {
                            colorText: '#5329FF',
                            colorPrimary: '#5329FF',
                            colorBgTextHover: '#5329FF0D',
                            controlInteractiveSize: 20
                        },
                        components: {
                            Pagination: {
                                itemActiveBg: '#EEEAFF',
                                itemBg: '#F7F7F7',
                                itemColor: '#8C8C8C',
                            }
                        }
                    }}
                >
						<Pagination
								locale={{
										items_per_page: 'записей на странице',
										jump_to: 'Перейти',
										jump_to_confirm: 'подтвердить',
										page: 'Страница',
										prev_page: 'Предыдущая страница',
										next_page: 'Следующая страница',
										prev_5: 'Предыдущие 5 страниц',
										next_5: 'Следующие 5 страниц',
										prev_3: 'Предыдущие 3 страниц',
										next_3: 'Следующие 3 страниц',
								}}
								defaultCurrent={1}
								current={page}
								onChange={setPage}
								total={paginationState.total}
								pageSize={paginationState.pageSize}
								showSizeChanger={false}
								hideOnSinglePage={true}
						/></ConfigProvider>
					</>
				)}
				{view === 'total' && (
					<div className={styles.item}>
						<SkuTable
							// data={null}
							data={skuDataTotal?.table?.rows}
							// columns={null}
							columns={skuDataTotal?.table?.columns}
							defaultExpandAllRows={true}
						/>
					</div>
				)}
			</ConfigProvider>
		</>
	);
}
