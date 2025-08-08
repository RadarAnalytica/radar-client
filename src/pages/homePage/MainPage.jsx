
import styles from './MainPage.module.css'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import Header from '../../components/sharedComponents/header/header'
import { VideoWidget, FeaturesWidget, VideoWidgetOneLine } from './widgets'
import { Banner } from './features'


export default function MainPage() {

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header
                        title='Главная'
                    />
                </div>
                {/* ------- */}
                <VideoWidgetOneLine />
                <Banner.Top />
                {/* -------- */}
                <FeaturesWidget />
                <Banner.Bottom />
            </section>
            {/* ---------------------- */}
        </main>
    )
}

