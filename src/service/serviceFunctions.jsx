import { URL } from "./config"



export const ServiceFunctions = {

    register: async (object) => {
        const res = await fetch(`${URL}/api/user/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(object)
        })
        const data = res.json()
        return data
    },

    updateToken: async (brandName, token, id) => {
        const res = await fetch(`${URL}/api/user/update${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ brandName, token })
        })
        const data = res.json()
        return data
    }

}