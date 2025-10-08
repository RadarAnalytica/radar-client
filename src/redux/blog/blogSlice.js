import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchCategories, fetchArticles } from './blogActions';

const initialState = {
    categories: [],
    posts: [],
    articles: [],
    loading: false,
    error: null,
};


const blogSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {
        clearArticles: (state) => {
            state.articles = [];
            state.error = null;
        },
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
                state.error = null;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Не удалось загрузить статьи';
            });
    }
});

export const { clearArticles } = blogSlice.actions;
export default blogSlice.reducer;
