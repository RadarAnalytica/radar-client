import { DemoDataService } from './DemoDataService';
import { URL } from './config';

// Получение текущего пользователя из контекста
const getCurrentUser = () => {
  try {
    // Пытаемся получить из localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    
    // Или из cookie
    const cookies = document.cookie.split(';');
    const radarCookie = cookies.find(cookie => cookie.trim().startsWith('radar='));
    
    if (radarCookie) {
      const token = radarCookie.split('=')[1];
      if (token && token !== 'undefined') {
        // Декодируем JWT токен для получения информации о пользователе
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload;
        } catch (e) {
          console.warn('Error decoding token:', e);
        }
      }
    }
  } catch (error) {
    console.warn('Error getting user data:', error);
  }
  
  return null;
};

// Создание mock Response для демо-данных
const createMockResponse = (data: any) => {
  const mockResponse = new Response(JSON.stringify(data), {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  (mockResponse as any).isDemo = true;
  return mockResponse;
};

// Основная функция обертки над fetch
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const user = getCurrentUser();

  // Проверяем, находится ли пользователь в демо-режиме
  if (user?.subscription_status === null) {
    const demoService = DemoDataService.getInstance();
    const demoData = demoService.getDataForEndpoint(endpoint);

    if (demoData?.data) {
      return createMockResponse(demoData.data);
    }
    
    // Если нет демо-данных для этого эндпоинта, возвращаем ошибку
    return createMockResponse({
      success: false,
      message: 'Demo data not available for this endpoint',
      isDemo: true
    });
  }

  // Выполняем реальный запрос
  return fetch(`${URL}${endpoint}`, options);
};