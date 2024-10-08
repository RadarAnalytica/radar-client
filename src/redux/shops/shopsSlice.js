import { createSlice } from '@reduxjs/toolkit';
import { fetchShops } from '../shops/shopsActions';
import { editShop } from '../editShop/editShopActions';
import { addShop } from '../addShop/addShopActions';
import { deleteShop } from '../deleteShop/deleteShopActions';


const initialState = {
    shops: [],
    clickedShop: null,
};

const shopsSlice = createSlice({
    name: 'shopsSlice',
    initialState,
    reducers: {},
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchShops.fulfilled, (state, action) => {
                state.shops = action.payload;
            })
            .addCase(editShop.fulfilled, (state, action) => {
                const index = state.shops.findIndex(shop => shop.id === action.payload.id);
                state.shops[index] = action.payload
            })
            .addCase(addShop.fulfilled, (state, action) => {
                state.shops.push(action.payload)
            })
            .addCase(deleteShop.fulfilled, (state, action) => {
                state.shops = state.shops.filter(shop => shop.id !== action.meta.arg.shop.id)
            })
    }
});

export const shopClicked = (shop) => ({
    type: 'shops/shopClicked',
    payload: shop,
});

export default shopsSlice.reducer;