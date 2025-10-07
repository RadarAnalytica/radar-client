import { useEffect, useContext, useState } from 'react';
import styles from './linkedShops.module.css';
import Header from '../../components/sharedComponents/header/header';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import { AddShopWidget, ShopCardWidget } from './widgets';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchShops } from '../../redux/shops/shopsActions';
import AuthContext from '../../service/AuthContext';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';

const LinkedShopsPage = () => {
    const { isDemoMode } = useDemoMode();
    const { authToken } = useContext(AuthContext);
    const [statusBarState, setStatusBarState] = useState({
        type: '',
        message: '',
        isActive: false
    });
    const dispatch = useAppDispatch();
    const shops = useAppSelector((state) => state.shopsSlice.shops);

    useEffect(() => {
        (!shops || shops.length === 0) && dispatch(fetchShops(authToken));
    }, []);

    useEffect(() => {
        let timeout;
        if (statusBarState.isActive) {
            timeout = setTimeout(() => {
                setStatusBarState({
                    type: '',
                    message: '',
                    isActive: false
                });
            }, 2000);
        }

        return () => {
            timeout && clearTimeout(timeout);
        };
    }, [statusBarState]);

    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header title='Подключенные магазины' />
                </div>

                {isDemoMode && <NoSubscriptionWarningBlock />}

                <div className={styles.page__layout}>
                    {shops && shops.length > 0 && [...shops].sort((a, b) => a.id - b.id).map(shop => (
                        <ShopCardWidget key={shop.id} shop={shop} authToken={authToken} setStatusBarState={setStatusBarState} />
                    ))}
                    <AddShopWidget authToken={authToken} setStatusBarState={setStatusBarState} />
                </div>
            </section>

            {statusBarState.isActive &&
                <div className={styles.page__statusBar}>
                    {statusBarState.type === 'Success' &&
                        <div className={styles.page__iconWrapper}>
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                <rect width="60" height="60" rx="12" fill="#00B69B" fillOpacity="0.1" />
                                <path d="M26.6248 35.8244L43.4153 19L46 21.5878L26.6248 41L15 29.353L17.5829 26.7652L26.6248 35.8244Z" fill="#00B69B" />
                            </svg>
                        </div>
                    }
                    {statusBarState.type === 'Error' &&
                        <div className={styles.page__iconWrapper}>
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                <rect width="60" height="60" rx="12" fill="#F93C65" fillOpacity="0.1" />
                                <path d="M28.5828 35.5887L27 18H33.25L31.6672 35.5887H28.5828ZM27.2841 43V38.0709H32.9659V43H27.2841Z" fill="#F93C65" />
                            </svg>
                        </div>
                    }
                    {statusBarState.message}
                </div>
            }
        </main>
    );
};

export default LinkedShopsPage;
