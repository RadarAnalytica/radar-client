import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { store } from '../store'


export const fetchPenaltiesData = createAsyncThunk(
    'penalties/fetchData',
    async ({  token }) => {
        const storeFilterData = store.getState().penaltyFiltersSlice.penaltyFilters
                
        if (Object.keys(storeFilterData).length === 0) {
            return {}
        }
        const sizeFilterData = storeFilterData.size
        const productFilterData = storeFilterData.product
        const wbIdFilterData = storeFilterData.wbId
        const typesFilterData = storeFilterData.types
        const sridFilterData = storeFilterData.srid
        const yearFilterData = storeFilterData.year
        const monthFilterData = storeFilterData.month
        const weekFilterData = storeFilterData.week

        const sizeFilter = []
        const productFilter = []
        const wbIdFilter = []
        const typesFilter = []
        const sridFilter = []
        const yearFilter = []
        const monthFilter = []
        const weekFilter = []

        if (!!sizeFilterData && Object.keys(sizeFilterData).length > 0) {
            for (let _key of Object.keys(sizeFilterData)) {
                if (!!sizeFilterData[_key]) {
                    sizeFilter.push(_key)
                }
            }
        }
        if (!!productFilterData && Object.keys(productFilterData).length > 0) {
            for (let _key of Object.keys(productFilterData)) {
                if (!!productFilterData[_key]) {
                    productFilter.push(_key)
                }
            }
        }
        if (!!wbIdFilterData && Object.keys(wbIdFilterData).length > 0) {
            for (let _key of Object.keys(wbIdFilterData)) {
                if (!!wbIdFilterData[_key]) {
                    wbIdFilter.push(_key)
                }
            }
        }
        if (!!typesFilterData && Object.keys(typesFilterData).length > 0) {
            for (let _key of Object.keys(typesFilterData)) {
                if (!!typesFilterData[_key]) {
                    typesFilter.push(_key)
                }
            }
        }
        if (!!sridFilterData && Object.keys(sridFilterData).length > 0) {
            for (let _key of Object.keys(sridFilterData)) {
                if (!!sridFilterData[_key]) {
                    sridFilter.push(_key)
                }
            }
        }
        if (!!yearFilterData && Object.keys(yearFilterData).length > 0) {
            for (let _key of Object.keys(yearFilterData)) {
                if (!!yearFilterData[_key]) {
                    yearFilter.push(_key)
                }
            }
        }
        if (!!monthFilterData && Object.keys(monthFilterData).length > 0) {
            for (let _key of Object.keys(monthFilterData)) {
                if (!!monthFilterData[_key]) {
                    monthFilter.push(_key)
                }
            }
        }
        if (!!weekFilterData && Object.keys(weekFilterData).length > 0) {
            for (let _key of Object.keys(weekFilterData)) {
                if (!!weekFilterData[_key]) {
                    weekFilter.push(_key)
                }
            }
        }

        const filters = {
            size_name_filter: sizeFilter,
            wb_id_filter: wbIdFilter,
            title_filter: productFilter,
            action_type_filter: typesFilter,
            srid_filter: sridFilter,
            date_sale_filter: {
                years: yearFilter,
                months: monthFilter,
                weekdays: weekFilter,
            },
        };

        const response = await fetch(`${URL}/api/report/get-penalties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(filters)
        });

        const result = await response.json();
        
        return result;
    }
);
