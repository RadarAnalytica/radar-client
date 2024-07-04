import { createAsyncThunk } from "@reduxjs/toolkit";
import {URL} from '../../service/config';


export const addShop = createAsyncThunk("addShop", async (addShopData) => {
    const {brandName, tkn, authToken } = addShopData
    const response = await fetch(URL + '/api/shop/', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "authorization": "JWT " + authToken,
        },
        body: JSON.stringify({
            brand_name: brandName,
            token: tkn,
            is_active: true
        })
    })
    const data = await response.json();
    return data
})