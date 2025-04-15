import styles from './profitBlock.module.css'
import { getProfitData } from '../blockUtils'
import { formatPrice } from '../../../../service/utils';

const ProfitBlock = ({ dataDashBoard, loading }) => {

    const profitData = getProfitData(dataDashBoard);
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
            <p className={styles.block__title}>Прибыльность</p>

            <div className={styles.block__table}>
                {profitData && profitData.map((i, id) => (
                    <div className={styles.block__tableRow} key={id}>
                        <div className={styles.block__tableRowTitle}>
                            {i.name}
                        </div>
                        <div className={styles.block__tableRowContent}>
                            <p className={styles.block__mainData}>{formatPrice(i.value, '%')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfitBlock;