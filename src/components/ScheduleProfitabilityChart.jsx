import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import roi from '../assets/roi.svg';
import { verticalDashedLinePlugin } from '../service/utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, verticalDashedLinePlugin);

const ScheduleProfitabilityChart = ({ dataProfitability, dataProfitPlus, dataProfitMinus, isLoading, labels, step, minValue, maxValue }) => {
    // console.log('dataProfitability', dataProfitability)
    // console.log('dataProfitPlus', dataProfitPlus)
    // console.log('dataProfitMinus', dataProfitMinus)
    // console.log('labels', labels)
    const min = minValue;
    const max = maxValue;
    if (Math.abs(min) + Math.abs(max) < 300) {
        step = 25;
    }
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'ROI',
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
                yAxisID: 'left-y',
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
            verticalDashedLine: { enabled: true },
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
                        return labels[index];
                    },
                    label: function (tooltipItem) {
                        const datasetLabel = tooltipItem.dataset.label;
                        const value = tooltipItem.raw.toLocaleString();


                        if (datasetLabel === 'ROI') {
                            return `ROI: ${value}%`;
                        }


                        if (datasetLabel.includes('Маржинальность по прибыли,(Lower)')) {

                            const lowerValue = tooltipItem.chart.data.datasets.find(ds => ds.label === 'Маржинальность по прибыли,(Lower)').data[tooltipItem.dataIndex] || '0';
                            const upperValue = tooltipItem.chart.data.datasets.find(ds => ds.label === 'Маржинальность по прибыли,(Upper)').data[tooltipItem.dataIndex] || '0';
                            return `Маржинальность: ${lowerValue}% .. - ${upperValue}%`;
                        }
                        if (datasetLabel.includes('Маржинальность по прибыли,(Upper)')) {

                            return ``;
                        }


                        return `${datasetLabel}: ${value}%`;
                    },
                    labelColor: function (tooltipItem) {
                        const datasetLabel = tooltipItem.dataset.label;
                        if (datasetLabel === 'ROI') {
                            return {
                                backgroundColor: '#5329FF', // Purple color for ROI
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 3
                            };
                        } else if (datasetLabel.includes('Маржинальность')) {
                            return {
                                backgroundColor: '#F0AD00', // Yellow color for Маржинальность
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 3
                            };
                        }
                    },
                }
            }


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
                min: min,
                max: max,
                // min: -140,
                // max: 80,
                stacked: true,
                grid: {
                    display: true,
                    drawOnChartArea: true,

                },
                ticks: {
                    stepSize: step,
                    color: '#8C8C8C',
                }
            },
            'right-y': {
                position: 'right',
                // min: -140,
                // max: 80,
                min: min,
                max: max,
                stacked: true,
                grid: {
                    display: true,
                    drawOnChartArea: true,

                },
                ticks: {
                    stepSize: step,
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
