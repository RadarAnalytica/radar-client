import React, { useState, useRef } from 'react';
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
}

const WbMetricsTable: React.FC<WbMetricsTableProps> = ({
  data,
  columns,
  loading,
  metricType,
  pageData,
  setPageData
}) => {

  const [sortState, setSortState] = useState({ sort_field: undefined, sort_order: undefined });
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

  const handleSort = (sort_field: string, sort_order: string) => {
    setSortState({ sort_field, sort_order });
    tableContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const customCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    // Рендер для товара (фото + название)
    if (dataIndex === 'product') {
      return (
        <div className={styles.productCell} data-id={value.wb_id}>
          <img 
            src={value.photo}
            alt={value.name}
            width={30}
            height={40}
            className={styles.productImage}
          />
          <span className={styles.productName} title={value.name}>
            {value.name}
          </span>
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
      return (
        <div 
          className={styles.percentageCell}
          style={{ 
            backgroundColor: value !== undefined 
              ? getColorForPercentage(value, data.min_control_value, data.max_control_value, metricType, 0.2)
              : 'transparent'
          }}
        >
          {value !== undefined ? `${value}%` : '-'}
        </div>
      );
    }

    // Обычный рендер
    return <span className={`${styles.labelCell} ${dataIndex}-cell`} title={value}>{value}</span>;
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper} ref={tableContainerRef}>
        {loading && (
          <div className={styles.loading}>
            <span className='loader'></span>
          </div>
        )}
        
        {!loading && data && (
          <RadarTable
            config={columns}
            dataSource={sortTableData(prepareTableData(), sortState)}
            preset="radar-table-default"
            scrollContainerRef={tableContainerRef}
            stickyHeader
            customCellRender={{
              idx: columns.map(col => col.dataIndex),
              renderer: customCellRender,
            }}
            onSort={handleSort}
            pagination={{
              current: pageData.page,
              pageSize: pageData.per_page,
              total: Math.ceil(pageData.total_count / pageData.per_page),
              onChange: handlePageChange,
              showQuickJumper: true,
            }}
            style={{ fontFamily: 'Mulish' }}
          />
        )}
      </div>
    </div>
  );
};

export default WbMetricsTable;
