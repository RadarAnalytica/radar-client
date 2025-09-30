import type { 
  DemoData, 
  AbcAnalysisDemoData, 
  StockProductData,
  ReportsDemoData,
  OrdersMapDemoData,
  SupplierAnalysisDemoData,
  WeeklyReportDemoData,
  WeeklyReportYear,
  WeeklyReportWeek,
  DemoApiResponse,
  DemoConfig
} from '../types/demo';

import stockAnalysis from '../mock/stock-analysis.json';
import dashboardData from '../mock/dashboard.json';
import weeklyReportData from '../mock/weekly-report.json';

import { store } from '@/redux/store';

export class DemoDataService {
  private static instance: DemoDataService;
  private demoData: DemoData | null = null;
  private config: DemoConfig = {
    showBanner: true,
    showWatermark: true,
    limitData: true,
    maxItems: 10,
    timeRange: {
      start: '2024-01-01',
      end: '2024-12-31'
    }
  };

  private constructor() {}

  public static getInstance(): DemoDataService {
    if (!DemoDataService.instance) {
      DemoDataService.instance = new DemoDataService();
    }
    return DemoDataService.instance;
  }

  // Получить все демо-данные
  public getAllDemoData(): DemoData {
    if (!this.demoData) {
      this.demoData = {
        dashboard: this.getDashboardData(),
        abcAnalysis: this.getAbcAnalysisData(),
        stockAnalysis: this.getStockAnalysisData(),
        reports: this.getReportsData(),
        ordersMap: this.getOrdersMapData(),
        supplierAnalysis: this.getSupplierAnalysisData(),
        weeklyReport: this.getWeeklyReportData()
      };
    }
    return this.demoData;
  }

  // Получить данные для конкретного эндпоинта
  public getDataForEndpoint(endpoint: string, params?: any, data?: DemoData): any {
    // Маппинг эндпоинтов на данные
    const endpointMap: Record<string, () => any> = {
      '/api/dashboard': () => this.getDashboardData(),
      '/api/abc-analysis': () => this.getAbcAnalysisData(),
      '/api/prod_analytic': () => this.getStockAnalysisData(),
      '/api/periodic_reports/weekly_report': () => this.getWeeklyReportData(),
      '/api/common/filters_new': () => this.getDemoFilters(),
      '/api/shop/all': () => this.getDemoShops(),
      '/api/reports/pl': () => this.getPlReportData(),
      '/api/reports/monthly': () => this.getMonthlyReportData(),
      '/api/reports/goods': () => this.getGoodsReportData(),
      '/api/reports/penalties': () => this.getPenaltiesReportData(),
      '/api/orders-map': () => this.getOrdersMapData(),
      '/api/supplier-analysis': () => this.getSupplierAnalysisData(),
    };

    const dataGetter = endpointMap[endpoint];
    if (dataGetter) {
      const result = this.createApiResponse(dataGetter());
      return result;
    }

    console.log('DemoDataService: No handler found for endpoint:', endpoint);
    return null;
  }

  // Создать API ответ в формате демо-режима
  private createApiResponse<T>(data: T): DemoApiResponse<T> {
    return {
      success: true,
      data,
      isDemo: true,
      message: 'Демо-режим: показаны примерные данные',
      limitations: [
        'Данные являются демонстрационными',
        'Для получения реальных данных требуется активная подписка',
        'Некоторые функции могут быть ограничены'
      ]
    };
  }

