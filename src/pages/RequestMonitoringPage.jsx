import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav'
import glitterStar from '../pages/images/glitterstar.svg';
import glityellow from '../pages/images/glityellow.svg';
import glitFile from '../pages/images/glitfile.svg';
import SearchButton from '../assets/searchstock.svg'
import DownloadFile from '../assets/downloadxlfile.svg'
import RequestMonitoringFilter from '../components/RequestMonitoringFilter'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TableRequestMonitoring from '../components/TableRequestMonitoring'
import DataCollectionNotification from '../components/DataCollectionNotification'


const RequestMonitoringPage = () => {

    const dataTable = [
        {
            query: 'лестки для глаз',
            monthlyRequests: 292020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'глиттер для глаз',
            monthlyRequests: 289912,
            firstCol: 1,
            secondCol: 43,
            thirdCol: 2,
            fourthCol: 45,
            fifthCol: 2
        },
        {
            query: 'гssvcиттер для глаз',
            monthlyRequests: 289912,
            firstCol: 1,
            secondCol: 43,
            thirdCol: 2,
            fourthCol: 45,
            fifthCol: 2
        },
        {
            query: 'глиттер для глаз',
            monthlyRequests: 289912,
            firstCol: 1,
            secondCol: 43,
            thirdCol: 2,
            fourthCol: 45,
            fifthCol: 2
        },
        {
            query: 'глиттер для глаз',
            monthlyRequests: 289912,
            firstCol: 1,
            secondCol: 43,
            thirdCol: 2,
            fourthCol: 45,
            fifthCol: 2
        },
        {
            query: 'глиттер для глаз',
            monthlyRequests: 289912,
            firstCol: 1,
            secondCol: 43,
            thirdCol: 2,
            fourthCol: 45,
            fifthCol: 2
        },
        {
            query: 'глиттер для глаз',
            monthlyRequests: 289912,
            firstCol: 1,
            secondCol: 43,
            thirdCol: 2,
            fourthCol: 45,
            fifthCol: 2
        },
        {
            query: 'глиттер для глаз',
            monthlyRequests: 289912,
            firstCol: 1,
            secondCol: 43,
            thirdCol: 2,
            fourthCol: 45,
            fifthCol: 2
        },
        {
            query: 'глиттер для глаз',
            monthlyRequests: 289912,
            firstCol: 1,
            secondCol: 43,
            thirdCol: 2,
            fourthCol: 45,
            fifthCol: 2
        },
    ]
    const data = [
        { id: 1, name: "radar" }
    ]
    // const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [productData, setProductData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [days, setDays] = useState(30);
    // const shops = useAppSelector((state) => state.shopsSlice.shops);
    // const prevDays = useRef(days);
    // const [activeBrand, setActiveBrand] = useState(idShopAsValue);

    const productId = id;
    const productBySku = Array.isArray(productData)
        ? productData.find((item) => item.sku === id)
        : null;
    const linkToWb = `https://www.wildberries.ru/catalog/${productId}/detail.aspx`;
    // const storedActiveShop = localStorage.getItem("activeShop");
    // let activeShop;
    // if (storedActiveShop && typeof storedActiveShop === "string") {
    //     try {
    //         activeShop = JSON.parse(storedActiveShop);
    //     } catch (error) {
    //         console.error("Error parsing storedActiveShop:", error);
    //         activeShop = null;
    //     }
    // }
    // const allShop = shops?.some((item) => item?.is_primary_collect === true);
    // const oneShop = shops?.filter((item) => item?.id == activeBrand)[0];
    // const activeShopId = activeShop?.id;
    // const idShopAsValue =
    //     activeShopId != undefined ? activeShopId : shops?.[0]?.id;
    // const shouldDisplay = activeShop
    //     ? activeShop.is_primary_collect
    //     : oneShop
    //         ? oneShop.is_primary_collect
    //         : allShop;
    //Search
    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Обновление значения строки поиска
    };

    const handleFilter = () => {
        // Если строка поиска пуста, вернуть все данные
        if (searchQuery.trim() === '') {
            setFilteredData(data); // Возвращаем все данные
            return;
        }

        // Фильтрация данных, если есть запрос
        const filtered = data.filter((item) => {
            return (
                item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.vendorСode.toString().includes(searchQuery) ||
                item.barCode.toString().includes(searchQuery)
            );
        });
        setFilteredData(filtered); // Обновить отфильтрованные данные
    };
    //Search
    return <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
            <TopNav title={'Мониторинг запросов'} />
            <div className='request-mon-search-wrapper container dash-container d-flex'>
                <div className='search'>
                    <input type='text'
                        placeholder='Введите артикул или ссылку на карточку товара'
                        className='search-input'
                        value={searchQuery}
                        onChange={handleSearch}
                        style={{ marginLeft: '20px' }} />
                    <div style={{ marginLeft: '10px' }}>
                        <img
                            src={SearchButton}
                            alt="Search"
                            onClick={handleFilter}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div >
            </div>
            <div
                className='container dash-container pt-0 d-flex gap-3'
                style={{ justifyContent: 'space-between', marginBottom: '9px' }}
            >
                <div className='productInfo-price-photo'>
                    {/* {isInitialLoading && (
                        <div
                            className='d-flex flex-column align-items-center justify-content-center'
                            style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                        >
                            <span className='loader'></span>
                        </div>
                    )} */}
                    {/* {!isInitialLoading && ( */}
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
                    {/* )} */}
                </div>

                <div
                    className='productInfo-wbInfo'
                >
                    {/* {isInitialLoading && (
                        <div
                            className='d-flex flex-column align-items-center justify-content-center'
                            style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                        >
                            <span className='loader'></span>
                        </div>
                    )} */}
                    {/* {!isInitialLoading && ( */}
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
                                            style={{ marginBottom: '5px', fontSize: '24px', marginLeft: '8px' }}
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
                    {/* )} */}
                </div>

                <div className='barcode-sku-brand'>
                    {/* {isInitialLoading && (
                        <div
                            className='d-flex flex-column align-items-center justify-content-center'
                            style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                        >
                            <span className='loader'></span>
                        </div>
                    )} */}
                    {/* {!isInitialLoading && ( */}
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
                    {/* )} */}
                </div>
            </div>
            <div
                className='container dash-container pt-0 d-flex'
                style={{ marginBottom: '4px' }}
            >
                <RequestMonitoringFilter setDays={setDays} />
            </div>
            {/* {shouldDisplay ? ( */}
            <TableRequestMonitoring
                dataTable={dataTable}
            />
            {/* ) : (
                <DataCollectionNotification
                    title={"Ваши данные еще формируются и обрабатываются."}
                />
               
            )} */}
        </div>
    </div>
}
export default RequestMonitoringPage