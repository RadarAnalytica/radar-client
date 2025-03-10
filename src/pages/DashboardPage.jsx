import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import AuthContext from '../service/AuthContext';
import DashboardFilter from '../components/DashboardFilter';
import MediumPlate from '../components/MediumPlate';
import SmallPlate from '../components/SmallPlate';
import BigChart from '../components/BigChart';
import FinanceTable from '../components/FinanceTable';
import StorageTable from '../components/StorageTable';
import ChartTable from '../components/ChartTable';
import WidePlate from '../components/WidePlate';
import {
  abcAnalysis,
  filterArrays,
  formatDate,
  generateDateList,
} from '../service/utils';
import { ServiceFunctions } from '../service/serviceFunctions';
import SelfCostWarning from '../components/SelfCostWarning';
import DataCollectionNotification from '../components/DataCollectionNotification';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllShops } from '../redux/dashboard/dashboardActions';
import { fetchShops } from '../redux/shops/shopsActions';
import downloadIcon from '../pages/images/Download.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NoSubscriptionPage from './NoSubscriptionPage';
import TooltipInfo from '../components/TooltipInfo';
import MessageWindow from '../components/MessageWindow';
import styles from '../pages/DashboardPage.module.css';
import Period from '../components/period/Period';
import DownloadButton from '../components/DownloadButton';
import DetailChart from '../components/DetailChart';
import { format, differenceInDays } from 'date-fns';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { user, authToken, logout } = useContext(AuthContext);
  const location = useLocation();
  const [wbData, setWbData] = useState();
  const [days, setDays] = useState({ period: 30 });
  const [content, setContent] = useState();
  const [state, setState] = useState();
  const [brandNames, setBrandNames] = useState();
  // const [changeBrand, setChangeBrand] = useState();
  const [dataDashBoard, setDataDashboard] = useState();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [primary, setPrimary] = useState();

  const [selectedRange, setSelectedRange] = useState(days);
  const [detailChartLabels, setDetailChartLabels] = useState([]);
  const [detailChartData, setDetailChartData] = useState([]);
  const [detailChartAverages, setDetailChartAverages] = useState([]);
  // const [shouldNavigate, setShouldNavigate] = useState(false);
  // console.log('shouldNavigate', shouldNavigate);
  const dispatch = useAppDispatch();
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  const storedActiveShop = localStorage.getItem('activeShop');
  let activeShop;
  if (storedActiveShop && typeof storedActiveShop === 'string') {
    try {
      activeShop = JSON.parse(storedActiveShop);
    } catch (error) {
      console.error('Error parsing storedActiveShop:', error);
      activeShop = null;
    }
  }
  const activeShopId = activeShop?.id;
  const idShopAsValue =
    activeShopId != undefined ? activeShopId : shops?.[0]?.id;
  const [activeBrand, setActiveBrand] = useState(idShopAsValue);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const prevDays = useRef(days);
  const prevActiveBrand = useRef(activeBrand);
  const authTokenRef = useRef(authToken);

  const allShop = shops?.some((item) => item?.is_primary_collect === true);
  const oneShop = shops?.filter((item) => item?.id == activeBrand)[0];

  const plugForAllStores = {
    id: 0,
    brand_name: 'Все',
    is_active: true,
    is_primary_collect: allShop,
    is_valid: true,
  };

  const shouldDisplay = activeShop
    ? activeShop.is_primary_collect
    : oneShop
    ? oneShop.is_primary_collect
    : allShop;
  
    const validateStoredShop = () => {
      if (storedActiveShop && shops?.length > 0) {
        const storedShopExists = shops.some(
          shop => shop.id === JSON.parse(storedActiveShop).id
        );
        if (!storedShopExists) {
          localStorage.removeItem('activeShop');
          window.location.reload();
        }
      }
    };

    useEffect(() => {
      if (shops?.length > 0) {
        validateStoredShop();
      }
    }, [shops]);

  useEffect(() => {
    let intervalId = null;

    if (
      oneShop?.is_primary_collect &&
      oneShop?.is_primary_collect === allShop
    ) {
      const currentShop = shops?.find((item) => item.id === activeShopId);
      if (currentShop) {
        localStorage.setItem('activeShop', JSON.stringify(currentShop));
      }
      if (
        !isInitialLoading &&
        (days === prevDays.current || activeBrand === prevActiveBrand.current)
      ) {
        updateDataDashBoard(days, activeBrand, authToken);
      }
      // !isInitialLoading &&  updateDataDashBoard(days, activeBrand, authToken);
      clearInterval(intervalId);
    }
    if (!oneShop?.is_primary_collect && activeBrand !== 0) {
      intervalId = setInterval(() => {
        dispatch(fetchShops(authToken));
      }, 30000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [oneShop, activeBrand]);

  useEffect(() => {
    const updateChartData = async () => {
      let range = selectedRange;
      if (!!range.from || !!range.to){
        range.from = format(range.from, 'yyyy-MM-dd');
        range.to = format(range.to, 'yyyy-MM-dd');
      }
      const data = await ServiceFunctions.getChartDetailData(
        authToken,
        range,
        activeBrand
      );
      setDetailChartLabels(data.result);
      setDetailChartData(data.counts);
      setDetailChartAverages(data.averages);
    };
    updateChartData();
  }, [selectedRange]);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleDownload = () => {};

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await dispatch(fetchShops(authToken));
        if (activeBrand !== undefined) {
          await updateDataDashBoard(days, activeBrand, authToken);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setFirstLoading(false);
        setIsInitialLoading(false);
      }
    };
    //   if (firstLoading) {
    //     await dispatch(fetchShops(authToken)).then(() => {
    //       setFirstLoading(false);
    //     });
    //     await updateDataDashBoard(days, activeBrand, authToken);
    //   }

    // }

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (shops.length === 0 && !firstLoading) {
      navigate('/onboarding');
    }
  }, [firstLoading, shops.length]);

  useEffect(() => {
    if (shops.length > 0) {
      let id;
      if (activeShopId == undefined) {
        id = shops?.[0].id;
        localStorage.setItem('activeShop', JSON.stringify(shops?.[0]));
      } else {
        id = activeShopId;
      }
      setActiveBrand(id);
    }
  }, [shops]);

  const handleUpdateDashboard = () => {
    setTimeout(() => {
      updateDataDashBoardCaller();
    }, 3000);
  };

  const updateDataDashBoardCaller = async () => {
    activeBrand !== undefined &&
      updateDataDashBoard(days, activeBrand, authToken);
  };

  const handleSaveActiveShop = (shopId) => {
    const currentShop = shops?.find((item) => item.id == shopId);
    if (currentShop) {
      localStorage.setItem('activeShop', JSON.stringify(currentShop));
    }
    if (shopId === '0') {
      localStorage.setItem('activeShop', JSON.stringify(plugForAllStores));
    }
    setActiveBrand(shopId);
  };

  useEffect(() => {
    if (activeBrand !== undefined && authToken !== authTokenRef.current) {
      updateDataDashBoard(days, activeBrand, authToken);
    }
  }, [authToken]);

  // Update dashboard data when necessary
  useEffect(() => {
    if (days !== prevDays.current || activeBrand !== prevActiveBrand.current) {
      if (activeBrand !== undefined) {
        updateDataDashBoard(days, activeBrand, authToken);
      }
      prevDays.current = days;
      prevActiveBrand.current = activeBrand;
    }
    setSelectedRange(days)
  }, [days, activeBrand]);

  useEffect(() => {
    const calculateNextEvenHourPlus30 = () => {
      const now = new Date();
      let targetTime = new Date(now);

      // Set to the next half hour
      targetTime.setMinutes(targetTime.getMinutes() <= 30 ? 30 : 60, 0, 0);

      // If we're already past an even hour + 30 minutes, move to the next even hour
      if (
        targetTime.getHours() % 2 !== 0 ||
        (targetTime.getHours() % 2 === 0 && targetTime <= now)
      ) {
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
      updateDataDashBoard(days, activeBrand, authToken);
    }, timeToTarget);

    return () => {
      clearTimeout(intervalId);
    };
  }, [dispatch, activeBrand, days, authToken]);

  const updateDataDashBoard = async (days, activeBrand, authToken) => {
    setLoading(true);
    try {
      const controlValue = shops.filter(el => el.id === activeShopId).length
      if (shops.length > 0 && controlValue !== 1 && !!activeBrand && activeBrand !== '0') {
        localStorage.removeItem('activeShop')
        window.location.reload()
      }

      let range = days;
      if (!!range.from || !!range.to){
        range.from = format(range.from, 'yyyy-MM-dd');
        range.to = format(range.to, 'yyyy-MM-dd');
      }
      
      const data = await ServiceFunctions.getDashBoard(
        authToken,
        range,
        activeBrand
      );
      setDataDashboard(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  };

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

  // Заказы
  const orders = wbData && wbData.orders ? wbData.orders.data : [];
  // продажи
  const sales = wbData && wbData.sales ? wbData.sales.data : [];

  const selfCostArray =
    sales && state && state.initialCostsAndTax && state.initialCostsAndTax.data
      ? sales.map(
          (item) =>
            state.initialCostsAndTax.data.find((el) => el.nmID === item.nmId)
              ?.initialCosts
        )
      : [];

  const selfCost =
    selfCostArray && selfCostArray.length
      ? selfCostArray.reduce((acc, item) => acc + item, 0)
      : 0;

  const [reportDaily, setReportDaily] = useState();
  const [reportWeekly, setReportWeekly] = useState();
  const [reportTwoWeeks, setReportTwoWeeks] = useState();
  const [reportMonthly, setReportMonthly] = useState();
  const [reportThreeMonths, setReportThreeMonths] = useState();

  useEffect(() => {
    if (wbData) {
      setReportDaily(wbData.reportDaily?.data?.data?.groups[0]?.statistics);
      setReportWeekly(wbData.reportWeekly?.data?.data?.groups[0]?.statistics);
      setReportTwoWeeks(
        wbData.reportTwoWeeks?.data?.data?.groups[0]?.statistics
      );
      setReportMonthly(wbData.reportMonthly?.data?.data?.groups[0]?.statistics);
      setReportThreeMonths(
        wbData.reportThreeMonths?.data?.data?.groups[0]?.statistics
      );
    }
  }, [wbData]);

  const [curOrders, setCurOrders] = useState();
  useEffect(() => {
    if (days === 1) {
      setCurOrders(reportDaily);
    } else if (days === 7) {
      setCurOrders(reportWeekly);
    } else if (days === 14) {
      setCurOrders(reportTwoWeeks);
    } else if (days === 30) {
      setCurOrders(reportMonthly);
    } else if (days === 90) {
      setCurOrders(reportThreeMonths);
    }
  }, [days, wbData]);

  const tax =
    state && state.initialCostsAndTax ? state.initialCostsAndTax.tax : 0;

  const stockAndCostsMatch =
    wbData &&
    wbData.stocks &&
    state &&
    state.initialCostsAndTax &&
    state.initialCostsAndTax.data
      ? wbData.stocks.data?.map((item) =>
          state.initialCostsAndTax.data.find((el) => el.nmID === item.nmId)
        )
      : [];

  // const fbo =
  //   stockAndCostsMatch?.length && wbData && wbData.stocks
  //     ? wbData.stocks.data?.reduce((obj, item) => {
  //         obj["sum"] =
  //           wbData.stocks.data?.reduce(
  //             (acc, i) => acc + i.Price * i.quantityFull,
  //             0
  //           ) || 0;
  //         obj["quantity"] =
  //           wbData.stocks.data?.reduce((acc, el) => acc + el.quantityFull, 0) ||
  //           0;
  //         obj["initialCosts"] =
  //           wbData.stocks.data?.reduce(
  //             (acc, item) =>
  //               acc +
  //               (stockAndCostsMatch.find((el) => el.nmID === item.nmId)
  //                 ?.initialCosts || 0),
  //             0
  //           ) || 0;
  //         return obj;
  //       }, {})
  //     : null;

  const storeData = [
    {
      name: 'FBO',
      initialPrice: dataDashBoard?.fbo ? dataDashBoard?.fbo?.cost_amount : '0',
      salesPrice: dataDashBoard?.fbo ? dataDashBoard.fbo?.retail_amount : '0',
      quantity: dataDashBoard?.fbo ? dataDashBoard.fbo?.count : '0',
    },
    {
      name: 'FBS',
      initialPrice: dataDashBoard?.fbs?.cost_amount,
      salesPrice: dataDashBoard?.fbs?.retail_amount,
      quantity: dataDashBoard?.fbs?.count || 0,
    },
    {
      name: 'Едет к клиенту',
      initialPrice: dataDashBoard?.toClient?.cost_amount,
      salesPrice: dataDashBoard?.toClient?.retail_amount,
      quantity: dataDashBoard?.toClient?.count || 0,
    },
    {
      name: 'Едет от клиента',
      initialPrice: dataDashBoard?.fromClient?.cost_amount,
      salesPrice: dataDashBoard?.fromClient?.retail_amount,
      quantity: dataDashBoard?.fromClient?.count || 0,
    },
    // {
    //   name: "Не распределено",
    //   initialPrice: wbData?.stocks?.data?.reduce(
    //     (acc, el) =>
    //       acc +
    //       el.quantity *
    //         stockAndCostsMatch?.find((item) => item.nmID === el.nmId)
    //           ?.initialCosts,
    //     0
    //   ),
    //   salesPrice: content?.notSorted?.sum,
    //   quantity: content?.notSorted?.amount,
    // },
  ];

  const costsData = [
    {
      name: 'Реклама (ДРР (общий))',
      amount: dataDashBoard?.advertAmount || '0',
      percent: dataDashBoard?.advertAmountCompare || '0',
      percentRate: dataDashBoard?.advertPercent || '0',
      percentRate2: dataDashBoard?.advertPercentCompare || '0',
    },
    {
      name: 'Комиссия (от выручки)',
      amount: dataDashBoard?.commissionWB || '0',
      percent: dataDashBoard?.commissionWBPercent || '0',
      percentRate: dataDashBoard?.commissionWBCompare || '0',
      percentRate2: dataDashBoard?.commissionWBPercentCompare || '0',
    },
    {
      name: 'Логистика (от выручки)',
      amount: dataDashBoard?.logistics || '0',
      percent: dataDashBoard?.logisticsPercent || '0',
      percentRate: dataDashBoard?.logisticsCompare || '0',
      percentRate2: dataDashBoard?.logisticsPercentCompare || '0',
    },
  ];

  const vp = sales
    ? sales.reduce((obj, item) => {
        obj['amount'] =
          sales.reduce(
            (acc, el) =>
              acc +
              (el.finishedPrice -
                state?.initialCostsAndTax?.data?.find(
                  (item) => item.nmID === el.nmId
                )?.initialCosts),
            0
          ) || 0;
        obj['rate'] = content?.grossProfit?.percent || '0';
        return obj;
      }, {})
    : null;

  const financeData = [
    {
      name: 'Выручка',
      amount: dataDashBoard?.proceeds || '0',
      rate: dataDashBoard?.proceedsCompare || '0',
    },
    {
      name: 'Себестоимость продаж',
      amount: dataDashBoard?.costPriceAmount || '0',
      rate: dataDashBoard?.costPriceAmountCompare,
    },
    {
      name: 'Маржинальная стоимость',
      amount: dataDashBoard?.marginalProfit || '0',
      rate: dataDashBoard?.marginalProfitCompare || '0',
    },
    {
      name: 'Валовая прибыль',
      amount: dataDashBoard?.grossProfit || '0',
      rate: dataDashBoard?.grossProfitCompare || '0',
    },
    // {
    //   name: "Налог",
    //   amount: dataDashBoard?.tax || "0",
    //   rate: dataDashBoard?.taxCompare || "0",
    // },
    {
      name: 'Чистая прибыль',
      amount: dataDashBoard?.netProfit || '0',
      rate: dataDashBoard?.netProfitCompare || '0',
    },
    // {
    //   name: "Средняя прибыль",
    //   amount: dataDashBoard?.averageProfit || "0",
    //   rate: dataDashBoard?.averageProfitCompare || "0",
    // },
  ];

  const salesSelfCost =
    sales && sales
      ? sales.reduce(
          (acc, el) =>
            acc +
            (state?.initialCostsAndTax?.data?.find(
              (item) => item.nmID === el.nmId
            )?.initialCosts || 0),
          0
        )
      : 0;

  const profitabilityData = [
    {
      name: 'Процент выкупа',
      value: dataDashBoard?.buyoutPercent || '0',
    },
    {
      name: 'ROI',
      value: dataDashBoard?.roi || '0',
    },
    {
      name: 'Рентабельность ВП',
      value: dataDashBoard?.grossProfitAbility || '0',
    },
    {
      name: 'Рентабельность ОП',
      value: dataDashBoard?.operatingProfitAbility || '0',
    },
  ];

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // }, [loading]);

  // const changePeriod = () => {
  //   setLoading(true);
  //   if (user && days && activeBrand) {
  //     ServiceFunctions.getFilteredCollection(user.id, days, activeBrand).then(
  //       (data) => setWbData(filterArrays(data, days))
  //     );
  //   }
  // };

  const uniquSalesDate = [
    ...new Set(sales.map((i) => formatDate(new Date(i.date)))),
  ];
  const uniquOrdersDate = [
    ...new Set(orders.map((i) => formatDate(new Date(i.date)))),
  ];
  const labels = [...new Set(uniquOrdersDate.concat(uniquSalesDate))];

  // useEffect(() => {
  //   changePeriod();
  // }, [days, activeBrand]);

  const [byMoney, setByMoney] = useState(true);
  const [byAmount, setByAmount] = useState(true);

  const orderValuesRub =
    orders && orders.length
      ? orders?.map((i) => ({
          price: i.finishedPrice,
          date: new Date(i.date).toLocaleDateString(),
        }))
      : [];
  const salesValuesRub =
    sales && sales.length
      ? sales?.map((i) => ({
          price: i.finishedPrice,
          date: new Date(i.date).toLocaleDateString(),
        }))
      : [];

  const summedOrderRub = orderValuesRub.reduce((acc, curr) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.price;
    } else {
      acc[curr.date] = curr.price;
    }
    return acc;
  }, {});

  const summedSalesRub = salesValuesRub.reduce((acc, curr) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.price;
    } else {
      acc[curr.date] = curr.price;
    }
    return acc;
  }, {});

  const summedOrderArray = Object.keys(summedOrderRub)
    .map((date) => summedOrderRub[date].toFixed(2))
    .slice(0, days);
  const summedSalesArray = Object.keys(summedSalesRub)
    .map((date) => summedSalesRub[date].toFixed(2))
    .slice(0, days);

  const ordersByDate = orderValuesRub.reduce((acc, item) => {
    const { date } = item;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const salesByDate = salesValuesRub.reduce((acc, item) => {
    const { date } = item;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const totalOrByDate = Object.entries(ordersByDate)
    .map(([date, count]) => count)
    .slice(0, days);
  const totalsalesByDate = Object.entries(salesByDate)
    .map(([date, count]) => count)
    .slice(0, days);

  const [orderOn, setOrderOn] = useState(true);
  const [orderLineOn, setOrderLineOn] = useState(true);
  const [salesOn, setSalesOn] = useState(true);
  const [salesLineOn, setSalesLineOn] = useState(true);

  // const objBoard = {
  //   orderCountList: [55, 89, 44, 115, 55, 89, 44, 115, 55, 89, 44, 115, 55, 89],
  //   orderAmountList: [
  //     74, 36, 89, 41, 95, 36, 89, 41, 95, 36, 89, 41, 95, 36, 89,
  //   ],
  //   saleCountList: [9, 48, 32, 78, 55, 14, 9, 48, 32, 78, 55, 14, 9, 48],
  //   saleAmountList: [77, 23, 65, 45, 78, 98, 11, 99, 23, 65, 45, 78, 98, 11],
  // };

  function getPastDays(number) {
    const today = new Date();
    const pastDays = [];

    for (let i = 0; i < number; i++) {
      const pastDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const day = pastDate.getDate().toString().padStart(2, '0');
      const monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];
      const month = monthNames[pastDate.getMonth()];

      pastDays.push(`${day} ${month}`);
    }

    return pastDays;
  }

  const chartData = useMemo(() => {
    const countDays = dataDashBoard?.orderCountList?.length;
    return {
      labels: getPastDays(countDays).reverse(),
      datasets: [
        orderLineOn
          ? {
              label: 'Заказы',
              borderRadius: 8,
              type: 'line',
              backgroundColor: 'rgba(255, 219, 126, 1)',
              borderWidth: 2,
              pointRadius: 5,
              pointBorderColor: 'rgba(230, 230, 230, 0.8)',
              borderColor: 'rgba(255, 219, 126, 1)',
              hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
              yAxisID: 'A',
              data: dataDashBoard?.orderAmountList || [],
              xAxisID: 'x-1',
            }
          : {
              label: 'Заказы',
              borderRadius: 8,
              type: 'line',
              backgroundColor: 'rgba(255, 219, 126, 1)',
              borderWidth: 2,
              pointRadius: 5,
              pointBorderColor: 'rgba(230, 230, 230, 0.8)',
              borderColor: 'rgba(255, 219, 126, 1)',
              hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
              yAxisID: 'A',
              data: [],
            },
        salesLineOn
          ? {
              label: 'Продажи',
              borderRadius: 8,
              type: 'line',
              backgroundColor: 'rgba(154, 129, 255, 1)',
              borderWidth: 2,
              pointRadius: 5,
              pointBorderColor: 'rgba(230, 230, 230, 0.8)',
              borderColor: 'rgba(154, 129, 255, 1)',
              hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
              yAxisID: 'A',
              data: dataDashBoard?.saleAmountList || [],
            }
          : {
              label: 'Продажи',
              borderRadius: 8,
              type: 'line',
              backgroundColor: 'rgba(154, 129, 255, 1)',
              borderWidth: 2,
              pointRadius: 5,
              pointBorderColor: 'rgba(230, 230, 230, 0.8)',
              borderColor: 'rgba(154, 129, 255, 1)',
              hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
              yAxisID: 'A',
              data: [],
            },
        orderOn
          ? {
              label: 'Заказы',
              borderRadius: 8,
              type: 'bar',
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(240, 173, 0, 1)');
                gradient.addColorStop(0.5, 'rgba(240, 173, 0, 0.9)');
                gradient.addColorStop(1, 'rgba(240, 173, 0, 0.5)');
                return gradient;
              },
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
              yAxisID: 'B',
              data: dataDashBoard?.orderCountList || [],
            }
          : {
              label: 'Заказы',
              borderRadius: 8,
              type: 'bar',
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(240, 173, 0, 1)');
                gradient.addColorStop(0.5, 'rgba(240, 173, 0, 0.9)');
                gradient.addColorStop(1, 'rgba(240, 173, 0, 0.5)');
                return gradient;
              },
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
              yAxisID: 'B',
              data: [],
            },
        salesOn
          ? {
              label: 'Продажи',
              borderRadius: 8,
              type: 'bar',
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                gradient.addColorStop(0, 'rgba(83, 41, 255, 1)');
                gradient.addColorStop(0.5, 'rgba(83, 41, 255, 0.9)');
                gradient.addColorStop(1, 'rgba(83, 41, 255, 0.5)');
                return gradient;
              },
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
              yAxisID: 'B',
              data: dataDashBoard?.saleCountList || [],
            }
          : {
              label: 'Продажи',
              borderRadius: 8,
              type: 'bar',
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                gradient.addColorStop(0, 'rgba(83, 41, 255, 1)');
                gradient.addColorStop(0.5, 'rgba(83, 41, 255, 0.9)');
                gradient.addColorStop(1, 'rgba(83, 41, 255, 0.5)');
                return gradient;
              },
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
              yAxisID: 'B',
              data: [],
            },
      ],
    };
  }, [orderLineOn, salesLineOn, orderOn, salesOn, dataDashBoard]);

  const sortedValuesArray = chartData?.datasets
    ?.map((arr) => arr?.data)
    .flat(1)
    ?.sort((a, b) => b - a);
  const maxValue =
    sortedValuesArray && sortedValuesArray.length ? sortedValuesArray[0] : 0;

  // const maxAmount =
  //   sortedValuesArray && sortedValuesArray.length
  //     ? sortedValuesArray.filter((item) => typeof item === "number")[0]
  //     : 50;
  const bar = chartData?.datasets?.filter((item) => item?.type === 'bar');
  const maxAmount = bar
    ?.map((arr) => arr?.data)
    ?.flat(1)
    ?.sort((a, b) => b - a)[0];

  // text={dataDashBoard?.orderAmount / days}
  // text2={dataDashBoard?.orderCount / days}
  // text={dataDashBoard?.saleAmount / days}
  // text2={dataDashBoard?.saleCount / days}
  let oneDayOrderAmount = dataDashBoard?.orderAmount;
  let oneDayOrderCount = dataDashBoard?.orderCount;
  let oneDaySaleAmount = dataDashBoard?.saleAmount;
  let oneDaySaleCount = dataDashBoard?.saleCount;

  if (user?.subscription_status === 'expired') {
    return <NoSubscriptionPage title={'Сводка продаж'} />;
  }

  if (!shops || shops.length === 0) {
    return null; // or a loading indicator
  }

  const rangeDays = days.from && days.to ? differenceInDays(days.to, days.from, {unit: 'days'}) : days.period
  return (
    isVisible && (
      <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
          <TopNav title={'Сводка продаж'} />
          {!isInitialLoading &&
          !dataDashBoard?.costPriceAmount &&
          activeShopId !== 0 &&
          shouldDisplay ? (
            <SelfCostWarning
              activeBrand={activeBrand}
              onUpdateDashboard={handleUpdateDashboard}
            />
          ) : null}

          {/* {wbData?.initialCostsAndTax === null ||
          wbData?.initialCostsAndTax?.data?.length === 0 ||
          wbData === null ? (
            <SelfCostWarning />
          ) : null}
          {wbData === null ? <DataCollectionNotification /> : null} */}

          <DashboardFilter
            periodValue={days}
            setDays={setDays}
            setActiveBrand={handleSaveActiveShop}
            // setChangeBrand={setChangeBrand}
            shops={shops}
            // setPrimary={setPrimary}
            activeShopId={activeShopId}
          />

          {shouldDisplay ? (
            <div>
              <div className='container dash-container p-3 pt-0 d-flex gap-3'>
                <MediumPlate
                  name={'Заказы'}
                  text={oneDayOrderAmount / rangeDays}
                  text2={oneDayOrderCount / rangeDays}
                  dataDashBoard={dataDashBoard?.orderAmount}
                  quantity={dataDashBoard?.orderCount}
                  percent={dataDashBoard?.orderAmountCompare}
                  percent2={dataDashBoard?.orderCountCompare}
                />
                <MediumPlate
                  name={'Продажи'}
                  text={oneDaySaleAmount / rangeDays}
                  text2={oneDaySaleCount / rangeDays}
                  dataDashBoard={dataDashBoard?.saleAmount}
                  quantity={dataDashBoard?.saleCount}
                  percent={dataDashBoard?.saleAmountCompare}
                  percent2={dataDashBoard?.saleCountCompare}
                />
                <MediumPlate
                  name={'Возвраты'}
                  dataDashBoard={dataDashBoard?.returnAmount}
                  quantity={dataDashBoard?.returnCount}
                  percent={dataDashBoard?.returnAmountCompare}
                  percent2={dataDashBoard?.returnCountCompare}
                />
                <div className='col d-flex flex-column' style={{ gap: '2vh' }}>
                  <div className='' style={{ height: '11vh' }}>
                    <SmallPlate
                      name={'Процент выкупа'}
                      dataDashBoard={dataDashBoard?.buyoutPercent}
                      type={'percent'}
                      percent={dataDashBoard?.buyoutPercentCompare || '0'}
                    />
                  </div>
                  <div className='' style={{ height: '11vh' }}>
                    <SmallPlate
                      name={'Средний чек'}
                      dataDashBoard={dataDashBoard?.averageBill}
                      type={'price'}
                      percent={curOrders?.periodComparison?.avgPriceRubDynamics}
                    />
                  </div>
                </div>
              </div>
              <div className='container dash-container p-3 pt-0 pb-3 d-flex gap-3'>
                <div className='col chart-wrapper'>
                  <BigChart
                    name={'Заказы и продажи'}
                    data={chartData}
                    orderOn={orderOn}
                    salesOn={salesOn}
                    setOrderOn={setOrderOn}
                    setSalesOn={setSalesOn}
                    setOrderLineOn={setOrderLineOn}
                    setSalesLineOn={setSalesLineOn}
                    orderLineOn={orderLineOn}
                    salesLineOn={salesLineOn}
                    setByMoney={setByMoney}
                    byAmount={byAmount}
                    byMoney={byMoney}
                    loading={loading}
                    days={rangeDays}
                    wbData={wbData}
                    maxValue={maxValue}
                    maxAmount={maxAmount}
                    dataDashBoard={dataDashBoard}
                  >
                    <div
                      style={{
                        backgroundColor: '#F0AD000D',
                        padding: '5px 10px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#F0AD00',
                        fontWeight: '700',
                        fontSize: '14px',
                      }}
                    >
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M9.5625 5.25012C9.5625 4.93946 9.31066 4.68762 9 4.68762C8.68934 4.68762 8.4375 4.93946 8.4375 5.25012V9.75012C8.4375 10.0608 8.68934 10.3126 9 10.3126H12C12.3107 10.3126 12.5625 10.0608 12.5625 9.75012C12.5625 9.43946 12.3107 9.18762 12 9.18762H9.5625V5.25012Z'
                          fill='#F0AD00'
                        />
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M16.5 9.00012C16.5 13.1423 13.1421 16.5001 9 16.5001C4.85786 16.5001 1.5 13.1423 1.5 9.00012C1.5 4.85799 4.85786 1.50012 9 1.50012C13.1421 1.50012 16.5 4.85799 16.5 9.00012ZM15.375 9.00012C15.375 12.5209 12.5208 15.3751 9 15.3751C5.47918 15.3751 2.625 12.5209 2.625 9.00012C2.625 5.47931 5.47918 2.62512 9 2.62512C12.5208 2.62512 15.375 5.47931 15.375 9.00012Z'
                          fill='#F0AD00'
                        />
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M1.25 9.00012C1.25 4.71991 4.71979 1.25012 9 1.25012C13.2802 1.25012 16.75 4.71991 16.75 9.00012C16.75 13.2803 13.2802 16.7501 9 16.7501C4.71979 16.7501 1.25 13.2803 1.25 9.00012ZM9 1.75012C4.99593 1.75012 1.75 4.99606 1.75 9.00012C1.75 13.0042 4.99593 16.2501 9 16.2501C13.0041 16.2501 16.25 13.0042 16.25 9.00012C16.25 4.99606 13.0041 1.75012 9 1.75012ZM2.375 9.00012C2.375 5.34124 5.34111 2.37512 9 2.37512C12.6589 2.37512 15.625 5.34124 15.625 9.00012C15.625 12.659 12.6589 15.6251 9 15.6251C5.34111 15.6251 2.375 12.659 2.375 9.00012ZM9 2.87512C5.61726 2.87512 2.875 5.61738 2.875 9.00012C2.875 12.3829 5.61726 15.1251 9 15.1251C12.3827 15.1251 15.125 12.3829 15.125 9.00012C15.125 5.61738 12.3827 2.87512 9 2.87512ZM9 4.93762C8.82741 4.93762 8.6875 5.07753 8.6875 5.25012V9.75012C8.6875 9.92271 8.82741 10.0626 9 10.0626H12C12.1726 10.0626 12.3125 9.92271 12.3125 9.75012C12.3125 9.57753 12.1726 9.43762 12 9.43762H9.5625C9.42443 9.43762 9.3125 9.32569 9.3125 9.18762V5.25012C9.3125 5.07753 9.17259 4.93762 9 4.93762ZM8.1875 5.25012C8.1875 4.80139 8.55127 4.43762 9 4.43762C9.44873 4.43762 9.8125 4.80139 9.8125 5.25012V8.93762H12C12.4487 8.93762 12.8125 9.30139 12.8125 9.75012C12.8125 10.1989 12.4487 10.5626 12 10.5626H9C8.55127 10.5626 8.1875 10.1989 8.1875 9.75012V5.25012Z'
                          fill='#F0AD00'
                        />
                      </svg>
                      <div
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                        onClick={handleModalOpen}
                      >
                        Детализировать заказы по времени
                      </div>
                    </div>
                  </BigChart>
                </div>
                {isModalOpen && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                      <div className={styles.modalHeader}>
                        <div className={styles.modalHeaderTitle}>
                          Детализация заказов по времени
                        </div>
                        <div
                          className={styles.closeBtnModal}
                          onClick={handleCloseModal}
                        >
                          <svg
                            width='20'
                            height='21'
                            viewBox='0 0 20 21'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M10 8.27813L17.7781 0.5L20 2.72187L12.2219 10.5L20 18.2781L17.7781 20.5L10 12.7219L2.22187 20.5L0 18.2781L7.77813 10.5L0 2.72187L2.22187 0.5L10 8.27813Z'
                              fill='#1A1A1A'
                              fill-opacity='0.5'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className={styles.underHeader}>
                        <div
                          className={styles.period}
                          style={{ position: 'relative' }}
                        >
                          <Period
                            selectedRange={selectedRange}
                            setSelectedRange={setSelectedRange}
                          />
                        </div>
                        {/* <div style={{ marginTop: '35px' }}>
                          <div
                            className='download-button'
                            onClick={() => handleDownload()}
                          >
                            <img src={downloadIcon} />
                            Скачать детализацию
                          </div>
                        </div> */}
                      </div>
                      <div className={styles.modalBody}>
                        <DetailChart
                          labels={detailChartLabels}
                          chartData={detailChartData}
                          averages={detailChartAverages}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className='container dash-container p-4 pt-0 pb-3 d-flex gap-3'>
                <div className='col' style={{ height: '14vh' }}>
                  <SmallPlate
                    name={'Себестоимость проданных товаров'}
                    nochart={false}
                    type={'price'}
                    quantity={curOrders?.selectedPeriod?.buyoutsCount}
                    dataDashBoard={dataDashBoard?.costPriceAmount}
                    percent={dataDashBoard?.costPriceAmountCompare}
                    pieces={dataDashBoard?.saleCount}
                  />
                </div>
                <div className='col' style={{ height: '14vh' }}>
                  <SmallPlate
                    nochart={false}
                    name={'Возвраты'}
                    quantity={curOrders?.selectedPeriod?.cancelCount}
                    type={'price'}
                    dataDashBoard={dataDashBoard?.returnAmount}
                    percent={dataDashBoard?.returnAmountCompare}
                    pieces={dataDashBoard?.returnCount}
                  />
                </div>
                <div className='col' style={{ height: '14vh' }}>
                  <SmallPlate
                    smallText={true}
                    name={'Штрафы WB'}
                    type={'price'}
                    nochart={true}
                    dataDashBoard={dataDashBoard?.penalty}
                    allProps={dataDashBoard}
                  />
                </div>
                <div className='col' style={{ height: '14vh' }}>
                  <SmallPlate
                    name={'Доплаты WB'}
                    type={'price'}
                    nochart={true}
                    dataDashBoard={dataDashBoard?.additional}
                  />
                </div>
              </div>
              <div className='container dash-container p-4 pt-0 d-flex gap-3'>
                <div className='col' style={{ height: '14vh' }}>
                  <SmallPlate
                    name={'Комиссия WB'}
                    type={'price'}
                    dataDashBoard={dataDashBoard?.commissionWB}
                    persent={dataDashBoard?.commissionWBCompare}
                  />
                </div>
                <div className='col' style={{ height: '14vh' }}>
                  <SmallPlate
                    name={'Расходы на логистику'}
                    type={'price'}
                    dataDashBoard={dataDashBoard?.logistics}
                    percent={dataDashBoard?.logisticsCompare}
                  />
                </div>
                <div className='col' style={{ height: '14vh' }}>
                  <SmallPlate
                    name={'Хранение'}
                    type={'price'}
                    dataDashBoard={dataDashBoard?.storageData}
                    percent={dataDashBoard?.storageDataCompare}
                  />
                </div>
                <div className='col' style={{ height: '14vh' }}>
                  <SmallPlate
                    nochart={false}
                    name={'Упущенные продажи'}
                    type={'price'}
                    quantity={curOrders?.selectedPeriod?.cancelCount}
                    dataDashBoard={dataDashBoard?.lostSalesAmount}
                    pieces={dataDashBoard?.lostSalesCount}
                  />
                </div>
              </div>

              <div
                className='container dash-container p-4 pt-0 pb-3 mb-2 d-flex gap-3'
                style={{ width: '100%' }}
              >
                <div className='wrapper'>
                  <FinanceTable
                    title={'Финансы'}
                    data={financeData}
                    wbData={wbData}
                    dataDashBoard={dataDashBoard}
                    tableType={1}
                  />
                  <StorageTable
                    wbData={wbData}
                    title={'Склад'}
                    data={storeData}
                    titles={['Где товар', 'Капитализация', '', 'Остатки']}
                    subtitles={['', 'Себестоимость', 'Розница', '']}
                    dataDashBoard={dataDashBoard}
                  />
                </div>
                <div className='wrapper'>
                  <FinanceTable
                    title={'Прибыльность'}
                    data={profitabilityData}
                    sign={' %'}
                    wbData={wbData}
                    dataDashBoard={dataDashBoard}
                    tableType={1}
                  />

                  <ChartTable
                    title={'Расходы'}
                    data={costsData}
                    wbData={wbData}
                    dataDashBoard={dataDashBoard}
                  />
                </div>
              </div>
              <div
                className='container dash-container p-4 pt-0 pb-3 d-flex gap-3'
                style={{ width: '100%' }}
              >
                <WidePlate
                  title={'ABC-анализ'}
                  titles={['Группа А', 'Группа В', 'Группа С']}
                  data={
                    wbData && wbData.sales ? abcAnalysis(wbData.sales.data) : []
                  }
                  dataDashBoard={dataDashBoard?.ABCAnalysis}
                />
              </div>
            </div>
          ) : (
            <DataCollectionNotification
              title={'Ваши данные еще формируются и обрабатываются.'}
            />
          )}
        </div>
      </div>
    )
  );
};

export default DashboardPage;
