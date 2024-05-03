import { URL } from "./config"



export const ServiceFunctions = {

    register: async (object) => {
        try {
            const res = await fetch(`${URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(object)
            })
            const data = await res.json()
            return data
        } catch (error) {
            alert(error)
        }
    },

    updateToken: async (brandName, token, id) => {
        const res = await fetch(`${URL}/api/user/update/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ brandName, token })
        })
        const data = await res.json()
        return data
    },

    getDataCollection: async (id, days, brandName) => {
        const res = await fetch(`${URL}/api/data-collection/${id}?days=${days}&brandName=${brandName}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })

        const data = await res.json()
        return data
    },

    getFilteredCollection: async (id, days, brandName) => {
        const res = await fetch(`${URL}/api/data-collection/filtered/${id}?days=${days}&brandName=${brandName}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })

        const data = await res.json()
        return data
    },

    // getBrandNames: async (id) => {
    //     const res = await fetch(`${URL}/api/shop/all`, {
    //         method: 'GET',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //     })

    //     const data = await res.json()
    //     return data
    // },

    getBrandNames: async (id) => {
        const res = await fetch(`${URL}/api/data-collection/names/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })

        const data = await res.json()
        return data
    },

    getOrders: async (id, brandName) => {
        const res = await fetch(`${URL}/api/orders/${id}?brandName=${brandName}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })

        const data = await res.json()
        return data
    },

    getSales: async (id, brandName) => {
        const res = await fetch(`${URL}/api/sales/${id}?brandName=${brandName}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })

        const data = await res.json()
        return data
    },

    getGeoData: async (id, brandName, days) => {
        const res = await fetch(`${URL}/api/data-collection/geo/${id}?brandName=${brandName}&days=${days}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })

        const data = await res.json()
        return data
    },

    updateTax: async (id, brandName, obj) => {
        const res = await fetch(`${URL}/api/data-collection/tax/${id}?brandName=${brandName}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj),
        });

        console.log(obj);
        const data = await res.json()
        return data
    }

}