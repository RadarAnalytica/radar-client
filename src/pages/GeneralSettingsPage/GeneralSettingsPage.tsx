import { useEffect, useState, useMemo } from 'react';
import { GeneralLayout } from '@/shared';
import { Segmented, ConfigProvider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkedShopsWidget, ReferalProgrammWidget, ProfileWidget, UsersWidget, PaymentWidget, TariffsWidget, TariffsWidgetOld } from '@/widgets';
import { useDemoMode } from '@/app/providers';



const segmentedTheme = {
    token: {
        fontSize: 14,
        fontWeight: 500,
        borderRadiusSM: 8,
    },
    components: {
        Segmented: {
            itemActiveBg: '#5329FF1A',
            itemSelectedBg: '#5329FF1A',
            trackBg: 'transparent',
            trackPadding: 0,
            itemHoverBg: '#5329FF10',
            itemColor: '#1A1A1A80',
            itemSelectedColor: '#1A1A1A',
            itemHoverColor: '#1A1A1A',
            controlPaddingHorizontal: 13,
            controlHeight: 38,
        }
    }
};


const GeneralSettingsPage = () => {
    const [activeTab, setActiveTab] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    const { isDemoUser, isDemoMode } = useDemoMode();

    const segmentedOptions = useMemo(() => {
        return [
            { value: 'profile', label: 'Профиль' },
            { value: 'shops', label: 'Подключенные магазины' },
            // { value: 'users', label: 'Настройки пользователей' },
            { value: 'payments', label: 'История платежей',  disabled: isDemoUser || isDemoMode },
            { value: 'referral', label: 'Реферальная программа', disabled: isDemoUser || isDemoMode},
            { value: 'tariffs', label: 'Тарифы' },
            // { value: 'tariffsNew', label: 'Тарифы2' },
            // { value: 'notifications', label: 'Бот уведомлений' },
        ];
    }, [isDemoUser])

    useEffect(() => {
       const { state } = location;
       if (state && state?.tab) {
        setActiveTab(state.tab)
       } else {
        setActiveTab('profile')
       }
    }, [location])

    return (
        <GeneralLayout
            headerProps={{
                title: activeTab ? segmentedOptions?.find(_ => _.value === activeTab)?.label : '',
                titlePrefix: 'Настройки',
                hasShadow: false
            }}
        >
            <ConfigProvider
                theme={segmentedTheme}
            >
                <Segmented
                    options={segmentedOptions}
                    value={activeTab}
                    onChange={(value) => {
                        navigate(location.pathname, {
                            state: { tab: value },
                            replace: true
                        })
                        setActiveTab(value)
                    }}
                />
            </ConfigProvider>

            {activeTab === 'profile' && <ProfileWidget />}
            {activeTab === 'shops' && <LinkedShopsWidget />}
            {activeTab === 'users' && <UsersWidget />}
            {activeTab === 'payments' && <PaymentWidget />}
            {activeTab === 'referral' && <ReferalProgrammWidget />}
            {activeTab === 'tariffsNew' && <TariffsWidget />}
            {activeTab === 'tariffs' && <TariffsWidgetOld />}
        </GeneralLayout>
    )
}

export default GeneralSettingsPage;
