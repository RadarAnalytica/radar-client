import { createSlice } from "@reduxjs/toolkit";
import { fetchFilters } from "./filterActions";

const initialState = {
    activeBrand: undefined,
    activeBrandName: undefined,
    activeArticle: undefined,
    activeGroup: undefined,
    skuFrequencyMode: 'Простой', // 'Простой' | 'Продвинутый'
    shops: undefined,
    selectedRange: {
        period: 30
    },
    filters: undefined
}



const apiServicePagesFilterStateSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveShop: (state, action) => {
            return {
                ...state,
                activeBrand: action.payload,
                activeBrandName: [{value: 'Все'}],
                activeArticle: [{value: 'Все'}],
                activeGroup: [{id: 0, value: 'Все'}],
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
            if (stateKey === 'activeBrandName') {
                return {
                    ...state,
                    [stateKey]: data,
                    activeGroup: [{value: 'Все', id: 0}],
                    activeArticle: [{value: 'Все', id: 0}]
                }
            }
            if (stateKey === 'activeArticle') {
                return {
                    ...state,
                    [stateKey]: data,
                    activeGroup: [{value: 'Все', id: 0}],
                }
            }
            if (stateKey === 'activeGroup') {
                return {
                    ...state,
                    [stateKey]: data,
                    activeBrandName: [{value: 'Все'}],
                    activeArticle: [{value: 'Все'}],
                }
            }
            
            return {
                ...state,
                [stateKey]: data
            }
        }
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchFilters.fulfilled, (state, action) => {
                return {
                    ...state,
                    filters: action.payload.filtersData,
                    shops: action.payload.shops,
                    ...action.payload.initState
                }
            })
    }
})

export const { actions, reducer } = apiServicePagesFilterStateSlice;