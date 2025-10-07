import { Children } from "react";
import { formatPrice } from '../../service/utils';
import moment from 'moment';
import 'moment/dist/locale/ru';

moment.locale('ru');


export const renderFunction = (value) => (formatPrice(value));

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

/**
 *
 *const configItemTemplate = {
      //key: 'name',
      //title: 'Name',
      //dataIndex: 'name',
      sortable: false,
      fixed: false,
      fixedLeft: 0,
      width: 210,
      minWidth: 210,
      maxWidth: 420,
      hidden: false,
      style: {

      }
    }

    const config = [{
      key: 'article',
      title: 'Статья',
      dataIndex: 'article',
      sortable: false,
      fixed: true,
      fixedLeft: 0,
      width: 220,
      minWidth: 220,
      maxWidth: 440,
      hidden: false,
    }];
 */

let configItemTemplate = {
  //key: 'name',
  //title: 'Name',
  //dataIndex: 'name',
  sortable: false,
  fixed: false,
  fixedLeft: 0,
  width: 120,
  minWidth: 120,
  maxWidth: 240,
  hidden: false,
  units: ' ',
  style: {

  }
};
const metricsOrder = [
  { key: 'expected_marginality_data', title: 'Прогноз. маржинальность (%)', isParent: true },
  { key: 'plan_marginality', title: 'План. маржинальность (%)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'roi', title: 'ROI (%)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'profit_per_one', title: 'Прогноз. чистая прибыль на 1 ед. (руб)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'net_profit', title: 'Прогноз. чистая прибыль (руб)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'drr_by_sales', title: 'ДРР по продажам (%)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'drr_by_orders', title: 'ДРР по заказам (%)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'orders_count', title: 'Факт. заказы (шт)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'orders_amount', title: 'Факт. заказы (руб)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'sales_count', title: 'Прогноз. продажи (шт)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'sales_spp_amount', title: 'Прогноз. продажи до СПП (руб)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'full_price', title: 'Цена до СПП (руб)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'price_spp', title: 'Цена после СПП (руб)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'discount', title: 'Скидка МП (%)', isChildren: true, parentKey: 'expected_marginality_data' },
  { key: 'buyout', title: 'Процент выкупа (%)', isChildren: true, parentKey: 'expected_marginality_data' },

  { key: 'rk_budget_data', title: 'Бюджет РК (руб)', isParent: true },
  { key: 'ctr', title: 'CTR (%)', isChildren: true, parentKey: 'rk_budget_data' },
  { key: 'cr', title: 'CR (%)', isChildren: true, parentKey: 'rk_budget_data' },
  { key: 'cpc', title: 'CPC (руб)', isChildren: true, parentKey: 'rk_budget_data' },
  { key: 'cpm', title: 'CPM (руб)', isChildren: true, parentKey: 'rk_budget_data' },
  { key: 'impressions', title: 'Показы (шт)', isChildren: true, parentKey: 'rk_budget_data' },
  { key: 'clicks', title: 'Клики (шт)', isChildren: true, parentKey: 'rk_budget_data' },
  { key: 'one_order_price', title: 'Стоимость 1 заказа (руб)', isChildren: true, parentKey: 'rk_budget_data' },
  { key: 'one_sale_price', title: 'Стоимость 1 продажи (руб)', isChildren: true, parentKey: 'rk_budget_data' },

  { key: 'auction_rk_budget_data', title: 'Бюджет РК (Аукцион) (руб)', isParent: true },
  { key: 'ctr', title: 'CTR (%)', isChildren: true, parentKey: 'auction_rk_budget_data' },
  { key: 'impressions', title: 'Показы (шт)', isChildren: true, parentKey: 'auction_rk_budget_data' },
  { key: 'clicks', title: 'Клики (шт)', isChildren: true, parentKey: 'auction_rk_budget_data' },
  { key: 'cpc', title: 'CPC (руб)', isChildren: true, parentKey: 'auction_rk_budget_data' },
  { key: 'cpm', title: 'CPM (руб)', isChildren: true, parentKey: 'auction_rk_budget_data' },

  { key: 'ark_budget_data', title: 'Бюджет РК (АРК) (руб)', isParent: true },
  { key: 'ctr', title: 'CTR (%)', isChildren: true, parentKey: 'ark_budget_data' },
  { key: 'impressions', title: 'Показы (шт)', isChildren: true, parentKey: 'ark_budget_data' },
  { key: 'clicks', title: 'Клики (шт)', isChildren: true, parentKey: 'ark_budget_data' },
  { key: 'cpc', title: 'CPC (руб)', isChildren: true, parentKey: 'ark_budget_data' },
  { key: 'cpm', title: 'CPM (руб)', isChildren: true, parentKey: 'ark_budget_data' },

  { key: 'transition_data', title: 'Переходы (шт)', isParent: true },
  { key: 'cart_addition_count', title: 'Добавление в корзину (шт)', isChildren: true, parentKey: 'transition_data' },
  { key: 'cart_addition_percentage', title: 'Добавление в корзину (%)', isChildren: true, parentKey: 'transition_data' },
  { key: 'order_addition_percentage', title: 'Добавление в заказ (%)', isChildren: true, parentKey: 'transition_data' },

  { key: 'taxes_data', title: 'Расходы и налоги (%)', isParent: true },
  { key: 'tax_per_one', title: 'Налоги на 1 ед. (руб)', isChildren: true, parentKey: 'taxes_data' },
  { key: 'logistics_per_one', title: 'Логистика на 1 ед. (руб)', isChildren: true, parentKey: 'taxes_data' },
  { key: 'commission_acquiring_per_one', title: 'Комиссия + экв. на 1 ед. (руб)', isChildren: true, parentKey: 'taxes_data' },
  { key: 'commission_acquiring_percentage', title: 'Комиссия + экв. (%)', isChildren: true, parentKey: 'taxes_data' },
  { key: 'storage_per_one', title: 'Хранение на 1 ед. (руб)', isChildren: true, parentKey: 'taxes_data' },
  { key: 'cost_per_one', title: 'Себестоимость на 1 ед. (руб)', isChildren: true, parentKey: 'taxes_data' },
];

