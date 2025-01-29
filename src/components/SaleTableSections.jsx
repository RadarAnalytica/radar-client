import styles from './SaleTable.module.css';
import { formatPrice } from '../service/utils';

const TableSections = ({ data }) => {
  return (
    <>
        {/* Sales Section */}
        <div className={styles.flexContainer}>
          <div className={styles.purchaseCell}>
            <div>{formatPrice(data?.purchases.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {data?.purchases.quantity || '0'} шт
            </div>
          </div>
          <div className={styles.returnCell}>
            <div>{formatPrice(data.return.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {data.return.quantity || '0'} шт
            </div>
          </div>
          <div className={styles.salesCell}>
            {data.revenue.quantity || '0'} шт
          </div>
          <div className={styles.revenueCell}>
            {formatPrice(data.revenue.rub) || '0'} ₽
          </div>
          <div className={styles.avgPriceCell}>
            {formatPrice(data.avg_check) || '0'} ₽
          </div>
          <div className={styles.sppCell}>
            <span>{data.avg_spp}</span>
            <span style={{ marginLeft: '4px' }}>%</span>
          </div>
          {/* <div className={styles.sppCell}>{data.avg_spp} %</div> */}
          <div className={styles.buyoutCell}>
            {data.purchase_percent || '0'} %
          </div>
        </div>
        {/* Self Cost Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.costCell}>
            <div>
              {data.cost_price !== '-'
                ? formatPrice(data.cost_price) + ' ₽'
                : '-'}
            </div>
            <div className={styles.smallText}>
              {data.cost_price_percent !== '-'
                ? data.cost_price_percent + ' %'
                : '-'}
            </div>
          </div>
          <div className={styles.costPerUnitCell}>
            {data.cost_price !== '-'
              ? formatPrice(
                  data.cost_price / data.revenue.quantity
                ) + ' ₽'
              : '-'}
          </div>
        </div>
        {/* Commision & Logisitc Section */}
        <div className={styles.flexContainer}>
          <div className={styles.deliveryCountCell}>
            {data.deliveries} шт
          </div>
          <div className={styles.commissionCell}>
            <div>{formatPrice(data.wb_commission.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {formatPrice(data.wb_commission.percent)} %
            </div>
          </div>
          <div className={styles.acquiringCell}>
            <div>{formatPrice(data.acquiring.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {data.acquiring.percent.toFixed(1)} %
            </div>
          </div>
          <div className={styles.logisticsCell}>
            {formatPrice(data.logistics_straight.rub) || '0'} ₽
          </div>
          <div className={styles.logisticsCell}>
            {formatPrice(data.logistics_reverse.rub) || '0'} ₽
          </div>
          <div className={styles.logisticsCell}>
            <div>{formatPrice(data.logistics_total.rub) || '0'} ₽</div>
            <div className={styles.smallText}>
              {data.logistics_total.percent.toFixed(1)} %
            </div>
          </div>
          <div className={styles.logisticsCell}>
            {formatPrice(data.logistics_per_product) || '0'} ₽
          </div>
        </div>
        {/* Compensation and Penalties Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.compensation_defects.rub) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.compensation_defects.quantity) || '0'} шт
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.compensation_damage.rub) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.compensation_damage.quantity) || '0'} шт
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.compensation_penalties.rub) || '0'} ₽
          </div>
          {/* ?????? */}
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.compensation_penalties.rub) || '0'} ₽
          </div>
        </div>
        {/* Another Keep Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell}>
            <div>{formatPrice(data.storage.rub) || '0'} ₽</div>
            <div>{data.storage.percent || '0'} %</div>
          </div>
          <div className={styles.defectCompnesaitionCell}>
            <div>{formatPrice(data.other_retentions.rub) || '0'} ₽</div>
            <div>{data.other_retentions.percent || '0'} %</div>
          </div>
          <div className={styles.defectCompnesaitionCell}>
            <div>{formatPrice(data.acceptance.rub) || '0'} ₽</div>
            <div>{data.acceptance.percent || '0'} %</div>
          </div>
          <div className={styles.defectCompnesaitionCell}>
            <div>{formatPrice(data.wb_commission.rub) || '0'} ₽</div>
            <div>{data.wb_commission.percent || '0'} %</div>
          </div>
        </div>
        {/* External Expenses Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.self_purchase_costs) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell}>
            <div>{formatPrice(data.external_expenses) || '0'} ₽</div>
            <div>{data.expenses_percent || '0'} %</div>
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.expenses) || '0'} ₽
          </div>
        </div>
        {/* Tax Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.sold_by_wb) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.tax_base) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.tax) || '0'} ₽
          </div>
        </div>
        {/* Finance Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.payment) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.profit) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {formatPrice(data.profit) || '0'} ₽
          </div>
          <div
            className={styles.defectCompnesaitionCell}
            style={{ width: '148px' }}
          >
            {formatPrice(data.marginality) || '0'} ₽
          </div>
          <div className={styles.defectCompnesaitionCell}>
            {data.return_on_investment || '0'} %
          </div>
        </div>
    </>
  );
};

export default TableSections;
