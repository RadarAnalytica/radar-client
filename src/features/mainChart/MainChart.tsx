import styles from './mainChart.module.css';
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import { verticalDashedLinePlugin } from '@/service/utils';
import { RadarLoader } from '@/shared';
import { useEffect, useState } from 'react';
import { Checkbox, ConfigProvider } from 'antd';


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


const getChartOptions = (chartData: any[]) => {
    const tickColor = '#6B7280'; // Цвет для меток на осях

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                intersect: false,
                mode: 'index',
                axis: 'x',
                callbacks: {},
                //external: (context) => {getChartTooltip(context, chartData);}
            },
            verticalDashedLine: { enabled: true }
        },
        elements: {
            line: {
                tension: 0.5,
            },
        },
        scales: {
            A: {
                id: 'A',
                type: 'linear',
                position: 'right',
                //suggestedMax: getMaxValue(chartData),
                min: 0,
                grid: {
                    drawOnChartArea: false,
                    tickLength: 0,
                },
                border: {
                    color: 'white',
                },
                ticks: {
                    //stepSize: getArrayStep(getMaxValue(chartData)),
                    color: '#F0AD00',
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    tickMarkLength: 0,
                    tickColor: 'transparent',
                },
                major: {
                    enabled: false,
                },
                minor: {
                    enabled: false,
                },
            },
            B: {
                id: 'B',
                type: 'linear',
                position: 'left',
                min: 0,
                //suggestedMax: getMaxAmount(chartData),
                grid: {
                    drawOnChartArea: true,
                    tickLength: 0,
                },
                border: {
                    color: 'white',
                },
                ticks: {
                    //stepSize: getArrayStep(getMaxAmount(chartData)),
                    color: '#5329FF',
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    tickMarkLength: 0,
                    tickColor: 'transparent',
                },
                major: {
                    enabled: false,
                },
                minor: {
                    enabled: false,
                },
            },
            x: {
                grid: {
                    drawOnChartArea: false,
                    // display: false,
                },
                ticks: {
                    // display: false,
                    autoSkip: true,
                    //maxTicksLimit: days === 90 ? Math.ceil(92 / 13) : 30,
                },
            },
        },
    };

    return chartOptions;
};

interface IChartProps {
    loading: boolean;
    chartData: any[];
    hasControls: boolean;
    controlsOptions?: {
        controlKey: string;
        controlName: string;
        controlColor: string;
        controlIsActive: boolean;
    }[];
    title?: string;
}


export const MainChart: React.FC<IChartProps> = ({
    loading,
    chartData,
    hasControls,
    controlsOptions,
    title,
}) => {
    const [controlsState, setControlsState] = useState<{
        controlKey: string;
        controlName: string;
        controlColor: string;
        controlIsActive: boolean;
    }[] | null>(null);


    useEffect(() => {
        if (controlsOptions && hasControls) {
            setControlsState(controlsOptions);
        }
    }, [controlsOptions, hasControls]);

    return (
        <>
            {/* Loader */}
            {loading &&
                (<div className={styles.chart}>
                    <RadarLoader />
                </div>)
            }
            {/* Main */}
            {!loading &&
                <div className={styles.chart}>
                    {(title || controlsState) && (
                        <div className={styles.chart__header}>
                            <div className={styles.chart__titleWrapper}>
                                {title && <p className={styles.chart__title}>{title}</p>}
                                <div className={styles.chart__controls}>
                                    {controlsState && controlsState.map((_, id) => (
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
                                                    //@ts-ignore
                                                    size='large'
                                                    checked={_.controlIsActive}
                                                    value={_.controlKey}
                                                    //@ts-ignore
                                                    onChange={(e) => {
                                                        setControlsState([...controlsState].map(i => {
                                                            if (i.controlKey === _.controlKey) {
                                                                return { ...i, controlIsActive: e.target.checked };
                                                            }
                                                        }));
                                                    }}
                                                >
                                                    <label className={styles.chart__controlLabel}>
                                                        Заказы, шт
                                                    </label>
                                                </Checkbox>
                                            </ConfigProvider>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={styles.chart__content}>
                        {chartData && chartData.length > 0 &&
                            <Chart
                                type='bar'
                                data={chartData as any}
                                width={100}
                                height={40}
                                options={getChartOptions(chartData) as any}
                            />}
                    </div>
                </div>
            }
        </>
    );
};

