import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../../service/config';

export const fetchAllShops = createAsyncThunk('all/shops', async (days) => {
  const response = await axios.get(URL + '/api/dashboard', days, {
    withCredentials: true,
  });
  return response.data;
});

