import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { store } from '../store'

export const fetchDashboardReport = createAsyncThunk(
    'dashboardReport/fetchDashboardReport',
    async ({ token }) => {

        const storeFilterData = store.getState().dashboardFiltersSlice.dashboardFilters

        if (Object.keys(storeFilterData).length === 0) {
            return {}
        }

        const whFilterData = storeFilterData.wh
        const brandFilterData = storeFilterData.brand
        const yearFilterData = storeFilterData.year
        const monthFilterData = storeFilterData.month
        const weekFilterData = storeFilterData.week
        const groupFilterData = storeFilterData.group

        const whFilter = []
        const brandFilter = []
        const yearFilter = []
        const monthFilter = []
        const weekFilter = []
        const groupFilter = []
        
        if (!!whFilterData && Object.keys(whFilterData).length > 0) {
            for (let _key of Object.keys(whFilterData)) {
                if (!!whFilterData[_key]) {
                    whFilter.push(_key)
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
        if (!!groupFilterData && Object.keys(groupFilterData).length > 0) {
            for (let _key of Object.keys(groupFilterData)) {
                if (!!groupFilterData[_key]) {
                    groupFilter.push(_key)
                }
            }
        }
        const filterData = {
            warehouse_name_filter: whFilter,
            brand_name_filter: brandFilter,
            date_sale_filter: {
                years: yearFilter,
                months: monthFilter,
                weekdays: weekFilter,
            },
            groups_filter: groupFilter,
        }
        const response = await ServiceFunctions.postDashboardFilters(token, filterData);
        return response;
    }
);
