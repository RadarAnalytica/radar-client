import React from 'react';
import { Bar } from 'react-chartjs-2';



const RevenueStorageChart = () => {
    const data = {
        labels: ['Коледино', 'Тула', 'Казань', 'Санкт-Петербург Уткина Заводь', 'Невинномысск', 'Екатеринбург-Перспективный', 'Астана', 'Атакент', 'СЦ Кузнецк', 'Пушкино', 'Обухово 2', 'Вёшки'],
        datasets: [
            {
                label: 'Выручка по складам',
                data: [2000000, 1400000, 2000000, 2000000, 3000000, 2000000, 5000000, 6000000, 2000000, 2000000, 6500000, 6000000],
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(chartArea.top, 0, 0, chartArea.bottom);
                    gradient.addColorStop(0, '#5329FF');
                    gradient.addColorStop(1, '#5329FF80');
                    return gradient;
                },
                borderRadius: 3,
                barThickness: 12,
            }
        ]
    };
    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Выручка по складам',
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: 'black',
                formatter: function (value) {
                    return value.toLocaleString('ru-RU') + ' ₽';
                },
                font: {
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                beginAtZero: true,
                min: 0,
                max: 7000000,
                grid: {
                    display: true
                },
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString('ru-RU') + '₽';
                    },
                    maxRotation: 0,
                    minRotation: 0
                }
            }
        }
    };


    return (
        <div className="chart-container" style={{ width: "68%", maxHeight: "500px" }}>
            <div className='chart-container-header'>
                <div>
                    <div className='chart-title'>Выручка по складам</div>
                </div>

            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default RevenueStorageChart;
