import { useContext, useState, useEffect, useCallback } from 'react';
import Header from '@/components/sharedComponents/header/header';
import styles from './PositionTrackingMainPage.module.css';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { PositionTrackingMainPageWidget } from '@/widgets/PositionTrackingMainPageWidget/PositionTrackingMainPageWidget';
import { RadarBar } from '@/shared';
import { PlainSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/plainSelect/plainSelect';
// import { MainChart } from '@/features';
import { Table as RadarTable } from 'radar-ui';
import { Segmented, ConfigProvider, Button, Modal, Input } from 'antd';
import { positionTrackingTableConfig } from '@/shared';
import { positionTrackingTableCustomCellRender } from '@/shared';
import MainChart from './mainChart';
// import { SearchBlock } from '@/features';
import { useNavigate } from 'react-router-dom';
import { ServiceFunctions } from '@/service/serviceFunctions';
import AuthContext from '@/service/AuthContext';
import { useAppSelector } from '@/redux/hooks';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { RadarLoader } from '@/shared';


interface SkuValidity {
    wb_id: string;
    name: string;
}
interface MetaData {
    projects_count: 0,
    products_count: 0
}
interface Product {
    wb_id: string;
    name: string;
    wb_id_image_url: string;
    id: number;

}

interface Project {
    products: Product[];
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    total_products: number;
}

interface ChartDataItem {
    date: string;
    queries: number;
    shows: number;
}

interface PositionTrackingProduct {
    wb_id: string;
    name: string;
    wb_id_image_url: string;
    id: number;
    queries: number;
    queries_chart: {
        date: string;
        queries: number;
        comparsion_percentage: number;
    }[];
    shows: number;
    shows_chart: {
        date: string;
        shows: number;
        comparsion_percentage: number;
    }[];
    place: number;
    place_chart: {
        date: string;
        place: number;
        comparsion_percentage: number;
    }[];
}

interface PositionTrackingMainPageData {
    chart: ChartDataItem[];
    products: PositionTrackingProduct[];
}

const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Mulish',
        fontSize: 12,
        fontWeight: 500,
        controlHeightLG: 38,
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            hoverBg: 'white',
            activeShadow: 'transparent',
            activeBg: 'white',
        }
    }
}

const modalCancelButtonTheme = {
    token: {
        colorPrimary: '#5329FF',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Mulish',
        controlHeight: 44,
        borderRadius: 12,
    },
    components: {
        Button: {
            paddingInline: 24,
            paddingBlock: 10,
            colorBorder: '#E4DCFF',
            colorBgContainer: '#F3EEFF',
            colorBgContainerHover: '#E9E1FF',
            colorBgContainerDisabled: '#F3EEFF',
            colorText: '#5329FF',
            colorTextHover: '#3C1DE0',
            colorBorderHover: '#D1C2FF',
            colorBgTextActive: '#E2D8FF',
            boxShadow: 'none',
        },
    },
};

const modalPrimaryButtonTheme = {
    token: {
        colorPrimary: '#5329FF',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Mulish',
        controlHeight: 44,
        borderRadius: 12,
    },
    components: {
        Button: {
            paddingInline: 24,
            paddingBlock: 10,
            colorPrimaryHover: '#6942FF',
            colorPrimaryActive: '#421BCF',
            boxShadow: 'none',
        },
    },
};

