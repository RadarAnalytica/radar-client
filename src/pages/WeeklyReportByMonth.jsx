import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByMonth } from '../redux/reportByMonth/reportByMonthActions';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '../service/serviceFunctions';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import FilterGroup from '../components/FilterGroup';
import styles from './WeeklyReportByMonth.module.css';
import SalesTable from '../components/SaleTable';
import BottomNavigation from '../components/BottomNavigation';
import { monthNames, getMonthNumbers } from '../service/utils';

const WeeklyReportByMonth = () => {
  const { authToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { weeklyData, loading, error } = useSelector(
    (state) => state.reportByMonthSlice
  );
  const [filterOptions, setFilterOptions] = useState([]);
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    year: [],
    month: [],
    week: [],
  });

  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await ServiceFunctions.getMonthProductFilters(
          authToken
        );
        console.log('filterOptions', filterOptions);
        setFilterOptions(filters);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    if (filterOptions?.dropdownFilters?.length > 0) {
      const initialActiveFilters = filterOptions.dropdownFilters.reduce(
        (acc, filter) => {
          // Set the first option as default value for each filter
          acc[filter.id] = filter.options[0]?.value || '';
          return acc;
        },
        {}
      );

      setActiveFilters(initialActiveFilters);
    }
  }, [filterOptions]);

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

  const handleFilterChange = (filterId, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: value,
    }));
  };

  const prepareFilterData = () => {
    const filterData = {
      vendor_code_filter: activeFilters.vendor_code || [],
      size_name_filter: activeFilters.size || [],
      brand_name_filter: activeFilters.brand || [],
      country_filter: activeFilters.country || [],
      wb_id_filter: activeFilters.wb_id || [],
      subject_name_filter: activeFilters.subject || [],
      srid_filter: activeFilters.srid || [],
      groups_filter: activeFilters.groups || [],
      date_sale_filter: {
        years: selectedFilters.year || [],
        months: getMonthNumbers(selectedFilters.month) || [],
        weekdays: selectedFilters.week || [],
      },
    };

    return filterData;
  };

  const handleFetchReport = (filters) => {
    dispatch(
      fetchReportByMonth({
        authToken: authToken,
        filters,
      })
    );
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
            <div
              className='container dash-container'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              {filterOptions?.dropdownFilters?.map((filter) => (
                <FilterGroup
                  key={filter.id}
                  title={filter.label}
                  options={filter.options.map((option) => ({
                    id: option.value,
                    label: option.label,
                  }))}
                  selected={
                    Array.isArray(activeFilters[filter.id])
                      ? activeFilters[filter.id]
                      : []
                  }
                  onSelect={(value) => {
                    const currentValues = Array.isArray(
                      activeFilters[filter.id]
                    )
                      ? activeFilters[filter.id]
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange(filter.id, newValues);
                  }}
                  onClearAll={() => handleFilterChange(filter.id, [])}
                />
              ))}
            </div>
            <div className='container dash-container'>
              <div className={styles.filteWrapper}>
                <FilterGroup
                  title='Год'
                  options={filterOptions.groupFilters?.dateFilters?.options
                    ?.find((filter) => filter.id === 'years')
                    ?.values?.map((value) => ({
                      id: value,
                      label: value,
                    }))}
                  selected={selectedFilters.year}
                  onSelect={(id) => handleSelect('year', id)}
                  onClearAll={() => handleClearAll('year')}
                />
                <FilterGroup
                  title='Месяц'
                  options={filterOptions.groupFilters?.dateFilters?.options
                    ?.find((filter) => filter.id === 'months')
                    ?.values.map((value) => ({
                      id: value,
                      label: monthNames[value] || value,
                    }))}
                  selected={selectedFilters.month}
                  onSelect={(value) => handleSelect('month', value)}
                  onClearAll={() => handleClearAll('month')}
                />
                <FilterGroup
                  title='Неделя'
                  options={filterOptions.groupFilters?.dateFilters?.options
                    ?.find((filter) => filter.id === 'weeks')
                    ?.values.map((value) => ({
                      id: value,
                      label: value,
                    }))}
                  selected={selectedFilters.week}
                  onSelect={(id) => handleSelect('week', id)}
                  onClearAll={() => handleClearAll('week')}
                />
              </div>
            </div>
            <div className='container dash-container'>
              <div>
                <button
                  className={styles.applyButton}
                  onClick={() => {
                    const filterData = prepareFilterData();
                    handleFetchReport(filterData);
                    console.log('Filter data to send:', filterData);
                  }}
                >
                  Применить фильтры
                </button>
              </div>
            </div>
          </>
        )}
        <div className='container dash-container'>
          <SalesTable tableData={weeklyData} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportByMonth;
