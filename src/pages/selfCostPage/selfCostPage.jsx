import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from 'react';
import styles from './selfCostPage.module.css';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import HowToLink from '@/components/sharedComponents/howToLink/howToLink';
import { SelfCostTableWidget, SearchComponent } from './widgets';
import AuthContext from '@/service/AuthContext';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { useAppSelector } from '@/redux/hooks';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import AlertWidget from '@/components/sharedComponents/AlertWidget/AlertWidget';
import FilterLoader from '@/components/ui/FilterLoader';
import DragDropFile from '@/components/DragAndDropFiles';
import Modal from 'react-bootstrap/Modal';

const initDataStatus = {
    isError: false,
    isLoading: false,
    message: ''
};

const SelfCostPage = () => {
    const { isDemoMode } = useDemoMode();
    const [searchInputValue, setSearchInputValue] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [dataStatus, setDataStatus] = useState(initDataStatus);
    const progress = useLoadingProgress({ loading: dataStatus.isLoading });
    const [tableData, setTableData] = useState(); // данные для рендера таблицы
    const [filteredTableData, setFilteredTableData] = useState(); // данные для рендера таблицы
    const [totalItems, setTotalItems] = useState(0);
    const { authToken } = useContext(AuthContext);
    const { activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup } = useAppSelector((state) => state.filters);
    const filters = useAppSelector(store => store.filters);
    const [paginationState, setPaginationState] = useState({ current: 1, total: 0, pageSize: 50 });

    const getTableData = useCallback(async (authToken, shopId, filters, page = 1, searchValue = '') => {
        setDataStatus({ ...initDataStatus, isLoading: true });
        progress.start();

        const res = await ServiceFunctions.getSelfCostData(authToken, shopId, filters, page, 50, searchValue);
        if (!res.ok) {
            setDataStatus({ ...initDataStatus, isError: true, message: 'Что-то пошло не так :( Попробуйте оновить страницу' });
            return;
        }

        const parsedData = await res.json();
        const { items, total } = parsedData.data;

        setTableData([...items]);
        setFilteredTableData([...items]);
        setPaginationState(prev => ({ ...prev, total: total || items.length }));
        // setTotalItems(total || items.length);
        progress.complete();

        await setTimeout(() => {
            setDataStatus({ ...initDataStatus, isLoading: false });
            progress.reset();
        }, 500);
    }, []);

    const handleSearch = useCallback((searchValue) => {
        getTableData(authToken, activeBrand.id, filters, 1, searchValue);
    }, [authToken, activeBrand, filters, getTableData]);

    const resetSearch = useCallback(() => {
        if (searchInputValue) {
            setSearchInputValue('');
            setPaginationState(prev => ({ ...prev, current: 1 }));
            // getTableData(authToken, activeBrand.id, filters, 1, '');
        }
    }, [searchInputValue, authToken, activeBrand, filters, getTableData]);

    //задаем начальную дату
    useEffect(() => {
        if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded) {
            getTableData(authToken, activeBrand.id, filters, paginationState.current);
        }
    }, [activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup, paginationState.current]);

    const memoizedDataStatus = useMemo(() => dataStatus, [dataStatus]);
    const memoizedFilteredTableData = useMemo(() => filteredTableData, [filteredTableData]);
    const memoizedSearchInputValue = useMemo(() => searchInputValue, [searchInputValue]);

    return (
        <main className={styles.page}>
            <MobilePlug />
            <FilterLoader antiloading={dataStatus.isLoading} />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header title='Себестоимость' hasShadow={false} />
                </div>

                {isDemoMode && <NoSubscriptionWarningBlock />}

                <div className={styles.page__filtersWrapper}>
                    <Filters
                        timeSelect={false}
                        articleSelect={false}
                        isDataLoading={dataStatus.isLoading}
                    />
                    <HowToLink
                        text='Инструкция по загрузке себестоимости'
                        url='https://radar.usedocs.com/article/76556'
                        target='_blank'
                    />
                </div>

                {activeBrand && !activeBrand.is_primary_collect &&
                    <DataCollectWarningBlock
                        title='Ваши данные еще формируются и обрабатываются.'
                    />
                }

                {activeBrand && activeBrand.is_primary_collect &&
                    <>
                        <div className={styles.page__searchWrapper}>
                            <SearchComponent
                                searchInputValue={memoizedSearchInputValue}
                                setSearchInputValue={setSearchInputValue}
                                handleSearch={handleSearch}
                                isLoading={dataStatus.isLoading}
                            />

                            <SelfCostXLSXuploadComponent />
                        </div>

                        <SelfCostTableWidget
                            setIsSuccess={setIsSuccess}
                            dataStatus={memoizedDataStatus}
                            setDataStatus={setDataStatus}
                            tableData={memoizedFilteredTableData}
                            authToken={authToken}
                            progress={progress}
                            activeBrand={activeBrand}
                            setTableData={setFilteredTableData}
                            resetSearch={resetSearch}
                            getTableData={getTableData}
                            filters={filters}
                            totalItems={totalItems}
                            searchInputValue={memoizedSearchInputValue}
                            paginationState={paginationState}
                            setPaginationState={setPaginationState}
                        />
                    </>
                }
            </section>

            <AlertWidget
                message='Себестоимость установлена'
                isVisible={isSuccess}
                setIsVisible={setIsSuccess}
            />

            <ErrorModal
                footer={null}
                open={memoizedDataStatus.isError}
                message={memoizedDataStatus.message}
                onOk={() => setDataStatus(initDataStatus)}
                onClose={() => setDataStatus(initDataStatus)}
                onCancel={() => setDataStatus(initDataStatus)}
            />
        </main>
    );
};


