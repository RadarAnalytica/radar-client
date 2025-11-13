export const CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER = '5';

export const newTableConfig = [
    {
        title: 'О товаре',
        fixed: true,
        width: 540,
        minWidth: 540,
        hidden: false,
        dataIndex: 'productInfo',
        key: 'productInfo',
        style: {
            zIndex: 3,
            color: 'black',
            fontSize: '18px',
        },
        children: [
            {
                title: 'Товар',
                dataIndex: 'productName',
                sortable: true,
                width: 260,
                minWidth: 260,
                maxWidth: 520,
                fixed: true,
                key: 'productName',
                style: {
                    background: '#F7F6FE',
                    borderRadius: '12px 0 0 12px',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Артикул',
                dataIndex: 'vendorСode',
                sortable: true,
                width: 125,
                minWidth: 125,
                maxWidth: 125,
                fixed: true,
                key: 'vendorСode',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'SKU',
                dataIndex: 'sku',
                sortable: true,
                width: 100,
                minWidth: 100,
                maxWidth: 160,
                fixed: true,
                key: 'sku',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Размер',
                dataIndex: 'size',
                sortable: false,
                width: 100,
                minWidth: 100,
                maxWidth: 160,
                fixed: true,
                key: 'size',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: '',
        fixed: false,
        width: 300,
        minWidth: 300,
        hidden: false,
        dataIndex: 'brandCategory',
        key: 'brandCategory',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'Бренд',
                dataIndex: 'brandName',
                sortable: true,
                width: 120,
                minWidth: 120,
                key: 'brandName',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Категория',
                dataIndex: 'category',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 300,
                key: 'category',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    // Прибыль
    {
        title: 'Прибыль',
        fixed: false,
        width: 800,
        minWidth: 800,
        hidden: false,
        dataIndex: 'profit',
        key: 'profit',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'К выплате',
                dataIndex: 'toPayoff',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 240,
                key: 'toPayoff',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Маржинальная прибыль',
                dataIndex: 'marginalProfit',
                sortable: false,
                width: 120,
                minWidth: 120,
                maxWidth: 320,
                key: 'marginalProfit',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Средняя прибыль',
                dataIndex: 'averageProfit',
                sortable: false,
                width: 120,
                minWidth: 120,
                maxWidth: 280,
                key: 'averageProfit',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Рентабельность реализованной продукции',
                dataIndex: 'profitabilityOfProductsSold',
                sortable: false,
                width: 200,
                minWidth: 200,
                maxWidth: 520,
                key: 'profitabilityOfProductsSold',
                units: '%',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Маржинальность',
                dataIndex: 'marginal',
                sortable: false,
                width: 120,
                minWidth: 120,
                maxWidth: 280,
                key: 'marginal',
                units: '%',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Годовая рентабельность товарных запасов',
                dataIndex: 'annualReturnOnInventory',
                sortable: false,
                width: 200,
                minWidth: 200,
                maxWidth: 560,
                key: 'annualReturnOnInventory',
                units: '%',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Упущенная выручка',
                dataIndex: 'lostRevenue',
                sortable: false,
                width: 200,
                minWidth: 200,
                maxWidth: 320,
                key: 'lostRevenue',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    // Выкупы
    {
        title: 'Выкупы',
        fixed: false,
        width: 400,
        minWidth: 400,
        hidden: false,
        dataIndex: 'buyouts',
        key: 'buyouts',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'Выкуплено',
                dataIndex: 'purchased',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 220,
                key: 'purchased',
                units: 'шт',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Не выкуплено',
                dataIndex: 'notPurchased',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 240,
                key: 'notPurchased',
                units: 'шт',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Процент выкупа',
                dataIndex: 'purchasedPercent',
                sortable: true,
                width: 160,
                minWidth: 160,
                maxWidth: 280,
                key: 'purchasedPercent',
                units: '%',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Завершены',
                dataIndex: 'completed',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 220,
                key: 'completed',
                units: 'шт',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: 'Продажи',
        fixed: false,
        width: 450,
        minWidth: 450,
        hidden: false,
        dataIndex: 'sales',
        key: 'sales',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'Сумма',
                dataIndex: 'saleSum',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 240,
                key: 'saleSum',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Количество',
                dataIndex: 'quantity',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 220,
                key: 'quantity',
                units: 'шт',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Себестоимость проданных товаров',
                dataIndex: 'sold_cost',
                sortable: false,
                width: 200,
                minWidth: 200,
                maxWidth: 440,
                key: 'sold_cost',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: 'Возвраты',
        fixed: false,
        width: 360,
        minWidth: 360,
        hidden: false,
        dataIndex: 'returns',
        key: 'returns',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'Сумма',
                dataIndex: 'returnsSum',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 240,
                key: 'returnsSum',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Количество',
                dataIndex: 'returnsQuantity',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 240,
                key: 'returnsQuantity',
                units: 'шт',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Себестоимость возвращенных товаров',
                dataIndex: 'return_cost',
                sortable: false,
                width: 200,
                minWidth: 200,
                maxWidth: 480,
                key: 'return_cost',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: 'Себестоимость',
        fixed: false,
        width: 350,
        minWidth: 350,
        hidden: false,
        dataIndex: 'costPrice',
        key: 'costPrice',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'За единицу',
                dataIndex: 'product_cost',
                sortable: false,
                width: 120,
                minWidth: 120,
                maxWidth: 240,
                key: 'product_cost',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Себестоимость товарного запаса (сегодня)',
                dataIndex: 'product_cost_stock',
                sortable: false,
                width: 200,
                minWidth: 200,
                maxWidth: 560,
                key: 'product_cost_stock',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: 'Логистика',
        fixed: false,
        width: 400,
        minWidth: 400,
        hidden: false,
        dataIndex: 'logistics',
        key: 'logistics',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'К клиенту',
                dataIndex: 'toClient',
                sortable: true,
                width: 140,
                minWidth: 140,
                maxWidth: 200,
                key: 'toClient',
                units: 'шт',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Сумма',
                dataIndex: 'to_client_sum',
                sortable: false,
                width: 120,
                minWidth: 120,
                maxWidth: 200,
                key: 'to_client_sum',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'От клиента',
                dataIndex: 'fromClient',
                sortable: true,
                width: 140,
                minWidth: 140,
                maxWidth: 200,
                key: 'fromClient',
                units: 'шт',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Сумма',
                dataIndex: 'from_client_sum',
                sortable: false,
                width: 120,
                minWidth: 120,
                maxWidth: 200,
                key: 'from_client_sum',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: 'Прочие расходы',
        fixed: false,
        width: 300,
        minWidth: 300,
        hidden: false,
        dataIndex: 'otherExpenses',
        key: 'otherExpenses',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'Комиссия WB',
                dataIndex: 'commissionWB',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 260,
                key: 'commissionWB',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Штрафы',
                dataIndex: 'fines',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 200,
                key: 'fines',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Доплаты',
                dataIndex: 'additionalPayment',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 200,
                key: 'additionalPayment',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: 'АВС анализ',
        fixed: false,
        width: 200,
        minWidth: 200,
        hidden: false,
        dataIndex: 'abcAnalysis',
        key: 'abcAnalysis',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'По выручке',
                dataIndex: 'byRevenue',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 200,
                key: 'byRevenue',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'По прибыли',
                dataIndex: 'byProfit',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 200,
                key: 'byProfit',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: 'Цена',
        fixed: false,
        width: 300,
        minWidth: 300,
        hidden: false,
        dataIndex: 'price',
        key: 'price',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            {
                title: 'Базовая',
                dataIndex: 'basic',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 200,
                key: 'basic',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Макс. скидка',
                dataIndex: 'maxDiscount',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 240,
                key: 'maxDiscount',
                units: '%',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
            {
                title: 'Мин. цена со скидкой',
                dataIndex: 'minDiscountPrice',
                sortable: true,
                width: 120,
                minWidth: 120,
                maxWidth: 320,
                key: 'minDiscountPrice',
                units: '₽',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    // {
    //     title: 'Заказы',
    //     fixed: false,
    //     width: 200,
    //     minWidth: 200,
    //     hidden: false,
    //     dataIndex: 'orders',
    //     key: 'orders',
    //     style: {
    //         zIndex: 2,
    //         color: 'black',
    //         fontSize: '18px',
    //         borderRight: '1px solid #E8E8E8',
    //     },
    //     children: [
    //         {
    //             title: 'Количество',
    //             dataIndex: 'orderQuantity',
    //             sortable: true,
    //             width: 120,
    //             minWidth: 120,
    //             maxWidth: 240,
    //             key: 'orderQuantity',
    //             units: 'шт',
    //             style: {
    //                 background: '#F7F6FE',
    //                 verticalAlign: 'middle',
    //                 fontSize: '14px',
    //             }
    //         },
    //         {
    //             title: 'Сумма',
    //             dataIndex: 'orderSum',
    //             sortable: true,
    //             width: 120,
    //             minWidth: 120,
    //             maxWidth: 200,
    //             key: 'orderSum',
    //             units: '₽',
    //             style: {
    //                 background: '#F7F6FE',
    //                 verticalAlign: 'middle',
    //                 fontSize: '14px',
    //                 borderRight: '1px solid #E8E8E8',
    //             }
    //         },
    //     ].map(_ => ({..._, maxWidth: _.width * 2})),
    // },
    {
        title: 'Скорость',
        fixed: false,
        width: 200,
        minWidth: 200,
        hidden: false,
        dataIndex: 'speed',
        key: 'speed',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
            borderRight: '1px solid #E8E8E8',
        },
        children: [
            // {
            //     title: 'Заказов',
            //     dataIndex: 'orderCountDay',
            //     sortable: false,
            //     width: 120,
            //     minWidth: 120,
            //     maxWidth: 200,
            //     key: 'orderCountDay',
            //     units: 'шт/день',
            //     style: {
            //         background: '#F7F6FE',
            //         verticalAlign: 'middle',
            //         fontSize: '14px',
            //     }
            // },
            {
                title: 'Продаж',
                dataIndex: 'saleCountDay',
                sortable: false,
                width: 120,
                minWidth: 120,
                maxWidth: 200,
                key: 'saleCountDay',
                units: 'шт/день',
                style: {
                    background: '#F7F6FE',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                    borderRight: '1px solid #E8E8E8',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
    {
        title: 'Остаток',
        fixed: false,
        width: 120,
        minWidth: 120,
        hidden: false,
        dataIndex: 'balance',
        key: 'balance',
        style: {
            zIndex: 2,
            color: 'black',
            fontSize: '18px',
        },
        children: [
            {
                title: 'Данные Радар',
                dataIndex: 'dataRadar',
                sortable: false,
                width: 120,
                minWidth: 120,
                maxWidth: 240,
                key: 'dataRadar',
                units: 'шт',
                style: {
                    background: '#F7F6FE',
                    borderRadius: '0 12px 12px 0',
                    verticalAlign: 'middle',
                    fontSize: '14px',
                }
            },
        ].map(_ => ({..._, maxWidth: _.width * 2})),
    },
].map(_ => ({
    ..._,
    //width: _.children.reduce((acc, child) => acc + child.width, 0),
    //minWidth: _.children.reduce((acc, child) => acc + child.minWidth, 0),
    colSpan: _.children?.length || 1
}));







