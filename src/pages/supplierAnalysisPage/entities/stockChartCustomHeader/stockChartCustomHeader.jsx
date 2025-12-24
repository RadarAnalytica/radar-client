import styles from './stockChartCustomHeader.module.css';
import { ConfigProvider, Segmented } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';
import { selectStockChartTab } from '../../../../redux/supplierAnalysis/supplierAnalysisSelectors';
import { useCallback, memo } from 'react';

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

    const handleTabChange = useCallback((value) => {
        dispatch(supplierAnalysisActions.setStockChartTab(value));
    }, [dispatch]);

    return (
        <div className={styles.header}>
            <p className={styles.header__title}>Сравнение с другими поставщиками</p>
            <ConfigProvider theme={theme}>
                <Segmented
                    size='large'
                    options={tabs}
                    value={stockChartTab}
                    onChange={handleTabChange}
                />
            </ConfigProvider>
        </div>
    );
});

export default StockChartCustomHeader;
