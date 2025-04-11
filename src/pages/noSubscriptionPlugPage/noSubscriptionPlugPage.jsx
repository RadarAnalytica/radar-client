import styles from './noSubscriptionPlugPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import NoSubscriptionWarningBlock from '../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'
import dashboardPlug from '../../assets/dashboard_plug.png'
import reportPlug from '../../assets/report-main_plug.png'
import mapPlug from '../../assets/orders-map_plug.png'
import abcPlug from '../../assets/abc-data_plug.png'
import stockPlug from '../../assets/stock-analysis_plug.png'
import aiPlug from '../../assets/ai-generator_plug.png'
import monitoringPlug from '../../assets/monitoring_plug.png'
import seoPlug from '../../assets/seo_plug.png'


const plugsConfig = {
    "dashboard": dashboardPlug,
    "report-main": reportPlug,
    "orders-map": mapPlug,
    "abc-data": abcPlug,
    "stock-analysis": stockPlug,
    "ai-generator": aiPlug,
    "monitoring": monitoringPlug,
    "seo": seoPlug,
}

const NoSubscriptionPlugPage = ({ title, pathname }) => {
 
    const path = pathname ? pathname : 'dashboard';

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
                    <Header title={title} />
                </div>
                {/* !header */}

                {/* NO SUBSCRIPTION WARNING BLOCK */}
                <NoSubscriptionWarningBlock />
                {/* !NO SUBSCRIPTION WARNING BLOCK */}
                <div className={styles.page__plugWrapper}>
                    <img src={plugsConfig[path]} alt='' />
                </div>
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default NoSubscriptionPlugPage;