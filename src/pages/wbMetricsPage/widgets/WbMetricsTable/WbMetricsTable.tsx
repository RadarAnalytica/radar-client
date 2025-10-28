import React, { useState, useRef } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
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

  const getColorForPercentage = (percentage: number, opacity: number = 1): string => {
    if (!data) return '#f0f0f0';
    
    const { min_control_value, max_control_value } = data;
    const range = max_control_value - min_control_value;
    
    if (range === 0) return '#f0f0f0';
    
    const normalizedValue = (percentage - min_control_value) / range;
    
    const colorScale = [
      `rgba(249, 62, 62, ${opacity})`, // Красный
      `rgba(253, 107, 66, ${opacity})`,
      `rgba(254, 143, 40, ${opacity})`,
      `rgba(250, 179, 19, ${opacity})`, 
      `rgba(242, 209, 2, ${opacity})`, // Желтый
      `rgba(198, 211, 17, ${opacity})`,
      `rgba(148, 208, 44, ${opacity})`,
      `rgba(89, 212, 1, ${opacity})`,
      `rgba(28, 215, 0, ${opacity})`, // Зеленый
    ];
    
    const colors = metricType === 'drr' ? [...colorScale].reverse() : colorScale;
    const index = Math.min(Math.floor(normalizedValue * colors.length), colors.length - 1);
    return colors[index];
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

    return data.data.map((item: any) => {
      const { product, control_data } = item;
      
      return {
        key: product.wb_id,
        product: {
          wb_id: product.wb_id,
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
    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) return [];

    const baseColumns = [
      {
        key: 'product',
        title: 'Товар',
        dataIndex: 'product',
        width: 280,
        fixed: true,
        sortable: true,
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

  const handlePageChange = (page: number) => {
    setPageData({ ...pageData, page: page });
  };

  const customCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    // Рендер для товара (фото + название)
    if (dataIndex === 'product') {
      return (
        <div className={styles.productCell} data-id={value.wb_id}>
          <img 
            src={value.photo}
            alt={value.name}
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
      const chartData = value.slice(-15); // Последние 15 дней
      
      const chartConfig = {
        labels: chartData.map((item: ControlDataItem) => {
          const date = new Date(item.date);
          return `${date.getDate()}.${date.getMonth() + 1}`;
        }),
        datasets: [
          {
            label: metricType === 'drr' ? 'ДРР %' : 'СПП %',
            data: chartData.map((item: ControlDataItem) => item.percentage),
            backgroundColor: chartData.map((item: ControlDataItem) => 
              getColorForPercentage(item.percentage, 0.8)
            ),
            borderColor: chartData.map((item: ControlDataItem) => 
              getColorForPercentage(item.percentage, 1)
            ),
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return `${context.dataset.label}: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
        elements: {
          bar: {
            borderWidth: 0,
          }
        },
        datasets: {
          bar: {
            categoryPercentage: 1.0,
            barPercentage: 0.8,
            borderRadius: 2,
          }
        },
      };

      return (
        <div className={styles.chartContainer}>
          <Bar data={chartConfig} options={options} />
        </div>
      );
    }

    // Рендер для колонок дней
    if (dataIndex.startsWith('day_')) {
      return (
        <div 
          className={styles.percentageCell}
          style={{ backgroundColor: getColorForPercentage(value, 0.2) }}
        >
          {value !== undefined ? `${value}%` : '-'}
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
            dataSource={(sortState.sort_field === undefined || sortState.sort_order === undefined) ? [...prepareTableData()] : [...prepareTableData()].sort((a, b) => {
              if (a.product.name.localeCompare(b.product.name) > 0) {
                return sortState.sort_order === 'ASC' ? 1 : -1;
              } else {
                return sortState.sort_order === 'ASC' ? -1 : 1;
              }
            })}
            preset="radar-table-default"
            scrollContainerRef={tableContainerRef}
            stickyHeader
            customCellRender={{
              idx: getTableColumns().map(col => col.dataIndex),
              renderer: customCellRender,
            }}
            onSort={(sort_field, sort_order) => setSortState({ sort_field, sort_order })}
            pagination={{
              current: pageData.page,
              pageSize: pageData.per_page,
              total: pageData.total_count,
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
