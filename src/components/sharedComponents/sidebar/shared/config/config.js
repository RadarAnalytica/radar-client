import { newIcons } from "../icons/icons"

export const menuConfig = [
    {
        id: 0,
        name: 'analysis',
        label: 'Анализ конкурентов',
        icon: newIcons.analysis,
        children: [
            {
                id: 1,
                url: '/sku-analysis',
                label: 'Анализ артикула',
                isActive: true,
                isNew: false
            },
            {
                id: 2,
                url: '/supplier-analysis',
                label: 'Анализ поставщика',
                isActive: false,
                isNew: false
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
                url: '/monitoring',
                label: 'Частотность артикула ',
                isActive: true,
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
        icon: newIcons.trends_analysis,
        children: [
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
        icon: newIcons.finance,
        children: [
            {
                id: 1,
                url: '/dashboard',
                label: 'Сводка продаж',
                isActive: true,
                isNew: false
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
                id: 4,
                url: '/report-main',
                label: 'Оцифровка еженедельных отчетов (ручная)',
                isActive: true,
                isNew: false
            },
            {
                id: 5,
                url: '/main', 
                label: 'Операционные расходы',
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
                label: 'Отчет о прибылях и убытках',
                isActive: true,
                isNew: true
            },
        ]
    },
    {
        id: 3,
        name: 'goods',
        label: 'Мои товары',
        icon: newIcons.goods,
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
        icon: newIcons.seo,
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
                url: '/seo',
                label: 'Сравнение SEO с ТОПами',
                isActive: true,
                isNew: false
            },
        ]
    },
]



