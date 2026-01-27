import React, { useState } from 'react';
import styles from './NotificationsWidget.module.css'
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { Button, ConfigProvider, Input, Select, Checkbox, Flex, Switch } from 'antd';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';


const mainButtonTheme = {
    token: {
        colorPrimary: '#5329FF',
        colorPrimaryHover: '#5329FF',
        fontSize: 12,
        //@ts-ignore
        fontWeight: 700,
        width: '100%',
        controlHeightLG: 46,
    },
    components: {
        Button: {
            primaryShadow: 'transparent',
            primaryColor: 'white',
            colorPrimaryActive: '#5329FF90'
        }
    }
}

const switchTheme = {
    token: {
        colorPrimary: '#5329FF',
    },
    components: {
        Switch: {
            trackMinWidth: 32
        }
    }
}

const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Manrope',
        fontSize: 12,
        // fontWeight: 500,
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            // activeOutlineColor: 'transparent',
            activeShadow: 'transparent',
            controlHeight: 38,
            controlHeightLG: 38,
        },
    }
}



export const NotificationsWidget = () => {



    return (
        <div className={styles.widget}>
            <div className={styles.widget__header}>
                <h2 className={styles.widget__title}>
                    Настройки бота
                </h2>
                <ConfigProvider
                    theme={mainButtonTheme}
                >
                    <Button
                        type='primary'
                        size='large'
                        style={{ fontWeight: 700 }}
                    >
                        Сохранить
                    </Button>
                </ConfigProvider>
            </div>

            <Filters
                //@ts-ignore
                timeSelect={false}
                skuFrequency={false}
                brandSelect={false}
                articleSelect={false}
                groupSelect={false}
                weekSelect={false}
                monthSelect={false}
            // isDataLoading
            // disabled
            // uncontrolledMode={true}
            />

            <div className={styles.widget__grid}>
                <SettingsBlock
                    title='Раз в неделю'
                />
                <SettingsBlock
                    title='Каждый день'
                />
            </div>
        </div>
    )
}

interface ISettingsBlockProps {
    title: string,
}

