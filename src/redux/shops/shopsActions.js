import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { setLoading } from '../loading/loadingSlice';

export const fetchShops = createAsyncThunk(
  'shops',
  async (token, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${URL}/api/shop/all`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },
      });
      const data = await res.json();
      return data;
    } catch (e) {
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
