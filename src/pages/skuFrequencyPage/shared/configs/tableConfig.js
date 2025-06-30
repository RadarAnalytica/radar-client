import { cellRender } from "./cellRender"
import { Tooltip, ConfigProvider } from "antd"

export const tableConfig = [
    {
        tableName: null,
        isMain: true,
        values: [
            { ruName: 'Поисковые запросы', engName: 'query', units: null, isSortable: true, isActive: true },
        ]
    },
    {
        tableName: null,
        isMain: false,
        values: [
            //main
            { ruName: 'Рейтинг качества ниши', engName: 'niche_rating', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Частотность за 30 дней', engName: 'frequency_30', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Частотность за 60 дней', engName: 'frequency_60', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Частотность за 90 дней', engName: 'frequency_90', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Коэффициент cпроса', engName: 'freq_per_good', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Кол-во продавцов', engName: 'suppliers_quantity', isSortable: true, isActive: true, hasRate: false },
            // { ruName: 'Кол-во товаров в ТОП-750 за 30 дней', engName: 'top_goods_quantity', units: 'шт', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Кол-во товаров на WB', engName: 'stock_quantity', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Выручка (с СПП)', engName: 'revenue_total', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. выручка в день', engName: 'avg_daily_revenue_total', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. цена (с СПП)', engName: 'avg_price_total', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Товаров с продажами', engName: 'goods_with_sales_quantity', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. выручка на товар', engName: 'avg_revenue_total', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. выручка на товар с продажами', engName: 'avg_with_sales_revenue_total', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: '% товаров с продажами', engName: 'goods_with_sales_percent_total', units: '%', isSortable: true, isActive: true, hasRate: false },
            // { ruName: '% выручки у ТОП-30 товаров', engName: 'monopoly_percent', units: '%', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. кол-во оценок', engName: 'avg_reviews', units: '%', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. рейтинг', engName: 'avg_rating', isSortable: true, isActive: true, hasRate: false },
            { ruName: '% продавцов с продажами', engName: 'suppliers_with_sales_percent', units: '%', isSortable: true, isActive: true, hasRate: false },
            //dynamic
            { ruName: 'Динамика запроса за 30 дней', engName: 'g30', units: null, isSortable: true, isActive: false, hasRate: false },
            { ruName: 'Динамика запроса за 60 дней', engName: 'g60', units: null, isSortable: true, isActive: false, hasRate: false },
            { ruName: 'Динамика запроса за 90 дней', engName: 'g90', units: null, isSortable: true, isActive: false, hasRate: false },
            // side params
            { ruName: 'Процент выкупа, %', engName: 'buyout_percent', units: '%', isSortable: true, isActive: false, hasRate: false },
            //{ ruName: 'Частотность за 30 дней', engName: 'frequency_30', units: null, isSortable: true, isActive: false, hasRate: false },
            { ruName: 'Монопольность, %', engName: 'monopoly_percent', units: '%', isSortable: true, isActive: false, hasRate: false },  // has double
            { ruName: 'Кол-во товаров в ТОП-1200 за 30 дней, шт', engName: 'top_goods_quantity', units: 'шт', isSortable: true, isActive: false, hasRate: false },  // has double
            //{ ruName: 'Кол-во артикулов по запросу, шт', engName: 'goods_quantity', units: 'шт', isSortable: true, isActive: false, hasRate: false },
            //{ ruName: 'Комиссия FBO, %', engName: 'fbo_commision', units: '%', isSortable: true, isActive: false, hasRate: false },  // ?? нет в фильтрах так что мб и тут не будет
            // first page goods
            { ruName: '% артикулов в рекламе', engName: 'advert_percent', units: '%', isSortable: true, isActive: false, hasRate: false },
            { ruName: '% артикулов с внешним трафиком', engName: 'external_advert_percent', units: '%', isSortable: true, isActive: false, hasRate: false },
            { ruName: 'Среднее кол-во отзывов у артикулов (без учета внутренней рекламы WB)', engName: 'avg_reviews', units: 'шт', isSortable: true, isActive: false, hasRate: false },
            // first 3 pages goods
            //{ ruName: 'Выручка за 30 дней, руб', engName: '30_days_revenue', units: '₽' },
            //{ ruName: 'Средняя выручка за 30 дней, руб', engName: 'avg_30_days_revenue', units: '₽', isSortable: true, isActive: false, hasRate: false },
            //{ ruName: '% упущенной выручки за 30 дней', engName: 'lost_revenue_percent', units: '%', isSortable: true, isActive: false, hasRate: false },
            //{ ruName: 'Средняя цена, руб', engName: 'f3_avg_price', units: '₽', isSortable: true, isActive: false, hasRate: false },
            //{ ruName: '% артикулов с продажами', engName: 'f3_goods_with_sales_percent', units: '%', isSortable: true, isActive: false, hasRate: false },


            // items from the old version of the table
            // { ruName: 'Упущенная выручка', engName: 'lost_revenue', units: '₽', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Потенциал выручки', engName: 'potential_revenue', units: '₽', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Процент упущенной выручки', engName: 'lost_revenue_percent', units: '%', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Заказы', engName: 'orders', units: 'шт', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Упущенные заказы', engName: 'lost_orders', units: 'шт', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Процент упущенных заказов', engName: 'lost_orders_percent', units: '%', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Потенциал заказов', engName: 'potential_orders', units: 'шт', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Медианная цена', engName: 'median_price', units: '₽', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Комиссия FBS', engName: 'fbs_commision', units: '%', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Комиссия DBS', engName: 'dbs_commision', units: '%', isSortable: true, isActive: false, hasRate: false }, 
            // { ruName: 'Комиссия DBS Express', engName: 'dbs_express_commision', units: '%', isSortable: true, isActive: false, hasRate: false }, 
            //{ ruName: 'Частотность за 60 дней', engName: 'frequency_60', units: null, isSortable: true, isActive: false, hasRate: false }, 
            //{ ruName: 'Частотность за 90 дней', engName: 'frequency_90', units: null, isSortable: true, isActive: false, hasRate: false }, 
        ]
    },
]

const tooltipConfig = {
    "Рейтинг качества ниши": 'test1',
    "Коэффициент cпроса": 'test2'
}
const getTitleWithTooltip = (title) => {
    return (
        <>
            {title}
            <ConfigProvider
                theme={{
                    token: {
                        colorTextLightSolid: 'black',
                    }
                }}
            >
                <Tooltip
                    title={tooltipConfig[title]}
                    arrow={false}
                    color='white'
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8 }}>
                        <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                        <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                </Tooltip>
            </ConfigProvider>
        </>
    )
}
export const newTableConfig = [
    // Main column: Поисковые запросы
    {
        title: '',
        className: 'first__cell',
        children: [
            {
                className: 'first__cell',
                title: 'Поисковые запросы',
                dataIndex: 'query',
                fixed: 'left',
                width: 360,
                sorter: (a, b) => sorter(a, b, 'query'),
                sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
                filterOptions: true,
                render: function (value) { return cellRender(value, this) }
            },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    {
        title: 'Основные',
        className: 'table__mainHeader',
        children: [
            { title: getTitleWithTooltip('Рейтинг качества ниши'), dataIndex: 'niche_rating', width: 240, sorter: (a, b) => sorter(a, b, 'rating'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Частотность за 30 дней', dataIndex: 'frequency_30', width: 240, sorter: (a, b) => sorter(a, b, 'frequency'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Частотность за 30 дней', dataIndex: 'frequency_60', width: 240, sorter: (a, b) => sorter(a, b, 'frequency'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Частотность за 30 дней', dataIndex: 'frequency_90', width: 240, sorter: (a, b) => sorter(a, b, 'frequency'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: getTitleWithTooltip('Коэффициент cпроса'), dataIndex: 'freq_per_good', width: 240, sorter: (a, b) => sorter(a, b, 'freq_per_good'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Кол-во продавцов', dataIndex: 'suppliers_quantity', width: 240, sorter: (a, b) => sorter(a, b, 'suppliers_quantity'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Кол-во товаров на WB', dataIndex: 'stock_quantity', width: 240, sorter: (a, b) => sorter(a, b, 'goods_quantity'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Выручка (с СПП), ₽', dataIndex: 'revenue_total', width: 240, units: '₽', sorter: (a, b) => sorter(a, b, 'revenue'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Ср. выручка в день, ₽', dataIndex: 'avg_daily_revenue_total', width: 240, units: '₽', sorter: (a, b) => sorter(a, b, 'avg_daily_revenue'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Ср. цена (с СПП), ₽', dataIndex: 'avg_price_total', width: 240, units: '₽', sorter: (a, b) => sorter(a, b, 'avg_price'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Товаров с продажами', dataIndex: 'goods_with_sales_quantity', width: 240, sorter: (a, b) => sorter(a, b, 'goods_with_sales_quantity'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Ср. выручка на товар, ₽', dataIndex: 'avg_revenue_total', width: 240, units: '₽', sorter: (a, b) => sorter(a, b, 'avg_revenue'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Ср. выручка на товар с продажами, ₽', dataIndex: 'avg_with_sales_revenue_total', width: 240, units: '₽', sorter: (a, b) => sorter(a, b, 'avg_with_sales_revenue'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: '% товаров с продажами, %', dataIndex: 'goods_with_sales_percent_total', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'goods_with_sales_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            // { title: '% выручки у ТОП-30 товаров, %', dataIndex: 'monopoly_percent', width: 240,  units: '%', sorter: (a, b) => sorter(a, b, 'monopoly_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Ср. кол-во оценок, %', dataIndex: 'avg_reviews', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'avg_reviews'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Ср. рейтинг', dataIndex: 'avg_rating', width: 240, sorter: (a, b) => sorter(a, b, 'rating'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: '% продавцов с продажами, %', dataIndex: 'suppliers_with_sales_percent', units: '%', width: 240, sorter: (a, b) => sorter(a, b, 'suppliers_with_sales_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    {
        title: 'Динамика популярности и роста запросов',
        className: 'table__mainHeader_colored',
        children: [
            { className: 'cell__red', title: 'Динамика запроса за 30 дней', dataIndex: 'g30', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'g30'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { className: 'cell__red', title: 'Динамика запроса за 60 дней', dataIndex: 'g60', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'g60'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { className: 'cell__red', title: 'Динамика запроса за 90 дней', dataIndex: 'g90', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'g90'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    {
        title: 'Дополнительные параметры',
        className: 'table__mainHeader',
        children: [
            { title: 'Процент выкупа, %', dataIndex: 'buyout_percent', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'buyout_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            //{ title: 'Частотность за 30 дней', dataIndex: 'frequency_30', width: 240, sorter: (a, b) => sorter(a, b, 'frequency_30'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Монопольность, %', dataIndex: 'monopoly_percent', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'monopoly_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            //{ title: 'Кол-во артикулов по запросу, шт', dataIndex: 'goods_quantity', width: 240,  units: 'шт', sorter: (a, b) => sorter(a, b, 'goods_quantity'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { title: 'Кол-во товаров в ТОП-1200 за 30 дней, шт', dataIndex: 'top_goods_quantity', width: 240, sorter: (a, b) => sorter(a, b, 'top_goods_quantity'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            //{ title: 'Комиссия FBO, %', dataIndex: 'fbo_commision', width: 240,  units: '%', sorter: (a, b) => sorter(a, b, 'fbo_commision'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    {
        title: 'У артикулов на первой странице',
        className: 'table__mainHeader_colored',
        children: [
            { className: 'cell__red', title: '% артикулов в рекламе, %', dataIndex: 'advert_percent', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'advert_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { className: 'cell__red', title: '% артикулов с внешним трафиком, %', dataIndex: 'external_advert_percent', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'external_advert_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
            { className: 'cell__red', title: 'Среднее кол-во отзывов у артикулов (без учета внутренней рекламы WB), шт', dataIndex: 'avg_reviews', width: 240, sorter: (a, b) => sorter(a, b, 'avg_reviews'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
        ].map(_ => ({ ..._, render: _.render.bind(_) }))
    },
    // {
    //     title: 'У артикулов на первых 3-х страницах',
    //     className: 'table__mainHeader',
    //     children: [
    //         { title: 'Выручка за 30 дней, руб', dataIndex: 'revenue_300', width: 240, units: '₽', filterOptions: true, render: function (value) { return cellRender(value, this) } },
    //         { title: 'Средняя выручка за 30 дней, руб', dataIndex: 'avg_revenue_300', width: 240, units: '₽', sorter: (a, b) => sorter(a, b, 'avg_30_days_revenue'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
    //         { title: '% упущенной выручки за 30 дней, %', dataIndex: 'lost_revenue_percent', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'lost_revenue_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
    //         { title: 'Средняя цена, руб', dataIndex: 'avg_price_300', width: 240, units: '₽', sorter: (a, b) => sorter(a, b, 'f3_avg_price'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
    //         { title: '% артикулов с продажами, %', dataIndex: 'goods_with_sales_percent_300', width: 240, units: '%', sorter: (a, b) => sorter(a, b, 'f3_goods_with_sales_percent'), sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />, filterOptions: true, render: function (value) { return cellRender(value, this) } },
    //     ].map(_ => ({ ..._, render: _.render.bind(_) }))
    // }
]
//.map(_ => ({ ..._, render:  _.render ? _.render.bind(_) : undefined }));
function SortIcon({ sortOrder }) {
    return (
        <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        // style={{ marginLeft: 10, marginRight: 10 }}
        //className={styles.sortIcons}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
                fill={sortOrder === 'ascend' ? '#5329FF' : 'currentColor'}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
                fill={sortOrder === 'descend' ? '#5329FF' : 'currentColor'}
            />
        </svg>
    );
}





/**
 * {
        title: 'Неделя',
        dataIndex: 'week_label',
        fixed: 'left',
        width: 360,
        render: summaryRender,
    },
    {
        title: 'Выкупы, руб',
        dataIndex: 'purchases_rub',
        sorter: (a, b) => sorter(a, b, 'purchases'),
        sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
        filterOptions: true,
        render: (value) => (
            <div>
                {formatPrice(value)}
            </div>
        ),
        width: 240,
    },
    {
        title: 'Выкупы, шт',
        dataIndex: 'purchases_quantity',
        sorter: (a, b) => sorter(a, b, 'purchases'),
        sortIcon: ({ sortOrder }) => <SortIcon sortOrder={sortOrder} />,
        filterOptions: true,
        render: (value) => (
            <div>
                {formatPrice(value)}
            </div>
        ),
        width: 240,
    },
 */