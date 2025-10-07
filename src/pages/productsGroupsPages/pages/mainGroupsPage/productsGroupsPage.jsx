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
import NoSubscriptionWarningBlock
  from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";

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
    const [groupsMainData, setGroupsMainData] = useState([]);
    const { shops } = useAppSelector((state) => state.shopsSlice);

    const getGroupsData = async (authToken) => {
        groupsMainData.length === 0 && setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true });
        try {
            const parsedRes = await ServiceFunctions.getProductGroupsList(authToken);
            setGroupsMainData(parsedRes.data);
            setDataFetchingStatus(initDataFetchingStatus);
        } catch (error) {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: error.message || 'Что-то пошло не так :(' });
        }
    };

    useEffect(() => {
        getGroupsData(authToken);
    }, []);

    useEffect(() => {
        let timeout;
        if (alertState.isVisible) {
            timeout = setTimeout(() => { setAlertState(initAlertState); }, 1500);
        }
    }, [alertState]);

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

                {dataFetchingStatus.isLoading &&
                    <div className={styles.page__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                }

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

            {alertState.isVisible &&
              <div className={styles.page__successAlert}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6.4" fill="#00B69B" fillOpacity="0.1" />
                    <path d="M14.1999 19.1063L23.1548 10.1333L24.5333 11.5135L14.1999 21.8666L8 15.6549L9.37753 14.2748L14.1999 19.1063Z" fill="#00B69B" />
                </svg>
                {alertState.message}
              </div>
            }
        </main>
    );
};

export default ProductGroupsPage;
