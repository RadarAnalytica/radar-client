import { formatPrice } from '../../../../service/utils';
import { TableMiniChart } from '../../features';
import { ProductCell } from '../../widgets/tableWidget/productCell';
import moment from 'moment';

function cellRenderer(value, record) {
  const { units, dataIndex } = this;


  if (dataIndex === 'date') {
    return (
      <div>
        {moment(value).format('DD.MM.YYYY')}
      </div>
    )
  }
  if (dataIndex === 'revenue_dynamics') {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
      >
        <TableMiniChart
          data={value}
          color='#5329FF'
        />
      </div>
    )
  }
  if (dataIndex === 'orders_dynamics') {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
      >
        <TableMiniChart
          data={value}
          color='#F0AD00'
        />
      </div>
    )
  }
  if (dataIndex === 'wb_id_name') {
    return (
      <ProductCell value={value} rowData={record} />
    )
  }

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
      {units ? formatPrice(value, units) : value}
    </div>
  )
}

function SortIcon({ sortOrder }) {
  return (
    <button
      style={{
        //background: sortOrder === 'ASC' ? 'red' : 'blue',
        background: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8C8C8C'
      }}
    >
      <svg
        width="24"
        viewBox="0 0 24 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      // style={{ marginLeft: 10, marginRight: 10 }}
      //className={styles.sortIcons}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
          fill={sortOrder === 'ASC' ? '#5329FF' : 'currentColor'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
          fill={sortOrder === 'DESC' ? '#5329FF' : 'currentColor'}
        />
      </svg>
    </button>
  );
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
  { title: 'Дата', dataIndex: 'date', units: null, fixed: 'left', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Выручка, руб', dataIndex: 'revenue', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Средний чек, руб', dataIndex: 'avg_check', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Остатки на конец дня, шт', dataIndex: 'stock_quantity', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Кол-во артикулов, шт', dataIndex: 'goods_quantity', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Средняя цена без СПП, руб', dataIndex: 'avg_price', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Артикулов с продажами, шт', dataIndex: 'goods_with_sales_quantity', units: 'шт', width: 350, render: cellRenderer, filterOptions: true, },
  { title: 'Кол-во брендов, шт', dataIndex: 'brands_quantity', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Кол-во брендов с продажами, шт', dataIndex: 'brands_with_sales_quantity', units: 'шт', width: 400, render: cellRenderer, filterOptions: true, },
].map(_ => ({ ..._, render: cellRenderer.bind(_), sortDirections: ['ASC', 'DESC'], sorter: true, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} /> }))

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
  { title: 'Товар', dataIndex: 'wb_id_name', units: null, fixed: 'left', width: 500, render: cellRenderer, filterOptions: true, },
  { title: 'Доля заказов среди выборки, %', dataIndex: 'share_percent', units: '%', width: 350, render: cellRenderer, filterOptions: true, },
  { title: 'Артикул', dataIndex: 'wb_id', units: null, width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Бренд', dataIndex: 'brand_name', units: null, width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Средняя цена без СПП, руб', dataIndex: 'avg_price', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Средняя скидка без СПП, %', dataIndex: 'avg_discount', units: '%', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Средний чек, руб', dataIndex: 'avg_check', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
].map(_ => ({ ..._, render: cellRenderer.bind(_), sorter: true, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} /> }))


/**
 * "subject_name": "Вентиляторы",
            "goods_quantity": 1,
            "goods_with_sales_quantity": 0,
            "brands_quantity": 1,
            "brands_with_sales_quantity": 0,
            "avg_price": 1799,
            "avg_check": 0,
            "avg_discount": 60,
            "revenue": 0,
            "orders": 0,
            "quantity": 8,
            "revenue_dynamics": [
 */

