import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register necessary Chart.js components
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
                    '#FFFFFF', // Use white for segment spacing
                    '#FFFFFF',
                    '#FFFFFF',
                ],
                borderWidth: 5, // Adjust border width for spacing effect
                cutout: '85%', // Adjust this value to create space in the middle
                borderRadius: 11, // Increased border radius for smoother edges
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
                enabled: false,
            },
            // centerText: {
            //     display: true,
            //     // text: 'Структура выручки',
            // },
        },
        cutout: '85%',
        layout: {
            padding: {
                // right: 20,
            },
        },
        displayCenterText: true, // Custom option to control text display
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
            const fontSize = 14; // Set the font size for labels
            ctx.font = `${fontSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';

            // Starting Y position to center the text vertically
            const startY = height / 2 - ((labels.length - 1) * 30);

            labels.forEach((label, index) => {
                const value = dataset.data[index];
                const labelText = label;
                const valueText = `${value}%`;

                // Calculate positions to center the text horizontally
                const labelX = Math.round((width - ctx.measureText(labelText).width) / 2) + 15; // Shift right for circle
                const valueX = Math.round((width - ctx.measureText(valueText).width) / 2) + 15;

                // Calculate Y position for each label and value pair
                const labelY = startY + index * 50;
                const valueY = labelY + 20;

                // Draw color circle
                const circleX = labelX - 10; // Position the circle slightly left of the label
                const circleY = labelY;
                const circleRadius = 5;

                ctx.beginPath();
                ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
                ctx.fillStyle = colors[index];
                ctx.fill();

                // Draw the label text
                ctx.fillStyle = '#000'; // Set text color
                ctx.fillText(labelText, labelX, labelY);

                // Make the value text bold
                ctx.font = `bold ${fontSize}px Arial`;
                ctx.fillText(valueText, valueX - 10, valueY);

                // Reset font to regular for the next label
                ctx.font = `${fontSize}px Arial`;
            });

            ctx.save();
        }
    });

    return (
        <div className="chart-container" style={{ width: '30%', minHeight: "496px", display: "flex", flexDirection: "column" }}>
            <div className='chart-title'>Структура выручки</div>
            <Doughnut data={data} options={options} style={{ margin: "auto" }} />
        </div >
    );
};

export default StructureRevenue;