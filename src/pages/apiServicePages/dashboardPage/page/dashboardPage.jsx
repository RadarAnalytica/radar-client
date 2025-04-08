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
import MainChart from '../../../../components/dashboardPageComponents/charts/mainChart/mainChart'
import NoSubscriptionWarningBlock from '../../../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'

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

                //   if (data?.salesAndProfit) {
                //     const formattedData = processSalesAndProfit(data.salesAndProfit);
                //     setSalesAndProfit(formattedData);
                //   }
                //   if (data?.marginalityRoiChart) {
                //     const formattedData = processMarginalityRoiChart(data.marginalityRoiChart);
                //     setChartRoiMarginalityData(formattedData);
                //   }
                //   if (data?.revenueByWarehouse) {
                //     const formattedData = processRevenueData(data.revenueByWarehouse);
                //     SetRevenueByWarehouse(formattedData);
                //   }
                //   if (data?.structure) {
                //     const formattedData = processStructureData(data.structure);
                //     setStructure(formattedData);
                //   }

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

                {/* NO SUBSCRIPTION WARNING BLOCK */}
                <NoSubscriptionWarningBlock />
                {/* !NO SUBSCRIPTION WARNING BLOCK */}

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
                    </>
                }

            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default _DashboardPage