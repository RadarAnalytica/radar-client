import { menuIcons } from "../icons/icons"

export const menuConfig = [
    {
        id: 0,
        name: 'analysis',
        label: 'Анализ конкурентов',
        icon: menuIcons.analysis,
        children: [
            {
                id: 1,
                url: '/sku-analysis',
                label: 'Анализ артикула',
                isActive: true,
                isNew: false,
            },
            {
                id: 2,
                url: '/supplier-analysis',
                label: 'Анализ поставщика',
                isActive: true,
                isNew: true,
                features: ['popular']
            },
            {
                id: 3,
                url: '/category-analysis',
                label: 'Анализ категории',
                isActive: false,
                isNew: false
            },
            {
                id: 3,
                url: '/sku-frequency',
                label: 'Частотность артикула',
                isActive: false,
                isNew: false
            },
            {
                id: 4,
                url: '/calculate',
                label: 'Калькулятор unit-экономики товара',
                isActive: true,
                isNew: false
            },
        ]
    },
    {
        id: 1,
        name: 'trends_analysis',
        label: 'Анализ ниши и трендов',
        icon: menuIcons.trends_analysis,
        children: [
            {
                id: 3,
                url: '/monitoring',
                label: 'Поиск прибыльной ниши',
                isActive: true,
                isNew: true,
                features: ['popular']
            },
            {
                id: 1,
                url: '/trending-requests',
                label: 'Поиск трендовых запросов',
                isActive: true,
                isNew: false
            },
            {
                id: 2,
                url: '/trend-analysis',
                label: 'Анализ трендовой динамики запросов',
                isActive: true,
                isNew: false
            },
        ]
    },
    {
        id: 2,
        name: 'finance',
        label: 'Мои финансы',
        icon: menuIcons.finance,
        children: [
            {
                id: 1,
                url: '/dashboard',
                label: 'Сводка продаж',
                isActive: true,
                isNew: false
            },
            {
                id: 8,
                url: '/rnp',
                label: 'Рука на пульсе (РНП)',
                isActive: true,
                isNew: true,
            },
            {
                id: 2,
                url: '/main', //исправить
                label: 'По неделям',
                isActive: false,
                isNew: false
            },
            {
                id: 3,
                url: '/main', // исправить
                label: 'ОПиУ',
                isActive: false,
                isNew: false
            },
            {
                id: 6,
                url: '/report-week',
                label: 'Отчет по неделям',
                isActive: true,
                isNew: false
            },
            {
                id: 7,
                url: '/report-profit-loss', 
                label: 'Отчет о прибыли и убытках',
                isActive: true,
                isNew: false
            },
            {
                id: 4,
                url: '/report-main',
                label: 'Оцифровка еженедельных отчетов (ручная)',
                hasTopBorder: true,
                isActive: true,
                isNew: false
            },
            {
                id: 8,
                url: '/operating-expenses', 
                label: 'Операционные расходы',
                isActive: true,
                isNew: true
            },
        ]
    },
    {
        id: 3,
        name: 'goods',
        label: 'Мои товары',
        icon: menuIcons.goods,
        children: [
            {
                id: 1,
                url: '/orders-map',
                label: 'География заказов',
                isActive: true,
                isNew: false
            },
            {
                id: 2,
                url: '/abc-data',
                label: 'ABC-анализ',
                isActive: true,
                isNew: false
            },
            {
                id: 3,
                url: '/stock-analysis',
                label: 'Аналитика по товарам',
                isActive: true,
                isNew: false
            },
            {
                id: 4,
                url: '/selfcost',
                label: 'Себестоимость',
                isActive: true,
                hasTopBorder: true,
            },
            {
                id: 5,
                url: '/groups',
                label: 'Группы товаров',
                isActive: true,
                isNew: false,
            },
        ]
    },
    {
        id: 4,
        name: 'seo',
        label: 'SEO',
        icon: menuIcons.seo,
        children: [
            {
                id: 1,
                url: '/ai-generator',
                label: 'Генерация описания',
                isActive: true,
                isNew: false
            },
            {
                id: 2,
                url: '/rank-analysis',
                label: 'Сравнение SEO с ТОПами',
                isActive: true,
                isNew: false
            },
        ]
    },
]

export const adminConfig = {
    name: 'admin',
    label: 'Администрирование',
    icon: menuIcons.admin,
    children: [
        {
            id: 1,
            url: '/blog',
            label: 'Блог',
            isActive: true,
            isNew: false
        },
        {
            id: 2,
            url: '/admin-dashboard',
            label: 'Дашборд',
            isActive: true,
            isNew: false
        },
        {
            id: 2,
            url: '/admin-referal',
            label: 'Реферальная программа',
            isActive: true,
            isNew: false
        },
    ]
}