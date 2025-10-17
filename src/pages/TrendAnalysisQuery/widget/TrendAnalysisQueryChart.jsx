import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, PointElement, LineElement, Tooltip } from 'chart.js';

import { verticalDashedLinePlugin } from '../../../service/utils';

ChartJS.register(
		CategoryScale,
		LinearScale,
		Filler,
		PointElement,
		LineElement,
		[Tooltip],
		verticalDashedLinePlugin
);

export default function TrendAnalysisQueryChart({ data }) {
	const dataset = {
		labels: data?.labels,
		datasets: [
			{
				fill: true,
				data: data?.data,
				borderColor: '#9A81FF',
				backgroundColor: '#9A81FF1A',
				pointBackgroundColor: '#9A81FF',
				pointRadius: 5,
				tension: 0.3,
			},
		],
	};

	const OPTIONS = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			tooltip: {
				enabled: true,
				intersect: false,
				mode: 'index',
				axis: 'x',
				usePointStyle: true,
				boxWidth: 10,
				// external: (context) => {getChartTooltip(context, context.tooltip)},
				callbacks: {
					label: function (context) {
						return ' Частотность запроса   ' + context.formattedValue;
					},
				},
				// стилизация
				padding: 20,
				caretSize: 0,
				backgroundColor: '#fff',
				borderColor: '#00000014',
				borderWidth: 1,
				cornerRadius: 8,
				titleColor: '#8c8c8c',
				titleFont: {
					family: 'Mulish',
					size: 12,
					weight: 500,
				},
				bodyFont: {
					family: 'Mulish',
					size: 12,
					weight: 500,
					lineHeight: 1.5,
				},
				titleMarginBottom: 4,
				bodyColor: '#1A1A1A',
			},
			verticalDashedLine: { enabled: true },
		},
		elements: {
			line: {
				tension: 0.5,
			},
		},
	};

	return (
		<div className="chart">
			<Line height={450} options={OPTIONS} data={dataset} />
		</div>
	);
}
