import React, { useState, useEffect, useContext, useRef } from 'react';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import MyAdvTable from './widgets/MyAdvTable/MyAdvTable';
import SearchBlock from './widgets/SearchBlock/SearchBlock';
import { useAppSelector } from '@/redux/hooks';
import { 
  getDefaultTableConfig, 
  loadTableConfig, 
  saveTableConfig, 
  mergeTableConfig,
  type ColumnConfig 
} from './config/tableConfig';
import { CompanyData, ApiResponse } from './data/mockData';
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
  const [data, setData] = useState<CompanyData[]>([]);
  const [pageData, setPageData] = useState({ page: 1, per_page: 25, total_count: 25 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { selectedRange, activeBrand, isFiltersLoaded } = useAppSelector((state) => state.filters);
  const currentPageRef = useRef(1);
  const progress = useLoadingProgress({ loading });

  const prepareTableData = (data: CompanyData[]) => {
    const result = data.map(item => ({
      ...item,
      ...item.advert_funnel,
      ...item.advert_statistics,
    }));

    return result;
  };

  const loadData = async () => {
    setLoading(true);
    progress.start();
    try {
      const requestObject = getRequestObject({ activeBrandName: activeBrand?.brand_name }, selectedRange, activeBrand?.id);
      const response: ApiResponse = await ServiceFunctions.getAdvertData(authToken, {...requestObject, ...pageData, search_query: searchQuery}, sortState);
      if (response.total) {
        setPageData(prev => ({ ...prev, total_count: response.total }));
      }
      setData(prepareTableData(response.data || []));
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

  // Загрузка данных
  useEffect(() => {
    if (activeBrand) {
      if (activeBrand.is_primary_collect) {
        if (pageData.page === 1) {
          currentPageRef.current = 1;
          loadData();
        } else if (currentPageRef.current !== pageData.page) {
          currentPageRef.current = pageData.page;
          setPageData({ ...pageData, page: 1 });
        } else {
          loadData();
        }
      } else {
        setLoading(false);
      }
    }
  }, [searchQuery, sortState, isFiltersLoaded, activeBrand, selectedRange]);

  useEffect(() => {
    if (activeBrand) {
      if (activeBrand.is_primary_collect) {
        loadData();
      } else {
        setLoading(false);
      }
    }
  }, [pageData.page]);

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
            title="Статистика"
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

        <MyAdvTable
          data={data}
          columns={tableConfig}
          loading={loading}
          progress={progress}
          pageData={pageData}
          setPageData={setPageData}
          sortState={sortState}
          setSortState={setSortState}
          tableConfig={tableConfig}
          setTableConfig={handleTableConfigChange}
        />
      </section>
    </main>
  );
};

export default MyAdvPage;

