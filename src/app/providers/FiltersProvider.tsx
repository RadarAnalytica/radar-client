import React, { useContext, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import AuthContext from '@/service/AuthContext';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { URL } from '@/service/config';
import type { RootState, AppDispatch } from '@/redux/store.types';

const FiltersProvider = ({ children }: { children: React.ReactNode }) => {

    const { user, authToken } = useContext(AuthContext);
    const dispatch = useDispatch<AppDispatch>()
    const { activeBrand, shops } = useAppSelector((store: RootState) => store.filters)
    const { messages } = useAppSelector((state: RootState) => state.messagesSlice);
    const prevMessages = useRef<any[] | null>(null)


    const getFiltersData = async () => {
        try {
            let shopsResponse = await fetch(`${URL}/api/shop/all`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: 'JWT ' + authToken,
                }
            })
            //let shopsResponse = null
            // @ts-ignore
            dispatch(fetchFilters({
                authToken,
                shopsData: shopsResponse?.ok ? await shopsResponse.json() : null
                //shopsData: null
            }))
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    }

    // Получаем данные магазинов
    useEffect(() => {
        if ((!shops || shops.length === 0)) {
            getFiltersData()
        }
    }, []);

    //Данные магазина [A-Za-z0-9]+ успешно собраны\. Результаты доступны на страницах сервиса
    useEffect(() => {
        // Если это первая пачка сообщений, то данные актуальны и мы просто записываем сообщения для последующего сравнения
        if (!prevMessages?.current) {
            prevMessages.current = messages;
            return
        }

        // Если это последующие сообщения ....
        if (messages && activeBrand?.id === 0 && prevMessages?.current) {
            // Ищем свежие сообщения
            let filteredMessages = messages.filter((m: any) => !prevMessages.current?.some(_ => _.id === m.id))
            // Выходим если свежих нет
            if (!filteredMessages || filteredMessages.length === 0) { return }
            else {
                // Если свежие есть, то ищем интересующее нас (про сбор данных магазина) и полученные меньше минуты назад
                const now = Date.now();
                filteredMessages = filteredMessages
                    .filter(m => /Данные магазина [A-Za-z0-9]+ успешно собраны\. Результаты доступны на страницах сервиса/.test(m.text))
                    .filter((m: any) => (now - new Date(m?.created_at).getTime()) < 60000)


                // Если выходим если таких нет
                if (!filteredMessages || filteredMessages.length === 0) { return }
                else {
                    // Если такие есить то перезапрашиваем фильтры и магазины
                    getFiltersData()
                }
            }
        }
        prevMessages.current = messages
    }, [messages])

    // обновляем раз в 30 секунд магазины если данные не собраны
    useEffect(() => {
        activeBrand && localStorage.setItem('activeShop', JSON.stringify(activeBrand))
        let interval: NodeJS.Timeout;
        if (activeBrand && !activeBrand.is_primary_collect) {
            interval = setInterval(() => {
                getFiltersData()
            }, 30000)
        }
        return () => { interval && clearInterval(interval) }
    }, [activeBrand]);



    return (
        <>{children}</>
    );
};

export default FiltersProvider;