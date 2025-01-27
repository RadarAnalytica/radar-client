import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchPLFilters = createAsyncThunk(
    'plFilters/fetchData',
    async ( token ) => {
        const res = await fetch(
            `${URL}/api/report/v2/p_l/filters`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );
        
        const data = await res.json();
        return {
            'brand': data.brand_filter,
            'group': data.group_filter,
        }
    }
);

