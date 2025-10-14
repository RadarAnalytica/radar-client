import styles from './storageRevenueChartBlock.module.css';
import { Bar } from 'react-chartjs-2';
import { processRevenueData } from '../blockUtils';
import { useState, useMemo } from 'react';

const ITEMS_PER_PAGE = 15;

const StorageRevenueChartBlock = ({ dataDashBoard, loading }) => {
    //data.revenueByWarehouse
    const [currentPage, setCurrentPage] = useState(0);

    // Обработка и сортировка данных
    const { sortedData, totalPages, maxRevenue } = useMemo(() => {
        if (!dataDashBoard?.revenueByWarehouse?.length) {
            return { sortedData: [], totalPages: 0, maxRevenue: 0 };
        }

        // Сортируем по выручке (от большего к меньшему)
        const sorted = [...dataDashBoard.revenueByWarehouse].sort((a, b) => b.revenue - a.revenue);

        // Вычисляем максимум для всего массива один раз
        const max = Math.ceil(Math.max(...sorted.map(item => item.revenue)) / 1000) * 1000;

        return {
            sortedData: sorted,
            totalPages: Math.ceil(sorted.length / ITEMS_PER_PAGE),
            maxRevenue: max
        };
    }, [dataDashBoard?.revenueByWarehouse]);

    // Получаем данные для текущей страницы
    const { labels, dataRevenueStorage } = useMemo(() => {
        const startIndex = currentPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageData = sortedData.slice(startIndex, endIndex);

        // Обрабатываем только данные для текущей страницы
        const labels = pageData.map(item => item.name);
        const dataRevenueStorage = pageData.map(item => item.revenue);

        return { labels, dataRevenueStorage };
    }, [sortedData, currentPage]);


    // Обработчики навигации
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Выручка по складам',
                data: dataRevenueStorage,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, 0, chartArea.right, 0);
                    gradient.addColorStop(1, '#5329FF');
                    gradient.addColorStop(0, '#5329FF80');
                    return gradient;
                },
                borderRadius: 3,
                barThickness: 'flex', // Автоматическая регулировка высоты
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Выручка по складам' },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: 'black',
                formatter: function (value) {
                    return value.toLocaleString('ru-RU') + ' ₽';
                },
                font: { weight: 'bold', size: 12 },
                offset: 10,
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#fff',
                titleColor: '#000',
                bodyColor: '#000',
                borderColor: '#ccc',
                borderWidth: 1,
                cornerRadius: 6,
                padding: 10,
                external: function (context) {
                    const tooltip = context.tooltip;
                    const chartCanvas = context.chart.canvas;

                    if (tooltip.opacity === 0) {
                        chartCanvas.style.cursor = 'default';
                        return;
                    }

                    chartCanvas.style.cursor = 'pointer';
                },
                callbacks: {
                    label: function (context) {
                        return context.raw.toLocaleString('ru-RU') + ' ₽';
                    },
                },
            },
            verticalDashedLine: { enabled: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                barPercentage: 0.5,
                categoryPercentage: 0.9,
                grid: { display: false },
                ticks: {
                    maxRotation: 45,
                    minRotation: 0,
                    autoSkip: false,
                    autoSkipPadding: 1,
                }
            },
            x: {
                beginAtZero: true,
                min: 0,
                max: maxRevenue,
                grid: { display: true, tickLength: 0 },
                border: { color: 'white' },
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString('ru-RU') + '₽';
                    },
                    maxRotation: 90,
                    minRotation: 0,
                    autoSkip: true,
                    autoSkipPadding: 25,
                },
            },
        },
        interaction: {
            mode: 'index',
            axis: 'y',
            intersect: false
        },
    };


    if (loading) {
        return (
            <div className={styles.block}>
                <div className={styles.bar__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.block}>
            <div className={styles.block__header}>
                <p className={styles.block__title}>Выручка по складам</p>
                {(sortedData.length > ITEMS_PER_PAGE && totalPages > 1) && (
                    <div className={styles.pagination}>
                        <button
                            className={styles.pagination__button}
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            aria-label="Предыдущая страница"
                        >
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1L1 5L5 9" stroke="currentColor" strokeLinecap="round" />
                            </svg>
                        </button>
                        <span className={styles.pagination__info}>
                            {currentPage + 1} / {totalPages}
                        </span>
                        <button
                            className={styles.pagination__button}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            aria-label="Следующая страница"
                        >
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.block__chart}>
                <Bar data={data} options={options} />
            </div>
        </div >
    );
};

export default StorageRevenueChartBlock;
