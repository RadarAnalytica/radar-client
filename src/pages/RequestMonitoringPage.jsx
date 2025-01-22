import React, { useContext, useState, useRef, useEffect } from 'react';
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
import { ServiceFunctions } from "../service/serviceFunctions";
import AuthContext from "../service/AuthContext";
import MessageWindow from '../components/MessageWindow';
import warningIcon from "../assets/warning.png"
import Modal from 'react-bootstrap/Modal';
import NoSubscriptionPage from './NoSubscriptionPage';

const RequestMonitoringPage = () => {

    // const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [productData, setProductData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState();
    const [monitorData, setMonitorData] = useState([]);
    const [days, setDays] = useState(30);
    const [page, setPage] = useState(1);
    const [searchInputQuery, setSearchInputQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false); // Track whether a search has been performed
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const { user, authToken } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [sort, setSort] = useState("desc");

    // Функции для открытия и закрытия модального окна
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    //for Main Search
    const handleSearchQuery = (e) => {
        setSearchInputQuery(e.target.value);
    };

    const handleFilterSearch = async () => {
        if (searchInputQuery) {
            setIsLoading(true);
            await updateRequestMonitoring(authToken, searchInputQuery, Number(days), page, monitorData.page_limit ?? 25, sort)

        } else {
            setErrorMessage("Введите артикул или ссылку на карточку товара.");
            handleShowModal();
        }
    };

    useEffect(() => {
        handleFilterSearch()
    }, [days, page, sort])

    const updateRequestMonitoring = async (
        token, product, period, page, page_limit, sort
    ) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const data = await ServiceFunctions.postRequestMonitoring(
                token, product, period, page, page_limit, sort
            );

            // Проверка на отсутствие данных
            if (!data || !data.results || data.results.length === 0) {
                throw new Error('Продукт не найден.');
            }

            const result = data.results;

            setMonitorData({
                "feedback_number": data.feedback_number,
                "photo": data.photo,
                "price": data.price,
                "rate": data.rate,
                "wb_id": data.wb_id,
                "sku": data.sku,
                "pages": data.pages,
                "page": data.page,
                "page_limit": data.page_limit,

            });
            setFilteredData(result);

        } catch (e) {
            if (e.response) {
                setErrorMessage(`Ошибка сервера.`);
            } else if (e.request) {
                setErrorMessage('Ошибка сети: сервер не отвечает.');
            } else {
                console.log(e.errorMessage)
                setErrorMessage(`Ошибка: не удалось найти данный товар.`);
            }
            console.error(e);
            handleShowModal();
        } finally {
            setHasSearched(true);
            setIsLoading(false);
        }
    };

    if (user?.subscription_status === 'expired') {
        return <NoSubscriptionPage title={'Мониторинг запросов'} />;
      }


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
                    <span className="loader"></span>
                </div>
            ) : errorMessage ? (

                <div>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <div>
                                <div className='d-flex gap-3 mb-2 mt-2 align-items-center'>
                                    <img src={warningIcon} alt='' style={{ height: '3vh' }} />
                                    <p className='fw-bold mb-0'>Ошибка!</p>
                                </div>
                                <p className='fs-6 mb-1' style={{ fontWeight: 600 }}>
                                    {errorMessage}
                                </p>
                            </div>
                        </Modal.Header>
                    </Modal>
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

                </div>

            ) : (
                <>
                    <div className='request-mon-search-wrapper container dash-container d-flex'>
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
                        </div >
                    </div>
                    <div
                        className='container dash-container pt-0 d-flex gap-3'
                        style={{ justifyContent: 'space-between', marginBottom: '9px' }}
                    >
                        <div className='productInfo-price-photo'>
                            {isLoading && (
                                <div
                                    className='d-flex flex-column align-items-center justify-content-center'
                                    style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                                >
                                    <span className='loader'></span>
                                </div>
                            )}
                            {!isLoading && (
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
                                            src={monitorData?.photo}
                                            alt='product image'
                                            style={{
                                                width: '100%', // Ensure the image takes full space of its container
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: monitorData?.photo ? 'block' : 'none', // Hide the img tag if no image
                                            }}
                                            onError={(e) => {
                                                e.target.style.display = 'none'; // Hide the image element if it fails to load
                                            }}
                                        />
                                        {!monitorData?.photo && (
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
                                            {`${(monitorData.price / 100).toFixed(2)} ₽`}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div
                            className='productInfo-wbInfo'
                        >
                            {isLoading && (
                                <div
                                    className='d-flex flex-column align-items-center justify-content-center'
                                    style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                                >
                                    <span className='loader'></span>
                                </div>
                            )}
                            {!isLoading && (
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
                                                        {monitorData.rate}
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
                                                    {monitorData.feedback_number} отзывов
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
                                            href={`https://www.wildberries.ru/catalog/${monitorData.wb_id}/detail.aspx`}
                                            target="_blank"
                                            rel="noopener noreferrer"
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
                            {isLoading && (
                                <div
                                    className='d-flex flex-column align-items-center justify-content-center'
                                    style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                                >
                                    <span className='loader'></span>
                                </div>
                            )}
                            {!isLoading && (
                                <div className='barcode-wrapper'>
                                    <div className='barcode'>
                                        <div className='barcode-row'>

                                            <div className='barcode-text-title-wrapper'><p className='barcode-text-title'>SKU</p></div>
                                            <div className='barcode-sku-data-wrapper'>
                                                {monitorData.sku?.map((sku, index) => (

                                                    sku !== null ? (
                                                        <div><p key={index} className='barcode-text'>{sku}</p></div>
                                                    ) : null
                                                ))}
                                            </div>

                                        </div>

                                        <div className='barcode-row-image'>
                                            <img src={glitFile} alt='Folder image' />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className='container dash-container pt-0 d-flex'
                        style={{ marginBottom: '4px' }}
                    >
                        <RequestMonitoringFilter setDays={setDays} days={days} />
                    </div>
                    {/* {shouldDisplay ? ( */}
                    {isLoadingSearch ? (
                        <div className="loader-wrapper">
                            <span className="loader"></span>
                        </div>
                    ) : (
                        filteredData.length > 0 ? (
                            <TableRequestMonitoring sort={sort} setSort={setSort} dataTable={filteredData} monitoringData={monitorData} setPage={setPage} page={page} />
                        ) : (
                            <div className='noResulstFound'><p>Результаты не найдены.</p></div>
                        )
                    )}

                </>
            )}
        </div>
    </div>
}
export default RequestMonitoringPage