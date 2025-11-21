// Интерфейсы для новой структуры API
export interface AdvertFunnel {
  cart: number;
  orders: number;
  order_item_count: number;
  expected_purchase: number;
  view_click: number;
  click_cart: number;
  cart_order: number;
  view_order: number;
  expected_order_purchase: number;
  expected_click_purchase: number;
}

export interface AdvertStatistics {
  views: number;
  clicks: number;
  cpc: number;
  avg_cpm: number;
  avg_position: number;
  drr_orders: number;
  drr_purchase: number;
  cp_cart: number;
  expected_cps: number;
  orders_amount: number;
  expected_purchase_amount: number;
  ad_spend: number;
}

export interface ApiCompanyData {
  advert_funnel: AdvertFunnel;
  advert_statistics: AdvertStatistics;
  company_id: number;
  company_name: string;
  company_status: string;
  company_type: string;
  company_start_date: string;
}

export interface ApiResponse {
  data: ApiCompanyData[];
  total_count?: number;
  page?: number;
  per_page?: number;
}

// Интерфейс для данных таблицы (совместим с текущим кодом)
export interface CompanyData {
  id: number;
  company: string;
  company_photo?: string;
  status_wb: string;
  company_type: string;
  cart: number;
  orders: number;
  ordered_qty: number;
  forecast_purchase_qty: number;
  views_to_click: string;
  click_to_cart: string;
  cart_to_order: string;
  view_to_order: string;
  forecast_order_to_purchase: string;
  forecast_click_to_purchase: string;
  views: number;
  clicks: number;
  cpc: number;
  avg_crm: number;
  avg_position: number;
  drr_orders: number;
  forecast_drr_purchase: number;
  cpcart: number;
  forecast_cps: number;
  orders_sum: number;
  forecast_purchase_sum: number;
  advertising_costs: number;
}

// Функция преобразования процентов в строку формата "X.XX%"
const formatPercentage = (value: number): string => {
  if (value === 0 || isNaN(value) || !isFinite(value)) return '0%';
  return `${value.toFixed(2)}%`;
};

// Функция преобразования данных из API формата в формат таблицы
export const transformApiDataToCompanyData = (apiData: ApiCompanyData[]): CompanyData[] => {
  return apiData.map((item) => {
    const funnel = item.advert_funnel;
    const stats = item.advert_statistics;

    // Используем значения из API, если они есть, иначе вычисляем проценты
    // Поля view_click, click_cart и т.д. могут быть уже в процентах или коэффициентами
    // Если они равны 0, вычисляем на основе других данных
    let viewsToClick = funnel.view_click || 0;
    if (viewsToClick === 0 && stats.views > 0) {
      viewsToClick = (stats.clicks / stats.views) * 100;
    }
    // Если значение меньше 1, считаем его коэффициентом и преобразуем в проценты
    if (viewsToClick > 0 && viewsToClick < 1) {
      viewsToClick = viewsToClick * 100;
    }

    let clickToCart = funnel.click_cart || 0;
    if (clickToCart === 0 && stats.clicks > 0) {
      clickToCart = (funnel.cart / stats.clicks) * 100;
    }
    if (clickToCart > 0 && clickToCart < 1) {
      clickToCart = clickToCart * 100;
    }

    let cartToOrder = funnel.cart_order || 0;
    if (cartToOrder === 0 && funnel.cart > 0) {
      cartToOrder = (funnel.orders / funnel.cart) * 100;
    }
    if (cartToOrder > 0 && cartToOrder < 1) {
      cartToOrder = cartToOrder * 100;
    }

    let viewToOrder = funnel.view_order || 0;
    if (viewToOrder === 0 && stats.views > 0) {
      viewToOrder = (funnel.orders / stats.views) * 100;
    }
    if (viewToOrder > 0 && viewToOrder < 1) {
      viewToOrder = viewToOrder * 100;
    }

    let forecastOrderToPurchase = funnel.expected_order_purchase || 0;
    if (forecastOrderToPurchase === 0 && funnel.orders > 0) {
      forecastOrderToPurchase = (funnel.expected_purchase / funnel.orders) * 100;
    }
    if (forecastOrderToPurchase > 0 && forecastOrderToPurchase < 1) {
      forecastOrderToPurchase = forecastOrderToPurchase * 100;
    }

    let forecastClickToPurchase = funnel.expected_click_purchase || 0;
    if (forecastClickToPurchase === 0 && stats.clicks > 0) {
      forecastClickToPurchase = (funnel.expected_purchase / stats.clicks) * 100;
    }
    if (forecastClickToPurchase > 0 && forecastClickToPurchase < 1) {
      forecastClickToPurchase = forecastClickToPurchase * 100;
    }

    return {
      id: item.company_id,
      company: item.company_name || item.company_id,
      company_photo: undefined, // API не предоставляет фото
      status_wb: item.company_status || '',
      company_type: item.company_type || '',
      cart: funnel.cart || 0,
      orders: funnel.orders || 0,
      ordered_qty: funnel.order_item_count || 0,
      forecast_purchase_qty: funnel.expected_purchase || 0,
      views_to_click: formatPercentage(viewsToClick),
      click_to_cart: formatPercentage(clickToCart),
      cart_to_order: formatPercentage(cartToOrder),
      view_to_order: formatPercentage(viewToOrder),
      forecast_order_to_purchase: formatPercentage(forecastOrderToPurchase),
      forecast_click_to_purchase: formatPercentage(forecastClickToPurchase),
      views: stats.views || 0,
      clicks: stats.clicks || 0,
      cpc: stats.cpc || 0,
      avg_crm: stats.avg_cpm || 0,
      avg_position: stats.avg_position || 0,
      drr_orders: stats.drr_orders || 0,
      forecast_drr_purchase: stats.drr_purchase || 0,
      cpcart: stats.cp_cart || 0,
      forecast_cps: stats.expected_cps || 0,
      orders_sum: stats.orders_amount || 0,
      forecast_purchase_sum: stats.expected_purchase_amount || 0,
      advertising_costs: stats.ad_spend || 0,
    };
  });
};

