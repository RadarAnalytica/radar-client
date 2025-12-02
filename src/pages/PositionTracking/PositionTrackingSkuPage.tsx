import { useCallback, useMemo, useRef, useState, useEffect, useContext, memo } from 'react';
import { createRoot } from 'react-dom/client';
import Header from '@/components/sharedComponents/header/header';
import styles from './PositionTrackingSkuPage.module.css';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
// import { MainChart } from '@/features';
import { Table as RadarTable } from 'radar-ui';
import { Segmented, ConfigProvider, Button, Modal, Input, Checkbox } from 'antd';
import { positionTrackingSkuTableConfig as initTableConfig, RadarLoader } from '@/shared';
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
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useParams } from 'react-router-dom';
import AuthContext from '@/service/AuthContext';
import { formatPrice } from '@/service/utils';
import { verticalDashedLinePlugin } from '@/service/utils';
import { useNavigate } from 'react-router-dom';
import { PositionTrackingSkuFilters } from '@/widgets';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, verticalDashedLinePlugin);


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
        fontSize: 12,
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
const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Mulish',
        fontSize: 12,
        fontWeight: 500,
        controlHeightLG: 38,
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            hoverBg: 'white',
            activeShadow: 'transparent',
            activeBg: 'white',
        }
    }
}

interface ProductMeta {
    id: number
    wb_id: number;
    name: string;
    wb_id_image_url: string;
    created_at: string;
    marks: Mark[];
}

interface PresetDay {
    date: string;
    place: number;
    shows: number;
    place_compare: number;
    shows_compare: number;
}

interface QueryData {
    query: string;
    frequency: number;
    total_goods: number;
    days: PresetDay[];
}

interface Preset {
    query: string;
    frequency: number;
    total_goods: number;
    days: PresetDay[];
    queries_data: QueryData[];
}

interface PositionTrackingChartData {
    date: string;
    price: number;
    queries: number;
    shows: number;
    visibility: number;
    visibility_compare: number;
}

interface PositionTrackingSkuPageData {
    product_meta: ProductMeta;
    presets: Preset[];
    dates: string[];
    charts: PositionTrackingChartData[];
    total_queries: number;
    total_presets: number;
    visibility: number;
    visibility_compare: number;
}

interface Mark {
    product_id: number;
    date: string;
    name: string;
    id: number;
}

const initRequestStatus = {
    isLoading: false,
    isError: false,
    message: '',
};

const getSkuPageDataRequestObject = (sku: string) => {
    return {
        wb_id: sku,
        place_from: null,
        place_to: null,
        freq_from: null,
        freq_to: null,
        keywords: null, // string[]
    }
}

