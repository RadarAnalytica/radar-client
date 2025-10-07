import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchCategories } from './blogActions';

const initialState = {
    categories: [],
    posts: [],
};


const blogSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {},
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });
    }
});

export default blogSlice.reducer;
