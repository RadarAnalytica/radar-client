import React from 'react';
import OrderTableExtended from '../containers/orderMap/OrderTableExtended';
import styles from './StockDataRow.module.css';

const StockDataRow = ({ stockName, orderDetails, saleDetails }) => {
  return stockName && (orderDetails.length > 0 || saleDetails.length > 0) && (
    <div className={styles.block}>
      <div className={styles.block__wrapper}>
        <OrderTableExtended
          title={`Заказы из ${stockName}`}
          data={orderDetails}
        />
      </div>
      <div className={styles.block__wrapper}>
        <OrderTableExtended
          title={`Продажи из ${stockName}`}
          data={saleDetails}
        />
      </div>
    </div>
  );
};

export default StockDataRow;
