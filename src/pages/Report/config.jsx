const filterIcon = (
	<svg
		width="25"
		height="24"
		viewBox="0 0 25 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M17.7441 3H6.34965C5.07786 3 4.04688 4.03099 4.04688 5.30278C4.04688 5.7574 4.18145 6.20186 4.43363 6.58013L9.54303 14.2442C9.87156 14.737 10.0469 15.3161 10.0469 15.9083V20.382C10.0469 21.1253 10.8292 21.6088 11.4941 21.2764L12.3885 20.8292C13.4049 20.321 14.0469 19.2822 14.0469 18.1459V15.9083C14.0469 15.3161 14.2222 14.737 14.5507 14.2442L19.6601 6.58013C19.9123 6.20185 20.0469 5.7574 20.0469 5.30278C20.0469 4.03099 19.0159 3 17.7441 3Z"
			fill="currentColor"
		/>
	</svg>
);
function SortIcon( state ) {
	console.log(state);
	return (
		<svg
			width="24"
			height="16"
			viewBox="0 0 24 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
				fill="currentColor"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
				fill="currentColor"
			/>
		</svg>
	);
}
export const COLUMNS = [
	{
		title: 'Неделя',
		dataIndex: 'week',
		fixed: 'left',
	},

	{
		title: 'Сред. цена продажи',
		dataIndex: 'salesAvarage',
		sorter: (a, b) => a.salesAvarage - b.salesAvarage,
		sortDirections: ['descend'],
		sortIcon: (state) => <SortIcon state />,
		filterIcon: filterIcon,
		filters: [
			{
				name: 'Min',
				value: 'Min',
			},
			{
				value: 'Max',
			},
		],
	},
	{
		title: 'Реализация (сумма продаж по СПП)',
		dataIndex: 'salesSpp',
		sorter: (a, b) => a.salesSpp - b.salesSpp,
		sortDirections: ['descend'],

		filterIcon: filterIcon,
		filters: [
			{
				name: 'Min',
				value: 'Min',
			},
			{
				value: 'Max',
			},
		],
	},
	{
		title: 'Продажи',
		dataIndex: 'sales',
		sorter: (a, b) => a.sales - b.sales,
		sortDirections: ['descend'],

		filterIcon: filterIcon,
		filters: [
			{
				name: 'Min',
				value: 'Min',
			},
			{
				value: 'Max',
			},
		],
	},
	{
		title: 'К перечислению',
		dataIndex: 'due',
		sorter: (a, b) => a.due - b.due,
		sortDirections: ['descend'],

		filterIcon: filterIcon,
		filters: [
			{
				name: 'Min',
				value: 'Min',
			},
			{
				value: 'Max',
			},
		],
	},
	{
		title: 'Возвраты',
		dataIndex: 'back',
	},
	{
		title: 'Операционные расходы',
		dataIndex: 'operating',
		sorter: (a, b) => a.operating - b.operating,
		sortDirections: ['descend'],
	},
	{
		title: 'Прочие удержания',
		dataIndex: 'deductions',
		sorter: (a, b) => a.ndeductions - b.deductions,
		sortDirections: ['descend'],
	},
	{
		title: 'Себестоимость продаж',
		dataIndex: 'salesCost',
		sorter: (a, b) => a.salesCost - b.salesCost,
		sortDirections: ['descend'],
	},
	{
		title: 'Штрафы',
		dataIndex: 'penalties',
		sorter: (a, b) => a.penalties - b.penalties,
		sortDirections: ['descend'],
	},
	{
		title: 'Заказы, шт',
		dataIndex: 'ordersItems',
		sorter: (a, b) => a.naordersItems - b.ordersItems,
		sortDirections: ['descend'],
	},
	{
		title: 'Заказы, руб',
		dataIndex: 'ordersMoney',
		sorter: (a, b) => a.naordersMoney - b.ordersMoney,
		sortDirections: ['descend'],
	},
	{
		title: 'Комиссия',
		dataIndex: 'commission',
		sorter: (a, b) => a.ncommission - b.commission,
		sortDirections: ['descend'],
	},
	{
		title: 'Компенсация',
		dataIndex: 'compensation',
		sorter: (a, b) => a.namcompensation - b.compensation,
		sortDirections: ['descend'],
	},
	{
		title: 'Сред. стоимость логистики',
		dataIndex: 'logisticAvarage',
	},
	{
		title: 'Стоимость логистики',
		dataIndex: 'logisticPrice',
	},
	{
		title: 'Хранение',
		dataIndex: 'storage',
	},
	{
		title: 'Кол-во отказов + возвраты',
		dataIndex: 'countRejectsReturns',
	},
	{
		title: 'Всего продаж',
		dataIndex: 'sellAll',
	},
	{
		title: 'Сред. процент выкупа',
		dataIndex: 'buyout',
	},
	{
		title: 'Сред. прибыль на 1 шт',
		dataIndex: 'profitOne',
	},
	{
		title: 'Налоги',
		dataIndex: 'tax',
	},
	{
		title: 'Прибыль',
		dataIndex: 'profit',
	},
	{
		title: 'Прибыль без опер. расходов',
		dataIndex: 'profitWithout',
	},
	{
		title: 'ROI',
		dataIndex: 'roi',
	},
	{
		title: 'Маржинальность',
		dataIndex: 'marginality',
	},
	{
		title: 'Расходы на рекламу',
		dataIndex: 'adCost',
	},
	{
		title: 'ДРР',
		dataIndex: 'drr',
	},
	{
		title: 'Расходы на рекламу с бонусов',
		dataIndex: 'adBonus',
	},
	{
		title: 'ДРР бонусов',
		dataIndex: 'drrBonus',
	},
	{
		title: 'Общие расходы на рекламу',
		dataIndex: 'ad',
	},
	{
		title: 'Общая ДРР',
		dataIndex: 'drrAll',
	},
	{
		title: 'Платная приемка',
		dataIndex: 'priemka',
	},
];
