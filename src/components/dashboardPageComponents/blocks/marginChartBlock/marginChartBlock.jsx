import styles from './marginChartBlock.module.css'
import { processMarginalityRoiChart } from '../blockUtils'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MarginChartBlock = ({ dataDashBoard, loading }) => {

    const data = processMarginalityRoiChart(dataDashBoard?.marginalityRoiChart)

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
               
            </div>
        </div >
    )
}

export default MarginChartBlock;