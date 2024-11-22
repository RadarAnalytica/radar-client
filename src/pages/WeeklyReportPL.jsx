import { useState, useContext, useEffect } from 'react';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '../service/serviceFunctions';
import FilterDropdownReportPages from '../components/FilterDropdownReportPages';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import TablePL from '../components/TablePL';
import BottomNavigation from '../components/BottomNavigation';
import styles from './WeeklyReportPL.module.css';

const WeeklyReportPL = () => {
  const {authToken} = useContext(AuthContext);  
  const [activeFilters, setActiveFilters] = useState({
    brand: '',
    group: ''
  });
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const loadFilters = async () => {
        try {
            const filters = await ServiceFunctions.getPLFilters(authToken);
            setFilterOptions(filters.filterOptions);
           // Set initial active filters based on first available options
           if (filters.filterOptions && filters.filterOptions.length > 0) {
            setActiveFilters({
                brand: filters.filterOptions[0]?.options[0]?.value || 'пусто',
                group: filters.filterOptions[1]?.options[0]?.value || '0'
            });
        }
        } catch (error) {
            console.error('Error loading filters:', error);
        }
    };
    
    loadFilters();
}, []);
    
  const data = {
    dates: [
      '15.07.2024',
      '22.07.2024',
      '29.07.2024',
      '05.08.2024',
      '12.08.2024',
      '19.08.2024',
      '26.08.2024',
      '02.09.2024',
      '09.09.2024',
    ],
    rows: [
      {
        label: 'Выручка',
        values: {
          '15.07.2024': { value: 34000, percentage: null },
          '22.07.2024': { value: 34000, percentage: null },
          // ... add other dates
        },
      },
      {
        label: 'Средний чек',
        values: {
          '15.07.2024': { value: 4000, percentage: null },
          '22.07.2024': { value: 4000, percentage: null },
          // ... add other dates
        },
      },
      {
        label: 'СПП',
        values: {
          '15.07.2024': { percentage: 50 },
          '22.07.2024': { percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Выкуп',
        values: {
          '15.07.2024': { percentage: 20 },
          '22.07.2024': { percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Себестоимость',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Все удержания WB',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Комиссия',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Эквайринг',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Логистика',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Хранение',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Прочие удержания',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Платная приемка',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Оплата на Р/С',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Налог',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Всего внешних расходов',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Внешние расходы',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Чистая прибыль',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Маржинальность прибыли',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'ROI',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      // ... add other rows
    ],
  };
 


  const handleFilterChange = (filterId, value) => {
    setActiveFilters(prevFilters => {
        const newFilters = {
            ...prevFilters,
            [filterId]: value
        };

        return newFilters;
    });
};

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'P&L'} subTitle={'Отчёт /'} />
        <FilterDropdownReportPages
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />
        <div className='container dash-container'>
          <div>
            <button className={styles.applyButton}>Применить фильтры</button>
          </div>
        </div>
        <div className='container dash-container'>
          <TablePL data={data} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportPL;
