import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { setLoading } from '../loading/loadingSlice';

const createFiltersDTO = (data) => {
    if (!data) return
    let filtersDTO = {
        articles: {
            ruLabel: 'Артикул',
            enLabel: 'articles',
            data: [],
            hasAllValue: false
        },
        product_groups: {
            ruLabel: 'Группа товаров',
            enLabel: 'product_groups',
            data: [],
            hasAllValue: false
        },
        brands: {
            ruLabel: 'Бренд',
            enLabel: 'brands',
            data: [],
            hasAllValue: false
        },
        shops: {
            ruLabel: 'Магазин',
            enLabel: 'shops',
            data: [],
            hasAllValue: true
        },
    }

    Object.keys(data).forEach(key => {
        const isInObject = Object.keys(filtersDTO).some(_ => _ === key);
        if (isInObject) {
            let normilizedData = [];
            if (key === 'articles') {normilizedData = data[key].map(_ => ({ value: _.article}))}
            if (key === 'product_groups') {normilizedData = data[key].map(_ => ({ value: _.name}))}
            if (key === 'brands') {normilizedData = data[key].map(_ => ({ value: _.brand}))}
            if (key === 'shops') {normilizedData = data[key].map(_ => ({ value: _.name}))}

            filtersDTO[key].data = normilizedData;
        }
    })

    
}

export const fetchFilters = createAsyncThunk(
  'filters',
  async (token, { dispatch }) => {
    try {
      //dispatch(setLoading(true));

      let data = null;
      const res = await fetch(`${URL}/api/common/filters`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },
      });
      data = await res.json();
      return data.data;
    } catch (e) {
      throw e;
    } finally {
      //dispatch(setLoading(false));
    }
  }
);
