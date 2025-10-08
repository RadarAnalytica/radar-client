import React, { useState, useContext, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import AuthContext from '@/service/AuthContext';
import { SearchWidget, TableWidget } from './widgets';
import { ServiceFunctions } from '@/service/serviceFunctions';
import styles from './stockAnalysisPage.module.css';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from '@/app/providers/DemoDataProvider';

const StockAnalysisPage = () => {
    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { activeBrand, selectedRange, shops } = useAppSelector((state) => state.filters);
    // const { shops } = useAppSelector((state) => state.shopsSlice);
    const filters = useAppSelector((state) => state.filters);
    const [stockAnalysisData, setStockAnalysisData] = useState([]); // это базовые данные для таблицы
    const [stockAnalysisFilteredData, setStockAnalysisFilteredData] = useState(); // это данные для таблицы c учетом поиска
    const [setHasSelfCostPrice] = useState(false);
    const [loading, setLoading] = useState(false);
    const [primaryCollect, setPrimaryCollect] = useState(null);
    const [shopStatus, setShopStatus] = useState(null);

    const fetchAnalysisData = async () => {
        setLoading(true);
        try {
            const data = await ServiceFunctions.getAnalysisData(
                authToken,
                selectedRange,
                activeBrand?.id,
                filters
            );

            setStockAnalysisData(data);
            setStockAnalysisFilteredData(data);
            setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null));

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 2.1 Получаем данные по выбранному магазину и проверяем себестоимость
    useEffect(() => {
        setPrimaryCollect(activeBrand?.is_primary_collect);
        fetchAnalysisData();
    }, []);

    useEffect(() => {
        if (activeBrand && activeBrand.id === 0 && shops) {
            const allShop = {
                id: 0,
                brand_name: 'Все',
                is_active: shops.some(_ => _.is_primary_collect),
                is_valid: true,
                is_primary_collect: shops.some(_ => _.is_primary_collect),
                is_self_cost_set: !shops.some(_ => !_.is_self_cost_set)
            };
            setShopStatus(allShop);
        }

        if (activeBrand && activeBrand.id !== 0 && shops) {
            const currShop = shops.find(_ => _.id === activeBrand.id);
            setShopStatus(currShop);
        }

        fetchAnalysisData();
    }, [shops, filters]);

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
                    {/* HEADER */}
                    <div className={styles.page__headerWrapper}>
                        <Header title='Аналитика по товарам' />
                    </div>

                    {/* SELF-COST WARNING */}
                    {
                        activeBrand &&
                        !activeBrand.is_self_cost_set &&
                        !loading &&
                        <div>
                            <SelfCostWarningBlock
                                shopId={activeBrand.id}
                                onUpdateDashboard={fetchAnalysisData} //
                            />
                        </div>
                    }

                    {/* DEMO BLOCK */}
                    {isDemoMode && <NoSubscriptionWarningBlock />}

                    {/* FILTERS */}
                    <div>
                        <Filters
                            setLoading={setLoading}
                            isDataLoading={loading}
                        />
                    </div>

                    {/* DATA COLLECT WARNING */}
                    {shopStatus && !shopStatus.is_primary_collect &&
                        <DataCollectWarningBlock
                            title='Ваши данные еще формируются и обрабатываются.'
                        />
                    }

                    {/* SEARCH WIDGET */}
                    {shopStatus && shopStatus.is_primary_collect &&
                        <SearchWidget
                            stockAnalysisData={stockAnalysisData}
                            setStockAnalysisFilteredData={setStockAnalysisFilteredData}
                            filters={filters}
                        />
                    }
                </div>

                {/* {(isDemoMode || (shopStatus && shopStatus.is_primary_collect)) && ()} */}
                <TableWidget
                    stockAnalysisFilteredData={stockAnalysisFilteredData}
                    loading={loading}
                    setLoading={setLoading}
                />
            </section>
x       </main>
    );
};

export default StockAnalysisPage;
