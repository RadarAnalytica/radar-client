import React from 'react';
import styles from "./PositionCheckID.module.css";
import Header from '@/components/sharedComponents/header/header';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Breadcrumbs from '@/components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useDemoMode } from '@/app/providers';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { actions as skuAnalysisActions } from '@/redux/skuAnalysis/skuAnalysisSlice';
import { fetchSkuAnalysisSkuData, fetchSkuAnalysisMainChartData, fetchSkuAnalysisIndicatorsData, fetchSkuAnalysisMainTableData, fetchSkuAnalysisByColorTableData, fetchSkuAnalysisByWarehousesTableData, fetchSkuAnalysisBySizeTableData } from '@/redux/skuAnalysis/skuAnalysisActions';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { ItemWidget, BarsWidget, MainChartWidget, TableWidget } from './widgets';
import { mainTableConfig, byColorTableConfig, byWarehouseTableConfig, bySizeTableConfig } from './shared';
import { ConfigProvider, Segmented } from 'antd';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { RadarBar, RadarProductBar } from '@/shared';
import { LinkProps } from 'react-router-dom';
import { formatPrice } from '@/service/utils';
import moment from 'moment';

const mockMainData = {
    "wb_id": 361059312,
    "wb_id_url": "https://www.wildberries.ru/catalog/361059312/detail.aspx",
    "wb_id_name": "Женский эротический костюм (сетка, цвет 7027, один размер)",
    "photo_urls": [
        "https://basket-21.wbbasket.ru/vol3610/part361059/361059312/images/c246x328/1.webp",
        "https://basket-21.wbbasket.ru/vol3610/part361059/361059312/images/c246x328/2.webp",
        "https://basket-21.wbbasket.ru/vol3610/part361059/361059312/images/c246x328/3.webp"
    ],
    "subject_name": "Платья эротик",
    "price": 1076.19,
    "brand_name": "",
    "brand_url": "https://www.wildberries.ru/brands/uknown",
    "supplier_name": "环球智慧供应链（深圳）有限公司",
    "supplier_url": "https://www.wildberries.ru/seller/4205242",
    "created_date": "2025-03-17",
    "color_amount": 1,
    "color_revenue_percent": 100,
    "color_balance_percent": 100,
    "evaluation": 4.5
}

const PositionCheckID = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const { isDemoMode } = useDemoMode();
    const { selectedRange, isFiltersLoaded } = useAppSelector(store => store.filters);
    const { dataStatus, skuMainTableData, skuByColorTableData, skuByWarehouseTableData, skuBySizeTableData } = useAppSelector(store => store.skuAnalysis);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadSkuAnalysisData = async () => {
            if (!params?.id || !isFiltersLoaded) return;

            try {
                dispatch(skuAnalysisActions.setDataStatus({ isLoading: true, isError: false, message: '' }));

                // await Promise.all([
                //     dispatch(fetchSkuAnalysisSkuData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisMainChartData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisIndicatorsData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisMainTableData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisByColorTableData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisByWarehousesTableData({ id: params.id, selectedRange })),
                //     dispatch(fetchSkuAnalysisBySizeTableData({ id: params.id, selectedRange }))
                // ]);

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
    }, [params, selectedRange, isFiltersLoaded]);

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header
                        /* @ts-ignore */
                        title={
                            /* @ts-ignore */
                            <Breadcrumbs
                                config={[
                                    { slug: '/position-check', name: 'Проверка позиций' },
                                    { name: `Товар ${params?.id}` },
                                ]}
                            />
                        }
                        titlePrefix={null}
                        children={null}
                        videoReviewLink={null}
                        howToLink={null}
                        howToLinkText={null}
                        hasShadow={false}
                    />
                </div>
                {/* !header */}

                {isDemoMode && <NoSubscriptionWarningBlock />}

                <div className={styles.page__productBarWrapper}>
                    {/* Photo block */}
                    <RadarProductBar data={mockMainData} isLoading={dataStatus.isLoading} />
                    {/* Additional data */}
                    <div className={styles.info}>
                        <div className={styles.info__column}>
                            <p className={styles.info__row}>
                                Артикул <span className={styles.info__color_black}>{mockMainData.wb_id}</span>
                            </p>
                            <p className={styles.info__row}>
                                Предмет <span className={styles.info__color_purple}>{mockMainData.subject_name}</span>
                            </p>
                            <p className={styles.info__row}>
                                Оценка <span className={styles.info__color_black}>{mockMainData.evaluation}</span>
                            </p>
                        </div>

                        <div className={styles.info__column}>
                            <p className={styles.info__row}>
                                Отзывы <span className={styles.info__color_black}>{formatPrice(mockMainData.color_balance_percent, '%')}</span>
                            </p>
                            <Link className={styles.info__link} to={mockMainData.supplier_url} target='_blank'>
                                Продавец <span className={styles.info__color_purple}>{mockMainData.supplier_name}</span>
                            </Link>
                            <Link to={mockMainData.wb_id_url} target='_blank' className={styles.info__mainLink}>Посмотреть на WB</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.page__barsWrapper}>
                    <RadarBar title='Видимость' isLoading={dataStatus.isLoading} mainValue={42.91} mainValueUnits='%' />
                    <RadarBar title='Средняя позиция' isLoading={dataStatus.isLoading} mainValue={98} mainValueUnits='' />
                    <RadarBar title='Просмотры в месяц, шт' isLoading={dataStatus.isLoading} mainValue={10283} mainValueUnits='' />
                </div>
                <div>
                    {/* <Filters
                        shopSelect={false}
                        brandSelect={false}
                        articleSelect={false}
                        groupSelect={false}
                        isDataLoading={dataStatus.isLoading}
                    /> */}
                </div>
                <BarsWidget />
                <MainChartWidget id={params?.id} />

                <div className={styles.page__tableWrapper}>
                    <TableWidget
                        tableConfig={mainTableConfig}
                        data={skuMainTableData}
                        tinyRows
                    />
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

export default PositionCheckID;