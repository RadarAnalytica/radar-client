import { createSlice } from "@reduxjs/toolkit";
import { fetchFilters } from "./filterActions";
import { getSavedActiveWeeks, getSavedActiveMonths } from '@/service/utils';import { actions as shopsActions } from '../shops/shopsSlice';
import { act } from "react";

const initialState = {
    activeBrand: undefined,
    activeBrandName: undefined,
    activeArticle: undefined,
    activeGroup: undefined,
    activeWeeks: undefined,
    activeMonths: undefined,
    activeCategory: undefined,
    skuFrequencyMode: 'Простой', // 'Простой' | 'Продвинутый'
    shops: undefined,
    selectedRange: {
        period: 30
    },
    filters: undefined,
    isFiltersLoaded: false
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
                activeWeeks: getSavedActiveWeeks(action.payload.id),
                activeMonths: getSavedActiveMonths(action.payload.id),
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
            
            if (stateKey === 'activeWeeks') {
                return {
                    ...state,
                    [stateKey]: data,
                }
            }

            if (stateKey === 'activeMonths') {
                return {
                    ...state,
                    [stateKey]: data,
                }
            }
            
            return {
                ...state,
                [stateKey]: data
            }
        }
    },
    extraReducers: (bulder) => {
        bulder.addCase(fetchFilters.fulfilled, (state, action) => {
            const newState = {
                ...state,
                filters: action.payload?.filtersData,
                shops: action.payload?.shops,
                ...action.payload?.initState,
                isFiltersLoaded: true
            };
            return newState;
        });
    }
})

export const { actions, reducer } = apiServicePagesFilterStateSlice;