const SettingsBlock: React.FC<ISettingsBlockProps> = ({
    title
}) => {

    const [searchValue, setSearchValue] = useState(''); // Значение в input
    const [activeSearchValue, setActiveSearchValue] = useState(''); // Активное значение для фильтрации
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleSearch = () => { }

    const handleDragStart = (event: DragStartEvent) => {
        //setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        // setActiveId(null);
        // if (over && active.id !== over.id) {
        //     setDisplayItems((currentItems) => {
        //         const oldIndex = currentItems.findIndex(item => item.id === active.id);
        //         const newIndex = currentItems.findIndex(item => item.id === over.id);

        //         if (oldIndex !== -1 && newIndex !== -1) {
        //             return arrayMove(currentItems, oldIndex, newIndex);
        //         }
        //         return currentItems;
        //     });
        // }
    };

    return (
        <div className={styles.widget__block}>
            <div className={styles.widget__header}>
                <h3 className={styles.widget__blockTitle}>{title}</h3>
                <ConfigProvider
                    theme={switchTheme}
                >
                    <Switch
                        checked={true}
                    //onChange={() => onChange(section.id)}
                    />
                </ConfigProvider>
                {/* <div className={styles.headerActions}>
                            <button
                                type="button"
                                //onClick={handleSelectAll}
                                className={styles.actionLink}
                            >
                                {allSelected ? 'Снять все' : 'Выбрать все'}
                            </button>
                            <button
                                type="button"
                                //onClick={handleRevertToOriginal}
                                className={styles.actionLink}
                            >
                                Вернуть к исходному варианту
                            </button>
                        </div> */}
            </div>
            <div className={styles.widget__searchContainer}>
                <ConfigProvider
                    theme={inputTheme}
                >
                    <Input
                        placeholder="Поиск метрики"
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
                                        setActiveSearchValue(''); // Также сбрасываем активный поиск
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
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext
                    // items={filteredItems.map(item => item.id)}
                    items={[]}
                    strategy={verticalListSortingStrategy}
                >
                    <div className={styles.list}>
                        {/* {filteredItems.length > 0 ? (
                                    filteredItems.map((card) => (
                                        <SortableItem key={card.id} id={card.id} card={card} form={form} />
                                    ))
                                ) : activeSearchValue.trim() ? (
                                    <div style={{
                                        padding: '40px 20px',
                                        textAlign: 'center',
                                        color: '#999999',
                                        fontSize: '14px'
                                    }}>
                                        Ничего не найдено
                                    </div>
                                ) : null} */}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {/* {activeItem ? (
                                <div className={styles.sortableItem} style={{
                                    opacity: 1,
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                    cursor: 'grabbing'
                                }}>
                                    <div className={styles.dragHandle}>
                                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 2.62268e-07C3.10457 4.07115e-07 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.895433 4 2.21557e-06 3.10457 2.36042e-06 2C2.50526e-06 0.89543 0.895433 1.17422e-07 2 2.62268e-07Z" fill="#999999" />
                                            <path d="M14 16C15.1046 16 16 16.8954 16 18C16 19.1046 15.1046 20 14 20C12.8954 20 12 19.1046 12 18C12 16.8954 12.8954 16 14 16Z" fill="#999999" />
                                            <path d="M2 16C3.10457 16 4 16.8954 4 18C4 19.1046 3.10457 20 2 20C0.895432 20 2.21557e-06 19.1046 2.36042e-06 18C2.50526e-06 16.8954 0.895433 16 2 16Z" fill="#999999" />
                                            <path d="M14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8Z" fill="#999999" />
                                            <path d="M2 8C3.10457 8 4 8.89543 4 10C4 11.1046 3.10457 12 2 12C0.895433 12 2.21557e-06 11.1046 2.36042e-06 10C2.50526e-06 8.89543 0.895433 8 2 8Z" fill="#999999" />
                                            <path d="M14 -7.14702e-08C15.1046 7.33766e-08 16 0.89543 16 2C16 3.10457 15.1046 4 14 4C12.8954 4 12 3.10457 12 2C12 0.895429 12.8954 -2.16317e-07 14 -7.14702e-08Z" fill="#999999" />
                                        </svg>
                                    </div>
                                    <Checkbox
                                        checked={form.getFieldValue(activeItem.id) !== false}
                                        className={styles.checkbox}
                                    >
                                        {activeItem.title}
                                    </Checkbox>
                                </div>
                            ) : null} */}
                </DragOverlay>
            </DndContext>
        </div>
    )
}


interface SortableItemProps {
    id: string;
    card: Record<string, any>;
    form: any;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, card, form }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={styles.sortableItem}
            data-dragging={isDragging}
        >
            <div className={styles.dragHandle} {...attributes} {...listeners}>
                {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="5" r="1.5" fill="#8C8C8C" />
                    <circle cx="10" cy="10" r="1.5" fill="#8C8C8C" />
                    <circle cx="10" cy="15" r="1.5" fill="#8C8C8C" />
                </svg> */}
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2.62268e-07C3.10457 4.07115e-07 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.895433 4 2.21557e-06 3.10457 2.36042e-06 2C2.50526e-06 0.89543 0.895433 1.17422e-07 2 2.62268e-07Z" fill="#999999" />
                    <path d="M14 16C15.1046 16 16 16.8954 16 18C16 19.1046 15.1046 20 14 20C12.8954 20 12 19.1046 12 18C12 16.8954 12.8954 16 14 16Z" fill="#999999" />
                    <path d="M2 16C3.10457 16 4 16.8954 4 18C4 19.1046 3.10457 20 2 20C0.895432 20 2.21557e-06 19.1046 2.36042e-06 18C2.50526e-06 16.8954 0.895433 16 2 16Z" fill="#999999" />
                    <path d="M14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8Z" fill="#999999" />
                    <path d="M2 8C3.10457 8 4 8.89543 4 10C4 11.1046 3.10457 12 2 12C0.895433 12 2.21557e-06 11.1046 2.36042e-06 10C2.50526e-06 8.89543 0.895433 8 2 8Z" fill="#999999" />
                    <path d="M14 -7.14702e-08C15.1046 7.33766e-08 16 0.89543 16 2C16 3.10457 15.1046 4 14 4C12.8954 4 12 3.10457 12 2C12 0.895429 12.8954 -2.16317e-07 14 -7.14702e-08Z" fill="#999999" />
                </svg>

            </div>
            <Checkbox className={styles.checkbox}>
                {card.title}
            </Checkbox>
        </div>
    );
};