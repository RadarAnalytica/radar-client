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

const mockOptions = [
    { value: 'Все бренды' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
]


const initialState = {
    supplierCurrentBrand: 'Все бренды',
    ordersStructureTab: 'По складам (последние 30 дней)',
    stockChartTab: 'Входящие заказы',
    supplierBrands: mockOptions,
    mainSupplierData: undefined,
    compareSupplierData: {
        "supplier_id": 250012340,
        "name": "环 球 智 慧 供 应 链 （ 深 圳 ） 有 限 公 司 后 海 分 公",
        "full_name": "Global Smart Supply Chain (Shenzhen) Co., Ltd. Houhai Branch",
        "trademark": "China Express UNIMALL"
    },
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
        data: undefined
    },
    byBrandsTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    bySubjectsTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    byWarehousesTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        data: undefined
    },
    bySizesTableData: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
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
                supplierCurrentBrand: action.payload
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
                state.byBrandsTableData.data = action.payload;
            })
            .addCase(fetchSupplierAnalysisBySubjectsTableData.fulfilled, (state, action) => {
                state.bySubjectsTableData.data = action.payload;
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