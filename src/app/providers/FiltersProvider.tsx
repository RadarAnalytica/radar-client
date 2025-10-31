import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import AuthContext from '@/service/AuthContext';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
// import { URL } from '@/service/config';
import { fetchApi } from '@/service/fetchApi';
import type { RootState, AppDispatch } from '@/redux/store.types';
import LoaderPage from '@/pages/LoaderPage';

const FiltersProvider = ({ children }: { children: React.ReactNode }) => {

  const { authToken } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const { activeBrand, shops } = useAppSelector((store: RootState) => store.filters);
  const { messages } = useAppSelector((state: RootState) => state.messagesSlice);
  const prevMessages = useRef<any[] | null>(null);
  const [isFiltersLoading, setIsFiltersLoading] = useState(false);

  const getFiltersData = async () => {
    if (!authToken) return;
    setIsFiltersLoading(true);
    try {
      let shopsResponse = await fetchApi('/api/shop/all', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'JWT ' + authToken,
        }
      });

      let shopsData = null;
      if (shopsResponse?.ok) {
        shopsData = await shopsResponse.json();
      }

      // @ts-ignore
      await dispatch(fetchFilters({
        authToken,
        shopsData
        //shopsData: null
      }));
    } catch (error) {
      console.error("FiltersProvider: Error fetching initial data:", error);
    } finally {
      setIsFiltersLoading(false);
    }
  };

    // Получаем данные магазинов
    // useEffect(() => {
    //     if (!shops || shops.length === 0) {
    //         getFiltersData();
    //     }
    // }, []);

    // Отслеживаем изменения authToken
    useEffect(() => {
        if (authToken && (!shops || shops.length === 0)) {
            getFiltersData();
        }
    }, [authToken]);

    //Данные магазина [A-Za-z0-9]+ успешно собраны\. Результаты доступны на страницах сервиса
    useEffect(() => {
        // Если это первая пачка сообщений, то данные актуальны и мы просто записываем сообщения для последующего сравнения
        if (!prevMessages?.current) {
            prevMessages.current = messages;
            return;
        }

        // Если это последующие сообщения ....
        if (messages && activeBrand?.id === 0 && prevMessages?.current) {
            // Ищем свежие сообщения
            let filteredMessages = messages.filter((m: any) => !prevMessages.current?.some(_ => _.id === m.id));
            // Выходим если свежих нет
            if (!filteredMessages || filteredMessages.length === 0) { return; }
            else {
                // Если свежие есть, то ищем интересующее нас (про сбор данных магазина) и полученные меньше минуты назад
                const now = Date.now();
                filteredMessages = filteredMessages
                    .filter(m => /Данные магазина [A-Za-z0-9]+ успешно собраны\. Результаты доступны на страницах сервиса/.test(m.text))
                    .filter((m: any) => (now - new Date(m?.created_at).getTime()) < 60000);


                // Если выходим если таких нет
                if (!filteredMessages || filteredMessages.length === 0) { return; }
                else {
                    // Если такие есить то перезапрашиваем фильтры и магазины
                    getFiltersData();
                }
            }
        }
        prevMessages.current = messages;
    }, [messages]);

    // обновляем раз в 30 секунд магазины если данные не собраны
    useEffect(() => {
        activeBrand && localStorage.setItem('activeShop', JSON.stringify(activeBrand));
        let interval: NodeJS.Timeout;
        if (activeBrand && !activeBrand.is_primary_collect) {
            interval = setInterval(() => {
                getFiltersData();
            }, 30000);
        }
        return () => { interval && clearInterval(interval); };
    }, [activeBrand]);


    return (
      <>
        {children}
        {isFiltersLoading && <LoaderPage />}
      </>
    );
};

export default FiltersProvider;
