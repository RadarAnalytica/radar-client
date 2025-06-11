import { SortIcon } from '../../components/sharedComponents/ReportTable/ReportTable';
import { formatPrice } from '../../service/utils';
import { Tooltip, Flex } from 'antd';

function summaryRender(value, row) {
	if (row.key == 'summary') {
		return (
			<Flex justify="space-between">
				{value}:
				<Tooltip title="Суммарные показатели за период">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="0.75"
							y="0.75"
							width="18.5"
							height="18.5"
							rx="9.25"
							stroke="black"
							strokeOpacity="0.1"
							strokeWidth="1.5"
						/>
						<path
							d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z"
							fill="#1A1A1A"
							fillOpacity="0.5"
						/>
					</svg>
				</Tooltip>
			</Flex>
		);
	}
	// console.log('summaryRender', row)
	return value.rub || value;
}

function arrowRender(value, literal) {
	let status = 'table__arrow_static';
	if (value > 0) {
		status = 'table__arrow_positive';
	}
	if (value < 0) {
		status = 'table__arrow_negative';
	}
	return (
		<span className={`table__arrow ${status}`}>
			{formatPrice(value, literal)}
			{ !!value && <svg
				width="16"
				height="12"
				viewBox="0 0 20 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z"
					fill="currentColor"
				></path>
			</svg> }
		</span>
	);
}

function sorter(a, b, key) {
	if (a.key == 'summary' || b.key == 'summary') {
		return 0;
	}

	let v1 = typeof a[key] == 'object' ? a[key]['rub'] : a[key];
	let v2 = typeof b[key] == 'object' ? b[key]['rub'] : b[key];

	return Number(v1 - v2);
}

