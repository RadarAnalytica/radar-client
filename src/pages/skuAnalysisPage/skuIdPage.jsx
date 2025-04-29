import React, { useState, useEffect } from 'react'
import styles from './skuIdPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { ItemWidget, BarsWidget, MainChartWidget, TableWidget } from './widgets'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import Breadcrumbs from '../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchSkuAnalysisMainChartData, fetchSkuAnalysisSkuData, fetchSkuAnalysisIndicatorsData } from '../../redux/skuAnalysis/skuAnalysisActions'
import { actions as skuAnalysisActions } from '../../redux/skuAnalysis/skuAnalysisSlice'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal'

const SkuIdPage = () => {
    const dispatch = useAppDispatch()
    const { selectedRange } = useAppSelector(store => store.filters)
    const { dataStatus } = useAppSelector(store => store.skuAnalysis)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        if (params?.id) {
            dispatch(skuAnalysisActions.setDataStatus({ isLoading: true, isisError: false, message: '' }))
            dispatch(fetchSkuAnalysisSkuData({ id: params.id, selectedRange }))
            dispatch(fetchSkuAnalysisMainChartData({ id: params.id, selectedRange }))
            dispatch(fetchSkuAnalysisIndicatorsData({ id: params.id, selectedRange }))
        }
    }, [params, selectedRange])

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
                                        { slug: '/sku-analysis', name: 'Анализ артикула' },
                                        { name: `Товар ${params?.id}` },
                                    ]}
                                />
                            }
                        />
                    </div>
                    {/* !header */}

                    <ItemWidget />
                    <div>
                        <Filters setLoading={setLoading} shopSelect={false} />
                    </div>
                    <BarsWidget />
                    <MainChartWidget id={params?.id} />
                </div>
                {/* <TableWidget />
                <TableWidget
                    title='Структура входящих заказов'
                    segments={['По цветам', 'По складам', 'По размерам']}
                /> */}
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

export default SkuIdPage