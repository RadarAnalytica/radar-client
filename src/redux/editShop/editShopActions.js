import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from '../../service/config';


export const editShop = createAsyncThunk("editShop", async (reqData) => {
    const { shopId, authToken, name, shopToken } = reqData.editData;
    const {setEditShopRequestStatus, initRequestStatus } = reqData
    setEditShopRequestStatus({...initRequestStatus, isLoading: true})
    try {
        let response = await fetch(URL + '/api/shop/' + shopId, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': 'JWT ' + authToken
            },
            body: JSON.stringify({
                brand_name: name,
                token: shopToken,
                //is_active : is_active,
                //is_delete : is_delete
    
            })
        })
        if (!response.ok) {
            setEditShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось обновить магазин'})
            return
            // console.error('Ошибка ответа сервера:', response.status, response.statusText);
            // const errorData = await response.text();
            // console.error('Данные ошибки:', errorData);
            // throw new Error('Ошибка при редактировании магазина');
        }
        setEditShopRequestStatus({...initRequestStatus, isLoading: false, isSuccess: true, message: 'Магазин успешно обновлен'})
        const data = await response.json()
        return data
    
    } catch {
        setEditShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось обновить магазин'})
    }
})