  // Dashboard данные
  private getDashboardData(): any {
    let data = { ...dashboardData };

    const filters = store.getState().filters;
    let days = filters.selectedRange?.period;
    if (filters.selectedRange?.from && filters.selectedRange?.to) {
      days = Math.round((Number(new Date(filters.selectedRange.to)) - Number(new Date(filters.selectedRange.from))) / 3600 / 24 / 1000);
    }

    data.orderCountList = data.orderCountList.slice(0, days);
    data.orderAmountList = data.orderAmountList.slice(0, days);
    data.saleCountList = data.saleCountList.slice(0, days);
    data.saleAmountList = data.saleAmountList.slice(0, days);
    data.marginalityRoiChart = data.marginalityRoiChart.slice(0, days);
    data.salesAndProfit = data.salesAndProfit.slice(0, days);

    const denominator = 90 / days;
    data.orderAmount = data.orderAmount / denominator;
    data.saleAmount = data.saleAmount / denominator;
    data.orderCount = data.orderCount / denominator;
    data.saleCount = Math.round(data.saleCount / denominator);
    data.returnAmount = data.returnAmount / denominator;
    data.returnCount = Math.round(data.returnCount / denominator);
    data.averageBill = data.averageBill / denominator;
    data.penalty = data.penalty / denominator;
    data.additional = data.additional / denominator;
    data.commissionWB = data.commissionWB / denominator;
    data.logistics = data.logistics / denominator;
    data.taxInfo.wbRealization = data.taxInfo.wbRealization / denominator;
    data.taxInfo.taxBase = data.taxInfo.taxBase / denominator;
    data.taxInfo.taxAmount = data.taxInfo.taxAmount / denominator;
    data.buyoutPercent = data.buyoutPercent / denominator;
    data.costPriceAmount = data.costPriceAmount / denominator;
    data.costPriceCount = data.costPriceCount / denominator;
    data.proceeds = data.proceeds / denominator;
    data.marginalProfit = data.marginalProfit / denominator;
    data.grossProfit = data.grossProfit / denominator;
    data.operatingProfit = data.operatingProfit / denominator;
    data.ABCAnalysis.amountA = data.ABCAnalysis.amountA / denominator;
    data.ABCAnalysis.countA = data.ABCAnalysis.countA / denominator;
    data.ABCAnalysis.amountB = data.ABCAnalysis.amountB / denominator;
    data.ABCAnalysis.countB = data.ABCAnalysis.countB / denominator;
    data.ABCAnalysis.amountC = data.ABCAnalysis.amountC / denominator;
    data.ABCAnalysis.countC = data.ABCAnalysis.countC / denominator;
    data.storageData = data.storageData / denominator;

    return data;
  }

  // ABC Analysis данные
  private getAbcAnalysisData(): AbcAnalysisDemoData {
    return {
      categories: {
        A: {
          name: 'Категория A',
          revenue: 750000,
          percentage: 60,
          productCount: 15,
          color: '#28a745'
        },
        B: {
          name: 'Категория B',
          revenue: 375000,
          percentage: 30,
          productCount: 25,
          color: '#ffc107'
        },
        C: {
          name: 'Категория C',
          revenue: 125000,
          percentage: 10,
          productCount: 40,
          color: '#dc3545'
        }
      },
      products: this.generateAbcProducts(),
      summary: {
        totalRevenue: 1250000,
        totalProducts: 80,
        categoryDistribution: {
          A: 60,
          B: 30,
          C: 10
        }
      }
    };
  }

  // Stock Analysis данные
  private getStockAnalysisData(): StockProductData[] {
    const products = stockAnalysis as StockProductData[];
    const filters = store.getState().filters;

    return this.applyFilters(products, filters);
  }

