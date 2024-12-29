import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchPLReport = createAsyncThunk(
    'plReport/fetchData',
    async ({ brandFilter, groupFilter, token }) => {
        console.log('brandFilter', brandFilter);
        console.log('groupFilter', groupFilter);
        
        
        const res = await fetch(
            `${URL}/api/report/p_l/data`,
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    brand_filter: brandFilter,
                    group_filter: groupFilter
                })
            }
        );
        return await res.json();
    }
);

