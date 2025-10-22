interface ControlDataItem {
  date: string;
  percentage: number;
}

interface ProductData {
  name: string;
  wb_id: number;
  vendor_code: string;
  barcode: string;
  brand: string;
  category: string;
  photo: string;
}

interface WbMetricsData {
  data: {
    product: ProductData;
    control_data: ControlDataItem[];
  }[];
  min_control_value: number;
  max_control_value: number;
  page: number;
  per_page: number;
  total_count: number;
}

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

const sampleProducts: ProductData[] = [
  {
    name: "Смартфон Samsung Galaxy A54 5G 128GB",
    wb_id: 123456789,
    vendor_code: "SM-A546B",
    barcode: "8806094567890",
    brand: "Samsung",
    category: "Смартфоны",
    photo: "https://images.wbstatic.net/images/c516x688/new/123456789/1.jpg"
  },
  {
    name: "Наушники Apple AirPods Pro 2",
    wb_id: 987654321,
    vendor_code: "AP-PRO-2",
    barcode: "194253000000",
    brand: "Apple",
    category: "Аудио",
    photo: "https://images.wbstatic.net/images/c516x688/new/987654321/1.jpg"
  },
  {
    name: "Ноутбук ASUS VivoBook 15 X515EA",
    wb_id: 456789123,
    vendor_code: "X515EA-BQ1234",
    barcode: "4712900000000",
    brand: "ASUS",
    category: "Ноутбуки",
    photo: "https://images.wbstatic.net/images/c516x688/new/456789123/1.jpg"
  },
  {
    name: "Кроссовки Nike Air Max 270",
    wb_id: 789123456,
    vendor_code: "AH8050-100",
    barcode: "194253000000",
    brand: "Nike",
    category: "Обувь",
    photo: "https://images.wbstatic.net/images/c516x688/new/789123456/1.jpg"
  },
  {
    name: "Кофемашина De'Longhi Magnifica S",
    wb_id: 321654987,
    vendor_code: "ECAM22.110.SB",
    barcode: "8004395000000",
    brand: "De'Longhi",
    category: "Бытовая техника",
    photo: "https://images.wbstatic.net/images/c516x688/new/321654987/1.jpg"
  },
  {
    name: "Планшет iPad Air 5 64GB",
    wb_id: 555666777,
    vendor_code: "IPAD-AIR-5",
    barcode: "194253000001",
    brand: "Apple",
    category: "Планшеты",
    photo: "https://images.wbstatic.net/images/c516x688/new/555666777/1.jpg"
  },
  {
    name: "Умные часы Apple Watch Series 9",
    wb_id: 111222333,
    vendor_code: "AW-S9-45MM",
    barcode: "194253000002",
    brand: "Apple",
    category: "Умные часы",
    photo: "https://images.wbstatic.net/images/c516x688/new/111222333/1.jpg"
  },
  {
    name: "Игровая консоль PlayStation 5",
    wb_id: 444555666,
    vendor_code: "PS5-STD",
    barcode: "711719000000",
    brand: "Sony",
    category: "Игровые консоли",
    photo: "https://images.wbstatic.net/images/c516x688/new/444555666/1.jpg"
  },
  {
    name: "Телевизор LG OLED 55\"",
    wb_id: 777888999,
    vendor_code: "OLED55C3",
    barcode: "8806094567891",
    brand: "LG",
    category: "Телевизоры",
    photo: "https://images.wbstatic.net/images/c516x688/new/777888999/1.jpg"
  },
  {
    name: "Холодильник Bosch KGN39VLE0R",
    wb_id: 333444555,
    vendor_code: "KGN39VLE0R",
    barcode: "4242000000000",
    brand: "Bosch",
    category: "Бытовая техника",
    photo: "https://images.wbstatic.net/images/c516x688/new/333444555/1.jpg"
  }
];

export const generateMockData = (metricType: 'drr' | 'spp', page: number = 1, perPage: number = 20): WbMetricsData => {
  const dates = generateDateRange(30);
  
  // Для ДРР: диапазон от 0% до 50%
  // Для СПП: диапазон от 0% до 30%
  const minValue = 0;
  const maxValue = metricType === 'drr' ? 50 : 30;
  
  // Генерируем данные для текущей страницы
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, 150); // 150 - общее количество товаров
  
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
    page,
    per_page: perPage,
    total_count: 150 // Общее количество товаров
  };
};

export const generateMultipleMockData = (metricType: 'drr' | 'spp', count: number = 10): WbMetricsData[] => {
  const results: WbMetricsData[] = [];
  
  for (let i = 0; i < count; i++) {
    const dates = generateDateRange(30);
    const product = sampleProducts[i % sampleProducts.length];
    
    const minValue = 0;
    const maxValue = metricType === 'drr' ? 50 : 30;
    
    const controlData = generateControlData(dates, minValue, maxValue);
    
    results.push({
      data: [{
        product: {
          ...product,
          wb_id: product.wb_id + i,
          name: `${product.name} ${i + 1}`
        },
        control_data: controlData
      }],
      min_control_value: minValue,
      max_control_value: maxValue,
      page: 1,
      per_page: 20,
      total_count: count
    });
  }
  
  return results;
};
