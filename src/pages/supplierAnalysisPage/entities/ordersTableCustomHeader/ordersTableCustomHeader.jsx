import styles from './ordersTableCustomHeader.module.css'
import { ConfigProvider, Segmented } from 'antd'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice'

const tabs = [
    // 'По группам цветов',
    'По складам (последние 30 дней)',
    'По размерам'
]

const OrdersTableCustomHeader = () => {

    const dispatch = useAppDispatch();
    const ordersStructureTab = useAppSelector(store => store.supplierAnalysis.ordersStructureTab)

    return (
        <div className={styles.header}>
            <p className={styles.header__title}>Структура заказов по другим параметрам</p>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: '18px'
                    },
                    components: {
                        Segmented: {
                            itemActiveBg: '#E7E1FE',
                            itemSelectedBg: '#E7E1FE',
                            trackBg: 'transparent',
                            itemColor: '#1A1A1A80',
                            itemHoverBg: 'transparent',
                            itemHoverColor: '#1A1A1A',
                            itemSelectedColor: '#1A1A1A',
                            trackPadding: 0
                        }
                    }
                }}
            >
                <Segmented
                    size='large'
                    options={tabs}
                    value={ordersStructureTab}
                    onChange={(value) => dispatch(supplierAnalysisActions.setOrdersStructureTab(value))}
                />
            </ConfigProvider>
        </div>
    )
}

export default OrdersTableCustomHeader