const formatDateHeader = (dateString: string): string => {
    const date = new Date(dateString);
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayName}, ${day}.${month < 10 ? '0' + month : month}`;
};

const formatDateShort = (dateInput: string) => {
    const date = new Date(dateInput);
    const day = date.getDate();
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    return `${day} ${months[date.getMonth()]}`;
};

const formatDateLong = (dateInput: string): string => {
    const date = new Date(dateInput);
    const day = date.getDate();
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const year = date.getFullYear();
    return `${day} ${months[date.getMonth()]}, ${year}`;
};

const getTableConfig = (skuData: PositionTrackingSkuPageData, tableType: 'Кластеры' | 'По запросам') => {

    if (tableType === 'Кластеры') {
        const datesArray = [];
        skuData.presets.forEach((preset) => {
            preset.days.forEach((day) => {
                if (!datesArray.includes(day.date)) {
                    datesArray.push(day.date);
                }
            })
        });
        const templateObject = {
            width: 100,
            minWidth: 100,
            maxWidth: 200,
        }
        const tableConfig = [...initTableConfig, ...datesArray.map((date) => ({ ...templateObject, key: date, title: formatDateHeader(date), dataIndex: date }))]
        return tableConfig;
    }
    if (tableType === 'По запросам') {
        const normaliazedData = skuData.presets.flatMap((preset) => preset.queries_data);
        const datesArray = [];
        normaliazedData.forEach((item) => {
            item.days.forEach((day) => {
                if (!datesArray.includes(day.date)) {
                    datesArray.push(day.date);
                }
            })
        });
        const templateObject = {
            width: 100,
            minWidth: 100,
            maxWidth: 200,
        }
        const tableConfig = [...initTableConfig, ...datesArray.map((date) => ({ ...templateObject, key: date, title: formatDateHeader(date), dataIndex: date }))]
        return tableConfig;
    }
}
const getTableData = (skuData: PositionTrackingSkuPageData, tableType: 'Кластеры' | 'По запросам') => {
    if (tableType === 'Кластеры') {
        return skuData.presets.map(preset => {
            let updatedPreset = {
                ...preset,
                isParent: true,
                children: preset.queries_data.map(query => {
                    let updatedQuery = { ...query, isChild: true };
                    query.days.forEach(day => {
                        updatedQuery[day.date] = day;
                    });
                    return updatedQuery;
                })
            };
            preset.days.forEach(day => {
                updatedPreset[day.date] = day;
            });
            return updatedPreset;
        });
    }
    if (tableType === 'По запросам') {
        return skuData.presets.flatMap((preset) => preset.queries_data).map(query => {
            let updatedQuery = { ...query };
            query.days.forEach(day => {
                updatedQuery[day.date] = day;
            });
            return updatedQuery;
        });
    }
}

const PositionTrackingSkuPage = () => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [tableType, setTableType] = useState<'Кластеры' | 'По запросам'>('Кластеры');
    const [marks, setMarks] = useState<Mark[]>([]);
    const [pendingMarkIndex, setPendingMarkIndex] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [markTooltip, setMarkTooltip] = useState<{ id: string; label: string; x: number; y: number } | null>(null);
    const highlightPointIndex = null;
    const activityChartContainerRef = useRef<HTMLDivElement>(null);
    const [skuData, setSkuData] = useState<PositionTrackingSkuPageData | null>(null);
    const [tableData, setTableData] = useState<Record<string, any>[]>([]);
    const [requestStatus, setRequestStatus] = useState<typeof initRequestStatus>(initRequestStatus);
    const [tableConfig, setTableConfig] = useState<Record<string, any>[]>(initTableConfig);
    const [regionsList, setRegionsList] = useState<Record<string, any>[]>([]);
    const [isEditDeleteMarkModalVisible, setIsEditDeleteMarkModalVisible] = useState(false);
    const [editDeleteMarkId, setEditDeleteMarkId] = useState<number | null>(null);
    const [requestObject, setRequestObject] = useState<{ wb_id: string, place_from?: number | null, place_to?: number | null, freq_from?: number | null, freq_to?: number | null, keywords?: string[], feed_type?: 'both' | 'ad' | 'organic' | null } | null>(null);
    const [controlsState, setControlsState] = useState({
        isShowsActive: true,
        isQueriesActive: true,
        isPriceActive: true,
    });


    const controlsCheckboxHandler = (e) => {
        setControlsState({
            ...controlsState,
            [e.target.value]: e.target.checked
        });
    };

    const { sku } = useParams();

    const getSkuPageData = useCallback(async (token: string, requestObject: any) => {
        setRequestStatus(prev => prev.isLoading ? prev : { ...initRequestStatus, isLoading: true });
        try {
            const res = await ServiceFunctions.getPositionTrackingSkuPageData(token, requestObject);
            if (!res.ok) {
                console.error('getSkuPageData error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить данные для SKU' });
                return;
            }
            const data: PositionTrackingSkuPageData = await res.json();
            setSkuData(data);
            // Устанавливаем метки из данных сервера
            if (data.product_meta?.marks) {
                setMarks(data.product_meta.marks);
            }
            setTableConfig(getTableConfig(data, tableType));
            setRequestStatus(initRequestStatus);
        }
        catch (error) {
            console.error('getSkuPageData error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить данные для SKU' });
            return;
        }
    }, [tableType]);
    const deleteProductFromPositionTrackingProject = useCallback(async (token: string, productId: string) => {
        setRequestStatus(prev => prev.isLoading ? prev : { ...initRequestStatus, isLoading: true });
        try {
            const res = await ServiceFunctions.deleteProductFromPositionTrackingProject(token, productId);
            if (!res.ok) {
                console.error('deleteProductFromPositionTrackingProject error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось удалить продукт из проекта' });
                return;
            }
            setRequestStatus(initRequestStatus);
            return true;
        }
        catch (error) {
            console.error('deleteProductFromPositionTrackingProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось удалить продукт из проекта' });
            return;
        }
    }, []);

    const createMark = useCallback(async (token: string, requestObject: any) => {
        setRequestStatus(prev => prev.isLoading ? prev : { ...initRequestStatus, isLoading: true });
        try {
            const res = await ServiceFunctions.createPositionTrackingChartMark(token, requestObject);
            if (!res.ok) {
                console.error('createMark error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось создать метку' });
                return;
            }
            const data: Mark = await res.json();
            setRequestStatus(initRequestStatus);
            setMarks((prev) => [...prev, data]);
        }
        catch (error) {
            console.error('createMark error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось создать метку' });
            return;
        }
    }, []);

    const deleteMark = useCallback(async (token: string, markId: number) => {
        // Сохраняем предыдущее состояние для возможного отката
        let previousMarks: Mark[] = [];
        setMarks((prev) => {
            previousMarks = [...prev];
            // Оптимистичное обновление: сразу удаляем метку из UI
            return prev.filter((mark) => mark.id !== markId);
        });

        setRequestStatus(prev => prev.isLoading ? prev : { ...initRequestStatus, isLoading: true });

        try {
            const res = await ServiceFunctions.deletePositionTrackingChartMark(token, markId);
            if (!res.ok) {
                console.error('deleteMark error:');
                // Откатываем изменения при ошибке
                setMarks(previousMarks);
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось удалить метку' });
                return;
            }
            setRequestStatus(initRequestStatus);
            // Убеждаемся, что метка удалена (используем markId, а не data.id)
            setMarks((prev) => prev.filter((mark) => mark.id !== markId));
        }
        catch (error) {
            console.error('deleteMark error:', error);
            // Откатываем изменения при ошибке
            setMarks(previousMarks);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось удалить метку' });
            return;
        }
    }, []);

    const updateMark = useCallback(async (token: string, requestObject: any) => {
        setRequestStatus(prev => prev.isLoading ? prev : { ...initRequestStatus, isLoading: true });
        try {
            const res = await ServiceFunctions.updatePositionTrackingChartMark(token, requestObject);
            if (!res.ok) {
                console.error('updateMark error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось обновить метку' });
                return;
            }
            const data: Mark = await res.json();
            setRequestStatus(initRequestStatus);
            setMarks((prev) => prev.map((mark) => mark.id === data.id ? data : mark));
        }
        catch (error) {
            console.error('updateMark error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось обновить метку' });
            return;
        }
    }, []);

    const getRegionsList = useCallback(async (token: string) => {
        setRequestStatus(prev => prev.isLoading ? prev : { ...initRequestStatus, isLoading: true });
        try {
            const res = await ServiceFunctions.getSERPFiltersData(token);
            setRequestStatus(initRequestStatus);
            setRegionsList(res);
        }
        catch (error) {
            console.error('getRegionsList error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список регионов' });
            return;
        }
    }, []);


    const closeMarkModal = useCallback(() => {
        setIsAddModalVisible(false);
        setIsEditDeleteMarkModalVisible(false);
        setPendingMarkIndex(null);
        setEditDeleteMarkId(null);
        setInputValue('');
    }, []);

    const handleCreateMark = useCallback((name: string) => {
        if (pendingMarkIndex === null) {
            return;
        }
        const trimmed = name.trim();
        if (!trimmed) {
            return;
        }
        createMark(authToken, {
            product_id: skuData?.product_meta?.id,
            date: skuData?.dates[pendingMarkIndex],
            name: trimmed,
        });
        closeMarkModal();
    }, [closeMarkModal, inputValue, pendingMarkIndex, authToken, createMark, skuData]);

    const handleEditMark = useCallback((name: string) => {
        if (editDeleteMarkId === null) {
            return;
        }
        const trimmed = name.trim();
        if (!trimmed) {
            return;
        }
        updateMark(authToken, {
            id: editDeleteMarkId,
            name: trimmed,
        });
        closeMarkModal();
    }, [closeMarkModal, inputValue, editDeleteMarkId, authToken, updateMark]);

    const handleDeleteMarkFromModal = useCallback(() => {
        if (editDeleteMarkId === null) {
            return;
        }
        deleteMark(authToken, editDeleteMarkId);
        closeMarkModal();
    }, [closeMarkModal, editDeleteMarkId, authToken, deleteMark]);

    const handleActivityChartClick = useCallback((chart: ChartJS, elements: ActiveElement[]) => {
        if (elements.length === 0) {
            return;
        }
        const first = elements[0];
        const dataset = chart.data.datasets[first.datasetIndex];
        if (dataset?.label === 'Метка') {
            return;
        }

        const dateIndex = first.index;
        const date = skuData?.dates[dateIndex];
        if (!date) {
            return;
        }

        // Проверяем, есть ли метка для этой даты
        const mark = marks.find((item) => item.date === date);

        if (mark) {
            // Если метка есть - открываем модалку редактирования
            setEditDeleteMarkId(mark.id);
            setInputValue(mark.name);
            setIsEditDeleteMarkModalVisible(true);
        } else {
            // Если метки нет - открываем модалку создания
            setPendingMarkIndex(dateIndex);
            setInputValue('');
            setIsAddModalVisible(true);
        }
        setMarkTooltip(null);
    }, [skuData, marks]);

    const handleActivityChartHover = useCallback((chart: ChartJS, elements: ActiveElement[]) => {
        if (!elements || elements.length === 0) {
            setMarkTooltip(null);
            return;
        }

        const first = elements[0];
        const dataset = chart.data.datasets[first.datasetIndex];
        if (dataset?.label !== 'Метка') {
            setMarkTooltip(null);
            return;
        }

        // Получаем дату по индексу и ищем метку по дате
        const dateIndex = first.index;
        const date = skuData?.dates[dateIndex];
        if (!date) {
            setMarkTooltip(null);
            return;
        }

        const mark = marks.find((item) => item.date === date);
        if (!mark) {
            setMarkTooltip(null);
            return;
        }

        const x = first.element.x as number;
        const y = first.element.y as number;
        const canvasRect = chart.canvas.getBoundingClientRect();
        const containerRect = activityChartContainerRef.current?.getBoundingClientRect();
        setMarkTooltip({
            id: mark.id.toString(),
            label: mark.name,
            x: x + canvasRect.left - (containerRect?.left ?? canvasRect.left),
            y: y + canvasRect.top - (containerRect?.top ?? canvasRect.top),
        });
    }, [marks, skuData]);

    const getActivityChartTooltip = useCallback((context: any) => {
        // Tooltip Element
        let tooltipEl = document.getElementById('position-tracking-tooltip');

        // Create element on first render
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'position-tracking-tooltip';
            tooltipEl.innerHTML = '<table></table>';
            document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0';
            tooltipEl.style.visibility = 'hidden';
            return;
        }

        // Set Text
        if (tooltipModel.body) {
            const titleLines = tooltipModel.title || [];
            const bodyLines = tooltipModel.body.map((b: any) => b.lines);

            let innerHtml = '<thead>';
            titleLines.forEach((title: string) => {
                innerHtml += '<tr><th style="color: #8C8C8C; font-weight: 500; font-size: 12px; font-family: Mulish; padding-bottom: 8px;">' + title + '</th></tr>';
            });
            innerHtml += '</thead><tbody>';

            // Обрабатываем каждый элемент tooltip
            tooltipModel.dataPoints.forEach((item: any, index: number) => {
                const dataset = context.chart.data.datasets[item.datasetIndex];
                const label = dataset.label;
                const value = item.parsed.y;

                // Определяем цвет и форму иконки
                let iconColor = '#5329FF';
                let iconStyle = '';
                let labelText = '';

                if (label === 'Просмотры, шт') {
                    iconColor = '#9A81FF';
                    iconStyle = 'width: 12px; height: 3px; border-radius: 0;'; // Прямоугольник высотой 3px
                    labelText = `${label} — ${value}`;
                } else if (label === 'Ключи, шт') {
                    iconColor = '#FFDB7E';
                    iconStyle = 'width: 12px; height: 12px; border-radius: 0;'; // Квадрат
                    labelText = `${label} — ${value}`;
                } else if (label === 'Цена, руб') {
                    iconColor = '#FF8D8D';
                    iconStyle = 'width: 12px; height: 12px; border-radius: 0;'; // Квадрат
                    labelText = `${label} — ${value}`;
                } else if (label === 'Метка') {
                    iconColor = '#5329FF';
                    iconStyle = 'width: 12px; height: 12px; border-radius: 50%;'; // Круг
                    const dateIndex = item.dataIndex;
                    const date = skuData?.dates[dateIndex];
                    if (date) {
                        const mark = marks.find((m: Mark) => m.date === date);
                        if (mark) {
                            labelText = `Метка — ${mark.name}`;
                        } else {
                            labelText = '';
                        }
                    } else {
                        labelText = '';
                    }
                }

                // Добавляем отступ перед меткой, если есть элементы перед ней, которые не являются метками
                if (label === 'Метка' && index > 0) {
                    const hasNonMarkItemsBefore = tooltipModel.dataPoints.slice(0, index).some((prevItem: any) => {
                        const prevDataset = context.chart.data.datasets[prevItem.datasetIndex];
                        return prevDataset.label !== 'Метка';
                    });
                    if (hasNonMarkItemsBefore) {
                        innerHtml += '<tr><td style="height: 8px;"></td></tr>'; // Отступ
                    }
                }

                if (labelText) {
                    const span = `<span style="display: inline-block; ${iconStyle} background-color: ${iconColor}; margin-right: 8px; vertical-align: middle;"></span><span style="color: #1A1A1A; font-size: 14px; font-weight: 600; font-family: Mulish;">${labelText}</span>`;
                    innerHtml += '<tr><td style="padding: 2px 0;">' + span + '</td></tr>';
                }
            });

            // Добавляем текст "Кликните чтобы добавить метку" внизу, если метки нет
            const hasMark = tooltipModel.dataPoints.some((item: any) => {
                const dataset = context.chart.data.datasets[item.datasetIndex];
                if (dataset.label === 'Метка') {
                    const dateIndex = item.dataIndex;
                    const date = skuData?.dates[dateIndex];
                    if (date) {
                        const mark = marks.find((m: Mark) => m.date === date);
                        return !!mark;
                    }
                }
                return false;
            });

            if (!hasMark) {
                innerHtml += '<tr><td style="height: 8px;"></td></tr>'; // Отступ
                innerHtml += '<tr><td style="color: #8C8C8C; font-size: 12px; font-family: Mulish; padding-top: 4px;">Кликните чтобы добавить метку</td></tr>';
            }

            innerHtml += '</tbody>';

            let tableRoot = tooltipEl.querySelector('table');
            if (tableRoot) {
                tableRoot.innerHTML = innerHtml;
            }
        }

        const position = context.chart.canvas.getBoundingClientRect();
        let tooltipLeft = position.left + tooltipModel.caretX;
        let tooltipTop = position.top + tooltipModel.caretY;

        tooltipEl.style.display = 'block';
        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipHeight = tooltipEl.offsetHeight;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const margin = 10;

        if (tooltipLeft + tooltipWidth + margin > viewportWidth) {
            tooltipLeft = viewportWidth - tooltipWidth - margin;
        } else if (tooltipLeft - margin < 0) {
            tooltipLeft = margin;
        }

        if (tooltipTop + tooltipHeight + margin > viewportHeight) {
            tooltipTop = viewportHeight - tooltipHeight - margin;
        } else if (tooltipTop - margin < 0) {
            tooltipTop = margin;
        }

        tooltipLeft += window.scrollX;
        tooltipTop += window.scrollY;

        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = Math.round(tooltipLeft) + 'px';
        tooltipEl.style.top = Math.round(tooltipTop) + 'px';
        tooltipEl.style.opacity = '1';
        tooltipEl.style.visibility = 'visible';
        tooltipEl.style.backgroundColor = '#FFFFFF';
        tooltipEl.style.borderColor = '#E5E9F0';
        tooltipEl.style.borderWidth = '1px';
        tooltipEl.style.borderStyle = 'solid';
        tooltipEl.style.borderRadius = '8px';
        tooltipEl.style.padding = '12px';
        tooltipEl.style.boxShadow = '0px 0px 20px 0px #00000014';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.zIndex = '1000';
        tooltipEl.style.fontFamily = 'Mulish';
    }, [skuData, marks]);

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
            (event.native.target as HTMLElement).style.cursor = 'pointer';
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
                border: {
                    color: 'white',
                },
            },
            y: {
                position: 'left',
                beginAtZero: true,
                suggestedMax: 400,
                // offset: true,
                grid: {
                    color: 'rgba(83, 41, 255, 0.08)',
                    drawBorder: false,
                    tickLength: 0,
                },
                ticks: {
                    tickLength: 0,
                    padding: 12,
                    color: '#5B3BE1',
                    font: {
                        family: 'Mulish',
                        size: 12,
                    },
                    callback: (value: string | number) => `${value}к`,
                },
                border: {
                    color: 'white',
                },
            },
            y1: {
                position: 'right',
                beginAtZero: true,
                suggestedMax: 500,
                // offset: true,
                grid: {
                    drawOnChartArea: false,
                    drawBorder: false,
                    tickLength: 0,
                },
                ticks: {
                    tickLength: 0,
                    padding: 12,
                    color: '#FF5470',
                    font: {
                        family: 'Mulish',
                        size: 12,
                    },
                },
                border: {
                    color: 'white',
                },
            },
            y2: {
                position: 'left',
                beginAtZero: true,
                suggestedMax: 50,
                // offset: true,
                grid: {
                    drawOnChartArea: false,
                    drawBorder: false,
                    tickLength: 0,
                },
                ticks: {
                    tickLength: 0,
                    padding: 12,
                    color: '#FFDB7E',
                    font: {
                        family: 'Mulish',
                        size: 12,
                    },
                },
                border: {
                    color: 'white',
                },
            },
            y3: {
                display: false,
                beginAtZero: true,
                max: 1,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false,
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
            // verticalDashedLine: { enabled: true },
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

                enabled: false, // Отключаем стандартный tooltip
                external: getActivityChartTooltip, // Используем кастомный external tooltip
            },
        },
        elements: {
            line: {
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
            },
        },
    }), [handleActivityChartClick, handleActivityChartHover, getActivityChartTooltip]);

    const activityChartData = useMemo(() => {
        if (!skuData) return null;
        // Создаем мапу меток по датам для быстрого поиска
        const marksByDate = new Map(marks.map((mark) => [mark.date, mark]));
        const markData = skuData.dates.map((date) => (marksByDate.has(date) ? 0.97 : null));
        return {
            labels: skuData.dates.map((date) => formatDateShort(date)),
            datasets: [
                {
                    label: 'Просмотры, шт',
                    data: controlsState.isShowsActive ? skuData.charts.map((chart) => chart.shows) : [],
                    yAxisID: 'y',
                    borderColor: '#9A81FF',
                    backgroundColor: 'rgba(83, 41, 255, 0.08)',
                    fill: {
                        target: 'origin',
                        above: 'rgba(245, 242, 255, 0.3)',
                        below: 'transparent',
                    },
                    pointBackgroundColor: '#9A81FF',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 3,
                    tension: 0.45,
                    cubicInterpolationMode: 'monotone' as const,
                    borderWidth: 1.5,
                    clip: 16,
                },
                {
                    label: 'Ключи, шт',
                    data: controlsState.isQueriesActive ? skuData.charts.map((chart) => chart.queries) : [],
                    yAxisID: 'y2',
                    borderColor: '#FFDB7E',
                    pointBackgroundColor: '#FFDB7E',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 3,
                    tension: 0.45,
                    cubicInterpolationMode: 'monotone' as const,
                    borderWidth: 1.5,
                    fill: false,
                },
                {
                    label: 'Цена, руб',
                    data: controlsState.isPriceActive ? skuData.charts.map((chart) => chart.price) : [],
                    yAxisID: 'y1',
                    borderColor: '#FF8D8D',
                    pointBackgroundColor: '#FF8D8D',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 3,
                    tension: 0.45,
                    cubicInterpolationMode: 'monotone' as const,
                    borderWidth: 1.5,
                    fill: false,
                },
                {
                    label: 'Метка',
                    data: markData,
                    yAxisID: 'y3',
                    showLine: false,
                    pointBackgroundColor: '#5329FF',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointHitRadius: 12,
                    pointStyle: 'circle',
                    order: -1,
                },
            ],
        };
    }, [skuData, controlsState, marks]);


    const getVisibilityChartTooltip = useCallback((context: any) => {
        // Tooltip Element
        let tooltipEl = document.getElementById('visibility-chart-tooltip');

        // Create element on first render
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'visibility-chart-tooltip';
            document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0';
            tooltipEl.style.visibility = 'hidden';
            return;
        }

        // Set Text
        if (tooltipModel.body) {
            const titleLines = tooltipModel.title || [];
            const dataIndex = tooltipModel.dataPoints[0]?.dataIndex;
            const visibility = tooltipModel.dataPoints[0]?.parsed.y;
            const visibilityCompare = skuData?.charts[dataIndex]?.visibility_compare;

            // Clear previous content
            tooltipEl.innerHTML = '';

            // Create container for React components
            const titleContainer = document.createElement('div');
            const valuesRow = document.createElement('div');
            const valueContainer = document.createElement('span');
            const compareContainer = document.createElement('span');

            // Title
            titleLines.forEach((title: string) => {
                const titleDiv = document.createElement('div');
                titleDiv.style.cssText = 'color: #8C8C8C; font-weight: 500; font-size: 12px; font-family: Mulish; padding-bottom: 8px;';
                titleDiv.textContent = title;
                titleContainer.appendChild(titleDiv);
            });

            // Values row container
            valuesRow.style.cssText = 'display: flex; align-items: center; gap: 8px; flex-wrap: wrap;';

            // Main value
            const visibilityFormatted = formatPrice(visibility.toFixed(2), '%', false);
            valueContainer.style.cssText = 'color: #1A1A1A; font-size: 14px; font-weight: 600; font-family: Mulish;';
            valueContainer.textContent = visibilityFormatted;
            valuesRow.appendChild(valueContainer);

            // Compare value with RadarRateMark component
            if (visibilityCompare !== undefined && visibilityCompare !== null) {
                const diff = visibility - visibilityCompare;
                const root = createRoot(compareContainer);
                root.render(<RadarRateMark value={Math.round(diff)} units='%' />);
                valuesRow.appendChild(compareContainer);
            }

            tooltipEl.appendChild(titleContainer);
            tooltipEl.appendChild(valuesRow);
        }

        const position = context.chart.canvas.getBoundingClientRect();
        let tooltipLeft = position.left + tooltipModel.caretX;
        let tooltipTop = position.top + tooltipModel.caretY;

        tooltipEl.style.display = 'block';
        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipHeight = tooltipEl.offsetHeight;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const margin = 10;

        if (tooltipLeft + tooltipWidth + margin > viewportWidth) {
            tooltipLeft = viewportWidth - tooltipWidth - margin;
        } else if (tooltipLeft - margin < 0) {
            tooltipLeft = margin;
        }

        if (tooltipTop + tooltipHeight + margin > viewportHeight) {
            tooltipTop = viewportHeight - tooltipHeight - margin;
        } else if (tooltipTop - margin < 0) {
            tooltipTop = margin;
        }

        tooltipLeft += window.scrollX;
        tooltipTop += window.scrollY;

        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = Math.round(tooltipLeft) + 'px';
        tooltipEl.style.top = Math.round(tooltipTop) + 'px';
        tooltipEl.style.opacity = '1';
        tooltipEl.style.visibility = 'visible';
        tooltipEl.style.backgroundColor = '#FFFFFF';
        tooltipEl.style.borderColor = '#E5E9F0';
        tooltipEl.style.borderWidth = '1px';
        tooltipEl.style.borderStyle = 'solid';
        tooltipEl.style.borderRadius = '8px';
        tooltipEl.style.padding = '12px';
        tooltipEl.style.boxShadow = '0px 0px 20px 0px #00000014';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.zIndex = '1000';
        tooltipEl.style.fontFamily = 'Mulish';
    }, [skuData]);

    const getVisibilityChartData = useCallback((skuData: PositionTrackingSkuPageData): ChartData<'line'> => {
        const values = skuData?.charts.map((chart) => chart.visibility);
        const labels = skuData?.dates.map((date) => formatDateShort(date));
        return {
            labels,
            datasets: [
                {
                    data: values,
                    fill: false,
                    borderColor: '#14B885',
                    borderWidth: 1.5,
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
    }, [skuData]);

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
                enabled: false,
                external: getVisibilityChartTooltip,
            },
        },
        elements: {
            line: {
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
            },
        },
    }), [skuData, getVisibilityChartTooltip]);

   

    useEffect(() => {
        if (sku) {
            setRequestObject({ wb_id: sku, feed_type: 'both' });
        } else {
            navigate('/position-tracking');
        }
    }, [sku])
    useEffect(() => {
        if (requestObject && authToken) {
            getSkuPageData(authToken, requestObject);
        }
    }, [requestObject, authToken])

    useEffect(() => {
        if (skuData) {
            setTableConfig(getTableConfig(skuData, tableType));
            setTableData(getTableData(skuData, tableType));
        }
    }, [skuData, tableType]);

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
                                    { name: `Артикул ${sku}` },
                                ]}
                                actions={[{
                                    type: 'delete',
                                    action: async () => {
                                        if (!skuData) return;
                                        const currentProductId = skuData.product_meta.id
                                        const res = await deleteProductFromPositionTrackingProject(authToken, currentProductId.toString());
                                        if (res) {
                                            navigate('/position-tracking');
                                        }
                                    }
                                }]}
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
                {/* meta */}
                <div className={styles.page__skuBlock}>
                    <RadarProductBar
                        data={{
                            ...skuData?.product_meta,
                            wb_id_image_link: skuData?.product_meta?.wb_id_image_url,
                            wb_id: skuData?.product_meta?.wb_id?.toString(),
                        }}
                        isLoading={requestStatus.isLoading}
                        additionalInfo={skuData?.product_meta?.created_at ? `Отслеживаем с ${formatDateLong(skuData.product_meta.created_at)}` : ''}
                        hasWbLink
                    />
                    {requestStatus.isLoading && <RadarLoader loaderStyle={{ height: '130px', width: '100%', background: 'white', borderRadius: '16px' }} />}
                    {!requestStatus.isLoading && <div className={styles.page__miniChart}>
                        <div className={styles.page__miniChartHeader}>
                            <p className={styles.page__miniChartTitle}>Видимость</p>
                            <div className={styles.page__miniChartValues}>
                                {skuData?.visibility && <span className={styles.page__miniChartMainValue}>{formatPrice(skuData?.visibility?.toString(), '%')}</span>}
                                {skuData?.visibility_compare && <RadarRateMark value={skuData?.visibility_compare.toString()} units='%' />}
                            </div>
                        </div>
                        <div className={styles.page__miniChartCanvas}>
                            <Line data={getVisibilityChartData(skuData)} options={visibilityChartOptions} />
                        </div>
                    </div>}
                </div>
                {/* settings block */}
                <div className={styles.page__container}>
                    <p className={styles.page__title}>Динамика</p>
                    <div className={styles.page__selectWrapper}>
                        <PlainSelect
                            selectId='feed_type'
                            label=''
                            value={requestObject?.feed_type === 'both' ? 0 : requestObject?.feed_type === 'organic' ? 2 : 1}
                            optionsData={[{ value: 0, label: 'Органика+реклама' }, { value: 2, label: 'Органика' }, { value: 1, label: 'Реклама' }]}
                            handler={(value: number) => {
                                setRequestObject({ ...requestObject, feed_type: value === 0 ? 'both' : value === 2 ? 'organic' : 'ad' });
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                        />
                        {/* <PlainSelect
                            selectId='brandSelect'
                            label=''
                            value={1}
                            optionsData={regionsList?.map((item) => ({ value: item.dest, label: item.city_name }))}
                            handler={(value: number) => {
                                //setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                        /> */}
                    </div>
                </div>

                {/* main chart */}
                {requestStatus.isLoading && <RadarLoader loaderStyle={{ minHeight: '456px', width: '100%', background: 'white', borderRadius: '16px' }} />}
                {
                    !requestStatus.isLoading &&
                    <div className={styles.page__activityChart}>
                        <div className={styles.page__activityChartHeader}>
                            <div className={styles.controls__controlWrapper}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#9A81FF',
                                            controlInteractiveSize: 20,
                                        }
                                    }}
                                >
                                    <Checkbox
                                        //size='large'
                                        checked={controlsState.isShowsActive}
                                        value='isShowsActive'
                                        onChange={controlsCheckboxHandler}
                                    >
                                        <label className={styles.controls__label}>
                                            Просмотры, шт
                                        </label>
                                    </Checkbox>
                                </ConfigProvider>
                            </div>
                            <div className={styles.controls__controlWrapper}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#FFDB7E',
                                            controlInteractiveSize: 20,
                                        }
                                    }}
                                >
                                    <Checkbox
                                        //size='large'
                                        checked={controlsState.isQueriesActive}
                                        value='isQueriesActive'
                                        onChange={controlsCheckboxHandler}
                                    >
                                        <label className={styles.controls__label}>
                                            Ключи, шт
                                        </label>
                                    </Checkbox>
                                </ConfigProvider>
                            </div>
                            <div className={styles.controls__controlWrapper}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#FF8D8D',
                                            controlInteractiveSize: 20,
                                        }
                                    }}
                                >
                                    <Checkbox
                                        //size='large'
                                        checked={controlsState.isPriceActive}
                                        value='isPriceActive'
                                        onChange={controlsCheckboxHandler}
                                    >
                                        <label className={styles.controls__label}>
                                            Цена, руб
                                        </label>
                                    </Checkbox>
                                </ConfigProvider>
                            </div>
                        </div>
                        <div className={styles.page__activityChartCanvas} ref={activityChartContainerRef}>
                            {activityChartData && (
                                <Line
                                    data={activityChartData}
                                    options={activityChartOptions}
                                />
                            )}
                        </div>
                    </div>
                }

                <PositionTrackingSkuFilters
                    submitHandler={(formData) => {
                        setRequestObject({
                            ...requestObject,
                            ...formData,
                            keywords: formData.keywords?.split(',').map((keyword: string) => keyword.trim())
                        });
                    }}
                    loading={requestStatus.isLoading}
                />
                <PositionTrackingSkuTable
                    requestStatus={requestStatus}
                    skuData={skuData}
                />
            </section>
            {/* ---------------------- */}
            <AddMarkModal
                open={isAddModalVisible}
                onClose={closeMarkModal}
                onSubmit={(name: string) => handleCreateMark(name)}
            />
            <EditDeleteMarkModal
                open={isEditDeleteMarkModalVisible}
                onClose={closeMarkModal}
                initialInputValue={inputValue}
                onEdit={(name: string) => handleEditMark(name)}
                onDelete={handleDeleteMarkFromModal}
            />
            {/*  error modal */}
            <ErrorModal
                message={requestStatus.message}
                open={requestStatus.isError}
                onCancel={() => setRequestStatus(initRequestStatus)}
                onClose={() => setRequestStatus(initRequestStatus)}
                footer={null}
            />
        </main>
    );
};

// Table Component
interface PositionTrackingSkuTableProps {
    requestStatus: typeof initRequestStatus;
    skuData: PositionTrackingSkuPageData;
}
const PositionTrackingSkuTable = memo(({ requestStatus, skuData }: PositionTrackingSkuTableProps) => {
    const [tableType, setTableType] = useState<'Кластеры' | 'По запросам'>('Кластеры');
    const [sortState, setSortState] = useState<{ sort_field: string, sort_order: 'ASC' | 'DESC' }>({ sort_field: 'frequency', sort_order: 'DESC' });
    const [tableConfig, setTableConfig] = useState<Record<string, any>[]>(initTableConfig);
    const [paginationState, setPaginationState] = useState<{ current: number, pageSize: number, total: number }>({ current: 1, pageSize: 12, total: 0 });
    const [tableData, setTableData] = useState<any[]>([]);

    const handleTableSort = useCallback((tableData: Record<string, any>[]) => {
        const { sort_field, sort_order } = sortState;
        if (!tableData || !Array.isArray(tableData)) return [];

        const sortedData = [...tableData].sort((a, b) => {
            const freqA = a.frequency ?? 0;
            const freqB = b.frequency ?? 0;

            if (sort_order === 'ASC') {
                return freqA - freqB;
            } else {
                return freqB - freqA;
            }
        });

        return sortedData.slice((paginationState.current - 1) * paginationState.pageSize, paginationState.current * paginationState.pageSize);;

    }, [sortState, paginationState]);
    useEffect(() => {
        if (skuData) {
            const preparedData = getTableData(skuData, tableType);
            setPaginationState({ ...paginationState, current: 1, total: Math.ceil(preparedData.length / 10) });
            setTableConfig(getTableConfig(skuData, tableType));
            setTableData(preparedData);
        }
    }, [skuData, tableType]);
    return (
        <>
            {requestStatus.isLoading && <RadarLoader loaderStyle={{ minHeight: '456px', width: '100%', background: 'white', borderRadius: '16px' }} />}
            {/* table */}
            {tableData && tableConfig && tableData.length > 0 && !requestStatus.isLoading &&
                <div className={styles.page__tableWrapper}>
                    <ConfigProvider theme={segmentedTheme}>
                        <Segmented options={['Кластеры', 'По запросам']} size='large' value={tableType} onChange={(value) => setTableType(value as 'Кластеры' | 'По запросам')} />
                    </ConfigProvider>
                    <div className={styles.page__summary}>
                        <p className={styles.page__summaryItem}>Найдено ключей: <span>{skuData?.total_queries}</span></p>
                        <p className={styles.page__summaryItem}>Кластеров: <span>{skuData?.total_presets}</span></p>
                    </div>

                    <div className={styles.page__table}>
                        <div className={styles.page__tableContainer}>
                            <RadarTable
                                // @ts-ignore
                                config={tableConfig}
                                treeMode={tableType === 'Кластеры'}
                                preset='radar-table-default'
                                sorting={sortState}
                                onSort={(sort_field, sort_order) => setSortState({ sort_field, sort_order })}
                                dataSource={handleTableSort(tableData)}
                                pagination={{
                                    current: paginationState.current,
                                    pageSize: paginationState.pageSize,
                                    total: paginationState.total,
                                    showQuickJumper: true,
                                    hideOnSinglePage: true,
                                    onChange: (page, pageSize) => {
                                        setPaginationState({ ...paginationState, current: page });
                                    }
                                }}
                                paginationContainerStyle={{ display: paginationState.total > 1 ? 'block' : 'none' }}
                                stickyHeader
                                bodyCellStyle={{ height: '43px'}}
                                customCellRender={{
                                    idx: [],
                                    renderer: positionTrackingSkuTableCustomCellRender as any
                                }}
                            />
                        </div>
                    </div>
                </div>}
        </>
    );
});

PositionTrackingSkuTable.displayName = 'PositionTrackingSkuTable';

// Add Mark Modal Component
interface AddMarkModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
}

const AddMarkModal = ({ open, onClose, onSubmit }: AddMarkModalProps) => {
    const [inputValue, setInputValue] = useState('');
    return (
        <Modal
            open={open}
            onCancel={onClose}
            onClose={onClose}
            onOk={onClose}
            footer={null}
            centered
            width={600}
        >
            <div className={styles.addModal}>
                <p className={styles.addModal__title}>Новая метка</p>
                <ConfigProvider theme={inputTheme}>
                    <Input
                        size='large'
                        className={styles.modal__input}
                        placeholder='Введите название'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </ConfigProvider>

                <div className={styles.addModal__buttonsWrapper}>
                    <ConfigProvider theme={modalCancelButtonTheme}>
                        <Button variant='outlined' onClick={onClose}>Отмена</Button>
                    </ConfigProvider>
                    <ConfigProvider theme={modalPrimaryButtonTheme}>
                        <Button type='primary' onClick={() => onSubmit(inputValue)} disabled={!inputValue.trim()}>Добавить</Button>
                    </ConfigProvider>
                </div>
            </div>
        </Modal>
    );
};

// Edit/Delete Mark Modal Component
interface EditDeleteMarkModalProps {
    open: boolean;
    onClose: () => void;
    initialInputValue: string;
    onEdit: (name: string) => void;
    onDelete: () => void;
}

const EditDeleteMarkModal = ({ open, onClose, initialInputValue, onEdit, onDelete }: EditDeleteMarkModalProps) => {
    const [inputValue, setInputValue] = useState(initialInputValue);
    useEffect(() => {
        setInputValue(initialInputValue);
    }, [initialInputValue]);
    return (
        <Modal
            open={open}
            onCancel={onClose}
            onClose={onClose}
            onOk={onClose}
            footer={null}
            centered
            width={600}
        >
            <div className={styles.addModal}>
                <p className={styles.addModal__title}>Редактировать метку</p>
                <ConfigProvider theme={inputTheme}>
                    <Input
                        size='large'
                        className={styles.modal__input}
                        placeholder='Введите название'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </ConfigProvider>

                <div className={styles.addModal__buttonsWrapper}>
                    <ConfigProvider theme={deleteModalPrimaryButtonTheme}>
                        <Button type='primary' onClick={onDelete}>Удалить</Button>
                    </ConfigProvider>
                    <ConfigProvider theme={modalPrimaryButtonTheme}>
                        <Button type='primary' onClick={() => onEdit(inputValue)} disabled={!inputValue.trim()}>Сохранить</Button>
                    </ConfigProvider>
                </div>
            </div>
        </Modal>
    );
};

export default PositionTrackingSkuPage;
