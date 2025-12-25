import React, { useEffect, useState } from 'react';
import styles from './ordersTableCustomHeader.module.css';
import { ConfigProvider, Segmented } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';
import { selectOrdersStructureTab } from '../../../../redux/supplierAnalysis/supplierAnalysisSelectors';

const tabs = [
    // 'По группам цветов',
    'По складам (последние 30 дней)',
    'По размерам'
];

const OrdersTableCustomHeader = () => {

    const dispatch = useAppDispatch();
    const ordersStructureTab = useAppSelector(selectOrdersStructureTab);
    const [tabsState, setTabsState] = useState(null) 

    useEffect(() => {
        if (!tabsState && ordersStructureTab) {
            setTabsState(ordersStructureTab)
        }
    }, [ordersStructureTab, tabsState])

    useEffect(() => {
        const timeout = setTimeout(() => {dispatch(supplierAnalysisActions.setOrdersStructureTab(tabsState))}, 300)
        return () => {
            clearTimeout(timeout)
        }
    }, [tabsState])

    return (
        <div className={styles.header}>
            <p className={styles.header__title}>Структура заказов по другим параметрам</p>
            <ConfigProvider
                theme={{
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
                }}
            >
                <Segmented
                    size='large'
                    options={tabs}
                    value={tabsState}
                    onChange={setTabsState}
                />
            </ConfigProvider>
        </div>
    );
};

export default OrdersTableCustomHeader;
