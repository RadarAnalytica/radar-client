import styles from './abcDataBlock.module.css';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../service/utils';
import { RadarLoader } from '../../../../shared/ui/RadarLoader/RadarLoader';
// import { getColor } from '../blockUtils';

const AbcDataBlock = ({ titles, data, loading }) => {

    if (loading) {
        return (
            <div className={styles.block}>
                <RadarLoader loaderStyle={{ height: '213px' }} />
            </div>
        );
    }
    return (
        <div className={styles.block}>
            <div className={styles.block__titleWrapper}>
                <p className={styles.block__title}>
                    ABC-анализ
                </p>
                <Link to='/abc-data' target='_blank' className={styles.block__mainLink}>
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
                            <span style={{'color': 'rgba(0, 182, 155, 1)', 'backgroundColor': 'rgba(0, 182, 155, 0.1)'}} className={styles.block__tableCellPercentData}>{formatPrice(data.amountPercentA, '%')}</span>
                        </div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.amountB, '₽')}</span>
                            <span style={{'color': '#F0AD00', 'backgroundColor': '#F0AD000D'}} className={styles.block__tableCellPercentData}>{formatPrice(data.amountPercentB, '%')}</span>
                        </div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.amountC, '₽')}</span>
                            <span style={{'color': 'rgba(249, 60, 101, 1)', 'backgroundColor': 'rgba(249, 60, 101, 0.1)'}} className={styles.block__tableCellPercentData}>{formatPrice(data.amountPercentC, '%')}</span>
                        </div>
                    </div>
                    <div className={styles.block__tableRow}>
                        <div className={styles.block__tableCell}>Товар</div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.countA, 'шт')}</span>
                            <span style={{'color': 'rgba(0, 182, 155, 1)', 'backgroundColor': 'rgba(0, 182, 155, 0.1)'}} className={styles.block__tableCellPercentData}>{formatPrice(data.countPercentA, '%')}</span>
                        </div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.countB, 'шт')}</span>
                            <span style={{'color': '#F0AD00', 'backgroundColor': '#F0AD000D'}} className={styles.block__tableCellPercentData}>{formatPrice(data.countPercentB, '%')}</span>
                        </div>
                        <div className={styles.block__tableCell}>
                            <span className={styles.block__tableCellMainData}>{formatPrice(data.countC, 'шт')}</span>
                            <span style={{'color': 'rgba(249, 60, 101, 1)', 'backgroundColor': 'rgba(249, 60, 101, 0.1)'}} className={styles.block__tableCellPercentData}>{formatPrice(data.countPercentC, '%')}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AbcDataBlock;
