// Типы для демо-режима

export interface DemoModeContextType {
  isDemoMode: boolean;
  demoData: DemoData | null;
  showDemoBanner: boolean;
  getDemoDataForEndpoint: (endpoint: string, params?: any) => any;
  switchToDemo: () => void;
  switchToReal: () => void;
  hideDemoBanner: () => void;
}

export interface DemoData {
  dashboard: DashboardDemoData;
  abcAnalysis: AbcAnalysisDemoData;
  stockAnalysis: StockAnalysisDemoData;
  reports: ReportsDemoData;
  ordersMap: OrdersMapDemoData;
  supplierAnalysis: SupplierAnalysisDemoData;
  weeklyReport: WeeklyReportDemoData;
}

// Dashboard типы
export interface DashboardDemoData {
  metrics: {
    revenue: number;
    orders: number;
    profit: number;
    growth: number;
    conversion: number;
    averageOrder: number;
  };
  charts: {
    revenueChart: ChartData[];
    ordersChart: ChartData[];
    profitChart: ChartData[];
  };
  topProducts: ProductDemoData[];
  recentOrders: OrderDemoData[];
}

// ABC Analysis типы
export interface AbcAnalysisDemoData {
  categories: {
    A: AbcCategoryData;
    B: AbcCategoryData;
    C: AbcCategoryData;
  };
  products: AbcProductData[];
  summary: {
    totalRevenue: number;
    totalProducts: number;
    categoryDistribution: {
      A: number;
      B: number;
      C: number;
    };
  };
}

export interface AbcCategoryData {
  name: string;
  revenue: number;
  percentage: number;
  productCount: number;
  color: string;
}

export interface AbcProductData {
  id: string;
  name: string;
  sku: string;
  revenue: number;
  percentage: number;
  category: 'A' | 'B' | 'C';
  growth: number;
  profit: number;
}

export interface StockProductData {
  productName: string;
  brandName: string;
  vendorСode: string;
  barCode: string;
  saleSum: number;
  quantity: number;
  lessReturns: number;
  costGoodsSold: number;
  sold_cost: number;
  returnsSum: number;
  returnsQuantity: number;
  returnsCostSold: number;
  return_cost: number;
  costPriceOne: number;
  product_cost: number;
  costOfProductStockToday: number;
  product_cost_stock: number;
  toClient: number;
  to_client_sum: number;
  fromClient: number;
  from_client_sum: number;
  commissionWB: number;
  fines: number;
  additionalPayment: number;
  serviceExpenses: number;
  toPayoff: number;
  marginalProfit: number;
  averageProfit: number;
  profitabilityOfProductsSold: number;
  marginal: number;
  annualReturnOnInventory: number;
  lostRevenue: number;
  basic: number;
  maxDiscount: number;
  minDiscountPrice: number;
  orderQuantity: number;
  orderSum: number;
  purchased: number;
  notPurchased: number;
  purchasedPercent: number;
  completed: number;
  orderCountDay: number;
  saleCountDay: number;
  dataRadar: number;
  dataWB: number;
  photo: string;
  nmID: number;
  sku: string;
  size: string;
  category: string;
  costPrice: number;
  cost_price: number;
  basePrice: number;
  discount: number;
  minPrice: number;
  is_self_cost: boolean;
  byRevenue: string;
  byProfit: string;
}

// Reports типы
export interface ReportsDemoData {
  plReport: PlReportDemoData;
  monthlyReport: MonthlyReportDemoData;
  goodsReport: GoodsReportDemoData;
  penaltiesReport: PenaltiesReportDemoData;
}

export interface PlReportDemoData {
  revenue: number;
  costs: number;
  profit: number;
  margin: number;
  expenses: ExpenseDemoData[];
  summary: {
    totalRevenue: number;
    totalCosts: number;
    netProfit: number;
    profitMargin: number;
  };
}

export interface MonthlyReportDemoData {
  months: MonthData[];
  summary: {
    totalRevenue: number;
    averageGrowth: number;
    bestMonth: string;
    worstMonth: string;
  };
}

export interface GoodsReportDemoData {
  products: GoodsProductData[];
  summary: {
    totalProducts: number;
    totalRevenue: number;
    averagePrice: number;
  };
}

export interface PenaltiesReportDemoData {
  penalties: PenaltyDemoData[];
  summary: {
    totalPenalties: number;
    totalAmount: number;
    averagePenalty: number;
  };
}

// Orders Map типы
export interface OrdersMapDemoData {
  regions: RegionData[];
  summary: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  };
  mapData: MapPointData[];
}

// Supplier Analysis типы
export interface SupplierAnalysisDemoData {
  suppliers: SupplierData[];
  summary: {
    totalSuppliers: number;
    totalOrders: number;
    averageRating: number;
  };
}

// Общие типы
export interface ChartData {
  date: string;
  value: number;
  label?: string;
}

export interface ProductDemoData {
  id: string;
  name: string;
  sku: string;
  revenue: number;
  growth: number;
  profit: number;
  category: string;
}

export interface OrderDemoData {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: string;
  products: string[];
}

