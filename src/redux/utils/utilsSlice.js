import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from './utilsActions'

const initialState = {
    isSidebarHidden: true,
    userData: null
};

const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {

        setIsSidebarHidden: (state, action) => {
            return {
                ...state,
                isSidebarHidden: action.payload
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userData = action.payload;
            })
    },
});

export const { reducer, actions } = utilsSlice;
