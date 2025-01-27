import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store'
import { URL } from '../../service/config';

export const fetchReportByMonth = createAsyncThunk(
    'weeklyReport/fetchByMonth',
    async ({ authToken }) => {
        // Convert single string values to arrays
        const storeFilterData = store.getState().byMonthFiltersSlice.byMonthFilters
        
        if (Object.keys(storeFilterData).length === 0) {
            return {}
        }

        const sizeFilterData = storeFilterData.size
        const vendorCodeFilterData = storeFilterData.vendorCode
        const productFilterData = storeFilterData.product
        const groupFilterData = storeFilterData.group
        const brandFilterData = storeFilterData.brand
        const countryFilterData = storeFilterData.country
        const wbIdFilterData = storeFilterData.wbId
        const subjectFilterData = storeFilterData.subject
        const sridFilterData = storeFilterData.srid
        const yearFilterData = storeFilterData.year
        const monthFilterData = storeFilterData.month
        const weekFilterData = storeFilterData.week

        const sizeFilter = []
        const vendorCodeFilter = []
        const productFilter = []
        const groupFilter = []
        const brandFilter = []
        const countryFilter = []
        const wbIdFilter = []
        const subjectFilter = []
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
        if (!!vendorCodeFilterData && Object.keys(vendorCodeFilterData).length > 0) {
            for (let _key of Object.keys(vendorCodeFilterData)) {
                if (!!vendorCodeFilterData[_key]) {
                    vendorCodeFilter.push(_key)
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
        if (!!groupFilterData && Object.keys(groupFilterData).length > 0) {
            for (let _key of Object.keys(groupFilterData)) {
                if (!!groupFilterData[_key]) {
                    groupFilter.push(_key)
                }
            }
        }
        if (!!brandFilterData && Object.keys(brandFilterData).length > 0) {
            for (let _key of Object.keys(brandFilterData)) {
                if (!!brandFilterData[_key]) {
                    brandFilter.push(_key)
                }
            }
        }
        if (!!countryFilterData && Object.keys(countryFilterData).length > 0) {
            for (let _key of Object.keys(countryFilterData)) {
                if (!!countryFilterData[_key]) {
                    countryFilter.push(_key)
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
        if (!!subjectFilterData && Object.keys(subjectFilterData).length > 0) {
            for (let _key of Object.keys(subjectFilterData)) {
                if (!!subjectFilterData[_key]) {
                    subjectFilter.push(_key)
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

        const formattedFilters = {
            vendor_code_filter: vendorCodeFilter,
            size_name_filter: sizeFilter,
            brand_name_filter: brandFilter,
            country_filter: countryFilter,
            wb_id_filter: wbIdFilter,
            title_filter: productFilter,
            subject_name_filter: subjectFilter,
            srid_filter: sridFilter,
            groups_filter: groupFilter,
            date_sale_filter: {
                years: yearFilter,
                months: monthFilter,
                weekdays: weekFilter,
            },
        };

        const res = await fetch(`${URL}/api/report/get-by-month`, {
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
