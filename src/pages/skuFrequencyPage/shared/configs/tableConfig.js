export const tableConfig = [
    {
        tableName: null,
        isMain: true,
        values: [
            { ruName: 'Товар', engName: 'product', units: null, isSortable: true, isActive: true },
        ]
    },
    {
        tableName: null,
        isMain: false,
        values: [
            { ruName: 'Частотность WB', engName: 'wbFrequency', isSortable: true, isActive: true, hasRate: true },
            { ruName: 'Коэффициент cпроса', engName: 'demandRatio', isSortable: true, isActive: true, hasRate: true },
            { ruName: 'Кол-во продавцов', engName: 'sellersAmount', isSortable: true, isActive: true, hasRate: true },
            { ruName: 'Кол-во товаров в ТОП-750 за 30 дней', engName: 'qtyInTop', units: 'шт', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Кол-во товаров на WB', engName: 'onWbProductsQuantity', isSortable: true, isActive: true, hasRate: true },
            { ruName: 'Выручка (с СПП)', engName: 'revenueSpp', units: '₽', isSortable: true, isActive: true, hasRate: true },
            { ruName: 'Ср. выручка в день', engName: 'avgDalyRevenue', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. цена (с СПП)', engName: 'sppPrice', units: '₽', isSortable: true, isActive: true, hasRate: true },
            { ruName: 'Товаров с продажами', engName: 'productsWithSales', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. выручка на товар', engName: 'avgProductRevenue', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. выручка на товар с продажами', engName: 'avgProductRevenueFromSales', units: '₽', isSortable: true, isActive: true, hasRate: false },
            { ruName: '% товаров с продажами', engName: 'productsWithSalesRatio', units: '%', isSortable: true, isActive: true, hasRate: false },
            { ruName: '% выручки у ТОП-30 товаров', engName: 'top30RevenueRatio', units: '%', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. кол-во оценок', engName: 'avgReviewsQuantity', units: '%', isSortable: true, isActive: true, hasRate: false },
            { ruName: 'Ср. рейтинг', engName: 'avgRating', isSortable: true, isActive: true, hasRate: false },
            { ruName: '% продавцов с продажами', engName: 'sellersWithSalesRatio', units: '%', isSortable: true, isActive: true, hasRate: false },
        ]
    },
]

