import { createSlice } from '@reduxjs/toolkit';
import { fetchABCFilters } from './abcFiltersActions';

const initialState = {
    abcFilters: {
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

const abcFiltersSlice = createSlice({
    name: 'abcFilters',
    initialState,
    reducers: {
        switchABCFilter(state, action) {
            const { ident, elem } = action.payload
            const filterElem = state.abcFilters[ident]
            filterElem[elem] = !filterElem[elem]
            if (ident === 'week') {
                state.abcFilters.weekOrigin[elem] = !state.abcFilters.weekOrigin[elem]
            }

            if (ident === 'year' || ident === 'month') {
                let visibleMonthArray = []
                let visibleYearArray = []
                if (
                    Object.values(state.abcFilters.month).filter(el => el === true).length === Object.values(state.abcFilters.month).length ||
                    Object.values(state.abcFilters.month).filter(el => el === false).length === Object.values(state.abcFilters.month).length
                ) {
                    visibleMonthArray = Object.keys(state.abcFilters.month)
                } else {
                    visibleMonthArray = Object.keys(state.abcFilters.month).filter((el) => state.abcFilters.month[el])
                }
                if (
                    Object.values(state.abcFilters.year).filter(el => el === true).length === Object.values(state.abcFilters.year).length ||
                    Object.values(state.abcFilters.year).filter(el => el === false).length === Object.values(state.abcFilters.year).length
                ) {
                    visibleYearArray = Object.keys(state.abcFilters.year)
                } else {
                    visibleYearArray = Object.keys(state.abcFilters.year).filter((el) => state.abcFilters.year[el])
                }

                state.abcFilters['week'] = {}
                for (let elem of Object.keys(state.abcFilters.weekOrigin)) {
                    const elemList = elem.split('-')
                    if (elemList[1].startsWith('0')) {
                        elemList[1] = elemList[1].replace('0', '')
                    }
                    
                    if (visibleYearArray.includes(elemList[0]) && visibleMonthArray.includes(elemList[1])) {
                        state.abcFilters.week[elem] = state.abcFilters.weekOrigin[elem]
                    }
                }

            }
        },
        switchAllABCFilter(state, action) {
            const { ident, value } = action.payload
            const filterElem = state.abcFilters[ident]
            for (let el of Object.keys(filterElem)) {
                filterElem[el] = value
                if (ident === 'week') state.abcFilters.weekOrigin[el] = !state.abcFilters.weekOrigin[el]
            }
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchABCFilters.pending, (state) => {
                state.isFiltersLoading = true;
            })
            .addCase(fetchABCFilters.fulfilled, (state, action) => {
                state.isFiltersLoading = false;
                state.abcFilters = action.payload;
                state.error = null;
            })
            .addCase(fetchABCFilters.rejected, (state, action) => {
                state.isFiltersLoading = false;
                state.error = action.error.message;
            });
    }
});

export default abcFiltersSlice.reducer;

export const {
    switchABCFilter,
    switchAllABCFilter
} = abcFiltersSlice.actions
