import styles from './dashboardPage.module.css'
import SideNav from '../../../../components/SideNav'
import Header from '../../../../components/sharedComponents/header/header'
import TopNav from '../../../../components/TopNav'

const _DashboardPage = () => {

    return (
        <main className={styles.page}>
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <SideNav />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='Сводка продаж' />
                </div>
                {/* !header */}
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default _DashboardPage