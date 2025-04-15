import styles from './financeBlock.module.css'
import { getFinanceData } from '../blockUtils';
import { formatPrice } from '../../../../service/utils';
import { getRateIcon } from '../../shared/barUtils';

const FinanceBlock = ({ dataDashBoard, loading }) => {
    const financeData = getFinanceData(dataDashBoard)

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
            <p className={styles.block__title}>Финансы</p>

            <div className={styles.block__table}>
                {financeData && financeData.map((i, id) => (
                    <div className={styles.block__tableRow} key={id}>
                        <div className={styles.block__tableRowTitle}>
                            {i.name}
                        </div>
                        <div className={styles.block__tableRowContent}>
                            <p className={styles.block__mainData}>{formatPrice(i.amount, '₽')}</p>
                            <div className={styles.block__secDataWrapper}>
                                {getRateIcon(i.rate)}
                                <p className={i.rate > 0 ? `${styles.block__mainSubData} ${styles.block__mainSubData_green}` : `${styles.block__mainSubData} ${styles.block__mainSubData_red}`}>{formatPrice(i.rate, '%')}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default FinanceBlock;