import {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../service/AuthContext';
import { fetchDashboardFilters } from '../redux/filters/filtersDataActions';
import { fetchDashboardReport } from '../redux/dashboardReport/dashboardReportActions';
import styles from './FilterSection.module.css';
import FilterGroup from './FilterGroup';
import { monthNames, getMonthNumbers } from '../service/utils';

const FilterSection = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { authToken } = useContext(AuthContext);
  const { data: filterData, loading } = useSelector(
    (state) => state.filtersDataSlice
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    warehouse_name_filter: [],
    brand_name_filter: [],
    country_filter: [],
    delivery_company_filter: [],
    action_type_filter: [],
    groups_filter: [],
    date_order_filter: [],
    date_sale_filter: {
      years: [],
      months: [],
      weekdays: [],
    },
  });

  useImperativeHandle(ref, () => ({
    handleApplyFilters,
  }));

  useEffect(() => {
    dispatch(fetchDashboardFilters(authToken));
  }, [dispatch, authToken]);

  useEffect(() => {
    if (filterData) {
      setSelectedFilters({
        warehouse_name_filter: filterData.warehouse_name_filter || [],
        brand_name_filter: filterData.brand_name_filter || [],
        country_filter: filterData.country_filter || [],
        delivery_company_filter: filterData.delivery_company_filter || [],
        action_type_filter: filterData.action_type_filter || [],
        groups_filter: filterData.groups_filter || [],
        date_order_filter: filterData.date_order_filter || [],
        date_sale_filter: {
          years: filterData.date_sale_filter?.years || [],
          months:
            filterData.date_sale_filter?.months.map(
              (value) => monthNames[value] || value
            ) || [],
          weekdays: filterData.date_sale_filter?.weekdays || [],
        },
      });
      handleApplyFilters();
    }
  }, [filterData]);

  const processFilterData = (data, key) => {
    if (!data) return [];
    if (Array.isArray(data)) {
      return data.map((item, index) => ({
        id: index.toString(),
        label: item,
      }));
    }
    return [];
  };

  const handleApplyFilters = async () => {
    const filterPayload = {
      delivery_company_filter: selectedFilters.delivery_company_filter,
      brand_name_filter: selectedFilters.brand_name_filter,
      action_type_filter: selectedFilters.action_type_filter,
      country_filter: selectedFilters.country_filter,
      warehouse_name_filter: selectedFilters.warehouse_name_filter,
      groups_filter: selectedFilters.groups_filter,
      date_sale_filter: {
        years: selectedFilters.date_sale_filter.years,
        months: getMonthNumbers(selectedFilters.date_sale_filter.months),
        weekdays: selectedFilters.date_sale_filter.weekdays,
      },
    };

    dispatch(
      fetchDashboardReport({ token: authToken, filterData: filterPayload })
    );
  };

  const handleSelectDate = (category, id) => {
    const [parentKey, childKey] = category.split('.');

    // Handle select all case
    if (Array.isArray(id)) {
      setSelectedFilters((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: id,
        },
      }));
      return;
    }

    // Handle individual selection
    setSelectedFilters((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: prev[parentKey]?.[childKey]?.includes(id)
          ? prev[parentKey][childKey].filter((item) => item !== id)
          : [...(prev[parentKey]?.[childKey] || []), id],
      },
    }));
  };

  const handleSelect = (category, id) => {
    if (Array.isArray(id)) {
      // Handle select all case
      setSelectedFilters((prev) => ({
        ...prev,
        [category]: id,
      }));
      return;
    }

    if (category === 'date_sale_filter_weekday') {
      setSelectedFilters((prev) => ({
        ...prev,
        date_sale_filter: {
          ...prev.date_sale_filter,
          weekdays: prev.date_sale_filter?.weekdays?.includes(id)
            ? prev.date_sale_filter.weekdays.filter((item) => item !== id)
            : [...(prev.date_sale_filter?.weekdays || []), id],
        },
      }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [category]: prev[category].includes(id)
          ? prev[category].filter((item) => item !== id)
          : [...prev[category], id],
      }));
    }
  };

  const handleClearAll = (category) => {
    const [parentKey, childKey] = category.split('.');

    if (category === 'date_sale_filter_weekday') {
      setSelectedFilters((prev) => ({
        ...prev,
        date_sale_filter: {
          ...prev.date_sale_filter,
          weekdays: [],
        },
      }));
    } else if (childKey) {
      setSelectedFilters((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: [],
        },
      }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [category]: [],
      }));
    }
  };

  return (
    <div className={styles.filterContainer}>
      <button
        className={styles.collapseButton}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {!isCollapsed ? 'Свернуть фильтры' : 'Развернуть фильтры'}
      </button>

      {!isCollapsed && (
        <>
          <div className={styles.filterGrid}>
            <FilterGroup
              title='Склад'
              options={processFilterData(filterData?.warehouse_name_filter)}
              selected={selectedFilters.warehouse_name_filter || []}
              onSelect={(id) => handleSelect('warehouse_name_filter', id)}
              onClearAll={() => handleClearAll('warehouse_name_filter')}
              filterLoading={loading}
            />
            <FilterGroup
              title='Бренд'
              options={processFilterData(filterData?.brand_name_filter)}
              selected={selectedFilters.brand_name_filter || []}
              onSelect={(id) => handleSelect('brand_name_filter', id)}
              onClearAll={() => handleClearAll('brand_name_filter')}
              filterLoading={loading}
            />
            <FilterGroup
              title='Год'
              options={filterData?.date_sale_filter?.years.map((year) => ({
                id: year,
                label: year,
              }))}
              selected={selectedFilters?.date_sale_filter?.years || []}
              onSelect={(id) => handleSelectDate('date_sale_filter.years', id)}
              onClearAll={() => handleClearAll('date_sale_filter.years')}
              filterLoading={loading}
            />
            <FilterGroup
              title='Месяц'
              options={filterData?.date_sale_filter?.months.map((month) => ({
                id: month,
                label: monthNames[month] || month,
              }))}
              selected={selectedFilters.date_sale_filter?.months || []}
              onSelect={(id) => handleSelectDate('date_sale_filter.months', id)}
              onClearAll={() => handleClearAll('date_sale_filter.months')}
              filterLoading={loading}
            />
            <FilterGroup
              title='Неделя'
              options={filterData?.date_sale_filter?.weekdays.map(
                (weekday) => ({
                  id: weekday,
                  label: weekday,
                })
              )}
              selected={selectedFilters.date_sale_filter?.weekdays || []}
              onSelect={(id) =>
                handleSelectDate('date_sale_filter.weekdays', id)
              }
              onClearAll={() => handleClearAll('date_sale_filter.weekdays')}
              filterLoading={loading}
            />
            <FilterGroup
              title='Группа'
              options={processFilterData(filterData?.groups_filter)}
              selected={selectedFilters.groups_filter || []}
              onSelect={(id) => handleSelect('groups_filter', id)}
              onClearAll={() => handleClearAll('groups_filter')}
              filterLoading={loading}
            />
          </div>
          <div className='container dash-container'>
            <div>
              <button
                className={styles.applyButton}
                onClick={() => handleApplyFilters()}
              >
                Применить фильтры
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
FilterSection.displayName = 'FilterSection';
export default FilterSection;
