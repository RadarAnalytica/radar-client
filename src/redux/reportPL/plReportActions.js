import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchPLReport = createAsyncThunk(
    'plReport/fetchData',
    async ({ brandFilter, groupFilter, token }) => {
        const res = await fetch(
            `${URL}/api/report/p_l/data?brand_filter=${brandFilter}&group_filter=${groupFilter}`,
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': token
                }
            }
        );
        return await res.json();
    }
);