  // Применение фильтров к данным
  private applyFilters(products: StockProductData[], filters: any): StockProductData[] {
    let filteredProducts = [...products];

    // Фильтрация по периоду
    if (filters.selectedRange) {
      let days = filters.selectedRange.period;
      if (filters.selectedRange.from && filters.selectedRange.to) {
        days = Math.round((Number(new Date(filters.selectedRange.to)) - Number(new Date(filters.selectedRange.from))) / 3600 / 24 / 1000);
      }
      filteredProducts = filteredProducts.slice(0, Math.round(days / 2));
    }
    
    // Фильтрация по брендам
    if (filters.activeBrandName && Array.isArray(filters.activeBrandName) && !filters.activeBrandName.some((item: any) => item.value === 'Все')) {
      const selectedBrands = filters.activeBrandName.map((item: any) => item.name || item.value);
      filteredProducts = filteredProducts.filter(product => 
        selectedBrands.includes(product.brandName)
      );
    }
    
    // Фильтрация по артикулам (SKU)
    if (filters.activeArticle && Array.isArray(filters.activeArticle) && !filters.activeArticle.some((item: any) => item.value === 'Все')) {
      const selectedArticles = filters.activeArticle.map((item: any) => item.value);
      filteredProducts = filteredProducts.filter(product => 
        selectedArticles.includes(product.sku)
      );
    }
    
    // Фильтрация по группам товаров
    if (filters.activeGroup && Array.isArray(filters.activeGroup) && !filters.activeGroup.some((item: any) => item.value === 'Все')) {
      const selectedGroups = filters.activeGroup.map((item: any) => item.name || item.value);
      filteredProducts = filteredProducts.filter(product => 
        selectedGroups.some(group => product.category.includes(group))
      );
    }
    
    // Фильтрация по категориям
    if (filters.activeCategory && Array.isArray(filters.activeCategory) && !filters.activeCategory.some((item: any) => item.value === 'Все')) {
      const selectedCategories = filters.activeCategory.map((item: any) => item.name || item.value);
      filteredProducts = filteredProducts.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    return filteredProducts;
  }

  // Reports данные
  private getReportsData(): ReportsDemoData {
    return {
      plReport: this.getPlReportData(),
      monthlyReport: this.getMonthlyReportData(),
      goodsReport: this.getGoodsReportData(),
      penaltiesReport: this.getPenaltiesReportData()
    };
  }

  // P&L Report данные
  private getPlReportData() {
    return {
      revenue: 1250000,
      costs: 800000,
      profit: 450000,
      margin: 36,
      expenses: this.generateExpenses(),
      summary: {
        totalRevenue: 1250000,
        totalCosts: 800000,
        netProfit: 450000,
        profitMargin: 36
      }
    };
  }

  // Monthly Report данные
  private getMonthlyReportData() {
    return {
      months: this.generateMonthlyData(),
      summary: {
        totalRevenue: 15000000,
        averageGrowth: 8.5,
        bestMonth: 'Декабрь',
        worstMonth: 'Январь'
      }
    };
  }

  // Goods Report данные
  private getGoodsReportData() {
    return {
      products: this.generateGoodsProducts(),
      summary: {
        totalProducts: 200,
        totalRevenue: 5000000,
        averagePrice: 2500
      }
    };
  }

  // Penalties Report данные
  private getPenaltiesReportData() {
    return {
      penalties: this.generatePenalties(),
      summary: {
        totalPenalties: 25,
        totalAmount: 150000,
        averagePenalty: 6000
      }
    };
  }

  // Orders Map данные
  private getOrdersMapData(): OrdersMapDemoData {
    return {
      regions: this.generateRegions(),
      summary: {
        totalOrders: 5000,
        totalRevenue: 5000000,
        averageOrderValue: 1000
      },
      mapData: this.generateMapPoints()
    };
  }

  // Supplier Analysis данные
  private getSupplierAnalysisData(): SupplierAnalysisDemoData {
    return {
      suppliers: this.generateSuppliers(),
      summary: {
        totalSuppliers: 50,
        totalOrders: 1000,
        averageRating: 4.2
      }
    };
  }

  // Генераторы данных
  private generateChartData(type: string) {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    return months.map((month, index) => ({
      date: month,
      value: Math.floor(Math.random() * 100000) + 50000,
      label: `${month} ${type}`
    }));
  }

  private generateTopProducts() {
    return Array.from({ length: 5 }, (_, i) => ({
      id: `product-${i + 1}`,
      name: `Товар ${i + 1}`,
      sku: `SKU-${i + 1}`,
      revenue: Math.floor(Math.random() * 100000) + 50000,
      growth: Math.floor(Math.random() * 50) + 10,
      profit: Math.floor(Math.random() * 50000) + 10000,
      category: ['Электроника', 'Одежда', 'Дом'][i % 3]
    }));
  }

  private generateRecentOrders() {
    return Array.from({ length: 5 }, (_, i) => ({
      id: `order-${i + 1}`,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      customer: `Клиент ${i + 1}`,
      amount: Math.floor(Math.random() * 10000) + 1000,
      status: ['Выполнен', 'В обработке', 'Отправлен'][i % 3],
      products: [`Товар ${i + 1}`, `Товар ${i + 2}`]
    }));
  }

  private generateAbcProducts() {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `abc-product-${i + 1}`,
      name: `Товар ABC ${i + 1}`,
      sku: `ABC-${i + 1}`,
      revenue: Math.floor(Math.random() * 100000) + 10000,
      percentage: Math.floor(Math.random() * 20) + 1,
      category: ['A', 'B', 'C'][i % 3] as 'A' | 'B' | 'C',
      growth: Math.floor(Math.random() * 100) - 20,
      profit: Math.floor(Math.random() * 50000) + 5000
    }));
  }

  private generateExpenses() {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `expense-${i + 1}`,
      name: `Расход ${i + 1}`,
      amount: Math.floor(Math.random() * 50000) + 1000,
      category: ['Маркетинг', 'Логистика', 'Административные'][i % 3],
      date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
  }

  private generateMonthlyData() {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return months.map((month, index) => ({
      month,
      revenue: Math.floor(Math.random() * 200000) + 100000,
      profit: Math.floor(Math.random() * 100000) + 50000,
      growth: Math.floor(Math.random() * 30) - 10
    }));
  }

  private generateGoodsProducts() {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `goods-product-${i + 1}`,
      name: `Товар для отчета ${i + 1}`,
      sku: `GOODS-${i + 1}`,
      revenue: Math.floor(Math.random() * 100000) + 10000,
      sales: Math.floor(Math.random() * 1000) + 100,
      price: Math.floor(Math.random() * 5000) + 500
    }));
  }

  private generatePenalties() {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `penalty-${i + 1}`,
      reason: `Причина штрафа ${i + 1}`,
      amount: Math.floor(Math.random() * 50000) + 1000,
      date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: ['Активный', 'Оспорен', 'Оплачен'][i % 3]
    }));
  }

  private generateRegions() {
    return [
      { name: 'Москва', orders: 2000, revenue: 2000000, growth: 15 },
      { name: 'СПб', orders: 1500, revenue: 1500000, growth: 12 },
      { name: 'Екатеринбург', orders: 800, revenue: 800000, growth: 8 },
      { name: 'Новосибирск', orders: 600, revenue: 600000, growth: 10 },
      { name: 'Казань', orders: 400, revenue: 400000, growth: 5 }
    ];
  }

  private generateMapPoints() {
    return [
      { lat: 55.7558, lng: 37.6176, orders: 2000, revenue: 2000000, city: 'Москва' },
      { lat: 59.9311, lng: 30.3609, orders: 1500, revenue: 1500000, city: 'СПб' },
      { lat: 56.8431, lng: 60.6454, orders: 800, revenue: 800000, city: 'Екатеринбург' },
      { lat: 55.0084, lng: 82.9357, orders: 600, revenue: 600000, city: 'Новосибирск' },
      { lat: 55.8304, lng: 49.0661, orders: 400, revenue: 400000, city: 'Казань' }
    ];
  }

  private generateSuppliers() {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `supplier-${i + 1}`,
      name: `Поставщик ${i + 1}`,
      rating: Math.floor(Math.random() * 2) + 3,
      orders: Math.floor(Math.random() * 100) + 10,
      revenue: Math.floor(Math.random() * 500000) + 50000,
      products: Math.floor(Math.random() * 50) + 5,
      location: ['Москва', 'СПб', 'Екатеринбург', 'Новосибирск'][i % 4]
    }));
  }

  // Конфигурация
  public updateConfig(newConfig: Partial<DemoConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): DemoConfig {
    return this.config;
  }

  // Очистка данных
  public clearDemoData(): void {
    this.demoData = null;
  }

  // Демо-фильтры на основе данных из stock-analysis.json
  private getDemoFilters() {
    const products = stockAnalysis as StockProductData[];
    
    // Извлекаем уникальные категории и бренды
    const categories = [...new Set(products.map(product => product.category))];
    const brands = [...new Set(products.map(product => product.brandName))];
    
    // Создаем демо-магазин
    const demoShop = {
      id: 1,
      brand_name: 'Демо магазин',
      name: 'Демо магазин',
      is_active: true,
      is_valid: true,
      is_primary_collect: true,
      is_self_cost_set: true,
      value: 'Демо магазин'
    };

    // Создаем структуру фильтров аналогично реальным данным
    const shops = [demoShop];
    
    const brandsData = brands.map((brand, index) => ({
      name: brand,
      value: brand,
      category: categories[index % categories.length]
    }));

    const categoriesData = categories.map((category, index) => ({
      id: index + 1,
      name: category,
      brand: brandsData.filter(brand => brand.category === category)
    }));

    // Создаем артикулы на основе SKU из данных
    const articlesData = products.map(product => ({
      name: product.sku,
      value: product.sku,
      brand: product.brandName,
      category: product.category
    }));

    // Создаем группы товаров
    const groupsData = [
      { id: 1, name: 'Ювелирные изделия', value: 'Ювелирные изделия', key: 1 },
      { id: 2, name: 'Аксессуары', value: 'Аксессуары', key: 2 }
    ];

    // Создаем недели (периоды)
    const weeksListData = [
      { name: 'Последние 7 дней', value: 7, key: 7 },
      { name: 'Последние 14 дней', value: 14, key: 14 },
      { name: 'Последние 30 дней', value: 30, key: 30 },
      { name: 'Последние 90 дней', value: 90, key: 90 }
    ];

    // Создаем месяцы
    const monthsData = [
      { name: 'Январь', value: 1, key: 1 },
      { name: 'Февраль', value: 2, key: 2 },
      { name: 'Март', value: 3, key: 3 },
      { name: 'Апрель', value: 4, key: 4 },
      { name: 'Май', value: 5, key: 5 },
      { name: 'Июнь', value: 6, key: 6 }
    ];

    const filtersData = [
      {
        shop: demoShop,
        brands: {
          stateKey: 'activeBrandName',
          ruLabel: 'Бренд',
          enLabel: 'brands',
          data: brandsData
        },
        articles: {
          stateKey: 'activeArticle',
          ruLabel: 'Артикул',
          enLabel: 'articles',
          data: articlesData
        },
        groups: {
          stateKey: 'activeGroup',
          ruLabel: 'Группа товаров',
          enLabel: 'product_groups',
          data: groupsData
        },
        weeks: {
          stateKey: 'activeWeeks',
          ruLabel: 'Период',
          enLabel: 'weeks',
          data: weeksListData
        },
        months: {
          stateKey: 'activeMonths',
          ruLabel: 'Период',
          enLabel: 'months',
          data: monthsData
        },
        categories: {
          stateKey: 'activeCategory',
          ruLabel: 'Категория',
          enLabel: 'categories',
          data: categoriesData
        }
      }
    ];

    return {
      filtersData,
      shops,
      initState: {
        activeBrandName: [{ value: 'Все' }],
        activeArticle: [{ value: 'Все' }],
        activeGroup: [{ id: 0, value: 'Все' }],
        activeCategory: [{ id: 0, value: 'Все' }],
        selectedRange: { period: 30 },
        activeBrand: demoShop,
        activeWeeks: [{ name: 'Последние 30 дней', value: 30, key: 30 }],
        activeMonths: [{ name: 'Июнь', value: 6, key: 6 }]
      }
    };
  }

  // Демо-магазины
  private getDemoShops() {
    const shops = [
      {
        id: 1,
        brand_name: 'Демо магазин',
        name: 'Демо магазин',
        is_active: true,
        is_valid: true,
        is_primary_collect: true,
        is_self_cost_set: true,
        value: 'Демо магазин'
      }
    ];
    return shops;
  }

  // Weekly Report данные
  private getWeeklyReportData(): WeeklyReportDemoData {
    const weeklyData = weeklyReportData as any[];
    let dynamicWeeklyData = this.generateDynamicWeeklyData(weeklyData);
    
    const filters = store.getState().filters;
    const days = filters.activeWeeks?.slice().sort((a, b) => b.value - a.value)[0]?.value;

    if (days <= 7) {
      dynamicWeeklyData = dynamicWeeklyData.slice(0, 1);
    } else if (days <= 14) {
      dynamicWeeklyData = dynamicWeeklyData.slice(0, 2);
    } else if (days <= 30) {
      dynamicWeeklyData = dynamicWeeklyData.slice(0, 4);
    }

    return { 
      data: [{weeks: dynamicWeeklyData, year: 2025}], 
      messsage: 'Success',
    };
  }

  // Генерация динамических week_label для последних 10 недель
  private generateDynamicWeeklyData(originalData: any[]): any[] {
    const currentDate = new Date();
    const dynamicData = [];
    
    // Генерируем данные для последних 10 недель
    for (let i = 0; i < 10; i++) {
      const weekStartDate = new Date(currentDate);
      weekStartDate.setDate(currentDate.getDate() - (i * 7) - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1));
      
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);
      
      // Получаем номер недели года
      const weekNumber = this.getWeekNumber(weekStartDate);
      const startDateStr = this.formatDate(weekStartDate);
      const endDateStr = this.formatDate(weekEndDate);
      const weekLabel = `${weekNumber} неделя (${startDateStr} - ${endDateStr})`;
      
      // Берем данные из оригинального массива или генерируем новые
      const originalWeekData = originalData[i] || originalData[0];
      
      dynamicData.push({
        ...originalWeekData,
        week: weekNumber,
        week_label: weekLabel
      });
    }
    
    return dynamicData;
  }

  // Получение номера недели в году
  private getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  }

  // Форматирование даты в формат DD.MM.YYYY
  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  // Применение фильтров к weekly report данным
  private applyWeeklyFilters(weeklyData: WeeklyReportWeek[], filters: any): WeeklyReportDemoData {
    let filteredData = [...weeklyData];
    
    console.log('applyWeeklyFilters: Starting with', filteredData.length, 'weeks');
    
    // Фильтрация по выбранным неделям
    if (filters.activeWeeks && Array.isArray(filters.activeWeeks) && !filters.activeWeeks.some((item: any) => item.value === 'Все')) {
      const selectedWeeks = filters.activeWeeks.map((item: any) => item.value);
      console.log('Filtering by weeks:', selectedWeeks);
      
      filteredData = filteredData.filter(week => selectedWeeks.includes(week.week));
    }
    
    console.log('applyWeeklyFilters: Filtered to', filteredData.length, 'weeks');
    return { 
      data: [{weeks: filteredData, year: 2025}], 
      messsage: 'Success' 
    };
  }
}
