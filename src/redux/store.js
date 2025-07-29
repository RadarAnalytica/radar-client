import { configureStore } from '@reduxjs/toolkit';

import dashboardSlice from './dashboard/dashboardSlice';
import shopsSlice from './shops/shopsSlice';
import geoDataSlice from './geoData/geoDataSlice';
import loadingSlice from './loading/loadingSlice';
import messagesSlice from './messages/messagesSlice';
import stockAnalysisDataSlice from './stockAnalysis/stockAnalysisDataSlice';
import supportWindowSlice from './supportWindow/supportWindowSlice';
import filtersDataSlice from './filters/filtersDataSlice';
import dashboardReportSlice from './dashboardReport/dashboardReportSlice';
import reportByMonthSlice from './reportByMonth/reportByMonthSlice';
import byMonthFiltersSlice from './reportByMonth/byMonthFiltersSlice';
import dashboardFiltersSlice from './dashboardReport/dashboardFiltersSlice';
import reportByGoodsSlice from './reportByGoods/reportByGoodsSlice';
import byGoodsFiltersSlice from './reportByGoods/byGoodsFiltersSlice';
import plReportSlice from './reportPL/plReportSlice';
import abcFiltersSlice from './reportABC/abcFiltersSlice';
import plFiltersSlice from './reportPL/plFiltersSlice';
import externalExpensesSlice from './externalExpenses/externalExpensesSlice';
import penaltiesSlice from './reportPrnalties/penaltiesSlice';
import penaltyFiltersSlice from './reportPrnalties/penaltyFiltersSlice';
import chartsFiltersSlice from './reportCharts/chartsFiltersSlice';
import downloadReducer from './download/downloadSlice';
import blogReducer from './blog/blogSlice'
import { reducer as apiServicePagesFilterStateReducer } from './apiServicePagesFiltersState/apiServicePagesFilterState.slice'
import { reducer as utilsReducer } from './utils/utilsSlice'
import { reducer as skuAnalysisReducer } from './skuAnalysis/skuAnalysisSlice'
import { reducer as requestsMonitoringReducer } from './requestsMonitoring/requestsMonitoringSlice'
import { reducer as supplierAnalysisReducer } from './supplierAnalysis/supplierAnalysisSlice'

const storeOptions = {
  reducer: {
    dashboardSlice,
    shopsSlice,
    geoDataSlice,
    loadingSlice,
    messagesSlice,
    stockAnalysisDataSlice,
    supportWindowSlice,
    filtersDataSlice,
    dashboardReportSlice,
    dashboardFiltersSlice,
    reportByMonthSlice,
    byMonthFiltersSlice,
    reportByGoodsSlice,
    byGoodsFiltersSlice,
    plReportSlice,
    plFiltersSlice,
    abcFiltersSlice,
    externalExpensesSlice,
    penaltiesSlice,
    penaltyFiltersSlice,
    chartsFiltersSlice,
    downloadReducer,
    blog: blogReducer,
    filters: apiServicePagesFilterStateReducer,
    utils: utilsReducer,
    skuAnalysis: skuAnalysisReducer,
    requestsMonitoring: requestsMonitoringReducer,
    supplierAnalysis: supplierAnalysisReducer,
  },
};

export const store = configureStore(storeOptions);
