import React, { useContext, useEffect, useState } from 'react';
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
import {fetchStockAnalysisData} from '../redux/stockAnalysis/stockAnalysisDataActions';
import { ServiceFunctions } from "../service/serviceFunctions";
import DownloadButton from '../components/DownloadButton';
import NoSubscriptionPage from "./NoSubscriptionPage";
import SelfCostWarning from "../components/SelfCostWarning";
import DataCollectionNotification from "../components/DataCollectionNotification";
import { useNavigate } from "react-router-dom";

const StockAnalysis = () => {
  const navigate = useNavigate();
  const stockAnalysisData = useAppSelector(
    (state) => state.stockAnalysisDataSlice.stockAnalysisData
  );
  const dispatch = useAppDispatch();
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  const allShop = shops?.some((item) => item?.is_primary_collect === true);
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
    dispatch(fetchShops(authToken)).then(() => {
      setIsInitialLoading(false);
    });
    dispatch(fetchStockAnalysisData({ authToken, days, activeBrand }));
  }, [dispatch]);

  useEffect(() => {
    const filteredData = filterData(stockAnalysisData, searchQuery);
    setDataTable(filteredData);
  }, [stockAnalysisData, searchQuery]);

  useEffect(() => {
    dispatch(fetchStockAnalysisData({ authToken, days, activeBrand }));
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
    if (shops?.length === 0 && !isInitialLoading ) {
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

  return (
    <>
      <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
          <TopNav title={'Товарная аналитика'} />
          {!isInitialLoading &&
          !dataDashBoard?.costPriceAmount &&
          activeShopId !== 0 &&
          shouldDisplay ? (
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
              <div className='input-and-button-container container dash-container'>
                <div className='search'>
                  <div className='search-box'>
                    <input
                      type='text'
                      placeholder='Поиск по SKU или артикулу'
                      className='container dash-container search-input'
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button className='search-box-btn'>
                      <img
                        onClick={() =>
                          setDataTable(
                            filterData(stockAnalysisData, searchQuery)
                          )
                        }
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        src={SearchButton}
                        alt='search'
                      />
                    </button>
                  </div>
                </div>
                <>
                  <div
                    className='d-flex'
                    style={{
                      gap: '20px',
                      alignItems: 'center',
                    }}
                  >
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
                        handleDownload={() =>
                          getFileClickHandler(authToken, activeBrand)
                        }
                      />
                    </div>
                  </div>
                </>
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
                      stroke-opacity='0.5'
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
              {/* <div className="file-block d-flex flex-column align-items-center justify-content-around w-100 mt-2 gap-2">
                            <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 11C17.5147 11 15.5 13.0147 15.5 15.5V16C15.5 18.4853 17.5147 20.5 20 20.5C22.4853 20.5 24.5 18.4853 24.5 16V15.5C24.5 13.0147 22.4853 11 20 11Z" fill="#5329FF" />
                                <path d="M11.5 47H53.5C58.4706 47 62.5 42.9706 62.5 38V30L47.8422 21.4198C44.3822 19.3944 39.9996 19.902 37.0941 22.6647L26.75 32.5L11.5 47Z" fill="#5329FF" />
                                <path d="M11.5 47H53.5C58.4706 47 62.5 42.9706 62.5 38V30M11.5 47H10C5.30558 47 1.5 43.1944 1.5 38.5V38.5M11.5 47L26.75 32.5M62.5 30V10C62.5 5.02944 58.4706 1 53.5 1H10.5C5.52944 1 1.5 5.02944 1.5 10V38.5M62.5 30L47.8422 21.4198C44.3822 19.3944 39.9996 19.902 37.0941 22.6647L26.75 32.5M26.75 32.5L21.1388 29.258C17.7739 27.3138 13.5411 27.749 10.6422 30.3373L1.5 38.5M24.5 15.5V16C24.5 18.4853 22.4853 20.5 20 20.5V20.5C17.5147 20.5 15.5 18.4853 15.5 16V15.5C15.5 13.0147 17.5147 11 20 11V11C22.4853 11 24.5 13.0147 24.5 15.5Z" stroke="#5329FF" strokeWidth="1.5" />
                            </svg>
                            <h5 className='fw-bold'>Перетащите файл сюда</h5>
                            <span className='clue-text'>или нажмите на кнопку</span>
                            <button className='prime-btn' style={{ padding: '16px 20px' }}
                                onClick={() => setShowDelete(false)}>
                                Выбрать файл
                            </button>
                        </div> */}
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
