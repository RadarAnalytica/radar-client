import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import SelfCostWarningBlock from '@/components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import AuthContext from '@/service/AuthContext';
import { SearchWidget, TableWidget } from './widgets';
import { ServiceFunctions } from '@/service/serviceFunctions';
import styles from './stockAnalysisPage.module.css';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from '@/app/providers';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import { CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER } from './shared';
import { newTableConfig } from './shared/configs/newTableConfig';
import TableSettingsModal, { mapConfigToSettingsItems, mapSettingsToConfig } from '@/components/TableSettingsModal';
import TableSettingsButton from '@/components/TableSettingsButton';

const STORAGE_KEY = 'STOCK_ANALYSIS_TABLE_CONFIG';

const StockAnalysisPage = () => {
    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { activeBrand, activeBrandName, activeArticle, activeGroup, selectedRange, isFiltersLoaded } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const [stockAnalysisData, setStockAnalysisData] = useState([]); // это базовые данные для таблицы
    const [stockAnalysisFilteredData, setStockAnalysisFilteredData] = useState(); // это данные для таблицы c учетом поиска
    const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false);
    const [loading, setLoading] = useState(true);
    const progress = useLoadingProgress({ loading });
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [tableConfig, setTableConfig] = useState(newTableConfig);

    // Load saved config from localStorage
    useEffect(() => {
        const savedConfigData = localStorage.getItem(STORAGE_KEY);
        if (savedConfigData) {
            try {
                const parsed = JSON.parse(savedConfigData);
                if (parsed.version === CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER) {
                    setTableConfig(parsed.config);
                }
            } catch (error) {
                console.error('Error parsing saved table config:', error);
            }
        }
    }, []);

    // Prepare columns for settings modal (with id for each item)
    const columnsForSettings = useMemo(() => {
        return mapConfigToSettingsItems(tableConfig);
    }, [tableConfig]);

    const originalColumnsForSettings = useMemo(() => {
        return mapConfigToSettingsItems(newTableConfig);
    }, []);

    const handleSettingsSave = (updatedColumns) => {
        const newConfig = mapSettingsToConfig(updatedColumns);
        setTableConfig(newConfig);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            version: CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER,
            config: newConfig
        }));
    };

    const fetchAnalysisData = async () => {
        setLoading(true);
        setStockAnalysisData([]);
        setStockAnalysisFilteredData([]);
        progress.start();
        try {
            const data = await ServiceFunctions.getAnalysisData(
                authToken,
                selectedRange,
                activeBrand?.id,
                filters
            );

            progress.complete();
            await setTimeout(() => {
                setStockAnalysisData(data);
                setStockAnalysisFilteredData(data);
                setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null));
                setLoading(false);
                progress.reset();
            }, 500);
        } catch (error) {
            setLoading(false);
            progress.reset();
            console.error(error);
        }
    };

    useEffect(() => {
        if (activeBrand && activeBrand.is_primary_collect && isFiltersLoaded) {
            fetchAnalysisData();
        }
    }, [isFiltersLoaded, activeBrand, selectedRange, activeBrandName, activeArticle, activeGroup]);


    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            
            <section className={styles.page__content}>
                <div className={styles.page__staticContentWrapper}>
                    <div className={styles.page__headerWrapper}>
                        <Header title='Аналитика по товарам' />
                    </div>

                    {!loading && activeBrand?.is_primary_collect && !activeBrand?.is_self_cost_set &&
                        <SelfCostWarningBlock
                            shopId={activeBrand.id}
                            onUpdateDashboard={fetchAnalysisData}
                        />
                    }

                    {isDemoMode && <NoSubscriptionWarningBlock />}

                    <div>
                        <Filters
                            setLoading={setLoading}
                            isDataLoading={loading}
                            hasShopCreationLimit
                        />
                    </div>

                    {!loading && !activeBrand?.is_primary_collect &&
                        <DataCollectWarningBlock
                            title='Ваши данные еще формируются и обрабатываются.'
                        />
                    }

                    {activeBrand?.is_primary_collect &&
                        <div className={styles.controlsRow}>
                            <SearchWidget
                                stockAnalysisData={stockAnalysisData}
                                setStockAnalysisFilteredData={setStockAnalysisFilteredData}
                                filters={filters}
                            />
                            <TableSettingsButton
                                onClick={() => setIsSettingsOpen(true)}
                                disabled={loading}
                            />
                        </div>
                    }
                </div>

                {(loading || activeBrand?.is_primary_collect) &&
                    <TableWidget
                        stockAnalysisFilteredData={stockAnalysisFilteredData}
                        loading={loading}
                        progress={progress.value}
                        configVersion={CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER}
                        configKey={STORAGE_KEY}
                        config={tableConfig}
                        setTableConfig={setTableConfig}
                    />
                }
            </section>

            <TableSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                title="Настройки таблицы"
                items={columnsForSettings}
                onSave={handleSettingsSave}
                originalItems={originalColumnsForSettings}
                idKey="id"
                titleKey="title"
                childrenKey="children"
            />
        </main>
    );
};

export default StockAnalysisPage;
