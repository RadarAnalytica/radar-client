import { useContext, useState, useEffect } from 'react';
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
import { ServiceFunctions } from '@/service/serviceFunctions';
import AuthContext from '@/service/AuthContext';



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

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

const PositionTrackingProjectsPage = () => {
    const { authToken } = useContext(AuthContext);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState<{ projectId: string }>({ projectId: '' });
    const [projectsList, setProjectsList] = useState<Project[] | null>([]);
    const [requestStatus, setRequestStatus] = useState<typeof initRequestStatus>(initRequestStatus);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editModalState, setEditModalState] = useState<{ projectId: string, projectName: string }>({ projectId: '', projectName: '' });
    const [addModalState, setAddModalState] = useState<{ sku: string, projectId: string }>({ sku: '', projectId: '' });

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
            const res = await ServiceFunctions.createPostionTrackingProject(token, projectName ?? 'Новый проект');
            if (!res.ok) {
                console.error('createProject error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось создать проект' });
                return;
            }
            const data: Project = await res.json();
            if (product && data.id) {
                const addRes = await ServiceFunctions.addProductToPositionTrackingProject(token, data.id, product);
                if (!addRes.ok) {
                    console.error('addProductToPositionTrackingProject error:');
                    setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось добавить товар к проекту' });
                    return;
                }
                const parsedAddRes: Product = await addRes.json();
                console.log('added product to project', data);
                getProjectsList(token);
            }
            console.log('created project', data);
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('createProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось создать проект' });
            return;
        }
    }
    const deleteProject = async (token: string, projectId: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.deletePositionTrackingProject(token, projectId);
            if (!res.ok) {
                console.error('deleteProject error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось удалить проект' });
                return;
            }
            console.log('deleted project');
            getProjectsList(token);
        } catch (error) {
            console.error('deleteProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось удалить проект' });
        }
    }

    const updateProject = async (token: string, projectId: string, projectName: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.updatePositionTrackingProject(token, projectId, projectName);
            if (!res.ok) {
                console.error('updateProject error:');
                setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось обновить проект' });
                return;
            }
            console.log('updated project');
            getProjectsList(token);
        } catch (error) {
            console.error('updateProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось обновить проект' });
            return;
        }
    }

    useEffect(() => {
        if (authToken) {
            getProjectsList(authToken);
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
                    <p className={styles.page__title}>У вас {projectsList?.length ?? 0} проектов</p>
                    <ConfigProvider theme={modalPrimaryButtonTheme}>
                        <Button type='primary' onClick={() => setIsAddModalVisible(true)}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 3V11M11 19V11M11 11H3H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Создать проект
                        </Button>
                    </ConfigProvider>
                </div>
                {projectsList?.length > 0 &&
                    <div className={styles.page__tableWrapper}>
                        <RadarTable
                            config={positionTrackingProjectsTableConfig}
                            preset='radar-table-default'
                            dataSource={projectsList}
                            paginationContainerStyle={{ display: 'none' }}
                            customCellRender={{
                                idx: ['actions'],
                                renderer: (value: any, record: any, index: number, dataIndex: string) => positionTrackingProjectsCustomCellRender(value, record, index, dataIndex, setDeleteModalVisible, setEditModalVisible, setDeleteModalState, setEditModalState) as React.ReactNode,
                            }}
                        />
                    </div>}

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
                            value={editModalState.projectName}
                            onChange={(e) => setEditModalState({ ...editModalState, projectName: e.target.value })}
                        />
                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={modalCancelButtonTheme}>
                                <Button variant='outlined' onClick={() => setIsAddModalVisible(false)}>Отмена</Button>
                            </ConfigProvider>
                            <ConfigProvider theme={modalPrimaryButtonTheme}>
                                <Button type='primary' onClick={() => { 
                                    if (!editModalState.projectId || !editModalState.projectName) return;
                                    updateProject(authToken, editModalState.projectId, editModalState.projectName);
                                    setEditModalVisible(false);
                                }}>Сохранить</Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Modal>
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
                                    createProject(authToken, addModalState.sku, addModalState.projectId);
                                    setIsAddModalVisible(false)
                                }}>Добавить</Button>
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
                        <p className={styles.addModal__title} style={{ maxWidth: '300px' }}>Вы уверены, что хотите удалить проект?</p>
                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={deleteModalCancelButtonTheme}>
                                <Button onClick={() => setDeleteModalVisible(false)} style={{ width: '50%' }}>Отменить</Button>
                            </ConfigProvider>
                            <ConfigProvider theme={deleteModalPrimaryButtonTheme}>
                                <Button type='primary' onClick={() => 
                                    {
                                        if (!deleteModalState.projectId) return;
                                        deleteProject(authToken, deleteModalState.projectId);
                                        setDeleteModalVisible(false);
                                    }
                                } style={{ width: '50%' }}>Удалить</Button>
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