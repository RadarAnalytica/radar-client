import styles from './marginChartBlock.module.css'
import { processMarginalityRoiChart } from '../blockUtils'
import roi from '../../../../assets/roi.svg';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MarginChartBlock = ({ dataDashBoard, loading }) => {

    let { dataProfitability,
        dataProfitPlus,
        dataProfitMinus,
        isLoading,
        labels,
        step,
        minValue,
        maxValue } = processMarginalityRoiChart(dataDashBoard?.marginalityRoiChart)
    const min = minValue
    const max = maxValue

    if (Math.abs(min) + Math.abs(max) < 300) {
        step = 25
    }

    const marginMin = dataProfitPlus ? Math.round([...dataProfitPlus].sort((a, b) => a - b)[0]) : 0;
    const marginMax = dataProfitPlus ? Math.ceil([...dataProfitPlus].sort((a, b) => b - a)[0] / 100) * 100 : 100;
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
                yAxisID: 'A',
                //yAxisID: 'left-y',
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
                yAxisID: 'B'
                //yAxisID: 'right-y',
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
                yAxisID: 'B',
            }


        ],
    };

    const options = {
        responsive: true,
        onHover: (event) => {
            event.native.target.style.cursor = 'pointer';
        },
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
                            const lowerDataset = tooltipItem.chart.data.datasets.find(ds => ds.label === 'Маржинальность по прибыли,(Lower)');
                            const upperDataset = tooltipItem.chart.data.datasets.find(ds => ds.label === 'Маржинальность по прибыли,(Upper)');

                            const lowerValue = lowerDataset?.data[tooltipItem.dataIndex] || '0';
                            const upperValue = upperDataset?.data[tooltipItem.dataIndex] || '0';

                            if (lowerValue === '0') {
                                return `Маржинальность: ${upperValue}%`;
                            }

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
            A: {
                id: 'A',
                min,
                max,
                position: 'left',
                grid: {
                    drawOnChartArea: true, // only want the grid lines for one axis to show up
                },
                ticks: {
                    stepSize: step,
                },
            },
            B: {
                id: 'B',
                type: 'linear',
                position: 'right',
                min: marginMin,
                max: marginMax,
                suggestedMax: marginMax,
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    stepSize: Math.round((marginMax - marginMin) / 5),
                },
            },
            x: {
                stacked: true,
                grid: {
                    //drawOnChartArea: false,
                    display: false,
                },
                ticks: {
                    color: '#8C8C8C',
                    // autoSkip: false, 
                    // minRotation: 0,
                    callback: function (value, index) {
                        return data.labels[index];
                    }
                }
            },
        },

        interaction: {
            mode: 'index',
            intersect: false
        },
    };

    if (loading) {
        return (
            <div className={styles.block}>
                <div className={styles.bar__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.block}>
            <p className={styles.block__title}>Рентабельность и маржинальность</p>

            <div className={styles.block__chart}>
                <div className='chart-header-wrapper-prof mb-1'>
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
        </div >
    )
}

export default MarginChartBlock;