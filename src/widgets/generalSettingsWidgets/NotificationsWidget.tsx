import React, { useState, useContext, useEffect, useMemo } from 'react';
import styles from './NotificationsWidget.module.css'
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { Button, ConfigProvider, Input, Select, Checkbox, Flex, Switch, Modal } from 'antd';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { URL } from '@/service/config';
import { useAppSelector } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import SuccessModal from '@/components/sharedComponents/modals/successModal/successModal';

// Types for API response
interface TelegramMetricConfig {
    name: string;
    display_name: string;
    selected: boolean;
    order: number;
}

interface TelegramPreferencesResponse {
    shop: number;
    telegram_linked: boolean;
    daily_enabled: boolean;
    daily_metrics_config: TelegramMetricConfig[];
    weekly_enabled: boolean;
    weekly_metrics_config: TelegramMetricConfig[];
    daily_show_top3?: boolean;
    weekly_show_top3?: boolean;
}

interface ProcessedMetric extends TelegramMetricConfig {
    id: string;
    title: string;
}


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
        fontSize: 14,
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

const checkboxTheme = {
    token: {
        colorPrimary: '#5329FF',
        controlInteractiveSize: 20,
        colorBgContainerDisabled: 'rgba(0,0,0,0.1)',
        colorTextDisabled: 'rgba(0,0,0,0.5)'
    },
    components: {
        Checkbox: {
            colorPrimary: '#5329FF',
        }
    }
}




