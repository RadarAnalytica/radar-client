import { createSlice } from "@reduxjs/toolkit";
import { fetchRequestsMonitoringData } from './requestsMonitoringActions'
import { optionsConfig } from "../../pages/skuFrequencyPage/shared";
import { tableConfig } from "../../pages/skuFrequencyPage/shared";

const initialState = {
    optionsConfig: [...optionsConfig],
    tableConfig: [...tableConfig],
    requestObject: undefined,
    requestStatus: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    requestData: undefined
};

const requestsMonitoringSlice = createSlice({
    name: "requestsMonitoring",
    initialState,
    reducers: {
        setRequestObject: (state, action) => {
            state.requestObject = action.payload
        },
        updateRequestObject: (state, action) => {
            return {
                ...state,
                requestObject: {
                    ...state.requestObject,
                    ...action.payload
                }
            }
        },
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload
        },
        updateOptionsConfig: (state, action) => {
            state.optionsConfig = action.payload
        },
        setDefaultOptionsConfig: (state, action) => {
           return {
            ...state,
            optionsConfig: [...optionsConfig]
           }
        },
        updateTableConfig: (state, action) => {
            state.tableConfig = JSON.parse(JSON.stringify(action.payload))
        },
        setDefaultTableConfig: (state) => {
            return {
                ...state,
                tableConfig: [...tableConfig]
               }
        }
    },
    extraReducers: (bulder) => {
        bulder
        .addCase(fetchRequestsMonitoringData.fulfilled, (state, action) => {
                state.requestData = action.payload;
        })
    }
});

export const { reducer, actions } = requestsMonitoringSlice;