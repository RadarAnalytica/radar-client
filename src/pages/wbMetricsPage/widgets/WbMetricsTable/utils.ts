export const getColorForPercentage = (
  percentage: number,
  minValue: number,
  maxValue: number,
  metricType: 'drr' | 'spp',
  opacity: number = 1
): string => {
  const range = maxValue - minValue;
  if (range === 0) return `rgba(240, 240, 240, ${opacity})`;

  const normalizedValue = (percentage - minValue) / range;

  const colorScale = [
    `rgba(249, 62, 62, ${opacity})`, // Красный
    `rgba(253, 107, 66, ${opacity})`,
    `rgba(254, 143, 40, ${opacity})`,
    `rgba(250, 179, 19, ${opacity})`,
    `rgba(242, 209, 2, ${opacity})`, // Желтый
    `rgba(198, 211, 17, ${opacity})`,
    `rgba(148, 208, 44, ${opacity})`,
    `rgba(89, 212, 1, ${opacity})`,
    `rgba(28, 215, 0, ${opacity})`, // Зеленый
  ];

  const colors = metricType === 'drr' ? [...colorScale].reverse() : colorScale;
  const index = Math.min(Math.floor(normalizedValue * colors.length), colors.length - 1);
  return colors[index];
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

