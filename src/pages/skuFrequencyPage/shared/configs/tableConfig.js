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
            { ruName: 'Частотность WB', engName: 'frequency', isSortable: true, isActive: true, hasRate: false }, //
            { ruName: 'Коэффициент cпроса', engName: 'freq_per_good', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Кол-во продавцов', engName: 'suppliers_quantity', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Кол-во товаров в ТОП-750 за 30 дней', engName: 'top_goods_quantity', units: 'шт', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Кол-во товаров на WB', engName: 'goods_quantity', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Выручка (с СПП)', engName: 'revenue', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. выручка в день', engName: 'avg_daily_revenue', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. цена (с СПП)', engName: 'avg_price', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Товаров с продажами', engName: 'goods_with_sales_quantity', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. выручка на товар', engName: 'avg_revenue', units: '₽', isSortable: true, isActive: true, hasRate: false }, 
            { ruName: 'Ср. выручка на товар с продажами', engName: 'avg_with_sales_revenue', units: '₽', isSortable: true, isActive: true, hasRate: false }, 
            { ruName: '% товаров с продажами', engName: 'goods_with_sales_percent', units: '%', isSortable: true, isActive: true, hasRate: false },
            { ruName: '% выручки у ТОП-30 товаров', engName: 'monopoly_percent', units: '%', isSortable: true, isActive: true, hasRate: false }, 
            { ruName: 'Ср. кол-во оценок', engName: 'avg_reviews', units: '%', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. рейтинг', engName: 'rating', isSortable: true, isActive: true, hasRate: false },
            { ruName: '% продавцов с продажами', engName: 'suppliers_with_sales_percent', units: '%', isSortable: true, isActive: true, hasRate: false }, 
            //dynamic
            { ruName: 'Динамика запроса за 30 дней', engName: 'g30', units: null, isSortable: true, isActive: false, hasRate: false }, 
            { ruName: 'Динамика запроса за 60 дней', engName: 'g60', units: null, isSortable: true, isActive: false, hasRate: false }, 
            { ruName: 'Динамика запроса за 90 дней', engName: 'g90', units: null, isSortable: true, isActive: false, hasRate: false }, 
            // side params
            { ruName: 'Процент выкупа, %', engName: 'buyout_percent', units: '%', isSortable: true, isActive: false, hasRate: false }, 
            { ruName: 'Частотность за 30 дней', engName: 'frequency_30', units: null, isSortable: true, isActive: false, hasRate: false }, 
            { ruName: 'Монопольность, %', engName: 'monopoly_percent', units: '%', isSortable: true, isActive: false, hasRate: false },  // has double
            { ruName: 'Кол-во артикулов по запросу, шт', engName: 'goods_quantity', units: 'шт', isSortable: true, isActive: false, hasRate: false },
            { ruName: 'Комиссия FBO, %', engName: 'fbo_commision', units: '%', isSortable: true, isActive: false, hasRate: false },  // ?? нет в фильтрах так что мб и тут не будет
            // first page goods
            { ruName: '% артикулов в рекламе', engName: 'advert_percent', units: '%', isSortable: true, isActive: false, hasRate: false }, 
            { ruName: '% артикулов с внешним трафиком', engName: 'external_advert_percent', units: '%', isSortable: true, isActive: false, hasRate: false }, 
            { ruName: 'Среднее кол-во отзывов у артикулов (без учета внутренней рекламы WB)', engName: 'avg_reviews', units: 'шт', isSortable: true, isActive: false, hasRate: false },
            // first 3 pages goods
            { ruName: 'Выручка за 30 дней, руб', engName: '30_days_revenue', units: '₽'},
            { ruName: 'Средняя выручка за 30 дней, руб', engName: 'avg_30_days_revenue', units: '₽', isSortable: true, isActive: false, hasRate: false },
            { ruName: '% упущенной выручки за 30 дней', engName: 'lost_revenue_percent', units: '%', isSortable: true, isActive: false, hasRate: false },
            { ruName: 'Средняя цена, руб', engName: 'f3_avg_price', units: '₽', isSortable: true, isActive: false, hasRate: false },
            { ruName: '% артикулов с продажами', engName: 'f3_goods_with_sales_percent', units: '%', isSortable: true, isActive: false, hasRate: false },


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