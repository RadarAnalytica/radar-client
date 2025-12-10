import React, { useRef } from 'react';
import { Table as RadarTable } from 'radar-ui';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import MetricChart from './MetricChart';
import { getColorForPercentage, sortTableData } from './utils';
import styles from './WbMetricsTable.module.css';
import { useTableColumnResize } from '@/service/hooks/useTableColumnResize';
import { TABLE_CONFIG_VERSION } from '../../config/tableConfig';
import TippyTooltip from '@/components/ui/TippyTooltip';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ControlDataItem {
  date: string;
  percentage: number;
}

interface ProductData {
  name: string;
  wb_id: number;
  vendor_code: string;
  barcode: string;
  brand: string;
  category: string;
  photo: string;
}

interface WbMetricsData {
  data: {
    product: ProductData;
    control_data: ControlDataItem[];
  }[];
  min_control_value: number;
  max_control_value: number;
  page: number;
  per_page: number;
  total_count: number;
}

interface WbMetricsTableProps {
  data: WbMetricsData;
  columns: any[];
  loading: boolean;
  metricType: 'drr' | 'spp';
  pageData: { page: number, per_page: number, total_count: number };
  setPageData: (pageData: { page: number, per_page: number, total_count: number }) => void;
  sortState: { sort_field: string, sort_order: "ASC" | "DESC" };
  setSortState: (sortState: { sort_field: string, sort_order: "ASC" | "DESC" }) => void;
}

const WbMetricsTable: React.FC<WbMetricsTableProps> = React.memo(({
  data,
  columns,
  loading,
  metricType,
  pageData,
  setPageData,
  sortState,
  setSortState
}) => {
  const tableContainerRef = useRef(null);

  const prepareTableData = () => {
    if (!Array.isArray(data?.data)) return [];

    return data.data.map((item: any) => {
      const { product, control_data } = item;
      
      return {
        key: product.wb_id,
        product: {
          wb_id: product.wb_id,
          photo: product.photo,
          name: product.name
        },
        vendor_code: product.vendor_code,
        barcode: product.barcode,
        brand: product.brand,
        category: product.category,
        chart: control_data,
        ...control_data.reduce((acc, item, index) => {
          acc[`day_${index}`] = item.percentage;
          return acc;
        }, {} as Record<string, number>)
      };
    });
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

  const customCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    // Рендер для товара (фото + название)
    if (dataIndex === 'product') {
      const imageSize = { width: 30, height: 40 };
      return (
        <div className={styles.productCell} data-id={value.wb_id}>
          {value.photo 
            ? <img src={value.photo} alt={value.name} {...imageSize} className={styles.productImage} />
            : <div className={styles.productImage} style={imageSize} />
          }
          <TippyTooltip content={value.name}>
            <span className={styles.productName}>
              {value.name}
            </span>
          </TippyTooltip>
        </div>
      );
    }

    if (dataIndex === 'vendor_code' || dataIndex === 'barcode' || dataIndex === 'brand' || dataIndex === 'category') {
      return (
        <div className={styles.fixedCell}>
            <div className={styles.fixedCellTitle} title={value}><span>{value.toString()}</span></div>
        </div>
      );
    }

    // Рендер для графика
    if (dataIndex === 'chart') {
      return (
        <MetricChart
          data={value}
          metricType={metricType}
          minControlValue={data?.min_control_value ?? 0}
          maxControlValue={data?.max_control_value ?? 100}
        />
      );
    }

    // Рендер для колонок дней
    if (dataIndex.startsWith('day_')) {
      let tooltipContent;
      if (metricType === 'drr' && !value) {
        tooltipContent = value === 0 ? 'По данному товару реклама не активна или имеет минимальные значения' : 'Продажи по данному товару не зафиксированы';
      } else if (value === null) {
        tooltipContent = 'Продажи по данному товару не зафиксированы';
      }

      return (
        <TippyTooltip content={tooltipContent}>
          <div 
            className={styles.percentageCell}
            style={{ 
              backgroundColor: value !== null 
                ? getColorForPercentage(value, data.min_control_value, data.max_control_value, metricType) 
                : 'transparent'
            }}
          >
            {value !== null ? `${value}%` : '-'}
          </div>
        </TippyTooltip>
      );
    }

    // Обычный рендер
    return (
      <TippyTooltip content={value}>
        <span className={`${styles.labelCell} ${dataIndex}-cell`}>
          {value}
        </span>
      </TippyTooltip>
    );
  };

  const { config: tableConfig, onResize: onResizeColumn } = useTableColumnResize(
    columns, 
    `wbMetrics_sizeColumnsConfig__${metricType}`,
    0,
    400,
    TABLE_CONFIG_VERSION
  );
  
  
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper} ref={tableContainerRef}>
        {!loading && data && (
          <RadarTable
            config={tableConfig as any}
            dataSource={sortTableData(prepareTableData(), sortState)}
            resizeable
            onResize={onResizeColumn}
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
            bodyCellWrapperStyle={{
              justifyContent: 'flex-start',
              height: '70px',
            }}
          />
        )}
      </div>
    </div>
  );
});
WbMetricsTable.displayName = 'WbMetricsTable';

export default WbMetricsTable;
