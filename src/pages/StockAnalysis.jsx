import React, { useContext, useEffect, useState, useRef } from "react";
import styles from './StockAnalysis.module.css'
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import StockAnalysisFilter from "../components/StockAnalysisFilter";
import TableStock from "../components/TableStock";
import SearchButton from "../assets/searchstock.svg";
import StockCostPrice from "../assets/stockcostprice.svg";
//import DownloadFile from "../assets/downloadxlfile.svg";
import {
  getFileClickHandler,
  saveFileClickHandler,
} from "../service/getSaveFile";
import AuthContext from "../service/AuthContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchShops } from "../redux/shops/shopsActions";
import DragDropFile from "../components/DragAndDropFiles";
import Modal from "react-bootstrap/Modal";
import { fetchStockAnalysisData } from "../redux/stockAnalysis/stockAnalysisDataActions";
import { ServiceFunctions } from "../service/serviceFunctions";
import DownloadButton from "../components/DownloadButton";
import NoSubscriptionPage from "./NoSubscriptionPage";
import SelfCostWarning from "../components/SelfCostWarning";
import DataCollectionNotification from "../components/DataCollectionNotification";
import { useNavigate } from "react-router-dom";
import { URL } from "../service/config";
import { fileDownload } from "../service/utils";
import { Filters } from "../components/sharedComponents/apiServicePagesFiltersComponent";
import MobilePlug from "../components/sharedComponents/mobilePlug/mobilePlug";
import Header from '../components/sharedComponents/header/header'
import SelfCostWarningBlock from "../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock";
import Sidebar from "../components/sharedComponents/sidebar/sidebar";
import {mockGetAnalysisData} from '../service/mockServiceFunctions'


