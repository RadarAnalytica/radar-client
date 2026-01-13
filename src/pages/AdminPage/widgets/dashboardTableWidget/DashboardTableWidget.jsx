import { useState, useContext, useEffect } from "react";
import { Table } from "antd";
import ErrorModal from "@/components/sharedComponents/modals/errorModal/errorModal";
import AuthContext from "@/service/AuthContext";
import { URL } from "@/service/config";
import { Link } from "react-router-dom";
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { useAppDispatch } from '@/redux/hooks';
import SuccessModal from "@/components/sharedComponents/modals/successModal/successModal";
import { jwtDecode } from "jwt-decode";

const initReqStatus = {
    isLoading: false,
    isError: false,
    message: ''
};


const fetchUsersData = async (token, tableData, setTableData, setStatus, paginationState, setPaginationState) => {

    !tableData && setStatus({ ...initReqStatus, isLoading: false });
    try {
        let res = await fetch(`${URL}/api/admin/referral-system/users?page=${paginationState.current}&per_page=${paginationState.pageSize}`, {
            headers: {
                'content-type': 'application/json',
                'authorization': 'JWT ' + token
            }
        });

        if (!res.ok) {
            setStatus({ ...initReqStatus, isError: true, message: 'Не удалось получить список пользователей' });
            return;
        }

        res = await res.json();
        setTableData(res.data);
        setPaginationState({ ...paginationState, total: res.total });
        setStatus(initReqStatus);


    } catch {
        setStatus({ ...initReqStatus, isError: true, message: 'Не удалось получить список пользователей' });
    }
};

export const DashboardTableWidget = () => {
    const { adminToken, setAuthToken, setAdminToken, impersonateUser, setImpersonateUser } = useContext(AuthContext);
    const [reqStatus, setReqStatus] = useState(initReqStatus);
    const [paginationState, setPaginationState] = useState({ current: 1, pageSize: 25, total: 25 });
    const [tableData, setTableData] = useState();
    const dispatch = useAppDispatch()

    const getFiltersData = async (token) => {
        if (!status.isLoading) {
            setReqStatus({ ...initReqStatus, isLoading: true })
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
                setReqStatus({ ...initReqStatus, isError: true });
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
            setReqStatus({ ...initReqStatus });
        } catch (error) {
            console.error("FiltersProvider: Error fetching initial data:", error);
            setReqStatus({ ...initReqStatus, isError: true });
        }
    };

    const getImpersonateUser = async (id) => {
        setReqStatus({ ...initReqStatus, isLoading: true })
        try {
            let res = await fetch(`${URL}/api/admin/get_impersonate_user?user_id=${id}`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + adminToken
                }
            })

            if (!res?.ok) {
                res = await res.json()
                setReqStatus({ ...initReqStatus, isError: true, message: res?.detail ?? 'Не удалось зайти за пользователя' });
                return;
            }

            res = await res.json();
            const user = jwtDecode(res);
            setReqStatus({ ...initReqStatus, isSuccess: true, message: `Вы успешно зашли за пользователя с id ${id}` });
            setImpersonateUser(user)
            setAuthToken(res)
            getFiltersData(res)
        } catch (e) {
            setReqStatus({ ...initReqStatus, isError: true, message: e ?? 'Не удалось зайти за пользователя' })
            console.error(e)
        }
    }

    const impersonateLogout = async () => {
        setReqStatus({ ...initReqStatus, isLoading: true })
        setAuthToken(adminToken)
        getFiltersData(adminToken)
        setImpersonateUser(null)
    }

    const TABLE_CONFIG = [
        { title: 'ID', dataIndex: 'id', width: 10 },
        { title: 'email', dataIndex: 'email', width: 100 },
        { title: 'firstname', dataIndex: 'firstname', width: 100 },
        { title: 'lastname', dataIndex: 'lastname', width: 100 },
        { title: 'role', dataIndex: 'role', width: 30 },
        { title: 'subscription_status', dataIndex: 'subscription_status', width: 30 },
        { title: 'referral_bonus_balance', dataIndex: 'referral_bonus_balance', width: 30 },
        {
            title: 'actions', dataIndex: 'actions', width: 100, render: (value, item) => {

                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        }}
                    >
                        {(!impersonateUser || impersonateUser?.id !== item.id) &&
                            <button
                                onClick={() => { getImpersonateUser(item.id) }}
                                style={{
                                    height: 32,
                                    borderRadius: 8,
                                    padding: '0 12px',
                                    border: 'none',
                                    background: '#5329FF0D',
                                    color: '#5329FF',
                                    fontWeight: 600
                                }}
                            >
                                Войти
                            </button>
                        }
                        {impersonateUser && impersonateUser?.id === item.id &&
                            <button
                                onClick={() => { impersonateLogout() }}
                                style={{
                                    height: 32,
                                    borderRadius: 8,
                                    padding: '0 12px',
                                    border: 'none',
                                    background: '#F93C651A',
                                    color: '#F93C65',
                                    fontWeight: 600
                                }}
                            >
                                Выйти
                            </button>
                        }
                        <Link
                            to='/admin/referal'
                            state={{ id: item.id }}
                            style={{
                                color: 'white',
                                backgroundColor: '#5329ff',
                                padding: '5px 10px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: 700,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Начислить бонусы
                        </Link>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        fetchUsersData(adminToken, tableData, setTableData, setReqStatus, paginationState, setPaginationState);
    }, [paginationState.current]);

    return (
        <div>
            {tableData &&
                <Table
                    columns={TABLE_CONFIG}
                    dataSource={tableData}
                    pagination={{
                        ...paginationState,
                        hideOnSinglePage: true,
                        showQuickJumper: true,
                        onChange: (page) => setPaginationState({ ...paginationState, current: page })
                    }}
                />
            }

            {/* modals */}
            <ErrorModal
                open={reqStatus.isError}
                message={reqStatus.message}
                onOk={() => setReqStatus(initReqStatus)}
                onClose={() => setReqStatus(initReqStatus)}
                onCancel={() => setReqStatus(initReqStatus)}
            />
            <SuccessModal
                open={reqStatus.isSuccess}
                footer={null}
                onOk={() => setReqStatus(initReqStatus)}
                onClose={() => setReqStatus(initReqStatus)}
                onCancel={() => setReqStatus(initReqStatus)}
                message={reqStatus.message}
            />
        </div>
    );
};




/**
 * {
  "data": [
    {
      "id": 0,
      "email": "user@example.com",
      "phone": "string",
      "firstname": "string",
      "lastname": "string",
      "patronym": "string",
      "password": "string",
      "stage": "Хочу продавать на маркетплейсах",
      "role": "admin",
      "is_active": true,
      "is_confirmed": true,
      "is_onboarded": true,
      "promo_code": "string",
      "confirmation_code": "string",
      "is_test_used": "string",
      "subscription_status": "string",
      "subscription_start_date": "2025-07-28T08:18:46.967Z",
      "subscription_end_date": "2025-07-28T08:18:46.967Z",
      "referral_link": "string",
      "referral_partner_link": "string",
      "referral_partner_id": 0,
      "referral_bonus_balance": 0,
      "description_generations": 5,
      "is_report_downloaded": false
    }
  ],
  "page": 0,
  "per_page": 0,
  "total": 0
}
 */
