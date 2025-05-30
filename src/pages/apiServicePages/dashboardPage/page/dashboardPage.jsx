import React, { useState, useContext, useEffect } from 'react'
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


const _DashboardPage = () => {

    const { user, authToken } = useContext(AuthContext)
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const { isSidebarHidden } = useAppSelector((state) => state.utils);
    const [dataDashBoard, setDataDashboard] = useState();
    const [loading, setLoading] = useState(true);
    const [primaryCollect, setPrimaryCollect] = useState(null)

    const updateDataDashBoard = async (selectedRange, activeBrand, authToken) => {
        setLoading(true);
        try {
            if (activeBrand !== null && activeBrand !== undefined) {
                // CHECK FOR MOCKDATA
                if (user.subscription_status === null) {
                    ;
                    const data = await mockGetDashBoard(selectedRange, activeBrand);
                    setDataDashboard(data);
                    return
                }
               
                const data = await ServiceFunctions.getDashBoard(
                    authToken,
                    selectedRange,
                    activeBrand,
                    filters
                );
                setDataDashboard(data);
            }

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeBrand && activeBrand.is_primary_collect && activeBrand.is_primary_collect !== primaryCollect) {
            setPrimaryCollect(activeBrand.is_primary_collect)
            updateDataDashBoard(selectedRange, activeBrand.id, authToken)
        }
    }, [authToken]);

    useEffect(() => {
        setPrimaryCollect(activeBrand?.is_primary_collect)
        if (activeBrand && activeBrand.is_primary_collect) {
            updateDataDashBoard(selectedRange, activeBrand.id, authToken)
        }
    }, [activeBrand, selectedRange, filters]);



    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='Сводка продаж' />
                </div>
                {/* !header */}

                {/* SELF-COST WARNING */}
                {dataDashBoard &&
                    !dataDashBoard.costPriceAmount &&
                    activeBrand &&
                    activeBrand.id !== 0 &&
                    !loading &&
                    <div>
                        <SelfCostWarningBlock
                            shopId={activeBrand.id}
                            onUpdateDashboard={updateDataDashBoard} //
                        />
                    </div>
                }
                {/* !SELF-COST WARNING */}

                {/* DEMO BLOCK */}
                {user.subscription_status === null && <NoSubscriptionWarningBlock />}
                {/*  */}

                {/* FILTERS */}
                <div className={styles.page__controlsWrapper}>
                    <Filters
                        setLoading={setLoading}
                    />

                    <HowToLink
                        text='Как проверить данные?'
                        target='_blank'
                        url='https://radar.usedocs.com/article/75916'
                    />
                </div>
                {/* !FILTERS */}

                {/* DATA COLLECT WARNING */}
                {activeBrand && !activeBrand.is_primary_collect &&
                    <DataCollectWarningBlock
                        title='Ваши данные еще формируются и обрабатываются.'
                    />
                }
                {/* !DATA COLLECT WARNING */}


                {/* ----------- MAIN CONTENT -------------- */}
                {activeBrand && activeBrand.is_primary_collect &&
                    <>
                        {/* First group of data bars */}
                        <FirstBarsGroup
                            dataDashBoard={dataDashBoard}
                            selectedRange={selectedRange}
                            loading={loading}
                        />

                        {/* Main chart */}
                        <MainChart
                            title='Заказы и продажи'
                            loading={loading}
                            dataDashBoard={dataDashBoard}
                            selectedRange={selectedRange}
                        />
                        {/* Second group of data bars */}
                        <SecondBarsGroup
                            dataDashBoard={dataDashBoard}
                            loading={loading}
                        />

                        {/*  Grid group */}
                        {/* Сетка построена гридами в две колонки и строками по 25px. Используй grid-row: span X для управления высотой блоков */}
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

                        {/* ABC-analysis block */}
                        <AbcDataBlock
                            titles={['Группа А', 'Группа В', 'Группа С']}
                            data={dataDashBoard?.ABCAnalysis}
                            loading={loading}
                        />
                    </>
                }

            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default _DashboardPage