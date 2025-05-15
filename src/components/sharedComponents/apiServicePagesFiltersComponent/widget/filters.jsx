import React, { useContext, useEffect } from 'react';
import DownloadButton from '../../../DownloadButton';
import { ServiceFunctions } from '../../../../service/serviceFunctions';
import AuthContext from '../../../../service/AuthContext';
import { fileDownload } from '../../../../service/utils';
import styles from './filters.module.css'
import { TimeSelect, PlainSelect, FrequencyModeSelect } from '../features'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actions as filterActions } from '../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice'
import { fetchShops } from '../../../../redux/shops/shopsActions';

export const Filters = ({
  setLoading, shopSelect = true, timeSelect = true, skuFrequency = false
}) => {

  // ------ база ------//
  const { user, authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch()
  const { activeBrand, selectedRange } = useAppSelector(store => store.filters)
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  //--------------------//


  // ---- хэндлер скачивания шаблона сс -----//
  const handleDownload = async () => {
    const fileBlob = await ServiceFunctions.getDownloadDashBoard(authToken, selectedRange, activeBrand.id);
    fileDownload(fileBlob, 'Сводка_продаж.xlsx');
  };
  //----------------------------------------//

  // ---- хэндлер выбора магазина -----------//
  const shopChangeHandler = (value) => {
    const selectedShop = shopArrayFormSelect?.find(_ => _.id === value)
    dispatch(filterActions.setActiveShop(selectedShop))
  }
  //- -----------------------------------------//

    // ------- Фетч массива магазинов -------------//
    const fetchShopData = async () => {
      setLoading(true)
      try {
        if (user.subscription_status === null) {
          dispatch(fetchShops('mockData'));
        } else {
          dispatch(fetchShops(authToken));
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    //---------------------------------------------//
  
  
    // 0. Получаем данные магазинов
    useEffect(() => {
      if (!shops || shops.length === 0) {
        fetchShopData();
      }
    }, [shops]);
    // ------


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
  const allShopOptionAsShopObject = {
    id: 0,
    brand_name: "Все",
    is_active: true,
    is_primary_collect: shops?.some(_ => _.is_primary_collect),
    is_valid: true,
  };

  // это массив магазинов с добавлением опции "все"
  const shopArrayFormSelect = [allShopOptionAsShopObject, ...shops]



  return (
    <div className={styles.filters}>
      <div className={styles.filters__inputsMainWrapper}>
        {skuFrequency &&
          <FrequencyModeSelect />
        }
        {shops && activeBrand && timeSelect &&
          <div className={styles.filters__inputWrapper}>
            <TimeSelect />
          </div>
        }
        {shops && activeBrand && shopSelect &&
          <div className={styles.filters__inputWrapper}>
            <PlainSelect
              selectId='store'
              label='Магазин:'
              value={activeBrand.id}
              optionsData={shopArrayFormSelect}
              handler={shopChangeHandler}
            />
          </div>
        }
      </div>
      {/* {(!activeBrand?.is_primary_collect) && (
        <DownloadButton handleDownload={handleDownload} />
      )} */}
    </div>
  );
};
