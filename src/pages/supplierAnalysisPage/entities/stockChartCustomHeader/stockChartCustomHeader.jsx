import styles from './stockChartCustomHeader.module.css';
import { ConfigProvider, Segmented } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';
import { selectStockChartTab } from '../../../../redux/supplierAnalysis/supplierAnalysisSelectors';
import { useCallback, memo, useEffect, useState } from 'react';

const tabs = [
    'Входящие заказы',
    'Заказанные товары',
    'Средние цены',
    'Средние скидки',
    'Товарные остатки',
];

const theme = {
    token: {
        fontSize: '14px'
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

const StockChartCustomHeader = memo(() => {
    const dispatch = useAppDispatch();
    const stockChartTab = useAppSelector(selectStockChartTab);
    const [tabsState, setTabsState] = useState(null) 

    useEffect(() => {
        if (!tabsState && stockChartTab) {
            setTabsState(stockChartTab)
        }
    }, [stockChartTab, tabsState])

    useEffect(() => {
        // dispatch(supplierAnalysisActions.setStockChartTab(value))
        const timeout = setTimeout(() => {dispatch(supplierAnalysisActions.setStockChartTab(tabsState));}, 300)
        return () => {
            clearTimeout(timeout)
        }
    }, [tabsState])

    return tabsState && (
        <div className={styles.header}>
            <p className={styles.header__title}>Сравнение с другими поставщиками</p>
            <ConfigProvider theme={theme}>
                <Segmented
                    size='large'
                    options={tabs}
                    value={tabsState}
                    onChange={setTabsState}
                />
            </ConfigProvider>
        </div>
    );
});

export default StockChartCustomHeader;
