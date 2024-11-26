import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchReportByGoods = createAsyncThunk(
    'weeklyReport/fetchByGoods',
    async ({ authToken, filters }) => {
        // Convert single string values to arrays
        const formattedFilters = {
            vendor_code_filter: Array.isArray(filters.vendor_code_filter) ? filters.vendor_code_filter : [filters.vendor_code_filter],
            size_name_filter: Array.isArray(filters.size_name_filter) ? filters.size_name_filter : [filters.size_name_filter],
            brand_name_filter: Array.isArray(filters.brand_name_filter) ? filters.brand_name_filter : [filters.brand_name_filter],
            country_filter: Array.isArray(filters.country_filter) ? filters.country_filter : [filters.country_filter],
            wb_id_filter: Array.isArray(filters.wb_id_filter) ? filters.wb_id_filter : [filters.wb_id_filter],
            subject_name_filter: Array.isArray(filters.subject_name_filter) ? filters.subject_name_filter : [filters.subject_name_filter],
            srid_filter: Array.isArray(filters.srid_filter) ? filters.srid_filter : [filters.srid_filter],
            groups_filter: Array.isArray(filters.groups_filter) ? filters.groups_filter : [filters.groups_filter],
            date_sale_filter: filters.date_sale_filter
        };

        const res = await fetch(`${URL}/api/report/get-by-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken,
            },
            body: JSON.stringify(formattedFilters),
        });
        return await res.json();
    }
);