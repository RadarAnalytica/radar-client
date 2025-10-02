import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as reqMonitoringActions } from './requestsMonitoringSlice'
import { fetchApi } from "@/service/fetchApi";

export const fetchRequestsMonitoringData = createAsyncThunk(
    'requestMonitoringData',
    async (data, { dispatch }) => {
      const { requestObject: reqData, requestData: currdata } = data;

      dispatch(reqMonitoringActions.setRequestStatus({isLoading: !currdata ? true : false, isError: false, isSuccess: false, message: ''}));
      dispatch(reqMonitoringActions.setButtonStatus(true));

      try {
        const res = await fetchApi(`https://radarmarket.ru/api/web-service/monitoring-oracle/get`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });

        if (!res.ok) {
          dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: true, isSuccess: false, message: 'Что-то пошло не так :('}))
          dispatch(reqMonitoringActions.setButtonStatus(false))
        }

        const data = await res.json();
        dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: false, isSuccess: true, message: ''}))
        dispatch(reqMonitoringActions.setButtonStatus(false))
        return data;
      } catch (e) {
        dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: true, isSuccess: false, message: 'Что-то пошло не так :('}))
        dispatch(reqMonitoringActions.setButtonStatus(false))
      }
    }
);

export const fetchRequestsMonitoringDataEasy = createAsyncThunk(
    'requestMonitoringDataEasy',
    async (data, { dispatch }) => {
      const { requestObject: reqData, requestData: currdata } = data
      dispatch(reqMonitoringActions.setRequestStatus({isLoading:  !currdata ? true : false, isError: false, isSuccess: false, message: ''}))
      dispatch(reqMonitoringActions.setButtonStatus(true))
      try {
        const res = await fetchApi(`https://radarmarket.ru/api/web-service/monitoring-oracle/easy/get`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });

        if (!res.ok) {
          const data = await res.json();
          dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: true, isSuccess: false, message: data.detail ? data.detail : 'Что-то пошло не так :('}))
          dispatch(reqMonitoringActions.setButtonStatus(false))
        }

        const data = await res.json();
        dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: false, isSuccess: true, message: ''}))
        dispatch(reqMonitoringActions.setButtonStatus(false))
        return data;
      } catch (e) {
        dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: true, isSuccess: false, message: 'Что-то пошло не так :('}))
        dispatch(reqMonitoringActions.setButtonStatus(false))
      }
    }
);


