import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import Loader from '@/components/ui/Loader';
import BarsGroup from './widgets/BarsGroup/BarsGroup';
import StatisticsChart from './widgets/StatisticsChart/StatisticsChart';
import { Table as RadarTable } from 'radar-ui';
import { useTableColumnResize } from '@/service/hooks/useTableColumnResize';
import { TABLE_CONFIG_VERSION } from './config/tableConfig';
import { sortTableData } from './widgets/MyAdvTable/utils';
import TippyTooltip from '@/components/ui/TippyTooltip';
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
  const navigate = useNavigate();
  const { isDemoMode } = useDemoMode();
  
  const [loading, setLoading] = useState(true);
  const [tableConfig, setTableConfig] = useState<ColumnConfig[]>([]);
  const [sortState, setSortState] = useState<{ sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined }>({ 
    sort_field: undefined, 
    sort_order: undefined 
  });
  const [data, setData] = useState<CompanyData | null>(null);
  const tableContainerRef = React.useRef(null);

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
        // Для страницы компании создаем массив с одной записью
        setData(company);
      }
      progress.complete();
      setTimeout(() => {
        setLoading(false);
        progress.reset();
      }, 500);
    }, 500);
  }, [companyId]);

  const handleSort = (sort_field: string, sort_order: "ASC" | "DESC") => {
    setSortState({ sort_field, sort_order });
    tableContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const prepareTableData = () => {
    if (!data) return [];
    return [{
      key: data.id,
      ...data
    }];
  };

  const customCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    // Рендер для компании
    if (dataIndex === 'company') {
      const imageSize = { width: 40, height: 40 };
      return (
        <div className={styles.companyCell}>
          {record.company_photo 
            ? <img src={record.company_photo} alt={value} {...imageSize} className={styles.companyImage} />
            : <div className={styles.companyImage} style={imageSize} />
          }
          <TippyTooltip content={value}>
            <span className={styles.companyName}>
              {value}
            </span>
          </TippyTooltip>
        </div>
      );
    }

    // Рендер для процентов (строковые значения уже отформатированы)
    if (dataIndex.includes('_to_') || (dataIndex.includes('forecast_') && typeof value === 'string')) {
      return (
        <TippyTooltip content={value}>
          <span className={styles.labelCell}>
            {value}
          </span>
        </TippyTooltip>
      );
    }

    // Рендер для денежных значений
    if (dataIndex === 'cpc' || dataIndex === 'avg_crm' || dataIndex === 'cpcart' || 
        dataIndex === 'forecast_cps' || dataIndex === 'orders_sum' || 
        dataIndex === 'forecast_purchase_sum' || dataIndex === 'advertising_costs') {
      const formattedValue = typeof value === 'number' 
        ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(value)
        : value;
      return (
        <TippyTooltip content={formattedValue}>
          <span className={styles.labelCell}>
            {formattedValue}
          </span>
        </TippyTooltip>
      );
    }

    // Рендер для числовых forecast полей (не денежных)
    if (dataIndex === 'forecast_drr_purchase') {
      const formattedValue = typeof value === 'number' 
        ? new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)
        : value;
      return (
        <TippyTooltip content={formattedValue}>
          <span className={styles.labelCell}>
            {formattedValue}
          </span>
        </TippyTooltip>
      );
    }

    // Обычный рендер для чисел
    if (typeof value === 'number') {
      const formattedValue = new Intl.NumberFormat('ru-RU').format(value);
      return (
        <TippyTooltip content={formattedValue}>
          <span className={styles.labelCell}>
            {formattedValue}
          </span>
        </TippyTooltip>
      );
    }

    // Обычный рендер
    return (
      <TippyTooltip content={value}>
        <span className={styles.labelCell}>
          {value}
        </span>
      </TippyTooltip>
    );
  };

  const { config: tableConfigResized, onResize: onResizeColumn } = useTableColumnResize(
    tableConfig, 
    `myAdv_sizeColumnsConfig`,
    0,
    400,
    TABLE_CONFIG_VERSION
  );

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
            title={data.company}
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
            <div className={styles.tableContainer}>
              <div className={styles.tableWrapper} ref={tableContainerRef}>
                <RadarTable
                  config={tableConfigResized as any}
                  dataSource={sortTableData(prepareTableData(), sortState)}
                  resizeable
                  onResize={onResizeColumn}
                  preset="radar-table-default"
                  scrollContainerRef={tableContainerRef}
                  stickyHeader
                  customCellRender={{
                    idx: tableConfig.map(col => col.dataIndex),
                    renderer: customCellRender,
                  }}
                  sorting={sortState}
                  onSort={handleSort}
                  style={{ fontFamily: 'Mulish', width: 'max-content', tableLayout: 'fixed' }}
                />
              </div>
            </div>

            <StatisticsChart data={data} loading={loading} />
          </>
        )}
      </section>
    </main>
  );
};

export default CompanyAdvPage;

