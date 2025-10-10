import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { setLoading } from '../loading/loadingSlice';

export const fetchPosts = createAsyncThunk(
  'posts',
  async (token, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${URL}/api/admin/blog/articles`, {
        method: 'GET',
        headers: {
          'cache': 'no-store',
          'content-type': 'application/json',
          'authorization': 'JWT ' + token
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
      const res = await fetch(`${URL}/api/admin/blog/categories`, {
        method: 'GET',
        headers: {
          'cache': 'no-store',
          'content-type': 'application/json',
          'authorization': 'JWT ' + token
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

export const fetchArticles = createAsyncThunk(
  'blog/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${URL}/api/blog/articles`, {
        method: 'GET',
        headers: {
          'cache': 'no-store',
          'content-type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Не удалось загрузить статьи');
      }

      const data = await res.json();
      
      // Фильтруем только опубликованные статьи
      const publishedArticles = data.data?.items?.filter(article => article.is_published) || [];
      
      return publishedArticles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArticleBySlug = createAsyncThunk(
  'blog/fetchArticleBySlug',
  async (slugOrId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${URL}/api/blog/articles/${slugOrId}`, {
        method: 'GET',
        headers: {
          'cache': 'no-store',
          'content-type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Статья не найдена');
        }
        throw new Error('Не удалось загрузить статью');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);