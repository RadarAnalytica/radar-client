import styles from './noSubscriptionPlugPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import NoSubscriptionWarningBlock from '../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'

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
                    <img src={`/src/assets/plugs/${path}_plug.png`} alt='' />
                </div>
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default NoSubscriptionPlugPage;