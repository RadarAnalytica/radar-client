// Полные названия месяцев для тултипа
export const MONTH_NAMES_FULL = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

// Сокращенные названия месяцев для оси X
export const MONTH_NAMES_SHORT = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
];

export const getArrayStep = (max) => {
    let expectStep = Math.ceil(max / 6);
    let range = 0;

    while (expectStep > 20) {
        expectStep = Math.ceil(expectStep / 10);
        range++;
    }

    if (expectStep > 15 && 20 >= expectStep) {
        return 20 * 10 ** range;
    } else if (15 >= expectStep && expectStep > 10) {
        return 15 * 10 ** range;
    } else if (expectStep > 0) {
        return Math.ceil(expectStep) * 10 ** range;
    } else {
        return 1;
    }
};

export const getMaxValue = (chartData) => {
    const sortedValuesArray = chartData?.datasets
        ?.map((arr) => arr?.data)
        .flat(1)
        ?.sort((a, b) => b - a);
    const maxValue = sortedValuesArray && sortedValuesArray.length ? sortedValuesArray[0] : 0;
    return maxValue;
};

export const getMaxAmount = (chartData) => {
    const bAxisDatasets = chartData?.datasets?.filter((item) => item?.yAxisID === 'B');
    const maxAmount = bAxisDatasets
        ?.map((arr) => arr?.data)
        ?.flat(1)
        ?.sort((a, b) => b - a)[0];
    return maxAmount;
};

export const getMaxRoi = (chartData) => {
    const cAxisDatasets = chartData?.datasets?.filter((item) => item?.yAxisID === 'C');
    const maxRoi = cAxisDatasets
        ?.map((arr) => arr?.data)
        ?.flat(1)
        ?.sort((a, b) => b - a)[0];
    return maxRoi || 0;
};

export const getPastDays = (number, selectedRange, useShortMonth = false) => {
    const today = selectedRange.to ? new Date(selectedRange.to) : new Date();
    const pastDays = [];
    const monthNames = useShortMonth ? MONTH_NAMES_SHORT : MONTH_NAMES_FULL;

    for (let i = 0; i < number; i++) {
        const pastDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const day = pastDate.getDate().toString().padStart(2, '');
        const month = monthNames[pastDate.getMonth()];

        pastDays.push(`${day} ${month}`);
    }

    return pastDays;
};

// Функция для преобразования сокращенной даты в полную для тултипа
export const convertShortDateToFull = (shortDate) => {
    let fullDate = shortDate;
    MONTH_NAMES_SHORT.forEach((shortMonth, index) => {
        fullDate = fullDate.replace(shortMonth, MONTH_NAMES_FULL[index]);
    });
    return fullDate;
};


