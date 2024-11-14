import { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import FilterDropdownReportPages from '../components/FilterDropdownReportPages';
import FilterGroup from '../components/FilterGroup';
import styles from './WeeklyReportByMonth.module.css';
import SalesTable from '../components/SaleTable';
import BottomNavigation from '../components/BottomNavigation';

const WeeklyReportByMonth = () => {
  const [filterDataSet, setFilterDataSet] = useState({});
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    warehouse: [],
    brand: [],
    year: [],
    month: [],
    week: [],
    group: [],
  });
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
      { id: '3', label: 'Март' },
      { id: '4', label: 'Апрель' },
      { id: '5', label: 'Май' },
      { id: '6', label: 'Июнь' },
      { id: '7', label: 'Июль' },
      { id: '8', label: 'Август' },
      { id: '9', label: 'Сентябрь' },
      { id: '10', label: 'Октябрь' },
      { id: '11', label: 'Ноябрь' },
      { id: '12', label: 'Декабрь' },
      // ... more options
    ],
    week: [
      { id: '1', label: 'Понедельник' },
      { id: '2', label: 'Вторник' },
      { id: '3', label: 'Среда' },
      { id: '4', label: 'Четверг' },
      { id: '5', label: 'Пятница' },
      { id: '6', label: 'Суббота' },
      { id: '7', label: 'Воскресенье' },
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
  const shops = [];
  const filterOptions = [
    {
      id: 'yuridical_lic',
      label: 'Юридическое лицо',
      options: [
        { value: '7', label: '7 дней' },
        { value: '14', label: '14 дней' },
        { value: '30', label: '30 дней' },
        { value: '90', label: '90 дней' },
      ],
    },
    {
      id: 'size',
      label: 'Размер',
      options: [
        { value: '0', label: 'Все' },
        ...shops.map((brand) => ({
          value: brand.id,
          label: brand.brand_name,
        })),
      ],
    },
    {
      id: 'articool',
      label: 'Артикул поставщика',
      options: [
        { value: '745664455', label: '745664455' },
        { value: '145456565465', label: '145456565465' },
      ],
    },
    {
      id: 'goods',
      label: 'Товар',
      options: [
        { value: '745664455', label: '745664455' },
        { value: '145456565465', label: '145456565465' },
      ],
    },
    {
      id: 'group',
      label: 'Группа',
      options: [
        { value: '745664455', label: '745664455' },
        { value: '145456565465', label: '145456565465' },
      ],
    },
    {
      id: 'filter-self-buy',
      label: 'Фильтр самовыкупов',
      options: [
        { value: '745664455', label: '745664455' },
        { value: '145456565465', label: '145456565465' },
      ],
    },
    {
      id: 'brand',
      label: 'Бренд',
      options: [
        { value: '745664455', label: '745664455' },
        { value: '145456565465', label: '145456565465' },
      ],
    },
    {
      id: 'item-type',
      label: 'Предмет',
      options: [
        { value: '745664455', label: '745664455' },
        { value: '145456565465', label: '145456565465' },
      ],
    },
    {
      id: 'country',
      label: 'Страна',
      options: [
        { value: '745664455', label: '745664455' },
        { value: '145456565465', label: '145456565465' },
      ],
    },
    {
      id: 'srid',
      label: 'Srid',
      options: [
        { value: '745664455', label: '745664455' },
        { value: '145456565465', label: '145456565465' },
      ],
    },
  ];

  const [activeFilters, setActiveFilters] = useState({
    period: '30',
    store: '0',
  });

  const handleFilterChange = (filterId, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: value,
    }));
  };

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'По месяцам'} subTitle={'Отчёт /'} />
        <div className='container dash-container'>
          <div
            className={styles.filteOpenClose}
            onClick={() => setIsOpenFilters(!isOpenFilters)}
          >
            {isOpenFilters ? 'Развернуть фильтры' : 'Свернуть фильтры'}
          </div>
        </div>
        {!isOpenFilters && (
          <>
            <div className='container dash-container'>
              <FilterDropdownReportPages
                filterOptions={filterOptions}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className='container dash-container'>
              <div className={styles.filteWrapper}>
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
              </div>
            </div>
            <div className='container dash-container'>
          <div>
            <button className={styles.applyButton}>Применить фильтры</button>
          </div>
        </div>
          </>
        )}
        <div className='container dash-container'>
          <SalesTable />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportByMonth;
