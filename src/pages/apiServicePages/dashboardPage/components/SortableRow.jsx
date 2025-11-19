import React from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableBar } from './SortableBar';
import styles from '../page/dashboardPage.module.css';

export const SortableRow = ({ row, items, dataDashBoard, loading, children, isOver, isDraggingActive, overId, activeId, isOverValid, isActiveSpan12, selectedRange, activeBrand, authToken, filters, updateDataDashBoard }) => {
    if (!row || !row.children || !Array.isArray(row.children)) {
        return null;
    }

    // Если активный элемент имеет span 12 и эта строка подсвечена, добавляем контур строки
    const rowOutline = isActiveSpan12 && isOver && isOverValid
        ? `2px solid ${isOverValid ? '#5329FF' : '#FF3B3B'}`
        : 'none';

    return (
        <div
            className={styles.page__dndRow}
            id={row?.rowId?.toString()}
            style={{
                outline: rowOutline,
                outlineOffset: rowOutline !== 'none' ? '2px' : '0',
                borderRadius: rowOutline !== 'none' ? '16px' : '0',
                transition: 'outline 0.2s ease',
            }}
        >
            <SortableContext items={row.children.map((i) => i.id)} strategy={rectSortingStrategy}>
                {row?.children?.map((bar) => (
                    <SortableBar
                        key={bar?.id}
                        bar={bar}
                        dataDashBoard={dataDashBoard}
                        loading={loading}
                        isOver={!isActiveSpan12 && overId === bar?.id}
                        isDraggingActive={!!activeId}
                        isOverValid={isOverValid}
                    >
                        {bar?.render(bar, dataDashBoard, loading, selectedRange, activeBrand, authToken, filters, updateDataDashBoard)}
                    </SortableBar>
                ))}
            </SortableContext>
        </div>
    );
};

