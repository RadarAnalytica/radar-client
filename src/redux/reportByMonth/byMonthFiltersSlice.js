import { createSlice } from '@reduxjs/toolkit';
import { fetchByMonthFilters } from './byMonthFiltersAction';

const initialState = {
    byMonthFilters: {
        // 'wh': {},
        // 'brand':{},
        // 'year':{},
        // 'month':{},
        // 'week':{},
        // 'group':{},
    },
    isFiltersLoading: true,
    error: null
};

const byMonthFiltersSlice = createSlice({
    name: 'byMonthFilters',
    initialState,
    reducers: {
        switchByMonthFilter(state, action) {
            const { ident, elem } = action.payload;
            const filterElem = state.byMonthFilters[ident];
            filterElem[elem] = !filterElem[elem];
            if (ident === 'week') {
                state.byMonthFilters.weekOrigin[elem] = !state.byMonthFilters.weekOrigin[elem];
            }

            if (ident === 'year' || ident === 'month') {
                let visibleMonthArray = [];
                let visibleYearArray = [];
                if (
                    Object.values(state.byMonthFilters.month).filter(el => el === true).length === Object.values(state.byMonthFilters.month).length ||
                    Object.values(state.byMonthFilters.month).filter(el => el === false).length === Object.values(state.byMonthFilters.month).length
                ) {
                    visibleMonthArray = Object.keys(state.byMonthFilters.month);
                } else {
                    visibleMonthArray = Object.keys(state.byMonthFilters.month).filter((el) => state.byMonthFilters.month[el]);
                }
                if (
                    Object.values(state.byMonthFilters.year).filter(el => el === true).length === Object.values(state.byMonthFilters.year).length ||
                    Object.values(state.byMonthFilters.year).filter(el => el === false).length === Object.values(state.byMonthFilters.year).length
                ) {
                    visibleYearArray = Object.keys(state.byMonthFilters.year);
                } else {
                    visibleYearArray = Object.keys(state.byMonthFilters.year).filter((el) => state.byMonthFilters.year[el]);
                }

                state.byMonthFilters['week'] = {};
                for (let elem of Object.keys(state.byMonthFilters.weekOrigin)) {
                    const elemList = elem.split('-');
                    if (elemList[1].startsWith('0')) {
                        elemList[1] = elemList[1].replace('0', '');
                    }

                    if (visibleYearArray.includes(elemList[0]) && visibleMonthArray.includes(elemList[1])) {
                        state.byMonthFilters.week[elem] = state.byMonthFilters.weekOrigin[elem];
                    }
                }

            }
        },
        switchAllByMonthFilter(state, action) {
            const { ident, value } = action.payload;
            const filterElem = state.byMonthFilters[ident];
            for (let el of Object.keys(filterElem)) {
                filterElem[el] = value;
                if (ident === 'week') state.byMonthFilters.weekOrigin[el] = !state.byMonthFilters.weekOrigin[el];
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchByMonthFilters.pending, (state) => {
                state.isFiltersLoading = true;
            })
            .addCase(fetchByMonthFilters.fulfilled, (state, action) => {
                state.isFiltersLoading = false;
                state.byMonthFilters = action.payload;
                state.error = null;
            })
            .addCase(fetchByMonthFilters.rejected, (state, action) => {
                state.isFiltersLoading = false;
                state.error = action.error.message;
            });
    }
});

export default byMonthFiltersSlice.reducer;

export const {
    switchByMonthFilter,
    switchAllByMonthFilter
} = byMonthFiltersSlice.actions;
