import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import roi from '../assets/roi.svg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ScheduleProfitabilityChart = () => {
    const data = {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'],
        datasets: [
            {
                label: 'ROI, %',
                data: [10, 20, -30, 10, -40, -20, -10, -40, -60, 20, -80, -140],
                borderColor: '#5329FF',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                type: 'line',
                pointBackgroundColor: '#5329FF',
                pointBorderColor: 'white',
                pointRadius: 4,
                pointBorderWidth: 1,
                yAxisID: 'left-y',
            },
            {
                label: 'Маржинальность по прибыли, % (Lower)',
                data: [-50, -40, -30, -10, -80, -20, -10, -40, -60, -20, -80, -140],
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0.3, '#F0AD0080');
                    gradient.addColorStop(1, '#F0AD00');
                    return gradient;
                },
                borderWidth: 0,
                barPercentage: 0.3,
                borderRadius: { topLeft: 3, topRight: 3, bottomLeft: 3, bottomRight: 3 },
                categoryPercentage: 1,
                yAxisID: 'right-y',
            },
            {
                label: 'Маржинальность по прибыли, % (Upper)',
                data: [50, 30, 50, 80, 70, 60, 40, 20, 10, 40, 30, 20],
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, '#F0AD00');
                    gradient.addColorStop(0.7, '#F0AD0080');

                    return gradient;
                },
                borderWidth: 0,
                barPercentage: 0.3,
                borderRadius: { topLeft: 3, topRight: 3, bottomLeft: 3, bottomRight: 3 },
                categoryPercentage: 1,
                yAxisID: 'right-y',
            }


        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderRadius: 8,
                padding: 16,
                titleColor: '#8C8C8C',
                bodyColor: '#1A1A1A',
                callbacks: {
                    title: function (tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        const fullMonthNames = [
                            'Январь', 'Февраль', 'Март', 'Апрель',
                            'Май', 'Июнь', 'Июль', 'Август',
                            'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                        ];
                        return fullMonthNames[index];
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#8C8C8C',
                    callback: function (value, index) {
                        return data.labels[index];
                    }
                }
            },
            'left-y': {
                min: -140,
                max: 80,
                stacked: true,
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    lineWidth: (context) => {
                        const tickValue = context.tick.value;
                        const specificValues = [60, 20, -20, -60, -100, -140];
                        return specificValues.includes(tickValue) ? 1 : 0;
                    }
                },
                ticks: {
                    stepSize: 20,
                    color: '#8C8C8C',
                }
            },
            'right-y': {
                position: 'right',
                min: -140,
                max: 80,
                stacked: true,
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    lineWidth: (context) => {
                        const tickValue = context.tick.value;
                        const specificValues = [60, 20, -20, -60, -100, -140];
                        return specificValues.includes(tickValue) ? 1 : 0;
                    }
                },
                ticks: {
                    stepSize: 20,
                    color: '#8C8C8C',
                },
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
    };

    return (
        <div className="chart-container" style={{ marginLeft: "8px", minWidth: "620px" }}>
            <div className='chart-container-header-prof'>
                <div>
                    <div className='chart-title'>Рентабельность и маржинальность</div>
                </div>
            </div>
            <div className='chart-header-wrapper-prof'>
                <div className='chart-container-colors-wrapper'>
                    <div className='roundedChartColor'></div>
                    <div>Маржинальность по прибыли, %</div>
                </div>
                <div className='chart-container-colors-wrapper'>
                    <div style={{ marginRight: '5px' }}><img src={roi} /></div>
                    <div>ROI, %</div>
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ScheduleProfitabilityChart;