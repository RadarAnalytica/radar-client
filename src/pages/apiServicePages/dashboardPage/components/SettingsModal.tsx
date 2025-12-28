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
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
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
        <div ref={setNodeRef} style={style} className={styles.sortableItem}>
            <div className={styles.dragHandle} {...attributes} {...listeners}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="5" r="1.5" fill="#8C8C8C"/>
                    <circle cx="10" cy="10" r="1.5" fill="#8C8C8C"/>
                    <circle cx="10" cy="15" r="1.5" fill="#8C8C8C"/>
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
    const [displayItems, setDisplayItems] = useState<Array<Record<string, any>>>(items);
    const [originalItems, setOriginalItems] = useState<Array<Record<string, any>>>(items);

    useEffect(() => {
        if (isOpen) {
            setOriginalItems([...items]);
            setDisplayItems([...items]);
            setSearchValue('');
            form.setFieldsValue(items.reduce((acc, item) => {
                acc[item.id] = item.isVisible;
                return acc;
            }, {}));
        }
    }, [items, isOpen, form]);

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
            setDisplayItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
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
            const updatedConfig = displayItems.map(item => ({...item, isVisible: values[item.id]}));
            onSave(updatedConfig, BARS_STORAGE_KEY, DASHBOARD_CONFIG_VER);
            setItems(updatedConfig);
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
                        controlHeightLG: 44,
                        contentFontSize: 16,
                        contentFontSizeSM: 16,
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
                onClose={handleCancel}
                title="Шаблон настройки значений"
                closeIcon={
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z"
                            fill="#1A1A1A"
                            fillOpacity="0.5"
                        />
                    </svg>
                }
                width={1200}
                footer={
                    <Flex
                        gap={12}
                        justify="space-between"
                        align="center"
                        className={styles.controls}
                    >
                        <Button size="large" onClick={handleCancel} className={styles.cancelButton}>
                            Отменить
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleOk}
                            className={styles.saveButton}
                        >
                            Сохранить изменения
                        </Button>
                    </Flex>
                }
            >
                <Form form={form} layout="vertical">
                    <div className={styles.topActions}>
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
                    
                    <div className={styles.searchContainer}>
                        <Input
                            placeholder="Наим"
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
                                            <path d="M13 1L1 13M1 1L13 13" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                )
                            }
                            className={styles.searchInput}
                            onPressEnter={handleSearch}
                        />
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

                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={filteredItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
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