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
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';

const StockAnalysisPage = () => {
    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { activeBrand, selectedRange, shops } = useAppSelector((state) => state.filters);
    // const { shops } = useAppSelector((state) => state.shopsSlice);
    const filters = useAppSelector((state) => state.filters);
    const [stockAnalysisData, setStockAnalysisData] = useState([]); // это базовые данные для таблицы
    const [stockAnalysisFilteredData, setStockAnalysisFilteredData] = useState(); // это данные для таблицы c учетом поиска
    const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false);
    const [loading, setLoading] = useState(true);
    const progress = useLoadingProgress({ loading });
    const [primaryCollect, setPrimaryCollect] = useState(null);
    const [shopStatus, setShopStatus] = useState(null);

    const fetchAnalysisData = async () => {
        setLoading(true);
        setStockAnalysisData([])
        setStockAnalysisFilteredData([])
        progress.start();
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
            setLoading(false);

            progress.complete();
            // await setTimeout(() => {
            //     setStockAnalysisData(data);
            //     setStockAnalysisFilteredData(data);
            //     setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null));
            //     setLoading(false);
            // }, 500);
        } catch (error) {
            console.error(error);
        }
    };

    // 2.1 Получаем данные по выбранному магазину и проверяем себестоимость
    // useEffect(() => {
    //     setPrimaryCollect(activeBrand?.is_primary_collect);
    //     fetchAnalysisData();
    // }, []);

    useEffect(() => {
        if (filters.activeBrand) {
            fetchAnalysisData();
        }
    }, [filters]);


    return (
        <main className={styles.page}>
            <MobilePlug />
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            <section className={styles.page__content}>
                <div className={styles.page__staticContentWrapper}>
                    <div className={styles.page__headerWrapper}>
                        <Header title='Аналитика по товарам' />
                    </div>

                    {activeBrand && activeBrand.is_primary_collect && !activeBrand.is_self_cost_set && !loading &&
                        <div>
                            <SelfCostWarningBlock
                                shopId={activeBrand.id}
                                onUpdateDashboard={fetchAnalysisData} //
                            />
                        </div>
                    }

                    {isDemoMode && <NoSubscriptionWarningBlock />}

                    <div>
                        <Filters
                            setLoading={setLoading}
                            isDataLoading={loading}
                        />
                    </div>

                    {!activeBrand?.is_primary_collect &&
                        <DataCollectWarningBlock
                            title='Ваши данные еще формируются и обрабатываются.'
                        />
                    }

                    {activeBrand?.is_primary_collect &&
                        <SearchWidget
                            stockAnalysisData={stockAnalysisData}
                            setStockAnalysisFilteredData={setStockAnalysisFilteredData}
                            filters={filters}
                        />
                    }
                </div>

                {(isDemoMode || activeBrand?.is_primary_collect) &&
                    <TableWidget
                        stockAnalysisFilteredData={stockAnalysisFilteredData}
                        loading={loading}
                        setLoading={setLoading}
                        progress={progress.value}
                    />
                }
            </section>
        </main>
    );
};

export default StockAnalysisPage;
