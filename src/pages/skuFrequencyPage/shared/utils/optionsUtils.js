export const complexRequestObjectGenerator = (fields) => {



    const requestObject = {
        query: fields.query,
        //subjects: [0],
        //seasons: [0],
        //seasons_fall: [0],
        //seasons_grow: [0],
        g30: {
            start: fields.g30_start || 0,
            end: fields.g30_end || 0
        },
        g60: {
            start: fields.g60_start || 0,
            end: fields.g60_end || 0
        },
        g90: {
            start: fields.g90_start || 0,
            end: fields.g90_end || 0
        },
        frequency: { //Частотность ВБ
            start: fields.frequency_start || 0,
            end: fields.frequency_end || 0
        },
        revenue: { //Выручка
            start: fields.revenue_start || 0,
            end: fields.revenue_end || 0
        },
        avg_revenue: {
            start: fields.avg_revenue_start || 0,
            end: fields.avg_revenue_end || 0
        },
        avg_price: { //Ср цена
            start: fields.avg_price_start || 0,
            end: fields.avg_price_end || 0
        },
        // goods_quantity: {
        //     start: fields.productsQuantityFrom || 0,
        //     end: fields.productsQuantityTo || 0
        // },
        freq_per_good: {
            start: fields.freq_per_good_start || 0,
            end: fields.freq_per_good_end || 0
        },
        suppliers_quantity: {
            start: fields.suppliers_quantity_start || 0,
            end: fields.suppliers_quantity_end || 0
        },
        suppliers_with_sales_percent: {
            start: fields.suppliers_with_sales_percent_start || 0,
            end: fields.suppliers_with_sales_percent_end || 0
        },
        avg_reviews: {
            start: fields.avg_reviews_start || 0,
            end: fields.avg_reviews_end || 0
        },
        goods_with_sales_percent: { //Процент товаров с продажами
            start: fields.goods_with_sales_percent_start || 0,
            end: fields.goods_with_sales_percent_end || 0
        },
        goods_quantity: {
            start: fields.goods_quantity_start || 0,
            end: fields.goods_quantity_end || 0
        },
        lost_revenue_percent: {
            start: fields.lost_revenue_percent_start || 0,
            end: fields.lost_revenue_percent_end || 0
        },
        advert_percent: {
            start: fields.advert_percent_start || 0,
            end: fields.advert_percent_end || 0
        },
        external_advert_percent: {
            start: fields.external_advert_percent_start || 0,
            end: fields.external_advert_percent_end || 0
        },
        monopoly_percent: {
            start: fields.monopoly_percent_start || 0,
            end: fields.monopoly_percent_end || 0
        },
        buyout_percent: {
            start: fields.buyout_percent_start || 0,
            end: fields.buyout_percent_end || 0
        },
        fbo_commision: {
            start: fields.fbo_commision_start || 0,
            end: fields.fbo_commision_end || 0
        },
        page: 1,
        limit: 25,
        sorting: {
            sort_field: "rating",
            sort_order: "DESC"
        }
    };

    return requestObject;
}