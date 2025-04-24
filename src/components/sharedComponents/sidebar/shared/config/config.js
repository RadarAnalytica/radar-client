import { icons, newIcons } from "../icons/icons"

export const menuConfig = [
    {
        id: 1,
        name: 'dashboard',
        label: 'Сводка продаж',
        url: '/dashboard',
        icon: icons.dashboard,
    },
    {
        id: 2,
        name: 'finreports',
        label: 'Финансовые отчеты',
        url: '/report-main',
        icon: icons.finreports,
    },
    {
        id: 3,
        name: 'goods',
        label: 'Мои товары',
        icon: icons.goods,
        children: [
            {
                id: 1,
                url: '/orders-map',
                label: 'География заказов',
            },
            {
                id: 2,
                url: '/abc-data',
                label: 'ABC-анализ',
            },
            {
                id: 3,
                url: '/stock-analysis',
                label: 'Товарная аналитика',
            },
        ]
    },
    {
        id: 4,
        name: 'adv',
        label: 'Продвижение',
        icon: icons.adv,
        children: [
            {
                id: 1,
                url: '/ai-generator',
                label: 'Генерация описания',
            },
            {
                id: 2,
                url: '/monitoring',
                label: 'Мониторинг запросов',
            },
            {
                id: 3,
                url: '/calculate',
                label: 'Калькулятор unit-экономики товара',
            },
            {
                id: 4,
                url: '/seo',
                label: 'Сравнение SEO',
            },
        ]
    },
]

export const newMenuConfig = [
    {
        id: 1,
        name: 'analysis',
        label: 'Анализ конкурентов',
        icon: newIcons.analysis,
        children: [
            {
                id: 1,
                url: '/sku-analysis',
                label: 'Анализ артикула',
                isActive: false
            },
            {
                id: 2,
                url: '/supplier-analysis',
                label: 'Анализ поставщика',
                isActive: false
            },
            {
                id: 3,
                url: '/category-analysis',
                label: 'Анализ категории',
                isActive: false
            },
            {
                id: 3,
                url: '/monitoring',
                label: 'Частотность артикула ',
                isActive: true
            },
            {
                id: 4,
                url: '/calculate',
                label: 'Калькулятор unit-экономики товара',
                isActive: true
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
                isActive: true
            },
            {
                id: 2,
                url: '/main', //исправить
                label: 'По неделям',
                isActive: false
            },
            {
                id: 3,
                url: '/main', // исправить
                label: 'ОПиУ',
                isActive: false
            },
            {
                id: 4,
                url: '/report-main',
                label: 'Оцифровка еженедельных отчетов',
                isActive: true
            },
            {
                id: 5,
                url: '/main', // исправить
                label: 'Операционные расходы',
                isActive: false
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
                isActive: true
            },
            {
                id: 2,
                url: '/abc-data',
                label: 'ABC-анализ',
                isActive: true
            },
            {
                id: 3,
                url: '/stock-analysis',
                label: 'Аналитика по товарам',
                isActive: true
            },
            {
                id: 4,
                url: '/selfcost', //првоерить
                label: 'Себестоимость товаров',
                isActive: false
            },
            {
                id: 5,
                url: '/groups', //проверить
                label: 'Группы товаров',
                isActive: false
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
                isActive: true
            },
            {
                id: 2,
                url: '/seo',
                label: 'Сравнение SEO с ТОПами',
                isActive: true
            },
        ]
    },
]