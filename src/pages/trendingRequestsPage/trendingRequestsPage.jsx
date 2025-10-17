import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './trendingRequests.module.css';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { ParamsWidget, TableWidget } from './widgets';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { fetchApi } from "@/service/fetchApi";
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";

const initRequestStatus = {
    isError: false,
    isLoading: false,
    isLoaded: false,
    isSuccess: false,
    message: ''
};

//инит стейт сортировки
const initSortState = {
    sortedValue: undefined,
    sortType: undefined,
};

const TrendingRequestsPage = () => {
    const { isDemoMode } = useDemoMode();
    const [isParamsVisible, setIsParamsVisible] = useState(true);
    const [requestState, setRequestState] = useState();
    const [tableData, setTableData] = useState();
    const [requestStatus, setRequestStatus] = useState(initRequestStatus);
    const [tablePaginationState, setTablePaginationState] = useState({ limit: 25, page: 1, total_pages: 1 });
    const [sortState, setSortState] = useState(initSortState); // стейт сортировки (см initSortState)

    const getTableData = useCallback(async (request) => {
        setRequestStatus({ ...initRequestStatus, isLoading: true });
        try {
            let res = await fetchApi(`https://radarmarket.ru/api/web-service/trending-queries/get`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'cache-control': 'public, must-revalidate, max-age=86400',
                },
                body: JSON.stringify(request)
            });

            if (!res.ok) {
                return setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить данные таблицы. Попробуйте перезагрузить страницу.' });
            }
            res = await res.json();
            setTableData(res.queries);
            setRequestStatus({ ...initRequestStatus, isLoaded: true });
            setTablePaginationState({ limit: res.limit, page: res.page, total_pages: res.total_pages });
            setIsParamsVisible(false);
        } catch {
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить данные таблицы. Попробуйте перезагрузить страницу.' });
        }
    }, []);

    useEffect(() => {
        if (requestState) {
            getTableData(requestState);
        }
    }, [requestState, getTableData]);

    const handleErrorModalClose = useCallback(() => {
        setRequestStatus(initRequestStatus);
    }, []);

    const memoizedHeaderProps = useMemo(() => ({
        title: tableData ? 'Результаты' : 'Поиск трендовых запросов',
        titlePrefix: tableData ? 'Поиск трендовых запросов' : undefined
    }), [tableData]);


    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__wrapper}>
                    <div className={styles.page__headerWrapper}>
                        <Header
                            {...memoizedHeaderProps}
                            videoReviewLink='https://play.boomstream.com/JDw00KbS?size=cover&color=%23ffffff&autostart=0&loop=1&title=0&volume=50'
                        />
                    </div>

                    {isDemoMode && <NoSubscriptionWarningBlock />}

                    <div className={styles.page__widgetWrapper}>
                        <ParamsWidget
                            isParamsVisible={isParamsVisible}
                            setIsParamsVisible={setIsParamsVisible}
                            setRequestState={setRequestState}
                            setRequestStatus={setRequestStatus}
                            requestStatus={requestStatus}
                            initRequestStatus={initRequestStatus}
                            setSortState={setSortState}
                            initSortState={initSortState}
                        />
                    </div>
                </div>

                {!requestStatus.isLoading && requestStatus.isLoaded && (tableData?.length > 0 
                    ? <TableWidget
                        rawData={tableData}
                        loading={requestStatus.isLoading}
                        tablePaginationState={tablePaginationState}
                        setRequestState={setRequestState}
                        requestState={requestState}
                        setRequestStatus={setRequestStatus}
                        initRequestStatus={initRequestStatus}
                        sortState={sortState}
                        setSortState={setSortState}
                        initSortState={initSortState}
                    />
                    : <div className={styles.page__contentEmpty}>
                        По заданным параметрам запроса данные не найдены
                    </div>
                )}
            </section>

            <ErrorModal
                open={requestStatus.isError}
                message={requestStatus.message}
                onOk={handleErrorModalClose}
                onClose={handleErrorModalClose}
                onCancel={handleErrorModalClose}
                footer={null}
            />
        </main>
    );
};

export default TrendingRequestsPage;

