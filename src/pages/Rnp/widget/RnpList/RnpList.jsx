import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ConfigProvider, Button, Flex, Pagination } from 'antd';
import RnpTable from '../RnpTable/RnpTable';
import RnpItem from '../RnpItem/RnpItem';
import styles from './RnpList.module.css';
import { grip, remove, expand } from '../icons';
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements, draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/entry-point/element';
// import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { attachClosestEdge, extractClosestEdge, } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
// import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { useAppSelector } from '../../../../redux/hooks';
import { NoDataWidget } from '@/pages/productsGroupsPages/widgets';
import RnpTableTotal from '../RnpTable/RnpTableTotal';

// Компонент edge drop-зон (верх и низ viewport)
function EdgeDropZone({ position, isActive, isDragging, onDrop }) {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;

		const element = ref.current;

		return combine(
			dropTargetForElements({
				element,
				getData() {
					return { edgeDropZone: position }; // 'top' или 'bottom'
				},
				onDragEnter() {
					document.body.classList.remove(styles.no_drop);
					document.body.classList.add(styles.copy);
				},
				onDragLeave() {
					document.body.classList.remove(styles.copy);
					document.body.classList.add(styles.no_drop);
				},
				onDrop({ source }) {
					document.body.classList.remove(styles.no_drop);
					document.body.classList.remove(styles.copy);
					onDrop(source.data.id, position);
				},
			}),
			// Убираем автоскролл из EdgeDropZone - он должен быть только на контейнере
		);
	}, [position, onDrop]);

	return (
		<div
			ref={ref}
			className={`${styles.edge_drop_zone} ${styles[`edge_drop_zone_${position}`]} ${isDragging ? styles.edge_drop_zone_visible : ''} ${isActive ? styles.edge_drop_zone_active : ''}`}
		>
			{(isDragging || isActive) && (
				<div className={styles.edge_drop_zone_content}>
					{position === 'top' ? '⬆️ В начало списка' : '⬇️ В конец списка'}
				</div>
			)}
		</div>
	);
}

// Компонент drop-зоны между карточками
function DropZone({ index, isActive, isDragging, draggedIndex, onDrop }) {
	const ref = useRef(null);

	// Определяем, должна ли зона быть видимой
	// Зона НЕ должна быть видимой если:
	// 1. Нет активного drag
	// 2. Это зона над перетаскиваемой карточкой (index === draggedIndex)
	// 3. Это зона под перетаскиваемой карточкой (index === draggedIndex + 1)
	const shouldBeVisible = isDragging && draggedIndex !== null &&
		index !== draggedIndex && index !== draggedIndex + 1;

	useEffect(() => {
		if (!ref.current) return;

		const element = ref.current;

		return combine(
			dropTargetForElements({
				element,
				getData() {
					return { dropZoneIndex: index };
				},
				onDragEnter() {
					document.body.classList.remove(styles.no_drop);
					document.body.classList.add(styles.copy);
				},
				onDragLeave() {
					document.body.classList.remove(styles.copy);
					document.body.classList.add(styles.no_drop);
				},
				onDrop({ source }) {
					document.body.classList.remove(styles.no_drop);
					document.body.classList.remove(styles.copy);
					onDrop(source.data.id, index);
				},
			}),
			// Убираем автоскролл из DropZone - он должен быть только на контейнере
		);
	}, [index, onDrop]);

	return (
		<div
			ref={ref}
			className={`${styles.drop_zone} ${shouldBeVisible ? styles.drop_zone_visible : ''} ${isActive ? styles.drop_zone_active : ''}`}
		>
			{(shouldBeVisible || isActive) && (
				<div className={styles.drop_zone_content}>
					Перетащите карточку сюда
				</div>
			)}
		</div>
	);
}

