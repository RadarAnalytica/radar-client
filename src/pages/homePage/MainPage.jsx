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
import { GeneralLayout } from '@/shared';
import { RadarCarousel } from '@/features';

const mock = ['lightgray', 'blue', 'red', 'green']

export default function MainPage() {
    
    const { isDemoMode } = useDemoMode();
    const { user } = useContext(AuthContext);
    return (
        <GeneralLayout
            headerProps={{
                title: 'Главная',
                hasShadow: false
            }}
        >
            <section className={styles.page__content}>

                {user?.subscription_status === null && !user?.is_onboarded && !user?.is_test_used && <NoSubscriptionWarningBlock isOnMainPage />}
                {user?.subscription_status === 'test' && !user?.is_onboarded && <OnboardingWidget />}

                <div className={styles.page__content__widgets}>
                    {/* <FeaturesWidget /> */}
                    <RadarCarousel
                        data={mock}
                    />
                    <ArticlesWidget />
                </div>

                <VideoWidgetOneLine />
                <Banner.Bottom />
            </section>
        </GeneralLayout>
    )
}