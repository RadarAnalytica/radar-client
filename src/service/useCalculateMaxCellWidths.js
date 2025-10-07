import React from 'react';
import {formatPrice} from '../service/utils';

export const useCalculateMaxCellWidths = (tableData) => {
  return React.useMemo(() => {
    const cellWidths = {
      purchaseCell: 0,
      returnCell: 0,
      salesCell: 0,
      revenueCell: 0,
      avgPriceCell: 0,
      sppCell: 0,
      buyoutCell: 0,
      costCell: 150,
      costPerUnitCell: 0,
      deliveryCountCell: 0,
      commissionCell: 0,
      acquiringCell: 0,
      logisticDeliveryCell: 0,
      logisticReturnCell: 0,
      logisticStorageCell: 0,
      logisticUnitCell: 0,
      defectCompnesaitionCell: 0,
      defectQuantityCell: 0,
      damageCompensationCell: 0,
      damageQuantityCell: 0,
      finesCell: 0,
      payMoreCell: 0,
      keepCell: 0,
      keepOtherCell: 0,
      payForTakeCell: 0,
      payWbCell: 0,
      selfPurchaseCostCell: 0,
      externalCostCell: 0,
      externalCostAllCell: 0,
      soldByWbCell: 0,
      taxBaseCell: 0,
      taxCell: 0,
      payToRsCell: 0,
      pureProfitCell: 0,
      pureProfitPerUnitCell: 0,
      marginProfitCell: 150,
      roiCell: 0,
    };

    Object.values(tableData).forEach(yearData => {
      if (yearData.total) {
        const measureDiv = document.createElement('div');
        measureDiv.style.cssText = 'position: absolute; visibility: hidden; white-space: nowrap;';
        document.body.appendChild(measureDiv);

        // Purchase cell
        const purchasePriceText = `${formatPrice(yearData.total?.purchases?.rub || 0)} ₽`;
        const purchaseQuantityText = `${yearData.data?.purchases?.quantity || 0} шт`;
        measureDiv.textContent = purchasePriceText;
        const purchasePriceWidth = measureDiv.offsetWidth;
        measureDiv.textContent = purchaseQuantityText;
        const purchaseQuantityWidth = measureDiv.offsetWidth;
        cellWidths.purchaseCell = Math.max(cellWidths.purchaseCell, purchasePriceWidth, purchaseQuantityWidth);

         // Return cell
         const returnPriceText = `${formatPrice(yearData.total?.return?.rub || 0)} ₽`;
         const returnQuantityText = `${yearData.total?.return?.quantity || 0} шт`;
         measureDiv.textContent = returnPriceText;
         cellWidths.returnCell = Math.max(cellWidths.returnCell, measureDiv.offsetWidth);

         // Sales cell
         const salesText = `${yearData.total?.revenue?.quantity || 0} шт`;
         measureDiv.textContent = salesText;
         cellWidths.salesCell = Math.max(cellWidths.salesCell, measureDiv.offsetWidth);

         // Revenue cell
         const revenueText = `${formatPrice(yearData.total?.revenue?.rub || 0)} ₽`;
         measureDiv.textContent = revenueText;
         cellWidths.revenueCell = Math.max(cellWidths.revenueCell, measureDiv.offsetWidth);

         // Avg price cell
         const avgPriceText = `${formatPrice(yearData.total?.avg_check || 0)} ₽`;
         measureDiv.textContent = avgPriceText;
         cellWidths.avgPriceCell = Math.max(cellWidths.avgPriceCell, measureDiv.offsetWidth);

         // SPP cell
         const sppText = `${yearData.total?.avg_spp || 0} %`;
         measureDiv.textContent = sppText;
         cellWidths.sppCell = Math.max(cellWidths.sppCell, measureDiv.offsetWidth);

         // Buyout cell
         const buyoutText = `${yearData.total?.purchase_percent || 0} %`;
         measureDiv.textContent = buyoutText;
         cellWidths.buyoutCell = Math.max(cellWidths.buyoutCell, measureDiv.offsetWidth);

        //Self Cost Section
          // Self Cost Cell
          const selfCostText = `${formatPrice(yearData.total?.cost_price || 0)} ₽`;
          const selfCostPerrcentText = `${yearData.total?.cost_price_percent || 0} %`;
          measureDiv.textContent = selfCostText;
          measureDiv.textContent = selfCostPerrcentText;
          cellWidths.costCell = Math.max(cellWidths.costCell, measureDiv.offsetWidth);

          // SelfCostPerUnit Cell
          const selfCostPerUnitText = `${formatPrice(yearData.total?.cost_price_per_unit || 0)} ₽`;
          measureDiv.textContent = selfCostPerUnitText;
          cellWidths.costPerUnitCell = Math.max(cellWidths.costPerUnitCell, measureDiv.offsetWidth);

          // Delivery Count Cell
          const deliveryCountText = `${yearData.total?.deliveries || 0} шт`;
          measureDiv.textContent = deliveryCountText;
          cellWidths.deliveryCountCell = Math.max(cellWidths.deliveryCountCell, measureDiv.offsetWidth);

          //Commission Cell
          const commissionText = `${formatPrice(yearData.total?.wb_commission?.rub || 0)} ₽`;
          const commissionPercentText = `${yearData.total?.wb_commission?.percent || 0} %`;
          measureDiv.textContent = commissionText;
          const commissionRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = commissionPercentText;
          const commissionPercentWidth = measureDiv.offsetWidth;
          cellWidths.commissionCell = Math.max(cellWidths.commissionCell, commissionRubWidth, commissionPercentWidth);

          //Acquiring Cell
          const acquiringText = `${formatPrice(yearData.total?.acquiring.rub || 0)} ₽`;
          const acquiringPercentText = `${yearData.total?.acquiring.percent || 0} %`;
          measureDiv.textContent = acquiringText;
          const acquiringRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = acquiringPercentText;
          const acquiringPercentWidth = measureDiv.offsetWidth;
          cellWidths.acquiringCell = Math.max(cellWidths.acquiringCell, acquiringRubWidth, acquiringPercentWidth);

          //Logistic Delivery Cell
          const logisticDeliveryText = `${formatPrice(yearData.total?.logistics_straight.rub || 0)} ₽`;
          measureDiv.textContent = logisticDeliveryText;
          cellWidths.logisticDeliveryCell = Math.max(cellWidths.logisticDeliveryCell, measureDiv.offsetWidth);

          //Logistic Return Cell
          const logisticReturnText = `${formatPrice(yearData.total?.logistics_reverse.rub || 0)} ₽`;
          measureDiv.textContent = logisticReturnText;
          cellWidths.logisticReturnCell = Math.max(cellWidths.logisticReturnCell, measureDiv.offsetWidth);

          //Logistic Storage Cell
          const logisticStorageText = `${formatPrice(yearData.total?.logistics_total.rub || 0)} ₽`;
          measureDiv.textContent = logisticStorageText;
          cellWidths.logisticStorageCell = Math.max(cellWidths.logisticStorageCell, measureDiv.offsetWidth);

          //Logistic Per Unit Cell
          const logisticPerUnitText = `${formatPrice(yearData.total?.logistics_per_product || 0)} ₽`;
          measureDiv.textContent = logisticPerUnitText;
          cellWidths.logisticUnitCell = Math.max(cellWidths.logisticUnitCell, measureDiv.offsetWidth);

          //Defect Compoensation Cell
          const defectCompensationText = `${formatPrice(yearData.total?.compensation_defects.rub || 0)} ₽`;
          measureDiv.textContent = defectCompensationText;
          cellWidths.defectCompnesaitionCell = Math.max(cellWidths.defectCompnesaitionCell, measureDiv.offsetWidth);

          //Defect Quantity Cell
          const defectQuantText = `${yearData.total?.compensation_defects.quantity || 0} шт`;
          measureDiv.textContent = defectQuantText;
          cellWidths.defectQuantityCell = Math.max(cellWidths.defectQuantityCell, measureDiv.offsetWidth);

          //Demage Compoensation Cell
          const damageCompensationText = `${formatPrice(yearData.total?.compensation_damage.quantity || 0)} ₽`;
          measureDiv.textContent = damageCompensationText;
          cellWidths.damageCompensationCell = Math.max(cellWidths.damageCompensationCell, measureDiv.offsetWidth);

          //Damage Quantity Cell
          const damageQuantText = `${yearData.total?.compensation_damage.rub || 0} шт`;
          measureDiv.textContent = damageQuantText;
          cellWidths.damageQuantityCell = Math.max(cellWidths.damageQuantityCell, measureDiv.offsetWidth);

          //Fines Cell
          const finesText = `${formatPrice(yearData.total?.compensation_penalties.rub || 0)} ₽`;
          measureDiv.textContent = finesText;
          cellWidths.finesCell = Math.max(cellWidths.finesCell, measureDiv.offsetWidth);

          //Pay more Cell
          const payMoreText = `${formatPrice(yearData.total?.compensation_penalties.rub || 0)} ₽`;
          measureDiv.textContent = payMoreText;
          cellWidths.payMoreCell = Math.max(cellWidths.payMoreCell, measureDiv.offsetWidth);

          //Keep Cell
          const keepText = `${formatPrice(yearData.total?.storage.rub || 0)} ₽`;
          const keepPercentText = `${yearData.total?.storage.percent || 0} %`;
          measureDiv.textContent = keepText;
          const keepRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = keepPercentText;
          const keepPercentWidth = measureDiv.offsetWidth;
          cellWidths.keepCell = Math.max(cellWidths.keepCell, keepRubWidth, keepPercentWidth);

          //Keep other Cell
          const otherKeepText = `${formatPrice(yearData.total?.other_retentions.rub || 0)} ₽`;
          const otherKeepPercentText = `${yearData.total?.other_retentions.percent || 0} %`;
          measureDiv.textContent = otherKeepText;
          const otherKeepRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = otherKeepPercentText;
          const otherKeepPercentWidth = measureDiv.offsetWidth;
          cellWidths.keepOtherCell = Math.max(cellWidths.keepOtherCell, otherKeepRubWidth, otherKeepPercentWidth);

          //Pay For Take Cell
          const payForText = `${formatPrice(yearData.total?.acceptance.rub || 0)} ₽`;
          const payForPercentText = `${yearData.total?.acceptance.percent || 0} %`;
          measureDiv.textContent = payForText;
          const payForRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = payForPercentText;
          const payForPercentWidth = measureDiv.offsetWidth;
          cellWidths.payForTakeCell = Math.max(cellWidths.payForTakeCell, payForRubWidth, payForPercentWidth);

          //Pay WB Cell
          const payWbText = `${formatPrice(yearData.total?.wb_commission.rub || 0)} ₽`;
          const payWbPercentText = `${yearData.total?.wb_commission.percent || 0} %`;
          measureDiv.textContent = payWbText;
          const payWbRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = payWbPercentText;
          const payWbPercentWidth = measureDiv.offsetWidth;
          cellWidths.payWbCell = Math.max(cellWidths.payWbCell, payWbRubWidth, payWbPercentWidth);

          //Self Purchase Cost Cell
          const selfPurchaseCostCellText = `${formatPrice(yearData.total?.self_purchase_costs || 0)} ₽`;
          measureDiv.textContent = selfPurchaseCostCellText;
          cellWidths.selfPurchaseCostCell = Math.max(cellWidths.selfPurchaseCostCell, measureDiv.offsetWidth);

          //External Purchase Cost Cell
          const externalPurchaseCostCellText = `${formatPrice(yearData.total?.external_expenses || 0)} ₽`;
          const externalPurchaseCostCellPercentText = `${yearData.total?.expenses_percent || 0} %`;
          measureDiv.textContent = externalPurchaseCostCellText;
          const externalPurchaseCostCellRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = externalPurchaseCostCellPercentText;
          const externalPurchaseCostCellPercentWidth = measureDiv.offsetWidth;
          cellWidths.externalCostCell = Math.max(cellWidths.externalCostCell, externalPurchaseCostCellRubWidth, externalPurchaseCostCellPercentWidth);

          //External Cost Total Cell
          const externalCostTotalCellText = `${formatPrice(yearData.total?.expenses || 0)} ₽`;
          measureDiv.textContent = externalCostTotalCellText;
          const externalCostTotalCellWidth = measureDiv.offsetWidth;
          cellWidths.externalCostAllCell = Math.max(cellWidths.externalCostAllCell, externalCostTotalCellWidth);

          //Sold by WB Cell
          const soldByWbCellText = `${formatPrice(yearData.total?.sold_by_wb || 0)} ₽`;
          measureDiv.textContent = soldByWbCellText;
          const soldByWbCellWidth = measureDiv.offsetWidth;
          cellWidths.soldByWbCell = Math.max(cellWidths.soldByWbCell, soldByWbCellWidth);

          //Tax Base Cell
          const taxBaseCellText = `${formatPrice(yearData.total?.tax_base || 0)} ₽`;
          measureDiv.textContent = taxBaseCellText;
          const taxBaseCellWidth = measureDiv.offsetWidth;
          cellWidths.taxBaseCell = Math.max(cellWidths.taxBaseCell, taxBaseCellWidth);

          //Tax Cell
          const taxCellText = `${formatPrice(yearData.total?.tax || 0)} ₽`;
          measureDiv.textContent = taxCellText;
          const taxCellWidth = measureDiv.offsetWidth;
          cellWidths.taxCell = Math.max(cellWidths.taxCell, taxCellWidth);

          //Pay to RS Cell
          const payToRsCellText = `${formatPrice(yearData.total?.payment || 0)} ₽`;
          measureDiv.textContent = payToRsCellText;
          const payToRsCellWidth = measureDiv.offsetWidth;
          cellWidths.payToRsCell = Math.max(cellWidths.payToRsCell, payToRsCellWidth);

          //Pure Profit Cell
          const pureProfitCellText = `${formatPrice(yearData.total?.profit || 0)} ₽`;
          measureDiv.textContent = pureProfitCellText;
          const pureProfitCellWidth = measureDiv.offsetWidth;
          cellWidths.pureProfitCell = Math.max(cellWidths.pureProfitCell, pureProfitCellWidth);

          //Pure Profit Per Unit Cell
          const pureProfitPerUnitCellText = `${formatPrice(yearData.total?.profit_per_one || 0)} ₽`;
          measureDiv.textContent = pureProfitPerUnitCellText;
          const pureProfitPerUnitCellWidth = measureDiv.offsetWidth;
          cellWidths.pureProfitPerUnitCell = Math.max(cellWidths.pureProfitPerUnitCell, pureProfitPerUnitCellWidth);

          //Margin Profit Cell
          const marginRofitCellText = `${formatPrice(yearData.total?.marginality || 0)} ₽`;
          measureDiv.textContent = marginRofitCellText;
          const marginRofitCellWidth = measureDiv.offsetWidth;
          cellWidths.marginProfitCell = Math.max(cellWidths.marginProfitCell, marginRofitCellWidth);

          //ROI Cell
          const roiCellText = `${yearData.total?.return_on_investment || 0} %`;
          measureDiv.textContent = roiCellText;
          const roiCellWidth = measureDiv.offsetWidth;
          cellWidths.roiCell = Math.max(cellWidths.roiCell, roiCellWidth);


        document.body.removeChild(measureDiv);
      }

      Object.values(yearData.months).forEach(monthData => {
        Object.values(monthData.weeks).forEach(weekData => {
          const measureDiv = document.createElement('div');
          measureDiv.style.cssText = 'position: absolute; visibility: hidden; white-space: nowrap;';
          document.body.appendChild(measureDiv);

          // Purchase cell
          const purchasePriceText = `${formatPrice(weekData.data?.purchases?.rub || 0)} ₽`;
          const purchaseQuantityText = `${weekData.data?.purchases?.quantity || 0} шт`;
          measureDiv.textContent = purchasePriceText;
          const purchasePriceWidth = measureDiv.offsetWidth;
          measureDiv.textContent = purchaseQuantityText;
          const purchaseQuantityWidth = measureDiv.offsetWidth;
          cellWidths.purchaseCell = Math.max(cellWidths.purchaseCell, purchasePriceWidth, purchaseQuantityWidth);

          // Return cell
          const returnPriceText = `${formatPrice(weekData.data?.return?.rub || 0)} ₽`;
          const returnQuantityText = `${weekData.data?.return?.quantity || 0} шт`;
          measureDiv.textContent = returnPriceText;
          cellWidths.returnCell = Math.max(cellWidths.returnCell, measureDiv.offsetWidth);

          // Sales cell
          const salesText = `${weekData.data?.revenue?.quantity || 0} шт`;
          measureDiv.textContent = salesText;
          cellWidths.salesCell = Math.max(cellWidths.salesCell, measureDiv.offsetWidth);

          // Revenue cell
          const revenueText = `${formatPrice(weekData.data?.revenue?.rub || 0)} ₽`;
          measureDiv.textContent = revenueText;
          cellWidths.revenueCell = Math.max(cellWidths.revenueCell, measureDiv.offsetWidth);

          // Avg price cell
          const avgPriceText = `${formatPrice(weekData.data?.avg_check || 0)} ₽`;
          measureDiv.textContent = avgPriceText;
          cellWidths.avgPriceCell = Math.max(cellWidths.avgPriceCell, measureDiv.offsetWidth);

          // SPP cell
          const sppText = `${weekData.data?.avg_spp || 0} %`;
          measureDiv.textContent = sppText;
          cellWidths.sppCell = Math.max(cellWidths.sppCell, measureDiv.offsetWidth);

          // Buyout cell
          const buyoutText = `${weekData.data?.purchase_percent || 0} %`;
          measureDiv.textContent = buyoutText;
          cellWidths.buyoutCell = Math.max(cellWidths.buyoutCell, measureDiv.offsetWidth);

          //Self Cost Section
          // Self Cost Cell
          const selfCostText = `${formatPrice(weekData.data?.cost_price || 0)} ₽`;
          const selfCostPerrcentText = `${weekData.data?.cost_price_percent || 0} %`;
          measureDiv.textContent = selfCostText;
          measureDiv.textContent = selfCostPerrcentText;
          cellWidths.costCell = Math.max(cellWidths.costCell, measureDiv.offsetWidth);

          // SelfCostPerUnit Cell
          const selfCostPerUnitText = `${formatPrice(weekData.data?.cost_price_per_unit || 0)} ₽`;
          measureDiv.textContent = selfCostPerUnitText;
          cellWidths.costPerUnitCell = Math.max(cellWidths.costPerUnitCell, measureDiv.offsetWidth);

          // Delivery Count Cell
          const deliveryCountText = `${weekData.data?.deliveries || 0} шт`;
          measureDiv.textContent = deliveryCountText;
          cellWidths.deliveryCountCell = Math.max(cellWidths.deliveryCountCell, measureDiv.offsetWidth);

          //Commission Cell
          const commissionText = `${formatPrice(weekData.data?.wb_commission?.rub || 0)} ₽`;
          const commissionPercentText = `${weekData.data?.wb_commission?.percent || 0} %`;
          measureDiv.textContent = commissionText;
          const commissionRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = commissionPercentText;
          const commissionPercentWidth = measureDiv.offsetWidth;
          cellWidths.commissionCell = Math.max(cellWidths.commissionCell, commissionRubWidth, commissionPercentWidth);

          //Acquiring Cell
          const acquiringText = `${formatPrice(weekData.data?.acquiring.rub || 0)} ₽`;
          const acquiringPercentText = `${weekData.data?.acquiring.percent || 0} %`;
          measureDiv.textContent = acquiringText;
          const acquiringRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = acquiringPercentText;
          const acquiringPercentWidth = measureDiv.offsetWidth;
          cellWidths.acquiringCell = Math.max(cellWidths.acquiringCell, acquiringRubWidth, acquiringPercentWidth);

          //Logistic Delivery Cell
          const logisticDeliveryText = `${formatPrice(weekData.data?.logistics_straight.rub || 0)} ₽`;
          measureDiv.textContent = logisticDeliveryText;
          cellWidths.logisticDeliveryCell = Math.max(cellWidths.logisticDeliveryCell, measureDiv.offsetWidth);

          //Logistic Return Cell
          const logisticReturnText = `${formatPrice(weekData.data?.logistics_reverse.rub || 0)} ₽`;
          measureDiv.textContent = logisticReturnText;
          cellWidths.logisticReturnCell = Math.max(cellWidths.logisticReturnCell, measureDiv.offsetWidth);

          //Logistic Storage Cell
          const logisticStorageText = `${formatPrice(weekData.data?.logistics_total.rub || 0)} ₽`;
          measureDiv.textContent = logisticStorageText;
          cellWidths.logisticStorageCell = Math.max(cellWidths.logisticStorageCell, measureDiv.offsetWidth);

          //Logistic Per Unit Cell
          const logisticPerUnitText = `${formatPrice(weekData.data?.logistics_per_product || 0)} ₽`;
          measureDiv.textContent = logisticPerUnitText;
          cellWidths.logisticUnitCell = Math.max(cellWidths.logisticUnitCell, measureDiv.offsetWidth);

          //Defect Compoensation Cell
          const defectCompensationText = `${formatPrice(weekData.data?.compensation_defects.rub || 0)} ₽`;
          measureDiv.textContent = defectCompensationText;
          cellWidths.defectCompnesaitionCell = Math.max(cellWidths.defectCompnesaitionCell, measureDiv.offsetWidth);

          //Defect Quantity Cell
          const defectQuantText = `${weekData.data?.compensation_defects.quantity || 0} шт`;
          measureDiv.textContent = defectQuantText;
          cellWidths.defectQuantityCell = Math.max(cellWidths.defectQuantityCell, measureDiv.offsetWidth);

          //Demage Compoensation Cell
          const damageCompensationText = `${formatPrice(weekData.data?.compensation_damage.quantity || 0)} ₽`;
          measureDiv.textContent = damageCompensationText;
          cellWidths.damageCompensationCell = Math.max(cellWidths.damageCompensationCell, measureDiv.offsetWidth);

          //Damage Quantity Cell
          const damageQuantText = `${weekData.data?.compensation_damage.rub || 0} шт`;
          measureDiv.textContent = damageQuantText;
          cellWidths.damageQuantityCell = Math.max(cellWidths.damageQuantityCell, measureDiv.offsetWidth);

          //Fines Cell
          const finesText = `${formatPrice(weekData.data?.compensation_penalties.rub || 0)} ₽`;
          measureDiv.textContent = finesText;
          cellWidths.finesCell = Math.max(cellWidths.finesCell, measureDiv.offsetWidth);

          //Pay more Cell
          const payMoreText = `${formatPrice(weekData.data?.compensation_penalties.quantity || 0)} ₽`;
          measureDiv.textContent = payMoreText;
          cellWidths.payMoreCell = Math.max(cellWidths.payMoreCell, measureDiv.offsetWidth);

          //Keep Cell
          const keepText = `${formatPrice(weekData.data?.storage.rub || 0)} ₽`;
          const keepPercentText = `${weekData.data?.storage.percent || 0} %`;
          measureDiv.textContent = keepText;
          const keepRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = keepPercentText;
          const keepPercentWidth = measureDiv.offsetWidth;
          cellWidths.keepCell = Math.max(cellWidths.keepCell, keepRubWidth, keepPercentWidth);

          //Keep other Cell
          const otherKeepText = `${formatPrice(weekData.data?.other_retentions.rub || 0)} ₽`;
          const otherKeepPercentText = `${weekData.data?.other_retentions.percent || 0} %`;
          measureDiv.textContent = otherKeepText;
          const otherKeepRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = otherKeepPercentText;
          const otherKeepPercentWidth = measureDiv.offsetWidth;
          cellWidths.keepOtherCell = Math.max(cellWidths.keepOtherCell, otherKeepRubWidth, otherKeepPercentWidth);

          //Pay For Take Cell
          const payForText = `${formatPrice(weekData.data?.acceptance.rub || 0)} ₽`;
          const payForPercentText = `${weekData.data?.acceptance.percent || 0} %`;
          measureDiv.textContent = payForText;
          const payForRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = payForPercentText;
          const payForPercentWidth = measureDiv.offsetWidth;
          cellWidths.payForTakeCell = Math.max(cellWidths.payForTakeCell, payForRubWidth, payForPercentWidth);

          //Pay WB Cell
          const payWbText = `${formatPrice(weekData.data?.wb_commission.rub || 0)} ₽`;
          const payWbPercentText = `${weekData.data?.wb_commission.percent || 0} %`;
          measureDiv.textContent = payWbText;
          const payWbRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = payWbPercentText;
          const payWbPercentWidth = measureDiv.offsetWidth;
          cellWidths.payWbCell = Math.max(cellWidths.payWbCell, payWbRubWidth, payWbPercentWidth);

          //Self Purchase Cost Cell
          const selfPurchaseCostCellText = `${formatPrice(weekData.data?.self_purchase_costs || 0)} ₽`;
          measureDiv.textContent = selfPurchaseCostCellText;
          cellWidths.selfPurchaseCostCell = Math.max(cellWidths.selfPurchaseCostCell, measureDiv.offsetWidth);

          //External Purchase Cost Cell
          const externalPurchaseCostCellText = `${formatPrice(weekData.data?.external_expenses || 0)} ₽`;
          const externalPurchaseCostCellPercentText = `${weekData.data?.expenses_percent || 0} %`;
          measureDiv.textContent = externalPurchaseCostCellText;
          const externalPurchaseCostCellRubWidth = measureDiv.offsetWidth;
          measureDiv.textContent = externalPurchaseCostCellPercentText;
          const externalPurchaseCostCellPercentWidth = measureDiv.offsetWidth;
          cellWidths.externalCostCell = Math.max(cellWidths.externalCostCell, externalPurchaseCostCellRubWidth, externalPurchaseCostCellPercentWidth);

          //External Cost Total Cell
          const externalCostTotalCellText = `${formatPrice(weekData.data?.expenses || 0)} ₽`;
          measureDiv.textContent = externalCostTotalCellText;
          const externalCostTotalCellWidth = measureDiv.offsetWidth;
          cellWidths.externalCostAllCell = Math.max(cellWidths.externalCostAllCell, externalCostTotalCellWidth);

          //Sold by WB Cell
          const soldByWbCellText = `${formatPrice(weekData.data?.sold_by_wb || 0)} ₽`;
          measureDiv.textContent = soldByWbCellText;
          const soldByWbCellWidth = measureDiv.offsetWidth;
          cellWidths.soldByWbCell = Math.max(cellWidths.soldByWbCell, soldByWbCellWidth);

          //Tax Base Cell
          const taxBaseCellText = `${formatPrice(weekData.data?.tax_base || 0)} ₽`;
          measureDiv.textContent = taxBaseCellText;
          const taxBaseCellWidth = measureDiv.offsetWidth;
          cellWidths.taxBaseCell = Math.max(cellWidths.taxBaseCell, taxBaseCellWidth);

          //Tax Cell
          const taxCellText = `${formatPrice(weekData.data?.tax || 0)} ₽`;
          measureDiv.textContent = taxCellText;
          const taxCellWidth = measureDiv.offsetWidth;
          cellWidths.taxCell = Math.max(cellWidths.taxCell, taxCellWidth);

          //Pay to RS Cell
          const payToRsCellText = `${formatPrice(weekData.data?.payment || 0)} ₽`;
          measureDiv.textContent = payToRsCellText;
          const payToRsCellWidth = measureDiv.offsetWidth;
          cellWidths.payToRsCell = Math.max(cellWidths.payToRsCell, payToRsCellWidth);

          //Pure Profit Cell
          const pureProfitCellText = `${formatPrice(weekData.data?.profit || 0)} ₽`;
          measureDiv.textContent = pureProfitCellText;
          const pureProfitCellWidth = measureDiv.offsetWidth;
          cellWidths.pureProfitCell = Math.max(cellWidths.pureProfitCell, pureProfitCellWidth);

          //Pure Profit Per Unit Cell
          const pureProfitPerUnitCellText = `${formatPrice(weekData.data?.profit_per_one || 0)} ₽`;
          measureDiv.textContent = pureProfitPerUnitCellText;
          const pureProfitPerUnitCellWidth = measureDiv.offsetWidth;
          cellWidths.pureProfitPerUnitCell = Math.max(cellWidths.pureProfitPerUnitCell, pureProfitPerUnitCellWidth);

          //Margin Profit Cell
          const marginRofitCellText = `${formatPrice(weekData.data?.marginality || 0)} ₽`;
          measureDiv.textContent = marginRofitCellText;
          const marginRofitCellWidth = measureDiv.offsetWidth;
          cellWidths.marginProfitCell = Math.max(cellWidths.marginProfitCell, marginRofitCellWidth);

          //ROI Cell
          const roiCellText = `${weekData.data?.return_on_investment || 0} %`;
          measureDiv.textContent = roiCellText;
          const roiCellWidth = measureDiv.offsetWidth;
          cellWidths.roiCell = Math.max(cellWidths.roiCell, roiCellWidth);


          document.body.removeChild(measureDiv);
        });
      });
    });

    // Add padding to all widths
    Object.keys(cellWidths).forEach(key => {
      cellWidths[key] += 26;
    });

    return cellWidths;
  }, [tableData]);
};
