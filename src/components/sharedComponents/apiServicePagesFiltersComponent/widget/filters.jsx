import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../../service/AuthContext';
import styles from './filters.module.css'
import { TimeSelect, PlainSelect, FrequencyModeSelect, ShopSelect, MultiSelect, MonthSelect, TempTimeSelect } from '../features'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actions as filterActions } from '../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice'
import { fetchShops } from '../../../../redux/shops/shopsActions';
import { fetchFilters } from '../../../../redux/apiServicePagesFiltersState/filterActions';
import { URL } from '../../../../service/config';
import { getSavedActiveWeeks } from '@/service/utils';

export const Filters = ({
  shopSelect = true,
  timeSelect = true,
  skuFrequency = false,
  brandSelect = true,
  articleSelect = true,
  groupSelect = true,
  weekSelect = false,
  monthSelect = false,
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
        return await dispatch(fetchShops(authToken));
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };
  //---------------------------------------------//
  // ------- Фетч фильтров -------------//
  const fetchFiltersData = async () => {
    try {
      dispatch(fetchFilters(authToken))
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };
  //---------------------------------------------//

  const getFiltersData = async () => {
    try {
      let shopsResponse = await fetch(`${URL}/api/shop/all`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: user.subscription_status === null ? 'JWT ' + 'mockData' : 'JWT ' + authToken,
        }
      })
      dispatch(fetchFilters({ 
        authToken, 
        shopsData: shopsResponse.ok ? await shopsResponse.json() : null
      }))
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }


  // 0. Получаем данные магазинов
  useEffect(() => {
    if (!shops || shops.length === 0) {
      //fetchShopData();
      //fetchFiltersData();
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
      let filteredMessages = messages.filter(m => !prevMessages.current.some(_ => _.id === m.id))
      // Выходим если свежих нет
      if (!filteredMessages || filteredMessages.length === 0) { return }
      else {
        // Если свежие есть, то ищем интересующее нас (про сбор данных магазина) и полученные меньше минуты назад
        const now = Date.now();
        filteredMessages = filteredMessages
          .filter(m => /Данные магазина [A-Za-z0-9]+ успешно собраны\. Результаты доступны на страницах сервиса/.test(m.text))
          .filter(m => (now - new Date(m.created_at)) < 60000)


        // Если выходим если таких нет
        if (!filteredMessages || filteredMessages.length === 0) { return }
        else {
          // Если такие есить то перезапрашиваем фильтры и магазины
          //fetchFiltersData();
          //fetchShopData();
          getFiltersData()
        }
      }
    }
    prevMessages.current = messages
  }, [messages])


  // обновляем раз в 30 секунд магазины если данные не собраны
  useEffect(() => {
    activeBrand && localStorage.setItem('activeShop', JSON.stringify(activeBrand))
    let interval;
    if (activeBrand && !activeBrand.is_primary_collect) {
      interval = setInterval(() => {
        //fetchShopData()
        //fetchFiltersData();
        getFiltersData()
      }, 30000)
    }
    return () => { interval && clearInterval(interval) }
  }, [activeBrand]);




  return (
    <div className={styles.filters}>
      <div className={styles.filters__inputsMainWrapper}>
        {shops && activeBrand && weekSelect && 
          <div className={styles.filters__inputWrapper}>
            <MultiSelect
              dispatch={dispatch}
              filterActions={filterActions}
              params={filters.find((el) => el.shop.id === activeBrand.id).weeks}
              selectId={filters.find((el) => el.shop.id === activeBrand.id).weeks.enLabel}
              label={`${filters.find((el) => el.shop.id === activeBrand.id).weeks.ruLabel}:`}
              value={filtersState.activeWeeks}
              optionsData={filters.find((el) => el.shop.id === activeBrand.id).weeks.data}
              isDataLoading={isDataLoading}
            />
          </div>
        }
        {skuFrequency &&
          <FrequencyModeSelect isDataLoading={isDataLoading} />
        }
        {shops && activeBrand && monthSelect &&
          <div className={styles.filters__inputWrapper}>
            <MonthSelect
              dispatch={dispatch}
              filterActions={filterActions}
              selectId={filters.find((el) => el.shop.id === activeBrand.id).months.enLabel}
              label={`${filters.find((el) => el.shop.id === activeBrand.id).months.ruLabel}:`}
              value={filtersState.activeMonths}
              isDataLoading={isDataLoading} />
          </div>
        }
        {shops && activeBrand && timeSelect && tempPageCondition !== 'supplier' &&
          <div className={styles.filters__inputWrapper}>
            <TimeSelect isDataLoading={isDataLoading} />
          </div>
        }
        {timeSelect && tempPageCondition === 'supplier' &&
          <div className={styles.filters__inputWrapper}>
            <TempTimeSelect isDataLoading={isDataLoading} />
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
              {articleSelect && <div className={styles.filters__inputWrapper}>
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
