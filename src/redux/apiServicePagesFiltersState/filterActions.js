import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { setLoading } from '../loading/loadingSlice';



/**
 * "shops": [
            {
                "shop_data": {
                    "id": 81,
                    "brand_name": "Test (no collect)",
                    "is_active": true,
                    "is_valid": false,
                    "is_primary_collect": true,
                    "updated_at": "2024-10-18T03:28:29.901783"
                },
                "brands": [
                    {
                        "name": "Nike",
                        "wb_id": [
                            "NE23D-S982C/172",
                            "NE23D-S982C/391",
                            "NE23D-S982C/596",
                            "NE23D-S982C/701",
                            "NE23D-S982C/882",
                            "NE23MD-S991C/354",
                            "NE23MD-S991C/530",
                            "NE23MD-S991C/596",
                            "NE23MD-S991C/701",
                            "NE23MD-S991C/882"
                        ]
                },
                "groups": [
                    {
                        "id": 2,
                        "name": "1"
                    },
                    {
                        "id": 15,
                        "name": "123"
                    }
                ]
 */
const createFiltersDTO = (data) => {

   

    
    const shops = data.map(_ => ({..._.shop_data, value: _.shop_data.name}))
    const DTO = data?.map(i => {
      let newItem = {
        shop: {
          ...i.shop_data,
          value: i.shop_data.name
        },
        brands: i.brands?.map(_ => ({name: _.name, value: _.name, articles: _.wb_id.map(_ => ({ value: _}))})),
        groups: i.groups.map(_ => ({..._, value: _.name}))
      }

      return newItem
    })

    return {shops, filtersData: DTO}
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
      if (data?.data?.shops) {
        return createFiltersDTO(data.data.shops);
      }
     
    } catch (e) {
      throw e;
    } finally {
      //dispatch(setLoading(false));
    }
  }
);
