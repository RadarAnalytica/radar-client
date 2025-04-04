import { URL } from "../config";
export const getCalculatorSubjects = async (data) => {
    try {
        const res = await fetch(`${URL}/api/calculator/subjects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())

       return res;
    } catch(e) {
        console.log('error')
    }
}

export const createBlogPost = async (data, query, token) => {
    try {
        const response = await fetch(`${URL}/api/admin/blog/articles?${query}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'authorization': 'JWT ' + token,
            },
            body: data
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при создании статьи');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const createBlogCategory = async (data, token) => {
    try {
        const response = await fetch(`${URL}/api/admin/blog/categories`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': 'JWT ' + token,
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при создании статьи');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}