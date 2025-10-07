import styles from './storageBlock.module.css';
import { Link } from 'react-router-dom';
import { getStorageData } from '../blockUtils';
import { formatPrice } from '../../../../service/utils';

const StorageBlock = ({ dataDashBoard, loading }) => {

    const data = getStorageData(dataDashBoard);


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
            <div className={styles.block__header}>
                <p className={styles.block__title}>Склад</p>
                <Link
                    to='/orders-map'
                    className={styles.block__mainLink}
                >
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.2" cx="12.5" cy="12" r="12" fill="#9A81FF" />
                        <rect opacity="0.4" x="5" y="4.5" width="15" height="15" rx="7.5" fill="#9A81FF" />
                        <rect x="5.4" y="4.9" width="14.2" height="14.2" rx="7.1" stroke="#9A81FF" strokeWidth="0.8" />
                        <circle cx="12.6002" cy="11.7" r="1.8" fill="white" stroke="#5030E5" strokeWidth="1.2" />
                    </svg>

                    Смотреть подробнее
                </Link>
            </div>
            <div className={styles.block__table}>
                <div className={styles.block__tableRow}>
                    <div className={styles.block__tableColumnTitle}>
                        Где товар
                    </div>
                    <div className={`${styles.block__tableColumnTitle} ${styles.block__tableColumnTitle_double}`}>
                        Капитализация
                    </div>
                    <div className={styles.block__tableColumnTitle}>
                        Остатки
                    </div>
                </div>
                <div className={`${styles.block__tableRow} ${styles.block__tableRow_border}`}>
                    <div className={styles.block__tableColumnSubTitle}></div>
                    <div className={styles.block__tableColumnSubTitle}>
                        Себестоимость
                    </div>
                    <div className={styles.block__tableColumnSubTitle}>
                        Розница
                    </div>
                    <div className={styles.block__tableColumnSubTitle}></div>
                </div>

                {data && data.map((i, id) => {

                    return (
                        <div className={`${styles.block__tableRow} ${styles.block__tableRow_border}`} key={id}>
                            <div className={styles.block__tableRowTitle}>
                                {i.name}
                            </div>

                                <p className={styles.block__plainData}>{formatPrice(i.initialPrice, '₽')}</p>
                                <p className={styles.block__plainData}>{formatPrice(i.salesPrice, '₽')}</p>
                                <p className={styles.block__mainData}>{formatPrice(i.quantity, 'шт')}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StorageBlock;
