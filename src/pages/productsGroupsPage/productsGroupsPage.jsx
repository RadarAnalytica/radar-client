import React, { useState } from 'react';
import styles from './productsGroupsPage.module.css'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { NoGroupsWidget, GroupsMainWidget } from './widgets';
import { AddSkuModal, AddGroupModal } from './features';

const ProductGroupsPage = () => {

    const [ isAddSkuModalVisible, setIsAddSkuModalVisible ] = useState(false)
    const [ isAddGroupModalVisible, setIsAddGroupModalVisible ] = useState(false)

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

                {/* <NoGroupsWidget
                    setIsAddGroupModalVisible={setIsAddGroupModalVisible}
                /> */}
                {/* !header */}
                <GroupsMainWidget
                    setIsAddGroupModalVisible={setIsAddGroupModalVisible}
                />
            </section>
            {/* ---------------------- */}



            {/* MODALS */}
            <AddSkuModal
                isAddSkuModalVisible={isAddSkuModalVisible}
                setIsAddSkuModalVisible={setIsAddSkuModalVisible}
            />
             <AddGroupModal
                isAddGroupModalVisible={isAddGroupModalVisible}
                setIsAddGroupModalVisible={setIsAddGroupModalVisible}
            />
        </main>
    )
}

export default ProductGroupsPage;