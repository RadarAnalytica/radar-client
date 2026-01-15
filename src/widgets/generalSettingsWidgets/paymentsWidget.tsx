import React, { useRef, useEffect, useState, useContext } from 'react';
import styles from './paymentsWidget.module.css';
import { Table as RadarTable } from 'radar-ui'
import { ServiceFunctions } from '@/service/serviceFunctions';
import AuthContext from '@/service/AuthContext';
import { RadarLoader } from '@/shared';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';

const tableConfig = [
    {
        key: 'date',
        dataIndex: 'date',
        title: 'Дата'
    },
    {
        key: 'description',
        dataIndex: 'description',
        title: 'Тип платежа'
    },
    // {
    //     key: 'period',
    //     dataIndex: 'period',
    //     title: 'Длительность'
    // },
    {
        key: 'amount',
        dataIndex: 'amount',
        title: 'Сумма',
        units: '₽'
    },
]

const initStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const PaymentWidget = () => {
    const { authToken } = useContext(AuthContext)
    const [tableData, setTableData] = useState([])
    const [status, setStatus] = useState(initStatus)
    const tableContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const getTableData = async () => {
            setStatus({ ...initStatus, isLoading: true })
            try {
                const res = await ServiceFunctions.getUserPayments(authToken)
                if (!res.ok) {
                    setStatus({ ...initStatus, isError: true, message: 'Не удалось загрузить данные платежей' });
                    return;
                }

                const data = await res.json()
                setStatus(initStatus)
                setTableData(data)

            } catch (e) {
                setStatus({ ...initStatus, isError: true, message: 'Не удалось загрузить данные платежей' });
            }
        }

        getTableData()
    }, [])

    if (status.isLoading) {
        return (
            <div className={styles.widget__tableBlock}>
                <RadarLoader loaderStyle={{ height: 200}} />
            </div>
        )
    }

    return (
        <div className={styles.widget__tableBlock}>
            <div className={styles.widget__tableWrapper} ref={tableContainerRef}>
                <RadarTable
                    key={JSON.stringify(tableData)}
                    config={tableConfig}
                    dataSource={tableData.length > 0 ? tableData : []}
                    scrollContainerRef={tableContainerRef}
                    preset='radar-table-default'
                    style={{ width: '100%', tableLayout: 'fixed' }}
                    paginationContainerStyle={{
                        display: 'none'
                    }}
                />
            </div>

            <ErrorModal
                open={status.isError}
                onOk={() => setStatus(initStatus)}
                onClose={() => setStatus(initStatus)}
                onCancel={() => setStatus(initStatus)}
                footer={null}
                message={status.message}
            />
        </div>
    )
}
