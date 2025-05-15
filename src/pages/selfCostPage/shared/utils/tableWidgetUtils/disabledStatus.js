import moment from "moment";

const getNormilizedValue = (value) => {
    let normilizedValue = value
    if (normilizedValue === undefined) {
        normilizedValue = null
    }
    return normilizedValue
}

export const getSaveButtonStatus = (product, compare, historyItemsToDelete) => {
    let status = true;
    console.log(product.fulfillment)
    console.log(compare.fulfillment)
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