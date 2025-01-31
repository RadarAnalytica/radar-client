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
import reportByGoodsSlice from './reportByGoods/reportByGoodsSlice';
import plReportSlice from './reportPL/plReportSlice';
import externalExpensesSlice from './externalExpenses/externalExpensesSlice';
import penaltiesSlice from './reportPrnalties/penaltiesSlice';
import downloadReducer from './download/downloadSlice';

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
    reportByMonthSlice,
    reportByGoodsSlice,
    plReportSlice,
    externalExpensesSlice,
    penaltiesSlice,
    downloadReducer,
  },
};

export const store = configureStore(storeOptions);
