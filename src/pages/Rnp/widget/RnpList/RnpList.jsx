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
	const headerRef = useRef(null);
	const sentinelRef = useRef(null);
	const [closestEdge, setClosestEdge] = useState(null);
	const [isStuck, setIsStuck] = useState(false);

	const expandHandler = (value) => {
		const timeout = setTimeout(() => {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}, 150);
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
			document.body.classList.remove(styles.no_drop);
			document.body.classList.add(styles.copy);
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
					document.body.classList.remove(styles.copy);
					document.body.classList.add(styles.no_drop);
					setClosestEdge(null);
				},
				onDrop() {
					document.body.classList.remove(styles.no_drop);
					document.body.classList.remove(styles.copy);
					setClosestEdge(null);
				},
			}),
			// Убираем автоскролл из RnpListItem - он должен быть только на контейнере
		);
	}, [el, onReorder]);

	// Отслеживание скролла для sticky хэдера
	useEffect(() => {
		if (!headerRef.current || !sentinelRef.current || expanded !== el.article_data.wb_id) {
			setIsStuck(false);
			return;
		}

		const headerElement = headerRef.current;
		const sentinelElement = sentinelRef.current;
		const isSticky = headerElement.classList.contains(styles.item__header_sticky);

		if (!isSticky) {
			setIsStuck(false);
			return;
		}

		// Находим ближайший прокручиваемый контейнер
		let scrollContainer = headerElement.closest('[class*="page__content"]');
		if (!scrollContainer) {
			scrollContainer = headerElement.closest('[class*="list_container"]');
		}
		if (!scrollContainer) {
			scrollContainer = window;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				const shouldStick = !entry.isIntersecting;
				setIsStuck(shouldStick);
			},
			{
				root: scrollContainer === window ? null : scrollContainer,
				threshold: [0, 1],
				rootMargin: '0px 0px -1px 0px',
			}
		);

		observer.observe(sentinelElement);

		// Первоначальная проверка
		const initialRect = sentinelElement.getBoundingClientRect();
		const initialRootRect = scrollContainer === window ? { top: 0 } : scrollContainer.getBoundingClientRect();
		setIsStuck(initialRect.top < initialRootRect.top);

		return () => {
			observer.disconnect();
		};
	}, [expanded, el.article_data.wb_id]);


	return (
		<div className={`${styles.item} ${isDragging ? styles.dragging : ''}`} ref={ref}>
			<div className={styles.item_content}>
			{closestEdge === 'top' && (
				<div className={styles.edge_top}></div>
			)}
			<div ref={sentinelRef} className={styles.item__header_sentinel} aria-hidden="true"></div>
			<header 
					ref={headerRef}
					className={`${styles.item__header} ${expanded === el.article_data.wb_id ? styles.item__header_sticky : ''} ${isStuck ? styles.item__header_scrolled : ''}`}
				>
					<Flex gap={20} align="center">
						<Button
							className={styles.item__button}
							icon={grip}
							ref={gripRef}
							onClick={() => setExpanded([])}
							disabled={expanded === el.article_data.wb_id }
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

export default function RnpList({ view, expanded, setExpanded, setAddRnpModalShow, rnpDataByArticle, setRnpDataByArticle, rnpDataTotal, setDeleteRnpId, loading }) {
	const { activeBrand } = useAppSelector((state) => state.filters);
	const items = useMemo(() => rnpDataByArticle || [], [rnpDataByArticle]);


	const ref = useRef(null);
	const [activeDropZone, setActiveDropZone] = useState(null);
	const [activeEdgeDropZone, setActiveEdgeDropZone] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const [draggedIndex, setDraggedIndex] = useState(null);

	// const [expanded, setExpanded] = useState([]);

	const handleReorder = (draggedId, targetId) => {
		const draggedIndex = items.findIndex(i => i.article_data.wb_id === draggedId);
		const targetIndex = items.findIndex(i => i.article_data.wb_id === targetId);

		if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
			const newItems = [...items];
			const [removed] = newItems.splice(draggedIndex, 1);
			newItems.splice(targetIndex, 0, removed);
			setRnpDataByArticle(newItems);
			const newOrder = newItems.map(item => item.article_data.wb_id);
			localStorage.setItem(`RNP_SAVED_ORDER_${activeBrand.id}`, JSON.stringify(newOrder));
		}
	};

	// Обработчик для drop-зон
	const handleDropZoneDrop = (draggedId, dropZoneIndex) => {
		const draggedIndex = items.findIndex(i => i.article_data.wb_id === draggedId);

		if (draggedIndex !== -1) {
			const newItems = [...items];
			const [removed] = newItems.splice(draggedIndex, 1);

			// Если перетаскиваем в зону после перетаскиваемой карточки,
			// нужно учесть что мы уже удалили один элемент
			let targetIndex = dropZoneIndex;
			if (dropZoneIndex > draggedIndex) {
				targetIndex = dropZoneIndex - 1;
			}

			newItems.splice(targetIndex, 0, removed);
			setRnpDataByArticle(newItems);
			const newOrder = newItems.map(item => item.article_data.wb_id);
			localStorage.setItem(`RNP_SAVED_ORDER_${activeBrand.id}`, JSON.stringify(newOrder));
		}
	};

	// Обработчик для edge drop-зон (верх/низ)
	const handleEdgeDropZoneDrop = (draggedId, position) => {
		const draggedIndex = items.findIndex(i => i.article_data.wb_id === draggedId);

		if (draggedIndex !== -1) {
			const newItems = [...items];
			const [removed] = newItems.splice(draggedIndex, 1);

			// Размещаем в начало или конец списка
			if (position === 'top') {
				newItems.unshift(removed); // В начало
			} else {
				newItems.push(removed); // В конец
			}

			setRnpDataByArticle(newItems);
			const newOrder = newItems.map(item => item.article_data.wb_id);
			localStorage.setItem(`RNP_SAVED_ORDER_${activeBrand.id}`, JSON.stringify(newOrder));
		}
	};

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		const element = ref.current;
		return monitorForElements({
			element,
			onDragStart({ source }) {
				setExpanded([]);
				// Определяем индекс перетаскиваемой карточки
				const draggedId = source.data.id;
				const draggedIndex = items.findIndex(i => i.article_data.wb_id === draggedId);
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
	}, [items, handleReorder]);


	useEffect(() => {
		// удаляем старые данные из localStorage (старый формат)
		localStorage.removeItem('rnpOrder');
	}, [])

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
						{items?.length > 0 &&
							items.map((el, i) => {
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
								);

							})
						}
						{/* Drop-зона после последней карточки */}
						{items?.length > 0 && (
							<DropZone
								index={items.length}
								isActive={activeDropZone === items.length}
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
