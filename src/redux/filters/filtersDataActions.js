import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../service/config";

export const fetchDashboardFilters = createAsyncThunk(
    "filters/fetchDashboardFilters",
    async (authToken) => {
        const response = await fetch(`${URL}/api/report/get-dashboard-filters`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'JWT ' + authToken,
            },
        });
        const data = await response.json();
        return data;
    }
);
