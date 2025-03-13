import React from 'react';
import styles from './OrderMapTable.module.css'
const OrderMapTable = ({ title, data, totalAmount, totalCount }) => {
  const withName = [...data].slice(5);
  // const otherRegion = withName.slice(-5)
  const withoutName = data.filter((item) => !item.districtName);

  const refreshed = withName.concat(withoutName);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  return (
    <div className='order-map-table'>
      <h5 className='fw-bold' style={{ fontSize: '2.5vh' }}>
        {title}
      </h5>
      <div className={styles.table}>
        <p className='mb-2 clue-text col-6 pe-2'>Регион</p>
        <p className='mb-2 clue-text col'>Штуки</p>
        <p className='mb-2 clue-text col'>Рубли</p>
        <p className='mb-2 clue-text col text-end'>Доля</p>
      {withName &&
        (withName.length > 5
          ? withName.map((item, key) => (
          
            <>
              <p className={styles.table__rowTitle}>
                {item.districtName || 'Регион не определен'}
              </p>
              <p className='mb-2 col'>{item.count}&nbsp;шт</p>
              <p className='mb-2 col' style={{ textWrap: 'nowrap'}}>{item.amount}&nbsp;₽</p>
              <p className='mb-2 col text-end fw-bold'>
                {item.percent.toFixed(1)}&nbsp;%
              </p>
            </>
            
          ))
          : withName.map((item, key) => (
            <>
              <p className={styles.table__rowTitle}>{item.districtName}</p>
              <p className='mb-2 col'>{item.count.toFixed(0)}&nbsp;шт</p>
              <p className='mb-2 col' style={{ textWrap: 'nowrap'}}>{formatNumber(item.amount.toFixed(2))}&nbsp;₽</p>
              <p className='mb-2 col text-end fw-bold'>
                {item.percent.toFixed(1)}&nbsp;%
              </p>
            </>
          )))}
          </div>
    </div>
  );
};

export default OrderMapTable;
