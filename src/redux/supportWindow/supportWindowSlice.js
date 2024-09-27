import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpenSupportWindow: false,
};

const supportWindowSlice = createSlice({
    name: 'supportWindow',
    initialState,
    reducers: {
        openSupportWindow: (state) => {
            state.isOpenSupportWindow = true;
        },
        closeSupportWindow: (state) => {
            state.isOpenSupportWindow = false;
        },
    },
});

export const { openSupportWindow, closeSupportWindow } = supportWindowSlice.actions;
export default supportWindowSlice.reducer;