import { SortIcon } from '@/components/sharedComponents/ReportTable/ReportTable';
import { formatPrice } from '@/service/utils';
import { Tooltip, Flex, Button, ConfigProvider } from 'antd';
import { format } from 'date-fns';
import { EditIcon, CopyIcon, DeleteIcon } from '../shared/Icons';

function summaryRender(value, row) {
	if (row.key == 'summary') {
		return value;
	}
	return format(new Date(value), 'd.MM.yyyy');
}

function actionRender(value, row) {
	if (row.key == 'summary') {
		return '-';
	}
	return (<Flex justify="start" gap={20}>
				<ConfigProvider>
					<Button
						type="text"
						icon={EditIcon}
					></Button>
					<Button
						type="text"
						icon={CopyIcon}
					></Button>
					<Button
						type="text"
						icon={DeleteIcon}
					></Button>
				</ConfigProvider>
			</Flex>)
}

function actionExpansesRender(value, row) {
	return (<Flex justify="start" gap={20}>
		<ConfigProvider>
			<Button
				type="text"
				icon={EditIcon}
			></Button>
			<Button
				type="text"
				icon={DeleteIcon}
			></Button>
		</ConfigProvider>
	</Flex>)
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
			{!!value && (
				<svg
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
				</svg>
			)}
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

export const COSTS_COLUMNS = [
	{
		title: 'Дата',
		dataIndex: 'date',
		key: 'date',
		render: summaryRender,
	},
	{
		title: 'Сумма, руб',
		dataIndex: 'sum',
		key: 'sum',
		render: (value) => formatPrice(value),
	},
	{
		title: 'Статья расходов',
		dataIndex: 'article',
		key: 'article'
	},
	{
		title: 'Артикул',
		dataIndex: 'sku',
		key: 'sku',
	},
	{
		title: 'Бренд',
		dataIndex: 'brand',
		key: 'brand',
	},
	{
		title: 'Магазин',
		dataIndex: 'shop',
		key: 'shop',
	},
	{
		title: 'Действия',
		dataIndex: 'action',
		key: 'action',
	},
];

export const ARTICLES_COLUMNS = [
	{
		title: 'Статья расходов',
		dataIndex: 'title',
		key: 'title',
		width: '50%'
	},
	{
		title: 'Действия',
		dataIndex: 'action',
		key: 'action',
		width: '50%',
	},
]