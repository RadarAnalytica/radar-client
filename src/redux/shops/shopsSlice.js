import {createSlice} from '@reduxjs/toolkit';
import {shops} from '../shops/shopsActions';


const initialState = {
    shops: [],
};

const shopsSlice = createSlice({
    name: 'shopsSlice',
    initialState,
    reducers: {},
    extraReducers: (bulder) => {
        bulder.addCase(shops.fulfilled, (state, action) => {
            state.shops = action.payload;
        })
    }
});
export default shopsSlice.reducer;