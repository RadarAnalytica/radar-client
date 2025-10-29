import moment from "moment";
import { verticalDashedLinePlugin } from "../../../../service/utils";

export const chartCompareConfigObject = [
    { engName: 'revenue', ruName: 'Выручка', color: '#5329FF', isControlTooltip: false, hasUnits: true, units: '₽', isOnChart: true, isAnnotation: false, isControl: true, defaultActive: true },
    { engName: 'orders', ruName: 'Заказы', color: '#F0AD00', isControlTooltip: false, hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, defaultActive: true },
    { engName: 'quantity', ruName: 'Товарные остатки', color: '#F93C94', isControlTooltip: false, hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, defaultActive: true },
    { engName: 'avg_price', ruName: 'Средняя цена', color: '#1BC5D1', isControlTooltip: false, hasUnits: true, units: '₽', isOnChart: true, isAnnotation: false, isControl: true, defaultActive: false },
    { engName: 'requests_count', ruName: 'Всего запросов', color: '#FFDC89', isControlTooltip: false, controlTooltipText: 'text', hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, defaultActive: true },
    { engName: 'avg_place', ruName: 'Средняя позиция', color: '#C7D61E', isControlTooltip: false, controlTooltipText: 'text', hasUnits: false, isOnChart: true, isAnnotation: false, isControl: true, defaultActive: true },
    { engName: 'total_shows', ruName: 'Всего показов', color: '#F9813C', isControlTooltip: false, controlTooltipText: 'text', hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, defaultActive: false },
    { engName: 'avg_frequency', ruName: 'Среднедневная частотность', color: '#00AF4F', isControlTooltip: false, controlTooltipText: 'text', hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, defaultActive: false },
    //{ engName: 'ad_booster', ruName: 'Реклама бустер', color: '#D54AFF', isControlTooltip: false, controlTooltipText: 'text', hasUnits: false, isOnChart: true, isAnnotation: false, isControl: true, defaultActive: false },
    //{ engName: 'ad_search', ruName: 'Реклама в поиске', color: '#F93C65', isControlTooltip: false, controlTooltipText: 'text', hasUnits: false, isOnChart: true, isAnnotation: false, isControl: true, defaultActive: false },
    //{ engName: 'wb_id_frequency', ruName: 'Частотность артикула', color: '#F9A43C', isControlTooltip: false, hasUnits: false, isOnChart: true, isAnnotation: false, isControl: true, defaultActive: false },
    { engName: 'promotions', ruName: 'Акции', color: '#FF0000', isControlTooltip: false, controlTooltipText: 'text', hasUnits: false, isOnChart: false, isAnnotation: true, isControl: true, defaultActive: true },
    { engName: 'seasonality', ruName: 'Сезоны продаж', color: '#88E473', isControlTooltip: false, hasUnits: false, isOnChart: false, isAnnotation: false, isControl: true, defaultActive: true },
];

export const annotationColorsConfig = [
    { bgColor: '#FEEBF4', lableColor: '#F93C94' },
    { bgColor: '#E8F9FA', lableColor: '#1BC5D1' },
    { bgColor: '#FEF6EB', lableColor: '#F9A43C' },
    { bgColor: '#FEEBF0', lableColor: '#F93C65' },
    { bgColor: '#FBEDFF', lableColor: '#D54AFF' },
    { bgColor: '#E5F7ED', lableColor: '#00AF4F' },
    { bgColor: '#FEEBF4', lableColor: '#F93C94' },
    { bgColor: '#E8F9FA', lableColor: '#1BC5D1' },
    { bgColor: '#FEF6EB', lableColor: '#F9A43C' },
    { bgColor: '#FEEBF0', lableColor: '#F93C65' },
    { bgColor: '#FBEDFF', lableColor: '#D54AFF' },
    { bgColor: '#E5F7ED', lableColor: '#00AF4F' },
    { bgColor: '#FEEBF4', lableColor: '#F93C94' },
    { bgColor: '#E8F9FA', lableColor: '#1BC5D1' },
    { bgColor: '#FEF6EB', lableColor: '#F9A43C' },
    { bgColor: '#FEEBF0', lableColor: '#F93C65' },
    { bgColor: '#FBEDFF', lableColor: '#D54AFF' },
    { bgColor: '#E5F7ED', lableColor: '#00AF4F' },
    { bgColor: '#FEEBF4', lableColor: '#F93C94' },
    { bgColor: '#E8F9FA', lableColor: '#1BC5D1' },
    { bgColor: '#FEF6EB', lableColor: '#F9A43C' },
    { bgColor: '#FEEBF0', lableColor: '#F93C65' },
    { bgColor: '#FBEDFF', lableColor: '#D54AFF' },
    { bgColor: '#E5F7ED', lableColor: '#00AF4F' },
    { bgColor: '#FEEBF4', lableColor: '#F93C94' },
    { bgColor: '#E8F9FA', lableColor: '#1BC5D1' },
    { bgColor: '#FEF6EB', lableColor: '#F9A43C' },
    { bgColor: '#FEEBF0', lableColor: '#F93C65' },
    { bgColor: '#FBEDFF', lableColor: '#D54AFF' },
    { bgColor: '#E5F7ED', lableColor: '#00AF4F' },
];