export const COLUMNS = [
	{
		title: 'Неделя',
		dataIndex: 'week_label',
		fixed: 'left',
		width: 360,
		render: summaryRender,
	},
	{
		title: 'Выкупы, руб',
		dataIndex: 'purchases_rub',
		sorter: (a, b) => sorter(a, b, 'purchases'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value)}
			</div>
		),
		width: 240,
	},
	{
		title: 'Выкупы, шт',
		dataIndex: 'purchases_quantity',
		sorter: (a, b) => sorter(a, b, 'purchases'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value)}
			</div>
		),
		width: 240,
	},
	{
		title: 'Возвраты, руб',
		dataIndex: 'return_rub',
		sorter: (a, b) => sorter(a, b, 'return_rub'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value)}
			</div>
		),
		width: 240,
	},
	{
		title: 'Возвраты, шт',
		dataIndex: 'return_quantity',
		sorter: (a, b) => sorter(a, b, 'return_quantity'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value)}
			</div>
		),
		width: 240,
	},
	{
		title: 'Продажи',
		dataIndex: 'sales',
		sorter: (a, b) => sorter(a, b, 'sales'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value, 'шт')}
			</div>
		),
		width: 240,
	},
	{
		title: 'Выручка',
		dataIndex: 'gains',
		sorter: (a, b) => sorter(a, b, 'gains'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽' )}</div>,
		width: 240,
	},
	{
		title: 'Ср. цена продажи',
		dataIndex: 'avg_check',
		sorter: (a, b) => sorter(a, b, 'avg_check'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'СПП',
		dataIndex: 'avg_spp',
		sorter: (a, b) => sorter(a, b, 'avg_spp'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '%')}</div>,
		width: 240,
	},
	{
		title: 'Выкуп',
		dataIndex: 'purchase_percent',
		sorter: (a, b) => sorter(a, b, 'purchase_percent'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '%')}</div>,
		width: 240,
	},
	{
		title: 'Себестоимость',
		dataIndex: 'cost_price',
		sorter: (a, b) => sorter(a, b, 'cost_price'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => 
			typeof value === 'object' ?
				<div>
					{formatPrice(value?.rub, '₽')}
					<div className="table__arrow">
						{arrowRender(value?.percent, '%')}
					</div>
				</div>
			: 
				<div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Себестоимость на единицу',
		dataIndex: 'cost_price_per_one',
		sorter: (a, b) => sorter(a, b, 'cost_price_per_one'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Кол-во доставок',
		dataIndex: 'deliveries',
		sorter: (a, b) => sorter(a, b, 'deliveries'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, 'шт')}</div>,
		width: 240,
	},
	{
		title: 'Комиссии',
		dataIndex: 'wb_commission',
		sorter: (a, b) => sorter(a, b, 'wb_commission'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			typeof value === 'object' ?
				<div>
					{formatPrice(value?.rub, '₽')}
					<div className="table__arrow">
						{arrowRender(value?.percent, '%')}
					</div>
				</div>
			: 
				<div>{formatPrice(value, '₽')}</div>
		),
		width: 240,
	},
	{
		title: 'Эквайринг',
		dataIndex: 'acquiring',
		sorter: (a, b) => sorter(a, b, 'acquiring'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			typeof value === 'object' ?
				<div>
					{formatPrice(value?.rub, '₽')}
					<div className="table__arrow">
						{arrowRender(value?.percent, '%')}
					</div>
				</div>
			: 
				<div>{formatPrice(value, '₽')}</div>
		),
		width: 240,
	},
	{
		title: 'Логистика доставок',
		dataIndex: 'logistics_straight',
		sorter: (a, b) => sorter(a, b, 'logistics_straight'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value, '₽')}
			</div>
		),
		width: 240,
	},
	{
		title: 'Логистика возвратов',
		dataIndex: 'logistics_reverse',
		sorter: (a, b) => sorter(a, b, 'logistics_reverse'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value, '₽')}
			</div>
		),
		width: 240,
	},
	{
		title: 'Логистика итого',
		dataIndex: 'logistics_total',
		sorter: (a, b) => sorter(a, b, 'logistics_total'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			typeof value === 'object' ?
				<div>
					{formatPrice(value?.rub, '₽')}
					<div className="table__arrow">
						{arrowRender(value?.percent, '%')}
					</div>
				</div>
			: 
				<div>{formatPrice(value, '₽')}</div>
		),
		width: 240,
	},
	{
		title: 'Логистика на единицу',
		dataIndex: 'logistics_per_product',
		sorter: (a, b) => sorter(a, b, 'logistics_per_product'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Компенсации брака',
		dataIndex: 'compensation_defects_rub',
		sorter: (a, b) => sorter(a, b, 'compensation_defects'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value, '₽')}
			</div>
		),
		width: 240,
	},
	{
		title: 'Кол-во брака',
		dataIndex: 'compensation_defects_quantity',
		sorter: (a, b) => sorter(a, b, 'compensation_defects'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value, 'шт')}
			</div>
		),
		width: 240,
	},
	{
		title: 'Компенсации ущерба',
		dataIndex: 'compensation_damage',
		sorter: (a, b) => sorter(a, b, 'compensation_damage'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			typeof value === 'object' ?
			<div>
				{formatPrice(value?.rub, '₽')}
				{/* <div className="table__arrow">
					{arrowRender(value?.quantity, 'шт')}
				</div> */}
			</div>
			: 
			<div>{formatPrice(value, '₽')}</div>
		),
		width: 240,
	},
	{
		title: 'Кол-во ущерба',
		dataIndex: 'compensation_damage_quantity',
		sorter: (a, b) => sorter(a, b, 'compensation_damage_quantity'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value, 'шт')}
			</div>
		),
		width: 240,
	},
	{
		title: 'Штрафы',
		dataIndex: 'penalties',
		sorter: (a, b) => sorter(a, b, 'penalties'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Доплаты',
		dataIndex: 'additional_payments',
		sorter: (a, b) => sorter(a, b, 'additional_payments'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Хранение',
		dataIndex: 'storage',
		sorter: (a, b) => sorter(a, b, 'storage'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			typeof value === 'object' ?
				<div>
					{formatPrice(value?.rub, '₽')}
					<div className="table__arrow">
						{arrowRender(value?.percent, '%')}
					</div>
				</div>
			: 
				<div>{formatPrice(value, '₽')}</div>
		),
		width: 240,
	},
	{
		title: 'Реклама',
		dataIndex: 'advert_amount',
		sorter: (a, b) => sorter(a, b, 'advert_amount'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value, '₽')}
			</div>
		),
		width: 240,
	},
	{
		title: 'ДРР',
		dataIndex: 'drr',
		sorter: (a, b) => sorter(a, b, 'drr'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>
				{formatPrice(value, '%')}
			</div>
		),
		width: 240,
	},
	// {
	// 	title: 'Прочие удержания',
	// 	dataIndex: 'other_retentions',
	// 	sorter: (a, b) => sorter(a, b, 'other_retentions'),
	// 	sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
	// 	filterOptions: true,
	// 	render: (value) => (
	// 		<div>
	// 			{formatPrice(value?.rub, '₽')}
	// 			<div className="table__arrow">
	// 				{arrowRender(value?.percent, '%')}
	// 			</div>
	// 		</div>
	// 	),
	// 	width: 240,
	// },
	{
		title: 'Платная приёмка',
		dataIndex: 'acceptance',
		sorter: (a, b) => sorter(a, b, 'acceptance'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			typeof value === 'object' ?
				<div>
					{formatPrice(value?.rub, '₽')}
					<div className="table__arrow">
						{arrowRender(value?.percent, '%')}
					</div>
				</div>
			: 
				<div>{formatPrice(value, '₽')}</div>
		),
		width: 240,
	},
	{
		title: 'Все удержания WB',
		dataIndex: 'wb_retentions_amount',
		sorter: (a, b) => sorter(a, b, 'wb_retentions_amount'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			typeof value === 'object' ?
				<div>
					{formatPrice(value?.rub, '₽')}
					<div className="table__arrow">
						{arrowRender(value?.percent, '%')}
					</div>
				</div>
			: 
				<div>{formatPrice(value, '₽')}</div>
		),
		width: 240,
	},
	// {
	// 	title: 'Затраты на самовыкупы',
	// 	dataIndex: 'self_purchase_costs',
	// 	sorter: (a, b) => sorter(a, b, 'self_purchase_costs'),
	// 	sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
	// 	filterOptions: true,
	// 	render: (value) => (
	// 		<div>{formatPrice(value, '₽')}</div>
	// 	),
	// 	width: 240,
	// },
	// {
	// 	title: 'Внешние расходы',
	// 	dataIndex: 'external_expenses',
	// 	sorter: (a, b) => sorter(a, b, 'external_expenses'),
	// 	sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
	// 	filterOptions: true,
	// 	render: (value) => (
	// 		<div>
	// 			{formatPrice(value?.rub, '₽')}
	// 			<div className="table__arrow">
	// 				{arrowRender(value?.percent, '%')}
	// 			</div>
	// 		</div>
	// 	),
	// 	width: 240,
	// },
	// {
	// 	title: 'Всего внешних расходов',
	// 	dataIndex: 'expenses',
	// 	sorter: (a, b) => sorter(a, b, 'expenses'),
	// 	sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
	// 	filterOptions: true,
	// 	render: (value) => (
	// 		<div>
	// 			{formatPrice(value, '₽')}
	// 		</div>
	// 	),
	// 	width: 240,
	// },
	{
		title: 'СПП + WB реализовал',
		dataIndex: 'sold_by_wb',
		sorter: (a, b) => sorter(a, b, 'sold_by_wb'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Налоговая база',
		dataIndex: 'tax_base',
		sorter: (a, b) => sorter(a, b, 'tax_base'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => (
			<div>{formatPrice(value, '₽')}</div>
		),
		width: 240,
	},
	{
		title: 'Налог',
		dataIndex: 'tax',
		sorter: (a, b) => sorter(a, b, 'tax'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Оплата на Р/С',
		dataIndex: 'payment',
		sorter: (a, b) => sorter(a, b, 'payment'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Чистая прибыль',
		dataIndex: 'profit',
		sorter: (a, b) => sorter(a, b, 'profit'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Чистая прибыль на ед.',
		dataIndex: 'profit_per_one',
		sorter: (a, b) => sorter(a, b, 'profit_per_one'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '₽')}</div>,
		width: 240,
	},
	{
		title: 'Маржинальность по прибыли',
		dataIndex: 'marginality',
		sorter: (a, b) => sorter(a, b, 'marginality'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '%')}</div>,
		width: 240,
	},
	{
		title: 'ROI',
		dataIndex: 'return_on_investment',
		sorter: (a, b) => sorter(a, b, 'return_on_investment'),
		sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
		filterOptions: true,
		render: (value) => <div>{formatPrice(value, '%')}</div>,
		width: 240,
	},
];
