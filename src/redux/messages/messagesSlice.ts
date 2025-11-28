import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../../service/fetchApi';

// Types based on API response structure
export interface Message {
    id: number;
    title: string;
    text: string;
    type: 'note' | 'recommendation';
    created_at: string;
}

interface MessagesState {
    messages: Message[] | undefined;
    isLoading: boolean;
    error: string | null;
}

export const fetchMessages = createAsyncThunk(
    'messages',
    async (token: string) => {
        try {
            const response = await fetchApi('/api/msg/', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: 'JWT ' + token,
                },
            });

            if (!response.ok) {
                console.error('Failed to fetch messages');
                return []
            }


            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch messages');
        }
    }
);

const initialState: MessagesState = {
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
