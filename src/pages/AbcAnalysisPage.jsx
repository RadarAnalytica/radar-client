import { useContext, useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import AbcAnalysisFilter from "../components/AbcAnalysisFilter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AuthContext from "../service/AuthContext";
import { fetchShops } from "../redux/shops/shopsActions";
import NoSubscriptionPage from "../pages/NoSubscriptionPage";
import { ServiceFunctions } from "../service/serviceFunctions";
import TableAbcData from "../components/TableAbcData";
import SelfCostWarning from "../components/SelfCostWarning";
import DataCollectionNotification from "../components/DataCollectionNotification";

const AbcAnalysisPage = () => {
  const [days, setDays] = useState({ period: 30 });
  const { user, authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [dataAbcAnalysis, setDataAbcAnalysis] = useState([]);
  const [isNeedCost, setIsNeedCost] = useState([]);
  const [viewType, setViewType] = useState("proceeds");
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  const [activeBrand, setActiveBrand] = useState(null);
  const [loading, setLoading] = useState(false);

 
      
 
  // ------- Фетч массива магазинов -------------//
  const fetchShopData = async () => {
    setLoading(true)
    try {
      dispatch(fetchShops(authToken));
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };
  //---------------------------------------------//


  // 0. Получаем данные магазинов
  useEffect(() => {
    fetchShopData();
  }, []);
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
          setActiveBrand(shops.find(_ => _.id === id))
          // Если нет, то...
        } else {
          // ...Обновляем локал - сохраняем туда первый из списка
          localStorage.setItem('activeShop', JSON.stringify(shops[0]))
          // ...устанавливаем текущим первый из списка
          setActiveBrand(shops[0])
        }
      } else {
        // ...Обновляем локал - сохраняем туда первый из списка
        localStorage.setItem('activeShop', JSON.stringify(shops[0]))
        // ...устанавливаем текущим первый из списка
        setActiveBrand(shops[0])
      }
    }

    if (shops && activeBrand && !activeBrand.is_primary_collect) {
      const currentShop = shops.find(shop => shop.id === activeBrand.id)
      if (currentShop?.is_primary_collect) {
        setActiveBrand(currentShop)
      }
    }
  }, [shops])


   // 2.1 Получаем данные по выбранному магазину и проверяем себестоимость
  // 2.2 Если магазин в стадии сбора данных (is_primary_collect = false) запускаем 30 секундный интервал через который запрашиваем магазины снова. результат обрабатываем в п 1.2
  useEffect(() => {
    activeBrand && localStorage.setItem('activeShop', JSON.stringify(activeBrand))
    let interval;
    if (activeBrand?.is_primary_collect) {
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand.id)
    } else {
      interval = setInterval(() => {fetchShopData()}, 30000)
    }

    return () => {interval && clearInterval(interval)}
  }, [activeBrand, viewType, days]);
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
      dispatch(fetchShops(authToken));
      updateDataAbcAnalysis(viewType, authToken, days, activeBrand);
    }, timeToTarget);

    return () => {
      clearTimeout(intervalId);
    };
  }, [dispatch, viewType, authToken, days, activeBrand]);

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
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (user?.subscription_status === "expired") {
    return <NoSubscriptionPage title={"ABC-анализ"} />;
  }

  if (!shops || shops.length === 0) {
    return null; // or a loading indicator
  }

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

          {shops && activeBrand &&
          <div className='d-flex gap-3 container dash-container' style={{ marginTop: '20px', marginLeft: '0'}}>
            <AbcAnalysisFilter
              shops={shops} // магазины
              setActiveBrand={setActiveBrand} // сеттер id магазина
              setSelectedRange={setDays} // сеттер периода (пробрасывается дальше в селект периода)
              selectedRange={days} // выбранный период (пробрасывается дальше в селект периода)
              activeBrand={activeBrand} // выбранный id магазина
            />
          </div>}
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
