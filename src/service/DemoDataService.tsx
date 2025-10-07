import { eachWeekOfInterval, format, formatISO, endOfWeek, getISOWeek } from 'date-fns';
import type {
  StockProductData,
  SupplierAnalysisDemoData,
  WeeklyReportDemoData,
  DemoApiResponse,
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
import turnOverData from '../mock/turnover.json';
import easyMonitoringData from '../mock/easy-monitoring.json';
import monitoringData from '../mock/monitoring.json';
import trendingQueries from '../mock/trending-request.json';
import trendingQueriesMonth from '../mock/trend-analysis-month.json';
import trendingQueriesDay from '../mock/trend-analysis-day.json';
import ceoComparisonRaw from '../mock/ceo-comparison.json';
import descriptionGeneratorKeywords from '../mock/description-generator-keywords.json';
import rnpFiltersData from '../mock/rnp-filters.json';

import { store } from '@/redux/store';

export class DemoDataService {
  private static instance: DemoDataService;

  private constructor() {}

  public static getInstance(): DemoDataService {
    if (!DemoDataService.instance) {
      DemoDataService.instance = new DemoDataService();
    }
    return DemoDataService.instance;
  }

  // Получить данные для конкретного эндпоинта
  public getDataForEndpoint(endpoint: string, params?: any): any {
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
      '/api/dashboard/': () => this.getDashboardData(),
      '/api/prod_analytic/': () => this.getStockAnalysisData(),
      '/api/periodic_reports/weekly_report': () => this.getWeeklyReportData(),
      '/api/common/filters_new': () => this.getDemoFilters(),
      '/api/shop/all': () => this.getDemoShops(),
      '/api/supplier-analysis': () => this.getSupplierAnalysisData(),
      '/api/rnp/by_article': () => this.getRnpByArticleData(),
      '/api/rnp/summary': () => this.getRnpSummaryData(),
      '/api/rnp/products': () => this.getRnpProductsData(),
      '/api/rnp/filters': () => this.getRnpFiltersData(),
      '/api/profit_loss/report': () => this.getPlReportData(),
      '/api/geo/': () => this.getGeoData(),
      '/api/abc_data/proceeds': () => this.getAbcDataProceeds(),
      '/api/abc_data/profit': () => this.getAbcDataProfit(),
      '/api/product/self-costs/list': () => this.getSelfCostsData(),
      '/api/product/product_groups': () => this.getProductGroupsData(),
      '/api/dashboard/turnover': () => this.getTurnOverData(),
      '/api/ceo-comparison/raw': () => this.getCeoComparisonRaw(),
      '/api/description-generator/keywords': () => this.getDescriptionGeneratorKeywords(),
      '/api/user/subscription/all': () => this.getSubscriptionsData(),
      '/api/product/self-costs': () => ({ message: "Success", updated_items: [{ product: 'Демо', cost: 100, fulfillment: 100 }] }),
      'https://radarmarket.ru/api/web-service/monitoring-oracle/easy/get': () => this.getEasyMonitoringData(),
      'https://radarmarket.ru/api/web-service/monitoring-oracle/get': () => this.getMonitoringData(),
      'https://radarmarket.ru/api/web-service/trending-queries/get': () => this.getTrendingQueries(),
      'https://radarmarket.ru/api/analytic/query-dynamics/month': () => this.getTrendingAnalysisMonth(),
      'https://radarmarket.ru/api/analytic/query-dynamics/day': () => this.getTrendingAnalysisDay(),
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
    const data = this.getOriginalJson(geoData);
    const days = this.getFilterDays();
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

  private getAbcDataProceeds(): any {
    const data = this.getOriginalJson(abcDataProceeds);
    const days = this.getFilterDays();
    const denominator = 90 / days;

    data.results.map(item => {
      item.amount = item.amount / denominator;
    });
    
    return data;
  }

  private getAbcDataProfit(): any {
    const data = this.getOriginalJson(abcDataProfit);
    const days = this.getFilterDays();
    const denominator = 90 / days;

    data.results.map(item => {
      item.amount = item.amount / denominator;
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

  // Dashboard данные
  private getDashboardData(): any {
    const data = this.getOriginalJson(dashboardData);
    let days = this.getFilterDays();
    let dayTo = new Date().toISOString().split('T')[0];

    if (store.getState().filters?.selectedRange?.to) {
      dayTo = store.getState().filters?.selectedRange?.to;
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
    
    data.orderAmount = Math.round(data.orderAmount / denominator);
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
    const data = this.getOriginalJson(rnpByArticleData);
    const filters = store.getState().filters;
    const days = this.getFilterDays();

    // Обновляем даты в by_date_data массиве для каждого элемента
    const updatedData = data.map((item: any) => {
      if (Array.isArray(item.by_date_data)) {
        if (days > 30) {
          item.by_date_data = [...item.by_date_data, ...item.by_date_data, ...item.by_date_data];
        }

        item.by_date_data = item.by_date_data.slice(-(days + 1));
        const diffDays = filters?.selectedRange?.to 
          ? Math.round((Number(new Date()) - Number(new Date(filters.selectedRange.to))) / 86400000)
          : 0;
        
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
    let data = this.getOriginalJson(rnpSummaryData);
    const filters = store.getState().filters;
    const days = this.getFilterDays();

    // Обновляем даты в by_date_data массиве для каждого элемента
    if (Array.isArray(data.by_date_data)) {
      if (days > 30) {
        data.by_date_data = [...data.by_date_data, ...data.by_date_data, ...data.by_date_data];
      }

      data.by_date_data = data.by_date_data.slice(-(days + 1));
      const diffDays = filters?.selectedRange?.to 
          ? Math.round((Number(new Date()) - Number(new Date(filters.selectedRange.to))) / 86400000)
          : 0;

      const updatedByDateData = data.by_date_data.map((dateItem: any, index: number) => {
        // Генерируем дату от вчерашнего или последнего выбранного дня и назад
        const date = new Date();
        date.setDate(date.getDate() - index - diffDays);

        return { ...dateItem, date: date.toISOString() };
      });

      data = { ...data, by_date_data: updatedByDateData };
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
  private getStockAnalysisData(): StockProductData[] {
    const products = this.getOriginalJson(stockAnalysis) as StockProductData[];
    const days = this.getFilterDays();
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
  private getPlReportData(): PlReportDemoData {
    const generatedData = this.generatePlReportData();
    return { data: generatedData };
  }

  // Генератор данных для P&L отчета
  private generatePlReportData() {
    const filters = store.getState().filters;
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

      // Добавляем колонку года с сумарными данными
      result.push({
        year: year,
        data: this.generateYearPlData(),
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
  private generateYearPlData() {
    const baseMultiplier = this.generateRandomPercent(0.8, 1);

    return {
      realization: {
        rub: this.generateRandomAmount(1200000, 1800000) * baseMultiplier,
        percent: this.generateRandomPercent(65, 75)
      },
      mp_discount: {
        rub: this.generateRandomAmount(360000, 600000) * baseMultiplier,
        percent: this.generateRandomPercent(20, 30)
      },
      sales: {
        rub: this.generateRandomAmount(1680000, 2400000) * baseMultiplier,
        percent: 100
      },
      direct_expenses: {
        cost: {
          rub: this.generateRandomAmount(6000, 12000) * baseMultiplier,
          percent: this.generateRandomPercent(0.3, 0.7)
        },
        logistic: {
          rub: this.generateRandomAmount(180000, 240000) * baseMultiplier,
          percent: this.generateRandomPercent(10, 15)
        },
        commission: {
          rub: this.generateRandomAmount(360000, 480000) * baseMultiplier,
          percent: this.generateRandomPercent(20, 25)
        },
        penalties: {
          rub: this.generateRandomAmount(600, 1200) * baseMultiplier,
          percent: this.generateRandomPercent(0.02, 0.1)
        },
        storage: {
          rub: this.generateRandomAmount(6000, 18000) * baseMultiplier,
          percent: this.generateRandomPercent(0.3, 1.0)
        },
        advert: {
          rub: this.generateRandomAmount(720000, 960000) * baseMultiplier,
          percent: this.generateRandomPercent(40, 50)
        },
        other_retentions: {
          rub: this.generateRandomAmount(720000, 960000) * baseMultiplier,
          percent: this.generateRandomPercent(40, 50)
        },
        paid_acceptance: {
          rub: this.generateRandomAmount(1200, 3600) * baseMultiplier,
          percent: this.generateRandomPercent(0.05, 0.2)
        },
        total_expenses: {
          rub: this.generateRandomAmount(1440000, 1920000) * baseMultiplier,
          percent: this.generateRandomPercent(80, 90)
        }
      },
      compensation: {
        rub: this.generateRandomAmount(600, 1800) * baseMultiplier,
        percent: this.generateRandomPercent(0.03, 0.1)
      },
      gross_margin: {
        rub: this.generateRandomAmount(1560000, 2280000) * baseMultiplier,
        percent: this.generateRandomPercent(90, 98)
      },
      operating_expenses: null,
      operating_profit: {
        rub: this.generateRandomAmount(180000, 420000) * baseMultiplier,
        percent: this.generateRandomPercent(10, 20)
      },
      ebitda: {
        rub: this.generateRandomAmount(180000, 420000) * baseMultiplier,
        percent: this.generateRandomPercent(10, 20)
      },
      ebitda_margin: this.generateRandomPercent(10, 20),
      tax: {
        rub: this.generateRandomAmount(36000, 72000) * baseMultiplier,
        percent: this.generateRandomPercent(2, 4)
      },
      net_profit: {
        rub: this.generateRandomAmount(600000, 960000) * baseMultiplier,
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
          rub: this.generateRandomAmount(80000, 200000) * baseMultiplier,
          percent: this.generateRandomPercent(60, 80)
        },
        mp_discount: {
          rub: this.generateRandomAmount(20000, 60000) * baseMultiplier,
          percent: this.generateRandomPercent(15, 35)
        },
        sales: {
          rub: this.generateRandomAmount(120000, 250000) * baseMultiplier,
          percent: 100
        },
        direct_expenses: {
          cost: {
            rub: this.generateRandomAmount(500, 1500) * baseMultiplier,
            percent: this.generateRandomPercent(0.3, 0.8)
          },
          logistic: {
            rub: this.generateRandomAmount(10000, 25000) * baseMultiplier,
            percent: this.generateRandomPercent(8, 15)
          },
          commission: {
            rub: this.generateRandomAmount(25000, 50000) * baseMultiplier,
            percent: this.generateRandomPercent(15, 30)
          },
          penalties: {
            rub: this.generateRandomAmount(100, 2000) * baseMultiplier,
            percent: this.generateRandomPercent(0.01, 0.15)
          },
          storage: {
            rub: this.generateRandomAmount(500, 2000) * baseMultiplier,
            percent: this.generateRandomPercent(0.3, 1.5)
          },
          advert: {
            rub: this.generateRandomAmount(50000, 150000) * baseMultiplier,
            percent: this.generateRandomPercent(30, 80)
          },
          other_retentions: {
            rub: this.generateRandomAmount(50000, 150000) * baseMultiplier,
            percent: this.generateRandomPercent(30, 80)
          },
          paid_acceptance: {
            rub: this.generateRandomAmount(100, 800) * baseMultiplier,
            percent: this.generateRandomPercent(0.05, 0.5)
          },
          total_expenses: {
            rub: this.generateRandomAmount(100000, 200000) * baseMultiplier,
            percent: this.generateRandomPercent(70, 120)
          }
        },
        compensation: {
          rub: this.generateRandomAmount(500, 5000) * baseMultiplier,
          percent: this.generateRandomPercent(0.01, 0.3)
        },
        gross_margin: {
          rub: this.generateRandomAmount(110000, 240000) * baseMultiplier,
          percent: this.generateRandomPercent(85, 98)
        },
        operating_expenses: null,
        operating_profit: {
          rub: this.generateRandomAmount(-50000, 150000) * baseMultiplier,
          percent: this.generateRandomPercent(-40, 70)
        },
        ebitda: {
          rub: this.generateRandomAmount(-50000, 150000) * baseMultiplier,
          percent: this.generateRandomPercent(-40, 70)
        },
        ebitda_margin: this.generateRandomPercent(-40, 70),
        tax: {
          rub: this.generateRandomAmount(2000, 8000) * baseMultiplier,
          percent: this.generateRandomPercent(1.5, 4)
        },
        net_profit: {
          rub: this.generateRandomAmount(30000, 120000) * baseMultiplier,
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
  private getWeeklyReportData(): WeeklyReportDemoData {
    const weeklyData = weeklyReportData as any[];
    const baseData = weeklyData[0]; // Берем базовые данные для генерации
    const filters = store.getState().filters;
    let activeWeeks = filters.activeWeeks || [];

    if (activeWeeks.length === 0) {
      return { 
        data: [{weeks: [], year: new Date().getFullYear()}], 
        messsage: 'Success',
      };
    }
  
    // Получаем текущую дату и вычисляем количество недель от начала года
    const currentDate = new Date();
    const currentWeekNumber = this.getWeekNumber(currentDate);
    
    // Генерируем данные только для выбранных недель
    const dynamicWeeklyData = [];

    if (typeof activeWeeks === 'string') {
      activeWeeks = [{ value: activeWeeks }];
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
        const generatedData = this.generateRandomWeeklyData(baseData, weekNumber, currentWeekNumber);
        
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
  private generateRandomWeeklyData(baseData: any, weekNumber: number, currentWeek: number): any {
    // Функция для генерации случайного числа в диапазоне
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    
    // Функция для генерации случайного числа с вариацией от базового значения
    const randomVariation = (baseValue: number, variationPercent: number = 0.3) => {
      const variation = baseValue * variationPercent;
      return Math.max(0, baseValue + randomInRange(-variation, variation));
    };
    
    // Чем дальше от текущей недели, тем больше вариация
    const weeksDiff = currentWeek - weekNumber;
    const variationMultiplier = 1 + (weeksDiff * 0.1);
    
    return {
      revenue: {
        rub: Math.round(randomVariation(baseData.data.revenue.rub, 0.2 * variationMultiplier)),
        quantity: Math.round(randomVariation(baseData.data.revenue.quantity, 0.15 * variationMultiplier))
      },
      purchases: {
        rub: Math.round(randomVariation(baseData.data.purchases.rub, 0.25 * variationMultiplier)),
        quantity: Math.round(randomVariation(baseData.data.purchases.quantity, 0.2 * variationMultiplier))
      },
      return: {
        rub: Math.round(randomVariation(baseData.data.return.rub, 0.3 * variationMultiplier)),
        quantity: Math.round(randomVariation(baseData.data.return.quantity, 0.25 * variationMultiplier))
      },
      avg_check: Math.round(randomVariation(baseData.data.avg_check, 0.1 * variationMultiplier) * 100) / 100,
      purchase_percent: Math.round(randomVariation(baseData.data.purchase_percent, 0.15 * variationMultiplier) * 100) / 100,
      avg_spp: Math.round(randomVariation(baseData.data.avg_spp, 0.2 * variationMultiplier) * 100) / 100,
      cost_price: Math.round(randomVariation(baseData.data.cost_price, 0.3 * variationMultiplier)),
      cost_price_percent: Math.round(randomVariation(baseData.data.cost_price_percent, 0.2 * variationMultiplier) * 100) / 100,
      cost_price_per_one: Math.round(randomVariation(baseData.data.cost_price_per_one, 0.25 * variationMultiplier) * 100) / 100,
      deliveries: Math.round(randomVariation(baseData.data.deliveries, 0.2 * variationMultiplier)),
      payment: Math.round(randomVariation(baseData.data.payment, 0.2 * variationMultiplier) * 100) / 100,
      profit: Math.round(randomVariation(baseData.data.profit, 0.25 * variationMultiplier) * 100) / 100,
      profit_per_one: Math.round(randomVariation(baseData.data.profit_per_one, 0.2 * variationMultiplier) * 100) / 100,
      marginality: Math.round(randomVariation(baseData.data.marginality, 0.15 * variationMultiplier) * 100) / 100,
      return_on_investment: Math.round(randomVariation(baseData.data.return_on_investment, 0.2 * variationMultiplier) * 100) / 100,
      wb_commission: {
        rub: Math.round(randomVariation(baseData.data.wb_commission.rub, 0.15 * variationMultiplier) * 100) / 100,
        percent: Math.round(randomVariation(baseData.data.wb_commission.percent, 0.1 * variationMultiplier) * 100) / 100
      },
      acquiring: {
        rub: Math.round(randomVariation(baseData.data.acquiring.rub, 0.2 * variationMultiplier) * 100) / 100,
        percent: Math.round(randomVariation(baseData.data.acquiring.percent, 0.15 * variationMultiplier) * 100) / 100
      },
      logistics_straight: {
        rub: Math.round(randomVariation(baseData.data.logistics_straight.rub, 0.2 * variationMultiplier) * 100) / 100,
        percent: Math.round(randomVariation(baseData.data.logistics_straight.percent, 0.15 * variationMultiplier) * 100) / 100
      },
      logistics_reverse: {
        rub: Math.round(randomVariation(baseData.data.logistics_reverse.rub, 0.25 * variationMultiplier) * 100) / 100,
        percent: Math.round(randomVariation(baseData.data.logistics_reverse.percent, 0.2 * variationMultiplier) * 100) / 100
      },
      logistics_per_product: Math.round(randomVariation(baseData.data.logistics_per_product, 0.2 * variationMultiplier) * 100) / 100,
      logistics_total: {
        rub: Math.round(randomVariation(baseData.data.logistics_total.rub, 0.2 * variationMultiplier) * 100) / 100,
        percent: Math.round(randomVariation(baseData.data.logistics_total.percent, 0.15 * variationMultiplier) * 100) / 100
      },
      // Генерируем все avg_spp_rub_percent поля
      ...this.generateAvgSppPercentFields(baseData, variationMultiplier)
    };
  }

  // Генерация полей avg_spp_rub_percent (1-100)
  private generateAvgSppPercentFields(baseData: any, variationMultiplier: number): any {
    const fields: any = {};
    const baseValue = baseData.data.avg_spp_rub_percent || 0;
    
    for (let i = 1; i <= 100; i++) {
      const fieldName = `avg_spp_rub_percent_${i}`;
      const randomVariation = (baseValue: number, variationPercent: number) => {
        const variation = baseValue * variationPercent;
        return Math.max(0, baseValue + (Math.random() * variation * 2 - variation));
      };
      
      fields[fieldName] = Math.round(randomVariation(baseValue, 0.3 * variationMultiplier) * 100) / 100;
    }
    
    return fields;
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

  private getOriginalJson(json: any) {
    return JSON.parse(JSON.stringify(json));
  }
}
