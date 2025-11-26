import React, { useState, useEffect, useContext } from 'react';
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
import { 
  getDefaultTableConfig, 
  loadTableConfig, 
  saveTableConfig, 
  mergeTableConfig,
  type ColumnConfig 
} from './config/tableConfig';
import { CompanyData } from './data/mockData';
import styles from './companyAdvPage.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { ServiceFunctions, getRequestObject } from '@/service/serviceFunctions';
import AuthContext from '@/service/AuthContext';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const CompanyAdvPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const { isDemoMode } = useDemoMode();
  const { authToken } = useContext(AuthContext);
  const { selectedRange } = useAppSelector((state) => state.filters);
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<ColumnConfig[]>([]);
  const [sortState, setSortState] = useState<{ sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined }>({ 
    sort_field: undefined, 
    sort_order: undefined 
  });
  const [data, setData] = useState<CompanyData>({} as CompanyData);
  const [pageData, setPageData] = useState({ page: 1, per_page: 50, total_count: 1 });

  const progress = useLoadingProgress({ loading });

  const prepareTableData = (responseData: CompanyData) => {
    if (responseData?.company_id) {
      const result = {
        ...responseData,
        ...responseData?.summary_data?.advert_funnel,
        ...responseData?.summary_data?.advert_statistics,
        isParent: true,
        children: responseData?.date_data?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(item => ({
          ...item,
          company_name: format(item.date, "d MMMM yyyy", { locale: ru }),
          ...item.advert_funnel,
          ...item.advert_statistics,
        })) || [],
      };
  
      return result;
    }
    
    return {
      ...data,
      children: [],
      summary_data: {},
    };
  };

  const loadData = async () => {
    setLoading(true);
    progress.start();
    try {
      const requestObject = getRequestObject({}, selectedRange);
      const response = await ServiceFunctions.getAdvertDataById(authToken, companyId, requestObject, sortState);
      const preparedData = prepareTableData(response);
      setData(preparedData);
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
    setPageData({ page: 1, per_page: 50, total_count: 1 });
  }, []);

  // Загрузка данных компании
  useEffect(() => {
    if (companyId) {
      loadData();
    }
  }, [companyId, selectedRange, sortState]);

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
            title={<h2 className={styles.page__headerTitle}><Link to='/my-adv'>Моя реклама</Link> / <span>{data?.company_name}</span></h2>}
            titlePrefix=""
            children=""
            videoReviewLink=""
            howToLink={null}
            howToLinkText="Как использовать?"
          />
        </div>

        {isDemoMode && <NoSubscriptionWarningBlock />}

        <BarsGroup data={data} loadData={loadData} loading={loading} />

        {loading && (
          <div className={styles.loader__container}>
            <Loader loading={loading} progress={progress.value} />
          </div>
        )}

        {!loading && (
          <>
            <MyAdvTable
              companyId={companyId}
              data={[data]}
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

