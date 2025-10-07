import { createSlice } from '@reduxjs/toolkit';
import { fetchPLFilters } from './plFiltersAction';

const initialState = {
    plFilters: {
        // 'brand': {},
        // 'group': {},
    },
    isFiltersLoading: true,
    error: null
};

const plFiltersSlice = createSlice({
    name: 'plFilters',
    initialState,
    reducers: {
        switchPLFilter(state, action) {
            const { ident, elem } = action.payload;
            const filterElem = state.plFilters[ident];
            filterElem[elem] = !filterElem[elem];
        },
        switchAllPLFilter(state, action) {
            const { ident, value } = action.payload;
            const filterElem = state.plFilters[ident];
            for (let el of Object.keys(filterElem)) {
                filterElem[el] = value;
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPLFilters.pending, (state) => {
                state.isFiltersLoading = true;
            })
            .addCase(fetchPLFilters.fulfilled, (state, action) => {
                state.isFiltersLoading = false;
                state.plFilters = action.payload;
                state.error = null;
            })
            .addCase(fetchPLFilters.rejected, (state, action) => {
                state.isFiltersLoading = false;
                state.error = action.error.message;
            });
    }
});

export default plFiltersSlice.reducer;

export const {
    switchPLFilter,
    switchAllPLFilter
} = plFiltersSlice.actions;
