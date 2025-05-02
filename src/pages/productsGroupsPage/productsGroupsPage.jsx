import React, { useState } from 'react';
import styles from './productsGroupsPage.module.css'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { NoGroupsWidget } from './widgets';
import { AddSkuModal } from './features';

const ProductGroupsPage = () => {

    const [ isAddSkuModalVisible, setIsAddSkuModalVisible ] = useState(true)

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
                    <Header title='Группы товаров' />
                </div>

                <NoGroupsWidget />
                {/* !header */}
            </section>
            {/* ---------------------- */}
            <AddSkuModal
                isAddSkuModalVisible={isAddSkuModalVisible}
                setIsAddSkuModalVisible={setIsAddSkuModalVisible}
            />
        </main>
    )
}

export default ProductGroupsPage;