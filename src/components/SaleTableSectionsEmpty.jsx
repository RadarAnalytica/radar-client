import styles from './SaleTable.module.css';

const TableSectionsEmpty = ({cellWidths}) => {
  const getMinWidth = (width, minWidth = 128) => {
    return `${width <= minWidth ? minWidth : width}px`;
  };

  return (
    <>
        {/* Sales Section */}
        <div className={styles.flexContainer}>
          <div className={styles.purchaseCell} style={{ width: getMinWidth(cellWidths.purchaseCell) }}>
            <div></div>
            <div className={styles.smallText}>

            </div>
          </div>
          <div className={styles.returnCell} style={{ width: getMinWidth(cellWidths.returnCell) }}>
            <div></div>
            <div className={styles.smallText}>

            </div>
          </div>
          <div className={styles.salesCell} style={{ width: getMinWidth(cellWidths.salesCell) }}>

          </div>
          <div className={styles.revenueCell} style={{ width: getMinWidth(cellWidths.revenueCell) }}>

          </div>
          <div className={styles.avgPriceCell} style={{ width: getMinWidth(cellWidths.avgPriceCell) }}>

          </div>
          <div className={styles.sppCell} style={{ width: getMinWidth(cellWidths.sppCell) }}>
            <span></span>
            <span style={{ marginLeft: '4px' }}></span>
          </div>
          {/* <div className={styles.sppCell}>{data.avg_spp} %</div> */}
          <div className={styles.buyoutCell} style={{ width: getMinWidth(cellWidths.buyoutCell) }}>

          </div>
        </div>
        {/* Self Cost Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.costCell} style={{ width: getMinWidth(cellWidths.costCell) }}>
            <div>

            </div>
            <div className={styles.smallText}>

            </div>
          </div>
          <div className={styles.costPerUnitCell} style={{ width: getMinWidth(cellWidths.costPerUnitCell) }}>

          </div>
        </div>
        {/* Commision & Logisitc Section */}
        <div className={styles.flexContainer}>
          <div className={styles.deliveryCountCell} style={{ width: getMinWidth(cellWidths.deliveryCountCell) }}>

          </div>
          <div className={styles.commissionCell} style={{ width: getMinWidth(cellWidths.commissionCell) }}>
            <div></div>
            <div className={styles.smallText}>
            </div>
          </div>
          <div className={styles.acquiringCell} style={{ width: getMinWidth(cellWidths.acquiringCell) }}>
            <div></div>
            <div className={styles.smallText}>

            </div>
          </div>
          <div className={styles.logisticsCell} style={{ width: getMinWidth(cellWidths.logisticDeliveryCell) }}>

          </div>
          <div className={styles.logisticsCell} style={{ width: getMinWidth(cellWidths.logisticReturnCell) }}>

          </div>
          <div className={styles.logisticsCell} style={{ width: getMinWidth(cellWidths.logisticStorageCell) }}>
            <div></div>
            <div className={styles.smallText}>

            </div>
          </div>
          <div className={styles.logisticsCell} style={{ width: getMinWidth(cellWidths.logisticUnitCell)}}>
          </div>
        </div>
        {/* Compensation and Penalties Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.defectCompnesaitionCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.defectQuantityCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.damageCompensationCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.damageQuantityCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.finesCell)}}>

          </div>
          {/* ?????? */}
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payMoreCell)}}>

          </div>
        </div>
        {/* Another Keep Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.keepCell)}}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.keepOtherCell)}}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payForTakeCell)}}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payWbCell)}}>
            <div></div>
            <div></div>
          </div>
        </div>
        {/* External Expenses Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.selfPurchaseCostCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.externalCostCell)}}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.externalCostAllCell)}}>

          </div>
        </div>
        {/* Tax Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.soldByWbCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.taxBaseCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.taxCell)}}>

          </div>
        </div>
        {/* Finance Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.payToRsCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.pureProfitCell)}}>

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.pureProfitPerUnitCell)}}>

          </div>
          <div
            className={styles.defectCompnesaitionCell}
            style={{ width: getMinWidth(cellWidths.marginProfitCell) }}
          >

          </div>
          <div className={styles.defectCompnesaitionCell} style={{ width: getMinWidth(cellWidths.roiCell)}}>

          </div>
        </div>
    </>
  );
};

export default TableSectionsEmpty;
