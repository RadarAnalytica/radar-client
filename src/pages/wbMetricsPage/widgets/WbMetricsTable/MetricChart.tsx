import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getColorForPercentage } from './utils';
import styles from './WbMetricsTable.module.css';
import { getRGBA } from '@/service/utils';

interface ControlDataItem {
  date: string;
  percentage: number | null;
}

interface MetricChartProps {
  data: ControlDataItem[];
  metricType: 'drr' | 'spp';
  minControlValue: number;
  maxControlValue: number;
}

const MIN_CHART_DAYS = 14;
const MIN_VISIBLE_PERCENTAGE = 0.015; // 1.5% от высоты графика

const MetricChart: React.FC<MetricChartProps> = ({
  data,
  metricType,
  minControlValue,
  maxControlValue,
}) => {
  const prepareChartData = (): ControlDataItem[] => {
    let chartData = [...data];

    // Дополняем до 15 элементов, если данных меньше
    if (chartData.length < MIN_CHART_DAYS) {
      const missingCount = MIN_CHART_DAYS - chartData.length;
      const startDate = chartData.length > 0
        ? new Date(chartData[chartData.length - 1].date)
        : new Date();

      for (let i = 1; i <= missingCount; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        chartData.push({
          date: currentDate.toISOString().split('T')[0],
          percentage: null,
        });
      }
    }

    return chartData.slice(0, MIN_CHART_DAYS);
  };

  const chartData = prepareChartData();
  const minPercentage = maxControlValue * MIN_VISIBLE_PERCENTAGE;

  // Создаем массив цветов для каждого bar
  const barColors = chartData.map(item => {
    if (!item?.percentage) return { top: 'rgba(240, 240, 240, 0.8)', bottom: 'rgba(240, 240, 240, 0.8)' };
    
    const color = getColorForPercentage(item.percentage, minControlValue, maxControlValue, metricType, true);
    const topColor = color || '#F0F0F0';
    const bottomColor = getRGBA(topColor, 0.6);
    return { top: topColor, bottom: bottomColor };
  });

  const chartConfig = {
    labels: chartData.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()}.${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: metricType === 'drr' ? 'ДРР %' : 'СПП %',
        data: chartData.map(item => {
          if (item.percentage === null || item.percentage === undefined) return null;
          return Math.max(item.percentage, minPercentage);
        }),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          
          if (!chartArea) {
            return barColors[context.dataIndex]?.top || 'rgba(240, 240, 240, 0.8)';
          }
          
          const colorConfig = barColors[context.dataIndex];
          if (!colorConfig) return 'rgba(240, 240, 240, 0.8)';
          
          // Проверяем, что цвета валидны
          const topColor = colorConfig.top || 'rgba(240, 240, 240, 0.8)';
          const bottomColor = colorConfig.bottom || 'rgba(240, 240, 240, 0.8)';
          
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          
          gradient.addColorStop(0, topColor);
          gradient.addColorStop(1, bottomColor);
          
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: {
        display: false,
        beginAtZero: true,
        min: 0,
        max: maxControlValue,
      },
    },
    elements: {
      bar: { borderWidth: 0 },
    },
    datasets: {
      bar: {
        categoryPercentage: 1.0,
        barPercentage: 0.8,
        borderRadius: 2,
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Bar data={chartConfig} options={options} />
    </div>
  );
};

export default MetricChart;

