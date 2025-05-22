import moment from "moment";

export const getSaveButtonStatus = (product, compare, historyItemsToDelete) => {
    // начальное значение - заблокировано
    let status = true;
    // Блокируем если:
    // 1 - оба значения отстутствуют
    if (!product.cost && !product.fulfillment) { return status };
    // 2 - отсутствует себестоимость
    if (!product.cost) { return status };
    // 3 - отсутсвует фф по умолчанию, но изначально он был задан
    if (product.cost && !product.fulfillment && compare.fulfillment) { return status };


    // Разблокируем если
    // 1 -Удалены исторические данные
    if (historyItemsToDelete?.length > 0) { status = false }
    // 2 - Добавлена новая дата в исторические данные
    if (product?.self_cost_change_history?.length !== compare?.self_cost_change_history?.length) { status = false }
    // 3 - изменились данные в истории
    if (product?.self_cost_change_history?.length === compare?.self_cost_change_history?.length) {
        product?.self_cost_change_history?.forEach((i, id) => {
            const compareObj = compare.self_cost_change_history[id]
            if (moment(i.date).format('DD.MM.YY') !== moment(compareObj.date).format('DD.MM.YY') || i.cost !== compareObj.cost || i.fulfillment !== compareObj.fulfillment) {
                status = false
            }
        })
    }
    // 4 - изменилось значение сс
    if (product.cost && product.cost !== compare.cost) { status = false };
    // 4 - изменилось значение фф
    if (product.fulfillment && product.fulfillment !== compare.fulfillment) { status = false };
    return status
}

export const getAddDateButtonStatus = (product, dataStatus) => {
    // начальное значение - не заблокировано
    let status = false;
    // Блокируем если:
    // 0 - данные загружаются
    if (dataStatus.isLoading) { status = true; return status };
    // 1 - не задано значение себестоимости по умолчанию
    if (!product.cost) { status = true; return status };
    // во всех остальных случаех кнопка активна
    return status;
}


export const getRowSaveButtonStatus = (product, compare, isOpen, dataStatus) => {
    // начальное значение - не заблокировано
    let status = false;
    // Блокируем если:
    // 1 - строка раскрыта
    if (isOpen) { status = true; return status };
    // 1.1 Данные загружаются
    if (dataStatus.isLoading) { status = true; return status };
    // 2 - оба значения отстутствуют
    if (!product.cost && !product.fulfillment) { status = true; return status };
    // 3 - отсутствует себестоимость
    if (!product.cost) { status = true; return status };
    // 4 - отсутсвует фф, но изначально он был задан
    if (product.cost && !product.fulfillment && compare.fulfillment) { status = true; return status };
    // 5 - значения не изменились
    if (product.cost && product.fulfillment && product.cost === compare.cost && product.fulfillment === compare.fulfillment) { status = true; return status };
    if (product.cost && !product.fulfillment && product.cost === compare.cost && !compare.fulfillment) { status = true; return status };

    // во всех остальных случаех кнопка активна
    return status;
}

export const getRowSaveButtonForLastHistoryParamsStatus = (product, compare, isOpen, dataStatus) => {
    const currentObject = product.self_cost_change_history[product.self_cost_change_history.length - 1];
    const compareObject = compare.self_cost_change_history[compare.self_cost_change_history.length - 1];
    // начальное значение - не заблокировано
    let status = false;
    // Блокируем если:
    // 1 - строка раскрыта
    if (isOpen) { status = true; return status };
    // 1.1 Данные загружаются
    if (dataStatus.isLoading) { status = true; return status };
    // 2 - одно из значений отстутствуют
    if (!currentObject?.cost || !currentObject?.fulfillment) { status = true; return status };
    // 3 - значения не изменились
    if (currentObject?.cost && currentObject?.fulfillment && currentObject.cost === compareObject.cost && currentObject.fulfillment === compareObject.fulfillment) { status = true; return status };

    // во всех остальных случаех кнопка активна
    return status;
}