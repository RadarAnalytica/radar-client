import React from 'react';
import OrderMapPieChart from '../containers/orderMap/OrderMapPieChart';
import styles from './OrderSalesPieCharts.module.css'

const OrderSalesPieCharts = ({ geoData, orderData, salesData }) => {
  return (
    <div className={styles.block}>
      <div className={styles.block__chartWrapper}>
        <OrderMapPieChart
          info={geoData.stock_data}
          title={'Топ 5 по заказам'}
          geoData={geoData.stock_data}
          sub={'Всего заказов'}
          totalAmount={orderData.totalOrderAmountStock}
          totalCount={orderData.totalOrderSumStock}
          count={orderData.orderCountStock}
          amount={orderData.orderAmountStock}
          titleTooltipAmount={'Заказы, руб'}
          titleTooltipCount={'Заказы, шт'}
          tooltipData={orderData.tooltipOrderDataStock}
        />
      </div>
      <div className={styles.block__chartWrapper}>
        <OrderMapPieChart
          info={geoData.stock_data}
          title={'Топ 5 по продажам'}
          geoData={geoData.stock_data}
          sub={'Всего продаж'}
          totalAmount={salesData.totalSaleAmountStock}
          totalCount={salesData.totalSaleSumStock}
          count={salesData.saleCountStock}
          amount={salesData.saleAmountStock}
          titleTooltipAmount={'Продажи,руб'}
          titleTooltipCount={'Продажи,шт'}
          tooltipData={salesData.tooltipSalesDataStock}
        />
      </div>
    </div>
  );
};

export default OrderSalesPieCharts;