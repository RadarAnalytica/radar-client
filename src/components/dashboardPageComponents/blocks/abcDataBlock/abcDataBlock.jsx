import styles from './abcDataBlock.module.css';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../service/utils';
import { getColor } from '../blockUtils';

const AbcDataBlock = ({ titles, data, loading }) => {

    if (loading) {
        return (
            <div className={styles.block}>
                <div className={styles.bar__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.block}>
            <div className={styles.block__titleWrapper}>
                <p className={styles.block__title}>
                    ABC-анализ
                </p>
                <Link to='/abc-data' className={styles.block__mainLink}>
                    Смотреть подробнее
                </Link>
            </div>

            {data &&
                <div className={styles.block__table}>
                    <div className={styles.block__tableRow}>
                        <div></div>
                        {titles.map((i, id) => (
                            <div className={styles.block__tableCell} key={id}>
                                {i}
                            </div>
                        ))}
                    </div>
                    <div className={styles.block__tableRow}>
                        <div className={styles.block__tableCell}>Выручка</div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.amountA, '₽')}</span>
                            <span style={{ ...getColor(data.amountPercentA) }} className={styles.block__tableCellPercentData}>{formatPrice(data.amountPercentA, '%')}</span>
                        </div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.amountB, '₽')}</span>
                            <span style={{ ...getColor(data.amountPercentB) }} className={styles.block__tableCellPercentData}>{formatPrice(data.amountPercentB, '%')}</span>
                        </div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.amountC, '₽')}</span>
                            <span style={{ ...getColor(data.amountPercentC) }} className={styles.block__tableCellPercentData}>{formatPrice(data.amountPercentC, '%')}</span>
                        </div>
                    </div>
                    <div className={styles.block__tableRow}>
                        <div className={styles.block__tableCell}>Товар</div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.countA, 'шт')}</span>
                            <span style={{ ...getColor(data.countPercentA) }} className={styles.block__tableCellPercentData}>{formatPrice(data.countPercentA, '%')}</span>
                        </div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.countB, 'шт')}</span>
                            <span style={{ ...getColor(data.countPercentB) }} className={styles.block__tableCellPercentData}>{formatPrice(data.countPercentB, '%')}</span>
                        </div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.countC, 'шт')}</span>
                            <span style={{ ...getColor(data.countPercentC) }} className={styles.block__tableCellPercentData}>{formatPrice(data.countPercentC, '%')}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AbcDataBlock;
