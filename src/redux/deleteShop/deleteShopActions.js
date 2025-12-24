import { createAsyncThunk } from "@reduxjs/toolkit";
import {URL} from '../../service/config';


export const deleteShop = createAsyncThunk("deleteShop", async (reqData) => {
    const {shop, authToken} = reqData.deleteShopData;
    const {setAddShopRequestStatus, initRequestStatus} = reqData;

    try {
        let res = await fetch(URL + '/api/shop/' + shop?.id, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "authorization": "JWT " + authToken
            },
        });
        if (!res.ok) {
            setAddShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось удалить магазин'});
            return;
        }

        setAddShopRequestStatus({...initRequestStatus, isLoading: false, isSuccess: true, message: 'Магазин успешно удален!'});
    } catch {
        setAddShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось удалить магазин'});
    }

});
