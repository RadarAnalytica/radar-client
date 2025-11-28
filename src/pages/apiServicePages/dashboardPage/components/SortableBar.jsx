import React, { useMemo, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandleContext } from '../page/dashboardPage';

// Вспомогательная функция для проверки наличия DragHandle в children
// Проверяем по displayName или по наличию пропса context
const hasDragHandle = (children) => {
    if (!children) return false;

    const checkChildren = (child) => {
        if (!child) return false;

        // Если это массив, проверяем каждый элемент
        if (Array.isArray(child)) {
            return child.some(checkChildren);
        }

        // Если это React элемент
        if (React.isValidElement(child)) {
            // Проверяем, является ли это DragHandle (по displayName или по наличию пропса context)
            const componentType = child.type;
            if (
                (componentType && componentType.displayName === 'DragHandle') ||
                (child.props && child.props.context)
            ) {
                return true;
            }
            // Проверяем children этого элемента
            if (child.props && child.props.children) {
                return checkChildren(child.props.children);
            }
        }

        return false;
    };

    return checkChildren(children);
};

export const SortableBar = ({ bar, dataDashBoard, loading, children, isOver, isDraggingActive, activeId, activeRowId, overRowId, overId, items }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
        id: bar.id,
    });
    const hasHandle = useMemo(() => hasDragHandle(children), [children]);

    const shouldDisableTransform = isDraggingActive && !isDragging;


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

    const getStyles = useCallback(() => {
        return {
            transform: CSS.Transform.toString(transform),
            transition: transition,
            opacity: 1,
            border: bar.id === activeId ? '2px solid #5329FF' : 'none',
            borderRadius: '16px',
            pointerEvents: 'none',
            userSelect: 'none',
            cursor: isDragging ? 'grabbing' : (isOverId || isOverRowId) ? 'copy' : 'default',
        }
    }, [transform, transition, activeId, overRowId, activeRowId, overId]);

    const dragHandleValue = useMemo(() => ({
        listeners,
        attributes
    }), [listeners, attributes]);

    const memoizedChildren = useMemo(() => children, [children]);

    return (
        <DragHandleContext.Provider value={dragHandleValue}>
            <div
                ref={setNodeRef}
                //style={style}
                style={{
                    transform: CSS.Transform.toString(transform),
                    transition: transition,
                    opacity: 1,
                    //border: bar.id === activeId ? '2px solid #5329FF1A' : 'none',
                    //backgroundColor: bar.id === activeId ? '#5329FF1A' : 'transparent',
                    borderRadius: '16px',
                }}
                id={bar.id}
                className={bar.container}
            >
                {bar.id === activeId ? <></> : memoizedChildren}
            </div>
        </DragHandleContext.Provider>
    );
};

