import { DemoDataService } from './DemoDataService';

// sku analysis imports
import positionCheckMetaData from './mock/position-check/positionCheckMetaData.json';
import positionCheckMainData from './mock/position-check/positionCheckMainData.json';
import positionCheckSearchMapData from './mock/position-check/positionCheckSearchMap.json';
export class PositionCheckDemoDataService extends DemoDataService {
  private static positionCheckInstance: PositionCheckDemoDataService;

  protected constructor() {
    super();
  }

  public static getInstance(): PositionCheckDemoDataService {
    if (!PositionCheckDemoDataService.positionCheckInstance) {
      PositionCheckDemoDataService.positionCheckInstance = new PositionCheckDemoDataService();
    }
    return PositionCheckDemoDataService.positionCheckInstance;
  }

  // Переопределяем метод для обработки position check маршрутов
  public getDataForEndpoint(endpoint: string, filters?: any, options?: any): any {
    if (!endpoint) {
      console.error('PositionCheckDemoDataService: No endpoint provided');
      return null;
    }

    //проверяем по маске
    const endpointCheck = /^https:\/\/radarmarket\.ru\/api\/web-service\/position-track\/meta\/.+$/i.test(endpoint);
    if (endpointCheck) {
      endpoint = 'https://radarmarket.ru/api/web-service/position-track/meta';
    }


    // Проверяем по endpointMap
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
      'https://radarmarket.ru/api/web-service/position-track/meta': () => positionCheckMetaData,
      'https://radarmarket.ru/api/web-service/position-track/get-position-track': () => positionCheckMainData,
      'https://radarmarket.ru/api/web-service/position-track/search-map': () => positionCheckSearchMapData,
    };

    const dataGetter = endpointMap[endpoint];
    if (dataGetter) {
      return this.createApiResponse(dataGetter());
    }

    return null;
  }
}

