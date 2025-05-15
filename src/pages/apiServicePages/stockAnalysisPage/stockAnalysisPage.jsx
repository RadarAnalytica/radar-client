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
import { mockGetAnalysisData } from '../../../service/mockServiceFunctions';
import NoSubscriptionWarningBlock from '../../../components/sharedComponents/noSubscriptionWarningBlock'

const StockAnalysisPage = () => {

    const { user, authToken } = useContext(AuthContext)
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const [stockAnalysisData, setStockAnalysisData] = useState(); // это базовые данные для таблицы
    const [stockAnalysisFilteredData, setStockAnalysisFilteredData] = useState() // это данные для таблицы c учетом поиска
    const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false);
    const [loading, setLoading] = useState(true);
    const [primaryCollect, setPrimaryCollect] = useState(null)

    const fetchAnalysisData = async () => {
        setLoading(true);
        if (activeBrand) {
            let data = null;
            if (user.subscription_status === null) {
                data = await mockGetAnalysisData(
                    selectedRange,
                    activeBrand.id
                );
            } else {
                data = await ServiceFunctions.getAnalysisData(
                    authToken,
                    selectedRange,
                    activeBrand.id
                );
            }
            setStockAnalysisData(data);
            setStockAnalysisFilteredData(data)
            setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null))
        }

        setLoading(false);
    };

    // 2.1 Получаем данные по выбранному магазину и проверяем себестоимость
    useEffect(() => {
        setPrimaryCollect(activeBrand?.is_primary_collect)
        if (activeBrand && activeBrand.is_primary_collect) {
            fetchAnalysisData();
        }
    }, [selectedRange, activeBrand]);

    // 2.1.1 Проверяем изменился ли выбранный магазин при обновлении токена

    useEffect(() => {
        if (activeBrand && activeBrand.is_primary_collect && activeBrand.is_primary_collect !== primaryCollect) {
            setPrimaryCollect(activeBrand.is_primary_collect)
            fetchAnalysisData()
        }
    }, [authToken]);


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
                        <Header title='Аналитика по товарам' />
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

                    {/* DEMO BLOCK */}
                    { user.subscription_status === null && <NoSubscriptionWarningBlock />}
                    {/* !DEMO BLOCK */}

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
                    {activeBrand && activeBrand.is_primary_collect &&
                        <SearchWidget
                            stockAnalysisData={stockAnalysisData}
                            setStockAnalysisFilteredData={setStockAnalysisFilteredData}
                        />
                    }
                </div>
                {activeBrand && activeBrand.is_primary_collect &&
                    <TableWidget
                        stockAnalysisFilteredData={stockAnalysisFilteredData}
                        loading={loading}
                        setLoading={setLoading}
                    />
                }
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default StockAnalysisPage;
