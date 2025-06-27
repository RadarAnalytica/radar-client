export const optionsConfig = [
    { label: 'Частотность WB', name: 'frequency', isActive: true, units: null},
    { label: 'Выручка (с СПП), руб', name: 'revenue', isActive: true, units: '₽'},
    { label: 'Ср. цена (с СПП), руб', name: 'avg_price', isActive: true, units: '₽'},
    { label: '% товаров с продажами', name: 'goods_with_sales_percent', isActive: true, units: '%'},
    { label: 'Кол-во товаров по запросу', name: 'goods_quantity', isActive: true, units: 'шт'},
    { label: 'Коэффициент спроса', name: 'freq_per_good', isActive: true},
    { label: 'Кол-во продавцов', name: 'suppliers_quantity', isActive: true, units: 'шт'},
    { label: '% продавцов с продажами', name: 'suppliers_with_sales_percent', isActive: true, units: '%'},
]

export const sideOptionsConfig = [
    {
        title: null,
        isWideLayout: true,
        options: [
            { label: 'Отношение частотности запроса к кол-ву артикулов по запросу, шт', name: 'add_freq_per_good', isWide: true, units: 'шт'},
            { label: 'Частотность за 30 дней', name: 'add_frequency', isWide: false, units: null},
            { label: 'Монопольность, %', name: 'monopoly_percent', isWide: false, units: '%'},
            { label: 'Кол-во товаров по запросу, шт', name: 'add_goods_quantity', isWide: false, units: 'шт'},
            { label: 'Процент выкупа, %', name: 'buyout_percent', isWide: false, units: '%'},
            
        ]
    },
    {
        title: 'У артикулов на первой странице',
        isWideLayout: true,
        options: [
            { label: '% артикулов в рекламе', name: 'advert_percent', isWide: false, units: '%'},
            { label: '% артикулов с внешним трафиком', name: 'external_advert_percent', isWide: false, units: '%'},
            { label: 'Среднее кол-во отзывов у артикулов (без учета внутренней рекламы WB)', name: 'avg_reviews', isWide: true, units: 'шт'}
        ]
    },
    {
        title: 'У артикулов на первых 3-х страницах',
        isWideLayout: true,
        options: [
            { label: 'Выручка за 30 дней, руб', name: '30_days_revenue', isWide: false, units: '₽'},
            { label: 'Средняя выручка за 30 дней, руб', name: 'avg_30_days_revenue', isWide: false, units: '₽'},
            { label: '% упущенной выручки за 30 дней', name: 'lost_revenue_percent', isWide: false, units: '%'},
            { label: 'Средняя цена, руб', name: 'f3_avg_price', isWide: false, units: '₽'},
            { label: '% артикулов с продажами', name: 'f3_goods_with_sales_percent', isWide: false, units: '%'}
        ]
    },
]