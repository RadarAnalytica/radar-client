import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchExternalExpenses = createAsyncThunk(
    'externalExpenses/fetchExternalExpenses',
    async (authToken) => {
        const response = await fetch(`${URL}/api/report/external-expenses`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'JWT ' + authToken,
            },
        });
        const data = await response.json();
        return data;
    }
);
