import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as skuAnalysisActions } from './supplierAnalysisSlice'
import { actions as supplierAnalysisActions } from './supplierAnalysisSlice';

const createChartDataDTO = (data) => {
  let DTO = {
    dates: data.map(_ => _.date)
  }

  const keys = Object.keys(data[0]) 
  keys.forEach(key => {
    if (key !== 'date') {
      DTO = {
        ...DTO,
        [key]: data.map(_ => ({date: _.date, item: _[key]}))
      }
    }
  })
  return DTO
}


export const fetchSupplierAnalysisMetaData = createAsyncThunk(
    'supplierAnalysisMetaData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'metaData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
        let res = await fetch(`https://radarmarket.ru/api/web-service/supplier-analysis/supplier-meta`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          res = await res.json();
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'metaData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
          return
        }

        res = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'metaData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return res;
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'metaData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);
export const fetchSupplierAnalysisIndicatorsData = createAsyncThunk(
    'supplierAnalysisIndicatorsData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'indicatorsData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {

        let res = await fetch(`https://radarmarket.ru/api/web-service/supplier-analysis/supplier-indicators`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          res = await res.json();
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'indicatorsData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
        }
        res = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'indicatorsData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return res;
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'indicatorsData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);
export const fetchSupplierAnalysisMainChartData = createAsyncThunk(
    'supplierAnalysisMainChartData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'mainChartData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
       
        const res = await fetch(`https://radarmarket.ru/api/web-service/supplier-analysis/supplier-charts`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          const data = await res.json();
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'mainChartData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
        }
        const data = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'mainChartData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return createChartDataDTO(data);
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'mainChartData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);
export const fetchSupplierAnalysisByDatesTableData = createAsyncThunk(
    'supplierAnalysisByDatesTableData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byDatesTableData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
       
        const res = await fetch(`https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-date`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          const data = await res.json();
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byDatesTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
        }
        const data = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byDatesTableData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return data;
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byDatesTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);
export const fetchSupplierAnalysisBrandsData = createAsyncThunk(
    'supplierAnalysisBrandsData',
    async (reqData, { dispatch }) => {
      //dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byDatesTableData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
       
        const res = await fetch(`https://radarmarket.ru/api/web-service/supplier-analysis/supplier-brands`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          return
          //dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byDatesTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
        }
        const data = await res.json();
        //dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byDatesTableData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return [
          {brand_id: 0, brand_name: 'Все бренды'},
          ...data
        ];
      } catch (e) {
        //dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byDatesTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);
export const fetchSupplierAnalysisByBrandTableData = createAsyncThunk(
    'supplierAnalysisByBrandTableData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byBrandsTableData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
       
        const res = await fetch(`https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-product`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byBrandsTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
          return
        }
        const data = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byBrandsTableData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return data.goods
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byBrandsTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);
export const fetchSupplierAnalysisBySubjectsTableData = createAsyncThunk(
    'supplierAnalysisBySubjectsTableData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'bySubjectsTableData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
       
        const res = await fetch(`https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-subject`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'bySubjectsTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
          return
        }
        const data = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'bySubjectsTableData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return data.subjects
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'bySubjectsTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);
export const fetchSupplierAnalysisByWarehousesTableData = createAsyncThunk(
    'supplierAnalysisByWarehousesTableData',
    async (reqData, { dispatch }) => {
      dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byWarehousesTableData', statusObject: {isLoading: true, isError: false, isSuccess: false, message: ''}}))
      try {
       
        const res = await fetch(`https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-warehouse`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byWarehousesTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
          return
        }
        const data = await res.json();
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byWarehousesTableData', statusObject: {isLoading: false, isError: false, isSuccess: true, message: ''}}))
        return data
      } catch (e) {
        dispatch(supplierAnalysisActions.setDataFetchingStatus({dataType: 'byWarehousesTableData', statusObject: {isLoading: false, isError: true, isSuccess: false, message: ''}}))
      }
    }
);

