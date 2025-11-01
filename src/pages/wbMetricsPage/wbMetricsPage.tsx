import React, { useState, useEffect, useContext, useMemo } from 'react';
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
import DownloadButton from '@/components/DownloadButton';
import WbMetricsTable from './widgets/WbMetricsTable/WbMetricsTable';
import TableSettingsWidget from './widgets/TableSettingsWidget/TableSettingsWidget';
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
  const { activeBrand, activeBrandName, activeArticle, activeGroup } = filters;
  
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<ColumnConfig[]>([]);
  const [sortState, setSortState] = useState({ sort_field: undefined, sort_order: undefined });
  const [data, setData] = useState(null);
  const [pageData, setPageData] = useState({ page: 1, per_page: 50, total_count: 0 });
  
  const progress = useLoadingProgress({ loading });
  const pageTitle = metricType === 'drr' ? 'Контроль ДРР' : 'Контроль СПП';

  const loadData = async () => {
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
        loadData();
      } else {
        setLoading(false);
      }
    }
  }, [activeBrand, pageData.page, activeBrandName, activeArticle, activeGroup, metricType, sortState]);

  // Инициализация конфигурации таблицы при загрузке данных
  useEffect(() => {
    if (data?.data[0]?.control_data) {
      const defaultConfig = getDefaultTableConfig(data.data[0].control_data);
      const savedConfig = loadTableConfig(metricType);
      const mergedConfig = mergeTableConfig(defaultConfig, savedConfig);
      setTableConfig(mergedConfig);
    }
  }, [data, metricType]);

  // Обработчик изменения конфигурации таблицы
  const handleTableConfigChange = (newConfig: ColumnConfig[]) => {
    setTableConfig(newConfig);
    saveTableConfig(newConfig, metricType);
  };

  const downloadHandler = async () => {
    // TODO: Implement Excel download
    console.log('Download Excel for', metricType);
  };

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
                <TableSettingsWidget
                    tableConfig={tableConfig}
                    setTableConfig={handleTableConfigChange}
                />
                {/* <DownloadButton
                    handleDownload={downloadHandler}
                    loading={false}
                /> */}
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

        {!loading && activeBrand?.is_primary_collect && (data?.data?.length > 0
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
    </main>
  );
};

export default WbMetricsPage;
