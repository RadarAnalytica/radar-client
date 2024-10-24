import { useState, useEffect } from 'react';
import styles from './FilterSection.module.css';
import FilterGroup from './FilterGroup';

const FilterSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterDataSet, setFilterDataSet] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    warehouse: [],
    brand: [],
    year: [],
    month: [],
    week: [],
    group: [],
  });

  // Example data structure (will be replaced with API data)
  const filterData = {
    warehouse: [
      { id: '1', label: 'СЦ Кузнецк' },
      { id: '2', label: 'Длинное название склада lkbbbbbbbbbbbbbb' },
      { id: '3', label: 'Длинное название склада' },
      { id: '4', label: 'Длинное название склада ' },
      { id: '5', label: 'Длинное название склада' },
      { id: '6', label: 'Длинное название склада' },
      // ... more options
    ],
    brand: [
      { id: '1', label: 'Название бренда' },
      { id: '2', label: 'Название 2' },
      // ... more options
    ],
    year: [
      { id: '1', label: '2023' },
      { id: '2', label: '2022' },
      // ... more options
    ],
    month: [
      { id: '1', label: 'Январь' },
      { id: '2', label: 'Февраль' },
      // ... more options
    ],
    week: [
      { id: '1', label: 'Понедельник' },
      { id: '2', label: 'Вторник' },
      // ... more options
    ],
    group: [
      { id: '1', label: 'Группа 1' },
      { id: '2', label: 'Группа 2' },
      // ... more options
    ],
    // ... other filter categories
  };

  const handleSelect = (category, id) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(id)
        ? prev[category].filter((item) => item !== id)
        : [...prev[category], id],
    }));
  };

  const handleClearAll = (category) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('/api/filter-options');
        const data = await response.json();
        setFilterDataSet(data);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  return (
    <div className={styles.filterContainer}>
      <button
        className={styles.collapseButton}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        Свернуть фильтры
        {/* {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />} */}
      </button>

      {!isCollapsed && (
        <div className={styles.filterGrid}>
          <FilterGroup
            title='Склад'
            options={filterData.warehouse}
            selected={selectedFilters.warehouse}
            onSelect={(id) => handleSelect('warehouse', id)}
            onClearAll={() => handleClearAll('warehouse')}
          />
          <FilterGroup
            title='Бренд'
            options={filterData.brand}
            selected={selectedFilters.brand}
            onSelect={(id) => handleSelect('brand', id)}
            onClearAll={() => handleClearAll('brand')}
          />
          <FilterGroup
            title='Год'
            options={filterData.year}
            selected={selectedFilters.year}
            onSelect={(id) => handleSelect('year', id)}
            onClearAll={() => handleClearAll('year')}
          />
          <FilterGroup
            title='Месяц'
            options={filterData.month}
            selected={selectedFilters.month}
            onSelect={(id) => handleSelect('month', id)}
            onClearAll={() => handleClearAll('month')}
          />
          <FilterGroup
            title='Неделя'
            options={filterData.week}
            selected={selectedFilters.week}
            onSelect={(id) => handleSelect('week', id)}
            onClearAll={() => handleClearAll('week')}
          />
          <FilterGroup
            title='Группа'
            options={filterData.group}
            selected={selectedFilters.group}
            onSelect={(id) => handleSelect('group', id)}
            onClearAll={() => handleClearAll('group')}
          />
          {/* Add other FilterGroups similarly */}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
