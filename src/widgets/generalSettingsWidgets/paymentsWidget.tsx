import React, { useRef } from 'react';
import styles from './paymentsWidget.module.css';
import { Table as RadarTable } from 'radar-ui'

const tableConfig = [
    {
        key: 'date',
        dataIndex: 'date',
        title: 'Дата'
    },
    {
        key: 'paymentType',
        dataIndex: 'paymentType',
        title: 'Тип платежа'
    },
    {
        key: 'period',
        dataIndex: 'period',
        title: 'Длительность'
    },
    {
        key: 'amount',
        dataIndex: 'amount',
        title: 'Сумма',
        units: '₽'
    },
]

export const PaymentWidget = () => {

    const tableContainerRef = useRef(null)

    return (
        <div className={styles.widget__tableBlock}>
            <div className={styles.widget__tableWrapper} ref={tableContainerRef}>
                <RadarTable
                    config={tableConfig}
                    dataSource={[]}
                    scrollContainerRef={tableContainerRef}
                    preset='radar-table-default'
                    style={{ width: '100%', tableLayout: 'fixed' }}
                    paginationContainerStyle={{
                        display: 'none'
                    }}
                />
            </div>
        </div>
    )
}
