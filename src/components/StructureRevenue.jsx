import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StructureRevenue = () => {
    const data = {
        labels: ['Все удержания', 'Всего внешних расходов', 'Налог'],
        datasets: [
            {
                label: 'Структура выручки',
                data: [61, 20, 19],
                backgroundColor: [
                    '#81ACFF',
                    '#FF9972',
                    '#9A81FF',
                ],
                borderColor: [
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                ],
                borderWidth: 5,
                cutout: '85%',
                borderRadius: 11,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#FFFFFF',
                borderColor: '#E0E0E0',
                borderRadius: 8,
                titleColor: '#8C8C8C',
                bodyColor: '#1A1A1A',
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}%`;
                    }
                }
            }
        },
        cutout: '85%',
        layout: {
            padding: 20,
        },
        displayCenterText: true,
    };

    ChartJS.register({
        id: 'centerText',
        beforeDraw: (chart) => {
            if (!chart.config.options.displayCenterText) return;

            const { width, height, ctx } = chart;
            const dataset = chart.data.datasets[0];
            const labels = chart.data.labels;
            const colors = dataset.backgroundColor;

            ctx.restore();
            const fontSize = 14;
            ctx.font = `${fontSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';

            const startY = height / 2 - ((labels.length - 1) * 30);

            labels.forEach((label, index) => {
                const value = dataset.data[index];
                const labelText = label;
                const valueText = `${value}%`;

                const labelX = Math.round((width - ctx.measureText(labelText).width) / 2) + 15;
                const valueX = Math.round((width - ctx.measureText(valueText).width) / 2) + 15;

                const labelY = startY + index * 50;
                const valueY = labelY + 20;

                const circleX = labelX - 10;
                const circleY = labelY;
                const circleRadius = 5;

                ctx.beginPath();
                ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
                ctx.fillStyle = colors[index];
                ctx.fill();

                ctx.fillStyle = '#000';
                ctx.fillText(labelText, labelX, labelY);

                ctx.font = `bold ${fontSize}px Arial`;
                ctx.fillText(valueText, valueX - 10, valueY);

                ctx.font = `${fontSize}px Arial`;
            });

            ctx.save();
        }
    });

    return (
        <div className="chart-container" style={{ width: '30%', minHeight: "496px", display: "flex", flexDirection: "column" }}>
            <div className='chart-title'>Структура выручки</div>
            <Doughnut data={data} options={options} style={{ margin: "auto" }} />
        </div>
    );
};

export default StructureRevenue;
