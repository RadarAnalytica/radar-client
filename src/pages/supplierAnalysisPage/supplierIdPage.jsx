import React, { useEffect, useState } from 'react';
import styles from './supplierIdPage.module.css';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { BarsWidget, MainChartWidget, TableWidget, StockChartWidget } from './widgets';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import Breadcrumbs from '@/components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { mainTableConfig, goodsTableConfig, salesTableConfig, ordersStructByWarehousesTableConfig, ordersStructBySizesTableConfig } from './shared';
import { GoodsTableCustomHeader, OrdersTableCustomHeader, StockChartCustomHeader } from './entities';
import {
    fetchSupplierAnalysisMetaData,
    fetchSupplierAnalysisIndicatorsData,
    fetchSupplierAnalysisMainChartData,
    fetchSupplierAnalysisByDatesTableData,
    fetchSupplierAnalysisByBrandTableData,
    fetchSupplierAnalysisBySubjectsTableData,
    fetchSupplierAnalysisByWarehousesTableData,
    fetchSupplierAnalysisBySizesTableData,
    fetchSupplierAnalysisByWharehousesComparsionData,
    fetchSupplierAnalysisByIncomingOrdersComparsionData,
    fetchSupplierAnalysisByOrderedProductsComparsionData,
    fetchSupplierAnalysisByAvgPricesComparsionData,
    fetchSupplierAnalysisByAvgDiscountsComparsionData,
    fetchSupplierAnalysisByStockSizeComparsionData
} from '@/redux/supplierAnalysis/supplierAnalysisActions';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { actions as supplierActions } from '@/redux/supplierAnalysis/supplierAnalysisSlice';
import {
    selectMainSupplierData,
    selectStockChartTab,
    selectOrdersStructureTab
} from '@/redux/supplierAnalysis/supplierAnalysisSelectors';
import NoSubscriptionWarningBlock
  from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";
import { useDemoMode } from "@/app/providers";

const SupplierIdPage = () => {
    const { isDemoMode } = useDemoMode();
    const dispatch = useAppDispatch();
    const mainSupplierData = useAppSelector(selectMainSupplierData);
    const isAnyDataLoading = useAppSelector(store => store.supplierAnalysis.isAnyDataLoading);
    const params = useParams();
    const navigate = useNavigate();

    //Проверяем наличие базовых данных поставщика и запрашиваем их если их нет
    useEffect(() => {
        //берем айди из урл
        const { id } = params;
        // если его нет то редиректим
        if (!id) { navigate('/supplier-analysis'); return; };
        // если айди найден и уже есть данные поставщика и айди совпадают то ничего не делаем
        if (mainSupplierData && mainSupplierData.supplier_id === parseInt(id)) { return; } else {
            const supplierChecker = async (id) => {
                // запускаем поиск
                const res = await ServiceFunctions.getSupplierAnalysisSuggestData(id, () => { });
                // еслио н пустой редиректим
                if (res.length === 0) {
                    navigate('/supplier-analysis');
                } else {
                    // ищем поставщика по айди
                    const current = res.find(_ => _.supplier_id === parseInt(id));
                    // редиректим если не найдено
                    if (!current) {
                        navigate('/supplier-analysis');
                        return;
                    }
                    // сохраняем если найдено
                    if (current) {
                        dispatch(supplierActions.setSupplierMainData(current));
                    }
                }
            };
            // если все выше не прошло - проверяем
            supplierChecker(id);

        }


    }, [params, mainSupplierData]);


    //сброс при анмаунте
    useEffect(() => {
        return () => {
            dispatch(supplierActions.resetState());
        };
    }, []);


    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__additionalWrapper}>
                    <div className={styles.page__headerWrapper}>
                        <Header
                            title={
                                <Breadcrumbs
                                    config={[
                                        { slug: '/supplier-analysis', name: 'Анализ поставщика' },
                                        { name: mainSupplierData?.trademark || mainSupplierData?.name },
                                    ]}
                                />
                            }
                        />
                    </div>

                    {isDemoMode && <NoSubscriptionWarningBlock />}

                    <BarsWidget
                        dataHandler={fetchSupplierAnalysisMetaData}
                        dataType='metaData'
                        id={mainSupplierData?.supplier_id}
                    />
                    <div className={styles.page__filtersWrapper}>
                        <Filters
                            setLoading={() => {}}
                            shopSelect={false}
                            brandSelect={false}
                            articleSelect={false}
                            groupSelect={false}
                            tempPageCondition='supplier'
                            isDataLoading={isAnyDataLoading}
                        />
                    </div>
                    <BarsWidget
                        dataHandler={fetchSupplierAnalysisIndicatorsData}
                        dataType='indicatorsData'
                        id={mainSupplierData?.supplier_id}
                    />
                    <MainChartWidget
                        id={mainSupplierData?.supplier_id}
                        dataType='mainChartData'
                        dataHandler={fetchSupplierAnalysisMainChartData}
                    />
                </div>


                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        id={mainSupplierData?.supplier_id}
                        tableConfig={mainTableConfig}
                        //downloadButton
                        dataType='byDatesTableData'
                        dataHandler={fetchSupplierAnalysisByDatesTableData}
                        containerHeight='90vh'
                    />
                </div>
                <div className={styles.page__tableWrapper}>
                    <GoodsTableCustomHeader id={mainSupplierData?.supplier_id} />
                    <TableWidget
                        id={mainSupplierData?.supplier_id}
                        tableConfig={goodsTableConfig}
                        //downloadButton
                        dataType='byBrandsTableData'
                        dataHandler={fetchSupplierAnalysisByBrandTableData}
                        containerHeight='90vh'
                        hasPagination
                    />
                </div>
                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={salesTableConfig}
                        id={mainSupplierData?.supplier_id}
                        //downloadButton
                        dataType='bySubjectsTableData'
                        dataHandler={fetchSupplierAnalysisBySubjectsTableData}
                        title={`Продажи по категориям поставщика: ${mainSupplierData?.display_name}`}
                        containerHeight='400px'
                        hasPagination
                    />
                </div>
                <div className={styles.page__tableWrapper}>
                    <OrdersTableCustomHeader />
                    <TableTabsWrapper />
                </div>

                <div className={styles.page__additionalWrapper}>
                    <StockChartWidget
                        //downloadButton
                        title='Распределение товарных остатков по складам'
                        dataType='byWharehousesComparsionData'
                        units='шт'
                        chartType='bar'
                        dataHandler={fetchSupplierAnalysisByWharehousesComparsionData}
                    />
                </div>
                <div className={styles.page__additionalWrapper}>
                    <StockChartCustomHeader />
                    <ChartTabsWrapper />
                </div>

            </section>
            {/* ---------------------- */}
        </main>
    );
};


