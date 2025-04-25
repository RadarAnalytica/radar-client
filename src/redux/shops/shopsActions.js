import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { setLoading } from '../loading/loadingSlice';

import { mockGetAllShops } from '../../service/mockServiceFunctions';

export const fetchShops = createAsyncThunk(
  'shops',
  async (token, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      let data = null;
      if (token === 'mockData'){
        data = mockGetAllShops();
      } else {
        const res = await fetch(`${URL}/api/shop/all`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: 'JWT ' + token,
          },
        });
        data = await res.json();
      }
      return data;
    } catch (e) {
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchMockShops = createAsyncThunk(
  'shops',
  async ({ dispatch }) => {
    try {
      dispatch(setLoading(true));
      const data = mockGetAllShops();
      console.log('fetchShops', data)
      return data;
    } catch (e) {
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
