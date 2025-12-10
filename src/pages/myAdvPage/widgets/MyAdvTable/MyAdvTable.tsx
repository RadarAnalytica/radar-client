import React, { useRef, useState, useEffect } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { useNavigate } from 'react-router-dom';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import TableSettingsWidget from '../TableSettingsWidget/TableSettingsWidget';
import { TABLE_CONFIG_VERSION, getDefaultTableConfig, TABLE_MAX_WIDTH } from '../../config/tableConfig';
import styles from './MyAdvTable.module.css';
import { CompanyData } from '../../data/mockData';
import { ColumnConfig } from '../../config/tableConfig';
import { toCamelCase } from './utils';
import Loader from '@/components/ui/Loader';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { useAppSelector } from '@/redux/hooks';
import { formatNumberWithSpaces } from '@/service/utils';

interface MyAdvTableProps {
  companyId?: string | number;
  data: CompanyData[];
  columns: ColumnConfig[];
  loading: boolean;
  pageData: { page: number, per_page: number, total_count: number };
  setPageData: (pageData: { page: number, per_page: number, total_count: number }) => void;
  sortState: { sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined };
  setSortState: (sortState: { sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined }) => void;
  tableConfig: ColumnConfig[];
  setTableConfig: (config: ColumnConfig[]) => void;
  loadData: () => void;
}

