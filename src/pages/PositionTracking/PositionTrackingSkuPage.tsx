import { useCallback, useMemo, useRef, useState } from 'react';
import Header from '@/components/sharedComponents/header/header';
import styles from './PositionTrackingSkuPage.module.css';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
// import { MainChart } from '@/features';
import { Table as RadarTable } from 'radar-ui';
import { Segmented, ConfigProvider, Button, Modal, Input } from 'antd';
import { positionTrackingSkuTableConfig } from '@/shared';
import { positionTrackingSkuTableCustomCellRender } from '@/shared';
import Breadcrumbs from '@/components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import { RadarProductBar, RadarRateMark } from '@/shared';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    type ChartData,
    type ChartOptions,
    type ScriptableContext,
    type ActiveElement,
} from 'chart.js';
import { PlainSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/plainSelect/plainSelect';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);


const modalCancelButtonTheme = {
    token: {
        colorPrimary: '#5329FF',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Mulish',
        controlHeight: 44,
        borderRadius: 12,
    },
    components: {
        Button: {
            paddingInline: 24,
            paddingBlock: 10,
            colorBorder: '#E4DCFF',
            colorBgContainer: '#F3EEFF',
            colorBgContainerHover: '#E9E1FF',
            colorBgContainerDisabled: '#F3EEFF',
            colorText: '#5329FF',
            colorTextHover: '#3C1DE0',
            colorBorderHover: '#D1C2FF',
            colorBgTextActive: '#E2D8FF',
            boxShadow: 'none',
        },
    },
};

const modalPrimaryButtonTheme = {
    token: {
        colorPrimary: '#5329FF',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Mulish',
        controlHeight: 44,
        borderRadius: 12,
    },
    components: {
        Button: {
            paddingInline: 24,
            paddingBlock: 10,
            colorPrimaryHover: '#6942FF',
            colorPrimaryActive: '#421BCF',
            boxShadow: 'none',
        },
    },
};

const deleteModalCancelButtonTheme = {
    token: {
        colorPrimary: '#1A1A1A',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Mulish',
        controlHeight: 48,
        borderRadius: 16,
    },
    components: {
        Button: {
            paddingInline: 28,
            paddingBlock: 12,
            colorBgContainer: '#F4F5F6',
            colorBgContainerHover: '#E9EBED',
            colorBgContainerDisabled: '#F4F5F6',
            colorBorder: 'transparent',
            colorText: '#1A1A1A',
            colorTextHover: '#1A1A1A',
            boxShadow: 'none',
        },
    },
};

const deleteModalPrimaryButtonTheme = {
    token: {
        colorPrimary: '#FF3B5C',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Mulish',
        controlHeight: 48,
        borderRadius: 16,
    },
    components: {
        Button: {
            paddingInline: 28,
            paddingBlock: 12,
            colorPrimaryHover: '#FF5370',
            colorPrimaryActive: '#E82646',
            boxShadow: 'none',
        },
    },
};
// antd config providers themes
const segmentedTheme = {
    token: {
        fontSize: 14,
        fontWeight: 500,
    },
    components: {
        Segmented: {
            itemActiveBg: '#5329FF1A',
            itemSelectedBg: '#5329FF1A',
            trackBg: 'transparent',
            trackPadding: 0,
            itemHoverBg: '#5329FF10',
            itemColor: '#1A1A1A80',
            itemSelectedColor: '#1A1A1A',
            itemHoverColor: '#1A1A1A',
        }
    }
}


const mockSkuData = {
    "wb_id": 494066856,
    "wb_id_url": "https://www.wildberries.ru/catalog/494066856/detail.aspx",
    "wb_id_image_link": "https://basket-27.wbbasket.ru/vol4940/part494066/494066856/images/c246x328/1.webp",
    "name": "Хлопковая футболка с принтом на спине",
    "price": 1026,
    "subject_name": "Футболки",
    "supplier_name": "ТВОЕ",
    "supplier_url": "https://www.wildberries.ru/seller/5359",
    "feedbacks": 51,
    "rating": 4.5,
    "visibility": 49.51,
    "avg_place": 422,
    "shows": 670387
}

const positionTrackingSkuMockTableData = [
    {
        key: '1',
        name: 'Худи оверсайз женская',
        frequency: 1000,
        goodsCount: 12,
        mon: 8,
        tue: 6,
        wed: 5,
        thu: 7,
        fri: 9,
        sat: 11,
        sun: 10,
        mon2: 6,
        tue2: 5,
        wed2: 4,
    },
    {
        key: '2',
        name: 'Джоггеры женские хлопковые',
        frequency: 2000,
        goodsCount: 8,
        mon: 15,
        tue: 14,
        wed: 12,
        thu: 10,
        fri: 9,
        sat: 8,
        sun: 7,
        mon2: 9,
        tue2: 12,
        wed2: 13,
    },
];

type MarkPoint = {
    id: string;
    index: number;
    label: string;
};

const PositionTrackingSkuPage = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [tableType, setTableType] = useState<'Кластеры' | 'По запросам'>('Кластеры');
    const [marks, setMarks] = useState<MarkPoint[]>([]);
    const [pendingMarkIndex, setPendingMarkIndex] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [markTooltip, setMarkTooltip] = useState<{ id: string; label: string; x: number; y: number } | null>(null);
    const highlightPointIndex = 3;
    const activityChartContainerRef = useRef<HTMLDivElement>(null);

    const activityChartData = useMemo<ChartData<'line'>>(() => {
        const labels = ['7 Окт', '8 Окт', '9 Окт', '10 Окт', '11 Окт', '12 Окт', '13 Окт', '14 Окт', '15 Окт', '16 Окт', '17 Окт', '18 Окт', '19 Окт', '20 Окт'];
        const marksMap = new Map(marks.map((mark) => [mark.index, mark]));
        const markData = labels.map((_label, index) => (marksMap.has(index) ? 460 : null));
        return {
            labels,
            datasets: [
                {
                    label: 'Просмотры, шт',
                    data: [140, 138, 135, 210, 205, 204, 208, 206, 214, 260, 320, 340, 300, 220],
                    yAxisID: 'y',
                    borderColor: '#5B3BE1',
                    backgroundColor: 'rgba(83, 41, 255, 0.08)',
                    fill: {
                        target: 'origin',
                        above: 'rgba(83, 41, 255, 0.12)',
                        below: 'transparent',
                    },
                    pointBackgroundColor: '#5B3BE1',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 3,
                    tension: 0.45,
                    cubicInterpolationMode: 'monotone',
                    borderWidth: 3,
                    clip: 16,
                },
                {
                    label: 'Ключи, шт',
                    data: [100, 100, 100, 190, 150, 148, 146, 150, 152, 200, 300, 300, 280, 200],
                    yAxisID: 'y',
                    borderColor: '#FFB21A',
                    pointBackgroundColor: '#FFB21A',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 3,
                    tension: 0.45,
                    cubicInterpolationMode: 'monotone',
                    borderWidth: 3,
                    fill: false,
                },
                {
                    label: 'Цена, руб',
                    data: [210, 208, 208, 206, 205, 204, 204, 204, 206, 360, 420, 420, 380, 320],
                    yAxisID: 'y1',
                    borderColor: '#FF5470',
                    pointBackgroundColor: '#FF5470',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 3,
                    tension: 0.45,
                    cubicInterpolationMode: 'monotone',
                    borderWidth: 3,
                    fill: false,
                },
                {
                    label: 'Метки',
                    data: markData,
                    yAxisID: 'y1',
                    showLine: false,
                    pointBackgroundColor: '#5329FF',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointHitRadius: 12,
                },
            ],
        };
    }, [marks]);

    const handleActivityChartClick = useCallback((chart: ChartJS, elements: ActiveElement[]) => {
        if (elements.length === 0) {
            return;
        }
        const first = elements[0];
        const dataset = chart.data.datasets[first.datasetIndex];
        if (dataset?.label === 'Метки') {
            return;
        }
        setPendingMarkIndex(first.index);
        setInputValue('');
        setIsAddModalVisible(true);
        setMarkTooltip(null);
    }, []);

    const handleActivityChartHover = useCallback((chart: ChartJS, elements: ActiveElement[]) => {
        if (!elements || elements.length === 0) {
            setMarkTooltip(null);
            return;
        }

        const first = elements[0];
        const dataset = chart.data.datasets[first.datasetIndex];
        if (dataset?.label !== 'Метки') {
            setMarkTooltip(null);
            return;
        }

        const mark = marks.find((item) => item.index === first.index);
        if (!mark) {
            setMarkTooltip(null);
            return;
        }

        const x = first.element.x as number;
        const y = first.element.y as number;
        const canvasRect = chart.canvas.getBoundingClientRect();
        const containerRect = activityChartContainerRef.current?.getBoundingClientRect();
        setMarkTooltip({
            id: mark.id,
            label: mark.label,
            x: x + canvasRect.left - (containerRect?.left ?? canvasRect.left),
            y: y + canvasRect.top - (containerRect?.top ?? canvasRect.top),
        });
    }, [marks]);

    const closeMarkModal = useCallback(() => {
        setIsAddModalVisible(false);
        setPendingMarkIndex(null);
        setInputValue('');
    }, []);

    const handleCreateMark = useCallback(() => {
        if (pendingMarkIndex === null) {
            return;
        }
        const trimmed = inputValue.trim();
        if (!trimmed) {
            return;
        }
        setMarks((prev) => {
            const existingIndex = prev.findIndex((mark) => mark.index === pendingMarkIndex);
            if (existingIndex >= 0) {
                const next = [...prev];
                next[existingIndex] = { ...next[existingIndex], label: trimmed };
                return next;
            }
            return [...prev, { id: `${Date.now()}`, index: pendingMarkIndex, label: trimmed }];
        });
        closeMarkModal();
    }, [closeMarkModal, inputValue, pendingMarkIndex]);

    const handleDeleteMark = useCallback((id: string) => {
        setMarks((prev) => prev.filter((mark) => mark.id !== id));
        setMarkTooltip(null);
    }, []);

    const activityChartOptions = useMemo<ChartOptions<'line'>>(() => ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        onClick: (event, elements, chart) => {
            if (event.type !== 'click') return;
            handleActivityChartClick(chart, elements);
        },
        onHover: (event, elements, chart) => {
            if (event.type === 'mousemove') {
                handleActivityChartHover(chart, elements);
            }
            if (event.type === 'mouseout') {
                setMarkTooltip(null);
            }
        },
        layout: {
            padding: {
                top: 12,
                bottom: 12,
                left: 0,
                right: 0,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#8C8C8C',
                    font: {
                        family: 'Mulish',
                        size: 12,
                    },
                },
            },
            y: {
                position: 'left',
                beginAtZero: true,
                suggestedMax: 400,
                grid: {
                    color: 'rgba(83, 41, 255, 0.08)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#5B3BE1',
                    font: {
                        family: 'Mulish',
                        size: 12,
                    },
                    callback: (value: string | number) => `${value}к`,
                },
            },
            y1: {
                position: 'right',
                beginAtZero: true,
                suggestedMax: 500,
                grid: {
                    drawOnChartArea: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#FF5470',
                    font: {
                        family: 'Mulish',
                        size: 12,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E9F0',
                borderWidth: 1,
                titleColor: '#8C8C8C',
                bodyColor: '#1A1A1A',
                titleFont: {
                    family: 'Mulish',
                    size: 12,
                    weight: 500,
                },
                bodyFont: {
                    family: 'Mulish',
                    size: 14,
                    weight: 600,
                },
                padding: 12,
                displayColors: true,
                filter: (tooltipItem) => tooltipItem.dataset.label !== 'Метки',
                callbacks: {
                    label: (context) => `${context.dataset.label} — ${context.parsed.y}`,
                },
            },
        },
        elements: {
            line: {
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
            },
        },
    }), [handleActivityChartClick, handleActivityChartHover]);

    const visibilityChartData = useMemo<ChartData<'line'>>(() => {
        const values = [0.7, 1, 1.2, 1.5, 1, 1, 1.5];
        return {
            labels: ['12 окт', '13 окт', '14 окт', '15 окт', '16 окт', '17 окт', '18 окт'],
            datasets: [
                {
                    data: values,
                    fill: false,
                    borderColor: '#14B885',
                    borderWidth: 3,
                    tension: 0.45,
                    cubicInterpolationMode: 'monotone',
                    pointBackgroundColor: '#14B885',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: (context: ScriptableContext<'line'>) => context.dataIndex === highlightPointIndex ? 6 : 0,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#14B885',
                    pointHoverBorderColor: '#ffffff',
                    clip: 12,
                },
            ],
        };
    }, [highlightPointIndex]);

    const visibilityChartOptions = useMemo<ChartOptions<'line'>>(() => ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        layout: {
            padding: {
                top: 12,
                bottom: 12,
                left: 12,
                right: 12,
            },
        },
        scales: {
            x: {
                display: false,
                offset: true,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                border: {
                    display: false,
                },
            },
            y: {
                display: false,
                suggestedMin: 0,
                suggestedMax: 2,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                border: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#ffffff',
                borderColor: '#E5E9F0',
                borderWidth: 1,
                titleColor: '#8C8C8C',
                bodyColor: '#1A1A1A',
                titleFont: {
                    family: 'Mulish',
                    size: 12,
                    weight: 500,
                },
                bodyFont: {
                    family: 'Mulish',
                    size: 14,
                    weight: 600,
                },
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: (context) => `${context.parsed.y.toFixed(2)} %`,
                },
            },
        },
        elements: {
            line: {
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
            },
        },
    }), []);
    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header
                        // @ts-ignore
                        title={
                            <Breadcrumbs
                                config={[
                                    { name: 'Трекинг позиций', slug: '/position-tracking', },
                                    { name: 'Артикул 123456' },
                                ]}
                                actions={[]}
                            />
                        }
                        titlePrefix=''
                        videoReviewLink=''
                        howToLink=''
                        howToLinkText=''
                        hasShadow={false}
                        children={null}
                    />
                </div>
                {/* !header */}
                <div className={styles.page__skuBlock}>
                    <RadarProductBar data={mockSkuData} isLoading={false} />
                    <div className={styles.page__miniChart}>
                        <div className={styles.page__miniChartHeader}>
                            <p className={styles.page__miniChartTitle}>Видимость</p>
                            <div className={styles.page__miniChartValues}>
                                <span className={styles.page__miniChartMainValue}>49.51%</span>
                                <RadarRateMark value={100} units='%' />
                            </div>
                        </div>
                        <div className={styles.page__miniChartCanvas}>
                            <Line data={visibilityChartData} options={visibilityChartOptions} />
                        </div>
                    </div>
                </div>
                {/* settings block */}
                <div className={styles.page__container}>
                    <p className={styles.page__title}>Динамика</p>
                    <div className={styles.page__selectWrapper}>
                        <PlainSelect
                            selectId='brandSelect'
                            label=''
                            value={0}
                            optionsData={[{ value: 0, label: 'Органика+реклама' }, { value: 2, label: 'Проект 1' }]}
                            handler={(value: number) => {
                                //setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                        />
                        <PlainSelect
                            selectId='brandSelect'
                            label=''
                            value={1}
                            optionsData={[{ value: 1, label: 'Москва' }, { value: 2, label: 'Санкт-Петербург' }]}
                            handler={(value: number) => {
                                //setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                        />
                    </div>
                </div>
                <div className={styles.page__activityChart}>
                    <div className={styles.page__activityChartHeader}>
                        {/* <div>
                            <p className={styles.page__activityChartTitle}>Динамика ключевых метрик</p>
                            <p className={styles.page__activityChartSubtitle}>Период: 7 — 20 октября</p>
                        </div> */}
                        {/* <div className={styles.page__activityChartLegend}>
                            {[
                                { label: 'Просмотры, шт', color: '#5B3BE1' },
                                { label: 'Ключи, шт', color: '#FFB21A' },
                                { label: 'Цена, руб', color: '#FF5470' },
                            ].map((item) => (
                                <div key={item.label} className={styles.page__activityChartLegendItem}>
                                    <span className={styles.page__activityChartLegendDot} style={{ backgroundColor: item.color }} />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div> */}
                    </div>
                    <div className={styles.page__activityChartCanvas} ref={activityChartContainerRef}>
                        <Line
                            data={activityChartData}
                            options={activityChartOptions}
                        />
                        {markTooltip && (
                            <div
                                className={styles.page__markTooltip}
                                style={{ left: `${markTooltip.x}px`, top: `${markTooltip.y - 56}px` }}
                            >
                                <p className={styles.page__markTooltipTitle}>{markTooltip.label}</p>
                                <button
                                    type='button'
                                    className={styles.page__markTooltipButton}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleDeleteMark(markTooltip.id);
                                    }}
                                >
                                    Удалить метку
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.page__tableWrapper}>
                    <ConfigProvider theme={segmentedTheme}>
                        <Segmented options={['Кластеры', 'По запросам']} size='large' value={tableType} onChange={(value) => setTableType(value as 'Кластеры' | 'По запросам')} />
                    </ConfigProvider>
                    <div className={styles.page__summary}>
                        <p className={styles.page__summaryItem}>Найдено ключей: <span>65</span></p>
                        <p className={styles.page__summaryItem}>Кластеров: <span>15</span></p>
                    </div>

                    <div className={styles.page__tableContainer}>
                        <RadarTable
                            config={positionTrackingSkuTableConfig}
                            preset='radar-table-default'
                            dataSource={positionTrackingSkuMockTableData}
                            paginationContainerStyle={{ display: 'none' }}
                            customCellRender={{
                                idx: [],
                                renderer: positionTrackingSkuTableCustomCellRender as any
                            }}
                        />
                    </div>
                </div>

                {/* add mark modal */}
                <Modal
                    open={isAddModalVisible}
                    onCancel={closeMarkModal}
                    onClose={closeMarkModal}
                    onOk={closeMarkModal}
                    footer={null}
                    centered
                    width={600}
                >
                    <div className={styles.addModal}>
                        <p className={styles.addModal__title}>Новая метка</p>
                        <Input
                            size='large'
                            className={styles.modal__input}
                            placeholder='Введите название'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={modalCancelButtonTheme}>
                                <Button variant='outlined' onClick={closeMarkModal}>Отмена</Button>
                            </ConfigProvider>
                            <ConfigProvider theme={modalPrimaryButtonTheme}>
                                <Button type='primary' onClick={handleCreateMark} disabled={!inputValue.trim()}>Добавить</Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Modal>
            </section>
            {/* ---------------------- */}
        </main>
    );
};

export default PositionTrackingSkuPage;