import { URL } from "../config";
export const getCalculatorSubjects = async (data) => {
    try {
        const res = await fetch(`${URL}/api/calculator/subjects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'cache': 'no-store'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());

        return res;
    } catch (e) {
        console.log('error');
    }
};

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
};

export const createBlogCategory = async (data, query, token) => {
    try {
        const response = await fetch(`${URL}/api/admin/blog/categories?${query}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'authorization': 'JWT ' + token,
            },
            body: data
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при создании категории');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateBlogCategory = async (categoryId, data, query, token) => {
    try {
        const response = await fetch(`${URL}/api/admin/blog/categories/${categoryId}?${query}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'authorization': 'JWT ' + token,
            },
            body: data
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при обновлении категории');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteBlogCategory = async (categoryId, token) => {
    try {
        const response = await fetch(`${URL}/api/admin/blog/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'authorization': 'JWT ' + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Ошибка при удалении категории');
        }

        // backend may return empty body for DELETE
        return await response.json().catch(() => ({}));
    } catch (error) {
        throw error;
    }
};
export const addShop = async (data) => {
    const { brandName, tkn, authToken } = data;
    const response = await fetch(URL + '/api/shop/', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "authorization": "JWT " + authToken,
        },
        body: JSON.stringify({
            brand_name: brandName,
            token: tkn,
            is_active: true
        })
    });

    return response;
};
