import type { 
  DemoData, 
  AbcAnalysisDemoData, 
  StockProductData,
  ReportsDemoData,
  OrdersMapDemoData,
  SupplierAnalysisDemoData,
  WeeklyReportDemoData,
  WeeklyReportWeek,
  DemoApiResponse,
  DemoConfig,
  PlReportDemoData
} from '../types/demo';

import stockAnalysis from '../mock/stock-analysis.json';
import dashboardData from '../mock/dashboard.json';
import weeklyReportData from '../mock/weekly-report.json';
import rnpByArticleData from '../mock/rnp-article.json';
import rnpSummaryData from '../mock/rnp-summary.json';
import rnpProductsData from '../mock/rnp-products.json';
import geoData from '../mock/geo.json';
import abcDataProceeds from '../mock/abc-data-proceeds.json';
import abcDataProfit from '../mock/abc-data-profit.json';
import selfCostsData from '../mock/selfcost.json';
import productGroupsData from '../mock/product-groups.json';

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
    endpoint = endpoint.split('?')[0];

    if (!endpoint) {
      console.error('DemoDataService: No endpoint provided');
      return null;
    }

    // Пробуем точное совпадение
    const exactMatch = this.getExactMatch(endpoint);
    if (exactMatch) {
      return exactMatch;
    }

    // Пробуем совпадение по паттерну для URL с динамическими параметрами
    const patternMatch = this.getPatternMatch(endpoint);
    if (patternMatch) {
      return patternMatch;
    }

    console.error('DemoDataService: No handler found for endpoint:', endpoint);
    return null;
  }

  // Точное совпадение эндпоинтов
  private getExactMatch(endpoint: string): any {
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
      '/api/rnp/by_article': () => this.getRnpByArticleData(),
      '/api/rnp/summary': () => this.getRnpSummaryData(),
      '/api/rnp/products': () => this.getRnpProductsData(),
      '/api/profit_loss/report': () => this.getPlReportData(),
      '/api/geo/': () => this.getGeoData(),
      '/api/abc_data/proceeds': () => this.getAbcDataProceeds(),
      '/api/abc_data/profit': () => this.getAbcDataProfit(),
      '/api/product/self-costs/list': () => this.getSelfCostsData(),
      '/api/product/product_groups': () => this.getProductGroupsData(),
      '/api/product/self-costs': () => ({ message: "Success" }),
    };

    const dataGetter = endpointMap[endpoint];
    if (dataGetter) {
      return this.createApiResponse(dataGetter());
    }

    return null;
  }

  // Совпадение по паттерну для URL с параметрами
  private getPatternMatch(endpoint: string): any {
    // Паттерн для /api/product/product_groups/{id}
    const productGroupsIdMatch = endpoint.match(/^\/api\/product\/product_groups\/(\d+)$/);
    if (productGroupsIdMatch) {
      const productGroupId = productGroupsIdMatch[1];
      return this.createApiResponse({
        data: this.getProductGroupById(productGroupId)
      });
    }

    // Можно добавить другие паттерны здесь
    // Например:
    // const productIdMatch = endpoint.match(/^\/api\/product\/(\d+)$/);
    // if (productIdMatch) {
    //   const productId = productIdMatch[1];
    //   return this.createApiResponse(this.getProductById(productId));
    // }

    return null;
  }

  private getProductGroupById(id: string): any {
    return {
      id: parseInt(id),
      name: `Группа товаров ${id}`,
      description: `Описание группы товаров ${id}`,
      products: [
        {
          "id": 49216,
          "photo": "https://basket-13.wbbasket.ru/vol1984/part198498/198498591/images/c246x328/1.webp",
          "article": "М-БР-01-Ч",
          "brand": "Демо-бренд",
          "shop": "Демо-магазин",
          "tech_size": "48 (176-182)"
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
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

  private getFilterDays(): number {
    const filters = store.getState().filters;
    let days = filters.selectedRange?.period;
    if (filters.selectedRange?.from && filters.selectedRange?.to) {
      days = Math.round((Number(new Date(filters.selectedRange.to)) - Number(new Date(filters.selectedRange.from))) / 3600 / 24 / 1000);
    }
    return days;
  }

  private getGeoData(): any {
    const data = geoData;
    const days = this.getFilterDays();
    const denominator = 90 / days;

    data.geo_data.map(item => {
      item.percent = item.percent / denominator;
      item.comparePercent = item.comparePercent / denominator;
      item.percentOrder = item.percentOrder / denominator;
      item.comparePercentOrder = item.comparePercentOrder / denominator;
      item.orderCount = item.orderCount / denominator;
      item.orderAmount = item.orderAmount / denominator;
      item.saleCount = item.saleCount / denominator;
      item.saleAmount = item.saleAmount / denominator;
      return item;
    });

    return { data };
  }

  private getAbcDataProceeds(): any {
    return abcDataProceeds;
  }

  private getAbcDataProfit(): any {
    return abcDataProfit;
  }

  private getSelfCostsData(): any { 
    return { data: selfCostsData };
  }

  private getProductGroupsData(): any {
    return { data: productGroupsData };
  }

  // Dashboard данные
  private getDashboardData(): any {
    const data = { ...dashboardData };
    const days = this.getFilterDays();
    const denominator = 90 / days;

    data.orderCountList = data.orderCountList.slice(0, days);
    data.orderAmountList = data.orderAmountList.slice(0, days);
    data.saleCountList = data.saleCountList.slice(0, days);
    data.saleAmountList = data.saleAmountList.slice(0, days);
    data.marginalityRoiChart = data.marginalityRoiChart.slice(0, days);
    data.salesAndProfit = data.salesAndProfit.slice(0, days);
    
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

  private getRnpByArticleData(): any {
    const data = rnpByArticleData;

    const filters = store.getState().filters;
    let days = filters.selectedRange?.period || 30;
    if (filters.selectedRange?.from && filters.selectedRange?.to) {
      days = Math.floor((Number(new Date(filters.selectedRange.to)) - Number(new Date(filters.selectedRange.from))) / 3600 / 24 / 1000) + 1;
    }

    // Обновляем даты в by_date_data массиве для каждого элемента
    const updatedData = data.map((item: any) => {
      if (Array.isArray(item.by_date_data)) {
        item.by_date_data = item.by_date_data.slice(-days);
        const diffDays = filters.selectedRange?.to ? new Date().getDate() - new Date(filters.selectedRange?.to).getDate() : 0;

        const updatedByDateData = item.by_date_data.map((dateItem: any, index: number) => {
          // Генерируем дату от вчерашнего или последнего выбранного дня и назад
          const date = new Date();
          date.setDate(date.getDate() - index - diffDays);
          
          return { ...dateItem, date: date.toISOString() };
        });
        
        return { ...item, by_date_data: updatedByDateData };
      }

      return item;
    });

    return { 
      data: updatedData, 
      page: 1, 
      per_page: 25, 
      total_count: updatedData.length,
    };
  }

  private getRnpSummaryData(): any {
    return { data: rnpSummaryData };
  }

  private getRnpProductsData(): any {
    return rnpProductsData;
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
      if ('from' in filters.selectedRange && 'to' in filters.selectedRange && filters.selectedRange.from && filters.selectedRange.to) {
        days = Math.round((Number(new Date(filters.selectedRange.to as string)) - Number(new Date(filters.selectedRange.from as string))) / 3600 / 24 / 1000);
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
  private getPlReportData(): PlReportDemoData {
    const filters = store.getState().filters;
    
    // Генерируем данные на основе фильтров
    const generatedData = this.generatePlReportData(filters);
    return { data: generatedData };
  }

  // Генератор данных для P&L отчета
  private generatePlReportData(filters: any) {
    const monthFrom = filters?.activeMonths?.month_from;
    const monthTo = filters?.activeMonths?.month_to;
    const now = new Date();
    
    let startYear = Number(now.getFullYear());
    let startMonth = Number(now.getMonth()) + 1;
    let endYear = startYear;
    let endMonth = startMonth;
    
    // Парсим фильтры если они есть
    if (monthFrom) {
      const [year, month] = monthFrom.split('-').map(Number);
      startYear = year;
      startMonth = month;
    }
    
    if (monthTo) {
      const [year, month] = monthTo.split('-').map(Number);
      endYear = year;
      endMonth = month;
    }
    
    // Генерируем месяцы для периода
    const months = this.generateMonthsForPeriod(startYear, startMonth, endYear, endMonth);
    
    // Генерируем данные за год
    const yearData = this.generateYearPlData(startYear);
    
    // Генерируем данные по месяцам
    const monthsData = months.map(monthInfo => this.generateMonthPlData(monthInfo));
    
    return [{
      year: startYear,
      data: yearData,
      months: monthsData
    }];
  }

  // Генерация списка месяцев для указанного периода
  private generateMonthsForPeriod(startYear: number, startMonth: number, endYear: number, endMonth: number) {
    const months = [];
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    let currentYear = startYear;
    let currentMonth = startMonth;
    
    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
      months.push({
        year: currentYear,
        month: currentMonth,
        label: `${monthNames[currentMonth - 1]} ${currentYear}`
      });
      
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    }
    
    return months;
  }

  // Генерация данных за год
  private generateYearPlData(year: number) {
    return {
      realization: {
        rub: this.generateRandomAmount(100000000, 150000000),
        percent: this.generateRandomPercent(65, 75)
      },
      mp_discount: {
        rub: this.generateRandomAmount(30000000, 50000000),
        percent: this.generateRandomPercent(20, 30)
      },
      sales: {
        rub: this.generateRandomAmount(140000000, 200000000),
        percent: 100
      },
      direct_expenses: {
        cost: {
          rub: this.generateRandomAmount(500000, 1000000),
          percent: this.generateRandomPercent(0.3, 0.7)
        },
        logistic: {
          rub: this.generateRandomAmount(15000000, 20000000),
          percent: this.generateRandomPercent(10, 15)
        },
        commission: {
          rub: this.generateRandomAmount(30000000, 40000000),
          percent: this.generateRandomPercent(20, 25)
        },
        penalties: {
          rub: this.generateRandomAmount(50000, 100000),
          percent: this.generateRandomPercent(0.02, 0.1)
        },
        storage: {
          rub: this.generateRandomAmount(500000, 1500000),
          percent: this.generateRandomPercent(0.3, 1.0)
        },
        advert: {
          rub: this.generateRandomAmount(60000000, 80000000),
          percent: this.generateRandomPercent(40, 50)
        },
        other_retentions: {
          rub: this.generateRandomAmount(60000000, 80000000),
          percent: this.generateRandomPercent(40, 50)
        },
        paid_acceptance: {
          rub: this.generateRandomAmount(100000, 300000),
          percent: this.generateRandomPercent(0.05, 0.2)
        },
        total_expenses: {
          rub: this.generateRandomAmount(120000000, 160000000),
          percent: this.generateRandomPercent(80, 90)
        }
      },
      compensation: {
        rub: this.generateRandomAmount(50000, 150000),
        percent: this.generateRandomPercent(0.03, 0.1)
      },
      gross_margin: {
        rub: this.generateRandomAmount(130000000, 190000000),
        percent: this.generateRandomPercent(90, 98)
      },
      operating_expenses: null,
      operating_profit: {
        rub: this.generateRandomAmount(15000000, 35000000),
        percent: this.generateRandomPercent(10, 20)
      },
      ebitda: {
        rub: this.generateRandomAmount(15000000, 35000000),
        percent: this.generateRandomPercent(10, 20)
      },
      ebitda_margin: this.generateRandomPercent(10, 20),
      tax: {
        rub: this.generateRandomAmount(3000000, 6000000),
        percent: this.generateRandomPercent(2, 4)
      },
      net_profit: {
        rub: this.generateRandomAmount(50000000, 80000000),
        percent: this.generateRandomPercent(30, 50)
      }
    };
  }

  // Генерация данных за месяц
  private generateMonthPlData(monthInfo: { year: number; month: number; label: string }) {
    const baseMultiplier = this.generateRandomPercent(0.7, 1.3); // Вариация по месяцам
    
    return {
      month_label: monthInfo.label,
      data: {
        realization: {
          rub: this.generateRandomAmount(8000000, 20000000) * baseMultiplier,
          percent: this.generateRandomPercent(60, 80)
        },
        mp_discount: {
          rub: this.generateRandomAmount(2000000, 6000000) * baseMultiplier,
          percent: this.generateRandomPercent(15, 35)
        },
        sales: {
          rub: this.generateRandomAmount(12000000, 25000000) * baseMultiplier,
          percent: 100
        },
        direct_expenses: {
          cost: {
            rub: this.generateRandomAmount(50000, 150000) * baseMultiplier,
            percent: this.generateRandomPercent(0.3, 0.8)
          },
          logistic: {
            rub: this.generateRandomAmount(1000000, 2500000) * baseMultiplier,
            percent: this.generateRandomPercent(8, 15)
          },
          commission: {
            rub: this.generateRandomAmount(2500000, 5000000) * baseMultiplier,
            percent: this.generateRandomPercent(15, 30)
          },
          penalties: {
            rub: this.generateRandomAmount(1000, 20000) * baseMultiplier,
            percent: this.generateRandomPercent(0.01, 0.15)
          },
          storage: {
            rub: this.generateRandomAmount(50000, 200000) * baseMultiplier,
            percent: this.generateRandomPercent(0.3, 1.5)
          },
          advert: {
            rub: this.generateRandomAmount(5000000, 15000000) * baseMultiplier,
            percent: this.generateRandomPercent(30, 80)
          },
          other_retentions: {
            rub: this.generateRandomAmount(5000000, 15000000) * baseMultiplier,
            percent: this.generateRandomPercent(30, 80)
          },
          paid_acceptance: {
            rub: this.generateRandomAmount(10000, 80000) * baseMultiplier,
            percent: this.generateRandomPercent(0.05, 0.5)
          },
          total_expenses: {
            rub: this.generateRandomAmount(10000000, 20000000) * baseMultiplier,
            percent: this.generateRandomPercent(70, 120)
          }
        },
        compensation: {
          rub: this.generateRandomAmount(5000, 50000) * baseMultiplier,
          percent: this.generateRandomPercent(0.01, 0.3)
        },
        gross_margin: {
          rub: this.generateRandomAmount(11000000, 24000000) * baseMultiplier,
          percent: this.generateRandomPercent(85, 98)
        },
        operating_expenses: null,
        operating_profit: {
          rub: this.generateRandomAmount(-5000000, 15000000) * baseMultiplier,
          percent: this.generateRandomPercent(-40, 70)
        },
        ebitda: {
          rub: this.generateRandomAmount(-5000000, 15000000) * baseMultiplier,
          percent: this.generateRandomPercent(-40, 70)
        },
        ebitda_margin: this.generateRandomPercent(-40, 70),
        tax: {
          rub: this.generateRandomAmount(200000, 800000) * baseMultiplier,
          percent: this.generateRandomPercent(1.5, 4)
        },
        net_profit: {
          rub: this.generateRandomAmount(3000000, 12000000) * baseMultiplier,
          percent: this.generateRandomPercent(20, 60)
        }
      }
    };
  }

  // Вспомогательные методы для генерации случайных значений
  private generateRandomAmount(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateRandomPercent(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  }

  // Monthly Report данные
  private getMonthlyReportData() {
    return {
      months: this.generateMonthsForPeriod(2025, 1, 2025, 12),
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
          data: [{ name: 'Демо-бренд', value: 'Демо-бренд', id: 1 }]
        },
        articles: {
          stateKey: 'activeArticle',
          ruLabel: 'Артикул',
          enLabel: 'articles',
          data: [{ name: 'Демо-артикул', value: 'Демо-артикул', id: 1, brand: 'Демо-бренд', category: 'Демо-категория' }]
        },
        groups: {
          stateKey: 'activeGroup',
          ruLabel: 'Группа товаров',
          enLabel: 'product_groups',
          data: [{ name: 'Демо-группа', value: 'Демо-группа', id: 1 }]
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
          data: [{ name: 'Демо-категория', value: 'Демо-категория', id: 1 }]
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
    
    // Фильтрация по выбранным неделям
    if (filters.activeWeeks && Array.isArray(filters.activeWeeks) && !filters.activeWeeks.some((item: any) => item.value === 'Все')) {
      const selectedWeeks = filters.activeWeeks.map((item: any) => item.value);
      filteredData = filteredData.filter(week => selectedWeeks.includes(week.week));
    }
    
    return { 
      data: [{weeks: filteredData, year: 2025}], 
      messsage: 'Success' 
    };
  }
}
