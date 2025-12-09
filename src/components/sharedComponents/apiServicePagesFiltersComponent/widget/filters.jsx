import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '@/service/AuthContext';
import styles from './filters.module.css';
import { TimeSelect, PlainSelect, FrequencyModeSelect, ShopSelect, MultiSelect, MonthSelect } from '../features';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as filterActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import { fetchShops } from '@/redux/shops/shopsActions';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { URL } from '@/service/config';
import { getSavedActiveWeeks } from '@/service/utils';
import { RadarMultiSelect, RadarSelect } from '@/shared';

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
  isDataLoading,
  maxCustomDate,
  minCustomDate,
  opExpensesArticles = false,
  children = null,
  disabled
}) => {

  // ------ это база ------//
  const { user, authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { activeBrand, filters, shops, expenseCategories, activeExpenseCategory } = useAppSelector(store => store.filters);
  const filtersState = useAppSelector(store => store.filters);
  console.log('activeBrand', activeBrand);
  // console.log('filtersState', filtersState);
  const [ internalFiltersState, setInternalFiltersState ] = useState(filtersState);

  // ---- хэндлер выбора магазина -----------//
  const shopChangeHandler = (value) => {
    const selectedShop = shops?.find(_ => _.id === value);
    dispatch(filterActions.setActiveShop(selectedShop));
  };


  const syncInternalFiltersWithGlobalState = () => {
    Object.keys(internalFiltersState).forEach(key => {
      dispatch(filterActions.setActiveFilters({ stateKey: key, data: internalFiltersState[key] }));
    });
  }

  useEffect(() => {
    // let initialObject = {}
    // Object.keys(filtersState).forEach(key => {
    //   if (key.includes('active')) {
    //     initialObject[key] = filtersState[key];
    //   }
    // });
    // setInternalFiltersState(initialObject);
  }, [filtersState]);


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
              isDataLoading={isDataLoading}
              minCustomDate={minCustomDate}
            />
          </div>
        }
        {shops && activeBrand && timeSelect &&
          <div className={styles.filters__inputWrapper}>
            <TimeSelect
              isDataLoading={isDataLoading}
              maxCustomDate={maxCustomDate}
              minCustomDate={minCustomDate}
              disabled={disabled}
            />
          </div>
        }
        {expenseCategories && activeExpenseCategory && opExpensesArticles &&
          <div className={styles.filters__inputWrapper}>
            <MultiSelect
              dispatch={dispatch}
              filterActions={filterActions}
              params={{
                stateKey: 'activeExpenseCategory',
                data: expenseCategories,
                enLabel: 'expenseCategories',
                ruLabel: 'Статья',
              }}
              selectId={'expenseCategories'}
              label={`Статья:`}
              value={activeExpenseCategory}
              optionsData={expenseCategories}
              isDataLoading={isDataLoading}
            />
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
              hasSearch={!shops.some(_ => _.id === 0)} // добавляем поиск если магазинов больше 5
              disabled={disabled}
            />
          </div>
        }
        {shops && activeBrand && shopSelect &&
          <div className={styles.filters__inputWrapper}>
            <RadarSelect
              selectId='store'
              label='Магазин:'
              value={activeBrand.brand_name}
              optionsData={shops.map(_ => ({ value: _.brand_name, label: _.brand_name }))}
              isDataLoading={isDataLoading}
              disabled={disabled}
              hasDropdownSearch={!shops.some(_ => _.id === 0)}
              actionHandler={(value) => {
                const filterKey = 'activeBrand';
                const normalizedValue = shops.find(_ => _.brand_name.toLowerCase() === value.toLowerCase());
                setInternalFiltersState(prev => ({
                  ...prev,
                  [filterKey]: normalizedValue
                }));
              }}
            />
          </div>
        }
        {filters && activeBrand && filters?.map((i, id) => {
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
                  disabled={disabled}
                />
                <RadarMultiSelect
                  selectId={i.brands.enLabel}
                  label={`${i.brands.ruLabel}:`}
                  value={internalFiltersState[i.brands.stateKey]?.map(_ => _.value) ?? ['Все']}
                  optionsData={i.brands.data.map(_ => ({ value: _.value, label: _.label }))}
                  isDataLoading={isDataLoading}
                  disabled={disabled}
                  hasDropdownSearch
                  actionHandler={(value) => {
                    console.log('value', value);
                    const filterKey = i.brands.stateKey;
                    const normalizedValue = i.brands.data.filter(_ => value.includes(_.value));
                    setInternalFiltersState(prev => ({
                      ...prev,
                      [filterKey]: normalizedValue
                    }));
                  }}
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
              {children}
            </React.Fragment>
          );
        })}
      </div>
      <button onClick={syncInternalFiltersWithGlobalState}>
        Применить
      </button>
    </div>
  );
};
