import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../../service/AuthContext';
import styles from './filters.module.css'
import { TimeSelect, PlainSelect, FrequencyModeSelect, ShopSelect, MultiSelect, WeekSelect, MonthSelect, TempTimeSelect } from '../features'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actions as filterActions } from '../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice'
import { fetchShops } from '../../../../redux/shops/shopsActions';
import { fetchFilters } from '../../../../redux/apiServicePagesFiltersState/filterActions';

export const Filters = ({
  shopSelect = true,
  timeSelect = true,
  skuFrequency = false,
  brandSelect = true,
  articleSelect = true,
  groupSelect = true,
  weekSelect = false,
  weekOptions,
  weekValue,
  weekHandler,
  monthSelect = false,
  monthHandler,
  monthValue,
  tempPageCondition,
  isDataLoading
}) => {

  // ------ база ------//
  const { user, authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch()
  const { activeBrand, selectedRange, filters, shops } = useAppSelector(store => store.filters)
  const { messages } = useAppSelector((state) => state.messagesSlice);
  const prevMessages = useRef()
  const filtersState = useAppSelector(store => store.filters)
  //const shops = useAppSelector((state) => state.shopsSlice.shops);
  //--------------------//


  // ---- хэндлер выбора магазина -----------//
  const shopChangeHandler = (value) => {
    const selectedShop = shops?.find(_ => _.id === value)
    dispatch(filterActions.setActiveShop(selectedShop))
  }
  //- -----------------------------------------//

  // ------- Фетч массива магазинов -------------//
  const fetchShopData = async () => {
    try {
      if (user.subscription_status === null) {
        dispatch(fetchShops('mockData'));
      } else {
        dispatch(fetchShops(authToken));
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };
  //---------------------------------------------//
  // ------- Фетч фильтров -------------//
  const fetchFiltersData = async () => {
    try {
      if (user.subscription_status === null) {
        //dispatch(fetchShops('mockData'));
      } else {
        dispatch(fetchFilters(authToken))
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };
  //---------------------------------------------//


  // 0. Получаем данные магазинов
  useEffect(() => {
    if (!shops || shops.length === 0) {
      fetchShopData();
      fetchFiltersData();
    }
  }, [shops]);


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
      let filteredMessages = messages.filter(m => !prevMessages.current.some(_ => _.id === m.id))
      // Выходим если свежих нет
      if (!filteredMessages || filteredMessages.length === 0) {return}
      else {
        // Если свежие есть, то ищем интересующее нас (про сбор данных магазина) и полученные меньше минуты назад
        const now = Date.now();
        filteredMessages = filteredMessages
          .filter(m => /Данные магазина [A-Za-z0-9]+ успешно собраны\. Результаты доступны на страницах сервиса/.test(m.text))
          .filter(m => (now - new Date(m.created_at)) < 60000 )
        

        // Если выходим если таких нет
        if (!filteredMessages || filteredMessages.length === 0) {return}
        else {
          // Если такие есить то перезапрашиваем фильтры и магазины
          fetchFiltersData();
          fetchShopData();
        }
      } 
    }
    prevMessages.current = messages
  }, [messages])



  // 1.1 - проверяем магазин в локал сторадже. Если находим, то устанавливаем его как выбранный, если нет, то берем первый в списке
  // 1.2 - если магазин уже установлен, но по нему еще не собраны данные (это проверяем в п2.2) - проверяем магазин после апдейта каждые 30 сек (см п2.2)
  useEffect(() => {
    if (shops && shops.length > 0 && !activeBrand) {
      // достаем сохраненный магазин
      const shopFromLocalStorage = localStorage.getItem('activeShop')
      // если сохранненный магазин существует и у нас есть массив магазинов....
      if (shopFromLocalStorage && shopFromLocalStorage !== 'null' && shopFromLocalStorage !== 'undefined') {
        // парсим сохраненный магазин
        const { id } = JSON.parse(shopFromLocalStorage);
        // проверяем есть ли магазин в массиве (это на случай разных аккаунтов)
        const isInShops = shops.some(_ => _.id === id);
        // Если магазин есть в массиве (т.е. валиден для этого аккаунта) то...
        if (isInShops) {
          //....устанавливаем как текущий
          dispatch(filterActions.setActiveShop(shops.find(_ => _.id === id)))
          // Если нет, то...
        } else {
          // ...Обновляем локал - сохраняем туда первый из списка
          localStorage.setItem('activeShop', JSON.stringify(shops[0]))
          // ...устанавливаем текущим первый из списка
          dispatch(filterActions.setActiveShop(shops[0]))
        }
      } else {
        // ...Обновляем локал - сохраняем туда первый из списка
        localStorage.setItem('activeShop', JSON.stringify(shops[0]))
        // ...устанавливаем текущим первый из списка
        dispatch(filterActions.setActiveShop(shops[0]))
      }
    }

    if (shops && activeBrand && !activeBrand.is_primary_collect) {
      const currentShop = shops.find(shop => shop.id === activeBrand.id)
      if (currentShop?.is_primary_collect) {
        dispatch(filterActions.setActiveShop(currentShop))
      }
    }
  }, [shops])
  //--------------------------------------------------------------------------------//


  // обновляем раз в 30 секунд магазины если данные не собраны
  useEffect(() => {
    activeBrand && localStorage.setItem('activeShop', JSON.stringify(activeBrand))
    let interval;
    if (activeBrand && !activeBrand.is_primary_collect) {
      interval = setInterval(() => { fetchShopData() }, 30000)
    }
    return () => { interval && clearInterval(interval) }
  }, [activeBrand, selectedRange]);

  // это обект, который представляет опцию "все" ввиде магазина
  // const allShopOptionAsShopObject = {
  //   id: 0,
  //   brand_name: "Все",
  //   is_active: true,
  //   is_primary_collect: shops?.some(_ => _.is_primary_collect),
  //   is_valid: true,
  // };

  // это массив магазинов с добавлением опции "все"
  //const shopArrayFormSelect = [allShopOptionAsShopObject, ...shops]



  return (
    <div className={styles.filters}>
      <div className={styles.filters__inputsMainWrapper}>
        {activeBrand && weekSelect && weekOptions.length > 0 && <div className={styles.filters__inputWrapper}>
            <WeekSelect
              selectId='week'
              label='Период:'
              value={weekValue}
              optionsData={weekOptions}
              handler={weekHandler}
              isDataLoading={isDataLoading}
            />
          </div>
        }
        {skuFrequency &&
          <FrequencyModeSelect isDataLoading={isDataLoading}/>
        }
        {shops && activeBrand && monthSelect &&
          <div className={styles.filters__inputWrapper}>
            <MonthSelect monthHandler={monthHandler} value={monthValue} isDataLoading={isDataLoading}/>
          </div>
        }
        {shops && timeSelect && tempPageCondition !== 'supplier' &&
          <div className={styles.filters__inputWrapper}>
            <TimeSelect isDataLoading={isDataLoading}/>
          </div>
        }
        {timeSelect && tempPageCondition === 'supplier' &&
          <div className={styles.filters__inputWrapper}>
            <TempTimeSelect isDataLoading={isDataLoading}/>
          </div>
        }
        {shops && activeBrand && shopSelect &&
          <div className={styles.filters__inputWrapper}>
            <ShopSelect
              selectId='store'
              label='Магазин:'
              value={activeBrand.id}
              optionsData={shops}
              handler={shopChangeHandler}
              isDataLoading={isDataLoading}
            />
          </div>
        }
        {filters && activeBrand && filters.map((i, id) => {
          return activeBrand.id === i.shop.id && (
            <React.Fragment key={id}>
              {brandSelect && <div className={styles.filters__inputWrapper}>
                <MultiSelect
                  dispatch={dispatch}
                  filterActions={filterActions}
                  params={i.brands}
                  selectId={i.brands.enLabel}
                  label={`${i.brands.ruLabel}:`}
                  value={filtersState[i.brands.stateKey]}
                  optionsData={i.brands.data}
                  isDataLoading={isDataLoading}
                />
              </div>}
              {articleSelect &&<div className={styles.filters__inputWrapper}>
                <MultiSelect
                  dispatch={dispatch}
                  filterActions={filterActions}
                  params={i.articles}
                  selectId={i.articles.enLabel}
                  label={`${i.articles.ruLabel}:`}
                  value={filtersState[i.articles.stateKey]}
                  optionsData={filtersState?.activeBrandName?.some(_ => _.value === 'Все') ? i.articles.data : i.articles.data.filter(_ => filtersState?.activeBrandName?.some(b => _.brand === b.value))}
                  isDataLoading={isDataLoading}
                />
              </div>}
              {groupSelect && <div className={styles.filters__inputWrapper}>
                <MultiSelect
                  dispatch={dispatch}
                  filterActions={filterActions}
                  params={i.groups}
                  selectId={i.groups.enLabel}
                  label={`${i.groups.ruLabel}:`}
                  value={filtersState[i.groups.stateKey]}
                  optionsData={i.groups.data}
                  isDataLoading={isDataLoading}
                />
              </div>}
              {/* <div className={styles.filters__inputWrapper}>
                <PlainSelect
                  selectId={i.groups.enLabel}
                  label={`${i.groups.ruLabel}:`}
                  value={filtersState[i.groups.stateKey]}
                  optionsData={i.groups.data}
                  handler={(value) => {
                    const current = i.groups.data.find(_ => _.value === value);
                    dispatch(filterActions.setActiveFilters({ stateKey: i.groups.stateKey, data: current }))
                  }}
                />
              </div> */}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  );
};
