import React, { useState, useContext, useEffect } from 'react';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Header from '@/components/sharedComponents/header/header';
import Breadcrumbs from '@/components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import { AddSkuModal, ConfirmationModal, GroupEditModal } from '../../features';
import { SingleGroupWidget, NoDataWidget } from '../../widgets';
import { useNavigate } from 'react-router-dom';
import styles from './singleGroupPage.module.css';
import AuthContext from '@/service/AuthContext';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchShops } from '@/redux/shops/shopsActions';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { fetchApi } from "@/service/fetchApi";
import AlertWidget from '@/components/sharedComponents/AlertWidget/AlertWidget';

const initDataFetchingStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

const initAlertState = {
    isVisible: false,
    message: '',
};

const initConfirmationState = {
  open: false,
  title: '',
  message: '',
  mainAction: '',
  returnAction: '',
  actionTitle: '',
};

const SingleGroupPage = () => {
    const { authToken, user } = useContext(AuthContext);
    const [dataFetchingStatus, setDataFetchingStatus] = useState(initDataFetchingStatus);
    const [groupData, setGroupData] = useState([]);
    const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);
    const [isAddSkuModalVisible, setIsAddSkuModalVisible] = useState(false);
    const [confirmationModalState, setConfirmationModalState] = useState(initConfirmationState);
    const [alertState, setAlertState] = useState(initAlertState);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useAppDispatch();
    const { shops } = useAppSelector((state) => state.shopsSlice);

    // ------- Фетч массива магазинов -------------//
    const fetchShopData = async () => {
        try {
            dispatch(fetchShops(authToken));
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };
    //---------------------------------------------//

    const getGroupData = async (authToken, groupId) => {
        groupData.length === 0 && setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true });

        try {
            const res = await fetchApi(`/api/product/product_groups/${groupId}`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
            });

            if (!res.ok) {
                const parsedData = await res.json();
                setDataFetchingStatus({
                  ...initDataFetchingStatus,
                  isError: true,
                  message: parsedData?.detail || 'Что-то пошло не так :('
                });
                return;
            }
            const parsedRes = await res.json();
            let sortedData = parsedRes.data;
            sortedData = {
                ...sortedData,
                products: sortedData?.products.sort((a, b) => a.article.localeCompare(b.article))
            };
            setGroupData(sortedData);
            setDataFetchingStatus(initDataFetchingStatus);
        } catch (e) {
            console.error('Error:', e);
            setDataFetchingStatus({
              ...initDataFetchingStatus,
              isError: true,
              message: 'Что-то пошло не так :('
            });
        }
    };

    const deleteGroup = async (authToken, groupId) => {
        try {
            const res = await fetchApi(`/api/product/product_groups/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
            });

            if (!res.ok) {
                const parsedData = await res.json();
                setDataFetchingStatus({
                  ...initDataFetchingStatus,
                  isError: true,
                  message: parsedData?.detail || 'Что-то пошло не так :('
                });
                return;
            }
            dispatch(fetchFilters({ authToken, shopsData: shops }));
            navigate('/groups');
        } catch (e) {
            console.error('Error:', e);
            setDataFetchingStatus({
              ...initDataFetchingStatus,
              isError: true,
              message: 'Что-то пошло не так :('
            });
        }
    };

    useEffect(() => {
        params?.group_id && getGroupData(authToken, params.group_id);
    }, [params]);

    // 0. Получаем данные магазинов
    useEffect(() => {
        if (!shops || shops.length === 0) {
            fetchShopData();
        }
    }, [shops]);

    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header
                        title={
                            <Breadcrumbs
                                config={[
                                    { name: 'Группы товаров', slug: '/groups' },
                                    { name: groupData.name },
                                ]}
                                actions={[
                                    //{ type: 'edit', action: () => { setIsAddSkuModalVisible(true) } },
                                    { type: 'edit', action: () => { setIsEditGroupModalVisible(true); } },
                                    //{ type: 'delete', action: () => { deleteGroup(authToken, params?.group_id) } },
                                    {
                                        type: 'delete', action: () => {
                                            setConfirmationModalState({ open: true, title: 'Удаление группы', actionTitle: 'Удалить', message: `Вы уверены, что хотите удалить группу "${groupData.name}"?`, mainAction: () => { deleteGroup(authToken, params?.group_id); }, returnAction: () => { setConfirmationModalState(initConfirmationState); } });
                                        }
                                    },
                                ]}
                            />
                        }
                    />
                </div>

                {dataFetchingStatus.isLoading &&
                    <div className={styles.page__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                }

                {!dataFetchingStatus.isLoading && groupData.products && groupData.products.length === 0 &&
                    <NoDataWidget
                        mainTitle='Здесь пока нет ни одного артикула'
                        mainText='Добавьте первый артикул, чтобы начать работу'
                        buttonTitle='Добавить'
                        action={() => setIsAddSkuModalVisible(true)}
                        type='sku'
                    />
                }

                {!dataFetchingStatus.isLoading && groupData.products && groupData.products.length > 0 &&
                    <SingleGroupWidget
                        setIsAddSkuModalVisible={setIsAddSkuModalVisible}
                        data={groupData}
                        dataFetchingStatus={dataFetchingStatus}
                        initDataFetchingStatus={initDataFetchingStatus}
                        groupId={params.group_id}
                        getGroupData={getGroupData}
                        shops={shops}
                        setConfirmationModalState={setConfirmationModalState}
                        initConfirmationState={initConfirmationState}
                        setAlertState={setAlertState}
                    />
                }
            </section>

            <AlertWidget 
                message={alertState.message} 
                isVisible={alertState.isVisible} 
                setIsVisible={(isVisible) => setAlertState({ ...alertState, isVisible })} 
            />

            {/*  modals */}
            <AddSkuModal
                isAddSkuModalVisible={isAddSkuModalVisible}
                setIsAddSkuModalVisible={setIsAddSkuModalVisible}
                setDataFetchingStatus={setDataFetchingStatus}
                groupData={groupData}
                authToken={authToken}
                getGroupData={getGroupData}
                initDataFetchingStatus={initDataFetchingStatus}
                dataFetchingStatus={dataFetchingStatus}
                shops={shops}
                setAlertState={setAlertState}
            />

            <ErrorModal
                open={dataFetchingStatus.isError}
                message={dataFetchingStatus.message}
                onOk={() => setDataFetchingStatus(initDataFetchingStatus)}
                onCancel={() => setDataFetchingStatus(initDataFetchingStatus)}
                onClose={() => setDataFetchingStatus(initDataFetchingStatus)}
                footer={null}
            />

            <ConfirmationModal
                {...confirmationModalState}
            />

            <GroupEditModal
                isEditGroupModalVisible={isEditGroupModalVisible}
                setIsEditGroupModalVisible={setIsEditGroupModalVisible}
                dataFetchingStatus={dataFetchingStatus}
                setDataFetchingStatus={setDataFetchingStatus}
                groupData={groupData}
                updateMainData={getGroupData}
            />
        </main>
    );
};

export default SingleGroupPage;
