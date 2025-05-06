import React, { useEffect, useState } from 'react';
import styles from './rowChart.module.css'
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Filler,
    BarController,
    PointElement,
    BarElement,
    LineController,
    LineElement,
    [Tooltip]
);

const RowChart = ({ product, data }) => {

    const [chartData, setChartData] = useState(null)
    const [chartWidth, setChartWidth] = useState(null)

    useEffect(() => {
        if (data && product) {
            const chartNormilizedData = {
                labels: [ 'По умолчанию' , ...data.map(i => moment(i.date).format('DD.MM.YY'))],
                datasets: [
                    {
                        label: '1',
                        type: 'line',
                        data: [product.self_cost, ...data.map(i => i.self_cost)],
                        borderColor: '#00B69B',
                        pointBorderColor: 'white',
                        backgroundColor: '#00B69B',
                        pointRadius: 0,
                        hoverRadius: 8,
                        borderWidth: 2,
                        yAxisID: 'y',
                    },
                    {
                        label: '2',
                        type: 'line',
                        data: [product.fullfillment, ...data.map(i => i.fullfillment)],
                        borderColor: '#F93C65',
                        pointBorderColor: 'white',
                        backgroundColor: '#F93C65',
                        pointRadius: 0,
                        hoverRadius: 8,
                        borderWidth: 2,
                        yAxisID: 'y',
                    }
                ]
            }
            setChartData({...chartNormilizedData })
            setChartWidth(data.length * 160)
        }


    }, [data, product])

    const chartOptions = {
        resposive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            // tooltip: {
            //     enabled: false,
            //     intersect: false,
            //     mode: 'index',
            //     axis: 'x',
            //     callbacks: {},
            //     //external: (context) => {getChartTooltip(context, chartData)}
            // },
        },
        scales: {
            x: {
                display: true,
                ticks: {
                    display: false,
                },
                border: {
                    display: false
                },
                grid: {
                    drawOnChartArea: true,
                    drawTicks: false,
                },
            },
            y: {
                type: 'linear',
                display: false,
                position: 'left',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    }

    return (
        <>
            {chartData && chartWidth &&
            // Фиксируем ширину графика относительно колиества элементов
                <div className={styles.chart} style={{ minWidth: chartWidth, maxWidth: chartWidth }}>
                    <Chart
                        type='line'
                        data={{...chartData}}
                        options={chartOptions}
                    />
                </div>
            }
        </>
    )
}

export default RowChart;