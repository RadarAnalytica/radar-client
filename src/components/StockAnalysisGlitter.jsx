import React, { useState, useEffect, useContext, useRef } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
// import product from '../pages/images/product.svg';
import glitterStar from '../pages/images/glitterstar.svg';
import glityellow from '../pages/images/glityellow.svg';
import glitFile from '../pages/images/glitfile.svg';
import StockAnalysisGlitterFilter from './StockAnalysisGlitterFilter';
import Product from './TabContent/Product';
import CategoryMonitoring from './TabContent/CategoryMonitoring';
import RequestMonitoring from './TabContent/RequestMonitoring';
import Summary from './TabContent/Summary';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { fetchStockAnalysisData } from '../redux/stockAnalysis/stockAnalysisDataActions';
import AuthContext from '../service/AuthContext';

const StockAnalysisGlitter = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { authToken } = useContext(AuthContext);
    const shops = useAppSelector((state) => state.shopsSlice.shops);

    const [activeTab, setActiveTab] = useState('summary');
    const [days, setDays] = useState(30);
    const prevDays = useRef(days);
    const [productData, setProductData] = useState({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const productId = id;

    const linkToWb = `https://www.wildberries.ru/catalog/${productId}/detail.aspx`;

    const productBySku = Array.isArray(productData)
      ? productData.find((item) => item.sku === id)
      : null;
  
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
    const [activeBrand, setActiveBrand] = useState(idShopAsValue);


    function TabContent() {
        switch (activeTab) {
          case 'summary':
            return (
              <Summary
                days={days}
                productBySku={productBySku}
                isInitialLoading={isInitialLoading}
              />
            );
          case 'product':
            return (
              <Product
                productBySku={productBySku}
              />
            );
          case 'categoryMonitoring':
            return <CategoryMonitoring />;
          case 'requestMonitoring':
            return <RequestMonitoring />;
          default:
            return ''; // Компонент по умолчанию, если ни одна вкладка не выбрана
        }
      };

      useEffect(() => {
        dispatch(fetchStockAnalysisData({ authToken, days, activeBrand })).then(
          (response) => {
            if (response.payload) {
              setProductData(response.payload);
              setIsInitialLoading(false);
            }
          }
        );
      }, []);
    
      useEffect(() => {
        if (days !== prevDays.current) {
          setIsInitialLoading(true);
          dispatch(fetchStockAnalysisData({ authToken, days, activeBrand })).then(
            (response) => {
              if (response.payload) {
                setProductData(response.payload);
                setIsInitialLoading(false);
              }
            }
          );
        };
        prevDays.current = days;
      }, [days]);


    return (
        <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
          <TopNav title={'Товарная аналитика'} />
          <div
            className='container dash-container pt-0 d-flex gap-3'
            style={{ justifyContent: 'space-between', marginBottom: '9px' }}
          >
            <div className='productInfo-price-photo'>
              {isInitialLoading && (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                >
                  <span className='loader'></span>
                </div>
              )}
              {!isInitialLoading && (
                <>
                  <div className='productInfo-price-photo-photo'>
                  <img 
                      src={productBySku?.photo} 
                      alt='product image'
                      onError={(e) => {
                        e.target.style.backgroundColor = '#D3D3D3';
                        e.target.alt = '';
                        e.target.src =
                          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
                      }}
                    />
                  </div>
                  <div className='productInfo-price-photo-price'>
                    <p
                      style={{
                        color: '#8C8C8C',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '0',
                      }}
                    >
                      Цена
                    </p>
                    <span style={{ fontSize: '24px', fontWeight: '700' }}>
                      {productBySku?.basic} ₽
                    </span>
                  </div>
                </>
              )}
            </div>
  
            <div
             className='productInfo-wbInfo'
            >
              {isInitialLoading && (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                >
                  <span className='loader'></span>
                </div>
              )}
              {!isInitialLoading && (
                <>
                  <div className='d-flex'>
                    <span className='productInfo-wbInfo-rating'>
                      <span className='d-flex column'>
                        <span className='d-flex align-items-center'>
                    <img
                      src={glitterStar}
                      alt=''
                    />
                    <p
                    style={{marginBottom: '5px', fontSize: '24px', marginLeft: '8px'}}
                    >
                      5.0
                    </p>
                    </span>
                    <p
                    style={{
                      color: '#8C8C8C',
                      fontSize: '16px',
                      fontWeight: '500',
                      margin: '0',
                    }}
                  >
                    189 отзывов
                  </p>
                    </span>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'rgba(240, 173, 0, 0.2)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={glityellow}
                        alt=''
                      />
                    </div> 
                  </span>   
                  </div>      
                  <div>
                    <a
                      href={linkToWb}
                      style={{
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'rgba(83, 41, 255, 1)',
                      }}
                    >
                      Посмотреть на WB
                    </a>
                  </div>
                </>
              )}
            </div>
  
            <div className='barcode-sku-brand'>
              {isInitialLoading && (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                >
                  <span className='loader'></span>
                </div>
              )}
              {!isInitialLoading && (
                <div className='barcode-wrapper'>
                  <div className='barcode'>
                    <div className='barcode-row'>
                      <p className='barcode-text-title'>SKU</p>
                      <p className='barcode-text'>{productBySku?.sku}</p>
                    </div>
                    <div className='barcode-row-image'>
                      <img src={glitFile} alt='Folder image' />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <p style={{marginLeft: '45px', fontSize: '16px', fontWeight: '500'}}>Период</p> */}
          <div
            className='container dash-container pt-0 p-3 d-flex'
            style={{marginBottom: '4px'}}
          >
            <StockAnalysisGlitterFilter setDays={setDays} />
            <div className='productInfo-nav'>
              <div
                onClick={() => setActiveTab('summary')}
                style={{
                  height: '43px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor:
                    activeTab === 'summary' ? '#5329FF1A' : 'transparent',
                  color:
                    activeTab === 'summary' ? 'rgba(26, 26, 26, 1)' : '#8C8C8C',
                }}
              >
                <p
                  className='productInfo-nav-text'
                  style={{
                    fontWeight: activeTab === 'summary' ? '600' : '500',
                  }}
                >
                  Сводка
                </p>
              </div>
              <div
                onClick={() => setActiveTab('product')}
                style={{
                  height: '43px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor:
                    activeTab === 'product' ? '#5329FF1A' : 'transparent',
                  color:
                    activeTab === 'product' ? 'rgba(26, 26, 26, 1)' : '#8C8C8C',
                }}
              >
                <p 
                className='productInfo-nav-text'
                style={{
                  fontWeight: activeTab === 'product' ? '600' : '500',
                }}
                >
                  О продукте
                </p>
              </div>
              <div
                onClick={() => setActiveTab('categoryMonitoring')}
                style={{
                  height: '43px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor:
                    activeTab === 'categoryMonitoring'
                      ? '#5329FF1A'
                      : 'transparent',
                  color:
                    activeTab === 'categoryMonitoring' ? 'rgba(26, 26, 26, 1)' : '#8C8C8C',
                }}
              >
                <p className='productInfo-nav-text' style={{
                  fontWeight: activeTab === 'categoryMonitoring' ? '600' : '500',
                }}>
                  Мониторинг категорий
                </p>
              </div>
              <div
                onClick={() => setActiveTab('requestMonitoring')}
                style={{
                  height: '43px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor:
                    activeTab === 'requestMonitoring'
                      ? '#5329FF1A'
                      : 'transparent',
                  color:
                    activeTab === 'requestMonitoring' ? 'rgba(26, 26, 26, 1)' : '#8C8C8C',
                }}
              >
                <p className='productInfo-nav-text' style={{
                  fontWeight: activeTab === 'requestMonitoring' ? '600' : '500',
                }}>
                  Мониторинг запросов
                </p>
              </div>
            </div>
          </div>
          {TabContent()}
        </div>
      </div>
    )
}

export default StockAnalysisGlitter;
