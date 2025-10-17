import { createSlice } from '@reduxjs/toolkit';
import { fetchPenaltyFilters } from './penaltyFiltersActions';

const initialState = {
    penaltyFilters: {
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

const penaltyFiltersSlice = createSlice({
    name: 'penaltyFilters',
    initialState,
    reducers: {
        switchPenaltyFilter(state, action) {
            const { ident, elem } = action.payload;
            const filterElem = state.penaltyFilters[ident];
            filterElem[elem] = !filterElem[elem];
            if (ident === 'week') {
                state.penaltyFilters.weekOrigin[elem] = !state.penaltyFilters.weekOrigin[elem];
            }

            if (ident === 'year' || ident === 'month') {
                let visibleMonthArray = [];
                let visibleYearArray = [];
                if (
                    Object.values(state.penaltyFilters.month).filter(el => el === true).length === Object.values(state.penaltyFilters.month).length ||
                    Object.values(state.penaltyFilters.month).filter(el => el === false).length === Object.values(state.penaltyFilters.month).length
                ) {
                    visibleMonthArray = Object.keys(state.penaltyFilters.month);
                } else {
                    visibleMonthArray = Object.keys(state.penaltyFilters.month).filter((el) => state.penaltyFilters.month[el]);
                }
                if (
                    Object.values(state.penaltyFilters.year).filter(el => el === true).length === Object.values(state.penaltyFilters.year).length ||
                    Object.values(state.penaltyFilters.year).filter(el => el === false).length === Object.values(state.penaltyFilters.year).length
                ) {
                    visibleYearArray = Object.keys(state.penaltyFilters.year);
                } else {
                    visibleYearArray = Object.keys(state.penaltyFilters.year).filter((el) => state.penaltyFilters.year[el]);
                }

                state.penaltyFilters['week'] = {};
                for (let elem of Object.keys(state.penaltyFilters.weekOrigin)) {
                    const elemList = elem.split('-');
                    if (elemList[1].startsWith('0')) {
                        elemList[1] = elemList[1].replace('0', '');
                    }

                    if (visibleYearArray.includes(elemList[0]) && visibleMonthArray.includes(elemList[1])) {
                        state.penaltyFilters.week[elem] = state.penaltyFilters.weekOrigin[elem];
                    }
                }

            }
        },
        switchAllPenaltyFilter(state, action) {
            const { ident, value } = action.payload;
            const filterElem = state.penaltyFilters[ident];
            for (let el of Object.keys(filterElem)) {
                filterElem[el] = value;
                if (ident === 'week') state.penaltyFilters.weekOrigin[el] = !state.penaltyFilters.weekOrigin[el];
            }

            if (ident === 'month') {
                state.penaltyFilters['week'] = state.penaltyFilters.weekOrigin;
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPenaltyFilters.pending, (state) => {
                state.isFiltersLoading = true;
            })
            .addCase(fetchPenaltyFilters.fulfilled, (state, action) => {
                state.isFiltersLoading = false;
                state.penaltyFilters = action.payload;
                state.error = null;
            })
            .addCase(fetchPenaltyFilters.rejected, (state, action) => {
                state.isFiltersLoading = false;
                state.error = action.error.message;
            });
    }
});

export default penaltyFiltersSlice.reducer;

export const {
    switchPenaltyFilter,
    switchAllPenaltyFilter
} = penaltyFiltersSlice.actions;
