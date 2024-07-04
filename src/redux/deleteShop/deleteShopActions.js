import { createAsyncThunk } from "@reduxjs/toolkit";
import {URL} from '../../service/config';


export const deleteShop = createAsyncThunk("deleteShop", async (deleteShopData) => {
    const {shop, authToken} = deleteShopData
    const response = await fetch(URL + '/api/shop/' + shop?.id, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "authorization": "JWT " + authToken
        },
    })
})