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
  // 1 - создаем массив всех магазинов + опцию "Все магазины"
  const shops = [{ brand_name: 'Все', value: 'Все', id: 0, is_primary_collect: data.some(_ => _.shop_data.is_primary_collect), is_self_cost_set: !data.some(_ => !_.shop_data.is_self_cost_set) }, ...data.map(_ => ({ ..._.shop_data, value: _.shop_data.name }))]
  // 2 - Трансформируем дату для опции "все магазины"
  // 2.1 - выцепляем все бренды по всем магазинам
  // 2.2 - выцепляем все артикулы всех брендов по всем магазинам
  // 2.3  - выцепляем все группы всех магазинов
  const allBransdData = []
  const allArticlesData = []
  const allGroupsData = []
  data.forEach((_, id) => {
    _.groups.forEach(g => {
      allGroupsData.push({ ...g, value: g.name, key: g.id })
    })
    _.brands.forEach((b, barndId) => {
      if (_.shop_data.is_primary_collect) {
        allBransdData.push({
          name: b.name ? b.name : `Без названия&${_.shop_data.id}`,
          value: b.name ? b.name : `Без названия (${_.shop_data.brand_name})`,
        })
      }
      b.wb_id.forEach(a => {
        if (_.shop_data.is_primary_collect) {
          allArticlesData.push({ name: a, value: a, brand: b.name ? b.name : `Без названия (${_.shop_data.brand_name})` })
        }
      })
    })
  })
  // 2.4 - собираем обьект для "все магазины"
  const allShopsOption = {
    shop: shops[0],
    brands: {
      stateKey: 'activeBrandName',
      ruLabel: 'Бренд',
      enLabel: 'brands',
      data: allBransdData
    },
    articles: {
      stateKey: 'activeArticle',
      ruLabel: 'Артикул',
      enLabel: 'articles',
      data: allArticlesData
    },
    groups: {
      stateKey: 'activeGroup',
      ruLabel: 'Группа товаров',
      enLabel: 'product_groups',
      data: allGroupsData
    }
  }

  // формируем итоговый массив для всех данных
  const DTO = [allShopsOption, ...data?.map(i => {
    let articlesData = []
    i.brands.forEach((item, bId) => {

      const items = item.wb_id.map(_ => ({ name: _, value: _, brand: item.name ? item.name : `Без названия (${i.shop_data.brand_name})` }))
      articlesData = [...articlesData, ...items]
    })
    let newItem = {
      shop: {
        ...i.shop_data,
        value: i.shop_data.name
      },
      brands: {
        stateKey: 'activeBrandName',
        ruLabel: 'Бренд',
        enLabel: 'brands',
        data: i.brands?.map((_, id) => ({
          name: _.name ? _.name : `Без названия&${i.shop_data.id}`,
          value: _.name ? _.name : `Без названия (${i.shop_data.brand_name})`,
        })),
      },
      articles: {
        stateKey: 'activeArticle',
        ruLabel: 'Артикул',
        enLabel: 'articles',
        data: articlesData
      },
      groups: {
        stateKey: 'activeGroup',
        ruLabel: 'Группа товаров',
        enLabel: 'product_groups',
        data: i.groups.map(_ => ({ ..._, value: _.name, key: _.id }))
      }
    }

    return newItem
  })]

  return { shops, filtersData: DTO, initState: { activeBrandName: [{ value: 'Все' }], activeArticle: [{ value: 'Все' }], activeGroup: [{ id: 0, value: 'Все' }] } }
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
