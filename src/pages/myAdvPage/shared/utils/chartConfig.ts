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
  // advert_statistics метрики
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
    engName: 'cpc', 
    ruName: 'CPC', 
    color: '#8B5CF6', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '₽',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'avg_cpm', 
    ruName: 'Средний CPM', 
    color: '#A855F7', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '₽',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'avg_position', 
    ruName: 'Средняя позиция', 
    color: '#C084FC', 
    isControlTooltip: false, 
    hasUnits: false, 
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'drr_orders', 
    ruName: 'DRR заказов', 
    color: '#D8B4FE', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '%',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'drr_purchase', 
    ruName: 'DRR выкупа', 
    color: '#E9D5FF', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '%',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'cp_cart', 
    ruName: 'CP корзины', 
    color: '#F3E8FF', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '₽',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'expected_cps', 
    ruName: 'Прогноз CPS', 
    color: '#ADADAD', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '₽',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'orders_amount', 
    ruName: 'Сумма заказов', 
    color: '#6366F1', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '₽',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'expected_purchase_amount', 
    ruName: 'Прогноз суммы выкупа', 
    color: '#FFDC89', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '₽',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'ad_spend', 
    ruName: 'Расход на рекламу', 
    color: '#C7D61E', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '₽',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  // advert_funnel метрики
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
  { 
    engName: 'order_item_count', 
    ruName: 'Количество товаров в заказах', 
    color: '#EC4899', 
    isControlTooltip: false, 
    hasUnits: false, 
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'expected_purchase', 
    ruName: 'Прогноз выкупа', 
    color: '#90DAFF', 
    isControlTooltip: false, 
    hasUnits: false, 
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'view_click', 
    ruName: 'Просмотры → Клики', 
    color: '#10B981', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '%',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'click_cart', 
    ruName: 'Клики → Корзина', 
    color: '#059669', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '%',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'cart_order', 
    ruName: 'Корзина → Заказы', 
    color: '#FFA1EB', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '%',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'view_order', 
    ruName: 'Просмотры → Заказы', 
    color: '#065F46', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '%',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'expected_order_purchase', 
    ruName: 'Прогноз заказов → Выкуп', 
    color: '#88E473', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '%',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
  { 
    engName: 'expected_click_purchase', 
    ruName: 'Прогноз кликов → Выкуп', 
    color: '#022C22', 
    isControlTooltip: false, 
    hasUnits: true, 
    units: '%',
    isOnChart: true, 
    isAnnotation: false, 
    isControl: true, 
    defaultActive: true 
  },
];