export const getChartData = (dataDashBoard, selectedRange, controlsState) => {
    const countDays = dataDashBoard?.orderCountList?.length;
    return {
        labels: getPastDays(countDays, selectedRange, true).reverse(), // true = использовать сокращенные названия
        datasets: [
            controlsState.isOrderAmountActive
                ? {
                    label: 'Заказы',
                    type: 'line',
                    backgroundColor: '#5329FF',
                    borderWidth: 2,
                    pointRadius: 5,
                    hoverRadius: 8,
                    pointBorderColor: 'white',
                    borderColor: '#5329FF',
                    tension: 0.4,
                    yAxisID: 'A',
                    data: dataDashBoard?.orderAmountList || [],
                    xAxisID: 'x',
                }
                : {
                    label: 'Заказы',
                    type: 'line',
                    backgroundColor: '#5329FF',
                    borderWidth: 2,
                    pointRadius: 6,
                    hoverRadius: 8,
                    pointBorderColor: 'white',
                    borderColor: '#5329FF',
                    tension: 0.4,
                    yAxisID: 'A',
                    data: [],
                },
            controlsState.isSalesAmountActive
                ? {
                    label: 'Продажи',
                    type: 'line',
                    backgroundColor: '#AA5BFF',
                    borderWidth: 2,
                    pointRadius: 5,
                    hoverRadius: 8,
                    pointBorderColor: 'white',
                    borderColor: '#AA5BFF',
                    tension: 0.4,
                    yAxisID: 'A',
                    data: dataDashBoard?.saleAmountList || [],
                }
                : {
                    label: 'Продажи',
                    type: 'line',
                    backgroundColor: '#AA5BFF',
                    borderWidth: 2,
                    pointRadius: 6,
                    hoverRadius: 8,
                    pointBorderColor: 'white',
                    borderColor: '#88E473',
                    tension: 0.4,
                    yAxisID: 'A',
                    data: [],
                },
            controlsState.isOrderQuantityActive
                ? {
                    label: 'Заказы',
                    type: 'line',
                    borderColor: '#F0AD00',
                    // borderColor: 'red',
                    yAxisID: 'B',
                    tension: 0.4,
                    pointBorderColor: 'white',
                    backgroundColor: '#F0AD00',
                    pointRadius: 5,
                    hoverRadius: 8,
                    borderWidth: 2,
                    data: dataDashBoard?.orderCountList || [],
                }
                : {
                    label: 'Заказы',
                    type: 'line',
                    borderColor: '#F0AD00',
                    yAxisID: 'B',
                    tension: 0.4,
                    pointBorderColor: 'white',
                    backgroundColor: '#F0AD00',
                    pointRadius: 6,
                    hoverRadius: 8,
                    borderWidth: 2,
                    data: [],
                },
            controlsState.isSalesQuantityActive
                ? {
                    label: 'Продажи',
                    type: 'line',
                    borderColor: '#88E473',
                    yAxisID: 'B',
                    tension: 0.4,
                    pointBorderColor: 'white',
                    backgroundColor: '#88E473',
                    pointRadius: 5,
                    hoverRadius: 8,
                    borderWidth: 2,
                    data: dataDashBoard?.saleCountList || [],
                }
                : {
                    label: 'Продажи',
                    type: 'line',
                    borderColor: '#88E473',
                    yAxisID: 'B',
                    tension: 0.4,
                    pointBorderColor: 'white',
                    backgroundColor: '#88E473',
                    pointRadius: 5,
                    hoverRadius: 8,
                    borderWidth: 2,
                    data: [],
                },
                controlsState.isRoiActive
                ? {
                    label: 'ROI',
                    type: 'line',
                    borderColor: '#0099FF',
                    yAxisID: 'C', // Отдельная ось для ROI
                    tension: 0.4,
                    pointBorderColor: 'white',
                    backgroundColor: '#0099FF',
                    pointRadius: 5,
                    hoverRadius: 8,
                    borderWidth: 2,
                    data: dataDashBoard?.marginalityRoiChart?.map(_ => _.roi) || [],
                }
                : {
                    label: 'ROI',
                    type: 'line',
                    borderColor: '#0099FF',
                    yAxisID: 'C', // Отдельная ось для ROI
                    tension: 0.4,
                    pointBorderColor: 'white',
                    backgroundColor: '#0099FF',
                    pointRadius: 4,
                    hoverRadius: 8,
                    borderWidth: 2,
                    data: [],
                },
                controlsState.isMarginalityActive
                ? {
                    label: 'Маржинальность',
                    type: 'line',
                    borderColor: '#F9813C',
                    yAxisID: 'C', // Латинская буква C для скрытой оси
                    tension: 0.4,
                    pointBorderColor: 'white',
                    backgroundColor: '#F9813C',
                    pointRadius: 5,
                    hoverRadius: 8,
                    borderWidth: 2,
                    data: dataDashBoard?.marginalityRoiChart?.map(_ => _.marginality) || [],
                }
                : {
                    label: 'Маржинальность',
                    type: 'line',
                    borderColor: '#F9813C',
                    yAxisID: 'C', // Латинская буква C для скрытой оси
                    tension: 0.4,
                    pointBorderColor: 'white',
                    backgroundColor: '#F9813C',
                    pointRadius: 4,
                    hoverRadius: 8,
                    borderWidth: 2,
                    data: [],
                },
        ],
    };

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
            const fullDateTitle = convertShortDateToFull(title);
            innerHtml +=
                '<tr><th style="color: silver; font-weight: 400;">' +
                fullDateTitle?.split(',').join(' ') +
                '</th></tr>';
        });
        innerHtml += '</thead><tbody>';
        datasets?.forEach(function (set, i) {
            const targetColor = set.borderColor || set.backgroundColor || 'rgba(240, 173, 0, 1)';
            // Определяем единицы измерения в зависимости от типа данных
            let targetDescr;
            if (set?.label === 'Roi' || set?.label === 'Маржинальность') {
                targetDescr = ' %';
            } else {
                targetDescr = set.yAxisID === 'B' ? ' шт' : ' руб';
            }
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
            innerHtml += '<tr><td>' + span + '</td></tr>';
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
    const tooltipWidth = tooltipEl.offsetWidth;
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
    tooltipEl.style.minWidth = '200px'; // Фиксированная минимальная ширина
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


export const getChartOptions = (chartData, days) => {
    const tickColor = '#6B7280'; // Цвет для меток на осях
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0,
        },
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
                external: (context) => {getChartTooltip(context, chartData);}
            },
            verticalDashedLine: { enabled: true }
        },
        elements: {
            line: {
                tension: 0.5,
            },
        },
        scales: {
            A: {
                id: 'A',
                type: 'linear',
                position: 'right',
                suggestedMax: getMaxValue(chartData),
                min: 0,
                grid: {
                    drawOnChartArea: true,
                    tickLength: 0,
                },
                border: {
                    // color: 'white',
                },
                ticks: {
                    stepSize: getArrayStep(getMaxValue(chartData)),
                    color: '#F0AD00',
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    tickMarkLength: 0,
                    // tickColor: 'transparent',
                },
                major: {
                    enabled: false,
                },
                minor: {
                    enabled: false,
                },
            },
            B: {
                id: 'B',
                type: 'linear',
                position: 'left',
                min: 0,
                suggestedMax: getMaxAmount(chartData),
                grid: {
                    drawOnChartArea: true,
                    tickLength: 0,
                },
                border: {
                    // color: 'white',
                },
                ticks: {
                    stepSize: getArrayStep(getMaxAmount(chartData)),
                    color: '#5329FF',
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    tickMarkLength: 0,
                    tickColor: 'transparent',
                },
                major: {
                    enabled: false,
                },
                minor: {
                    enabled: false,
                },
            },
            C: {
                id: 'C',
                type: 'linear',
                position: 'left',
                min: 0,
                suggestedMax: getMaxRoi(chartData),
                display: false, // Скрываем ось ROI с графика
                grid: {
                    drawOnChartArea: false,
                    display: false,
                },
                ticks: {
                    display: false,
                    stepSize: getArrayStep(getMaxRoi(chartData)),
                },
            },
            x: {
                grid: {
                    drawOnChartArea: true,
                    // display: false,
                },
                ticks: {
                    // display: false,
                    autoSkip: true,
                    maxTicksLimit: days === 90 ? Math.ceil(92 / 13) : 30,
                },
            },
        },
    };

    return chartOptions;
};
