import { formatPrice } from '../../service/utils';
import { Flex, Tooltip } from 'antd';

const renderTitle = (value, row) => {
	if (row.key == 'realization') {
		return (
			<Flex justify="space-between">
				{value}:
				<Tooltip title="Реализация">
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
				key: 'logistic',
				title: 'Логистика',
			},
			{
				key: 'commission',
				title: 'Комиссия',
			},
			{
				key: 'penalties',
				title: 'Штрафы',
			},
			{
				key: 'storage',
				title: 'Хранение',
			},
			{
				key: 'advert',
				title: 'Внутренняя реклама',
			},
			{
				key: 'other_retentions',
				title: 'Прочие удержания',
			},
			{
				key: 'paid_acceptance',
				title: 'Платная приемка',
			},
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
		title: 'Налоги (кроме зарплатных)',
	},
	{
		key: 'net_profit',
		title: 'Чистая прибыль',
	},
]

export const SCHEMA = {
	realization: {
		title: 'Реализация',
	},
	mp_discount: {
		title: 'Скидка за счет МП',
		rub: 3123.01,
		percent: 50.1,
	},
	sales: {
		title: 'Фактические продажи',
		rub: 3123.01,
		percent: 50.1,
	},
	direct_expenses: {
		title: 'Прямые расходы',
		children: {
			cost: {
				title: 'Себестоимость',
				value: 3123.01,
			},
			logistic: {
				title: 'Логистика',
				value: 3123.01,
			},
			commission: {
				title: 'Комиссия',
				value: 3123.01,
			},
			penalties: {
				title: 'Штрафы',
				value: 3123.01,
			},
			storage: {
				title: 'Хранение',
				value: 3123.01,
			},
			advert: {
				title: 'Внутренняя реклама',
				value: 3123.01,
			},
			other_retentions: {
				title: 'Прочие удержания',
				value: 3123.01,
			},
			paid_acceptance: {
				title: 'Платная приемка',
				value: 3123.01,
			},
		},
	},
	compensation: {
		title: 'Компенсация',
		rub: 3123.01,
		percent: 50.1,
	},
	gross_margin: {
		title: 'Валовая маржа',
		rub: 3123.01,
		percent: 50.1,
	},
	operating_expenses: {
		title: 'Операционные расходы',
		list: [
			{
				rub: 3123.01,
				percent: 50.1,
				name: 'Персонал',
			},
		],
	},
	operating_profit: {
		title: 'Операционная прибыль (EBITDA)',
		rub: 3123.01,
		percent: 50.1,
	},
	tax: {
		title: 'Налоги (кроме зарплатных)',
		rub: 3123.01,
		percent: 50.1,
	},
	net_profit: {
		title: 'Чистая прибыль',
		rub: 3123.01,
		percent: 50.1,
	},
};

export const RenderCell = (value) =>
	typeof value === 'object' ? (
		<div>
      {JSON.stringify(value)}
			{/* {value.rub} + {value.percent} */}
		</div>
	) : (
		<b>{value}</b>
	);


	export const TESTDATA = {
	data: [
		{
			year: 2025,
			data: {
				realization: 3123.01,
				mp_discount: {
					rub: 3123.01,
					percent: 50.1,
				},
				sales: {
					rub: 3123.01,
					percent: 50.1,
				},
				direct_expenses: {
					cost: {
						rub: 3123.01,
						percent: 50.1,
					},
					logistic: {
						rub: 3123.01,
						percent: 50.1,
					},
					commission: {
						rub: 3123.01,
						percent: 50.1,
					},
					penalties: {
						rub: 3123.01,
						percent: 50.1,
					},
					storage: {
						rub: 3123.01,
						percent: 50.1,
					},
					advert: {
						rub: 3123.01,
						percent: 50.1,
					},
					other_retentions: {
						rub: 3123.01,
						percent: 50.1,
					},
					paid_acceptance: {
						rub: 3123.01,
						percent: 50.1,
					},
				},
				compensation: {
					rub: 3123.01,
					percent: 50.1,
				},
				gross_margin: {
					rub: 3123.01,
					percent: 50.1,
				},
				operating_expenses: [
					{
						rub: 3123.01,
						percent: 50.1,
						name: 'Персонал',
					},
				],
				operating_profit: {
					rub: 3123.01,
					percent: 50.1,
				},
				tax: {
					rub: 3123.01,
					percent: 50.1,
				},
				net_profit: {
					rub: 3123.01,
					percent: 50.1,
				},
			},
			months: [
				{
					month_label: 'Апрель 2025',
					data: {
						realization: 3123.01,
						mp_discount: {
							rub: 3123.01,
							percent: 50.1,
						},
						sales: {
							rub: 3123.01,
							percent: 50.1,
						},
						direct_expenses: {
							cost: {
								rub: 3123.01,
								percent: 50.1,
							},
							logistic: {
								rub: 3123.01,
								percent: 50.1,
							},
							commission: {
								rub: 3123.01,
								percent: 50.1,
							},
							penalties: {
								rub: 3123.01,
								percent: 50.1,
							},
							storage: {
								rub: 3123.01,
								percent: 50.1,
							},
							advert: {
								rub: 3123.01,
								percent: 50.1,
							},
							other_retentions: {
								rub: 3123.01,
								percent: 50.1,
							},
							paid_acceptance: {
								rub: 3123.01,
								percent: 50.1,
							},
						},
						compensation: {
							rub: 3123.01,
							percent: 50.1,
						},
						gross_margin: {
							rub: 3123.01,
							percent: 50.1,
						},
						operating_expenses: [
							{
								rub: 3123.01,
								percent: 50.1,
								name: 'Персонал',
							},
						],
						operating_profit: {
							rub: 3123.01,
							percent: 50.1,
						},
						tax: {
							rub: 3123.01,
							percent: 50.1,
						},
						net_profit: {
							rub: 3123.01,
							percent: 50.1,
						},
					},
				},
			],
		},
	],
	message: 'Success',
};
