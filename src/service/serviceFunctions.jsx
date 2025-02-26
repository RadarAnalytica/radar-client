import { URL } from './config';
import { formatFromIsoDate } from './utils'

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

  getDashBoard: async (token, day, idShop) => {
    const res = await fetch(
      `${URL}/api/dashboard/?period=${day}&shop=${idShop}`,
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
    const res = await fetch(
      `${URL}/api/abc_data/${viewType}?period=${day}&shop=${idShop}`,
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
    console.log('competitorsLinks:', competitorsLinks);

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

  // services/api.js

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
    console.log('messageData', messageData);
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

  getChartDetailData: async (token, selectedRange, activeBrand) => {
    try {
      let queryParams = new URLSearchParams();

      if (typeof selectedRange === "number") {
        queryParams.append("period", selectedRange);
      } else if (selectedRange?.from && selectedRange?.to) {

        const fromDate = selectedRange.from.toISOString().split('T')[0];
        const toDate = selectedRange.to.toISOString().split('T')[0];

        console.log(fromDate, "from", toDate, "to");
        queryParams.append("date_from", fromDate);
        queryParams.append("date_to", toDate);
      } else {
        throw new Error("Должен быть указан хотя бы один параметр: period или date_from/date_to.");
      }

      if (activeBrand !== undefined) {
        queryParams.append("shop", activeBrand);
      }

      const url = `${URL}/api/dashboard/hourly?${queryParams.toString()}`;
      console.log(token, "token");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `JWT ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const rawData = await response.json();
      console.log("Raw data from API:", rawData);

      const counts = Array(24).fill(0);
      const averages = Array(24).fill(0);

      rawData.forEach((entry) => {
        for (const [key, value] of Object.entries(entry)) {
          const hour = key === "None" ? 23 : parseInt(key, 10);
          if (!isNaN(hour)) {
            counts[hour] += value;
            averages[hour] += 1;
          }
        }
      });

      const finalAverages = averages.map((count, index) =>
        count === 0 ? 0 : counts[index] / count
      );

      const transformData = (data) => {
        return data.reduce((acc, item) => {
          const [time, count] = Object.entries(item)[0];
          const hour = time === "None" ? 23 : parseInt(time, 10);

          if (!isNaN(hour)) {
            if (!acc[hour]) {
              acc[hour] = [];
            }
            acc[hour].push({ count, time });
          }

          return acc;
        }, {});
      };

      const result = transformData(rawData);

      return {
        result: result,
        counts: counts,
        averages: finalAverages,
      };
    } catch (error) {
      console.error("Ошибка получения данных:", error);
      return { result: {}, counts: [], averages: [] };
    }
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
    console.log('filterData => postDashboardFilters:', filterData);
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

  scheduleFilterChartData: async (token, filter) => {
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

    return await response.json();
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

  getCostPriceStatus: async (token) => {
    const res = await fetch(`${URL}/api/report/cost/status`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'JWT ' + token,
      },
    });
    const data = await res.json()
    data.updated_at = data.updated_at === '' ? null : `Последняя загрузка ${formatFromIsoDate(data.updated_at)}г.`
    console.log(data);

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

  postAbcReportsData: async (token, filter) => {
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

  getSelfBuyoutStatus: async (token) => {
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
  postTaxRateUpdateDashboard: async (token, taxRate, taxType) => {
    try {
      const response = await fetch(`${URL}/api/shop/tax-rate/set`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token // Исправлено
        },
        body: JSON.stringify({ tax_rate: taxRate, tax_type: taxType })
      });

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении налоговой ставки:', error);
    }
  }
};
