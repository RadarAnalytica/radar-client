import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarHidden: false
};

const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        
        setIsSidebarHidden: (state, action) => {
            return {
                ...state,
                isSidebarHidden: action.payload
            }
        }
    },
});

export const { reducer, actions } = utilsSlice;