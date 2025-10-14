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
