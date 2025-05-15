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
			style={{marginLeft: 10, marginRight: 10}}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
				fill={sortOrder === 'ascend'? '#5329FF': 'currentColor'}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
				fill={sortOrder === 'descend'? '#5329FF': 'currentColor'}
			/>
		</svg>
	);
}

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}

export const COLUMNS = [
	{
		title: 'Неделя',
		dataIndex: 'week_label',
		fixed: 'left',
		width: 240
	},
	{
		title: 'Заказы, руб',
		dataIndex: 'ordersMoney',
		sorter: (a, b) => Number(a.order_sum) - Number(b.order_sum),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Прибыль без опер. расходов',
		dataIndex: 'profit_no_op',
		sorter: (a, b) => Number(a.profit_no_op) - Number(b.profit_no_op),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Комиссия',
		dataIndex: 'commission',
		sorter: (a, b) => Number(a.commission) - Number(b.commission),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'ROI',
		dataIndex: 'roi',
		sorter: (a, b) => Number(a.roi) - Number(b.roi),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	// {
	// 	title: 'Реализация (сумма продаж по СПП)',
	// 	dataIndex: 'salesSpp',
	// 	sorter: (a, b) => Number(a.salesAvarage) - Number(b.salesAvarage),
	// 	sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
	// 	filterOptions: true,
	// 	// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	// },
	{
		title: 'Сред. стоимость логистики',
		dataIndex: 'avg_logistics',
		sorter: (a, b) => Number(a.avg_logistics) - Number(b.avg_logistics),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Сред. цена продажи',
		dataIndex: 'avg_price',
		sorter: (a, b) => Number(a.avg_price) - Number(b.avg_price),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Маржинальность',
		dataIndex: 'margin',
		sorter: (a, b) => Number(a.margin) - Number(b.margin),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Продажи',
		dataIndex: 'sales',
		sorter: (a, b) => Number(a.sales) - Number(b.sales),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Стоимость логистики',
		dataIndex: 'logistics',
		sorter: (a, b) => Number(a.logistics) - Number(b.logistics),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Расходы на рекламу',
		dataIndex: 'ad_expenses',
		sorter: (a, b) => Number(a.ad_expenses) - Number(b.ad_expenses),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'К перечислению',
		dataIndex: 'due',
		sorter: (a, b) => Number(a.due) - Number(b.due),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
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
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Возвраты',
		dataIndex: 'returns',
		sorter: (a, b) => Number(a.returns) - Number(b.returns),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Кол-во отказов + возвраты',
		dataIndex: 'reject_returns',
		sorter: (a, b) =>
			Number(a.reject_returns) - Number(b.reject_returns),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} шт</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Расходы на рекламу с бонусов',
		dataIndex: 'ad_bonus',
		sorter: (a, b) => Number(a.ad_bonus) - Number(b.ad_bonus),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Операционные расходы',
		dataIndex: 'op_expenses',
		sorter: (a, b) => Number(a.op_expenses) - Number(b.op_expenses),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Всего продаж',
		dataIndex: 'total_sales',
		sorter: (a, b) => Number(a.total_sales) - Number(b.total_sales),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} шт</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'ДРР бонусов',
		dataIndex: 'drr_bonus',
		sorter: (a, b) => Number(a.drr_bonus) - Number(b.drr_bonus),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Прочие удержания',
		dataIndex: 'deductions',
		sorter: (a, b) => Number(a.other_retentions) - Number(b.other_retentions),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Сред. процент выкупа',
		dataIndex: 'buyout',
		sorter: (a, b) => Number(a.buyout) - Number(b.buyout),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Общие расходы на рекламу',
		dataIndex: 'total_ad',
		sorter: (a, b) => Number(a.total_ad) - Number(b.total_ad),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Себестоимость продаж',
		dataIndex: 'avg_purchase_pct',
		sorter: (a, b) => Number(a.avg_purchase_pct) - Number(b.avg_purchase_pct),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Сред. прибыль на 1 шт',
		dataIndex: 'avg_profit_per_piece',
		sorter: (a, b) => Number(a.avg_profit_per_piece) - Number(b.avg_profit_per_piece),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Общая ДРР',
		dataIndex: 'total_drr',
		sorter: (a, b) => Number(a.total_drr) - Number(b.total_drr),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Штрафы',
		dataIndex: 'penalties',
		sorter: (a, b) => Number(a.penalties) - Number(b.penalties),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Налоги',
		dataIndex: 'taxes',
		sorter: (a, b) => Number(a.taxes) - Number(b.taxes),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
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
		dataIndex: 'order_count',
		sorter: (a, b) => Number(a.ordersItems) - Number(b.ordersItems),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} шт</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Прибыль',
		dataIndex: 'profit',
		sorter: (a, b) => Number(a.profit) - Number(b.profit),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'Компенсация',
		dataIndex: 'compensation',
		sorter: (a, b) => Number(a.compensation) - Number(b.compensation),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
		// filterIcon: ({filtered}) => <FilterIcon filtered={filtered}/>,
	},
	{
		title: 'realization',
		dataIndex: 'realization',
		sorter: (a, b) => Number(a.compensation) - Number(b.compensation),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
	},
	{
		title: 'transfer',
		dataIndex: 'transfer',
		sorter: (a, b) => Number(a.compensation) - Number(b.compensation),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
	},
	{
		title: 'cost',
		dataIndex: 'cost',
		sorter: (a, b) => Number(a.compensation) - Number(b.compensation),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
	},
	{
		title: 'paid_accept',
		dataIndex: 'paid_accept',
		sorter: (a, b) => Number(a.compensation) - Number(b.compensation),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => value && <div>{formatNumber(value)} ₽</div>
	},
];
