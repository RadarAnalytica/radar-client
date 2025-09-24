import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../service/config';
import { setLoading } from '../loading/loadingSlice';
import { weeksList, getSavedActiveWeeks, getSavedActiveMonths } from '@/service/utils';
import { actions as shopsActions } from '../shops/shopsSlice';




const createFiltersDTO = (data, shopsData) => {
  // 0 - собираем список недель для фильтра выбора недели
  const weeksListData = weeksList();
  // 1 - создаем массив всех магазинов + опцию "Все магазины"
  let shops;
  if (shopsData) {
    shops = [{ brand_name: 'Все', value: 'Все', id: 0, is_primary_collect: shopsData?.some(_ => _?.is_primary_collect), is_self_cost_set: !shopsData?.some(_ => !_?.is_self_cost_set) },
    ...shopsData?.map(_ => ({ ..._, value: _.brand_name }))
    ]
  } else {
    shops = [{ brand_name: 'Все', value: 'Все', id: 0, is_primary_collect: data?.some(_ => _.shop_data.is_primary_collect), is_self_cost_set: !data?.some(_ => !_.shop_data.is_self_cost_set) }, ...data?.map(_ => ({ ..._.shop_data, value: _.shop_data.brand_name }))]
  }

  // 2 - Трансформируем дату для опции "все магазины"
  // 2.1 - выцепляем все бренды по всем магазинам
  // 2.2 - выцепляем все артикулы всех брендов по всем магазинам
  // 2.3  - выцепляем все группы всех магазинов
  const allBransdData = []
  const allArticlesData = []
  const allGroupsData = []
  const allCategoriesData = []
  data.forEach((_, id) => {
    _.groups?.forEach(g => {
      allGroupsData.push({ ...g, value: g.name, key: g.id })
    })
    _.categories?.forEach(c => {
      allCategoriesData.push({ ...c, value: c.name, key: c.id })
      c.brand?.forEach((b, barndId) => {
        const isBrandInList = allBransdData.some(_ => _.name === b.name)
        if (_.shop_data.is_primary_collect && !isBrandInList) {
          allBransdData.push({
            name: b.name ? b.name : `Без названия&${_.shop_data.id}`,
            value: b.name ? b.name : `Без названия (${_.shop_data.brand_name})`,
            category: c.name
          })
        }
        b.wb_id?.forEach(a => {
          if (_.shop_data.is_primary_collect) {
            allArticlesData.push({ name: a, value: a, brand: b.name ? b.name : `Без названия (${_.shop_data.brand_name})`, category: c.name })
          }
        })
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
    },
    weeks: {
      stateKey: 'activeWeeks',
      ruLabel: 'Период',
      enLabel: 'weeks',
      data: weeksListData
    },
    months: {
      stateKey: 'activeMonths',
      ruLabel: 'Период',
      enLabel: 'months'
    },
    categories: {
      stateKey: 'activeCategory',
      ruLabel: 'Категория',
      enLabel: 'categories',
      data: allCategoriesData
    }
  }

  // формируем итоговый массив для всех данных
  const DTO = [allShopsOption, ...data?.map(i => {
    let articlesData = []
    let categoriesData = []
    let brandsData = []
    i.categories?.forEach(c => {
      categoriesData.push({ ...c, value: c.name, key: c.id })
      c.brand?.forEach((item, bId) => {
        const isBrandInList = brandsData.some(_ => _.name === item.name)
        if (!isBrandInList) {
          brandsData.push({
            name: item.name ? item.name : `Без названия&${i.shop_data.id}`,
            value: item.name ? item.name : `Без названия (${i.shop_data.brand_name})`,
            category: c.name
          })
        }
        const items = item.wb_id.map(_ => ({ name: _, value: _, brand: item.name ? item.name : `Без названия (${i.shop_data.brand_name})`, category: c.name }))
        articlesData = [...articlesData, ...items]
      })
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
        data: i.groups.map(_ => ({ ..._, value: _.name, key: _.id }))
      },
      weeks: {
        stateKey: 'activeWeeks',
        ruLabel: 'Период',
        enLabel: 'weeks',
        data: weeksListData
      },
      months: {
        stateKey: 'activeMonths',
        ruLabel: 'Период',
        enLabel: 'months'
      },
      categories: {
        stateKey: 'activeCategory',
        ruLabel: 'Категория',
        enLabel: 'categories',
        data: categoriesData
      }
    }

    return newItem
  })]

  console.log('DTO', DTO)


  // поднимаем сохраненный период чтобы установить его по умолчанию
  let savedSelectedRange = localStorage.getItem('selectedRange')
  if (savedSelectedRange) {
    savedSelectedRange = JSON.parse(savedSelectedRange)
  } else {
    savedSelectedRange = {
      period: 30
    }
  }


  // поднимаем сохраненный магазин чтобы установить его по умолчанию
  let savedActiveBrand = localStorage.getItem('activeShop')
  if (savedActiveBrand) {
    savedActiveBrand = JSON.parse(savedActiveBrand)
    // проверяем есть ли магазин в массиве (это на случай разных аккаунтов)
    // для поиска нужен сложный индекс тк айди магазинов могут совпадать в разных аккаунтах
    const isInShops = shops.some(_ => String(_.id + _.brand_name) === String(savedActiveBrand.id + savedActiveBrand.brand_name));
    // Если магазин нет в массиве (т.е. валиден для этого аккаунта) то...
    if (!isInShops) {
      savedActiveBrand = shops[0]
    } else {
      savedActiveBrand = shops.find(_ => String(_.id + _.brand_name) === String(savedActiveBrand.id + savedActiveBrand.brand_name))
    }
  } else {
    savedActiveBrand = shops[0]
  }

  // поднимаем сохраненный период по неделям, чтобы установить его по умолчанию
  let savedActiveWeeks = getSavedActiveWeeks(savedActiveBrand.id)

  // поднимаем сохраненный период по месяцам, чтобы установить его по умолчанию
  let savedActiveMonths = getSavedActiveMonths(savedActiveBrand.id)


  return {
    shops,
    filtersData: DTO,
    initState: {
      activeBrandName: [{ value: 'Все' }],
      activeArticle: [{ value: 'Все' }],
      activeGroup: [{ id: 0, value: 'Все' }],
      activeCategory: [{ id: 0, value: 'Все' }],
      selectedRange: savedSelectedRange,
      activeBrand: savedActiveBrand,
      activeWeeks: savedActiveWeeks,
      activeMonths: savedActiveMonths
    }
  }
}

export const fetchFilters = createAsyncThunk(
  'filters',
  async (requestObject, { dispatch }) => {
    const { authToken, shopsData } = requestObject;

    if (shopsData) {
      dispatch(shopsActions.setShops(shopsData));
    }

    try {
      //dispatch(setLoading(true));

      let data = null;
      const res = await fetch(`${URL}/api/common/filters_new`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + authToken,
        },
      });
      data = await res.json();
      if (data?.data?.shops) {
        return createFiltersDTO(data.data.shops, shopsData);
      }

    } catch (e) {
      throw e;
    } finally {
      //dispatch(setLoading(false));
    }
  }
);


/**
 * "shop_data": {
                    "id": 238,
                    "brand_name": "мелкая076",
                    "is_active": true,
                    "is_valid": true,
                    "is_primary_collect": true,
                    "updated_at": "2025-09-24T08:16:30.103512"
                },
                "categories": [
                    {
                        "id": 11,
                        "name": "Брюки",
                        "brand": [
                            {
                                "name": "GrenadeFleur",
                                "wb_id": [
                                    "167/синийремень"
                                ]
                            }
                        ]
                    },
                    {
                        "id": 162,
                        "name": "Пижамы",
                        "brand": [
                            {
                                "name": "GrenadeFleur",
                                "wb_id": [
                                    "1142/бордовый",
                                    "1142/светло-фиолетовый",
                                    "1142/темно-синий",
                                    "1142/черный",
                                    "1142/черныйцветы",
                                    "6800/барби",
                                    "6800/бежевыйлист",
                                    "6800/бордо",
                                    "6800/зеленаявишня",
                                    "6800/леопард",
                                    "6800/синзвезды",
                                    "6800/синий",
                                    "6800/синяявишня",
                                    "6800/черная",
                                    "6800/чернаявишня",
                                    "6800/черно-полосатый"
                                ]
                            }
                        ]
                    }
                ]
 */
