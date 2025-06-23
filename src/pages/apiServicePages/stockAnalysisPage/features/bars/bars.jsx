import styles from './bars.module.css'
import { formatPrice } from '../../../../../service/utils'


const MainBar = ({ title }) => {
    return (
        <div className={`${styles.bar} ${styles.mainBar}`}>
            <div className={styles.mainBar__iconWrapper}>
                
            </div>
            <p className={styles.bar__title}>{title}</p>
        </div>
    )
}

const SimpleBar = ({ title, amount, units }) => {
    return (
        <div className={`${styles.bar} ${styles.simpleBar}`}>
            <p className={styles.bar__title}>{title}</p>
            <p className={styles.simpleBar__amount}>{formatPrice(amount, units)}</p>
        </div>
    )
}

const RateBar = () => {
    return (
        <div className={styles.bar}></div>
    )
}

const TableBar = () => {
    return (
        <div className={styles.bar}></div>
    )
}

const ChartBar = () => {
    return (
        <div className={styles.bar}></div>
    )
}



const Bars = {
    MainBar,
    SimpleBar,
    RateBar,
    TableBar,
    ChartBar
}

export default Bars;