const getAnnotations = (initData) => {
    // отфильтровываем даты без распродажи
    const filteredData = initData.filter(_ => _.item !== '');
    const normilizedData = [];
    // нормализуем отфиьтрованные данные в формат [{name: 'action_name', dates: []}, ...]
    filteredData.forEach(i => {
        const index = normilizedData.findIndex(_ => _.name === i.item);
        if (index === -1) {
            normilizedData.push({
                name: i.item,
                dates: [i.date]
            });
        } else {
            normilizedData[index].dates.push(i.date);
        }
    });

    // сортируем даты для каждого элемента нормализованного массива и создаем обьект аннотаций
    let annotations = {};
    normilizedData.forEach((i, id) => {
        i.dates.sort((a, b) => moment(a) > moment(b) ? 1 : -1);
        const color = id <= annotationColorsConfig.length - 1 ? annotationColorsConfig[id] : annotationColorsConfig[id - (Math.floor(id / annotationColorsConfig.length - 1) * (annotationColorsConfig.length - 1))];
        annotations[`annotation_${id}`] = {
            drawTime: 'beforeDatasetsDraw',
            type: 'box',
            xMin: moment(i.dates[0]).format('DD.MM.YY'),
            xMax: moment(i.dates[i.dates.length - 1]).format('DD.MM.YY'),
            backgroundColor: `${color?.bgColor || annotationColorsConfig[0]?.bgColor}95`,
            borderWidth: 0,
            label: {
                content: `${i.name.substring(0, 1)}${i.name.substring(1).toLowerCase()}`,
                display: true,  // Убедитесь, что display установлен в true
                position: 'start',
                yAdjust: 15,
                xAdjust: 5,
                color: color.lableColor || annotationColorsConfig[0].lableColor,  // Цвет текста
                font: {
                    size: 14,
                    weight: 'normal',
                    family: 'Mulish'
                },
                padding: 4
            }
        };
    });

    return annotations;
};

const getSeason = (seasonsData) => {
    let normilizedArr = [];
    seasonsData.forEach((i, id) => {
        if (id === 0 && i.item === 0) return;
        if (id !== 0 && i.item === 0) return;
        if (id === 0 && i.item === 1) {
            normilizedArr.push([i.date]);
            return;
        }
        if (id !== 0 && i.item === 1) {
            if (i.item === seasonsData[id - 1].item && normilizedArr.length > 0) {
                normilizedArr[normilizedArr.length - 1].push(i.date);
                return;
            }
            if (i.item === seasonsData[id - 1].item && normilizedArr.length === 0) {
                normilizedArr.push([i.date]);
                return;
            }
            if (i.item !== seasonsData[id - 1]) {
                normilizedArr.push([i.date]);
                return;
            }
        }

    });
    if (normilizedArr.length === 0) return {};
    normilizedArr.forEach(i => i.sort((a, b) => moment(a) > moment(b) ? 1 : -1));
    let seasonObject = {};
    normilizedArr.forEach((i, id) => {
        seasonObject[`season_${id}`] = {
            drawTime: 'beforeDraw',
            type: 'box',
            xMin: moment(i[0]).format('DD.MM.YY'),
            xMax: moment(i[i.length - 1]).format('DD.MM.YY'),
            backgroundColor: '#88E47350',
            borderWidth: 0,
        };
    });


    return seasonObject;
};