export const salesTableConfig = [
  { title: 'Категория', dataIndex: 'subject_name', units: null, fixed: 'left', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Кол-во артикулов', dataIndex: 'goods_quantity', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Артикулов с продажами, шт', dataIndex: 'goods_with_sales_quantity', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Кол-во брендов, шт', dataIndex: 'brands_quantity', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Средняя цена без СПП, руб', dataIndex: 'avg_price', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Средняя скидка без СПП, %', dataIndex: 'avg_discount', units: '%', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Средний чек, руб', dataIndex: 'avg_check', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Динамика выручки', dataIndex: 'revenue_dynamics', units: null, hasChart: true, width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
  { title: 'Остатки на конец периода, шт', dataIndex: 'quantity', units: 'шт', width: 300, render: cellRenderer, filterOptions: true, },
].map(_ => ({ ..._, render: cellRenderer.bind(_), sorter: true, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} /> }))

export const ordersStructByColorsTableConfig = [
  { title: 'Цвет', dataIndex: '', units: null, fixed: 'left', width: 270, render: cellRenderer, filterOptions: true, },
  { title: 'Доля заказов среди выборки, %', dataIndex: '', units: '%', width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Кол-во артикулов', dataIndex: '', units: 'шт', width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Кол-во брендов, шт', dataIndex: '', units: 'шт', width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Средняя цена без СПП, руб', dataIndex: '', units: '₽', width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Средняя скидка без СПП, %', dataIndex: 'avg_discount_no_spp', units: '%', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Средний чек, руб', dataIndex: 'avg_bill', units: '₽', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Динамика выручки', dataIndex: 'revenue_dynamics', units: null, hasChart: true, width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Динамика заказов', dataIndex: '', units: null, hasChart: true, width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Упущенная выручка, руб', dataIndex: '', units: '₽', width: 170, render: cellRenderer, filterOptions: true, },
].map(_ => ({ ..._, render: cellRenderer.bind(_), sorter: true, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} /> }))

/*
[
  {
    "warehouse_name": "string",
    "share_percent": 0,
    "avg_check": 0,
    "revenue": 0,
    "revenue_dynamics": [
      {
        "date": "2025-12-01",
        "item": 1
      }
    ],
    "orders": 0,
    "orders_dynamics": [
      {
        "date": "2025-12-01",
        "item": 1
      }
    ]
  }
]
 */

export const ordersStructByWarehousesTableConfig = [
  { title: 'Склад', dataIndex: 'warehouse_name', units: null, fixed: 'left', width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Доля заказов среди выборки, %', dataIndex: 'share_percent', units: '%', width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Средний чек, руб', dataIndex: 'avg_check', units: '₽', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Динамика выручки', dataIndex: 'revenue_dynamics', units: null, hasChart: true, width: 160, render: cellRenderer,  filterOptions: true, },
  { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Динамика заказов', dataIndex: 'orders_dynamics', units: null, hasChart: true, width: 170, render: cellRenderer,  filterOptions: true, },
].map(_ => ({ ..._, render: cellRenderer.bind(_), sorter: true, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} /> }))

/**
 *  {
    "size_name": "string",
    "share_percent": 0,
    "avg_check": 0,
    "revenue": 0,
    "revenue_dynamics": [
      {
        "date": "2025-12-01",
        "item": 1
      }
    ],
    "orders": 0,
    "orders_dynamics": [
      {
        "date": "2025-12-01",
        "item": 1
      }
    ]
  }
 */

export const ordersStructBySizesTableConfig = [
  { title: 'Размер', dataIndex: 'size_name', units: null, fixed: 'left', width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Доля заказов среди выборки, %', dataIndex: 'share_percent', units: '%', width: 170, render: cellRenderer, filterOptions: true, },
  { title: 'Средний чек, руб', dataIndex: 'avg_check', units: '₽', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Вручка, руб', dataIndex: 'revenue', units: '₽', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Динамика выручки', dataIndex: 'revenue_dynamics', units: null, hasChart: true, width: 160, render: cellRenderer,  filterOptions: true, },
  { title: 'Заказы, шт', dataIndex: 'orders', units: 'шт', width: 160, render: cellRenderer, filterOptions: true, },
  { title: 'Динамика заказов', dataIndex: 'orders_dynamics', units: null, hasChart: true, width: 170, render: cellRenderer,  filterOptions: true, },
].map(_ => ({ ..._, render: cellRenderer.bind(_), sorter: true, sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} /> }))




