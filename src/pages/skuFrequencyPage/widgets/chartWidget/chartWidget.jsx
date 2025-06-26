import { useEffect, useState } from 'react';
import styles from './chartWidget.module.css'
import { Chart } from 'react-chartjs-2';
import { ServiceFunctions } from '../../../../service/serviceFunctions';
import { chartDataNormalizer } from '../../shared';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import { verticalDashedLinePlugin } from '../../../../service/utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Filler,
    BarController,
    PointElement,
    BarElement,
    LineController,
    LineElement,
    [Tooltip],
    verticalDashedLinePlugin
);

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
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

        // here
        datasets?.forEach(function (set, i) {
            const targetColor = set.backgroundColor;
            //const units = chartCompareConfigObject.find(_ => _.ruName === set.label).units
            const units = ''
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
                '' +
                targetDescr +
                '<span style="font-weight: bold;">' +
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
    tooltipEl.style.backgroundColor = 'white !important';
    tooltipEl.style.borderRadius = '8px';
    tooltipEl.style.boxShadow = '0px 0px 20px 0px #00000014;';
    tooltipEl.style.padding = '1rem';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.zIndex = '1000';
}

const ChartWidget = ({ chartTabsState, currentQuery }) => {

    const [chartData, setChartData] = useState();
    console.log(chartData)
    const [requestStatus, setRequestStatus] = useState(initRequestStatus);

    useEffect(() => {
        !requestStatus.isLoading && ServiceFunctions.getMonitoringChartData(chartTabsState, currentQuery, setChartData, setRequestStatus, chartDataNormalizer)
    }, [currentQuery, chartTabsState])


    if (requestStatus.isLoading) {
        return (
            <div className={styles.widget__loaderWrapper}>
                <span className='loader'></span>
            </div>
        )
    }

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
                external: (context) => chartData && getChartTooltip(context, chartData)
            },
            verticalDashedLine: { enabled: true }
        },
        scales: {
            x: {
                display: true,
                grid: {
                    drawOnChartArea: false,
                },
            },
        }
    }

    return chartData && (
        <section className={styles.widget}>
            <Chart
                type='line'
                data={chartData}
                width={100}
                height={40}
                options={{...chartOptions, tooltip: { ...chartOptions.tooltip,  external: (context) => chartData && getChartTooltip(context, chartData)}}}
            />
        </section>
    )
}

export default ChartWidget