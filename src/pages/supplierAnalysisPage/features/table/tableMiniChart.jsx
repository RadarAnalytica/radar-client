import React, { useMemo, memo, useCallback } from "react"
import styles from './tableMiniChart.module.css'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);



const TableMiniChart = memo(({ data, color }) => {

    // Мемоизируем нормализованные данные
    const normilizedChartData = useMemo(() => {
        if (!data) return null;
        
        return {
            labels: data.map(i => moment(i.date).format('DD.MM.YY')),
            datasets: [
                {
                    label: 'Динамика выручки',
                    type: 'bar',
                    data: data.map(i => i.item),
                    yAxisID: 'y',
                    xAxisID: 'x',
                    tension: 0.4,
                    backgroundColor: function (context) {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) return null;

                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0.5, color);
                        gradient.addColorStop(1, `${color}50`);

                        return gradient;
                    },
                }
            ]
        };
    }, [data, color]);

    // Мемоизируем chartOptions чтобы избежать пересоздания объекта при каждом рендере
    const chartOptions = useMemo(() => ({
        responsive: true,
        maxBarThickness: 10,
        maintainAspectRatio: false,
        animation: false, // Отключаем анимации для лучшей производительности
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                intersect: false,
                mode: 'index',
                axis: 'x',
                callbacks: {},
            },
        },
        scales: {
            x: {
                display: false
            },
            y: {
                type: 'linear',
                display: false,
                position: 'right',
            },
        },
    }), []);

    // Мемоизируем функцию рендера графика
    const renderChart = useCallback(() => {
        if (!normilizedChartData) return null;
        
        return (
            <Bar
                data={normilizedChartData}
                options={chartOptions}
            />
        );
    }, [normilizedChartData, chartOptions]);

    return (
        <div className={styles.miniChart__wrapper}>
            {renderChart()}
        </div>
    )
}, (prevProps, nextProps) => {
    // Кастомная функция сравнения для более точного контроля над ре-рендерами
    return (
        prevProps.data === nextProps.data &&
        prevProps.color === nextProps.color
    );
});

// Создаем дополнительно оптимизированную версию для использования в ячейках таблицы
export const TableCellChart = memo(({ data, color }) => {
    // Дополнительная проверка для предотвращения рендера пустых графиков
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div className={styles.miniChart__wrapper} />;
    }

    return <TableMiniChart data={data} color={color} />;
}, (prevProps, nextProps) => {
    // Более строгое сравнение для ячеек таблицы
    if (!prevProps.data && !nextProps.data) return true;
    if (!prevProps.data || !nextProps.data) return false;
    
    return (
        prevProps.data.length === nextProps.data.length &&
        prevProps.color === nextProps.color &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
    );
});

export default TableMiniChart;