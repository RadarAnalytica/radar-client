import { useContext, useState, useEffect } from 'react';
import Header from '@/components/sharedComponents/header/header';
import styles from './PositionTrackingProjectsPage.module.css';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { PositionTrackingMainPageWidget } from '@/widgets/PositionTrackingMainPageWidget/PositionTrackingMainPageWidget';
import { RadarBar, RadarLoader } from '@/shared';
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
import { getWordDeclension } from '@/service/utils';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { useDemoMode } from '@/app/providers/DemoDataProvider';



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

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    errorType: 'Modal'
}

interface SkuValidity {
    wb_id: string;
    name: string;
}

const PositionTrackingProjectsPage = () => {
    const { authToken } = useContext(AuthContext);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState<{ projectId: string }>({ projectId: '' });
    const [projectsList, setProjectsList] = useState<Project[] | null>(null);
    const [requestStatus, setRequestStatus] = useState<typeof initRequestStatus>(initRequestStatus);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editModalState, setEditModalState] = useState<{ projectId: string, projectName: string }>({ projectId: '', projectName: '' });
    const [addModalNameValue, setAddModalNameValue] = useState<string>('');
    const { isDemoMode } = useDemoMode();
    const navigate = useNavigate();
    
    const getProjectsList = async (token: string, noRequestStatusUpdate: boolean = false): Promise<void> => {
        if (!requestStatus.isLoading && !noRequestStatusUpdate) {
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

            setProjectsList(data);
            if (!noRequestStatusUpdate) {
                setRequestStatus(initRequestStatus);
            }
        } catch (error) {
            console.error('getProjectsList error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список проектов' });
            return;
        }

    }
    const getSkuValidity = async (token: string, sku: string, noRequestStatusUpdate: boolean = false): Promise<SkuValidity | undefined> => {
        if (!requestStatus.isLoading && !noRequestStatusUpdate) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.getPostionTrackingSkuValidity(token, sku);
            if (!res.ok) {
                const parsed = await res.json();
                setRequestStatus({ ...initRequestStatus, isError: true, message: typeof parsed === 'string' ? parsed : 'Не удалось проверить валидность артикула' });
                return;
            }
            const data: SkuValidity = await res.json();
            if (!noRequestStatusUpdate) {
                setRequestStatus(initRequestStatus);
            }
            return data;

        } catch (error) {
            console.error('getSkuValidity error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: typeof error === 'string' ? error : 'Не удалось проверить валидность артикула' });
            return;
        }
    }
    const createProject = async (token: string, projectName: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        }
        try {
            const res = await ServiceFunctions.createPostionTrackingProject(token, projectName);
            if (!res.ok) {
                const parsed = await res.json();
                setRequestStatus({ ...initRequestStatus, isError: true, message: typeof parsed === 'string' ? parsed : 'Не удалось создать проект' });
                setIsAddModalVisible(false);
                return;
            }
            await getProjectsList(token, true);
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('createProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: typeof error === 'string' ? error : 'Не удалось создать проект' });
            setIsAddModalVisible(false);
            return;
        }
    }
    const createProjectWithProduct = async (token: string, product: string, projectName?: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        }
        try {
            let skuValidity: SkuValidity | undefined;
            if (product) {
                skuValidity = await getSkuValidity(token, product, true);
            }

            if (product && !skuValidity) {
                return
            }
            const res = await ServiceFunctions.createPostionTrackingProjectWithProduct(token, projectName ?? null, skuValidity?.wb_id ?? null, skuValidity?.name ?? null);
            if (!res.ok) {
                const parsed = await res.json();
                setRequestStatus({ ...initRequestStatus, isError: true, message: typeof parsed === 'string' ? parsed : 'Не удалось создать проект' });
                return;
            }
            const data: Project = await res.json();
            await getProjectsList(token, true);
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('createProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: typeof error === 'string' ? error : 'Не удалось создать проект' });
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
                const parsed = await res.json();
                setRequestStatus({ ...initRequestStatus, isError: true, message: typeof parsed === 'string' ? parsed : 'Не удалось удалить проект' });
                setDeleteModalVisible(false);
                return;
            }
            await getProjectsList(token, true);
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('deleteProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: typeof error === 'string' ? error : 'Не удалось удалить проект' });
            setDeleteModalVisible(false);
        }
    }
    const updateProject = async (token: string, projectId: string, projectName: string): Promise<void> => {
        if (!requestStatus.isLoading) {
            setRequestStatus({ ...initRequestStatus, isLoading: true });
        };
        try {
            const res = await ServiceFunctions.updatePositionTrackingProject(token, projectId, projectName);
            if (!res.ok) {
                const parsed = await res.json();
                setRequestStatus({ ...initRequestStatus, isError: true, message: typeof parsed === 'string' ? parsed : 'Не удалось обновить проект' });
                setEditModalVisible(false);
                return;
            }
            await getProjectsList(token, true);
            setRequestStatus(initRequestStatus);
        } catch (error) {
            console.error('updateProject error:', error);
            setRequestStatus({ ...initRequestStatus, isError: true, message: typeof error === 'string' ? error : 'Не удалось обновить проект' });
            setEditModalVisible(false);
            return;
        }
    }

    useEffect(() => {
        if (authToken) {
            getProjectsList(authToken);
        }
    }, []);

    useEffect(() => {
        if (isDemoMode) {
            navigate('/position-tracking');
        }
    }, [isDemoMode]);
    useEffect(() => {
        if (!isAddModalVisible) {
            setAddModalNameValue('');
        }
    }, [isAddModalVisible])


    return projectsList &&(
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
                {projectsList?.length > 0 &&
                    <div className={styles.page__titleBlock}>
                        {projectsList?.length > 0 && <p className={styles.page__title}>У вас {projectsList?.length} {getWordDeclension('проект', projectsList.length)}</p>}
                        {!projectsList?.length && <p className={styles.page__title}>У вас нет проектов</p>}
                        <ConfigProvider theme={modalPrimaryButtonTheme}>
                            <Button type='primary' onClick={() => setIsAddModalVisible(true)}>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 3V11M11 19V11M11 11H3H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Создать проект
                            </Button>
                        </ConfigProvider>
                    </div>
                }
                {projectsList && projectsList.length === 0 &&
                    <PositionTrackingMainPageWidget setIsAddModalVisible={setIsAddModalVisible} hasAddBlock={true} hasProceedToBlocks={false} loading={requestStatus.isLoading} createProject={async (sku: string) => {
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
                        await createProjectWithProduct(authToken, normilizedId, undefined);
                    }}
                    />
                }
                {requestStatus.isLoading && projectsList && projectsList.length > 0 &&
                    <div className={styles.page__tableWrapper}>
                        <RadarLoader loaderStyle={{ height: '50vh' }} />
                    </div>
                }
                {projectsList?.length > 0 && !requestStatus.isLoading &&
                    <div className={styles.page__tableWrapper}>
                        <RadarTable
                            config={positionTrackingProjectsTableConfig}
                            preset='radar-table-default'
                            dataSource={projectsList}
                            paginationContainerStyle={{ display: 'none' }}
                            customCellRender={{
                                idx: ['actions', 'created_at', 'updated_at'],
                                renderer: (value: any, record: any, index: number, dataIndex: string) => positionTrackingProjectsCustomCellRender(value, record, index, dataIndex, setDeleteModalVisible, setEditModalVisible, setDeleteModalState, setEditModalState) as React.ReactNode,
                            }}
                        />
                    </div>
                }

                {/* edit modal */}
                <Modal
                    open={editModalVisible}
                    onCancel={() => {
                        if (requestStatus.isLoading) return;
                        setEditModalVisible(false)
                    }}
                    onClose={() => {
                        if (requestStatus.isLoading) return;
                        setEditModalVisible(false)
                    }}
                    onOk={() => {
                        if (requestStatus.isLoading) return;
                        setEditModalVisible(false)
                    }}
                    footer={null}
                    centered
                    width={600}
                >
                    <div className={styles.addModal}>
                        <p className={styles.addModal__title}>Изменить название проекта</p>
                        <ConfigProvider theme={inputTheme}>
                            <Input
                                size='large'
                                className={styles.modal__input}
                                placeholder='Введите название'
                                value={editModalState.projectName}
                                onChange={(e) => setEditModalState({ ...editModalState, projectName: e.target.value })}
                            />
                        </ConfigProvider>
                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={modalCancelButtonTheme}>
                                <Button variant='outlined' onClick={() => setEditModalVisible(false)} loading={requestStatus.isLoading}>Отмена</Button>
                            </ConfigProvider>
                            <ConfigProvider theme={modalPrimaryButtonTheme}>
                                <Button
                                    loading={requestStatus.isLoading}
                                    disabled={!editModalState?.projectName?.trim()}
                                    type='primary'
                                    onClick={async () => {
                                        if (!editModalState.projectId || !editModalState.projectName) return;
                                        if (projectsList?.some(_ => _.name === editModalState.projectName?.trim())) {
                                            setEditModalVisible(false);
                                            return;
                                        };
                                        await updateProject(authToken, editModalState.projectId, editModalState.projectName);
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
                        <p className={styles.addModal__title}>Создание проекта</p>
                        <ConfigProvider theme={inputTheme}>
                            <Input
                                size='large'
                                className={styles.modal__input}
                                placeholder='Введите название'
                                value={addModalNameValue}
                                onChange={(e) => setAddModalNameValue(e.target.value)}
                                status={projectsList?.some(_ => _.name === addModalNameValue?.trim()) ? 'error' : ''}
                            />
                        </ConfigProvider>
                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={modalCancelButtonTheme}>
                                <Button
                                    variant='outlined'
                                    onClick={() => { setIsAddModalVisible(false); setAddModalNameValue('') }}
                                    loading={requestStatus.isLoading}
                                >
                                    Отмена
                                </Button>
                            </ConfigProvider>
                            <ConfigProvider theme={modalPrimaryButtonTheme}>
                                <Button
                                    loading={requestStatus.isLoading}
                                    type='primary'
                                    disabled={!addModalNameValue.trim()}
                                    onClick={async () => {
                                        if (projectsList?.some(_ => _.name === addModalNameValue?.trim())) {
                                            return;
                                        };
                                        await createProject(authToken, addModalNameValue?.trim());
                                        setIsAddModalVisible(false)
                                    }}
                                >
                                    Добавить
                                </Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Modal>
                {/* delete modal */}
                <Modal
                    open={deleteModalVisible}
                    onCancel={() => {
                        if (requestStatus.isLoading) return;
                        setDeleteModalVisible(false)
                    }}
                    onClose={() => {
                        if (requestStatus.isLoading) return;
                        setDeleteModalVisible(false)
                    }}
                    onOk={() => {
                        if (requestStatus.isLoading) return;
                        setDeleteModalVisible(false)
                    }}
                    footer={null}
                    centered
                    width={400}
                >
                    <div className={styles.addModal}>
                        <p className={styles.addModal__title} style={{ maxWidth: '300px' }}>Вы уверены, что хотите удалить проект?</p>
                        <div className={styles.addModal__buttonsWrapper}>
                            <ConfigProvider theme={deleteModalCancelButtonTheme}>
                                <Button
                                    loading={requestStatus.isLoading}
                                    onClick={() => setDeleteModalVisible(false)}
                                    style={{ width: '50%' }}
                                >
                                    Отменить
                                </Button>
                            </ConfigProvider>
                            <ConfigProvider theme={deleteModalPrimaryButtonTheme}>
                                <Button
                                    loading={requestStatus.isLoading}
                                    type='primary'
                                    onClick={async () => {
                                        if (!deleteModalState.projectId) return;
                                        await deleteProject(authToken, deleteModalState.projectId);
                                        setDeleteModalVisible(false);
                                    }
                                    } style={{ width: '50%' }}>Удалить</Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Modal>
                {/* error modal */}
                <ErrorModal
                    message={requestStatus.message}
                    open={requestStatus.isError && requestStatus.errorType === 'Modal'}
                    onCancel={() => setRequestStatus(initRequestStatus)}
                    onClose={() => setRequestStatus(initRequestStatus)}
                />
            </section>
            {/* ---------------------- */}
        </main>
    );
};

export default PositionTrackingProjectsPage;