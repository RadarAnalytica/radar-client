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
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.2" cx="12.5" cy="12" r="12" fill="#9A81FF" />
                        <rect opacity="0.4" x="5" y="4.5" width="15" height="15" rx="7.5" fill="#9A81FF" />
                        <rect x="5.4" y="4.9" width="14.2" height="14.2" rx="7.1" stroke="#9A81FF" strokeWidth="0.8" />
                        <circle cx="12.6002" cy="11.6998" r="1.8" fill="white" stroke="#5030E5" strokeWidth="1.2" />
                    </svg>
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
                        <div className={styles.block__tableCell}>{formatPrice(data.amountA, '₽')} <span style={{ color: getColor(data.amountPercentA) }}>{formatPrice(data.amountPercentA, '%')}</span></div>
                        <div className={styles.block__tableCell}>{formatPrice(data.amountB, '₽')} <span style={{ color: getColor(data.amountPercentB) }}>{formatPrice(data.amountPercentB, '%')}</span></div>
                        <div className={styles.block__tableCell}>{formatPrice(data.amountC, '₽')} <span style={{ color: getColor(data.amountPercentC) }}>{formatPrice(data.amountPercentC, '%')}</span></div>
                    </div>
                    <div className={styles.block__tableRow}>
                        <div className={styles.block__tableCell}>Товар</div>
                        <div className={styles.block__tableCell}>{formatPrice(data.countA, 'шт')} <span style={{ color: getColor(data.countPercentA) }}>{formatPrice(data.countPercentA, '%')}</span></div>
                        <div className={styles.block__tableCell}>{formatPrice(data.countB, 'шт')} <span style={{ color: getColor(data.countPercentB) }}>{formatPrice(data.countPercentB, '%')}</span></div>
                        <div className={styles.block__tableCell}>{formatPrice(data.countC, 'шт')} <span style={{ color: getColor(data.countPercentC) }}>{formatPrice(data.countPercentC, '%')}</span></div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AbcDataBlock;
