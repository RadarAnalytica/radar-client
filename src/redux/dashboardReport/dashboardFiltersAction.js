import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchDashboardFilters = createAsyncThunk(
    'dashboardFilters/fetchData',
    async ( token ) => {
        const res = await fetch(
            `${URL}/api/report/v2/get-dashboard-filters`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );
        
        const data = await res.json();
        
        let visibleMonthArray = []
        let visibleYearArray = []
        if (
            Object.values(data.date_sale_filter.months).filter(el => el === true).length === Object.values(data.date_sale_filter.months).length ||
            Object.values(data.date_sale_filter.months).filter(el => el === false).length === Object.values(data.date_sale_filter.months).length
        ) {
            visibleMonthArray = Object.keys(data.date_sale_filter.months)
        } else {
            visibleMonthArray = Object.keys(data.date_sale_filter.months).filter((el) => data.date_sale_filter.months[el])
        }
        if (
            Object.values(data.date_sale_filter.years).filter(el => el === true).length === Object.values(data.date_sale_filter.years).length ||
            Object.values(data.date_sale_filter.years).filter(el => el === false).length === Object.values(data.date_sale_filter.years).length
        ) {
            visibleYearArray = Object.keys(data.date_sale_filter.years)
        } else {
            visibleYearArray = Object.keys(data.date_sale_filter.years).filter((el) => data.date_sale_filter.years[el])
        }

        const week_data = {}
        for (let elem of Object.keys(data.date_sale_filter?.weekdays)) {
            const elemList = elem.split('-')
            if (elemList[1].startsWith('0')) {
                elemList[1] = elemList[1].replace('0', '')
            }
            
            if (visibleYearArray.includes(elemList[0]) && visibleMonthArray.includes(elemList[1])) {
                week_data[elem] = data.date_sale_filter?.weekdays[elem]
            }
        }
        return {
            wh: data.warehouse_name_filter,
            brand: data.brand_name_filter,
            year: data.date_sale_filter?.years,
            month: data.date_sale_filter?.months,
            monthOrigin: data.date_sale_filter?.months,
            week: week_data,
            weekOrigin: data.date_sale_filter?.weekdays,
            group: data.groups_filter,
        }
    }
);

