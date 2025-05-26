import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { setLoading } from '../loading/loadingSlice';

const createFiltersDTO = (data) => {
    if (!data) return
    let filtersDTO = {
        // shops: {
        //     stateKey: 'activeBrand',
        //     ruLabel: 'Магазин',
        //     enLabel: 'shops',
        //     data: [],
        //     hasAllValue: true
        // },
        brands: {
            stateKey: 'activeBrandName',
            ruLabel: 'Бренд',
            enLabel: 'brands',
            data: [],
            hasAllValue: false
        },
        articles: {
            stateKey: 'activeArticle',
            ruLabel: 'Артикул',
            enLabel: 'articles',
            data: [],
            hasAllValue: false
        },
        product_groups: {
            stateKey: 'activeGroup',
            ruLabel: 'Группа товаров',
            enLabel: 'product_groups',
            data: [],
            hasAllValue: false
        },
    }

    Object.keys(data).forEach(key => {
        const isInObject = Object.keys(filtersDTO).some(_ => _ === key);
        if (isInObject && key !== 'shops') {
            let normilizedData = [];
            if (key === 'articles') {normilizedData = [{ value: 'Все' },...data[key].map(_ => ({ value: _.article}))]}
            if (key === 'product_groups') {normilizedData = [{id: 0, value: 'Все'},...data[key].map(_ => ({ value: _.name, id: _.id}))]}
            if (key === 'brands') {normilizedData = [{ value: 'Все' },...data[key].map(_ => ({ value: _.brand}))]}
            //if (key === 'shops') {normilizedData = [{id: 0, value: 'Все'},...data[key].map(_ => ({ value: _.name, id: _.id}))]}
            filtersDTO[key].data = normilizedData;
        }
    })

    return {filtersData: filtersDTO, initState: {activeBrandName: {value: 'Все'}, activeArticle: {value: 'Все'}, activeGroup: {id: 0, value: 'Все'}}}
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
      return createFiltersDTO(data?.data);
    } catch (e) {
      throw e;
    } finally {
      //dispatch(setLoading(false));
    }
  }
);
