export const addSkuTableConfig =  {
    tableName: null,
    values: [
        {ruName: 'Продукт', engName: 'product', hasSelect: true, hasPhoto: true, photoFieldName: 'photo'},
        {ruName: 'Артикул', engName: 'sku', hasSelect: false},
        {ruName: 'Бренд', engName: 'brand', hasSelect: false},
        {ruName: 'Магазин', engName: 'shop', hasSelect: false},
    ]
}

export const singleGroupTableConfig = {
    tableName: null,
    values: [
        {ruName: 'Продукт', engName: 'product', hasSelect: true, hasPhoto: true, photoFieldName: 'photo'},
        {ruName: 'Артикул', engName: 'sku', hasSelect: false},
        {ruName: 'Бренд', engName: 'brand', hasSelect: false},
        {ruName: 'Магазин', engName: 'shop', hasSelect: false},
        {ruName: 'Действия', engName: 'actions', hasSelect: false, actionTypes: ['delete']},
    ]
}

export const groupsMainTableConfig =  {
    tableName: null,
    values: [
        {ruName: 'Группа', engName: 'group', units: null, hasSelect: true},
        {ruName: 'Артикулы', units: 'шт', engName: 'sku', hasSelect: false},
        {ruName: 'Действия', engName: 'actions', hasSelect: false, actionTypes: ['edit', 'delete']},
    ]
}

