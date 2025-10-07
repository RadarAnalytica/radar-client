import { createSlice } from '@reduxjs/toolkit';
import { fetchStockAnalysisData } from './stockAnalysisDataActions';

const initialState = {
    stockAnalysisData: [],
    loading: false,
    error: null,
};

const stockAnalysisDataSlice = createSlice({
    name: 'stockAnalysisDataSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStockAnalysisData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchStockAnalysisData.fulfilled, (state, action) => {
            state.stockAnalysisData = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchStockAnalysisData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default stockAnalysisDataSlice.reducer;
