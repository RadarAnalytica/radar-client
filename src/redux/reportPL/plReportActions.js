import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchPLReport = createAsyncThunk(
    'plReport/fetchData',
    async ({ brandFilter, groupFilter, token }) => {
        console.log('brandFilter', brandFilter);
        console.log('groupFilter', groupFilter);

        // Convert comma-separated strings to arrays
        const brandFilterArray = brandFilter.split(',');
        const groupFilterArray = groupFilter.split(',');

        const requestBody = {
            brand_filter: brandFilterArray,
            group_filter: groupFilterArray
        };
        
        
        const res = await fetch(
            `${URL}/api/report/p_l/data`,
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(requestBody)
            }
        );
        return await res.json();
    }
);

