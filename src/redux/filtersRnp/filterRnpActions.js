import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';

const createFiltersDTO = (data) => {
  // 1 - создаем массив всех магазинов + опцию "Все магазины"
  const shops = [{ brand_name: 'Все', value: 'Все', id: 0, is_primary_collect: data.some(_ => _.shop_data.is_primary_collect), is_self_cost_set: !data.some(_ => !_.shop_data.is_self_cost_set)  }, ...data.map(_ => ({ ..._.shop_data, value: _.shop_data.name }))]

  // 2 - Трансформируем дату для опции "все магазины"
  // 2.1 - выцепляем все бренды по всем магазинам
  // 2.2 - выцепляем все артикулы всех брендов по всем магазинам
  // 2.3  - выцепляем все группы всех магазинов
  const allBransdData = []
  const allArticlesData = []
  const allGroupsData = []
  const allCategoriesData = []
  data.forEach((_, id) => {
    _.categories.forEach(c => {
      allCategoriesData.push({...c, value: c.name, key: c.id })
    })
    _.groups.forEach(g => {
      allGroupsData.push({...g, value: g.name, key: g.id })
    })

    // _.brands.forEach((b, barndId) => {
    //   allBransdData.push({
    //     name: b.name ? b.name : `Без названия&${_.shop_data.id}`,
    //     value: b.name ? b.name : `Без названия (${_.shop_data.brand_name})`,
    //   })
    //   b.wb_id.forEach(a => {
    //     allArticlesData.push({ name: a, value: a, brand: b.name ? b.name :`Без названия (${_.shop_data.brand_name})`})
    //   })
    // })
  })
  

  // 2.4 - собираем обьект для "все магазины"
  const allShopsOption = {
    shop: shops[0],
    categories: {
      stateKey: 'activeCategory',
      ruLabel: 'Категория',
      enLabel: 'category',
      data: allCategoriesData
    },
    // brands: {
    //   stateKey: 'activeBrandName',
    //   ruLabel: 'Бренд',
    //   enLabel: 'brands',
    //   data: allBransdData
    // },
    // articles: {
    //   stateKey: 'activeArticle',
    //   ruLabel: 'Артикул',
    //   enLabel: 'articles',
    //   data: allArticlesData
    // },
    groups: {
      stateKey: 'activeGroup',
      ruLabel: 'Группа товаров',
      enLabel: 'product_groups',
      data: allGroupsData
    }
  }

  // формируем итоговый массив для всех данных
  const DTO = [allShopsOption, ...data?.map(i => {
    // let articlesData = []
    // i.brands.forEach((item, bId) => {
      
    //   const items = item.wb_id.map(_ => ({ name: _, value: _, brand: item.name ? item.name : `Без названия (${i.shop_data.brand_name})`}))
    //   articlesData = [...articlesData, ...items]
    // })
    let newItem = {
      shop: {
        ...i.shop_data,
        value: i.shop_data.name
      },
      categories: {
        stateKey: 'activeCategory',
        ruLabel: 'Категория',
        enLabel: 'Category',
        data: i.categories?.map((_, id) => ({
          name: _.name,
          value: _.name,
        })),
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
      // articles: {
      //   stateKey: 'activeArticle',
      //   ruLabel: 'Артикул',
      //   enLabel: 'articles',
      //   data: articlesData
      // },
      // groups: {
      //   stateKey: 'activeGroup',
      //   ruLabel: 'Группа товаров',
      //   enLabel: 'product_groups',
      //   data: i.groups.map(_ => ({ ..._, value: _.name, key: _.id }))
      // }
    }

    return newItem
  })]

  return { shops, filtersData: DTO, initState: { activeBrandName: [{ value: 'Все' }], activeArticle: [{ value: 'Все' }], activeGroup: [{ id: 0, value: 'Все' }] } }
}

export const fetchRnpFilters = createAsyncThunk(
  'filtersRnp',
  async (token, { dispatch }) => {
    try {
      let data = null;
      const res = await fetch(`${URL}/api/rnp/filters`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },
      });
      data = await res.json();
      if (data?.data?.shops) {
        console.log('createFiltersDTO(data.data.shops)', createFiltersDTO(data.data.shops))
        return createFiltersDTO(data.data.shops);
      }

    } catch (e) {
      throw e;
    } finally {
    }
  }
);
