import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchPenaltiesData = createAsyncThunk(
    'penalties/fetchData',
    async ({ filters, token }) => {
        const response = await fetch(`${URL}/api/report/get-penalties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(filters)
        });
        return await response.json();
    }
);
