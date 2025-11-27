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
    shows: number;
    place: number;
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

const chartMockData = {
    orderCountList: [12, 18, 16, 20, 15, 22, 19, 24, 21, 18, 23, 17, 16, 22, 25, 19, 18, 21, 20, 23, 24, 26, 22, 19, 21, 18, 20, 22, 24, 23],
    orderAmountList: [12000, 14500, 13200, 15800, 14100, 16700, 15400, 17600, 16900, 15000, 17300, 16000, 15200, 16800, 18200, 15900, 15500, 16300, 16100, 17200, 17800, 18500, 17400, 16200, 16800, 15600, 16400, 17000, 17700, 18100],
    saleCountList: [9, 14, 12, 15, 11, 17, 13, 18, 16, 13, 17, 12, 11, 16, 18, 14, 13, 15, 14, 17, 18, 19, 16, 14, 15, 13, 14, 16, 18, 17],
    saleAmountList: [9800, 11200, 10500, 12100, 10700, 13200, 11800, 13800, 13000, 11400, 13600, 12300, 11500, 12900, 14100, 12200, 11800, 12500, 12300, 13400, 13900, 14600, 13300, 12400, 12800, 11600, 12200, 12900, 13500, 14000],
};

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
        project_ids: [settings.project],
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
    const [settingsState, setSettingsState] = useState<{ project: string | number, dest: string | number }>({ project: 0, dest: -1257786 });
    const [mainPageData, setMainPageData] = useState<PositionTrackingMainPageData | null>(null);
    const navigate = useNavigate();

    const getMetaData = async (token: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.getPostionTrackingMeta(token);
            if (!res.ok) {
                console.error('getMetaData error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить метаданные' });
                return;
            }
            const data: MetaData = await res.json();
            console.log('meta data', data);
            setMetaData(data);
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('getMetaData error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить метаданные' });
            return;
        }
    }

    const getSkuValidity = async (token: string, sku: string): Promise<SkuValidity | boolean | undefined> => {
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
            console.log('sku validity', data);
            setRequestStatus(initRequestStatus);
            return data;

        } catch (error) {
            console.error('getSkuValidity error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить валидность SKU' });
            return;
        }
    }

    //get all projects list
    const getProjectsList = async (token: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.getPostionTrackingProjects(token);
            if (!res.ok) {
                console.error('getProjectsList error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список проектов' });
                return
            }
            const data: Project[] = await res.json();
            console.log('all projects', data);
            setProjectsList(data);
            setAddModalState({ sku: '', projectId: '' });
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('getProjectsList error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список проектов' });
            return;
        }

    }

    const createProject = async (token: string, product: string, projectName?: string): Promise<void> => {
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
            console.log('created project', data);
        } catch (error) {
            console.error('createProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось создать проект' });
            return;
        }
    }
    const addProductToProject = async (token: string, sku: string, projectId: string): Promise<void> => {
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
            console.log('added product to project', data);
            getMetaData(token);
            getProjectsList(token);
            if (settingsState.project === projectId) {
                getPositionTrackingMainPageData(token);
            }
        } catch (error) {
            console.error('addProductToProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось добавить товар к проекту' });
            return;
        }
    }
    const getRegionsList = async (token: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res: Record<string, any>[] = await ServiceFunctions.getSERPFiltersData(token);
            setRegionsList(res);
            setSettingsState({ ...settingsState, dest: res?.find((item) => item.city_name === 'Москва')?.dest || res[0]?.dest })
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('getRegionsList error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список регионов' });
            return;
        }
    }
    const getPositionTrackingMainPageData = async (token: string): Promise<void> => {
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
            console.log('position tracking main page data', data);
            setMainPageData(data);
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('getPositionTrackingMainPageData error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить данные для главной страницы' });
            return;
        }
    }
    useEffect(() => {
        if (authToken) {
            Promise.all([
                getMetaData(authToken),
                getProjectsList(authToken),
                getRegionsList(authToken)
            ]);
        }
    }, []);
    useEffect(() => {
        if (authToken) {
            getPositionTrackingMainPageData(authToken);
        }
    }, [settingsState, activeFilter]);
    useEffect(() => {
        if (metaData && metaData.projects_count > 0 && !mainPageData) {
            getPositionTrackingMainPageData(authToken);
        }
    }, [metaData]);
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
                {metaData && metaData.projects_count > 0 && shops &&
                    <div className={styles.page__barsWrapper}>
                        <RadarBar
                            title="Активные товары"
                            mainValue={metaData?.products_count ?? 0}
                            isLoading={false}
                            actionButtonParams={{
                                text: 'Добавить новый товар к отслеживаню',
                                action: () => { setAddModalState({ ...addModalState, projectId: projectsList[0]?.id?.toString() }); setIsAddModalVisible(true) },
                                style: {
                                    backgroundColor: 'transparent',
                                    alignSelf: 'flex-end'
                                }
                            }}
                        />
                        <RadarBar
                            title="Магазины"
                            mainValue={shops.filter((shop) => shop.id !== 0).length}
                            isLoading={false}
                        />
                        <RadarBar
                            title="Проекты"
                            mainValue={metaData?.projects_count ?? 0}
                            isLoading={false}
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
                {metaData && metaData.products_count > 0 && projectsList &&
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
                                disabled={false}
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
                                    disabled={false}
                                />
                            }
                        </div>
                    </div>}

                {mainPageData?.chart && mainPageData?.chart.length > 0 &&
                    <div className={styles.page__chartWrapper}>
                        <MainChart
                            loading={false}
                            dataDashBoard={mainPageData?.chart}
                        />
                    </div>}
                {mainPageData?.products && mainPageData?.products.length > 0 &&
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
                {mainPageData?.products && mainPageData?.products.length > 0 &&
                    <div className={styles.page__tableWrapper}>
                        <RadarTable
                            config={positionTrackingTableConfig}
                            preset='radar-table-default'
                            dataSource={mainPageData?.products}
                            paginationContainerStyle={{ display: 'none' }}
                            customCellRender={{
                                idx: ['name'],
                                renderer: positionTrackingTableCustomCellRender,
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