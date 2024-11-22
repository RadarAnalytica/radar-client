import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardReport } from './dashboardReportActions';

const initialState = {
    data: null,
    loading: false,
    error: null
};

const dashboardReportSlice = createSlice({
    name: 'dashboardReport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardReport.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchDashboardReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dashboardReportSlice.reducer;
