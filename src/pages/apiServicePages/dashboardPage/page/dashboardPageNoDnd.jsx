import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import styles from './dashboardPageNoDnd.module.css';
import { useAppSelector } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import FirstBarsGroup from '@/components/dashboardPageComponents/barsGroup/firstBarsGroup';
import SecondBarsGroup from '@/components/dashboardPageComponents/barsGroup/secondBarsGroup';
import MainChart from '@/components/dashboardPageComponents/charts/mainChart/mainChart';
import AbcDataBlock from '@/components/dashboardPageComponents/blocks/abcDataBlock/abcDataBlock';
import FinanceBlock from '@/components/dashboardPageComponents/blocks/financeBlock/financeBlock';
import ProfitBlock from '@/components/dashboardPageComponents/blocks/profitBlock/profitBlock';
import MarginChartBlock from '@/components/dashboardPageComponents/blocks/marginChartBlock/marginChartBlock';
import StorageBlock from '@/components/dashboardPageComponents/blocks/storageBlock/storageBlock';
import StorageRevenueChartBlock from '@/components/dashboardPageComponents/blocks/storageRevenueChartBlock/storageRevenueChartBlock';
import RevenueStructChartBlock from '@/components/dashboardPageComponents/blocks/revenueStructChartBlock/revenueStructChartBlock';
import TaxTableBlock from '@/components/dashboardPageComponents/blocks/taxTableBlock/taxTableBlock';
import StockAnalysisBlock from '@/components/dashboardPageComponents/blocks/stockAnalysisBlock/stockAnalysisBlock';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";
import { fileDownload } from '@/service/utils';
import DownloadButton from '@/components/DownloadButton';
import { GeneralLayout } from '@/shared';

const MainContent = React.memo(({
    shopStatus,
    loading,
    isFiltersLoading,
    dataDashBoard,
    selectedRange,
    activeBrand,
    authToken,
    filters,
    updateDataDashBoard,
    isSidebarHidden,
    stockAnalysisData
}) => {
    const isLoading = loading || isFiltersLoading;
    // Если фильтры загружены и shopStatus не подходит, не рендерим
    if (!isFiltersLoading && !shopStatus?.is_primary_collect) return null;

    return (
        <div className={styles.page__mainContentWrapper}>
            <FirstBarsGroup
                dataDashBoard={dataDashBoard}
                selectedRange={selectedRange}
                loading={isLoading}
            />

            <MainChart
                title='Заказы и продажи'
                loading={isLoading}
                dataDashBoard={dataDashBoard}
                selectedRange={selectedRange}
            />

            <SecondBarsGroup
                dataDashBoard={dataDashBoard}
                loading={isLoading}
                selectedRange={selectedRange}
                activeBrand={activeBrand}
                authToken={authToken}
                filters={filters}
            />

            <div className={styles.page__chartGroup}>
                <FinanceBlock
                    loading={isLoading}
                    dataDashBoard={dataDashBoard}
                />
                <ProfitBlock
                    loading={isLoading}
                    dataDashBoard={dataDashBoard}
                />

                <div className={styles.page__doubleBlockWrapper}>
                    <TaxTableBlock
                        loading={isLoading}
                        dataDashBoard={dataDashBoard}
                        updateDashboard={updateDataDashBoard}
                    />
                    <RevenueStructChartBlock
                        loading={isLoading}
                        dataDashBoard={dataDashBoard}
                    />
                </div>

                <MarginChartBlock
                    loading={isLoading}
                    dataDashBoard={dataDashBoard}
                />
                {/* <ProfitChartBlock
                    loading={isLoading}
                    dataDashBoard={dataDashBoard}
                /> */}

                <StorageRevenueChartBlock
                    loading={isLoading}
                    dataDashBoard={dataDashBoard}
                />
                <StorageBlock
                    loading={isLoading}
                    dataDashBoard={dataDashBoard}
                />

                {/* <CostsBlock
                    loading={isLoading}
                    dataDashBoard={dataDashBoard}
                /> */}
            </div>

            <StockAnalysisBlock
                data={stockAnalysisData}
                dashboardLoading={isLoading}
            />

            <AbcDataBlock
                titles={['Группа А', 'Группа В', 'Группа С']}
                data={dataDashBoard?.ABCAnalysis}
                loading={isLoading}
            />
        </div>
    );
});

MainContent.displayName = 'MainContent';

