import React, { useEffect, useMemo, useState } from 'react';
import styles from './TableSettingsModal.module.css';
import {
    ConfigProvider,
    Modal,
    Form,
    Checkbox,
    Button,
    Flex,
    Input,
} from 'antd';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

export interface TableSettingsItem {
    id: string;
    title: string;
    isVisible?: boolean;
    hidden?: boolean;
    children?: TableSettingsItem[];
    [key: string]: any;
}

export interface TableSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    items: TableSettingsItem[];
    onSave: (items: TableSettingsItem[]) => void;
    originalItems: TableSettingsItem[];
    idKey?: string;
    titleKey?: string;
    visibleKey?: string;
    invertVisibility?: boolean;
    childrenKey?: string;
}

interface SortableItemProps {
    id: string;
    item: TableSettingsItem;
    titleKey: string;
    isChild?: boolean;
}

interface SortableGroupProps {
    id: string;
    item: TableSettingsItem;
    form: any;
    titleKey: string;
    isExpanded: boolean;
    onToggleExpand: (id: string) => void;
    visibilityState: Record<string, boolean>;
    setVisibilityState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    onChildrenReorder: (parentId: string, oldIndex: number, newIndex: number) => void;
    sensors: ReturnType<typeof useSensors>;
}

const DragHandleIcon = () => (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2.62268e-07C3.10457 4.07115e-07 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.895433 4 2.21557e-06 3.10457 2.36042e-06 2C2.50526e-06 0.89543 0.895433 1.17422e-07 2 2.62268e-07Z" fill="#999999" />
        <path d="M14 16C15.1046 16 16 16.8954 16 18C16 19.1046 15.1046 20 14 20C12.8954 20 12 19.1046 12 18C12 16.8954 12.8954 16 14 16Z" fill="#999999" />
        <path d="M2 16C3.10457 16 4 16.8954 4 18C4 19.1046 3.10457 20 2 20C0.895432 20 2.21557e-06 19.1046 2.36042e-06 18C2.50526e-06 16.8954 0.895433 16 2 16Z" fill="#999999" />
        <path d="M14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8Z" fill="#999999" />
        <path d="M2 8C3.10457 8 4 8.89543 4 10C4 11.1046 3.10457 12 2 12C0.895433 12 2.21557e-06 11.1046 2.36042e-06 10C2.50526e-06 8.89543 0.895433 8 2 8Z" fill="#999999" />
        <path d="M14 -7.14702e-08C15.1046 7.33766e-08 16 0.89543 16 2C16 3.10457 15.1046 4 14 4C12.8954 4 12 3.10457 12 2C12 0.895429 12.8954 -2.16317e-07 14 -7.14702e-08Z" fill="#999999" />
    </svg>
);

const ExpandIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg 
        width="12" 
        height="12" 
        viewBox="0 0 12 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
        }}
    >
        <path d="M4.5 2L8.5 6L4.5 10" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DragOverlayItem: React.FC<{
    item: TableSettingsItem;
    titleKey: string;
    checked: boolean;
    isChild?: boolean;
}> = ({ item, titleKey, checked, isChild = false }) => (
    <div
        className={`${styles.sortableItem} ${isChild ? styles.sortableItemChild : ''}`}
        style={{
            opacity: 1,
            backgroundColor: '#f5f5f5',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            cursor: 'grabbing'
        }}
    >
        <div className={styles.dragHandle}>
            <DragHandleIcon />
        </div>
        <Checkbox checked={checked} className={styles.checkbox}>
            {item[titleKey] || item.title}
        </Checkbox>
    </div>
);

