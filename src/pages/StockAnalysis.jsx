import React, { useContext, useEffect, useState, useRef } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import StockAnalysisFilter from "../components/StockAnalysisFilter";
import TableStock from "../components/TableStock";
import SearchButton from "../assets/searchstock.svg";
import StockCostPrice from "../assets/stockcostprice.svg";
import DownloadFile from "../assets/downloadxlfile.svg";
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


/**
 *  ***************** ИНСТРУКЦИЯ ********************
 *  1. При начальном рендере подтягиваем магазины и данные таблиц. 
 *  Видимо одновременно с этим подтягиваем данные сохраненного в local storage магазина и проверяем его.
 *  
 * 
 *  *************************************************
 */

const StockAnalysis = () => {
  // база
  const dispatch = useAppDispatch();
  const { authToken } = useContext(AuthContext);
  const shops = useAppSelector((state) => state.shopsSlice.shops); // магазины

  // стейты
  const [file, setFile] = useState(); // это видимо загрузка файла себестоимости
  const [stockAnalysisData, setStockAnalysisData] = useState([]); // это видимо данные для таблицы
  const [loading, setLoading] = useState(true); // лоадер для загрузки данных
  const [activeBrand, setActiveBrand] = useState(null); // стейт селекта магазина (выбранный магазин или "0")
  const [dataTable, setDataTable] = useState([]); // это отфильтрованная дата (если используется поиск)
  const [costPriceShow, setCostPriceShow] = useState(false); // хз что это
  const [selectedRange, setSelectedRange] = useState({ period: 30 }); // стейт селекта периода
  const [searchQuery, setSearchQuery] = useState(""); // стейт инпута поиска
  const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false); // стейт инпута поиска
  // рефы (используются для сохранения пред значений)
  const prevDays = useRef(selectedRange);
  const prevActiveBrand = useRef(activeBrand ? activeBrand.id : null);





  // ------------------------ здесь будет апдейт логики ---------------------------------//
  // 0. Получаем данные магазинов
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        dispatch(fetchShops(authToken));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);
  // ------


  // 1. - проверяем магазин в локал сторадже
  useEffect(() => {
    if (shops) {
      // достаем сохраненный магазин
      const shopFromLocalStorage = localStorage.getItem('activeShop')
      // если сохранненный магазин существует и у нас есть массив магазинов....
      if (shopFromLocalStorage && shopFromLocalStorage !== 'undefined') {
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
          console.log(shops[0])
          // ...устанавливаем текущим первый из списка
          setActiveBrand(shops[0])
        }
      } else {
        // ...Обновляем локал - сохраняем туда первый из списка
        localStorage.setItem('activeShop', JSON.stringify(shops[0]))
        console.log(shops[0])
        // ...устанавливаем текущим первый из списка
        setActiveBrand(shops[0])
      }
    }
  }, [shops])


  // 2. Обновляем данные при изменении периода или выбранного магазина
  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (
        selectedRange !== prevDays.current ||
        activeBrand.id !== prevActiveBrand.current
      ) {
        if (activeBrand) {
          setLoading(true);
          const data = await ServiceFunctions.getAnalysisData(
            authToken,
            selectedRange,
            activeBrand.id
          );
          setStockAnalysisData(data);
          setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null))
          setLoading(false);
        }
        prevDays.current = selectedRange;
        prevActiveBrand.current = activeBrand.id;
      }
    };
    if (activeBrand) {
      fetchAnalysisData();
    }

  }, [selectedRange, activeBrand]);



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
      setDataDashboard(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  // ---------------------------------------------------------------------------------------//

  // --------------------------- ниче не загружаем если нет магазов (переписать бы по человечески) ---------------------//
  if (!shops || shops.length === 0) {
    return null; // or a loading indicator
  }
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
        <SideNav />
        <div className="dashboard-content">
          <div className="h-100 d-flex flex-column overflow-hidden">
            <TopNav title={"Товарная аналитика"} />
            {
              !hasSelfCostPrice && activeBrand && activeBrand.id !== 0 && !loading? (
                <SelfCostWarning
                  activeBrand={activeBrand.id}
                  onUpdateDashboard={handleUpdateDashboard}
                />
              ) : null}

            <div className="pt-0 d-flex gap-3">
              {shops && activeBrand &&
                <StockAnalysisFilter
                  shops={shops} // магазины
                  setActiveBrand={setActiveBrand} // сеттер id магазина
                  setSelectedRange={setSelectedRange} // сеттер периода (пробрасывается дальше в селект периода)
                  selectedRange={selectedRange} // выбранный период (пробрасывается дальше в селект периода)
                  activeBrand={activeBrand} // выбранный id магазина
                />
              }
            </div>

            {activeBrand && activeBrand.is_primary_collect && !loading && (
              <>
                <div className="input-and-button-container container dash-container p-3 pb-4 pt-0 d-flex flex-wrap justify-content-between align-items-center">
                  <div className="search search-container">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Поиск по названию, SKU или артикулу"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <button className="search-box-btn">
                        <img
                          onClick={() =>
                            setDataTable(
                              filterData(stockAnalysisData, searchQuery)
                            )
                          }
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                          src={SearchButton}
                          alt="search"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="button-container d-flex gap-3">
                    <div
                      className="d-flex"
                      style={{ gap: "20px", alignItems: "center" }}
                    >
                      <div className="button-container d-flex gap-3">
                        <div>
                          <img
                            style={{ cursor: "pointer" }}
                            onClick={handleCostPriceShow}
                            src={StockCostPrice}
                            alt=""
                          />
                        </div>
                        <div>
                          <DownloadButton
                            handleDownload={() => getProdAnalyticXlsxHandler()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ height: "20px" }}></div>
                <div className="flex-grow-1">
                  <TableStock
                    data={dataTable}
                    setDataTable={setDataTable}
                    loading={loading}
                  />
                </div>
              </>
            )}
            {activeBrand && !activeBrand.is_primary_collect && !loading &&
            (
              <DataCollectionNotification
                title={"Ваши данные еще формируются и обрабатываются."}
              />
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
