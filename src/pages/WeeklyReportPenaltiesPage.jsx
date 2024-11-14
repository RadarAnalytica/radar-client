import { useState, useEffect } from 'react';
import FilterGroup from '../components/FilterGroup';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import styles from './WeeklyReportPenaltiesPage.module.css';
import LogisticsTable from '../components/LogisticsTable';
import BottomNavigation from '../components/BottomNavigation';

const WeeklyReportPenaltiesPage = () => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterDataSet, setFilterDataSet] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    year: [],
    month: [],
    week: [],
    article: [],
    size: [],
    srid: [],
    kindsOfLogistics: [],
    goods: [],
  });

  // Example data structure (will be replaced with API data)
  const filterData = {
    year: [
      { id: '1', label: '2024' },
      { id: '2', label: '2023' },
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
    article: [
      { id: '1', label: '345678909' },
      { id: '2', label: '345678909' },
      { id: '3', label: '345678909' },
      { id: '4', label: '345678909' },
      { id: '5', label: '345678909' },
      { id: '6', label: '345678909' },
      { id: '7', label: '345678909' },
      // ... more options
    ],
    size: [
      { id: '1', label: 'Название бренда' },
      { id: '2', label: 'Название бренда 2' },
      // ... more options
    ],
    srid: [
      { id: '1', label: '33404238099123.0.0' },
      { id: '2', label: '33404238099123.0.0' },
      { id: '3', label: '33404238099123.0.0' },
      { id: '4', label: '33404238099123.0.0' },
      { id: '5', label: '33404238099123.0.0' },
      { id: '6', label: '33404238099123.0.0' },
      { id: '7', label: '33404238099123.0.0' },
      // ... more options
    ],
    kindsOfLogistics: [
      { id: '1', label: 'Возврат (к продавцу)' },
      { id: '2', label: 'Возврат (от продавца при отмене)' },
      { id: '3', label: 'Возврат товара продавцу по отзыву (к продавцу)' },
      { id: '4', label: 'Возврат (от продавца при возврате)' },
      {
        id: '5',
        label:
          'Выявление расхождения в карточке товара после приемки на складе WB',
      },
      { id: '6', label: 'Возврат брака (к продавцу)' },
      // ... more options
    ],
    goods: [
      { id: '1', label: 'Куртка демисезонная с капюшоном осень 2024' },
      { id: '2', label: 'Куртка демисезонная с капюшоном осень 2024' },
      {
        id: '3',
        label: 'Куртка демисезонная с капюшоном осень 2024 длинное название',
      },
      { id: '4', label: 'Куртка демисезонная с капюшоном осень 2024' },
      {
        id: '5',
        label: 'Куртка демисезонная с капюшоном осень 2024',
      },
      { id: '6', label: 'Куртка демисезонная с капюшоном осень 2024' },
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
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'Штрафы'} subTitle={'Отчёт /'} />
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
            <div className={styles.filterContainer}>
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
                title='Артикул'
                options={filterData.article}
                selected={selectedFilters.article}
                onSelect={(id) => handleSelect('article', id)}
                onClearAll={() => handleClearAll('article')}
              />
              <FilterGroup
                title='Размер'
                options={filterData.size}
                selected={selectedFilters.size}
                onSelect={(id) => handleSelect('size', id)}
                onClearAll={() => handleClearAll('size')}
              />
              <FilterGroup
                title='Srid'
                options={filterData.srid}
                selected={selectedFilters.srid}
                onSelect={(id) => handleSelect('srid', id)}
                onClearAll={() => handleClearAll('srid')}
              />
            </div>
            <div className={styles.filterContainer}>
              <FilterGroup
                title='Виды логистики, штрафов и доплат'
                options={filterData.kindsOfLogistics}
                selected={selectedFilters.kindsOfLogistics}
                onSelect={(id) => handleSelect('kindsOfLogistics', id)}
                onClearAll={() => handleClearAll('kindsOfLogistics')}
                size='big'
              />
              <FilterGroup
                title='Товар'
                options={filterData.goods}
                selected={selectedFilters.goods}
                onSelect={(id) => handleSelect('goods', id)}
                onClearAll={() => handleClearAll('goods')}
                size='big'
              />
            </div>
          </div>
           <div className='container dash-container'>
           <div>
             <button className={styles.applyButton}>
               Применить фильтры
             </button>
           </div>
         </div>
         </>
        )}
        <div className='container dash-container'>
          <LogisticsTable />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportPenaltiesPage;
