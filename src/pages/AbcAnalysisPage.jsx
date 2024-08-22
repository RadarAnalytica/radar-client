import { useContext, useState, useEffect, useRef } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import AbcAnalysisFilter from "../components/AbcAnalysisFilter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AuthContext from "../service/AuthContext";
import { fetchShops } from "../redux/shops/shopsActions";

import { ServiceFunctions } from "../service/serviceFunctions";
import { abcAnalysis } from "../service/utils";
import TableAbcData from "../components/TableAbcData";

const AbcAnalysisPage = () => {
  const [days, setDays] = useState(30);
  const { authToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const authTokenRef = useRef(authToken);
  const [dataAbcAnalysis, setDataAbcAnalysis] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [changeBrand, setChangeBrand] = useState();
  const [primary, setPrimary] = useState();
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  // const [dataTable, setDataTable] = useState();

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

  const allShop = shops?.some((item) => item?.is_primary_collect === true);
  const oneShop = shops?.filter((item) => item?.id == activeBrand)[0];

  const plugForAllStores = {
    id: 0,
    brand_name: "Все",
    is_active: true,
    is_primary_collect: allShop,
    is_valid: true,
  };

  // const shouldDisplay = activeShop
  //   ? activeShop.is_primary_collect
  //   : oneShop
  //   ? oneShop.is_primary_collect
  //   : allShop;

  useEffect(() => {
    let intervalId = null;

    if (
      oneShop?.is_primary_collect &&
      oneShop?.is_primary_collect === allShop
    ) {
      const currentShop = shops?.find((item) => item.id == activeShopId);
      if (currentShop) {
        localStorage.setItem("activeShop", JSON.stringify(currentShop));
      }
      updateDataAbcAnalysis(days, activeBrand, authToken);
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
    dispatch(fetchShops(authToken));
  }, [dispatch]);

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

  // const navigate = useNavigate();

  useEffect(() => {
    if (activeBrand !== undefined && authToken !== authTokenRef.current) {
      updateDataAbcAnalysis(days, activeBrand, authToken);
    }
  }, [days, activeBrand]);

  const updateDataAbcAnalysis = async (days, activeBrand, authToken) => {
    setLoading(true);
    try {
      const data = await ServiceFunctions.getAbcData(
        authToken,
        days,
        activeBrand
      );
      if (data && data.length > 0) {
        setDataAbcAnalysis(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  };

  const totalAbcData = dataAbcAnalysis?.map((el) => {
    return {
      title: el?.title,
      wb_id: el?.wb_id,
      supplier_id: el?.supplier_id,
      amount: el?.amount,
    };
  });

  const [dataTable, setDataTable] = useState(totalAbcData);
  return (
    isVisible && (
      <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
          <TopNav title={"ABC-анализ"} />
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
          <TableAbcData
            dataTable={dataAbcAnalysis}
            setDataTable={setDataAbcAnalysis}
          />
        </div>
      </div>
    )
  );
};

export default AbcAnalysisPage;
