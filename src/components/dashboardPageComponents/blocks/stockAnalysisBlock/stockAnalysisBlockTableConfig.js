export const CONFIG_VER = '2'

export const stockAnalysisTableConfig = [
    {
        title: 'О товаре',
        key: 'm01',
        hidden: false,
        fixed: true,
        groupColor: 'white',
        children: [
            {title: 'Товар', dataIndex: 'productName', units: null, sortable: true, fixed: true, width: 260},
            {title: 'Артикул', dataIndex: 'vendorСode', units: null, sortable: true, fixed: true, width: 200},
            {title: 'SKU', dataIndex: 'sku', units: null, sortable: true, fixed: true, width: 100},
            {title: 'Размер', dataIndex: 'size', units: null, sortable: true, fixed: true, width: 100},
        ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: '',
        key: 'm02',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Бренд', dataIndex: 'brandName', units: null, sortable: true, fixed: false, width: 200},
            //{title: 'Баркод', dataIndex: 'barcode', units: null, sortable: true, fixed: false, width: 200},
            {title: 'Категория', dataIndex: 'category', units: null, sortable: true, fixed: false, width: 200},
            //{title: 'Сумма', dataIndex: 'amount', units: '₽', sortable: true, fixed: true, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Продажи',
        key: 'm03',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Сумма', dataIndex: 'saleSum', units: '₽', sortable: true, fixed: false, width: 200},
            {title: 'Количество', dataIndex: 'quantity', units: 'шт', sortable: true, fixed: false, width: 200},
            {title: 'За вычетом возвратов', dataIndex: 'lessReturns', units: '₽', sortable: true, fixed: false, width: 300},
            {title: 'Себестоимость проданных товаров', dataIndex: 'sold_cost', units: '₽', sortable: false, fixed: false, width: 300},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Возвраты',
        key: 'm04',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Сумма', dataIndex: 'returnsSum', units: '₽', sortable: true, fixed: false, width: 200},
            {title: 'Количество', dataIndex: 'returnsQuantity', units: 'шт', sortable: true, fixed: false, width: 100},
            {title: 'Себестоимость возвращенных товаров', dataIndex: 'return_cost', units: '₽', sortable: false, fixed: false, width: 300},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Себестоимость',
        key: 'm05',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'За единицу', dataIndex: 'product_cost', units: '₽', sortable: false, fixed: false, width: 200},
            {title: 'Себестоимость товарного запаса (сегодня)', dataIndex: 'product_cost_stock', units: '₽', sortable: false, fixed: false, width: 300},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Логистика',
        key: 'm06',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'К клиенту', dataIndex: 'toClient', units: 'шт', sortable: true, fixed: false, width: 200},
            {title: 'Сумма', dataIndex: 'to_client_sum', units: '₽', sortable: false, fixed: false, width: 200},
            {title: 'От клиента', dataIndex: 'fromClient', units: 'шт', sortable: true, fixed: false, width: 200},
            {title: 'Сумма', dataIndex: 'from_client_sum', units: '₽', sortable: false, fixed: false, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Прочие расходы',
        key: 'm07',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Комиссия WB', dataIndex: 'commissionWB', units: '₽', sortable: true, fixed: false, width: 200},
            {title: 'Штрафы', dataIndex: 'fines', units: '₽', sortable: true, fixed: false, width: 200},
            {title: 'Доплаты', dataIndex: 'additionalPayment', units: '₽', sortable: true, fixed: false, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Прибыль',
        key: 'm08',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'К выплате', dataIndex: 'toPayoff', units: '₽', sortable: true, fixed: false, width: 200},
            {title: 'Маржинальная прибыль', dataIndex: 'marginalProfit', units: '₽', sortable: false, fixed: false, width: 300},
            {title: 'Средняя прибыль', dataIndex: 'averageProfit', units: '₽', sortable: false, fixed: false, width: 200},
            {title: 'Рентабельность реализованной продукции', dataIndex: 'profitabilityOfProductsSold', units: '%', sortable: false, fixed: false, width: 350},
            {title: 'Маржинальность', dataIndex: 'marginal', units: '%', sortable: false, fixed: false, width: 200},
            {title: 'Годовая рентабельность товарных запасов', dataIndex: 'annualReturnOnInventory', units: '%', sortable: false, fixed: false, width: 350},
            {title: 'Упущенная выручка', dataIndex: 'lostRevenue', units: '₽', sortable: false, fixed: false, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'АВС анализ',
        key: 'm09',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'По выручке', dataIndex: 'byRevenue', units: null, sortable: true, fixed: false, width: 200},
            {title: 'По прибыли', dataIndex: 'byProfit', units: null, sortable: true, fixed: false, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Цена',
        key: 'm10',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Базовая', dataIndex: 'basic', units: '₽', sortable: true, fixed: false, width: 200},
            {title: 'Макс. скидка', dataIndex: 'maxDiscount', units: '%', sortable: true, fixed: false, width: 200},
            {title: 'Мин. цена со скидкой', dataIndex: 'minDiscountPrice', units: '₽', sortable: true, fixed: false, width: 250},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Заказы',
        key: 'm11',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Количество', dataIndex: 'orderQuantity', units: 'шт', sortable: true, fixed: false, width: 200},
            {title: 'Сумма', dataIndex: 'orderSum', units: '₽', sortable: true, fixed: false, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Выкупы',
        key: 'm12',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Выкуплено', dataIndex: 'purchased', units: 'шт', sortable: true, fixed: false, width: 200},
            {title: 'Не выкуплено', dataIndex: 'notPurchased', units: 'шт', sortable: true, fixed: false, width: 200},
            {title: 'Процент выкупа', dataIndex: 'purchasedPercent', units: '%', sortable: true, fixed: false, width: 200},
            {title: 'Завершены', dataIndex: 'completed', units: 'шт', sortable: true, fixed: false, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Скорость',
        key: 'm13',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Заказов', dataIndex: 'orderCountDay', units: 'шт/день', sortable: false, fixed: false, width: 200},
            {title: 'Продаж', dataIndex: 'saleCountDay', units: 'шт/день', sortable: false, fixed: false, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
        title: 'Остаток',
        key: 'm14',
        hidden: false,
        fixed: false,
        groupColor: 'white',
        children: [
            {title: 'Данные Радар', dataIndex: 'dataRadar', units: 'шт', sortable: false, fixed: false, width: 200},
        ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
].map(_ => ({ ..._, colSpan: _?.children?.length || 1, className: 'stockAnalysisBlockTableGroupCell' }));
