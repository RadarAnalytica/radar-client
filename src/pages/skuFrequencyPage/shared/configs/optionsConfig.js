export const optionsConfig = [
    { label: 'Частотность WB', name: 'frequency', isActive: true},
    { label: 'Выручка (с СПП), руб', name: 'revenue', isActive: true},
    { label: 'Ср. цена (с СПП), руб', name: 'avg_price', isActive: true},
    { label: '% товаров с продажами', name: 'goods_with_sales_percent', isActive: true},
    { label: 'Кол-во товаров по запросу', name: 'goods_quantity', isActive: true},
    { label: 'Коэффициент спроса', name: 'freq_per_good', isActive: true},
    { label: 'Кол-во продавцов', name: 'suppliers_quantity', isActive: true},
    { label: '% продавцов с продажами', name: 'suppliers_with_sales_percent', isActive: true},
]

export const sideOptionsConfig = [
    {
        title: null,
        isWideLayout: true,
        options: [
            { label: 'Отношение частотности запроса к кол-ву артикулов по запросу, шт', name: 'freq_per_good', isWide: true},
            { label: 'Частотность за 30 дней', name: 'g30', isWide: false},
            { label: 'Монопольность', name: 'monopoly_percent', isWide: false},
            { label: 'Кол-во товаров по запросу', name: 'goods_quantity', isWide: false},
            { label: 'Процент выкупа', name: 'buyout_percent', isWide: false},
            
        ]
    },
    {
        title: 'У артикулах на первой странице',
        isWideLayout: true,
        options: [
            { label: 'Процент артикулов в рекламе', name: 'advert_percent', isWide: false},
            { label: 'Процент артикулов с внешней рекламой', name: 'external_advert_percent', isWide: false},
            { label: 'Количество отзывов', name: 'avg_reviews', isWide: true}
        ]
    },
    {
        title: 'У артикулах на первых 3-х страницах',
        isWideLayout: true,
        options: [
            { label: 'Выручка за 30 дней, руб', name: '30_days_revenue', isWide: false},
            { label: 'Средняя выручка за 30 дней, руб', name: 'avg_30_days_revenue', isWide: false},
            { label: 'Процент упущенной выручки за 30 дней', name: 'lost_revenue_percent', isWide: false},
            { label: 'Средняя цена', name: 'avg_price', isWide: false},
            { label: '% артикулов с продажами', name: 'articles_with_sales_percent', isWide: false}
        ]
    },
]