import React, { useState } from 'react'
import styles from './skuIdPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { ItemWidget, BarsWidget, MainChartWidget, TableWidget } from './widgets'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import Breadcrumbs from '../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs'
import { useParams } from 'react-router-dom'

const SkuIdPage = () => {
    const [ loading, setLoading ] = useState(false)
    const params = useParams()


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
                                        {slug: '/dev/sku-analysis', name: 'Анализ артикула'},
                                        {name: `Товар ${params?.id}`},
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
                <TableWidget />
                <TableWidget
                    title='Структура входящих заказов'
                    segments={['По цветам', 'По складам', 'По размерам']}
                />
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default SkuIdPage