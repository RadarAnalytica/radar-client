import { useState, useEffect } from 'react';
import styles from './mainChart.module.css'
import MainChartControls from './mainChartControls/mainChartControls';
//import { getChartData, getChartOptions } from '../../shared/mainChartUtils';
import { differenceInDays } from 'date-fns';
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import { verticalDashedLinePlugin } from '../../../../../service/utils';


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

const MainChart = ({ title, loading, dataDashBoard, selectedRange }) => {

    const [chartData, setChartData] = useState()
    const [days, setDays] = useState()
    const [controlsState, setControlsState] = useState({
        isOrderQuantityActive: true,
        isSalesQuantityActive: true,
        isOrderAmountActive: true,
        isSalesAmountActive: true,
    })


    //Трансформируем данные для графика
    // useEffect(() => {
    //     if (dataDashBoard && selectedRange) {
    //         setChartData(getChartData(dataDashBoard, selectedRange, controlsState))
    //     }
    // }, [dataDashBoard, selectedRange, controlsState])

    //Преобразуем период
    // useEffect(() => {
    //     setDays(selectedRange.from && selectedRange.to ? differenceInDays(selectedRange.to, selectedRange.from, { unit: 'days' }) : selectedRange.period)
    // }, [selectedRange])


    return (
        <>
            {/* Loader */}
            {loading &&
                (<div className={styles.chart}>
                    <div className={styles.chart__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                </div>)
            }
            {/* Main */}
            {!loading &&
                <div className={styles.chart}>
                    <div className={styles.chart__header}>
                        <MainChartControls
                            constrolsState={controlsState}
                            setControlsState={setControlsState}
                        />
                    </div>

                    <div className={styles.chart__content}>
                        {'// Main chart will be here'}
                        {/* {chartData && chartData.labels.length > 0 &&
                            <Chart
                                type='bar'
                                data={chartData}
                                width={100}
                                height={40}
                                options={getChartOptions(chartData, days)}
                            />} */}
                    </div>
                </div>
            }
        </>
    )
}

export default MainChart;