export const mockCompaniesData: CompanyData[] = [
  {
    "advert_funnel": {
        "cart": 15,
        "orders": 11,
        "order_item_count": 11,
        "expected_purchase": 73,
        "view_click": 5.533,
        "click_cart": 8.475,
        "cart_order": 73.333,
        "view_order": 0.344,
        "expected_order_purchase": 15.068,
        "expected_click_purchase": 242.466
    },
    "advert_statistics": {
        "views": 3199,
        "clicks": 177,
        "cpc": 2.831,
        "avg_cpm": 156.64,
        "avg_position": 0,
        "drr_orders": 1.187,
        "drr_purchase": 0.179,
        "cp_cart": 33.406,
        "expected_cps": 6.864,
        "orders_amount": 42225,
        "expected_purchase_amount": 279275.54,
        "ad_spend": 501.09
    },
    "company_id": 22950510,
    "company_name": "Компания без названия 22950510",
    "company_status": "На паузе",
    "company_type": "Единая ставка",
    "company_start_date": "2025-10-23"
  },
  {
    "advert_funnel": {
        "cart": 25,
        "orders": 3,
        "order_item_count": 3,
        "expected_purchase": 102,
        "view_click": 4.324,
        "click_cart": 16.447,
        "cart_order": 12,
        "view_order": 0.085,
        "expected_order_purchase": 2.941,
        "expected_click_purchase": 149.02
    },
    "advert_statistics": {
        "views": 3515,
        "clicks": 152,
        "cpc": 6.754,
        "avg_cpm": 292.077,
        "avg_position": 0,
        "drr_orders": 9.354,
        "drr_purchase": 0.267,
        "cp_cart": 41.066,
        "expected_cps": 10.065,
        "orders_amount": 10975,
        "expected_purchase_amount": 384801.92,
        "ad_spend": 1026.65
    },
    "company_id": 25238285,
    "company_name": "Компания без названия 25238285",
    "company_status": "На паузе",
    "company_type": "Единая ставка",
    "company_start_date": "2025-11-19"
  },
  {
    "advert_funnel": {
        "cart": 55,
        "orders": 17,
        "order_item_count": 17,
        "expected_purchase": 102,
        "view_click": 4.942,
        "click_cart": 10.476,
        "cart_order": 30.909,
        "view_order": 0.16,
        "expected_order_purchase": 16.667,
        "expected_click_purchase": 514.706
    },
    "advert_statistics": {
        "views": 10623,
        "clicks": 525,
        "cpc": 3.876,
        "avg_cpm": 191.57,
        "avg_position": 0,
        "drr_orders": 3.004,
        "drr_purchase": 0.529,
        "cp_cart": 37.001,
        "expected_cps": 19.951,
        "orders_amount": 67748,
        "expected_purchase_amount": 384801.92,
        "ad_spend": 2035.05
    },
    "company_id": 25238289,
    "company_name": "Компания без названия 25238289",
    "company_status": "На паузе",
    "company_type": "Единая ставка",
    "company_start_date": "2025-11-06"
  },
  {
    "advert_funnel": {
        "cart": 0,
        "orders": 0,
        "order_item_count": 0,
        "expected_purchase": 9,
        "view_click": 13.725,
        "click_cart": 0,
        "cart_order": 0,
        "view_order": 0,
        "expected_order_purchase": 0,
        "expected_click_purchase": 77.778
    },
    "advert_statistics": {
        "views": 51,
        "clicks": 7,
        "cpc": 1.063,
        "avg_cpm": 145.882,
        "avg_position": 0,
        "drr_orders": 0,
        "drr_purchase": 0.045,
        "cp_cart": 0,
        "expected_cps": 0.827,
        "orders_amount": 0,
        "expected_purchase_amount": 16576.55,
        "ad_spend": 7.44
    },
    "company_id": 25711676,
    "company_name": "Компания без названия 25711676",
    "company_status": "На паузе",
    "company_type": "Единая ставка",
    "company_start_date": "2025-09-29"
  }
];

