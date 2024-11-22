import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardFilters } from "./filtersDataActions";

const initialState = {
    data: null,
    loading: false,
    error: null
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardFilters.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboardFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDashboardFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default filterSlice.reducer;
