import React, { useState, useEffect } from "react"
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import moment from "moment";


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


const TableMiniChart = ({ data }) => {

    const [normilizedChartData, setNormilizedChartData] = useState()

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
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient.addColorStop(0, '#5329FF');
                            gradient.addColorStop(1, '#5329FF80');
                            return gradient;
                        },
                    }
                ]
            }
            setNormilizedChartData(normilizedData)
        }
    }, [data])

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
    }


    return (
        <div style={{width: 'auto', margin: '0 auto'}}>
            {normilizedChartData &&
            <Chart
                type='bar'
                data={{ ...normilizedChartData }}
                width={100}
                height={40}
                options={chartOptions}
            />}
        </div>
    )
}

export default TableMiniChart;