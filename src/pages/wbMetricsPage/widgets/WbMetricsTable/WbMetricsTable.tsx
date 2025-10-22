import React, { useState, useEffect } from 'react';
import { Table, Pagination, ConfigProvider } from 'antd';
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
        photo: product.photo,
        name: product.name,
        chart: control_data,
        ...control_data.reduce((acc, item, index) => {
          acc[`day_${index}`] = item.percentage;
          return acc;
        }, {} as Record<string, number>)
      };
    });
  };

  const getTableColumns = () => {
    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) return [];

    const baseColumns = [
      {
        key: 'photo',
        title: 'Фото',
        dataIndex: 'photo',
        width: 80,
        fixed: 'left' as const,
        render: (photo: string) => (
          <img 
            src={photo} 
            alt="Product" 
            className={styles.productImage}
          />
        )
      },
      {
        key: 'name',
        title: 'Название',
        dataIndex: 'name',
        width: 200,
        fixed: 'left' as const,
        ellipsis: true
      },
      {
        key: 'chart',
        title: 'График',
        dataIndex: 'chart',
        width: 150,
        render: (controlData: ControlDataItem[]) => (
          <div className={styles.chartContainer}>
            {controlData.slice(0, 15).map((item, index) => (
              <div 
                key={index}
                className={styles.chartBar}
                style={{ 
                  backgroundColor: getColorForPercentage(item.percentage),
                }}
              />
            ))}
          </div>
        )
      }
    ];

    // Добавляем колонки для каждого дня (берем из первого товара)
    const dayColumns = data.data[0]?.control_data?.map((item, index) => ({
      key: `day_${index}`,
      title: formatDateHeader(item.date),
      dataIndex: `day_${index}`,
      width: 80,
      align: 'center' as const,
      render: (value: number) => (
        <div 
          className={styles.percentageCell}
          style={{ backgroundColor: getColorForPercentage(value) }}
        >
          {value}%
        </div>
      )
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

  return (
    <div className={styles.tableContainer}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#5329ff',
            colorText: '#1a1a1a',
            fontSize: 14,
            borderRadius: 8,
          },
          components: {
            Table: {
              headerBg: '#f8f9fa',
              headerColor: '#1a1a1a',
              rowHoverBg: '#f8f9fa',
            },
            Pagination: {
              itemActiveBg: '#5329ff',
              itemActiveColorDisabled: '#fff',
            },
          },
        }}
      >
        <Table
          columns={getTableColumns()}
          dataSource={prepareTableData()}
          loading={loading}
          pagination={false}
          scroll={{ x: 1200, y: 600 }}
          size="middle"
          className={styles.table}
        />
        
        {data && (
          <div className={styles.paginationContainer}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data.total_count}
              onChange={handlePageChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) => 
                `${range[0]}-${range[1]} из ${total} товаров`
              }
              pageSizeOptions={['10', '20', '50', '100']}
            />
          </div>
        )}
      </ConfigProvider>
    </div>
  );
};

export default WbMetricsTable;
