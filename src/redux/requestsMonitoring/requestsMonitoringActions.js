import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as reqMonitoringActions } from './requestsMonitoringSlice'


export const fetchRequestsMonitoringData = createAsyncThunk(
    'requestMonitoringData',
    async (reqData, { dispatch }) => {
      dispatch(reqMonitoringActions.setRequestStatus({isLoading: true, isError: false, isSuccess: false, message: ''}))
      try {
      
        const res = await fetch(`https://radarmarket.ru/api/web-service/monitoring-oracle/get`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
        if (!res.ok) {
          const data = await res.json();
          dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: true, isSuccess: false, message: data.detail ? data.detail : 'Что-то пошло не так :('}))
        }
        const data = await res.json();
        dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: false, isSuccess: true, message: ''}))
        return data.queries;
      } catch (e) {
        dispatch(reqMonitoringActions.setRequestStatus({isLoading: false, isError: true, isSuccess: false, message: 'Что-то пошло не так :('}))
      }
    }
);


