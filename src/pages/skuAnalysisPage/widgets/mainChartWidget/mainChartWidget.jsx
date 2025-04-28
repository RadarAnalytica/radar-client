import React, { useState, useEffect, useContext } from 'react';
import styles from './mainChartWidget.module.css'
import { Segmented, ConfigProvider } from 'antd';
import { ChartControls } from '../../features';
import { Chart } from 'react-chartjs-2';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { fetchSkuAnalysisMainChartData } from '../../../../redux/skuAnalysis/skuAnalysisActions';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import AuthContext from '../../../../service/AuthContext';


ChartJS.register(
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
    const { selectedRange } = useAppSelector(store => store.filters)
    const { skuChartData } = useAppSelector(store => store.skuAnalysis)
    const { authToken } = useContext(AuthContext)

    useEffect(() => {
        if (id, authToken, selectedRange) {
            dispatch(fetchSkuAnalysisMainChartData({token: authToken, id, selectedRange}))
        }
    }, [id])

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
                    <ChartControls />
                    {/* <Chart
                        type='bar'
                        data={chartData}
                        width={100}
                        height={40}
                        options={getChartOptions(chartData, days)}
                    /> */}
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