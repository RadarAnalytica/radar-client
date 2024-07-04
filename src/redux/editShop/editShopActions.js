import { createAsyncThunk } from "@reduxjs/toolkit";
import {URL} from '../../service/config';


export const editShop = createAsyncThunk("editShop", async (editData) => {
    const {activeShop, is_active, is_delete, authToken, brandName,tkn } = editData;


   
      console.log('Используемый токен:', authToken);

    const response = await fetch(URL + '/api/shop/' + activeShop?.id, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': 'JWT ' + authToken
        },
        body: JSON.stringify({
            brand_name : brandName,
            token : tkn,
            is_active : is_active,
            is_delete : is_delete
            
    })
    })
    if (!response.ok) {
        console.error('Ошибка ответа сервера:', response.status, response.statusText);
        const errorData = await response.text(); 
        console.error('Данные ошибки:', errorData);
        throw new Error('Ошибка при редактировании магазина');
    }
    const data = await response.json()
    return data
    
})

