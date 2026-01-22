export const TABLE_CONFIG_VERSION = '1.0.7';
export const TABLE_CONFIG_STORAGE_KEY = 'wbMetrics_tableConfig';

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

export const getDefaultTableConfig = (controlData?: any[]): ColumnConfig[] => {
  const baseColumns: ColumnConfig[] = [
    {
      key: 'product',
      title: 'Товар',
      dataIndex: 'product',
      width: 280,
      fixed: true,
      sortable: false,
      hidden: false,
      canToggle: false,
    },
    {
      key: 'vendor_code',
      title: 'Артикул',
      dataIndex: 'vendor_code',
      width: 250,
      sortable: false,
      hidden: false,
      canToggle: true,
    },
    {
      key: 'barcode',
      title: 'SKU',
      dataIndex: 'barcode',
      width: 150,
      sortable: false,
      hidden: false,
      canToggle: true,
    },
    {
      key: 'brand',
      title: 'Бренд',
      dataIndex: 'brand',
      width: 150,
      sortable: false,
      hidden: false,
      canToggle: true,
    },
    {
      key: 'category',
      title: 'Категория',
      dataIndex: 'category',
      width: 150,
      sortable: false,
      hidden: false,
      canToggle: true,
    },
    {
      key: 'chart',
      title: 'Динамика',
      dataIndex: 'chart',
      width: 150,
      sortable: false,
      hidden: false,
      canToggle: false,
      className: 'chart-column',
    },
  ].map(_ => ({ ..._, key: _.dataIndex, maxWidth: _.width * 2, minWidth: _.width / 2 }));

  // Добавляем колонки для каждого дня
  const dayColumns: ColumnConfig[] = (controlData || []).map((item, index) => {
    const wd = item.date ? new Date(item.date).getDay() : null;
    return {
      key: `day_${index}`,
      title: formatDateHeader(item.date),
      dataIndex: `day_${index}`,
      width: 80,
      minWidth: 80,
      align: 'center' as const,
      sortable: false,
      hidden: false,
      canToggle: false,
      className: wd === 0 || wd === 6 ? 'day-header-cell --weekend' : 'day-header-cell',
    };
  });

  return [...baseColumns, ...dayColumns];
};

const formatDateHeader = (dateString: string): string => {
  const date = new Date(dateString);
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const dayName = dayNames[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${dayName}, ${day}.${month < 10 ? '0' + month : month}`;
};

export const getTableConfigStorageKey = (metricType: string) => `wbMetrics_tableConfig__${metricType}`;

export const saveTableConfig = (columns: ColumnConfig[], metricType: string): void => {
  try {
    const configData: TableConfigData = {
      version: TABLE_CONFIG_VERSION,
      columns,
    };
    localStorage.setItem(getTableConfigStorageKey(metricType), JSON.stringify(configData));
  } catch (error) {
    console.error('Error saving table config:', error);
  }
};

export const loadTableConfig = (metricType: string): ColumnConfig[] | null => {
  try {
    const savedData = localStorage.getItem(getTableConfigStorageKey(metricType));
    if (!savedData) return null;
    const configData: TableConfigData = JSON.parse(savedData);
    if (configData.version !== TABLE_CONFIG_VERSION) {
      localStorage.removeItem(getTableConfigStorageKey(metricType));
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

  const defaultMap = new Map(defaultColumns.map(col => [col.key, col]));
  const usedKeys = new Set<string>();
  const mergedColumns: ColumnConfig[] = [];

  savedColumns.forEach((savedCol) => {
    const defaultCol = defaultMap.get(savedCol.key);
    if (!defaultCol) {
      return;
    }
    const merged: ColumnConfig = {
      ...defaultCol,
      ...savedCol,
    };

    if (!defaultCol.canToggle) {
      merged.hidden = defaultCol.hidden;
    }

    mergedColumns.push(merged);
    usedKeys.add(savedCol.key);
  });

  defaultColumns.forEach((defaultCol) => {
    if (!usedKeys.has(defaultCol.key)) {
      mergedColumns.push(defaultCol);
    }
  });

  return mergedColumns;
};

