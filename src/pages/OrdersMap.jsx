import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './OrdersMap.module.css'
import './styles.css';
import Map from '../components/Map';
import OrderMapPieChart from '../containers/orderMap/OrderMapPieChart';
import OrderMapTable from '../containers/orderMap/OrderMapTable';
import OrderTableExtended from '../containers/orderMap/OrderTableExtended';
import AuthContext from '../service/AuthContext';
import { formatPrice } from '../service/utils';
import SelfCostWarning from '../components/SelfCostWarning';
import DataCollectionNotification from '../components/DataCollectionNotification';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchShops } from '../redux/shops/shopsActions';
import { fetchGeographyData } from '../redux/geoData/geoDataActions';
import { useLocation, useNavigate } from "react-router-dom";
import NoSubscriptionPage from './NoSubscriptionPage';
import RadioGroup from '../components/RadioGroup';
import OrderSalesPieCharts from '../components/OrderSalesPieCharts';
import StockDataRow from '../components/StockDataRow';
import green from '../assets/greenarrow.png';
import red from '../assets/redarrow.png';
import { ServiceFunctions } from '../service/serviceFunctions';
import { Filters } from '../components/sharedComponents/apiServicePagesFiltersComponent';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import { mockGetGeographyData } from '../service/mockServiceFunctions'
import DataCollectWarningBlock from '../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'

const OrdersMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, authToken, logout } = useContext(AuthContext);
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  const { activeBrand, selectedRange } = useAppSelector(store => store.filters)
  const filters = useAppSelector(store => store.filters)

  // const [geoData, setGeoData] = useState([]);
  // const { geoData, loading, error } = useAppSelector(
  // (state) => state.geoDataSlice
  // );
  const [geoData, setGeoData] = useState([])

  const [byRegions, setByRegions] = useState(true);
  const [_, setActiveBrand] = useState(null);
  const [firstLoading, setFirstLoading] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false); // лоадер для загрузки данных
  const [isVisible, setIsVisible] = useState(true);
  const prevselectedRange = useRef(selectedRange);
  const prevActiveBrand = useRef(activeBrand);
  const authTokenRef = useRef(authToken);
  const [primaryCollect, setPrimaryCollect] = useState(null)

  const radioOptions = [
    { value: 'region', label: 'По регионам' },
    { value: 'store', label: 'По складам' },
  ];



  const updateGeoData = async () => {
    setLoading(true)
    if (activeBrand && selectedRange && authToken) {
      let data = null;
      if (user.subscription_status === null) {
        data = await mockGetGeographyData(selectedRange);
      } else {
        data = await ServiceFunctions.getGeographyData(authToken, selectedRange, activeBrand.id, filters);
      }
      setGeoData(data);
    }
    setByRegions(true)
    setLoading(false)
  }

  useEffect(() => {
    if (activeBrand && activeBrand.is_primary_collect && activeBrand.is_primary_collect !== primaryCollect) {
      setPrimaryCollect(activeBrand.is_primary_collect)
      updateGeoData()
    }
  }, [authToken]);

  useEffect(() => {
    setPrimaryCollect(activeBrand?.is_primary_collect)
    if (activeBrand?.is_primary_collect) {
      updateGeoData();
    }
  }, [activeBrand, selectedRange, filters]);




  useEffect(() => {
    if (shops?.length === 0 && !firstLoading) {
      navigate("/onboarding");
    }
  }, [firstLoading, shops.length]);

  useEffect(() => {
    const calculateNextEvenHourPlus30 = () => {
      const now = new Date();
      let targetTime = new Date(now);

      // Set to the next half hour
      targetTime.setMinutes(targetTime.getMinutes() <= 30 ? 30 : 60, 0, 0);

      // If we're already past an even hour + 30 minutes, move to the next even hour
      if (targetTime.getHours() % 2 !== 0 || (targetTime.getHours() % 2 === 0 && targetTime <= now)) {
        targetTime.setHours(targetTime.getHours() + 1);
      }

      // Ensure we're on an even hour
      if (targetTime.getHours() % 2 !== 0) {
        targetTime.setHours(targetTime.getHours() + 1);
      }

      return targetTime;
    };

    const targetTime = calculateNextEvenHourPlus30();
    const timeToTarget = targetTime.getTime() - Date.now();

    const intervalId = setTimeout(() => {

      dispatch(fetchShops(authToken));
      const updateGeoData = async () => {
        const data = await ServiceFunctions.getGeographyData(authToken, selectedRange, activeBrand);
        setGeoData(data);
      }
      updateGeoData();
      // dispatch(fetchGeographyData({ authToken, selectedRange, activeBrand }));
    }, timeToTarget);

    return () => {
      clearTimeout(intervalId);
    };
  }, [dispatch, activeBrand, selectedRange, authToken]);

  // useEffect(() => {
  // if (authToken !== authTokenRef.current) {
  //dispatch(fetchShops(authToken));
  // }
  // }, [dispatch]);


  const checkIdQueryParam = () => {
    const searchParams = new URLSearchParams(location.search);
    const idQueryParam = searchParams.get('id');
    if (idQueryParam && parseInt(idQueryParam) !== user.id) {
      logout();
      navigate('/signin');

    } else {
      return;
    }
  };

  useEffect(() => {
    if (location.search) {
      checkIdQueryParam();
    }
  }, [location.search]);

  // const changePeriod = () => {
  //     setLoading(true)
  //     if (user && activeBrand) {
  //         ServiceFunctions.getGeoData(user.id, activeBrand, selectedRange).then(data => setData(data))
  //     }
  // }

  // useEffect(() => {
  //     changePeriod()
  // }, [selectedRange, activeBrand])

  // const orders = data && data?.orders && data?.orders.data ? data?.orders.data : [];
  // const sales = data && data?.sales && data?.sales.data ? data?.sales.data : [];

  const ordersByWarehouses = data ? data?.ordersByWarehouse : [];
  const salesByWarehouses = data ? data?.salesByWarehouse : [];

  let totalPriceOrders = 0;
  ordersByWarehouses
    ? ordersByWarehouses.forEach((item) => {
      let warehouseSum =
        item.data?.reduce((acc, el) => acc + el.finishedPrice, 0) || 0;
      totalPriceOrders = totalPriceOrders + warehouseSum;
    })
    : console.log();

  let totalPriceSales = 0;
  salesByWarehouses
    ? salesByWarehouses.forEach((item) => {
      let warehouseSum =
        item.data?.reduce((acc, el) => acc + el.finishedPrice, 0) || 0;
      totalPriceSales = totalPriceSales + warehouseSum;
    })
    : console.log();

  const whNames =
    ordersByWarehouses && ordersByWarehouses.length
      ? ordersByWarehouses.map((item) => item.warehouse)
      : [];

  // console.log(geoData?.geo_data?.filter((item) => item.districtName === 'Центральный фо')?.[0]?.percent, "Фильтрация");
  const commonAndCompareOnMap = {
    centr: {
      common:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Центральный федеральный округ' ||
              item.districtName === 'Центральный фо'
          )
          ?.percent.toFixed(0) || 0,
      compare:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Центральный федеральный округ' ||
              item.districtName === 'Центральный фо'
          )
          ?.comparePercent.toFixed(0) || 0,
    },
    siberian: {
      common:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Сибирский федеральный округ' ||
              item.districtName === 'Сибирский фо'
          )
          ?.percent.toFixed(0) || 0,
      compare:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Сибирский федеральный округ' ||
              item.districtName === 'Сибирский фо'
          )
          ?.comparePercent.toFixed(0) || 0,
    },
    ural: {
      common:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Уральский федеральный округ' ||
              item.districtName === 'Уральский фо'
          )
          ?.percent.toFixed(0) || 0,
      compare:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Уральский федеральный округ' ||
              item.districtName === 'Уральский фо'
          )
          ?.comparePercent.toFixed(0) || 0,
    },
    southern: {
      common:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Южный федеральный округ' ||
              item.districtName === 'Южный фо'
          )
          ?.percent.toFixed(0) || 0,
      compare:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Южный федеральный округ' ||
              item.districtName === 'Южный фо'
          )
          ?.comparePercent.toFixed(0) || 0,
    },
    northCaucasian: {
      common:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Северо-Кавказский федеральный округ' ||
              item.districtName === 'Северо-Кавказский фо'
          )
          ?.percent.toFixed(0) || 0,
      compare:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Северо-Кавказский федеральный округ' ||
              item.districtName === 'Северо-Кавказский фо'
          )
          ?.comparePercent.toFixed(0) || 0,
    },
    farEastern: {
      common:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Дальневосточный федеральный округ' ||
              item.districtName === 'Дальневосточный фо'
          )
          ?.percent.toFixed(0) || 0,
      compare:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Дальневосточный федеральный округ' ||
              item.districtName === 'Дальневосточный фо'
          )
          ?.comparePercent.toFixed(0) || 0,
    },
    privolzhsky: {
      common:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Приволжский федеральный округ' ||
              item.districtName === 'Приволжский фо'
          )
          ?.percent.toFixed(0) || 0,
      compare:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Приволжский федеральный округ' ||
              item.districtName === 'Приволжский фо'
          )
          ?.comparePercent.toFixed(0) || 0,
    },
    northWestern: {
      common:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Северо-Западный федеральный округ' ||
              item.districtName === 'Северо-Западный фо'
          )
          ?.percent.toFixed(0) || 0,
      compare:
        geoData?.geo_data
          ?.find(
            (item) =>
              item.districtName === 'Северо-Западный федеральный округ' ||
              item.districtName === 'Северо-Западный фо'
          )
          ?.comparePercent.toFixed(0) || 0,
    },
  };

  // const modifiedOrders = ordersByWarehouses ? ordersByWarehouses.map(item => {
  //     const totalSum = item.data?.reduce((acc, el) => acc + el.finishedPrice, 0)
  //     const wNames = [...new Set(item.data?.map(el => el.oblastOkrugName))]
  //     const byFos = wNames ? wNames.map(obj => item.data?.filter(i => i.oblastOkrugName === obj)) : []
  //     const el = {
  //         name: item.warehouse,
  //         amount: totalSum,
  //         data: byFos && byFos.length ? byFos.map(el => {
  //             let sum = el.reduce((acc, o) => acc + o.finishedPrice, 0) || 0
  //             let name = el[0]?.oblastOkrugName
  //             return {
  //                 name: name,
  //                 sum: sum,
  //                 percent: ((sum / totalSum) * 100) || 0,
  //                 percentTotal: sum && totalPriceOrders ? ((sum / totalPriceOrders) * 100) : 0
  //             }
  //         }) : [],
  //     }
  //     return el
  // }) : []

  // const modifiedSales = salesByWarehouses ? salesByWarehouses.map(item => {
  //     const totalSum = item.data?.reduce((acc, el) => acc + el.finishedPrice, 0)
  //     const wNames = [...new Set(item.data?.map(el => el.oblastOkrugName))]
  //     const byFos = wNames ? wNames.map(obj => item.data?.filter(i => i.oblastOkrugName === obj)) : []
  //     const el = {
  //         name: item.warehouse,
  //         amount: totalSum,
  //         data: byFos && byFos.length ? byFos.map(el => {
  //             let sum = el.reduce((acc, o) => acc + o.finishedPrice, 0) || 0
  //             let name = el[0]?.oblastOkrugName
  //             return {
  //                 name: name,
  //                 sum: sum,
  //                 percent: ((sum / totalSum) * 100) || 0,
  //                 percentTotal: sum && totalPriceSales ? ((sum / totalPriceSales) * 100) : 0
  //             }
  //         }) : [],
  //     }
  //     return el
  // }) : []

  const [foName, setFoName] = useState();
  const [foFirst, setFoFirst] = useState();

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (event) => {
    setTooltipPosition({ x: event.pageX, y: event.pageY });
  };

  function findGTagName(evt) {
    // Получаем элемент, на который было наведение курсора
    const target = evt.target.closest('g');

    // Если элемент найден
    if (target) {
      // Получаем значение атрибута name и выводим его в консоль
      const nameAttribute = target.getAttribute('name');
      setFoName(nameAttribute.split('ФО')?.join('фо'));
      setFoFirst(nameAttribute?.split(' ')[0]?.toLowerCase());
    }
  }

  let map = document.getElementById('order-map');
  map ? map.addEventListener('mouseover', findGTagName) : console.log();

  const [tooltipData, setTooltipData] = useState();
  useEffect(() => {
    if (foFirst && geoData?.geo_data?.length) {
      const info = {
        ordersCount:
          [...geoData?.geo_data]?.filter(
            (el) =>
              el.districtName.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >=
              0
          )?.[0]?.orderCount || '0',
        salesAmount:
          [...geoData?.geo_data]?.filter(
            (el) =>
              el.districtName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >=
              0
          )?.[0]?.saleAmount || '0',
        ordersAmount:
          [...geoData?.geo_data]?.filter(
            (el) =>
              el.districtName.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >=
              0
          )?.[0]?.orderAmount || '0',
        salesCount:
          [...geoData?.geo_data]?.filter(
            (el) =>
              el.districtName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >=
              0
          )?.[0]?.saleCount || '0',
        percent:
          [...geoData?.geo_data]?.filter(
            (el) =>
              el.districtName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >=
              0
          )?.[0]?.percent || '0',
        comparePercent:
          [...geoData?.geo_data]?.filter(
            (el) =>
              el.districtName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >=
              0
          )?.[0]?.comparePercent || '0',
      };
      setTooltipData(info);
    }
  }, [foFirst, geoData, tooltipPosition.x]);

  const backgroundColor = [
    'rgba(129, 172, 255, 1)',
    'rgba(255, 153, 114, 1)',
    'rgba(154, 129, 255, 1)',
    'rgba(74, 217, 145, 1)',
    'rgba(254, 197, 61, 1)',
  ];

  const getColor = (name) => {
    switch (name) {
      case 'Сибирский фо':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='rgba(254, 197, 61, 1)' />
          </svg>
        );
      case 'Уральский фо':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='grey' />
          </svg>
        );
      case 'Южный фо':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='rgba(74, 217, 145, 1)' />
          </svg>
        );
      case 'Северо-Кавказский фо':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='orangered' />
          </svg>
        );
      case 'Центральный фо':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='rgba(129, 172, 255, 1)' />
          </svg>
        );
      case 'Приволжский фо':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='rgba(255, 153, 114, 1)' />
          </svg>
        );
      case 'Северо-Западный фо':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='yellow' />
          </svg>
        );
      case 'Дальневосточный фо':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='brown' />
          </svg>
        );
      case 'Другой округ':
        return (
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' key={name}>
            <circle cx='8' cy='8' r='8' fill='rgba(196, 196, 196, 1)' />
          </svg>
        );
      default:
        return '';
    }
  };

  const totalOrderAmount =
    geoData?.geo_data?.reduce((acc, item) => acc + item.orderAmount, 0) || '0';
  const totalOrderSum =
    geoData?.geo_data?.reduce((acc, item) => acc + item.orderCount, 0) || '0';
  const totalOrderAmountStock =
    geoData?.stock_data?.reduce((acc, item) => acc + item.orderAmount, 0) ||
    '0';
  const totalOrderSumStock =
    geoData?.stock_data?.reduce((acc, item) => acc + item.orderCount, 0) || '0';

  const totalSaleAmount =
    geoData?.geo_data?.reduce((acc, item) => acc + item.saleAmount, 0) || '0';
  const totalSaleSum =
    geoData?.geo_data?.reduce((acc, item) => acc + item.saleCount, 0) || '0';
  const totalSaleAmountStock =
    geoData?.stock_data?.reduce((acc, item) => acc + item.saleAmount, 0) || '0';
  const totalSaleSumStock =
    geoData?.stock_data?.reduce((acc, item) => acc + item.saleCount, 0) || '0';

  const totalOrdersOther = geoData?.geo_data?.map((el) => {
    return {
      districtName: el?.districtName,
      percent: el?.percentOrder,
      amount: el?.orderAmount,
      count: el?.orderCount,
    };
  });
  const totalSalesOther = geoData?.geo_data?.map((el) => {
    return {
      districtName: el.districtName,
      percent: el.percent,
      amount: el.saleAmount,
      count: el.saleCount,
    };
  });
  // let totalOrdersSum = data && data.ordersTableData ? data.ordersTableData.reduce((acc, item) => acc + Number(item.sum), 0) : 0
  // let totalSalesSum = data && data.ordersTableData ? data.salesTableData.reduce((acc, item) => acc + Number(item.sum), 0) : 0

  const [isHovered, setIsHovered] = useState(false);

  const orderSaleStock = [
    {
      amount: 0,
      common_percent: 0,
      district: 'Другой округ',
      stock_percent: 0,
    },
    {
      amount: 0,
      common_percent: 0,
      district: 'Центральный фо',
      stock_percent: 0,
    },
    {
      amount: 0,
      common_percent: 0,
      district: 'Южный фо',
      stock_percent: 0,
    },
    {
      amount: 0,
      common_percent: 0,
      district: 'Приволжский фо',
      stock_percent: 0,
    },
    {
      amount: 0,
      common_percent: 0,
      district: 'Северо-Западный фо',
      stock_percent: 0,
    },
    {
      amount: 0,
      common_percent: 0,
      district: 'Сибирский фо',
      stock_percent: 0,
    },
    {
      amount: 0,
      common_percent: 0,
      district: 'Северо-Кавказский фо',
      stock_percent: 0,
    },
    {
      amount: 0,
      common_percent: 0,
      district: 'Уральский фо',
      stock_percent: 0,
    },
    // {
    //     amount: 0,
    //     common_percent: 0,
    //     district: "Дальневосточный фо",
    //     stock_percent: 0
    // },
  ];

  const orderCount = geoData?.geo_data?.map((el) => el.orderCount);
  const orderAmount = geoData?.geo_data?.map((el) => el.orderAmount);
  const saleCount = geoData?.geo_data?.map((el) => el.saleCount);
  const saleAmount = geoData?.geo_data?.map((el) => el.saleAmount);

  const orderCountStock = geoData?.stock_data?.map((el) => el.orderCount);
  const orderAmountStock = geoData?.stock_data?.map((el) => el.orderAmount);
  const saleCountStock = geoData?.stock_data?.map((el) => el.saleCount);
  const saleAmountStock = geoData?.stock_data?.map((el) => el.saleAmount);

  const tooltipOrderDataGeo = geoData?.geo_data?.map((item) => ({
    amount: item.orderAmount,
    count: item.orderCount,
  }));
  const tooltipSalesDataGeo = geoData?.geo_data?.map((item) => ({
    amount: item.saleAmount,
    count: item.saleCount,
  }));
  const tooltipOrderDataStock = geoData?.stock_data?.map((item) => ({
    amount: item.orderAmount,
    count: item.orderCount,
  }));
  const tooltipSalesDataStock = geoData?.stock_data?.map((item) => ({
    amount: item.saleAmount,
    count: item.saleCount,
  }));

  const handleTooltipPosition = (x, y) => {
    const tooltipWidth = (22 * window.innerWidth) / 100;
    const padding = 16;
    // Defining the right border of an element
    const element = document.getElementById('map');
    const elementRect = element.getBoundingClientRect();
    const rightEdge = elementRect.right;
    // Adjusting the position of the tooltip
    let correctedX = x;
    if (x + tooltipWidth > rightEdge) {
      correctedX = rightEdge - tooltipWidth - padding;
    }

    setTooltipPosition({ x: correctedX, y });
  };

  const updateTooltipPosition = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    handleTooltipPosition(x, y);
  };

  const handleRadioChange = (value) => {
    setByRegions(value === 'region');
  };

  if (user?.subscription_status === 'expired') {
    return <NoSubscriptionPage title={'География заказов и продаж'} />
  };

  // if (!shops || shops.length === 0) {
  //   return null; // or a loading indicator
  // }

  return (
    isVisible && (
      <main className={styles.page}>
        <MobilePlug />
        {/* ------ SIDE BAR ------ */}
        <section className={styles.page__sideNavWrapper}>
          <Sidebar />
        </section>
        {/* ------ CONTENT ------ */}
        <section className={styles.page__content}>
          {/* header */}
          <div className={styles.page__headerWrapper}>
            <div style={{ width: '100%' }} className="map-container dash-container container p-3">
              <Header title='География заказов и продаж' />
            </div>
          </div>
          {/* !header */}

          {/* DEMO BLOCK */}
          {user.subscription_status === null && <NoSubscriptionWarningBlock />}
          {/* !DEMO BLOCK */}

          <div style={{ width: '100%' }} className="map-container dash-container container p-3">
            <Filters
              setLoading={setLoading}
            />
          </div>

          {activeBrand && activeBrand.is_primary_collect && !loading && (
            <div className='map-container dash-container container p-3'>
              <RadioGroup
                options={radioOptions}
                name='mapView'
                defaultValue='region'
                onChange={handleRadioChange}
              />

              {byRegions ? (
                <div id='map'>
                  <Map
                    onMouseMove={updateTooltipPosition}
                    onMouseEnterAction={setIsHovered}
                    data={commonAndCompareOnMap}
                  />
                  {geoData && isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        left: tooltipPosition.x + 'px',
                        top: tooltipPosition.y + 'px',
                        backgroundColor: '#fff',
                        boxShadow: '0 0 40px rgba(19, 19, 19, 0.3)',
                        padding: '16px',
                        borderRadius: 16,
                        width: '22vw',
                        pointerEvents: 'none',
                      }}
                    >
                      <div>
                        <h6 className='fw-bold d-flex align-items-center'>
                          <div
                            style={{
                              width: '1vw',
                              height: '1vw',
                              marginRight: '8px',
                              borderRadius: '100%',
                            }}
                          >
                            {getColor(foName)}
                          </div>
                          {foName}
                        </h6>
                        <div className='d-flex'>
                          <p className='mb-1 col'>Общая доля</p>
                          <p className='mb-1 fw-bold  col'>
                            {formatPrice(tooltipData?.percent)} %
                            <img
                              src={
                                tooltipData?.comparePercent > 0 ? green : red
                              }
                              alt=''
                              style={{ width: '1.25vw', marginLeft: '8px' }}
                            />
                            <span
                              className='pt-1'
                              style={
                                tooltipData?.comparePercent > 0
                                  ? {
                                    fontSize: '1.5vh',
                                    whiteSpace: 'nowrap',
                                    fontWeight: 600,
                                    color: 'rgba(0, 182, 155, 1)',
                                    marginLeft: '2px',
                                  }
                                  : {
                                    fontSize: '1.5vh',
                                    whiteSpace: 'nowrap',
                                    fontWeight: 600,
                                    color: 'rgba(249, 60, 101, 1)',
                                    marginLeft: '2px',
                                  }
                              }
                            >
                              {tooltipData?.comparePercent} %
                            </span>
                          </p>
                        </div>
                        <div className='d-flex'>
                          <p className='mb-1 col'>Продажи, руб</p>
                          <p className='mb-1 fw-bold  col'>
                            {formatPrice(tooltipData?.salesAmount)}
                          </p>
                        </div>
                        <div className='d-flex'>
                          <p className='mb-1 col'>Продажи, шт</p>
                          <p className='mb-1 fw-bold  col'>
                            {tooltipData?.salesCount}
                          </p>
                        </div>
                        <div className='d-flex'>
                          <p className='mb-1 col'>Заказы, руб</p>
                          <p className='mb-1 fw-bold col'>
                            {formatPrice(tooltipData?.ordersAmount)}
                          </p>
                        </div>
                        <div className='d-flex'>
                          <p className='mb-1 col'>Заказы, шт</p>
                          <p className='mb-1 fw-bold col'>
                            {tooltipData?.ordersCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              {byRegions && geoData?.geo_data ? (
                <div className={styles.page__warehouseContent}>
                  <div className={styles.page__pieWrapper}>
                    <OrderMapPieChart
                      sub={'Всего заказов'}
                      info={geoData.geo_data}
                      title={'Топ 5 по заказам'}
                      totalAmount={totalOrderAmount}
                      totalCount={totalOrderSum}
                      titleTooltipAmount={'Заказы, руб  '}
                      titleTooltipCount={'Заказы, шт  '}
                      getColor={getColor}
                      tooltipData={tooltipOrderDataGeo}
                    // link={'Смотреть все регионы*'}
                    />
                    <OrderMapPieChart
                      sub={'Всего продаж'}
                      info={geoData.geo_data}
                      title={'Топ 5 по продажам'}
                      totalAmount={totalSaleAmount}
                      totalCount={totalSaleSum}
                      titleTooltipAmount={'Продажи, руб'}
                      titleTooltipCount={'Продажи, шт  '}
                      getColor={getColor}
                      tooltipData={tooltipSalesDataGeo}
                    // link={'Место для кнопки-ссылки'}
                    />
                  </div>
                  <div className={styles.page__pieWrapper}>
                    <OrderMapTable
                      visibility={geoData?.geo_data?.length <= 5}
                      title={'Заказы в других регионах'}
                      data={totalOrdersOther}
                    />
                    <OrderMapTable
                      visibility={geoData?.geo_data?.length <= 5}
                      title={'Продажи в других регионах'}
                      data={totalSalesOther}
                    />
                  </div>
                </div>
              ) : !byRegions && geoData?.stock_data ? (
                <div className={styles.page__warehouseContent}>
                  <OrderSalesPieCharts
                    geoData={geoData}
                    orderData={{
                      totalOrderAmountStock,
                      totalOrderSumStock,
                      orderCountStock,
                      orderAmountStock,
                      tooltipOrderDataStock,
                    }}
                    salesData={{
                      totalSaleAmountStock,
                      totalSaleSumStock,
                      saleCountStock,
                      saleAmountStock,
                      tooltipSalesDataStock,
                    }}
                  />
                  <h5 className={styles.page__warehouseTitle}>
                    Детализация по складам
                  </h5>
                  {geoData?.stock_data && geoData?.stock_data.length
                    ? geoData?.stock_data.map((stockData, i) => {
                      return (
                        <StockDataRow
                          key={i}
                          stockName={stockData.stockName}
                          orderDetails={stockData.orderDetails}
                          saleDetails={stockData.saleDetails}
                        />
                      );
                    })
                    : null}
                </div>
              ) : null}
            </div>
          )}

          {activeBrand && !activeBrand.is_primary_collect && !loading &&

            <div style={{ width: '100%', padding: '0 20px' }}>
              {/* <DataCollectionNotification
              title={'Ваши данные еще формируются и обрабатываются.'}
            /> */}
              <DataCollectWarningBlock
                title='Ваши данные еще формируются и обрабатываются.'
              />
            </div>
          }
        </section>
        {/* ---------------------- */}
      </main>

      // <div className='orders-map'>
      //   <MobilePlug />
      // <SideNav />
      //   <div className='orders-map-content pb-3'>
      //     <div style={{ width: '100%'}} className="container dash-container">
      //       <TopNav title={'География заказов и продаж'} mikeStarinaStaticProp />
      //     </div>


      //   </div>
      // </div>
    )
  );
};

export default OrdersMap;
