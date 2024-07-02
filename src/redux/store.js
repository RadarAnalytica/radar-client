import { configureStore } from '@reduxjs/toolkit';

import dashboardSlice from './dashboard/dashboardSlice';
import shopsSlice from './shops/shopsSlice';

const storeOptions = {
  reducer: {
    dashboardSlice,
    shopsSlice
    
  },
};

export const store = configureStore(storeOptions);
