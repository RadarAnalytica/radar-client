import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import type { Chart } from 'chart.js';
import { formatPrice } from '@/service/utils';
// import { getColorForPercentage } from './utils';
// import styles from './WbMetricsTable.module.css';

interface ControlDataItem {
  date: string;
  comparison_percentage?: number | null;
  value?: number;
  item: number;
}

interface MetricChartProps {
  data: ControlDataItem[];
  minControlValue: number;
  maxControlValue: number;
  barsColor?: string
}

const MIN_CHART_DAYS = 14;
const MIN_VISIBLE_PERCENTAGE = 0.015; // 1.5% от высоты графика

export const TableChart: React.FC<MetricChartProps> = ({
  data,
  minControlValue,
  maxControlValue,
  barsColor = '#5329FF'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const hideTooltipTimeoutRef = useRef<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    display: boolean;
    x: number;
    y: number;
    title: string;
    comparison_percentage: number | null;
    alignLeft: boolean;
  }>({
    display: false,
    x: 0,
    y: 0,
    title: '',
    comparison_percentage: null,
    alignLeft: false,
  });

  const formatDateShort = (dateInput: string) => {
    const date = new Date(dateInput);
    const day = date.getDate();
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    return `${day} ${months[date.getMonth()]}`;
  };
//   const prepareChartData = (): ControlDataItem[] => {
//     let chartData = [...data];

//     // Дополняем до 15 элементов, если данных меньше
//     if (chartData.length < MIN_CHART_DAYS) {
//       const missingCount = MIN_CHART_DAYS - chartData.length;
//       const startDate = chartData.length > 0
//         ? new Date(chartData[chartData.length - 1].date)
//         : new Date();

//       for (let i = 1; i <= missingCount; i++) {
//         const currentDate = new Date(startDate);
//         currentDate.setDate(currentDate.getDate() + i);
//         chartData.push({
//           date: currentDate.toISOString().split('T')[0],
//           percentage: null,
//         });
//       }
//     }

//     return chartData.slice(0, MIN_CHART_DAYS);
//   };

//   const chartData = prepareChartData();
  const minPercentage = maxControlValue * MIN_VISIBLE_PERCENTAGE;

  const chartConfig = {
    labels: data?.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()}.${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: 'chart data',
        type: 'bar' as const,
        data: data?.map(item => {
          if (item.item === null || item.item === undefined || item.item === 0) return null;
          return Math.max(item.item, minPercentage);
        }),
        backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
                return null;
            }
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, barsColor);
            gradient.addColorStop(0.7, `${barsColor}80`);

            return gradient;
        },
        maxBarThickness: 4,
        minBarThickness: 4,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: 'white',
      },
      {
        label: 'comparison_percentage',
        type: 'bar' as const,
        data: data?.map(item => {
          return item.comparison_percentage !== undefined && item.comparison_percentage !== null
            ? item.comparison_percentage
            : null;
        }),
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        maxBarThickness: 0,
        minBarThickness: 0,
        barThickness: 0,
        hidden: true, // Скрываем датасет на графике
      },
    ],
  };

  // Плагин для внешнего тултипа
  const externalTooltipPlugin = {
    id: 'externalTooltip',
    afterEvent: (chart: Chart, args: any) => {
      const { event, replay } = args;
      if (replay) return;
      
      // Очищаем предыдущий таймер
      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current);
        hideTooltipTimeoutRef.current = null;
      }
      
      // Обрабатываем события выхода мыши
      if (event.type === 'mouseout' || event.type === 'mouseleave') {
        setTooltip(prev => ({ ...prev, display: false }));
        return;
      }
      
      // Пропускаем события, которые не связаны с мышью
      if (event.type !== 'mousemove' && event.type !== 'mouseenter') {
        return;
      }
      
      const canvasPosition = chart.canvas.getBoundingClientRect();
      const activeElements = chart.getElementsAtEventForMode(
        event,
        'index',
        { intersect: false },
        true
      );

      if (activeElements.length > 0) {
        const element = activeElements[0];
        const index = element.index;
        const item = data && data[index];

        if (item) {
          
          const title = formatDateShort(item.date);
          
          // Получаем comparison_percentage напрямую из исходных данных
          const comparison_percentage = 
            item.comparison_percentage !== undefined && item.comparison_percentage !== null
              ? item.comparison_percentage
              : null;
          
          // Проверяем, достаточно ли места справа от курсора
          const tooltipWidth = 150; // Примерная ширина тултипа
          const mouseX = canvasPosition.left + event.x;
          const screenWidth = window.innerWidth;
          const spaceOnRight = screenWidth - mouseX;
          const alignLeft = spaceOnRight < tooltipWidth + 20;
          
          setTooltip({
            display: true,
            x: alignLeft 
              ? mouseX - 10 // Слева от курсора
              : mouseX + 10, // Справа от курсора
            y: canvasPosition.top + event.y - 10,
            title,
            comparison_percentage: item?.item,
            alignLeft,
          });
        }
      } else {
        // Если нет активных элементов, устанавливаем таймер для скрытия тултипа
        // Это помогает в случаях, когда событие mouseleave не срабатывает
        hideTooltipTimeoutRef.current = setTimeout(() => {
          setTooltip(prev => ({ ...prev, display: false }));
        }, 100);
      }
    },
  };

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current);
      }
    };
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false, // Отключаем встроенный тултип
      },
    },
    scales: {
      x: { display: false },
      y: {
        display: false,
        beginAtZero: true,
        min: 0,
        //max: maxControlValue,
      },
    },
    elements: {
      bar: { borderWidth: 0 },
    },
    datasets: {
      bar: {
        categoryPercentage: 1,
        barPercentage: 4,
        borderRadius: 0,
      },
    },
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseLeave={() => {
          if (hideTooltipTimeoutRef.current) {
            clearTimeout(hideTooltipTimeoutRef.current);
          }
          setTooltip(prev => ({ ...prev, display: false }));
        }}
        style={{
          width: '100px',
          height: '100%',
          maxHeight: '40px',
          position: 'relative',
        }} 
      >
        <Bar 
          data={chartConfig} 
          options={options} 
          plugins={[externalTooltipPlugin]}
          ref={(ref) => {
            chartRef.current = ref;
          }}
        />
      </div>
      {tooltip.display && (
        <div
          style={{
            position: 'fixed',
            ...(tooltip.alignLeft 
              ? { right: `${window.innerWidth - tooltip.x}px` }
              : { left: `${tooltip.x}px` }
            ),
            top: `${tooltip.y}px`,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#E0E0E0',
            borderRadius: 8,
            padding: 8,
            pointerEvents: 'none',
            zIndex: 10000,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            minWidth: '120px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              color: '#8C8C8C', 
              fontSize: '12px',
              whiteSpace: 'nowrap',
            }}>
              {tooltip.title}
            </div>
            {tooltip.comparison_percentage !== null && 
             tooltip.comparison_percentage !== undefined ? (
                <span style={{fontSize: '12px'}}>{formatPrice(tooltip?.comparison_percentage, ' ')}</span>
            ) : (
              <div style={{ color: '#1A1A1A', fontSize: '12px' }}>
                Нет данных
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};


