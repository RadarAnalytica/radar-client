import styles from './firstBarsGroup.module.css';
import { RadarBar } from '../../../shared/ui/RadarBar/RadarBar';
import { useState } from 'react';
import { useDndMonitor } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';



const FirstBarsGroup = ({ dataDashBoard, selectedRange, loading }) => {
    const [items, setItems] = useState(barsConfig);

    useDndMonitor({
        onDragOver: ({ active, over }) => {
            console.log('onDragOver', { active, over });
            if (!over || active.id === over.id) return;
        },
        onDragEnd: ({ active, over }) => {
            if (!over || active.id === over.id) return;
            const activeElem = document.getElementById(active.id);
            const overElem = document.getElementById(over.id);
            if (activeElem && overElem) {
                const activeCS = getComputedStyle(activeElem);
                const overCS = getComputedStyle(overElem);
                const activeGridColumn = activeCS.getPropertyValue('grid-column').trim();
                const overGridColumn = overCS.getPropertyValue('grid-column').trim();
                if (activeGridColumn !== overGridColumn) {
                    return;
                }
            }
            setItems((prev) => {
                const oldIndex = prev.findIndex((i) => i.id === active.id);
                const newIndex = prev.findIndex((i) => i.id === over.id);
                if (oldIndex === -1 || newIndex === -1) return prev;
                return arrayMove(prev, oldIndex, newIndex);
            });
        },
    });

    return (
        <div className={styles.group}>
            <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
                {items.map((bar) => (
                    <SortableBar key={bar.id} bar={bar} dataDashBoard={dataDashBoard} loading={loading} />
                ))}
            </SortableContext>
        </div>
    );
};

const SortableBar = ({ bar, dataDashBoard, loading }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: bar.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        opacity: isDragging ? 0.8 : 1,
    };
    return (
        <div className={bar.container} ref={setNodeRef} style={style} {...attributes} {...listeners} id={bar.id}>
            <RadarBar
                title={bar.title}
                tooltipText={bar.tooltipText}
                mainValue={dataDashBoard?.[bar.mainValue]}
                mainValueUnits={bar.mainValueUnits}
                hasColoredBackground={bar.hasColoredBackground}
                compareValue={{
                    comparativeValue: dataDashBoard?.[bar.compareValue.comparativeValue],
                    absoluteValue: dataDashBoard?.[bar.compareValue.absoluteValue],
                    absoluteValueUnits: bar.compareValue.absoluteValueUnits,
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
        </div>
    );
};

export default FirstBarsGroup;