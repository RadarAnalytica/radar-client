import React, { useRef } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { useNavigate } from 'react-router-dom';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import TableSettingsWidget from '../TableSettingsWidget/TableSettingsWidget';
import { useTableColumnResize } from '@/service/hooks/useTableColumnResize';
import { TABLE_CONFIG_VERSION } from '../../config/tableConfig';
import { sortTableData } from './utils';
import styles from './MyAdvTable.module.css';
import { CompanyData } from '../../data/mockData';
import { ColumnConfig } from '../../config/tableConfig';
import { toCamelCase } from './utils';

interface MyAdvTableProps {
  data: CompanyData[];
  columns: ColumnConfig[];
  loading: boolean;
  pageData: { page: number, per_page: number, total_count: number };
  setPageData: (pageData: { page: number, per_page: number, total_count: number }) => void;
  sortState: { sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined };
  setSortState: (sortState: { sort_field: string | undefined, sort_order: "ASC" | "DESC" | undefined }) => void;
  tableConfig: ColumnConfig[];
  setTableConfig: (config: ColumnConfig[]) => void;
}

const MyAdvTable: React.FC<MyAdvTableProps> = ({
  data,
  columns,
  loading,
  pageData,
  setPageData,
  sortState,
  setSortState,
  tableConfig,
  setTableConfig
}) => {
  const tableContainerRef = useRef(null);
  const navigate = useNavigate();

  const prepareTableData = () => {
    if (!Array.isArray(data)) return [];

    return data.map((item: CompanyData) => ({
      key: item.id,
      ...item
    }));
  };

  const handlePageChange = (page: number) => {
    setPageData({ ...pageData, page: page });
  };

  const handleSort = (sort_field: string, sort_order: "ASC" | "DESC") => {
    setPageData({ ...pageData, page: 1 });
    setSortState({ sort_field, sort_order });
    tableContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCompanyClick = (companyId: number) => {
    navigate(`/my-adv/${companyId}`);
  };

  const customCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    // Рендер для компании (кликабельная)
    if (dataIndex === 'company') {
      const imageSize = { width: 30, height: 40 };
      return (
        <div 
          className={styles.companyCell}
          onClick={() => handleCompanyClick(record.id)}
          style={{ cursor: 'pointer' }}
        >
          {record.company_photo 
            ? <img src={record.company_photo} alt={value} {...imageSize} className={styles.companyImage} />
            : <div className={styles.companyImage} style={imageSize} />
          }
          <span className={styles.companyName}>
            {value}
          </span>
        </div>
      );
    }

    if (dataIndex === 'status_wb') {
      const badgeColor = value === 'Запущена' ? '#4AD99133' : '#F0AD0033';
      return (
        <span 
          className={`${styles.labelCell} ${styles.badgeCell}`} 
          style={{ backgroundColor: badgeColor }}
          title={value}
        >
          {value}
        </span>
      );
    }

    if (dataIndex === 'company_type') {
      return (
        <span className={`${styles.labelCell} ${styles.companyType}`}>
          {value}
        </span>
      );
    }

    // Рендер для процентов (строковые значения уже отформатированы)
    if (dataIndex.includes('_to_') || (dataIndex.includes('forecast_') && typeof value === 'string')) {
      return (
        <span className={styles.labelCell}>
          {value}
        </span>
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
        <span className={styles.labelCell}>
          {formattedValue}
        </span>
      );
    }

    // Рендер для числовых forecast полей (не денежных)
    if (dataIndex === 'forecast_drr_purchase') {
      const formattedValue = typeof value === 'number' 
        ? new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)
        : value;
      return (
        <span className={styles.labelCell}>
          {formattedValue}
        </span>
      );
    }

    // Обычный рендер для чисел
    if (typeof value === 'number') {
      const formattedValue = new Intl.NumberFormat('ru-RU').format(value);
      return (
        <span className={styles.labelCell}>
          {formattedValue}
        </span>
      );
    }

    return (
      <span className={`${styles.labelCell} ${toCamelCase(dataIndex)}Cell`}>
        {value}
      </span>
    );
  };

  const { config: tableConfigResized, onResize: onResizeColumn } = useTableColumnResize(
    columns, 
    `myAdv_sizeColumnsConfig`,
    0,
    400,
    TABLE_CONFIG_VERSION
  );

  const headerComponent = () => {
    return (
      <div className={styles.tableContainerHeader}>
        <div className={`${styles.tableContainerHeaderItem} ${styles.tableContainerHeaderFirst}`}>
          <h2>О товаре</h2>
        </div>
        <div className={`${styles.tableContainerHeaderItem} ${styles.tableContainerHeaderSecond}`}>
          <h2>Рекламная воронка</h2>
        </div>
        <div className={`${styles.tableContainerHeaderItem} ${styles.tableContainerHeaderThird}`}>
          <h2>Рекламная статистика</h2>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.table}>
      <div className={styles.tableControls}>
        <div className={styles.filtersWrapper}>
          <Filters
            isDataLoading={loading}
            articleSelect={false}
            groupSelect={false}
            shopSelect={false}
            brandSelect={false}
            maxCustomDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
          />
        </div>
        <div className={styles.settingsWrapper}>
          <TableSettingsWidget
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        
        <div className={styles.tableWrapper} ref={tableContainerRef}>
          {!loading && data && <>
            {headerComponent()}
            <RadarTable
              config={tableConfigResized as any}
              dataSource={sortTableData(prepareTableData(), sortState)}
              // resizeable
              // onResize={onResizeColumn}
              preset="radar-table-default"
              scrollContainerRef={tableContainerRef}
              stickyHeader
              customCellRender={{
                idx: columns.map(col => col.dataIndex),
                renderer: customCellRender,
              }}
              sorting={sortState}
              onSort={handleSort}
              pagination={pageData.total_count <= pageData.per_page ? null : {
                current: pageData.page,
                pageSize: pageData.per_page,
                total: Math.ceil(pageData.total_count / pageData.per_page),
                onChange: handlePageChange,
                showQuickJumper: true,
              }}
              style={{ fontFamily: 'Mulish', width: 'max-content', tableLayout: 'fixed' }}
            />
          </>}
        </div>
      </div>
    </div>
  );
};

export default MyAdvTable;

