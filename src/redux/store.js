import { configureStore } from '@reduxjs/toolkit';

import dashboardSlice from './dashboard/dashboardSlice';
import shopsSlice from './shops/shopsSlice';
import geoDataSlice from './geoData/geoDataSlice';
import loadingSlice from './loading/loadingSlice';
import messagesSlice from './messages/messagesSlice';
import stockAnalysisDataSlice from './stockAnalysis/stockAnalysisDataSlice';


const storeOptions = {
  reducer: {
    dashboardSlice,
    shopsSlice,
    geoDataSlice,
    loadingSlice,
    messagesSlice,
    stockAnalysisDataSlice,
  },
};

export const store = configureStore(storeOptions);
