import { eachWeekOfInterval, format, formatISO, endOfWeek, getISOWeek } from 'date-fns';
import type {
  StockProductData,
  SupplierAnalysisDemoData,
  WeeklyReportDemoData,
  DemoApiResponse,
  PlReportDemoData,
  WbMetricsData,
  ControlDataItem
} from '@/types/demo';

import stockAnalysis from './mock/stock-analysis.json';
import dashboardData from './mock/dashboard.json';
import weeklyReportData from './mock/weekly-report.json';
import rnpByArticleData from './mock/rnp-article.json';
import rnpSummaryData from './mock/rnp-summary.json';
import rnpProductsData from './mock/rnp-products.json';
import geoData from './mock/geo.json';
import abcDataProceeds from './mock/abc-data-proceeds.json';
import abcDataProfit from './mock/abc-data-profit.json';
import selfCostsData from './mock/selfcost.json';
import productGroupsData from './mock/product-groups.json';
import turnOverData from './mock/turnover.json';
import easyMonitoringData from './mock/easy-monitoring.json';
import monitoringData from './mock/monitoring.json';
import trendingQueries from './mock/trending-request.json';
import trendingQueriesMonth from './mock/trend-analysis-month.json';
import trendingQueriesDay from './mock/trend-analysis-day.json';
import ceoComparisonRaw from './mock/ceo-comparison.json';
import descriptionGeneratorKeywords from './mock/description-generator-keywords.json';
import rnpFiltersData from './mock/rnp-filters.json';
import serpRegions from './mock/serp-regions.json';
import wbControlsData from './mock/wb-controls.json';
import serpQueryData from './mock/serp-query-data.json';
import keywordsSelectionData from './mock/position-check/positionCheckMainData.json';
import advertListData from './mock/my-adv-list.json';
import advertCompanyData from './mock/my-adv-company.json';

export class DemoDataService {
  private static instance: DemoDataService;

  protected constructor() {}

  public static getInstance(): DemoDataService {
    if (!DemoDataService.instance) {
      DemoDataService.instance = new DemoDataService();
    }
    return DemoDataService.instance;
  }

  // Получить данные для конкретного эндпоинта
  public async getDataForEndpoint(endpoint: string, filters?: any, options?: any): Promise<any> {
    const [baseEndpoint, query] = endpoint.split('?');

    if (!baseEndpoint) {
      console.error('DemoDataService: No endpoint provided');
      return null;
    }

    // Сначала проверяем специализированные сервисы
    // Supplier Analysis маршруты
    if (baseEndpoint.includes('/supplier-analysis/')) {
      const { SupplierAnalysisDemoDataService } = await import('./SupplierAnalysisDemoDataService');
      const supplierService = SupplierAnalysisDemoDataService.getInstance();
      const supplierMatch = supplierService.getDataForEndpoint(baseEndpoint, filters, options);
      if (supplierMatch) return supplierMatch;
    }

    // SKU Analysis маршруты
    if (baseEndpoint.includes('/product-analysis/')) {
      const { SkuAnalysisDemoDataService } = await import('./SkuAnalysisDemoDataService');
      const skuService = SkuAnalysisDemoDataService.getInstance();
      const skuMatch = skuService.getDataForEndpoint(baseEndpoint, filters, options);
      if (skuMatch) return skuMatch;
    }

    // Position Check маршруты
    if (baseEndpoint.includes('/position-track/')) {
      const { PositionCheckDemoDataService } = await import('./PositionCheckDemoDataService');
      const positionCheckService = PositionCheckDemoDataService.getInstance();
      const positionCheckMatch = positionCheckService.getDataForEndpoint(baseEndpoint, filters, options);
      if (positionCheckMatch) return positionCheckMatch;
    }

    // Пробуем точное совпадение
    const exactMatch = this.getExactMatch(baseEndpoint, filters, options, query);
    if (exactMatch) {
      return exactMatch;
    }

    // Пробуем совпадение по паттерну для URL с динамическими параметрами
    const patternMatch = this.getPatternMatch(baseEndpoint, filters);
    if (patternMatch) {
      return patternMatch;
    }

    console.error('DemoDataService: No handler found for endpoint:', baseEndpoint);
    return null;
  }

  // Точное совпадение эндпоинтов
  protected getExactMatch(endpoint: string, filters?: any, options?: any, query?: string): any {
    const endpointMap: Record<string, () => any> = {
      '/api/dashboard/': () => this.getDashboardData(filters),
      '/api/prod_analytic/': () => this.getStockAnalysisData(filters),
      '/api/periodic_reports/weekly_report': () => this.getWeeklyReportData(filters),
      '/api/common/filters_new': () => this.getDemoFilters(),
      '/api/shop/all': () => this.getDemoShops(),
      '/api/supplier-analysis': () => this.getSupplierAnalysisData(),
      '/api/rnp/by_article': () => this.getRnpByArticleData(filters),
      '/api/rnp/summary': () => this.getRnpSummaryData(filters),
      '/api/rnp/products': () => this.getRnpProductsData(),
      '/api/rnp/filters': () => this.getRnpFiltersData(),
      '/api/profit_loss/report': () => this.getPlReportData(filters),
      '/api/geo/': () => this.getGeoData(),
      '/api/abc_data/proceeds': () => this.getAbcDataProceeds(filters),
      '/api/abc_data/profit': () => this.getAbcDataProfit(filters),
      '/api/product/self-costs/list': () => this.getSelfCostsData(),
      '/api/product/product_groups': () => this.getProductGroupsData(),
      '/api/dashboard/turnover': () => this.getTurnOverData(),
      '/api/ceo-comparison/raw': () => this.getCeoComparisonRaw(),
      '/api/description-generator/keywords': () => this.getDescriptionGeneratorKeywords(),
      '/api/user/subscription/all': () => this.getSubscriptionsData(),
      '/api/blog/articles': () => this.getArticlesData(),
      '/api/operating-expenses/category/get-all': () => this.getOperatingExpensesCategoriesData(),
      '/api/operating-expenses/expense/get-all': () => this.getOperatingExpensesData(filters),
      '/api/operating-expenses/periodic-expense/get': () => this.getPeriodicExpenseData(),
      '/api/control/spp': () => this.getWbControlsData(filters),
      '/api/control/drr': () => this.getWbControlsData(filters),
      '/api/advert/list': () => this.getAdvertData(filters, JSON.parse(options?.body)),
      '/api/advert/': () => this.getAdvertCompanyData(filters, query),
      '/api/product/self-costs': () => ({ message: "Success", updated_items: [{ product: 'Демо', cost: 100, fulfillment: 100 }] }),
      '/api/msg/': () => ([]),
      'https://radarmarket.ru/api/web-service/monitoring-oracle/easy/get': () => this.getEasyMonitoringData(),
      'https://radarmarket.ru/api/web-service/monitoring-oracle/get': () => this.getMonitoringData(),
      'https://radarmarket.ru/api/web-service/trending-queries/get': () => this.getTrendingQueries(),
      'https://radarmarket.ru/api/analytic/query-dynamics/month': () => this.getTrendingAnalysisMonth(),
      'https://radarmarket.ru/api/analytic/query-dynamics/day': () => this.getTrendingAnalysisDay(),
      'https://radarmarket.ru/api/web-service/search-map/get-regions': () => this.getSERPRegions(),
      'https://radarmarket.ru/api/web-service/search-map/get-query-data': () => this.getSERPQueryData(),
      'https://radarmarket.ru/api/web-service/keyword-selection/search' : () => this.getKeyboardSelectionData()
    };

    const dataGetter = endpointMap[endpoint];
    if (dataGetter) {
      return this.createApiResponse(dataGetter());
    }

    return null;
  }

