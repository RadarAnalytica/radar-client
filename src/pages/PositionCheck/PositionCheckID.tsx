import { useContext, useEffect, useRef, useState } from 'react';
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
import { RadarBar, RadarProductBar, RadarLoader } from '@/shared';
import { formatPrice } from '@/service/utils';
import { PositionCheckFilters } from '@/widgets';
// import DownloadButton from '@/components/DownloadButton';
import { DoubleTable } from '@/widgets';
import { ServiceFunctions } from '@/service/serviceFunctions';
import AuthContext from '@/service/AuthContext';
import { positionCheckTableConfig } from '@/shared';


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

const formDataToRequestObjectDto = (formData: Record<string, any>, prevRequestObject: Record<string, any>) => {
    let requestObject = {
        dest: formData.region,
        feed_type: formData.type,
        frequency: {
            start: formData.frequency_from || null,
            end: formData.frequency_to || null,
        },
        keywords_filter: null,
        shouldUpdateMetadata: prevRequestObject?.dest && prevRequestObject?.dest !== formData.region ? true : false,
    }

    if (formData.keyword) {
        requestObject.keywords_filter = {
            keywords_match: formData.match_type === 'Содержит' ? 'part' : 'full',
            keywords: formData.keyword.split(',').map((keyword: string) => keyword.trim()),
        }
    }
    return requestObject;
}


const mainDataToTableDataDto = (mainData: IPositionCheckMainTableData, tableType: 'Кластеры' | 'По запросам') => {
    if (!mainData) return [];
    const { preset_data } = mainData;

    if (tableType === 'Кластеры') {
        return preset_data.map((preset, idx) => ({
            rowKey: 'parent' + preset.query + '_' + idx,
            ...preset,
            isParent: preset.queries_data && preset.queries_data.length > 0 ? true : false,
            children: preset.queries_data.map((query, queryIdx) => ({
                rowKey: query.query + '_' + queryIdx,
                isLastChild: queryIdx === (preset.queries_data.length - 1),
                ...query,
                
            }))
        }))
    }

    if (tableType === 'По запросам') {
        return preset_data.map((preset) => {
            if (preset.queries_data && preset.queries_data.length > 0) {
                return [...preset.queries_data.map((query, queryIdx) => ({
                    rowKey: query.query + '_' + queryIdx,
                    ...query,
                }))]
            }
            return null;
        }).filter((item) => item !== null).flat();
    }
}


