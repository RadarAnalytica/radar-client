import { createSlice } from '@reduxjs/toolkit';
import { fetchPenaltiesData } from './penaltiesActions';

const initialState = {
    penaltiesData: [],
    loading: false,
    error: null
};

const penaltiesSlice = createSlice({
    name: 'penalties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPenaltiesData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPenaltiesData.fulfilled, (state, action) => {
                state.loading = false;
                state.penaltiesData = action.payload;
            })
            .addCase(fetchPenaltiesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default penaltiesSlice.reducer;
