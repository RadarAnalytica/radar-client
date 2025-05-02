import React, { useState, useEffect } from 'react';
import styles from './mainChartWidget.module.css'
import { Segmented, ConfigProvider } from 'antd';
import { ChartControls } from '../../features';
import { Chart } from 'react-chartjs-2';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { chartCompareConfigObject, mainChartOptionsGenerator } from '../../shared';
import moment from 'moment';



ChartJS.register(
    annotationPlugin,
    CategoryScale,
    LinearScale,
    Filler,
    BarController,
    PointElement,
    BarElement,
    LineController,
    LineElement,
    [Tooltip]
);


const MainChartWidget = ({ id }) => {
    const dispatch = useAppDispatch()
    const [tabsState, setTabsState] = useState('Аналитика товара') // не удалять - стейт табов вариантов графика
    const [chartControls, setChartControls] = useState(chartCompareConfigObject.filter(_ => _.isControl).map(_ => ({ ..._, isActive: true })))
    const [normilizedChartData, setNormilizedChartData] = useState()
    const { skuChartData, dataStatus } = useAppSelector(store => store.skuAnalysis)

    useEffect(() => {
        if (skuChartData && chartControls) {
            const data = {
                labels: skuChartData.dates.map(i => moment(i).format('DD.MM.YY')),
                datasets: chartControls.map(i => {
                    let yAxis = 'y1';
                    if (i.hasUnits && i.units === '₽') {
                        yAxis = 'y'
                    }
                    if (i.isOnChart && i.isActive) {
                        return {
                            label: i.ruName,
                            type: 'line',
                            data: skuChartData[i.engName]?.map(i => i.item),
                            borderColor: i.color,
                            yAxisID: yAxis,
                            tension: 0.4,
                            pointBorderColor: 'white',
                            backgroundColor: i.color,
                            pointRadius: 6,
                            hoverRadius: 8,
                            borderWidth: 2
                        }
                    } else {
                        return {}
                    }
                })
            }
            setNormilizedChartData({ ...data })
        }
    }, [skuChartData, chartControls])

    if (!skuChartData && dataStatus.isLoading) {
        return (
            <div className={styles.loaderWrapper}>
                <span className='loader'></span>
            </div>
        )
    }



    return (
        <div className={styles.widget}>
            {/* Не удалять - это табы для переключения вариантов графика. Закоментил - Старина Михаил 28.04.25 */}
            {/* <div className={styles.widget__tabsWrapper}>
                <ConfigProvider
                    theme={{
                        token: {},
                        components: {
                            Segmented: {
                                itemActiveBg: '#E7E1FE',
                                itemSelectedBg: '#E7E1FE',
                                trackBg: 'transparent',
                                itemColor: '#1A1A1A80',
                                itemHoverBg: 'transparent',
                                itemHoverColor: '#1A1A1A',
                                itemSelectedColor: '#1A1A1A',
                                trackPadding: 0
                            }
                        }
                    }}
                >
                    <Segmented
                        size='large'
                        options={['Аналитика товара', 'Тренды']}
                        value={tabsState}
                        onChange={(value) => setTabsState(value)}
                    />
                </ConfigProvider>
            </div> */}
            {tabsState === 'Аналитика товара' &&
                <div className={styles.mainChart}>
                    <p className={styles.mainChart__title}>Сводные данные по дням</p>
                    <ChartControls
                        chartControls={chartControls}
                        setChartControls={setChartControls}
                    />
                    {normilizedChartData && skuChartData && chartControls &&
                        <Chart
                            type='line'
                            data={{ ...normilizedChartData }}
                            width={100}
                            height={40}
                            options={mainChartOptionsGenerator(skuChartData, chartControls.find(_ => _.isAnnotation), chartControls.find(_ => _.engName === 'seasonality'))}
                        />}
                </div>
            }
            {tabsState === 'Тренды' &&
                <div className={styles.mainChart}>
                </div>
            }
        </div>
    )
}

export default MainChartWidget;