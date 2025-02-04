import React, { useContext, useEffect, useState, useRef } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import StockAnalysisFilter from '../components/StockAnalysisFilter';
import TableStock from '../components/TableStock';
import SearchButton from '../assets/searchstock.svg';
import StockCostPrice from '../assets/stockcostprice.svg';
import DownloadFile from '../assets/downloadxlfile.svg';
import {
  getFileClickHandler,
  saveFileClickHandler,
} from '../service/getSaveFile';
import AuthContext from '../service/AuthContext';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchShops } from '../redux/shops/shopsActions';
import DragDropFile from '../components/DragAndDropFiles';
import Modal from 'react-bootstrap/Modal';
import { fetchStockAnalysisData } from '../redux/stockAnalysis/stockAnalysisDataActions';
import { ServiceFunctions } from "../service/serviceFunctions";
import DownloadButton from '../components/DownloadButton';
import NoSubscriptionPage from "./NoSubscriptionPage";
import SelfCostWarning from "../components/SelfCostWarning";
import DataCollectionNotification from "../components/DataCollectionNotification";
import { useNavigate } from "react-router-dom";
import { URL } from '../service/config';

const StockAnalysis = () => {
  const navigate = useNavigate();
  const stockAnalysisData = useAppSelector(
    (state) => state.stockAnalysisDataSlice.stockAnalysisData
  );
  const dataStock = Array.isArray(stockAnalysisData) ? stockAnalysisData : [];
  const hasSelfCostPrice = dataStock.every(product => product.costPriceOne !== null);
  const dispatch = useAppDispatch();
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  const allShop = shops?.some((item) => item?.is_primary_collect === true);
  const storedActiveShop = localStorage.getItem('activeShop');
  const storedActiveShopObject = JSON.parse(storedActiveShop);

  let activeShop;
  
  const activeShopId = activeShop?.id;
  const idShopAsValue =
    activeShopId != undefined ? activeShopId : shops?.[0]?.id;
  const { user, authToken } = useContext(AuthContext);
  const [file, setFile] = useState();
  const [dataDashBoard, setDataDashboard] = useState();
  const [loading, setLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState(idShopAsValue);
  const oneShop = shops?.filter((item) => item?.id == activeBrand)[0];
  const [dataTable, setDataTable] = useState([]);
  const [costPriceShow, setCostPriceShow] = useState(false);
  const [days, setDays] = useState(30);
  const [searchQuery, setSearchQuery] = useState('');
  const prevDays = useRef(days);
  const prevActiveBrand = useRef(activeBrand);
  const authTokenRef = useRef(authToken);
  const handleCostPriceClose = () => setCostPriceShow(false);

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
  
  if (storedActiveShop && typeof storedActiveShop === 'string') {
    try {
      const controlValue = shops.filter(el => el.id === storedActiveShopObject.id).length
      if (shops.length > 0 && controlValue !== 1 && !!activeBrand && activeBrand !== '0') {
        localStorage.removeItem('activeShop')
        window.location.reload()
      }

      activeShop = storedActiveShopObject;
    } catch (error) {
      console.error('Error parsing storedActiveShop:', error);
      activeShop = null;
    }
  }

  const handleCostPriceShow = () => {
    setCostPriceShow(true);
  };

  const updateDataDashBoard = async (days, activeBrand, authToken) => {
    setLoading(true);
    try {
      const data = await ServiceFunctions.getDashBoard(
        authToken,
        days,
        activeBrand
      );
      setDataDashboard(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterData = (data, query) => {
    if (!query) return data;
    return data.filter(item =>
      item?.sku?.toLowerCase().includes(query.toLowerCase()) ||
      item?.vendorСode?.toLowerCase().includes(query.toLowerCase()) ||
      item?.productName?.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await dispatch(fetchShops(authToken));
        await dispatch(fetchStockAnalysisData({ authToken, days, activeBrand }));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const filteredData = filterData(stockAnalysisData, searchQuery);
    setDataTable(filteredData);
  }, [stockAnalysisData, searchQuery]);

  useEffect(() => {
    if (
      days !== prevDays.current ||
      activeBrand !== prevActiveBrand.current
    ) {
      if (activeBrand !== undefined) {
        dispatch(fetchStockAnalysisData({ authToken, days, activeBrand }));
      }
      prevDays.current = days;
      prevActiveBrand.current = activeBrand;
    }
  }, [days, activeBrand]);

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

  useEffect(() => {
    if (shops?.length === 0 && !isInitialLoading) {
      navigate("/onboarding");
    }
  }, [isInitialLoading, shops.length]);


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


  const handleUpdateDashboard = () => {
    setTimeout(() => {
      updateDataDashBoardCaller();
    }, 3000);
  };

  const updateDataDashBoardCaller = async () => {
    activeBrand !== undefined &&
      updateDataDashBoard(days, activeBrand, authToken);
  };

  if (user?.subscription_status === "expired") {
    return <NoSubscriptionPage title={"Товарная аналитика"} />;
  };

  if (!shops || shops.length === 0) {
    return null; // or a loading indicator
  };

  const getProdAnalyticXlsx = async (days, activeBrand, authToken) => { 
    fetch(`${URL}/api/prod_analytic/download?period=${days}&shop=${activeBrand}`,
      {
        method: 'GET',
        headers: {
          authorization: 'JWT ' + authToken,
        },
      }
    ).then((response) => {
      return response.blob();
    }).then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Товарная_аналитика.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }).catch((e) => console.error(e));
  };

  return (
    <>
      <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
          <TopNav title={'Товарная аналитика'} />
          {!isInitialLoading && !hasSelfCostPrice && activeShopId !== 0 && shouldDisplay ? (
            <SelfCostWarning
              activeBrand={activeBrand}
              onUpdateDashboard={handleUpdateDashboard}
            />
          ) : null}

          <div className='pt-0 d-flex gap-3'>
            <StockAnalysisFilter
              shops={shops}
              setActiveBrand={handleSaveActiveShop}
              setDays={setDays}
              activeShopId={activeShopId}
            />
          </div>

          {shouldDisplay ? (
            <>
              <div className='input-and-button-container container dash-container p-3 pb-4 pt-0 d-flex flex-wrap justify-content-between align-items-center'>
                <div className='search search-container'>
                  <div className='search-box'>
                    <input
                      type='text'
                      placeholder='Поиск по SKU или артикулу'
                      className='search-input'
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button className='search-box-btn'>
                      <img
                        onClick={() => setDataTable(filterData(stockAnalysisData, searchQuery))}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        src={SearchButton}
                        alt='search'
                      />
                    </button>
                  </div>
                </div>

                <div className='button-container d-flex gap-3'>
                  <div className='d-flex' style={{ gap: '20px', alignItems: 'center' }}>
                    <div className='button-container d-flex gap-3'>
                      <div>
                        <img
                          style={{ cursor: 'pointer' }}
                          onClick={handleCostPriceShow}
                          src={StockCostPrice}
                          alt=''
                        />
                      </div>
                      <div>
                        <DownloadButton
                          handleDownload={() => getProdAnalyticXlsx(days, activeBrand, authToken)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ height: '20px' }}></div>
              <TableStock dataTable={dataTable} setDataTable={setDataTable} />
            </>
          ) : (
            <DataCollectionNotification
              title={'Ваши данные еще формируются и обрабатываются.'}
            />
          )}
        </div>
      </div>

      {/* Modal for Cost Price */}
      <Modal
        show={costPriceShow}
        onHide={handleCostPriceClose}
        className='add-token-modal'
      >
        <Modal.Header closeButton>
          <div className='d-flex align-items-center gap-2'>
            <div style={{ width: '100%' }}>
              <div className='d-flex justify-content-between'>
                <h4 className='fw-bold mb-0'>Установка себестоимости товара</h4>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {file ? (
            <div>
              <div className='d-flex align-items-center justify-content-between w-100 mt-2 gap-2'>
                <div className='d-flex gap-2'>
                  <svg
                    width='17'
                    height='23'
                    viewBox='0 0 17 23'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M14 21.75H3C1.75736 21.75 0.75 20.7426 0.75 19.5V3.5C0.75 2.25736 1.75736 1.25 3 1.25H10.8588L16.25 6.32405V19.5C16.25 20.7426 15.2426 21.75 14 21.75Z'
                      stroke='black'
                      strokeOpacity='0.5'
                      strokeWidth='1.5'
                    />
                  </svg>
                  <span>{file ? file.name : ''}</span>
                </div>
                <div>
                  <a
                    href='#'
                    className='link'
                    onClick={() => setFile(null)}
                    style={{ color: 'red', cursor: 'pointer' }}
                  >
                    Удалить
                  </a>
                </div>
              </div>
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <button
                  onClick={() => {
                    saveFileClickHandler(file, authToken, activeBrand);
                    setFile(null);
                    handleCostPriceClose();
                  }}
                  className='prime-btn'
                  style={{ height: '52px' }}
                >
                  Сохранить
                </button>
              </div>
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <a href='#' className='link' onClick={handleCostPriceClose}>
                  Отмена
                </a>
              </div>
            </div>
          ) : (
            <div className='d-flex flex-column align-items-center justify-content-around w-100'>
              <DragDropFile files={file} setFiles={setFile} />
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <a
                  href='#'
                  className='link'
                  onClick={() => getFileClickHandler(authToken, activeBrand)}
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
