import { createSlice } from "@reduxjs/toolkit";
import { fetchFilters } from "./filterActions";

const initialState = {
    activeBrand: null,
    activeBrandName: null,
    activeArticle: null,
    activeGroup: null,
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
        setActiveFilters: (state, action) => {
            const { stateKey, data } = action.payload;
            return {
                ...state,
                [stateKey]: data
            }
        }
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
            })
    }
})

export const { actions, reducer } = apiServicePagesFilterStateSlice;