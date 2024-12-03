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
import DemonstrationSection from '../components/DemonstrationSection';
import plFake from '../pages/images/goods-fake.png';

const WeeklyReportPL = () => {
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { plData, isLoading } = useSelector((state) => state?.plReportSlice);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    group: [],
  });
  console.log('activeFilters', activeFilters);
  const [filterOptions, setFilterOptions] = useState([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

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
      setIsLoadingFilters(true);
      try {
        const filters = await ServiceFunctions.getPLFilters(authToken);
        setFilterOptions(filters.filterOptions);

        // Set all filters as selected initially
        if (filters.filterOptions && filters.filterOptions.length > 0) {
          const initialFilters = {
            brand:
              filters.filterOptions
                .find((filter) => filter.id === 'brand')
                ?.options.map((opt) => opt.value) || [],
            group:
              filters.filterOptions
                .find((filter) => filter.id === 'group')
                ?.options.map((opt) => opt.value) || [],
          };
          setActiveFilters(initialFilters);
        }
      } catch (error) {
        console.error('Error loading filters:', error);
      } finally {
        setIsLoadingFilters(false);
      }
    };

    loadFilters();
  }, []);

  const handleFilterChange = (filterId, value) => {
    setActiveFilters((prevFilters) => {
      // If value is an array (select all case), directly set it
      if (Array.isArray(value)) {
        return {
          ...prevFilters,
          [filterId]: value,
        };
      }

      // For individual selections
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

  const handleSelectAll = (filterId) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: filterOptions
        .find((filter) => filter.id === filterId)
        .options.map((opt) => opt.value),
    }));
  };

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
  console.log('user.is_report_downloaded ', user.is_report_downloaded);

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'P&L'} subTitle={'Отчёт /'} />
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <div className={styles.filterContainer}>
                <div className={styles.filterContainer}>
                  <FilterGroup
                    title='Бренд'
                    options={
                      filterOptions
                        .find((filter) => filter.id === 'brand')
                        ?.options.map((opt) => ({
                          id: opt.value,
                          label: opt.label,
                        })) || []
                    }
                    selected={activeFilters.brand}
                    onSelect={(value) => handleFilterChange('brand', value)}
                    filterLoading={isLoadingFilters}
                  />
                  <FilterGroup
                    title='Группа'
                    options={
                      filterOptions
                        .find((filter) => filter.id === 'group')
                        ?.options.map((opt) => ({
                          id: opt.value,
                          label: opt.label,
                        })) || []
                    }
                    selected={activeFilters['group']}
                    onSelect={(value) => handleFilterChange('group', value)}
                    onClearAll={() => handleClearAll('group')}
                    onSelectAll={() => handleSelectAll('group')}
                    filterLoading={isLoadingFilters}
                  />
                </div>
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
            <div className='container dash-container'>
              <TablePL plData={plData} />
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
            </span>
            <span></span>
          </>
        )}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportPL;
