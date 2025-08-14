import { createSlice } from "@reduxjs/toolkit";
import { fetchRnpFilters } from "./filterRnpActions";

const initialState = {
    activeBrand: undefined,
    activeBrandName: undefined,
    activeArticle: undefined,
    activeGroup: undefined,
    activeCategory: undefined,
    shops: undefined,
    selectedRange: {
        period: 30
    },
    filters: undefined
}



const filtersRnpSlice = createSlice({
    name: 'filtersRnp',
    initialState,
    reducers: {
        setActiveShop: (state, action) => {
            return {
                ...state,
                activeBrand: action.payload,
                activeBrandName: [{value: 'Все'}],
                activeArticle: [{value: 'Все'}],
                activeGroup: [{id: 0, value: 'Все'}],
                activeCategory: [{value: 'Все'}]
            }
        },
        setPeriod: (state, action) => {
            return {
                ...state,
                selectedRange: action.payload
            }
        },
        setActiveFilters: (state, action) => {
            const { stateKey, data } = action.payload;
            if (stateKey === 'activeBrandName') {
                return {
                    ...state,
                    [stateKey]: data,
                    activeGroup: [{value: 'Все', id: 0}],
                    activeArticle: [{value: 'Все', id: 0}],
                    activeCategory: [{value: 'Все'}]
                }
            }
            if (stateKey === 'activeArticle') {
                return {
                    ...state,
                    [stateKey]: data,
                    activeGroup: [{value: 'Все', id: 0}]
                }
            }
            if (stateKey === 'activeGroup') {
                return {
                    ...state,
                    [stateKey]: data,
                    activeBrandName: [{value: 'Все'}],
                    activeArticle: [{value: 'Все'}],
                    activeCategory: [{value: 'Все'}]
                }
            }
            
            if (stateKey === 'activeCategory') {
                return {
                    ...state,
                    [stateKey]: data,
                    activeBrandName: [{value: 'Все'}],
                    activeArticle: [{value: 'Все'}],
                    activeGroup: [{value: 'Все', id: 0}]
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
            .addCase(fetchRnpFilters.fulfilled, (state, action) => {
                return {
                    ...state,
                    filters: action.payload.filtersData,
                    shops: action.payload.shops,
                    ...action.payload.initState
                }
            })
    }
})

export const { actions, reducer } = filtersRnpSlice;