import { createSlice } from '@reduxjs/toolkit';
import { fetchByGoodsFilters } from './byGoodsFiltersAction';

const initialState = {
    byGoodsFilters: {
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

const byGoodsFiltersSlice = createSlice({
    name: 'byMonthFilters',
    initialState,
    reducers: {
        switchByGoodsFilter(state, action) {
            const { ident, elem } = action.payload;
            const filterElem = state.byGoodsFilters[ident];
            filterElem[elem] = !filterElem[elem];
            if (ident === 'week') {
                state.byGoodsFilters.weekOrigin[elem] = !state.byGoodsFilters.weekOrigin[elem];
            }

            if (ident === 'year' || ident === 'month') {
                let visibleMonthArray = [];
                let visibleYearArray = [];
                if (
                    Object.values(state.byGoodsFilters.month).filter(el => el === true).length === Object.values(state.byGoodsFilters.month).length ||
                    Object.values(state.byGoodsFilters.month).filter(el => el === false).length === Object.values(state.byGoodsFilters.month).length
                ) {
                    visibleMonthArray = Object.keys(state.byGoodsFilters.month);
                } else {
                    visibleMonthArray = Object.keys(state.byGoodsFilters.month).filter((el) => state.byGoodsFilters.month[el]);
                }
                if (
                    Object.values(state.byGoodsFilters.year).filter(el => el === true).length === Object.values(state.byGoodsFilters.year).length ||
                    Object.values(state.byGoodsFilters.year).filter(el => el === false).length === Object.values(state.byGoodsFilters.year).length
                ) {
                    visibleYearArray = Object.keys(state.byGoodsFilters.year);
                } else {
                    visibleYearArray = Object.keys(state.byGoodsFilters.year).filter((el) => state.byGoodsFilters.year[el]);
                }

                state.byGoodsFilters['week'] = {};
                for (let elem of Object.keys(state.byGoodsFilters.weekOrigin)) {
                    const elemList = elem.split('-');
                    if (elemList[1].startsWith('0')) {
                        elemList[1] = elemList[1].replace('0', '');
                    }

                    if (visibleYearArray.includes(elemList[0]) && visibleMonthArray.includes(elemList[1])) {
                        state.byGoodsFilters.week[elem] = state.byGoodsFilters.weekOrigin[elem];
                    }
                }

            }
        },
        switchAllByGoodsFilter(state, action) {
            const { ident, value } = action.payload;
            const filterElem = state.byGoodsFilters[ident];
            for (let el of Object.keys(filterElem)) {
                filterElem[el] = value;
                if (ident === 'week') state.byGoodsFilters.weekOrigin[el] = !state.byGoodsFilters.weekOrigin[el];
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchByGoodsFilters.pending, (state) => {
                state.isFiltersLoading = true;
            })
            .addCase(fetchByGoodsFilters.fulfilled, (state, action) => {
                state.isFiltersLoading = false;
                state.byGoodsFilters = action.payload;
                state.error = null;
            })
            .addCase(fetchByGoodsFilters.rejected, (state, action) => {
                state.isFiltersLoading = false;
                state.error = action.error.message;
            });
    }
});

export default byGoodsFiltersSlice.reducer;

export const {
    switchByGoodsFilter,
    switchAllByGoodsFilter
} = byGoodsFiltersSlice.actions;
