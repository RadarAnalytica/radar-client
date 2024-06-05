import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../../service/config';

export const fetchAllShops = createAsyncThunk(
  'all/shops',
  async (period, activeBrand) => {
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

export const fetchdownloadTemplate = createAsyncThunk(
  'file/shop',
  async ({ shop_id }) => {
    const authToken = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: authToken,
      },
      responseType: 'blob',
    };
    const response = await axios.get(URL + `/api/shop/cost/${shop_id}`, config);
    return response.data;
  }
);

export const fetchSaveSetFile = createAsyncThunk(
  'fileSet/shop',
  async ({ shop_id, file }) => {
    const authToken = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        Authorization: authToken,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(
      URL + `/api/shop/cost/${shop_id}`,
      formData,
      config
    );
    return response.data;
  }
);
