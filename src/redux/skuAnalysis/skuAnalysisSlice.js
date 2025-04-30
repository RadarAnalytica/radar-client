import { createSlice } from "@reduxjs/toolkit";
import { fetchSkuAnalysisMainChartData, fetchSkuAnalysisSkuData, fetchSkuAnalysisIndicatorsData, fetchSkuAnalysisMainTableData, fetchSkuAnalysisByColorTableData, fetchSkuAnalysisByWarehousesTableData, fetchSkuAnalysisBySizeTableData } from './skuAnalysisActions'

const initialState = {
    skuSearchHistory: [],
    dataStatus: {
        isLoading: true,
        isError: false,
        message: ''
    },
    skuMainData: null,
    skuChartData: null,
    skuIndicatorsData: null,
    skuMainTableData: null,
    skuByColorTableData: null,
    skuByWarehouseTableData: null,
    skuBySizeTableData: null,
};

const skuAnalysisSlice = createSlice({
    name: "skuAnalysis",
    initialState,
    reducers: {
        skuSearchHistoryAdd: (state, action) => {
            if (state.skuSearchHistory.some(_ => _ === action.payload)) {
                return state
            } else {
                return {
                    ...state,
                    skuSearchHistory: [...state.skuSearchHistory, action.payload]
                }
            }
        },
        deleteSkuFromHistory: (state, action) => {
            const newHistory = state.skuSearchHistory;
            const currId = newHistory.findIndex(_ => _ === action.payload)

            if (currId !== -1) {
                newHistory.splice(currId, 1)
                return {
                    ...state,
                    skuSearchHistory: newHistory
                }
            }
        },
        resetSkuSearchHistory: (state) => {
            return {
                ...state,
                skuSearchHistory: [],
            }
        },
        setSkuMainData: (state, action) => {
            return {
                ...state,
                skuMainData: action.payload
            }
        },
        setDataStatus: (state, action) => {
            return {
                ...state,
                dataStatus: action.payload
            }
        }
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchSkuAnalysisMainChartData.fulfilled, (state, action) => {
                    state.skuChartData = action.payload;
            })
            .addCase(fetchSkuAnalysisSkuData.fulfilled, (state, action) => {
                    state.skuMainData = action.payload;
            })
            .addCase(fetchSkuAnalysisIndicatorsData.fulfilled, (state, action) => {
                    state.skuIndicatorsData = action.payload;
            })
            .addCase(fetchSkuAnalysisMainTableData.fulfilled, (state, action) => {
                    state.skuMainTableData = action.payload;
            })
            .addCase(fetchSkuAnalysisByColorTableData.fulfilled, (state, action) => {
                    state.skuByColorTableData = action.payload;
            })
            .addCase(fetchSkuAnalysisByWarehousesTableData.fulfilled, (state, action) => {
                    state.skuByWarehouseTableData = action.payload;
            })
            .addCase(fetchSkuAnalysisBySizeTableData.fulfilled, (state, action) => {
                    state.skuBySizeTableData = action.payload;
            })
    }
});

export const { reducer, actions } = skuAnalysisSlice;