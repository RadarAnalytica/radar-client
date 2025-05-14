// const FilterIcon = ({filtered}) => (
// 	<svg
// 		width="25"
// 		height="24"
// 		viewBox="0 0 25 24"
// 		fill="none"
// 		xmlns="http://www.w3.org/2000/svg"
// 	>
// 		<path
// 			d="M17.7441 3H6.34965C5.07786 3 4.04688 4.03099 4.04688 5.30278C4.04688 5.7574 4.18145 6.20186 4.43363 6.58013L9.54303 14.2442C9.87156 14.737 10.0469 15.3161 10.0469 15.9083V20.382C10.0469 21.1253 10.8292 21.6088 11.4941 21.2764L12.3885 20.8292C13.4049 20.321 14.0469 19.2822 14.0469 18.1459V15.9083C14.0469 15.3161 14.2222 14.737 14.5507 14.2442L19.6601 6.58013C19.9123 6.20185 20.0469 5.7574 20.0469 5.30278C20.0469 4.03099 19.0159 3 17.7441 3Z"
// 			fill={!filtered ? 'black' : "currentColor"}
// 		/>
// 	</svg>
// );

function SortIcon({ sortOrder }) {
	return (
		<svg
			width="24"
			height="16"
			viewBox="0 0 24 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
				fill={sortOrder === 'ascend' ? 'black' : 'currentColor'}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
				fill={sortOrder === 'descend' ? 'black' : 'currentColor'}
			/>
		</svg>
	);
}

export const COLUMNS = [
	{
		title: 'Неделя',
		dataIndex: 'week',
		fixed: 'left',
		width: 240
	},
	{
		title: 'Заказы, руб',
		dataIndex: 'ordersMoney',
		sorter: (a, b) => Number(a.ordersMoney) - Number(b.ordersMoney),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Прибыль без опер. расходов',
		dataIndex: 'profitWithout',
		sorter: (a, b) => Number(a.profitWithout) - Number(b.profitWithout),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Комиссия',
		dataIndex: 'commission',
		sorter: (a, b) => Number(a.commission) - Number(b.commission),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'ROI',
		dataIndex: 'roi',
		sorter: (a, b) => Number(a.roi) - Number(b.roi),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Реализация (сумма продаж по СПП)',
		dataIndex: 'salesSpp',
		sorter: (a, b) => Number(a.salesAvarage) - Number(b.salesAvarage),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},

	{
		title: 'Сред. стоимость логистики',
		dataIndex: 'logisticAvarage',
		sorter: (a, b) => Number(a.logisticAvarage) - Number(b.logisticAvarage),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Сред. цена продажи',
		dataIndex: 'salesAvarage',
		sorter: (a, b) => Number(a.salesAvarage) - Number(b.salesAvarage),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Маржинальность',
		dataIndex: 'marginality',
		sorter: (a, b) => Number(a.marginality) - Number(b.marginality),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Продажи',
		dataIndex: 'sales',
		sorter: (a, b) => Number(a.sales) - Number(b.sales),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Стоимость логистики',
		dataIndex: 'logisticPrice',
		sorter: (a, b) => Number(a.logisticPrice) - Number(b.logisticPrice),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Расходы на рекламу',
		dataIndex: 'adCost',
		sorter: (a, b) => Number(a.adCost) - Number(b.adCost),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'К перечислению',
		dataIndex: 'due',
		sorter: (a, b) => Number(a.due) - Number(b.due),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Хранение',
		dataIndex: 'storage',
		sorter: (a, b) => Number(a.storage) - Number(b.storage),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'ДРР',
		dataIndex: 'drr',
		sorter: (a, b) => Number(a.drr) - Number(b.drr),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Возвраты',
		dataIndex: 'back',
		sorter: (a, b) => Number(a.back) - Number(b.back),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Кол-во отказов + возвраты',
		dataIndex: 'countRejectsReturns',
		sorter: (a, b) =>
			Number(a.countRejectsReturns) - Number(b.countRejectsReturns),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Расходы на рекламу с бонусов',
		dataIndex: 'adBonus',
		sorter: (a, b) => Number(a.adBonus) - Number(b.adBonus),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Операционные расходы',
		dataIndex: 'operating',
		sorter: (a, b) => Number(a.operating) - Number(b.operating),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Всего продаж',
		dataIndex: 'sellAll',
		sorter: (a, b) => Number(a.sellAll) - Number(b.sellAll),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'ДРР бонусов',
		dataIndex: 'drrBonus',
		sorter: (a, b) => Number(a.drrBonus) - Number(b.drrBonus),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Прочие удержания',
		dataIndex: 'deductions',
		sorter: (a, b) => Number(a.deductions) - Number(b.deductions),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Сред. процент выкупа',
		dataIndex: 'buyout',
		sorter: (a, b) => Number(a.buyout) - Number(b.buyout),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Общие расходы на рекламу',
		dataIndex: 'ad',
		sorter: (a, b) => Number(a.ad) - Number(b.ad),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Себестоимость продаж',
		dataIndex: 'salesCost',
		sorter: (a, b) => Number(a.salesCost) - Number(b.salesCost),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Сред. прибыль на 1 шт',
		dataIndex: 'profitOne',
		sorter: (a, b) => Number(a.profitOne) - Number(b.profitOne),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Общая ДРР',
		dataIndex: 'drrAll',
		sorter: (a, b) => Number(a.drrAll) - Number(b.drrAll),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Штрафы',
		dataIndex: 'penalties',
		sorter: (a, b) => Number(a.penalties) - Number(b.penalties),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Налоги',
		dataIndex: 'tax',
		sorter: (a, b) => Number(a.tax) - Number(b.tax),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Платная приемка',
		dataIndex: 'priemka',
		sorter: (a, b) => Number(a.priemka) - Number(b.priemka),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Заказы, шт',
		dataIndex: 'ordersItems',
		sorter: (a, b) => Number(a.ordersItems) - Number(b.ordersItems),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Прибыль',
		dataIndex: 'profit',
		sorter: (a, b) => Number(a.profit) - Number(b.profit),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Компенсация',
		dataIndex: 'compensation',
		sorter: (a, b) => Number(a.compensation) - Number(b.compensation),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
];
