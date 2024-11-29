import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByGoods } from '../redux/reportByGoods/reportByGoodsActions';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '../service/serviceFunctions';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import FilterDropdownReportPages from '../components/FilterDropdownReportPages';
import FilterGroup from '../components/FilterGroup';
import styles from './WeeklyReportByGoods.module.css';
import TableByGoods from '../components/TableByGoods';
import BottomNavigation from '../components/BottomNavigation';
import { monthNames, getMonthNumbers } from '../service/utils';

const WeeklyReportByGoods = () => {
  const { authToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { weeklyData, loading, error } = useSelector(
    (state) => state.reportByGoodsSlice
  );
  const [filterOptions, setFilterOptions] = useState([]);
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    year: [],
    month: [],
    week: [],
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [filterIsLoading, setFilterIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      setFilterIsLoading(true);
      try {
        const filters = await ServiceFunctions.getMonthProductFilters(
          authToken
        );
        console.log('filterOptions', filterOptions);
        setFilterOptions(filters);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      } finally {
        setFilterIsLoading(false);
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
      fetchReportByGoods({
        authToken: authToken,
        filters,
      })
    );
  };
  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'По товарам'} subTitle={'Отчёт /'} />
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
              <div
                className='container dash-container'
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  marginBottom: '20px',
                }}
              >
                <FilterGroup
                  title='Размер'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'size')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['size'])
                      ? activeFilters['size']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('size', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(activeFilters['size'])
                      ? activeFilters['size']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('size', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'size')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('size', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Артикул'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'article')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['article'])
                      ? activeFilters['article']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('article', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(
                      activeFilters['article']
                    )
                      ? activeFilters['article']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('article', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'article')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('article', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Товар'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'good')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['good'])
                      ? activeFilters['good']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('good', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(activeFilters['good'])
                      ? activeFilters['good']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('good', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'good')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('good', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Группа'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'groups')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['groups'])
                      ? activeFilters['groups']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('groups', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(activeFilters['groups'])
                      ? activeFilters['groups']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('groups', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'groups')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('groups', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Бренд'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'brand')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['brand'])
                      ? activeFilters['brand']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('brand', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(activeFilters['brand'])
                      ? activeFilters['brand']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('brand', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'brand')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('brand', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Страна'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'country')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['country'])
                      ? activeFilters['country']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('country', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(
                      activeFilters['country']
                    )
                      ? activeFilters['country']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('country', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'country')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('country', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='WB ID'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'wb_id')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['wb_id'])
                      ? activeFilters['wb_id']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('wb_id', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(activeFilters['wb_id'])
                      ? activeFilters['wb_id']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('wb_id', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'wb_id')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('wb_id', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Предмет'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'subject')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['subject'])
                      ? activeFilters['subject']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('subject', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(
                      activeFilters['subject']
                    )
                      ? activeFilters['subject']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('subject', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'subject')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('subject', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='SRID'
                  options={filterOptions.dropdownFilters
                    ?.find((filter) => filter.id === 'srid')
                    ?.options?.map((option) => ({
                      id: option.value,
                      label: option.label,
                    }))}
                  selected={
                    Array.isArray(activeFilters['srid'])
                      ? activeFilters['srid']
                      : []
                  }
                  onSelect={(value) => {
                    // If value is an array (from select all), use it directly
                    if (Array.isArray(value)) {
                      handleFilterChange('srid', value);
                      return;
                    }
                    // Otherwise handle single selection
                    const currentValues = Array.isArray(activeFilters['srid'])
                      ? activeFilters['srid']
                      : [];
                    const newValues = currentValues.includes(value)
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value];
                    handleFilterChange('srid', newValues);
                  }}
                  onClearAll={() => {
                    const allValues = filterOptions.dropdownFilters
                      ?.find((filter) => filter.id === 'srid')
                      ?.options?.map((option) => option.label);
                    handleFilterChange('srid', allValues || []);
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Год'
                  options={filterOptions.groupFilters?.dateFilters?.options
                    ?.find((filter) => filter.id === 'years')
                    ?.values?.map((value) => ({
                      id: value,
                      label: value,
                    }))}
                  selected={selectedFilters.year}
                  onSelect={(value) => {
                    if (Array.isArray(value)) {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        year: value,
                      }));
                    } else {
                      handleSelect('year', value);
                    }
                  }}
                  onClearAll={() => {
                    const allYears =
                      filterOptions.groupFilters?.dateFilters?.options?.find(
                        (filter) => filter.id === 'years'
                      )?.values || [];
                    setSelectedFilters((prev) => ({
                      ...prev,
                      year: allYears,
                    }));
                  }}
                  filterLoading={filterIsLoading}
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
                  onSelect={(value) => {
                    if (Array.isArray(value)) {
                      // Handle "Select All" case
                      setSelectedFilters((prev) => ({
                        ...prev,
                        month: value,
                      }));
                    } else {
                      // Handle individual selection
                      handleSelect('month', value);
                    }
                  }}
                  onClearAll={() => {
                    // Get all month values and pass them to onSelect
                    const allMonths =
                      filterOptions.groupFilters?.dateFilters?.options
                        ?.find((filter) => filter.id === 'months')
                        ?.values.map((value) => value);
                    setSelectedFilters((prev) => ({
                      ...prev,
                      month: allMonths || [],
                    }));
                  }}
                  filterLoading={filterIsLoading}
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
                  onSelect={(value) => {
                    if (Array.isArray(value)) {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        week: value,
                      }));
                    } else {
                      handleSelect('week', value);
                    }
                  }}
                  onClearAll={() => {
                    const allWeeks =
                      filterOptions.groupFilters?.dateFilters?.options?.find(
                        (filter) => filter.id === 'weeks'
                      )?.values || [];
                    setSelectedFilters((prev) => ({
                      ...prev,
                      week: allWeeks,
                    }));
                  }}
                  filterLoading={filterIsLoading}
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
          <TableByGoods data={weeklyData} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};
export default WeeklyReportByGoods;
