import { useState } from 'react';
import Header from '@/components/sharedComponents/header/header';
import styles from './PositionTrackingProjectsPage.module.css';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { PositionTrackingMainPageWidget } from '@/widgets/PositionTrackingMainPageWidget/PositionTrackingMainPageWidget';
import { RadarBar } from '@/shared';
import { PlainSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/plainSelect/plainSelect';
// import { MainChart } from '@/features';
import { Table as RadarTable } from 'radar-ui';
import { Segmented, ConfigProvider, Button, Modal, Input } from 'antd';
import { positionTrackingProjectsTableConfig } from '@/shared';
import { positionTrackingProjectsCustomCellRender } from '@/shared';
import { SearchBlock } from '@/features';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@/components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';



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

const deleteModalCancelButtonTheme = {
    token: {
        colorPrimary: '#1A1A1A',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Mulish',
        controlHeight: 48,
        borderRadius: 16,
    },
    components: {
        Button: {
            paddingInline: 28,
            paddingBlock: 12,
            colorBgContainer: '#F4F5F6',
            colorBgContainerHover: '#E9EBED',
            colorBgContainerDisabled: '#F4F5F6',
            colorBorder: 'transparent',
            colorText: '#1A1A1A',
            colorTextHover: '#1A1A1A',
            boxShadow: 'none',
        },
    },
};

const deleteModalPrimaryButtonTheme = {
    token: {
        colorPrimary: '#FF3B5C',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Mulish',
        controlHeight: 48,
        borderRadius: 16,
    },
    components: {
        Button: {
            paddingInline: 28,
            paddingBlock: 12,
            colorPrimaryHover: '#FF5370',
            colorPrimaryActive: '#E82646',
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

const projectsMockData = [
    {
        key: '1',
        name: 'Ваш первый проект',
        wb_id: 'PRJ-001',
        wb_id_image_link: 'https://via.placeholder.com/64x64.png?text=PR',
        createdAt: '12.09.2024',
        updatedAt: '05.10.2024',
        productsCount: 12,
        actions: '—',
    },
    {
        key: '2',
        name: 'Проект Москва',
        wb_id: 'PRJ-002',
        wb_id_image_link: 'https://via.placeholder.com/64x64.png?text=MSK',
        createdAt: '20.08.2024',
        updatedAt: '01.10.2024',
        productsCount: 8,
        actions: '—',
    },
    {
        key: '3',
        name: 'Проект Санкт-Петербург',
        wb_id: 'PRJ-003',
        wb_id_image_link: 'https://via.placeholder.com/64x64.png?text=SPB',
        createdAt: '03.07.2024',
        updatedAt: '28.09.2024',
        productsCount: 15,
        actions: '—',
    },
    {
        key: '4',
        name: 'Проект Новинки',
        wb_id: 'PRJ-004',
        wb_id_image_link: 'https://via.placeholder.com/64x64.png?text=NEW',
        createdAt: '11.10.2024',
        updatedAt: '14.10.2024',
        productsCount: 4,
        actions: '—',
    },
];

const PositionTrackingProjectsPage = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const navigate = useNavigate();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
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
                        // @ts-ignore
                        title={
                            <Breadcrumbs
                                config={[
                                    { name: 'Трекинг позиций', slug: '/position-tracking', },
                                    { name: 'Проекты' },
                                ]}
                                actions={[]}
                            />
                        }
                        titlePrefix=''
                        videoReviewLink=''
                        howToLink=''
                        howToLinkText=''
                        hasShadow={false}
                        children={null}
                    />
                </div>
                {/* !header */}
                <div className={styles.page__titleBlock}>
                    <p className={styles.page__title}>У вас 1 проект</p>
                    <ConfigProvider theme={modalPrimaryButtonTheme}>
                        <Button type='primary' onClick={() => setIsAddModalVisible(true)}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 3V11M11 19V11M11 11H3H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Создать проект
                        </Button>
                    </ConfigProvider>
                </div>
                <div className={styles.page__tableWrapper}>
                    <RadarTable
                        config={positionTrackingProjectsTableConfig}
                        preset='radar-table-default'
                        dataSource={projectsMockData}
                        paginationContainerStyle={{ display: 'none' }}
                        customCellRender={{
                            idx: ['actions'],
                            renderer: (value: any, record: any, index: number, dataIndex: string) => positionTrackingProjectsCustomCellRender(value, record, index, dataIndex, setDeleteModalVisible, setEditModalVisible) as React.ReactNode,
                        }}
                    />
                </div>

                {/* add modal */}
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
                {/* edit modal */}
                <Modal
                    open={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    onClose={() => setEditModalVisible(false)}
                    onOk={() => setEditModalVisible(false)}
                    footer={null}
                    centered
                    width={600}
                >
                    <div className={styles.addModal}>
                        <p className={styles.addModal__title}>Изменить название проекта</p>
                        <Input
                            size='large'
                            className={styles.modal__input}
                            placeholder='Введите название'
                        //value={inputValue}
                        // onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={modalCancelButtonTheme}>
                                <Button variant='outlined' onClick={() => setIsAddModalVisible(false)}>Отмена</Button>
                            </ConfigProvider>
                            <ConfigProvider theme={modalPrimaryButtonTheme}>
                                <Button type='primary' onClick={() => { setIsAddModalVisible(false); navigate(`/position-tracking/projects`) }}>Сохранить</Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Modal>

                {/* delete modal */}
                <Modal
                    open={deleteModalVisible}
                    onCancel={() => setDeleteModalVisible(false)}
                    onClose={() => setDeleteModalVisible(false)}
                    onOk={() => setDeleteModalVisible(false)}
                    footer={null}
                    centered
                    width={400}
                >
                    <div className={styles.addModal}>
                        <p className={styles.addModal__title} style={{ maxWidth: '300px'}}>Вы уверены, что хотите удалить проект?</p>
                        <div className={styles.addModal__buttonsWrapper}>
                             <ConfigProvider theme={deleteModalCancelButtonTheme}>
                                 <Button onClick={() => setDeleteModalVisible(false)} style={{ width: '50%' }}>Отменить</Button>
                            </ConfigProvider>
                             <ConfigProvider theme={deleteModalPrimaryButtonTheme}>
                                 <Button type='primary' onClick={() => setDeleteModalVisible(false)} style={{ width: '50%' }}>Удалить расход</Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Modal>
            </section>
            {/* ---------------------- */}
        </main>
    );
};

export default PositionTrackingProjectsPage;