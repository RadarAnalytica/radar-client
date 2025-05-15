import React, { useState } from 'react'
import styles from './selfCostPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import HowToLink from '../../components/sharedComponents/howToLink/howToLink'
import { SelfCostTableWidget } from './widgets'

const SelfCostPage = () => {

    const [ loading, setLoading ] = useState();

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='Себестоимость товаров' />
                </div>

                <div className={styles.page__filtersWrapper}>
                    <Filters
                        setLoading={setLoading}
                        timeSelect={false}
                    />
                    <HowToLink
                        text='Инструкция по загрузке себестоимости'
                        url='/'
                        target='_blank'
                    />
                </div>
                <SelfCostTableWidget />
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default SelfCostPage;