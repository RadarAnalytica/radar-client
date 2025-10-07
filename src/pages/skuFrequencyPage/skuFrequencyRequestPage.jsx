import { useEffect, useState } from 'react';
import styles from './skuFrequencyRequestPage.module.css';
import Header from '../../components/sharedComponents/header/header';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import Breadcrumbs from '../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Segmented, ConfigProvider } from 'antd';
import { BarsWidget, ChartWidget } from './widgets';


// dont forget to rename the component and its export
const SkuFrequencyRequestPage = () => {

    const [mainTabsState, setMainTabsState] = useState('Общая информация');
    const [chartTabsState, setChartTabsState] = useState('По месяцам');
    const [currentQuery, setCurrentQuery] = useState();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            setCurrentQuery(query);
        } else {
            navigate('/monitoring');
        }
    }, [searchParams]);

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <div className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header
                        title={
                            <Breadcrumbs
                                config={[
                                    { name: 'Поиск прибыльной ниши', slug: '/monitoring' },
                                    { name: currentQuery },
                                ]}
                            />
                        }
                    />
                </div>
                <div className={styles.page__segmentsWrapper}>
                    <ConfigProvider
                        theme={{
                            token: {
                                fontSize: '18px'
                            },
                            components: {
                                Segmented: {
                                    itemActiveBg: '#E7E1FE',
                                    itemSelectedBg: '#E7E1FE',
                                    trackBg: 'transparent',
                                    itemColor: '#1A1A1A80',
                                    itemHoverBg: 'transparent',
                                    itemHoverColor: '#1A1A1A',
                                    itemSelectedColor: '#1A1A1A',
                                    trackPadding: 0
                                }
                            }
                        }}
                    >
                        <Segmented
                            options={['Общая информация', 'Тренды']}
                            size='large'
                            value={mainTabsState}
                            onChange={(value) => setMainTabsState(value)}
                        />
                    </ConfigProvider>
                </div>
                <div className={styles.page__controlsWrapper}>
                    {/* <div className={styles.page__filtersWrapper}>
                        <Filters
                            setLoading={() => { }}
                            shopSelect={false}
                            brandSelect={false}
                            articleSelect={false}
                            groupSelect={false}
                        />
                    </div> */}
                    {mainTabsState === 'Тренды' &&
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontSize: '18px'
                                },
                                components: {
                                    Segmented: {
                                        itemActiveBg: '#E7E1FE',
                                        itemSelectedBg: '#E7E1FE',
                                        trackBg: 'transparent',
                                        itemColor: '#1A1A1A80',
                                        itemHoverBg: 'transparent',
                                        itemHoverColor: '#1A1A1A',
                                        itemSelectedColor: '#1A1A1A',
                                        trackPadding: 0
                                    }
                                }
                            }}
                        >
                            <Segmented
                                options={['По месяцам', 'По дням']}
                                size='large'
                                value={chartTabsState}
                                onChange={(value) => setChartTabsState(value)}
                            />
                        </ConfigProvider>
                    }
                </div>
                {mainTabsState === 'Общая информация' &&
                    <div className={styles.page__widgetWrapper}>
                        <BarsWidget
                            currentQuery={currentQuery}
                        />
                    </div>
                }
                {mainTabsState === 'Тренды' &&
                    <div className={styles.page__widgetWrapper}>
                        <ChartWidget
                            chartTabsState={chartTabsState}
                            currentQuery={currentQuery}
                        />
                    </div>
                }
            </div>
            {/* ---------------------- */}
        </main>
    );
};

export default SkuFrequencyRequestPage;

