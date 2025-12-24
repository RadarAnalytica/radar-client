import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '@/service/AuthContext';
import styles from './filters.module.css';
import { TimeSelect, PlainSelect, FrequencyModeSelect, ShopSelect, MultiSelect, MonthSelect } from '../features';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as filterActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import { fetchShops } from '@/redux/shops/shopsActions';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { URL } from '@/service/config';
import { RadarMultiSelect, RadarSelect } from '@/shared';
import { getSavedActiveWeeks, getSavedActiveMonths } from '@/service/utils';

export const Filters = React.memo(({
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
  disabled,
  submitHandler,
  uncontrolledMode = false
}) => {

  // ------ это база ------//
  const { user, authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { activeBrand, filters, shops, expenseCategories, activeExpenseCategory } = useAppSelector(store => store.filters);
  const filtersState = useAppSelector(store => store.filters);
  const [internalActiveFiltersState, setInternalActiveFiltersState] = useState(null);
  console.log(internalActiveFiltersState?.activeBrandName)

  const internalFiltersStateUpdateHandler = (key, value) => {
    if (key === 'activeBrand') {
      setInternalActiveFiltersState(prev => ({
        ...prev,
        [key]: value,
        activeBrandName: [{ value: 'Все' }],
        activeArticle: [{ value: 'Все' }],
        activeGroup: [{ id: 0, value: 'Все' }],
        // activeWeeks: getSavedActiveWeeks(value.id),
        activeMonths: getSavedActiveMonths(value.id),
      }));
      return;
    }

    if (key === 'activeBrandName') {
      setInternalActiveFiltersState(prev => ({
        ...prev,
        [key]: value,
        activeGroup: [{ value: 'Все', id: 0 }],
        activeArticle: [{ value: 'Все', id: 0 }]
      }));
      return;
    }

    if (key === 'activeArticle') {
      setInternalActiveFiltersState(prev => ({
        ...prev,
        [key]: value,
        activeGroup: [{ value: 'Все', id: 0 }],
      }));
      return;
    }

    if (key === 'activeGroup') {
      setInternalActiveFiltersState(prev => ({
        ...prev,
        [key]: value,
        activeBrandName: [{ value: 'Все' }],
        activeArticle: [{ value: 'Все' }],
      }));
      return;
    }

    setInternalActiveFiltersState(prev => ({ ...prev, [key]: value }));
  }
  const applyFiltersClickHandler = () => {
    dispatch(filterActions.setActiveFiltersMassively(internalActiveFiltersState));
    submitHandler?.();
  }

  useEffect(() => {
    if (filtersState && !uncontrolledMode) {
      let internalFiltersStateObject = {}
      Object.keys(filtersState).forEach(key => {
        if (key.toLowerCase().includes('active') || key.toLowerCase().includes('selectedrange')) {
          internalFiltersStateObject[key] = filtersState[key];
        }
      });
      setInternalActiveFiltersState(internalFiltersStateObject);
    }
  }, [filtersState, uncontrolledMode]);



  return (
    <div className={styles.filters}>
      <div className={styles.filters__inputsMainWrapper}>
        {shops && internalActiveFiltersState?.activeBrand && weekSelect &&
          <div className={styles.filters__inputWrapper}>
            <RadarMultiSelect
              selectId={filters.find((el) => el.shop.id === internalActiveFiltersState.activeBrand.id).weeks.enLabel}
              label={`${filters.find((el) => el.shop.id === internalActiveFiltersState.activeBrand.id).weeks.ruLabel}:`}
              value={internalActiveFiltersState?.activeWeeks.map(_ => _.value)}
              optionsData={filters.find((el) => el.shop.id === internalActiveFiltersState.activeBrand.id).weeks.data}
              isDataLoading={isDataLoading}
              disabled={disabled}
              hasDropdownSearch
              actionHandler={(value) => {
                const currOptions = filters.find((el) => el.shop.id === internalActiveFiltersState.activeBrand.id).weeks.data;
                const normalizedValue = currOptions.filter(_ => value.includes(_.value));
                internalFiltersStateUpdateHandler('activeWeeks', normalizedValue);
              }}
            />
          </div>
        }
        {skuFrequency &&
          // TODO: проверить нужно ли с этим что-то делать...
          <FrequencyModeSelect isDataLoading={isDataLoading} />
        }
        {shops && activeBrand && monthSelect &&
          <div className={styles.filters__inputWrapper_month}>
            <MonthSelect
              selectId={filters.find((el) => el.shop.id === activeBrand.id).months.enLabel}
              label={`${filters.find((el) => el.shop.id === activeBrand.id).months.ruLabel}:`}
              value={internalActiveFiltersState?.activeMonths}
              isDataLoading={isDataLoading}
              minCustomDate={minCustomDate}
              actionHandler={(value) => {
                internalFiltersStateUpdateHandler('activeMonths', value);
              }}
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
              customValue={uncontrolledMode ? undefined : internalActiveFiltersState?.selectedRange}
              customSubmit={uncontrolledMode ? undefined : (value) => {
                internalFiltersStateUpdateHandler('selectedRange', value);
              }}
            />
          </div>
        }
        {expenseCategories && internalActiveFiltersState?.activeExpenseCategory && opExpensesArticles &&
          <div className={styles.filters__inputWrapper}>
            <RadarMultiSelect
              selectId={'expenseCategories'}
              label={`Статья:`}
              value={internalActiveFiltersState?.activeExpenseCategory && internalActiveFiltersState?.activeExpenseCategory?.length > 0 ? internalActiveFiltersState?.activeExpenseCategory?.map(_ => _.value) : ['Все']}
              optionsData={expenseCategories.map(_ => ({ ..._, label: _.name }))}
              isDataLoading={isDataLoading}
              disabled={disabled}
              hasDropdownSearch
              actionHandler={(value) => {
                const normalizedValue = expenseCategories.filter(_ => value.includes(_.value));
                internalFiltersStateUpdateHandler('activeExpenseCategory', normalizedValue);
                // dispatch(filterActions.setActiveFilters({ stateKey: 'activeExpenseCategory', data: normalizedValue }));
              }}
            />
          </div>
        }
        {shops && internalActiveFiltersState && internalActiveFiltersState.activeBrand && shopSelect &&
          <div className={styles.filters__inputWrapper}>
            <RadarSelect
              selectId='store'
              label='Магазин:'
              value={internalActiveFiltersState.activeBrand?.brand_name}
              optionsData={shops.map(_ => ({ value: _.brand_name, label: _.brand_name }))}
              isDataLoading={isDataLoading}
              disabled={disabled}
              hasDropdownSearch={!shops.some(_ => _.id === 0)}
              actionHandler={(value) => {
                const normalizedValue = shops.find(_ => _.brand_name.toLowerCase() === value.toLowerCase());
                internalFiltersStateUpdateHandler('activeBrand', normalizedValue);
                // dispatch(filterActions.setActiveShop(normalizedValue));
              }}
            />
          </div>
        }
        {filters && internalActiveFiltersState && internalActiveFiltersState.activeBrand && filters?.map((i, id) => {
          return internalActiveFiltersState.activeBrand.id === i.shop.id && (
            <React.Fragment key={id}>
              {brandSelect && <div className={styles.filters__inputWrapper}>
                <RadarMultiSelect
                  selectId={i.brands.enLabel}
                  label={`${i.brands.ruLabel}:`}
                  value={internalActiveFiltersState.activeBrandName && internalActiveFiltersState.activeBrandName.length > 0 ? internalActiveFiltersState.activeBrandName?.map(_ => _.value) : ['Все']}
                  optionsData={i.brands.data.map(_ => ({ ..._, label: _.value }))}
                  isDataLoading={isDataLoading}
                  disabled={disabled}
                  hasDropdownSearch
                  actionHandler={(value) => {
                    const normalizedValue = i.brands.data.filter(_ => value.includes(_.value));
                    internalFiltersStateUpdateHandler('activeBrandName', normalizedValue);
                  }}
                />
              </div>}
              {articleSelect && <div className={styles.filters__inputWrapper}>
                <RadarMultiSelect
                  selectId={i.articles.enLabel}
                  label={`${i.articles.ruLabel}:`}
                  value={internalActiveFiltersState.activeArticle && internalActiveFiltersState.activeArticle.length > 0 ? internalActiveFiltersState.activeArticle?.map(_ => _.value) : ['Все']}
                  optionsData={(internalActiveFiltersState?.activeBrandName?.some(_ => _.value === 'Все') || internalActiveFiltersState?.activeBrandName?.length === 0) ? i.articles.data.map(_ => ({ ..._, label: _.value })) : i.articles.data.filter(_ => internalActiveFiltersState?.activeBrandName?.some(b => _.brand === b.value)).map(_ => ({ ..._, label: _.value }))}
                  isDataLoading={isDataLoading}
                  disabled={disabled}
                  hasDropdownSearch
                  actionHandler={(value) => {
                    const normalizedValue = i.articles.data.filter(_ => value.includes(_.value));
                    internalFiltersStateUpdateHandler('activeArticle', normalizedValue);
                  }}
                />
              </div>}
              {groupSelect && <div className={styles.filters__inputWrapper}>
                <RadarMultiSelect
                  selectId={i.groups.enLabel}
                  label={`${i.groups.ruLabel}:`}
                  value={internalActiveFiltersState.activeGroup && internalActiveFiltersState.activeGroup.length > 0 ? internalActiveFiltersState.activeGroup?.map(_ => _.value) : ['Все']}
                  optionsData={i.groups.data.map(_ => ({ ..._, label: _.name }))}
                  isDataLoading={isDataLoading}
                  disabled={disabled}
                  hasDropdownSearch
                  actionHandler={(value) => {
                    const normalizedValue = i.groups.data.filter(_ => value.includes(_.value));
                    internalFiltersStateUpdateHandler('activeGroup', normalizedValue);
                  }}
                />
              </div>}
              {children}
            </React.Fragment>
          );
        })}
        
        {!uncontrolledMode && <button
          className={styles.filters__submitButton}
          onClick={applyFiltersClickHandler}
          disabled={isDataLoading || disabled}
        >
          Применить
        </button>}
      </div>
    </div>
  );
});
