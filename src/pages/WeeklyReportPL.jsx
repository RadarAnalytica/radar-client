import { useState, useContext, useEffect } from 'react';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '../service/serviceFunctions';
import FilterGroup from '../components/FilterGroup';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import TablePL from '../components/TablePL';
import BottomNavigation from '../components/BottomNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPLReport } from '../redux/reportPL/plReportActions';
import styles from './WeeklyReportPL.module.css';

const WeeklyReportPL = () => {
  const { authToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { plData, isLoading } = useSelector((state) => state?.plReportSlice);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    group: [],
  });
  console.log('activeFilters', activeFilters);
  const [filterOptions, setFilterOptions] = useState([]);

  const handleApplyFilters = () => {
    const brandFilter = activeFilters.brand.join(',');
    const groupFilter = activeFilters.group.join(',');

    dispatch(
      fetchPLReport({
        brandFilter,
        groupFilter,
        token: authToken,
      })
    );
  };
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const filters = await ServiceFunctions.getPLFilters(authToken);
        setFilterOptions(filters.filterOptions);
        // Set initial active filters as arrays
        if (filters.filterOptions && filters.filterOptions.length > 0) {
          setActiveFilters({
            brand: [],
            group: [],
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
    setActiveFilters((prevFilters) => {
      const currentValues = prevFilters[filterId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prevFilters,
        [filterId]: newValues,
      };
    });
  };

  const handleClearAll = (filterId) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: [],
    }));
  };

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'P&L'} subTitle={'Отчёт /'} />
        <div className='container dash-container'>
          <div className={styles.filterContainer}>
            {filterOptions.map((filter) => (
              <FilterGroup
                key={filter.id}
                title={filter.label}
                options={filter.options.map((opt) => ({
                  id: opt.value,
                  label: opt.label,
                }))}
                selected={activeFilters[filter.id]}
                onSelect={(value) => handleFilterChange(filter.id, value)}
                onClearAll={() => handleClearAll(filter.id)}
              />
            ))}
          </div>
        </div>
        <div className='container dash-container'>
          <div>
            <button className={styles.applyButton} onClick={handleApplyFilters}>
              Применить фильтры
            </button>
          </div>
        </div>
        <div className='container dash-container'>
          <TablePL plData={plData} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportPL;
