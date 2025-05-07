export const tableConfig = [
    {
        tableName: 'О товаре',
        values: [
            {ruName: 'Товар', engName: 'productName', units: null, isSortable: true},
            {ruName: 'Артикул', engName: 'vendorСode', units: null, isSortable: true, isShortCell: true},
            {ruName: 'SKU', engName: 'sku', units: null, isSortable: true, isShortCell: true},
            {ruName: 'Размер', engName: 'size', units: null, isSortable: true, isShortCell: true},
        ]
    },
    {
        tableName: null,
        values: [
            {ruName: 'Бренд', engName: 'brandName', units: null, isSortable: true},
            {ruName: 'Категория', engName: 'category', units: null, isSortable: true},
        ]
    },
    {
        tableName: 'Продажи',
        values: [
            {ruName: 'Сумма', engName: 'saleSum', units: '₽', isSortable: true},
            {ruName: 'Количество', engName: 'quantity', units: 'шт', isSortable: true},
            {ruName: 'За вычетом возвратов', engName: 'lessReturns', units: '₽', isSortable: true},
            {ruName: 'Себестоимость проданных товаров', engName: 'costGoodsSold', units: '₽', isSortable: false},
        ]
    },
    {
        tableName: 'Возвраты',
        values: [
            {ruName: 'Сумма', engName: 'returnsSum', units: '₽', isSortable: true},
            {ruName: 'Количество', engName: 'returnsQuantity', units: 'шт', isSortable: true},
            {ruName: 'Себестоимость возвращенных товаров', engName: 'returnsCostSold', units: '₽', isSortable: false},
        ]
    },
    {
        tableName: 'Себестоимость',
        values: [
            {ruName: 'За единицу', engName: 'costPriceOne', units: '₽', isSortable: false},
            {ruName: 'Себестоимость товарного запаса (сегодня)', engName: 'costOfProductStockToday', units: '₽', isSortable: false},
        ]
    },
    {
        tableName: 'Логистика',
        values: [
            {ruName: 'К клиенту', engName: 'toClient', units: 'шт', isSortable: true},
            {ruName: 'Сумма', engName: 'to_client_sum', units: '₽', isSortable: false},
            {ruName: 'От клиента', engName: 'fromClient', units: 'шт', isSortable: true},
            {ruName: 'Сумма', engName: 'from_client_sum', units: '₽', isSortable: false},
        ]
    },
    {
        tableName: 'Прочие расходы',
        values: [
            {ruName: 'Комиссия WB', engName: 'commissionWB', units: '₽', isSortable: true},
            {ruName: 'Штрафы', engName: 'fines', units: '₽', isSortable: true},
            {ruName: 'Доплаты', engName: 'additionalpayment', units: '₽', isSortable: true},
        ]
    },
    {
        tableName: 'АВС анализ',
        values: [
            {ruName: 'По выручке', engName: 'byRevenue', units: '₽', isSortable: true},
            {ruName: 'По прибыли', engName: 'byProfit', units: '₽', isSortable: true},
        ]
    },
    {
        tableName: 'Цена',
        values: [
            {ruName: 'Базовая', engName: 'basic', units: '₽', isSortable: true},
            {ruName: 'Макс. скидка', engName: 'maxDiscount', units: '%', isSortable: true},
            {ruName: 'Мин. цена со скидкой', engName: 'minDiscountPrice', units: '₽', isSortable: true},
        ]
    },
    {
        tableName: 'Заказы',
        values: [
            {ruName: 'Количество', engName: 'orderQuantity', units: 'шт', isSortable: true},
            {ruName: 'Сумма', engName: 'orderSum', units: '₽', isSortable: true},
        ]
    },
    {
        tableName: 'Выкупы',
        values: [
            {ruName: 'Выкуплено', engName: 'purchased', units: 'шт', isSortable: true},
            {ruName: 'Не выкуплено', engName: 'notPurchased', units: 'шт', isSortable: true},
            {ruName: 'Процент выкупа', engName: 'purchasedPercent', units: '%', isSortable: true},
            {ruName: 'Завершены', engName: 'completed', units: 'шт', isSortable: true},
        ]
    },
    {
        tableName: 'Скорость',
        values: [
            {ruName: 'Заказов', engName: 'orderCountDay', units: 'шт/день', isSortable: false},
            {ruName: 'Продаж', engName: 'saleCountDay', units: '₽/день', isSortable: false},
        ]
    },
    {
        tableName: 'Остаток',
        values: [
            {ruName: 'Данные Радар', engName: 'dataRadar', units: 'шт', isSortable: false},
        ]
    },
]