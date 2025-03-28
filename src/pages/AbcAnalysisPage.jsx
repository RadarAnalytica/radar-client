import { useContext, useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AuthContext from "../service/AuthContext";
import NoSubscriptionPage from "../pages/NoSubscriptionPage";
import { ServiceFunctions } from "../service/serviceFunctions";
import TableAbcData from "../components/TableAbcData";
import SelfCostWarning from "../components/SelfCostWarning";
import DataCollectionNotification from "../components/DataCollectionNotification";
import { Filters } from "../components/sharedComponents/apiServicePagesFiltersComponent";

const AbcAnalysisPage = () => {
  const { activeBrand, selectedRange: days } = useAppSelector(store => store.filters)
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  const { user, authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [dataAbcAnalysis, setDataAbcAnalysis] = useState([]);
  const [isNeedCost, setIsNeedCost] = useState([]);
  const [viewType, setViewType] = useState("proceeds");
  const [loading, setLoading] = useState(false);

  // console.log('---------- base ----------')
  // console.log(loading)
  // console.log(dataAbcAnalysis)
  // console.log(activeBrand)
  // console.log(viewType)
  // console.log('--------------------------')


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

  // console.log('---------- base ----------')
  // console.log(viewType)
  // console.log(authToken)
  // console.log(days)
  // console.log(activeBrand)
  // console.log('--------------------------')
  //     console.log('data: ')
  //     console.log(data)
      setIsNeedCost(data.is_need_cost);
      const result = data.results;

      if (result && result.length > 0) {
        setDataAbcAnalysis(result);
      } else {
        setDataAbcAnalysis([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };
 
   // 2.1 Получаем данные по выбранному магазину и проверяем себестоимость
  useEffect(() => {
    if (activeBrand?.is_primary_collect && viewType && days && authToken) {
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand.id.toString())
    }
  }, [activeBrand, viewType, days, authToken]);
  //---------------------------------------------------------------------------------------//

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
      //dispatch(fetchShops(authToken));
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand);
    }, timeToTarget);

    return () => {
      clearTimeout(intervalId);
    };
  }, [dispatch, viewType, authToken, days, activeBrand]);

  

  

  if (user?.subscription_status === "expired") {
    return <NoSubscriptionPage title={"ABC-анализ"} />;
  }

  // if (!shops || shops.length === 0) {
  //   return null; // or a loading indicator
  // }

  return (
    // isVisible && (
      <div className='dashboard-page'>
        
        <SideNav />
        <div className='dashboard-content pb-3' style={{ padding: '0 20px 0 50px'}}>
          <div style={{ marginLeft: '0'}} className="container dash-container">
            <TopNav title={"ABC-анализ"} mikeStarinaStaticProp />
          </div>

          {isNeedCost && activeBrand && activeBrand.is_primary_collect ? (
            <SelfCostWarning
              activeBrand={activeBrand.id}
              onUpdateDashboard={handleUpdateAbcAnalysis}
            />
          ) : null}


          <Filters
            setLoading={setLoading}
          />

          {activeBrand && activeBrand.is_primary_collect ? (
            <TableAbcData
              dataTable={dataAbcAnalysis}
              setDataTable={setDataAbcAnalysis}
              setViewType={setViewType}
              viewType={viewType}
              loading={loading}
            />
          ) : (
            <div style={{marginTop: '20px'}}>
              <DataCollectionNotification
                title={"Ваши данные еще формируются и обрабатываются."}
              />
            </div>
          )}
            {/* <BottomNavigation /> */}
        </div>
      </div>
    // )
  );
};


export default AbcAnalysisPage;
