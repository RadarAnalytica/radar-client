import { createSlice } from '@reduxjs/toolkit';
import { fetchGeographyData } from './geoDataActions';

const initialState = {
  geoData: [],
  loading: false,
  error: null,
};

const geoDataSlice = createSlice({
  name: 'geoDataSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGeographyData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGeographyData.fulfilled, (state, action) => {
      state.geoData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchGeographyData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default geoDataSlice.reducer;
