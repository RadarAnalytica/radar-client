export const TABLE_CONFIG_VERSION = '1.0.3';
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
      title: 'О кампании',
      key: 'm01',
      hidden: false,
      fixed: true,
      groupColor: 'white',
      children: [
          {title: 'Название кампании', dataIndex: 'company_name', sortable: false, fixed: true, width: 240},
          {title: 'Статус WB', dataIndex: 'company_status', sortable: false, fixed: true, width: 100},
          {title: 'Тип кампании', dataIndex: 'company_type', sortable: false, fixed: true, width: 100},
      ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width }))
    },
    {
      title: 'Рекламная воронка',
      key: 'm02',
      hidden: false,
      fixed: false,
      groupColor: 'white',
      children: [
          {title: 'Корзина', dataIndex: 'cart', sortable: true, fixed: false, canToggle: false, width: 120},
          {title: 'Заказы', dataIndex: 'orders', sortable: true, fixed: false, canToggle: false, width: 120},
          {title: 'Заказано, шт', dataIndex: 'order_item_count', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Прогноз выкуп, шт', dataIndex: 'expected_purchase', sortable: true, fixed: false, canToggle: true, width: 200},
          {title: 'Просмотры → Клик (CTR)', dataIndex: 'view_click', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Клик → Корзина', dataIndex: 'click_cart', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Корзина → Заказ', dataIndex: 'cart_order', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Просмотр → Заказ', dataIndex: 'view_order', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Прогноз Заказ → Выкуп', dataIndex: 'expected_order_purchase', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Прогноз Клик → Выкуп', dataIndex: 'expected_click_purchase', sortable: true, fixed: false, canToggle: true, width: 120},
      ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width }))
    },
    {
      title: 'Рекламная статистика',
      key: 'm03',
      hidden: false,
      fixed: false,
      groupColor: 'white',
      children: [
          {title: 'Просмотры', dataIndex: 'views', sortable: true, fixed: false, canToggle: false, width: 120},
          {title: 'Клики', dataIndex: 'clicks', sortable: true, fixed: false, canToggle: false, width: 120},
          {title: 'CPC', dataIndex: 'cpc', sortable: true, fixed: false, canToggle: true, width: 120}, 
          {title: 'Средний CPM за период', dataIndex: 'avg_cpm', sortable: true, fixed: false, canToggle: true, width: 120},
          // {title: 'Средняя позиция', dataIndex: 'avg_position', sortable: true, fixed: false, width: 120},
          {title: 'ДРР заказы', dataIndex: 'drr_orders', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Прогноз ДРР (по выкупу)', dataIndex: 'drr_purchase', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'CPCart', dataIndex: 'cp_cart', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Прогноз CPS', dataIndex: 'expected_cps', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Заказов на сумму', dataIndex: 'orders_amount', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Прогноз выкуп на сумму', dataIndex: 'expected_purchase_amount', sortable: true, fixed: false, canToggle: true, width: 120},
          {title: 'Расходы на рекламу', dataIndex: 'ad_spend', sortable: true, fixed: false, canToggle: true, width: 120},
      ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width, className: 'myAdvTableGroupCell' }))
    },
  ].map(_ => ({ ..._, colSpan: _?.children?.length || 1 }));

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

