import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../service/config";

export const fetchUserData = createAsyncThunk(
    "userData",
    async (authToken) => {
        const response = await fetch(`${URL}/api/user`, {
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