export const sortTableData = (tableData: any[], sortState: any) => {
  if (!sortState.sort_field || !sortState.sort_order) {
    return tableData;
  }

  return [...tableData].sort((a, b) => {
    const field = sortState.sort_field;
    let aValue = a[field];
    let bValue = b[field];

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

export const toCamelCase = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : '').replace(/^./, (match) => match.toLowerCase());
};
