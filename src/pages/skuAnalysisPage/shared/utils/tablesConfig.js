export const mainTableConfig = [
    {
        tableName: null,
        isMain: true,
        values: [
            { ruName: 'Дата', engName: 'date', units: null, isSortable: true, isActive: true },
        ]
    },
    {
        tableName: null,
        isMain: false,
        values: [
            { ruName: 'Вручка, руб', engName: 'revenue', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Заказы, шт', engName: 'orders', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Остатки на конец дня, шт', engName: 'quantity', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Средняя цена без СПП, руб', engName: 'price', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Общая скидка без СПП, %', engName: 'discount', units: '%', isSortable: true, isActive: true },
            { ruName: 'Количество отзывов на конец дня, шт', engName: 'feedbacks', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Динамика рейтинга', engName: 'rating', units: null, isSortable: true, isActive: true },
            { ruName: 'Коэффициент демпинга, %', engName: 'dumping', units: '%', isSortable: true, isActive: false },
        ]
    },
]


export const byColorTableConfig = [
    {
        tableName: null,
        isMain: true,
        values: [
            { ruName: 'Товар', engName: 'color_name', units: null, isSortable: true, isActive: true },
        ]
    },
    {
        tableName: null,
        isMain: false,
        values: [
            { ruName: 'Вручка, руб', engName: 'revenue', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Динамика выручки', engName: 'revenue_dynamics', units: null, isSortable: false, isActive: true, isChart: true },
            { ruName: 'Средняя цена без СПП, руб', engName: 'price', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Общая скидка без СПП, %', engName: 'discount', units: '%', isSortable: true, isActive: true },
            { ruName: 'Заказы, шт', engName: 'orders', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Остатки на конец периода, шт', engName: 'quantity', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Упущенная выручка, руб', engName: 'lost_revenue', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Коэффициент демпинга, %', engName: 'dumping', units: '%', isSortable: true, isActive: false },
        ]
    },
]

export const byWarehouseTableConfig = [
    {
        tableName: null,
        isMain: true,
        values: [
            { ruName: 'Склад', engName: 'name', units: null, isSortable: true, isActive: true },
        ]
    },
    {
        tableName: null,
        isMain: false,
        values: [
            { ruName: 'Вручка, руб', engName: 'revenue', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Динамика выручки', engName: 'revenue_dynamics', units: null, isSortable: false, isActive: true, isChart: true },
            { ruName: 'Заказы, шт', engName: 'orders', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Остатки на конец периода, шт', engName: 'quantity', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Коэффициент демпинга, %', engName: 'dumping', units: '%', isSortable: true, isActive: false },
            { ruName: 'Оборачиваемость, дней', engName: 'lost_revenue', units: 'дн', isSortable: true, isActive: true },
        ]
    },
]


export const bySizeTableConfig = [
    {
        tableName: null,
        isMain: true,
        values: [
            { ruName: 'Товар', engName: 'name', units: null, isSortable: true, isActive: true },
        ]
    },
    {
        tableName: null,
        isMain: false,
        values: [
            { ruName: 'Вручка, руб', engName: 'revenue', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Динамика выручки', engName: 'revenue_dynamics', units: null, isSortable: false, isActive: true, isChart: true },
            { ruName: 'Средняя цена без СПП, руб', engName: 'price', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Общая скидка без СПП, %', engName: 'discount', units: '%', isSortable: true, isActive: true },
            { ruName: 'Заказы, шт', engName: 'orders', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Остатки на конец периода, шт', engName: 'quantity', units: 'шт', isSortable: true, isActive: true },
            { ruName: 'Упущенная выручка, руб', engName: 'lost_revenue', units: '₽', isSortable: true, isActive: true },
            { ruName: 'Коэффициент демпинга, %', engName: 'dumping', units: '%', isSortable: true, isActive: false },
        ]
    },
]