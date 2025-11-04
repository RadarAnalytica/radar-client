import styles from './revenueStructChartBlock.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { processStructureData } from '../blockUtils';
import { useAppSelector } from '../../../../redux/hooks';
import { RadarLoader } from '../../../../shared/ui/RadarLoader/RadarLoader';
ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueStructChartBlock = ({ dataDashBoard, loading }) => {

    const dataStructureRevenue = processStructureData(dataDashBoard?.structure);
    const { isSidebarHidden } = useAppSelector((state) => state.utils);

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
                borderWidth: 1,
                cutout: '90%',
                borderRadius: 11,
                hoverOffset: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
        },
        onHover: (event, elements) => {
            const target = event?.native?.target || (event?.chart && event.chart.canvas);
            if (!target) return;
            target.style.cursor = elements && elements.length ? 'pointer' : 'default';
        },
        cutout: '100%',
        layout: {
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
            },
        },
        displayCenterText: true,
    };

    ChartJS.register({
        id: 'centerText',
        beforeDraw: (chart) => {
            if (!chart.config.options.displayCenterText) return;

            const { width: basicWidth, height, ctx } = chart;
            const dataset = chart.data.datasets[0];
            const labels = chart.data.labels;
            const colors = dataset.backgroundColor;
            const width = basicWidth > 400 ? basicWidth / 2 : basicWidth;
            // Определение респонсивного размера шрифта
            const fontSize = 14; // Можете также сделать шрифт респонсивным
            // const fontSize = width / 20 > 10 ? width / 20 : 10; // Можете также сделать шрифт респонсивным

            ctx.restore();
            ctx.font = `${fontSize}px Mulish`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';

            // Уменьшаем расстояние между строками
            //const startY = height / 2 - ((labels.length - 1) * 20) + 15; // уменьшено с 30 до 20
            const startY = height / 2 - labels.length / 2 * fontSize * 2; // уменьшено с 30 до 20
            labels.forEach((label, index) => {
                const value = dataset.data[index];
                const labelText = label;
                const valueText = `${value}%`;

                const labelX = Math.round((basicWidth - ctx.measureText(labelText).width) / 2) + 15;
                const valueX = Math.round((basicWidth - ctx.measureText(valueText).width) / 2) + 15;
                // const labelX = Math.round((width - ctx.measureText(labelText).width) / 2) + 15;
                // const valueX = Math.round((width - ctx.measureText(valueText).width) / 2) + 15;

                //const labelY = startY + index * 30; // уменьшено с 50 до 30
                const labelY = startY + index * fontSize * 2.5;
                const valueY = labelY + fontSize + 6;

                const circleX = labelX - 10;
                const circleY = labelY;
                const circleRadius = 5;

                ctx.beginPath();
                ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
                ctx.fillStyle = colors[index];
                ctx.fill();

                ctx.fillStyle = '#000';
                ctx.fillText(labelText, labelX, labelY);

                ctx.font = `bold ${fontSize}px Mulish`;
                ctx.fillText(valueText, valueX - 10, valueY);

                ctx.font = `${fontSize}px Mulish`;
            });

            ctx.save();
        }
    });

    // Tooltip shadow plugin: draws soft shadow behind default canvas tooltip
    ChartJS.register({
        id: 'tooltipShadow',
        beforeDraw: (chart) => {
            const tooltip = chart.tooltip;
            if (!tooltip || tooltip.opacity === 0) return;

            const ctx = chart.ctx;
            const x = tooltip.x;
            const y = tooltip.y;
            const width = tooltip.width;
            const height = tooltip.height;
            const radius = (tooltip.options && tooltip.options.borderRadius) || 8;

            if (x == null || y == null || width == null || height == null) return;

            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
            ctx.shadowBlur = 24;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 8;

            // Draw rounded rect slightly offset to ensure shadow is visible
            const rectX = x;
            const rectY = y;
            const rectW = width;
            const rectH = height;

            const r = Math.min(radius, rectW / 2, rectH / 2);
            ctx.beginPath();
            ctx.moveTo(rectX + r, rectY);
            ctx.arcTo(rectX + rectW, rectY, rectX + rectW, rectY + rectH, r);
            ctx.arcTo(rectX + rectW, rectY + rectH, rectX, rectY + rectH, r);
            ctx.arcTo(rectX, rectY + rectH, rectX, rectY, r);
            ctx.arcTo(rectX, rectY, rectX + rectW, rectY, r);
            ctx.closePath();
            // Fill with white so it sits under the default tooltip; the tooltip will redraw its own border/text
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.restore();
        }
    });

    // Active arc shadow: redraws hovered arc with soft shadow
    ChartJS.register({
        id: 'activeArcShadow',
        afterDatasetsDraw: (chart) => {
            const getActive = chart.getActiveElements ? chart.getActiveElements() : [];
            if (!getActive || getActive.length === 0) return;

            const ctx = chart.ctx;
            getActive.forEach(({ datasetIndex, index }) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                const element = meta && meta.data && meta.data[index];
                if (!element) return;

                ctx.save();
                ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
                ctx.shadowBlur = 16;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 8;
                element.draw(ctx);
                ctx.restore();
            });
        }
    });

    if (loading) {
        return (
            <div className={styles.block}>
               <RadarLoader loaderStyle={{ height: '407px' }} />
            </div>
        );
    }

    return (
        <div className={styles.block}>
            <p className={styles.block__title}>Структура выручки</p>
            <div className={styles.block__chart}>
                <Doughnut data={data} options={options} />
            </div>
        </div >
    );
};


export default RevenueStructChartBlock;
