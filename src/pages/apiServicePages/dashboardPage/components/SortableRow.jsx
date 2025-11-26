import React, { useCallback, useMemo } from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { SortableBar } from './SortableBar';
import styles from '../page/dashboardPage.module.css';
import { horizontalListSortingStrategy, verticalListSortingStrategy, } from '@dnd-kit/sortable';

export const SortableRow = ({ row, items, dataDashBoard, loading, children, isDraggingActive, overId, activeId, activeRowId, overRowId, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData }) => {
    if (!row) {
        return null;
    }
    const rowId = row?.rowId

    // Делаем строку droppable, чтобы она определялась при наведении
    const { setNodeRef, isOver: isDroppableOver } = useDroppable({
        id: rowId,
        data: {
            type: 'container',
            children: row.children ? row.children.map(child => child.id) : []
        }
    });
    const getOutline = useCallback(() => {
        if (!activeId) return 'none';
        if (activeId && overRowId && overRowId !== rowId) return '2px solid #5329FF1A';
        if (activeId && overRowId && overRowId === rowId) return '2px solid #5329FF';
    }, [activeId, overRowId, rowId]);
    const getStyles = useCallback(() => {
        return {
            outlineOffset: '2px',
            borderRadius: '16px',
            transition: 'outline 0.2s ease',
            minHeight: '50px',
        }
    }, [activeId]);

    const activeItem = useMemo(() => {
        const activeElem = items?.find(item => item.id === activeId);
        if (activeElem) {
            return activeElem;
        }
        return null;
    }, [activeId]);

    const overElement = useMemo(() => {
        const overElem = items?.find(item => item.id === overId);
        if (overElem) {
            return overElem;
        }
        return null;
    }, [overId]);

    const activeItemForSorting = useMemo(() => {
        if (activeRowId !== overRowId && activeItem?.dropKey === overElement?.dropKey) {
            return items?.find(item => item.id === activeId);
        }
        return undefined
    }, [items, activeId, activeRowId, overRowId]);

    return (
        <div
            ref={setNodeRef}
            className={styles.page__dndRow}
            id={rowId}
            style={{
                outline: getOutline(),
                ...getStyles(),
            }}
        >
            <SortableContext items={(row?.children?.map((i) => i.id) ?? [])} strategy={items.filter(i => i.dropKey === '3').every(i => i.rowId === rowId) ? horizontalListSortingStrategy : rectSortingStrategy}>
                {rowId !== 'addRow' && row?.children?.map((bar) => (
                    <SortableBar
                        key={bar?.id}
                        bar={bar}
                        dataDashBoard={dataDashBoard}
                        loading={loading}
                        isOver={overId === bar?.id}
                        isDraggingActive={!!activeId}
                        activeId={activeId}
                        activeRowId={activeRowId}
                        overRowId={overRowId}
                        items={items}
                    >
                        {bar?.render(bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard, stockAnalysisData)}
                    </SortableBar>
                ))}
                {rowId === 'addRow' &&
                    <div className={styles.group__addRowContainer}>
                        + Добавить строку
                    </div>
                }
            </SortableContext>
        </div>
    );
};

