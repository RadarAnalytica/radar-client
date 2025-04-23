import React, { useState } from 'react';
import styles from './mainChartWidget.module.css'
import { Segmented, ConfigProvider } from 'antd';
import { ChartControls } from '../../features';
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';

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


const MainChartWidget = () => {

    const [tabsState, setTabsState] = useState('Аналитика товара')
    const [controlsState, setControlsState] = useState({
        isOrderQuantityActive: true,
        isSalesQuantityActive: true,
        isOrderAmountActive: true,
        isSalesAmountActive: true,
    })

    return (
        <div className={styles.widget}>
            <div className={styles.widget__tabsWrapper}>
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
            </div>
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