// antd config providers themes
const segmentedTheme = {
    token: {
        fontSize: 14,
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
const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

const getMainPageDataRequestObject = (
    settings: { project: string | number, dest: string | number },
    tabs: string,
) => {
    return {
        project_ids: settings.project ? [settings.project] : null,
        city: settings.dest ?? null,
        order_by: tabs === 'По просмотрам' ? 'shows' : tabs === 'По ключам' ? 'queries' : tabs === 'По средней позиции' ? 'place' : null,
    }

}

const PositionTrackingMainPage = () => {
    const { shops } = useAppSelector((state) => state.filters);
    const { authToken } = useContext(AuthContext);
    const [activeFilter, setActiveFilter] = useState('По просмотрам');
    const [requestStatus, setRequestStatus] = useState<typeof initRequestStatus>(initRequestStatus);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [projectsList, setProjectsList] = useState<Project[] | null>([]);
    const [regionsList, setRegionsList] = useState<Record<string, any>[] | null>([]);
    const [metaData, setMetaData] = useState<MetaData | null>(null);
    const [addModalState, setAddModalState] = useState<{ sku: string, projectId: string }>({ sku: '', projectId: '' });
    const [settingsState, setSettingsState] = useState<{ project: string | number, dest: string | number } | null>(null);
    const [productsData, setProductsData] = useState<PositionTrackingProduct[] | null>(null);
    const [chartData, setChartData] = useState<ChartDataItem[] | null>(null);
    const [paginationState, setPaginationState] = useState<{ current: number, pageSize: number, total: number }>({ current: 1, pageSize: 10, total: 0 });
    const navigate = useNavigate();

    const getMetaData = useCallback(async (token: string, noRequestStatusUpdate: boolean = false): Promise<void> => {
        if (!requestStatus.isLoading || !noRequestStatusUpdate) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.getPostionTrackingMeta(token);
            if (!res.ok) {
                console.error('getMetaData error:');
                if (!noRequestStatusUpdate) {
                    setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить метаданные' });
                }
                throw new Error('Не удалось получить метаданные');
            }
            const data: MetaData = await res.json();
            setMetaData(data);
            if (!noRequestStatusUpdate) {
                setRequestStatus(initRequestStatus);
            }
        } catch (error) {
            console.error('getMetaData error:', error);
            if (!noRequestStatusUpdate) {
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить метаданные' });
            }
            throw error instanceof Error ? error : new Error('Не удалось получить метаданные');
        }
    }, [requestStatus.isLoading]);

    const getSkuValidity = useCallback(async (token: string, sku: string): Promise<SkuValidity | boolean | undefined> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.getPostionTrackingSkuValidity(token, sku);
            if (!res.ok) {
                console.error('getSkuValidity error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить валидность SKU' });
                return false;
            }
            const data: SkuValidity = await res.json();
            setRequestStatus(initRequestStatus);
            return data;

        } catch (error) {
            console.error('getSkuValidity error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить валидность SKU' });
            return;
        }
    }, [requestStatus.isLoading]);

    //get all projects list
    const getProjectsList = useCallback(async (token: string, noRequestStatusUpdate: boolean = false): Promise<void> => {
        if (!requestStatus.isLoading || !noRequestStatusUpdate) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.getPostionTrackingProjects(token);
            if (!res.ok) {
                console.error('getMetaData error:');
                if (!noRequestStatusUpdate) {
                    setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список проектов' });
                }
                throw new Error('Не удалось получить список проектов');
            }
            const data: Project[] = await res.json();
            setProjectsList(data);
            setAddModalState({ sku: '', projectId: '' });
            if (!noRequestStatusUpdate) {
                setRequestStatus(initRequestStatus);
            }
        } catch (error) {
            console.error('getProjectsList error:', error);
            if (!noRequestStatusUpdate) {
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список проектов' });
            }
            throw new Error('Не удалось получить список проектов');
        }

    }, [requestStatus.isLoading]);
    const createProject = useCallback(async (token: string, product: string, projectName?: string): Promise<void> => {
        setRequestStatus({ ...initRequestStatus, isLoading: true });
        try {
            let skuValidity: SkuValidity | boolean | undefined;
            if (product) {
                skuValidity = await getSkuValidity(token, product);
            }

            if (product && !skuValidity) {
                return
            }
            let productData = skuValidity as SkuValidity;
            const res = await ServiceFunctions.createPostionTrackingProjectWithProduct(token, projectName ?? null, productData?.wb_id ?? null, productData?.name ?? null);
            if (!res.ok) {
                console.error('createProject error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось создать проект' });
                return;
            }
            const data: Project = await res.json();
            getMetaData(token);
        } catch (error) {
            console.error('createProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось создать проект' });
            return;
        }
    }, [getSkuValidity, getMetaData]);
    const getPositionTrackingMainPageData = useCallback(async (token: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        const requestObject = getMainPageDataRequestObject(settingsState, activeFilter);
        try {
            const res = await ServiceFunctions.getPositionTrackingMainPageData(token, requestObject);
            if (!res.ok) {
                console.error('getPositionTrackingMainPageData error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить данные для главной страницы' });
                return;
            }
            const data: PositionTrackingMainPageData = await res.json();
            setProductsData(data.products);
            setPaginationState({ ...paginationState, total: Math.ceil(data.products.length / paginationState.pageSize) });
            setChartData(data.chart);
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('getPositionTrackingMainPageData error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить данные для главной страницы' });
            return;
        }
    }, [settingsState, activeFilter]);
    const addProductToProject = useCallback(async (token: string, sku: string, projectId: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {

            const validity = await getSkuValidity(token, sku);
            if (!validity) {
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить валидность SKU' });
                return;
            }
            const requestObject = {
                ...(validity as SkuValidity),
                project_id: projectId,
            }
            const res = await ServiceFunctions.addProductToPositionTrackingProject(token, requestObject);
            if (!res.ok) {
                console.error('addProductToProject error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось добавить товар к проекту' });
                return;
            }
            const data: Product = await res.json();
            getMetaData(token);
            getProjectsList(token);
            getPositionTrackingMainPageData(token);
            // if (settingsState?.project === projectId) {
            //     getPositionTrackingMainPageData(token);
            // }
        } catch (error) {
            console.error('addProductToProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось добавить товар к проекту' });
            return;
        }
    }, [getSkuValidity, getMetaData, getProjectsList, settingsState, getPositionTrackingMainPageData]);
    const getRegionsList = useCallback(async (token: string, noRequestStatusUpdate: boolean = false): Promise<void> => {
        // if (!requestStatus.isLoading || !noRequestStatusUpdate) {
        //     setRequestStatus({ ...initRequestStatus, isLoading: true });
        // };
        try {
            const res: Record<string, any>[] = await ServiceFunctions.getSERPFiltersData(token);
            setRegionsList(res);
            setSettingsState((prev) => ({ ...(prev || { project: 0, dest: -1257786 }), dest: res?.find((item) => item.city_name === 'Москва')?.dest || res[0]?.dest }))
            // if (!noRequestStatusUpdate) {
            //     setRequestStatus(initRequestStatus);
            // }
        } catch (error) {
            console.error('getRegionsList error:', error);
            // setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список регионов' });
            // if (!noRequestStatusUpdate) {
            //     setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список проектов' });
            // }
            throw new Error('Не удалось получить список регионов');
        }
    }, []);
    const getSortedProductsData = useCallback((products: PositionTrackingProduct[], activeFilter: string): PositionTrackingProduct[] => {
        const sortedProducts = products.sort((a, b) => {
            if (activeFilter === 'По просмотрам') {
                return b.shows - a.shows;
            }
            if (activeFilter === 'По ключам') {
                return b.queries - a.queries;
            }
            if (activeFilter === 'По средней позиции') {
                return b.place - a.place;
            }
        });
        return sortedProducts.slice((paginationState.current - 1) * paginationState.pageSize, paginationState.current * paginationState.pageSize);

    }, [activeFilter, paginationState]);
    const deleteProduct = useCallback(async (productId: string): Promise<void> => {
        // Сохраняем предыдущее состояние для возможного отката
        let previousProductsData: PositionTrackingProduct[] | null = null;
        setProductsData((prev) => {
            if (!prev) return prev;
            previousProductsData = [...prev];
            // Оптимистичное обновление: сразу удаляем товар из UI
            return prev.filter((product) => product.wb_id !== productId);
        });

        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };

        try {
            const res = await ServiceFunctions.deleteProductFromPositionTrackingProject(authToken, productId);
            if (!res.ok) {
                console.error('deleteProduct error:');
                // Откатываем изменения при ошибке
                if (previousProductsData) {
                    setProductsData(previousProductsData);
                }
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось удалить товар из проекта' });
                return;
            }
            // При успехе обновляем данные с сервера
            getMetaData(authToken, true);
            getProjectsList(authToken, true);
            getPositionTrackingMainPageData(authToken);
        } catch (error) {
            console.error('deleteProduct error:', error);
            // Откатываем изменения при ошибке
            if (previousProductsData) {
                setProductsData(previousProductsData);
            }
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось удалить товар из проекта' });
            return;
        }
    }, [authToken, getMetaData, getProjectsList, getPositionTrackingMainPageData]);

    useEffect(() => {
        if (authToken) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
            Promise.all([
                getMetaData(authToken, true),
                getProjectsList(authToken, true),
                getRegionsList(authToken, true)
            ])
                .then(() => {
                    //setRequestStatus(initRequestStatus);
                    setSettingsState({ project: 0, dest: -1257786 });
                    return;
                })
                .catch((error) => {
                    console.error('Error loading initial data:', error);
                    setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось загрузить начальные данные' });
                });
        }
    }, []);

    useEffect(() => {
        if (metaData && metaData.projects_count > 0) {
            getPositionTrackingMainPageData(authToken);
        }
    }, [settingsState]);

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
                        title='Трекинг позиций'
                        titlePrefix=''
                        videoReviewLink=''
                        howToLink=''
                        howToLinkText=''
                        hasShadow={false}
                        children={null}
                    />
                </div>
                {/* !header */}

                {/* main widget */}
                <PositionTrackingMainPageWidget loading={requestStatus.isLoading} setIsAddModalVisible={setIsAddModalVisible} hasAddBlock={metaData && metaData.projects_count === 0} createProject={async (sku: string) => {
                    let normilizedId: string;
                    if (/^(|\d+)$/.test(sku)) {
                        normilizedId = sku;
                    } else {
                        const startId = sku.indexOf('wildberries.ru/catalog/') + 'wildberries.ru/catalog/'.length;
                        const endId = sku.indexOf('/detail.aspx');
                        if (startId === -1 || endId === -1) {
                            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не верный формат артикула. Вставьте только числа или ссылку вида: https://www.wildberries.ru/catalog/ID/detail.aspx' });
                            return;
                        }
                        normilizedId = sku.substring(startId, endId);
                    }
                    await createProject(authToken, normilizedId, undefined);
                }}
                />

                {/* info bars */}
                {metaData && metaData.projects_count > 0 &&
                    <div className={styles.page__barsWrapper}>
                        <RadarBar
                            title="Активные товары"
                            mainValue={metaData?.products_count ?? 0}
                            actionButtonParams={{
                                text: 'Добавить новый товар к отслеживаню',
                                action: () => { setAddModalState({ ...addModalState, projectId: projectsList[0]?.id?.toString() }); setIsAddModalVisible(true) },
                                style: {
                                    backgroundColor: 'transparent',
                                    alignSelf: 'flex-end'
                                }
                            }}
                            isLoading={requestStatus.isLoading}
                        />
                        <RadarBar
                            title="Магазины"
                            mainValue={shops?.filter((shop) => shop.id !== 0).length ?? 0}
                            isLoading={requestStatus.isLoading}
                        />
                        <RadarBar
                            title="Проекты"
                            mainValue={metaData?.projects_count ?? 0}
                            isLoading={requestStatus.isLoading}
                            actionButtonParams={{
                                text: 'Управлять',
                                action: () => { navigate(`/position-tracking/projects`) },
                                style: {
                                    backgroundColor: 'transparent',
                                    alignSelf: 'flex-end'
                                }
                            }}
                        />
                    </div>}

                {/* settings block */}
                {metaData && metaData.products_count > 0 && projectsList && regionsList && settingsState &&
                    <div className={styles.page__container}>
                        <p className={styles.page__title}>Динамика</p>
                        <div className={styles.page__selectWrapper}>
                            <PlainSelect
                                selectId='projectSelect'
                                label=''
                                value={settingsState.project}
                                optionsData={[{ value: 0, label: 'Все проекты' }, ...projectsList?.map((project) => ({ value: project.id, label: project.name }))]}
                                handler={(value: number | string) => {
                                    setSettingsState({ ...settingsState, project: value });
                                }}
                                mode={undefined}
                                allowClear={false}
                                disabled={requestStatus.isLoading}
                            />
                            {regionsList &&
                                <PlainSelect
                                    selectId='destSelect'
                                    label=''
                                    value={settingsState.dest}
                                    optionsData={regionsList?.map((item) => ({ value: item.dest, label: item.city_name }))}
                                    handler={(value: number | string) => {
                                        setSettingsState({ ...settingsState, dest: value });
                                    }}
                                    mode={undefined}
                                    allowClear={false}
                                    disabled={requestStatus.isLoading}
                                />
                            }
                        </div>
                    </div>}

                {chartData && chartData.length > 0 &&
                    <div className={styles.page__chartWrapper}>
                        <MainChart
                            loading={requestStatus.isLoading}
                            dataDashBoard={chartData}
                        />
                    </div>}
                {productsData && productsData.length > 0 &&
                    <div className={styles.page__tableConfig}>
                        <p className={styles.page__title}>Лучшие товары</p>
                        <ConfigProvider theme={segmentedTheme}>
                            <Segmented
                                options={['По просмотрам', 'По ключам', 'По средней позиции']}
                                value={activeFilter}
                                onChange={(value) => {
                                    setActiveFilter(value);
                                }}
                            />
                        </ConfigProvider>
                    </div>}
                {requestStatus.isLoading &&
                    <div className={styles.page__tableWrapper}>
                        <RadarLoader loaderStyle={{ height: '50vh' }} />
                    </div>
                }
                {productsData && productsData.length > 0 && !requestStatus.isLoading &&
                    <div className={styles.page__tableWrapper}>
                        <RadarTable
                            config={positionTrackingTableConfig}
                            preset='radar-table-default'
                            dataSource={getSortedProductsData(productsData, activeFilter)}
                            pagination={{
                                current: paginationState.current,
                                pageSize: paginationState.pageSize,
                                total: paginationState.total,
                                showQuickJumper: true,
                                hideOnSinglePage: true,
                                onChange: (page, pageSize) => {
                                    setPaginationState({ ...paginationState, current: page });
                                }
                            }}
                            bodyCellStyle={{ height: '75px'}}
                            paginationContainerStyle={{ display: paginationState.total > 1 ? 'block' : 'none' }}
                            customCellRender={{
                                idx: [],
                                renderer: (value: any, record: any, index: number, dataIndex: string) => positionTrackingTableCustomCellRender(value, record, index, dataIndex, deleteProduct),
                            }}
                        />
                    </div>}

                {/* add product modal */}
                <Modal
                    open={isAddModalVisible}
                    onCancel={() => setIsAddModalVisible(false)}
                    onClose={() => setIsAddModalVisible(false)}
                    onOk={() => setIsAddModalVisible(false)}
                    footer={null}
                    centered
                    width={600}
                >
                    <div className={styles.addModal}>
                        <p className={styles.addModal__title}>Добавление товара</p>
                        {/* <SearchBlock
                            style={{ padding: 0 }}
                            submitHandler={async (value) => {
                                let normilizedId: string;
                                if (/^(|\d+)$/.test(value)) {
                                    normilizedId = value;
                                } else {
                                    const startId = value.indexOf('wildberries.ru/catalog/') + 'wildberries.ru/catalog/'.length;
                                    const endId = value.indexOf('/detail.aspx');
                                    if (startId === -1 || endId === -1) {
                                        setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не верный формат артикула. Вставьте только числа или ссылку вида: https://www.wildberries.ru/catalog/ID/detail.aspx' });
                                        return;
                                    }
                                    normilizedId = value.substring(startId, endId);
                                }
                                const res = await getSkuValidity(authToken, normilizedId);
                                console.log(res)
                            }}
                            demoModeValue=''
                        /> */}
                        <ConfigProvider theme={inputTheme}>
                            <Input
                                size='large'
                                className={styles.modal__input}
                                placeholder='Введите cсылку или артикул'
                                value={addModalState.sku}
                                onChange={(e) => setAddModalState({ ...addModalState, sku: e.target.value.toString() })}
                            />
                        </ConfigProvider>

                        <PlainSelect
                            selectId='brandSelect'
                            label='Проект'
                            value={projectsList?.find((project) => project.id.toString() === addModalState.projectId)?.name ?? ''}
                            optionsData={projectsList?.map((project) => ({ value: project.id, label: project.name }))}
                            handler={(value: number) => {
                                setAddModalState({ ...addModalState, projectId: value.toString() });
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                            style={{ width: '100%', maxWidth: '100%' }}
                        />

                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={modalCancelButtonTheme}>
                                <Button
                                    variant='outlined'
                                    onClick={() => { setIsAddModalVisible(false); setAddModalState({ sku: '', projectId: '' }) }}
                                    loading={requestStatus.isLoading}
                                >Отмена</Button>
                            </ConfigProvider>
                            <ConfigProvider theme={modalPrimaryButtonTheme}>
                                <Button
                                    loading={requestStatus.isLoading}
                                    type='primary'
                                    disabled={requestStatus.isError || !addModalState.sku || !addModalState.projectId}
                                    onClick={() => {
                                        if (!addModalState.sku || !addModalState.projectId) return;
                                        addProductToProject(authToken, addModalState.sku, addModalState.projectId);
                                        setIsAddModalVisible(false)
                                    }}>Добавить</Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Modal>
                {/* error modal */}
                <ErrorModal
                    message={requestStatus.message}
                    open={requestStatus.isError}
                    onCancel={() => setRequestStatus(initRequestStatus)}
                    onClose={() => setRequestStatus(initRequestStatus)}
                />
            </section>
            {/* ---------------------- */}
        </main>
    );
};

export default PositionTrackingMainPage;