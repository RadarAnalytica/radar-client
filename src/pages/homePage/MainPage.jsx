import { useMemo, useState } from 'react';
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
import { noSubBanners, onboardingBanners, regularUserBanners } from '@/entities'
import { RadarMainPageBanner } from '@/shared';
import SubscriptionModal from "@/components/sharedComponents/modals/subscriptionModal/subscriptionModal";

export default function MainPage() {

    const [isTestPeriodModalVisible, setIsTestPeriodModalVisible] = useState(false)

    const { isDemoMode } = useDemoMode();
    const { user } = useContext(AuthContext);
    const currentBannersArr = useMemo((
    ) => {
        if (user?.subscription_status === null && !user?.is_onboarded && !user?.is_test_used) return noSubBanners.map(_ => ({ ..._, leadBlockButtonAction: () => setIsTestPeriodModalVisible(true)}));
        if (user?.subscription_status === 'test' && !user?.is_onboarded) return onboardingBanners;
        return regularUserBanners
    }, [user])

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
                        data={currentBannersArr?.map(_ => ({ ..._, render: (_) => <RadarMainPageBanner {..._} /> }))}
                        arrowControls={currentBannersArr?.length > 1}
                        dotControls={currentBannersArr?.length > 1}
                        autoScroll={currentBannersArr?.length > 1}
                    />
                    <ArticlesWidget />
                </div>

                <VideoWidgetOneLine />
                <Banner.Bottom />
            </section>
            <SubscriptionModal
                visible={isTestPeriodModalVisible}
                visibilityHandler={setIsTestPeriodModalVisible}
            />
        </GeneralLayout>
    )
}