const StockAnalysis = () => {
  // база
  // const dispatch = useAppDispatch();
  const { user, authToken } = useContext(AuthContext);
  // const shops = useAppSelector((state) => state.shopsSlice.shops); // магазины
  const { activeBrand, selectedRange } = useAppSelector(store => store.filters)

  // стейты
  const [file, setFile] = useState(); // это видимо загрузка файла себестоимости
  const [stockAnalysisData, setStockAnalysisData] = useState(); // это видимо данные для таблицы
  const [loading, setLoading] = useState(true); // лоадер для загрузки данных
  const [dataTable, setDataTable] = useState(); // это отфильтрованная дата (если используется поиск)
  const [costPriceShow, setCostPriceShow] = useState(false); // хз что это
  const [searchQuery, setSearchQuery] = useState(""); // стейт инпута поиска
  const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false); // стейт инпута поиска
  // рефы (используются для сохранения пред значений)
  const prevDays = useRef(selectedRange);
  const prevActiveBrand = useRef(activeBrand ? activeBrand.id : null);




  // 2.1 Получаем данные по выбранному магазину и проверяем себестоимость
  useEffect(() => {
    const fetchAnalysisData = async () => {
      setLoading(true);
      if (activeBrand) {
        let data = null;
        if (user.subscription_status === null) {
          data = await mockGetAnalysisData();
        } else {
          // updateDataAbcAnalysis(viewType, days, activeBrand, authToken);
          data = await ServiceFunctions.getAnalysisData(
            authToken,
            selectedRange,
            activeBrand.id
          );
        }
        setStockAnalysisData(data);
        setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null))

      }
      prevDays.current = selectedRange;
      prevActiveBrand.current = activeBrand.id;


      setLoading(false);
    };
    if (activeBrand?.is_primary_collect) {
      fetchAnalysisData();
    }
  }, [selectedRange, activeBrand, authToken]);
  //---------------------------------------------------------------------------------------//




  // ----------------------------- пока хз что это ----------------------------------------//
  const handleCostPriceShow = () => {
    setCostPriceShow(true);
  };

  const handleCostPriceClose = () => setCostPriceShow(false);
  //----------------------------------------------------------------------------------------//





  // ---------------- видимо это фильтрация на основе поиска ---------------//
  const handleSearchChange = (e) => {// хэндлер поискового инпута
    setSearchQuery(e.target.value);
  };


  const filterData = (data, query) => {
    if (!query) return data;
    return data.filter(
      (item) =>
        item?.sku?.toLowerCase().includes(query.toLowerCase()) ||
        item?.vendorСode?.toLowerCase().includes(query.toLowerCase()) ||
        item?.productName?.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    const filteredData = filterData(stockAnalysisData, searchQuery);
    setDataTable(filteredData);
  }, [stockAnalysisData, searchQuery]);
  // -----------------------------------------------------------------------//

  // ------------------------ это апдейт данных если себестоимость отсутствует --------------------//
  const handleUpdateDashboard = () => {
    setTimeout(() => {
      updateDataDashBoardCaller();
    }, 3000);
  };

  const updateDataDashBoardCaller = async () => {
    activeBrand !== undefined &&
      updateDataDashBoard(selectedRange, activeBrand.id, authToken);
  };

  const updateDataDashBoard = async (selectedRange, activeBrand, authToken) => {
    setLoading(true);
    try {
      const data = await ServiceFunctions.getDashBoard(
        authToken,
        selectedRange,
        activeBrand.id
      );
      setStockAnalysisData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  // ---------------------------------------------------------------------------------------//




  // --------------------------- ниче не загружаем если нет магазов (переписать бы по человечески) ---------------------//
  // if (!shops || shops.length === 0) {
  //   return null; // or a loading indicator
  // }
  // -------------------------------------------------------------------------------------------------------------------//



  //------ загрузка эксельки---------------//
  const getProdAnalyticXlsxHandler = async () => {
    const fileBlob = await ServiceFunctions.getProdAnalyticXlsx(
      authToken,
      selectedRange,
      activeBrand.id
    );
    fileDownload(fileBlob, "Товарная_аналитика.xlsx");
  };
  // ---------------------------------------//

  return (
    <>
      <div className="dashboard-page">
        <MobilePlug />
        <div style={{ height: '100vh' }}>
          <Sidebar />
        </div>
        <div className="dashboard-content" style={{ paddingBottom: '16px', paddingTop: '30px' }}>
          <div className="d-flex flex-column overflow-hidden gap-4" style={{ paddingLeft: '52px', justifyContent: 'stretch', overflow: 'auto' }}>
            <div style={{ paddingRight: '52px' }}>
              <Header title={"Товарная аналитика"} />
              {/* <TopNav title={"Товарная аналитика"} mikeStarinaStaticProp /> */}
            </div>
            {
              !hasSelfCostPrice && activeBrand && activeBrand.id !== 0 && !loading ? (
                <div style={{ width: '100%', paddingRight: '52px' }}>
                  <SelfCostWarningBlock
                    shopId={activeBrand.id}
                    onUpdateDashboard={handleUpdateDashboard}
                  />
                  {/* <SelfCostWarning
                    activeBrand={activeBrand.id}
                    onUpdateDashboard={handleUpdateDashboard}
                  /> */}
                </div>
              ) : null}


            <Filters
              setLoading={setLoading}
            />

            {activeBrand && activeBrand.is_primary_collect && (
              <>
                {/* <div className="input-and-button-container container dash-container d-flex flex-wrap justify-content-between align-items-center mt-3 mb-3" style={{ paddingRight: '52px'}}> */}
                <div className={styles.page__searchContainer}>
                  <div className={styles.page__inputWrapper}>
                    <input
                      type="text"
                      placeholder="Поиск по названию, SKU или артикулу"
                      className={styles.page__searchInput}
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button
                      className={styles.page__secButton}
                      onClick={() =>
                        setDataTable(
                          filterData(stockAnalysisData, searchQuery)
                        )
                      }
                    >
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9.60353C1.5 5.25398 5.02601 1.72797 9.37556 1.72797C13.7251 1.72797 17.2511 5.25398 17.2511 9.60353C17.2511 13.9531 13.7251 17.4791 9.37556 17.4791C5.02601 17.4791 1.5 13.9531 1.5 9.60353ZM9.37556 0.227966C4.19758 0.227966 0 4.42555 0 9.60353C0 14.7815 4.19758 18.9791 9.37556 18.9791C11.6946 18.9791 13.8169 18.1371 15.4537 16.7423L19.4834 20.772L20.5441 19.7114L16.5143 15.6816C17.9092 14.0449 18.7511 11.9225 18.7511 9.60353C18.7511 4.42555 14.5535 0.227966 9.37556 0.227966Z" fill="#5329FF" />
                      </svg>
                      Найти
                    </button>
                  </div>

                  <div className={styles.page__controlsWrapper}>
                    <button className={styles.page__secButton} onClick={handleCostPriceShow}>
                      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18.5C4.0293 18.5 0 14.4707 0 9.5C0 4.5293 4.0293 0.5 9 0.5C13.9707 0.5 18 4.5293 18 9.5C18 14.4707 13.9707 18.5 9 18.5ZM9 16.7C10.9096 16.7 12.7409 15.9414 14.0912 14.5912C15.4414 13.2409 16.2 11.4096 16.2 9.5C16.2 7.59044 15.4414 5.75909 14.0912 4.40883C12.7409 3.05857 10.9096 2.3 9 2.3C7.09044 2.3 5.25909 3.05857 3.90883 4.40883C2.55857 5.75909 1.8 7.59044 1.8 9.5C1.8 11.4096 2.55857 13.2409 3.90883 14.5912C5.25909 15.9414 7.09044 16.7 9 16.7ZM9 5.045L13.455 9.5L9 13.955L4.545 9.5L9 5.045ZM9 7.5911L7.0911 9.5L9 11.4089L10.9089 9.5L9 7.5911Z" fill="#5329FF" />
                      </svg>

                      Установить себестоимость
                    </button>
                    <DownloadButton
                      handleDownload={() => getProdAnalyticXlsxHandler()}
                      styles={styles.page__primeButton}
                    />
                  </div>
                </div>

                {/* <div style={{ height: "20px" }}></div> */}
                <div style={{ overflow: 'hidden' }}>
                  <TableStock
                    data={dataTable}
                    setDataTable={setDataTable}
                    loading={loading}
                  />
                </div>
              </>
            )}
            {activeBrand && !activeBrand.is_primary_collect &&
              (
                <div style={{ marginTop: '20px', paddingRight: '52px' }}>
                  <DataCollectionNotification
                    title={"Ваши данные еще формируются и обрабатываются."}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
      {/* Modal for Cost Price */}
      <Modal
        show={costPriceShow}
        onHide={handleCostPriceClose}
        className="add-token-modal"
      >
        <Modal.Header closeButton>
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: "100%" }}>
              <div className="d-flex justify-content-between">
                <h4 className="fw-bold mb-0">Установка себестоимости товара</h4>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {file ? (
            <div>
              <div className="d-flex align-items-center justify-content-between w-100 mt-2 gap-2">
                <div className="d-flex gap-2">
                  <svg
                    width="17"
                    height="23"
                    viewBox="0 0 17 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 21.75H3C1.75736 21.75 0.75 20.7426 0.75 19.5V3.5C0.75 2.25736 1.75736 1.25 3 1.25H10.8588L16.25 6.32405V19.5C16.25 20.7426 15.2426 21.75 14 21.75Z"
                      stroke="black"
                      strokeOpacity="0.5"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span>{file ? file.name : ""}</span>
                </div>
                <div>
                  <a
                    href="#"
                    className="link"
                    onClick={() => setFile(null)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    Удалить
                  </a>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 mt-2 gap-2">
                <button
                  onClick={() => {
                    saveFileClickHandler(file, authToken, activeBrand.id);
                    setFile(null);
                    handleCostPriceClose();
                  }}
                  className="prime-btn"
                  style={{ height: "52px" }}
                >
                  Сохранить
                </button>
              </div>
              <div className="d-flex justify-content-center w-100 mt-2 gap-2">
                <a href="#" className="link" onClick={handleCostPriceClose}>
                  Отмена
                </a>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-around w-100">
              <DragDropFile files={file} setFiles={setFile} />
              <div className="d-flex justify-content-center w-100 mt-2 gap-2">
                <a
                  href="#"
                  className="link"
                  onClick={() => getFileClickHandler(authToken, activeBrand.id)}
                >
                  Скачать шаблон
                </a>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StockAnalysis;
