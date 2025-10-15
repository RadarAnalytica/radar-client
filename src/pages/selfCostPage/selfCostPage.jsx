import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from 'react';
import styles from './selfCostPage.module.css';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import HowToLink from '@/components/sharedComponents/howToLink/howToLink';
import { SelfCostTableWidget, SearchWidget } from './widgets';
import AuthContext from '@/service/AuthContext';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { useAppSelector } from '@/redux/hooks';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';

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
    
    const getTableData = useCallback(async (authToken, shopId, filters, page = 1) => {
        setDataStatus({ ...initDataStatus, isLoading: true });
        setSearchInputValue('');
        progress.start();

        const res = await ServiceFunctions.getSelfCostData(authToken, shopId, filters, page, 50);
        if (!res.ok) {
            setDataStatus({ ...initDataStatus, isError: true, message: 'Что-то пошло не так :( Попробуйте оновить страницу' });
            return;
        }

        const parsedData = await res.json();
        const { items, total } = parsedData.data;

        setTableData([...items]);
        setFilteredTableData([...items]);
        setTotalItems(total || items.length);
        progress.complete();

        await setTimeout(() => {
            setDataStatus({ ...initDataStatus, isLoading: false });
            progress.reset();
        }, 500);
    }, []);

    const noSearchAction = useCallback(() => {
        getTableData(authToken, activeBrand.id, filters);
    }, [authToken, activeBrand, filters, getTableData]);

    const resetSearch = useCallback(() => {
        if (searchInputValue) {
            setSearchInputValue('');
            setFilteredTableData(tableData);
        }
    }, [searchInputValue, tableData]);

    //задаем начальную дату
    useEffect(() => {
        if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded) {
            getTableData(authToken, activeBrand.id, filters);
        }
    }, [activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup]);

    useEffect(() => {
        let timeout;
        if (isSuccess) {
            timeout = setTimeout(() => { setIsSuccess(false); }, 1500);
        }
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [isSuccess]);

    const memoizedDataStatus = useMemo(() => dataStatus, [dataStatus]);
    const memoizedFilteredTableData = useMemo(() => filteredTableData, [filteredTableData]);
    const memoizedTableData = useMemo(() => tableData, [tableData]);
    const memoizedSearchInputValue = useMemo(() => searchInputValue, [searchInputValue]);

    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header title='Себестоимость' />
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
                            <SearchWidget
                                tableData={memoizedTableData}
                                setFilteredTableData={setFilteredTableData}
                                searchInputValue={memoizedSearchInputValue}
                                setSearchInputValue={setSearchInputValue}
                                noSearchAction={noSearchAction}
                            />
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
                        />
                    </>
                }
            </section>

            {isSuccess && <div className={styles.page__successAlert}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6.4" fill="#00B69B" fillOpacity="0.1" />
                    <path d="M14.1999 19.1063L23.1548 10.1333L24.5333 11.5135L14.1999 21.8666L8 15.6549L9.37753 14.2748L14.1999 19.1063Z" fill="#00B69B" />
                </svg>
                Себестоимость установлена
            </div>}

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

export default SelfCostPage;
