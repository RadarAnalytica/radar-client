import { useContext, useState, useEffect } from 'react';
import Header from '@/components/sharedComponents/header/header';
import styles from './PositionTrackingMainPage.module.css';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { PositionTrackingMainPageWidget } from '@/widgets/PositionTrackingMainPageWidget/PositionTrackingMainPageWidget';
import { RadarBar } from '@/shared';
import { PlainSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/plainSelect/plainSelect';
// import { MainChart } from '@/features';
import { Table as RadarTable } from 'radar-ui';
import { Segmented, ConfigProvider, Button, Modal } from 'antd';
import { positionTrackingTableConfig } from '@/shared';
import { positionTrackingTableCustomCellRender } from '@/shared';
import MainChart from '@/components/dashboardPageComponents/charts/mainChart/mainChart';
import { SearchBlock } from '@/features';
import { useNavigate } from 'react-router-dom';
import { ServiceFunctions } from '@/service/serviceFunctions';
import AuthContext from '@/service/AuthContext';
import { useAppSelector } from '@/redux/hooks';


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

const tableMockData = [
    {
        "wb_id": 176871648,
        "wb_id_image_link": "https://basket-12.wbbasket.ru/vol1768/part176871/176871648/images/c246x328/1.webp",
        "name": "Платье лапша черное офисное больших размеров",
        "keywords": 0,
        "views": 0,
        "averagePosition": 0,
    },
    {
        "wb_id": 176871648,
        "wb_id_image_link": "https://basket-12.wbbasket.ru/vol1768/part176871/176871648/images/c246x328/1.webp",
        "name": "Платье лапша черное офисное больших размеров",
        "keywords": 1,
        "views": 1,
        "averagePosition": 1,
    },
    {
        "wb_id": 176871648,
        "wb_id_image_link": "https://basket-12.wbbasket.ru/vol1768/part176871/176871648/images/c246x328/1.webp",
        "name": "Платье лапша черное офисное больших размеров",
        "keywords": 1,
        "views": 1,
        "averagePosition": 1,
    },
]

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

const PositionTrackingMainPage = () => {
    const { shops } = useAppSelector((state) => state.filters);
    const { authToken } = useContext(AuthContext);
    const [activeFilter, setActiveFilter] = useState('По просмотрам');
    const [requestStatus, setRequestStatus] = useState<typeof initRequestStatus>(initRequestStatus);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [projectsList, setProjectsList] = useState<Project[] | null>([]);
    const [metaData, setMetaData] = useState<MetaData | null>(null);
    const [addModalState, setAddModalState] = useState<{ sku: string, projectId: string }>({ sku: '', projectId: '' });
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

    const getSkuValidity = async (token: string, sku: string): Promise<SkuValidity | undefined> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.getPostionTrackingSkuValidity(token, sku);
            if (!res.ok) {
                console.error('getSkuValidity error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить валидность SKU' });
                return;
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
            let skuValidity: SkuValidity | undefined;
            if (product) {
                skuValidity = await getSkuValidity(token, product);
            }

            if (product && !skuValidity) {
                return
            }
            const res = await ServiceFunctions.createPostionTrackingProject(token, projectName ?? null, skuValidity?.wb_id ?? null, skuValidity?.name ?? null);
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
            const res = await ServiceFunctions.addProductToPositionTrackingProject(token, projectId, sku);
            if (!res.ok) {
                console.error('addProductToProject error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось добавить товар к проекту' });
                return;
            }
            const data: Product = await res.json();
            console.log('added product to project', data);
            getProjectsList(token);
        } catch (error) {
            console.error('addProductToProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось добавить товар к проекту' });
            return;
        }
    }
    useEffect(() => {
        if (authToken) {
            getMetaData(authToken);
        }
    }, []);
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
                <PositionTrackingMainPageWidget setIsAddModalVisible={setIsAddModalVisible} hasAddBlock={metaData && metaData.projects_count === 0} createProject={async (sku: string) => {
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
                            action: () => { setIsAddModalVisible(true) },
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
                {metaData && metaData.products_count > 0 &&
                 <div className={styles.page__container}>
                    <p className={styles.page__title}>Динамика</p>
                    <div className={styles.page__selectWrapper}>
                        <PlainSelect
                            selectId='projectSelect'
                            label=''
                            value={0}
                            optionsData={[{ value: 0, label: 'Все проекты' }, ...projectsList?.map((project) => ({ value: project.id, label: project.name }))]}
                            handler={(value: number) => {
                                //setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                        />
                        <PlainSelect
                            selectId='brandSelect'
                            label=''
                            value={1}
                            optionsData={[{ value: 1, label: 'Москва' }, { value: 2, label: 'Санкт-Петербург' }]}
                            handler={(value: number) => {
                                //setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                        />
                    </div>
                </div>}

                {metaData && metaData.products_count > 0 && 
                <div className={styles.page__chartWrapper}>
                    <MainChart
                        title=''
                        loading={false}
                        dataDashBoard={chartMockData}
                        selectedRange={{ period: 30 }}
                        dragHandle={null}
                    />
                </div>}
                {metaData && metaData.products_count > 0 && <div className={styles.page__tableConfig}>
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
                {metaData && metaData.products_count > 0 && <div className={styles.page__tableWrapper}>
                    <RadarTable
                        config={positionTrackingTableConfig}
                        preset='radar-table-default'
                        dataSource={tableMockData}
                        paginationContainerStyle={{ display: 'none' }}
                        customCellRender={{
                            idx: ['name'],
                            renderer: positionTrackingTableCustomCellRender,
                        }}
                    />
                </div>}

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
                        <SearchBlock
                            style={{ padding: 0 }}
                            submitHandler={(value) => {
                                setAddModalState({ sku: value, projectId: addModalState.projectId });
                            }}
                            demoModeValue=''
                        />

                        <PlainSelect
                            selectId='brandSelect'
                            label='Проект'
                            value={addModalState.projectId}
                            optionsData={[{ value: 1, label: 'Москва' }, { value: 2, label: 'Санкт-Петербург' }]}
                            handler={(value: number) => {
                                setAddModalState({ sku: addModalState.sku, projectId: value.toString() });
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                            style={{ width: '100%', maxWidth: '100%' }}
                        />

                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={modalCancelButtonTheme}>
                                <Button variant='outlined' onClick={() => { setIsAddModalVisible(false); setAddModalState({ sku: '', projectId: '' }) }}>Отмена</Button>
                            </ConfigProvider>
                            <ConfigProvider theme={modalPrimaryButtonTheme}>
                                <Button type='primary' onClick={() => {
                                    if (!addModalState.sku || !addModalState.projectId) return;
                                    addProductToProject(authToken, addModalState.sku, addModalState.projectId);
                                    setIsAddModalVisible(false)
                                }}>Добавить</Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Modal>
            </section>
            {/* ---------------------- */}
        </main>
    );
};

export default PositionTrackingMainPage;