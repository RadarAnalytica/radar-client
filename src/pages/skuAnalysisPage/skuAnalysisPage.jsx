import React, { useState } from 'react'
import styles from './skuAnalysisPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { SearchBlock, ItemWidget, BarsWidget, MainChartWidget, TableWidget } from './widgets'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'


const SkuAnalysisPage = () => {

    const [loading, setLoading] = useState(false);

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
                        <Header title='Анализ артикула' />
                    </div>
                    {/* !header */}



                    <SearchBlock />
                    <ItemWidget />
                    <div>
                        <Filters setLoading={setLoading} />
                    </div>
                    <BarsWidget />
                    <MainChartWidget />
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

export default SkuAnalysisPage;