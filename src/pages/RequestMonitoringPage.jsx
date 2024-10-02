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
import enteringQueries from "../pages/images/enteringQueries.svg"


const RequestMonitoringPage = () => {

    const dataTable = [
        {
            query: 'блестки для глаз',
            monthlyRequests: 392020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 392020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 392020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 392020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 392020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 392020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 392020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 4,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 392020,
            firstCol: 55,
            secondCol: 4,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 492020,
            firstCol: 55,
            secondCol: 4,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 192020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
        {
            query: 'блестки для глаз',
            monthlyRequests: 292020,
            firstCol: 55,
            secondCol: 44,
            thirdCol: 2,
            fourthCol: 44,
            fifthCol: 2
        },
    ]

    // const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [productData, setProductData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(dataTable);
    const [days, setDays] = useState(30);
    const [searchInputQuery, setSearchInputQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false); // Track whether a search has been performed
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    //for Main Search
    const handleSearchQuery = (e) => {
        setSearchInputQuery(e.target.value);
    };

    const handleFilterSearch = () => {
        if (searchInputQuery) {
            setIsLoading(true); // Show loader

            setTimeout(() => {
                setIsLoading(false); // Hide loader after 2 seconds
                setHasSearched(true); // Show results after loader disappears
            }, 2000); // 2000 ms = 2 seconds
        }
    };
    //for Main Search

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
        setSearchQuery(e.target.value); // Update search query
    };

    const handleFilter = () => {
        setIsLoadingSearch(true); // Show loader

        // Simulate 2-second loading time
        setTimeout(() => {
            if (searchQuery.trim() === '') {
                setFilteredData(dataTable); // Show all data if no search query
            } else {
                // Filter data based on search query
                const filtered = dataTable.filter((item) => {
                    const queryMatch = item.query ? item.query.toLowerCase().includes(searchQuery.toLowerCase()) : false;
                    const monthlyRequestsMatch = item.monthlyRequests ? item.monthlyRequests.toString().includes(searchQuery) : false;
                    const firstColMatch = item.firstCol ? item.firstCol.toString().includes(searchQuery) : false;
                    const secondColMatch = item.secondCol ? item.secondCol.toString().includes(searchQuery) : false;
                    const thirdColMatch = item.thirdCol ? item.thirdCol.toString().includes(searchQuery) : false;
                    const fourthColMatch = item.fourthCol ? item.fourthCol.toString().includes(searchQuery) : false;
                    const fifthColMatch = item.fifthCol ? item.fifthCol.toString().includes(searchQuery) : false;

                    // Return true if any of the fields match the search query
                    return (
                        queryMatch ||
                        monthlyRequestsMatch ||
                        firstColMatch ||
                        secondColMatch ||
                        thirdColMatch ||
                        fourthColMatch ||
                        fifthColMatch
                    );
                });
                setFilteredData(filtered); // Update the filtered data
            }
            setIsLoadingSearch(false); // Hide loader and show table after 2 seconds
        }, 2000); // 2-second delay
    };

    //Search
    return <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
            <TopNav title={'Мониторинг запросов'} />


            {!hasSearched && !isLoading ? (
                <div className='request-mon-search-wrapper container dash-container d-flex' style={{ flexDirection: "column" }}>
                    <div className='enteringRequest'>
                        <div className='enteringRequestImg'><img src={enteringQueries} /></div>
                        <div className='enteringRequestHeader'>Вхождение запросов</div>
                    </div>
                    <div className='enteringRequestText'>Раздел покажет по каким ключевым запросам индексируется карточка товара</div>
                    <div className='search'>
                        <input
                            type='text'
                            placeholder='Введите артикул или ссылку на карточку товара'
                            className='search-input'
                            value={searchInputQuery}
                            onChange={handleSearchQuery}
                            style={{ marginLeft: '20px' }}
                        />
                        <div style={{ marginLeft: '10px' }}>
                            <img
                                src={SearchButton}
                                alt="Search"
                                onClick={handleFilterSearch}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>
            ) : isLoading ? (
                <div className="loader-wrapper">
                    <span className="loader"></span> {/* Display loader */}
                </div>
            ) : (
                <>
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
                                {/* <div className='productInfo-price-photo-photo'>
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
                                </div> */}
                                <div
                                    className='productInfo-price-photo-photo'
                                >
                                    <img
                                        src={productBySku?.photo}
                                        alt='product image'
                                        style={{
                                            width: '100%', // Ensure the image takes full space of its container
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: productBySku?.photo ? 'block' : 'none', // Hide the img tag if no image
                                        }}
                                        onError={(e) => {
                                            e.target.style.display = 'none'; // Hide the image element if it fails to load
                                        }}
                                    />
                                    {!productBySku?.photo && (
                                        <div style={{ color: '#fff' }}>No Image Available</div> // Optional text inside the grey background
                                    )}
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
                    {isLoadingSearch ? (
                        <div className="loader-wrapper">
                            <span className="loader"></span>
                        </div>
                    ) : (
                        filteredData.length > 0 ? (
                            <TableRequestMonitoring dataTable={filteredData} />
                        ) : (
                            <div className='noResulstFound'><p>Результаты не найдены.</p></div>
                        )
                    )}
                    {/* ) : (
                <DataCollectionNotification
                    title={"Ваши данные еще формируются и обрабатываются."}
                />
               
            )} */}
                </>
            )}
        </div>
    </div>
}
export default RequestMonitoringPage