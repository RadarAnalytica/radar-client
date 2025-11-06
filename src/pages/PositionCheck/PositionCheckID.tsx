import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styles from "./PositionCheckID.module.css";
import Header from '@/components/sharedComponents/header/header';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Breadcrumbs from '@/components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useDemoMode } from '@/app/providers';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Segmented } from 'antd';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { RadarBar, RadarProductBar } from '@/shared';
import { formatPrice } from '@/service/utils';
import { PositionCheckFilters } from '@/widgets';
import DownloadButton from '@/components/DownloadButton';
import { DoubleTable } from '@/widgets';
import { ServiceFunctions } from '@/service/serviceFunctions';
import AuthContext from '@/service/AuthContext';


// Types
export interface IProductPositionMetaData {
    wb_id: number;
    wb_id_url: string;
    wb_id_image_link: string;
    name: string;
    price: number;
    subject_name: string;
    supplier_name: string;
    supplier_url: string;
    feedbacks: number;
    rating: number;
    visibility: number;
    avg_place: number;
    shows: number;
}

export interface IQueryData {
    query: string;
    frequency: number;
    total_goods: number;
    complexity: number;
    shows: number;
}

export interface IPresetData {
    query: string;
    frequency: number;
    total_goods: number;
    complexity: number;
    shows: number;
    queries_data: IQueryData[];
}

export interface IPositionCheckMainTableData {
    presets_count: number;
    queries_count: number;
    keywords: string[];
    preset_data: IPresetData[];
}

// antd segmented theme
const segmentedTheme = {
    token: {
        fontSize: 12,
        fontWeight: 500,
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
        }
    }
}

const initialRequestStatus = { isLoading: false, isError: false, isSuccess: false, message: '' };

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

const mockTableData = [
    {
        query: 'test query',
        frequency: 100,
        total_goods: 100,
        complexity: 'Низкая',
        isParent: true,
        rowKey: 'r1',
        serpCellId: 'cellr1',
        children: [
            {
                query: 'test query 1.1',
                frequency: 200,
                total_goods: 200,
                complexity: 'Средняя',
                rowKey: 'r1.1',
            },
            {
                query: 'test query 1.2',
                frequency: 300,
                total_goods: 300,
                complexity: 'Высокая',
                rowKey: 'r1.2',
            },
            {
                query: 'test query 1.3',
                frequency: 400,
                total_goods: 400,
                complexity: 'Низкая',
                rowKey: 'r1.3',
            },
        ]
    },
    {
        query: 'test query 2',
        frequency: 200,
        total_goods: 200,
        complexity: 'Средняя',
        isParent: true,
        rowKey: 'r2',
        children: [
            {
                query: 'test query 2.1',
                frequency: 200,
                total_goods: 200,
                complexity: 'Средняя',
                rowKey: 'r2.1',
            },
            {
                query: 'test query 2.2',
                frequency: 300,
                total_goods: 300,
                complexity: 'Высокая',
                rowKey: 'r2.2',
            },
            {
                query: 'test query 2.3',
                frequency: 400,
                total_goods: 400,
                complexity: 'Низкая',
                rowKey: 'r2.3',
            },
        ]
    },
    {
        query: 'test query 3',
        frequency: 300,
        total_goods: 300,
        complexity: 'Высокая',
        rowKey: 'r3',
    },
];

