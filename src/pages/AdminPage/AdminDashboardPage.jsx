import React, { useEffect, useState, useContext } from 'react';
import styles from './AdminDashboardPage.module.css'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import { URL } from '../../service/config';
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import { Bar } from './features'
import { DashboardTableWidget } from './widgets';
import moment from 'moment';



const initStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


const fetchStatistics = async (token, setStatus, initStatus, setData) => {
    setStatus({ ...initStatus, isLoading: true })
    try {
        let res = await fetch(`${URL}/api/admin/service-analysis/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + token
            }
        })

        if (!res.ok) {
            setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' })
            return
        }

        res = await res.json();
        setStatus({ ...initStatus, isSuccess: true })
        setData(res.data)
    } catch {
        setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' })
    }
}

/**
 * 
 * {
    "data": {
        "date": "2025-07-09",
        "total_registered_accounts": 39,
        "trial_accounts": 1,
        "active_paid_subscriptions": 6,
        "subscription_renewals": {
            "renewals_count": 0,
            "renewals_percentage": 0.0
        },
        "inactive_accounts": 56
    },
    "message": "Success"
}
 */



const AdminDashboardPage = () => {

    const { authToken } = useContext(AuthContext)
    const [status, setStatus] = useState(initStatus)
    const [dashboardData, setData] = useState()

    useEffect(() => {
        fetchStatistics(authToken, setStatus, initStatus, setData)
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
                    <Header title='Дашборд' titlePrefix='Админ панель' />
                </div>
                {/* !header */}

                <div className={styles.page__dataWrapper}>
                    {dashboardData &&
                        <>
                            <Bar.Small title='Дата' data={moment(dashboardData.date).format('DD.MM.YYYY')} />
                            <Bar.Small title='Всего аккаунтов' data={dashboardData.total_registered_accounts} units='шт' />
                            <Bar.Small title='Аккаунтов с тестовым периодом' data={dashboardData.trial_accounts} units='шт' />
                            <Bar.Small title='Активных подписок' data={dashboardData.active_paid_subscriptions} units='шт' />
                            <Bar.Small title='Неактивных аккаунтов' data={dashboardData.inactive_accounts} units='шт' />
                            <Bar.Small 
                                title='Возобновляемых подписок, шт' 
                                data={dashboardData.subscription_renewals.renewals_count} 
                                units='шт'
                            />
                            <Bar.Small 
                                title='Возобновляемых подписок, %' 
                                data={dashboardData.subscription_renewals.renewals_percentage} 
                                units='%'
                            />
                        </>
                    }
                </div>

                <div className={styles.page__dashboardTable}>
                    <DashboardTableWidget />
                </div>
            </section>
            {/* ---------------------- */}




            {/*  modals */}
            <ErrorModal
                open={status.isError}
                footer={null}
                onOk={() => setStatus(initStatus)}
                onClose={() => setStatus(initStatus)}
                onCancel={() => setStatus(initStatus)}
            />
        </main>

    )
}

export default AdminDashboardPage;