  // Совпадение по паттерну для URL с параметрами
  private getPatternMatch(endpoint: string, filters?: any): any {
    // Паттерн для /api/product/product_groups/{id}
    const productGroupsIdMatch = endpoint.match(/^\/api\/product\/product_groups\/(\d+)$/);
    if (productGroupsIdMatch) {
      const productGroupId = productGroupsIdMatch[1];
      return this.createApiResponse({
        data: this.getProductGroupById(productGroupId)
      });
    }

    // Паттерн для /api/product/product_groups/{id}/products
    const productGroupsIdProductsMatch = endpoint.match(/^\/api\/product\/product_groups\/(\d+)\/products$/);
    if (productGroupsIdProductsMatch) {
      const productGroupProductsId = productGroupsIdProductsMatch[1];
      return this.createApiResponse({
        data: this.getProductGroupById(productGroupProductsId)
      });
    }

    return null;
  }

  protected getRequestObject(options?: any): any {
    if (options?.body) {
      try {
        return JSON.parse(options.body);
      } catch (error) {
        console.error('DemoDataService: Error parsing request object', error);
      }
    }
    return {};
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
          "tech_size": "48 (176-182)",
          "in_group": true,
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  // Создать API ответ в формате демо-режима
  protected createApiResponse<T>(data: T): DemoApiResponse<T> {
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

  private getFilterDays(filters?: any): number {
    if (!filters) return 30; // Default 30 days if no filters provided
    let days = filters.selectedRange?.period;
    if (filters.selectedRange?.from && filters.selectedRange?.to) {
      days = Math.round((Number(new Date(filters.selectedRange.to)) - Number(new Date(filters.selectedRange.from))) / 3600 / 24 / 1000);
    }
    return days || 30;
  }

  private getGeoData(filters?: any): any {
    const data = this.getOriginalJson(geoData);
    const days = this.getFilterDays(filters);
    const denominator = 90 / days;

    data.geo_data.map(item => {
      item.percent = item.percent / denominator;
      item.comparePercent = item.comparePercent / denominator;
      item.percentOrder = item.percentOrder / denominator;
      item.comparePercentOrder = item.comparePercentOrder / denominator;
      item.orderCount = Math.round(item.orderCount / denominator);
      item.orderAmount = Math.round(item.orderAmount / denominator);
      item.saleCount = Math.round(item.saleCount / denominator);
      item.saleAmount = Math.round(item.saleAmount / denominator);
    });

    data.stock_data.map(item => {
      item.percent = item.percent / denominator;
      item.comparePercent = item.comparePercent / denominator;
      item.percentOrder = item.percentOrder / denominator;
      item.comparePercentOrder = item.comparePercentOrder / denominator;
      item.orderCount = Math.round(item.orderCount / denominator);
      item.orderAmount = Math.round(item.orderAmount / denominator);
      item.saleCount = Math.round(item.saleCount / denominator);
      item.saleAmount = Math.round(item.saleAmount / denominator);
    });

    return data;
  }

  private getTurnOverData(): any {
    return turnOverData;
  }

  private getAdvertData(filters?: any, requestObject?: any): any {
    let data = this.getOriginalJson(advertListData);
    const days = this.getFilterDays(filters);
    const denominator = 90 / days;

    // Фильтрация по search_query, если он есть
    if (requestObject?.search_query && requestObject.search_query.trim() !== '') {
      const searchQuery = requestObject.search_query.toLowerCase().trim();
      data = data.filter((item: any) => 
        item.company_name?.toLowerCase().includes(searchQuery)
      );
    }

    // Деление всех числовых значений на denominator
    data = data.map((item: any) => {
      const processedItem = { ...item };
      
      if (processedItem.advert_funnel) {
        processedItem.advert_funnel = { ...processedItem.advert_funnel };
        Object.keys(processedItem.advert_funnel).forEach(key => {
          if (typeof processedItem.advert_funnel[key] === 'number') {
            processedItem.advert_funnel[key] = Math.round(processedItem.advert_funnel[key] / denominator);
          }
        });
      }
      
      if (processedItem.advert_statistics) {
        processedItem.advert_statistics = { ...processedItem.advert_statistics };
        Object.keys(processedItem.advert_statistics).forEach(key => {
          if (typeof processedItem.advert_statistics[key] === 'number') {
            processedItem.advert_statistics[key] = Math.round(processedItem.advert_statistics[key] / denominator);
          }
        });
      }
      
      return processedItem;
    });

    return {
      data,
      page: 1,
      per_page: 25,
      total_count: data.length,
    };
  }

  private getAdvertCompanyData(filters?: any, query?: string): any {
    const companyId = query && parseInt(query.match(/\d+/)[0]);
    const companyData = companyId ? advertListData.find((item: any) => item.company_id === companyId) : {};
    const data = this.getOriginalJson(Object.assign({}, advertCompanyData, companyData));
    const days = this.getFilterDays(filters);
    
    // Определяем конечную дату
    let dayTo = new Date().toISOString().split('T')[0];
    if (filters?.selectedRange?.to) {
      dayTo = filters.selectedRange.to;
    }
    
    // Обрезаем массив date_data до нужного количества дней (берем последние days элементов)
    if (Array.isArray(data.date_data)) {
      data.date_data = data.date_data.slice(-days);
      
      // Обновляем даты, начиная от dayTo и идя в прошлое
      data.date_data = data.date_data.map((item: any, index: number) => {
        const date = new Date(dayTo);
        date.setDate(date.getDate() - (days - 1 - index));
        return {
          ...item,
          date: date.toISOString().split('T')[0] // Формат YYYY-MM-DD
        };
      });
    }
    
    return data;
  }

  private getWbControlsData(filters?: any, count: number = 30): WbMetricsData {
    const generateRandomPercentage = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateDateRange = (days: number): string[] => {
      const dates: string[] = [];
      const today = new Date();

      for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }

      return dates.reverse();
    };

    const generateControlData = (dates: string[], minValue: number, maxValue: number): ControlDataItem[] => {
      return dates.map(date => ({
        date,
        percentage: generateRandomPercentage(minValue, maxValue)
      }));
    };

    const sampleProducts = wbControlsData;
    const dates = generateDateRange(count);
    const minValue = 1;
    const maxValue = 10;
    const startIndex = 0;
    const endIndex = count;

    const products = [];
    for (let i = startIndex; i < endIndex; i++) {
      const productIndex = i % sampleProducts.length;
      const product = {
        ...sampleProducts[productIndex],
        wb_id: sampleProducts[productIndex].wb_id + i,
        name: `${sampleProducts[productIndex].name} ${i + 1}`
      };

      const controlData = generateControlData(dates, minValue, maxValue);

      products.push({
        product,
        control_data: controlData
      });
    }

    return {
      data: products,
      min_control_value: minValue,
      max_control_value: maxValue,
      page: 1,
      per_page: count,
      total_count: count,
    };
  };

  private getAbcDataProceeds(filters?: any): any {
    const data = this.getOriginalJson(abcDataProceeds);
    const days = this.getFilterDays(filters);
    const denominator = 90 / days;

    data.results.map(item => {
      item.amount = item.amount / denominator;
    });

    return data;
  }

  private getAbcDataProfit(filters?: any): any {
    const data = this.getOriginalJson(abcDataProfit);
    const days = this.getFilterDays(filters);
    const denominator = 90 / days;

    data.results.map(item => {
      item.amount = item.amount / denominator;
      item.logistic = item.logistic / denominator;
    });

    return data;
  }

  private getSelfCostsData(): any {
    return { data: selfCostsData };
  }

  private getProductGroupsData(): any {
    return { data: productGroupsData };
  }

  private getEasyMonitoringData(): any {
    return easyMonitoringData;
  }

  private getMonitoringData(): any {
    return monitoringData;
  }

  private getTrendingQueries(): any {
    return trendingQueries;
  }

  private getTrendingAnalysisMonth(): any {
    return trendingQueriesMonth;
  }

  private getTrendingAnalysisDay(): any {
    return trendingQueriesDay;
  }

  private getCeoComparisonRaw(): any {
    return ceoComparisonRaw;
  }

  private getDescriptionGeneratorKeywords(): any {
    return descriptionGeneratorKeywords;
  }

  private getSERPRegions(): any {
    return serpRegions;
  }

  private getSERPQueryData(): any {
    return serpQueryData;
  }
  private getKeyboardSelectionData(): any {
    return keywordsSelectionData;
  }

  private getSubscriptionsData(): any {
    const now = new Date();
    const threeMonthsLater = now;
    const oneYearLater = now;
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    
    return [
      {
          "id": 1,
          "name": "Демо подписка",
          "active": false,
          "validity_period": threeMonthsLater.toISOString()
      },
      {
          "id": 2,
          "name": "Демо подписка",
          "active": true,
          "validity_period": oneYearLater.toISOString()
      }
    ];
  }

  private getArticlesData(): any {
    const articles = [
      {
        id: 1,
        category_id: 1,
        title: "Как увеличить продажи на маркетплейсах в 2025 году",
        description: "Узнайте о лучших стратегиях и инструментах для роста продаж на популярных маркетплейсах",
        slug: "kak-uvelichit-prodazhi-2025",
        created_at: new Date(2025, 0, 15).toISOString(),
        updated_at: new Date(2025, 0, 15).toISOString(),
        is_published: true,
        content: "Полное руководство по увеличению продаж на маркетплейсах...",
        image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
      },
      {
        id: 2,
        category_id: 1,
        title: "ABC-анализ товаров: как правильно использовать",
        description: "Разбираемся в методике ABC-анализа и как она помогает оптимизировать ассортимент",
        slug: "abc-analiz-tovarov",
        created_at: new Date(2025, 0, 10).toISOString(),
        updated_at: new Date(2025, 0, 10).toISOString(),
        is_published: true,
        content: "ABC-анализ - это мощный инструмент для оптимизации товарного портфеля...",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      },
      {
        id: 3,
        category_id: 2,
        title: "SEO-оптимизация карточек товаров на Wildberries",
        description: "Пошаговое руководство по оптимизации карточек товаров для улучшения ранжирования",
        slug: "seo-optimizaciya-wildberries",
        created_at: new Date(2025, 0, 5).toISOString(),
        updated_at: new Date(2025, 0, 5).toISOString(),
        is_published: true,
        content: "SEO-оптимизация карточек товаров - ключ к успеху на маркетплейсах...",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
      },
      {
        id: 4,
        category_id: 1,
        title: "Анализ конкурентов: инструменты и методы",
        description: "Как правильно анализировать конкурентов и использовать полученные данные",
        slug: "analiz-konkurentov",
        created_at: new Date(2024, 11, 28).toISOString(),
        updated_at: new Date(2024, 11, 28).toISOString(),
        is_published: true,
        content: "Анализ конкурентов помогает понять свои сильные и слабые стороны...",
        image_url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800"
      },
      {
        id: 5,
        category_id: 3,
        title: "Управление остатками: как избежать переизбытка и дефицита",
        description: "Эффективные стратегии управления складскими остатками",
        slug: "upravlenie-ostatkami",
        created_at: new Date(2024, 11, 20).toISOString(),
        updated_at: new Date(2024, 11, 20).toISOString(),
        is_published: true,
        content: "Правильное управление остатками - залог успешного бизнеса...",
        image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
      },
      {
        id: 6,
        category_id: 2,
        title: "Как работать с отзывами покупателей",
        description: "Стратегии работы с отзывами для повышения репутации и продаж",
        slug: "rabota-s-otzyvami",
        created_at: new Date(2024, 11, 15).toISOString(),
        updated_at: new Date(2024, 11, 15).toISOString(),
        is_published: true,
        content: "Отзывы покупателей - важнейший фактор принятия решения о покупке...",
        image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
      }
    ];

    return {
      data: {
        items: articles
      }
    };
  }

  private getOperatingExpensesCategoriesData(): any {
    return {
      data: [
          {
              "id": 1,
              "name": "Заработная плата"
          },
          {
              "id": 2,
              "name": "Аренда"
          },
          {
              "id": 3,
              "name": "Реклама и маркетинг"
          }
        ]
    };
  }

  private getOperatingExpensesData(filters?: any) {
    const today = new Date().toISOString().split('T')[0];
    const data = [
      {
        "id": 1,
        "expense_categories": [
          {
            "id": 1,
            "name": "Заработная плата"
          }
        ],
        "description": "Выдача заработной платы сотрудникам отдела маркетинга",
        "value": 100000,
        "vendor_codes": [],
        "brand_names": [],
        "shops": [
          {
            "id": 1,
            "name": "Демо магазин"
          },
        ],
        "date": today,
        "periodic_expense_id": null,
        "is_periodic": true,
        "created_at": today,
        "updated_at": today
      },
      {
          "id": 2,
          "expense_categories": [
            {
              "id": 2,
              "name": "Аренда"
            }
          ],
          "description": "Аренда офиса на три месяца",
          "value": 45000,
          "vendor_codes": [],
          "brand_names": ['Демо-бренд'],
          "shops": [
            {
              "id": 1,
              "name": "Демо магазин"
            },
          ],
          "date": today,
          "periodic_expense_id": null,
          "is_periodic": false,
          "created_at": today,
          "updated_at": today
      },
      {
          "id": 3,
          "expense_categories": [
            { 
              "id": -1 
            }
          ],
          "description": "Закупка оборудования",
          "value": 80000,
          "vendor_codes": ['Демо-артикул'],
          "brand_names": ['Демо-бренд'],
          "shops": [
            {
              "id": 1,
              "name": "Демо магазин"
            },
          ],
          "date": today,
          "periodic_expense_id": null,
          "is_periodic": false,
          "created_at": today,
          "updated_at": today
      }
    ];

    // Проверяем, входит ли сегодняшняя дата в диапазон selectedRange
    let filteredData = data;
    
    if (filters?.selectedRange && filters.selectedRange?.from && filters.selectedRange?.to) {
      const todayDate = new Date(today);
      const fromDate = filters.selectedRange.from ? new Date(filters.selectedRange.from) : null;
      const toDate = filters.selectedRange.to ? new Date(filters.selectedRange.to) : null;
      
      if (fromDate && toDate) {
        if (todayDate < fromDate || todayDate > toDate) {
          filteredData = [];
        }
      }
    }

    // Фильтруем по категориям расходов
    const activeExpenseCategory = filters?.activeExpenseCategory.map((item: any) => item.id).filter(Boolean);
    if (activeExpenseCategory && activeExpenseCategory.length > 0 && activeExpenseCategory[0] !== 0) {
      filteredData = filteredData.filter(expense => {
        return expense.expense_categories.some(category => activeExpenseCategory.includes(category.id));
      });
    }
    if (filters.activeBrandName[0]?.id) {
      filteredData = filteredData.filter(expense => {
        return expense.brand_names[0] === filters.activeBrandName[0]?.value;
      });
    }
    if (filters.activeArticle[0]?.id) {
      filteredData = filteredData.filter(expense => {
        return expense.vendor_codes[0] === filters.activeArticle[0]?.value;
      });
    }

    return {
      data: filteredData,
      page: 1,
      total_pages: 1,
      limit: 25,
      total_sum: 225000,
    };
  }

  private getPeriodicExpenseData() {
    const today = new Date().toISOString().split('T')[0];

    return {
      "id": 1,
      "expense_categories": [
          {
              "id": 1,
              "name": "Заработная плата"
          }
      ],
      "period_type": "month",
      "period_values": [1],
      "description": "Выдача заработной платы сотрудникам отдела маркетинга",
      "value": 100000,
      "vendor_code": null,
      "brand_name": null,
      "shops": [1],
      "date_from": today,
      "periodic_expense_id": null,
      "is_periodic": true,
      "created_at": today,
      "updated_at": today
    };
  }

  // Dashboard данные
  private getDashboardData(filters?: any): any {
    const data = this.getOriginalJson(dashboardData);
    let days = this.getFilterDays(filters);
    let dayTo = new Date().toISOString().split('T')[0];

    if (filters?.selectedRange?.to) {
      dayTo = filters.selectedRange.to;
      days++;
    }

    const denominator = 90 / days;

    data.orderCountList = data.orderCountList.slice(0, days);
    data.orderAmountList = data.orderAmountList.slice(0, days);
    data.saleCountList = data.saleCountList.slice(0, days);
    data.saleAmountList = data.saleAmountList.slice(0, days);
    data.marginalityRoiChart = data.marginalityRoiChart.slice(0, days);
    data.salesAndProfit = data.salesAndProfit.slice(0, days);

    // Обновляем даты в marginalityRoiChart и salesAndProfit начиная от сегодня и назад
    data.marginalityRoiChart = data.marginalityRoiChart.map((item: any, index: number) => {
      const date = new Date(dayTo);
      date.setDate(date.getDate() - (days - 1 - index));
      return {
        ...item,
        date: date.toISOString().split('T')[0] // Формат YYYY-MM-DD
      };
    });

    data.salesAndProfit = data.salesAndProfit.map((item: any, index: number) => {
      const date = new Date(dayTo);
      date.setDate(date.getDate() - (days - 1 - index));
      return {
        ...item,
        date: date.toISOString().split('T')[0] // Формат YYYY-MM-DD
      };
    });

    data.netProfit = Math.round(data.netProfit / denominator);
    data.prev_net_profit = Math.round(data.netProfit - (data.netProfit * data.netProfitCompare / 100));
    data.roi = Math.round(data.roi / denominator);
    data.paid_acceptance = Math.round(data.paid_acceptance / denominator);
    data.tax_amount = Math.round(data.tax_amount / denominator);
    data.advertAmount = Math.round(data.advertAmount / denominator);
    data.compensation = Math.round(data.compensation / denominator);
    data.grossProfitAbility = Math.round(data.grossProfitAbility / denominator);
    data.operatingProfitAbility = Math.round(data.operatingProfitAbility / denominator);
    data.logistic_per_one = Math.round(data.logistic_per_one / denominator);
    data.profit_per_one = Math.round(data.profit_per_one / denominator);
    data.lostSalesAmount = Math.round(data.lostSalesAmount / denominator);
    data.turnover = Math.round(data.turnover / denominator);
    data.ebitda = Math.round(data.ebitda / denominator);
    data.ebitda_margin = Math.round(data.ebitda_margin / denominator);
    data.orderAmount = Math.round(data.orderAmount / denominator);
    data.prev_order_amount = Math.round(data.orderAmount - (data.orderAmount * data.orderAmountCompare / 100));
    data.saleAmount = data.saleAmount / denominator;
    data.prev_sale_amount = Math.round(data.saleAmount - (data.saleAmount * data.saleAmountCompare / 100));
    data.orderCount = data.orderCount / denominator;
    data.saleCount = Math.round(data.saleCount / denominator);
    data.returnAmount = data.returnAmount / denominator;
    data.prev_return_amount = Math.round(data.returnAmount - (data.returnAmount * data.returnAmountCompare / 100));
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

  private getRnpByArticleData(filters?: any): any {
    const data = this.getOriginalJson(rnpByArticleData);
    const days = this.getFilterDays(filters);

    // Обновляем даты в by_date_data массиве для каждого элемента
    const updatedData = data.map((item: any) => {
      if (Array.isArray(item.by_date_data)) {
        if (days > 30) {
          item.by_date_data = [...item.by_date_data, ...item.by_date_data, ...item.by_date_data];
        }

        item.by_date_data = item.by_date_data.slice(0, days + 1);
        const diffDays = filters?.selectedRange?.to
          ? Math.round((Number(new Date()) - Number(new Date(filters.selectedRange.to))) / 86400000)
          : 0;
        const updatedByDateData = item.by_date_data.map((dateItem: any, index: number) => {
          // Генерируем дату от вчерашнего или последнего выбранного дня и назад
          const date = new Date();
          date.setDate(date.getDate() - index - diffDays);

          return { ...dateItem, date: date.toISOString() };
        });

        // Пересчитываем summary_data на основе отфильтрованных дней
        // const recalculatedSummaryData = this.recalculateSummaryData(updatedByDateData);

        return { 
          ...item, 
          by_date_data: updatedByDateData,
          //summary_data: recalculatedSummaryData || item.summary_data
          summary_data: item.summary_data
        };
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

  private getRnpSummaryData(filters?: any): any {
    let data = this.getOriginalJson(rnpSummaryData);
    const days = this.getFilterDays(filters);

    // Обновляем даты в by_date_data массиве для каждого элемента
    if (Array.isArray(data.by_date_data)) {
      // Циклически повторяем элементы из исходного массива (7 элементов) для заполнения нужного количества дней
      const originalData = [...data.by_date_data];
      data.by_date_data = Array.from({ length: days + 1}, (_, i) => originalData[i % originalData.length]);
      const diffDays = filters?.selectedRange?.to
          ? Math.round((Number(new Date()) - Number(new Date(filters.selectedRange.to))) / 86400000)
          : 0;

      const updatedByDateData = data.by_date_data.map((dateItem: any, index: number) => {
        // Генерируем дату от вчерашнего или последнего выбранного дня и назад
        const date = new Date();
        date.setDate(date.getDate() - index - diffDays);

        return { ...dateItem, date: date.toISOString() };
      });

      // Пересчитываем summary_data на основе отфильтрованных дней
      const recalculatedSummaryData = this.recalculateSummaryData(updatedByDateData);

      data = { 
        ...data, 
        by_date_data: updatedByDateData,
        //summary_data: recalculatedSummaryData || data.summary_data
        summary_data: data.summary_data
        //summary_data: []
      };
    }

    return { data };
  }

  private getRnpProductsData(): any {
    return rnpProductsData;
  }

  private getRnpFiltersData(): any {
    return { data: rnpFiltersData };
  }

  // Stock Analysis данные
  private getStockAnalysisData(filters?: any): StockProductData[] {
    const products = this.getOriginalJson(stockAnalysis) as StockProductData[];
    const days = this.getFilterDays(filters);
    const denominator = 90 / days;

    products.map(item => {
      item.saleSum = item.saleSum / denominator;
      item.quantity = item.quantity / denominator;
      item.lessReturns = item.lessReturns / denominator;
      item.costGoodsSold = item.costGoodsSold / denominator;
      item.returnsSum = item.returnsSum / denominator;
    });

    return products;
  }

  // P&L Report данные
  private getPlReportData(filters?: any): PlReportDemoData {
    const generatedData = this.generatePlReportData(filters);
    return { data: generatedData };
  }

  // Генератор данных для P&L отчета
  private generatePlReportData(filters?: any) {
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

    const result = [];

    // Генерируем данные по годам
    for (let year = endYear; year >= startYear; year--) {
      // Определяем диапазон месяцев для текущего года
      const yearStartMonth = (year === startYear) ? startMonth : 1;
      const yearEndMonth = (year === endYear) ? endMonth : 12;

      // Генерируем месяцы для текущего года
      const monthsData = this.generateMonthsForYear(year, yearStartMonth, yearEndMonth);
      const monthsDataWithData = monthsData.map((month) => this.generateMonthPlData(month));
      const monthsCount = yearEndMonth - yearStartMonth + 1;

      // Добавляем колонку года с сумарными данными
      result.push({
        year: year,
        data: this.generateYearPlData(monthsCount),
        months: monthsDataWithData,
      });
    }

    return result;
  }

  // Генерация списка месяцев для указанного года
  private generateMonthsForYear(year: number, startMonth: number, endMonth: number) {
    const months = [];
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    for (let month = startMonth; month <= endMonth; month++) {
      months.push({
        year: year,
        month: month,
        label: `${monthNames[month - 1]} ${year}`
      });
    }

    return months;
  }

  // Генерация данных за год
  private generateYearPlData(months: number) {
    const baseMultiplier = this.generateRandomPercent(0.8, 1);

    return {
      realization: {
        rub: {value: this.generateRandomAmount(1200000, 1800000) * baseMultiplier,},
        percent: this.generateRandomPercent(65, 75)
      },
      mp_discount: {
        rub: {value:this.generateRandomAmount(360000, 600000) * baseMultiplier,},
        percent: this.generateRandomPercent(20, 30)
      },
      sales: {
        rub: {value: this.generateRandomAmount(1680000, 2400000) * baseMultiplier,},
        percent: 100
      },
      direct_expenses: {
        cost: {
          rub: {value: this.generateRandomAmount(6000, 12000) * baseMultiplier,},
          percent: this.generateRandomPercent(0.3, 0.7)
        },
        logistic: {
          rub: {value: this.generateRandomAmount(180000, 240000) * baseMultiplier,},
          percent: this.generateRandomPercent(10, 15)
        },
        commission: {
          rub: {value: this.generateRandomAmount(360000, 480000) * baseMultiplier,},
          percent: this.generateRandomPercent(20, 25)
        },
        penalties: {
          rub: {value: this.generateRandomAmount(600, 1200) * baseMultiplier,},
          percent: this.generateRandomPercent(0.02, 0.1)
        },
        storage: {
          rub: {value: this.generateRandomAmount(6000, 18000) * baseMultiplier,},
          percent: this.generateRandomPercent(0.3, 1.0)
        },
        advert: {
          rub: {value: this.generateRandomAmount(720000, 960000) * baseMultiplier,},
          percent: this.generateRandomPercent(40, 50)
        },
        other_retentions: {
          rub: {value: this.generateRandomAmount(720000, 960000) * baseMultiplier,},
          percent: this.generateRandomPercent(40, 50)
        },
        paid_acceptance: {
          rub: {value: this.generateRandomAmount(1200, 3600) * baseMultiplier,},
          percent: this.generateRandomPercent(0.05, 0.2)
        },
        total_expenses: {
          rub: {value: this.generateRandomAmount(1440000, 1920000) * baseMultiplier,},
          percent: this.generateRandomPercent(80, 90)
        }
      },
      compensation: {
        rub: {value: this.generateRandomAmount(600, 1800) * baseMultiplier,},
        percent: this.generateRandomPercent(0.03, 0.1)
      },
      gross_margin: {
        rub: {value: this.generateRandomAmount(1560000, 2280000) * baseMultiplier,},
        percent: this.generateRandomPercent(90, 98)
      },
      operating_expenses: {
        items: [
          {
            category: 'Заработная плата',
            rub: {
              value: 200000 * months, 
              comparison_percentage: 10
            },
            percent: 10
          },
          {
            category: 'Аренда',
            rub: {
              value: 100000 * months, 
              comparison_percentage: 10
            },
            percent: 10
          }
        ],
        total: {
          rub: {value: 300000 * months, comparison_percentage: 10},
          percent: 10
        }
      },
      operating_profit: {
        rub: {value: this.generateRandomAmount(180000, 420000) * baseMultiplier,},
        percent: this.generateRandomPercent(10, 20)
      },
      ebitda: {
        rub: {value: this.generateRandomAmount(180000, 420000) * baseMultiplier,},
        percent: this.generateRandomPercent(10, 20)
      },
      ebitda_margin: this.generateRandomPercent(10, 20),
      tax: {
        rub: {value: this.generateRandomAmount(36000, 72000) * baseMultiplier,},
        percent: this.generateRandomPercent(2, 4)
      },
      net_profit: {
        rub: {value: this.generateRandomAmount(600000, 960000) * baseMultiplier,},
        percent: this.generateRandomPercent(30, 50)
      }
    };
  }

  // Генерация данных за месяц
  private generateMonthPlData(monthInfo: { year: number; month: number; label: string }) {
    const baseMultiplier = this.generateRandomPercent(0.4, 0.6); // Вариация по месяцам

    return {
      month_label: monthInfo.label,
      data: {
        realization: {
          rub: {value: this.generateRandomAmount(80000, 200000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
          percent: this.generateRandomPercent(-10, 10)
        },
        mp_discount: {
          rub: {value: this.generateRandomAmount(20000, 60000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
          percent: this.generateRandomPercent(-10, 10)
        },
        sales: {
          rub: {value: this.generateRandomAmount(120000, 250000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
          percent: 100
        },
        direct_expenses: {
          cost: {
            rub: {value: this.generateRandomAmount(500, 1500) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
            percent: this.generateRandomPercent(0.3, 0.8)
          },
          logistic: {
            rub: {value: this.generateRandomAmount(10000, 25000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
            percent: this.generateRandomPercent(8, 15)
          },
          commission: {
            rub: {value: this.generateRandomAmount(25000, 50000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
            percent: this.generateRandomPercent(15, 30)
          },
          penalties: {
            rub: {value: this.generateRandomAmount(100, 2000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
            percent: this.generateRandomPercent(0.01, 0.15)
          },
          storage: {
            rub: {value: this.generateRandomAmount(500, 2000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
            percent: this.generateRandomPercent(0.3, 1.5)
          },
          advert: {
            rub: {value: this.generateRandomAmount(50000, 150000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
            percent: this.generateRandomPercent(30, 80)
          },
          other_retentions: {
            rub: {value: this.generateRandomAmount(50000, 150000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
            percent: this.generateRandomPercent(30, 80)
          },
          paid_acceptance: {
            rub: {value: this.generateRandomAmount(100, 800) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)}, 
            percent: this.generateRandomPercent(-10, 10)
          },
          total_expenses: {
            rub: {value: this.generateRandomAmount(100000, 200000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
            percent: this.generateRandomPercent(-10, 10)
          }
        },
        compensation: {
          rub: {value: this.generateRandomAmount(500, 5000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
          percent: this.generateRandomPercent(0.01, 0.3)
        },
        gross_margin: {
          rub: {value: this.generateRandomAmount(110000, 240000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
          percent: this.generateRandomPercent(85, 98)
        },
        operating_expenses: {
          items: [
            {
              category: 'Заработная плата',
              rub: {
                value: 200000, 
                comparison_percentage: 10
              },
              percent: 10
            },
            {
              category: 'Аренда',
              rub: {
                value: 100000, 
                comparison_percentage: 10
              },
              percent: 10
            }
          ],
          total: {
            rub: {
              value: 300000, 
              comparison_percentage: 10
            },
            percent: 10
          }
        },
        operating_profit: {
          rub: {value: this.generateRandomAmount(-50000, 150000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
          percent: this.generateRandomPercent(-40, 70)
        },
        ebitda: {
          rub: {value: this.generateRandomAmount(-50000, 150000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
          percent: this.generateRandomPercent(-40, 70)
        },
        ebitda_margin: this.generateRandomPercent(-10, 10),
        tax: {
          rub: {value: this.generateRandomAmount(2000, 8000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
          percent: this.generateRandomPercent(1.5, 4)
        },
        net_profit: {
          rub: {value: this.generateRandomAmount(30000, 120000) * baseMultiplier, comparison_percentage: this.generateRandomPercent(-10, 10)},
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

  // Генерация опций недель для ReportWeek (аналогично weekOptions в компоненте)
  private generateWeekOptions() {
    const optionTemplate = (date: Date) => {
      const weekValue = formatISO(date, { representation: 'date' });
      const weekStart = format(date, 'dd.MM.yyyy');
      const weekEnd = format(
        endOfWeek(date, { weekStartsOn: 1 }),
        'dd.MM.yyyy'
      );
      const weekNumber = getISOWeek(date);
      return {
        key: date.getTime(),
        value: weekValue,
        label: `${weekNumber} неделя (${weekStart} - ${weekEnd})`,
      };
    };

    // Выборка дат с 2025-01-29
    const weeks = eachWeekOfInterval(
      {
        start: new Date(2025, 0, 1),
        end: Date.now(),
      },
      {
        weekStartsOn: 1,
      }
    );
    weeks.pop();

    return weeks
      .sort((a: Date, b: Date) => a.getTime() - b.getTime())
      .map((el: Date) => optionTemplate(el))
      .reverse();
  }

  // Демо-фильтры
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
      value: 'Демо магазин',
    };

    // Создаем структуру фильтров аналогично реальным данным
    const shops = [demoShop];

    // Проверяем, находимся ли мы на странице ReportWeek
    const isReportWeekPage = window.location.pathname.includes('/report-week');

    let weeksListData;
    if (isReportWeekPage) {
      weeksListData = this.generateWeekOptions();
    } else {
      weeksListData = [
        { name: 'Последние 7 дней', value: 7, key: 7 },
        { name: 'Последние 14 дней', value: 14, key: 14 },
        { name: 'Последние 30 дней', value: 30, key: 30 },
        { name: 'Последние 90 дней', value: 90, key: 90 },
      ];
    }

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
  private getWeeklyReportData(filters?: any): WeeklyReportDemoData {
    const currentDate = new Date();
    const weeklyData = weeklyReportData as any[];
    const baseData = weeklyData[0]; // Берем базовые данные для генерации
    const currentWeekNumber = this.getWeekNumber(currentDate); // Получаем текущую дату и вычисляем количество недель от начала года
    const dynamicWeeklyData = []; // Генерируем данные только для выбранных недель
    let activeWeeks = filters?.activeWeeks || [];

    // Если нет выбранных недель, или выбрано 'Все', то генерируем 42 недели от текущей даты
    if (activeWeeks.length === 0 || activeWeeks[0]?.value === 'Все') {
      activeWeeks = [];
      
      for (let i = 1; i <= 42; i++) {
        const weekStartDate = new Date(currentDate);
        const dayOfWeek = weekStartDate.getDay();
        weekStartDate.setDate(weekStartDate.getDate() - (i * 7));
        
        const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        weekStartDate.setDate(weekStartDate.getDate() + daysToMonday);
        
        const weekStartISO = weekStartDate.toISOString().split('T')[0];
        activeWeeks.push({ value: weekStartISO });
      }
    }

    for (const selectedWeek of activeWeeks) {
      const weekDate = new Date(selectedWeek.value);
      weekDate.setDate(weekDate.getDate() + 7); // берем по последнему дню недели
      const weekNumber = this.getWeekNumber(weekDate) - 1;

      // Проверяем, что неделя не в будущем
      if (weekNumber <= currentWeekNumber) {
        const weekStartDate = this.getDateFromWeekNumber(weekDate.getFullYear(), weekNumber);
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekStartDate.getDate() + 6);

        const startDateStr = this.formatDate(weekStartDate);
        const endDateStr = this.formatDate(weekEndDate);
        const weekLabel = `${weekNumber} неделя (${startDateStr} - ${endDateStr})`;

        // Генерируем случайные данные на основе базовых данных
        const generatedData = this.generateRandomWeeklyData(baseData);

        dynamicWeeklyData.push({
          week: weekNumber,
          week_label: weekLabel,
          data: generatedData
        });
      }
    }

    // Сортируем по номеру недели (от большей к меньшей)
    dynamicWeeklyData.sort((a, b) => b.week - a.week);

    return {
      data: [{weeks: dynamicWeeklyData, year: currentDate.getFullYear()}],
      messsage: 'Success',
    };
  }

  // Генерация случайных данных для недели на основе базовых данных
  private generateRandomWeeklyData(baseData: any): any {
    // Функция для генерации случайного числа в диапазоне
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // Функция для генерации случайного числа с вариацией от базового значения
    const randomVariation = (baseValue: number, variationPercent: number) => {
      const variation = baseValue * variationPercent;
      return Math.max(0, baseValue + randomInRange(-variation, variation));
    };

    // Функция для генерации пары связанных значений (rub/quantity или rub/percent)
    const generatePair = (value1: number, value2: number) => {
      const randomMultiplier = randomInRange(0.25, 0.5);
      const result1 = Math.round(randomVariation(value1, randomMultiplier));
      const result2 = Math.round(randomVariation(value2, randomMultiplier));

      if (result1 === 0 || result2 === 0) {
        return { first: 0, second: 0 };
      }

      return { first: {value: result1, comparison_percentage: this.generateRandomPercent(-10, 10)}, second: {value: result2, comparison_percentage: this.generateRandomPercent(-10, 10)} };
    };

    const roundToTwo = (v: number) => Math.round(v * 100) / 100;

    const revenue = generatePair(baseData.data.revenue.rub, baseData.data.revenue.quantity);
    const purchases = generatePair(baseData.data.purchases.rub, baseData.data.purchases.quantity);
    const returnData = generatePair(baseData.data.return.rub, baseData.data.return.quantity);
    const wbCommission = generatePair(baseData.data.wb_commission.rub, baseData.data.wb_commission.percent);
    const acquiring = generatePair(baseData.data.acquiring.rub, baseData.data.acquiring.percent);
    const logisticsStraight = generatePair(baseData.data.logistics_straight.rub, baseData.data.logistics_straight.percent);
    const logisticsReverse = generatePair(baseData.data.logistics_reverse.rub, baseData.data.logistics_reverse.percent);
    const logisticsTotal = generatePair(baseData.data.logistics_total.rub, baseData.data.logistics_total.percent);

    return {
      revenue: {
        rub: revenue.first,
        quantity: revenue.second
      },
      purchases: {
        rub: purchases.first,
        quantity: purchases.second
      },
      return: {
        rub: returnData.first,
        quantity: returnData.second
      },
      avg_check: roundToTwo(randomVariation(baseData.data.avg_check, 0.2)),
      purchase_percent: roundToTwo(randomVariation(baseData.data.purchase_percent, 0.2)),
      avg_spp: roundToTwo(randomVariation(baseData.data.avg_spp, 0.2)),
      cost_price: Math.round(randomVariation(baseData.data.cost_price, 0.3)),
      cost_price_percent: roundToTwo(randomVariation(baseData.data.cost_price_percent, 0.2)),
      cost_price_per_one: roundToTwo(randomVariation(baseData.data.cost_price_per_one, 0.3)),
      deliveries: Math.round(randomVariation(baseData.data.deliveries, 0.2)),
      payment: roundToTwo(randomVariation(baseData.data.payment, 0.2)),
      profit: roundToTwo(randomVariation(baseData.data.profit, 0.3)),
      profit_per_one: roundToTwo(randomVariation(baseData.data.profit_per_one, 0.2)),
      marginality: roundToTwo(randomVariation(baseData.data.marginality, 0.2)),
      return_on_investment: roundToTwo(randomVariation(baseData.data.return_on_investment, 0.2)),
      wb_commission: {
        rub: wbCommission.first,
        percent: wbCommission.second
      },
      acquiring: {
        rub: acquiring.first,
        percent: acquiring.second
      },
      logistics_straight: {
        rub: logisticsStraight.first,
        percent: logisticsStraight.second
      },
      logistics_reverse: {
        rub: logisticsReverse.first,
        percent: logisticsReverse.second
      },
      logistics_per_product: roundToTwo(randomVariation(baseData.data.logistics_per_product, 0.2)),
      logistics_total: {
        rub: logisticsTotal.first,
        percent: logisticsTotal.second
      },
      compensation_defects_rub: roundToTwo(randomVariation(baseData.data.compensation_defects.rub, 0.2)),
      compensation_defects_quantity: Math.round(randomVariation(baseData.data.compensation_defects.quantity, 0.5)),
      compensation_damage_rub: roundToTwo(randomVariation(baseData.data.compensation_damage.rub, 0.2)),
      compensation_damage_quantity: Math.round(randomVariation(baseData.data.compensation_damage.quantity, 0.5)),
      penalties: roundToTwo(randomVariation(baseData.data.penalties, 0.2)),
      additional_payments: roundToTwo(randomVariation(baseData.data.additional_payments, 0.2)),
      storage_rub: roundToTwo(randomVariation(baseData.data.storage.rub, 0.2)),
      storage_percent: roundToTwo(randomVariation(baseData.data.storage.percent, 0.2)),
      other_retentions_rub: roundToTwo(randomVariation(baseData.data.other_retentions.rub, 0.2)),
      other_retentions_percent: roundToTwo(randomVariation(baseData.data.other_retentions.percent, 0.2)),
      acceptance_rub: roundToTwo(randomVariation(baseData.data.acceptance.rub, 0.2)),
      acceptance_percent: roundToTwo(randomVariation(baseData.data.acceptance.percent, 0.2)),
      compensation_penalties_rub: roundToTwo(randomVariation(baseData.data.compensation_penalties.rub, 0.2)),
      compensation_penalties_percent: roundToTwo(randomVariation(baseData.data.compensation_penalties.percent, 0.2)),
      sold_by_wb: roundToTwo(randomVariation(baseData.data.sold_by_wb, 0.2)),
      tax_base: roundToTwo(randomVariation(baseData.data.tax_base, 0.2)),
      tax: roundToTwo(randomVariation(baseData.data.tax, 0.2)),
      advert_amount: roundToTwo(randomVariation(baseData.data.advert_amount, 0.2)),
      drr: roundToTwo(randomVariation(baseData.data.drr, 0.2)),
      wb_retentions_amount: roundToTwo(randomVariation(baseData.data.wb_retentions_amount, 0.2)),
    };
  }

  // Получение даты начала недели по номеру недели в году
  private getDateFromWeekNumber(year: number, weekNumber: number): Date {
    const jan1 = new Date(year, 0, 1);
    const daysToAdd = (weekNumber - 1) * 7;
    const weekStart = new Date(jan1.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    // Корректируем на понедельник
    const dayOfWeek = weekStart.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    weekStart.setDate(weekStart.getDate() + daysToMonday);

    return weekStart;
  }

  // Получение номера недели в году
  private getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
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

  // Функция для пересчета summary_data на основе отфильтрованных дней
  private recalculateSummaryData(byDateData: any[]): any {
    if (!byDateData || byDateData.length === 0) {
      return null;
    }

    const summaryData = {
      expected_marginality_data: {
        expected_marginality: 0,
        plan_marginality: 0,
        roi: 0,
        profit_per_one: 0,
        net_profit: 0,
        drr_by_sales: 0,
        drr_by_orders: 0,
        orders_amount: 0,
        orders_count: 0,
        sales_count: 0,
        sales_spp_amount: 0,
        full_price: 0,
        price_spp: 0,
        discount: 0,
        buyout: 0
      },
      rk_budget_data: {
        ctr: 0,
        impressions: 0,
        clicks: 0,
        cpc: 0,
        cpm: 0,
        rk_budget: 0,
        cr: 0,
        one_order_price: 0,
        one_sale_price: 0
      },
      ark_budget_data: {
        ctr: 0,
        impressions: 0,
        clicks: 0,
        cpc: 0,
        cpm: 0,
        ark_budget: 0
      },
      auction_rk_budget_data: {
        ctr: 0,
        impressions: 0,
        clicks: 0,
        cpc: 0,
        cpm: 0,
        auction_rk_budget: 0
      },
      transition_data: {
        transition: 0,
        cart_addition_count: 0,
        cart_addition_percentage: 0,
        order_addition_percentage: 0
      },
      taxes_data: {
        taxes: 0,
        tax_per_one: 0,
        logistics_per_one: 0,
        commission_acquiring_per_one: 0,
        commission_acquiring_percentage: 0,
        storage_per_one: 0,
        cost_per_one: 0
      }
    };

    // Суммируем данные по всем дням
    byDateData.forEach(dayData => {
      if (dayData.rnp_data) {
        const rnpData = dayData.rnp_data;
        // Суммируем expected_marginality_data
        if (rnpData.expected_marginality_data) {
          const emd = rnpData.expected_marginality_data;
          summaryData.expected_marginality_data.expected_marginality += emd.expected_marginality.value || 0;
          summaryData.expected_marginality_data.plan_marginality += emd.plan_marginality.value || 0;
          summaryData.expected_marginality_data.roi += emd.roi.value || 0;
          summaryData.expected_marginality_data.profit_per_one += emd.profit_per_one.value || 0;
          summaryData.expected_marginality_data.net_profit += emd.net_profit.value || 0;
          summaryData.expected_marginality_data.drr_by_sales += emd.drr_by_sales.value || 0;
          summaryData.expected_marginality_data.drr_by_orders += emd.drr_by_orders.value || 0;
          summaryData.expected_marginality_data.orders_amount += emd.orders_amount.value || 0;
          summaryData.expected_marginality_data.orders_count += emd.orders_count.value || 0;
          summaryData.expected_marginality_data.sales_count += emd.sales_count.value || 0;
          summaryData.expected_marginality_data.sales_spp_amount += emd.sales_spp_amount.value || 0;
          summaryData.expected_marginality_data.full_price += emd.full_price.value || 0;
          summaryData.expected_marginality_data.price_spp += emd.price_spp.value || 0;
          summaryData.expected_marginality_data.discount += emd.discount.value || 0;
          summaryData.expected_marginality_data.buyout += emd.buyout.value || 0;
        }

        // Суммируем rk_budget_data
        if (rnpData.rk_budget_data) {
          const rkbd = rnpData.rk_budget_data;
          summaryData.rk_budget_data.ctr += rkbd.ctr.value || 0;
          summaryData.rk_budget_data.impressions += rkbd.impressions.value || 0;
          summaryData.rk_budget_data.clicks += rkbd.clicks.value || 0;
          summaryData.rk_budget_data.cpc += rkbd.cpc.value || 0;
          summaryData.rk_budget_data.cpm += rkbd.cpm.value || 0;
          summaryData.rk_budget_data.rk_budget += rkbd.rk_budget.value || 0;
          summaryData.rk_budget_data.cr += rkbd.cr.value || 0;
          summaryData.rk_budget_data.one_order_price += rkbd.one_order_price.value || 0;
          summaryData.rk_budget_data.one_sale_price += rkbd.one_sale_price.value || 0;
        }

        // Суммируем ark_budget_data
        if (rnpData.ark_budget_data) {
          const arkbd = rnpData.ark_budget_data;
          summaryData.ark_budget_data.ctr += arkbd.ctr.value || 0;
          summaryData.ark_budget_data.impressions += arkbd.impressions.value || 0;
          summaryData.ark_budget_data.clicks += arkbd.clicks.value || 0;
          summaryData.ark_budget_data.cpc += arkbd.cpc.value || 0;
          summaryData.ark_budget_data.cpm += arkbd.cpm.value || 0;
          summaryData.ark_budget_data.ark_budget += arkbd.ark_budget.value || 0;
        }

        // Суммируем auction_rk_budget_data
        if (rnpData.auction_rk_budget_data) {
          const arkbd = rnpData.auction_rk_budget_data;
          summaryData.auction_rk_budget_data.ctr += arkbd.ctr.value || 0;
          summaryData.auction_rk_budget_data.impressions += arkbd.impressions.value || 0;
          summaryData.auction_rk_budget_data.clicks += arkbd.clicks.value || 0;
          summaryData.auction_rk_budget_data.cpc += arkbd.cpc.value || 0;
          summaryData.auction_rk_budget_data.cpm += arkbd.cpm.value || 0;
          summaryData.auction_rk_budget_data.auction_rk_budget += arkbd.auction_rk_budget.value || 0;
        }

        // Суммируем transition_data
        if (rnpData.transition_data) {
          const td = rnpData.transition_data;
          summaryData.transition_data.transition += td.transition.value || 0;
          summaryData.transition_data.cart_addition_count += td.cart_addition_count.value || 0;
          summaryData.transition_data.cart_addition_percentage += td.cart_addition_percentage.value || 0;
          summaryData.transition_data.order_addition_percentage += td.order_addition_percentage.value || 0;
        }

        // Суммируем taxes_data
        if (rnpData.taxes_data) {
          const txd = rnpData.taxes_data;
          summaryData.taxes_data.taxes += txd.taxes.value || 0;
          summaryData.taxes_data.tax_per_one += txd.tax_per_one.value || 0;
          summaryData.taxes_data.logistics_per_one += txd.logistics_per_one || 0;
          summaryData.taxes_data.commission_acquiring_per_one += txd.commission_acquiring_per_one.value || 0;
          summaryData.taxes_data.commission_acquiring_percentage += txd.commission_acquiring_percentage.value || 0;
          summaryData.taxes_data.storage_per_one += txd.storage_per_one.value || 0;
          summaryData.taxes_data.cost_per_one += txd.cost_per_one.value || 0;
        }
      }
    });

    // Вычисляем средние значения для процентов и коэффициентов
    const daysCount = byDateData.length;
    if (daysCount > 0) {
      summaryData.expected_marginality_data.expected_marginality = Math.round((summaryData.expected_marginality_data.expected_marginality / daysCount) * 100) / 100;
      summaryData.expected_marginality_data.plan_marginality = Math.round((summaryData.expected_marginality_data.plan_marginality / daysCount) * 100) / 100;
      summaryData.expected_marginality_data.roi = Math.round((summaryData.expected_marginality_data.roi / daysCount) * 100) / 100;
      summaryData.expected_marginality_data.drr_by_sales = Math.round((summaryData.expected_marginality_data.drr_by_sales / daysCount) * 100) / 100;
      summaryData.expected_marginality_data.drr_by_orders = Math.round((summaryData.expected_marginality_data.drr_by_orders / daysCount) * 100) / 100;
      summaryData.expected_marginality_data.discount = Math.round((summaryData.expected_marginality_data.discount / daysCount) * 100) / 100;
      summaryData.expected_marginality_data.buyout = Math.round((summaryData.expected_marginality_data.buyout / daysCount) * 100) / 100;

      summaryData.rk_budget_data.ctr = Math.round((summaryData.rk_budget_data.ctr / daysCount) * 100) / 100;
      summaryData.rk_budget_data.cpc = Math.round((summaryData.rk_budget_data.cpc / daysCount) * 100) / 100;
      summaryData.rk_budget_data.cpm = Math.round((summaryData.rk_budget_data.cpm / daysCount) * 100) / 100;
      summaryData.rk_budget_data.cr = Math.round((summaryData.rk_budget_data.cr / daysCount) * 100) / 100;
      summaryData.rk_budget_data.one_order_price = Math.round((summaryData.rk_budget_data.one_order_price / daysCount) * 100) / 100;
      summaryData.rk_budget_data.one_sale_price = Math.round((summaryData.rk_budget_data.one_sale_price / daysCount) * 100) / 100;

      summaryData.ark_budget_data.ctr = Math.round((summaryData.ark_budget_data.ctr / daysCount) * 100) / 100;
      summaryData.ark_budget_data.cpc = Math.round((summaryData.ark_budget_data.cpc / daysCount) * 100) / 100;
      summaryData.ark_budget_data.cpm = Math.round((summaryData.ark_budget_data.cpm / daysCount) * 100) / 100;

      summaryData.auction_rk_budget_data.ctr = Math.round((summaryData.auction_rk_budget_data.ctr / daysCount) * 100) / 100;
      summaryData.auction_rk_budget_data.cpc = Math.round((summaryData.auction_rk_budget_data.cpc / daysCount) * 100) / 100;
      summaryData.auction_rk_budget_data.cpm = Math.round((summaryData.auction_rk_budget_data.cpm / daysCount) * 100) / 100;

      summaryData.transition_data.cart_addition_percentage = Math.round((summaryData.transition_data.cart_addition_percentage / daysCount) * 100) / 100;
      summaryData.transition_data.order_addition_percentage = Math.round((summaryData.transition_data.order_addition_percentage / daysCount) * 100) / 100;

      summaryData.taxes_data.tax_per_one = Math.round((summaryData.taxes_data.tax_per_one / daysCount) * 100) / 100;
      summaryData.taxes_data.logistics_per_one = Math.round((summaryData.taxes_data.logistics_per_one / daysCount) * 100) / 100;
      summaryData.taxes_data.commission_acquiring_per_one = Math.round((summaryData.taxes_data.commission_acquiring_per_one / daysCount) * 100) / 100;
      summaryData.taxes_data.commission_acquiring_percentage = Math.round((summaryData.taxes_data.commission_acquiring_percentage / daysCount) * 100) / 100;
      summaryData.taxes_data.storage_per_one = Math.round((summaryData.taxes_data.storage_per_one / daysCount) * 100) / 100;
      summaryData.taxes_data.cost_per_one = Math.round((summaryData.taxes_data.cost_per_one / daysCount) * 100) / 100;
    }

    return summaryData;
  }

  private getOriginalJson(json: any) {
    return JSON.parse(JSON.stringify(json));
  }
}
