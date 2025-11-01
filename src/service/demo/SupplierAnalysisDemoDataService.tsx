import { DemoDataService } from './DemoDataService';

// supplier analysis imports
import supplierAnalysisMetaData from './mock/supplier-analysis/supplier-meta.json';
import supplierAnalysisIndicatorsData from './mock/supplier-analysis/supplier-indicators.json';
import supplierAnalysisChartsData from './mock/supplier-analysis/supplier-charts.json';
import supplierAnalysisByDateData from './mock/supplier-analysis/supplier-by-date.json';
import supplierAnalysisBySubjectData from './mock/supplier-analysis/supplier-by-subject.json';
import supplierAnalysisByWarehouseData from './mock/supplier-analysis/supplier-by-warehouse.json';
import supplierAnalysisByProductData from './mock/supplier-analysis/supplier-by-product.json';
import supplierAnalysisBySizeData from './mock/supplier-analysis/supplier-by-size.json';
import supplierAnalysisRevenueData from './mock/supplier-analysis/revenue.json';
import supplierAnalysisOrdersData from './mock/supplier-analysis/orders.json';
import supplierAnalysisAvgPriceData from './mock/supplier-analysis/avg-price.json';
import supplierAnalysisAvgDiscountData from './mock/supplier-analysis/avg-discount.json';
import supplierAnalysisStockQuantityData from './mock/supplier-analysis/stock-quantity.json';
import supplierAnalysisBrandsData from './mock/supplier-analysis/supplier-brands.json';

export class SupplierAnalysisDemoDataService extends DemoDataService {
  private static supplierInstance: SupplierAnalysisDemoDataService;

  protected constructor() {
    super();
  }

  public static getInstance(): SupplierAnalysisDemoDataService {
    if (!SupplierAnalysisDemoDataService.supplierInstance) {
      SupplierAnalysisDemoDataService.supplierInstance = new SupplierAnalysisDemoDataService();
    }
    return SupplierAnalysisDemoDataService.supplierInstance;
  }

  // Переопределяем метод для обработки supplier analysis маршрутов
  public getDataForEndpoint(endpoint: string, filters?: any, options?: any): any {
    endpoint = endpoint.split('?')[0];

    if (!endpoint) {
      console.error('SupplierAnalysisDemoDataService: No endpoint provided');
      return null;
    }

    // Получаем request object (body) из options
    const requestObject = this.getRequestObject(options);
    console.log('requestObject', endpoint, requestObject);

    // Пробуем точное совпадение для supplier analysis маршрутов
    const exactMatch = this.getExactMatch(endpoint, filters, requestObject);
    if (exactMatch) {
      return exactMatch;
    }

    // Если маршрут не найден, возвращаем null
    return null;
  }

  // Переопределяем метод для обработки supplier analysis маршрутов
  protected getExactMatch(endpoint: string, filters?: any, requestObject?: any): any {
    const endpointMap: Record<string, () => any> = {
      // supplier analysis routes
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-meta': () => supplierAnalysisMetaData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-indicators': () => supplierAnalysisIndicatorsData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-charts': () => supplierAnalysisChartsData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-date': () => supplierAnalysisByDateData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-subject': () => this.getSupplierDataBySubjects(requestObject),
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-warehouse': () => supplierAnalysisByWarehouseData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-product': () => this.getSupplierDataByProducts(requestObject),
      'https://radarmarket.ru/api/web-service/supplier-analysis/comparison/revenue': () => supplierAnalysisRevenueData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/comparison/orders': () => supplierAnalysisOrdersData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/comparison/avg-price': () => supplierAnalysisAvgPriceData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/comparison/avg-discount': () => supplierAnalysisAvgDiscountData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/comparison/stock-quantity': () => supplierAnalysisStockQuantityData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-by-size': () => supplierAnalysisBySizeData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/supplier-brands': () => supplierAnalysisBrandsData,
      'https://radarmarket.ru/api/web-service/supplier-analysis/comparison/warehouse-quantity': () => [],
    };

    const dataGetter = endpointMap[endpoint];
    if (dataGetter) {
      return this.createApiResponse(dataGetter());
    }

    return null;
  }

  private getSupplierDataByProducts(requestObject?: any): any {
    if (requestObject?.sorting) {
      supplierAnalysisByProductData.goods.sort((a, b) => {
        return a[requestObject.sorting.field] > b[requestObject.sorting.field] ? 1 : -1;
      });
    }
    if (requestObject?.brands?.length > 0) {
      const brand = supplierAnalysisBrandsData.find((brand: any) => (brand.brand_id === requestObject.brands[0]));
      if (brand) {
        supplierAnalysisByProductData.goods = supplierAnalysisByProductData.goods.filter((good: any) => good.brand_name === brand.brand_name);
      }
    }
    return supplierAnalysisByProductData;
  }

  private getSupplierDataBySubjects(requestObject?: any): any {
    if (requestObject?.sorting) {
      supplierAnalysisBySubjectData.subjects.sort((a, b) => {
        return a[requestObject.sorting.field] > b[requestObject.sorting.field] ? 1 : -1;
      });
    }
    return supplierAnalysisBySubjectData;
  }
}

