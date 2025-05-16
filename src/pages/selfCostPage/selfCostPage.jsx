import React, { useState, useEffect } from 'react'
import styles from './selfCostPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import HowToLink from '../../components/sharedComponents/howToLink/howToLink'
import { SelfCostTableWidget } from './widgets'

const SelfCostPage = () => {

    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timeout;
        if (isSuccess) {
            timeout = setTimeout(() => {setIsSuccess(false)}, 1500)
        }
    }, [isSuccess])

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
                    <Header title='Себестоимость' />
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
                <SelfCostTableWidget
                    setIsSuccess={setIsSuccess}
                />
            </section>
            {/* ---------------------- */}
            {isSuccess && <div className={styles.page__successAlert}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6.4" fill="#00B69B" fillOpacity="0.1" />
                    <path d="M14.1999 19.1063L23.1548 10.1333L24.5333 11.5135L14.1999 21.8666L8 15.6549L9.37753 14.2748L14.1999 19.1063Z" fill="#00B69B" />
                </svg>
                Себестоимость установлена
            </div>}
        </main>
    )
}

export default SelfCostPage;