import { URL } from "./config";

export const ServiceFunctions = {
  register: async (object) => {
    try {
      const res = await fetch(`${URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
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
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + authToken,
      },
      body: JSON.stringify({ brand_name, token, is_active: true }),
    });
    const data = await res.json();
    return data;
  },

  refreshUser: async (authToken) => {
    const res = await fetch(`${URL}/api/user/refresh`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + authToken,
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
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
      }
    );

    const data = await res.json();

    return data;
  },

  getAllShops: async (token) => {
    const res = await fetch(`${URL}/api/shop/all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + token,
      },
    });
    const data = await res.json();
    return data;
  },
  getGeographyData: async (token, day, idShop) => {
    const res = await fetch(`${URL}/api/geo/?period=${day}&shop=${idShop}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + token,
      },
    });
    const data = await res.json();
    return data;
  },

  getAbcData: async (viewType, token, day, idShop) => {
    const res = await fetch(
      `${URL}/api/abc_data/${viewType}?period=${day}&shop=${idShop}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
      }
    );
    const data = await res.json();
    return data;
  },
  postRequestMonitoring: async (token, product, period, page, page_limit, sort) => {
    const res = await fetch(
      `${URL}/api/requests-monitor/`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
        body: JSON.stringify({
          product: product,
          period: period,
          page: page,
          page_limit: page_limit,
          sorting: sort
        }),
      }
    );
    const data = await res.json();
    return data;
  },
  postAiDescriptionGeneratorKeywords: async (token, competitorsLinks) => {
    console.log("competitorsLinks:", competitorsLinks);

    const res = await fetch(
      `${URL}/api/description-generator/keywords`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },

        body: JSON.stringify(competitorsLinks)

      }
    );
    const data = await res.json();
    return data;
  },

  postAiDescriptionGenerator: async (token, productTitle, shortDescription, keywords) => {

    const res = await fetch(
      `${URL}/api/description-generator/v2/generate`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },

        body: JSON.stringify({
          product_title: productTitle,
          short_description: shortDescription,
          keywords: keywords,

        }),

      }
    );
    const data = await res.json();
    return data;
  },

  getUserGenerationsData: async (token, id) => {
    const res = await fetch(`${URL}/api/description-generator/v2?id=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + token,
      },
    });
    const data = await res.json();
    return data;
  },


  getUserGenerationsAmount: async (token) => {
    const res = await fetch(
      `${URL}/api/description-generator/get-generations`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
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
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },

        body: JSON.stringify({
          amount
        }),

      }
    );
    const data = await res.json();
    return data;
  },

  postSeoLinks: async (token, seoLinks) => {
    const res = await fetch(
      `${URL}/api/ceo-comparison/raw`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
        body: JSON.stringify(seoLinks),
      }
    );
    const data = await res.json();
    return data;
  },

  postSeoLinksToGetExcel: async (token, seoLinks) => {
    const res = await fetch(
      `${URL}/api/ceo-comparison/download`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
        body: JSON.stringify(seoLinks),
      }
    );

    return res;
  },

  getSupportMessages: async (token) => {
    const res = await fetch(
      `${URL}/api/admin/support`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
      }
    );
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
    const res = await fetch(
      `${URL}/api/admin/support-all`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
      }
    );
    const data = await res.json();
    return data;
  },

  patchSupportMessage: async (token, isAdmin, userId) => {
    const res = await fetch(`${URL}/api/admin/support`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + token,
      },
      body: JSON.stringify(
        isAdmin ? { user_id: userId } : {}
      ),
    });
    const data = await res.json();
    return data;
  },

  getChartDetailData: async (token, selectedRange) => {
    // const res = await fetch(
    //   `${URL}/api/dashboard/`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "content-type": "application/json",
    //       authorization: "JWT " + token,
    //     },
    //   }
    // );

    // const data = await res.json();
    const data = [{ "0:15": 4 }, { "0:45": 2 },
    { "1:10": 3 }, { "1:30": 1 },
    { "2:05": 5 }, { "2:50": 2 },
    { "3:00": 4 }, { "3:30": 1 },
    { "4:20": 3 }, { "4:50": 2 },
    { "5:00": 1 }, { "5:40": 2 },
    { "6:00": 2 }, { "6:15": 5 },
    { "7:00": 3 }, { "7:45": 1 },
    { "8:05": 4 }, { "8:30": 2 },
    { "9:00": 1 }, { "9:55": 5 },
    { "10:15": 2 }, { "10:45": 3 },
    { "11:30": 1 }, { "11:55": 4 },
    { "12:10": 3 }, { "12:40": 1 },
    { "13:00": 5 }, { "13:25": 2 },
    { "14:10": 3 }, { "14:50": 4 },
    { "15:30": 1 }, { "15:55": 5 },
    { "16:10": 2 }, { "16:40": 4 },
    { "17:05": 3 }, { "17:50": 2 },
    { "18:00": 4 }, { "18:30": 1 },
    { "19:10": 3 }, { "19:45": 2 },
    { "20:20": 4 }, { "20:55": 1 },
    { "21:05": 2 }, { "21:30": 3 },
    { "22:15": 4 }, { "22:50": 1 },
    { "23:10": 2 }, { "23:45": 5 }]

    const counts = Array(24).fill(0);
    const averages = Array(24).fill(0);

    data.forEach((entry) => {
      for (const [time, value] of Object.entries(entry)) {
        const hour = parseInt(time.split(':')[0], 10);

        counts[hour] += value;
        averages[hour] += 1;
      }
    });


    const finalAverages = averages.map((count, index) => {
      return count === 0 ? 0 : counts[index] / count;
    });


    const transformData = (data) => {
      return data.reduce((acc, item) => {
        const [time, count] = Object.entries(item)[0];
        const hour = parseInt(time.split(':')[0], 10);

        if (!acc[hour]) {
          acc[hour] = [];
        }
        acc[hour].push({ count, time });

        return acc;
      }, {});
    };


    const result = transformData(data);

    return {
      "result": result,
      "counts": counts,
      "averages": finalAverages
    };

  },

  getListOfReports: async (token) => {
    const res = await fetch(
      `${URL}/api/report/`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + token,
        },
      }
    );
    const data = await res.json();
    return data;
  },

  getPLFilters: async (token) => {
    const response = await fetch(`${URL}/api/report/p_l/filters`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + token,
      }
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
                options: data.brand_filter.map(brand => ({
                    value: brand,
                    label: brand
                }))
            },
            {
                id: 'group',
                label: 'Группа',
                options: data.group_filter.map(group => ({
                    value: group,
                    label: group
                }))
            }
        ]
    };
  },

  deleteReport: async (token, reportNumber) => {
    const response = await fetch(`${URL}/api/report/?report_number=${reportNumber}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Authorization': 'JWT ' + token
      }
    });

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
        "content-type": "application/json",
        authorization: "JWT " + token,
      },
      body: JSON.stringify(filterData)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard report');
    }

    return await response.json();
  },

}
