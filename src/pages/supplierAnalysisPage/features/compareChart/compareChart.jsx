import React, { useState, useEffect } from 'react';
import styles from './compareChart.module.css'
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { verticalDashedLinePlugin } from '../../../../service/utils';
import { getChartTooltip } from '../../shared/utils/mainChartConfig';
import moment from 'moment';

ChartJS.register(
    annotationPlugin,
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


export const CompareChart = ({ data, mainSupplier, compareSupplier, isMainSupplierActive, isCompareSupplierActive, chartType, units }) => {

    const [normilizedChartData, setNormilizedChartData] = useState()


    useEffect(() => {
        if (data && chartType === 'bar') {
            const nomalizedDataObject = {
                labels: data.labels,
                datasets: compareSupplier ? [
                    {
                        label: mainSupplier?.trademark || mainSupplier?.name,
                        type: chartType,
                        data: isMainSupplierActive && data[mainSupplier?.supplier_id?.toString()],
                        borderRadius: 3,
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient.addColorStop(0, '#5329FF');
                            gradient.addColorStop(1, '#5329FF50');
                            return gradient;
                        },
                        borderColor: 'transparent',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                        yAxisID: 'A',
                    },
                    {
                        label: compareSupplier?.trademark || compareSupplier?.name,
                        type: chartType,
                        data: isCompareSupplierActive && data[compareSupplier?.supplier_id?.toString()],
                        borderRadius: 3,
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient.addColorStop(0, '#1BC5D1');
                            gradient.addColorStop(1, '#1BC5D150');
                            return gradient;
                        },
                        borderColor: 'transparent',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                        yAxisID: 'A',
                    },
                ] : [
                    {
                        label: mainSupplier?.trademark || mainSupplier?.name,
                        type: chartType,
                        data: isMainSupplierActive && data[mainSupplier?.supplier_id?.toString()],
                        borderRadius: 3,
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient.addColorStop(0, '#5329FF');
                            gradient.addColorStop(1, '#5329FF50');
                            return gradient;
                        },
                        borderColor: 'transparent',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                        yAxisID: 'A',
                    },
                ]
            }
            setNormilizedChartData({ ...nomalizedDataObject })
        }
        if (data && chartType === 'line') {
            const nomalizedDataObject = {
                labels: data.labels.map(_ => moment(_).format('DD.MM.YYYY').toString()),
                datasets: compareSupplier ? [
                    {
                        label: mainSupplier?.trademark || mainSupplier?.name,
                        type: chartType,
                        data: isMainSupplierActive && data[mainSupplier?.supplier_id?.toString()],
                        borderColor: '#5329FF',
                        yAxisID: 'A',
                        tension: 0.4,
                        pointBorderColor: 'white',
                        backgroundColor: '#5329FF',
                        pointRadius: 6,
                        hoverRadius: 8,
                        borderWidth: 2
                    },
                    {
                        label: compareSupplier?.trademark || compareSupplier?.name,
                        type: chartType,
                        data: isCompareSupplierActive && data[compareSupplier?.supplier_id?.toString()],
                        borderColor: '#1BC5D1',
                        yAxisID: 'B',
                        tension: 0.4,
                        pointBorderColor: 'white',
                        backgroundColor: '#1BC5D1',
                        pointRadius: 6,
                        hoverRadius: 8,
                        borderWidth: 2
                    },
                ] : [
                    {
                        label: mainSupplier?.trademark || mainSupplier?.name,
                        type: chartType,
                        data: isMainSupplierActive && data[mainSupplier?.supplier_id?.toString()],
                        borderColor: '#5329FF',
                        yAxisID: 'A',
                        tension: 0.4,
                        pointBorderColor: 'white',
                        backgroundColor: '#5329FF',
                        pointRadius: 6,
                        hoverRadius: 8,
                        borderWidth: 2
                    },
                ]
            }
            setNormilizedChartData({ ...nomalizedDataObject })
        }
    }, [data, isMainSupplierActive, isCompareSupplierActive, mainSupplier, compareSupplier])

    const chartOptions = {
        //responsive: true,
        //maintainAspectRatio: false,
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
                external: (context) => {getChartTooltip(context, normilizedChartData, units, false)}
            },
            verticalDashedLine: { enabled: true }
        },
        // elements: {
        //   line: {
        //     tension: 0.5,
        //   },
        // },
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        const label = this.getLabelForValue(value);
                        // Обрезаем до 10 символов, добавляем "..." если длиннее
                        return label.length > 10 ? label.slice(0, 10) + '…' : label;
                    }
                }
                // ticks: {
                //   display: false,
                //   autoSkip: true,
                //   maxTicksLimit: days === 90 ? Math.ceil(92 / 13) : 30,
                // },
            },
            A: {
                id: 'A',
                type: 'linear',
                position: 'left',
                //suggestedMax: getMaxValue(chartData),
                min: 0,
                grid: {
                    drawOnChartArea: true, // only want the grid lines for one axis to show up
                },
                ticks: {
                    //stepSize: getArrayStep(getMaxValue(chartData)),
                },
            },
            B: {
                id: 'B',
                type: 'linear',
                position: 'right',
                min: 0,
                display: compareSupplier && chartType !== 'bar' ? true : false,
                //suggestedMax: getMaxAmount(chartData),
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    //stepSize: getArrayStep(getMaxAmount(chartData)),
                },
            },
        },
    }

    // if (widgetData.isLoading) {
    //     return (
    //         <div className={styles.loaderWrapper}>
    //             <span className='loader'></span>
    //         </div>
    //     )
    // }
    // if (widgetData.isError) {
    //     return (
    //         <div className={styles.errorWrapper}>
    //             <div className={styles.errorWrapper__message}>
    //                 <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                     <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
    //                     <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
    //                 </svg>
    //                 {widgetData.message || 'Не удалось загрузить данные'}
    //             </div>
    //         </div>
    //     )
    // }



    return (
        <div className={styles.widget}>
            <div className={styles.mainChart}>
                {/* <ChartControls
                    chartControls={chartControls}
                    setChartControls={setChartControls}
                /> */}
                {normilizedChartData &&
                    <Chart
                        data={{ ...normilizedChartData }}
                        width={100}
                        height={40}
                        options={chartOptions}
                    />}
            </div>
        </div>
    )
}
