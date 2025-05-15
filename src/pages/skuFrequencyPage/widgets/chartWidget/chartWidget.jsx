import styles from './chartWidget.module.css'
import { Chart } from 'react-chartjs-2';

const ChartWidget = () => {

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
        <section className={styles.widget}>
            {/* <Chart /> */}
        </section>
    )
}

export default ChartWidget