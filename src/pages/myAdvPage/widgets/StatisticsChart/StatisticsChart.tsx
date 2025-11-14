import React, { useState, useEffect } from 'react';
import { ConfigProvider, Segmented } from 'antd';
import { Chart } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
  Filler,
  BarController,
  PointElement,
  BarElement,
  LineElement,
  LineController,
  Tooltip,
} from 'chart.js';
import { RadarLoader } from '@/shared';
import { CompanyData } from '../../data/mockData';
import styles from './StatisticsChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Filler,
  BarController,
  PointElement,
  BarElement,
  LineController,
  LineElement,
  Tooltip
);

interface StatisticsChartProps {
  data: CompanyData | null;
  loading?: boolean;
}

const tabs = ['Линейные', 'Воронка'];

const theme = {
  token: {
    fontSize: '18px',
  },
  components: {
    Segmented: {
      itemActiveBg: '#E7E1FE',
      itemSelectedBg: '#E7E1FE',
      trackBg: 'transparent',
      itemColor: '#1A1A1A80',
      itemHoverBg: 'transparent',
      itemHoverColor: '#1A1A1A',
      itemSelectedColor: '#1A1A1A',
      trackPadding: 0,
    },
  },
};

const StatisticsChart: React.FC<StatisticsChartProps> = ({ data, loading = false }) => {
  const [activeTab, setActiveTab] = useState<string>('Линейные');
  const [chartData, setChartData] = useState<any>(null);

  // Генерируем тестовые данные для графика на основе данных компании
  useEffect(() => {
    if (data) {
      // Генерируем данные за последние 7 дней
      const labels = [];
      const viewsData = [];
      const clicksData = [];
      const cartData = [];
      const ordersData = [];

      const baseViews = data.views;
      const baseClicks = data.clicks;
      const baseCart = data.cart;
      const baseOrders = data.orders;

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const month = monthNames[date.getMonth()];
        labels.push(`${day} ${month}`);

        // Генерируем данные с небольшими вариациями
        const variation = 0.8 + Math.random() * 0.4; // от 80% до 120%
        viewsData.push(Math.round(baseViews / 7 * variation));
        clicksData.push(Math.round(baseClicks / 7 * variation));
        cartData.push(Math.round(baseCart / 7 * variation));
        ordersData.push(Math.round(baseOrders / 7 * variation));
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Просмотры',
            type: 'line',
            backgroundColor: 'rgba(83, 41, 255, 0.1)',
            borderColor: '#5329FF',
            borderWidth: 2,
            pointRadius: 4,
            pointBorderColor: 'white',
            pointBackgroundColor: '#5329FF',
            fill: false,
            data: viewsData,
            yAxisID: 'y',
          },
          {
            label: 'Клики',
            type: 'line',
            backgroundColor: 'rgba(240, 173, 0, 0.1)',
            borderColor: '#F0AD00',
            borderWidth: 2,
            pointRadius: 4,
            pointBorderColor: 'white',
            pointBackgroundColor: '#F0AD00',
            fill: false,
            data: clicksData,
            yAxisID: 'y',
          },
          {
            label: 'Корзина',
            type: 'bar',
            backgroundColor: 'rgba(0, 182, 155, 0.6)',
            borderColor: '#00B69B',
            borderWidth: 0,
            borderRadius: 8,
            data: cartData,
            yAxisID: 'y',
          },
          {
            label: 'Заказы',
            type: 'bar',
            backgroundColor: 'rgba(249, 60, 101, 0.6)',
            borderColor: '#F93C65',
            borderWidth: 0,
            borderRadius: 8,
            data: ordersData,
            yAxisID: 'y',
          },
        ],
      });
    }
  }, [data]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            family: 'Mulish',
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          font: {
            family: 'Mulish',
            size: 12,
          },
          color: '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Mulish',
            size: 12,
          },
          color: '#6B7280',
        },
      },
    },
  };

  // Данные для воронки
  const funnelData = data
    ? [
        { label: 'Просмотры', value: data.views, percentage: 100 },
        { label: 'Клики', value: data.clicks, percentage: (data.clicks / data.views) * 100 },
        { label: 'Корзина', value: data.cart, percentage: (data.cart / data.views) * 100 },
        { label: 'Заказы', value: data.orders, percentage: (data.orders / data.views) * 100 },
        {
          label: 'Прогноз выкупа',
          value: data.forecast_purchase_qty,
          percentage: (data.forecast_purchase_qty / data.views) * 100,
        },
      ]
    : [];

  const maxFunnelValue = funnelData.length > 0 ? funnelData[0].value : 0;

  return (
    <div className={styles.chart}>
      <div className={styles.chart__header}>
        <p className={styles.chart__title}>Статистика</p>
        <ConfigProvider theme={theme}>
          <Segmented size="large" options={tabs} value={activeTab} onChange={handleTabChange} />
        </ConfigProvider>
      </div>

      <div className={styles.chart__content}>
        {loading ? (
          <RadarLoader loaderStyle={{ height: '300px' }} />
        ) : (
          <>
            {activeTab === 'Линейные' && chartData && (
              <Chart type="bar" data={chartData} options={chartOptions} />
            )}

            {activeTab === 'Воронка' && (
              <div className={styles.funnel}>
                {funnelData.map((item, index) => {
                  const width = (item.value / maxFunnelValue) * 100;
                  return (
                    <div key={index} className={styles.funnel__item}>
                      <div className={styles.funnel__label}>
                        <span className={styles.funnel__labelText}>{item.label}</span>
                        <span className={styles.funnel__value}>
                          {new Intl.NumberFormat('ru-RU').format(item.value)}
                        </span>
                        <span className={styles.funnel__percentage}>
                          {item.percentage.toFixed(2)}%
                        </span>
                      </div>
                      <div className={styles.funnel__barWrapper}>
                        <div
                          className={styles.funnel__bar}
                          style={{
                            width: `${width}%`,
                            backgroundColor: `hsl(${220 - index * 20}, 70%, ${60 - index * 5}%)`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticsChart;

