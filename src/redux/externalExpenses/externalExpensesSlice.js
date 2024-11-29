import { createSlice } from '@reduxjs/toolkit';
import { fetchExternalExpenses } from './externalExpensesActions';

const initialState = {
    data: [],
    loading: false,
    error: null
};

const externalExpensesSlice = createSlice({
    name: 'externalExpenses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExternalExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExternalExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchExternalExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default externalExpensesSlice.reducer;