const TableTabsWrapper = () => {

    const mainSupplierData = useAppSelector(selectMainSupplierData);
    const ordersStructureTab = useAppSelector(selectOrdersStructureTab);

    return (
        <>
            {ordersStructureTab === 'По складам (последние 30 дней)' &&
                <TableWidget
                    tableConfig={ordersStructByWarehousesTableConfig}
                    id={mainSupplierData?.supplier_id}
                    dataType='byWarehousesTableData'
                    dataHandler={fetchSupplierAnalysisByWarehousesTableData}
                    containerHeight='450px'
                />
            }
            {ordersStructureTab === 'По размерам' &&
                <TableWidget
                    tableConfig={ordersStructBySizesTableConfig}
                    id={mainSupplierData?.supplier_id}
                    dataType='bySizesTableData'
                    dataHandler={fetchSupplierAnalysisBySizesTableData}
                    containerHeight='450px'
                />
            }
        </>
    );
};

const getStockChartProps = (tabType) => {
    let props = {
        units: 'руб',
        dataType: 'byIncomingOrdersComparsionData',
        dataHandler: fetchSupplierAnalysisByIncomingOrdersComparsionData,
        summaryType: undefined
    };
    if (tabType === 'Входящие заказы') {
        return props;
    }
    if (tabType === 'Заказанные товары') {
        props = {
            units: 'шт',
            dataType: 'byOrderedProductsComparsionData',
            dataHandler: fetchSupplierAnalysisByOrderedProductsComparsionData,
            summaryType: undefined
        };
        return props;
    }
    if (tabType === 'Средние цены') {
        props = {
            units: 'руб',
            dataType: 'byAvgPricesComparsionData',
            dataHandler: fetchSupplierAnalysisByAvgPricesComparsionData,
            summaryType: 'avg'
        };
        return props;
    }
    if (tabType === 'Средние скидки') {
        props = {
            units: '%',
            dataType: 'byAvgDiscountsComparsionData',
            dataHandler: fetchSupplierAnalysisByAvgDiscountsComparsionData,
            summaryType: 'avg'
        };
        return props;
    }
    if (tabType === 'Товарные остатки') {
        props = {
            units: 'шт',
            dataType: 'byStockSizeComparsionData',
            dataHandler: fetchSupplierAnalysisByStockSizeComparsionData,
            summaryType: 'last_value'
        };
        return props;
    }
};


const ChartTabsWrapper = () => {
    const stockChartTab = useAppSelector(selectStockChartTab);
    const [config, setConfig] = useState(getStockChartProps(stockChartTab));

    useEffect(() => {
        setConfig(getStockChartProps(stockChartTab));
    }, [stockChartTab]);
    return (
            <StockChartWidget
                {...config}
            />
    );
};

export default SupplierIdPage;