export interface ExpenseDemoData {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export interface MonthData {
  month: string;
  revenue: number;
  profit: number;
  growth: number;
}

export interface GoodsProductData {
  id: string;
  name: string;
  sku: string;
  revenue: number;
  sales: number;
  price: number;
}

export interface PenaltyDemoData {
  id: string;
  reason: string;
  amount: number;
  date: string;
  status: string;
}

export interface RegionData {
  name: string;
  orders: number;
  revenue: number;
  growth: number;
}

export interface MapPointData {
  lat: number;
  lng: number;
  orders: number;
  revenue: number;
  city: string;
}

export interface SupplierData {
  id: string;
  name: string;
  rating: number;
  orders: number;
  revenue: number;
  products: number;
  location: string;
}

// Конфигурация демо-режима
export interface DemoConfig {
  showBanner: boolean;
  showWatermark: boolean;
  limitData: boolean;
  maxItems: number;
  timeRange: {
    start: string;
    end: string;
  };
}

// Weekly Report типы
export interface WeeklyReportDemoData {
  data: {
    weeks: WeeklyReportWeek[];
    year: number;
  }[];
  messsage: string;
}

export interface WeeklyReportYear {
  year: number;
  weeks: WeeklyReportWeek[];
}

export interface WeeklyReportWeek {
  week: number;
  week_label: string;
  data: {
    revenue: {
      rub: number;
      quantity: number;
    };
    purchases: {
      rub: number;
      quantity: number;
    };
    return: {
      rub: number;
      quantity: number;
    };
    avg_check: number;
    purchase_percent: number;
    avg_spp: number;
    avg_spp_rub: number;
    avg_spp_percent: number;
    avg_spp_rub_percent: number;
    avg_spp_rub_percent_2: number;
    avg_spp_rub_percent_3: number;
    avg_spp_rub_percent_4: number;
    avg_spp_rub_percent_5: number;
    avg_spp_rub_percent_6: number;
    avg_spp_rub_percent_7: number;
    avg_spp_rub_percent_8: number;
    avg_spp_rub_percent_9: number;
    avg_spp_rub_percent_10: number;
    avg_spp_rub_percent_11: number;
    avg_spp_rub_percent_12: number;
    avg_spp_rub_percent_13: number;
    avg_spp_rub_percent_14: number;
    avg_spp_rub_percent_15: number;
    avg_spp_rub_percent_16: number;
    avg_spp_rub_percent_17: number;
    avg_spp_rub_percent_18: number;
    avg_spp_rub_percent_19: number;
    avg_spp_rub_percent_20: number;
    avg_spp_rub_percent_21: number;
    avg_spp_rub_percent_22: number;
    avg_spp_rub_percent_23: number;
    avg_spp_rub_percent_24: number;
    avg_spp_rub_percent_25: number;
    avg_spp_rub_percent_26: number;
    avg_spp_rub_percent_27: number;
    avg_spp_rub_percent_28: number;
    avg_spp_rub_percent_29: number;
    avg_spp_rub_percent_30: number;
    avg_spp_rub_percent_31: number;
    avg_spp_rub_percent_32: number;
    avg_spp_rub_percent_33: number;
    avg_spp_rub_percent_34: number;
    avg_spp_rub_percent_35: number;
    avg_spp_rub_percent_36: number;
    avg_spp_rub_percent_37: number;
    avg_spp_rub_percent_38: number;
    avg_spp_rub_percent_39: number;
    avg_spp_rub_percent_40: number;
    avg_spp_rub_percent_41: number;
    avg_spp_rub_percent_42: number;
    avg_spp_rub_percent_43: number;
    avg_spp_rub_percent_44: number;
    avg_spp_rub_percent_45: number;
    avg_spp_rub_percent_46: number;
    avg_spp_rub_percent_47: number;
    avg_spp_rub_percent_48: number;
    avg_spp_rub_percent_49: number;
    avg_spp_rub_percent_50: number;
    avg_spp_rub_percent_51: number;
    avg_spp_rub_percent_52: number;
    avg_spp_rub_percent_53: number;
    avg_spp_rub_percent_54: number;
    avg_spp_rub_percent_55: number;
    avg_spp_rub_percent_56: number;
    avg_spp_rub_percent_57: number;
    avg_spp_rub_percent_58: number;
    avg_spp_rub_percent_59: number;
    avg_spp_rub_percent_60: number;
    avg_spp_rub_percent_61: number;
    avg_spp_rub_percent_62: number;
    avg_spp_rub_percent_63: number;
    avg_spp_rub_percent_64: number;
    avg_spp_rub_percent_65: number;
    avg_spp_rub_percent_66: number;
    avg_spp_rub_percent_67: number;
    avg_spp_rub_percent_68: number;
    avg_spp_rub_percent_69: number;
    avg_spp_rub_percent_70: number;
    avg_spp_rub_percent_71: number;
    avg_spp_rub_percent_72: number;
    avg_spp_rub_percent_73: number;
    avg_spp_rub_percent_74: number;
    avg_spp_rub_percent_75: number;
    avg_spp_rub_percent_76: number;
    avg_spp_rub_percent_77: number;
    avg_spp_rub_percent_78: number;
    avg_spp_rub_percent_79: number;
    avg_spp_rub_percent_80: number;
    avg_spp_rub_percent_81: number;
    avg_spp_rub_percent_82: number;
    avg_spp_rub_percent_83: number;
    avg_spp_rub_percent_84: number;
    avg_spp_rub_percent_85: number;
    avg_spp_rub_percent_86: number;
    avg_spp_rub_percent_87: number;
    avg_spp_rub_percent_88: number;
    avg_spp_rub_percent_89: number;
    avg_spp_rub_percent_90: number;
    avg_spp_rub_percent_91: number;
    avg_spp_rub_percent_92: number;
    avg_spp_rub_percent_93: number;
    avg_spp_rub_percent_94: number;
    avg_spp_rub_percent_95: number;
    avg_spp_rub_percent_96: number;
    avg_spp_rub_percent_97: number;
    avg_spp_rub_percent_98: number;
    avg_spp_rub_percent_99: number;
    avg_spp_rub_percent_100: number;
  };
}

// Типы для API ответов в демо-режиме
export interface DemoApiResponse<T = any> {
  success: boolean;
  data: T;
  isDemo: true;
  message?: string;
  limitations?: string[];
}
