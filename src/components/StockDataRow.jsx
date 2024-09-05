import React from 'react';
import OrderTableExtended from '../containers/orderMap/OrderTableExtended';

const StockDataRow = ({ stockName, orderDetails, saleDetails }) => {
  return (
    <div className='pl-3 map-data-row'>
      <div className='col'>
        <OrderTableExtended
          title={`Заказы из ${stockName}`}
          data={orderDetails}
        />
      </div>
      <div className='col'>
        <OrderTableExtended
          title={`Продажи из ${stockName}`}
          data={saleDetails}
        />
      </div>
    </div>
  );
};

export default StockDataRow;