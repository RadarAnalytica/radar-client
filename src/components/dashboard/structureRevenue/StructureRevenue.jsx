import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './StructureRevenue.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const StructureRevenue = ({ dataStructureRevenue, loading }) => {
    const data = {
        labels: ['Все удержания', 'Всего внешних расходов', 'Налог', "Доход", "Себестоимость"],
        datasets: [
            {
                label: 'Структура выручки',
                data: dataStructureRevenue,
                backgroundColor: [
                    '#81ACFF',
                    '#FF9972',
                    '#9A81FF',
                    '#FFD166',
                    '#4AD991',

                ],
                borderColor: [
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                ],
                borderWidth: 5,
                cutout: '90%',
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
            },
            onHover: (event) => {
                event.native.target.style.cursor = 'pointer';
            },
        },
        cutout: '85%',
        layout: {
            padding: 0,
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

            // Определение респонсивного размера шрифта
            const fontSize = 10; // Можете также сделать шрифт респонсивным

            ctx.restore();
            ctx.font = `${fontSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';

            // Уменьшаем расстояние между строками
            const startY = height / 2 - ((labels.length - 1) * 20) + 15; // уменьшено с 30 до 20

            labels.forEach((label, index) => {
                const value = dataset.data[index];
                const labelText = label;
                const valueText = `${value}%`;

                const labelX = Math.round((width - ctx.measureText(labelText).width) / 2) + 15;
                const valueX = Math.round((width - ctx.measureText(valueText).width) / 2) + 15;

                const labelY = startY + index * 30; // уменьшено с 50 до 30
                const valueY = labelY + 15;

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
        <div className={`chart-container h-100 ${styles.revenueStructure} scehdule-revenue-structure`}>
            <p className='fw-bold numbers mb-2'>Структура выручки</p>
            {loading ? (
                <div
                    style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    paddingTop: '20%',
                    }}
                >
                    <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                    >
                        <span className='loader'></span>
                    </div>
                </div>
            ) : (
                <Doughnut data={data} options={options} style={{ margin: "auto" }} />
            )}
        </div>
    );
};

export default StructureRevenue;
