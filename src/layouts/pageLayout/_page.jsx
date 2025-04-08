// dont forget to renew imports
import styles from './_page.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import NoSubscriptionWarningBlock from '../../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock'


// dont forget to rename the component and its export
const _Page = () => {

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
                {/* <MobilePlug />
      <SideNav /> */}
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='Сводка продаж' />
                </div>
                {/* !header */}

                {/* NO SUBSCRIPTION WARNING BLOCK */}
                <NoSubscriptionWarningBlock />
                {/* !NO SUBSCRIPTION WARNING BLOCK */}
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default _Page;

