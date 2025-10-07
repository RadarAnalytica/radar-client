import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './RevenueStorageChart.module.css';

const RevenueStorageChart = ({ dataRevenueStorage, labels, isLoading, max }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Выручка по складам',
                data: dataRevenueStorage,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, 0, chartArea.right, 0);
                    gradient.addColorStop(1, '#5329FF');
                    gradient.addColorStop(0, '#5329FF80');
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
        maintainAspectRatio: false,
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
                    weight: 'bold',
                    size: '12',
                },
                offset: 10,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        return value.toLocaleString('ru-RU') + ' ₽';
                    }
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
                max: max,

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
        <div className={`${styles.revenueStrorage}`}>
            <div className='chart-container-header'>
                <div>
                    <div className='chart-title'>Выручка по складам</div>
                </div>
            </div>
            {isLoading ? (
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100%', marginTop: "200px" }}
                >
                    <span className="loader"></span>
                </div>
            ) : (
                <Bar data={data} options={options} />
            )}
        </div>
    );
};

export default RevenueStorageChart;
