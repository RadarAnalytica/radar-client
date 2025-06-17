import { SortIcon } from '../../../../components/sharedComponents/ReportTable/ReportTable';
import { formatPrice } from '../../../../service/utils';
import { Tooltip, Flex } from 'antd';

function sorter(a, b) {
    const key = this.dataIndex
    if (a.key == 'summary' || b.key == 'summary') {
        return 0;
    }

    let v1 = typeof a[key] == 'object' ? a[key]['rub'] : a[key];
    let v2 = typeof b[key] == 'object' ? b[key]['rub'] : b[key];

    return Number(v1 - v2);
}

function cellRenderer(value) {
    const { units, dataIndex } = this;
    return (
        <div
            style={{
                fontFamily: 'Mulish',
                fontWeight: 500,
                fontSize: 16,
                lineHeight: 1,
                color: '#1A1A1A'
            }}
        >
            {formatPrice(value, units)}
        </div>
    )
}

export const mainTableConfig = [
    { title: 'Дата', dataIndex: 'date', units: null, fixed: 'left', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Выручка, руб', dataIndex: 'revenue', units: '₽', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средний чек, руб', dataIndex: 'avg_bill', units: '₽', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Остатки на конец дня, шт', dataIndex: 'quantity', units: 'шт', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во артикулов, шт', dataIndex: 'sku_amount', units: 'шт', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средняя цена без СПП, руб', dataIndex: 'price', units: '₽', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Артикулов с продажами, шт', dataIndex: '', units: '₽', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во брендов, шт', dataIndex: '', units: '₽', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во брендов с продажами, шт', dataIndex: '', units: '₽', width: 226, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
]

export const goodsTableConfig = [
    { title: 'Товар', dataIndex: 'good', units: null, fixed: 'left', width: 270, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Доля заказов среди выборки, %', dataIndex: 'orders_amount', units: '%', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Артикул', dataIndex: 'sku', units: null, width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Бренд', dataIndex: 'brand', units: null, width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средняя цена без СПП, руб', dataIndex: 'avg_spp_price', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средняя скидка без СПП, %', dataIndex: 'avg_discount_no_spp', units: '%', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средний чек, руб', dataIndex: 'avg_bill', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
]

export const salesTableConfig = [
    { title: 'Категория', dataIndex: 'category', units: null, fixed: 'left', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во артикулов', dataIndex: 'sku_amount', units: 'шт', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Артикулов с продажами, шт', dataIndex: 'sku_with_sales', units: 'шт', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во брендов, шт', dataIndex: 'brands_amount', units: 'шт', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средняя цена без СПП, руб', dataIndex: 'avg_spp_price', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средняя скидка без СПП, %', dataIndex: 'avg_discount_no_spp', units: '%', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средний чек, руб', dataIndex: 'avg_bill', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Динамика выручки', dataIndex: 'revenue_dynamics', units: null, hasChart: true, width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Остатки на конец периода, шт', dataIndex: 'stock', units: 'шт', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
]

export const ordersStructByColorsTableConfig = [
    { title: 'Цвет', dataIndex: '', units: null, fixed: 'left', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Доля заказов среди выборки, %', dataIndex: '', units: '%', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во артикулов', dataIndex: '', units: 'шт', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во брендов, шт', dataIndex: '', units: 'шт', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средняя цена без СПП, руб', dataIndex: '', units: '₽', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средняя скидка без СПП, %', dataIndex: 'avg_discount_no_spp', units: '%', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средний чек, руб', dataIndex: 'avg_bill', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Динамика выручки', dataIndex: 'revenue_dynamics', units: null, hasChart: true, width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Динамика заказов', dataIndex: '', units: null, hasChart: true, width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Упущенная выручка, руб', dataIndex: '', units: '₽', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
]

export const ordersStructByWarehousesTableConfig = [
    { title: 'Склад', dataIndex: '', units: null, fixed: 'left', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Доля заказов среди выборки, %', dataIndex: '', units: '%', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средний чек, руб', dataIndex: 'avg_bill', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Динамика выручки', dataIndex: 'revenue_dynamics', units: null, hasChart: true, width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Динамика заказов', dataIndex: '', units: null, hasChart: true, width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
]

export const ordersStructBySizesTableConfig = [
    { title: 'Размер', dataIndex: '', units: null, fixed: 'left', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Доля заказов среди выборки, %', dataIndex: '', units: '%', width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средний чек, руб', dataIndex: 'avg_bill', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Динамика выручки', dataIndex: 'revenue_dynamics', units: null, hasChart: true, width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 160, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Динамика заказов', dataIndex: '', units: null, hasChart: true, width: 170, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
]




