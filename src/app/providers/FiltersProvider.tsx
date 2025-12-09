import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import AuthContext from '@/service/AuthContext';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { fetchApi } from '@/service/fetchApi';
import type { RootState, AppDispatch } from '@/redux/store.types';

interface FiltersContextType {
  isFiltersLoading: boolean;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

const FiltersProvider = ({ children }: { children: React.ReactNode }) => {

    const { authToken, user } = useContext(AuthContext);
    const dispatch = useDispatch<AppDispatch>();
    const { activeBrand } = useAppSelector((store: RootState) => store.filters);
    const { messages } = useAppSelector((state: RootState) => state.messagesSlice);
    const prevMessages = useRef<any[] | null>(null);
    const [isFiltersLoading, setIsFiltersLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const requestCounterRef = useRef(0);

    const getFiltersData = async () => {
      // if (!authToken) return;
      setIsError(false);
      setIsFiltersLoading(true);
      try {
        let shopsResponse = await fetchApi('/api/shop/all', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: 'JWT ' + authToken,
          }
        });
        if (!shopsResponse?.ok) {
          setIsError(true);
          return;
        }
        let shopsData = null;
        shopsData = await shopsResponse.json();

        // @ts-ignore
        await dispatch(fetchFilters({
          authToken,
          shopsData
          //shopsData: null
        }));
      } catch (error) {
        console.error("FiltersProvider: Error fetching initial data:", error);
        setIsFiltersLoading(false);
        setIsError(true);
      }
    };

    useEffect(() => {
      if (authToken && !activeBrand && !isFiltersLoading && !isError) {
        getFiltersData();
      }
    }, [authToken, isFiltersLoading]);

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout>;
      if (isError) {
        requestCounterRef.current++;
        if (requestCounterRef.current <= 60) {
          timeout = setTimeout(() => {
            getFiltersData();
          }, 1000);
          
        } else {
          setIsError(false);
        }
      }
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }, [isError]);

    //Данные магазина [A-Za-z0-9]+ успешно собраны\. Результаты доступны на страницах сервиса
    useEffect(() => {
        // Если это первая пачка сообщений, то данные актуальны и мы просто записываем сообщения для последующего сравнения
        if (!prevMessages?.current) {
            prevMessages.current = messages;
            return;
        }

        // Если это последующие сообщения ....
        if (messages && prevMessages?.current) {
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
        let interval: ReturnType<typeof setInterval>;
        if (activeBrand && !activeBrand.is_primary_collect && activeBrand.id !== 0) {
            interval = setInterval(() => {
                getFiltersData();
            }, 30000);
        }
        return () => { interval && clearInterval(interval); };
    }, [activeBrand]);

    const contextValue: FiltersContextType = {
        isFiltersLoading,
    };

    return (
        <FiltersContext.Provider value={contextValue}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = (): FiltersContextType => {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error('useFilters must be used within a FiltersProvider');
    }
    return context;
};

export default FiltersProvider;
