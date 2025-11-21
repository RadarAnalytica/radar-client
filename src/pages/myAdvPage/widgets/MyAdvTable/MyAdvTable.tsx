import React, { useRef, useState, useEffect } from 'react';
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

  const [hideCompaniesWithoutStats, setHideCompaniesWithoutStats] = useState(false);
  
  const handleHideCompaniesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    console.log('Скрыть компании без статистики:', checked);
    setHideCompaniesWithoutStats(checked);
  };

  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  // Генерация дочерних строк с датами для компании
  const generateDateRows = (company: CompanyData) => {
    // Генерируем последние 7 дней
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }

    return dates.map((date, index) => {
      const dateStr = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
      // Генерируем случайные данные для каждой даты (можно заменить на реальные данные)
      const variation = 0.8 + Math.random() * 0.4; // вариация от 80% до 120%
      
      return {
        id: `${company.id}_${date.getTime()}`,
        key: `${company.id}_${date.getTime()}`,
        isParent: false,
        isLastChild: index === dates.length - 1,
        company: dateStr, // В колонке компании показываем дату
        cart: Math.round(company.cart * variation / dates.length),
        orders: Math.round(company.orders * variation / dates.length),
        ordered_qty: Math.round(company.ordered_qty * variation / dates.length),
        forecast_purchase_qty: Math.round(company.forecast_purchase_qty * variation / dates.length),
        views_to_click: company.views_to_click,
        click_to_cart: company.click_to_cart,
        cart_to_order: company.cart_to_order,
        view_to_order: company.view_to_order,
        forecast_order_to_purchase: company.forecast_order_to_purchase,
        forecast_click_to_purchase: company.forecast_click_to_purchase,
        views: Math.round(company.views * variation / dates.length),
        clicks: Math.round(company.clicks * variation / dates.length),
        cpc: company.cpc,
        avg_crm: company.avg_crm,
        avg_position: company.avg_position,
        drr_orders: company.drr_orders,
        forecast_drr_purchase: company.forecast_drr_purchase,
        cpcart: company.cpcart,
        forecast_cps: company.forecast_cps,
        orders_sum: Math.round(company.orders_sum * variation / dates.length),
        forecast_purchase_sum: Math.round(company.forecast_purchase_sum * variation / dates.length),
        advertising_costs: Math.round(company.advertising_costs * variation / dates.length),
      };
    });
  };

  const prepareTableData = () => {
    if (Array.isArray(data)) return data;

    // return data.map((item: CompanyData) => {
    //   const children = generateDateRows(item);
    //   return {
    //     id: item.id,
    //     key: item.id,
    //     isParent: true,
    //     ...item,
    //     children: children.map((child, index) => ({
    //       ...child,
    //       isLastChild: index === children.length - 1,
    //     })),
    //   };
    // });
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

  const customCellRender = (value: unknown, record: CompanyData & { isParent?: boolean; isLastChild?: boolean; id?: number | string }, index: number, dataIndex: string) => {
    // Рендер для компании (кликабельная) - только для родительских строк
    if (dataIndex === 'company') {
      if (!record.isParent) {
        const imageSize = { width: 30, height: 40 };
        const companyName = String(value ?? '');
        return (
          <div 
            className={styles.companyCell}
            onClick={() => handleCompanyClick(record.id as number)}
            style={{ cursor: 'pointer' }}
          >
            {record.company_photo 
              ? <img src={record.company_photo} alt={companyName} {...imageSize} className={styles.companyImage} />
              : <div className={styles.companyImage} style={imageSize} />
            }
            <span className={styles.companyName}>
              {companyName}
            </span>
          </div>
        );
      } else {
        return (
          <div className={styles.dateCell}>
            {String(value ?? '')}
          </div>
        );
      }
    }

    if (dataIndex === 'status_wb' && value) {
      const statusValue = String(value ?? '');
      const badgeColor = statusValue === 'Запущена' ? '#4AD99133' : '#F0AD0033';
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
          {String(value ?? '')}
        </span>
      );
    }

    // Рендер для процентов (строковые значения уже отформатированы)
    if (dataIndex.includes('_to_') || (dataIndex.includes('forecast_') && typeof value === 'string')) {
      return (
        <span className={styles.labelCell}>
          {String(value ?? '')}
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
          {String(formattedValue ?? '')}
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
          {String(formattedValue ?? '')}
        </span>
      );
    }

    // Обычный рендер для чисел
    if (typeof value === 'number') {
      const formattedValue = new Intl.NumberFormat('ru-RU').format(value);
      return (
        <span className={styles.labelCell}>
          {String(formattedValue ?? '')}
        </span>
      );
    }

    return (
      <span className={`${styles.labelCell} ${toCamelCase(dataIndex)}Cell`}>
        {String(value ?? '')}
      </span>
    );
  };

  const { config: tableConfigResized } = useTableColumnResize(
    columns, 
    `myAdv_sizeColumnsConfig`,
    0,
    400,
    TABLE_CONFIG_VERSION
  );

  // Инициализация состояния раскрытых строк
  useEffect(() => {
    if (!data || data.length === 0) return;

    // Пытаемся загрузить сохраненное состояние
    const savedState = localStorage.getItem('MY_ADV_EXPANDED_TABLE_ROWS_STATE');
    
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (Array.isArray(parsedState.keys)) {
          setExpandedRowKeys(parsedState.keys);
          return;
        }
      } catch (error) {
        console.error('Ошибка при парсинге сохраненного состояния:', error);
      }
    }

    // Если нет сохраненного состояния, раскрываем все строки по умолчанию
    const allKeys = data.map((item) => String(item.id));
    setExpandedRowKeys(allKeys);
    localStorage.setItem('MY_ADV_EXPANDED_TABLE_ROWS_STATE', JSON.stringify({ keys: allKeys }));
  }, [data]);

  // Сохранение состояния при изменении раскрытых строк
  const handleExpandedRowsChange = (keys: React.Key[]) => {
    const stringKeys = keys.map(key => String(key));
    setExpandedRowKeys(stringKeys);
    localStorage.setItem('MY_ADV_EXPANDED_TABLE_ROWS_STATE', JSON.stringify({ keys: stringKeys }));
  };

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
        <div className={`${styles.tableContainerHeaderItem} ${styles.stickyFixer}`}></div>
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
            tempPageCondition={true}
            maxCustomDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
          >
            {/* <div className={styles.checkboxWrapper}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={hideCompaniesWithoutStats}
                  onChange={handleHideCompaniesChange}
                />
                <span>Скрыть компании без статистики</span>
              </label>
            </div> */}
          </Filters>
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
              rowKey={(record) => String(record.id || record.key)}
              config={tableConfigResized}
              dataSource={sortTableData(prepareTableData(), sortState)}
              // resizeable
              // onResize={onResizeColumn}
              preset="radar-table-default"
              scrollContainerRef={tableContainerRef}
              stickyHeader
              treeMode
              indentSize={45}
              expandedRowKeys={expandedRowKeys}
              onExpandedRowsChange={(keys: React.Key[]) => handleExpandedRowsChange(keys)}
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

