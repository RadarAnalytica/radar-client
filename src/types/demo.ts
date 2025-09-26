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

// Stock Analysis типы
export interface StockAnalysisDemoData {
  products: StockProductData[];
  summary: {
    totalProducts: number;
    totalRevenue: number;
    averageGrowth: number;
    topPerformer: string;
  };
  filters: {
    categories: string[];
    brands: string[];
    priceRanges: string[];
  };
}

export interface StockProductData {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  revenue: number;
  growth: number;
  profit: number;
  stock: number;
  sales: number;
  rating: number;
  reviews: number;
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

// Типы для API ответов в демо-режиме
export interface DemoApiResponse<T = any> {
  success: boolean;
  data: T;
  isDemo: true;
  message?: string;
  limitations?: string[];
}
