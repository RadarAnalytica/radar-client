import styles from './costsBlock.module.css'
import { getCostsData } from '../blockUtils'
import { formatPrice } from '../../../../service/utils'
import { getRateIcon } from '../../shared/barUtils'

const CostsBlock = ({ dataDashBoard, loading }) => {

    const data = getCostsData(dataDashBoard)

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
            <div className={styles.block__header}>
                <p className={styles.block__title}>Расходы</p>
            </div>
            <div className={styles.block__table}>
                {data && data.map((i, id) => {
                    return (
                        <div className={styles.block__tableRow} key={id}>
                            <div className={styles.block__tableColumnTitle}>
                                {i.name}
                            </div>
                            <div className={styles.block__tableRowWrapper}>
                                <div className={styles.block__contentWrapper}>
                                    <p className={styles.block__mainData}>{formatPrice(i.amount, '₽')}</p>
                                    <div className={styles.block__rateWrapper}>
                                        {getRateIcon(i.percent)}
                                        <p className={i.percent > 0 ? `${styles.block__mainSubData} ${styles.block__mainSubData_green}` : `${styles.block__mainSubData} ${styles.block__mainSubData_red}`}>{formatPrice(i.percent, '%')}</p>
                                    </div>
                                </div>
                                <div className={styles.block__contentWrapper}>
                                    <p className={styles.block__mainData}>{formatPrice(i.percentRate, '%')}</p>
                                    <div className={styles.block__rateWrapper}>
                                        {getRateIcon(i.percentRate2)}
                                        <p className={i.percentRate2 > 0 ? `${styles.block__mainSubData} ${styles.block__mainSubData_green}` : `${styles.block__mainSubData} ${styles.block__mainSubData_red}`}>{formatPrice(i.percentRate2, '%')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CostsBlock;