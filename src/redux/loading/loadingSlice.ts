import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: false,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
