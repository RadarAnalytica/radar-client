import styles from './MainPage.module.css';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Header from '../../components/sharedComponents/header/header';
import { VideoWidget, FeaturesWidget, VideoWidgetOneLine } from './widgets';
import { Banner } from './features';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';

export default function MainPage() {
    const { isDemoMode } = useDemoMode();

    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header title='Главная' />
                </div>

                {isDemoMode && <NoSubscriptionWarningBlock />}

                <VideoWidgetOneLine />
                <Banner.Top />
                <FeaturesWidget />
                <Banner.Bottom />
            </section>
        </main>
    );
}

