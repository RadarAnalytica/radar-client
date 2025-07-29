import React, { useState, useEffect } from 'react'
import styles from './supplierIdPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { BarsWidget, MainChartWidget, TableWidget, StockChartWidget } from './widgets'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import Breadcrumbs from '../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { actions as skuAnalysisActions } from '../../redux/skuAnalysis/skuAnalysisSlice'
import { mainTableConfig, goodsTableConfig, salesTableConfig, ordersStructByColorsTableConfig } from './shared'
import { GoodsTableCustomHeader, OrdersTableCustomHeader, StockChartCustomHeader } from './entities'
import { fetchSupplierAnalysisMetaData, fetchSupplierAnalysisIndicatorsData, fetchSupplierAnalysisMainChartData } from '../../redux/supplierAnalysis/supplierAnalysisActions'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal'
import { useLocation } from 'react-router-dom'

const SupplierIdPage = () => {
    const dispatch = useAppDispatch()
    const { dataStatus, skuMainTableData, skuByColorTableData, skuByWarehouseTableData, skuBySizeTableData, metaData } = useAppSelector(store => store.skuAnalysis)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation();



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
                                        { name: location?.state?.trademark },
                                    ]}
                                />
                            }
                        />
                    </div>
                    {/* !header */}
                    <BarsWidget
                        dataHandler={fetchSupplierAnalysisMetaData}
                        dataType='metaData'
                        id={params?.id}
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
                        dataHandler={fetchSupplierAnalysisIndicatorsData}
                        dataType='indicatorsData'
                        id={params?.id}
                    />
                    {/* <MainChartWidget 
                        id={params?.id}
                        dataType='mainChartData'
                        dataHandler={fetchSupplierAnalysisMainChartData}
                    /> */}
                </div>



                {/* <div className={styles.page__tableWrapper}>
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
                        supplier={params.id}
                        downloadButton
                        title='Распределение товарных остатков по складам'
                    />
                </div>
                <div className={styles.page__additionalWrapper}>
                    <StockChartWidget
                        supplier={params.id}
                        downloadButton
                        customHeader={<StockChartCustomHeader />}
                    />
                </div> */}

            </section>
            {/* ---------------------- */}

            {/* <ErrorModal
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
            /> */}
        </main>
    )
}

export default SupplierIdPage