import { configureStore } from '@reduxjs/toolkit';

import dashboardSlice from './dashboard/dashboardSlice';

const storeOptions = {
  reducer: {
    dashboardSlice,
  },
};

export const store = configureStore(storeOptions);