export const NotificationsWidget = () => {
    const { authToken, user } = useContext(AuthContext);
    const { activeBrand, isFiltersLoaded } = useAppSelector(store => store.filters)
    const [preferences, setPreferences] = useState<TelegramPreferencesResponse | null>(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<{ title: string; message: string; link?: string } | null>(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    // Weekly block states
    const [weeklyEnabled, setWeeklyEnabled] = useState(false);
    const [weeklyShowTop3, setWeeklyShowTop3] = useState(false);
    const [weeklyDisplayItems, setWeeklyDisplayItems] = useState<ProcessedMetric[]>([]);
    const [weeklySelectedMetrics, setWeeklySelectedMetrics] = useState<Set<string>>(new Set());
    const [weeklyActiveId, setWeeklyActiveId] = useState<string | null>(null);

    // Daily block states
    const [dailyEnabled, setDailyEnabled] = useState(false);
    const [dailyShowTop3, setDailyShowTop3] = useState(false);
    const [dailyDisplayItems, setDailyDisplayItems] = useState<ProcessedMetric[]>([]);
    const [dailySelectedMetrics, setDailySelectedMetrics] = useState<Set<string>>(new Set());
    const [dailyActiveId, setDailyActiveId] = useState<string | null>(null);

    const getParams = async () => {
        try {
            let res = await fetch(`${URL}/api/telegram/preferences?shop_id=${activeBrand.id}`, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'JWT ' + authToken
                }
            })

            if (!res.ok) {
                return;
            }

            const data: TelegramPreferencesResponse = await res.json()
            setPreferences(data)

            // Initialize weekly states
            if (data.weekly_metrics_config && data.weekly_metrics_config.length > 0) {
                const processedMetrics: ProcessedMetric[] = data.weekly_metrics_config
                    .sort((a, b) => a.order - b.order)
                    .map((m) => ({
                        ...m,
                        id: m.name,
                        title: m.display_name
                    }));
                setWeeklyDisplayItems(processedMetrics);
                setWeeklySelectedMetrics(new Set(
                    processedMetrics.filter(m => m.selected).map(m => m.id)
                ));
            }
            setWeeklyEnabled(data.weekly_enabled || false);
            setWeeklyShowTop3(data.weekly_show_top3 || false);

            // Initialize daily states
            if (data.daily_metrics_config && data.daily_metrics_config.length > 0) {
                const processedMetrics: ProcessedMetric[] = data.daily_metrics_config
                    .sort((a, b) => a.order - b.order)
                    .map((m) => ({
                        ...m,
                        id: m.name,
                        title: m.display_name
                    }));
                setDailyDisplayItems(processedMetrics);
                setDailySelectedMetrics(new Set(
                    processedMetrics.filter(m => m.selected).map(m => m.id)
                ));
            }
            setDailyEnabled(data.daily_enabled || false);
            setDailyShowTop3(data.daily_show_top3 || false);

        } catch (e) {
            console.log(e)
            setErrorMessage('Ошибка загрузки параметров уведомлений');
            setErrorModalVisible(true);
        }
    }

    useEffect(() => {
        if (isFiltersLoaded && activeBrand && authToken) {
            getParams()
        }
    }, [authToken, activeBrand, isFiltersLoaded])

    const handleSave = async () => {
        if (!preferences || !activeBrand) return;

        // If both blocks are disabled, no validation needed
        if (!weeklyEnabled && !dailyEnabled) {
            // Proceed with save without validation
        } else {
            // Validation: Check if telegram is linked (only if at least one block is enabled)
            if (!preferences.telegram_linked) {
                setModalContent({
                    title: 'Подключение Telegram-бота',
                    message: 'Для активации уведомлений подключите нашего телеграм-бота по этой',
                    link: `https://t.me/everydayquestgroupBOT?start=${user.id}`
                });
                setModalVisible(true);
                return;
            }

            // Validation: Check if at least one metric is selected when notifications are enabled
            if (weeklyEnabled && weeklySelectedMetrics.size === 0) {
                setModalContent({
                    title: 'Ошибка валидации',
                    message: 'Для недельных уведомлений необходимо выбрать хотя бы одну метрику'
                });
                setModalVisible(true);
                return;
            }

            if (dailyEnabled && dailySelectedMetrics.size === 0) {
                setModalContent({
                    title: 'Ошибка валидации',
                    message: 'Для дневных уведомлений необходимо выбрать хотя бы одну метрику'
                });
                setModalVisible(true);
                return;
            }
        }

        try {
            // Prepare weekly metrics config - use actual order from items, not index
            const weeklyMetricsConfig = weeklyDisplayItems.map((item) => ({
                name: item.name,
                display_name: item.display_name,
                selected: weeklySelectedMetrics.has(item.id),
                order: item.order
            }));

            // Prepare daily metrics config - use actual order from items, not index
            const dailyMetricsConfig = dailyDisplayItems.map((item) => ({
                name: item.name,
                display_name: item.display_name,
                selected: dailySelectedMetrics.has(item.id),
                order: item.order
            }));

            // Send the same structure as received from API, with user changes
            const payload: TelegramPreferencesResponse = {
                shop: preferences.shop,
                telegram_linked: preferences.telegram_linked,
                weekly_enabled: weeklyEnabled,
                weekly_metrics_config: weeklyMetricsConfig,
                weekly_show_top3: weeklyShowTop3,
                daily_enabled: dailyEnabled,
                daily_metrics_config: dailyMetricsConfig,
                daily_show_top3: dailyShowTop3
            };

            const res = await fetch(`${URL}/api/telegram/preferences/metrics?shop_id=${activeBrand.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'JWT ' + authToken
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Failed to save preferences:', errorText);
                setErrorMessage('Ошибка сохранения настроек уведомлений');
                setErrorModalVisible(true);
                return;
            }

            const updatedData: TelegramPreferencesResponse = await res.json();
            setPreferences(updatedData);
            setSuccessModalVisible(true);

        } catch (e) {
            console.error('Error saving preferences:', e);
            setErrorMessage('Ошибка сохранения настроек уведомлений');
            setErrorModalVisible(true);
        }
    };



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
                        onClick={handleSave}
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
                isDataLoading={!preferences || !isFiltersLoaded}
                disabled={!preferences || !isFiltersLoaded}
                uncontrolledMode
            />

            <div className={styles.widget__grid}>
                <SettingsBlock
                    title='Раз в неделю'
                    frequency='weekly'
                    enabled={weeklyEnabled}
                    onToggleChange={setWeeklyEnabled}
                    showTop3={weeklyShowTop3}
                    onShowTop3Change={setWeeklyShowTop3}
                    displayItems={weeklyDisplayItems}
                    onDisplayItemsChange={setWeeklyDisplayItems}
                    selectedMetrics={weeklySelectedMetrics}
                    onSelectedMetricsChange={setWeeklySelectedMetrics}
                    activeId={weeklyActiveId}
                    onActiveIdChange={setWeeklyActiveId}
                />
                <SettingsBlock
                    title='Каждый день'
                    frequency='daily'
                    enabled={dailyEnabled}
                    onToggleChange={setDailyEnabled}
                    showTop3={dailyShowTop3}
                    onShowTop3Change={setDailyShowTop3}
                    displayItems={dailyDisplayItems}
                    onDisplayItemsChange={setDailyDisplayItems}
                    selectedMetrics={dailySelectedMetrics}
                    onSelectedMetricsChange={setDailySelectedMetrics}
                    activeId={dailyActiveId}
                    onActiveIdChange={setDailyActiveId}
                />
            </div>

            <Modal
                title={modalContent?.title || 'Уведомление'}
                open={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                okText="Понятно"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{
                    style: {
                        backgroundColor: '#5329FF',
                        borderColor: '#5329FF',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        height: '38px',
                        padding: '0 24px'
                    }
                }}
            >
                <div style={{ marginBottom: modalContent?.link ? '12px' : 0 }}>
                    {modalContent?.link ? (
                        <>
                            {modalContent?.message}
                            <a href={modalContent.link} target="_blank" rel="noopener noreferrer" style={{ color: '#5329FF', textDecoration: 'none' }}>
                                &nbsp;cсылке
                            </a>
                        </>
                    ) : (
                        <>
                            {modalContent?.message}
                        </>
                    )
                    }
                </div>
            </Modal>

            <ErrorModal
                open={errorModalVisible}
                message={errorMessage}
                onOk={() => setErrorModalVisible(false)}
                onClose={() => setErrorModalVisible(false)}
                onCancel={() => setErrorModalVisible(false)}
                footer={null}
            />

            <SuccessModal
                open={successModalVisible}
                message="Настройки уведомлений успешно сохранены"
                onOk={() => setSuccessModalVisible(false)}
                onClose={() => setSuccessModalVisible(false)}
                onCancel={() => setSuccessModalVisible(false)}
                footer={null}
                title={null}
            />
        </div>
    )
}

interface ISettingsBlockProps {
    title: string,
    frequency: 'weekly' | 'daily',
    enabled: boolean,
    onToggleChange: (value: boolean) => void,
    showTop3: boolean,
    onShowTop3Change: (value: boolean) => void,
    displayItems: ProcessedMetric[],
    onDisplayItemsChange: (items: ProcessedMetric[]) => void,
    selectedMetrics: Set<string>,
    onSelectedMetricsChange: (metrics: Set<string>) => void,
    activeId: string | null,
    onActiveIdChange: (id: string | null) => void,
}

const SettingsBlock: React.FC<ISettingsBlockProps> = ({
    title,
    frequency,
    enabled,
    onToggleChange,
    showTop3,
    onShowTop3Change,
    displayItems,
    onDisplayItemsChange,
    selectedMetrics,
    onSelectedMetricsChange,
    activeId,
    onActiveIdChange,
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [activeSearchValue, setActiveSearchValue] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    // Memoize sensors array to keep it stable
    const stableSensors = useMemo(() => sensors, []);

    // Filter metrics based on search
    const filteredItems = useMemo(() => {
        if (!activeSearchValue.trim()) {
            return displayItems;
        }
        const searchLower = activeSearchValue.toLowerCase();
        return displayItems.filter((item) => {
            return item.title.toLowerCase().includes(searchLower) ||
                item.name.toLowerCase().includes(searchLower);
        });
    }, [displayItems, activeSearchValue]);

    const handleSearch = () => {
        setActiveSearchValue(searchValue);
    };

    const handleDragStart = (event: DragStartEvent) => {
        onActiveIdChange(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        onActiveIdChange(null);
        if (over && active.id !== over.id) {
            const activeIdStr = String(active.id);
            const overIdStr = String(over.id);
            const oldIndex = displayItems.findIndex(item => String(item.id) === activeIdStr);
            const newIndex = displayItems.findIndex(item => String(item.id) === overIdStr);

            if (oldIndex !== -1 && newIndex !== -1) {
                const targetItem = displayItems[newIndex];
                const targetOrder = targetItem.order;

                // Move the item in the array
                const reordered = arrayMove(displayItems, oldIndex, newIndex);

                // Create a map of original orders by id for reference
                const originalOrders = new Map(
                    displayItems.map(item => [String(item.id), item.order])
                );

                // Update orders based on direction of movement
                const updated = reordered.map((item, index) => {
                    const itemId = String(item.id);
                    const originalOrder = originalOrders.get(itemId) || item.order;

                    // If this is the dragged item, give it the target's order
                    if (itemId === activeIdStr) {
                        return {
                            ...item,
                            order: targetOrder
                        };
                    }

                    // If dragging down (oldIndex < newIndex)
                    if (oldIndex < newIndex) {
                        // Elements that were between oldIndex+1 and newIndex (inclusive) shift up (order - 1)
                        // In the original array, these had indices from oldIndex+1 to newIndex
                        const originalItemIndex = displayItems.findIndex(i => String(i.id) === itemId);
                        if (originalItemIndex > oldIndex && originalItemIndex <= newIndex) {
                            return {
                                ...item,
                                order: originalOrder - 1
                            };
                        }
                    }
                    // If dragging up (oldIndex > newIndex)
                    else {
                        // Elements that were between newIndex and oldIndex-1 (inclusive) shift down (order + 1)
                        // In the original array, these had indices from newIndex to oldIndex-1
                        const originalItemIndex = displayItems.findIndex(i => String(i.id) === itemId);
                        if (originalItemIndex >= newIndex && originalItemIndex < oldIndex) {
                            return {
                                ...item,
                                order: originalOrder + 1
                            };
                        }
                    }

                    // All other items keep their order
                    return item;
                });

                onDisplayItemsChange(updated);
            }
        }
    };

    const handleMetricToggle = (metricId: string) => {
        const newSet = new Set(selectedMetrics);
        if (newSet.has(metricId)) {
            newSet.delete(metricId);
        } else {
            newSet.add(metricId);
        }
        onSelectedMetricsChange(newSet);
    };

    const handleSelectAll = () => {
        const allFilteredSelected = filteredItems.length > 0 && filteredItems.every((item) => selectedMetrics.has(item.id));

        const newSet = new Set(selectedMetrics);
        if (allFilteredSelected) {
            // Unselect all filtered items
            filteredItems.forEach((item) => newSet.delete(item.id));
        } else {
            // Select all filtered items
            filteredItems.forEach((item) => newSet.add(item.id));
        }
        onSelectedMetricsChange(newSet);
    };

    const allFilteredSelected = filteredItems.length > 0 && filteredItems.every((item) => selectedMetrics.has(item.id));
    const selectedCount = displayItems.filter((item) => selectedMetrics.has(item.id)).length;
    const totalCount = displayItems.length;

    const activeItem = activeId ? displayItems.find(item => String(item.id) === String(activeId)) : null;

    return (
        <div className={styles.widget__block}>
            <div className={styles.widget__blockHeader}>
                <div className={styles.widget__blockHeaderTop}>
                    <h3 className={styles.widget__blockTitle}>{title}</h3>
                    <ConfigProvider theme={switchTheme}>
                        <Switch
                            checked={enabled}
                            onChange={onToggleChange}
                        />
                    </ConfigProvider>
                </div>
            </div>
            <div className={styles.widget__searchContainer}>
                <ConfigProvider theme={inputTheme}>
                    <Input
                        placeholder={"Поиск метрики"}
                        disabled={!enabled}
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
                        onBlur={handleSearch}
                    />
                </ConfigProvider>
            </div>
            <div className={styles.widget__selectionInfo}>
                <button
                    type="button"
                    onClick={handleSelectAll}
                    className={styles.actionLink}
                    disabled={!enabled}
                >
                    {allFilteredSelected ? 'Снять все' : 'Выбрать все'}
                </button>
                <span className={styles.selectionCount}>
                    Выбрано {selectedCount}/{totalCount}
                </span>
            </div>

            <DndContext
                sensors={stableSensors}
                collisionDetection={closestCenter}
                onDragStart={enabled ? handleDragStart : undefined}
                onDragEnd={enabled ? handleDragEnd : undefined}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext
                    items={filteredItems.map(item => String(item.id))}
                    strategy={verticalListSortingStrategy}
                >
                    <div className={styles.list}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((card) => (
                                <SortableItem
                                    key={card.id}
                                    id={String(card.id)}
                                    card={card}
                                    checked={selectedMetrics.has(card.id)}
                                    onToggle={() => handleMetricToggle(card.id)}
                                    disabled={!enabled}
                                />
                            ))
                        ) : displayItems.length === 0 ? (
                            <div style={{
                                padding: '40px 20px',
                                textAlign: 'center',
                                color: '#999999',
                                fontSize: '14px'
                            }}>
                                Загрузка метрик...
                            </div>
                        ) : activeSearchValue.trim() && filteredItems.length === 0 ? (
                            <div style={{
                                padding: '40px 20px',
                                textAlign: 'center',
                                color: '#999999',
                                fontSize: '14px'
                            }}>
                                Ничего не найдено
                            </div>
                        ) : displayItems.length === 0 ? (
                            <div style={{
                                padding: '40px 20px',
                                textAlign: 'center',
                                color: '#999999',
                                fontSize: '14px'
                            }}>
                                Метрики не найдены
                            </div>
                        ) : null}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {activeItem ? (
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
                            <ConfigProvider theme={checkboxTheme}>
                                <Checkbox
                                    checked={selectedMetrics.has(activeItem.id)}
                                    className={styles.checkbox}
                                >
                                    {activeItem.display_name || activeItem.title}
                                </Checkbox>
                            </ConfigProvider>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}


interface SortableItemProps {
    id: string;
    card: ProcessedMetric;
    checked: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, card, checked, onToggle, disabled = false }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        disabled
    });

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
            <div
                className={styles.dragHandle}
                {...(disabled ? {} : { ...attributes, ...listeners })}
                style={disabled ? { cursor: 'not-allowed', opacity: 0.7 } : {}}
            >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2.62268e-07C3.10457 4.07115e-07 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.895433 4 2.21557e-06 3.10457 2.36042e-06 2C2.50526e-06 0.89543 0.895433 1.17422e-07 2 2.62268e-07Z" fill="#999999" />
                    <path d="M14 16C15.1046 16 16 16.8954 16 18C16 19.1046 15.1046 20 14 20C12.8954 20 12 19.1046 12 18C12 16.8954 12.8954 16 14 16Z" fill="#999999" />
                    <path d="M2 16C3.10457 16 4 16.8954 4 18C4 19.1046 3.10457 20 2 20C0.895432 20 2.21557e-06 19.1046 2.36042e-06 18C2.50526e-06 16.8954 0.895433 16 2 16Z" fill="#999999" />
                    <path d="M14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8Z" fill="#999999" />
                    <path d="M2 8C3.10457 8 4 8.89543 4 10C4 11.1046 3.10457 12 2 12C0.895433 12 2.21557e-06 11.1046 2.36042e-06 10C2.50526e-06 8.89543 0.895433 8 2 8Z" fill="#999999" />
                    <path d="M14 -7.14702e-08C15.1046 7.33766e-08 16 0.89543 16 2C16 3.10457 15.1046 4 14 4C12.8954 4 12 3.10457 12 2C12 0.895429 12.8954 -2.16317e-07 14 -7.14702e-08Z" fill="#999999" />
                </svg>
            </div>
            <ConfigProvider theme={checkboxTheme}>
                <Checkbox
                    checked={checked}
                    onChange={onToggle}
                    className={styles.checkbox}
                    disabled={disabled}
                >
                    {card.display_name || card.title}
                </Checkbox>
            </ConfigProvider>
        </div>
    );
};