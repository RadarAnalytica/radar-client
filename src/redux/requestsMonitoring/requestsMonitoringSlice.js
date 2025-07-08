import { createSlice } from "@reduxjs/toolkit";
import { fetchRequestsMonitoringData, fetchRequestsMonitoringDataEasy } from './requestsMonitoringActions'
import { optionsConfig } from "../../pages/skuFrequencyPage/shared";
import { tableSettings } from "../../pages/skuFrequencyPage/shared/configs/tableConfig";

const initialState = {
    optionsConfig: [...optionsConfig],
    tableConfig: tableSettings,
    requestObject: undefined,
    requestStatus: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    isLoadingForButton: false,
    formType: undefined,
    requestData: undefined,
    pagination: {
        limit: 25,
        page: 1,
        total_pages: 1
    }
};

const requestsMonitoringSlice = createSlice({
    name: "requestsMonitoring",
    initialState,
    reducers: {
        setRequestObject: (state, action) => {
            return {
                ...state,
                requestObject: action.payload.data,
                formType: action.payload.formType
            }
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
        updatePagination: (state, action) => {
            return {
                ...state,
                requestObject: {
                    ...state.requestObject,
                   page: action.payload.page
                },
                pagination: {
                    ...state.pagination,
                    page: action.payload.page
                }
            }
        },
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload
        },
        setButtonStatus: (state, action) => {
            state.isLoadingForButton = action.payload
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
            localStorage.setItem('rmTableConfig', JSON.stringify(action.payload))
            state.tableConfig = JSON.parse(JSON.stringify(action.payload))
        },
        setDefaultTableConfig: (state) => {
            return {
                ...state,
                //tableConfig: [...tableConfig]
               }
        },
        resetState: () => {
            return initialState
        }
    },
    extraReducers: (bulder) => {
        bulder
        .addCase(fetchRequestsMonitoringData.fulfilled, (state, action) => {
            const { queries, limit, total_pages, page } = action.payload
            return {
                ...state,
                requestData: queries,
                pagination: {
                    limit,
                    page,
                    total_pages: limit * total_pages
                }
            }
              //  state.requestData = action.payload;
        })
        .addCase(fetchRequestsMonitoringDataEasy.fulfilled, (state, action) => {
            const { queries, limit, total_pages, page } = action.payload
            return {
                ...state,
                requestData: queries,
                pagination: {
                    limit,
                    page,
                    total_pages: limit * total_pages
                }
            }
               // state.requestData = action.payload;
        })
    }
});

export const { reducer, actions } = requestsMonitoringSlice;