import { Children } from "react";
import { formatPrice } from '../../service/utils';

export const renderFunction = (value) => (formatPrice(value))

export const COLUMNS = [
  {
    title: 'Период',
    dataIndex: 'period',
    width: 380,
    fixed: true,
    render: (value, record) => (record.children) ? <strong>{value}</strong> : value
  },
  {
    title: 'Итого',
    dataIndex: 'sum',
    width: 160,
    render: renderFunction
  },
];


export const ROWS = [
  {
    key: 'expected_marginality_data',
    period: 'Прогноз. маржинальность (%)',
    children: [
      {
        dataIndex: 'plan_marginality',
        period: 'План. маржинальность (%)',
      },
      {
        dataIndex: 'roi',
        period: 'ROI (%)',
      },
      {
        dataIndex: 'profit_per_one',
        period: 'Прогноз. чистая прибыль на 1 ед. (руб)',
      },
      {
        dataIndex: 'net_profit',
        period: 'Прогноз. чистая прибыль (руб)',
      },
      {
        dataIndex: 'drr_by_sales',
        period: 'ДРР по продажам (%)',
      },
      {
        dataIndex: 'drr_by_orders',
        period: 'ДРР по заказам (%)',
      },
      {
        dataIndex: 'orders_count',
        period: 'Факт. заказы (шт)',
      },
      {
        dataIndex: 'orders_amount',
        period: 'Факт. заказы (руб)',
      },
      {
        dataIndex: 'sales_count',
        period: 'Прогноз. продажи (шт)',
      },
      {
        dataIndex: 'sales_spp_amount',
        period: 'Прогноз. продажи до СПП (руб)',
      },
      {
        dataIndex: 'full_price',
        period: 'Цена до СПП (руб)',
      },
      {
        dataIndex: 'price_spp',
        period: 'Цена после СПП (руб)',
      },
      {
        dataIndex: 'discount',
        period: 'Скидка МП (%)',
      },
      {
        dataIndex: 'buyout',
        period: 'Процент выкупа (%)',
      },
    ]
  },
  {
    key: 'rk_budget_data',
    period: 'Бюджет РК (руб)',
    children: [
      {
        dataIndex: 'ctr',
        period: 'CTR (%)',
      },
      {
        dataIndex: 'cr',
        period: 'CR (%)',
      },
      {
        dataIndex: 'cpc',
        period: 'CPC (руб)',
        
      },
      {
        dataIndex: 'cpm',
        period: 'CPM (руб)',
      },
      {
        dataIndex: 'impressions',
        period: 'Показы (шт)',
      },
      {
        dataIndex: 'clicks',
        period: 'Клики (шт)',
      },
      {
        dataIndex: 'one_order_price',
        period: 'Стоимость 1 заказа (руб)',
        
      },
      {
        dataIndex: 'one_sale_price',
        period: 'Стоимость 1 продажи (руб)',
      },
    ]
  },
  {
    key: 'auction_rk_budget_data',
    period: 'Бюджет РК (Аукцион) (руб)',
    children: [
      {
        dataIndex: 'ctr',
        period: 'CTR (%)',
      },
      {
        dataIndex: 'impressions',
        period: 'Показы (шт)',
      },
      {
        dataIndex: 'clicks',
        period: 'Клики (шт)',
      },
      {
        dataIndex: 'cpc',
        period: 'CPC (руб)',
      },
      {
        dataIndex: 'cpm',
        period: 'CPM (руб)',
      },
    ]
  },
  {
    key: 'ark_budget_data',
    period: 'Бюджет РК (АРК) (руб)',
    children: [
      {
        dataIndex: 'ctr',
        period: 'CTR (%)',
      },
      {
        dataIndex: 'impressions',
        period: 'Показы (шт)',
      },
      {
        dataIndex: 'clicks',
        period: 'Клики (шт)',
      },
      {
        dataIndex: 'cpc',
        period: 'CPC (руб)',
      },
      {
        dataIndex: 'cpm',
        period: 'CPM (руб)',
      },
    ]
  },
  {
    key: 'transition_data',
    period: 'Переходы (шт)',
    children: [
      {
        dataIndex: 'cart_addition_count',
        period: 'Добавление в корзину (шт)',
      },
      {
        dataIndex: 'cart_addition_percentage',
        period: 'Добавление в корзину (%)',
      },
      {
        dataIndex: 'order_addition_percentage',
        period: 'Добавление в заказ (%)',
      },
    ]
  },
  {
    key: 'taxes_data',
    period: 'Расходы и налоги (%)',
    children: [
      {
        dataIndex: 'tax_per_one',
        period: 'Налоги на 1 ед. (руб)',
      },
      {
        dataIndex: 'logistics_per_one',
        period: 'Логистика на 1 ед. (руб)',
      },
      {
        dataIndex: 'commission_acquiring_per_one',
        period: 'Комиссия + экв. на 1 ед. (руб)',
      },
      {
        dataIndex: 'commission_acquiring_percentage',
        period: 'Комиссия + экв. (%)',
      },
      {
        dataIndex: 'storage_per_one',
        period: 'Хранение на 1 ед. (руб)',
      },
      {
        dataIndex: 'cost_per_one',
        period: 'Себестоимость на 1 ед. (руб)',
      },
    ]
  },
];
