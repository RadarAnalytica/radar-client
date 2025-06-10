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
            {ruName: 'Кол-во артикулов по запросу, шт', engName: 'goods_quantity', units: 'шт', isSortable: true},
            {ruName: 'Динамика за 30 дней, %', engName: 'g30', units: '%', isSortable: true},
            {ruName: 'Динамика за 60 дней, %', engName: 'g60', units: '%', isSortable: true},
            {ruName: 'Динамика за 90 дней, %', engName: 'g90', units: '%', isSortable: true},
            {ruName: 'Частотность за 30 дней на 1 артикул, шт', engName: 'freq_per_good', units: null, isSortable: true},
        ]
    },
  
]