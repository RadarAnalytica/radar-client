import React, { useState, useEffect, useContext } from 'react';
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
import { generateMockData } from './mock/wbMetricsMockData';
import styles from './wbMetricsPage.module.css';


const WbMetricsPage: React.FC = () => {
  const location = useLocation();
  const metricType = location.pathname.includes('/drr') ? 'drr' : 'spp';
  const { authToken } = useContext(AuthContext);
  const { isDemoMode } = useDemoMode();
  const filters = useAppSelector((state) => state.filters);
  const { activeBrand, activeBrandName, activeArticle, activeGroup } = filters;
  
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<any[]>();
  const [data, setData] = useState(null);
  const [pageData, setPageData] = useState({ page: 1, per_page: 50, total_count: 0 });
  
  const progress = useLoadingProgress({ loading });
  const pageTitle = metricType === 'drr' ? 'Контроль ДРР' : 'Контроль СПП';

  const loadData = async () => {
    setLoading(true);
    progress.start();
    
    try {
      // const mockData = generateMockData(metricType, currentPage, perPage);
      const response = await ServiceFunctions.getControlMetrics(authToken, metricType, filters, pageData.page, pageData.per_page);
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
    if (activeBrand && activeBrand.is_primary_collect) {
      loadData();
    } else if (activeBrand && !activeBrand.is_primary_collect) {
      setLoading(false);
    }
  }, [activeBrand, pageData.page, activeBrandName, activeArticle, activeGroup, metricType]);

  const downloadHandler = async () => {
    // TODO: Implement Excel download
    console.log('Download Excel for', metricType);
  };

  const getTableConfig = () => {
    if (!data) return [];
    
    const baseColumns = [
      {
        key: 'product',
        title: 'Товар',
        dataIndex: 'product',
        width: 280,
        fixed: true,
        sortable: true,
        hidden: false
      },
      {
        key: 'chart',
        title: 'Динамика',
        dataIndex: 'chart',
        width: 150,
        sortable: false,
        hidden: false
      }
    ];

    // Добавляем колонки для каждого дня (берем из первого товара)
    const dayColumns = data.data?.[0]?.control_data?.map((item, index) => ({
      key: `day_${index}`,
      title: formatDateHeader(item.date),
      dataIndex: `day_${index}`,
      width: 80,
      align: 'center' as const,
      sortable: false,
      hidden: false
    })) || [];

    return [...baseColumns, ...dayColumns];
  };

  const formatDateHeader = (dateString: string): string => {
    const date = new Date(dateString);
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayName}, ${day}.${month < 10 ? '0' + month : month}`;
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
            howToLink="#"
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
                    tableConfig={tableConfig || getTableConfig()}
                    setTableConfig={setTableConfig}
                />
                
                <DownloadButton
                    handleDownload={downloadHandler}
                    loading={false}
                />
            </div>
        </div>

        {loading && (
          <div className={styles.loader__container}>
            <Loader loading={loading} progress={progress.value} />
          </div>
        )}

        {!loading && data && (
            <WbMetricsTable
                data={data}
                columns={tableConfig || getTableConfig()}
                loading={loading}
                metricType={metricType}
                pageData={pageData}
                setPageData={setPageData}
            />
        )}
      </section>
    </main>
  );
};

export default WbMetricsPage;
