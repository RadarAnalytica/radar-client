import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as skuAnalysisActions } from './skuAnalysisSlice'


export const fetchSkuAnalysisMainChartData = createAsyncThunk(
    'skuChartData',
    async (reqData, { dispatch }) => {
      try {
        let queryString = `?wb_id=${reqData.id}`
        if (reqData.selectedRange.period) {
            queryString += `&period=${reqData.selectedRange.period}`
        }
        if (reqData.selectedRange.from && reqData.selectedRange.to) {
             queryString += `&date_from=${reqData.selectedRange.from}&date_to=${reqData.selectedRange.to}`
        }
        const res = await fetch(`https://radarmarket.ru/api/web-service/product-analysis/charts${queryString}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });
        if (!res.ok) {
          const data = await res.json();
          dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: true, message: data.detail ? data.detail : 'Что-то пошло не так :('}))
        }
        const data = await res.json();
        dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: false, message: ''}))
        dispatch(skuAnalysisActions.skuSearchHistoryAdd(reqData.id))
        return data;
      } catch (e) {
        dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: true, message: 'Что-то пошло не так :('}))
      }
    }
);

export const fetchSkuAnalysisSkuData = createAsyncThunk(
    'skuMainData',
    async (reqData, { dispatch }) => {
      try {
        let queryString = `?wb_id=${reqData.id}`
        if (reqData.selectedRange.period) {
            queryString += `&period=${reqData.selectedRange.period}`
        }
        if (reqData.selectedRange.from && reqData.selectedRange.to) {
            queryString += `&date_from=${reqData.selectedRange.from}&date_to=${reqData.selectedRange.to}`
        }
        const res = await fetch(`https://radarmarket.ru/api/web-service/product-analysis/product-meta${queryString}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });
        if (!res.ok) {
          const data = await res.json();
          dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: true, message: data.detail ? data.detail : 'Что-то пошло не так :('}))
        }
        const data = await res.json();
        dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: false, message: ''}))
        dispatch(skuAnalysisActions.skuSearchHistoryAdd(reqData.id))
        return data;
      } catch {
        dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: true, message: 'Что-то пошло не так :('}))
      }
    }
);
export const fetchSkuAnalysisIndicatorsData = createAsyncThunk(
    'skuIndicatorsData',
    async (reqData, { dispatch }) => {
      try {
        let queryString = `?wb_id=${reqData.id}`
        if (reqData.selectedRange.period) {
            queryString += `&period=${reqData.selectedRange.period}`
        }
        if (reqData.selectedRange.from && reqData.selectedRange.to) {
            queryString += `&date_from=${reqData.selectedRange.from}&date_to=${reqData.selectedRange.to}`
        }
        const res = await fetch(`https://radarmarket.ru/api/web-service/product-analysis/indicators${queryString}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });
        if (!res.ok) {
          const data = await res.json();
          dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: true, message: data.detail ? data.detail : 'Что-то пошло не так :('}))
        }
        const data = await res.json();
        dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: false, message: ''}))
        dispatch(skuAnalysisActions.skuSearchHistoryAdd(reqData.id))
        return data;
      } catch {
        dispatch(skuAnalysisActions.setDataStatus({isLoading: false, isError: true, message: 'Что-то пошло не так :('}))
      }
    }
);