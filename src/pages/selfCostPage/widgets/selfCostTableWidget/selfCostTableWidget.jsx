import React, { useEffect, useRef, useState, useContext } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import styles from './selfCostTableWidget.module.css'
import { tableConfig } from '../../shared'
import { TableRow } from '../../features'
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal'
import { URL } from '../../../../service/config'
import AuthContext from '../../../../service/AuthContext'

const mockData = [
    { product: '1', self_cost: 0, fullfillment: 0, history: [{ date: '2024-04-18', self_cost: 20, fullfillment: 25 }, { date: '2024-08-18', self_cost: 30, fullfillment: 35 }, { date: '2024-11-18', self_cost: 25, fullfillment: 20 }] },
    { product: '2', self_cost: 100, fullfillment: 100, history: [{ date: '2024-04-18', self_cost: 40, fullfillment: 50 }, { date: '2024-08-18', self_cost: 75, fullfillment: 60 }, { date: '2024-11-18', self_cost: 50, fullfillment: 50 }] }
]

const initDataStatus = {
    isError: false,
    isLoading: false,
    message: ''
}

/**
 *  {
                "product": 10559,
                "user": 5,
                "shop": 88,
                "cost": 100.0,
                "fulfillment": null,
                "id": 462,
                "date": "2025-02-20",
                "vendor_code": "027 треугольник большой золото",
                "photo": "https://basket-15.wbbasket.ru/vol2209/part220957/220957446/images/c246x328/1.webp",
                "self_cost_change_history": []
    },
 */

const SelfCostTableWidget = () => {

    const [tableData, setTableData] = useState() // данные для рендера таблицы
    const [dataStatus, setDataStatus] = useState(initDataStatus)
    const { authToken } = useContext(AuthContext)
    const { activeBrand } = useAppSelector(store => store.filters)

    const getTableData = async (authToken, shopId) => {
        setDataStatus({ ...initDataStatus, isLoading: true })
        const queryString = `shop=${shopId}`
        const res = await fetch(`${URL}/api/product/self-costs?${queryString}`, {
            headers: {
                'content-type': 'application/json',
                'authorization': 'JWT ' + authToken
            }
        })

        if (!res.ok) {
            const parsedData = await res.json()
            setDataStatus({ ...initDataStatus, isError: true, message: parsedData.detail || 'Что-то пошло не так :(' })
            return;
        }

        const parsedData = await res.json();
        const { items } = parsedData.data
        setDataStatus({ ...initDataStatus, isLoading: false })
        //setTableData(mockData)
        setTableData([...items])
    }

    //задаем начальную дату
    useEffect(() => {
        setTableData(mockData)
        if (activeBrand && authToken) {
            getTableData(authToken, activeBrand.id)
        }

    }, [activeBrand])


    if (dataStatus.isLoading) {
        return (
            <div className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }



    return (
        <div className={styles.widget}>

            <div className={`${styles.table} ${styles.table_leftMargin} ${styles.table_rightMargin}`}>

                {/* Хэдер */}
                <div className={styles.table__header}>
                    {/* Мапим массив значений заголовков */}
                    <div className={styles.table__headerContainer}>
                        {tableConfig.values.map((v, id) => {

                            // определяем необходимые стили
                            const headerCellStyle = v.ruName === 'Продукт' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : styles.table__headerItem
                            return (
                                <>
                                    {/* Рендерим айтем заголовка таблицы с кнопками сортировки (если они нужны) */}
                                    <div className={headerCellStyle} key={id}>
                                        <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>

                {/* Тело таблицы */}
                <div className={styles.table__body}>
                    {/* Мапим данные о товарах */}
                    {tableData && tableData.length > 0 && activeBrand && tableData?.map((product, id) => {
                        return (
                            <TableRow
                                key={id}
                                currentProduct={product}
                                getTableData={getTableData}
                                authToken={authToken}
                                setDataStatus={setDataStatus}
                                initDataStatus={initDataStatus}
                                shopId={activeBrand?.id}
                            />
                        )
                    })}
                    {tableData && tableData.length === 0 &&
                        <div className={styles.table__row}>
                            <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`}>
                                Ничего не найдено
                            </div>
                        </div>
                    }
                </div>
            </div>



            <ErrorModal
                footer={null}
                open={dataStatus.isError}
                message={dataStatus.message}
                onOk={() => setDataStatus(initDataStatus)}
                onClose={() => setDataStatus(initDataStatus)}
                onCancel={() => setDataStatus(initDataStatus)}
            />
        </div>
    )
}

export default SelfCostTableWidget;
