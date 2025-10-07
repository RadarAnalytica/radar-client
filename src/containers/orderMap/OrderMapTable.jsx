import React from 'react';
import styles from './OrderMapTable.module.css';
import { formatPrice } from '@/service/utils';

const OrderMapTable = ({ title, data, totalAmount, totalCount, visibility = false }) => {
  const withName = [...data].slice(5);
  // const otherRegion = withName.slice(-5)
  const withoutName = data.filter((item) => !item.districtName);

  const refreshed = withName.concat(withoutName);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  return (
    <>
      <div className={styles.block} style={{ visibility: visibility ? 'hidden' : 'visible'}}>
        <h5 className={styles.block__title}>{title}</h5>

        <div className={styles.table}>
          <p className={styles.table__title}>Регион</p>
          <p className={styles.table__title}>Штуки</p>
          <p className={styles.table__title}>Рубли</p>
          <p className={styles.table__title}>Доля</p>
          <div className={styles.table__border}></div>
          {withName && withName.length > 0 &&
            withName.map((item, key) => (
              <React.Fragment key={key}>
                <p className={styles.table__item}>{item.districtName.replace('федеральный округ', 'ФО') || 'Регион не определен'}</p>
                <p className={styles.table__item}>{formatPrice(item.count, 'шт') || 0}</p>
                <p className={styles.table__item}>{formatPrice(item.amount, '₽') || 0}</p>
                <p className={styles.table__item}>{formatPrice(item.percent, '%') || 0}</p>
                {key !== withName.length - 1 && <div className={styles.table__border}></div>}
              </React.Fragment>

            ))
          }
          {withName && withName.length === 0 &&
            <p className={styles.table__item}>Нет данных</p>
          }
        </div>
      </div>
    </>
  );
};

export default OrderMapTable;
