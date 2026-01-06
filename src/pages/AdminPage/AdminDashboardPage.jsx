import React, { useEffect, useState, useContext } from 'react';
import styles from './AdminDashboardPage.module.css';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';
import Header from '../../components/sharedComponents/header/header';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import { URL } from '../../service/config';
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';
import SuccessModal from '@/components/sharedComponents/modals/successModal/successModal';
import { Bar } from './features';
import { DashboardTableWidget } from './widgets';
import moment from 'moment';
import { GeneralLayout } from '@/shared';
import { Input, ConfigProvider, Button } from 'antd'
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { useAppDispatch } from '@/redux/hooks';


const initStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};


const fetchStatistics = async (token, setStatus, initStatus, setData) => {
    setStatus({ ...initStatus, isLoading: true });
    try {
        let res = await fetch(`${URL}/api/admin/service-analysis/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + token
            }
        });

        if (!res.ok) {
            setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' });
            return;
        }

        res = await res.json();
        setStatus({ ...initStatus });
        setData(res.data);
    } catch {
        setStatus({ ...initStatus, isError: true, message: 'Не удалось получить данные' });
    }
};

/**
 *
 * {
    "data": {
        "date": "2025-07-09",
        "total_registered_accounts": 39,
        "trial_accounts": 1,
        "active_paid_subscriptions": 6,
        "subscription_renewals": {
            "renewals_count": 0,
            "renewals_percentage": 0.0
        },
        "inactive_accounts": 56
    },
    "message": "Success"
}
 */

const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Manrope',
        fontSize: 14,
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

const modalPrimaryButtonTheme = {
    token: {
        colorPrimary: '#5329FF',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'Manrope',
        controlHeight: 38,
        borderRadius: 8,
    },
    components: {
        Button: {
            paddingInline: 12,
            paddingBlock: 10,
            colorPrimaryHover: '#6942FF',
            colorPrimaryActive: '#421BCF',
            boxShadow: 'none',
        },
    },
};


const AdminDashboardPage = () => {

    const { adminToken, isImpersonateModeActive, setIsImpersonateModeActive, setAuthToken, setAdminToken } = useContext(AuthContext);
    const [status, setStatus] = useState(initStatus);
    const [dashboardData, setData] = useState();
    const [impersonateUserId, setImpersonateUserId] = useState(null)
    const dispatch = useAppDispatch()

    const getFiltersData = async (token) => {
        if (!status.isLoading) {
            setStatus({ ...initStatus, isLoading: true })
        }
        try {
          let shopsResponse = await fetch(`${URL}/api/shop/all`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              authorization: 'JWT ' + token,
            }
          });
          if (!shopsResponse?.ok) {
            setStatus({ ...initStatus, isError: true});
            return;
          }
          let shopsData = null;
          shopsData = await shopsResponse.json();
  
          // @ts-ignore
          await dispatch(fetchFilters({
            authToken: token,
            shopsData
            //shopsData: null
          }));
          setStatus({ ...initStatus});
        } catch (error) {
          console.error("FiltersProvider: Error fetching initial data:", error);
          setStatus({ ...initStatus, isError: true});
        }
      };

    const getImpersonateUser = async () => {
        setStatus({ ...initStatus, isLoading: true })
        try {
            let res = await fetch(`${URL}/api/admin/get_impersonate_user?user_id=${impersonateUserId}`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + adminToken
                }
            })

            if (!res?.ok) {
                res = await res.json()
                setStatus({ ...initStatus, isError: true, message: res?.detail ?? 'Не удалось зайти за пользователя' });
                return;
            }

            res = await res.json();
            setStatus({ ...initStatus, isSuccess: true, message: `Вы успешно зашли за пользователя с id ${impersonateUserId}` });
            setImpersonateUserId(null)
            setIsImpersonateModeActive(true)
            setAuthToken(res)
            getFiltersData(res)
        } catch (e) {
            setStatus({ ...initStatus, isError: true, message: e ?? 'Не удалось зайти за пользователя' })
            console.error(e)
        }
    }

    const impersonateLogout = async () => {
        setStatus({ ...initStatus, isLoading: true })
        setIsImpersonateModeActive(false),
        setAuthToken(adminToken) 
        getFiltersData(adminToken)
    }

    useEffect(() => {
        fetchStatistics(adminToken, setStatus, initStatus, setData);
    }, []);

    return (
        <GeneralLayout
            headerProps={{
                hasShadow: false,
                title: 'Дашборд',
                titlePrefix: 'Админ панель'
            }}
        >
            <div className={styles.page__dataWrapper}>
                {dashboardData &&
                    <>
                        <Bar.Small title='Дата' data={moment(dashboardData.date).format('DD.MM.YYYY')} />
                        <Bar.Small title='Всего аккаунтов' data={dashboardData.total_registered_accounts} units='шт' />
                        <Bar.Small title='Аккаунтов с тестовым периодом' data={dashboardData.trial_accounts} units='шт' />
                        <Bar.Small title='Активных подписок' data={dashboardData.active_paid_subscriptions} units='шт' />
                        <Bar.Small title='Неактивных аккаунтов' data={dashboardData.inactive_accounts} units='шт' />
                        <Bar.Small
                            title='Возобновляемых подписок, шт'
                            data={dashboardData.subscription_renewals.renewals_count}
                            units='шт'
                        />
                        <Bar.Small
                            title='Возобновляемых подписок, %'
                            data={dashboardData.subscription_renewals.renewals_percentage}
                            units='%'
                        />
                    </>
                }
            </div>

            <div className={styles.page__userLogin}>
                <span>Войти за пользователя</span>
                {!isImpersonateModeActive &&
                    <div className={styles.page__inputWrapper}>
                        <ConfigProvider
                            theme={inputTheme}
                        >
                            <Input
                                value={impersonateUserId}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setImpersonateUserId(value);
                                }}
                                style={{ maxWidth: 275, height: 38 }}
                                placeholder='Введите id пользователя'
                            />
                        </ConfigProvider>
                        <ConfigProvider
                            theme={modalPrimaryButtonTheme}
                        >
                            <Button
                                type='primary'
                                // size='large'
                                style={{ fontWeight: 600 }}
                                loading={status.isLoading}
                                disabled={!impersonateUserId}
                                onClick={getImpersonateUser}
                            >
                                Войти
                            </Button>
                        </ConfigProvider>
                    </div>
                }
                {isImpersonateModeActive &&
                    <div className={styles.page__inputWrapper}>
                        Вы просматриваете сервис от имени другого пользователя
                        <ConfigProvider
                            theme={modalPrimaryButtonTheme}
                        >
                            <Button
                                type='primary'
                                // size='large'
                                style={{ fontWeight: 600 }}
                                loading={status.isLoading}
                                onClick={impersonateLogout}
                            >
                                Выйти
                            </Button>
                        </ConfigProvider>
                    </div>
                }
            </div>

            <div className={styles.page__dashboardTable}>
                <DashboardTableWidget />
            </div>

            {/*  modals */}
            <ErrorModal
                open={status.isError}
                footer={null}
                onOk={() => setStatus(initStatus)}
                onClose={() => setStatus(initStatus)}
                onCancel={() => setStatus(initStatus)}
                message={status?.message}
            />
            <SuccessModal
                open={status.isSuccess}
                footer={null}
                onOk={() => setStatus(initStatus)}
                onClose={() => setStatus(initStatus)}
                onCancel={() => setStatus(initStatus)}
                message={status?.message}
            />
        </GeneralLayout>
    )
};

export default AdminDashboardPage;
