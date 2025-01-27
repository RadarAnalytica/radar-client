import { createSlice } from '@reduxjs/toolkit';
import { fetchPLReport } from './plReportActions';

const initialState = {
    plData: null,
    isLoading: false,
    error: null
};

const plReportSlice = createSlice({
    name: 'plReport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPLReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPLReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.plData = action.payload;
                state.error = null;
            })
            .addCase(fetchPLReport.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default plReportSlice.reducer;


