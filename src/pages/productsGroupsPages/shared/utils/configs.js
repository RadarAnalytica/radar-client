export const addSkuTableConfig =  {
    tableName: null,
    values: [
        {ruName: 'Продукт', engName: 'article', hasSelect: true, hasPhoto: true, photoFieldName: 'photo'},
        {ruName: 'Артикул', engName: 'id', hasSelect: false},
        {ruName: 'Бренд', engName: 'brand', hasSelect: false},
        {ruName: 'Магазин', engName: 'shop', hasSelect: false},
    ]
}

/**
 *   {
                "id": 11087,
                "photo": "https://basket-19.wbbasket.ru/vol3244/part324451/324451485/images/c246x328/1.webp",
                "article": "мизинчиковые ААА  24 штук + 2032 ",
                "brand": "Duracell",
                "shop": 88,
                "in_group": false
            },
 */

export const singleGroupTableConfig = {
    tableName: null,
    values: [
        // {ruName: 'Продукт', engName: 'product', hasSelect: false, hasPhoto: true, photoFieldName: 'photo'},
        // {ruName: 'Артикул', engName: 'sku', hasSelect: false},
        // {ruName: 'Бренд', engName: 'brand', hasSelect: false},
        // {ruName: 'Магазин', engName: 'shop', hasSelect: false},
        {ruName: 'Продукт', engName: 'article', hasSelect: true, hasPhoto: true, photoFieldName: 'photo'},
        {ruName: 'Артикул', engName: 'id', hasSelect: false},
        {ruName: 'Бренд', engName: 'brand', hasSelect: false},
        {ruName: 'Магазин', engName: 'shop', hasSelect: false},
        {ruName: 'Действия', engName: 'actions', hasSelect: false, actionTypes: ['delete']},
    ]
}

export const groupsMainTableConfig =  {
    tableName: null,
    values: [
        {ruName: 'Группа', engName: 'name', units: null, hasSelect: false},
        {ruName: 'Магазин', engName: 'shop_name', units: null, hasSelect: false},
        //{ruName: 'Артикулы', units: 'шт', engName: 'sku', hasSelect: false},
        {ruName: 'Действия', engName: 'actions', hasSelect: false, actionTypes: ['edit', 'delete']},
    ]
}

//   {name: '1', description: '', id: 2, shop_name: 'JuliaShine111'}