const MyAdvTable: React.FC<MyAdvTableProps> = React.memo(({
  companyId,
  data,
  loading,
  pageData,
  setPageData,
  sortState,
  setSortState,
  tableConfig,
  setTableConfig,
  loadData,
}) => {
  const tableContainerRef = useRef(null);
  const navigate = useNavigate();
  const { activeBrand } = useAppSelector((state) => state.filters);
  const isDataNotCollected = activeBrand && !activeBrand?.is_primary_collect;

  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([`${companyId || ''}_`]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setPageData({ ...pageData, page: page, per_page: pageSize || pageData.per_page });
    tableContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSort = (sort_field: string, sort_order: "ASC" | "DESC") => {
    if ((companyId ? ['company_name', 'company_status', 'company_type'] : ['company_name']).includes(sort_field)) return;

    setPageData({ ...pageData, page: 1 });
    setSortState({ sort_field, sort_order });

    tableContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const onResizeGroup = (columnKey: string, width: number) => {
    // Обновляем конфигурацию колонок с группированной структурой
    const updateColumnWidth = (columns: any[]): any[] => {
      return columns.map(col => {
        // Если это группа с children
        if (col.children && col.children.length > 0) {
          const updatedChildren = updateColumnWidth(col.children);

          // Всегда пересчитываем ширину группы на основе суммы ширин дочерних колонок
          const totalWidth = updatedChildren.reduce((sum: number, child: any) => {
            if (child.hidden) return sum; // Пропускаем скрытые колонки
            return sum + (child.width || child.minWidth || 200);
          }, 0);
          return { ...col, width: Math.min(totalWidth, TABLE_MAX_WIDTH), children: updatedChildren, maxWidth: TABLE_MAX_WIDTH };
        }

        // Если это листовая колонка
        if (col.key === columnKey) {
          return { ...col, width: Math.min(width, TABLE_MAX_WIDTH), maxWidth: TABLE_MAX_WIDTH };
        }

        return col;
      });
    };

    // Обновляем состояние
    setTableConfig((prevConfig: ColumnConfig[]) => {
      const updatedConfig = updateColumnWidth(prevConfig);
      localStorage.setItem('MY_ADV_TABLE_CONFIG', JSON.stringify({
        version: TABLE_CONFIG_VERSION,
        config: updatedConfig
      }));
      return updatedConfig;
    });
  };

  const handleCompanyClick = (companyId: number) => {
    navigate(`/my-adv/${companyId}`);
  };

  const customCellRender = (value: unknown, record: CompanyData, index: number, dataIndex: string) => {
    // Рендер для компании (кликабельная)
    if (dataIndex === 'company_name') {
      // const imageSize = { width: 30, height: 40 };
      const isDateCell = Boolean(record.date);
      return (
        isDateCell 
          ? <div className={styles.cellDate}>{value}</div>
          : (
            <div 
              className={styles.companyCell}
              onClick={() => handleCompanyClick(record.company_id)}
              style={{ cursor: 'pointer' }}
            >
              {/* {record.company_photo 
                ? <img src={record.company_photo} alt={companyName} {...imageSize} className={styles.companyImage} />
                : <div className={styles.companyImage} style={imageSize} />
              } */}
              <span className={styles.companyName}>
                {value}
              </span>
            </div>
          )
      );
    }

    if (dataIndex === 'company_status' && value) {
      const statusValue = String(value ?? '');
      const badgeColor = statusValue === 'Активна' ? '#4AD99133' : statusValue === 'Завершена' ? '#FF8D8D33' : '#F0AD0033';
      return (
        <span 
          className={`${styles.labelCell} ${styles.badgeCell}`} 
          style={{ backgroundColor: badgeColor }}
          title={statusValue}
        >
          {statusValue}
        </span>
      );
    }

    if (dataIndex === 'company_type' && value) {
      return (
        <span className={`${styles.labelCell} ${styles.companyType}`}>
          {String(value ?? '')}
        </span>
      );
    }

    if (dataIndex === 'views') {
      return (
        <span className={`${styles.labelCell} viewsCell`}>
          {formatNumberWithSpaces(value)}
        </span>
      );
    }

    // Рендер для процентов (view_click, click_cart и т.д.)
    if (['view_click', 'click_cart', 'cart_order', 'view_order', 'expected_order_purchase', 'expected_click_purchase', 'drr_orders', 'drr_purchase'].includes(dataIndex)) {
      const percentValue = typeof value === 'number' ? `${value.toFixed(2)}%` : String(value ?? '');
      return (
        <div className={styles.customCell} title={percentValue}>
          {formatNumberWithSpaces(percentValue)}
        </div>
      );
    }

    // Рендер для денежных значений
    if (['cpc', 'cpm', 'cp_cart', 'cpo', 'expected_cps', 'orders_amount', 'expected_purchase_amount', 'ad_spend', 'avg_cpm'].includes(dataIndex)) {
      const formattedValue = typeof value === 'number' 
        ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(value)
        : value;
      return (
        <div className={styles.customCell} title={String(formattedValue ?? '')}>
          {String(formattedValue ?? '')}
        </div>
      );
    }

    // Рендер для числовых forecast полей (не денежных)
    if (dataIndex === 'drr_purchase') {
      const formattedValue = typeof value === 'number' 
        ? new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)
        : value;
      return (
        <div className={styles.customCell} title={String(formattedValue ?? '')}>
          {String(formattedValue ?? '')}
        </div>
      );
    }

    // Обычный рендер для чисел
    if (typeof value === 'number') {
      const formattedValue = new Intl.NumberFormat('ru-RU').format(value);
      return (
        <div className={styles.customCell} title={formattedValue}>
          {formattedValue}
        </div>
      );
    }

    return (
      <div className={`${styles.customCell} ${toCamelCase(dataIndex)}Cell`} title={String(value ?? '')}>
        {String(value ?? '')}
      </div>
    );
  };

  // Загрузка конфигурации таблицы из localStorage
  useEffect(() => {
    let savedTableConfigData = localStorage.getItem('MY_ADV_TABLE_CONFIG');
    if (savedTableConfigData) {
      try {
        const parsed = JSON.parse(savedTableConfigData);
        
        // Проверяем версию конфига
        if (parsed.version === TABLE_CONFIG_VERSION) {
          setTableConfig(parsed.config);
        } else {
          // Версия не совпадает, используем дефолтный конфиг
          console.log('Table config version mismatch, using default config');
          const defaultConfig = getDefaultTableConfig();
          setTableConfig(defaultConfig);
          localStorage.setItem('MY_ADV_TABLE_CONFIG', JSON.stringify({
            version: TABLE_CONFIG_VERSION,
            config: defaultConfig
          }));
        }
      } catch (error) {
        console.error('Error parsing saved table config:', error);
        const defaultConfig = getDefaultTableConfig();
        setTableConfig(defaultConfig);
        localStorage.setItem('MY_ADV_TABLE_CONFIG', JSON.stringify({
          version: TABLE_CONFIG_VERSION,
          config: defaultConfig
        }));
      }
    } else {
      const defaultConfig = getDefaultTableConfig();
      setTableConfig(defaultConfig);
      localStorage.setItem('MY_ADV_TABLE_CONFIG', JSON.stringify({
        version: TABLE_CONFIG_VERSION,
        config: defaultConfig
      }));
    }
  }, []);

  useEffect(() => {
    const { current } = tableContainerRef;
    current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageData.page]);

  const handleExpandedRowsChange = (keys: React.Key[]) => {
    const stringKeys = keys.map(key => String(key));
    setExpandedRowKeys(stringKeys);
    localStorage.setItem('MY_ADV_EXPANDED_TABLE_ROWS_STATE', JSON.stringify({ keys: stringKeys }));
  };

  if (loading) {
    return <Loader loading={loading} progress={0} />;
  }

  return (
    <div className={styles.table}>
      <div className={styles.tableControls}>
        <div className={styles.filtersWrapper}>
          <Filters
            isDataLoading={loading}
            articleSelect={false}
            groupSelect={false}
            shopSelect={!companyId}
            brandSelect={false}
            tempPageCondition={true}
            maxCustomDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
            submitHandler={loadData}
          />
        </div>
        <div className={styles.settingsWrapper}>
          {!isDataNotCollected && <TableSettingsWidget tableConfig={tableConfig} setTableConfig={setTableConfig} />}
        </div>
      </div>

      {isDataNotCollected && <div className='pb-3'><DataCollectWarningBlock /></div>}

      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper} ref={tableContainerRef}>
          {!isDataNotCollected && (
            <RadarTable
              key={JSON.stringify(tableConfig)}
              rowKey={(record: CompanyData) => `${record.company_id || ''}_${record.date || ''}`}
              config={tableConfig}
              dataSource={data}
              preset="radar-table-simple"
              className={companyId ? styles.tableStaticCompany : styles.tableStatic}
              scrollContainerRef={tableContainerRef}
              stickyHeader
              resizeable
              onResize={onResizeGroup}
              resizeThrottle={33}
              onSort={handleSort}
              pagination={pageData.total_count <= pageData.per_page ? null : {
                current: pageData.page,
                pageSize: pageData.per_page,
                total: Math.ceil(pageData.total_count / pageData.per_page),
                onChange: handlePageChange,
                showQuickJumper: true,
              }}
              treeMode
              indentSize={45}
              expandedRowKeys={expandedRowKeys}
              onExpandedRowsChange={(keys: React.Key[]) => handleExpandedRowsChange(keys)}
              paginationContainerStyle={{
                bottom: 0
              }}
              sorting={{ sort_field: sortState?.sort_field, sort_order: sortState?.sort_order }}
              customCellRender={{
                idx: [],
                renderer: customCellRender,
              }}
              noDataRender={() => <div className={styles.noDataBlock}>Нет данных в выбранном периоде</div>}
              headerCellWrapperStyle={{
                minHeight: '0px',
                padding: '12px 10px',
                fontSize: 'inherit',
              }}
              bodyCellWrapperStyle={{
                padding: '5px 10px',
                border: 'none',
              }}
              bodyCellStyle={{
                borderBottom: '1px solid #E8E8E8',
                height: '50px',
              }}
              style={{ 
                width: 'max-content',
                minWidth: '100%'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default MyAdvTable;
