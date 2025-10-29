import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getColorForPercentage } from './utils';
import styles from './WbMetricsTable.module.css';

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

const CHART_DAYS = 15;
const MIN_VISIBLE_PERCENTAGE = 0.015; // 1.5% от высоты графика
const SCALE_MULTIPLIER = 2;
const MIN_MAX_VALUE = 0.5;

const MetricChart: React.FC<MetricChartProps> = ({
  data,
  metricType,
  minControlValue,
  maxControlValue,
}) => {
  const prepareChartData = (): ControlDataItem[] => {
    let chartData = [...data];

    // Дополняем до 15 элементов, если данных меньше
    if (chartData.length < CHART_DAYS) {
      const missingCount = CHART_DAYS - chartData.length;
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

    return chartData.slice(-CHART_DAYS);
  };

  const calculateScaleParams = (chartData: ControlDataItem[]) => {
    const validPercentages = chartData
      .map(item => item.percentage)
      .filter((p): p is number => p !== null && p !== undefined && typeof p === 'number');

    const averagePercentage = validPercentages.length > 0
      ? validPercentages.reduce((sum, val) => sum + val, 0) / validPercentages.length
      : 50;

    const maxYValue = Math.max(averagePercentage * SCALE_MULTIPLIER, MIN_MAX_VALUE);
    const minVisibleValue = maxYValue * MIN_VISIBLE_PERCENTAGE;

    return { maxYValue, minVisibleValue };
  };

  const chartData = prepareChartData();
  const { maxYValue, minVisibleValue } = calculateScaleParams(chartData);

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
          return Math.max(item.percentage, minVisibleValue);
        }),
        backgroundColor: chartData.map(item =>
          item.percentage === null || item.percentage === undefined
            ? 'rgba(240, 240, 240, 0.8)'
            : getColorForPercentage(item.percentage, minControlValue, maxControlValue, metricType, 0.8)
        ),
        borderColor: chartData.map(item =>
          item.percentage === null || item.percentage === undefined
            ? 'rgba(240, 240, 240, 1)'
            : getColorForPercentage(item.percentage, minControlValue, maxControlValue, metricType, 1)
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const originalValue = chartData[context.dataIndex]?.percentage;
            if (originalValue === null || originalValue === undefined) {
              return `${context.dataset.label}: нет данных`;
            }
            return `${context.dataset.label}: ${originalValue}%`;
          },
        },
      },
    },
    scales: {
      x: { display: false },
      y: {
        display: false,
        min: 0,
        max: maxYValue,
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

