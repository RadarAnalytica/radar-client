import type { TableSettingsItem } from './TableSettingsModal';

export interface TableSettingsMapOptions {
  idKey?: string;
  titleKey?: string;
  childrenKey?: string;
  hiddenKey?: string;
  defaultTitle?: string;
}

export interface TableSettingsNormalizeOptions {
  idKey?: string;
  titleKey?: string;
  childrenKey?: string;
  visibleKey?: string;
  invertVisibility?: boolean;
}

const getItemId = (item: Record<string, any>, index: number, idKey: string) => {
  return item[idKey] ?? item.id ?? item.key ?? item.dataIndex ?? String(index);
};

const getItemTitle = (item: Record<string, any>, titleKey: string, defaultTitle: string) => {
  return item[titleKey] ?? item.title ?? defaultTitle;
};

export const resolveItemTitle = (item: TableSettingsItem, titleKey: string, fallback = '') => {
  const titleValue = item[titleKey];
  if (typeof titleValue === 'string') {
    return titleValue;
  }
  if (titleValue != null) {
    return String(titleValue);
  }
  return item.title ?? fallback;
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

export const normalizeTableSettingsItems = (
  items: TableSettingsItem[],
  options: TableSettingsNormalizeOptions = {}
): TableSettingsItem[] => {
  const {
    idKey = 'id',
    titleKey = 'title',
    childrenKey = 'children',
    visibleKey = 'isVisible',
    invertVisibility = false,
  } = options;

  return items.map((item, index) => {
    const id = String(item[idKey] ?? item.id ?? item.key ?? item.dataIndex ?? index);
    const itemTitle = resolveItemTitle(item, titleKey);
    let isVisible = true;

    if (invertVisibility) {
      isVisible = item.hidden !== undefined ? !item.hidden : true;
    } else {
      const visibleValue = item[visibleKey];
      isVisible = typeof visibleValue === 'boolean' ? visibleValue : true;
    }

    const childrenValue = item[childrenKey];
    const children = Array.isArray(childrenValue)
      ? normalizeTableSettingsItems(childrenValue as TableSettingsItem[], options)
      : undefined;

    return {
      ...item,
      id,
      title: itemTitle,
      isVisible,
      order: index,
      children,
    };
  });
};

export const denormalizeTableSettingsItems = (
  items: TableSettingsItem[],
  options: TableSettingsNormalizeOptions = {}
): TableSettingsItem[] => {
  const {
    childrenKey = 'children',
    visibleKey = 'isVisible',
    invertVisibility = false,
  } = options;

  return items.map((item, index) => {
    const result: Record<string, any> = { ...item, order: index };

    if (invertVisibility) {
      result.hidden = !item.isVisible;
    } else {
      result[visibleKey] = item.isVisible;
    }

    if (item.children) {
      result[childrenKey] = denormalizeTableSettingsItems(item.children, options);
    }

    return result as TableSettingsItem;
  });
};

export const collectVisibilityStates = (items: TableSettingsItem[]): Record<string, boolean> => {
  const result: Record<string, boolean> = {};
  items.forEach(item => {
    result[item.id] = item.isVisible !== false;
    if (item.children) {
      Object.assign(result, collectVisibilityStates(item.children));
    }
  });
  return result;
};

export const mergeProductInfoPseudoGroup = (
  items: TableSettingsItem[],
  options: { stickyTitle?: string } = {}
): TableSettingsItem[] => {
  const { stickyTitle = 'О товаре' } = options;
  const result: TableSettingsItem[] = [];

  for (let index = 0; index < items.length; index += 1) {
    const current = items[index];
    const next = items[index + 1];
    const isProductInfoGroup = current?.title === stickyTitle;
    const isEmptyTitleGroup = next && (next.title === '' || next.title == null);

    if (isProductInfoGroup && isEmptyTitleGroup) {
      const stickyChildren = (current.children ?? []).map(child => ({
        ...child,
        fixed: child.fixed === true,
      }));
      const regularChildren = (next.children ?? []).map(child => ({
        ...child,
        fixed: child.fixed === true ? true : false,
      }));

      result.push({
        ...current,
        children: [...stickyChildren, ...regularChildren],
        __pseudoGroup: true,
        __pseudoGroupParts: {
          stickyParent: current,
          regularParent: next,
        },
      });
      index += 1;
      continue;
    }

    result.push(current);
  }

  return result;
};

export const splitProductInfoPseudoGroup = (items: TableSettingsItem[]): TableSettingsItem[] => {
  return items.flatMap((item) => {
    if (!item.__pseudoGroup || !item.__pseudoGroupParts) {
      return [item];
    }

    const { stickyParent, regularParent } = item.__pseudoGroupParts;
    const children = item.children ?? [];
    const stickyChildren = children.filter(child => child.fixed === true);
    const regularChildren = children.filter(child => child.fixed !== true);

    const applyPseudoState = (parent: TableSettingsItem) => ({
      ...parent,
      isVisible: item.isVisible,
      isExpanded: item.isExpanded,
    });

    const restoredGroups: TableSettingsItem[] = [];

    if (stickyChildren.length > 0) {
      restoredGroups.push({
        ...applyPseudoState(stickyParent),
        children: stickyChildren,
      });
    }

    if (regularChildren.length > 0) {
      restoredGroups.push({
        ...applyPseudoState(regularParent),
        children: regularChildren,
      });
    }

    return restoredGroups;
  });
};
