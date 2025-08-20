import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { createFiltersDTO } from '../filtersRnp/filterRnpActions';

export const fetchFiltersRnpAdd = createAsyncThunk(
  'filtersRnpAdd',
  async (token, { dispatch }) => {
    try {
      let data = null;
      const res = await fetch(`${URL}/api/rnp/filters`, {
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
