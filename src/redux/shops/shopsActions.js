import { createAsyncThunk } from "@reduxjs/toolkit";
import {URL} from '../../service/config';

export const fetchShops = createAsyncThunk("shops", async (token) => {
    const res = await fetch(`${URL}/api/shop/all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": "JWT " + token
        },
      });
      const data = await res.json();
      return data;
})
