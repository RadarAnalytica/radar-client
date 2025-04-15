import styles from './abcDataBlock.module.css'
import { Link } from 'react-router-dom'

const AbcDataBlock = () => {

    return (
        <div className={styles.block}>
            <div className={styles.block__titleWrapper}>
                <p className={styles.block__title}>
                    ABC-анализ
                </p>
                <Link to='/abc-data' className={styles.block__mainLink}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.2" cx="12.5" cy="12" r="12" fill="#9A81FF" />
                        <rect opacity="0.4" x="5" y="4.5" width="15" height="15" rx="7.5" fill="#9A81FF" />
                        <rect x="5.4" y="4.9" width="14.2" height="14.2" rx="7.1" stroke="#9A81FF" strokeWidth="0.8" />
                        <circle cx="12.6002" cy="11.6998" r="1.8" fill="white" stroke="#5030E5" strokeWidth="1.2" />
                    </svg>
                    Смотреть подробнее
                </Link>
            </div>

            <div className={styles.block__table}></div>
        </div>
    )
}

export default AbcDataBlock