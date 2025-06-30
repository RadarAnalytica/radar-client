export const complexRequestObjectGenerator = (fields) => {

    console.log(fields)

    const requestObject = {
        //seasons: [0],
        //seasons_fall: [0],
        //seasons_grow: [0],
        // fbo_commision: {
        //     start: fields.fbo_commision_start || 0,
        //     end: fields.fbo_commision_end || 0
        // },

        //main options
        query: fields.query,
        frequency_30: { //Частотность ВБ
            start: fields.frequency_30_start || null,
            end: fields.frequency_30_end || null
        },
        revenue_total: { //Выручка
            start: fields.revenue_total_start || null,
            end: fields.revenue_total_end || null
        },
        avg_price_total: { //Ср цена
            start: fields.avg_price_total_start || null,
            end: fields.avg_price_total_end || null
        },
        goods_with_sales_percent_total: { //Процент товаров с продажами
            start: fields.goods_with_sales_percent_total_start || null,
            end: fields.goods_with_sales_percent_total_end || null
        },
        stock_quantity: {
            start: fields.stock_quantity_start || null,
            end: fields.stock_quantity_end || null
        },
        freq_per_good: { //коэфт спроса
            start: fields.freq_per_good_start || null,
            end: fields.freq_per_good_end || null
        },
        suppliers_quantity: {
            start: fields.suppliers_quantity_start || null,
            end: fields.suppliers_quantity_end || null
        },
        suppliers_with_sales_percent: {
            start: fields.suppliers_with_sales_percent_start || null,
            end: fields.suppliers_with_sales_percent_end || null
        },

        // dynamic options
        g30: {
            start: fields.dynamic_30_days_from || null,
            end: fields.dynamic_30_days_to || null
        },
        g60: {
            start: fields.dynamic_60_days_to || null,
            end: fields.dynamic_60_days_to || null
        },
        g90: {
            start: fields.dynamic_90_days_to || null,
            end: fields.dynamic_90_days_to || null
        },

        //subject options
        subjects: fields.prefered_items || [0],

        //quality options
        rating: fields.rating || [0],

        //sideparams options
        frequency_60: { //Частотность ВБ
            start: fields.frequency_60_start || null,
            end: fields.frequency_60_end || null
        },
        frequency_90: { //Частотность ВБ
            start: fields.frequency_90_start || null,
            end: fields.frequency_90_end || null
        },
        monopoly_percent: {
            start: fields.monopoly_percent_start || null,
            end: fields.monopoly_percent_end || null
        },
        goods_quantity: {
            start: fields.goods_quantity_start || null,
            end: fields.goods_quantity_end || null
        },
        buyout_percent: {
            start: fields.buyout_percent_start || null,
            end: fields.buyout_percent_end || null
        },
        advert_percent: {
            start: fields.advert_percent_start || null,
            end: fields.advert_percent_end || null
        },
        external_advert_percent: {
            start: fields.external_advert_percent_start || null,
            end: fields.external_advert_percent_end || null
        },
        avg_reviews: {
            start: fields.avg_reviews_start || null,
            end: fields.avg_reviews_end || null
        },
        revenue_300: {
            start: fields.revenue_300_start || null,
            end: fields.revenue_300_end || null
        },
        avg_revenue_300: {
            start: fields.avg_revenue_300_start || null,
            end: fields.avg_revenue_300_end || null
        },
        lost_revenue_percent: {
            start: fields.lost_revenue_percent_start || null,
            end: fields.lost_revenue_percent_end || null
        },
        avg_price_300: {
            start: fields.avg_price_300_start || null,
            end: fields.avg_price_300_end || null
        },
        goods_with_sales_percent_300: {
            start: fields.goods_with_sales_percent_300 || null,
            end: fields.goods_with_sales_percent_300 || null
        },
        
        // not in use
        // add_freq_per_good: {
        //     start: fields.add_freq_per_good_start || 0,
        //     end: fields.add_freq_per_good_end || 0
        // },
        // add_frequency: {
        //     start: fields.add_frequency_start || 0,
        //     end: fields.add_frequency_end || 0
        // },
        // avg_30_days_revenue: {
        //     start: fields.avg_30_days_revenue_start || 0,
        //     end: fields.avg_30_days_revenue_end || 0
        // },
        
        // pagination state
        page: 1,
        limit: 25,
        sorting: {
            sort_field: "rating",
            sort_order: "DESC"
        }
    };

    return requestObject;
}