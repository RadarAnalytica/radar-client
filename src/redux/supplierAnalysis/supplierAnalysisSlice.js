import { createSlice } from "@reduxjs/toolkit";
import { fetchSupplierAnalysisMetaData, fetchSupplierAnalysisIndicatorsData, fetchSupplierAnalysisMainChartData, fetchSupplierAnalysisByDatesTableData, fetchSupplierAnalysisBrandsData } from "./supplierAnalysisActions";

const mockOptions = [
    { value: 'Все бренды' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
]


const initialState = {
    supplierCurrentBrand: 'Все бренды',
    ordersStructureTab: 'По группам цветов',
    stockChartTab: 'Входящие заказы',
    supplierBrands: mockOptions,
    mainSupplierData: undefined,
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
    }
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
    }
});

export const { reducer, actions } = supplierAnalysisSlice;