import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardFilters } from './dashboardFiltersAction';

const initialState = {
    dashboardFilters: {
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

const dashboardFiltersSlice = createSlice({
    name: 'dashboardFilters',
    initialState,
    reducers: {
        switchDashboardFilter(state, action) {
            const { ident, elem } = action.payload;
            const filterElem = state.dashboardFilters[ident];
            filterElem[elem] = !filterElem[elem];
            if (ident === 'week') {
                state.dashboardFilters.weekOrigin[elem] = !state.dashboardFilters.weekOrigin[elem];
            }

            if (ident === 'year' || ident === 'month') {
                let visibleMonthArray = [];
                let visibleYearArray = [];
                if (
                    Object.values(state.dashboardFilters.month).filter(el => el === true).length === Object.values(state.dashboardFilters.month).length ||
                    Object.values(state.dashboardFilters.month).filter(el => el === false).length === Object.values(state.dashboardFilters.month).length
                ) {
                    visibleMonthArray = Object.keys(state.dashboardFilters.month);
                } else {
                    visibleMonthArray = Object.keys(state.dashboardFilters.month).filter((el) => state.dashboardFilters.month[el]);
                }
                if (
                    Object.values(state.dashboardFilters.year).filter(el => el === true).length === Object.values(state.dashboardFilters.year).length ||
                    Object.values(state.dashboardFilters.year).filter(el => el === false).length === Object.values(state.dashboardFilters.year).length
                ) {
                    visibleYearArray = Object.keys(state.dashboardFilters.year);
                } else {
                    visibleYearArray = Object.keys(state.dashboardFilters.year).filter((el) => state.dashboardFilters.year[el]);
                }

                state.dashboardFilters['week'] = {};
                for (let elem of Object.keys(state.dashboardFilters.weekOrigin)) {
                    const elemList = elem.split('-');
                    if (elemList[1].startsWith('0')) {
                        elemList[1] = elemList[1].replace('0', '');
                    }

                    if (visibleYearArray.includes(elemList[0]) && visibleMonthArray.includes(elemList[1])) {
                        state.dashboardFilters.week[elem] = state.dashboardFilters.weekOrigin[elem];
                    }
                }

            }
        },
        switchAllDashboardFilter(state, action) {
            const { ident, value } = action.payload;
            const filterElem = state.dashboardFilters[ident];
            for (let el of Object.keys(filterElem)) {
                filterElem[el] = value;
                if (ident === 'week') state.dashboardFilters.weekOrigin[el] = !state.dashboardFilters.weekOrigin[el];
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardFilters.pending, (state) => {
                state.isFiltersLoading = true;
            })
            .addCase(fetchDashboardFilters.fulfilled, (state, action) => {
                state.isFiltersLoading = false;
                state.dashboardFilters = action.payload;
                state.error = null;
            })
            .addCase(fetchDashboardFilters.rejected, (state, action) => {
                state.isFiltersLoading = false;
                state.error = action.error.message;
            });
    }
});

export default dashboardFiltersSlice.reducer;

export const {
    switchDashboardFilter,
    switchAllDashboardFilter
} = dashboardFiltersSlice.actions;
