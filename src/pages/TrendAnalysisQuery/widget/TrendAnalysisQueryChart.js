import { Line } from 'react-chartjs-2';
import {
	CategoryScale,
	LinearScale,
	Chart as ChartJS,
	Filler,
	BarController,
	PointElement,
	BarElement,
	LineElement,
	LineController,
	Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { formatPrice } from '../../../service/utils'

ChartJS.register(
	annotationPlugin,
	CategoryScale,
	LinearScale,
	Filler,
	BarController,
	PointElement,
	BarElement,
	LineController,
	LineElement,
	[Tooltip]
	// verticalDashedLinePlugin
);

export default function TrendAnalysisQueryChart({data}) {
	console.log('TrendAnalysisQueryChart', data)
	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
	];
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
	return (
		<div className="chart">
			<Line
				height={450}
				options={{
					responsive: true,
					plugins: {
						legend: {
							display: false,
						},
						title: {
							display: false,
						},
						tooltip: {
							axis: 'x',
							callbacks: {
								label: function (context) {
									return (
										' Частотность запроса: ' + formatPrice(context.parsed.y)
									);
								},
							},
						},
					},
					scales: {
						x: {
							display: false,
						},
					},
				}}
				data={dataset}
			/>
		</div>
	);
}
