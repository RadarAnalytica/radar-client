import { useState } from 'react';
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

const PositionTrackingMainPage = () => {
    const [activeFilter, setActiveFilter] = useState('По просмотрам');
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const navigate = useNavigate();
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
                <PositionTrackingMainPageWidget hasAddBlock={true} setIsAddModalVisible={setIsAddModalVisible} />

                {/* info bars */}
                <div className={styles.page__barsWrapper}>
                    <RadarBar
                        title="Активные товары"
                        mainValue={1}
                        isLoading={false}
                        actionButtonParams={{
                            text: 'Добавить новый товар к отслеживаню',
                            action: () => {setIsAddModalVisible(true)},
                            style: {
                                backgroundColor: 'transparent',
                                alignSelf: 'flex-end'
                            }
                        }}
                    />
                    <RadarBar
                        title="Магазины"
                        mainValue={2}
                        isLoading={false}
                    />
                    <RadarBar
                        title="Проект"
                        mainValue={1}
                        isLoading={false}
                        actionButtonParams={{
                            text: 'Управлять',
                            action: () => {navigate(`/position-tracking/projects`)},
                            style: {
                                backgroundColor: 'transparent',
                                alignSelf: 'flex-end'
                            }
                        }}
                    />
                </div>

                {/* settings block */}
                <div className={styles.page__container}>
                    <p className={styles.page__title}>Динамика</p>
                    <div className={styles.page__selectWrapper}>
                        <PlainSelect
                            selectId='brandSelect'
                            label=''
                            value={0}
                            optionsData={[{ value: 0, label: 'Все проекты' }, { value: 2, label: 'Проект 1' }]}
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
                </div>

                <div className={styles.page__chartWrapper}>
                    <MainChart
                        // @ts-ignore
                        title=''
                        loading={false}
                        dataDashBoard={chartMockData}
                        selectedRange={{ period: 30 }}
                    />
                </div>
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
                </div>
                <div className={styles.page__tableWrapper}>
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
                </div>

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
                            demoModeValue=''
                            submitHandler={(value) => {
                                navigate(`/position-tracking/projects`);
                            }}
                        />

                        <PlainSelect
                            selectId='brandSelect'
                            label='Проект'
                            value={1}
                            optionsData={[{ value: 1, label: 'Москва' }, { value: 2, label: 'Санкт-Петербург' }]}
                            handler={(value: number) => {
                                //setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                            style={{ width: '100%', maxWidth: '100%' }}
                        />

                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={modalCancelButtonTheme}>
                                <Button variant='outlined' onClick={() => setIsAddModalVisible(false)}>Отмена</Button>
                            </ConfigProvider>
                            <ConfigProvider theme={modalPrimaryButtonTheme}>
                                <Button type='primary' onClick={() => {setIsAddModalVisible(false); navigate(`/position-tracking/projects`)}}>Добавить</Button>
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