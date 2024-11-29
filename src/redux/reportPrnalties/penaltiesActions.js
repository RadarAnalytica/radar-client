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
            body: JSON.stringify({
                size_name_filter: filters.size || [],
                wb_id_filter: filters.article || [],
                srid_filter: filters.srid || [],
                title_filter: filters.goods || [],
                action_type_filter: filters.kindsOfLogistics || [],
                date_sale_filter: {
                    years: filters.year || [],
                    months: filters.month || [],
                    weekdays: filters.week || []
                }
            })
        });
        return await response.json();
    }
);
