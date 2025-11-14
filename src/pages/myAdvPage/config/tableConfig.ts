export const TABLE_CONFIG_VERSION = '1.0.0';
export const TABLE_CONFIG_STORAGE_KEY = 'myAdv_tableConfig';

export interface ColumnConfig {
  key: string;
  title: string;
  dataIndex: string;
  width: number;
  minWidth?: number;
  fixed?: boolean;
  sortable: boolean;
  hidden: boolean;
  canToggle?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableConfigData {
  version: string;
  columns: ColumnConfig[];
}

export const getDefaultTableConfig = (): ColumnConfig[] => {
  const columns: ColumnConfig[] = [
    {
      key: 'company',
      title: 'Компания',
      dataIndex: 'company',
      width: 200,
      fixed: true,
      sortable: true,
      hidden: false,
      canToggle: false,
      align: 'left',
    },
    {
      key: 'status_wb',
      title: 'Статус WB',
      dataIndex: 'status_wb',
      width: 120,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'center',
    },
    {
      key: 'company_type',
      title: 'Тип компании',
      dataIndex: 'company_type',
      width: 140,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'left',
    },
    {
      key: 'cart',
      title: 'Корзина',
      dataIndex: 'cart',
      width: 100,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'orders',
      title: 'Заказы',
      dataIndex: 'orders',
      width: 100,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'ordered_qty',
      title: 'Заказано, шт',
      dataIndex: 'ordered_qty',
      width: 130,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'forecast_purchase_qty',
      title: 'Прогноз выкуп, шт',
      dataIndex: 'forecast_purchase_qty',
      width: 150,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'views_to_click',
      title: 'Просмотры -> Клик (CTR)',
      dataIndex: 'views_to_click',
      width: 180,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'click_to_cart',
      title: 'Клик -> Корзина',
      dataIndex: 'click_to_cart',
      width: 140,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'cart_to_order',
      title: 'Корзина -> Заказ',
      dataIndex: 'cart_to_order',
      width: 140,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'view_to_order',
      title: 'Просмотр -> Заказ',
      dataIndex: 'view_to_order',
      width: 150,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'forecast_order_to_purchase',
      title: 'Прогноз Заказ -> Выкуп',
      dataIndex: 'forecast_order_to_purchase',
      width: 180,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'forecast_click_to_purchase',
      title: 'Прогноз Клик -> Выкуп',
      dataIndex: 'forecast_click_to_purchase',
      width: 180,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'views',
      title: 'Просмотры',
      dataIndex: 'views',
      width: 120,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'clicks',
      title: 'Клики',
      dataIndex: 'clicks',
      width: 100,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'cpc',
      title: 'CPC',
      dataIndex: 'cpc',
      width: 100,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'avg_crm',
      title: 'Средний CRM за период',
      dataIndex: 'avg_crm',
      width: 180,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'avg_position',
      title: 'Средняя позиция',
      dataIndex: 'avg_position',
      width: 140,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'drr_orders',
      title: 'ДРР заказы',
      dataIndex: 'drr_orders',
      width: 120,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'forecast_drr_purchase',
      title: 'Прогноз ДРР (по выкупу)',
      dataIndex: 'forecast_drr_purchase',
      width: 200,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'cpcart',
      title: 'CPCart',
      dataIndex: 'cpcart',
      width: 100,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'forecast_cps',
      title: 'Прогноз CPS',
      dataIndex: 'forecast_cps',
      width: 130,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'orders_sum',
      title: 'Заказов на сумму',
      dataIndex: 'orders_sum',
      width: 160,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'forecast_purchase_sum',
      title: 'Прогноз выкуп на сумму',
      dataIndex: 'forecast_purchase_sum',
      width: 200,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
    {
      key: 'advertising_costs',
      title: 'Расходы на рекламу',
      dataIndex: 'advertising_costs',
      width: 180,
      sortable: true,
      hidden: false,
      canToggle: true,
      align: 'right',
    },
  ].map(_ => ({ ..._, key: _.dataIndex, maxWidth: _.width * 2, minWidth: _.width || 100 }));

  return columns;
};

export const getTableConfigStorageKey = () => TABLE_CONFIG_STORAGE_KEY;

export const saveTableConfig = (columns: ColumnConfig[]): void => {
  try {
    const configData: TableConfigData = {
      version: TABLE_CONFIG_VERSION,
      columns,
    };
    localStorage.setItem(getTableConfigStorageKey(), JSON.stringify(configData));
  } catch (error) {
    console.error('Error saving table config:', error);
  }
};

export const loadTableConfig = (): ColumnConfig[] | null => {
  try {
    const savedData = localStorage.getItem(getTableConfigStorageKey());
    if (!savedData) return null;
    const configData: TableConfigData = JSON.parse(savedData);
    if (configData.version !== TABLE_CONFIG_VERSION) {
      localStorage.removeItem(getTableConfigStorageKey());
      return null;
    }
    return configData.columns;
  } catch (error) {
    console.error('Error loading table config:', error);
    return null;
  }
};

export const mergeTableConfig = (
  defaultColumns: ColumnConfig[],
  savedColumns: ColumnConfig[] | null
): ColumnConfig[] => {
  if (!savedColumns) return defaultColumns;

  // Создаем Map для быстрого доступа к сохраненным настройкам
  const savedMap = new Map(savedColumns.map(col => [col.key, col]));

  // Применяем сохраненные настройки видимости к дефолтным колонкам
  return defaultColumns.map(col => {
    const saved = savedMap.get(col.key);
    if (saved && col.canToggle) {
      // Применяем только настройку hidden для колонок, которые можно переключать
      return { ...col, hidden: saved.hidden };
    }
    return col;
  });
};

