import { DemoDataService } from './DemoDataService';

// sku analysis imports
import skuAnalysisMetaData from './mock/sku-analysis/product-meta.json';
import skuAnalysisIndicatorsData from './mock/sku-analysis/indicators.json';
import skuAnalysisChartsData from './mock/sku-analysis/charts.json';
import skuAnalysisByDateData from './mock/sku-analysis/by-date.json';
import skuAnalysisByColorData from './mock/sku-analysis/by-color.json';
import skuAnalysisByWarehouseData from './mock/sku-analysis/by-warehouse.json';
import skuAnalysisBySizeData from './mock/sku-analysis/by-size.json';

export class SkuAnalysisDemoDataService extends DemoDataService {
  private static skuInstance: SkuAnalysisDemoDataService;

  protected constructor() {
    super();
  }

  public static getInstance(): SkuAnalysisDemoDataService {
    if (!SkuAnalysisDemoDataService.skuInstance) {
      SkuAnalysisDemoDataService.skuInstance = new SkuAnalysisDemoDataService();
    }
    return SkuAnalysisDemoDataService.skuInstance;
  }

  // Переопределяем метод для обработки sku analysis маршрутов
  public getDataForEndpoint(endpoint: string, filters?: any, options?: any): any {
    endpoint = endpoint.split('?')[0];

    if (!endpoint) {
      console.error('SkuAnalysisDemoDataService: No endpoint provided');
      return null;
    }

    // Пробуем точное совпадение для sku analysis маршрутов
    const exactMatch = this.getExactMatch(endpoint, filters);
    if (exactMatch) {
      return exactMatch;
    }

    // Если маршрут не найден, возвращаем null
    return null;
  }

  // Переопределяем метод для обработки sku analysis маршрутов
  protected getExactMatch(endpoint: string, filters?: any): any {
    const endpointMap: Record<string, () => any> = {
      // sku analysis routes
      'https://radarmarket.ru/api/web-service/product-analysis/product-meta': () => skuAnalysisMetaData,
      'https://radarmarket.ru/api/web-service/product-analysis/indicators': () => skuAnalysisIndicatorsData,
      'https://radarmarket.ru/api/web-service/product-analysis/charts': () => skuAnalysisChartsData,
      'https://radarmarket.ru/api/web-service/product-analysis/table/by-date': () => skuAnalysisByDateData,
      'https://radarmarket.ru/api/web-service/product-analysis/table/by-color': () => skuAnalysisByColorData,
      'https://radarmarket.ru/api/web-service/product-analysis/table/by-warehouse': () => skuAnalysisByWarehouseData,
      'https://radarmarket.ru/api/web-service/product-analysis/table/by-size': () => skuAnalysisBySizeData,
    };

    const dataGetter = endpointMap[endpoint];
    if (dataGetter) {
      return this.createApiResponse(dataGetter());
    }

    return null;
  }
}

