export const TABLE_CONFIG_VERSION = '1.0.7';
export const TABLE_CONFIG_STORAGE_KEY = 'myAdv_tableConfig';
export const TABLE_MAX_WIDTH = 400;

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
        {title: 'Статус WB', dataIndex: 'company_status', sortable: true, fixed: true, width: 100},
        {title: 'Тип кампании', dataIndex: 'company_type', sortable: true, fixed: true, width: 100},
      ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width, maxWidth: TABLE_MAX_WIDTH }))
    },
    {
      title: 'Рекламная воронка',
      key: 'm02',
      hidden: false,
      fixed: false,
      groupColor: 'white',
      children: [
        {title: 'Корзина', dataIndex: 'cart', sortable: true, fixed: false, canToggle: false, width: 50, tooltipText: 'Сколько раз товар был добавлен в корзину после клика по рекламе. Показывает рост интереса и намерение купить'},
        {title: 'Заказы', dataIndex: 'orders', sortable: true, fixed: false, canToggle: false, width: 50, tooltipText: 'Общее число оформленных заказов, атрибутированных к данной рекламной кампании'},
        {title: 'Заказано, шт', dataIndex: 'order_item_count', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Суммарное количество единиц товара во всех заказах, привлеченных этой кампанией'},
        {title: 'Прогноз выкуп, шт', dataIndex: 'expected_purchase', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Ожидаемое количество единиц товара, которые будут оплачены. Для точного расчёта используется финальный процент выкупа на основе данных 14-дневной давности, когда все заказы уже перешли в статус «Выкуплен» или «Возврат/Невыкуп». Это исключает влияние незавершённых заказов на статистику'},
        {title: 'Просмотры → Клик (CTR)', dataIndex: 'view_click', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Коэффициент кликабельности объявления. Показывает, какая доля показов привлекла внимание пользователя и вызвала переход. Ключевой показатель релевантности рекламного объявления'},
        {title: 'Клик → Корзина', dataIndex: 'click_cart', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Доля пользователей, которые после перехода на карточку проявили серьезное намерение к покупке, добавив товар в корзину. Говорит о качестве карточки и оффера'},
        {title: 'Корзина → Заказ', dataIndex: 'cart_order', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Показывает эффективность завершения покупки. Отражает, насколько легко пользователю оформить заказ после добавления в корзину'},
        {title: 'Просмотр → Заказ', dataIndex: 'view_order', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Ключевой показатель общей эффективности кампании: какая часть всех показов привела к оформлению заказа. Формула: (Заказы / Просмотры) * 100%'},
        {title: 'Прогноз Заказ → Выкуп', dataIndex: 'expected_order_purchase', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Ожидаемая доля заказанных товаров, которая будет оплачена. Для точности используется конверсия в выкуп по заказам, завершенным 14 дней назад, что исключает влияние "висящих" заказов'},
        {title: 'Прогноз Клик → Выкуп', dataIndex: 'expected_click_purchase', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Показывает, какой процент кликов по рекламе в итоге конвертируется в выкуп. Расчет основан на финальных данных о выкупе товаров за предыдущие периоды'},
      ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width, maxWidth: TABLE_MAX_WIDTH }))
    },
    {
      title: 'Рекламная статистика',
      key: 'm03',
      hidden: false,
      fixed: false,
      groupColor: 'white',
      children: [
        {title: 'Просмотры', dataIndex: 'views', sortable: true, fixed: false, canToggle: false, width: 50, tooltipText: 'Сколько раз ваше рекламное объявление было показано пользователям площадки в выбранном периоде. Базовый показатель охвата аудитории'},
        {title: 'Клики', dataIndex: 'clicks', sortable: true, fixed: false, canToggle: false, width: 50, tooltipText: 'Число переходов пользователей на вашу карточку товара после показа рекламного объявления. Отражает уровень интереса'},
        {title: 'CPC', dataIndex: 'cpc', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Рассчитывается как Расходы на рекламу / Клики. Показатель того, сколько в среднем вы платите за один переход на карточку'}, 
        {title: 'Средний CPM за период', dataIndex: 'avg_cpm', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Средняя стоимость 1000 показов рекламного объявления в рамках данной рекламной кампании за выбранный период. Показатель помогает понять, сколько стоит охват аудитории на уровне показов, независимо от кликов или других действий. Формула: (Расходы на рекламу / Просмотры) * 1000'},
        // {title: 'Средняя позиция', dataIndex: 'avg_position', sortable: true, fixed: false, width: 50, tooltipText: 'Усредненное место, на котором показывалось ваше рекламное объявление в результатах поиска/каталога. Чем меньше число, тем выше была позиция (1 — самая лучшая)'},
        {title: 'ДРР заказы', dataIndex: 'drr_orders', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Показывает, какой процент от суммы всех оформленных заказов составляют затраты на рекламу. Помогает оценить рентабельность привлечения заказов. Формула: (Расходы на рекламу / Сумма заказов) * 100%'},
        {title: 'Прогноз ДРР (по выкупу)', dataIndex: 'drr_purchase', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Ожидаемый процент рекламных затрат от суммы прогнозируемой выручки. Более точный показатель рентабельности инвестиций в рекламу (ROAS), так как основан на прогнозе реальных продаж. Формула: (Расходы на рекламу / Прогноз выкупа на сумму) * 100%'},
        {title: 'CPCart', dataIndex: 'cp_cart', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Средние затраты на то, чтобы пользователь добавил товар в корзину. Оценивает эффективность рекламы на этапе формирования спроса. Формула: Расходы на рекламу / Добавления в корзину'},
        {title: 'CPO', dataIndex: 'cpo', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Средние рекламные расходы, которые привели к оформлению одного заказа. Формула: Расходы на рекламу / Заказы'},
        {title: 'Прогноз CPS', dataIndex: 'expected_cps', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Оценка средних рекламных затрат на одну фактическую продажу (выкуп). Учитывает прогнозируемое количество выкупов. Формула: Расходы на рекламу / Прогноз выкупа (шт)'},
        {title: 'Заказов на сумму', dataIndex: 'orders_amount', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Общий объем заказов, привлеченных кампанией, в денежном выражении. До вычета возможных отмен и невыкупов'},
        {title: 'Прогноз выкуп на сумму', dataIndex: 'expected_purchase_amount', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Оценка реальной выручки от кампании после выкупа товаров. Прогноз строится на финальном проценте выкупа, рассчитанном по заказам двухнедельной давности с известным итогом. Это позволяет оценить рентабельность кампании без искажений из-за незавершённых заказов. Формула: Сумма заказов × Исторический % выкупа'},
        {title: 'Расходы на рекламу', dataIndex: 'ad_spend', sortable: true, fixed: false, canToggle: true, width: 50, tooltipText: 'Общая сумма, списанная площадкой за показы вашего рекламного объявления в выбранном периоде'},
      ].map(_ => ({ ..._, key: _.dataIndex, minWidth: _.width, maxWidth: TABLE_MAX_WIDTH, className: 'myAdvTableGroupCell' }))
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

// Обработчик изменения конфигурации таблицы
export const getNormalizedTableConfig = (newConfig: ColumnConfig[]): ColumnConfig[] => {
  const MAX_WIDTH = 400;
  
  // Расширенный интерфейс для колонок с children (аналогично TableSettingsWidget)
  type ExtendedColumnConfig = ColumnConfig & {
    children?: ExtendedColumnConfig[];
  };
  
  // Рекурсивная функция для ограничения ширины колонок
  const limitColumnWidth = (columns: ExtendedColumnConfig[]): ExtendedColumnConfig[] => {
    return columns.map(col => {
      if (Array.isArray(col.children) && col.children.length > 0) {
        const updatedChildren = limitColumnWidth(col.children);
        // Пересчитываем ширину группы на основе суммы ширин дочерних колонок
        const totalWidth = updatedChildren.reduce((sum: number, child: ExtendedColumnConfig) => {
          if (child.hidden) return sum;
          return sum + (child.width || child.minWidth || 200);
        }, 0);
        return { 
          ...col, 
          width: Math.min(totalWidth, MAX_WIDTH), 
          children: updatedChildren 
        };
      }
      
      // Если это листовая колонка, ограничиваем ширину до MAX_WIDTH
      if (col.width && col.width > MAX_WIDTH) {
        return { ...col, width: MAX_WIDTH };
      }
      
      return col;
    });
  };
  
  return limitColumnWidth(newConfig as ExtendedColumnConfig[]);
};
