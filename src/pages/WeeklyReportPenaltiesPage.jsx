import { useState, useEffect, useContext } from 'react';
import FilterGroup from '../components/FilterGroup';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import styles from './WeeklyReportPenaltiesPage.module.css';
import LogisticsTable from '../components/LogisticsTable';
import BottomNavigation from '../components/BottomNavigation';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPenaltiesData } from '../redux/reportPrnalties/penaltiesActions';
import { monthNames, getMonthNumbers } from '../service/utils';

const WeeklyReportPenaltiesPage = () => {
  const dispatch = useDispatch();
  const { penaltiesData, loading } = useSelector(
    (state) => state.penaltiesSlice
  );
  const { authToken } = useContext(AuthContext);
  const [isOpenFilters, setIsOpenFilters] = useState(false);
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
  const [filterIsLoading, setFilterIsLoading] = useState(false);

  const handleApplyFilters = () => {
    const monthNumbers = getMonthNumbers(selectedFilters.month);

    const filters = {
      size_name_filter: selectedFilters.size,
      wb_id_filter: selectedFilters.article,
      srid_filter: selectedFilters.srid,
      title_filter: selectedFilters.goods,
      action_type_filter: selectedFilters.kindsOfLogistics,
      date_sale_filter: {
        years: selectedFilters.year,
        months: monthNumbers,
        weekdays: selectedFilters.week,
      },
    };
    dispatch(
      fetchPenaltiesData({
        filters,
        token: authToken,
      })
    );
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
    setFilterIsLoading(true);
    const fetchFilterOptions = async () => {
      try {
        const data = await ServiceFunctions.getPenaltiesFilters(authToken);
        // Convert months to their name representations using monthNames
        const monthValues = data.date_sale_filter?.months || [];
        const monthsWithNames = monthValues.map(
          (value) => monthNames[value] || value
        );
        // Set all filters initially selected

        setSelectedFilters({
          year: data.date_sale_filter?.years || [],
          month: monthsWithNames,
          week: data.date_sale_filter?.weekdays || [],
          article: data.wb_id_filter || [],
          size: data.size_name_filter || [],
          srid: data.srid_filter || [],
          kindsOfLogistics: data.action_type_filter || [],
          goods: data.title_filter || [],
        });
        setFilterDataSet(data);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      } finally {
        setFilterIsLoading(false);
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
                  options={
                    filterDataSet.date_sale_filter?.years.map((year) => ({
                      id: year,
                      label: year,
                    })) || []
                  }
                  selected={selectedFilters.year}
                  onSelect={(value) => {
                    // If the value is a single year, toggle it
                    if (typeof value === 'string') {
                      handleSelect('year', value);
                    }
                    // If it's an array (from select all), use it directly
                    else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        year: value,
                      }));
                    }
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Месяц'
                  options={
                    filterDataSet.date_sale_filter?.months.map((month) => ({
                      id: month,
                      label: monthNames[month] || month,
                    })) || []
                  }
                  selected={selectedFilters.month}
                  onSelect={(value) => {
                    if (typeof value === 'string') {
                      handleSelect('month', value);
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        month: value,
                      }));
                    }
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Неделя'
                  options={
                    filterDataSet.date_sale_filter?.weekdays.map((week) => ({
                      id: week,
                      label: week,
                    })) || []
                  }
                  selected={selectedFilters.week}
                  onSelect={(value) => {
                    if (typeof value === 'string') {
                      handleSelect('week', value);
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        week: value,
                      }));
                    }
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Артикул'
                  options={
                    filterDataSet.wb_id_filter?.map((id) => ({
                      id: id,
                      label: id,
                    })) || []
                  }
                  selected={selectedFilters.article}
                  onSelect={(value) => {
                    if (typeof value === 'string') {
                      handleSelect('article', value);
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        article: value,
                      }));
                    }
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Размер'
                  options={
                    filterDataSet.size_name_filter?.map((size) => ({
                      id: size,
                      label: size,
                    })) || []
                  }
                  selected={selectedFilters.size}
                  onSelect={(value) => {
                    if (typeof value === 'string') {
                      handleSelect('size', value);
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        size: value,
                      }));
                    }
                  }}
                  filterLoading={filterIsLoading}
                />
                <FilterGroup
                  title='Srid'
                  options={
                    filterDataSet.srid_filter?.map((srid) => ({
                      id: srid,
                      label: srid,
                    })) || []
                  }
                  selected={selectedFilters.srid}
                  onSelect={(value) => {
                    if (typeof value === 'string') {
                      handleSelect('srid', value);
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        srid: value,
                      }));
                    }
                  }}
                  filterLoading={filterIsLoading}
                />
              </div>
              <div className={styles.filterContainerTwo}>
                <FilterGroup
                  title='Виды логистики, штрафов и доплат'
                  options={
                    filterDataSet.action_type_filter?.map((type) => ({
                      id: type,
                      label: type,
                    })) || []
                  }
                  selected={selectedFilters.kindsOfLogistics}
                  onSelect={(value) => {
                    if (typeof value === 'string') {
                      handleSelect('kindsOfLogistics', value);
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        kindsOfLogistics: value,
                      }));
                    }
                  }}
                  filterLoading={filterIsLoading}
                  size='big'
                />
                <FilterGroup
                  title='Товар'
                  options={
                    filterDataSet.title_filter?.map((title) => ({
                      id: title,
                      label: title,
                    })) || []
                  }
                  selected={selectedFilters.goods}
                  onSelect={(value) => {
                    if (typeof value === 'string') {
                      handleSelect('goods', value);
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        goods: value,
                      }));
                    }
                  }}
                  filterLoading={filterIsLoading}
                  size='big'
                />
              </div>
            </div>
            <div className='container dash-container'>
              <div>
                <button
                  className={styles.applyButton}
                  onClick={handleApplyFilters}
                >
                  Применить фильтры
                </button>
              </div>
            </div>
          </>
        )}
        <div className='container dash-container'>
          <LogisticsTable data={penaltiesData} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportPenaltiesPage;
