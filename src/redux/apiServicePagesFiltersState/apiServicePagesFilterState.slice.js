import { createSlice } from "@reduxjs/toolkit";
import { getSavedActiveWeeks, getSavedActiveMonths } from '@/service/utils';

const initialState = {
  activeBrand: undefined,
  activeBrandName: undefined,
  activeArticle: undefined,
  activeGroup: undefined,
  activeWeeks: undefined,
  activeMonths: undefined,
  activeCategory: undefined,
  activeExpenseCategory: undefined,
  skuFrequencyMode: 'Простой', // 'Простой' | 'Продвинутый'
  shops: undefined,
  selectedRange: {
    period: 30
  },
  filters: undefined,
  expenseCategories: undefined,
  isFiltersLoaded: false
};

const apiServicePagesFilterStateSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setExpenseCategories: (state, action) => {
      return {
        ...state,
        expenseCategories: action.payload
      };
    },
    setActiveShop: (state, action) => {
      return {
        ...state,
        activeBrand: action.payload,
        activeBrandName: [{value: 'Все'}],
        activeArticle: [{value: 'Все'}],
        activeGroup: [{id: 0, value: 'Все'}],
        activeWeeks: getSavedActiveWeeks(action.payload.id),
        activeMonths: getSavedActiveMonths(action.payload.id),
      };
    },
    setPeriod: (state, action) => {
      return {
        ...state,
        selectedRange: action.payload
      };
    },
    setSkuFrequencyMode: (state, action) => {
      return {
        ...state,
        skuFrequencyMode: action.payload
      };
    },
    setActiveFilters: (state, action) => {
      const { stateKey, data } = action.payload;

      if (stateKey === 'activeBrandName') {
        return {
          ...state,
          [stateKey]: data,
          activeGroup: [{value: 'Все', id: 0}],
          activeArticle: [{value: 'Все', id: 0}]
        };
      }

      if (stateKey === 'activeArticle') {
        return {
          ...state,
          [stateKey]: data,
          activeGroup: [{value: 'Все', id: 0}],
        };
      }

      if (stateKey === 'activeGroup') {
        return {
          ...state,
          [stateKey]: data,
          activeBrandName: [{value: 'Все'}],
          activeArticle: [{value: 'Все'}],
        };
      }

      if (stateKey === 'activeWeeks') {
        localStorage.setItem(`SAVED_ACTIVE_WEEKS_${state.activeBrand.id}`, JSON.stringify(data));
        return {
          ...state,
          [stateKey]: data,
        };
      }

      if (stateKey === 'activeMonths') {
        return {
          ...state,
          [stateKey]: data,
        };
      }

      return {
        ...state,
        [stateKey]: data
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase('filters/fulfilled', (state, action) => {
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
});

export const { actions, reducer } = apiServicePagesFilterStateSlice;
