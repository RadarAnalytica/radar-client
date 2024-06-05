import { createSlice } from '@reduxjs/toolkit';
import { fetchAllShops,fetchdownloadTemplate } from '../../redux/dashboard/dashboardActions';

const initialState = {
  shops: [],
  fileShop: [],
};

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder.addCase(fetchAllShops.fulfilled, (state, action) => {
      state.shops = action.payload;
    });
    bulder.addCase(fetchdownloadTemplate.fulfilled, (state, action) => {
      state.fileShop = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
