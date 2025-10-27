import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AuthContext from '../../service/AuthContext';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import { useAppSelector } from '../../redux/hooks';
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
  const { user, authToken } = useContext(AuthContext);
  const { isDemoMode } = useDemoMode();
  const { activeBrand, activeBrandName, activeArticle, activeGroup } = useAppSelector((state) => state.filters);
  
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<any[]>();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20);
  
  const progress = useLoadingProgress({ loading });

  const pageTitle = metricType === 'drr' ? 'Контроль ДРР' : 'Контроль СПП';
  const pageDescription = metricType === 'drr' 
    ? 'Доля Рекламных Расходов' 
    : 'Скидка Постоянного Покупателя';

  const loadData = async () => {
    setLoading(true);
    progress.start();
    
    try {
      // Здесь будет реальный API вызов
      // const response = await ServiceFunctions.getWbMetrics(authToken, selectedRange, activeBrand.id, metricType);
      
      // Пока используем моковые данные
      const mockData = generateMockData(metricType, currentPage, perPage);
      
      progress.complete();
      await setTimeout(() => {
        setData(mockData);
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
  }, [activeBrand, currentPage, activeBrandName, activeArticle, activeGroup, metricType]);

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
                onPageChange={setCurrentPage}
            />
        )}
      </section>
    </main>
  );
};

export default WbMetricsPage;
