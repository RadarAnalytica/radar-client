import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const rnpSelectedSlice = createSlice({
  name: 'rnpSelected',
  initialState: null,
  reducers: {
    setList: (state, action) => {
      return action.payload;
    }
  }
});
export const { actions, reducer } = rnpSelectedSlice;
