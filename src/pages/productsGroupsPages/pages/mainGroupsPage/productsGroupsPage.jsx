import React, { useState, useEffect, useContext } from 'react';
import styles from './productsGroupsPage.module.css'
import MobilePlug from '../../../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../../../components/sharedComponents/sidebar/sidebar';
import Header from '../../../../components/sharedComponents/header/header';
import { NoDataWidget, GroupsMainWidget } from '../../widgets';
import { AddGroupModal } from '../../features';
import AuthContext from '../../../../service/AuthContext';
import { URL } from '../../../../service/config';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';

const initDataFetchingStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const ProductGroupsPage = () => {
    const { authToken } = useContext(AuthContext)
    const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false)
    const [dataFetchingStatus, setDataFetchingStatus] = useState(initDataFetchingStatus)
    const [groupsMainData, setGroupsMainData] = useState([])

    const getGroupsData = async (authToken) => {
        setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true })
        try {
            const res = await fetch(`${URL}/api/product/product_groups`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: parsedData?.detail || 'Что-то пошло не так :(' })
                return;
            }
            const parsedRes = await res.json();
            setGroupsMainData(parsedRes.data)
            setDataFetchingStatus(initDataFetchingStatus)
        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    useEffect(() => {
        getGroupsData(authToken)
    }, [])

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

                {dataFetchingStatus.isLoading &&
                    <div className={styles.page__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                }
                {!dataFetchingStatus.isLoading && groupsMainData && groupsMainData.length === 0 &&
                    <NoDataWidget
                        mainTitle='Здесь пока нет ни одной группы товаров'
                        mainText='Создайте первую группу, чтобы начать работу'
                        buttonTitle='Создать'
                        action={() => setIsAddGroupModalVisible(true)}
                    />
                }
                {!dataFetchingStatus.isLoading && groupsMainData && groupsMainData.length > 0 &&
                    <GroupsMainWidget
                        setIsAddGroupModalVisible={setIsAddGroupModalVisible}
                    />
                }
            </section>
            {/* ---------------------- */}



            {/* MODALS */}
            <AddGroupModal
                isAddGroupModalVisible={isAddGroupModalVisible}
                setIsAddGroupModalVisible={setIsAddGroupModalVisible}
            />

            <ErrorModal
                open={dataFetchingStatus.isError}
                onOk={() => setDataFetchingStatus(initDataFetchingStatus)}
                onClose={() => setDataFetchingStatus(initDataFetchingStatus)}
                onCancel={() => setDataFetchingStatus(initDataFetchingStatus)}
                message={dataFetchingStatus.message}
            />
        </main>
    )
}

export default ProductGroupsPage;