import { URL } from './config';
import { formatFromIsoDate, rangeApiFormat } from './utils'
import { store } from '../redux/store'
import moment from 'moment';

export const getRequestObject = (filters, selectedRange, shopId) => {
  let requestObject = {
    articles: null,
    product_groups: null,
    brands: null,
    shop: shopId,
    period: selectedRange?.period && selectedRange.period,
    date_from: selectedRange?.from && selectedRange.from,
    date_to: selectedRange?.to && selectedRange.to
  }

  if (filters.activeBrandName && Array.isArray(filters.activeBrandName) && !filters.activeBrandName.some(_ => _.value === 'Все')) {
    requestObject.brands = filters.activeBrandName.map(_ => _.name)
  }
  // filters?.activeArticle.value !== 'Все'
  if (filters.activeArticle && Array.isArray(filters.activeArticle) && !filters.activeArticle.some(_ => _.value === 'Все')) {
    requestObject.articles = filters.activeArticle.map(_ => _.value)
  }
  if (filters.activeGroup && Array.isArray(filters.activeGroup) && !filters.activeGroup.some(_ => _.value === 'Все')) {
    requestObject.product_groups = filters.activeGroup.map(_ => _.id)
  }
  return requestObject;
}

export const ServiceFunctions = {
  register: async (object) => {
    try {
      if (object.password === null || object.password.length < 6) {
        return {
          success: false,
          message: 'Пароль должен быть не короче 6 символов'
        }
      }
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

	getDashBoard: async (token, selectedRange, idShop, filters) => {

		//let rangeParams = rangeApiFormat(selectedRange);
    const body = getRequestObject(filters, selectedRange, idShop)
    const res = await fetch(
      `${URL}/api/dashboard/`,
      {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'JWT ' + token,
			},
        body: JSON.stringify(body)
      }
    );

		if (res.status === 400) {
			localStorage.removeItem('activeShop');
			throw new Error('Invalid shop data');
		}

		const data = await res.json();

		return data;
	},
	getSelfCostData: async (token, idShop, filters) => {
    const body = getRequestObject(filters, undefined, idShop)
    const res = await fetch(
      `${URL}/api/product/self-costs/list`,
      {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'JWT ' + token,
			},
        body: JSON.stringify(body)
      }
    );
		return res;
	},

	getDashboardTurnoverData: async (token, selectedRange, idShop, filters) => {
		let rangeParams = rangeApiFormat(selectedRange);
    const body = getRequestObject(filters, selectedRange, idShop)
		try {
			const res = await fetch(`${URL}/api/dashboard/turnover`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
          'authorization': 'JWT ' + token,
				},
        body: JSON.stringify(body)
      })

			if (!res.ok) {
        const parsed = await res.json()
				localStorage.removeItem('activeShop');
				throw new Error(parsed.detail || 'Invalid shop data');
			}
      const parsed = await res.json()
      return parsed.items

		} catch {
			throw new Error('Something went wrong');
		}
	},

	getDownloadDashBoard: async (token, selectedRange, shop) => {
		let rangeParams = rangeApiFormat(selectedRange);
    const res = await fetch(`${URL}/api/dashboard/download?${rangeParams}&shop=${shop}`, {
				method: 'GET',
				headers: {
					authorization: 'JWT ' + token,
				},
    });
    const data = await res.blob()
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

	getGeographyData: async (token, selectedRange, idShop, filters) => {
		//let rangeParams = rangeApiFormat(selectedRange);
    const body = getRequestObject(filters, selectedRange, idShop)
		const res = await fetch(`${URL}/api/geo/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'JWT ' + token,
			},
      body: JSON.stringify(body)
		});
		const data = await res.json();
		return data;
	},

	getAbcData: async (viewType, token, selectedRange, idShop, filters, page, sorting) => {
		//let rangeParams = rangeApiFormat(day);
    const body = getRequestObject(filters, selectedRange, idShop)
    const res = await fetch(
      `${URL}/api/abc_data/${viewType}?page=${page}&per_page=100&sorting=${sorting}`,
      {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'JWT ' + token,
			},
        body: JSON.stringify(body)
      }
    );
		if (res.status !== 200){
			throw new Error(`Ошибка запроса: ${res.status}`);
		}
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
		// const data = await res.json();
		// return data;
		return res;
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
		// const data = await res.json();
		// return data;
		return res
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

	getAnalysisData: async (token, selectedRange, shop, filters) => {
		//let rangeParams = rangeApiFormat(selectedRange);
    const body = getRequestObject(filters, selectedRange, shop)
		const res = await fetch(`${URL}/api/prod_analytic/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'JWT ' + token,
			},
      body: JSON.stringify(body)
		});
		const data = await res.json();
		return data;
	},

	getProdAnalyticXlsx: async (token, selectedRange, shop, filters) => {
		let rangeParams = rangeApiFormat(selectedRange);
    const body = getRequestObject(filters, selectedRange, shop)
		const res = await fetch(`${URL}/api/prod_analytic/download`, {
			method: 'POST',
			headers: {
        'authorization': 'JWT ' + token,
        'content-type': 'application/json'
			},
			body: JSON.stringify(body),
		});

    const data = await res.blob()
		return data;
	},

	getChartDetailData: async (token, selectedRange, shop) => {
		let rangeParams = rangeApiFormat(selectedRange);

		const res = await fetch(
			`${URL}/api/dashboard/hourly?shops=${shop}&${rangeParams}`,
			{
        method: "GET",
				headers: {
          'cache': 'no-store',
          "content-type": "application/json",
          authorization: "JWT " + token,
				},
			}
		);
		const data = await res.json();
		return data;
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

    return { data, filter }
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
    const data = await res.blob()
		return data;
	},

	postCostUpdate: async (token, file) => {
		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch(`${URL}/api/report/cost/update`, {
				method: 'POST',
				headers: {
					Authorization: 'JWT ' + token,
				},
				body: formData,
			});

			if (response.ok) {
				return await response.json();
			} else {
        console.error('Ошибка при загрузке файла:', response.statusText);
				throw new Error(response.statusText);
			}

		} catch (error) {
			console.error('Ошибка сети или запроса:', error);
			throw error; // Прокидываем ошибку выше
		}
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
    const data = await res.blob()
		return data;
	},

	// Add to ServiceFunctions object
	postSelfBuyoutUpdate: async (token, file) => {
		const formData = new FormData();
		formData.append('file', file);

		try {
      const response = await fetch(`${URL}/api/report/self-buyout/update`, {
					method: 'POST',
					headers: {
						Authorization: token,
						// Authorization: 'JWT ' + token,
					},
					body: formData,
      });
			return response;
			// if (response.ok) {
			//   return await response.json();
			// } else {
			//   console.error('Ошибка при загрузке файла:', response.statusText);
			//   throw new Error(response.statusText);
			// }

		} catch (error) {
			console.error('Ошибка сети или запроса:', error);
			throw error; // Прокидываем ошибку выше
		}

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

	getFailPaymentStatus: async (token) => {
		const res = await fetch(`${URL}/api/user/check-fail-transaction`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: token,
			},
		});
		const data = await res.json();

		return data;
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
	},

	reportWeekBrands: (COLUMNS) => {
		try {
			let tableData = new Array(10).fill(0).map((el, i) => {
				let res = { key: i };
				for (const col of COLUMNS) {
          res[col.dataIndex] = Math.ceil((Math.random() * 10) + i);
				}
        return res
      })

			return tableData;

			// if (!response.ok) {
			//   throw new Error(`Ошибка запроса: ${response.status}`);
			// }

			// return await response.json();
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error);
		}
	},

	getReportWeek: async (token, selectedRange, shopId, filters, weekStart) => {
    const body = getRequestObject(filters, selectedRange, shopId)
    body.week_starts = weekStart

    const res = await fetch(
      `${URL}/api/periodic_reports/weekly_report`,
      {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'JWT ' + token,
			},
        body: JSON.stringify(body)
      }
    );

		const data = await res.json();

		return data;
	},

  getDownloadReportWeek: async (token, selectedRange, shopId, filters, weekStart) => {
    const body = getRequestObject(filters, selectedRange, shopId)

    body.week_starts = weekStart

    const res = await fetch(
      `${URL}/api/periodic_reports/weekly_report/download`,
      {
        method: 'POST',
        headers: {
          authorization: 'JWT ' + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );

    const data = await res.blob()
    return data;
  },


  getMonitoringChartData: async (periodState, query, setChartData, setRequestStatus, chartDataNormalizer) => {
    setRequestStatus({isLoading: true, isError: false, isSuccess: false, message: ''})
    const period = periodState === 'По дням' ? 'day' : 'month';
    try {
      let res = await fetch(`https://radarmarket.ru/api/analytic/query-dynamics/${period}?query_string=${query}`,
        {
          headers: {
            'content-type': 'application/json',
            'cache-control': 'public, must-revalidate, max-age=86400'
          },
        }
      );
      if (!res.ok) {
        res = await res.json()
        setRequestStatus({isLoading: false, isError: true, isSuccess: false, message: res.detail || 'Не удалось загрузить данные'})
        return
      }
      setRequestStatus({isLoading: false, isError: false, isSuccess: true, message: ''})
      res = await res.json()
      const normalizedData = chartDataNormalizer(res[query], period)
      setChartData(normalizedData)
      return res;
    } catch {
      setRequestStatus({isLoading: false, isError: true, isSuccess: false, message: 'Не удалось загрузить данные'})
    }
  },

	getTrendAnalysisQuery: async (
		query,
		timeFrame,
		selectedRange,
	) => {
		let url = `https://radarmarket.ru/api/analytic/query-dynamics/${timeFrame}?query_string=${encodeURIComponent( query )}`;
		if (timeFrame == 'day'){
			url += '&' + rangeApiFormat(selectedRange)
		}
		const res = await fetch(
			url,
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
			}
		);

		const data = await res.json();

		return data;
	},

	getDownloadTrendAnalysisQuery: async (
		query,
		timeFrame,
		selectedRange
	) => {
		let url = `https://radarmarket.ru/api/analytic/query-dynamics/${timeFrame}/download?query_string=${encodeURIComponent( query )}`;
		if (timeFrame == 'day'){
			url += '&' + rangeApiFormat(selectedRange)
		}
		const res = await fetch(
			url,
      {
        method: 'GET',
        headers: {
					'content-type': 'application/json',
        },
      }
    );

    const data = await res.blob()
    return data;
	},
	getReportProfitLoss: async (token, selectedRange, shopId, filters, monthRange) => {
    const body = getRequestObject(filters, selectedRange, shopId);
		body.month_from = monthRange?.month_from || null;
		body.month_to = monthRange?.month_to || null;

    const res = await fetch(
      `${URL}/api/profit_loss/report`,
      {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'JWT ' + token,
			},
        body: JSON.stringify(body)
      }
    );

		const data = await res.json();

		return data;
	},
	getReferalData: async(token, page) => {
		try {
			const res = await fetch(
				`${URL}/api/referral_system?page=${page}&per_page=25`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json',
						authorization: 'JWT ' + token,
					}
				}
			);
			
			if (res.status !== 200){
				throw new Error('Ощибка запроса');
			}
	
			return res.json();

		} catch(error) {
			console.error('getReferalData ', error);
			throw new Error(error);
		}

	}
};