function RnpListItem({ el, index, expanded, setExpanded, setDeleteRnpId, onReorder, isDragging }) {
	const ref = useRef(null);
	const gripRef = useRef(null);
	const [closestEdge, setClosestEdge] = useState(null);

	const expandHandler = (value) => {
		const timeout = setTimeout(() => {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}, 150)
		let newExpanded = 'collapsed';
		if (expanded !== value) {
			newExpanded = value;
		}
		setExpanded(newExpanded);
		localStorage.setItem('RNP_EXPANDED_STATE', JSON.stringify(newExpanded));

		return () => clearTimeout(timeout);
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
			}),
			// Убираем автоскролл из RnpListItem - он должен быть только на контейнере
		)
	}, [el, onReorder]);



	return (
		<div className={`${styles.item} ${isDragging ? styles.dragging : ''}`} ref={ref}>
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
							<RnpItem
								title={
									<span onClick={() => expandHandler(el.article_data.wb_id)} style={{ cursor: 'pointer' }}>
										{el.article_data.title}
									</span>
								}
								photo={el.article_data.photo}
								wb_id={el.article_data.wb_id}
								shop={el.article_data.shop_name}
							/>
						</div>
						<Button
							className={styles.item__button}
							onClick={() => setDeleteRnpId(el.article_data.wb_id)}
							icon={remove}
							title="Удалить артикул"
						/>
						<Button
							className={`${styles.item__button} ${expanded === el.article_data.wb_id &&
								styles.item__button_expand
								}`}
							onClick={() => expandHandler(el.article_data.wb_id)}
							icon={expand}
						></Button>
					</Flex>
				</header>
				{expanded === el.article_data.wb_id && (
					<div className={`${styles.item__table} ${styles.item}`}>
						<RnpTable
							data={el.table.rows}
							columns={el.table.columns}
							data2={el.table.datasource}
							columns2={el.table.columns_new}
							expanded={expanded}
							el={el}
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

const sortItemsByOrder = (items, order) => {
	// Создаем Map для быстрого поиска элементов по wb_id
	const itemsMap = new Map();
	items.forEach(item => {
		itemsMap.set(item.article_data.wb_id, item);
	});

	// Сортируем согласно порядку в order
	return order?.map(orderId => itemsMap.get(orderId)).filter(Boolean);
};

export default function RnpList({ view, expanded, setExpanded, setAddRnpModalShow, rnpDataByArticle, rnpDataTotal, setDeleteRnpId, loading }) {
	const { activeBrand } = useAppSelector((state) => state.filters);
	const items = useMemo(() => rnpDataByArticle || [], [rnpDataByArticle]);
	const [order, setOrder] = useState(null);


	const ref = useRef(null);
	const [activeDropZone, setActiveDropZone] = useState(null);
	const [activeEdgeDropZone, setActiveEdgeDropZone] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const [draggedIndex, setDraggedIndex] = useState(null);

	// const [expanded, setExpanded] = useState([]);

	const handleReorder = (draggedId, targetId) => {
		const draggedIndex = order.findIndex(i => i === draggedId);
		const targetIndex = order.findIndex(i => i === targetId);

		if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
			const newOrder = [...order];
			const [removed] = newOrder.splice(draggedIndex, 1);
			newOrder.splice(targetIndex, 0, removed);
			setOrder(newOrder);
			localStorage.setItem('SAVED_ORDER', JSON.stringify(newOrder));
		}
	};

	// Обработчик для drop-зон
	const handleDropZoneDrop = (draggedId, dropZoneIndex) => {
		const draggedIndex = order.findIndex(i => i === draggedId);

		if (draggedIndex !== -1) {
			const newOrder = [...order];
			const [removed] = newOrder.splice(draggedIndex, 1);

			// Если перетаскиваем в зону после перетаскиваемой карточки, 
			// нужно учесть что мы уже удалили один элемент
			let targetIndex = dropZoneIndex;
			if (dropZoneIndex > draggedIndex) {
				targetIndex = dropZoneIndex - 1;
			}

			newOrder.splice(targetIndex, 0, removed);
			setOrder(newOrder);
			localStorage.setItem('SAVED_ORDER', JSON.stringify(newOrder));
		}
	};

	// Обработчик для edge drop-зон (верх/низ)
	const handleEdgeDropZoneDrop = (draggedId, position) => {
		const draggedIndex = order.findIndex(i => i === draggedId);

		if (draggedIndex !== -1) {
			const newOrder = [...order];
			const [removed] = newOrder.splice(draggedIndex, 1);

			// Размещаем в начало или конец списка
			if (position === 'top') {
				newOrder.unshift(removed); // В начало
			} else {
				newOrder.push(removed); // В конец
			}

			setOrder(newOrder);
			localStorage.setItem('SAVED_ORDER', JSON.stringify(newOrder));
		}
	};

	useEffect(() => {
		if (!ref.current) {
			return
		}
		const element = ref.current;
		return monitorForElements({
			element,
			onDragStart({ source }) {
				setExpanded([]);
				// Определяем индекс перетаскиваемой карточки
				const draggedId = source.data.id;
				const draggedIndex = order.findIndex(i => i === draggedId);
				setDraggedIndex(draggedIndex);
				// Показываем drop-зоны при начале drag
				setIsDragging(true);
				setActiveDropZone(null);
				setActiveEdgeDropZone(null);
			},
			onDrag({ location }) {
				// Подсвечиваем активную drop-зону при наведении
				const dropTargets = location.current.dropTargets;
				if (dropTargets.length > 0) {
					const dropZone = dropTargets.find(target => target.data.dropZoneIndex !== undefined);
					const edgeDropZone = dropTargets.find(target => target.data.edgeDropZone !== undefined);

					if (dropZone) {
						setActiveDropZone(dropZone.data.dropZoneIndex);
						setActiveEdgeDropZone(null);
					} else if (edgeDropZone) {
						setActiveEdgeDropZone(edgeDropZone.data.edgeDropZone);
						setActiveDropZone(null);
					} else {
						setActiveDropZone(null);
						setActiveEdgeDropZone(null);
					}
				} else {
					setActiveDropZone(null);
					setActiveEdgeDropZone(null);
				}
			},
			onDrop({ location, source }) {
				// Скрываем drop-зоны после drop
				setIsDragging(false);
				setActiveDropZone(null);
				setActiveEdgeDropZone(null);
				setDraggedIndex(null);

				const target = location.current.dropTargets[0];
				if (!target) {
					return;
				}

				const draggedId = source.data.id;

				// Проверяем тип drop-зоны
				if (target.data.dropZoneIndex !== undefined) {
					handleDropZoneDrop(draggedId, target.data.dropZoneIndex);
				} else if (target.data.edgeDropZone !== undefined) {
					handleEdgeDropZoneDrop(draggedId, target.data.edgeDropZone);
				} else {
					const targetId = target.data.id;
					if (draggedId && targetId && draggedId !== targetId) {
						handleReorder(draggedId, targetId);
					}
				}
			},
			onDragEnd() {
				// Скрываем drop-зоны при завершении drag
				setIsDragging(false);
				setActiveDropZone(null);
				setActiveEdgeDropZone(null);
				setDraggedIndex(null);
			},
		});
	}, [items, order, handleReorder]);


	useEffect(() => {
		// удаляем старые данные из localStorage
		localStorage.removeItem('rnpOrder');
		if (rnpDataByArticle) {
			let SAVED_ORDER = localStorage.getItem('SAVED_ORDER');
			if (SAVED_ORDER) {
				try {
					SAVED_ORDER = JSON.parse(SAVED_ORDER);
				} catch {
					SAVED_ORDER = rnpDataByArticle.map((el) => el.article_data.wb_id);
				}
				setOrder(SAVED_ORDER);
			} else {
				setOrder(rnpDataByArticle.map((el) => el.article_data.wb_id));
			}
		}
	}, [rnpDataByArticle])

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
				{view === 'articles' && (
					<div ref={ref} className={styles.list_container}>
						{loading && <div className={styles.loading_container}>
							<span className='loader'></span>
						</div>}
						{/* Edge drop-зоны в верху и внизу */}
						<EdgeDropZone
							position="top"
							isActive={activeEdgeDropZone === 'top'}
							isDragging={isDragging}
							onDrop={handleEdgeDropZoneDrop}
						/>
						{order && items?.length > 0 &&
							sortItemsByOrder(items, order).map((el, i) => {
								// if (i === 0 && expanded?.length === 0) {
								// 	setExpanded([el.article_data.wb_id]);
								// }
								return (
									<React.Fragment key={i}>
										{/* Drop-зона перед каждой карточкой */}
										<DropZone
											index={i}
											isActive={activeDropZone === i}
											isDragging={isDragging}
											draggedIndex={draggedIndex}
											onDrop={handleDropZoneDrop}
										/>
										<RnpListItem
											index={i}
											el={el}
											expanded={expanded}
											setExpanded={setExpanded}
											setDeleteRnpId={setDeleteRnpId}
											onReorder={handleReorder}
											isDragging={isDragging}
										/>
									</React.Fragment>
								)

							})
						}
						{/* Drop-зона после последней карточки */}
						{order && items?.length > 0 && (
							<DropZone
								index={order.length}
								isActive={activeDropZone === order.length}
								isDragging={isDragging}
								draggedIndex={draggedIndex}
								onDrop={handleDropZoneDrop}
							/>
						)}
						{/* Edge drop-зона внизу */}
						<EdgeDropZone
							position="bottom"
							isActive={activeEdgeDropZone === 'bottom'}
							isDragging={isDragging}
							onDrop={handleEdgeDropZoneDrop}
						/>
						{/* {items?.length == 0 && <div className={`${styles.item_content} ${styles.item_empty}`}>Нет данных</div>} */}
					</div>
				)}
				{view === 'total' && (
					<>
						{rnpDataTotal && <div className={styles.item_content}>
							{loading && <div className={styles.loading_container}>
								<span className='loader'></span>
							</div>}
							<RnpTableTotal
								// data={null}
								data={rnpDataTotal?.table?.rows}
								data2={rnpDataTotal?.table?.datasource}
								columns2={rnpDataTotal?.table?.columns_new}
								// columns={null}
								columns={rnpDataTotal?.table?.columns}
								defaultExpandAllRows={true}
							/>
						</div>}
					</>
				)}
				{((view === 'articles' && items?.length == 0) || (view === 'total' && !rnpDataTotal)) &&
					<NoDataWidget
						mainTitle='Здесь пока нет ни одного артикула'
						mainText='Добавьте артикулы для отчета «Рука на пульсе»'
						buttonTitle='Добавить'
						action={() => setAddRnpModalShow(true)}
						howLinkGroup={false}
					/>
				}
			</ConfigProvider>
		</>
	);
}
