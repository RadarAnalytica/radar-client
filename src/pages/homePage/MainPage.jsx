import styles from './MainPage.module.css';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Header from '../../components/sharedComponents/header/header';
import { VideoWidget, FeaturesWidget, VideoWidgetOneLine, ArticlesWidget } from './widgets';
import { Banner } from './features';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { OnboardingWidget } from '@/widgets';
import { useContext } from 'react';
import AuthContext from '@/service/AuthContext';

export default function MainPage() {
    const { isDemoMode } = useDemoMode();
    const { user } = useContext(AuthContext);
    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header title='Главная' hasShadow={false} />
                </div>

                {user?.subscription_status === null && !user?.is_onboarded && !user?.is_test_used && <NoSubscriptionWarningBlock isOnMainPage />}
                {user?.subscription_status === 'test' && !user?.is_onboarded && <OnboardingWidget />}

                <div className={styles.page__content__widgets}>
                    <FeaturesWidget />
                    <ArticlesWidget />
                </div>

                <VideoWidgetOneLine />
                <Banner.Bottom />
            </section>
        </main>
    );
}