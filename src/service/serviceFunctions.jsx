import { URL } from './config';
import { formatFromIsoDate, rangeApiFormat } from './utils'
import { store } from '../redux/store'

export const ServiceFunctions = {
  register: async (object) => {
    try {
      const res = await fetch(`${URL}/api/user/signup`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(object),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      alert(error);
    }
  },

  updateToken: async (brand_name, token, authToken) => {
    const res = await fetch(`${URL}/api/shop/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + authToken,
      },
      body: JSON.stringify({ brand_name, token, is_active: true }),
    });
    const data = await res.json();
    return data;
  },

  refreshUser: async (authToken) => {
    const res = await fetch(`${URL}/api/user/refresh`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + authToken,
      },
    });
    const data = await res.json();
    return data;
  },

  // getDataCollection: async (id, days, brandName) => {
  //   const res = await fetch(
  //     `${URL}/api/data-collection/${id}?days=${days}&brandName=${brandName}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await res.json();
  //   return data;
  // },

  // getFilteredCollection: async (id, days, brandName) => {
  //   const res = await fetch(
  //     `${URL}/api/data-collection/filtered/${id}?days=${days}&brandName=${brandName}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await res.json();
  //   return data;
  // },

  // getBrandNames: async (token) => {
  //   const res = await fetch('https://radar-analytica.ru/api/shop/all', {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //       "authorization": "JWT " + token,
  //     },
  //   });

  //   const data = await res.json();
  //   return data;
  // },

  // getBrandNames: async (id) => {
  //     const res = await fetch(`${URL}/api/data-collection/names/${id}`, {
  //         method: 'GET',
  //         headers: {
  //             'content-type': 'application/json'
  //         },
  //     })

  //     const data = await res.json()
  //     return data
  // },

  // getOrders: async (id, brandName) => {
  //   const res = await fetch(`${URL}/api/orders/${id}?brandName=${brandName}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });

  //   const data = await res.json();
  //   return data;
  // },

  // getSales: async (id, brandName) => {
  //   const res = await fetch(`${URL}/api/sales/${id}?brandName=${brandName}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });

  //   const data = await res.json();
  //   return data;
  // },

  // getGeoData: async (id, brandName, days) => {
  //   const res = await fetch(
  //     `${URL}/api/data-collection/geo/${id}?brandName=${brandName}&days=${days}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await res.json();
  //   return data;
  // },

  // updateTax: async (id, brandName, obj) => {
  //   const res = await fetch(
  //     `${URL}/api/data-collection/tax/${id}?brandName=${brandName}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(obj),
  //     }
  //   );

  //   console.log(obj);
  //   const data = await res.json();
  //   return data;
  // },

  getDashBoard: async (token, selectedRange, idShop) => {

    let rangeParams = rangeApiFormat(selectedRange);

    const res = await fetch(
      `${URL}/api/dashboard/?${rangeParams}&shop=${idShop}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },
      }
    );

    if (res.status === 400) {
      localStorage.removeItem('activeShop');
      throw new Error('Invalid shop data');
    }

    const data = await res.json();

    return data;
  },

  getDownloadDashBoard: async () => {
    // TODO вынести функционал скачивания отчета
    /*
      const handleDownload = async () => {
        fetch(
          `${URL}/api/dashboard/download?period=${periodValue}&shop=${activeShopId}`,
          {
            method: 'GET',
            headers: {
              authorization: 'JWT ' + authToken,
            },
          }
        )
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Сводка_продаж.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch((e) => console.error(e));
      };
    */
  },

  getAllShops: async (token) => {
    const res = await fetch(`${URL}/api/shop/all`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json();
    return data;
  },

  getGeographyData: async (token, day, idShop) => {
    const res = await fetch(`${URL}/api/geo/?period=${day}&shop=${idShop}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json();
    return data;
  },

  getAbcData: async (viewType, token, day, idShop) => {
    let rangeParams = rangeApiFormat(day);

    const res = await fetch(
      `${URL}/api/abc_data/${viewType}?${rangeParams}&shop=${idShop}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },
      }
    );
    const data = await res.json();
    return data;
  },
  postRequestMonitoring: async (
    token,
    product,
    period,
    page,
    page_limit,
    sort
  ) => {
    const res = await fetch(`${URL}/api/requests-monitor/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
      body: JSON.stringify({
        product: product,
        period: period,
        page: page,
        page_limit: page_limit,
        sorting: sort,
      }),
    });
    const data = await res.json();
    return data;
  },
  postAiDescriptionGeneratorKeywords: async (token, competitorsLinks) => {

    const res = await fetch(`${URL}/api/description-generator/keywords`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },

      body: JSON.stringify(competitorsLinks),
    });
    const data = await res.json();
    return data;
  },

  postAiDescriptionGenerator: async (
    token,
    productTitle,
    shortDescription,
    keywords
  ) => {
    const res = await fetch(`${URL}/api/description-generator/v2/generate`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },

      body: JSON.stringify({
        product_title: productTitle,
        short_description: shortDescription,
        keywords: keywords,
      }),
    });
    const data = await res.json();
    return data;
  },

  getUserGenerationsData: async (token, id) => {
    const res = await fetch(`${URL}/api/description-generator/v2?id=${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json();
    return data;
  },

  getUserGenerationsAmount: async (token) => {
    const res = await fetch(
      `${URL}/api/description-generator/get-generations`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },
      }
    );
    const data = await res.json();
    return data;
  },

  postUpdateUserGenerationsAmount: async (token, amount) => {
    const res = await fetch(
      `${URL}/api/description-generator/update-generations`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + token,
        },

        body: JSON.stringify({
          amount,
        }),
      }
    );
    const data = await res.json();
    return data;
  },

  postSeoLinks: async (token, seoLinks) => {
    const res = await fetch(`${URL}/api/ceo-comparison/raw`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
      body: JSON.stringify(seoLinks),
    });
    const data = await res.json();
    return data;
  },

  postSeoLinksToGetExcel: async (token, seoLinks) => {
    const res = await fetch(`${URL}/api/ceo-comparison/download`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
      body: JSON.stringify(seoLinks),
    });

    return res;
  },

  getSupportMessages: async (token) => {
    const res = await fetch(`${URL}/api/admin/support`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json();
    return data;
  },

  sendSupportMessage: async (token, messageData) => {
    const response = await fetch(`${URL}/api/admin/support`, {
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + token,
      },
      body: messageData,
    });
    return response.json();
  },

  getAllSupportMessages: async (token) => {
    const res = await fetch(`${URL}/api/admin/support-all`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json();
    return data;
  },

  patchSupportMessage: async (token, isAdmin, userId) => {
    const res = await fetch(`${URL}/api/admin/support`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
      body: JSON.stringify(isAdmin ? { user_id: userId } : {}),
    });
    const data = await res.json();
    return data;
  },

  getChartDetailData: async (token, selectedRange, shop) => {
    let rangeParams = rangeApiFormat(selectedRange);
    
    const res = await fetch(
      `${URL}/api/dashboard/?shops=${shop}&${rangeParams}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
      }
    );
    // TODO Сделать отрисовку ответа
    const data = await res.json();
    // const data = [
    //   { '0:15': 4 },
    //   { '0:45': 2 },
    //   { '1:10': 3 },
    //   { '1:30': 1 },
    //   { '2:05': 5 },
    //   { '2:50': 2 },
    //   { '3:00': 4 },
    //   { '3:30': 1 },
    //   { '4:20': 3 },
    //   { '4:50': 2 },
    //   { '5:00': 1 },
    //   { '5:40': 2 },
    //   { '6:00': 2 },
    //   { '6:15': 5 },
    //   { '7:00': 3 },
    //   { '7:45': 1 },
    //   { '8:05': 4 },
    //   { '8:30': 2 },
    //   { '9:00': 1 },
    //   { '9:55': 5 },
    //   { '10:15': 2 },
    //   { '10:45': 3 },
    //   { '11:30': 1 },
    //   { '11:55': 4 },
    //   { '12:10': 3 },
    //   { '12:40': 1 },
    //   { '13:00': 5 },
    //   { '13:25': 2 },
    //   { '14:10': 3 },
    //   { '14:50': 4 },
    //   { '15:30': 1 },
    //   { '15:55': 5 },
    //   { '16:10': 2 },
    //   { '16:40': 4 },
    //   { '17:05': 3 },
    //   { '17:50': 2 },
    //   { '18:00': 4 },
    //   { '18:30': 1 },
    //   { '19:10': 3 },
    //   { '19:45': 2 },
    //   { '20:20': 4 },
    //   { '20:55': 1 },
    //   { '21:05': 2 },
    //   { '21:30': 3 },
    //   { '22:15': 4 },
    //   { '22:50': 1 },
    //   { '23:10': 2 },
    //   { '23:45': 5 },
    // ];

    const counts = Array(24).fill(0);
    const averages = Array(24).fill(0);

    // data.forEach((entry) => {
    //   for (const [time, value] of Object.entries(entry)) {
    //     const hour = parseInt(time.split(':')[0], 10);

    //     counts[hour] += value;
    //     averages[hour] += 1;
    //   }
    // });

    // const finalAverages = averages.map((count, index) => {
    //   return count === 0 ? 0 : counts[index] / count;
    // });

    // const transformData = (data) => {
    //   return data.reduce((acc, item) => {
    //     const [time, count] = Object.entries(item)[0];
    //     const hour = parseInt(time.split(':')[0], 10);

    //     if (!acc[hour]) {
    //       acc[hour] = [];
    //     }
    //     acc[hour].push({ count, time });

    //     return acc;
    //   }, {});
    // };

    // const result = transformData(data);

    return {
      // result: result,
      // counts: counts,
      // averages: finalAverages,
    };
  },

  getListOfReports: async (token) => {
    const res = await fetch(`${URL}/api/report/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json();
    return data;
  },

  getPLFilters: async (token) => {
    const response = await fetch(`${URL}/api/report/p_l/filters`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch P&L filters');
    }

    const data = await response.json();

    return {
      filterOptions: [
        {
          id: 'brand',
          label: 'Бренд',
          options: data.brand_filter.map((brand) => ({
            value: brand,
            label: brand,
          })),
        },
        {
          id: 'group',
          label: 'Группа',
          options: data.group_filter.map((group) => ({
            value: group,
            label: group,
          })),
        },
      ],
    };
  },

  deleteReport: async (token, reportNumber) => {
    const response = await fetch(
      `${URL}/api/report/?report_number=${reportNumber}`,
      {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          Authorization: 'JWT ' + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete report');
    }

    return await response.json();
  },

  postDashboardFilters: async (token, filterData) => {
    const response = await fetch(`${URL}/api/report/get-dashboard`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
      body: JSON.stringify(filterData),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard report');
    }
    return await response.json();
  },

  scheduleFilterFields: async (token) => {
    const response = await fetch(`${URL}/api/report/get-charts-filters`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard report');
    }

    return await response.json();
  },

  scheduleFilterChartData: async (token) => {
    const storeFilterData = store.getState().chartsFiltersSlice.chartsFilters
                   
    if (Object.keys(storeFilterData).length === 0) {
        return {}
    }

    const brandFilterData = storeFilterData.brand
    const wbIdFilterData = storeFilterData.wbId
    const groupFilterData = storeFilterData.group
    const yearFilterData = storeFilterData.year
    const monthFilterData = storeFilterData.month
    const weekFilterData = storeFilterData.week

    const groupFilter = []
    const brandFilter = []
    const wbIdFilter = []
    const yearFilter = []
    const monthFilter = []
    const weekFilter = []

    if (!!groupFilterData && Object.keys(groupFilterData).length > 0) {
        for (let _key of Object.keys(groupFilterData)) {
            if (!!groupFilterData[_key]) {
                groupFilter.push(_key)
            }
        }
    }
    if (!!brandFilterData && Object.keys(brandFilterData).length > 0) {
        for (let _key of Object.keys(brandFilterData)) {
            if (!!brandFilterData[_key]) {
                brandFilter.push(_key)
            }
        }
    }
    if (!!wbIdFilterData && Object.keys(wbIdFilterData).length > 0) {
      for (let _key of Object.keys(wbIdFilterData)) {
          if (!!wbIdFilterData[_key]) {
              wbIdFilter.push(_key)
          }
      }
    }
    if (!!yearFilterData && Object.keys(yearFilterData).length > 0) {
        for (let _key of Object.keys(yearFilterData)) {
            if (!!yearFilterData[_key]) {
                yearFilter.push(_key)
            }
        }
    }
    if (!!monthFilterData && Object.keys(monthFilterData).length > 0) {
        for (let _key of Object.keys(monthFilterData)) {
            if (!!monthFilterData[_key]) {
                monthFilter.push(_key)
            }
        }
    }
    if (!!weekFilterData && Object.keys(weekFilterData).length > 0) {
        for (let _key of Object.keys(weekFilterData)) {
            if (!!weekFilterData[_key]) {
                weekFilter.push(_key)
            }
        }
    }

    const filter = {
      brand_name_filter: brandFilter,
      wb_id_filter: wbIdFilter,
      groups_filter: groupFilter,
      date_sale_filter: {
        years: yearFilter,
        months: monthFilter,
        weekdays: weekFilter,
      },
    }

    const response = await fetch(`${URL}/api/report/get-charts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
      body: JSON.stringify(filter),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Schedule filter chart data');
    }

    const data = await response.json();
    
    return {data, filter}
  },

  getMonthProductFilters: async (token) => {
    const response = await fetch(
      `${URL}/api/report/get-month-product-filters`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    const dropdownFilters = [
      {
        id: 'size',
        label: 'Размер',
        options: data.size_name_filter.map((size) => ({
          value: size,
          label: size,
        })),
      },
      {
        id: 'article',
        label: 'Артикул поставщика',
        options: data.vendor_code_filter.map((code) => ({
          value: code,
          label: code,
        })),
      },
      {
        id: 'good',
        label: 'Товар',
        options: data.wb_id_filter.map((good) => ({
          value: good,
          label: good,
        })),
      },
      {
        id: 'groups',
        label: 'Группа',
        options: data.groups_filter.map((group) => ({
          value: group,
          label: group,
        })),
      },
      {
        id: 'brand',
        label: 'Бренд',
        options: data.brand_name_filter.map((brand) => ({
          value: brand,
          label: brand,
        })),
      },
      {
        id: 'country',
        label: 'Страна',
        options: data.country_filter.map((country) => ({
          value: country,
          label: country,
        })),
      },
      {
        id: 'wb_id',
        label: 'WB ID',
        options: data.wb_id_filter.map((id) => ({
          value: id,
          label: id,
        })),
      },
      {
        id: 'subject',
        label: 'Предмет',
        options: data.subject_name_filter.map((subject) => ({
          value: subject,
          label: subject,
        })),
      },
      {
        id: 'srid',
        label: 'SRID',
        options: data.srid_filter.map((srid) => ({
          value: srid,
          label: srid,
        })),
      },
    ];

    const groupFilters = {
      dateFilters: {
        title: 'Фильтр по датам',
        options: [
          {
            id: 'years',
            label: 'Год',
            values: data.date_sale_filter.years,
          },
          {
            id: 'months',
            label: 'Месяц',
            values: data.date_sale_filter.months,
          },
          {
            id: 'weeks',
            label: 'Неделя',
            values: data.date_sale_filter.weekdays,
          },
        ],
      },
    };

    return {
      dropdownFilters,
      groupFilters,
    };
  },

  getCostPriceStatus: async(token) => {
    const res = await fetch(`${URL}/api/report/cost/status`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json()
    data.updated_at = data.updated_at === '' ? null : `Последняя загрузка ${formatFromIsoDate(data.updated_at)}г.`
    
    return data;
  },

  getCostTemplate: async (token) => {
    const res = await fetch(`${URL}/api/report/cost/get-template`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    return res;
  },

  postCostUpdate: async (token, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${URL}/api/report/cost/update`, {
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + token,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update cost data');
    }

    return await response.json();
  },

  getAbcReportsFilters: async (token) => {
    const response = await fetch(`${URL}/api/report/abc/filters`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard report');
    }

    return await response.json();
  },

  postAbcReportsData: async (token) => {
    const storeFilterData = store.getState().abcFiltersSlice.abcFilters
                    
    if (Object.keys(storeFilterData).length === 0) {
        return []
    }
    const brandFilterData = storeFilterData.brand
    const wbIdFilterData = storeFilterData.wbId
    const groupFilterData = storeFilterData.group
    const productFilterData = storeFilterData.product
    const yearFilterData = storeFilterData.year
    const monthFilterData = storeFilterData.month
    const weekFilterData = storeFilterData.week

    const productFilter = []
    const groupFilter = []
    const brandFilter = []
    const wbIdFilter = []
    const yearFilter = []
    const monthFilter = []
    const weekFilter = []

    if (!!productFilterData && Object.keys(productFilterData).length > 0) {
        for (let _key of Object.keys(productFilterData)) {
            if (!!productFilterData[_key]) {
                productFilter.push(_key)
            }
        }
    }
    if (!!groupFilterData && Object.keys(groupFilterData).length > 0) {
        for (let _key of Object.keys(groupFilterData)) {
            if (!!groupFilterData[_key]) {
                groupFilter.push(_key)
            }
        }
    }
    if (!!brandFilterData && Object.keys(brandFilterData).length > 0) {
        for (let _key of Object.keys(brandFilterData)) {
            if (!!brandFilterData[_key]) {
                brandFilter.push(_key)
            }
        }
    }
    if (!!wbIdFilterData && Object.keys(wbIdFilterData).length > 0) {
      for (let _key of Object.keys(wbIdFilterData)) {
          if (!!wbIdFilterData[_key]) {
              wbIdFilter.push(_key)
          }
      }
    }
    if (!!yearFilterData && Object.keys(yearFilterData).length > 0) {
        for (let _key of Object.keys(yearFilterData)) {
            if (!!yearFilterData[_key]) {
                yearFilter.push(_key)
            }
        }
    }
    if (!!monthFilterData && Object.keys(monthFilterData).length > 0) {
        for (let _key of Object.keys(monthFilterData)) {
            if (!!monthFilterData[_key]) {
                monthFilter.push(_key)
            }
        }
    }
    if (!!weekFilterData && Object.keys(weekFilterData).length > 0) {
        for (let _key of Object.keys(weekFilterData)) {
            if (!!weekFilterData[_key]) {
                weekFilter.push(_key)
            }
        }
    }

    const filter = {
      article_filter_list: wbIdFilter,
      brand_filter_list: brandFilter,
      group_filter_list: groupFilter,
      month_filter_list: monthFilter,
      product_filter_list: productFilter,
      year_filter_list: yearFilter,
      week_filter_list: weekFilter
    }

    const response = await fetch(`${URL}/api/report/abc/data`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'JWT ' + token,
      },
      body: JSON.stringify(filter),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Schedule filter chart data');
    }

    return await response.json();
  },

  postExternalExpensesUpdate: async (token, payload) => {
    const response = await fetch(`${URL}/api/report/external-expenses/update`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await response.json();
  },

  getSelfBuyoutStatus: async(token) => {
    const res = await fetch(`${URL}/api/report/self-buyout/status`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json()
        
    return data.status;
  },

  getSelfBuyoutTemplate: async (token) => {
    const res = await fetch(`${URL}/api/report/self-buyout/get-template`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    });
    return res;
  },

  // Add to ServiceFunctions object
  postSelfBuyoutUpdate: async (token, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${URL}/api/report/self-buyout/update`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
      body: formData,
    });
    return await response.json();
  },

  getPenaltiesFilters: async (token) => {
    const response = await fetch(`${URL}/api/report/get-penalties-filters`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch penalties filters');
    }

    return await response.json();
  },

  postTaxRateUpdate: async (token, { tax_rate, tax_type }) => {
    const response = await fetch(`${URL}/api/report/tax-rate/update`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tax_rate, tax_type }),
    });
    return await response.json();
  },

  getFailPaymentStatus: async(token) => {
    const res = await fetch(`${URL}/api/user/check-fail-transaction`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    });
    const data = await res.json();

    return data;
  }

  
};
