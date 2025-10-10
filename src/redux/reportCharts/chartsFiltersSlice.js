import { createSlice } from '@reduxjs/toolkit';
import { fetchChartsFilters } from './chartsFiltersActions';

const initialState = {
    chartsFilters: {
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

const chartsFiltersSlice = createSlice({
    name: 'chartsFilters',
    initialState,
    reducers: {
        switchChartsFilter(state, action) {
            const { ident, elem } = action.payload;
            const filterElem = state.chartsFilters[ident];
            filterElem[elem] = !filterElem[elem];
            if (ident === 'week') {
                state.chartsFilters.weekOrigin[elem] = !state.chartsFilters.weekOrigin[elem];
            }

            if (ident === 'year' || ident === 'month') {
                let visibleMonthArray = [];
                let visibleYearArray = [];
                if (
                    Object.values(state.chartsFilters.month).filter(el => el === true).length === Object.values(state.chartsFilters.month).length ||
                    Object.values(state.chartsFilters.month).filter(el => el === false).length === Object.values(state.chartsFilters.month).length
                ) {
                    visibleMonthArray = Object.keys(state.chartsFilters.month);
                } else {
                    visibleMonthArray = Object.keys(state.chartsFilters.month).filter((el) => state.chartsFilters.month[el]);
                }
                if (
                    Object.values(state.chartsFilters.year).filter(el => el === true).length === Object.values(state.chartsFilters.year).length ||
                    Object.values(state.chartsFilters.year).filter(el => el === false).length === Object.values(state.chartsFilters.year).length
                ) {
                    visibleYearArray = Object.keys(state.chartsFilters.year);
                } else {
                    visibleYearArray = Object.keys(state.chartsFilters.year).filter((el) => state.chartsFilters.year[el]);
                }

                state.chartsFilters['week'] = {};
                for (let elem of Object.keys(state.chartsFilters.weekOrigin)) {
                    const elemList = elem.split('-');
                    if (elemList[1].startsWith('0')) {
                        elemList[1] = elemList[1].replace('0', '');
                    }

                    if (visibleYearArray.includes(elemList[0]) && visibleMonthArray.includes(elemList[1])) {
                        state.chartsFilters.week[elem] = state.chartsFilters.weekOrigin[elem];
                    }
                }

            }
        },
        switchAllChartsFilter(state, action) {
            const { ident, value } = action.payload;
            const filterElem = state.chartsFilters[ident];
            for (let el of Object.keys(filterElem)) {
                filterElem[el] = value;
                if (ident === 'week') state.chartsFilters.weekOrigin[el] = !state.chartsFilters.weekOrigin[el];
            }

            if (ident === 'month') {
                state.chartsFilters['week'] = state.chartsFilters.weekOrigin;
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChartsFilters.pending, (state) => {
                state.isFiltersLoading = true;
            })
            .addCase(fetchChartsFilters.fulfilled, (state, action) => {
                state.isFiltersLoading = false;
                state.chartsFilters = action.payload;
                state.error = null;
            })
            .addCase(fetchChartsFilters.rejected, (state, action) => {
                state.isFiltersLoading = false;
                state.error = action.error.message;
            });
    }
});

export default chartsFiltersSlice.reducer;

export const {
    switchChartsFilter,
    switchAllChartsFilter
} = chartsFiltersSlice.actions;
