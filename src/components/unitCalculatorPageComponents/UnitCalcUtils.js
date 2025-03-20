export const unitCalcResultFunction = (
    fields,
    mp_fee,
    last_mile_logistics_price,
    last_mile_logistics_price_w_buyout,
    current_storage_price_month,
    invest_value,
    storagePrice
) => {

    // basics
    const product_cost = parseInt(fields.product_cost)
    const product_price = parseInt(fields.product_price)
    const SPP = fields.isSPP ? parseInt(fields.SPP) : 0;
    const current_storage_logistic_price = last_mile_logistics_price + last_mile_logistics_price_w_buyout;
    
    // for self cost  
    const defective_percentage = fields.defective_percentage ? parseInt(fields.defective_percentage) : 0;
    const inhouse_logistics_price = fields.inhouse_logistics_price ? parseInt(fields.inhouse_logistics_price) : 0;
    const packaging_price = fields.packaging_price ? parseInt(fields.packaging_price) : 0;
    const mp_logistics_price = fields.mp_logistics_price ? parseInt(fields.mp_logistics_price) : 0;
    const other_costs = fields.other_costs ? parseInt(fields.other_costs) : 0;
    const fullfilment_price = fields.fullfilment_price ? parseInt(fields.fullfilment_price) : 0;

    // for profit calc
    const adv_price = fields.adv_price ? parseInt(fields.adv_price) : 0;
    const additional_mp_fee = fields.additional_mp_fee ? parseInt(fields.additional_mp_fee) : 0;
    const equiring_fee = fields.equiring_fee ? parseInt(fields.equiring_fee) : 0;
    const tax_rate = fields.tax_rate ? parseInt(fields.tax_rate) : 0;
    const cargo_acceptance_price = fields.is_paid_cargo_acceptance ? parseInt(fields.cargo_acceptance_price) : 0;

    //for size
    const package_width_int = parseInt(fields.package_width)
    const package_length_int = parseInt(fields.package_length)
    const package_height_int = parseInt(fields.package_height)
    const sizes_sum = package_width_int + package_length_int + package_height_int
    const volume = (((package_height_int / 100) * (package_length_int / 100) * (package_width_int / 100)) * 1000).toFixed(2)



    // total product price (with spp discount)
    const total_product_price = product_price - (product_price*((SPP)/100));

    // self cost 
    let selfCost = product_cost + (product_cost*((defective_percentage)/100)) + other_costs + inhouse_logistics_price + packaging_price + mp_logistics_price + fullfilment_price;

    // gross margin (price value wo selfcost)
    let grossMargin = product_price - selfCost;


    // total mp fee
    let absMpFee = (product_price * ((additional_mp_fee + mp_fee) / 100));
    // total eq fee
    let absEquiringFee = (total_product_price * ((equiring_fee) / 100));


    // tax fee
    let absTaxFee = 0
    if (fields.tax_state === 'УСН-доходы') {
        absTaxFee = (total_product_price * ((tax_rate) / 100));
    }
    if (fields.tax_state === 'Доходы - расходы') {
        absTaxFee = ((total_product_price - selfCost) * ((tax_rate) / 100));
    }
    
   
    let netProfit = grossMargin - absMpFee - absEquiringFee - absTaxFee - cargo_acceptance_price - adv_price - current_storage_logistic_price - current_storage_price_month
    let totalMargin = (netProfit / total_product_price) * 100;
    //const minimalPrice = total_product_price - netProfit;
    const minimalPrice = selfCost + absMpFee + absEquiringFee + absTaxFee + adv_price + cargo_acceptance_price + current_storage_logistic_price + current_storage_price_month;
    const maximumDiscount = totalMargin;
    const roi = (netProfit / selfCost) * 100;
    const totalProductAmountQuef = (100 - defective_percentage)/100


    //расчет поставки
    const total_product_quantity = Math.round((invest_value / product_cost) * totalProductAmountQuef)
    const total_value = Math.round(((invest_value / product_cost) * totalProductAmountQuef) * product_price)
    const total_net_value = Math.round(((invest_value / product_cost) * totalProductAmountQuef) * netProfit)
    const zero_loss_point = total_net_value > 0 ? Math.ceil(invest_value / (selfCost + netProfit)) : '--'


    //дополнительно
   
    return {
        ...fields,
        selfCost: selfCost.toFixed(2),
        netProfit: netProfit.toFixed(2),
        totalMargin: totalMargin.toFixed(2),
        minimalPrice: minimalPrice.toFixed(2),
        maximumDiscount: maximumDiscount.toFixed(2),
        roi: roi.toFixed(2),
        totalProductAmountQuef,
        total_product_price,
        mpFee: mp_fee,
        last_mile_logistics_price,
        last_mile_logistics_price_w_buyout,
        current_storage_price_month,
        current_storage_logistic_price,
        total_product_quantity,
        total_value,
        total_net_value,
        zero_loss_point,
        sizes_sum,
        volume: volume,
        storagePrice,
        absTaxFee: Math.round(absTaxFee),
        invest_value,
        absMpFee,
    }
}


