import { Children } from "react";

export const COLUMNS = [
  {
    title: 'Период',
    dataIndex: 'period',
    width: 480,
    render: (value, record) => (record.children) ? <strong>{value}</strong> : value
  },
  {
    title: 'Итого',
    dataIndex: 'sum',
    width: 90
  },
];


export const ROWS = [
  {
    key: 'expected_marginality_data',
    period: 'expected_marginality - Прогноз. маржинальность',
    children: [
      {
        dataIndex: 'plan_marginality',
        period: 'plan_marginality - План. маржинальность',
      },
      {
        dataIndex: 'roi',
        period: 'roi - ROI, %',
      },
      {
        dataIndex: 'profit_per_one',
        period: 'profit_per_one - Прогноз. чистая прибыль на 1 ед., руб',
      },
      {
        dataIndex: 'net_profit',
        period: 'net_profit - Прогноз. чистая прибыль, руб',
      },
      {
        dataIndex: 'drr_by_sales',
        period: 'drr_by_sales - ДРР по продажам, %',
      },
      {
        dataIndex: 'drr_by_orders',
        period: 'drr_by_orders - ДРР по заказам, %',
      },
      {
        dataIndex: 'orders_amount',
        period: 'orders_amount - orders_amount',
      },
      {
        dataIndex: 'orders_count',
        period: 'orders_count - orders_count',
      },
      {
        dataIndex: 'sales_count',
        period: 'sales_count - Прогноз. продажи, шт',
      },
      {
        dataIndex: 'sales_spp_amount',
        period: 'sales_spp_amount - Прогноз. продажи по СПП, руб',
      },
      {
        dataIndex: 'full_price',
        period: 'full_price - Цена до СПП, руб',
      },
      {
        dataIndex: 'price_spp',
        period: 'price_spp - Цена после СПП, руб',
      },
      {
        dataIndex: 'discount',
        period: 'discount - Скидка МП, %',
      },
      {
        dataIndex: 'buyout',
        period: 'buyout - Процент выкупа, %',
      },
    ]
  },
  {
    key: 'rk_budget_data',
    period: 'rk_budget - Бюджет РК, руб',
    children: [
      {
        dataIndex: 'ctr',
        period: 'ctr - CTR, %',
      },
      {
        dataIndex: 'cr',
        period: 'cr - CR, %',
      },
      {
        dataIndex: 'impressions',
        period: 'impressions - Показы, шт',
      },
      {
        dataIndex: 'clicks',
        period: 'clicks - Клики, шт',
      },
      {
        dataIndex: 'one_order_price',
        period: 'one_order_price - Стоимость 1 заказа, руб',
        
      },
      {
        dataIndex: 'one_sale_price',
        period: 'one_sale_price - Стоимость 1 продажи, руб',
      },
      {
        dataIndex: 'cpc',
        period: 'cpc - CPC, руб',
        
      },
      {
        dataIndex: 'cpm',
        period: 'cpm - CPM, руб',
      },
    ]
  },
  {
    key: 'ark_budget_data',
    period: 'ark_budget_data - Бюджет РК (АРК), руб',
    children: [
      {
        dataIndex: 'ctr',
        period: 'ctr - CTR, %',
      },
      {
        dataIndex: 'impressions',
        period: 'impressions - Показы, шт',
      },
      {
        dataIndex: 'clicks',
        period: 'clicks - Клики, шт',
      },
      {
        dataIndex: 'cpc',
        period: 'cpc - CPC, руб',
      },
      {
        dataIndex: 'cpm',
        period: 'cpm - CPM, руб',
      },
    ]
  },
  {
    key: 'auction_rk_budget_data',
    period: 'auction_rk_budget_data - Бюджет РК (Аукцион), руб',
    children: [
      {
        dataIndex: 'ctr',
        period: 'ctr - CTR, %',
      },
      {
        dataIndex: 'impressions',
        period: 'impressions - Показы, шт',
      },
      {
        dataIndex: 'clicks',
        period: 'clicks - Клики, шт',
      },
      {
        dataIndex: 'cpc',
        period: 'cpc - CPC, руб',
      },
      {
        dataIndex: 'cpm',
        period: 'cpm - CPM, руб',
      },
    ]
  },
  {
    key: 'transition_data',
    period: 'transition_data - Переходы, шт',
    children: [
      {
        dataIndex: 'cart_addition_count',
        period: 'cart_addition_count - Добавление в корзину, шт',
      },
      {
        dataIndex: 'cart_addition_percentage',
        period: 'cart_addition_percentage - Добавление в корзину, %',
      },
      {
        dataIndex: 'order_addition_percentage',
        period: 'order_addition_percentage - Добавление в заказ, %',
      },
    ]
  },
  {
    key: 'taxes_data',
    period: 'Налоги, %',
    children: [
      {
        dataIndex: 'tax_per_one',
        period: 'Налоги на 1 ед, руб',
      },
      {
        dataIndex: 'logistics_per_one',
        period: 'Логистика на 1 ед, руб',
      },
      {
        dataIndex: 'commission_acquiring_per_one',
        period: 'Комиссия + экв. на 1 ед, руб',
      },
      {
        dataIndex: 'commission_acquiring_percentage',
        period: 'Комиссия + экв, %',
      },
      {
        dataIndex: 'storage_per_one',
        period: 'Хранение на 1 ед, руб',
      },
      {
        dataIndex: 'cost_per_one',
        period: 'Себестоимость на 1 ед, руб',
      },
    ]
  },
];

