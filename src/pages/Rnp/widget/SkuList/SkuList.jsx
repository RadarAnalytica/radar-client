import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ConfigProvider, Button, Flex, Pagination } from 'antd';
import SkuTable from '../SkuTable/SkuTable';
import SkuItem from '../SkuItem/SkuItem';
import styles from './SkuList.module.css';
// import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import { Filters } from '../Filters/Filters';
import { useAppSelector } from '../../../../redux/hooks';
import { grip, remove, expand } from '../icons';
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";

function SkuListItem({el, expanded, setExpanded, setDeleteSkuId, onReorder}) {
	const ref = useRef(null);
	const gripRef = useRef(null);
	const [ isDrag, setIsDrag ] = useState(false)
	const [ previewDrag, setPreviewDrag ] = useState(null)

	const expandHandler = (value) => {
		setExpanded((list) => {
			if (list.includes(value)){
				return list.filter((id) => id !== value)
			} else {
			 return [...list, value]
		 }
		})
	};

	useEffect(() => {
    const element = ref.current;
    if (!element) return;

		const grip = gripRef.current;
		const id = el.article_data.wb_id;
		const data = el;

    // Делаем элемент перетаскиваемым
    const cleanupDraggable = draggable({
      element: element,
			dragHandle: grip,
			onDragStart: () => {
				setExpanded([]);
				element.classList.add(styles.isdrag)
			},
      getInitialData: () => ({ id: id }),
			onDrop: () => {
				element.classList.remove(styles.isdrag)
			}
			// onGenerateDragPreview: ({ nativeSetDragImage }) => {
			// 	setCustomNativeDragPreview({
      //     nativeSetDragImage,
      //     render({ container }) {
			// 			const preview = document.createElement('div');
			// 			preview.className = styles.preview;
			// 			preview.innerHTML = `<b>${data.article_data.title}</b> ${data.article_data.wb_id}`;
			// 			container.append(preview)
      //     },
      //   });
			// },
    });

    // Делаем элемент целью для перетаскивания
    const cleanupDropTarget = dropTargetForElements({
      element,
      getData: () => ({ id: id }),
      onDrop: ({ source, location }) => {
        if (!source || !location.current) return;
        
        const draggedId = source.data.id;
        const targetId = id;
        
        // Проверяем, что элемент перетаскивается на другой элемент
        if (draggedId && targetId && draggedId !== targetId) {
          onReorder(draggedId, targetId);
        }
      },
    });

    return () => {
      cleanupDraggable();
      cleanupDropTarget();
    };
  }, [el, onReorder]);

	return (
		<div className={styles.item} ref={ref}>
			<header>
				<Flex gap={20} align="center">
					<Button
						className={styles.item__button}
						icon={grip}
						ref={gripRef}
						onClick={() => setExpanded([])}
					/>
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
						onClick={() => setDeleteSkuId(el.article_data.wb_id)}
						icon={remove}
						title="Удалить артикул"
					/>
					<Button
						className={`${styles.item__button} ${
							expanded.includes(el.article_data.wb_id) &&
							styles.item__button_expand
						}`}
						onClick={() => expandHandler(el.article_data.wb_id) }
						icon={expand}
					></Button>
				</Flex>
			</header>
			{expanded.includes(el.article_data.wb_id) && (
				<div className={`${styles.item__table} ${styles.item}`}>
					<SkuTable
						data={el.table.rows}
						columns={el.table.columns}
					/>
				</div>
				)}
		</div>
	);
}

export default function SkuList({ view, setView, setAddSkuModalShow, skuDataByArticle, skuDataTotal, setDeleteSkuId, page, setPage, paginationState }) {

  const [items, setItems] = useState(skuDataByArticle);

	const initOrder = useCallback(() => {
		let savedOrder = localStorage.getItem( 'rnpOrder' );
		if (savedOrder) {
			savedOrder = JSON.parse(savedOrder);
			const newItems = items.filter((sku) => !savedOrder.includes(sku.article_data.wb_id)).map((sku) => sku.article_data.wb_id);
			return [...savedOrder, ...newItems]
		}

		return items.map((el) => el.article_data.wb_id)

	}, [items])

	const [order, setOrder] = useState(initOrder())
	
	const ref = useRef(null);
	const [expanded, setExpanded] = useState([]);

	useEffect(() => {
		if (items?.length > 0) {
			setExpanded([ items[0].article_data.wb_id ]);
		}
	}, [items]);

	const handleReorder = (draggedId, targetId) => {
    const draggedIndex = order.findIndex(i => i === draggedId);
    const targetIndex = order.findIndex(i => i === targetId);
    
    if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
      const newOrder = [...order];
      const [removed] = newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, removed);
      setOrder(newOrder);
    }
  };

	useEffect(() => {
		localStorage.setItem( 'rnpOrder', JSON.stringify(order) );
	}, [order])

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
						<div>
							{order.map((orderI, i) => {
								const el = items.find((sku) => sku.article_data.wb_id === orderI)
								if (el) {
									return <SkuListItem
										key={i}
										el={el}
										expanded={expanded}
										setExpanded={setExpanded}
										setDeleteSkuId={setDeleteSkuId}
										onReorder={handleReorder}
									/>
								}
							})}
						</div>
						{/* <ConfigProvider
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
							/>
						</ConfigProvider> */}
						{items?.length == 0 && <div className={styles.item}>Нет данных</div>}
					</>
				)}
				{view === 'total' && (
					<>
						{skuDataTotal?.length == 0 && <div className={styles.item}>Нет данных</div>}
						{skuDataTotal?.length != 0 && <div className={styles.item}>
							<SkuTable
								// data={null}
								data={skuDataTotal?.table?.rows}
								// columns={null}
								columns={skuDataTotal?.table?.columns}
								defaultExpandAllRows={true}
							/>
						</div>}
					</>
				)}
			</ConfigProvider>
		</>
	);
}
