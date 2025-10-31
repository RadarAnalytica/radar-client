import { useState } from 'react';
import styles from './marginChartBlock.module.css';
import { processMarginalityRoiChart } from '../blockUtils';
import roi from '../../../../assets/roi.svg';
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import { verticalDashedLinePlugin } from '../../../../service/utils';
import { RadarLoader } from '../../../../shared/ui/RadarLoader/RadarLoader';
import { ConfigProvider, Checkbox } from 'antd';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Filler,
    BarController,
    PointElement,
    BarElement,
    LineController,
    LineElement,
    [Tooltip],
    verticalDashedLinePlugin
);

const MarginChartBlock = ({ dataDashBoard, loading }) => {

    const [controlsState, setControlsState] = useState({
        isMarginActive: true,
        isRoiActive: true,
    });

    const controlsCheckboxHandler = (e) => {
        setControlsState({
            ...controlsState,
            [e.target.value]: e.target.checked
        });
    };

    let { dataProfitability,
        dataProfitPlus,
        dataProfitMinus,
        isLoading,
        labels,
        step,
        minValue,
        maxValue } = processMarginalityRoiChart(dataDashBoard?.marginalityRoiChart);
    const min = minValue;
    const max = maxValue;

    if (Math.abs(min) + Math.abs(max) < 300) {
        step = 25;
    }

    // Вычисляем отдельные диапазоны для ROI и маржинальности
    const roiMin = dataProfitability && dataProfitability.length > 0 ? Math.min(...dataProfitability) : 0;
    const roiMax = dataProfitability && dataProfitability.length > 0 ? Math.max(...dataProfitability) : 0;
    
    const marginMin = dataProfitPlus && dataProfitPlus.length > 0 ? Math.min(...dataProfitPlus) : 0;
    const marginMax = dataProfitPlus && dataProfitPlus.length > 0 ? Math.max(...dataProfitPlus) : 100;
    
    // Вычисляем относительную позицию нуля для каждой оси (доля от низа графика)
    // p = (0 - min) / (max - min) показывает, на какой высоте графика находится ноль
    const p_roi = roiMin < 0 ? -roiMin / (roiMax - roiMin) : 0;
    const p_margin = marginMin < 0 ? -marginMin / (marginMax - marginMin) : 0;
    
    // Выбираем максимальную позицию, чтобы обе оси уместили свои данные
    const p = Math.max(p_roi, p_margin);
    
    let roiAxisMin, roiAxisMax, marginAxisMin, marginAxisMax;
    
    if (p === 0) {
        // Нет отрицательных значений, располагаем 0 внизу
        roiAxisMin = 0;
        roiAxisMax = roiMax;
        marginAxisMin = 0;
        marginAxisMax = marginMax;
    } else {
        // Корректируем оси так, чтобы ноль был на одной высоте для обеих
        
        // Для ROI: используем min из данных, вычисляем необходимый max
        // Формула: max = min * (1 - 1/p)
        const calculatedRoiMax = roiMin * (1 - 1/p);
        if (calculatedRoiMax >= roiMax) {
            // Можем использовать реальный min
            roiAxisMin = roiMin;
            roiAxisMax = calculatedRoiMax;
        } else {
            // Нужно скорректировать min, чтобы уместить max
            // Формула: min = -max * p / (1 - p)
            roiAxisMin = -roiMax * p / (1 - p);
            roiAxisMax = roiMax;
        }
        
        // Для маржинальности: аналогично
        const calculatedMarginMax = marginMin * (1 - 1/p);
        if (calculatedMarginMax >= marginMax) {
            marginAxisMin = marginMin;
            marginAxisMax = calculatedMarginMax;
        } else {
            marginAxisMin = -marginMax * p / (1 - p);
            marginAxisMax = marginMax;
        }
    }
    
    const data = {
        labels: labels,
        datasets: [
            controlsState.isRoiActive
                ? {
                    label: 'ROI',
                    data: dataProfitability,
                    borderColor: '#5329FF',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    //type: 'line',
                    pointBackgroundColor: '#5329FF',
                    pointBorderColor: 'white',
                    pointRadius: 4,
                    pointBorderWidth: 1,
                    yAxisID: 'A',
                }
                : {
                    label: 'ROI',
                    data: [],
                    borderColor: '#5329FF',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#5329FF',
                    pointBorderColor: 'white',
                    pointRadius: 4,
                    pointBorderWidth: 1,
                    yAxisID: 'A',
                },
            controlsState.isMarginActive
                ? {
                    label: 'Маржинальность по прибыли',
                    data: dataProfitPlus,
                    type: 'bar',
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
                : {
                    label: 'Маржинальность по прибыли',
                    data: [],
                    type: 'bar',
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
        maintainAspectRatio: false,
        onHover: (event) => {
            event.native.target.style.cursor = 'pointer';
        },
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
                position: 'left',
                min: roiAxisMin === 0 ? roiAxisMin : roiAxisMin - 10,
                max: roiAxisMax + 10,
                grid: {
                    drawOnChartArea: true, // only want the grid lines for one axis to show up
                    tickLength: 0,
                },
                border: {
                    color: 'white',
                },
                ticks: {
                    tickLength: 0,
                    color: '#5329FF',
                },
            },
            B: {
                id: 'B',
                type: 'linear',
                position: 'right',
                min: marginAxisMin === 0 ? marginAxisMin : marginAxisMin - 10,
                max: marginAxisMax + 10,
                grid: {
                    drawOnChartArea: false,
                    tickLength: 0,
                },
                border: {
                    color: 'white',
                },
                ticks: {
                    color: '#F0AD00',
                },
            },
            x: {
                stacked: true,
                grid: {
                    drawOnChartArea: false,
                    drawTicks: true,
                    tickLength: 4,
                    color: '#E0E0E0',
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
               <RadarLoader loaderStyle={{ height: '407px' }} />
            </div>
        );
    }

    return (
        <div className={styles.block}>
            <p className={styles.block__title}>Рентабельность и маржинальность</p>
            <div className={styles.block__legend}>
            <div className={styles.controls__controlWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#F0AD00',
                            controlInteractiveSize: 20,
                        }
                    }}
                >
                    <Checkbox
                        size='large'
                        checked={controlsState.isMarginActive}
                        value='isMarginActive'
                        onChange={controlsCheckboxHandler}
                    >
                        <label className={styles.controls__label}>
                        Маржинальность по прибыли, %
                        </label>
                    </Checkbox>
                </ConfigProvider>
            </div>

            <div className={styles.controls__controlWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            controlInteractiveSize: 20,
                        }
                    }}
                >
                    <Checkbox
                        size='large'
                        checked={controlsState.isRoiActive}
                        value='isRoiActive'
                        onChange={controlsCheckboxHandler}
                    >
                        <label className={styles.controls__label}>
                        ROI, %
                        </label>
                    </Checkbox>
                </ConfigProvider>
            </div>

                {/* <div className={styles.block__legendWrapper}>
                    <div style={{ width: '20px', height: '20px', aspectRatio: '1 / 1', borderRadius: 3, background: '#F0AD00' }}></div>
                    <p className={styles.block__legendItemText}>Маржинальность по прибыли, %</p>
                </div>
                <div className={styles.block__legendWrapper}>
                    <img src={roi} />
                    <p className={styles.block__legendItemText}>ROI, %</p>
                </div> */}
            </div>
            <div className={styles.block__chart}>
                <Chart type='line' data={data} options={options} />
            </div>
        </div >
    );
};

export default MarginChartBlock;
