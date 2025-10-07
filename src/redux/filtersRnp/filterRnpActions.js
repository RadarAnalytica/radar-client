import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '@/service/fetchApi';

export const createFiltersDTO = (data) => {
  // 1 - создаем массив всех магазинов + опцию "Все магазины"
  const shops = [{ brand_name: 'Все', value: 'Все', id: 0, is_primary_collect: data.some(_ => _.shop_data.is_primary_collect), is_self_cost_set: !data.some(_ => !_.shop_data.is_self_cost_set)  }, ...data.map(_ => ({ ..._.shop_data, value: _.shop_data.name }))];

  // 2 - Трансформируем дату для опции "все магазины"
  // 2.1 - выцепляем все бренды по всем магазинам
  // 2.2 - выцепляем все артикулы всех брендов по всем магазинам
  // 2.3  - выцепляем все группы всех магазинов
  let allBransdData = [];
  let allArticlesData = [];
  const allGroupsData = [];
  let allCategoriesData = [];
  data.forEach((_, id) => {
    _.categories.forEach(c => {
      if (_.shop_data.is_primary_collect) {
        allCategoriesData.push({
          name: c.name,
          value: c.name,
          key: c.id,
          id: c.id
        });
      }
      c.brand.forEach((b => {
        if (_.shop_data.is_primary_collect) {
          allBransdData.push({
            name: b.name ? b.name : `Без названия&${_.shop_data.id}`,
            value: b.name ? b.name : `Без названия (${_.shop_data.brand_name})`,
          });
        }
        b.wb_id.forEach(a => {
          if (_.shop_data.is_primary_collect) {
            allArticlesData.push({
              name: a,
              value: a,
              brand: b.name ? b.name :`Без названия (${_.shop_data.brand_name})`,
              category: c.name
            });
          }
        });
      }));
    });
    _.groups.forEach(g => {
      allGroupsData.push({...g, value: g.name, key: g.id });
    });

  });

  allCategoriesData = allCategoriesData.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.id === item.id
    )));

  allBransdData = allBransdData.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.name === item.name
    ))
  );

  allArticlesData = allArticlesData.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.value === item.value
    ))
  );
  // 2.4 - собираем обьект для "все магазины"
  const allShopsOption = {
    shop: shops[0],
    categories: {
      stateKey: 'activeCategory',
      ruLabel: 'Категория',
      enLabel: 'category',
      data: allCategoriesData
    },
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
  };

  // формируем итоговый массив для всех данных
  const DTO = [allShopsOption, ...data?.map(i => {

    const articlesData = [];
    let brandsData = [];
    i.categories.forEach((category) => {
      category.brand.forEach((b) => {
        brandsData.push({
          name: b.name ? b.name : `Без названия&${i.shop_data.id}`,
          value: b.name ? b.name : `Без названия (${i.shop_data.brand_name})`,
        });

        b.wb_id.forEach(a => {
          articlesData.push({
            name: a,
            value: a,
            brand: b.name ? b.name :`Без названия (${i.shop_data.brand_name})`,
            category: category.name
          });
        });
      });
    });

    brandsData = brandsData.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.name === item.name
    )));


    let newItem = {
      shop: {
        ...i.shop_data,
        value: i.shop_data.brand_name
      },
      categories: {
        stateKey: 'activeCategory',
        ruLabel: 'Категория',
        enLabel: 'category',
        data: i.categories?.map((_, id) => ({
          id: _.id,
          key: _.id,
          name: _.name,
          value: _.name,
        })),
      },
      brands: {
        stateKey: 'activeBrandName',
        ruLabel: 'Бренд',
        enLabel: 'brands',
        data: brandsData
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
        data: i.groups.map(_ => ({
          ..._,
          id: _.id,
          value: _.name,
          key: _.id
        }))
      }
    };

    return newItem;
  })];

  return { shops, filtersData: DTO, initState: { activeBrandName: [{ value: 'Все' }], activeArticle: [{ value: 'Все' }],  activeCategory: [{ id: 0, value: 'Все' }], activeGroup: [{ id: 0, value: 'Все' }] } };
};

export const fetchRnpFilters = createAsyncThunk(
  'filtersRnp',
  async (token, { dispatch }) => {
    try {
      let data = null;
      const res = await fetchApi('/api/rnp/filters', {
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
    }
  }
);
