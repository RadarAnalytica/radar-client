import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import roi from '../assets/roi.svg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ScheduleProfitabilityChart = ({ dataProfitability, dataProfitPlus, dataProfitMinus, isLoading, labels, min, max }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'ROI, %',
                data: dataProfitability,
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
                label: 'Маржинальность по прибыли,(Lower)',
                data: dataProfitMinus,
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
                label: 'Маржинальность по прибыли,(Upper)',
                data: dataProfitPlus,
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
                position: 'average',
                callbacks: {
                    title: function (tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        return labels[index];
                    },
                    label: function (tooltipItem) {
                        const datasetLabel = tooltipItem.dataset.label || '';
                        const value = tooltipItem.raw;

                        if (datasetLabel.includes('(Lower)')) {
                            return [`Маржинальность по прибыли,`, `(Lower): ${value}%`];
                        } else if (datasetLabel.includes('(Upper)')) {
                            return [`Маржинальность по прибыли,`, `(Upper): ${value}%`];
                        } else {
                            return `${datasetLabel}: ${value}%`;
                        }
                    },

                },

                external: function (context) {
                    const tooltipEl = document.getElementById('custom-tooltip');
                    if (!tooltipEl) {
                        return;
                    }

                    const tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    const { offsetX, offsetY } = context.chart.canvas.getBoundingClientRect();

                    tooltipEl.style.left = `${tooltipModel.x + offsetX + 10}px`;
                    tooltipEl.style.top = `${tooltipModel.y + offsetY - 30}px`;
                }
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
                // min: min,
                // max: max,
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
                // min: min,
                // max: max,
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
        <div className="chart-container" style={{ marginLeft: "8px", minWidth: "50%" }}>
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
            {isLoading ? (
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100%', marginTop: "140px" }}
                >
                    <span className="loader"></span>
                </div>
            ) : (
                <Bar data={data} options={options} />
            )}
        </div>
    );
};

export default ScheduleProfitabilityChart;
