import React, { useState, useEffect } from 'react';
import styles from './skuIdPage.module.css';
import Header from '../../components/sharedComponents/header/header';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import { ItemWidget, BarsWidget, MainChartWidget, TableWidget } from './widgets';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import Breadcrumbs from '../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSkuAnalysisMainChartData, fetchSkuAnalysisSkuData, fetchSkuAnalysisIndicatorsData, fetchSkuAnalysisMainTableData, fetchSkuAnalysisByColorTableData, fetchSkuAnalysisByWarehousesTableData, fetchSkuAnalysisBySizeTableData } from '../../redux/skuAnalysis/skuAnalysisActions';
import { actions as skuAnalysisActions } from '../../redux/skuAnalysis/skuAnalysisSlice';
import { ConfigProvider, Segmented } from 'antd';
import { mainTableConfig, byColorTableConfig, byWarehouseTableConfig, bySizeTableConfig } from './shared';
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";

const segments = ['По цветам', 'По складам', 'По размерам'];
const SkuIdPage = () => {
    const dispatch = useAppDispatch();
    const { isDemoMode } = useDemoMode();
    const { selectedRange } = useAppSelector(store => store.filters);
    const { dataStatus, skuMainTableData, skuByColorTableData, skuByWarehouseTableData, skuBySizeTableData } = useAppSelector(store => store.skuAnalysis);
    const [loading, setLoading] = useState(true);
    const [tabsState, setTabsState] = useState(segments[0]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadSkuAnalysisData = async () => {
            if (!params?.id) return;

            try {
                dispatch(skuAnalysisActions.setDataStatus({ isLoading: true, isError: false, message: '' }));

                await Promise.all([
                    dispatch(fetchSkuAnalysisSkuData({ id: params.id, selectedRange })),
                    dispatch(fetchSkuAnalysisMainChartData({ id: params.id, selectedRange })),
                    dispatch(fetchSkuAnalysisIndicatorsData({ id: params.id, selectedRange })),
                    dispatch(fetchSkuAnalysisMainTableData({ id: params.id, selectedRange })),
                    dispatch(fetchSkuAnalysisByColorTableData({ id: params.id, selectedRange })),
                    dispatch(fetchSkuAnalysisByWarehousesTableData({ id: params.id, selectedRange })),
                    dispatch(fetchSkuAnalysisBySizeTableData({ id: params.id, selectedRange }))
                ]);

                dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }));
            } catch (error) {
                dispatch(skuAnalysisActions.setDataStatus({
                    isLoading: false,
                    isError: true,
                    message: 'Failed to load SKU analysis data. Please try again.'
                }));
            }
        };

        loadSkuAnalysisData();
    }, [params, selectedRange]);

    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__additionalWrapper}>
                    <div className={styles.page__headerWrapper}>
                        <Header
                            title={
                                <Breadcrumbs
                                    config={[
                                        { slug: '/sku-analysis', name: 'Анализ артикула' },
                                        { name: `Товар ${params?.id}` },
                                    ]}
                                />
                            }
                        />
                    </div>

                    {isDemoMode && <NoSubscriptionWarningBlock />}

                    <ItemWidget />
                    <div>
                        <Filters
                            setLoading={setLoading}
                            shopSelect={false}
                            brandSelect={false}
                            articleSelect={false}
                            groupSelect={false}
                            isDataLoading={dataStatus.isLoading}
                        />
                    </div>
                    <BarsWidget />
                    <MainChartWidget id={params?.id} />
                </div>

                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={mainTableConfig}
                        data={skuMainTableData}
                        tinyRows
                    />
                </div>

                <div className={styles.page__tableWrapper}>
                    <div className={styles.page__tableWrapperHeader}>
                        <div className={styles.page__tableTitleWrapper}>
                            <p className={styles.page__tableTitle}>Структура входящих заказов</p>
                            {tabsState && segments &&
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
                            }
                        </div>
                        {/* <DownloadButton /> */}
                    </div>
                    {tabsState === 'По цветам' &&
                        <TableWidget
                            data={skuByColorTableData}
                            tableConfig={byColorTableConfig}
                        />
                    }
                    {tabsState === 'По складам' &&
                        <TableWidget
                            data={skuByWarehouseTableData}
                            tableConfig={byWarehouseTableConfig}
                        />
                    }
                    {tabsState === 'По размерам' &&
                        <TableWidget
                            data={skuBySizeTableData}
                            tableConfig={bySizeTableConfig}
                        />
                    }

                </div>

            </section>
            {/* ---------------------- */}

            <ErrorModal
                open={dataStatus.isError}
                footer={null}
                onOk={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }));
                    navigate('/sku-analysis');
                }}
                onClose={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }));
                    navigate('/sku-analysis');
                }}
                onCancel={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }));
                    navigate('/sku-analysis');
                }}
                message={dataStatus.message}
            />
        </main>
    );
};

export default SkuIdPage;
