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
        setTotalItems(total || items.length);
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
            getTableData(authToken, activeBrand.id, filters, 1, '');
        }
    }, [searchInputValue, authToken, activeBrand, filters, getTableData]);

    //задаем начальную дату
    useEffect(() => {
        if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded) {
            getTableData(authToken, activeBrand.id, filters);
        }
    }, [activeBrand, selectedRange, isFiltersLoaded, activeBrandName, activeArticle, activeGroup]);

    const memoizedDataStatus = useMemo(() => dataStatus, [dataStatus]);
    const memoizedFilteredTableData = useMemo(() => filteredTableData, [filteredTableData]);
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
                            <SearchComponent
                                searchInputValue={memoizedSearchInputValue}
                                setSearchInputValue={setSearchInputValue}
                                handleSearch={handleSearch}
                                isLoading={dataStatus.isLoading}
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
                            searchInputValue={memoizedSearchInputValue}
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

export default SelfCostPage;
