export const getColorForPercentage = (
  percentage: number,
  minValue: number,
  maxValue: number,
  metricType: 'drr' | 'spp',
  isChart: boolean = false
): string => {
  // От красного к зеленому
  const colorScale = isChart 
    ? [`#F93E3E`, `#FD6B42`, `#FE8F28`, `#FAB313`, `#F2D102`, `#C6D311`, `#94D02C`, `#59D401`, `#1CD700`] 
    : [`#FED9D8`, `#FEDFD5`, `#FEE7D2`, `#FFEECF`, `#FEF5CC`, `#F4F5CD`, `#E8F6CC`, `#DEF6CC`, `#D2F7CD`];

  // Защита от некорректных значений
  if (typeof percentage !== 'number' || isNaN(percentage)) {
    return isChart ? `#F0F0F0` : `#FED9D8`;
  }

  const range = maxValue - minValue;
  if (range <= 0) return metricType === 'drr' ? colorScale[colorScale.length - 1] : colorScale[0];
  
  const normalizedValue = (percentage - minValue) / range;
  const colors = metricType === 'drr' ? [...colorScale].reverse() : colorScale;
  const index = Math.min(Math.max(0, Math.floor(normalizedValue * colors.length)), colors.length - 1);
  return colors[index] || (isChart ? `#F0F0F0` : `#FED9D8`);
};

export const sortTableData = (tableData: any[], sortState: any) => {
  if (!sortState.sort_field || !sortState.sort_order) {
    return tableData;
  }

  return [...tableData].sort((a, b) => {
    const field = sortState.sort_field;
    let aValue = a[field];
    let bValue = b[field];

    // Обработка вложенных объектов (например, product.name)
    if (field === 'product') {
      aValue = a.product?.name || '';
      bValue = b.product?.name || '';
    }

    // Сравнение строк
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortState.sort_order === 'ASC' ? comparison : -comparison;
    }

    // Сравнение чисел
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortState.sort_order === 'ASC' ? aValue - bValue : bValue - aValue;
    }

    // Обработка undefined/null
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    // По умолчанию сравнение как строки
    return sortState.sort_order === 'ASC' 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
};

