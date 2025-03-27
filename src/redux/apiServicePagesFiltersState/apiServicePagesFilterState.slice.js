import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeBrand: null,
    selectedRange: {
        period: 30
    }
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
        }
    }
})

export const { actions, reducer } = apiServicePagesFilterStateSlice;