import type { TableSettingsItem } from './TableSettingsModal';

export interface TableSettingsMapOptions {
  idKey?: string;
  titleKey?: string;
  childrenKey?: string;
  hiddenKey?: string;
  defaultTitle?: string;
}

const getItemId = (item: Record<string, any>, index: number, idKey: string) => {
  return item[idKey] ?? item.id ?? item.key ?? item.dataIndex ?? String(index);
};

const getItemTitle = (item: Record<string, any>, titleKey: string, defaultTitle: string) => {
  return item[titleKey] ?? item.title ?? defaultTitle;
};

export const mapConfigToSettingsItems = (
  items: Array<Record<string, any>>,
  options: TableSettingsMapOptions = {}
): TableSettingsItem[] => {
  const {
    idKey = 'id',
    titleKey = 'title',
    childrenKey = 'children',
    hiddenKey = 'hidden',
    defaultTitle = 'Группа',
  } = options;

  return items.map((item, index) => {
    const id = getItemId(item, index, idKey);
    const title = getItemTitle(item, titleKey, defaultTitle);
    const isVisible = item[hiddenKey] !== true;

    return {
      ...item,
      id,
      title,
      isVisible,
      [childrenKey]: Array.isArray(item[childrenKey])
        ? mapConfigToSettingsItems(item[childrenKey], options)
        : item[childrenKey],
    };
  });
};

export const mapSettingsToConfig = (
  items: TableSettingsItem[],
  options: TableSettingsMapOptions = {}
): Array<Record<string, any>> => {
  const { childrenKey = 'children', hiddenKey = 'hidden' } = options;

  return items.map((item) => {
    const { isVisible, ...rest } = item;
    const result: Record<string, any> = {
      ...rest,
      [hiddenKey]: !isVisible,
    };

    if (Array.isArray(item[childrenKey])) {
      result[childrenKey] = mapSettingsToConfig(item[childrenKey], options);
    }

    return result;
  });
};
