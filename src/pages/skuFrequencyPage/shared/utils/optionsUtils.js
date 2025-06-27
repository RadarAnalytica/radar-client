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
        frequency: { //Частотность ВБ
            start: fields.frequency_start || 0,
            end: fields.frequency_end || 0
        },
        revenue: { //Выручка
            start: fields.revenue_start || 0,
            end: fields.revenue_end || 0
        },
        avg_price: { //Ср цена
            start: fields.avg_price_start || 0,
            end: fields.avg_price_end || 0
        },
        goods_with_sales_percent: { //Процент товаров с продажами
            start: fields.goods_with_sales_percent_start || 0,
            end: fields.goods_with_sales_percent_end || 0
        },
        goods_quantity: {
            start: fields.goods_quantity_start || 0,
            end: fields.goods_quantity_end || 0
        },
        freq_per_good: { //коэфт спроса
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

        // dynamic options
        g30: {
            start: fields.dynamic_30_days_from || 0,
            end: fields.dynamic_30_days_to || 0
        },
        g60: {
            start: fields.dynamic_60_days_to || 0,
            end: fields.dynamic_60_days_to || 0
        },
        g90: {
            start: fields.dynamic_90_days_to || 0,
            end: fields.dynamic_90_days_to || 0
        },

        //subject options
        subjects: fields.prefered_items || [0],

        //quality options
        rating: fields.rating || [0],

        //sideparams options
        monopoly_percent: {
            start: fields.monopoly_percent_start || 0,
            end: fields.monopoly_percent_end || 0
        },
        buyout_percent: {
            start: fields.buyout_percent_start || 0,
            end: fields.buyout_percent_end || 0
        },
        advert_percent: {
            start: fields.advert_percent_start || 0,
            end: fields.advert_percent_end || 0
        },
        external_advert_percent: {
            start: fields.external_advert_percent_start || 0,
            end: fields.external_advert_percent_end || 0
        },
        lost_revenue_percent: {
            start: fields.lost_revenue_percent_start || 0,
            end: fields.lost_revenue_percent_end || 0
        },
        avg_revenue: {
            start: fields.avg_revenue_start || 0,
            end: fields.avg_revenue_end || 0
        },
        avg_reviews: {
            start: fields.avg_reviews_start || 0,
            end: fields.avg_reviews_end || 0
        },
        add_goods_quantity: {
            start: fields.add_goods_quantity_start || 0,
            end: fields.add_goods_quantity_end || 0
        },
        add_freq_per_good: {
            start: fields.add_freq_per_good_start || 0,
            end: fields.add_freq_per_good_end || 0
        },
        add_frequency: {
            start: fields.add_frequency_start || 0,
            end: fields.add_frequency_end || 0
        },
        avg_30_days_revenue: {
            start: fields.avg_30_days_revenue_start || 0,
            end: fields.avg_30_days_revenue_end || 0
        },
        f3_avg_price: {
            start: fields.f3_avg_price_start || 0,
            end: fields.f3_avg_price_end || 0
        },
        f3_goods_with_sales_percent: {
            start: fields.f3_goods_with_sales_percent_start || 0,
            end: fields.f3_goods_with_sales_percent_end || 0
        },

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