import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchSkuAnalysisMainChartData = createAsyncThunk(
    'skuChartData',
    async (reqData, { dispatch }) => {
      try {
        let queryString = `?wb_id=${reqData.id}`
        if (reqData.selectedRange.period) {
            queryString += `&period=${reqData.selectedRange.period}`
        }
        if (reqData.selectedRange.from && reqData.selectedRange.to) {
            queryString += `&from=${reqData.selectedRange.from}&to=${reqData.selectedRange.to}`
        }
        console.log(queryString)
        const res = await fetch(`https://radarmarket.ru/api/web-service/product-analysis/charts${queryString}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: 'JWT ' + reqData.token,
          },
        });
        const data = await res.json();
        return data;
      } catch (e) {
        throw e;
      }
    }
);