export const logisticsWithBuyoutPercentagePriceCalcFunc = (current_storage_logistic_price, return_price, buyout_percentage = 100) => {
    const bp = parseInt(buyout_percentage)
    const cslp = parseInt(current_storage_logistic_price)
    if (bp === 0 || Number.isNaN(bp)) { return 0 }
    const counter = 100 - bp
    const l = cslp * (counter / 100)
    const r = return_price * (counter / 100)

    const lp = ((l + r) * counter) 
    return Math.round(lp)
}   

export function encodeUnicodeToBase64(str) {
    const utf8Str = encodeURIComponent(str); // Преобразуем в UTF-8
    const token = btoa(utf8Str); // Кодируем в base64
    return token;
    // const encoder = new TextEncoder();
    // const bytes = encoder.encode(str);
    // return btoa(String.fromCharCode(...bytes));
  }



export function decodeBase64ToUnicode(token) {
    // const binaryString = atob(base64);
    // const bytes = new Uint8Array(binaryString.length);
    // for (let i = 0; i < binaryString.length; i++) {
    //   bytes[i] = binaryString.charCodeAt(i);
    // }
    // const decoder = new TextDecoder();
    // return decoder.decode(bytes);
    const decodedUtf8Str = atob(token); // Декодируем base64
    const decodedJsonStr = decodeURIComponent(decodedUtf8Str); // Преобразуем из UTF-8
    const decodedData = JSON.parse(decodedJsonStr);
    return decodedData;
}


export function investValueInputTransformer (value) {
    const transformedValue = value ? value + ' ₽' : value
    return transformedValue
} 


export function normilizeUnitsInputValue (value, prevValue, units) {

    if (units.length === 2 && prevValue && value && prevValue.toString().trim() === value.toString().trim()) {
        let transformedValue = value.substring(0, value.length - 2);
        return transformedValue;
    }
    
    if (units.length > 2 && prevValue && value && (prevValue.toString() + units.substring(0, units.length - 1)) === value.toString().trim()) {
        //console.log(value.indexOf(units))
        let transformedValue = value.substring(0, value.length - 3);
        return transformedValue;
    }

    const arrFromValue = value.split(units);
    const transformedArr = arrFromValue.filter(_ => _ !== units);
    let transformedValue = ''
    transformedArr.forEach(_ => {
        transformedValue += _
    })
    return transformedValue
}


