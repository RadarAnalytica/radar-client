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
import { ChartControls } from '../../features';
import { chartCompareConfigObject } from '../../shared';
import { verticalDashedLinePlugin, formatPrice, formatNumberWithSpaces } from '@/service/utils';
import styles from './StatisticsChart.module.css';

// Интерфейс для элемента date_data
interface DateDataItem {
  date?: string;
  company_name?: string;
  views?: number;
  clicks?: number;
  cart?: number;
  orders?: number;
  advert_funnel?: {
    cart?: number;
    orders?: number;
    order_item_count?: number;
    expected_purchase?: number;
    [key: string]: unknown;
  };
  advert_statistics?: {
    views?: number;
    clicks?: number;
    cpc?: number;
    avg_cpm?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// Интерфейс для dataset графика
interface ChartDataset {
  label: string;
  type: 'line';
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  pointRadius: number;
  pointBorderColor: string;
  pointBackgroundColor: string;
  fill: boolean;
  data: number[];
  yAxisID: string;
}

// Расширенный интерфейс для данных графика
interface ChartDataProps extends Partial<CompanyData> {
  children?: DateDataItem[];
  date_data?: DateDataItem[];
  views?: number;
  clicks?: number;
  cart?: number;
  orders?: number;
  forecast_purchase_qty?: number;
  advert_funnel?: {
    cart?: number;
    orders?: number;
    expected_purchase?: number;
    [key: string]: unknown;
  };
  advert_statistics?: {
    views?: number;
    clicks?: number;
    [key: string]: unknown;
  };
  summary_data?: {
    advert_funnel?: {
      view_order?: number;
      view_click?: number;
      cart_order?: number;
      orders?: number;
      expected_purchase?: number;
      [key: string]: unknown;
    };
    advert_statistics?: {
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  Filler,
  BarController,
  PointElement,
  BarElement,
  LineController,
  LineElement,
  Tooltip,
  verticalDashedLinePlugin
);

// Кастомный tooltip по подобию mainChartWidget
const getChartTooltip = (context: any, chartData: any) => {
  let tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';
    tooltipEl.classList.add('custom-tooltip');
    document.body.appendChild(tooltipEl);
  }

  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = '0';
    tooltipEl.style.visibility = 'hidden';
    return;
  }

  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  if (tooltipModel.body) {
    const datasets = chartData?.datasets?.filter((obj: any) => obj.data?.length > 0)?.reverse();
    const datalabels = chartData?.labels;
    const targetIndex = datalabels?.indexOf(tooltipModel.title[0]);
    const titleLines = tooltipModel.title || [];

    let innerHtml = '<thead>';
    titleLines.forEach(function (title: string) {
      innerHtml += '<tr><th style="color: silver; font-weight: 400;">' + title?.split(',').join(' ') + '</th></tr>';
    });
    innerHtml += '</thead><tbody>';

    datasets?.forEach(function (set: any) {
      // Используем borderColor для яркого цвета квадратика
      const targetColor = set.borderColor || set.backgroundColor;
      const config = chartCompareConfigObject.find(_ => _.ruName === set.label);
      const units = config?.units || '';
      const value = set?.data[targetIndex] || '0';
      const span =
        '<span style="display: inline-block; width: 12px; height: 12px; border-radius: 2px; background-color: ' +
        targetColor +
        '; margin-right: 8px; vertical-align: middle;"></span><span style="vertical-align: middle;">' +
        set?.label +
        ':  <span style="font-weight: bold;">' +
        formatPrice(value, units) +
        '</span></span>';
      innerHtml += '<tr><td style="padding: 0;">' + span + '</td></tr>';
    });
    innerHtml += '</tbody>';

    const tableRoot = tooltipEl.querySelector('table');
    if (tableRoot) tableRoot.innerHTML = innerHtml;
  }

  const position = context.chart.canvas.getBoundingClientRect();
  let tooltipLeft = position.left + tooltipModel.caretX;
  let tooltipTop = position.top + tooltipModel.caretY;

  tooltipEl.style.display = 'block';
  const tooltipWidth = tooltipEl.offsetWidth + 300;
  const tooltipHeight = tooltipEl.offsetHeight;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 5;

  if (tooltipLeft + tooltipWidth + margin > viewportWidth) {
    tooltipLeft = viewportWidth - (tooltipWidth / 1.5) - margin;
  } else if (tooltipLeft - margin < 0) {
    tooltipLeft = margin;
  }

  if (tooltipTop + tooltipHeight + margin > viewportHeight) {
    tooltipTop = viewportHeight - tooltipHeight - margin;
  } else if (tooltipTop - margin < 0) {
    tooltipTop = margin;
  }

  tooltipLeft += window.scrollX;
  tooltipTop += window.scrollY;

  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = Math.round(tooltipLeft) + 'px';
  tooltipEl.style.top = Math.round(tooltipTop) + 'px';
  tooltipEl.style.minWidth = '250px';
  tooltipEl.style.maxWidth = '300px';
  tooltipEl.style.opacity = '1';
  tooltipEl.style.visibility = 'visible';
  tooltipEl.style.transition = 'all 0.2s ease';
  tooltipEl.style.backgroundColor = 'white';
  tooltipEl.style.borderRadius = '8px';
  tooltipEl.style.boxShadow = '0px 0px 20px 0px #00000014';
  tooltipEl.style.padding = '1rem';
  tooltipEl.style.pointerEvents = 'none';
  tooltipEl.style.zIndex = '1000';
};

interface StatisticsChartProps {
  data: ChartDataProps | null;
  loading?: boolean;
}

const tabs = ['Линейные', 'Воронка'];

const theme = {
  token: {
    fontSize: 18,
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
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: ChartDataset[] } | null>(null);
  const [showChart, setShowChart] = useState<boolean>(true);
  const [chartControls, setChartControls] = useState(
    chartCompareConfigObject.filter(_ => _.isControl).map(_ => ({ ..._, isActive: _.defaultActive }))
  );
  const funnelData = data?.funnel_chart_data || {};

  // Используем данные из массива date_data
  useEffect(() => {
    if (data && chartControls) {
      // Получаем массив date_data из data.children или data.date_data
      const dateDataArray = data.children || data.date_data || [];
      
      if (!dateDataArray || dateDataArray.length === 0) {
        setChartData(null);
        setShowChart(false);
        return;
      }

      // Сортируем данные по дате (от старых к новым)
      const sortedDateData = [...dateDataArray].sort((a, b) => {
        const dateA = new Date(a.date || a.company_name).getTime();
        const dateB = new Date(b.date || b.company_name).getTime();
        return dateA - dateB;
      });

      // Форматируем даты для оси X
      const labels = sortedDateData.map(item => {
        const date = new Date(item.date || item.company_name);
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
      });

      // Создаем datasets для всех активных метрик
      const datasets = chartControls
        .filter(control => control.isOnChart && control.isActive)
        .map(control => {
          let dataValues: number[] = [];

          // Извлекаем данные из date_data для каждой метрики
          sortedDateData.forEach(item => {
            let value = 0;

            // Сначала проверяем advert_statistics, затем advert_funnel, затем корневой уровень
            if (item.advert_statistics && item.advert_statistics[control.engName] !== undefined) {
              const statValue = item.advert_statistics[control.engName];
              value = typeof statValue === 'number' ? statValue : 0;
            } else if (item.advert_funnel && item.advert_funnel[control.engName] !== undefined) {
              const funnelValue = item.advert_funnel[control.engName];
              value = typeof funnelValue === 'number' ? funnelValue : 0;
            } else if (item[control.engName] !== undefined) {
              const itemValue = item[control.engName];
              value = typeof itemValue === 'number' ? itemValue : 0;
            }

            dataValues.push(value);
          });

          return {
            label: control.ruName,
            type: 'line' as const,
            backgroundColor: `${control.color}1A`,
            borderColor: control.color,
            borderWidth: 2,
            pointRadius: 4,
            pointBorderColor: 'white',
            pointBackgroundColor: control.color,
            fill: false,
            data: dataValues,
            yAxisID: 'y',
            tension: 0.4,
          };
        });

      setChartData({
        labels,
        datasets,
      });
    }
  }, [data, chartControls]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        intersect: false,
        mode: 'index' as const,
        axis: 'x' as const,
        external: (context: any) => { getChartTooltip(context, chartData); }
      },
      verticalDashedLine: { enabled: true }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
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
  const funnelChartData = [
    { label: 'Просмотры', value: funnelData?.views || 0, units: '' },
    { label: 'Клики', value: funnelData?.clicks || 0, units: '' },
    { label: 'Корзина', value: funnelData?.cart || 0, units: 'шт' },
    { label: 'Заказы', value: funnelData?.orders || 0, units: 'шт' },
    { label: 'Прогноз выкупа', value: funnelData?.expected_purchase || 0, units: 'шт' },
  ];
  const percetageFunnelChartData = [
    { percent: funnelData?.clicks_views_conversion || 0, value1: funnelData?.clicks || 0, value2: funnelData?.views || 0 },
    { percent: funnelData?.cart_click_conversion || 0, value1: funnelData?.cart || 0, value2: funnelData?.clicks || 0 },
    { percent: funnelData?.cart_order_conversion || 0, value1: funnelData?.orders || 0, value2: funnelData?.cart || 0 },
    { percent: funnelData?.order_purchase_conversion || 0, value1: funnelData?.orders || 0, value2: funnelData?.expected_purchase || 0 },
  ];

  const trapezoids = [
    <svg key="trapezoid-0" width="588" height="80" viewBox="0 0 441 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M431.725 1L8.69302 1C3.15622 1 -0.564514 6.67706 1.6449 11.7539L20.0172 53.97C21.2379 56.7752 24.006 58.5894 27.0653 58.5894L413.353 58.5894C416.412 58.5894 419.18 56.7752 420.401 53.97L438.773 11.7539C440.982 6.67706 437.262 1 431.725 1Z" fill="#E6EEFF" stroke="white" strokeWidth="2"/>
    </svg>, // 7.35
    <svg key="trapezoid-1" width="521" height="80" viewBox="0 0 391 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M363.228 58.5894L27.0655 58.5894C24.0062 58.5894 21.2381 56.7752 20.0173 53.97L1.64511 11.7539C-0.564331 6.67705 3.15643 1 8.69324 1L381.6 1C387.137 1 390.857 6.67706 388.648 11.7539L370.276 53.97C369.055 56.7752 366.287 58.5894 363.228 58.5894Z" fill="#FFEBE3" stroke="white" strokeWidth="2"/>
    </svg>, // 6.516
    <svg key="trapezoid-2" width="516" height="88" viewBox="1 0 349 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.7259 67L317.442 67C320.502 67 323.27 65.1858 324.491 62.3807L346.523 11.7539C348.732 6.67706 345.012 1 339.475 1L12.69342 1C7.15662 1 3.435883 6.67706 5.64529 11.7539L27.6778 62.3807C28.8986 65.1858 31.6666 67 34.7259 67Z" fill="#EBE6FF" stroke="white" strokeWidth="2"/>
    </svg>, // 5.682
    <svg key="trapezoid-3" width="377" height="82" viewBox="0 0 283 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M254.826 60.5L27.8976 60.5C24.8383 60.5 22.0703 58.6858 20.8495 55.8807L1.64572 11.7539C-0.563721 6.67706 3.15701 1 8.69385 1L274.03 1C279.566 1 283.287 6.67706 281.078 11.7539L261.874 55.8807C260.653 58.6858 257.885 60.5 254.826 60.5Z" fill="#FFF3D8" stroke="white" strokeWidth="2"/>
    </svg>, // 4.848
    <svg key="trapezoid-4" width="308" height="82" viewBox="0 0 231 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M203.115 60.3213L27.8189 60.3213C24.7597 60.3213 21.9916 58.5071 20.7708 55.702L1.64488 11.7539C-0.56456 6.67706 3.15617 1 8.69299 1L222.241 1C227.777 1 231.498 6.67706 229.289 11.7539L210.163 55.702C208.942 58.5071 206.174 60.3213 203.115 60.3213Z" fill="#DBF7E9" stroke="white" strokeWidth="2"/>
    </svg>,
  ];

  if (!showChart) {
    return null;
  }

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chart__header}>
        <h4 className={styles.chart__title}>Графики статистики</h4>
        <ConfigProvider theme={theme}>
          <Segmented size="large" options={tabs} value={activeTab} onChange={handleTabChange} />
        </ConfigProvider>
      </div>

      <div className={styles.chart}>
        {activeTab === 'Линейные' && (
          <ChartControls
            chartControls={chartControls}
            setChartControls={setChartControls}
          />
        )}
        <div className={styles.chart__content}>
          {loading ? (
            <RadarLoader loaderStyle={{ height: '300px' }} />
          ) : (
            <>
              {activeTab === 'Линейные' && chartData && (
                <Chart 
                  type="line" 
                  data={chartData} 
                  options={chartOptions}
                  width={100}
                  height={40}
                />
              )}

              {activeTab === 'Воронка' && (
                <div className={styles.funnel}>
                  {funnelChartData.map((item, index) => {
                    return (
                      <div key={index} className={`${styles.funnel__item} ${styles[`funnel__item-${index}`]}`}>
                        <div className={styles.funnel__content}>
                          {trapezoids[index]}
                          <div className={styles.funnel__text}>
                            <span className={styles.funnel__labelText}>{item.label}</span>
                            <span className={styles.funnel__value}>
                              {new Intl.NumberFormat('ru-RU').format(item.value)} {item.units}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className={styles.funnel__percentageInfo}>
                    {percetageFunnelChartData.map((item, index) => {
                      return (
                        <div key={index} className={styles.funnel__percentageItemWrapper}>
                          <div className={styles.funnel__percentageItem}>
                            <span className={styles.funnel__percentagePercent}>{item.percent}%</span>
                            <div className={styles.funnel__percentageValueWrapper}>
                              <span className={styles.funnel__percentageValue1}>{formatNumberWithSpaces(item.value1)}</span>
                              <span className={styles.funnel__percentageSeparator}>/</span>
                              <span className={styles.funnel__percentageValue2}>{formatNumberWithSpaces(item.value2)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;

