import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from '@/service/AuthContext';
import styles from './AddRnpFilters.module.css';
import { ShopSelect, MultiSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as filterActions } from '@/redux/filtersRnpAdd/filtersRnpAddSlice';
import { fetchShops } from '@/redux/shops/shopsActions';
import { fetchFiltersRnpAdd } from '@/redux/filtersRnpAdd/filtersRnpAddActions';

export const Filters = ({
  open = true,
  articleSelect = true,
  groupSelect = true,
  categorySelect = true,
}) => {

  // ------ база ------//
  const { authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { activeBrand, selectedRange, filters, shops } = useAppSelector(store => store.filtersRnpAdd);
  const filtersState = useAppSelector(store => store.filtersRnpAdd);
  //const shops = useAppSelector((state) => state.shopsSlice.shops);
  const { messages } = useAppSelector((state) => state.messagesSlice);
  const prevMessages = useRef();
  //--------------------//


  // ---- хэндлер выбора магазина -----------//
  const shopChangeHandler = (value) => {
    const selectedShop = shops?.find(_ => _.id === value);
    dispatch(filterActions.setActiveShop(selectedShop));
  };
  //- -----------------------------------------//

  // ------- Фетч фильтров -------------//
  const fetchFiltersData = async () => {
    try {
      dispatch(fetchFiltersRnpAdd(authToken));
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };
  //---------------------------------------------//


  // 0. Получаем данные магазинов
  useEffect(() => {
    if ((!shops || shops.length === 0)) {
      fetchFiltersData();
    }
  }, []);

  // 1.1 - проверяем магазин в локал сторадже. Если находим, то устанавливаем его как выбранный, если нет, то берем первый в списке
  // 1.2 - если магазин уже установлен, но по нему еще не собраны данные (это проверяем в п2.2) - проверяем магазин после апдейта каждые 30 сек (см п2.2)
  useEffect(() => {
    if (shops && !activeBrand) {
      dispatch(filterActions.setActiveShop(shops[0]));
    }

    if (shops && activeBrand &&
      (!filtersState.activeBrandName.some(_ => _.value === 'Все') &&
      !filtersState.activeArticle.some(_ => _.value === 'Все') &&
      !filtersState.activeGroup.some(_ => _.value === 'Все') &&
      !filtersState.activeCategory.some(_ => _.value === 'Все'))
    ) {
      dispatch(filterActions.setActiveShop(shops[0]));
    }

    // if (shops && activeBrand && !activeBrand.is_primary_collect) {
    //   const currentShop = shops.find(shop => shop.id === activeBrand.id)
    //   if (currentShop?.is_primary_collect) {
    //     dispatch(filterActions.setActiveShop(currentShop))
    //   }
    // }
  }, [shops, open]);
  //--------------------------------------------------------------------------------//

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
      let filteredMessages = messages.filter(m => !prevMessages.current.some(_ => _.id === m.id));
      // Выходим если свежих нет
      if (!!filteredMessages && filteredMessages.length > 0) {
        // Если свежие есть, то ищем интересующее нас (про сбор данных магазина) и полученные меньше минуты назад
        const now = Date.now();
        filteredMessages = filteredMessages
          .filter(m => /Данные магазина [A-Za-z0-9]+ успешно собраны\. Результаты доступны на страницах сервиса/.test(m.text))
          .filter(m => (now - new Date(m.created_at)) < 60000 );


        // Если выходим если таких нет
        if (!!filteredMessages || filteredMessages.length > 0) {
          fetchFiltersData();
        }
      }
    }
    prevMessages.current = messages;
  }, [messages]);

  return (
    <div className={styles.filters}>
      <div className={styles.filters__inputsMainWrapper}>

        {shops && activeBrand &&
          <div className={styles.filters__inputWrapper}>
            <ShopSelect
              selectId='store'
              label='Магазин:'
              value={activeBrand.id}
              optionsData={shops}
              handler={shopChangeHandler}
              hasSearch={!shops.some(_ => _.id == 0)}
            />
          </div>
        }
        {shops && filters && activeBrand && filters.map((i, id) => {

          return activeBrand.id === i.shop.id && (
            <React.Fragment key={id}>
              <div className={styles.filters__inputWrapper}>
                <MultiSelect
                  dispatch={dispatch}
                  filterActions={filterActions}
                  params={i.brands}
                  selectId={i.brands.enLabel}
                  label={`${i.brands.ruLabel}:`}
                  value={filtersState[i.brands.stateKey]}
                  optionsData={i.brands.data}
                />
              </div>
              {categorySelect && <div className={styles.filters__inputWrapper}>
                <MultiSelect
                  dispatch={dispatch}
                  filterActions={filterActions}
                  params={i.categories}
                  selectId={i.categories.enLabel}
                  label={`${i.categories.ruLabel}:`}
                  value={filtersState[i.categories.stateKey]}
                  optionsData={i.categories.data}
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
                />
              </div>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
