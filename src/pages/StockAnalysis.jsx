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
import { shops } from '../redux/shops/shopsActions';
import DragDropFile from '../components/DragAndDropFiles';
import Modal from 'react-bootstrap/Modal';

const StockAnalysis = () => {
  const data = [
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
      barCode: 52648,
      sku: 12345,
      size: 'XL',
      category: 'Разное',
      saleSum: 55428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2562,
      commissionWB: 5743,
      fines: 2562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25365,
      marginalProfit: 9322,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 25,
      orderQuantity: 25,
      orderSum: 25,
      purchased: 45,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6,
    },
    {
      productName: 'Крем для рук',
      brandName: 'Бренд 1',
      vendorСode: 1235,
      barCode: 62648,
      sku: 12375,
      size: 'XL',
      category: 'Разное',
      saleSum: 25428,
      quantity: 231,
      lessReturns: 77684,
      costGoodsSold: 569,
      returnsSum: 16842,
      returnsQuantity: 32,
      returnsCostSold: 56848,
      costPriceOne: 120,
      costOfProductStockToday: 4562,
      toClient: 1458,
      fromClient: 3244,
      commissionWB: 7896,
      fines: 6658,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25365,
      marginalProfit: 7322,
      averageProfit: 5687,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 452,
      byProfit: 1252,
      basic: 536,
      maxDiscount: 60,
      minDiscountPrice: 23,
      orderQuantity: 12,
      orderSum: 45,
      purchased: 75,
      notPurchased: 12,
      purchasedPrecent: 25,
      completed: 102,
      orderCountDay: 2,
      slaeCountDay: 7,
      dataRadar: 55,
      dataWB: 8,
    },
    {
      productName: 'Вентилятор',
      brandName: 'Бренд 3',
      vendorСode: 523,
      barCode: 7896,
      sku: 3345,
      size: 'M',
      category: 'Бытовая',
      saleSum: 54428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2862,
      commissionWB: 7743,
      fines: 3562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25865,
      marginalProfit: 9342,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 15,
      orderQuantity: 27,
      orderSum: 23,
      purchased: 44,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6,
    },
  ];
  const { user, authToken } = useContext(AuthContext);
  const [file, setFile] = useState();

  const dispatch = useAppDispatch();
  const shop = useAppSelector((state) => state.shopsSlice.shops);

  const [activeBrand, setActiveBrand] = useState('0');
  const [dataTable, setDataTable] = useState(data);
  const [costPriceShow, setCostPriceShow] = useState(false);
  const handleCostPriceClose = () => setCostPriceShow(false);

  const handleCostPriceShow = () => {
    setCostPriceShow(true);
  };

  useEffect(() => {
    dispatch(shops(authToken));
  }, [dispatch]);

  console.log(shop, 'shop');

  return (
    <>
      <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
          <TopNav title={'Товарная аналитика'} />
          <div className=' pt-0 d-flex gap-3'>
            <StockAnalysisFilter shop={shop} setActiveBrand={setActiveBrand} />
          </div>
          <div className='container dash-container search'>
            <input
              type='text'
              placeholder='Поиск по SKU или артикулу'
              className='container dash-container search-input'
            />
            <div>
              <img
                style={{ marginLeft: '10px', cursor: 'pointer' }}
                src={SearchButton}
                alt=''
              />
            </div>
            <div
              className='d-flex'
              style={{ gap: '20px', alignItems: 'center', marginLeft: '12vw' }}
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
                <img
                  style={{ cursor: 'pointer' }}
                  onClick={() => getFileClickHandler(authToken, activeBrand)}
                  src={DownloadFile}
                  alt=''
                />
              </div>
            </div>
          </div>
          <TableStock dataTable={dataTable} setDataTable={setDataTable} />
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
            <div>
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
