import React, { useState, useEffect, useRef } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { useAppSelector } from '../../../../redux/hooks';
import styles from './WbMetricsTable.module.css';

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
  onPageChange?: (page: number) => void;
}

const WbMetricsTable: React.FC<WbMetricsTableProps> = ({
  data,
  columns,
  loading,
  metricType,
  onPageChange
}) => {
  const { activeBrand } = useAppSelector((state) => state.filters);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const tableContainerRef = useRef(null);

  const getColorForPercentage = (percentage: number): string => {
    if (!data) return '#f0f0f0';
    
    const { min_control_value, max_control_value } = data;
    const range = max_control_value - min_control_value;
    
    if (range === 0) return '#f0f0f0';
    
    const normalizedValue = (percentage - min_control_value) / range;
    
    if (normalizedValue <= 0.1) return '#ff4444'; // Красный
    if (normalizedValue <= 0.2) return '#ff6666';
    if (normalizedValue <= 0.3) return '#ff8888';
    if (normalizedValue <= 0.4) return '#ffaa44'; // Оранжевый
    if (normalizedValue <= 0.5) return '#ffcc44'; // Желтый
    if (normalizedValue <= 0.6) return '#ffee44';
    if (normalizedValue <= 0.7) return '#ccff44';
    if (normalizedValue <= 0.8) return '#88ff44'; // Светло-зеленый
    if (normalizedValue <= 0.9) return '#44ff44'; // Зеленый
    return '#22ff22'; // Ярко-зеленый
  };

  const formatDateHeader = (dateString: string): string => {
    const date = new Date(dateString);
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayName}, ${day}.${month}`;
  };

  const prepareTableData = () => {
    if (!data?.data || !Array.isArray(data.data)) return [];

    return data.data.map((item) => {
      const { product, control_data } = item;
      
      return {
        key: product.wb_id,
        product: {
          photo: product.photo,
          name: product.name
        },
        chart: control_data,
        ...control_data.reduce((acc, item, index) => {
          acc[`day_${index}`] = item.percentage;
          return acc;
        }, {} as Record<string, number>)
      };
    });
  };

  const getTableColumns = () => {
    // Используем переданные колонки или генерируем по умолчанию
    if (columns && columns.length > 0) {
      return columns;
    }

    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) return [];

    const baseColumns = [
      {
        key: 'product',
        title: 'Товар',
        dataIndex: 'product',
        width: 280,
        fixed: true,
        sortable: false,
        hidden: false
      },
      {
        key: 'chart',
        title: 'Динамика',
        dataIndex: 'chart',
        width: 150,
        sortable: false,
        hidden: false
      }
    ];

    // Добавляем колонки для каждого дня (берем из первого товара)
    const dayColumns = data.data[0]?.control_data?.map((item, index) => ({
      key: `day_${index}`,
      title: formatDateHeader(item.date),
      dataIndex: `day_${index}`,
      width: 80,
      align: 'center' as const,
      sortable: false,
      hidden: false
    })) || [];

    return [...baseColumns, ...dayColumns];
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) {
      setPageSize(size);
    }
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const customCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    // Рендер для товара (фото + название)
    if (dataIndex === 'product') {
      return (
        <div className={styles.productCell}>
          <img 
            src={value.photo} 
            alt="Product" 
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
        <div className={styles.chartContainer}>
          {value.slice(0, 15).map((item: ControlDataItem, index: number) => (
            <div 
              key={index}
              className={styles.chartBar}
              style={{ 
                backgroundColor: getColorForPercentage(item.percentage),
              }}
            />
          ))}
        </div>
      );
    }

    // Рендер для колонок дней
    if (dataIndex.startsWith('day_')) {
      return (
        <div 
          className={styles.percentageCell}
          style={{ backgroundColor: getColorForPercentage(value) }}
        >
          {value}%
        </div>
      );
    }

    // Обычный рендер
    return <span title={value}>{value}</span>;
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
            config={getTableColumns()}
            dataSource={prepareTableData()}
            preset="radar-table-default"
            scrollContainerRef={tableContainerRef}
            stickyHeader
            customCellRender={{
              idx: getTableColumns().map(col => col.dataIndex),
              renderer: customCellRender,
            }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: data.total_count,
              onChange: handlePageChange
            }}
            style={{ fontFamily: 'Mulish' }}
          />
        )}
      </div>
    </div>
  );
};

export default WbMetricsTable;
