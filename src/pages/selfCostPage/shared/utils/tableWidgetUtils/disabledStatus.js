import moment from "moment";

export const getSaveButtonStatus = (product, compare, historyItemsToDelete) => {
    let status = true;
    if (product.cost !== compare.cost) { 
        status = false
    }
    if (product.fulfillment !== compare.fulfillment) { 
        status = false
    }
    if (historyItemsToDelete?.length > 0) { status = false }
    if (product?.self_cost_change_history?.length !== compare?.self_cost_change_history?.length) { status = false }
    if (product?.self_cost_change_history?.length === compare?.self_cost_change_history?.length) {
        product?.self_cost_change_history?.forEach((i, id) => {
            const compareObj = compare.self_cost_change_history[id]
            if (moment(i.date).format('DD.MM.YY') !== moment(compareObj.date).format('DD.MM.YY') || i.cost !== compareObj.cost || i.fulfillment !== compareObj.fulfillment) {
                status = false
            }
        })
    }

    return status
}

export const getAddDateButtonStatus = (product) => {
     // начальное значение - не заблокировано
     let status = false;
     // Блокируем если:
     // 1 - не задано значение себестоимости по умолчанию
     if (!product.cost || !product.fulfillment) {status = true; return status};
    // во всех остальных случаех кнопка активна
    return status;
}


export const getRowSaveButtonStatus = (product, compare, isOpen) => {
    // начальное значение - не заблокировано
    let status = false;
    // Блокируем если:
    // 1 - строка раскрыта
    if (isOpen) {status = true; return status};
    // 2 - оба значения отстутствуют
    if (!product.cost && !product.fulfillment) {status = true; return status};
    // 3 - отсутствует себестоимость
    if (!product.cost) {status = true; return status};
    // 4 - отсутсвует фф, но изначально он был задан
    if (product.cost && !product.fulfillment && compare.fulfillment) {status = true; return status};
    // 5 - значения не изменились
    if (product.cost && product.fulfillment && product.cost === compare.cost && product.fulfillment === compare.fulfillment) {status = true; return status};
    if (product.cost && !product.fulfillment && product.cost === compare.cost && !compare.fulfillment) {status = true; return status};

    // во всех остальных случаех кнопка активна
    return status;
}