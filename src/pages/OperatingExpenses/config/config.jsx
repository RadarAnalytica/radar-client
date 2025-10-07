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
	console.log('valueRender', value)
	if (!value){
		return '-'
	}
	return formatPrice(value)
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
	},
	{
		title: 'Описание',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Сумма, руб',
		dataIndex: 'value',
		key: 'value',
		units: ' ',
	},
	{
		title: 'Статья расходов',
		dataIndex: 'expense_categories',
		key: 'expense_categories',
	},
	{
		title: 'Артикул',
		dataIndex: 'vendor_code',
		key: 'vendor_code',
	},
	{
		title: 'Бренд',
		dataIndex: 'brand_name',
		key: 'brand_name',
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
].map((_) => ({ ..._, width: `${100 / 8}%`, minWidth: `${100 / 8}%`, maxWidth: `${100 / 4}%` }));

export const CATEGORY_COLUMNS = [
	{
		title: 'Статья расходов',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Действия',
		dataIndex: 'action',
		key: 'action',
	},
].map((_) => ({ ..._, width: `${100 / 2}%`, minWidth: `${100 / 2}%`, maxWidth: `${100 / 2}%` }));
