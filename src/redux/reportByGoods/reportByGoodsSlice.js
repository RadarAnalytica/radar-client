import { createSlice } from '@reduxjs/toolkit';
import { fetchReportByGoods } from './reportByGoodsActions';

const initialState = {
    weeklyData: [],
    loading: false,
    error: null
};

const reportByGoodsSlice = createSlice({
    name: 'weeklyReport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportByGoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReportByGoods.fulfilled, (state, action) => {
                state.weeklyData = action.payload;
                state.loading = false;
            })
            .addCase(fetchReportByGoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default reportByGoodsSlice.reducer;
