import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchGeographyData = createAsyncThunk(
  'geoData/fetchGeographyData',
  async ({ authToken, days, activeBrand }) => {
    const res = await fetch(`${URL}/api/geo/?period=${days}&shop=${activeBrand}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + authToken,
      },
    });
    const data = await res.json();
    return data;
  }
);
