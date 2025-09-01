import { createSlice } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk(
    'messages',
    async (token) => {
        try {
            const response = await axios.get(`${URL}/api/msg/`, {
            // const response = await axios.get(`${URL}/api/msg`, {
            //     headers: {
            //         'content-type': 'application/json',
            //         authorization: 'JWT ' + token,
            //     },
            // });
            // const response = await fetch(`${URL}/api/msg/`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: 'JWT ' + token,
                },
            });
            return response.data;

        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    messages: undefined,
    isLoading: false,
    error: null,
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages = action.payload;
        });
        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export const { } = messagesSlice.actions;
export default messagesSlice.reducer;