import React, { useState } from 'react';
import MobilePlug from '../../../../components/sharedComponents/mobilePlug/mobilePlug';
import Header from '../../../../components/sharedComponents/header/header';
import Breadcrumbs from '../../../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import Sidebar from '../../../../components/sharedComponents/sidebar/sidebar';
import { AddSkuModal } from '../../features';
import { SingleGroupWidget, NoDataWidget } from '../../widgets';
import { useNavigate } from 'react-router-dom';
import styles from './singleGroupPage.module.css'

const SingleGroupPage = () => {

    const [isAddSkuModalVisible, setIsAddSkuModalVisible] = useState(false)
    const navigate = useNavigate()

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
                    <Header
                        title={
                            <Breadcrumbs
                                config={[
                                    { name: 'Группы товаров', slug: '/dev/groups' },
                                    { name: 'Название' },
                                ]}
                                actions={[
                                    { type: 'edit', action: () => { setIsAddSkuModalVisible(true) } },
                                    { type: 'delete', action: () => { navigate('/dev/groups') } },
                                ]}
                            />
                        }
                    />
                </div>

                {/* <NoDataWidget
                    mainTitle='Здесь пока нет ни одного артикула'
                    mainText='Добавьте первый артикул, чтобы начать работу'
                    buttonTitle='Добавить'
                    action={() => setIsAddSkuModalVisible(true)}
                /> */}

                <SingleGroupWidget
                    setIsAddSkuModalVisible={setIsAddSkuModalVisible}
                />
            </section>
            {/* ---------------------- */}


            {/*  modals */}
            <AddSkuModal
                isAddSkuModalVisible={isAddSkuModalVisible}
                setIsAddSkuModalVisible={setIsAddSkuModalVisible}
            />
        </main>
    )
}

export default SingleGroupPage;