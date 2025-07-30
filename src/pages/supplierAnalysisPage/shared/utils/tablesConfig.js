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

/**
 *     {
        "date": "2025-06-29",
        "revenue": 0,
        "orders": 0,
        "avg_check": 0,
        "stock_quantity": 8,
        "goods_quantity": 1,
        "goods_with_sales_quantity": 0,
        "avg_price": 1789,
        "brands_quantity": 1,
        "brands_with_sales_quantity": 0
    },
 */

export const mainTableConfig = [
    { title: 'Дата', dataIndex: 'date', units: null, fixed: 'left', width: 270, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Выручка, руб', dataIndex: 'revenue', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средний чек, руб', dataIndex: 'avg_check', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Остатки на конец дня, шт', dataIndex: 'stock_quantity', units: 'шт', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во артикулов, шт', dataIndex: 'goods_quantity', units: 'шт', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Средняя цена без СПП, руб', dataIndex: 'avg_price', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Артикулов с продажами, шт', dataIndex: 'goods_with_sales_quantity', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во брендов, шт', dataIndex: 'brands_quantity', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
    { title: 'Кол-во брендов с продажами, шт', dataIndex: 'brands_with_sales_quantity', units: '₽', width: 180, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
].map(_ => ({..._, render: cellRenderer.bind(_), sorter: undefined, sortIcon: undefined}))

/**
 * 
 * {
            "image_url": "https://basket-12.wbbasket.ru/vol1695/part169571/169571619/images/c246x328/1.webp",
            "wb_id_name": "Портативные, мини вентиляторы",
            "wb_id_url": "https://www.wildberries.ru/catalog/169571619/detail.aspx",
            "share_percent": 0.0,
            "wb_id": 169571619,
            "brand_name": "Alma_unimarket",
            "brand_url": "https://www.wildberries.ru/brands/310438460-almaunimarket",
            "avg_price": 1799,
            "avg_discount": 60,
            "avg_check": 0,
            "revenue": 0
        }
 */



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
    { title: 'Категория', dataIndex: 'category', units: null, fixed: 'left', width: 270, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
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
    { title: 'Цвет', dataIndex: '', units: null, fixed: 'left', width: 270, render: cellRenderer, sorter, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true,},
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




