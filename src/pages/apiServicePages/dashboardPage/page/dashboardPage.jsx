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

const _DashboardPage = () => {
    const { authToken } = useContext(AuthContext)
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const [dataDashBoard, setDataDashboard] = useState();
    const [loading, setLoading] = useState(true);

    const updateDataDashBoard = async (selectedRange, activeBrand, authToken) => {
        setLoading(true);
        try {

            if (activeBrand !== null && activeBrand !== undefined) {


                const data = await ServiceFunctions.getDashBoard(
                    authToken,
                    selectedRange,
                    activeBrand
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
        if (activeBrand && activeBrand.is_primary_collect) {
            updateDataDashBoard(selectedRange, activeBrand.id, authToken)
        }
    }, [activeBrand, selectedRange, authToken]);



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
                        //onUpdateDashboard={handleUpdateDashboard} //
                        />
                    </div>
                }
                {/* !SELF-COST WARNING */}



                {/* FILTERS */}
                <div className={styles.page__wrapper}>
                    <Filters
                        setLoading={setLoading}
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
                        {/* Сетка построена гридами в две колонки и строками по 25px. Используй grid-column: span X для управления высотой блоков */}
                        <div className={styles.page__chartGroup}>
                            <FinanceBlock
                                loading={loading}
                                dataDashBoard={dataDashBoard}
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
                                <RevenueStructChartBlock
                                    loading={loading}
                                    dataDashBoard={dataDashBoard}
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