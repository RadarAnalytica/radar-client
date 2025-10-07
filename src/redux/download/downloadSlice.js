import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isDownloading: false
};
const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    setDownloadLoading: (state, action) => {
      state.isDownloading = action.payload;
    }
  }
});
export const { setDownloadLoading } = downloadSlice.actions;
export default downloadSlice.reducer;
