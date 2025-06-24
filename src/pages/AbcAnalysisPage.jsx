import { useContext, useState, useEffect } from "react";
import styles from './AbcAnalysisPage.module.css'
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
import MobilePlug from "../components/sharedComponents/mobilePlug/mobilePlug";
import Header from "../components/sharedComponents/header/header";
import Sidebar from "../components/sharedComponents/sidebar/sidebar";
import { mockGetAbcData } from "../service/mockServiceFunctions";
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'
import SelfCostWarningBlock from "../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock";

const AbcAnalysisPage = () => {
  const { activeBrand, selectedRange: days } = useAppSelector(store => store.filters)
  const filters = useAppSelector(store => store.filters)
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  const { user, authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [dataAbcAnalysis, setDataAbcAnalysis] = useState([]);
  const [isNeedCost, setIsNeedCost] = useState([]);
  const [viewType, setViewType] = useState("proceeds");
  const [loading, setLoading] = useState(false);
  const [primaryCollect, setPrimaryCollect] = useState(null)
  const [shopStatus, setShopStatus] = useState(null)

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
      let data = null;
      if (user.subscription_status === null) {
        data = await mockGetAbcData(
          viewType,
          days
        );
      } else {
        data = await ServiceFunctions.getAbcData(
          viewType,
          authToken,
          days,
          activeBrand,
          filters
        );
      }

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
    setPrimaryCollect(activeBrand?.is_primary_collect)
    if (activeBrand?.is_primary_collect && viewType && days && authToken) {
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand.id.toString())
    }
  }, [activeBrand, viewType, days, filters]);
  //---------------------------------------------------------------------------------------//

  // 2.1.1 Проверям изменился ли магазин при обновлении токена

  useEffect(() => {
    if (activeBrand && activeBrand.is_primary_collect && activeBrand.is_primary_collect !== primaryCollect) {
      setPrimaryCollect(activeBrand.is_primary_collect)
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand.id.toString())
    }
  }, [authToken]);

  //for SelfCostWarning
  const handleUpdateAbcAnalysis = () => {
    setTimeout(() => {
      updateAbcAnalysisCaller();
    }, 3000);
  };

  const updateAbcAnalysisCaller = async () => {
    if (activeBrand !== undefined) {
      updateDataAbcAnalysis(viewType, days, activeBrand, authToken);
    }
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

  useEffect(() => {
    if (activeBrand && activeBrand.id === 0 && shops) {
        const allShop = {
            id: 0,
            brand_name: 'Все',
            is_active: shops.some(_ => _.is_primary_collect),
            is_valid: true,
            is_primary_collect: shops.some(_ => _.is_primary_collect),
            is_self_cost_set: !shops.some(_ => !_.is_self_cost_set)
        }
        setShopStatus(allShop)
    }

    if (activeBrand && activeBrand.id !== 0 && shops) {
        const currShop = shops.find(_ => _.id === activeBrand.id)
        setShopStatus(currShop)
    }
}, [activeBrand, shops, filters])





  if (user?.subscription_status === "expired") {
    return <NoSubscriptionPage title={"ABC-анализ"} />;
  }

  // if (!shops || shops.length === 0) {
  //   return null; // or a loading indicator
  // }

  return (
    // isVisible && (
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
          <Header title='ABC-анализ' />
        </div>
        {/* !header */}

        {/* DEMO BLOCK */}
        {user.subscription_status === null && <NoSubscriptionWarningBlock />}
        {/* SELF-COST WARNING */}
        {
          shopStatus &&
          !shopStatus.is_self_cost_set &&
          !loading &&
          <div>
            <SelfCostWarningBlock
              shopId={activeBrand.id}
              onUpdateDashboard={handleUpdateAbcAnalysis} //
            />
          </div>
        }

        <div>
          <Filters
            setLoading={setLoading}
          />
        </div>

        {shopStatus && shopStatus.is_primary_collect ? (
          <TableAbcData
            dataTable={dataAbcAnalysis}
            setDataTable={setDataAbcAnalysis}
            setViewType={setViewType}
            viewType={viewType}
            loading={loading}
          />
        ) : (
          <div style={{ marginTop: '20px' }}>
            <DataCollectionNotification
              title={"Ваши данные еще формируются и обрабатываются."}
            />
          </div>
        )}
      </section>
      {/* ---------------------- */}
    </main>
    // <div className='dashboard-page'>
    //   <MobilePlug />
    // <SideNav />
    //   <div className='dashboard-content pb-3' style={{ padding: '0 20px 0 50px'}}>

    //       {/* <BottomNavigation /> */}
    //   </div>
    // </div>
    // )
  );
};


export default AbcAnalysisPage;
