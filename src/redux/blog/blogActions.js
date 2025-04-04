import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { setLoading } from '../loading/loadingSlice';

export const fetchPosts = createAsyncThunk(
  'posts',
  async (token, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${URL}/api/blog/articles`, {
        method: 'GET',
        headers: {
          'cache': 'no-store',
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      return data.data.items;
    } catch (e) {
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const fetchCategories = createAsyncThunk(
  'categories',
  async (token, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${URL}/api/blog/categories`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      return data.data.items;
    } catch (e) {
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
