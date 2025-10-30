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
		title: 'Тип',
		dataIndex: 'is_periodic',
		key: 'is_periodic',
		width: 120,
		minWidth: 100,
		maxWidth: 150,
	},
	{
		title: 'Дата',
		dataIndex: 'date',
		key: 'date',
		width: 120,
		minWidth: 100,
		maxWidth: 200,
	},
	{
		title: 'Описание',
		dataIndex: 'description',
		key: 'description',
		width: 200,
		minWidth: 150,
		maxWidth: 400,
	},
	{
		title: 'Сумма, руб',
		dataIndex: 'value',
		key: 'value',
		units: ' ',
		width: 150,
		minWidth: 120,
		maxWidth: 250,
	},
	{
		title: 'Статья расходов',
		dataIndex: 'expense_categories',
		key: 'expense_categories',
		width: 180,
		minWidth: 150,
		maxWidth: 350,
	},
	{
		title: 'Артикул',
		dataIndex: 'vendor_codes',
		key: 'vendor_codes',
		width: 150,
		minWidth: 120,
		maxWidth: 250,
	},
	{
		title: 'Бренд',
		dataIndex: 'brand_names',
		key: 'brand_names',
		width: 150,
		minWidth: 120,
		maxWidth: 250,
	},
	{
		title: 'Магазин',
		dataIndex: 'shops',
		key: 'shops',
		width: 180,
		minWidth: 150,
		maxWidth: 300,
	},
	{
		title: 'Действия',
		dataIndex: 'action',
		key: 'action',
		width: 150,
		minWidth: 130,
		maxWidth: 200,
	},
];

export const CATEGORY_COLUMNS = [
	{
		title: 'Статья расходов',
		dataIndex: 'name',
		key: 'name',
		width: 400,
		minWidth: 300,
		maxWidth: 600,
	},
	{
		title: 'Действия',
		dataIndex: 'action',
		key: 'action',
		width: 200,
		minWidth: 150,
		maxWidth: 300,
	},
];
