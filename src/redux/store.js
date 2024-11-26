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
    reportByGoodsSlice
  },
};

export const store = configureStore(storeOptions);
