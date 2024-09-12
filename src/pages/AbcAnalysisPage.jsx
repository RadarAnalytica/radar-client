import { useContext, useState, useEffect, useRef } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import AbcAnalysisFilter from "../components/AbcAnalysisFilter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AuthContext from "../service/AuthContext";
import { fetchShops } from "../redux/shops/shopsActions";
import NoSubscriptionPage from "../pages/NoSubscriptionPage";
import { ServiceFunctions } from "../service/serviceFunctions";
// import { abcAnalysis } from "../service/utils";
import TableAbcData from "../components/TableAbcData";
import SelfCostWarning from "../components/SelfCostWarning";
import { abcAnalysis } from "../service/utils";
import DataCollectionNotification from "../components/DataCollectionNotification";
import SeeMoreButton from "../components/SeeMoreButton";
import { useNavigate } from "react-router-dom";

const AbcAnalysisPage = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState(30);
  const { user, authToken } = useContext(AuthContext);
  const [wbData, setWbData] = useState();
  const dispatch = useAppDispatch();
  const [dataAbcAnalysis, setDataAbcAnalysis] = useState([]);
  const [isNeedCost, setIsNeedCost] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [changeBrand, setChangeBrand] = useState();
  const [primary, setPrimary] = useState();
  const [viewType, setViewType] = useState("proceeds");
  const shops = useAppSelector((state) => state.shopsSlice.shops);

  const storedActiveShop = localStorage.getItem("activeShop");
  let activeShop;
  if (storedActiveShop && typeof storedActiveShop === "string") {
    try {
      activeShop = JSON.parse(storedActiveShop);
    } catch (error) {
      console.error("Error parsing storedActiveShop:", error);
      activeShop = null;
    }
  }
  const activeShopId = activeShop?.id;
  const idShopAsValue =
    activeShopId != undefined ? activeShopId : shops?.[0]?.id;
  const [activeBrand, setActiveBrand] = useState(idShopAsValue);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const authTokenRef = useRef(authToken);
  const prevDays = useRef(days);
  const prevActiveBrand = useRef(activeBrand);
  const prevViewType = useRef(viewType);

  const allShop = shops?.some((item) => item?.is_primary_collect === true);
  const oneShop = shops?.filter((item) => item?.id == activeBrand)[0];

  const plugForAllStores = {
    id: 0,
    brand_name: "Все",
    is_active: true,
    is_primary_collect: allShop,
    is_valid: true,
  };

  const shouldDisplay = activeShop
    ? activeShop.is_primary_collect
    : oneShop
    ? oneShop.is_primary_collect
    : allShop;

  useEffect(() => {
    let intervalId = null;
    if (activeBrand == 0) {
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand);
      clearInterval(intervalId);
    }
    if (
      oneShop?.is_primary_collect &&
      oneShop?.is_primary_collect === allShop
    ) {
      const currentShop = shops?.find((item) => item.id == activeShopId);
      if (currentShop) {
        localStorage.setItem("activeShop", JSON.stringify(currentShop));
      }
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand);
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
    const fetchInitialData = async () => {
      try {
        await dispatch(fetchShops(authToken));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (shops.length > 0) {
      let id;
      if (activeShopId == undefined) {
        id = shops?.[0].id;
        localStorage.setItem("activeShop", JSON.stringify(shops?.[0]));
      } else {
        id = activeShopId;
      }
      setActiveBrand(id);
    }
  }, [shops]);

  //for SelfCostWarning
  const handleUpdateAbcAnalysis = () => {
    setTimeout(() => {
      updateAbcAnalysisCaller();
    }, 3000);
  };

  const updateAbcAnalysisCaller = async () => {
    activeBrand !== undefined &&
      updateDataAbcAnalysis(viewType, days, activeBrand, authToken);
  };

  const handleSaveActiveShop = (shopId) => {
    const currentShop = shops?.find((item) => item.id == shopId);
    if (currentShop) {
      localStorage.setItem("activeShop", JSON.stringify(currentShop));
    }
    if (shopId === "0") {
      localStorage.setItem("activeShop", JSON.stringify(plugForAllStores));
    }
    setActiveBrand(shopId);
  };

  useEffect(() => {
    if (activeBrand !== undefined && authToken !== authTokenRef.current) {
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand);
    }
  }, [authToken]);

     // Update data when days, activeBrand, viewType changes
     useEffect(() => {
      if (
        days !== prevDays.current ||
        activeBrand !== prevActiveBrand.current ||
        viewType !== prevViewType.current
      ) {
        if (activeBrand !== undefined) {
          console.log('updateDataDashbord when days or activeBrand is changed');
          updateDataAbcAnalysis(viewType, authToken, days, activeBrand);
        }
        prevDays.current = days;
        prevActiveBrand.current = activeBrand;
        prevViewType.current = viewType;
      }
    }, [days, activeBrand, viewType]);

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
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand);
    }, timeToTarget);

    return () => {
      clearTimeout(intervalId);
    };
  }, [dispatch, viewType, authToken, days, activeBrand]);

  useEffect(() => {
    if (shops?.length === 0 && !isInitialLoading ) {
      navigate("/onboarding");
    } 
  }, [isInitialLoading, shops.length]);

  const updateDataAbcAnalysis = async (
    viewType,
    authToken,
    days,
    activeBrand
  ) => {
    setLoading(true);
    try {
      const data = await ServiceFunctions.getAbcData(
        viewType,
        authToken,
        days,
        activeBrand
      );
      setIsNeedCost(data.is_need_cost);
      const result = data.results;

      if (result && result.length > 0) {
        setDataAbcAnalysis(result);
        console.log(dataAbcAnalysis);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // const totalAbcData = dataAbcAnalysis?.map((el) => {
  //   return {
  //     title: el?.title,
  //     wb_id: el?.wb_id,
  //     supplier_id: el?.supplier_id,
  //     amount: el?.amount,
  //   };
  // });

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

  if (user?.subscription_status === "expired") {
    return <NoSubscriptionPage title={"ABC-анализ"} />;
  }
  
  if (!shops || shops.length === 0) {
    return null; // or a loading indicator
  }

  return (
    isVisible && (
      <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
          <TopNav title={"ABC-анализ"} />

          {!isInitialLoading && isNeedCost && shouldDisplay ? (
            <SelfCostWarning
              activeBrand={activeBrand}
              onUpdateDashboard={handleUpdateAbcAnalysis}
            />
          ) : null}

          <div className=' pt-0 d-flex gap-3'>
            <AbcAnalysisFilter
              periodValue={days}
              setDays={setDays}
              setActiveBrand={handleSaveActiveShop}
              setChangeBrand={setChangeBrand}
              shops={shops}
              setPrimary={setPrimary}
              activeShopId={activeShopId}
            />
          </div>
          {shouldDisplay ? (
            <TableAbcData
              dataTable={dataAbcAnalysis}
              setDataTable={setDataAbcAnalysis}
              setViewType={setViewType}
              viewType={viewType}
            />
          ) : (
            <DataCollectionNotification
              title={"Ваши данные еще формируются и обрабатываются."}
            />
          )}
        </div>
      </div>
    )
  );
};

export default AbcAnalysisPage;
