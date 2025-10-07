import React from 'react';
import styles from './SaleTable.module.css';
import { formatPrice } from '../service/utils';

const TableSections = ({ data, cellWidths }) => {

  const getMinWidth = (width, minWidth = 128) => {
    return `${width <= minWidth ? minWidth : width}px`;
  };

  return (
    <>
        {/* Sales Section */}
        <div className={styles.flexContainer}>
          <div className={styles.purchaseCell} style={{ width: getMinWidth(cellWidths.purchaseCell)}}>
            <div>{formatPrice(data?.purchases.rub, '₽')}</div>
            <div className={styles.smallText}>
              {formatPrice(data?.purchases.quantity, 'шт')}
            </div>
          </div>
          <div className={styles.returnCell} style={{ width: getMinWidth(cellWidths.returnCell)}}>
            <div>{formatPrice(data?.return.rub, '₽')}</div>
            <div className={styles.smallText}>
              {formatPrice(data?.return.quantity, 'шт')}
            </div>
          </div>
          <div className={styles.salesCell} style={{ width: getMinWidth(cellWidths.salesCell) }}>
            {formatPrice(data?.revenue.quantity, 'шт')}
          </div>
          <div className={styles.revenueCell} style={{ width: getMinWidth(cellWidths.revenueCell)}}>
            {formatPrice(data?.revenue.rub, '₽')}
          </div>
          <div className={styles.avgPriceCell} style={{ width: getMinWidth(cellWidths.avgPriceCell)}}>
            {formatPrice(data?.avg_check, '₽')}
          </div>
          <div className={styles.sppCell} style={{ width: getMinWidth(cellWidths.sppCell)}}>
            <span>{formatPrice(data?.avg_spp, '%')}</span>
          </div>
          {/* <div className={styles.sppCell}>{data?.avg_spp} %</div> */}
          <div className={styles.buyoutCell} style={{ width: getMinWidth(cellWidths.buyoutCell)}}>
            {formatPrice(data?.purchase_percent, '%')}
          </div>
        </div>
        {/* Self Cost Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.costCell} style={{ width: getMinWidth(cellWidths.costCell) }}>
            <div>
              {formatPrice(data?.cost_price, '₽')}
            </div>
            <div className={styles.smallText}>
              {formatPrice(data?.cost_price_percent, '%')}
            </div>
          </div>
          <div className={styles.costPerUnitCell} style={{ width: getMinWidth(cellWidths.costPerUnitCell) }}>
            {formatPrice(data?.cost_price_per_one, '₽')}
          </div>
        </div>
        {/* Commision & Logisitc Section */}
        <div className={styles.flexContainer}>
          <div className={styles.deliveryCountCell} style={{ width: getMinWidth(cellWidths.deliveryCountCell) }}>
            {formatPrice(data?.deliveries, 'шт')}
          </div>
          <div className={styles.commissionCell} style={{ width: getMinWidth(cellWidths.commissionCell) }}>
            <div>{formatPrice(data?.wb_commission.rub, '₽')}</div>
            <div className={styles.smallText}>
              {formatPrice(data?.wb_commission.percent, '%')}
            </div>
          </div>
          <div className={styles.acquiringCell} style={{ width: getMinWidth(cellWidths.acquiringCell) }}>
            <div>{formatPrice(data?.acquiring.rub, '₽')}</div>
            <div className={styles.smallText}>
              {formatPrice(data?.acquiring.percent.toFixed(1), '%')}
            </div>
          </div>
          <div className={`${styles.logisticsCell}`} style={{ width: getMinWidth(cellWidths.logisticDeliveryCell) }}>
            {formatPrice(data?.logistics_straight.rub, '₽')}
          </div>
          <div className={`${styles.logisticsCell} ${styles.logisticReturnCell}`} style={{ width: getMinWidth(cellWidths.logisticReturnCell) }}>
            {formatPrice(data?.logistics_reverse.rub, '₽')}
          </div>
          <div className={styles.logisticsCell} style={{ width: getMinWidth(cellWidths.logisticStorageCell) }}>
            <div>{formatPrice(data?.logistics_total.rub, '₽')}</div>
            <div className={styles.smallText}>
              {formatPrice(data?.logistics_total.percent.toFixed(1), '%')}
            </div>
          </div>
          <div className={styles.logisticsCell} style={{ width: getMinWidth(cellWidths.logisticUnitCell) }}>
            {formatPrice(data?.logistics_per_product, '₽')}
          </div>
        </div>
        {/* Compensation and Penalties Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.defectCompnesaitionCell) }}>
            {formatPrice(data?.compensation_defects.rub, '₽')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.defectQuantityCell) }}>
            {formatPrice(data?.compensation_defects.quantity, 'шт')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.damageCompensationCell) }}>
            {formatPrice(data?.compensation_damage.rub, '₽')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.damageQuantityCell) }}>
            {formatPrice(data?.compensation_damage.quantity, 'шт')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.finesCell) }}>
            {formatPrice(data?.penalties, '₽')}
          </div>
          {/* ?????? */}
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payMoreCell) }}>
            {formatPrice(data?.additional_payments, '₽')}
          </div>
        </div>
        {/* Another Keep Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.keepCell) }}>
            <div>{formatPrice(data?.storage.rub, '₽')}</div>
            <div>{formatPrice(data?.storage.percent, '%')}</div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.keepOtherCell) }}>
            <div>{formatPrice(data?.other_retentions.rub, '₽')}</div>
            <div>{formatPrice(data?.other_retentions.percent, '%')}</div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payForTakeCell) }}>
            <div>{formatPrice(data?.acceptance.rub, '₽')}</div>
            <div>{formatPrice(data?.acceptance.percent, '%')}</div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payWbCell) }}>
            <div>{formatPrice(data?.compensation_penalties.rub, '₽')}</div>
            <div>{formatPrice(data?.compensation_penalties.percent, '%')}</div>
          </div>
        </div>
        {/* External Expenses Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.selfPurchaseCostCell) }}>
            {formatPrice(data?.self_purchase_costs, '₽')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.externalCostCell) }}>
            <div>{formatPrice(data?.external_expenses, '₽')}</div>
            <div>{formatPrice(data?.expenses_percent, '%')}</div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.externalCostAllCell) }}>
            {formatPrice(data?.expenses, '₽')}
          </div>
        </div>
        {/* Tax Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.soldByWbCell) }}>
            {formatPrice(data?.sold_by_wb, '₽')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.taxBaseCell) }}>
            {formatPrice(data?.tax_base, '₽')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.taxCell) }}>
            {formatPrice(data?.tax, '₽')}
          </div>
        </div>
        {/* Finance Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payToRsCell) }}>
            {formatPrice(data?.payment, '₽')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.pureProfitCell) }}>
            {formatPrice(data?.profit, '₽')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.pureProfitPerUnitCell) }}>
            {formatPrice(data?.profit_per_one, '₽')}
          </div>
          <div
            className={styles.defectCompnesaitionCell}
            style={{ width: getMinWidth(cellWidths.marginProfitCell) }}
          >
            {formatPrice(data?.marginality, '%')}
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.roiCell) }}>
            {formatPrice(data?.return_on_investment, '%')}
          </div>
        </div>
    </>
  );
};

export default TableSections;
