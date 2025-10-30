import React, { useState, useEffect, useContext, useMemo } from 'react';
import styles from './productsGroupsPage.module.css';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { NoDataWidget, GroupsMainWidget } from '../../widgets';
import { AddGroupModal, GroupEditModal } from '../../features';
import AuthContext from '@/service/AuthContext';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { useAppSelector } from '@/redux/hooks';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';
import AlertWidget from '@/components/sharedComponents/AlertWidget/AlertWidget';

const initDataFetchingStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

const initAlertState = {
    isVisible: false,
    message: '',
};

const ProductGroupsPage = () => {
    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
    const [alertState, setAlertState] = useState(initAlertState);
    const [dataFetchingStatus, setDataFetchingStatus] = useState(initDataFetchingStatus);
    const progress = useLoadingProgress({ loading: dataFetchingStatus.isLoading });
    const [groupsMainData, setGroupsMainData] = useState([]);
    const { shops } = useAppSelector((state) => state.shopsSlice);

    const getGroupsData = async (authToken) => {
        progress.start();
        setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true });
        try {
            const parsedRes = await ServiceFunctions.getProductGroupsList(authToken);
            progress.complete();
            setGroupsMainData(parsedRes.data);
            setDataFetchingStatus(initDataFetchingStatus);
        } catch (error) {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: error.message || 'Что-то пошло не так :(' });
        }
    };

    useEffect(() => {
        getGroupsData(authToken);
    }, []);

    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header title='Группы товаров' />
                </div>

                {isDemoMode && <NoSubscriptionWarningBlock />}

                <Loader loading={dataFetchingStatus.isLoading} progress={progress.value} />

                {!dataFetchingStatus.isLoading && shops && groupsMainData && groupsMainData.length === 0 &&
                    <NoDataWidget
                        mainTitle='Здесь пока нет ни одной группы товаров'
                        mainText='Создайте первую группу, чтобы начать работу'
                        buttonTitle='Создать'
                        action={() => setIsAddGroupModalVisible(true)}
                    />
                }

                {!dataFetchingStatus.isLoading && shops && groupsMainData && groupsMainData.length > 0 &&
                    <GroupsMainWidget
                        setIsAddGroupModalVisible={setIsAddGroupModalVisible}
                        groupsMainData={groupsMainData}
                        getGroupsData={getGroupsData}
                        setDataFetchingStatus={setDataFetchingStatus}
                        initDataFetchingStatus={initDataFetchingStatus}
                        dataFetchingStatus={dataFetchingStatus}
                        setAlertState={setAlertState}
                    />
                }
            </section>

            <AddGroupModal
                isAddGroupModalVisible={isAddGroupModalVisible}
                setIsAddGroupModalVisible={setIsAddGroupModalVisible}
                setDataFetchingStatus={setDataFetchingStatus}
                initDataFetchingStatus={initDataFetchingStatus}
                dataFetchingStatus={dataFetchingStatus}
            />

            <ErrorModal
                open={dataFetchingStatus.isError}
                onOk={() => setDataFetchingStatus(initDataFetchingStatus)}
                onClose={() => setDataFetchingStatus(initDataFetchingStatus)}
                onCancel={() => setDataFetchingStatus(initDataFetchingStatus)}
                message={dataFetchingStatus.message}
                footer={null}
            />

            <AlertWidget 
                message={alertState.message} 
                isVisible={alertState.isVisible} 
                setIsVisible={(isVisible) => setAlertState({ ...alertState, isVisible })} 
            />
        </main>
    );
};

export default ProductGroupsPage;
