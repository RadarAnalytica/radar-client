import styles from './dashboardPage.module.css'
import Header from '../../../../components/sharedComponents/header/header'
import Sidebar from '../../../../components/sharedComponents/sidebar/sidebar'

const _DashboardPage = () => {

    return (
        <main className={styles.page}>
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
                {/* <SideNav /> */}
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