export const createExelData = (result) => {
    if (result) {
        const basicDataTable = [['Базовые данные', '']]
        const logisticsDataTable = [['Логистика', '']]
        const mpFeesDataTable = [['Удержания маркетплейса', '']]
        const additionalDataTable_Shipping = [['Дополнительно - организация поставки', '']]
        const additionalDataTable_Taxes = [['Допольнительно - налоги', '']]
        const additionalDataTable_Others = [['Допольнительно - прочие расходы на товар', '']]
        const resultTable = [['Итоговые значения', '']]
        const supplyTable = [['Расчет партии', '']]

        const keysArr = Object.keys(result)

        keysArr.forEach(k => {
            let value = result[k]
            if (typeof value === 'boolean') {
                value = value === true ? 'да' : 'нет'
            }

            if (!value) {
                value = '-'
            }

            if (k === 'product' || k === 'product_price' || k === 'SPP' || k === 'isSPP' || k === 'product_cost' || k === 'total_product_price' || k === 'isHeavy' || k === 'package_length' || k === 'package_width' || k === 'package_height' || k === 'sizes_sum' || k === 'volume') {
                basicDataTable.push([fieldsVocab[k], value.toString()])
            }
            if (k === 'warehouse' || k === 'buyout_percentage' || k === 'PackageType' || k === 'cargo_acceptance_price' || k === 'last_mile_logistics_price' || k === 'current_storage_logistic_price' || k === 'storagePrice' || k === 'buyout_percentage' || k === 'is_paid_cargo_acceptance') {
                logisticsDataTable.push([fieldsVocab[k], value.toString()])
            }
            if (k === 'equiring_fee' || k === 'additional_mp_fee' || k === 'mpFee' || k === 'absMpFee') {
                mpFeesDataTable.push([fieldsVocab[k], value.toString()])
            }
            if (k === 'inhouse_logistics_price' || k === 'packaging_price' || k === 'mp_logistics_price' || k === 'fullfilment_price') {
                additionalDataTable_Shipping.push([fieldsVocab[k], value.toString()])
            }
            if (k === 'tax_state' || k === 'tax_rate' || k === 'absTaxFee') {
                additionalDataTable_Taxes.push([fieldsVocab[k], value.toString()])
            }
            if (k === 'adv_price' || k === 'defective_percentage' || k === 'other_costs') {
                additionalDataTable_Others.push([fieldsVocab[k], value.toString()])
            }
            if (k === 'selfCost' || k === 'roi' || k === 'totalMargin' || k === 'netProfit' || k === 'minimalPrice' || k === 'maximumDiscount') {
                resultTable.push([fieldsVocab[k], value.toString()])
            }
            if (k === 'invest_value' || k === 'total_product_quantity' || k === 'total_value' || k === 'total_net_value' || k === 'zero_loss_point') {
                supplyTable.push([fieldsVocab[k], value.toString()])
            }
        })
        const finalData = [
            [["Расчет сгенерирован с помощью сервиса Radar Analytica"]],
            ['', ''],
            ...basicDataTable,
            ['', ''],
            ...logisticsDataTable, 
            ['', ''], 
            ...mpFeesDataTable,
            ['', ''], 
            ...additionalDataTable_Shipping,
            ['', ''], 
            ...additionalDataTable_Taxes,
            ['', ''], 
            ...additionalDataTable_Others,
            ['', ''], 
            ...resultTable,
            ['', ''],
            ...supplyTable
        ]

        return finalData;
    }

    return []
}


export const fieldsVocab = {
    product: 'Товар',
    product_price: 'Цена товара (без СПП), ₽',
    total_product_price: 'Цена товара (с СПП), ₽',
    isSPP: 'СПП, да/нет',
    product_cost: 'Закупочная цена, ₽',
    package_length: 'Длина упаковки, см.',
    package_width: 'Ширина упаковки, см.',
    package_height: 'Высота упаковки, см.',
    isHeavy: 'Тяжелее 25 кг, да/нет',
    PackageType: 'Тип упаковки',
    warehouse: 'Склад отгрузки',
    is_paid_cargo_acceptance: 'Платная приемка, да/нет',
    delivery_speed: 'Скорость доставки (FBS), часы',
    buyout_percentage: 'Процент выкупа, %',
    additional_mp_fee: 'Комиссия за тарифные опции, %',
    equiring_fee: 'Эквайринг, %',
    SPP: 'СПП, %',
    cargo_acceptance_price: 'Стоимость платной приемки, ₽',
    inhouse_logistics_price: 'Логистика от производителя, ₽',
    packaging_price: 'Упаковка и маркировка, ₽',
    mp_logistics_price: 'Логистика до маркетплейса, ₽',
    fullfilment_price: 'Услуги фулфилмента, ₽',
    tax_state: 'Налоговый режим',
    tax_rate: 'Налоговая ставка, %',
    adv_price: 'Затраты на рекламу, %',
    defective_percentage: 'Брак, %',
    other_costs: 'Другое, ₽',
    sizes_sum: 'Сумма трех сторон, см',
    volume: 'Объем, л',
    last_mile_logistics_price: 'Логистика, ₽',
    current_storage_logistic_price: 'Логистика с % выкупа, ₽',
    storagePrice: 'Хранение 1 шт. в мес., ₽',
    mpFee: 'Комиссия маркетплейса, %',
    absMpFee: 'Комиссия маркетплейса, ₽',
    absTaxFee: 'Налог в рублях, ₽',

    selfCost: 'Общая себестоимость, ₽',
    roi: 'Рентабельность ROI, %',
    totalMargin: 'Маржинальность, %',
    netProfit: 'Чистая прибыль, ₽',
    minimalPrice: 'Минимальная цена, ₽',
    maximumDiscount: 'Максимальная скидка, %',

    invest_value: 'Мои вложения, ₽',
    total_product_quantity: 'Кол-во товара, шт',
    total_value: 'Выручка, ₽',
    total_net_value: 'Чистая прибыль, ₽',
    zero_loss_point: 'Точка безубыточности, шт'
};