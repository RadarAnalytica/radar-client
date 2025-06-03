import styles from './trendingRequests.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { ParamsWidget, TableWidget } from './widgets'



// dont forget to rename the component and its export
const TrendingRequestsPage = () => {

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                <div className={styles.page__wrapper}>
                    <div className={styles.page__headerWrapper}>
                        <Header title='Поиск трендовых запросов' />
                    </div>
                    <div className={styles.page__widgetWrapper}>
                        <ParamsWidget
                        />
                    </div>
                </div>
                <TableWidget />
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default TrendingRequestsPage;

