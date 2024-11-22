import React, { useRef, useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { chart } from 'highcharts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DetailChart = ({ labels, chartData, averages }) => {
    const chartRef = useRef(null);
    const containerRef = useRef(null);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const data = {
        labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [
            {
                label: 'Заказы',
                data: averages,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0.5, '#F0AD00');
                    gradient.addColorStop(1, '#F0AD0080');


                    if (clickedIndex !== null && context.dataIndex !== clickedIndex) {
                        return 'rgba(240, 173, 0, 0.3)';
                    }

                    return context.dataIndex === clickedIndex ? '#F0AD00' : gradient;
                },
                borderWidth: 0,
                barPercentage: 0.6,
                borderRadius: 3,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const chart = chartRef.current;
                const datasetIndex = elements[0].datasetIndex;

                if (chart) {
                    const bar = chart.getDatasetMeta(datasetIndex).data[index];
                    const x = bar.x;
                    const y = bar.y;

                    setTooltipPosition({ x, y });
                    setClickedIndex(index);
                }
            } else {
                setClickedIndex(null);
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#8C8C8C' } },
            y: { beginAtZero: true, min: 0, max: 10, grid: { display: true }, ticks: { color: '#8C8C8C' } },
        },
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setClickedIndex(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const renderCustomTooltip = () => {
        if (clickedIndex === null) return null;
        console.log(chartData)
        console.log(clickedIndex)
        const total = chartData[clickedIndex]

        const isLeftSide = clickedIndex > 11;
        const tooltipStyle = {
            position: 'absolute',
            top: `50%`,
            left: isLeftSide
                ? `${tooltipPosition.x - 290}px`
                : `${tooltipPosition.x + 20}px`,
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        };

        return (
            <div className="custom-tooltip" style={tooltipStyle}>
                <div className="custom-tooltip-header">
                    <div className="tooltip-color"></div>
                    <div className="tooltip-title-period">
                        {`Заказы с ${clickedIndex}:00 до ${1 + clickedIndex}:00, шт`}
                    </div>
                </div>
                <div className="custom-tooltip-amount-wrapper">
                    <div className="custom-tooltip-amount-title">Всего</div>
                    <div className="custom-tooltip-amount" style={{ fontWeight: '700' }}>{total}</div>
                </div>
                <div className="custom-tooltip-period">
                    {labels[clickedIndex.toString()].map((time, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ marginLeft: '5px' }}>{labels[clickedIndex.toString()][i]['time']}</span>
                            <span style={{ marginRight: '5px' }}>{labels[clickedIndex.toString()][i]['count']}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div ref={containerRef} style={{ position: 'relative', minWidth: '630px', width: '100%' }}>
            <Bar ref={chartRef} data={data} options={options} />
            {renderCustomTooltip()}
        </div>
    );
};

export default DetailChart;
