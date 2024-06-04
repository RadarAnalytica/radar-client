import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../../service/config';

export const fetchAllShops = createAsyncThunk(
  'all/shops',
  async ( period, activeBrand ) => {
    const authToken = localStorage.getItem('authToken');
    const config = {
      params: { period, activeBrand },
      headers: {
        Authorization: authToken,
      },
    };
    const response = await axios.get(URL + '/api/dashboard/', config);
    return response.data;
  }
);
