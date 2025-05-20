import styles from './bar.module.css'
import { formatRateValue } from '../../shared'
import { formatPrice } from '../../../../service/utils'
import { Link } from 'react-router-dom'

const SmallBar = ({ title, data, units }) => {
    return (
        <div className={`${styles.bar} ${styles.bar_small}`}>
            <p className={`${styles.bar__title} ${styles.bar__title_small} `}>{title}</p>
            <p className={`${styles.bar__data} ${styles.bar__data_small}`}>{formatPrice(data, units)}</p>
        </div>
    )
}
const MediumBar = ({ title, data, rate, units }) => {
    const rateObject = formatRateValue(rate)
    return (
        <div className={`${styles.bar} ${styles.bar_medium}`}>
            <p className={styles.bar__title}>{title}</p>
            <div className={styles.bar__dataWrapper}>
                <p className={styles.bar__data}>{formatPrice(data, units)}</p>
                {rate && rateObject &&
                    <div className={styles.bar__rateWrapper}>
                        {rateObject.icon}
                        <span className={styles.bar__rate} style={{ color: rateObject.color }}>{rateObject.value}</span>
                    </div>
                }
            </div>
        </div>
    )
}

const LargeBar = ({ data }) => {

    return (
        <div className={`${styles.bar} ${styles.bar_large}`}>
            <Link to='/' target='_blank' className={styles.bar__link}>Ссылка на WB</Link>
            <div className={styles.bar__header}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="10" fill="#FFF5DC" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M43.3334 30C43.3334 25.0154 43.3334 22.5231 42.2616 20.6667C41.5594 19.4505 40.5495 18.4406 39.3334 17.7385C37.4769 16.6667 34.9846 16.6667 30 16.6667C25.0154 16.6667 22.5231 16.6667 20.6667 17.7385C19.4505 18.4406 18.4406 19.4505 17.7385 20.6667C16.6667 22.5231 16.6667 25.0154 16.6667 30C16.6667 34.9846 16.6667 37.4769 17.7385 39.3333C18.4406 40.5495 19.4505 41.5594 20.6667 42.2615C22.5231 43.3333 25.0154 43.3333 30 43.3333C34.9846 43.3333 37.4769 43.3333 39.3334 42.2615C40.5495 41.5594 41.5594 40.5495 42.2616 39.3333C43.3334 37.4769 43.3334 34.9846 43.3334 30ZM31.3334 25.5521C30.7811 25.5521 30.3334 25.9998 30.3334 26.5521C30.3334 27.1044 30.7811 27.5521 31.3334 27.5521H32.6715L30 30.2235L28.7071 28.9306C28.5196 28.7431 28.2652 28.6377 28 28.6377C27.7348 28.6377 27.4804 28.7431 27.2929 28.9306L22.6262 33.5973C22.2357 33.9878 22.2357 34.621 22.6262 35.0115C23.0168 35.402 23.6499 35.402 24.0405 35.0115L28 31.0519L29.2929 32.3448C29.6834 32.7354 30.3166 32.7354 30.7071 32.3448L34.1046 28.9474V30.3233C34.1046 30.8756 34.5523 31.3233 35.1046 31.3233C35.6569 31.3233 36.1046 30.8756 36.1046 30.3233V26.5521C36.1046 25.9998 35.6569 25.5521 35.1046 25.5521H31.3334Z" fill="#FEC53D" />
                </svg>
                <p className={styles.bar__heading}>Статистика</p>
            </div>
            <div className={styles.bar__dataLayout}>
                <div className={styles.bar__dataContainer}>
                    <p className={`${styles.bar__title} ${styles.bar__title_small}`}>test</p>
                    <p className={`${styles.bar__data} ${styles.bar__data_small}`}>1000</p>
                </div>
                <div className={styles.bar__dataContainer}>
                    <p className={`${styles.bar__title} ${styles.bar__title_small}`}>test</p>
                    <p className={`${styles.bar__data} ${styles.bar__data_small}`}>1000</p>
                </div>
                <div className={styles.bar__dataContainer}>
                    <p className={`${styles.bar__title} ${styles.bar__title_small}`}>test</p>
                    <p className={`${styles.bar__data} ${styles.bar__data_small}`}>1000</p>
                </div>
                <div className={styles.bar__dataContainer}>
                    <p className={`${styles.bar__title} ${styles.bar__title_small}`}>test</p>
                    <p className={`${styles.bar__data} ${styles.bar__data_small}`}>1000</p>
                </div>
            </div>
        </div>
    )
}


const Bar = {
    Small: SmallBar,
    Medium: MediumBar,
    Large: LargeBar
}
export default Bar;