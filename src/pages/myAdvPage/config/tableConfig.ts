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
      title: 'Компания',
      key: 'm01',
      hidden: false,
      fixed: true,
      groupColor: 'white',
      children: [
          {title: 'Компания', dataIndex: 'company_name', sortable: true, fixed: true, width: 260},
          {title: 'Статус WB', dataIndex: 'company_status', sortable: true, fixed: true, width: 200},
          {title: 'Тип компании', dataIndex: 'company_type', sortable: true, fixed: true, width: 100},
      ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width }))
    },
    {
      title: 'Рекламная воронка',
      key: 'm02',
      hidden: false,
      fixed: false,
      groupColor: 'white',
      children: [
          {title: 'Корзина', dataIndex: 'cart', sortable: true, fixed: false, width: 200},
          {title: 'Заказы', dataIndex: 'orders', sortable: true, fixed: false, width: 200},
          {title: 'Заказано, шт', dataIndex: 'order_item_count', units: 'шт', sortable: true, fixed: false, width: 200},
          {title: 'Прогноз выкуп, шт', dataIndex: 'expected_purchase', units: 'шт', sortable: true, fixed: false, width: 200},
          {title: 'Просмотры -> Клик (CTR)', dataIndex: 'view_click', sortable: true, fixed: false, width: 200},
          {title: 'Клик -> Корзина', dataIndex: 'click_cart', sortable: true, fixed: false, width: 200},
          {title: 'Корзина -> Заказ', dataIndex: 'cart_order', sortable: true, fixed: false, width: 200},
          {title: 'Заказ -> Выкуп', dataIndex: 'order_purchase', sortable: true, fixed: false, width: 200},
          {title: 'Заказ -> Выкуп', dataIndex: 'expected_order_purchase', sortable: true, fixed: false, width: 200},
          {title: 'Клик -> Выкуп', dataIndex: 'expected_click_purchase', sortable: true, fixed: false, width: 200},
      ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
    },
    {
      title: 'Рекламная статистика',
      key: 'm03',
      hidden: false,
      fixed: false,
      groupColor: 'white',
      children: [
          {title: 'Просмотры', dataIndex: 'views', sortable: true, fixed: false, width: 200},
          {title: 'Клики', dataIndex: 'clicks', sortable: true, fixed: false, width: 200},
          {title: 'CPC', dataIndex: 'cpc', sortable: true, fixed: false, width: 200},
          {title: 'CPM', dataIndex: 'cpm', sortable: true, fixed: false, width: 200},
          {title: 'Средняя позиция', dataIndex: 'avg_position', sortable: true, fixed: false, width: 200},
          {title: 'ДРР заказы', dataIndex: 'drr_orders', sortable: true, fixed: false, width: 200},
          {title: 'Прогноз ДРР (по выкупу)', dataIndex: 'forecast_drr_purchase', sortable: true, fixed: false, width: 200},
          {title: 'CPCart', dataIndex: 'cpcart', sortable: true, fixed: false, width: 200},
          {title: 'Прогноз CPS', dataIndex: 'forecast_cps', sortable: true, fixed: false, width: 200},
          {title: 'Заказов на сумму', dataIndex: 'orders_sum', sortable: true, fixed: false, width: 200},
          {title: 'Прогноз выкуп на сумму', dataIndex: 'forecast_purchase_sum', sortable: true, fixed: false, width: 200},
          {title: 'Расходы на рекламу', dataIndex: 'advertising_costs', sortable: true, fixed: false, width: 200},
      ].map(_ => ({ ..._, render: _.render?.bind(_), key: _.dataIndex, minWidth: _.width }))
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

