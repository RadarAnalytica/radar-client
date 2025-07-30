import styles from './stockChartCustomHeader.module.css'
import { ConfigProvider, Segmented } from 'antd'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice'

const tabs = [
    'Входящие заказы',
    'Заказанные товары',
    'Средние цены',
    'Средние скидки',
    'Товарные остатки',
]

const StockChartCustomHeader = () => {

    const dispatch = useAppDispatch();
    const stockChartTab = useAppSelector(store => store.supplierAnalysis.stockChartTab)

    return (
        <div className={styles.header}>
            <p className={styles.header__title}>Сравнение с другими поставщиками</p>
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
                    value={stockChartTab}
                    onChange={(value) => dispatch(supplierAnalysisActions.setStockChartTab(value))}
                />
            </ConfigProvider>
        </div>
    )
}

export default StockChartCustomHeader