import React, { useState, useEffect, useContext } from 'react';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';
import MyAdvTable from './widgets/MyAdvTable/MyAdvTable';
import NoData from '@/components/sharedComponents/NoData/NoData';
import SearchBlock from './widgets/SearchBlock/SearchBlock';
import { useAppSelector } from '@/redux/hooks';
import { 
  getDefaultTableConfig, 
  loadTableConfig, 
  saveTableConfig, 
  mergeTableConfig,
  type ColumnConfig 
} from './config/tableConfig';
import { mockCompaniesData, CompanyData, transformApiDataToCompanyData, ApiResponse } from './data/mockData';
import styles from './myAdvPage.module.css';
import AuthContext from '@/service/AuthContext';
import { ServiceFunctions, getRequestObject } from '@/service/serviceFunctions';

const MyAdvPage: React.FC = () => {
  const { isDemoMode } = useDemoMode();
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<ColumnConfig[]>([]);
  const [sortState, setSortState] = useState<{ sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined }>({ 
    sort_field: undefined, 
    sort_order: undefined 
  });
  const [data, setData] = useState<CompanyData[]>(mockCompaniesData);
  const [pageData, setPageData] = useState({ page: 1, per_page: 50, total_count: mockCompaniesData.length });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { selectedRange, activeBrand } = useAppSelector((state) => state.filters);
  
  const progress = useLoadingProgress({ loading });

  const loadData = async () => {
    setLoading(true);
    progress.start();
    try {
      const requestObject = getRequestObject({...pageData, search_query: searchQuery}, selectedRange);
      const response: ApiResponse = await ServiceFunctions.getAdvertData(authToken, requestObject);
      if (response.total_count) {
        setPageData({ ...pageData, total_count: response.total_count });
      }
      setData(response.data.slice(0, 50) || []);
      progress.complete();
      await setTimeout(() => {
        setLoading(false);
        progress.reset();
      }, 500);
    } catch (error) {
      console.error('getAdvertData error', error);
      setLoading(false);
      progress.reset();
    }
  };

  // Инициализация конфигурации таблицы
  useEffect(() => {
    const defaultConfig = getDefaultTableConfig();
    const savedConfig = loadTableConfig();
    const mergedConfig = mergeTableConfig(defaultConfig, savedConfig);
    setTableConfig(mergedConfig);
  }, []);

  // Загрузка данных (моковые данные)
  useEffect(() => {
    if (activeBrand) {
      if (activeBrand.is_primary_collect) {
        loadData();
      } else {
        setLoading(false);
      }
    }
  }, [searchQuery, selectedRange, activeBrand]);

  // Обработчик поиска
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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

        <SearchBlock 
          onSearch={handleSearch}
          loading={loading}
        />

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

