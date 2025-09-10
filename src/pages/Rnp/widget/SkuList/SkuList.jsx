import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ConfigProvider, Button, Flex, Pagination } from 'antd';
import SkuTable from '../SkuTable/SkuTable';
import SkuItem from '../SkuItem/SkuItem';
import styles from './SkuList.module.css';
// import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import { Filters } from '../Filters/Filters';
// import { useAppSelector } from '../../../../redux/hooks';
import { grip, remove, expand } from '../icons';
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements, draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
// import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { attachClosestEdge, extractClosestEdge, } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
// import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { useAppSelector } from '../../../../redux/hooks';
import { NoDataWidget } from '@/pages/productsGroupsPages/widgets';

function SkuListItem({el, index, expanded, setExpanded, setDeleteSkuId, onReorder}) {
	const ref = useRef(null);
	const gripRef = useRef(null);
	const [ closestEdge, setClosestEdge ] = useState(null);

	const expandHandler = (value) => {
		setTimeout(() => {
			ref.current.scrollIntoView({ behavior: "smooth"});
		}, 150)
		if (expanded.includes(value)){
			setExpanded([]);
		} else {
			setExpanded([value]);
		}
	};

	useEffect(() => {
		if (!ref.current) return;

    const element = ref.current;

		const id = el.article_data.wb_id;
		const data = {
			id: id,
			index
		};

		function onChange({ source, self }) {
			document.body.classList.remove(styles.no_drop)
			document.body.classList.add(styles.copy)
			const isSource = source.data.id === id;
			if (isSource) {
				setClosestEdge(null);
				return;
			}

			const closestEdge = extractClosestEdge(self.data);
			const sourceIndex = source.data.index;

			const isItemBeforeSource = index === sourceIndex - 1;
			const isItemAfterSource = index === sourceIndex + 1;

			const isDropIndicatorHidden =
				(isItemBeforeSource && closestEdge === 'bottom') ||
				(isItemAfterSource && closestEdge === 'top');

			if (isDropIndicatorHidden) {
				setClosestEdge(null);
				return;
			}

			setClosestEdge(closestEdge);
		}

		return combine(
			draggable({
      	element: element,
				dragHandle: gripRef.current,
      	getInitialData: () => data,
			}),
			dropTargetForElements({
				element,
				getData({ input, element }) {
					return attachClosestEdge(data, {
						input,
						element,
						allowedEdges: ['top', 'bottom'],
					});
				},
				onDragEnter: onChange,
				onDrag: onChange,
				onDragLeave() {
					document.body.classList.remove(styles.copy)
					document.body.classList.add(styles.no_drop)
					setClosestEdge(null);
				},
				onDrop() {
					document.body.classList.remove(styles.no_drop)
					document.body.classList.remove(styles.copy)
					setClosestEdge(null);
				},
				// onGenerateDragPreview: ({ nativeSetDragImage }) => {
				// setCustomNativeDragPreview({
        //   nativeSetDragImage,
        //   render({ container }) {
				// 		const preview = document.createElement('div');
				// 		preview.className = styles.preview;
				// 		preview.innerHTML = `<b>data.article_data.title}</b> {data.article_data.wb_id}`;
				// 		container.append(preview)
				// 		console.log(container);
        //   },
        // });
				// },
			})
		)
  }, [el, onReorder]);

	return (
		<div className={styles.item} ref={ref}>
			<div className={styles.item_content}>
				{closestEdge === 'top' && (
					<div className={styles.edge_top}></div>
				)}
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
				{closestEdge === 'bottom' && (
					<div className={styles.edge_bottom}></div>
				)}
			</div>
		</div>
	);
}

export default function SkuList({ view, expanded, setExpanded, setView, setAddSkuModalShow, skuDataByArticle, skuDataTotal, setDeleteSkuId }) {
	const { activeBrand } = useAppSelector(
		(state) => state.filtersRnp
	);
	const items = useMemo( () => skuDataByArticle || [], [skuDataByArticle]);

	const initOrder = useCallback(() => {
		// сохранение порядка для id магазина
		let savedOrder = localStorage.getItem( 'rnpOrder' );
		if (savedOrder) {
			try {
				savedOrder = JSON.parse(savedOrder);
			} catch {
				savedOrder = {}
			}
			if (Array.isArray(savedOrder)){
				savedOrder = {};
			}
			if (activeBrand.id in savedOrder){
				const listOrder = savedOrder[activeBrand.id]
				const newItems = 
					items
						.filter((sku) => !listOrder.includes(sku.article_data.wb_id))
						.map((sku) => sku.article_data.wb_id);
				return [...listOrder, ...newItems]
			}
			return items.map((item) => item.article_data.wb_id)

		}
		return items.map((el) => el.article_data.wb_id)
	}, [items])

	const [order, setOrder] = useState(initOrder)
	const ref = useRef(null);

	// const [expanded, setExpanded] = useState([]);

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
		if (!ref.current){
			return
		}
		const element = ref.current;
			return monitorForElements({
				element,
				onDragStart() {
					setExpanded([]);
				},
				onDrop({ location, source }) {

					const target = location.current.dropTargets[0];
					if (!target) {
							return;
					}

					const draggedId = source.data.id;
					const targetId = target.data.id;

					if (draggedId && targetId && draggedId !== targetId) {
						handleReorder(draggedId, targetId);
					}

				},
			});
	}, [items, order, handleReorder]);


	useEffect(() => {
		let savedOrder = localStorage.getItem('rnpOrder');
		if (savedOrder){
			try {	
				savedOrder = JSON.parse(savedOrder);
			} catch {
				savedOrder = {};
			}
			if (Array.isArray(savedOrder)){
				savedOrder = {};
			}
			savedOrder[activeBrand.id] = order;
		} else {
			savedOrder = {};
			savedOrder[activeBrand.id] = order;
		}
		localStorage.setItem( 'rnpOrder', JSON.stringify(savedOrder) );
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
					<div ref={ref}>
						{items?.length > 0 && order.map((orderI, i) => {
								const el = items.find((sku) => sku.article_data.wb_id === orderI)
								if (el) {
									return <SkuListItem
										key={i}
										index={i}
										el={el}
										expanded={expanded}
										setExpanded={setExpanded}
										setDeleteSkuId={setDeleteSkuId}
										onReorder={handleReorder}
									/>
								}
							})
						}
						{/* {items?.length == 0 && <div className={`${styles.item_content} ${styles.item_empty}`}>Нет данных</div>} */}
					</div>
				)}
				{view === 'total' && (
					<>
						{/* {skuDataTotal?.length == 0 && <div className={`${styles.item_content} ${styles.item_empty}`}>Нет данных</div>} */}
						{skuDataTotal && <div className={styles.item_content}>
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
				{((items?.length == 0 && view === 'sku') || (view === 'total' && skuDataTotal)) && 
					<NoDataWidget
						mainTitle='Здесь пока нет ни одного артикула'
						mainText='Добавьте артикулы для отчета «Рука на пульсе»'
						buttonTitle='Добавить'
						action={() => setAddSkuModalShow(true)}
						howLinkGroup={false}
					/>
				}
			</ConfigProvider>
		</>
	);
}
