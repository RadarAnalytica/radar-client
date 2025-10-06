import { createAsyncThunk } from '@reduxjs/toolkit';
import { createFiltersDTO } from '../filtersRnp/filterRnpActions';
import { fetchApi } from '@/service/fetchApi';

export const fetchFiltersRnpAdd = createAsyncThunk(
  'filtersRnpAdd',
  async (token, { dispatch }) => {
    try {
      let data = null;
      const res = await fetchApi('/api/rnp/filters', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },
      });
      data = await res.json();
      if (data?.data?.shops) {
        return createFiltersDTO(data.data.shops);
      }

    } catch (e) {
      throw e;
    } finally {
    }
  }
);
