import React, { useState, useEffect } from 'react'
import styles from './supplierIdPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { ItemWidget, BarsWidget, MainChartWidget, TableWidget, StockChartWidget } from './widgets'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import Breadcrumbs from '../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchSkuAnalysisMainChartData, fetchSkuAnalysisSkuData, fetchSkuAnalysisIndicatorsData, fetchSkuAnalysisMainTableData, fetchSkuAnalysisByColorTableData, fetchSkuAnalysisByWarehousesTableData, fetchSkuAnalysisBySizeTableData } from '../../redux/skuAnalysis/skuAnalysisActions'
import { actions as skuAnalysisActions } from '../../redux/skuAnalysis/skuAnalysisSlice'
import { ConfigProvider, Segmented } from 'antd'
import { mainTableConfig, goodsTableConfig, salesTableConfig, ordersStructByColorsTableConfig } from './shared'
import { GoodsTableCustomHeader, OrdersTableCustomHeader, StockChartCustomHeader } from './entities'
import DownloadButton from '../../components/DownloadButton'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal'


const segments = ['По цветам', 'По складам', 'По размерам']

const SupplierIdPage = () => {
    const dispatch = useAppDispatch()
    const { selectedRange } = useAppSelector(store => store.filters)
    const { dataStatus, skuMainTableData, skuByColorTableData, skuByWarehouseTableData, skuBySizeTableData } = useAppSelector(store => store.skuAnalysis)
    const [loading, setLoading] = useState(false)
    const [tabsState, setTabsState] = useState(segments[0])
    const params = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        const loadSkuAnalysisData = async () => {
            if (!params?.id) return;
            try {
                dispatch(skuAnalysisActions.setDataStatus({ isLoading: true, isError: false, message: '' }));
                
                // await Promise.all([
                //     dispatch(fetchSkuAnalysisSkuData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisMainChartData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisIndicatorsData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisMainTableData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisByColorTableData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisByWarehousesTableData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisBySizeTableData({ id: params.id, selectedRange }))
                // ]);
                
                dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }));
            } catch (error) {
                dispatch(skuAnalysisActions.setDataStatus({ 
                    isLoading: false, 
                    isError: true, 
                    message: 'Failed to load SKU analysis data. Please try again.' 
                }));
            }
        };

        loadSkuAnalysisData();
    }, [params, selectedRange]);

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                <div className={styles.page__additionalWrapper}>
                    {/* header */}
                    <div className={styles.page__headerWrapper}>
                        <Header
                            title={
                                <Breadcrumbs
                                    config={[
                                        { slug: '/supplier-analysis', name: 'Анализ поставщика' },
                                        { name: `${params?.id}` },
                                    ]}
                                />
                            }
                        />
                    </div>
                    {/* !header */}
                    <BarsWidget
                        quantity={4}
                    />
                    <div className={styles.page__filtersWrapper}>
                        <Filters
                            setLoading={setLoading}
                            shopSelect={false}
                            brandSelect={false}
                            articleSelect={false}
                            groupSelect={false}
                        />
                    </div>
                    <BarsWidget
                        quantity={8}
                    />
                    <MainChartWidget id={params?.id} />
                </div>



                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={mainTableConfig}
                        //tableData={}
                        downloadButton
                    />
                </div>
                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={goodsTableConfig}
                        customHeader={<GoodsTableCustomHeader />}
                        //tableData={}
                        downloadButton
                    />
                </div>
                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={salesTableConfig}
                        //tableData={}
                        title={`Продажи поставщика ${params?.id} по категориям`}
                        downloadButton
                    />
                </div>
                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={ordersStructByColorsTableConfig}
                        customHeader={<OrdersTableCustomHeader />}
                        //tableData={}
                        downloadButton
                    />
                </div>

                <div className={styles.page__additionalWrapper}>
                    <StockChartWidget
                        downloadButton
                        title='Распределение товарных остатков по складам'
                    />
                </div>
                <div className={styles.page__additionalWrapper}>
                    <StockChartWidget
                        downloadButton
                        customHeader={<StockChartCustomHeader />}
                    />
                </div>

            </section>
            {/* ---------------------- */}

            <ErrorModal
                open={dataStatus.isError}
                footer={null}
                onOk={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }))
                    navigate('/sku-analysis')
                }}
                onClose={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }))
                    navigate('/sku-analysis')
                }}
                onCancel={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }))
                    navigate('/sku-analysis')
                }}
                message={dataStatus.message}
            />
        </main>
    )
}

export default SupplierIdPage