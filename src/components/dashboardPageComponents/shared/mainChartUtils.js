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
}

export const getMaxAmount = (chartData) => {
    const bar = chartData?.datasets?.filter((item) => item?.type === 'bar');
    const maxAmount = bar
        ?.map((arr) => arr?.data)
        ?.flat(1)
        ?.sort((a, b) => b - a)[0];
    return maxAmount;
}

export const getPastDays = (number, selectedRange) => {
    const today = !!selectedRange.to ? new Date(selectedRange.to) : new Date();
    const pastDays = [];

    for (let i = 0; i < number; i++) {
        const pastDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const day = pastDate.getDate().toString().padStart(2, '0');
        const monthNames = [
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
        const month = monthNames[pastDate.getMonth()];

        pastDays.push(`${day} ${month}`);
    }

    return pastDays;
}


export const getChartData = (dataDashBoard, selectedRange, controlsState) => {
    const countDays = dataDashBoard?.orderCountList?.length;
    return {
        labels: getPastDays(countDays, selectedRange).reverse(),
        datasets: [
            controlsState.isOrderAmountActive
                ? {
                    label: 'Заказы',
                    borderRadius: 8,
                    type: 'line',
                    backgroundColor: 'rgba(255, 219, 126, 1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBorderColor: 'white',
                    borderColor: 'rgba(255, 219, 126, 1)',
                    hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                    yAxisID: 'A',
                    data: dataDashBoard?.orderAmountList || [],
                    xAxisID: 'x-1',
                }
                : {
                    label: 'Заказы',
                    borderRadius: 8,
                    type: 'line',
                    backgroundColor: 'rgba(255, 219, 126, 1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBorderColor: 'white',
                    borderColor: 'rgba(255, 219, 126, 1)',
                    hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                    yAxisID: 'A',
                    data: [],
                },
            controlsState.isSalesAmountActive
                ? {
                    label: 'Продажи',
                    borderRadius: 8,
                    type: 'line',
                    backgroundColor: 'rgba(154, 129, 255, 1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBorderColor: 'white',
                    borderColor: 'rgba(154, 129, 255, 1)',
                    hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
                    yAxisID: 'A',
                    data: dataDashBoard?.saleAmountList || [],
                }
                : {
                    label: 'Продажи',
                    borderRadius: 8,
                    type: 'line',
                    backgroundColor: 'rgba(154, 129, 255, 1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBorderColor: 'white',
                    borderColor: 'rgba(154, 129, 255, 1)',
                    hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
                    yAxisID: 'A',
                    data: [],
                },
            controlsState.isOrderQuantityActive
                ? {
                    label: 'Заказы',
                    borderRadius: 8,
                    type: 'bar',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(240, 173, 0, 1)');
                        gradient.addColorStop(0.5, 'rgba(240, 173, 0, 0.9)');
                        gradient.addColorStop(1, 'rgba(240, 173, 0, 0.5)');
                        return gradient;
                    },
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                    yAxisID: 'B',
                    data: dataDashBoard?.orderCountList || [],
                }
                : {
                    label: 'Заказы',
                    borderRadius: 8,
                    type: 'bar',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(240, 173, 0, 1)');
                        gradient.addColorStop(0.5, 'rgba(240, 173, 0, 0.9)');
                        gradient.addColorStop(1, 'rgba(240, 173, 0, 0.5)');
                        return gradient;
                    },
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                    yAxisID: 'B',
                    data: [],
                },
            controlsState.isSalesQuantityActive
                ? {
                    label: 'Продажи',
                    borderRadius: 8,
                    type: 'bar',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                        gradient.addColorStop(0, 'rgba(83, 41, 255, 1)');
                        gradient.addColorStop(0.5, 'rgba(83, 41, 255, 0.9)');
                        gradient.addColorStop(1, 'rgba(83, 41, 255, 0.5)');
                        return gradient;
                    },
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
                    yAxisID: 'B',
                    data: dataDashBoard?.saleCountList || [],
                }
                : {
                    label: 'Продажи',
                    borderRadius: 8,
                    type: 'bar',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                        gradient.addColorStop(0, 'rgba(83, 41, 255, 1)');
                        gradient.addColorStop(0.5, 'rgba(83, 41, 255, 0.9)');
                        gradient.addColorStop(1, 'rgba(83, 41, 255, 0.5)');
                        return gradient;
                    },
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
                    yAxisID: 'B',
                    data: [],
                },
        ],
    };

}


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
        datasets?.forEach(function (set, i) {
            const colors = [
                'rgba(240, 173, 0, 1)',
                'rgba(83, 41, 255, 1)',
            ];
            const targetColor =
                set.label === 'Заказы' ? colors[0] : colors[1];
            const targetDescr = set.type === 'bar' ? ' шт' : ' руб';
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
    tooltipEl.style.boxShadow = '0 0 20px rgba(19,19, 19, 0.7)';
    tooltipEl.style.padding = '1rem';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.zIndex = '1000';
}



export const getChartOptions = (chartData, days) => {
    const chartOptions = {
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
                external: (context) => {getChartTooltip(context, chartData)}
            }
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
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                ticks: {
                    stepSize: getArrayStep(getMaxValue(chartData)),
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
                },
                ticks: {
                    stepSize: getArrayStep(getMaxAmount(chartData)),
                },
            },
            x: {
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    display: false,
                    autoSkip: true,
                    maxTicksLimit: days === 90 ? Math.ceil(92 / 13) : 30,
                },
            },
        },
    }

    return chartOptions;
}