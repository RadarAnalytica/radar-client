import styles from './DragHandler.module.css';
import { useContext, Context } from "react";

export interface DragHandleContextValue {
    listeners: any;
    attributes: any;
}

export interface DragHandleProps {
    context: Context<DragHandleContextValue | null>;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
}

// Компонент-хэндлер для перетаскивания
export const DragHandle = ({ context, children, className, style, ...props }: DragHandleProps) => {
    const dragHandleProps = useContext(context);

    if (!dragHandleProps) {
        //console.warn('DragHandle должен использоваться внутри SortableBar');
        return (children || null) as React.ReactElement | null;
    }

    const { listeners, attributes } = dragHandleProps;

    return (
        <div
            {...listeners}
            {...attributes}
            className={styles.dragHandle}
            style={{
                ...style
            }}
            {...props}
        >
            {children !== undefined ? children : (
                <>
                    <div className={styles.dragHandle__dot} />
                    <div className={styles.dragHandle__dot} />
                    <div className={styles.dragHandle__dot} />
                    <div className={styles.dragHandle__dot} />
                    <div className={styles.dragHandle__dot} />
                    <div className={styles.dragHandle__dot} />
                </>

            )}
        </div>
    );
};

DragHandle.displayName = 'DragHandle';