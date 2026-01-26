export const ROWS_CONFIG_STORAGE_KEY = 'rnp_rowsConfig';
export const ROWS_CONFIG_VERSION = '1.0.0';

export const loadRowsConfig = () => {
  try {
    const savedConfig = localStorage.getItem(ROWS_CONFIG_STORAGE_KEY);
    if (!savedConfig) return null;
    const parsed = JSON.parse(savedConfig);
    if (parsed.version !== ROWS_CONFIG_VERSION) return null;
    return parsed.config;
  } catch (error) {
    console.error('Error loading rows config:', error);
    return null;
  }
};

export const saveRowsConfig = (config) => {
  try {
    localStorage.setItem(ROWS_CONFIG_STORAGE_KEY, JSON.stringify({
      version: ROWS_CONFIG_VERSION,
      config,
    }));
  } catch (error) {
    console.error('Error saving rows config:', error);
  }
};

export const applyRowsConfig = (metrics, config) => {
  if (!config) return metrics;

  const configMap = new Map(config.map((item) => [item.key, item]));
  const parentOrders = new Map();
  const childOrdersByParent = new Map();

  config.forEach((item, idx) => {
    if (item.parentKey) {
      if (!childOrdersByParent.has(item.parentKey)) {
        childOrdersByParent.set(item.parentKey, new Map());
      }
      childOrdersByParent.get(item.parentKey).set(item.key, item.order ?? idx);
    } else {
      parentOrders.set(item.key, item.order ?? idx);
    }
  });

  const result = metrics.map(metric => {
    const savedConfig = configMap.get(metric.key);
    if (savedConfig) {
      let order;
      if (metric.isChildren && metric.parentKey) {
        const childOrders = childOrdersByParent.get(metric.parentKey);
        order = childOrders?.get(metric.key) ?? 999;
      } else {
        order = parentOrders.get(metric.key) ?? 999;
      }
      return {
        ...metric,
        hidden: savedConfig.hidden,
        order,
      };
    }
    return { ...metric, hidden: false, order: 999 };
  });

  const parents = result.filter(item => !item.isChildren);
  const childrenByParent = {};
  result.filter(item => item.isChildren).forEach(child => {
    if (!childrenByParent[child.parentKey]) {
      childrenByParent[child.parentKey] = [];
    }
    childrenByParent[child.parentKey].push(child);
  });

  parents.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const sortedResult = [];
  parents.forEach(parent => {
    if (!parent.hidden) {
      sortedResult.push(parent);
      const children = childrenByParent[parent.key] || [];
      children.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      children.forEach(child => {
        if (!child.hidden) {
          sortedResult.push(child);
        }
      });
    }
  });

  return sortedResult;
};

export const groupMetricsToHierarchy = (metrics, configMap = null) => {
  const parents = [];
  const childrenByParent = {};

  metrics.forEach((metric, index) => {
    const savedConfig = configMap?.get(metric.key);
    const isVisible = savedConfig ? !savedConfig.hidden : true;
    const order = savedConfig?.order ?? index;

    const item = {
      ...metric,
      id: metric.key,
      title: metric.title,
      isVisible,
      order,
    };

    if (metric.isChildren && metric.parentKey) {
      if (!childrenByParent[metric.parentKey]) {
        childrenByParent[metric.parentKey] = [];
      }
      childrenByParent[metric.parentKey].push(item);
    } else {
      parents.push(item);
    }
  });

  parents.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return parents.map(parent => {
    const children = childrenByParent[parent.key] || [];
    children.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    return {
      ...parent,
      children: parent.isParent ? (children.length > 0 ? children : []) : undefined,
    };
  });
};

export const buildRowsConfigFromSettings = (updatedItems) => {
  const flatConfig = [];
  let orderIndex = 0;

  updatedItems.forEach(item => {
    flatConfig.push({
      key: item.id,
      hidden: !item.isVisible,
      order: orderIndex++,
      isParent: item.isParent,
    });

    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        flatConfig.push({
          key: child.id,
          hidden: !child.isVisible,
          order: orderIndex++,
          parentKey: item.id,
          isChildren: true,
        });
      });
    }
  });

  return flatConfig;
};

export const buildRnpItem = (article, metrics, getTableConfig, getTableData) => {
  const tableConfig = getTableConfig(article);
  const tableData = getTableData(article, metrics);
  return {
    table: {
      columns_new: tableConfig,
      datasource: tableData,
      columns: [],
      rows: [],
    },
    article_data: article?.article_data,
  };
};
