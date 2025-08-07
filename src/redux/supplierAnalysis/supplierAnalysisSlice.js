import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSupplierAnalysisMetaData,
    fetchSupplierAnalysisIndicatorsData,
    fetchSupplierAnalysisMainChartData,
    fetchSupplierAnalysisByDatesTableData,
    fetchSupplierAnalysisBrandsData,
    fetchSupplierAnalysisByBrandTableData,
    fetchSupplierAnalysisBySubjectsTableData,
    fetchSupplierAnalysisByWarehousesTableData,
    fetchSupplierAnalysisBySizesTableData,
    fetchSupplierAnalysisByWharehousesComparsionData,
    fetchSupplierAnalysisByIncomingOrdersComparsionData,
    fetchSupplierAnalysisByOrderedProductsComparsionData,
    fetchSupplierAnalysisByAvgPricesComparsionData,
    fetchSupplierAnalysisByAvgDiscountsComparsionData,
    fetchSupplierAnalysisByStockSizeComparsionData
} from "./supplierAnalysisActions";


const initialState = {
    supplierCurrentBrand: 0,
    ordersStructureTab: 'По складам (последние 30 дней)',
    stockChartTab: 'Входящие заказы',
    supplierBrands: undefined,
    mainSupplierData: undefined,
    compareSupplierData: undefined,
    metaData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    indicatorsData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    mainChartData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    byDatesTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        pagination: undefined,
        sort: undefined,
        data: undefined
    },
    byBrandsTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        sort: undefined,
        pagination: {
            page: 1,
            limit: 25,
            total: 25,
        },
        data: undefined
    },
    bySubjectsTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        sort: undefined,
        pagination: {
            page: 1,
            limit: 25,
            total: 25,
        },
        data: undefined
    },
    byWarehousesTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        sort: undefined,
        pagination: undefined,
        data: undefined
    },
    bySizesTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        sort: undefined,
        pagination: undefined,
        data: undefined
    },
    byWharehousesComparsionData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    byIncomingOrdersComparsionData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    byOrderedProductsComparsionData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    byAvgPricesComparsionData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    byAvgDiscountsComparsionData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    byStockSizeComparsionData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
};

const supplierAnalysisSlice = createSlice({
    name: "supplierAnalysis",
    initialState,
    reducers: {
        setSupplierMainData: (state, action) => {
            return {
                ...state,
                mainSupplierData: action.payload
            }
        },
        setSupplierCompareData: (state, action) => {
            return {
                ...state,
                compareSupplierData: action.payload
            }
        },
        setSupplierCurrentBrand: (state, action) => {
            return {
                ...state,
                supplierCurrentBrand: action.payload,
                byBrandsTableData: {
                    ...state.byBrandsTableData,
                    pagination: {
                        page: 1,
                        limit: 25,
                        total: 25
                    },
                    sort: {}
                }
            }
        },
        setOrdersStructureTab: (state, action) => {
            return {
                ...state,
                ordersStructureTab: action.payload
            }
        },
        setStockChartTab: (state, action) => {
            return {
                ...state,
                stockChartTab: action.payload
            }
        },
        setDataFetchingStatus: (state, action) => {
            const { dataType, statusObject } = action.payload;
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    ...statusObject
                }
            }
        },
        setPagination: (state, action) => {
            const { dataType, pagination } = action.payload;
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    pagination: pagination
                }
            }
        },
        setSort: (state, action) => {
            const { dataType, sort } = action.payload;
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    sort: sort,
                    pagination: {
                        page: 1,
                        limit: 25,
                        total: 25
                    }
                }
            }
        },
        resetState: () => {
            return {
               ...initialState
            }
        }
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchSupplierAnalysisMetaData.fulfilled, (state, action) => {
                state.metaData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisIndicatorsData.fulfilled, (state, action) => {
                state.indicatorsData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisMainChartData.fulfilled, (state, action) => {
                state.mainChartData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisByDatesTableData.fulfilled, (state, action) => {
                state.byDatesTableData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisBrandsData.fulfilled, (state, action) => {
                state.supplierBrands = action.payload;
                state.supplierCurrentBrand = 0
            })
            .addCase(fetchSupplierAnalysisByBrandTableData.fulfilled, (state, action) => {
                state.byBrandsTableData.data = action.payload.data;
                state.byBrandsTableData.pagination.total = action.payload.pagination.total
            })
            .addCase(fetchSupplierAnalysisBySubjectsTableData.fulfilled, (state, action) => {
                state.bySubjectsTableData.data = action.payload.data;
                state.bySubjectsTableData.pagination.total = action.payload.pagination.total
            })
            .addCase(fetchSupplierAnalysisByWarehousesTableData.fulfilled, (state, action) => {
                state.byWarehousesTableData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisBySizesTableData.fulfilled, (state, action) => {
                state.bySizesTableData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisByWharehousesComparsionData.fulfilled, (state, action) => {
                state.byWharehousesComparsionData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisByIncomingOrdersComparsionData.fulfilled, (state, action) => {
                state.byIncomingOrdersComparsionData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisByOrderedProductsComparsionData.fulfilled, (state, action) => {
                state.byOrderedProductsComparsionData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisByAvgPricesComparsionData.fulfilled, (state, action) => {
                state.byAvgPricesComparsionData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisByAvgDiscountsComparsionData.fulfilled, (state, action) => {
                state.byAvgDiscountsComparsionData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisByStockSizeComparsionData.fulfilled, (state, action) => {
                state.byStockSizeComparsionData.data = action.payload;
            })
    }
});

export const { reducer, actions } = supplierAnalysisSlice;