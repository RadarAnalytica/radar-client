import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';



ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ScheduleBigChart = () => {
    const data = {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'],
        datasets: [
            {
                label: 'Выручка, ₽',
                data: [2000000, 4500000, 5000000, 2500000, 3200000, 1000000, 2700000, 2400000, 1500000, 0, 1500000, 2500000],
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0.5, '#F0AD00');
                    gradient.addColorStop(1, '#F0AD0080');
                    return gradient;
                },

                borderWidth: 0,
                barPercentage: 0.9,
                borderRadius: 3,

            },
            {
                label: 'Чистая прибыль, ₽',
                data: [2100000, 2100000, 2500000, 1800000, 1300000, 500000, 2300000, 1600000, 5000000, -500000, 1000000, 1500000],
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, '#5329FF');
                    gradient.addColorStop(1, '#5329FF80');
                    return gradient;
                },

                borderWidth: 0,
                barPercentage: 0.9,
                borderRadius: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderRadius: 8,
                padding: 16,
                titleColor: '#8C8C8C',
                bodyColor: "#1A1A1A",
                callbacks: {
                    title: function (tooltipItems) {

                        const index = tooltipItems[0].dataIndex;
                        const fullMonthNames = ['Январь 2024', 'Февраль 2024', 'Март 2024', 'Апрель 2024', 'Май 2024', 'Июнь 2024', 'Июль 2024', 'Август 2024', 'Сентябрь 2024', 'Октябрь 2024', 'Ноябрь 2024', 'Декабрь 2024'];
                        return fullMonthNames[index];
                    },
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label} ${" "} ${tooltipItem.raw.toLocaleString()}`;
                    },
                    labelColor: function (tooltipItem) {

                        if (tooltipItem.dataset.label === 'Выручка, ₽') {
                            return {
                                backgroundColor: '#F0AD00',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 3
                            };
                        } else if (tooltipItem.dataset.label === 'Чистая прибыль, ₽') {
                            return {
                                backgroundColor: '#5329FF',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 3
                            };
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    drawOnChartArea: false,
                },
                ticks: {
                    color: '#8C8C8C',
                }
            },
            y: {
                beginAtZero: true,
                min: -1000000,
                max: 5000000,
                grid: {
                    display: true,
                    drawOnChartArea: true,
                },
                ticks: {
                    stepSize: 1000000,
                    color: '#8C8C8C',
                    callback: function (value) {
                        return value.toLocaleString();
                    }
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        barPercentage: 1,
        categoryPercentage: 0.7,
        hover: {
            mode: null,
        }
    };

    return (
        <div className="chart-container" style={{ marginRight: "10px", minWidth: "630px" }}>
            <div className='chart-container-header'>
                <div>
                    <div className='chart-title'>Продажи и прибыль</div>
                </div>
                <div className='chart-header-wrapper'>
                    <div className='chart-container-colors-wrapper'>
                        <div className='roundedChartColor'></div>
                        <div>Выручка, ₽</div>
                    </div>
                    <div className='chart-container-colors-wrapper'>
                        <div className='roundedChartColorPurple'></div>
                        <div>Чистая прибыль, ₽</div>
                    </div>
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ScheduleBigChart;