export const getChartTooltip = (context, chartData) => {
    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip');

    // Create element on first render
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        // Добавляем класс для базовых стилей
        tooltipEl.classList.add('custom-tooltip');
        document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = '0';
        tooltipEl.style.visibility = 'hidden';
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
        return bodyItem.lines;
    }

    // Set Text
    if (tooltipModel.body) {
        let datasets = chartData?.datasets
            ?.filter((obj) => obj.data?.length > 0)
            ?.reverse();
        const datalabels = chartData?.labels;
        const targetInex = datalabels?.indexOf(tooltipModel.title[0]);

        const titleLines = tooltipModel.title || [];
        const bodyLines = tooltipModel.body.map(getBody);

        let innerHtml = '<thead>';

        titleLines.forEach(function (title) {
            innerHtml +=
                '<tr><th style="color: silver; font-weight: 400;">' +
                title?.split(',').join(' ') +
                '</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        // here
        datasets?.forEach(function (set, i) {
            const targetColor = set.backgroundColor;
            const units = chartCompareConfigObject.find(_ => _.ruName === set.label).units;
            const targetDescr = units ? units : '';
            let value = set?.data[targetInex] || '0';
            let style = '';
            style += '; border-width: 2px';
            const span =
                '<span style="font-size: 12px; line-height: 0.5vw; border-radius: 2px; background-color: ' +
                targetColor +
                ';">&nbsp;&nbsp;&nbsp;&nbsp;</span> <span style="' +
                style +
                '">' +
                set?.label +
                ', ' +
                targetDescr +
                ':  <span style="font-weight: bold;">' +
                value +
                '</span></span>';
            innerHtml += '<tr style={{ width: 100%}}><td style={{ width: 100%}}>' + span + '</td></tr>';
        });
        innerHtml += '</tbody>';

        let tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }

    const position = context.chart.canvas.getBoundingClientRect();

    // Calculate initial position
    let tooltipLeft = position.left + tooltipModel.caretX;
    let tooltipTop = position.top + tooltipModel.caretY;

    // Get tooltip dimensions
    tooltipEl.style.display = 'block'; // Нужно для правильного расчета размеров
    const tooltipWidth = tooltipEl.offsetWidth + 300;
    const tooltipHeight = tooltipEl.offsetHeight;

    // Получаем размеры viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Добавляем отступ от краев экрана
    const margin = 10;

    // Корректировка по горизонтали
    if (tooltipLeft + tooltipWidth + margin > viewportWidth) {
        tooltipLeft = viewportWidth - tooltipWidth - margin;
    } else if (tooltipLeft - margin < 0) {
        tooltipLeft = margin;
    }

    // Корректировка по вертикали
    if (tooltipTop + tooltipHeight + margin > viewportHeight) {
        tooltipTop = viewportHeight - tooltipHeight - margin;
    } else if (tooltipTop - margin < 0) {
        tooltipTop = margin;
    }

    // Добавляем скролл страницы к позиции
    tooltipLeft += window.scrollX;
    tooltipTop += window.scrollY;

    // Apply styles
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = Math.round(tooltipLeft) + 'px';
    tooltipEl.style.top = Math.round(tooltipTop) + 'px';
    tooltipEl.style.minWidth = '350px'; // Фиксированная минимальная ширина
    tooltipEl.style.maxWidth = '300px'; // Максимальная ширина
    tooltipEl.style.opacity = '1';
    tooltipEl.style.visibility = 'visible';
    tooltipEl.style.transition = 'all 0.2s ease';
    tooltipEl.style.backgroundColor = 'white';
    tooltipEl.style.borderRadius = '8px';
    tooltipEl.style.boxShadow = '0px 0px 20px 0px #00000014;';
    tooltipEl.style.padding = '1rem';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.zIndex = '1000';
};

export const mainChartOptionsGenerator = (chartData, anotationField, seasonsField, normilizedChartData) => {

    const annotationData = chartData[anotationField.engName];
    const seasonsData = chartData[seasonsField.engName];
    let annotationObject = anotationField.isActive && getAnnotations(annotationData);
    if (anotationField.isActive) {
        annotationObject = {
            ...annotationObject,
            ...getAnnotations(annotationData)
        };
    }
    if (seasonsField.isActive) {
        annotationObject = {
            ...annotationObject,
            ...getSeason(seasonsData)
        };
    }

    const opt = {
        afterDraw: function (chart) {
          console.log(chart);
          if (chart.tooltip?._active && chart.tooltip._active.length) {
            const ctx = chart.ctx;
            ctx.save();
            const activePoint = chart.tooltip._active[0];
            ctx.beginPath();
            ctx.setLineDash([6, 6]);
            ctx.moveTo(activePoint.element.x, chart.chartArea.top);
            ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#8B8B8B';
            ctx.stroke();
            ctx.restore();
          }
        }
      };


    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                intersect: false,
                mode: 'index',
                axis: 'x',
                callbacks: {},
                external: (context) => { getChartTooltip(context, normilizedChartData); }
            },
            annotation: {
                annotations: { ...annotationObject }
            },
            verticalDashedLine: { enabled: true }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'right',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    drawOnChartArea: false,
                },
            },
        }
    };

    return chartOptions;
};
