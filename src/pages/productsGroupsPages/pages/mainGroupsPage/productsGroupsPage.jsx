import React, { useState } from 'react';
import styles from './productsGroupsPage.module.css'
import MobilePlug from '../../../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../../../components/sharedComponents/sidebar/sidebar';
import Header from '../../../../components/sharedComponents/header/header';
import { NoDataWidget, GroupsMainWidget } from '../../widgets';
import { AddGroupModal } from '../../features';

const ProductGroupsPage = () => {

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

                {/* <NoDataWidget
                    mainTitle='Здесь пока нет ни одной группы товаров'
                    mainText='Создайте первую группу, чтобы начать работу'
                    buttonTitle='Создать'
                    action={() => setIsAddGroupModalVisible(true)}
                /> */}
                {/* !header */}
                <GroupsMainWidget
                    setIsAddGroupModalVisible={setIsAddGroupModalVisible}
                />
            </section>
            {/* ---------------------- */}



            {/* MODALS */}
             <AddGroupModal
                isAddGroupModalVisible={isAddGroupModalVisible}
                setIsAddGroupModalVisible={setIsAddGroupModalVisible}
            />
        </main>
    )
}

export default ProductGroupsPage;