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
                barThickness: 'flex', // Автоматическая регулировка высоты
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Выручка по складам' },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: 'black',
                formatter: function (value) {
                    return value.toLocaleString('ru-RU') + ' ₽';
                },
                font: { weight: 'bold', size: 12 },
                offset: 10,
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#fff',
                titleColor: '#000',
                bodyColor: '#000',
                borderColor: '#ccc',
                borderWidth: 1,
                cornerRadius: 6,
                padding: 10,
                external: function (context) {
                    const tooltip = context.tooltip;
                    const chartCanvas = context.chart.canvas;

                    if (tooltip.opacity === 0) {
                        chartCanvas.style.cursor = 'default';
                        return;
                    }

                    chartCanvas.style.cursor = 'pointer';
                },
                callbacks: {
                    label: function (context) {
                        return context.raw.toLocaleString('ru-RU') + ' ₽';
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                barPercentage: 0.5,
                categoryPercentage: 0.9,
                grid: { display: false },
            },
            x: {
                beginAtZero: true,
                min: 0,
                max: max,
                grid: { display: true },
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString('ru-RU') + '₽';
                    },
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
        },
        interaction: {
            mode: 'index',
            axis: 'х', // Ограничиваем область взаимодействия только осью Y
            intersect: true, // Тултип отображается только при наведении на саму колонку
        },
    };


    const safeLabels = data?.labels || []; // Default to an empty array if labels are undefined
    const chartHeight = safeLabels.length < 10 ? 300 : Math.max(safeLabels.length * 60, 400);
    return (
        <div className={`chart-container ${styles.revenueStorage} schedule-revenue-storage-chart mb-3`}>
            <p className='fw-bold numbers mb-2'>Выручка по складам</p>
            {isLoading ? (
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100%', marginTop: "200px" }}
                >
                    <span className="loader"></span>
                </div>
            ) : (
                <div style={{ height: '100%', overflowY: 'auto' }}>
                    <Bar data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default RevenueStorageChart;
