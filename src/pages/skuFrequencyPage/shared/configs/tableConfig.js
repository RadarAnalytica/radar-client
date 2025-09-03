import { cellRender } from "./cellRender"



export const radarTableConfig = [
    {
        title: '',
        key: 'm01',
        hidden: false,
        fixed: true,
        groupColor: 'white',
        width: 370,
        minWidth: 370,
        children: [
            {
                title: 'Поисковые запросы',
                dataIndex: 'query',
                fixed: 'left',
                width: 370,
                minWidth: 370,
                sortable: true,
                render: function (value) { return cellRender(value, this) },
                hidden: false,
            },
        ].map(_ => ({ ..._, render: _.render.bind(_), key: _.dataIndex }))
    },
    {
        title: 'Основные',
        className: 'table__mainHeader',
        key: 'm02',
        hidden: false,
        groupColor: 'white',
        children: [
            { title: 'Рейтинг качества ниши', dataIndex: 'niche_rating', width: 300, sortable: true, render: function (value) { return cellRender(value, this) }, hidden: false, tooltipText: 'Показатель рассчитывается исходя из значений выручки, коэффициента спроса, монопольности, рекламы, % выкупа и других параметров.' },
            { title: 'Выручка (с СПП), ₽', dataIndex: 'revenue_total_spp', width: 240, units: '₽', sortable: true, hidden: false },
            { title: 'Выручка (без СПП), ₽', dataIndex: 'revenue_total', width: 240, units: '₽', sortable: true, hidden: false },
            { title: 'Ср. выручка в день, ₽', dataIndex: 'avg_daily_revenue', width: 240, units: '₽', sortable: true, hidden: false },
            { title: 'Ср. цена (с СПП), ₽', dataIndex: 'avg_price_total_spp', width: 240, units: '₽', sortable: true, hidden: false },
            { title: 'Ср. цена (без СПП), ₽', dataIndex: 'avg_price_total', width: 240, units: '₽', sortable: true, hidden: false },
            { title: 'Товаров с продажами, шт', dataIndex: 'goods_with_sales_quantity_total', units: 'шт', width: 220, sortable: true, hidden: false },
            { title: 'Ср. выручка на товар, ₽', dataIndex: 'avg_revenue_total', width: 220, units: '₽', sortable: true, hidden: false },
            { title: 'Ср. выручка на товар с продажами, ₽', dataIndex: 'avg_with_sales_revenue', width: 220, units: '₽', sortable: true, hidden: false },
            { title: 'Товаров с продажами, %', dataIndex: 'goods_with_sales_percent_total', width: 220, units: '%', sortable: true, hidden: false },
            { title: 'Ср. рейтинг', dataIndex: 'avg_rating', width: 220, sortable: true, hidden: false },
            { title: 'Продавцов с продажами, %', dataIndex: 'suppliers_with_sales_percent', units: '%', width: 220, sortable: true, hidden: false },
            { title: 'Кол-во товаров на WB, шт', dataIndex: 'goods_quantity', units: 'шт', width: 220, sortable: true, hidden: false },
            { title: 'Кол-во продавцов, шт', dataIndex: 'suppliers_quantity', width: 220, units: 'шт', sortable: true, hidden: false },
            { title: 'Коэффициент cпроса', dataIndex: 'freq_per_good', width: 300, sortable: true, hidden: false, tooltipText: 'Показатель, который отражает соотношение между частотностью поискового запроса и количеством товаров, предлагаемых по этому запросу. Чем выше коэффициент спроса, тем больше интерес аудитории к данной тематике и тем меньше конкуренция среди продавцов. Данный показатель рассчитывается по формуле: Частотность WB / Кол-во товаров на WB.' },
            { title: 'Частотность за 30 дней', dataIndex: 'frequency_30', width: 220, sortable: true, hidden: false },
            { title: 'Частотность за 60 дней', dataIndex: 'frequency_60', width: 220, sortable: true, hidden: false },
            { title: 'Частотность за 90 дней', dataIndex: 'frequency_90', width: 220, sortable: true, hidden: false },
            // { title: '% выручки у ТОП-30 товаров, %', dataIndex: 'monopoly_percent', width: 220,  units: '%', sortable: true,  hidden: false },
            //{title: 'Ср. кол-во оценок, %', dataIndex: 'avg_reviews', width: 220, units: '%', sortable: true,  hidden: false },
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Динамика популярности и роста запросов',
        className: 'table__mainHeader_colored',
        key: 'm03',
        hidden: false,
        groupColor: '#5329FF0D',
        children: [
            { title: 'Динамика запроса за 30 дней, %', dataIndex: 'g30', width: 220, units: '%', sortable: true, hidden: false },
            { title: 'Динамика запроса за 60 дней, %', dataIndex: 'g60', width: 220, units: '%', sortable: true, hidden: false },
            { title: 'Динамика запроса за 90 дней, %', dataIndex: 'g90', width: 220, units: '%', sortable: true, hidden: false },
        ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Дополнительные параметры',
        className: 'table__mainHeader',
        key: 'm04',
        hidden: false,
        groupColor: 'white',
        children: [
            { title: 'Процент выкупа, %', dataIndex: 'buyout_percent', width: 220, units: '%', sortable: true, hidden: false },
            //{title: 'Частотность за 30 дней', dataIndex: 'frequency_30', width: 220, sortable: true,  hidden: false },
            { title: 'Монопольность, %', dataIndex: 'monopoly_percent', width: 300, units: '%', sortable: true, hidden: false, tooltipText: 'Процент выручки, приходящийся на ТОП-30 артикулов от всех артикулов на первой странице.' },
            //{title: 'Кол-во артикулов по запросу, шт', dataIndex: 'goods_quantity', width: 220,  units: 'шт', sortable: true,  hidden: false },
            { title: 'Кол-во товаров в ТОП-1200 за 30 дней, шт', dataIndex: 'top_goods_quantity', width: 220, units: 'шт', sortable: true, hidden: false },
            //{title: 'Комиссия FBO, %', dataIndex: 'fbo_commision', width: 220,  units: '%', sortable: true,  hidden: false },
        ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'У артикулов на первой странице',
        className: 'table__mainHeader_colored',
        key: 'm05',
        hidden: false,
        groupColor: '#5329FF0D',
        children: [
            { title: 'Артикулов в рекламе, %', dataIndex: 'advert_percent', width: 220, units: '%', sortable: true, hidden: false, tooltipText: 'Расчетное среднее значение за 30 дней' },
            { title: 'Артикулов с внешним трафиком, %', dataIndex: 'external_advert_percent', width: 220, units: '%', sortable: true, hidden: false, tooltipText: 'Расчетное среднее значение за 30 дней' },
            { title: 'Среднее кол-во отзывов у артикулов (без учета внутренней рекламы WB), шт', dataIndex: 'avg_reviews', width: 220, units: 'шт', sortable: true, hidden: false },
        ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'У артикулов на первых 3-х страницах',
        className: 'table__mainHeader',
        key: 'm06',
        hidden: false,
        children: [
            { title: 'Выручка за 30 дней (с СПП), ₽', dataIndex: 'revenue_300_spp', width: 240, units: '₽', filterOptions: true, sortable: true, hidden: false, comment: 'У артикулов на первых 3-х страницах' },
            { title: 'Выручка за 30 дней (без СПП), ₽', dataIndex: 'revenue_300', width: 240, units: '₽', filterOptions: true, sortable: true, hidden: false, comment: 'У артикулов на первых 3-х страницах' },
            { title: 'Средняя выручка за 30 дней (с СПП), ₽', dataIndex: 'avg_revenue_300_spp', width: 240, units: '₽', sortable: true, hidden: false },
            { title: 'Средняя выручка за 30 дней (без СПП), ₽', dataIndex: 'avg_revenue_300', width: 240, units: '₽', sortable: true, hidden: false },
            { title: 'Упущенной выручки за 30 дней, %', dataIndex: 'lost_revenue_percent_300', width: 220, units: '%', sortable: true, hidden: false },
            { title: 'Средняя цена (с СПП), ₽', dataIndex: 'avg_price_300_spp', width: 240, units: '₽', sortable: true, hidden: false, comment: 'У артикулов на первых 3-х страницах' },
            { title: 'Средняя цена (без СПП), ₽', dataIndex: 'avg_price_300', width: 240, units: '₽', sortable: true, hidden: false, comment: 'У артикулов на первых 3-х страницах', tooltipText: 'Расчетное среднее значение за 30 дней' },
            { title: 'Артикулов с продажами, %', dataIndex: 'goods_with_sales_percent_300', width: 220, units: '%', sortable: true, hidden: false, tooltipText: 'Расчетное среднее значение за 30 дней' },
        ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width }))
    }
].map(_ => ({ ..._, colSpan: _?.children?.length || 1}))











