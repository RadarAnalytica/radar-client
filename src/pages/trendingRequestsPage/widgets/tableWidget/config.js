export const tableConfig = [
    {
        //tableName: 'Прочие расходы',
        values: [
            {ruName: 'Запрос', engName: 'query', units: null, isSortable: true}, //query
        ]
    },
    {
        values: [
            {ruName: 'Приоритетный предмет', engName: 'subject', units: null, isSortable: false},
            {ruName: 'Частотность за 30 дней, шт', engName: 'frequency', units: null, isSortable: true},
            {ruName: 'Кол-во артикулов по запросу, шт', engName: 'goods_quantity', units: null, isSortable: true},
            {ruName: 'Динамика за 30 дней, %', engName: 'g30', units: '%', isSortable: true},
            {ruName: 'Динамика за 60 дней, %', engName: 'g60', units: '%', isSortable: true},
            {ruName: 'Динамика за 90 дней, %', engName: 'g90', units: '%', isSortable: true},
            {ruName: 'Частотность за 30 дней на 1 артикул, шт', engName: 'freq_per_good', units: null, isSortable: true},
        ]
    },

];

export const newTableConfig = [
    {
        key: 'query',
        title: 'Запрос',
        dataIndex: 'query',
        sortable: true,
        fixed: true,
        fixedLeft: 0,
        width: 260,
        minWidth: 260,
        hidden: false,
    },
    {
        key: 'subject',
        title: 'Приоритетный предмет',
        dataIndex: 'subject',
        sortable: false,
        fixed: false,
        width: 160,
        minWidth: 160,
        hidden: false,
    },
    {
        key: 'frequency',
        title: 'Частотность за 30 дней',
        dataIndex: 'frequency',
        sortable: true,
        fixed: false,
        width: 160,
        minWidth: 160,
        hidden: false,
    },
    {
        key: 'goods_quantity',
        title: 'Кол-во артикулов по запросу',
        dataIndex: 'goods_quantity',
        sortable: true,
        units: 'шт',
        fixed: false,
        width: 160,
        minWidth: 160,
        hidden: false,
    },
    {
        key: 'g30',
        title: 'Динамика за 30 дней, %',
        dataIndex: 'g30',
        sortable: true,
        units: '%',
        fixed: false,
        width: 160,
        minWidth: 160,
        hidden: false,
    },
    {
        key: 'g60',
        title: 'Динамика за 60 дней, %',
        dataIndex: 'g60',
        sortable: true,
        units: '%',
        fixed: false,
        width: 160,
        minWidth: 160,
        hidden: false,
    },
    {
        key: 'g90',
        title: 'Динамика за 90 дней, %',
        dataIndex: 'g90',
        sortable: true,
        units: '%',
        fixed: false,
        width: 160,
        minWidth: 160,
        hidden: false,
    },
    {
        key: 'freq_per_good',
        title: 'Частотность за 30 дней на 1 артикул',
        dataIndex: 'freq_per_good',
        sortable: true,
        fixed: false,
        width: 160,
        minWidth: 160,
        hidden: false,
    },
];
