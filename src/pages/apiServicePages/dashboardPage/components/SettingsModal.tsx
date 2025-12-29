import React, { useEffect, useMemo, useState } from 'react';
import styles from './SettingsModal.module.css';
import {
    ConfigProvider,
    Modal,
    Form,
    Checkbox,
    Button,
    Flex,
    Input,
} from 'antd';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ISettingsModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    BARS_STORAGE_KEY: string;
    DASHBOARD_CONFIG_VER: string;
    items: Array<Record<string, any>>;
    setItems: React.Dispatch<React.SetStateAction<Array<Record<string, any>>>>;
    onSave: (items: Array<Record<string, any>>, BARS_STORAGE_KEY: string, DASHBOARD_CONFIG_VER: string) => void;
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
        opacity: isDragging ? 0.5 : 1,
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
            <Form.Item
                name={card.id}
                valuePropName="checked"
                initialValue={true}
                noStyle
            >
                <Checkbox className={styles.checkbox}>
                    {card.title}
                </Checkbox>
            </Form.Item>
        </div>
    );
};

export const SettingsModal: React.FC<ISettingsModalProps> = (
    {
        isOpen,
        setIsOpen,
        BARS_STORAGE_KEY,
        DASHBOARD_CONFIG_VER,
        items,
        setItems,
        onSave
    }
) => {
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState('');
    const [displayItems, setDisplayItems] = useState<Array<Record<string, any>>>([]);
    const [originalItems, setOriginalItems] = useState<Array<Record<string, any>>>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    // Фильтруем только элементы с dropKey === '1'
    const itemsWithDropKey1 = useMemo(() => {
        return items.filter(item => item.dropKey === '1');
    }, [items]);

    useEffect(() => {
        if (isOpen) {
            setOriginalItems([...itemsWithDropKey1]);
            setDisplayItems([...itemsWithDropKey1]);
            setSearchValue('');
            form.setFieldsValue(itemsWithDropKey1.reduce((acc, item) => {
                acc[item.id] = item.isVisible;
                return acc;
            }, {}));
        }
    }, [itemsWithDropKey1, isOpen, form]);

    const filteredItems = useMemo(() => {
        if (!searchValue.trim()) {
            return displayItems;
        }
        return displayItems.filter(item =>
            item.title?.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [displayItems, searchValue]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setDisplayItems((currentItems) => {
                const oldIndex = currentItems.findIndex(item => item.id === active.id);
                const newIndex = currentItems.findIndex(item => item.id === over.id);

                if (oldIndex !== -1 && newIndex !== -1) {
                    return arrayMove(currentItems, oldIndex, newIndex);
                }
                return currentItems;
            });
        }
    };

    const handleSelectAll = () => {
        const allChecked = filteredItems.every(item => {
            const value = form.getFieldValue(item.id);
            return value !== false;
        });
        const newValues = filteredItems.reduce((acc, item) => {
            acc[item.id] = !allChecked;
            return acc;
        }, {} as Record<string, boolean>);
        form.setFieldsValue(newValues);
    };

    const handleRevertToOriginal = () => {
        setDisplayItems([...originalItems]);
        form.setFieldsValue(originalItems.reduce((acc, item) => {
            acc[item.id] = item.isVisible;
            return acc;
        }, {}));
    };

    const handleSearch = () => {
        // Search is handled by filteredItems useMemo
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            // Обновляем только элементы с dropKey === '1' (с новым порядком и видимостью)
            const updatedDropKey1Items: Array<Record<string, any>> = displayItems.map((item: Record<string, any>) => ({ 
                ...item, 
                isVisible: values[item.id] 
            }));
            
            // Создаем карту обновленных элементов для быстрого поиска
            const updatedItemsMap = new Map<string, Record<string, any>>();
            updatedDropKey1Items.forEach((item: Record<string, any>) => {
                if (item.id) {
                    updatedItemsMap.set(item.id, item);
                }
            });
            
            // Заменяем элементы с dropKey === '1' на обновленные, сохраняя их новый порядок
            // Остальные элементы остаются без изменений
            const fullUpdatedConfig = items.map((item: Record<string, any>) => {
                if (item.dropKey === '1' && item.id && updatedItemsMap.has(item.id)) {
                    return updatedItemsMap.get(item.id)!;
                }
                return item;
            });
            
            // Теперь нужно переставить элементы с dropKey === '1' в новый порядок
            // Находим все позиции элементов с dropKey === '1' в исходном массиве
            const dropKey1Indices: number[] = [];
            items.forEach((item: Record<string, any>, index: number) => {
                if (item.dropKey === '1') {
                    dropKey1Indices.push(index);
                }
            });
            
            // Если есть элементы с dropKey === '1', переставляем их в новый порядок
            if (dropKey1Indices.length > 0 && updatedDropKey1Items.length > 0) {
                // Создаем новый массив с правильным порядком
                const result: Array<Record<string, any>> = [];
                let dropKey1Index = 0;
                
                for (let i = 0; i < fullUpdatedConfig.length; i++) {
                    if (dropKey1Indices.includes(i)) {
                        // Вставляем элемент с dropKey === '1' в новом порядке
                        if (dropKey1Index < updatedDropKey1Items.length) {
                            result.push(updatedDropKey1Items[dropKey1Index]);
                            dropKey1Index++;
                        }
                    } else {
                        // Вставляем элемент без dropKey === '1' как есть
                        result.push(fullUpdatedConfig[i]);
                    }
                }
                
                onSave(result, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER);
                setItems(result);
            } else {
                onSave(fullUpdatedConfig, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER);
                setItems(fullUpdatedConfig);
            }
            
            setIsOpen(false);
        });
    };

    const handleCancel = () => {
        setIsOpen(false);
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
                // onClose={handleCancel}
                title={
                    <div className={styles.modalHeader}>
                        <span className={styles.modalTitle}>Шаблон настройки значений</span>
                        <div className={styles.headerActions}>
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className={styles.actionLink}
                            >
                                Выбрать все
                            </button>
                            <button
                                type="button"
                                onClick={handleRevertToOriginal}
                                className={styles.actionLink}
                            >
                                Вернуть к исходному
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
                footer={
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
                }
            >
                <Form form={form} layout="vertical">

                    <div className={styles.searchContainer}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgContainer: 'white',
                                    colorBorder: '#5329FF1A',
                                    borderRadius: 8,
                                    fontFamily: 'Manrope',
                                    fontSize: 12,
                                    // fontWeight: 500,
                                },
                                components: {
                                    Select: {
                                        activeBorderColor: '#5329FF1A',
                                        activeOutlineColor: 'transparent',
                                        hoverBorderColor: '#5329FF1A',
                                        optionActiveBg: 'transparent',
                                        optionFontSize: 14,
                                        optionSelectedBg: 'transparent',
                                        optionSelectedColor: '#5329FF',
                                        controlHeight: 38,
                                        controlHeightLG: 38,
                                        optionHeight: 24,
                                        optionPadding: '5px 12px'
                                    },
                                    Input: {
                                        activeBorderColor: '#5329FF1A',
                                        hoverBorderColor: '#5329FF1A',
                                        // activeOutlineColor: 'transparent',
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
                                            onClick={() => setSearchValue('')}
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
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={filteredItems.map(item => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className={styles.list}>
                                {filteredItems.map((card) => (
                                    <SortableItem key={card.id} id={card.id} card={card} form={form} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};