export const RESPONSE_BY_ARTICLE = {
    "data": [
        {
"summary_data": {
    "expected_marginality_data": {
        "expected_marginality": 15.5,
        "plan_marginality": 20,
        "roi": 25,
        "profit_per_one": 1500,
        "net_profit": 15000,
        "drr_by_sales": 12.5,
        "drr_by_orders": 18,
        "orders_amount": 150000,
        "orders_count": 1500,
        "sales_count": 25,
        "sales_spp_amount": 25000,
        "full_price": 15000,
        "price_spp": 12000,
        "discount": 20,
        "buyout": 85
    },
    "rk_budget_data": {
        "ctr": 5,
        "impressions": 10000,
        "clicks": 500,
        "cpc": 10,
        "cpm": 500,
        "rk_budget": 5000,
        "cr": 3,
        "one_order_price": 100,
        "one_sale_price": 120
    },
    "ark_budget_data": {
        "ctr": 4.5,
        "impressions": 8000,
        "clicks": 360,
        "cpc": 12,
        "cpm": 540,
        "ark_budget": 4320
    },
    "auction_rk_budget_data": {
        "ctr": 6,
        "impressions": 5000,
        "clicks": 300,
        "cpc": 15,
        "cpm": 900,
        "auction_budget": 4500
    },
    "transition_data": {
        "transition": 1000,
        "cart_addition_count": 200,
        "cart_addition_percentage": 20,
        "order_addition_percentage": 15
    },
    "taxes_data": {
        "tax_rate": 20,
        "tax_per_one": 200,
        "logistics_per_one": 150,
        "commission_acquiring_per_one": 50,
        "commission_acquiring_percentage": 5,
        "storage_per_one": 30,
        "cost_per_one": 800
    }
},
            "by_date_data": [
                {
                    "date": "2023-05-01",
                    "rnp_data": {
                        "expected_marginality_data": {
                            "expected_marginality": 15.5,
                            "plan_marginality": 20,
                            "roi": 25,
                            "profit_per_one": 1500,
                            "net_profit": 15000,
                            "drr_by_sales": 12.5,
                            "drr_by_orders": 18,
                            "orders_amount": 150000,
                            "orders_count": 1500,
                            "sales_count": 25,
                            "sales_spp_amount": 25000,
                            "full_price": 15000,
                            "price_spp": 12000,
                            "discount": 20,
                            "buyout": 85
                        },
                        "rk_budget_data": {
                            "+ctr": 5,
                            "+impressions": 10000,
                            "+clicks": 500,
                            "+cpc": 10,
                            "+cpm": 500,
                            "rk_budget": 5000,
                            "+cr": 3,
                            "+one_order_price": 100,
                            "+one_sale_price": 120
                        },
                        "ark_budget_data": {
                            "ctr": 4.5,
                            "impressions": 8000,
                            "clicks": 360,
                            "cpc": 12,
                            "cpm": 540,
                            "ark_budget": 4320
                        },
                        "auction_rk_budget_data": {
                            "ctr": 6,
                            "impressions": 5000,
                            "clicks": 300,
                            "cpc": 15,
                            "cpm": 900,
                            "auction_budget": 4500
                        },
                        "transition_data": {
                            "transition": 1000,
                            "cart_addition_count": 200,
                            "cart_addition_percentage": 20,
                            "order_addition_percentage": 15
                        },
                        "taxes_data": {
                            "tax_rate": 20,
                            "tax_per_one": 200,
                            "logistics_per_one": 150,
                            "commission_acquiring_per_one": 50,
                            "commission_acquiring_percentage": 5,
                            "storage_per_one": 30,
                            "cost_per_one": 800
                        }
                    }
                },
                {
                    "date": "2023-05-02",
                    "rnp_data": {
                        "expected_marginality_data": {
                            "expected_marginality": 15.5,
                            "plan_marginality": 20,
                            "roi": 25,
                            "profit_per_one": 1500,
                            "net_profit": 15000,
                            "drr_by_sales": 12.5,
                            "drr_by_orders": 18,
                            "orders_amount": 150000,
                            "orders_count": 1500,
                            "sales_count": 25,
                            "sales_spp_amount": 25000,
                            "full_price": 15000,
                            "price_spp": 12000,
                            "discount": 20,
                            "buyout": 85
                        },
                        "rk_budget_data": {
                            "ctr": 5,
                            "impressions": 10000,
                            "clicks": 500,
                            "cpc": 10,
                            "cpm": 500,
                            "rk_budget": 5000,
                            "cr": 3,
                            "one_order_price": 100,
                            "one_sale_price": 120
                        },
                        "ark_budget_data": {
                            "ctr": 4.5,
                            "impressions": 8000,
                            "clicks": 360,
                            "cpc": 12,
                            "cpm": 540,
                            "ark_budget": 4320
                        },
                        "auction_rk_budget_data": {
                            "ctr": 6,
                            "impressions": 5000,
                            "clicks": 300,
                            "cpc": 15,
                            "cpm": 900,
                            "auction_budget": 4500
                        },
                        "transition_data": {
                            "transition": 1000,
                            "cart_addition_count": 200,
                            "cart_addition_percentage": 20,
                            "order_addition_percentage": 15
                        },
                        "taxes_data": {
                            "tax_rate": 20,
                            "tax_per_one": 200,
                            "logistics_per_one": 150,
                            "commission_acquiring_per_one": 50,
                            "commission_acquiring_percentage": 5,
                            "storage_per_one": 30,
                            "cost_per_one": 800
                        }
                    }
                }
            ],
            "article_data": {
                "product_id": 1,
                "shop_name": "Test shop",
                "title": "Платье комбинация праздничное",
                "wb_id": "163669173",
                "barcode": "2038941371253",
                "photo": "https://basket-11.wbbasket.ru/vol1636/part163669/163669173/images/c246x328/1.webp",
                "vendor_code": "dress_09"
            }
        }
    ],
    "total_count": 1,
    "page": 1,
    "per_page": 25
};