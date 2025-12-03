import { useState } from 'react';
import styles from './mainChart.module.css';
// import { processMarginalityRoiChart } from '../blockUtils';
// import roi from '../../../../assets/roi.svg';
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import { verticalDashedLinePlugin } from '@/service/utils';
import { RadarLoader } from '@/shared';
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
        isShowsActive: true,
        isQueriesActive: true,
    });

    const controlsCheckboxHandler = (e) => {
        setControlsState({
            ...controlsState,
            [e.target.value]: e.target.checked
        });
    };
    const formatDateShort = (dateInput) => {
        const date = new Date(dateInput);
        const day = date.getDate();
        const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return `${day} ${months[date.getMonth()]}`;
    };

    const formatDateWithWeekday = (dateInput) => {
        const date = new Date(dateInput);
        const day = date.getDate();
        const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const weekday = weekdays[date.getDay()];
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const month = months[date.getMonth()];
        return `${weekday}, ${day} ${month}`;
    };


    const data = {
        labels: dataDashBoard.map((item) => formatDateShort(item.date)),
        datasets: [
            controlsState.isQueriesActive
                ? {
                    label: 'Ключи, шт',
                    data: dataDashBoard.map((item) => item.queries),
                    borderColor: '#FFDB7E',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    //type: 'line',
                    pointBackgroundColor: '#FFDB7E',
                    pointBorderColor: 'white',
                    pointRadius: 4,
                    pointBorderWidth: 1,
                    yAxisID: 'A',
                }
                : {
                    label: 'Ключи, шт',
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
            controlsState.isShowsActive
                ? {
                    label: 'Просмотры, шт',
                    data: dataDashBoard.map((item) => item.shows),
                    type: 'bar',
                    backgroundColor: function (context) {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) {
                            return null;
                        }
                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, '#5329FF');
                        gradient.addColorStop(0.7, '#5329FF80');

                        return gradient;
                    },
                    borderWidth: 0,
                    barPercentage: 0.3,
                    borderRadius: { topLeft: 3, topRight: 3, bottomLeft: 3, bottomRight: 3 },
                    categoryPercentage: 1,
                    yAxisID: 'B',
                }
                : {
                    label: 'Просмотры, шт',
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
                borderColor: '#E0E0E0',
                borderRadius: 8,
                padding: 16,
                titleColor: '#8C8C8C',
                bodyColor: '#1A1A1A',
                callbacks: {
                    title: function (tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        const dateInput = dataDashBoard[index]?.date;
                        if (dateInput) {
                            return formatDateWithWeekday(dateInput);
                        }
                        return data.labels[index];
                    },
                    label: function (tooltipItem) {
                        const datasetLabel = tooltipItem.dataset.label;
                        const value = tooltipItem.raw.toLocaleString();


                        if (datasetLabel === 'ROI') {
                            return `ROI: ${value}`;
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

                        return `${datasetLabel}: ${value}`;
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
                position: 'right',
                //min: roiAxisMin === 0 ? roiAxisMin : roiAxisMin - 10,
                //max: roiAxisMax + 10,
                grid: {
                    drawOnChartArea: true, // only want the grid lines for one axis to show up
                    tickLength: 0,
                },
                border: {
                    color: 'white',
                },
                ticks: {
                    color: '#F0AD00',
                },
            },
            B: {
                id: 'B',
                type: 'linear',
                position: 'left',
                //min: marginAxisMin === 0 ? marginAxisMin : marginAxisMin - 10,
                //max: marginAxisMax + 10,
                grid: {
                    drawOnChartArea: false,
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
            <div className={styles.block__legend}>
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
                            checked={controlsState.isShowsActive}
                            value='isShowsActive'
                            onChange={controlsCheckboxHandler}
                        >
                            <label className={styles.controls__label}>
                                Просмотры, шт
                            </label>
                        </Checkbox>
                    </ConfigProvider>
                </div>
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
                            checked={controlsState.isQueriesActive}
                            value='isQueriesActive'
                            onChange={controlsCheckboxHandler}
                        >
                            <label className={styles.controls__label}>
                                Ключи, шт
                            </label>
                        </Checkbox>
                    </ConfigProvider>
                </div>
            </div>
            <div className={styles.block__chart}>
                <Chart type='line' data={data} options={options} />
            </div>
        </div >
    );
};

export default MarginChartBlock;
