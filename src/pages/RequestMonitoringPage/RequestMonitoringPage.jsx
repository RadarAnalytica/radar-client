import { useContext, useState, useEffect } from 'react';
// import TopNav from '../../components/TopNav';
import Header from '../../components/sharedComponents/header/header';
import TopNav from '../../components/TopNav';;
import glitterStar from '../../pages/images/glitterstar.svg';
import glityellow from '../../pages/images/glityellow.svg';
import glitFile from '../../pages/images/glitfile.svg';
import SearchButton from '../../assets/searchstock.svg';
import RequestMonitoringFilter from '../../components/RequestMonitoringFilter';
import TableRequestMonitoring from './widgets/TableRequestMonitoring';
import enteringQueries from "../../pages/images/enteringQueries.svg";
import { ServiceFunctions } from "../../service/serviceFunctions";
import AuthContext from "../../service/AuthContext";
import warningIcon from "../../assets/warning.png";
import Modal from 'react-bootstrap/Modal';
import styles from './RequestMonitoringPage.module.css';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';

const RequestMonitoringPage = () => {

    const [filteredData, setFilteredData] = useState();
    const [monitorData, setMonitorData] = useState([]);
    const [days, setDays] = useState(30);
    const [page, setPage] = useState(1);
    const [searchInputQuery, setSearchInputQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false); // Track whether a search has been performed
    const { authToken } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [sort, setSort] = useState("desc");
    const [isTableLoading, setIsTableLoading] = useState(false);

    // Функции для открытия и закрытия модального окна
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    // Обновление поиского запроса
    const handleSearchQuery = (e) => {
        setSearchInputQuery(e.target.value);
    };

    // Функция для обработки
    const handleFilterSearch = async () => {
        if (searchInputQuery) {
            await updateRequestMonitoring(authToken, searchInputQuery, Number(days), 1, monitorData.page_limit ?? 25, sort);
        } else {
            setErrorMessage("Введите артикул или ссылку на карточку товара.");
            handleShowModal();
        }
    };

    // Функция для обновления данных
    const handleUpdate = async () => {
        await updateRequestMonitoring(authToken, searchInputQuery, Number(days), page, monitorData.page_limit ?? 25, sort);
    };

    useEffect(() => {
        handleFilterSearch();
    }, [days]);

    useEffect(() => {
        if (searchInputQuery) {
            updateRequestMonitoring(authToken, searchInputQuery, Number(days), page, monitorData.page_limit ?? 25, sort);
        }
    }, [page, sort]);

    const updateRequestMonitoring = async (
        token, product, period, page, page_limit, sort
    ) => {
        setIsTableLoading(true);
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
                console.log(e.errorMessage);
                setErrorMessage(`Ошибка: не удалось найти данный товар.`);
            }
            console.error(e);
            handleShowModal();
        } finally {
            setHasSearched(true);
            setIsTableLoading(false);
        }
    };


    return <div className='dashboard-page'>
        <MobilePlug />
        <div style={{ height: '100vh' }}>
            <Sidebar />
        </div>
        <div className='dashboard-content pb-3' style={{ padding: '0 32px' }}>
            <div style={{ widht: '100%', padding: '0', margin: '20px 0' }}>
                <Header
                    title={'Частотность артикула'}
                />
                {/* <TopNav title={'Частотность артикула'} /> */}
            </div>


            {!hasSearched && !isTableLoading ? (

                <div className={`${styles['request-mon-search-wrapper']} container dash-container d-flex`} style={{ flexDirection: "column" }}>

                    <div className={styles['enteringRequest']}>
                        <div className={styles['enteringRequestImg']}><img src={enteringQueries} /></div>
                        <div className={styles['enteringRequestHeader']}>Вхождение запросов</div>
                    </div>
                    <div className={styles['enteringRequestText']}>Раздел покажет по каким ключевым запросам индексируется карточка товара</div>
                    <div className='search'>
                        <input
                            type='text'
                            placeholder='Введите артикул или ссылку на карточку товара'
                            className='search-input'
                            value={searchInputQuery}
                            onChange={handleSearchQuery}
                            onKeyDown={(e) => {if (e.key && e.key === 'Enter') { handleFilterSearch(); }}}
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
            ) : errorMessage ? (

                <div>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton style={{ border: 'none'}}>
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
                    <div className={`${styles['request-mon-search-wrapper']} container dash-container d-flex`} style={{ flexDirection: "column" }}>

                        <div className={styles['enteringRequest']}>
                            <div className={styles['enteringRequestImg']}><img src={enteringQueries} /></div>
                            <div className={styles['enteringRequestHeader']}>Вхождение запросов</div>
                        </div>
                        <div className={styles['enteringRequestText']}>Раздел покажет по каким ключевым запросам индексируется карточка товара</div>
                        <div className='search'>
                            <input
                                type='text'
                                placeholder='Введите артикул или ссылку на карточку товара'
                                className='search-input'
                                value={searchInputQuery}
                                onChange={handleSearchQuery}
                                onKeyDown={(e) => {if (e.key && e.key === 'Enter') { handleFilterSearch(); }}}
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
                    <div className={`${styles['request-mon-search-wrapper']} container dash-container d-flex`}>
                        <div className='search'>
                            <input
                                type='text'
                                placeholder='Введите артикул или ссылку на карточку товара'
                                className='search-input'
                                value={searchInputQuery}
                                onChange={handleSearchQuery}
                                onKeyDown={(e) => {if (e.key && e.key === 'Enter') { handleFilterSearch(); }}}
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
                            {isTableLoading && (
                                <div
                                    className='d-flex flex-column align-items-center justify-content-center'
                                    style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                                >
                                    <span className='loader'></span>
                                </div>
                            )}
                            {!isTableLoading && (
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
                                                fontSize: '1rem',
                                                fontWeight: '500',
                                                marginBottom: '0',
                                            }}
                                        >
                                            Цена
                                        </p>
                                        <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                            {`${(monitorData.price / 100).toFixed(2)} ₽`}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div
                            className='productInfo-wbInfo'
                        >
                            {isTableLoading && (
                                <div
                                    className='d-flex flex-column align-items-center justify-content-center'
                                    style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                                >
                                    <span className='loader'></span>
                                </div>
                            )}
                            {!isTableLoading && (
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
                                                        style={{ marginBottom: '5px', fontSize: '1.5rem', marginLeft: '8px' }}
                                                    >
                                                        {monitorData.rate}
                                                    </p>
                                                </span>
                                                <p
                                                    style={{
                                                        color: '#8C8C8C',
                                                        fontSize: '1rem',
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
                                                fontSize: '1rem',
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
                            {isTableLoading && (
                                <div
                                    className='d-flex flex-column align-items-center justify-content-center'
                                    style={{ height: '100%', paddingTop: '5%', width: '100%' }}
                                >
                                    <span className='loader'></span>
                                </div>
                            )}
                            {!isTableLoading && (
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
                        <RequestMonitoringFilter loading={isTableLoading} setDays={setDays} days={days} />
                    </div>
                    {isTableLoading ? (
                        <div className="loader-wrapper">
                            <span className="loader"></span>
                        </div>
                    ) : (
                        filteredData.length > 0 ? (
                            <TableRequestMonitoring sort={sort} setSort={setSort} dataTable={filteredData} monitorData={monitorData} setPage={setPage} />
                        ) : (
                            <div className='noResulstFound'><p>Результаты не найдены.</p></div>
                        )
                    )}

                </>
            )}
        </div>
    </div>;
};
export default RequestMonitoringPage;
