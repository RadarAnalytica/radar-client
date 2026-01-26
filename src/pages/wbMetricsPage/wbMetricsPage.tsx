import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '@/service/AuthContext';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { useAppSelector } from '@/redux/hooks';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';
// import DownloadButton from '@/components/DownloadButton';
import WbMetricsTable from './widgets/WbMetricsTable/WbMetricsTable';
import TableSettingsModal, { TableSettingsItem } from '@/components/TableSettingsModal';
import TableSettingsButton from '@/components/TableSettingsButton';
import NoData from '@/components/sharedComponents/NoData/NoData';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { 
  getDefaultTableConfig, 
  loadTableConfig, 
  saveTableConfig, 
  mergeTableConfig,
  type ColumnConfig 
} from './config/tableConfig';
import styles from './wbMetricsPage.module.css';


const WbMetricsPage: React.FC = () => {
  const location = useLocation();
  const metricType = location.pathname.includes('/drr') ? 'drr' : 'spp';
  const { authToken } = useContext(AuthContext);
  const { isDemoMode } = useDemoMode();
  const filters = useAppSelector((state) => state.filters);
  const { activeBrand, activeBrandName, activeArticle, activeGroup, isFiltersLoaded } = useAppSelector((state) => state.filters);;
  
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<ColumnConfig[]>([]);
  const [sortState, setSortState] = useState({ sort_field: undefined, sort_order: undefined });
  const [data, setData] = useState(null);
  const [pageData, setPageData] = useState({ page: 1, per_page: 25, total_count: 0 });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const progress = useLoadingProgress({ loading });
  const pageTitle = metricType === 'drr' ? 'Контроль ДРР' : 'Контроль СПП';

  const loadData = async (filters, authToken) => {
    setLoading(true);
    progress.start();
    
    try {
      const response = await ServiceFunctions.getControlMetrics(authToken, metricType, filters, pageData.page, pageData.per_page, sortState);
      setPageData({ page: response.page, per_page: response.per_page, total_count: response.total_count });
      progress.complete();
      await setTimeout(() => {
        setData(response);
        setLoading(false);
        progress.reset();
      }, 500);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
      progress.reset();
    }
  };

  useEffect(() => {
    if (activeBrand) {
      if (activeBrand?.is_primary_collect) {
        loadData(filters, authToken);
      } else {
        setLoading(false);
      }
    }
  }, [pageData.page, isFiltersLoaded, metricType, sortState, activeBrand, activeBrandName, activeArticle, activeGroup]);

  // Инициализация конфигурации таблицы при загрузке данных
  useEffect(() => {
    if (data?.data[0]?.control_data) {
      const defaultConfig = getDefaultTableConfig(data.data[0].control_data);
      const savedConfig = loadTableConfig(metricType);
      const mergedConfig = mergeTableConfig(defaultConfig, savedConfig);
      setTableConfig(mergedConfig);
    }
  }, [data, metricType]);

  // Prepare columns for settings modal (only toggleable columns)
  const columnsForSettings = useMemo(() => {
    return tableConfig
      .filter(col => col.customizable)
      .map((col) => ({
        ...col,
        id: col.key || col.dataIndex,
        title: col.title,
        isVisible: !col.hidden,
      }));
  }, [tableConfig]);

  // Original columns for "Reset to default" button
  const originalColumnsForSettings = useMemo(() => {
    if (!data?.data[0]?.control_data) return [];
    const defaultConfig = getDefaultTableConfig(data.data[0].control_data);
    return defaultConfig
      .filter(col => col.customizable)
      .map((col) => ({
        ...col,
        id: col.key || col.dataIndex,
        title: col.title,
        isVisible: !col.hidden,
      }));
  }, [data]);

  // Handle settings save
  const handleSettingsSave = useCallback((updatedColumns: TableSettingsItem[]) => {
    const allColumnsMap = new Map(tableConfig.map(col => [col.key || col.dataIndex, col]));
    const reorderedToggleable = updatedColumns.map(updatedCol => {
      const originalCol = allColumnsMap.get(updatedCol.id);
      return originalCol ? { ...originalCol, hidden: !updatedCol.isVisible } : null;
    }).filter((col): col is ColumnConfig => col !== null);
    
    const toggleableQueue = [...reorderedToggleable];
    const newConfig = tableConfig.map((col) => {
      if (!col.customizable) {
        return col;
      }

      const nextToggleable = toggleableQueue.shift();
      return nextToggleable ?? col;
    });
    
    setTableConfig(newConfig);
    saveTableConfig(newConfig, metricType);
  }, [tableConfig, metricType]);
  

  return (
    <main className={styles.page}>
      <MobilePlug />

      <section className={styles.page__sideNavWrapper}>
        <Sidebar />
      </section>

      <section className={styles.page__content}>
        <div className={styles.page__headerWrapper}>
          <Header 
            title={pageTitle}
            titlePrefix=""
            children=""
            videoReviewLink=""
            howToLink={null}
            howToLinkText="Как использовать?"
          />
        </div>

        {isDemoMode && <NoSubscriptionWarningBlock />}

        <div className={styles.page__controlsWrapper}>
            <Filters
                timeSelect={false}
                isDataLoading={loading}
                tempPageCondition={true}
                maxCustomDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
            />

            <div className={styles.page__controlsButtonsWrapper}>
                <TableSettingsButton
                    onClick={() => setIsSettingsOpen(true)}
                    disabled={loading}
                />
            </div>
        </div>

        {activeBrand && !activeBrand?.is_primary_collect && 
          <DataCollectWarningBlock />
        }

        {loading && (
          <div className={styles.loader__container}>
            <Loader loading={loading} progress={progress.value} />
          </div>
        )}

        {!loading && activeBrand && activeBrand?.is_primary_collect && (data?.data?.length > 0
          ? <WbMetricsTable
              data={data}
              columns={tableConfig}
              loading={loading}
              metricType={metricType}
              pageData={pageData}
              setPageData={setPageData}
              sortState={sortState}
              setSortState={setSortState}
          />
          : <NoData />
        )}
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
        visibleKey="isVisible"
        invertVisibility={false}
      />
    </main>
  );
};

export default WbMetricsPage;
