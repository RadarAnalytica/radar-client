import styles from './bar.module.css'
import { getIcon, getRateIcon, getRateStyle } from '../shared/barUtils';
import { formatPrice } from '../../../service/utils';

const Bar = ({ fixed = true, title, amount, amountInPercent, amountPerDay, quantity, quantityInPercent, quantityPerDay, buyOut, butOutInPercent, averageBill, averageBillInPercent, loading }) => {

    if (loading) {
        return (
            <div className={fixed ? styles.bar : styles.bar_float}>
                <div className={fixed ? styles.bar__loaderWrapper : `${styles.bar__loaderWrapper} ${styles.bar__loaderWrapper_ar}`}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }

    return (
        <div className={fixed ? styles.bar : styles.bar_float}>
            <div className={styles.bar__iconWrapper}>{getIcon(title)}</div>
            <p className={styles.bar__title}>{title}</p>

            {fixed &&
                <div className={styles.bar__dataWrapper}>
                    <p className={styles.bar__mainData}>{formatPrice(amount, '₽')}</p>
                    <div className={styles.bar__contentWrapper}>
                        {getRateIcon(amountInPercent)}
                        <p className={getRateStyle(parseInt(amountInPercent), styles)}>{formatPrice(amountInPercent, '%')}</p>
                        <p className={`${styles.bar__mainSubData} ${styles.bar__mainSubData_gray}`}>В день ~ {formatPrice(amountPerDay, '₽')}</p>
                    </div>
                </div>
            }
            {fixed &&
                <div className={styles.bar__dataWrapper}>
                    <p className={styles.bar__mainData}>{formatPrice(quantity, 'шт')}</p>
                    <div className={styles.bar__contentWrapper}>
                        {getRateIcon(quantityInPercent)}
                        <p className={getRateStyle(parseInt(quantityInPercent), styles)}>{formatPrice(quantityInPercent, '%')}</p>
                        <p className={`${styles.bar__mainSubData} ${styles.bar__mainSubData_gray}`}>В день ~ {formatPrice(quantityPerDay, 'шт')}</p>
                    </div>
                </div>
            }

            {!fixed && butOutInPercent !== undefined && buyOut !== undefined &&
                <div className={styles.bar__floatData}>
                    <p className={styles.bar__mainData}>{formatPrice(buyOut, '%')}</p>
                    <div className={styles.bar__contentWrapper}>
                        {getRateIcon(butOutInPercent)}
                        <p className={getRateStyle(parseInt(butOutInPercent), styles)}>{formatPrice(butOutInPercent, '%')}</p>
                    </div>
                </div>
            }

            {!fixed && averageBill !== undefined && averageBillInPercent !== undefined &&
                <div className={styles.bar__floatData}>
                    <p className={styles.bar__mainData}>{formatPrice(averageBill, '₽')}</p>
                    <div className={styles.bar__contentWrapper}>
                        {getRateIcon(averageBillInPercent)}
                        <p className={getRateStyle(parseInt(averageBillInPercent), styles)}>{formatPrice(averageBillInPercent, '%')}</p>
                    </div>
                </div>
            }

        </div>
    )
}

export default Bar;