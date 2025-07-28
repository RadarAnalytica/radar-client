import { useState, useContext, useEffect } from "react"
import { Table } from "antd"
import ErrorModal from "../../../../components/sharedComponents/modals/errorModal/errorModal"
import AuthContext from "../../../../service/AuthContext"
import { URL } from "../../../../service/config"
import { Link } from "react-router-dom"

const initReqStatus = {
    isLoading: false,
    isError: false,
    message: ''
}


const fetchUsersData = async (token, tableData, setTableData, setStatus, paginationState, setPaginationState) => {

    !tableData && setStatus({ ...initReqStatus, isLoading: false })
    try {
        let res = await fetch(`${URL}/api/admin/referral-system/users?page=${paginationState.current}&per_page=${paginationState.pageSize}`, {
            headers: {
                'content-type': 'application/json',
                'authorization': 'JWT ' + token
            }
        })

        if (!res.ok) {
            setStatus({ ...initReqStatus, isError: true, message: 'Не удалось получить список пользователей' })
            return;
        }

        res = await res.json()
        setTableData(res.data)
        setPaginationState({...paginationState, total: res.total})
        setStatus(initReqStatus)


    } catch {
        setStatus({ ...initReqStatus, isError: true, message: 'Не удалось получить список пользователей' })
    }
}

export const DashboardTableWidget = () => {
    const { authToken } = useContext(AuthContext)
    const [reqStatus, setReqStatus] = useState(initReqStatus)
    const [paginationState, setPaginationState] = useState({current: 1, pageSize: 25, total: 25 })
    const [tableData, setTableData] = useState()

    useEffect(() => {
        fetchUsersData(authToken, tableData, setTableData, setReqStatus, paginationState, setPaginationState)
    }, [paginationState.current])

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
                        onChange: (page) => setPaginationState({...paginationState, current: page})
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
        </div>
    )
}



const TABLE_CONFIG = [
    { title: 'ID', dataIndex: 'id', width: 10 },
    { title: 'email', dataIndex: 'email', width: 100 },
    { title: 'firstname', dataIndex: 'firstname', width: 100 },
    { title: 'lastname', dataIndex: 'lastname', width: 100 },
    { title: 'role', dataIndex: 'role', width: 30 },
    { title: 'subscription_status', dataIndex: 'subscription_status', width: 30 },
    { title: 'referral_bonus_balance', dataIndex: 'referral_bonus_balance', width: 30 },
    { title: 'actions', dataIndex: 'actions', width: 100, render: (value, item) => {

        return (
            <Link
                to='/admin-referal'
                state={{id: item.id}}
                style={{
                    color: 'white',
                    backgroundColor: '#5329ff',
                    padding: '5px 10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 700
                }}
            >
                Начислить бонусы
            </Link>
        )
    }}
]

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