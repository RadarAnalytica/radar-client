import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from '@/service/AuthContext';
import styles from './filters.module.css';
import { TimeSelect, PlainSelect, FrequencyModeSelect, ShopSelect, MultiSelect, MonthSelect, TempTimeSelect } from '../features';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as filterActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import { fetchShops } from '@/redux/shops/shopsActions';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { URL } from '@/service/config';
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
  isDataLoading,
  maxCustomDate,
  opExpensesArticles = false,
}) => {

  // ------ это база ------//
  const { user, authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { activeBrand, filters, shops, expenseCategories, activeExpenseCategory } = useAppSelector(store => store.filters);
  const filtersState = useAppSelector(store => store.filters);


  // ---- хэндлер выбора магазина -----------//
  const shopChangeHandler = (value) => {
    const selectedShop = shops?.find(_ => _.id === value);
    dispatch(filterActions.setActiveShop(selectedShop));
  };
  //- -----------------------------------------//


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
            <TimeSelect
              isDataLoading={isDataLoading}
              maxCustomDate={maxCustomDate}
            />
          </div>
        }
        {timeSelect && tempPageCondition === 'supplier' &&
          <div className={styles.filters__inputWrapper}>
            <TempTimeSelect
              isDataLoading={isDataLoading}
              maxCustomDate={maxCustomDate}
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
          );
        })}
      </div>
    </div>
  );
};
