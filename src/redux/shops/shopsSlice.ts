import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchShops } from '../shops/shopsActions';
import { editShop } from '../editShop/editShopActions';
import { addShop } from '../addShop/addShopActions';
import { deleteShop } from '../deleteShop/deleteShopActions';

// Types based on API response structure
export interface Shop {
    id: number;
    brand_name: string;
    is_active: boolean;
    updated_at: string;
    is_valid: boolean;
    is_primary_collect: boolean;
    is_self_cost_set: boolean;
}

interface ShopsState {
    shops: Shop[];
    clickedShop: Shop | null;
}

const initialState: ShopsState = {
    shops: [],
    clickedShop: null,
};

const shopsSlice = createSlice({
    name: 'shopsSlice',
    initialState,
    reducers: {
        setShops: (state, action: PayloadAction<Shop[]>) => {
            state.shops = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShops.fulfilled, (state, action) => {
                state.shops = action.payload;
            })
            .addCase(editShop.fulfilled, (state, action) => {
                const index = state.shops.findIndex(shop => shop.id === action.payload.id);
                if (index !== -1) {
                    state.shops[index] = action.payload;
                }
            })
            .addCase(addShop.fulfilled, (state, action) => {
                state.shops.push(action.payload);
            })
            .addCase(deleteShop.fulfilled, (state, action) => {
                const shopId = (action.meta.arg as any)?.deleteShopData?.shop?.id;
                if (shopId) {
                    state.shops = state.shops.filter(shop => shop.id !== shopId);
                }
            });
    }
});

export const shopClicked = (shop: Shop) => ({
    type: 'shops/shopClicked',
    payload: shop,
});

export const { actions } = shopsSlice;
export default shopsSlice.reducer;