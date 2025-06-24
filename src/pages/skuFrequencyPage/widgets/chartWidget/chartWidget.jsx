import { useEffect, useState } from 'react';
import styles from './chartWidget.module.css'
import { Chart } from 'react-chartjs-2';
import { ServiceFunctions } from '../../../../service/serviceFunctions';
import { chartDataNormalizer } from '../../shared';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import { verticalDashedLinePlugin } from '../../../../service/utils';

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

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const chartOptions = {
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            //enabled: false,
            intersect: false,
            mode: 'index',
            axis: 'x',
            //callbacks: {},
            //external: (context) => { getChartTooltip(context, normilizedChartData) }
        },
        verticalDashedLine: { enabled: true }
    },
    scales: {
        x: {
            display: true,
            grid: {
                drawOnChartArea: false,
            },
        },
    }
}

const ChartWidget = ({ chartTabsState, currentQuery }) => {

    const [chartData, setChartData] = useState();
    const [requestStatus, setRequestStatus] = useState(initRequestStatus);

    useEffect(() => {
        !requestStatus.isLoading && ServiceFunctions.getMonitoringChartData(chartTabsState, currentQuery, setChartData, setRequestStatus, chartDataNormalizer)
    }, [currentQuery, chartTabsState])


    if (requestStatus.isLoading) {
        return (
            <div className={styles.widget__loaderWrapper}>
                <span className='loader'></span>
            </div>
        )
    }

    return chartData && (
        <section className={styles.widget}>
            <Chart
                type='line'
                data={chartData}
                width={100}
                height={40}
                options={chartOptions}
            />
        </section>
    )
}

export default ChartWidget