export const getTableConfig = (initialData) => {


  const tableConfig = [
    {
      title: 'Период',
      key: 'period',
      dataIndex: 'period',
      width: 250,
      minWidth: 250,
      maxWidth: 500,
      fixed: true,
      fixedLeft: 0,
    },
    {
      title: 'Итого',
      key: 'summary',
      dataIndex: 'summary',
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      units: ' '
    },
  ];
  initialData.by_date_data?.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(_ => {
    const formattedDate = moment(_.date).format('D MMMM');
    const isToday = moment(_.date).isSame(moment(), 'day');

    if (!isToday) {
      tableConfig.push({
        title: formattedDate,
        key: formattedDate,
        dataIndex: formattedDate,
        ...configItemTemplate,
      });
    }
  });
  return tableConfig;
};


export const getTableData = (initialData) => {

  const childrenData = [];
  const tableData = [];
  metricsOrder.forEach((item, index) => {
    const { key, title, isChildren, isParent, parentKey } = item;
    let rowObject = {
      period: title,
      isParent,
      parentKey,
      key,
      id: `${index}-${key}`,
    };
    initialData.by_date_data.forEach(dataItem => {
      const formattedDate = moment(dataItem.date).format('D MMMM');

      if (isParent) {
        const suffixIndex = key.indexOf('_data');
        const parentDataKey = key.slice(0, suffixIndex);
        rowObject[formattedDate] = dataItem.rnp_data[key][key.slice(0, suffixIndex)];
        rowObject.summary = initialData.summary_data[key][key.slice(0, suffixIndex)];
      } else if (isChildren && parentKey) {
        rowObject[formattedDate] = dataItem.rnp_data[parentKey][key];
        rowObject.summary = initialData.summary_data[parentKey][key];
      }
    });

    if (isParent) {
      tableData.push(rowObject);
    }
    if (isChildren) {
      childrenData.push(rowObject);
    }
  });

  const tableDataWithChildren = tableData.map(_ => {
    const filteredChildren = childrenData.filter(c => c.parentKey === _.key);
    return {
      ..._,
      children: filteredChildren.map((c, index) => {
        if (index === filteredChildren.length - 1) {
          return {
            ...c,
            isLastChild: true
          };
        }
        return c;
      }),
    };
  });
  return tableDataWithChildren;
};
