import React, { useState, useEffect, useLayoutEffect } from 'react'
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
import fin2 from '../../assets/plugs/fin_reports/fin-2.png'
//map plugs
import geo1 from '../../assets/plugs/orders_map/geo-1.svg'
import geo2 from '../../assets/plugs/orders_map/geo-2.svg'
import geo4 from '../../assets/plugs/orders_map/geo-4.svg'
//abc plugs
import abc1 from '../../assets/plugs/abc/abc-1.svg'
import abc2 from '../../assets/plugs/abc/abc-2.png'
//stock plugs
import stock1 from '../../assets/plugs/prod_analytic/prod-1.png'
import stock2 from '../../assets/plugs/prod_analytic/prod-2.svg'
import stock3 from '../../assets/plugs/prod_analytic/prod-3.svg'
import stock4 from '../../assets/plugs/prod_analytic/prod-4.svg'
import stock5 from '../../assets/plugs/prod_analytic/prod-5.svg'
//ai plugs
import ai1 from '../../assets/plugs/ai-generation/ai-1.svg'
//monitor plugs
import monitor1 from '../../assets/plugs/monitoring/monitoring-1.png'
import monitor2 from '../../assets/plugs/monitoring/monitoring-2.svg'
//monitor plugs
import seo1 from '../../assets/plugs/seo/seo-1.png'
import seo2 from '../../assets/plugs/seo/seo-2.svg'
//shops plugs
import shop1 from '../../assets/plugs/linked_shops/shop-1.svg'
//subscription plugs
import sub1 from '../../assets/plugs/subscription/subscriptions.svg'
//sku analysis plug
import sku1 from '../../assets/plugs/sku_analysis/1.webp'
import sku2 from '../../assets/plugs/sku_analysis/2.svg'
import sku3 from '../../assets/plugs/sku_analysis/3.svg'
import sku4 from '../../assets/plugs/sku_analysis/4.svg'
import sku5 from '../../assets/plugs/sku_analysis/5.webp'
//report week plug
import reportWeek1 from '../../assets/plugs/report_week/1.jpg'
//selfcost
import ss1 from '../../assets/plugs/selfcost/ss_1.png'

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
    "subscription": [sub1],
    'sku-analysis': [sku1, sku2, sku3, sku4, sku5],
    'report-week': [reportWeek1],
    'selfcost': [ss1]
}

const NoSubscriptionPlugPage = ({ title, pathname }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    let currentImages = [...plugsConfig[pathname]]  
    
    useEffect(() => {
        setIsImageLoaded(false)
        return () => {
            currentImages = undefined
            setIsImageLoaded(false)
        }
    }, [pathname])

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
                {currentImages &&
                    <div className={styles.page__plugWrapper}>
                        {[...currentImages].map((i, id) => {

                            if (id === 0) {
                                return (
                                    <>
                                        <img

                                            src={i}
                                            key={id}
                                            alt=''
                                            loading='eager'
                                            decoding='async'
                                            fetchpriority='high'
                                            style={{
                                                padding: pathname === 'report-main' ? '0 12px'
                                                    : pathname === 'orders-map' || pathname === 'abc-data' ? '0 16px' : '0',
                                                display: 'block',
                                                width: '100%',
                                                height: 'auto'
                                            }}
                                            hidden={!isImageLoaded}
                                            onLoad={() => {
                                                setIsImageLoaded(true)
                                            }}
                                        />
                                        <div className={styles.page__loaderWrapperInner} hidden={isImageLoaded}>
                                            <span className='loader' hidden={isImageLoaded}></span>
                                        </div>

                                    </>
                                )
                            }

                            return (
                                <img src={i} key={id} alt='' loading='lazy' decoding='async' fetchpriority='low' hidden={!isImageLoaded} />
                            )
                        })}

                    </div>
                }
                {!currentImages &&
                    <div className={styles.page__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                }
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default NoSubscriptionPlugPage;