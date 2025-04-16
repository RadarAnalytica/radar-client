import styles from './noSubscriptionPlugPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import NoSubscriptionWarningBlock from '../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'
// import dashboardPlug from '../../assets/dashboard_plug.png'
// import reportPlug from '../../assets/report-main_plug.png'
// import mapPlug from '../../assets/orders-map_plug.png'
// import abcPlug from '../../assets/abc-data_plug.png'
// import stockPlug from '../../assets/stock-analysis_plug.png'
// import aiPlug from '../../assets/ai-generator_plug.png'
// import monitoringPlug from '../../assets/monitoring_plug.png'
// import seoPlug from '../../assets/seo_plug.png'
//dashboard plugs
import dashboard1 from '../../assets/plugs/dashboard/dashboard-1.svg'
import dashboard2 from '../../assets/plugs/dashboard/dashboard_2.svg'
import dashboard3 from '../../assets/plugs/dashboard/dashboard_3.svg'
import dashboard4 from '../../assets/plugs/dashboard/dashboard_4.svg'
//finreports plugs
import fin1 from '../../assets/plugs/fin_reports/fin-1.svg'
import fin2 from '../../assets/plugs/fin_reports/fin-2.svg'
//map plugs
import geo1 from '../../assets/plugs/orders_map/geo-1.svg'
import geo2 from '../../assets/plugs/orders_map/geo-2.svg'
import geo4 from '../../assets/plugs/orders_map/geo-4.svg'
//abc plugs
import abc1 from '../../assets/plugs/abc/abc-1.svg'
import abc2 from '../../assets/plugs/abc/abc-2.svg'
//stock plugs
import stock1 from '../../assets/plugs/prod_analytic/prod-1.svg'
import stock2 from '../../assets/plugs/prod_analytic/prod-2.svg'
import stock3 from '../../assets/plugs/prod_analytic/prod-3.svg'
import stock4 from '../../assets/plugs/prod_analytic/prod-4.svg'
import stock5 from '../../assets/plugs/prod_analytic/prod-5.svg'
//ai plugs
import ai1 from '../../assets/plugs/ai-generation/ai-1.svg'
//monitor plugs
import monitor1 from '../../assets/plugs/monitoring/monitoring-1.svg'
import monitor2 from '../../assets/plugs/monitoring/monitoring-2.svg'
//monitor plugs
import seo1 from '../../assets/plugs/seo/seo-1.svg'
import seo2 from '../../assets/plugs/seo/seo-2.svg'
//shops plugs
import shop1 from '../../assets/plugs/linked_shops/shop-1.svg'


const plugsConfig = {
    "dashboard": [dashboard1, dashboard2, dashboard3, dashboard4],
    "report-main": [fin1, fin2],
    "orders-map": [geo1, geo2, geo4],
    "abc-data": [abc1, abc2],
    "stock-analysis": [stock1, stock2, stock3, stock4, stock5],
    "ai-generator": [ai1],
    "monitoring": [monitor1, monitor2],
    "seo": [seo1, seo2],
    "linked-shops": [shop1],
}

const NoSubscriptionPlugPage = ({ title, pathname }) => {


    const path = pathname ? pathname : 'dashboard';
    const current = plugsConfig[path]
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
                    {current.map((i, id) => {

                        if (id === 0) {
                            return (
                                <img
                                    src={i}
                                    key={id}
                                    alt=''
                                    loading='eager'
                                    decoding='async'
                                    fetchpriority='high'
                                    style={{ 
                                        padding: path === 'report-main' ? '0 12px' 
                                        : path === 'orders-map' || path === 'abc-data' ? '0 16px' : '0'
                                        }} 
                                    />
                            )
                        }

                        return (
                            <img src={i} key={id} alt='' loading='lazy' decoding='async' fetchpriority='low' />
                        )
                    })}

                </div>
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default NoSubscriptionPlugPage;