const SortableItem: React.FC<SortableItemProps> = ({ id, item, titleKey, isChild = false }) => {
    const isUndraggable = Boolean(item.undraggable);
    const isToggleDisabled = item.canToggle === false;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, disabled: isUndraggable });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.sortableItem} ${isChild ? styles.sortableItemChild : ''}`}
            data-dragging={isDragging}
            data-undraggable={isUndraggable || undefined}
        >
            <div
                className={styles.dragHandle}
                data-undraggable={isUndraggable || undefined}
                {...(!isUndraggable ? attributes : {})}
                {...(!isUndraggable ? listeners : {})}
            >
                <DragHandleIcon />
            </div>
            <Form.Item
                name={id}
                valuePropName="checked"
                initialValue={true}
                noStyle
                preserve
            >
                <Checkbox className={styles.checkbox} disabled={isToggleDisabled}>
                    {item[titleKey]}
                </Checkbox>
            </Form.Item>
        </div>
    );
};

const SortableGroup: React.FC<SortableGroupProps> = ({ 
    id, 
    item, 
    form, 
    titleKey, 
    isExpanded, 
    onToggleExpand,
    visibilityState,
    setVisibilityState,
    onChildrenReorder,
    sensors
}) => {
    const [activeChildId, setActiveChildId] = useState<string | null>(null);
    const isUndraggable = Boolean(item.undraggable);
    const isToggleDisabled = item.canToggle === false;
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, disabled: isUndraggable });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    };

    const hasChildren = item.children && item.children.length > 0;

    const handleChildDragStart = (event: DragStartEvent) => {
        setActiveChildId(event.active.id as string);
    };

    const handleChildDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveChildId(null);
        if (over && active.id !== over.id && item.children) {
            const oldIndex = item.children.findIndex(child => child.id === active.id);
            const newIndex = item.children.findIndex(child => child.id === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                const activeChild = item.children[oldIndex];
                const overChild = item.children[newIndex];
                if (activeChild?.undraggable || overChild?.undraggable) {
                    return;
                }
                onChildrenReorder(id, oldIndex, newIndex);
            }
        }
    };

    // Handle parent checkbox change - toggle all children
    const handleParentCheckboxChange = (checked: boolean) => {
        const updates: Record<string, boolean> = { [id]: checked };
        if (hasChildren) {
            item.children!.forEach(child => {
                updates[child.id] = checked;
            });
        }
        setVisibilityState(prev => ({ ...prev, ...updates }));
        form.setFieldsValue(updates);
    };

    // Check if all children are selected
    const allChildrenSelected = hasChildren 
        ? item.children!.every(child => visibilityState[child.id] !== false)
        : visibilityState[id] !== false;

    // Check if some (but not all) children are selected
    const someChildrenSelected = hasChildren
        ? item.children!.some(child => visibilityState[child.id] !== false) && !allChildrenSelected
        : false;

    // Get active child item for overlay
    const activeChildItem = activeChildId && item.children 
        ? item.children.find(child => child.id === activeChildId) 
        : null;

    return (
        <div className={styles.groupContainer}>
            <div
                ref={setNodeRef}
                style={style}
                className={`${styles.sortableItem} ${styles.sortableItemGroup}`}
                data-dragging={isDragging}
                data-undraggable={isUndraggable || undefined}
            >
                <div
                    className={styles.dragHandle}
                    data-undraggable={isUndraggable || undefined}
                    {...(!isUndraggable ? attributes : {})}
                    {...(!isUndraggable ? listeners : {})}
                >
                    <DragHandleIcon />
                </div>
                {hasChildren && (
                    <button 
                        type="button" 
                        className={styles.expandButton}
                        onClick={() => onToggleExpand(id)}
                    >
                        <ExpandIcon isExpanded={isExpanded} />
                    </button>
                )}
                <Checkbox 
                    className={styles.checkbox}
                    checked={allChildrenSelected}
                    indeterminate={someChildrenSelected}
                    onChange={(e) => handleParentCheckboxChange(e.target.checked)}
                    disabled={isToggleDisabled}
                >
                    {item[titleKey] || 'Группа'}
                </Checkbox>
                {hasChildren && (
                    <span className={styles.childrenCount}>
                        ({item.children!.length})
                    </span>
                )}
            </div>
            
            {hasChildren && isExpanded && (
                <div className={styles.childrenContainer}>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleChildDragStart}
                        onDragEnd={handleChildDragEnd}
                        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                    >
                        <SortableContext
                            items={item.children!.map(child => child.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {item.children!.map((child) => (
                                <SortableItem 
                                    key={child.id} 
                                    id={child.id} 
                                    item={child} 
                                    titleKey={titleKey}
                                    isChild
                                />
                            ))}
                        </SortableContext>
                        <DragOverlay dropAnimation={null}>
                            {activeChildItem ? (
                                <DragOverlayItem
                                    item={activeChildItem}
                                    titleKey={titleKey}
                                    checked={visibilityState[activeChildItem.id] !== false}
                                    isChild
                                />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            )}
        </div>
    );
};

export const TableSettingsModal: React.FC<TableSettingsModalProps> = ({
    isOpen,
    onClose,
    title = 'Настройки таблицы',
    items,
    onSave,
    originalItems,
    idKey = 'id',
    titleKey = 'title',
    visibleKey = 'isVisible',
    invertVisibility = false,
    childrenKey = 'children',
}) => {
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState('');
    const [activeSearchValue, setActiveSearchValue] = useState('');
    const [displayItems, setDisplayItems] = useState<TableSettingsItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [visibilityState, setVisibilityState] = useState<Record<string, boolean>>({});
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const parentByChildId = useMemo(() => {
        const map: Record<string, string> = {};
        displayItems.forEach(item => {
            if (item.children && item.children.length > 0) {
                item.children.forEach(child => {
                    map[child.id] = item.id;
                });
            }
        });
        return map;
    }, [displayItems]);

    // Check if items have hierarchical structure
    // Consider hierarchy if any item has children array (even empty) or isParent flag
    const hasHierarchy = useMemo(() => {
        return items.some(item => 
            (item[childrenKey] && item[childrenKey].length > 0) || 
            item.isParent ||
            Array.isArray(item[childrenKey])
        );
    }, [items, childrenKey]);

    // Normalize items to internal format
    const normalizeItems = (itemsToNormalize: TableSettingsItem[]): TableSettingsItem[] => {
        return itemsToNormalize.map((item, index) => {
            const id = item[idKey] || item.id || item.key || item.dataIndex;
            const itemTitle = item[titleKey] || item.title;
            let isVisible: boolean;

            if (invertVisibility) {
                isVisible = item.hidden !== undefined ? !item.hidden : true;
            } else {
                isVisible = item[visibleKey] !== undefined ? item[visibleKey] : true;
            }

            const children = item[childrenKey] 
                ? normalizeItems(item[childrenKey])
                : undefined;

            return {
                ...item,
                id,
                title: itemTitle,
                isVisible,
                order: index,
                children,
            };
        });
    };

    // Denormalize items back to original format
    const denormalizeItems = (itemsToDenormalize: TableSettingsItem[]): TableSettingsItem[] => {
        return itemsToDenormalize.map((item, index) => {
            const result = { ...item, order: index };

            if (invertVisibility) {
                result.hidden = !item.isVisible;
            } else {
                result[visibleKey] = item.isVisible;
            }

            if (item.children) {
                result[childrenKey] = denormalizeItems(item.children);
            }

            return result;
        });
    };

    // Collect all visibility states including children
    const collectVisibilityStates = (items: TableSettingsItem[]): Record<string, boolean> => {
        const result: Record<string, boolean> = {};
        items.forEach(item => {
            result[item.id] = item.isVisible !== false;
            if (item.children) {
                Object.assign(result, collectVisibilityStates(item.children));
            }
        });
        return result;
    };

    // Store previous isOpen state to detect when modal opens
    const prevIsOpenRef = React.useRef(false);
    
    useEffect(() => {
        // Only run when modal is opening (transition from closed to open)
        const isOpening = isOpen && !prevIsOpenRef.current;
        prevIsOpenRef.current = isOpen;
        
        if (isOpening) {
            const normalized = normalizeItems(items);
            setDisplayItems(normalized);
            setSearchValue('');
            setActiveSearchValue('');

            const initialVisibility = collectVisibilityStates(normalized);
            setVisibilityState(initialVisibility);
            form.setFieldsValue(initialVisibility);

            // Expand groups that have children and are marked as expanded (or have isExpanded: true)
            const groupIds = new Set(
                normalized
                    .filter(item => item.children && item.children.length > 0)
                    .filter(item => item.isExpanded !== false) // Expand by default unless explicitly set to false
                    .map(item => item.id)
            );
            setExpandedGroups(groupIds);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const filteredItems = useMemo(() => {
        if (!activeSearchValue.trim()) {
            return displayItems;
        }
        
        const query = activeSearchValue.toLowerCase();

        return displayItems.reduce<TableSettingsItem[]>((acc, item) => {
            const parentMatches = item.title?.toLowerCase().includes(query);

            if (!item.children) {
                if (parentMatches) {
                    acc.push(item);
                }
                return acc;
            }

            const filteredChildren = item.children.filter(child =>
                child.title?.toLowerCase().includes(query)
            );

            if (parentMatches || filteredChildren.length > 0) {
                acc.push({
                    ...item,
                    children: filteredChildren,
                });
            }

            return acc;
        }, []);
    }, [displayItems, activeSearchValue]);

    // Collect all items for "select all" calculation
    const allSelectableItems = useMemo(() => {
        const result: TableSettingsItem[] = [];
        filteredItems.forEach(item => {
            if (item.children && item.children.length > 0) {
                result.push(...item.children);
            } else {
                result.push(item);
            }
        });
        return result;
    }, [filteredItems]);

    const allSelected = useMemo(() => {
        if (allSelectableItems.length === 0) return false;
        return allSelectableItems.every(item => visibilityState[item.id] === true);
    }, [allSelectableItems, visibilityState]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (over && active.id !== over.id) {
            setDisplayItems((currentItems) => {
                const oldIndex = currentItems.findIndex(item => item.id === active.id);
                const newIndex = currentItems.findIndex(item => item.id === over.id);
                const activeItem = currentItems[oldIndex];
                const overItem = currentItems[newIndex];

                if (oldIndex !== -1 && newIndex !== -1) {
                    if (activeItem?.undraggable || overItem?.undraggable) {
                        return currentItems;
                    }
                    return arrayMove(currentItems, oldIndex, newIndex);
                }
                return currentItems;
            });
        }
    };

    const handleChildrenReorder = (parentId: string, oldIndex: number, newIndex: number) => {
        setDisplayItems(currentItems => {
            return currentItems.map(item => {
                if (item.id === parentId && item.children) {
                    return {
                        ...item,
                        children: arrayMove(item.children, oldIndex, newIndex)
                    };
                }
                return item;
            });
        });
    };

    const handleToggleExpand = (id: string) => {
        setExpandedGroups(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const activeItem = useMemo(() => {
        if (!activeId) return null;
        return displayItems.find(item => item.id === activeId);
    }, [activeId, displayItems]);

    const handleSelectAll = () => {
        const allChecked = allSelectableItems.every(item => visibilityState[item.id] === true);
        const newValue = !allChecked;

        setVisibilityState(prev => {
            const updated = { ...prev };
            // Update parents and children
            filteredItems.forEach(item => {
                updated[item.id] = newValue;
                if (item.children) {
                    item.children.forEach(child => {
                        updated[child.id] = newValue;
                    });
                }
            });
            return updated;
        });

        const newFormValues: Record<string, boolean> = {};
        filteredItems.forEach(item => {
            newFormValues[item.id] = newValue;
            if (item.children) {
                item.children.forEach(child => {
                    newFormValues[child.id] = newValue;
                });
            }
        });
        form.setFieldsValue(newFormValues);
    };

    const handleRevertToOriginal = () => {
        const normalized = normalizeItems(originalItems);
        setDisplayItems(normalized);

        const newVisibility = collectVisibilityStates(normalized);
        setVisibilityState(newVisibility);
        form.setFieldsValue(newVisibility);
    };

    const handleSearch = () => {
        setActiveSearchValue(searchValue);
    };

    // Apply visibility state and expanded state to items recursively
    const applyVisibilityToItems = (items: TableSettingsItem[]): TableSettingsItem[] => {
        return items.map(item => {
            const updatedItem = {
                ...item,
                isVisible: visibilityState[item.id] !== undefined ? visibilityState[item.id] : item.isVisible,
                // Preserve current expanded state from expandedGroups
                isExpanded: item.children ? expandedGroups.has(item.id) : item.isExpanded
            };
            if (item.children) {
                updatedItem.children = applyVisibilityToItems(item.children);
            }
            return updatedItem;
        });
    };

    const handleOk = () => {
        const updatedItems = applyVisibilityToItems(displayItems);
        const denormalized = denormalizeItems(updatedItems);
        onSave(denormalized);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 14,
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
                        controlHeightLG: 46,
                        contentFontSize: 14,
                        contentFontSizeSM: 14,
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
                        colorLinkActive: '#3818d9',
                    },
                    Checkbox: {
                        fontSize: 16,
                        padding: 8,
                        colorBorder: '#ccc',
                        colorPrimary: '#5329ff',
                        colorPrimaryBorder: '#5329ff',
                        colorPrimaryHover: '#5329ff',
                        controlInteractiveSize: 20
                    },
                    Form: {
                        itemMarginBottom: 0,
                    },
                },
            }}
        >
            <Modal
                open={isOpen}
                onCancel={handleCancel}
                centered
                className={styles.tableSettingsModal}
                title={
                    <div className={styles.modalHeader}>
                        <span className={styles.modalTitle}>{title}</span>
                        <div className={styles.headerActions}>
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className={styles.actionLink}
                            >
                                {allSelected ? 'Снять все' : 'Выбрать все'}
                            </button>
                            <button
                                type="button"
                                onClick={handleRevertToOriginal}
                                className={styles.actionLink}
                            >
                                Вернуть к исходному варианту
                            </button>
                        </div>
                    </div>
                }
                closeIcon={
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                }
                width={600}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={(changedValues) => {
                        const parentUpdates: Record<string, boolean> = {};
                        Object.entries(changedValues).forEach(([id, value]) => {
                            if (value === true) {
                                const parentId = parentByChildId[id];
                                if (parentId && visibilityState[parentId] === false) {
                                    parentUpdates[parentId] = true;
                                }
                            }
                        });

                        if (Object.keys(parentUpdates).length > 0) {
                            form.setFieldsValue(parentUpdates);
                        }

                        setVisibilityState(prev => ({
                            ...prev,
                            ...changedValues,
                            ...parentUpdates,
                        }));
                    }}
                    className={styles.form}
                >
                    <div className={styles.searchContainer}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgContainer: 'white',
                                    colorBorder: '#5329FF1A',
                                    borderRadius: 8,
                                    fontFamily: 'Manrope',
                                    fontSize: 12,
                                },
                                components: {
                                    Input: {
                                        activeBorderColor: '#5329FF1A',
                                        hoverBorderColor: '#5329FF1A',
                                        activeShadow: 'transparent',
                                        controlHeight: 38,
                                        controlHeightLG: 38,
                                    },
                                }
                            }}
                        >
                            <Input
                                placeholder="Наименование"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                prefix={
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.12793 0C14.1687 0.000149462 18.2549 4.08714 18.2549 9.12793C18.2548 11.3852 17.4328 13.4488 16.0752 15.042L20 18.9678L19.4834 19.4834L18.9678 20L15.042 16.0752C13.4488 17.4328 11.3852 18.2548 9.12793 18.2549C4.08714 18.2549 0.000149459 14.1687 0 9.12793C0 4.08705 4.08705 0 9.12793 0ZM9.12793 1.46094C4.89354 1.46094 1.46094 4.89354 1.46094 9.12793C1.46109 13.3622 4.89363 16.7949 9.12793 16.7949C13.3621 16.7948 16.7948 13.3621 16.7949 9.12793C16.7949 4.89363 13.3622 1.46109 9.12793 1.46094Z" fill="#8C8C8C" />
                                    </svg>
                                }
                                suffix={
                                    searchValue && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchValue('');
                                                setActiveSearchValue('');
                                            }}
                                            className={styles.clearButton}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 1L1 13M1 1L13 13" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    )
                                }
                                className={styles.searchInput}
                                onPressEnter={handleSearch}
                            />
                        </ConfigProvider>
                        <Button
                            type="primary"
                            onClick={handleSearch}
                            className={styles.searchButton}
                        >
                            <Flex align="center" gap={8}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.12793 0C14.1687 0.000149462 18.2549 4.08714 18.2549 9.12793C18.2548 11.3852 17.4328 13.4488 16.0752 15.042L20 18.9678L19.4834 19.4834L18.9678 20L15.042 16.0752C13.4488 17.4328 11.3852 18.2548 9.12793 18.2549C4.08714 18.2549 0.000149459 14.1687 0 9.12793C0 4.08705 4.08705 0 9.12793 0ZM9.12793 1.46094C4.89354 1.46094 1.46094 4.89354 1.46094 9.12793C1.46109 13.3622 4.89363 16.7949 9.12793 16.7949C13.3621 16.7948 16.7948 13.3621 16.7949 9.12793C16.7949 4.89363 13.3622 1.46109 9.12793 1.46094Z" fill="white" />
                                </svg>
                                Найти
                            </Flex>
                        </Button>
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={filteredItems.map(item => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className={styles.list}>
                                {filteredItems.length > 0 ? (
                                    hasHierarchy ? (
                                        // Hierarchical rendering - render groups for items with children, regular items otherwise
                                        filteredItems.map((item) => {
                                            // Check if item has children array (even empty means it's a group)
                                            const isGroup = Array.isArray(item.children);
                                            
                                            if (isGroup) {
                                                return (
                                                    <SortableGroup 
                                                        key={item.id} 
                                                        id={item.id} 
                                                        item={item} 
                                                        form={form} 
                                                        titleKey="title"
                                                        isExpanded={expandedGroups.has(item.id)}
                                                        onToggleExpand={handleToggleExpand}
                                                        visibilityState={visibilityState}
                                                        setVisibilityState={setVisibilityState}
                                                        onChildrenReorder={handleChildrenReorder}
                                                        sensors={sensors}
                                                    />
                                                );
                                            }
                                            
                                            // Regular item (no children)
                                            return (
                                                <SortableItem 
                                                    key={item.id} 
                                                    id={item.id} 
                                                    item={item} 
                                                    titleKey="title" 
                                                />
                                            );
                                        })
                                    ) : (
                                        // Flat rendering
                                        filteredItems.map((item) => (
                                            <SortableItem key={item.id} id={item.id} item={item} titleKey="title" />
                                        ))
                                    )
                                ) : activeSearchValue.trim() ? (
                                    <div style={{
                                        padding: '40px 20px',
                                        textAlign: 'center',
                                        color: '#999999',
                                        fontSize: '14px'
                                    }}>
                                        Ничего не найдено
                                    </div>
                                ) : null}
                            </div>
                        </SortableContext>
                        <DragOverlay dropAnimation={null}>
                            {activeItem ? (
                                <DragOverlayItem
                                    item={activeItem}
                                    titleKey={titleKey}
                                    checked={visibilityState[activeItem.id] !== false}
                                />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                    <div className={styles.footer}>
                        <Button size="large" onClick={handleCancel} className={styles.cancelButton} style={{ fontSize: 14, fontWeight: 600 }}>
                            Отменить
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleOk}
                            className={styles.saveButton}
                            style={{ fontSize: 14, fontWeight: 600 }}
                        >
                            Сохранить изменения
                        </Button>
                    </div>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default TableSettingsModal;
