import { SortIcon } from '@/components/sharedComponents/ReportTable/ReportTable';
import { formatPrice } from '@/service/utils';
import { Tooltip, Flex, Button, ConfigProvider } from 'antd';
import { format } from 'date-fns';
import { EditIcon, CopyIcon, DeleteIcon } from '../shared/Icons';

function summaryRender(value, row, i) {
	console.log('row', row)
	if (row.key == 'summary') {
		return value;
	}
	return format(new Date(value), 'd.MM.yyyy');
}

function columnRender(value, row) {
	if (row.key == 'summary') {
		return value;
	}
	return value ? value : '-';
}

export const COSTS_COLUMNS = [
	{
		title: 'Дата',
		dataIndex: 'date',
		key: 'date',
		render: summaryRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Описание',
		dataIndex: 'description',
		key: 'description',
		render: columnRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Сумма, руб',
		dataIndex: 'sum',
		key: 'sum',
		render: (value) => formatPrice(value),
		width: `${100 / 8}%`
	},
	{
		title: 'Статья расходов',
		dataIndex: 'article',
		key: 'article',
		render: columnRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Артикул',
		dataIndex: 'sku',
		key: 'sku',
		render: columnRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Бренд',
		dataIndex: 'brand',
		key: 'brand',
		render: columnRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Магазин',
		dataIndex: 'shop',
		key: 'shop',
		render: columnRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Действия',
		dataIndex: 'action',
		key: 'action',
		width: `${100 / 8}%`
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