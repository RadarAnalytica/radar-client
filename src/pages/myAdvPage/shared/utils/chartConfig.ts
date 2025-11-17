export interface ChartControlConfig {
  engName: string;
  ruName: string;
  color: string;
  isControlTooltip: boolean;
  controlTooltipText?: string;
  hasUnits?: boolean;
  units?: string;
  isOnChart: boolean;
  isAnnotation: boolean;
  isControl: boolean;
  defaultActive: boolean;
}

export const chartCompareConfigObject: ChartControlConfig[] = [
  { 
    engName: 'views', 
    ruName: 'Просмотры', 
    color: '#5329FF', 
    isControlTooltip: false, 
    hasUnits: false, 
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'clicks', 
    ruName: 'Клики', 
    color: '#F0AD00', 
    isControlTooltip: false, 
    hasUnits: false, 
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'cart', 
    ruName: 'Корзина', 
    color: '#00B69B', 
    isControlTooltip: false, 
    hasUnits: false, 
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'orders', 
    ruName: 'Заказы', 
    color: '#F93C65', 
    isControlTooltip: false, 
    hasUnits: false, 
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
];

