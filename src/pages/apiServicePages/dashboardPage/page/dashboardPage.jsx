import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react'
import styles from './dashboardPage.module.css'
import { useAppSelector } from '../../../../redux/hooks'
import AuthContext from '../../../../service/AuthContext'
import { ServiceFunctions } from '../../../../service/serviceFunctions'

import Header from '../../../../components/sharedComponents/header/header'
import Sidebar from '../../../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../../../components/sharedComponents/mobilePlug/mobilePlug'
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent'
import SelfCostWarningBlock from '../../../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock'
import DataCollectWarningBlock from '../../../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock'
import FirstBarsGroup from '../../../../components/dashboardPageComponents/barsGroup/firstBarsGroup'
import SecondBarsGroup from '../../../../components/dashboardPageComponents/barsGroup/secondBarsGroup'
import MainChart from '../../../../components/dashboardPageComponents/charts/mainChart/mainChart'
import AbcDataBlock from '../../../../components/dashboardPageComponents/blocks/abcDataBlock/abcDataBlock'
import FinanceBlock from '../../../../components/dashboardPageComponents/blocks/financeBlock/financeBlock'
import ProfitBlock from '../../../../components/dashboardPageComponents/blocks/profitBlock/profitBlock'
import MarginChartBlock from '../../../../components/dashboardPageComponents/blocks/marginChartBlock/marginChartBlock'
import ProfitChartBlock from '../../../../components/dashboardPageComponents/blocks/profitChartBlock/profitChartBlock'
import StorageBlock from '../../../../components/dashboardPageComponents/blocks/storageBlock/storageBlock'
import StorageRevenueChartBlock from '../../../../components/dashboardPageComponents/blocks/storageRevenueChartBlock/storageRevenueChartBlock'
import CostsBlock from '../../../../components/dashboardPageComponents/blocks/costsBlock/costsBlock'
import RevenueStructChartBlock from '../../../../components/dashboardPageComponents/blocks/revenueStructChartBlock/revenueStructChartBlock'
import TaxTableBlock from '../../../../components/dashboardPageComponents/blocks/taxTableBlock/taxTableBlock'
import HowToLink from '../../../../components/sharedComponents/howToLink/howToLink'
import TurnoverBlock from '../../../../components/dashboardPageComponents/blocks/turnoverBlock/turnoverBlock'
import { mockGetDashBoard } from '../../../../service/mockServiceFunctions';
import NoSubscriptionWarningBlock from '../../../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'

const WarningBlocks = React.memo(({ shopStatus, loading, activeBrand, updateDataDashBoard }) => {
    if (!shopStatus) return null;

    return (
        <>
            {!shopStatus.is_self_cost_set && !loading && (
                <SelfCostWarningBlock
                    shopId={activeBrand.id}
                    onUpdateDashboard={updateDataDashBoard}
                />
            )}
            {!shopStatus.is_primary_collect && (
                <DataCollectWarningBlock
                    title='Ваши данные еще формируются и обрабатываются.'
                />
            )}
        </>
    );
});

const MainContent = React.memo(({
    shopStatus,
    loading,
    dataDashBoard,
    selectedRange,
    activeBrand,
    authToken,
    filters,
    updateDataDashBoard,
    isSidebarHidden
}) => {
    if (!shopStatus?.is_primary_collect) return null;

    return (
        <>
            <FirstBarsGroup
                dataDashBoard={dataDashBoard}
                selectedRange={selectedRange}
                loading={loading}
            />

            <MainChart
                title='Заказы и продажи'
                loading={loading}
                dataDashBoard={dataDashBoard}
                selectedRange={selectedRange}
            />

            <SecondBarsGroup
                dataDashBoard={dataDashBoard}
                loading={loading}
            />

            <div className={isSidebarHidden ? styles.page__chartGroup : styles.page__chartGroup_oneLine}>
                <FinanceBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                />
                <TurnoverBlock
                    loading={loading}
                    turnover={dataDashBoard?.turnover}
                    selectedRange={selectedRange}
                    activeBrand={activeBrand}
                    authToken={authToken}
                    filters={filters}
                />
                <MarginChartBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                />
                <ProfitChartBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                />
                <ProfitBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                />
                <StorageRevenueChartBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                />
                <StorageBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                />

                <div className={styles.page__doubleBlockWrapper}>
                    <RevenueStructChartBlock
                        loading={loading}
                        dataDashBoard={dataDashBoard}
                    />
                    <TaxTableBlock
                        loading={loading}
                        dataDashBoard={dataDashBoard}
                        updateDashboard={updateDataDashBoard}
                    />
                </div>

                <CostsBlock
                    loading={loading}
                    dataDashBoard={dataDashBoard}
                />
            </div>

            <AbcDataBlock
                titles={['Группа А', 'Группа В', 'Группа С']}
                data={dataDashBoard?.ABCAnalysis}
                loading={loading}
            />
        </>
    );
});

