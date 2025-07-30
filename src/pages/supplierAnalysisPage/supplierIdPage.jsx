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
import { fetchSupplierAnalysisMetaData, fetchSupplierAnalysisIndicatorsData, fetchSupplierAnalysisMainChartData, fetchSupplierAnalysisByDatesTableData } from '../../redux/supplierAnalysis/supplierAnalysisActions'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal'
import { ServiceFunctions } from '../../service/serviceFunctions'
import { actions as supplierActions } from '../../redux/supplierAnalysis/supplierAnalysisSlice'

const SupplierIdPage = () => {
    const dispatch = useAppDispatch()
    const { mainSupplierData } = useAppSelector(store => store.supplierAnalysis)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    //Проверяем наличие базовых данных поставщика и запрашиваем их если их нет
    useEffect(() => {
        //берем айди из урл
        const { id } = params;
        // если его нет то редиректим
        if (!id) navigate('/supplier-analysis');
        // если айди найден и уже есть данные поставщика и айди совпадают то ничего не делаем
        if (mainSupplierData && mainSupplierData.supplier_id === parseInt(id)) return

        const supplierChecker = async (id) => {
            // запускаем поиск
            const res = await ServiceFunctions.getSupplierAnalysisSuggestData(id, setLoading)
            // еслио н пустой редиректим
            if (res.length === 0) {
                navigate('/supplier-analysis');
            } else {
                // ищем поставщика по айди
                const current = res.find(_ => _.supplier_id === parseInt(id));
                // редиректим если не найдено
                if (!current) {
                    navigate('/supplier-analysis');
                    return
                }
                // сохраняем если найдено
                if (current) {
                    dispatch(supplierActions.setSupplierMainData(current))
                }
            }
        }
        // если все выше не прошло - проверяем
        supplierChecker(id)
    }, [params])

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
                                        { name: mainSupplierData?.trademark },
                                    ]}
                                />
                            }
                        />
                    </div>
                    {/* !header */}
                    <BarsWidget
                        dataHandler={fetchSupplierAnalysisMetaData}
                        dataType='metaData'
                        id={mainSupplierData?.supplier_id}
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
                        downloadButton
                        dataType='byDatesTableData'
                        dataHandler={fetchSupplierAnalysisByDatesTableData}
                    />
                </div>
                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        id={mainSupplierData?.supplier_id}
                        //tableConfig={goodsTableConfig}
                        tableConfig={mainTableConfig}
                        customHeader={<GoodsTableCustomHeader />}
                        downloadButton
                        //dataType='byGoodsTableData'
                        dataType='byDatesTableData'
                        dataHandler={fetchSupplierAnalysisByDatesTableData}
                    />
                </div>
                {/* <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={salesTableConfig}
                        //tableData={}
                        title={`Продажи поставщика ${params?.id} по категориям`}
                        downloadButton
                    />
                </div> */}
                {/* <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={ordersStructByColorsTableConfig}
                        customHeader={<OrdersTableCustomHeader />}
                        //tableData={}
                        downloadButton
                    />
                </div> */}

                {/* <div className={styles.page__additionalWrapper}>
                    <StockChartWidget
                        supplier={params.id}
                        downloadButton
                        title='Распределение товарных остатков по складам'
                    />
                </div> */}
                {/* <div className={styles.page__additionalWrapper}>
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