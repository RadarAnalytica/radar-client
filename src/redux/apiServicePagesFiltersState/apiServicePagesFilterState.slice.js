import { createSlice } from "@reduxjs/toolkit";
import { fetchFilters } from "./filterActions";

const initialState = {
    activeBrand: null,
    skuFrequencyMode: 'Простой', // 'Простой' | 'Продвинутый'
    selectedRange: {
        period: 30
    },
    filters: null
}



const apiServicePagesFilterStateSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveShop: (state, action) => {
            return {
                ...state,
                activeBrand: action.payload
            }
        },
        setPeriod: (state, action) => {
            return {
                ...state,
                selectedRange: action.payload
            }
        },
        setSkuFrequencyMode: (state, action) => {
            return {
                ...state,
                skuFrequencyMode: action.payload
            }
        },
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
            })
    }
})

export const { actions, reducer } = apiServicePagesFilterStateSlice;