const _DashboardPage = () => {
    const { user, authToken } = useContext(AuthContext)
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const { shops } = useAppSelector((state) => state.shopsSlice);
    const filters = useAppSelector((state) => state.filters);
    const { isSidebarHidden } = useAppSelector((state) => state.utils);

    const [pageState, setPageState] = useState({
        dataDashBoard: null,
        loading: true,
        primaryCollect: null,
        shopStatus: null
    });

    const updateDataDashBoard = useCallback(async (selectedRange, activeBrand, authToken) => {
        setPageState(prev => ({ ...prev, loading: true }));
        try {
            if (activeBrand !== null && activeBrand !== undefined) {
                if (user.subscription_status === null) {
                    const data = await mockGetDashBoard(selectedRange, activeBrand);
                    setPageState(prev => ({ ...prev, dataDashBoard: data }));
                    return;
                }

                const data = await ServiceFunctions.getDashBoard(
                    authToken,
                    selectedRange,
                    activeBrand,
                    filters
                );
                setPageState(prev => ({ ...prev, dataDashBoard: data }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setPageState(prev => ({ ...prev, loading: false }));
        }
    }, [user.subscription_status, filters]);

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
        if (activeBrand?.is_primary_collect) {
            setPageState(prev => ({ ...prev, primaryCollect: activeBrand.is_primary_collect }));
            updateDataDashBoard(selectedRange, activeBrand.id, authToken);
        }
    }, [activeBrand, selectedRange, filters, updateDataDashBoard]);

    return (
        <main className={styles.page}>
            <MobilePlug />
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header title='Сводка продаж' />
                </div>

                {!shopStatus?.is_self_cost_set && !pageState.loading && (
                    <SelfCostWarningBlock
                        shopId={activeBrand.id}
                        onUpdateDashboard={updateDataDashBoard}
                    />
                )}

                {/* <WarningBlocks
                    shopStatus={shopStatus}
                    loading={pageState.loading}
                    activeBrand={activeBrand}
                    updateDataDashBoard={updateDataDashBoard}
                /> */}

                {user.subscription_status === null && <NoSubscriptionWarningBlock />}

                <div className={styles.page__controlsWrapper}>
                    <Filters
                        setLoading={(loading) => setPageState(prev => ({ ...prev, loading }))}
                    />

                    <HowToLink
                        text='Как проверить данные?'
                        target='_blank'
                        url='https://radar.usedocs.com/article/75916'
                    />
                </div>

                {!shopStatus?.is_primary_collect && (
                    <DataCollectWarningBlock
                        title='Ваши данные еще формируются и обрабатываются.'
                    />
                )}

                <MainContent
                    shopStatus={shopStatus}
                    loading={pageState.loading}
                    dataDashBoard={pageState.dataDashBoard}
                    selectedRange={selectedRange}
                    activeBrand={activeBrand}
                    authToken={authToken}
                    filters={filters}
                    updateDataDashBoard={updateDataDashBoard}
                    isSidebarHidden={isSidebarHidden}
                />
            </section>
        </main>
    )
}

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;