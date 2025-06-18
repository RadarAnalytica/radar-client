import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as skuAnalysisActions } from './supplierAnalysisSlice'
import { actions as supplierAnalysisActions } from './supplierAnalysisSlice';


export const fetchSupplierAnalysisBarsData = createAsyncThunk(
    'supplierAnalysisBarsData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'barsData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
        // let queryString = `?wb_id=${reqData.id}`
        // if (reqData.selectedRange.period) {
        //     queryString += `&period=${reqData.selectedRange.period}`
        // }
        // if (reqData.selectedRange.from && reqData.selectedRange.to) {
        //      queryString += `&date_from=${reqData.selectedRange.from}&date_to=${reqData.selectedRange.to}`
        // }
        const res = await fetch(`https://radarmarket.ru/api/web-service/product-analysis/charts`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });
        if (!res.ok) {
          const data = await res.json();
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'barsData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
        }
        const data = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'barsData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return data;
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'barsData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);
export const fetchSupplierAnalysisMainChartData = createAsyncThunk(
    'supplierAnalysisMainChartData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'mainChartData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
        // let queryString = `?wb_id=${reqData.id}`
        // if (reqData.selectedRange.period) {
        //     queryString += `&period=${reqData.selectedRange.period}`
        // }
        // if (reqData.selectedRange.from && reqData.selectedRange.to) {
        //      queryString += `&date_from=${reqData.selectedRange.from}&date_to=${reqData.selectedRange.to}`
        // }
        const res = await fetch(`https://radarmarket.ru/api/web-service/product-analysis/charts`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });
        if (!res.ok) {
          const data = await res.json();
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'mainChartData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
        }
        const data = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'mainChartData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return data;
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'mainChartData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);

