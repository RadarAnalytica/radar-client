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
            })
        })
        if (!response.ok) {
            //response = await response.json()
            console.log('r', response)
            const parsedResponse = await response.json()
            console.log('pr', parsedResponse)
            const message = response && typeof response === 'string' ? response : 'Не удалось обновить данные магазина'
            console.log('m', message)
            console.log('t', response.text())
            setEditShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message })
            return
            // console.error('Ошибка ответа сервера:', response.status, response.statusText);
            // const errorData = await response.text();
            // console.error('Данные ошибки:', errorData);
            // throw new Error('Ошибка при редактировании магазина');
        }
        setEditShopRequestStatus({...initRequestStatus, isLoading: false, isSuccess: true, message: 'Магазин успешно обновлен'})
        const data = await response.json()
        return data
    
    } catch (e) {
        console.log('e', e)
        setEditShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось обновить данные магазина'})
    }
})

