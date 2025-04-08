import { useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '../service/serviceFunctions';
import FilterGroup from '../components/FilterGroup';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import TablePL from '../components/TablePL';
import BottomNavigation from '../components/BottomNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPLReport } from '../redux/reportPL/plReportActions';
import { fetchPLFilters } from '../redux/reportPL/plFiltersAction';
import styles from './WeeklyReportPL.module.css';
import DemonstrationSection from '../components/DemonstrationSection';
import plFake from '../pages/images/goods-fake.png';
import NewFilterGroup from '../components/finReport/FilterGroup'

const WeeklyReportPL = () => {
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { plData } = useSelector((state) => state?.plReportSlice);
  const { plFilters, isFiltersLoading } = useSelector((state) => state?.plFiltersSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    group: [],
  });
  const [filterOptions, setFilterOptions] = useState([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchPLFilters(
      authToken
    ))
    
  }, [authToken, dispatch])

  // const getPLFilters = useCallback((token) => {
       
  //   dispatch(
  //     fetchPLFilters({
  //       token: token,
  //     })
  //   );
  //   console.log('plFilters', plFilters);
    
  // })

  const handleApplyFilters = useCallback(() => {
    setIsLoading(true);
    // Get the current active filters directly
    // const storageItem = localStorage.getItem('pl')
    // let currentPageData = JSON.parse(storageItem)
    // currentPageData = currentPageData ? currentPageData : {}  
    // console.log('currentPageData', currentPageData);

    // const brandFilter = currentPageData.brand;
    // const groupFilter = currentPageData.group;
    dispatch(
      fetchPLReport({token: authToken}
      )
    ).then(() => {
      setIsLoading(false);
    })
    
    return
    
    if (isFiltersLoading === false) {
      console.log('plFilters in get PL data', plFilters);
      // console.log('==DATA== in get PL data', data);
      
      
      const brandFilter = []
      const groupFilter = []
      console.log('brandFilterList', brandFilter);
      console.log('groupFilterList', groupFilter);
      if (!!plFilters.brand && Object.keys(plFilters.brand).length > 0) {
        for (let _key of Object.keys(plFilters.brand)) {
          if (!!plFilters.brand[_key]) {
            brandFilter.push(_key)
          }
        }
      }
      if (!!plFilters.group && Object.keys(plFilters.group).length > 0) {
        for (let _key of Object.keys(plFilters.group)) {
          if (!!plFilters.group[_key]) {
            groupFilter.push(_key)
          }
        }
      }
      
      
    }
    
  }, [authToken, dispatch, isFiltersLoading]);

  // useEffect(() => {
  //   const loadFilters = async () => {
  //     setIsLoadingFilters(true);
  //     try {
  //       const filters = await ServiceFunctions.getPLFilters(authToken);
  //       setFilterOptions(filters.filterOptions);

  //       // Set all filters as selected initially
  //       if (filters.filterOptions && filters.filterOptions.length > 0) {
  //         const initialFilters = {
  //           brand:
  //             filters.filterOptions
  //               .find((filter) => filter.id === 'brand')
  //               ?.options.map((opt) => opt.value) || [],
  //           group:
  //             filters.filterOptions
  //               .find((filter) => filter.id === 'group')
  //               ?.options.map((opt) => opt.value) || [],
  //         };
  //         setActiveFilters(initialFilters);
  //       }
  //     } catch (error) {
  //       console.error('Error loading filters:', error);
  //     } finally {
  //       setIsLoadingFilters(false);
  //     }
  //   };

  //   loadFilters();
  // }, []);

  // useEffect(() => {
  //   if (filterOptions.length > 0) {
  //     const savedFilters = localStorage.getItem('plReportFilters');
  //     console.log('savedFilters', savedFilters);
  //     if (savedFilters) {
  //       setActiveFilters(JSON.parse(savedFilters));
  //       handleApplyFilters(); // Move handleApplyFilters here
  //     } else {
  //       const initialFilters = {
  //         brand:
  //           filterOptions
  //             .find((filter) => filter.id === 'brand')
  //             ?.options.map((opt) => opt.value) || [],
  //         group:
  //           filterOptions
  //             .find((filter) => filter.id === 'group')
  //             ?.options.map((opt) => opt.value) || [],
  //       };
  //       setActiveFilters(initialFilters);
  //       handleApplyFilters(); // And here
  //     }
  //   }
  // }, [filterOptions]);

  // Check for saved filters first
  // useEffect(() => {
  //   if (filterOptions.length > 0) {
  //     const savedFilters = localStorage.getItem('plReportFilters');
  //     if (savedFilters) {
  //       setActiveFilters(JSON.parse(savedFilters));
  //     } else {
  //       const initialFilters = {
  //         brand:
  //           filterOptions
  //             .find((filter) => filter.id === 'brand')
  //             ?.options.map((opt) => opt.value) || [],
  //         group:
  //           filterOptions
  //             .find((filter) => filter.id === 'group')
  //             ?.options.map((opt) => opt.value) || [],
  //       };
  //       setActiveFilters(initialFilters);
  //     }
  //     handleApplyFilters();
  //   }
  // }, [filterOptions]);

  // Handle saving selections
  // useEffect(() => {
  //   const hasSelectedFilters = Object.values(activeFilters).some(
  //     (filters) => filters.length > 0
  //   );

  //   if (hasSelectedFilters) {
  //     localStorage.setItem('plReportFilters', JSON.stringify(activeFilters));
  //   }
  // }, [activeFilters]);

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

  return (
    <div className='dashboard-page'>
      <MobilePlug />
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'P&L'} subTitle={'Отчёт /'} />
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <NewFilterGroup pageIdent='pl' filtersData={plFilters} isLoading={isFiltersLoading} getData={handleApplyFilters} />
            </div>
            <div className='container dash-container'>
              <TablePL plData={plData} isLoading={isLoading} />
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
