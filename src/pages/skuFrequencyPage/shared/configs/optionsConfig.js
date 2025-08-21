export const optionsConfig = [
    { label: 'Частотность WB', name: 'frequency_30', isActive: true, units: null},
    { label: 'Выручка (без СПП), руб', name: 'revenue_total', isActive: true, units: '₽'},
    { label: 'Выручка (с СПП), руб', name: 'revenue_total_spp', isActive: true, units: '₽'},
    { label: 'Ср. цена (без СПП), руб', name: 'avg_price_total', isActive: true, units: '₽'},
    { label: 'Ср. цена (с СПП), руб', name: 'avg_price_total_spp', isActive: true, units: '₽'},
    { label: 'Товаров с продажами, %', name: 'goods_with_sales_percent_total', isActive: true, units: '%'},
    { label: 'Кол-во товаров по запросу', name: 'goods_quantity', isActive: true, units: 'шт'},
    { label: 'Коэффициент спроса', name: 'freq_per_good', isActive: true, hasTooltip: true, tooltipText: 'Показатель, который отражает соотношение между частотностью поискового запроса и количеством товаров, предлагаемых по этому запросу. Чем выше коэффициент спроса, тем больше интерес аудитории к данной тематике и тем меньше конкуренция среди продавцов. Данный показатель рассчитывается по формуле: Частотность WB / Кол-во товаров на WB.'},
    { label: 'Кол-во продавцов', name: 'suppliers_quantity', isActive: true, units: 'шт'},
    { label: '% продавцов с продажами', name: 'suppliers_with_sales_percent', isActive: true, units: '%'},
]

export const sideOptionsConfig = [
    {
        title: null,
        isWideLayout: true,
        options: [
            //{ label: 'Отношение частотности запроса к кол-ву артикулов по запросу, шт', name: 'add_freq_per_good', isWide: true, units: 'шт'},
            { label: 'Частотность за 60 дней', name: 'frequency_60', isWide: false, units: null},
            { label: 'Частотность за 90 дней', name: 'frequency_90', isWide: false, units: null},
            { label: 'Монопольность, %', name: 'monopoly_percent', isWide: false, units: '%', hasTooltip: true, tooltipText: 'Процент выручки, приходящийся на ТОП-30 артикулов от всех артикулов на первой странице.'},
            { label: 'Кол-во артикулов по запросу, шт', name: 'top_goods_quantity', isWide: false, units: 'шт'},
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
            { label: 'Выручка за 30 дней (без СПП), руб', name: 'revenue_300', isWide: false, units: '₽'},
            { label: 'Выручка за 30 дней (с СПП), руб', name: 'revenue_300_spp', isWide: false, units: '₽'},
            { label: 'Средняя выручка за 30 дней (без СПП), руб', name: 'avg_revenue_300', isWide: false, units: '₽'},
            { label: 'Средняя выручка за 30 дней (с СПП), руб', name: 'avg_revenue_300_spp', isWide: false, units: '₽'},
            { label: '% упущенной выручки за 30 дней', name: 'lost_revenue_percent_300', isWide: false, units: '%'},
            { label: 'Средняя цена (без СПП), руб', name: 'avg_price_300', isWide: false, units: '₽'},
            { label: 'Средняя цена (с СПП), руб', name: 'avg_price_300_spp', isWide: false, units: '₽'},
            { label: '% артикулов с продажами', name: 'goods_with_sales_percent_300', isWide: false, units: '%'}
        ]
    },
]