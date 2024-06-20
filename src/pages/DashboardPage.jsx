import React, { useContext, useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import AuthContext from "../service/AuthContext";
import DashboardFilter from "../components/DashboardFilter";
import MediumPlate from "../components/MediumPlate";
import SmallPlate from "../components/SmallPlate";
import BigChart from "../components/BigChart";
import FinanceTable from "../components/FinanceTable";
import StorageTable from "../components/StorageTable";
import ChartTable from "../components/ChartTable";
import WidePlate from "../components/WidePlate";
import {
  abcAnalysis,
  filterArrays,
  formatDate,
  generateDateList,
} from "../service/utils";
import { ServiceFunctions } from "../service/serviceFunctions";
import SelfCostWarning from "../components/SelfCostWarning";
import DataCollectionNotification from "../components/DataCollectionNotification";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllShops } from "../redux/dashboard/dashboardActions";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, authToken, showMobile } = useContext(AuthContext);
  console.log(user, "USER");
  const [wbData, setWbData] = useState();

  const [days, setDays] = useState(14);
  console.log(days);
  const [content, setContent] = useState();
  const [state, setState] = useState();

  const [brandNames, setBrandNames] = useState();

  const [dataDashBoard, setDataDashboard] = useState();
  console.log(dataDashBoard, "DATA DASHBOARD");
  const [shop, setShop] = useState();
  const [activeBrand, setActiveBrand] = useState(0);

  const dispatch = useAppDispatch();
  const shops = useAppSelector((state) => state.dashboardSlice.shops);

  useEffect(() => {
    ServiceFunctions.getAllShops(authToken).then((data) => {
      setShop(data);
      // setActiveBrand(data?.slice(0, 1)[0].id);
    });
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    ServiceFunctions.getDashBoard(authToken, days, activeBrand).then(
      (data) => setDataDashboard(data)

      // setTimeout(() => {
      //     if (!user) {
      //         navigate('/signin')
      //     }else{
      //         navigate('/dashboard')
      //     }
      // },800 )
    );
  }, [days, activeBrand]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     dispatch(fetchAllShops(days));
  //   }, 1000);
  //   return () => clearTimeout(timeout);
  // }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     ServiceFunctions.getBrandNames(user.id).then((data) => {
  //       // let names = [...new Set(data)]
  //       console.log(data);
  //       setBrandNames(data);
  //     });
  //   }
  // }, [user]);
  // useEffect(() => {
  //   if (brandNames && brandNames.length) {
  //     setActiveBrand(brandNames[0]);
  //   }
  // }, [brandNames]);

  // useEffect(() => {
  //   if (user && activeBrand) {
  //     ServiceFunctions.getDataCollection(user.id, days, activeBrand).then(
  //       (data) => setWbData(filterArrays(data, days))
  //     );
  //     ServiceFunctions.getDataCollection(user.id, days, activeBrand).then(
  //       (data) => setState(data)
  //     );
  //   }
  // }, [user, activeBrand]);

  // useEffect(() => {
  //   if (wbData) {
  //     setContent(wbData.content);
  //   }
  // }, [wbData]);

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
      name: "FBO",
      initialPrice: dataDashBoard?.fbo ? dataDashBoard?.fbo.cost_amount : "0",
      salesPrice: dataDashBoard?.fbo ? dataDashBoard.fbo.retail_amount : "0",
      quantity: dataDashBoard?.fbo ? dataDashBoard.fbo.count : "0",
    },
    {
      name: "FBS",
      initialPrice: dataDashBoard?.fbs.cost_amount,
      salesPrice: dataDashBoard?.fbs.retail_amount,
      quantity: dataDashBoard?.fbs.count || 0,
    },
    {
      name: "Едет к клиенту",
      initialPrice: dataDashBoard?.toClient.cost_amount,
      salesPrice: dataDashBoard?.toClient.retail_amount,
      quantity: dataDashBoard?.toClient.count || 0,
    },
    {
      name: "Едет от клиента",
      initialPrice: dataDashBoard?.fromClient.cost_amount,
      salesPrice: dataDashBoard?.fromClient.retail_amount,
      quantity: dataDashBoard?.fromClient.count || 0,
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
      name: "Реклама (ДРР (общий))",
      amount: dataDashBoard?.advertAmount || "0",
      percent: dataDashBoard?.advertAmountCompare || "0",
      percentRate: dataDashBoard?.advertPercent || "0",
      percentRate2: dataDashBoard?.advertPercentCompare || "0",
    },
    {
      name: "Комиссия (от выручки)",
      amount: dataDashBoard?.commissionWB || "0",
      percent: dataDashBoard?.commissionWBPercent || "0",
      percentRate: dataDashBoard?.commissionWBCompare || "0",
      percentRate2: dataDashBoard?.commissionWBPercentCompare || "0",
    },
    {
      name: "Логистика (от выручки)",
      amount: dataDashBoard?.logistics || "0",
      percent: dataDashBoard?.logisticsPercent || "0",
      percentRate: dataDashBoard?.logisticsCompare || "0",
      percentRate2: dataDashBoard?.logisticsPercentCompare || "0",
    },
  ];

  const vp = sales
    ? sales.reduce((obj, item) => {
        obj["amount"] =
          sales.reduce(
            (acc, el) =>
              acc +
              (el.finishedPrice -
                state?.initialCostsAndTax?.data?.find(
                  (item) => item.nmID === el.nmId
                )?.initialCosts),
            0
          ) || 0;
        obj["rate"] = content?.grossProfit?.percent || "0";
        return obj;
      }, {})
    : null;

  const financeData = [
    {
      name: "Выручка",
      amount: dataDashBoard?.proceeds || "0",
      rate: dataDashBoard?.proceedsCompare || "0",
    },
    {
      name: "Себестоимость продаж",
      amount: dataDashBoard?.costPriceAmount || "0",
      rate: dataDashBoard?.costPriceAmountCompare,
    },
    {
      name: "Маржинальная стоимость",
      amount: dataDashBoard?.marginalProfit || "0",
      rate: dataDashBoard?.marginalProfitCompare || "0",
    },
    {
      name: "Валовая прибыль",
      amount: dataDashBoard?.grossProfit || "0",
      rate: dataDashBoard?.grossProfitCompare || "0",
    },
    {
      name: "Налог",
      amount: dataDashBoard?.tax || "0",
      rate: dataDashBoard?.taxCompare || "0",
    },
    {
      name: "Чистая прибыль",
      amount: dataDashBoard?.netProfit || "0",
      rate: dataDashBoard?.netProfitCompare || "0",
    },
    {
      name: "Средняя прибыль",
      amount: dataDashBoard?.averageProfit || "0",
      rate: dataDashBoard?.averageProfitCompare || "0",
    },
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
      name: "Процент выкупа",
      value: dataDashBoard?.buyoutPercent || "0",
    },
    {
      name: "ROI",
      value: dataDashBoard?.roi || "0",
    },
    {
      name: "Рентабельность ВП",
      value: dataDashBoard?.grossProfitAbility || "0",
    },
    {
      name: "Рентабельность ОП",
      value: dataDashBoard?.operatingProfitAbility || "0",
    },
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [loading]);

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

    for (let i = 1; i <= number; i++) {
      const pastDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const day = pastDate.getDate().toString().padStart(2, "0");
      const monthNames = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];
      const month = monthNames[pastDate.getMonth()];

      pastDays.push(`${day} ${month}`);
    }

    return pastDays;
  }
  const arrayDay = getPastDays(days);
  const data = {
    labels: arrayDay.reverse() || [],
    datasets: [
      orderLineOn
        ? {
            label: "Заказы",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(255, 219, 126, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(255, 219, 126, 1)",
            hoverBackgroundColor: "rgba(240, 173, 0, 7)",
            yAxisID: "A",
            data: dataDashBoard?.orderAmountList || [],
          }
        : {
            label: "Заказы",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(255, 219, 126, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(255, 219, 126, 1)",
            hoverBackgroundColor: "rgba(240, 173, 0, 7)",
            yAxisID: "A",
            data: [],
          },
      salesLineOn
        ? {
            label: "Продажи",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(154, 129, 255, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(154, 129, 255, 1)",
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "A",
            data: dataDashBoard?.saleAmountList || [],
          }
        : {
            label: "Продажи",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(154, 129, 255, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(154, 129, 255, 1)",
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "A",
            data: [],
          },
      orderOn
        ? {
            label: "Заказы",
            borderRadius: 8,
            type: "bar",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(240, 173, 0, 1)");
              gradient.addColorStop(0.5, "rgba(240, 173, 0, 0.9)");
              gradient.addColorStop(1, "rgba(240, 173, 0, 0.5)");
              return gradient;
            },
            borderWidth: 1,
            hoverBackgroundColor: "rgba(240, 173, 0, 7)",
            yAxisID: "B",
            data: dataDashBoard?.orderCountList || [3, 6, 9],
          }
        : {
            label: "Заказы",
            borderRadius: 8,
            type: "bar",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(240, 173, 0, 1)");
              gradient.addColorStop(0.5, "rgba(240, 173, 0, 0.9)");
              gradient.addColorStop(1, "rgba(240, 173, 0, 0.5)");
              return gradient;
            },
            borderWidth: 1,
            hoverBackgroundColor: "rgba(240, 173, 0, 7)",
            yAxisID: "B",
            data: [],
          },
      salesOn
        ? {
            label: "Продажи",
            borderRadius: 8,
            type: "bar",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 500);
              gradient.addColorStop(0, "rgba(83, 41, 255, 1)");
              gradient.addColorStop(0.5, "rgba(83, 41, 255, 0.9)");
              gradient.addColorStop(1, "rgba(83, 41, 255, 0.5)");
              return gradient;
            },
            borderWidth: 1,
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "B",
            data: dataDashBoard?.saleCountList || [],
          }
        : {
            label: "Продажи",
            borderRadius: 8,
            type: "bar",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 500);
              gradient.addColorStop(0, "rgba(83, 41, 255, 1)");
              gradient.addColorStop(0.5, "rgba(83, 41, 255, 0.9)");
              gradient.addColorStop(1, "rgba(83, 41, 255, 0.5)");
              return gradient;
            },
            borderWidth: 1,
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "B",
            data: [],
          },
    ],
  };
  const sortedValuesArray = data?.datasets
    ?.map((arr) => arr?.data)
    .flat(1)
    ?.sort((a, b) => b - a);
  const maxValue =
    sortedValuesArray && sortedValuesArray.length ? sortedValuesArray[0] : 0;

  // const maxAmount =
  //   sortedValuesArray && sortedValuesArray.length
  //     ? sortedValuesArray.filter((item) => typeof item === "number")[0]
  //     : 50;
  const bar = data?.datasets?.filter((item) => item?.type === "bar");
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

  return (
    user && (
      <div className="dashboard-page">
        <SideNav />
        <div className="dashboard-content pb-3">
          <TopNav title={"Сводка продаж"} />

          {wbData?.initialCostsAndTax === null ||
          wbData?.initialCostsAndTax?.data?.length === 0 ||
          wbData === null ? (
            <SelfCostWarning />
          ) : null}
          {wbData === null ? <DataCollectionNotification /> : null}
          <DashboardFilter
            brandNames={brandNames}
            defaultValue={days}
            setDays={setDays}
            changeBrand={setActiveBrand}
            shop={shop}
          />
          {
            <div>
              <div className="container dash-container p-3 pt-0 d-flex gap-3">
                <MediumPlate
                  name={"Заказы"}
                  text={oneDayOrderAmount / days}
                  text2={oneDayOrderCount / days}
                  dataDashBoard={dataDashBoard?.orderAmount}
                  quantity={dataDashBoard?.orderCount}
                  percent={dataDashBoard?.orderAmountCompare}
                  percent2={dataDashBoard?.orderCountCompare}
                />
                <MediumPlate
                  name={"Продажи"}
                  text={oneDaySaleAmount / days}
                  text2={oneDaySaleCount / days}
                  dataDashBoard={dataDashBoard?.saleAmount}
                  quantity={dataDashBoard?.saleCount}
                  percent={dataDashBoard?.saleAmountCompare}
                  percent2={dataDashBoard?.saleCountCompare}
                />
                <MediumPlate
                  name={"Возвраты"}
                  dataDashBoard={dataDashBoard?.returnAmount}
                  quantity={dataDashBoard?.returnCount}
                  percent={dataDashBoard?.returnAmountCompare}
                  percent2={dataDashBoard?.returnCountCompare}
                  // text={content?.returned?.currentReturnsCount }
                  // text2={content?.returned?.currentReturnsCount }
                />
                <div className="col d-flex flex-column" style={{ gap: "2vh" }}>
                  <div className="" style={{ height: "11vh" }}>
                    <SmallPlate
                      name={"Процент выкупа"}
                      dataDashBoard={dataDashBoard?.buyoutPercent}
                      type={"percent"}
                      percent={dataDashBoard?.buyoutPercentCompare || "0"}
                    />
                  </div>
                  <div className="" style={{ height: "11vh" }}>
                    <SmallPlate
                      name={"Средний чек"}
                      dataDashBoard={dataDashBoard?.averageBill}
                      type={"price"}
                      percent={curOrders?.periodComparison?.avgPriceRubDynamics}
                    />
                  </div>
                </div>
              </div>
              <div className="container dash-container p-3 pt-0 pb-3 d-flex gap-3">
                <div className="col chart-wrapper">
                  <BigChart
                    name={"Заказы и продажи"}
                    data={data}
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
                    days={days}
                    wbData={wbData}
                    maxValue={maxValue}
                    maxAmount={maxAmount}
                    dataDashBoard={dataDashBoard}
                  />
                </div>
              </div>

              <div className="container dash-container p-4 pt-0 pb-3 d-flex gap-3">
                <div className="col" style={{ height: "14vh" }}>
                  <SmallPlate
                    minHeight={"12vh"}
                    smallText={true}
                    name={"Себестоимость проданных товаров"}
                    nochart={true}
                    type={"price"}
                    quantity={curOrders?.selectedPeriod?.buyoutsCount}
                    value={selfCost}
                    dataDashBoard={dataDashBoard?.costPriceAmount}
                    percent={dataDashBoard?.costPriceAmountCompare}
                  />
                </div>
                <div className="col" style={{ height: "14vh" }}>
                  <SmallPlate
                    minHeight={"12vh"}
                    smallText={true}
                    name={"Возвраты"}
                    value={curOrders?.selectedPeriod?.cancelSumRub}
                    quantity={curOrders?.selectedPeriod?.cancelCount}
                    type={"price"}
                    dataDashBoard={dataDashBoard?.returnCount}
                    percent={dataDashBoard?.returnCountCompare}
                  />
                </div>
                <div className="col" style={{ height: "14vh" }}>
                  <SmallPlate
                    minHeight={"12vh"}
                    smallText={true}
                    name={"Штрафы WB"}
                    value={content?.penalty}
                    type={"price"}
                    nochart={true}
                    dataDashBoard={dataDashBoard?.penalty}
                  />
                </div>
                <div className="col" style={{ height: "14vh" }}>
                  <SmallPlate
                    minHeight={"12vh"}
                    smallText={true}
                    name={"Доплаты WB"}
                    value={content?.additionalPayment}
                    type={"price"}
                    nochart={true}
                    dataDashBoard={dataDashBoard?.additional}
                  />
                </div>
              </div>
              <div className="container dash-container p-4 pt-0 d-flex gap-3">
                <div className="col" style={{ height: "14vh" }}>
                  <SmallPlate
                    minHeight={"12vh"}
                    smallText={true}
                    name={"Комиссия WB"}
                    type={"price"}
                    dataDashBoard={dataDashBoard?.commissionWB}
                    persent={dataDashBoard?.commissionWBCompare}
                  />
                </div>
                <div className="col" style={{ height: "14vh" }}>
                  <SmallPlate
                    minHeight={"12vh"}
                    smallText={true}
                    name={"Расходы на логистику"}
                    value={
                      content?.logistics?.totalDeliveryCostCurrentPeriod || "0"
                    }
                    type={"price"}
                    dataDashBoard={dataDashBoard?.logistics}
                    percent={dataDashBoard?.logisticsCompare}
                  />
                </div>
                <div className="col" style={{ height: "14vh" }}>
                  <SmallPlate
                    minHeight={"12vh"}
                    smallText={true}
                    name={"Маржинальная прибыль"}
                    value={curOrders?.selectedPeriod?.buyoutsSumRub - selfCost}
                    type={"price"}
                    dataDashBoard={dataDashBoard?.marginalProfit}
                    percent={dataDashBoard?.marginalProfitCompare}
                  />
                </div>
                <div className="col" style={{ height: "14vh" }}>
                  <SmallPlate
                    minHeight={"12vh"}
                    smallText={true}
                    name={"Упущенные продажи"}
                    type={"price"}
                    value={curOrders?.selectedPeriod?.cancelSumRub}
                    quantity={curOrders?.selectedPeriod?.cancelCount}
                    dataDashBoard={dataDashBoard?.lostSalesCount}
                  />
                </div>
              </div>

              <div
                className="container dash-container p-4 pt-0 pb-3 mb-2 d-flex gap-3"
                style={{ width: "100%" }}
              >
                <div className="wrapper">
                  <FinanceTable
                    title={"Финансы"}
                    data={financeData}
                    wbData={wbData}
                    dataDashBoard={dataDashBoard}
                  />
                  <StorageTable
                    wbData={wbData}
                    title={"Склад"}
                    data={storeData}
                    titles={["Где товар", "Капитализация", "", "Остатки"]}
                    subtitles={["", "Себестоимость", "Розница", ""]}
                    dataDashBoard={dataDashBoard}
                  />
                </div>
                <div className="wrapper">
                  <FinanceTable
                    title={"Прибыльность"}
                    data={profitabilityData}
                    sign={" %"}
                    wbData={wbData}
                    dataDashBoard={dataDashBoard}
                  />
                  <ChartTable
                    title={"Расходы"}
                    data={costsData}
                    wbData={wbData}
                    dataDashBoard={dataDashBoard}
                  />
                </div>
              </div>
              <div
                className="container dash-container p-4 pt-0 pb-3 d-flex gap-3"
                style={{ width: "100%" }}
              >
                <WidePlate
                  title={"ABC-анализ"}
                  titles={["Группа А", "Группа В", "Группа С"]}
                  data={
                    wbData && wbData.sales ? abcAnalysis(wbData.sales.data) : []
                  }
                  dataDashBoard={dataDashBoard?.ABCAnalysis}
                />
              </div>
            </div>
          }
        </div>
      </div>
    )
  );
};

export default DashboardPage;