const DashboardPageContent = () => {
    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { isFiltersLoaded, activeBrand, shops, activeBrandName, activeArticle, activeGroup, selectedRange } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const { isSidebarHidden } = useAppSelector((state) => state.utils);
    const [downloadLoading, setDownloadLoading] = useState(false);

    const [pageState, setPageState] = useState({
        dataDashBoard: null,
        loading: true,
        primaryCollect: null,
        shopStatus: null,
        stockAnalysisData: null,
    });

    const fetchAnalysisData = useCallback(async (filters, authToken) => {
        try {
            const data = await ServiceFunctions.getAnalysisData(
                authToken,
                filters.selectedRange,
                filters.activeBrand?.id,
                filters
            );

            setPageState(prev => ({ ...prev, stockAnalysisData: data }));
        } catch (error) {
            console.error(error);
        }
    }, []);

    const updateDataDashBoard = useCallback(async (filters, authToken) => {
        setPageState(prev => ({ ...prev, loading: true }));
        try {
            if (activeBrand !== null && activeBrand !== undefined) {
                const data = await ServiceFunctions.getDashBoard(
                    authToken,
                    filters.selectedRange,
                    filters.activeBrand.id,
                    filters
                );
                setPageState(prev => ({ ...prev, dataDashBoard: data }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setPageState(prev => ({ ...prev, loading: false }));
        }
    }, [activeBrand]);

    const handleDownload = async () => {
        setDownloadLoading(true);
        try {
            const fileBlob = await ServiceFunctions.getDownloadDashboard(
                authToken,
                selectedRange,
                activeBrand.id,
                filters,
            );
            fileDownload(fileBlob, 'Сводка_продаж.xlsx');
        } catch (e) {
            console.error('Ошибка скачивания: ', e);
        } finally {
            setDownloadLoading(false);
        }
    };

    const shopStatus = useMemo(() => {
        if (!activeBrand || !shops) return null;

        if (activeBrand.id === 0) {
            return {
                id: 0,
                brand_name: 'Все',
                is_active: shops.some(_ => _.is_primary_collect),
                is_valid: true,
                is_primary_collect: shops.some(_ => _.is_primary_collect),
                is_self_cost_set: !shops.some(_ => !_.is_self_cost_set)
            };
        }

        return shops.find(_ => _.id === activeBrand.id);
    }, [activeBrand, shops]);

    useEffect(() => {
        if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded) {
            setPageState(prev => ({ ...prev, primaryCollect: activeBrand.is_primary_collect }));
            updateDataDashBoard(filters, authToken);
            fetchAnalysisData(filters, authToken);
        }

        if (activeBrand && !activeBrand.is_primary_collect && isFiltersLoaded) {
            setPageState(prev => ({ ...prev, loading: false }));
        }
    }, [activeBrand, isFiltersLoaded, selectedRange, activeBrandName, activeArticle, activeGroup]);

    return (
        <GeneralLayout
            headerProps={{
                title: 'Сводка продаж',
                howToLink: "https://radar.usedocs.com/article/75916",
                howToLinkText: "Как проверить данные?",
                hasShadow: false
            }}
        >
            <section className={styles.page__content}>
                {activeBrand && activeBrand.is_primary_collect && !activeBrand.is_self_cost_set && (
                    <SelfCostWarningBlock
                        shopId={activeBrand?.id}
                        onUpdateDashboard={updateDataDashBoard}
                    />
                )}

                {isDemoMode && <NoSubscriptionWarningBlock />}

                <div className={styles.page__controlsWrapper}>
                    <Filters
                        isDataLoading={pageState?.loading}
                        hasShopCreationLimit
                    />
                    <DownloadButton
                        handleDownload={handleDownload}
                        loading={pageState?.loading || downloadLoading}
                    />
                </div>

                {activeBrand && !activeBrand.is_primary_collect && (
                    <DataCollectWarningBlock />
                )}

                <MainContent
                    shopStatus={shopStatus}
                    loading={pageState.loading}
                    isFiltersLoading={!isFiltersLoaded}
                    dataDashBoard={pageState.dataDashBoard}
                    selectedRange={filters?.selectedRange}
                    activeBrand={activeBrand}
                    authToken={authToken}
                    filters={filters}
                    updateDataDashBoard={updateDataDashBoard}
                    isSidebarHidden={isSidebarHidden}
                    stockAnalysisData={pageState.stockAnalysisData}
                />
            </section>
        </GeneralLayout>
    );
};

const DashboardPage = React.memo(DashboardPageContent);
export default DashboardPage;
