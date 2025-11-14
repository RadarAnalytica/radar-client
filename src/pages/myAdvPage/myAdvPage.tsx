import React, { useState, useEffect } from 'react';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';
import MyAdvTable from './widgets/MyAdvTable/MyAdvTable';
import NoData from '@/components/sharedComponents/NoData/NoData';
import { 
  getDefaultTableConfig, 
  loadTableConfig, 
  saveTableConfig, 
  mergeTableConfig,
  type ColumnConfig 
} from './config/tableConfig';
import { mockCompaniesData } from './data/mockData';
import styles from './myAdvPage.module.css';

const MyAdvPage: React.FC = () => {
  const { isDemoMode } = useDemoMode();
  
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<ColumnConfig[]>([]);
  const [sortState, setSortState] = useState<{ sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined }>({ 
    sort_field: undefined, 
    sort_order: undefined 
  });
  const [data, setData] = useState(mockCompaniesData);
  const [pageData, setPageData] = useState({ page: 1, per_page: 50, total_count: mockCompaniesData.length });
  
  const progress = useLoadingProgress({ loading });

  // Инициализация конфигурации таблицы
  useEffect(() => {
    const defaultConfig = getDefaultTableConfig();
    const savedConfig = loadTableConfig();
    const mergedConfig = mergeTableConfig(defaultConfig, savedConfig);
    setTableConfig(mergedConfig);
  }, []);

  // Загрузка данных (моковые данные)
  useEffect(() => {
    setLoading(true);
    progress.start();
    
    // Имитация загрузки данных
    setTimeout(() => {
      setData(mockCompaniesData);
      setPageData({ 
        page: 1, 
        per_page: 50, 
        total_count: mockCompaniesData.length 
      });
      progress.complete();
      setTimeout(() => {
        setLoading(false);
        progress.reset();
      }, 500);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обработчик изменения конфигурации таблицы
  const handleTableConfigChange = (newConfig: ColumnConfig[]) => {
    setTableConfig(newConfig);
    saveTableConfig(newConfig);
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
            title="Моя реклама"
            titlePrefix=""
            children={null}
            videoReviewLink=""
            howToLink={null}
            howToLinkText="Как использовать?"
          />
        </div>

        {isDemoMode && <NoSubscriptionWarningBlock />}

        {loading && (
          <div className={styles.loader__container}>
            <Loader loading={loading} progress={progress.value} />
          </div>
        )}

        {!loading && (data?.length > 0
          ? <MyAdvTable
              data={data}
              columns={tableConfig}
              loading={loading}
              pageData={pageData}
              setPageData={setPageData}
              sortState={sortState}
              setSortState={setSortState}
              tableConfig={tableConfig}
              setTableConfig={handleTableConfigChange}
            />
          : <NoData />
        )}
      </section>
    </main>
  );
};

export default MyAdvPage;

