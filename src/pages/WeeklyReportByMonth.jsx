import { useState, useEffect, useContext, useCallback } from 'react';
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
import plFake from '../pages/images/month-fake.png';
import DemonstrationSection from '../components/DemonstrationSection';
import NewFilterGroup from '../components/finReport/FilterGroup'


const WeeklyReportByMonth = () => {
  const { authToken, user } = useContext(AuthContext);
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
  const [filterIsLoading, setFilterIsLoading] = useState(false);

  const [activeFilters, setActiveFilters] = useState({});

  // useEffect(() => {
  //   const fetchFilters = async () => {
  //     setFilterIsLoading(true);
  //     try {
  //       const filters = await ServiceFunctions.getMonthProductFilters(
  //         authToken
  //       );
  //       setFilterOptions(filters);
  //     } catch (error) {
  //       console.error('Failed to fetch filter options:', error);
  //     } finally {
  //       setFilterIsLoading(false);
  //     }
  //   };

  //   fetchFilters();
  // }, []);

  // useEffect(() => {
  //   if (filterOptions?.dropdownFilters?.length > 0) {
  //     // Set all dropdown filters
  //     const initialActiveFilters = filterOptions.dropdownFilters.reduce(
  //       (acc, filter) => {
  //         acc[filter.id] = filter.options.map((opt) => opt.value);
  //         return acc;
  //       },
  //       {}
  //     );

  //     setActiveFilters(initialActiveFilters);

  //     // Set all date filters
  //     if (filterOptions.groupFilters?.dateFilters?.options) {
  //       const dateFilters = filterOptions.groupFilters.dateFilters.options;
  //       const monthValues =
  //         dateFilters.find((f) => f.id === 'months')?.values || [];
  //       setSelectedFilters({
  //         year: dateFilters.find((f) => f.id === 'years')?.values || [],
  //         month: monthValues.map((value) => monthNames[value] || value),
  //         week: dateFilters.find((f) => f.id === 'weeks')?.values || [],
  //       });
  //     }
  //   }
  //   const filterData = prepareFilterData();
  //   handleFetchReport(filterData);
  // }, [filterOptions]);

  // useEffect(() => {
  //   if (filterOptions?.dropdownFilters?.length > 0) {
  //     const savedFilters = localStorage.getItem('monthlyReportFilters');
  //     if (savedFilters) {
  //       const {
  //         activeFilters: savedActiveFilters,
  //         selectedFilters: savedSelectedFilters,
  //       } = JSON.parse(savedFilters);
  //       setActiveFilters(savedActiveFilters);
  //       setSelectedFilters(savedSelectedFilters);
  //     } else {
  //       // Set all dropdown filters
  //       const initialActiveFilters = filterOptions.dropdownFilters.reduce(
  //         (acc, filter) => {
  //           acc[filter.id] = filter.options.map((opt) => opt.value);
  //           return acc;
  //         },
  //         {}
  //       );

  //       // Set all date filters
  //       const initialSelectedFilters = {
  //         year:
  //           filterOptions.groupFilters?.dateFilters?.options?.find(
  //             (f) => f.id === 'years'
  //           )?.values || [],
  //         month:
  //           filterOptions.groupFilters?.dateFilters?.options
  //             ?.find((f) => f.id === 'months')
  //             ?.values.map((value) => monthNames[value] || value) || [],
  //         week:
  //           filterOptions.groupFilters?.dateFilters?.options?.find(
  //             (f) => f.id === 'weeks'
  //           )?.values || [],
  //       };

  //       setActiveFilters(initialActiveFilters);
  //       setSelectedFilters(initialSelectedFilters);

  //       // Save initial full selection to localStorage
  //       localStorage.setItem(
  //         'monthlyReportFilters',
  //         JSON.stringify({
  //           activeFilters: initialActiveFilters,
  //           selectedFilters: initialSelectedFilters,
  //         })
  //       );
  //     }
  //     const filterData = prepareFilterData();
  //     handleFetchReport(filterData);
  //   }
  // }, [filterOptions]);

  // // Keep the saving effect
  // useEffect(() => {
  //   const hasSelectedFilters =
  //     Object.values(activeFilters).some((filters) => filters.length > 0) ||
  //     Object.values(selectedFilters).some((filters) => filters.length > 0);

  //   if (hasSelectedFilters) {
  //     localStorage.setItem(
  //       'monthlyReportFilters',
  //       JSON.stringify({
  //         activeFilters,
  //         selectedFilters,
  //       })
  //     );
  //   }
  // }, [activeFilters, selectedFilters]);

  // const handleSelect = (category, id) => {
  //   setSelectedFilters((prev) => ({
  //     ...prev,
  //     [category]: prev[category].includes(id)
  //       ? prev[category].filter((item) => item !== id)
  //       : [...prev[category], id],
  //   }));
  // };

  const handleClearAll = (category) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  const handleFilterChange = (filterId, value, selectAll = false) => {
    if (selectAll) {
      // Get all possible options for this filter
      const allOptions =
        filterOptions.dropdownFilters
          .find((filter) => filter.id === filterId)
          ?.options.map((option) => option.value) || [];

      // If current selection includes all items, clear it. Otherwise select all
      const newValue =
        activeFilters[filterId]?.length === allOptions.length ? [] : allOptions;

      setActiveFilters((prevFilters) => ({
        ...prevFilters,
        [filterId]: newValue,
      }));
    } else {
      setActiveFilters((prevFilters) => ({
        ...prevFilters,
        [filterId]: value,
      }));
    }
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

  const handleFetchReport = useCallback(() => {
    const storageItem = localStorage.getItem('month')
    let currentPageData = JSON.parse(storageItem)
    currentPageData = currentPageData ? currentPageData : {}  
    console.log('currentPageData', currentPageData);

    const filters = {
      vendor_code_filter: currentPageData.vendorCode || [],
      size_name_filter: currentPageData.size || [],
      brand_name_filter: currentPageData.brand || [],
      country_filter: currentPageData.country || [],
      wb_id_filter: currentPageData.wbId || [],
      title_filter: currentPageData.product || [],
      subject_name_filter: currentPageData.subject || [],
      srid_filter: currentPageData.srid || [],
      groups_filter: currentPageData.group || [],
      date_sale_filter: {
        years: currentPageData.year || [],
        months: currentPageData.month || [],
        weekdays: currentPageData.week || [],
      },
    }
    dispatch(
      fetchReportByMonth({
        authToken: authToken,
        filters,
      })
    );
  }, [authToken, dispatch]);

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'По месяцам'} subTitle={'Отчёт /'} />
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <NewFilterGroup pageIdent='month' getData={handleFetchReport} />
            </div>
            {/* <div className='container dash-container'>
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
                  <div className={styles.filteWrapper}>
                  <FilterGroup
                    title='Артикул поставщика'
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
                      const currentValues = Array.isArray(
                        activeFilters['groups']
                      )
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
                      const currentValues = Array.isArray(
                        activeFilters['brand']
                      )
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
                    title='Артикул'
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
                      const currentValues = Array.isArray(
                        activeFilters['wb_id']
                      )
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
                <div className='container dash-container'>
                  <div>
                    <button
                      className={styles.applyButton}
                      onClick={() => {
                        const filterData = prepareFilterData();
                        handleFetchReport(filterData);
                      }}
                    >
                      Применить фильтры
                    </button>
                  </div>
                </div>
              </>
            )} */}
            <div className='container dash-container'>
              <SalesTable tableData={weeklyData} />
            </div>
          </>
        ) : (
          <>
            <div className='container dash-container'>
              <DemonstrationSection />
            </div>
            <span className={styles.responsiveImageWrapper}>
              <img
                src={plFake}
                alt='fakePL'
                className={styles.responsiveImage}
              />
              <span></span>
            </span>
          </>
        )}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportByMonth;