const SelfCostXLSXuploadComponent = () => {

    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const [file, setFile] = useState(null);
    const [isFileUpload, setIsFileUpload] = useState();
    console.log(isUploadModalVisible, 'isUploadModalVisible');

    const handleTemplateDownload = async () => {
        const fileBlob = await ServiceFunctions.getCostTemplate(authToken);
        fileDownload(fileBlob, 'Себестоимость.xlsx');
    };

    const handleCostPriceSave = async () => {
        setIsFileUpload(true);
        try {
            await ServiceFunctions.postCostUpdate(authToken, file);
            setShowSuccessPopup(true);
            getCostPiceStatus();
        } catch (error) {
            // Обработка ошибки
            console.error('Ошибка при загрузке файла:', error);
            setErrorMessage(error == 'Error: Unprocessable Entity' ? 'Некорректный формат файла' : 'Ошибка при загрузке файла');
            setShowModalError(true);
        } finally {
            setCostPriceShow(false);
            setTimeout(() => setFile(null), 500);
            setIsFileUpload(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsUploadModalVisible(true)}
                className='prime-btn'
                style={{ height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '220px' }}
            >
                Загрузить EXEL
            </button>

            <Modal
                show={isUploadModalVisible}
                onHide={() => setIsUploadModalVisible(false)}
                className='add-token-modal'
            >
                <Modal.Header closeButton>
                    <div className='d-flex align-items-center gap-2'>
                        <div style={{ width: '100%' }}>
                            <div className='d-flex justify-content-between'>
                                <h4 className='fw-bold mb-0' style={{ fontSize: '18px' }}>Установка себестоимости товара</h4>
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
                                    <span style={{ fontSize: '14px' }}>{file ? file.name : ''}</span>
                                </div>
                                <div>
                                    <a
                                        href='#'
                                        className='link'
                                        onClick={() => setFile(null)}
                                        style={{ color: 'red', cursor: 'pointer', fontSize: '14px' }}
                                    >
                                        Удалить
                                    </a>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                                <button
                                    onClick={handleCostPriceSave}
                                    className='prime-btn'
                                    style={{ height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '220px' }}
                                    disabled={isFileUpload}
                                >
                                    <span style={{ fontSize: '14px' }}>Сохранить</span>
                                </button>


                            </div>
                            <div className='d-flex justify-content-center w-100 gap-2'>
                                <a href='#' className='link' onClick={() => setIsUploadModalVisible(false)} style={{ fontSize: '14px' }}>
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
                                <a href='#' className='link' onClick={handleTemplateDownload} style={{ fontSize: '14px' }}>
                                    Скачать шаблон
                                </a>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SelfCostPage;
