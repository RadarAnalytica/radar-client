import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { store } from '../store';

export const fetchPLReport = createAsyncThunk(
    'plReport/fetchData',
    async ({ token }) => {
        try {
            const plFilters = store.getState().plFiltersSlice.plFilters;

            if (Object.keys(plFilters).length === 0) {
                return [];
            }

            const brandFilterData = plFilters.brand;
            const groupFilterData = plFilters.group;
            const monthFilterData = plFilters.month;
            console.log(monthFilterData);
            const brandFilter = [];
            const groupFilter = [];
            const monthFilter = [];
            if (!!brandFilterData && Object.keys(brandFilterData).length > 0) {
                for (let _key of Object.keys(brandFilterData)) {
                if (brandFilterData[_key]) {
                    brandFilter.push(_key);
                }
                }
            }
            if (!!groupFilterData && Object.keys(groupFilterData).length > 0) {
                for (let _key of Object.keys(groupFilterData)) {
                if (groupFilterData[_key]) {
                    groupFilter.push(_key);
                }
                }
            }
            if (!!monthFilterData && Object.keys(monthFilterData).length > 0) {
                for (let _key of Object.keys(monthFilterData)) {
                if (monthFilterData[_key]) {
                    monthFilter.push(_key);
                }
                }
            }

            const res = await fetch(
                `${URL}/api/report/v2/p_l/data`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({
                        brand_filter: brandFilter,
                        group_filter: groupFilter,
                        month_filter: monthFilter
                    })
                }
            );

            return await res.json();
        } catch (error) {
            console.error(error);
        }


    }
);

export const switchPLFilters = createAsyncThunk(

);

