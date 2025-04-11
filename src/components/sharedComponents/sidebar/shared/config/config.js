import { icons } from "../icons/icons"

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