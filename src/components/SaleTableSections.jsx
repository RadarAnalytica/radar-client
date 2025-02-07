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
            <div>{formatPrice(data?.purchases.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {data?.purchases.quantity || '0'} шт
            </div>
          </div>
          <div className={styles.returnCell} style={{ width: getMinWidth(cellWidths.returnCell)}}>
            <div>{formatPrice(data?.return.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {data?.return.quantity || '0'} шт
            </div>
          </div>
          <div className={styles.salesCell} style={{ width: getMinWidth(cellWidths.salesCell) }}>
            {data?.revenue.quantity || '0'} шт
          </div>
          <div className={styles.revenueCell} style={{ width: getMinWidth(cellWidths.revenueCell)}}>
            {formatPrice(data?.revenue.rub) || '0'} ₽
          </div>
          <div className={styles.avgPriceCell} style={{ width: getMinWidth(cellWidths.avgPriceCell)}}>
            {formatPrice(data?.avg_check) || '0'} ₽
          </div>
          <div className={styles.sppCell} style={{ width: getMinWidth(cellWidths.sppCell)}}>
            <span>{data?.avg_spp}</span>
            <span style={{ marginLeft: '4px' }}>%</span>
          </div>
          {/* <div className={styles.sppCell}>{data?.avg_spp} %</div> */}
          <div className={styles.buyoutCell} style={{ width: getMinWidth(cellWidths.buyoutCell)}}>
            {data?.purchase_percent || '0'} %
          </div>
        </div>
        {/* Self Cost Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.costCell} style={{ width: getMinWidth(cellWidths.costCell) }}>
            <div>
              {data?.cost_price !== '-'
                ? formatPrice(data?.cost_price) + ' ₽'
                : '-'}
            </div>
            <div className={styles.smallText}>
              {data?.cost_price_percent !== '-'
                ? data?.cost_price_percent + ' %'
                : '-'}
            </div>
          </div>
          <div className={styles.costPerUnitCell} style={{ width: getMinWidth(cellWidths.costPerUnitCell) }}>
            {data?.cost_price !== '-'
              ? formatPrice(
                  data?.cost_price / data?.revenue.quantity
                ) + ' ₽'
              : '-'}
          </div>
        </div>
        {/* Commision & Logisitc Section */}
        <div className={styles.flexContainer}>
          <div className={styles.deliveryCountCell} style={{ width: getMinWidth(cellWidths.deliveryCountCell) }}>
            {data?.deliveries} шт
          </div>
          <div className={styles.commissionCell} style={{ width: getMinWidth(cellWidths.commissionCell) }}>
            <div>{formatPrice(data?.wb_commission.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {formatPrice(data?.wb_commission.percent)} %
            </div>
          </div>
          <div className={styles.acquiringCell} style={{ width: getMinWidth(cellWidths.acquiringCell) }}>
            <div>{formatPrice(data?.acquiring.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {data?.acquiring.percent.toFixed(1)} %
            </div>
          </div>
          <div className={`${styles.logisticsCell}`} style={{ width: getMinWidth(cellWidths.logisticDeliveryCell) }}>
            {formatPrice(data?.logistics_straight.rub) || '0'} ₽
          </div>
          <div className={`${styles.logisticsCell} ${styles.logisticReturnCell}`} style={{ width: getMinWidth(cellWidths.logisticReturnCell) }}>
            {formatPrice(data?.logistics_reverse.rub) || '0'} ₽
          </div>
          <div className={styles.logisticsCell} style={{ width: getMinWidth(cellWidths.logisticStorageCell) }}>
            <div>{formatPrice(data?.logistics_total.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {data?.logistics_total.percent.toFixed(1)} %
            </div>
          </div>
          <div className={styles.logisticsCell} style={{ width: getMinWidth(cellWidths.logisticUnitCell) }}>
            {formatPrice(data?.logistics_per_product) || '0'} ₽
          </div>
        </div>
        {/* Compensation and Penalties Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.defectCompnesaitionCell) }}>
            {formatPrice(data?.compensation_defects.rub) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.defectQuantityCell) }}>
            {formatPrice(data?.compensation_defects.quantity) || '0'} шт
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.damageCompensationCell) }}>
            {formatPrice(data?.compensation_damage.rub) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.damageQuantityCell) }}>
            {formatPrice(data?.compensation_damage.quantity) || '0'} шт
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.finesCell) }}>
            {formatPrice(data?.compensation_penalties.rub) || '0'} ₽
          </div>
          {/* ?????? */}
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payMoreCell) }}>
            {formatPrice(data?.compensation_penalties.rub) || '0'} ₽
          </div>
        </div>
        {/* Another Keep Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.keepCell) }}>
            <div>{formatPrice(data?.storage.rub) || '0'} ₽</div>
            <div>{data?.storage.percent || '0'} %</div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.keepOtherCell) }}>
            <div>{formatPrice(data?.other_retentions.rub) || '0'} ₽</div>
            <div>{data?.other_retentions.percent || '0'} %</div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payForTakeCell) }}>
            <div>{formatPrice(data?.acceptance.rub) || '0'} ₽</div>
            <div>{data?.acceptance.percent || '0'} %</div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payWbCell) }}>
            <div>{formatPrice(data?.wb_commission.rub) || '0'} ₽</div>
            <div>{data?.wb_commission.percent || '0'} %</div>
          </div>
        </div>
        {/* External Expenses Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.selfPurchaseCostCell) }}>
            {formatPrice(data?.self_purchase_costs) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.externalCostCell) }}>
            <div>{formatPrice(data?.external_expenses) || '0'} ₽</div>
            <div>{data?.expenses_percent || '0'} %</div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.externalCostAllCell) }}>
            {formatPrice(data?.expenses) || '0'} ₽
          </div>
        </div>
        {/* Tax Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.soldByWbCell) }}>
            {formatPrice(data?.sold_by_wb) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.taxBaseCell) }}>
            {formatPrice(data?.tax_base) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.taxCell) }}>
            {formatPrice(data?.tax) || '0'} ₽
          </div>
        </div>
        {/* Finance Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payToRsCell) }}>
            {formatPrice(data?.payment) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.pureProfitCell) }}>
            {formatPrice(data?.profit) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.pureProfitPerUnitCell) }}>
            {formatPrice(data?.profit_per_one) || '0'} ₽
          </div>
          <div
            className={styles.defectCompnesaitionCell}
            style={{ width: getMinWidth(cellWidths.marginProfitCell) }}
          >
            {formatPrice(data?.marginality) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.roiCell) }}>
            {data?.return_on_investment || '0'} %
          </div>
        </div>
    </>
  );
};

export default TableSections;