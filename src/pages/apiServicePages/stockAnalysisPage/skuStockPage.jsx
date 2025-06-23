import React, { useState, useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import Sidebar from '../../../components/sharedComponents/sidebar/sidebar';
import Header from '../../../components/sharedComponents/header/header';
import MobilePlug from '../../../components/sharedComponents/mobilePlug/mobilePlug';
import { Filters } from '../../../components/sharedComponents/apiServicePagesFiltersComponent';
import AuthContext from '../../../service/AuthContext';
import Breadcrumbs from '../../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import styles from './skuStockPage.module.css'
import { useParams } from 'react-router-dom';
import { Segmented, ConfigProvider } from 'antd';
import { SummaryWidget, DashboardWidget } from './widgets';




const segments = [
    'Сводка',
    'О продукте',
    'Мониторинг категорий',
    'Мониторинг запросов'
]

const SkuStockPage = () => {

    const { user, authToken } = useContext(AuthContext)
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const { shops } = useAppSelector((state) => state.shopsSlice);
    const filters = useAppSelector((state) => state.filters);
    const params = useParams()
    const [tabsState, setTabsState] = useState('Сводка')




    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                <div className={styles.page__staticContentWrapper}>
                    {/* header */}
                    <div className={styles.page__headerWrapper}>
                        <Header
                            title={
                                <Breadcrumbs
                                    config={[
                                        { slug: '/stock-analysis', name: 'Аналитика по товарам' },
                                        { name: params?.sku }
                                    ]}
                                />
                            }
                        />
                    </div>
                    {/* SUMMARY WIDGET */}
                    <SummaryWidget />
                    {/* FILTERS */}
                    <div className={styles.page__filtersWrapper}>
                        <Filters
                            //setLoading={setLoading}
                            shopSelect={false}
                            brandSelect={false}
                            articleSelect={false}
                            groupSelect={false}
                        />
                        <div className={styles.page__tabsWrapper}>
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
                                size='large'
                                options={segments}
                                value={tabsState}
                                onChange={(value) => setTabsState(value)}
                            />
                        </ConfigProvider>
                        </div>
                    </div>
                    {tabsState === 'Сводка' && <DashboardWidget />}

                </div>
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default SkuStockPage;