const PositionCheckID = () => {
    const { authToken } = useContext(AuthContext);
    const params = useParams();
    const navigate = useNavigate();
    const { isDemoMode } = useDemoMode();
    const [metaAndRegionsRequestStatus, setMetaAndRegionsRequestStatus] = useState<{ isLoading: boolean, isError: boolean, isSuccess: boolean, message: string }>(initialRequestStatus);
    const [mainTableRequestStatus, setMainTableRequestStatus] = useState<{ isLoading: boolean, isError: boolean, isSuccess: boolean, message: string }>(initialRequestStatus);
    const [requestObject, setRequestObject] = useState<Record<string, any>>({
        dest: -1257786, // Moscow
    });
    const [tableType, setTableType] = useState<'Кластеры' | 'По запросам'>('Кластеры');
    const [regionsData, setRegionsData] = useState<any[]>([{dest: -1257786, city_name: 'Москва', region_name: "Центральный ФО",}]);
    const [productMetaData, setProductMetaData] = useState<IProductPositionMetaData | null>(null);
    const [mainTableData, setMainTableData] = useState<IPositionCheckMainTableData | null>(null);
    const getPositionCheckProductMetaData = async () => {
        setMetaAndRegionsRequestStatus({ ...initialRequestStatus, isLoading: true });
        try {
            const res = await ServiceFunctions.getPositionCheckProductMetaData(authToken, params?.id);
            if (!res.ok) {
                setMetaAndRegionsRequestStatus({ ...initialRequestStatus, isError: true, message: 'Ошибка запроса' });
                return;
            }

            const data: IProductPositionMetaData = await res.json();
            setProductMetaData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setMetaAndRegionsRequestStatus({ ...initialRequestStatus, isLoading: false });
        }

    }

    const getRegionsData = async (paramsId: string) => {
        setMainTableRequestStatus({ ...initialRequestStatus, isLoading: true });
        try {
            const res = await ServiceFunctions.getSERPFiltersData(authToken)
            if (!res.ok) {
                setMainTableRequestStatus({ ...initialRequestStatus, isError: true, message: 'Ошибка запроса' });
                return;
            }
            setRegionsData(res)
            const initRequestObject = {
                dest: res.find((item: Record<string, any>) => item.city_name === 'Москва')?.dest || -1257786,
                wb_id: paramsId,
                feed_type: 'both',
                frequency: {
                    start: null,
                    end: null,
                },
                keywords_filter: null
            }
            setRequestObject(initRequestObject);
        } catch (error) {
            console.error(error);
            return;
        } finally {
        }
    }

    const getPositionCheckMainTableData = async (requestObject: Record<string, any>, authToken: string) => {
        try {
            const res = await ServiceFunctions.getPositionCheckMainTableData(authToken, requestObject);
            if (!res.ok) {
                throw new Error('Ошибка запроса');
            }

            const data: IPositionCheckMainTableData = await res.json();
            setMainTableData(data);
        } catch (error) {
            throw new Error('Ошибка запроса 2');
        }
    }

    useEffect(() => {
        if (params?.id && authToken) {
            getRegionsData(params.id)
            getPositionCheckProductMetaData()
        }
    }, [params])

    useEffect(() => {
        if (requestObject) {
            getPositionCheckMainTableData(requestObject, authToken)
        }
    }, [requestObject])




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

                {productMetaData && <div className={styles.page__productBarWrapper}>
                    {/* Photo block */}
                    <RadarProductBar data={productMetaData} isLoading={metaAndRegionsRequestStatus.isLoading} />
                    {/* Additional data */}
                    <div className={styles.info}>
                        <div className={styles.info__column}>
                            <p className={styles.info__row}>
                                Артикул <span className={styles.info__color_black}>{productMetaData.wb_id}</span>
                            </p>
                            <p className={styles.info__row}>
                                Предмет <span className={styles.info__color_purple}>{productMetaData.subject_name}</span>
                            </p>
                            <p className={styles.info__row}>
                                Оценка <span className={styles.info__color_black}>{productMetaData.rating.toFixed(1)}</span>
                            </p>
                        </div>

                        <div className={styles.info__column}>
                            <p className={styles.info__row}>
                                Отзывы <span className={styles.info__color_black}>{formatPrice(productMetaData.feedbacks, '')}</span>
                            </p>
                            <Link className={styles.info__link} to={mockMainData.supplier_url} target='_blank'>
                                Продавец <span className={styles.info__color_purple}>{mockMainData.supplier_name}</span>
                            </Link>
                            <Link to={mockMainData.wb_id_url} target='_blank' className={styles.info__mainLink}>Посмотреть на WB</Link>
                        </div>
                    </div>
                </div>}
                {/* Bars */}
                <div className={styles.page__barsWrapper}>
                    <RadarBar title='Видимость' isLoading={metaAndRegionsRequestStatus.isLoading} mainValue={productMetaData?.visibility} mainValueUnits='%' />
                    <RadarBar title='Средняя позиция' isLoading={metaAndRegionsRequestStatus.isLoading} mainValue={productMetaData?.avg_place} mainValueUnits='' />
                    <RadarBar title='Просмотры в месяц, шт' isLoading={metaAndRegionsRequestStatus.isLoading} mainValue={productMetaData?.shows} mainValueUnits='' />
                </div>
                {/* Filters */}
                <div className={styles.page__filtersWrapper}>
                    <PositionCheckFilters submitHandler={(formData) => { setRequestObject(formData); }} />
                    <DownloadButton handleDownload={() => { }} loading={false} />
                </div>
                {/* Table */}
                <div className={styles.page__tableWrapper}>
                    <ConfigProvider theme={segmentedTheme}>
                        <Segmented options={['Кластеры', 'По запросам']} size='large' value={tableType} onChange={(value) => setTableType(value as 'Кластеры' | 'По запросам')} />
                    </ConfigProvider>
                    <div className={styles.page__summary}>
                        <p className={styles.page__summaryItem}>Найдено ключей: <span>65</span></p>
                        <p className={styles.page__summaryItem}>Кластеров: <span>15</span></p>
                    </div>

                    <DoubleTable />

                </div>
            </section>
            {/* ---------------------- */}
            <ErrorModal
                open={false}
                footer={null}
                onOk={() => {
                    setMetaAndRegionsRequestStatus(initialRequestStatus);
                    setMainTableRequestStatus(initialRequestStatus);
                    navigate('/position-check');
                }}
                onClose={() => {
                    setMetaAndRegionsRequestStatus(initialRequestStatus);
                    setMainTableRequestStatus(initialRequestStatus);
                    navigate('/position-check');
                }}
                onCancel={() => {
                    setMetaAndRegionsRequestStatus(initialRequestStatus);
                    setMainTableRequestStatus(initialRequestStatus);
                    navigate('/position-check');
                }}
                message={metaAndRegionsRequestStatus.message}
            />
        </main>
    );
};

export default PositionCheckID;