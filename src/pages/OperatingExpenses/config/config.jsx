import { SortIcon } from '@/components/sharedComponents/ReportTable/ReportTable';
import { formatPrice } from '@/service/utils';
import { Tooltip, Flex, Button, ConfigProvider } from 'antd';
import { format } from 'date-fns';
import { EditIcon, CopyIcon, DeleteIcon } from '../shared/Icons';

function summaryRender(value, row, i) {
	if (row.key == 'summary') {
		return value;
	}
	return format(new Date(value), 'd.MM.yyyy');
}

function valueRender(value) {
	console.log('valueRender', value);
	if (!value){
		return '-';
	}
	return formatPrice(value);
}

function columnRender(value, row) {
	if (row.key == 'summary') {
		return value;
	}
	return value ? value : '-';
}

function columnExpensesRender(value, row) {
	if (row.key == 'summary') {
		return value;
	}
	return value;
	// return value?.length ? value.join(', ') : '-';
}

export const EXPENSE_COLUMNS = [
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
		dataIndex: 'value',
		key: 'value',
		render: valueRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Статья расходов',
		dataIndex: 'expense_categories',
		key: 'expense_categories',
		// render: columnRender,
		render: columnExpensesRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Артикул',
		dataIndex: 'vendor_code',
		key: 'vendor_code',
		render: columnRender,
		width: `${100 / 8}%`
	},
	{
		title: 'Бренд',
		dataIndex: 'brand_name',
		key: 'brand_name',
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

export const CATEGORY_COLUMNS = [
	{
		title: 'Статья расходов',
		dataIndex: 'name',
		key: 'name',
		width: '50%'
	},
	{
		title: 'Действия',
		dataIndex: 'action',
		key: 'action',
		width: '50%',
	},
];
