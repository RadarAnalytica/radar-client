import React, { useRef, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DetailChart = () => {
    const chartRef = useRef(null);
    const [clickedIndex, setClickedIndex] = useState(null);

    const data = {
        labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [
            {
                label: 'Заказы',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 4, 1, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0.5, '#F0AD00');
                    gradient.addColorStop(1, '#F0AD0080');

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
            tooltip: { enabled: false } // disable default tooltip
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                setClickedIndex(index); // set clicked bar index
            } else {
                setClickedIndex(null); // reset if clicking outside bars
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#8C8C8C' } },
            y: { beginAtZero: true, min: 0, max: 10, grid: { display: true }, ticks: { color: '#8C8C8C' } },
        }
    };

    const renderCustomTooltip = () => {
        if (clickedIndex === null) return null;

        // Example data for the tooltip
        const times = ['6:00', '6:05', '6:12', '6:22', '6:29', '6:44', '6:45', '6:50', '6:51', '6:53'];
        const counts = [60, 1, 1, 10, 10, 10, 10, 10, 10, 10];
        const total = counts.reduce((sum, count) => sum + count, 0);

        return (
            <div className="custom-tooltip">
                <div className='custom-tooltip-header'>
                    <div className='tooltip-color'></div>
                    <div className='tooltip-title-period'>
                        Заказы с 6:00 до 7:00, шт
                    </div>
                </div>
                <div className='custom-tooltip-amount-wrapper'>
                    <div className='custom-tooltip-amount-title'>Всего</div>
                    <div className='custom-tooltip-amount' style={{ fontWeight: "700" }}>100</div></div>
                <div className='custom-tooltip-period'>
                    {times.map((time, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{time}</span>
                            <span style={{ marginRight: "5px" }}>{counts[i]}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div style={{ position: "relative", minWidth: "630px", width: "100%" }}>
            <Bar ref={chartRef} data={data} options={options} />

            {renderCustomTooltip()}
        </div>
    );
};

export default DetailChart;
