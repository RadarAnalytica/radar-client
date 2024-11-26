import { createSlice } from '@reduxjs/toolkit';
import { fetchReportByMonth } from './reportByMonthActions';

const initialState = {
    weeklyData: [],
    loading: false,
    error: null
};

const reportByMonthSlice = createSlice({
    name: 'weeklyReport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportByMonth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReportByMonth.fulfilled, (state, action) => {
                state.weeklyData = action.payload;
                state.loading = false;
            })
            .addCase(fetchReportByMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default reportByMonthSlice.reducer;
