import React, { useState, useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import Sidebar from '../../../components/sharedComponents/sidebar/sidebar';
import Header from '../../../components/sharedComponents/header/header';
import MobilePlug from '../../../components/sharedComponents/mobilePlug/mobilePlug';
import { Filters } from '../../../components/sharedComponents/apiServicePagesFiltersComponent';
import SelfCostWarningBlock from '../../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import DataCollectWarningBlock from '../../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import AuthContext from '../../../service/AuthContext';
import { SearchWidget, TableWidget } from './widgets';
import { ServiceFunctions } from '../../../service/serviceFunctions';
import styles from './stockAnalysisPage.module.css'

const StockAnalysisPage = () => {

    const { authToken } = useContext(AuthContext)
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const [stockAnalysisData, setStockAnalysisData] = useState(); // это данные для таблицы
    const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false);
    const [loading, setLoading] = useState(true);

    // 2.1 Получаем данные по выбранному магазину и проверяем себестоимость
    useEffect(() => {
        const fetchAnalysisData = async () => {
            setLoading(true);
            if (activeBrand) {

                const data = await ServiceFunctions.getAnalysisData(
                    authToken,
                    selectedRange,
                    activeBrand.id
                );
                setStockAnalysisData(data);
                setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null))

            }
            //prevDays.current = selectedRange;
            //prevActiveBrand.current = activeBrand.id;


            setLoading(false);
        };
        if (activeBrand?.is_primary_collect) {
            fetchAnalysisData();
        }
    }, [selectedRange, activeBrand, authToken]);

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                <div className={styles.page__staticContentWrapper}>
                    {/* header */}
                    <div className={styles.page__headerWrapper}>
                        <Header title='Товарная аналитика' />
                    </div>
                    {/* !header */}

                    {/* SELF-COST WARNING */}
                    {stockAnalysisData &&
                        !hasSelfCostPrice &&
                        activeBrand &&
                        activeBrand.id !== 0 &&
                        !loading &&
                        <div>
                            <SelfCostWarningBlock
                                shopId={activeBrand.id}
                            //onUpdateDashboard={updateDataDashBoard} //
                            />
                        </div>
                    }
                    {/* !SELF-COST WARNING */}

                    {/* FILTERS */}
                    <div>
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
                    <SearchWidget />
                </div>
                <TableWidget
                    stockAnalysisData={stockAnalysisData}
                />
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default StockAnalysisPage;
