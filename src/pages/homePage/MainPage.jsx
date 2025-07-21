
import styles from './MainPage.module.css'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { VideoWidget, FeaturesWidget } from './widgets'
import { Banner } from './features'




export default function MainPage () {

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                <Banner.Top />
                <VideoWidget />
                <FeaturesWidget />
                <Banner.Bottom />
            </section>
            {/* ---------------------- */}
        </main>
    )
}

