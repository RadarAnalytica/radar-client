import { createSlice } from "@reduxjs/toolkit";
import { fetchSkuAnalysisMainChartData } from './skuAnalysisActions'

const initialState = {
    skuSearchHistory: [],
    skuMainData: null,
    skuChartData: null
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
        }
    },
    extraReducers: (bulder) => {
        bulder.addCase(fetchSkuAnalysisMainChartData.fulfilled, (state, action) => {
                state.skuChartData = action.payload;
        })
    }
});

export const { reducer, actions } = skuAnalysisSlice;