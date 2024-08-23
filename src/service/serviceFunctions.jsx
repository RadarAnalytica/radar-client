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

  getAbcData: async (token, day, idShop) => {
    const res = await fetch(
      `${URL}/api/abc_data/?period=${day}&shop=${idShop}`,
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
};
