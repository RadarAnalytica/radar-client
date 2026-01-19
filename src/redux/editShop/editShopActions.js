import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from '../../service/config';


export const editShop = createAsyncThunk("editShop", async (reqData) => {
    const { shopId, authToken, name, shopToken } = reqData.editData;
    const {setAddShopRequestStatus, initRequestStatus } = reqData;
    console.log(initRequestStatus)
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
        });
        if (!response.ok) {
            console.log('Response status:', response.status);
            const errorText = await response.text();
            console.log('Error response text:', errorText);
            const message = errorText || 'Не удалось обновить данные магазина';
            setAddShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message });
            return;
        }
        setAddShopRequestStatus({...initRequestStatus, isLoading: false, isSuccess: true, message: 'Магазин успешно обновлен'});
        const data = await response.json();
        return data;

    } catch (e) {
        console.log('e', e);
        setAddShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось обновить данные магазина'});
    }
});

