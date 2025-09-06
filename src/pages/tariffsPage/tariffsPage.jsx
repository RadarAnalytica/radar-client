import React from "react";
import styles from './tariffsPage.module.css'
import { Link } from "react-router-dom";
import MobilePlug from "../../components/sharedComponents/mobilePlug/mobilePlug";
import { PricingScreen, FormScreen, ExtensionScreen, VideoReviews } from "./widgets";
import Header from "../../components/sharedComponents/header/header";
import Breadcrumbs from "../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs";




const TariffsPage = () => {


    return (
        <main className={styles.page}>
            <MobilePlug />
            <div className={styles.page__wrapper}>
                <div className={styles.header}>
                    <section className={styles.header__container}>
                        <Header
                            title={
                                <Breadcrumbs
                                    config={[
                                        {name: 'Главная', slug: '/main'},
                                        {name: 'Тарифы'},
                                    ]}
                                />
                            }
                        />
                    </section>
                </div>
                {/* Tariffs */}
                <PricingScreen />
                <ExtensionScreen />
                <VideoReviews />
                <FormScreen />
            </div>
        </main>
    )
}

export default TariffsPage;