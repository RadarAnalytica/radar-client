import styles from './stockChartCustomHeader.module.css';
import { ConfigProvider, Segmented } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';
import { selectStockChartTab } from '../../../../redux/supplierAnalysis/supplierAnalysisSelectors';
import { useCallback, memo, useEffect, useState } from 'react';
import { selectSupplierAnalysisDataByType } from '@/redux/supplierAnalysis/supplierAnalysisSelectors';

const tabs = [
    'Входящие заказы',
    'Заказанные товары',
    'Средние цены',
    'Средние скидки',
    'Товарные остатки',
];

const theme = {
    token: {
        fontSize: '14px',
        motionDurationSlow: '0.15s'
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
};

const StockChartCustomHeader = memo(({stockChartTab}) => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(state => selectSupplierAnalysisDataByType(state, 'bySizesTableData'));
    const [tabsState, setTabsState] = useState(null) 

    useEffect(() => {
        if (!tabsState && stockChartTab) {
            setTabsState(stockChartTab)
        }
    }, [stockChartTab, tabsState])

    return (
        <div className={styles.header}>
            <p className={styles.header__title}>Сравнение с другими поставщиками</p>
            <ConfigProvider theme={theme}>
                <Segmented
                    size='large'
                    options={tabs}
                    value={tabsState}
                    onChange={(value) => {
                        setTabsState(value)
                        dispatch(supplierAnalysisActions.setStockChartTab(value))
                    }}
                    disabled={isLoading}
                />
            </ConfigProvider>
        </div>
    );
});

export default StockChartCustomHeader;
