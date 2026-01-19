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
  //--------------------//


  // ---- хэндлер выбора магазина -----------//
  const shopChangeHandler = (value) => {
    const selectedShop = shops?.find(_ => _.id === value);
    dispatch(filterActions.setActiveShop(selectedShop));
  };

  // useEffect(() => {
  //   if (shops && !activeBrand) {
  //     dispatch(filterActions.setActiveShop(shops[0]));
  //   }

  //   if (shops && activeBrand &&
  //     (!filtersState.activeBrandName.some(_ => _.value === 'Все') &&
  //     !filtersState.activeArticle.some(_ => _.value === 'Все') &&
  //     !filtersState.activeGroup.some(_ => _.value === 'Все') &&
  //     !filtersState.activeCategory.some(_ => _.value === 'Все'))
  //   ) {
  //     dispatch(filterActions.setActiveShop(shops[0]));
  //   }
  // }, [shops, open]);

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
