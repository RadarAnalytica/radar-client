import React, { useState, useEffect } from "react";
import styles from './tableMiniChart.module.css';
import { Chart } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
//import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     Filler,
//     BarController,
//     PointElement,
//     BarElement,
//     LineController,
//     LineElement,
//     [Tooltip]
// );


const TableMiniChart = ({ data }) => {

    const [normilizedChartData, setNormilizedChartData] = useState();

    useEffect(() => {
        if (data) {
            const normilizedData = {
                labels: data.map(i => moment(i.date).format('DD.MM.YY')),
                datasets: [
                    {
                        label: 'Динамика выручки',
                        type: 'bar',
                        data: data.map(i => i.item),
                        yAxisID: 'y',
                        xAxisID: 'x',
                        tension: 0.4,
                        backgroundColor: function (context) {
                            const chart = context.chart;
                            const { ctx, chartArea } = chart;
                            if (!chartArea) return null;

                            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                            gradient.addColorStop(0.5, '#5329FF');
                            gradient.addColorStop(1, '#5329FF50');


                            // if (clickedIndex !== null && context.dataIndex !== clickedIndex) {
                            //     return 'rgba(240, 173, 0, 0.3)';
                            // }
                            return gradient;
                            //return context.dataIndex === clickedIndex ? '#F0AD00' : gradient;
                        },
                    }
                ]
            };
            setNormilizedChartData(normilizedData);
        }
    }, [data]);

    const chartOptions = {
        responsive: true,
        maxBarThickness: 10,
        maintainAspectRatio: false, // Добавьте эту строку
        //clip: {left: 0, top: 0, right: 0, bottom: 0},
        //clip: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                intersect: false,
                mode: 'index',
                axis: 'x',
                callbacks: {},
                //external: (context) => {getChartTooltip(context, chartData)}
            },
        },
        scales: {
            x: {
                display: false
            },
            y: {
                type: 'linear',
                display: false,
                position: 'right',
                // ticks: {
                //     callback: function(value, index, values) {
                //         const max = Math.max(...values);
                //         return (value / max * 100).toFixed(0) + '%';
                //     }
                // },
                //min: 0,
            },
        },
    };


    return (
        <div className={styles.miniChart__wrapper}>
            {normilizedChartData &&
                // <Chart
                //     type='bar'
                //     data={{ ...normilizedChartData }}
                //     width={100}
                //     height={40}
                //     options={chartOptions}
                // />
                <Bar
                    data={{ ...normilizedChartData }}
                    options={chartOptions}
                />
            }
        </div>
    );
};

export default TableMiniChart;
