import { createSelector } from '@reduxjs/toolkit';

// Базовые селекторы
const selectSupplierAnalysisState = (state) => state.supplierAnalysis;

// Мемоизированные селекторы
export const selectStockChartTab = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.stockChartTab
);

export const selectOrdersStructureTab = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.ordersStructureTab
);

export const selectSupplierCurrentBrand = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.supplierCurrentBrand
);

export const selectMainSupplierData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.mainSupplierData
);

export const selectCompareSupplierData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.compareSupplierData
);

export const selectSupplierBrands = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.supplierBrands
);

// Селекторы для данных с состоянием загрузки
export const selectMetaData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.metaData
);

export const selectIndicatorsData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.indicatorsData
);

export const selectMainChartData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.mainChartData
);

export const selectByDatesTableData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byDatesTableData
);

export const selectByBrandsTableData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byBrandsTableData
);

export const selectBySubjectsTableData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.bySubjectsTableData
);

export const selectByWarehousesTableData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byWarehousesTableData
);

export const selectBySizesTableData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.bySizesTableData
);

export const selectByWharehousesComparsionData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byWharehousesComparsionData
);

export const selectByIncomingOrdersComparsionData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byIncomingOrdersComparsionData
);

export const selectByOrderedProductsComparsionData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byOrderedProductsComparsionData
);

export const selectByAvgPricesComparsionData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byAvgPricesComparsionData
);

export const selectByAvgDiscountsComparsionData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byAvgDiscountsComparsionData
);

export const selectByStockSizeComparsionData = createSelector(
    [selectSupplierAnalysisState],
    (supplierAnalysis) => supplierAnalysis.byStockSizeComparsionData
);

// Мемоизированный селектор для динамического доступа к данным по dataType
export const selectSupplierAnalysisDataByType = createSelector(
    [selectSupplierAnalysisState, (_, dataType) => dataType],
    (supplierAnalysis, dataType) => supplierAnalysis[dataType]
);
