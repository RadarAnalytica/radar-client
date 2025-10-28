import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './RevenueStorageChart.module.css';

const ITEMS_PER_PAGE = 15;

const RevenueStorageChart = ({ revenueByWarehouse, dataRevenueStorage, labels, max, isLoading }) => {
    const [currentPage, setCurrentPage] = useState(0);

    // Обработка и сортировка данных
    const { sortedData, totalPages, maxRevenue } = useMemo(() => {
        let dataArray = [];
        
        // Поддержка нового формата (revenueByWarehouse)
        if (revenueByWarehouse?.length) {
            dataArray = [...revenueByWarehouse];
        } 
        // Поддержка старого формата (dataRevenueStorage + labels)
        else if (dataRevenueStorage?.length && labels?.length) {
            dataArray = labels.map((name, index) => ({
                name,
                revenue: dataRevenueStorage[index] || 0
            }));
        }

        if (!dataArray.length) {
            return { sortedData: [], totalPages: 0, maxRevenue: 0 };
        }

        // Сортируем по выручке (от большего к меньшему)
        const sorted = [...dataArray].sort((a, b) => b.revenue - a.revenue);

        // Вычисляем максимум для всего массива один раз
        const calculatedMax = Math.ceil(Math.max(...sorted.map(item => item.revenue)) / 1000) * 1000;
        const finalMax = max || calculatedMax;

        return {
            sortedData: sorted,
            totalPages: Math.ceil(sorted.length / ITEMS_PER_PAGE),
            maxRevenue: finalMax
        };
    }, [revenueByWarehouse, dataRevenueStorage, labels, max]);

    // Получаем данные для текущей страницы
    const { pageLabels, pageData } = useMemo(() => {
        const startIndex = currentPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageDataSlice = sortedData.slice(startIndex, endIndex);

        // Обрабатываем только данные для текущей страницы
        const pageLabels = pageDataSlice.map(item => item.name);
        const pageData = pageDataSlice.map(item => item.revenue);

        return { pageLabels, pageData };
    }, [sortedData, currentPage]);

    // Обработчики навигации
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const data = {
        labels: pageLabels,
        datasets: [
            {
                label: 'Выручка по складам',
                data: pageData,
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
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Выручка по складам',
            },
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
        }
    };

    return (
        <div className={`${styles.revenueStrorage}`}>
            <div className='chart-container-header'>
                <div>
                    <div className='chart-title'>Выручка по складам</div>
                </div>
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
            {isLoading ? (
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100%', marginTop: "200px" }}
                >
                    <span className="loader"></span>
                </div>
            ) : (
                <Bar data={data} options={options} />
            )}
        </div>
    );
};

export default RevenueStorageChart;
