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
import NoSubscriptionWarningBlock from '../../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'

const StockAnalysisPage = () => {

    const { user, authToken } = useContext(AuthContext)
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const { shops } = useAppSelector((state) => state.shopsSlice);
    const filters = useAppSelector((state) => state.filters);
    const [stockAnalysisData, setStockAnalysisData] = useState(); // это базовые данные для таблицы
    const [stockAnalysisFilteredData, setStockAnalysisFilteredData] = useState() // это данные для таблицы c учетом поиска
    const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false);
    const [loading, setLoading] = useState(false);
    const [primaryCollect, setPrimaryCollect] = useState(null)
    const [shopStatus, setShopStatus] = useState(null)


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
                    activeBrand.id,
                    filters
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
    }, [filters]);

    //2.1.1 Проверяем изменился ли выбранный магазин при обновлении токена
    // useEffect(() => {
    //     if (activeBrand && activeBrand.is_primary_collect && activeBrand.is_primary_collect !== primaryCollect) {
    //         setPrimaryCollect(activeBrand.is_primary_collect)
    //         fetchAnalysisData()
    //     }
    // }, [authToken]);

    useEffect(() => {
        if (activeBrand && activeBrand.id === 0 && shops) {
            const allShop = {
                id: 0,
                brand_name: 'Все',
                is_active: shops.some(_ => _.is_primary_collect),
                is_valid: true,
                is_primary_collect: shops.some(_ => _.is_primary_collect),
                is_self_cost_set: !shops.some(_ => !_.is_self_cost_set)
            }
            setShopStatus(allShop)
        }

        if (activeBrand && activeBrand.id !== 0 && shops) {
            const currShop = shops.find(_ => _.id === activeBrand.id)
            setShopStatus(currShop)
        }
    }, [shops, filters])


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
                    {/* SELF-COST WARNING */}
                    {
                        shopStatus &&
                        !shopStatus.is_self_cost_set &&
                        !loading &&
                        <div>
                            <SelfCostWarningBlock
                                shopId={activeBrand.id}
                                onUpdateDashboard={fetchAnalysisData} //
                            />
                        </div>
                    }
                    {/* DEMO BLOCK */}
                    {user.subscription_status === null && <NoSubscriptionWarningBlock />}
                    {/* !DEMO BLOCK */}

                    {/* FILTERS */}
                    <div>
                        <Filters
                            setLoading={setLoading}
                            isDataLoading={loading}
                        />
                    </div>
                    {/* !FILTERS */}

                    {/* DATA COLLECT WARNING */}
                    {shopStatus && !shopStatus.is_primary_collect &&
                        <DataCollectWarningBlock
                            title='Ваши данные еще формируются и обрабатываются.'
                        />
                    }
                    {/* !DATA COLLECT WARNING */}
                    {shopStatus && shopStatus.is_primary_collect &&
                        <SearchWidget
                            stockAnalysisData={stockAnalysisData}
                            setStockAnalysisFilteredData={setStockAnalysisFilteredData}
                            filters={filters}
                        />
                    }
                </div>
                {shopStatus && shopStatus.is_primary_collect &&
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
