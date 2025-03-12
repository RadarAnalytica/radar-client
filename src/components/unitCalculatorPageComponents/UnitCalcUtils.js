export const unitCalcResultFunction = (fields, mp_fee, current_storage_logistic_price, current_storage_price_month) => {

    // basics
    const product_cost = parseInt(fields.product_cost)
    const product_price = parseInt(fields.product_price)
    const SPP = fields.isSPP ? parseInt(fields.SPP) : 0;
    
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

    console.log('-----------------------')
    console.log('defective_percentage: '+defective_percentage)
    console.log('product_price: '+product_price)
    console.log('total_product_price: '+total_product_price)
    console.log('netProfit: '+netProfit)
    console.log('grossMargin: '+grossMargin)
    console.log('selfCost: '+selfCost)
    console.log('absMpFee: '+absMpFee)
    console.log('absEquiringFee: '+absEquiringFee)
    console.log('absTaxFee: '+absTaxFee)
    console.log('cargo_acceptance_price: '+cargo_acceptance_price)
    console.log('adv_price: '+adv_price)
    console.log('current_storage_logistic_price: '+current_storage_logistic_price)
    console.log('totalMargin: '+totalMargin)
    console.log('minimalPrice: '+minimalPrice)
    console.log('maximumDiscount: '+maximumDiscount)
    console.log('roi: '+roi)
    console.log('totalProductAmountQuef: '+roi)
    console.log('-----------------------')





    return {
        selfCost,
        netProfit,
        totalMargin,
        minimalPrice,
        maximumDiscount,
        roi,
        totalProductAmountQuef,
        total_product_price,
        product_cost,
        fields
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


export const fieldsVocab = {
    product: 'Категория',
    product_price: 'Цена товара, Р.',
    isSPP: 'Скидка постоянного покупателя, да/нет',
    product_cost: 'Закупочная цена товара, Р.',
    package_length: 'Длина упаковки, см.',
    package_width: 'Ширина упаковки, см.',
    package_height: 'Высота упаковки, см.',
    isHeavy: 'Тяжелее 25 кг, да/нет',
    PackageType: 'Тип груза',
    warehouse: 'Выбранный склад',
    is_paid_cargo_acceptance: 'Платная приемка, да/нет',
    delivery_speed: 'Скорость доставки (FBS), часы',
    buyout_percentage: 'Процент выкупа, %',
    additional_mp_fee: 'Дополнительная коммисия МП, %',
    equiring_fee: 'Эквайринг, %',
    SPP: 'Скидка постоянного покупателя, %',
    cargo_acceptance_price: 'Стоимость платной приемки, Р.',
    inhouse_logistics_price: 'Стоимость логистики от производителя, Р.',
    packaging_price: 'Стоимость упаковки, Р.',
    mp_logistics_price: 'Стоимость логистики до МП, Р.',
    fullfilment_price: 'Стоимость фулфилмента, Р.',
    tax_state: 'Тип налогобложения',
    tax_rate: 'Ставка налога, %',
    adv_price: 'Затраты на рекламу, %',
    defective_percentage: 'Процент брака, %',
    other_costs: 'Прочие расходы, %',
};