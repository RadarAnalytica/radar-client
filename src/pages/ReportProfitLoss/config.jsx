import { formatPrice } from '../../service/utils';
import { Flex, Tooltip } from 'antd';

const renderTitle = (value, row) => {
	if (row.key == 'realization') {
		return (
			<Flex justify="space-between">
				{value}
				{/* <Tooltip title="Реализация">
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
				</Tooltip> */}
			</Flex>
		);
	}
	if (row.key == 'direct_expenses'){
		return (<span className="ant-table-cell-direct">{value}</span>)
	}
	// console.log('summaryRender', row)
	return value;
};

export const COLUMNS = [
	{
		title: 'Статья',
		key: 'title',
		dataIndex: 'title',
		fixed: 'left',
		width: 400,
		render: renderTitle,
	},
];

export const ROWS = [
	{
		key: 'realization',
		title: 'Реализация',
	},
	{
		key: 'mp_discount',
		title: 'Скидка за счет МП',
	},
	{
		key: 'sales',
		title: 'Фактические продажи',
	},
	{
		key: 'direct_expenses',
		title: 'Прямые расходы',
		children: [
			{
				key: 'cost',
				title: 'Себестоимость',
			},
			{
				key: 'advert',
				title: 'Внутренняя реклама',
			},
			{
				key: 'storage',
				title: 'Хранение',
			},
			{
				key: 'paid_acceptance',
				title: 'Платная приемка',
			},
			{
				key: 'commission',
				title: 'Комиссия',
			},
			{
				key: 'logistic',
				title: 'Логистика',
			},
			
			{
				key: 'penalties',
				title: 'Штрафы',
			},
			
			
			// {
			// 	key: 'other_retentions',
			// 	title: 'Прочие удержания',
			// },
			
		]
	},
	{
		key: 'compensation',
		title: 'Компенсация',
	},
	{
		key: 'gross_margin',
		title: 'Валовая маржа',
	},
	// {
	// 	key: 'operating_expenses',
	// 	title: 'Операционные расходы',
	// },
	{
		key: 'operating_profit',
		title: 'Операционная прибыль (EBITDA)',
	},
	{
		key: 'tax',
		title: 'Налоги',
	},
	{
		key: 'net_profit',
		title: 'Чистая прибыль',
	},
];