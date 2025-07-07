import { createAsyncThunk } from "@reduxjs/toolkit";
import {URL} from '../../service/config';


export const deleteShop = createAsyncThunk("deleteShop", async (reqData) => {
    const {shop, authToken} = reqData.deleteShopData;
    const {setDeleteShopRequestStatus, initRequestStatus} = reqData;
    setDeleteShopRequestStatus({...initRequestStatus, isLoading: true})
   
    try {
        let res = await fetch(URL + '/api/shop/' + shop?.id, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "authorization": "JWT " + authToken
            },
        })
        if (!res.ok) {
            setStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось удалить магазин'});
            return
        }

        setDeleteShopRequestStatus({...initRequestStatus, isLoading: false, isSuccess: true, message: 'Магазин успешно удален!'});
    } catch {
        setDeleteShopRequestStatus({...initRequestStatus, isLoading: false, isError: true, message: 'Не удалось удалить магазин'});
    }
    
})