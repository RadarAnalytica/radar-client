import styles from './linkedShops.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { AddShopWidget } from './widgets'

const LinkedShopsPage = () => {

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
                    <Header title='Подключенные магазины' />
                </div>
                {/* !header */}
                <div className={styles.page__layout}>
                    <AddShopWidget />
                </div>
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default LinkedShopsPage