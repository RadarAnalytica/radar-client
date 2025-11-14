import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';
import BarsGroup from './widgets/BarsGroup/BarsGroup';
import StatisticsChart from './widgets/StatisticsChart/StatisticsChart';
import MyAdvTable from './widgets/MyAdvTable/MyAdvTable';
import NoData from '@/components/sharedComponents/NoData/NoData';
import { 
  getDefaultTableConfig, 
  loadTableConfig, 
  saveTableConfig, 
  mergeTableConfig,
  type ColumnConfig 
} from './config/tableConfig';
import { mockCompaniesData, CompanyData } from './data/mockData';
import styles from './companyAdvPage.module.css';

const CompanyAdvPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const { isDemoMode } = useDemoMode();
  
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<ColumnConfig[]>([]);
  const [sortState, setSortState] = useState<{ sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined }>({ 
    sort_field: undefined, 
    sort_order: undefined 
  });
  const [data, setData] = useState<CompanyData | null>(null);
  const [tableData, setTableData] = useState<CompanyData[]>([]);
  const [pageData, setPageData] = useState({ page: 1, per_page: 50, total_count: 1 });

  const progress = useLoadingProgress({ loading });

  // Инициализация конфигурации таблицы
  useEffect(() => {
    const defaultConfig = getDefaultTableConfig();
    const savedConfig = loadTableConfig();
    const mergedConfig = mergeTableConfig(defaultConfig, savedConfig);
    setTableConfig(mergedConfig);
  }, []);

  // Загрузка данных компании
  useEffect(() => {
    setLoading(true);
    progress.start();
    
    // Имитация загрузки данных
    setTimeout(() => {
      const company = mockCompaniesData.find(c => c.id === Number(companyId));
      if (company) {
        setData(company);
        // Для страницы компании создаем массив с одной записью для таблицы
        setTableData([company]);
        setPageData({ page: 1, per_page: 50, total_count: 1 });
      }
      progress.complete();
      setTimeout(() => {
        setLoading(false);
        progress.reset();
      }, 500);
    }, 500);
  }, [companyId]);

  // Обработчик изменения конфигурации таблицы
  const handleTableConfigChange = (newConfig: ColumnConfig[]) => {
    setTableConfig(newConfig);
    saveTableConfig(newConfig);
  };

  if (!data) {
    return (
      <main className={styles.page}>
        <MobilePlug />
        <section className={styles.page__sideNavWrapper}>
          <Sidebar />
        </section>
        <section className={styles.page__content}>
          <NoData />
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <MobilePlug />

      <section className={styles.page__sideNavWrapper}>
        <Sidebar />
      </section>

      <section className={styles.page__content}>
        <div className={styles.page__headerWrapper}>
          <Header 
            title={`Моя реклама / ${data.company}`}
            titlePrefix=""
            children=""
            videoReviewLink=""
            howToLink={null}
            howToLinkText="Как использовать?"
          />
        </div>

        {isDemoMode && <NoSubscriptionWarningBlock />}

        <BarsGroup loading={loading} />

        {loading && (
          <div className={styles.loader__container}>
            <Loader loading={loading} progress={progress.value} />
          </div>
        )}

        {!loading && (
          <>
            <MyAdvTable
              data={tableData}
              columns={tableConfig}
              loading={loading}
              pageData={pageData}
              setPageData={setPageData}
              sortState={sortState}
              setSortState={setSortState}
              tableConfig={tableConfig}
              setTableConfig={handleTableConfigChange}
            />

            <StatisticsChart data={data} loading={loading} />
          </>
        )}
      </section>
    </main>
  );
};

export default CompanyAdvPage;

