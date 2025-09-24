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
      // сделаль Артем, фильтрация по is_valid и дальше map как был)
      ...shopsData?.filter((shop) => shop.is_valid).map(_ => ({ ..._, value: _.brand_name }))
      // 
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
      }
    }

    return newItem
  })]


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


  return { shops, filtersData: DTO, initState: { activeBrandName: [{ value: 'Все' }], activeArticle: [{ value: 'Все' }], activeGroup: [{ id: 0, value: 'Все' }], selectedRange: savedSelectedRange, activeBrand: savedActiveBrand, activeWeeks: savedActiveWeeks, activeMonths: savedActiveMonths } }
}

export const fetchFilters = createAsyncThunk(
  'filters',
  async (requestObject, { dispatch }) => {
    const {authToken, shopsData} = requestObject;

    if (shopsData) {
      dispatch(shopsActions.setShops(shopsData));
    }

    try {
      //dispatch(setLoading(true));

      let data = null;
      const res = await fetch(`${URL}/api/common/filters`, {
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
