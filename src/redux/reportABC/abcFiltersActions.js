import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

export const fetchABCFilters = createAsyncThunk(
    'abcFilters/fetchData',
    async ( token ) => {
        const res = await fetch(
            `${URL}/api/report/v2/abc/filters`,
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
            Object.values(data.month_filter).filter(el => el === true).length === Object.values(data.month_filter).length ||
            Object.values(data.month_filter).filter(el => el === false).length === Object.values(data.month_filter).length
        ) {
            visibleMonthArray = Object.keys(data.month_filter)
        } else {
            visibleMonthArray = Object.keys(data.month_filter).filter((el) => data.month_filter[el])
        }
        if (
            Object.values(data.year_filter).filter(el => el === true).length === Object.values(data.year_filter).length ||
            Object.values(data.year_filter).filter(el => el === false).length === Object.values(data.year_filter).length
        ) {
            visibleYearArray = Object.keys(data.year_filter)
        } else {
            visibleYearArray = Object.keys(data.year_filter).filter((el) => data.year_filter[el])
        }

        const week_data = {}
        for (let elem of Object.keys(data.week_filter)) {
            const elemList = elem.split('-')
            if (elemList[1].startsWith('0')) {
                elemList[1] = elemList[1].replace('0', '')
            }
            
            if (visibleYearArray.includes(elemList[0]) && visibleMonthArray.includes(elemList[1])) {
                week_data[elem] = data.week_filter[elem]
            }
        }
        
        return {
            brand: data.brand_filter,
            year: data.year_filter,
            month: data.month_filter,
            monthOrigin: data.month_filter,
            week: week_data,
            weekOrigin: data.week_filter,
            group: data.group_filter,
            wbId: data.article_filter,
            product: data.product_filter,
        }
    }
);

