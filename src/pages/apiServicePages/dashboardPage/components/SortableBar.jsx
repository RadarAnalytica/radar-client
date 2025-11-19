import React, { useMemo } from 'react';
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

export const SortableBar = ({ bar, dataDashBoard, loading, children, isOver, isDraggingActive, isOverValid }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: bar.id });

    const hasHandle = useMemo(() => hasDragHandle(children), [children]);

    const shouldDisableTransform = isDraggingActive && !isDragging;
    const cursor = isOver ? (isOverValid ? 'copy' : 'not-allowed') : 'default';

    const outlineColor = isOver && !isDragging
        ? (isOverValid ? '#5329FF' : '#FF3B3B')
        : 'none';

    const style = {
        transform: shouldDisableTransform ? 'none' : CSS.Transform.toString(transform),
        transition: shouldDisableTransform ? 'none' : transition,
        cursor,
        opacity: isDragging ? 0 : 1,
        zIndex: isDragging ? 1000 : 1,
        outline: outlineColor !== 'none' ? `2px solid ${outlineColor}` : 'none',
        borderRadius: '16px',
        outlineOffset: isOver && !isDragging ? '2px' : '0',
        pointerEvents: isDragging ? 'none' : 'auto',
        userSelect: isDragging ? 'none' : 'auto',
        position: 'relative',
    };

    const dragHandleValue = useMemo(() => ({
        listeners,
        attributes
    }), [listeners, attributes]);

    return (
        <DragHandleContext.Provider value={dragHandleValue}>
            <div
                ref={setNodeRef}
                style={style}
                id={bar.id}
                className={bar.container}
            >
                {children}
            </div>
        </DragHandleContext.Provider>
    );
};

