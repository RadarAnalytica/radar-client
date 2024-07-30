import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: false,
  reducers: {
    setLoading: (state, action) => action.payload,
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
