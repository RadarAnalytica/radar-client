export const optionsConfig = [
    //basic
    { label: 'Частотность WB', name: 'frequency', isActive: true},
    { label: 'Выручка (с СПП), руб', name: 'revenue', isActive: true},
    { label: 'Ср. цена (с СПП), руб', name: 'avg_price', isActive: true},
    { label: '% товаров с продажами', name: 'goods_with_sales_percent', isActive: true},
    { label: 'Кол-во товаров по запросу', name: 'goods_quantity', isActive: true},
    { label: 'Коэффициент спроса', name: 'freq_per_good', isActive: true},
    { label: 'Кол-во продавцов', name: 'suppliers_quantity', isActive: true},
    { label: '% продавцов с продажами', name: 'suppliers_with_sales_percent', isActive: true},
    //optional
    { label: 'Рост/падение за 30 дней', name: 'g30', isActive: false},
    { label: 'Рост/падение за 60 дней', name: 'g60', isActive: false},
    { label: 'Рост/падение за 90 дней', name: 'g90', isActive: false},
    { label: 'Средняя выручка', name: 'avg_revenue', isActive: false},
    { label: 'Количество отзывов', name: 'avg_reviews', isActive: false},
    { label: 'Процент упущенной выручки', name: 'lost_revenue_percent', isActive: false},
    { label: 'Процент товаров в рекламе', name: 'advert_percent', isActive: false},
    { label: 'Процент товаров с внешней рекламой', name: 'external_advert_percent', isActive: false},
    { label: 'Монопольность', name: 'monopoly_percent', isActive: false},
    { label: 'Процент выкупа', name: 'buyout_percent', isActive: false},
    { label: 'Комиссия FBO', name: 'fbo_commision', isActive: false},
]