const PositionCheckID = () => {
    const { authToken } = useContext(AuthContext);
    const params = useParams();
    const navigate = useNavigate();
    const { isDemoMode } = useDemoMode();
    const [metaAndRegionsRequestStatus, setMetaAndRegionsRequestStatus] = useState<{ isLoading: boolean, isError: boolean, isSuccess: boolean, message: string }>(initialRequestStatus);
    const [mainTableRequestStatus, setMainTableRequestStatus] = useState<{ isLoading: boolean, isError: boolean, isSuccess: boolean, message: string }>(initialRequestStatus);
    const [requestObject, setRequestObject] = useState<Record<string, any>>();
    const [tableType, setTableType] = useState<'Кластеры' | 'По запросам'>('Кластеры');
    const [regionsData, setRegionsData] = useState<any[]>([{ dest: -1257786, city_name: 'Москва', region_name: "Центральный ФО", }]);
    const [productMetaData, setProductMetaData] = useState<IProductPositionMetaData | null>(null);
    const [mainTableData, setMainTableData] = useState<IPositionCheckMainTableData | null>(null);
    const abortControllersRef = useRef<{ product: AbortController | null, regions: AbortController | null, mainTable: AbortController | null }>({
        product: null,
        regions: null,
        mainTable: null,
    });

    const getPositionCheckProductMetaData = async (authToken: string, paramsId: string, dest: number = -1257786) => {
        const controller = new AbortController();
        abortControllersRef.current.product = controller;
        setMetaAndRegionsRequestStatus({ ...initialRequestStatus, isLoading: true });
        try {
            const res = await ServiceFunctions.getPositionCheckProductMetaData(authToken, paramsId, controller.signal, dest);
            if (!res.ok) {
                setMetaAndRegionsRequestStatus({ ...initialRequestStatus, isError: true, message: 'Ошибка запроса' });
                return;
            }

            const data: IProductPositionMetaData = await res.json();
            if (controller.signal.aborted) return;
            setProductMetaData(data);
            setMetaAndRegionsRequestStatus(initialRequestStatus);
        } catch (error) {
            if ((error as any)?.name === 'AbortError') {
                return;
            }
            console.error(error);
            setMetaAndRegionsRequestStatus({ ...initialRequestStatus, isError: true, message: 'Ошибка запроса' });
        }

    }

    const getRegionsData = async (authToken: string, _paramsId?: string) => {
        const controller = new AbortController();
        abortControllersRef.current.regions = controller;
        setMainTableRequestStatus({ ...initialRequestStatus, isLoading: true });
        try {
            let res = await ServiceFunctions.getSERPFiltersData(authToken, controller.signal)
            if (controller.signal.aborted) return;
            setRegionsData(res)
            const initRequestObject = {
                dest: res.find((item: Record<string, any>) => item.city_name === 'Москва')?.dest || -1257786,
                feed_type: 'both',
                frequency: {
                    start: null,
                    end: null,
                },
                keywords_filter: null
            }
            setRequestObject(initRequestObject);
        } catch (error) {
            if ((error as any)?.name === 'AbortError') {
                return;
            }
            console.error(error);
            setMainTableRequestStatus({ ...initialRequestStatus, isError: true, message: 'Ошибка запроса' });
            return;
        }
    }

    const getPositionCheckMainTableData = async (requestObject: Record<string, any>, authToken: string) => {
        const controller = new AbortController();
        abortControllersRef.current.mainTable = controller;
        if (!mainTableRequestStatus.isLoading) {
            setMainTableRequestStatus({ ...initialRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.getPositionCheckMainTableData(authToken, requestObject, controller.signal);
            if (!res.ok) {
                setMainTableRequestStatus({ ...initialRequestStatus, isError: true, message: 'Ошибка запроса' });
                return;
            }

            const data: IPositionCheckMainTableData = await res.json();
            if (controller.signal.aborted) return;
            setMainTableData(data);
            setMainTableRequestStatus(initialRequestStatus);
        } catch (error) {
            if ((error as any)?.name === 'AbortError') {
                return;
            }
            console.error(error);
            setMainTableRequestStatus({ ...initialRequestStatus, isError: true, message: 'Ошибка запроса' });
        }
    }

    useEffect(() => {
        if (params?.id && authToken) {
            getPositionCheckProductMetaData(authToken, params.id)
            getRegionsData(authToken, params.id)
        }
    }, [params?.id])

    useEffect(() => {
        if (requestObject && params?.id && authToken && !metaAndRegionsRequestStatus.isError) {
            getPositionCheckMainTableData({ ...requestObject, wb_id: params.id }, authToken)
            if (requestObject.shouldUpdateMetadata) {
                getPositionCheckProductMetaData(authToken, params.id, requestObject.dest)
            }
        }
    }, [requestObject])

    useEffect(() => {
        return () => {
            abortControllersRef?.current?.product?.abort();
            abortControllersRef?.current?.regions?.abort();
            abortControllersRef?.current?.mainTable?.abort();
        }
    }, [])


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

                {<div className={styles.page__productBarWrapper}>
                    {/* Photo block */}
                    <RadarProductBar data={productMetaData} isLoading={metaAndRegionsRequestStatus.isLoading} />
                    {/* Additional data */}
                    {metaAndRegionsRequestStatus.isLoading &&
                        <div className={styles.info}><RadarLoader loaderStyle={{ height: '138px' }} /></div>
                    }
                    {productMetaData && !metaAndRegionsRequestStatus.isLoading && <div className={styles.info}>
                        <div className={styles.info__column}>
                            <div className={styles.info__row}>
                                <p className={styles.info__rowTitle}>Артикул</p>
                                <span className={`${styles.info__color_black} ${styles.info__rowTitle}`}>{productMetaData?.wb_id}</span>
                            </div>
                            <div className={styles.info__row}>
                                <p className={styles.info__rowTitle}>Предмет</p>
                                <span className={`${styles.info__color_purple} ${styles.info__rowTitle}`}>{productMetaData?.subject_name}</span>
                            </div>
                            <div className={styles.info__row}>
                                <p className={styles.info__rowTitle}>Оценка</p>
                                <span className={`${styles.info__color_black} ${styles.info__rowTitle}`}>{productMetaData?.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className={styles.info__column}>
                            <div className={styles.info__row}>
                                <p className={styles.info__rowTitle}>Отзывы</p>
                                <span className={`${styles.info__color_black} ${styles.info__rowTitle}`}>{formatPrice(productMetaData?.feedbacks || 0, '')}</span>
                            </div>
                            <div className={styles.info__row}>
                                <p className={styles.info__rowTitle}>Продавец</p>
                                <Link className={styles.info__link} to={productMetaData?.supplier_url} target='_blank'>
                                    <span className={`${styles.info__color_purple} ${styles.info__rowTitle}`}>{productMetaData?.supplier_name}</span>
                                </Link>
                            </div>
                            <Link to={productMetaData?.wb_id_url} target='_blank' className={styles.info__mainLink}>Посмотреть на WB</Link>
                        </div>
                    </div>}
                </div>}
                {/* Bars */}
                <div className={styles.page__barsWrapper}>
                    <RadarBar title='Видимость' isLoading={metaAndRegionsRequestStatus.isLoading} mainValue={productMetaData?.visibility || 0} mainValueUnits='%' tooltipText='Относительный показатель, показывающий, какую долю потенциального спроса товар получает в поиске. Рассчитывается как отношение всех “просмотров товара” (по позициям в выдаче) к суммарной частотности всех запросов, в которых товар отображался.'/>
                    <RadarBar title='Средняя позиция' isLoading={metaAndRegionsRequestStatus.isLoading} mainValue={productMetaData?.avg_place || 0} mainValueUnits='' />
                    <RadarBar title='Просмотры в месяц, шт' isLoading={metaAndRegionsRequestStatus.isLoading} mainValue={productMetaData?.shows || 0} mainValueUnits='' />
                </div>
                {/* Filters */}
                {<div className={styles.page__filtersWrapper}>
                    <PositionCheckFilters submitHandler={(formData) => {
                        setRequestObject(formDataToRequestObjectDto(formData, requestObject));
                    }} isLoading={mainTableRequestStatus.isLoading || metaAndRegionsRequestStatus.isLoading} regionsData={regionsData} />
                    {/* <DownloadButton handleDownload={() => { }} loading={false} /> */}
                </div>}
                {/* Table */}
                {mainTableRequestStatus.isLoading && <div className={styles.page__tableWrapper}>
                    <RadarLoader loaderStyle={{ height: '50vh' }} />
                </div>}
                {mainTableData && !mainTableRequestStatus.isLoading &&
                    <div className={styles.page__tableWrapper}>
                        <ConfigProvider theme={segmentedTheme}>
                            <Segmented options={['Кластеры', 'По запросам']} size='large' value={tableType} onChange={(value) => setTableType(value as 'Кластеры' | 'По запросам')} />
                        </ConfigProvider>
                        <div className={styles.page__summary}>
                            <p className={styles.page__summaryItem}>Найдено ключей: <span>{mainTableData?.queries_count}</span></p>
                            <p className={styles.page__summaryItem}>Кластеров: <span>{mainTableData?.presets_count}</span></p>
                        </div>

                        <DoubleTable
                            tableData={mainDataToTableDataDto(mainTableData, tableType)}
                            dest={requestObject?.dest || -1257786}
                            authToken={authToken}
                            tableType={tableType}
                            tableConfig={positionCheckTableConfig}
                            page={'position'}
                            hasSort={true}
                            feed_type={requestObject?.feed_type || 'both'}
                        />
                    </div>
                }
            </section>
            {/* ---------------------- */}
            <ErrorModal
                open={metaAndRegionsRequestStatus.isError || mainTableRequestStatus.isError}
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
                message={metaAndRegionsRequestStatus.message || mainTableRequestStatus.message || 'Что-то пошло не так. Попробуйте одновить страницу.'}
            />
        </main>
    );
};

export default PositionCheckID;