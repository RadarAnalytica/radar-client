import { createSlice } from '@reduxjs/toolkit';
import { fetchAllShops } from '../../redux/dashboard/dashboardActions';

const initialState = {
  shops: [],
};

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder.addCase(fetchAllShops.fulfilled, (state, action) => {
      state.shops = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
