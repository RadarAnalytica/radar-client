import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceFunctions } from '../../service/serviceFunctions';

export const fetchDashboardReport = createAsyncThunk(
    'dashboardReport/fetchDashboardReport',
    async ({ token, filterData }) => {
        console.log('filterData:', filterData);
        const response = await ServiceFunctions.postDashboardFilters(token, filterData);
        console.log('response', response);
        
        return response;
    }
);
