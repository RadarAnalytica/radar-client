import { useState, useEffect, useContext, useCallback } from 'react';
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
import { fetchPenaltyFilters } from '../redux/reportPrnalties/penaltyFiltersActions';

import { monthNames, getMonthNumbers } from '../service/utils';
import DemonstrationSection from '../components/DemonstrationSection';
import plFake from '../pages/images/penalties-fake.png';
import NewFilterGroup from '../components/finReport/FilterGroup'


const WeeklyReportPenaltiesPage = () => {
  const dispatch = useDispatch();
  const { penaltiesData, loading } = useSelector(
    (state) => state.penaltiesSlice
  );
  const { penaltyFilters, isFiltersLoading } = useSelector((state) => state?.penaltyFiltersSlice);
  const { authToken, user } = useContext(AuthContext);
  // const [isOpenFilters, setIsOpenFilters] = useState(false);
  // const [filterDataSet, setFilterDataSet] = useState({});
  // const [selectedFilters, setSelectedFilters] = useState({
  //   year: [],
  //   month: [],
  //   week: [],
  //   article: [],
  //   size: [],
  //   srid: [],
  //   kindsOfLogistics: [],
  //   goods: [],
  // });
  // const [filterIsLoading, setFilterIsLoading] = useState(false);

  useEffect(() => {
      dispatch(fetchPenaltyFilters(
        authToken
      ))
    }, [authToken, dispatch])

  const handleApplyFilters = useCallback(() => {
    // const monthNumbers = getMonthNumbers(selectedFilters.month);
    // const storageItem = localStorage.getItem('penalty')
    // let currentPageData = JSON.parse(storageItem)
    // currentPageData = currentPageData ? currentPageData : {}  
    // console.log('currentPageData', currentPageData);

    // const filters = {
    //   size_name_filter: currentPageData.size,
    //   wb_id_filter: currentPageData.wbId,
    //   srid_filter: currentPageData.srid,
    //   title_filter: currentPageData.product,
    //   action_type_filter: currentPageData.types,
    //   date_sale_filter: {
    //     years: currentPageData.year,
    //     months: currentPageData.month,
    //     weekdays: currentPageData.week,
    //   },
    // };
    dispatch(
      fetchPenaltiesData({
        token: authToken,
      })
    );
  }, [authToken, dispatch, isFiltersLoading]);

  // const handleSelect = (category, id) => {
  //   setSelectedFilters((prev) => ({
  //     ...prev,
  //     [category]: prev[category].includes(id)
  //       ? prev[category].filter((item) => item !== id)
  //       : [...prev[category], id],
  //   }));
  // };

  // const handleClearAll = (category) => {
  //   setSelectedFilters((prev) => ({
  //     ...prev,
  //     [category]: [],
  //   }));
  // };

  // useEffect(() => {
  //   setFilterIsLoading(true);
  //   const fetchFilterOptions = async () => {
  //     try {
  //       const data = await ServiceFunctions.getPenaltiesFilters(authToken);
  //       // Convert months to their name representations using monthNames
  //       const monthValues = data.date_sale_filter?.months || [];
  //       const monthsWithNames = monthValues.map(
  //         (value) => monthNames[value] || value
  //       );
  //       // Set all filters initially selected

  //       const initialFilters = {
  //         year: data.date_sale_filter?.years || [],
  //         month: monthsWithNames,
  //         week: data.date_sale_filter?.weekdays || [],
  //         article: data.wb_id_filter || [],
  //         size: data.size_name_filter || [],
  //         srid: data.srid_filter || [],
  //         kindsOfLogistics: data.action_type_filter || [],
  //         goods: data.title_filter || [],
  //       };

  //       setSelectedFilters(initialFilters);
  //       setFilterDataSet(data);

  //       // Prepare and dispatch the initial filters
  //       const monthNumbers = getMonthNumbers(monthsWithNames);
  //       const filters = {
  //         size_name_filter: initialFilters.size,
  //         wb_id_filter: initialFilters.article,
  //         srid_filter: initialFilters.srid,
  //         title_filter: initialFilters.goods,
  //         action_type_filter: initialFilters.kindsOfLogistics,
  //         date_sale_filter: {
  //           years: initialFilters.year,
  //           months: monthNumbers,
  //           weekdays: initialFilters.week,
  //         },
  //       };

  //       dispatch(
  //         fetchPenaltiesData({
  //           filters,
  //           token: authToken,
  //         })
  //       );
  //     } catch (error) {
  //       console.error('Failed to fetch filter options:', error);
  //     } finally {
  //       setFilterIsLoading(false);
  //     }
  //   };

  //   fetchFilterOptions();
  // }, []);

  // useEffect(() => {
  //   if (filterDataSet && Object.keys(filterDataSet).length > 0) {
  //     const savedFilters = localStorage.getItem('penaltiesReportFilters');
  //     if (savedFilters) {
  //       const parsedFilters = JSON.parse(savedFilters);
  //       setSelectedFilters(parsedFilters);

  //       // Prepare and dispatch filters
  //       const monthNumbers = getMonthNumbers(parsedFilters.month);
  //       const filters = {
  //         size_name_filter: parsedFilters.size,
  //         wb_id_filter: parsedFilters.article,
  //         srid_filter: parsedFilters.srid,
  //         title_filter: parsedFilters.goods,
  //         action_type_filter: parsedFilters.kindsOfLogistics,
  //         date_sale_filter: {
  //           years: parsedFilters.year,
  //           months: monthNumbers,
  //           weekdays: parsedFilters.week,
  //         },
  //       };

  //       dispatch(
  //         fetchPenaltiesData({
  //           // filters,
  //           token: authToken,
  //         })
  //       );
  //     }
  //   }
  // }, [filterDataSet]);

  // Add effect to save filters when they change
  // useEffect(() => {
  //   const hasSelectedFilters = Object.values(selectedFilters).some(
  //     (filters) => filters.length > 0
  //   );

  //   if (hasSelectedFilters) {
  //     localStorage.setItem(
  //       'penaltiesReportFilters',
  //       JSON.stringify(selectedFilters)
  //     );
  //   }
  // }, [selectedFilters]);

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'Штрафы'} subTitle={'Отчёт /'} />
        {user.is_report_downloaded ? (
          <>
          <div className='container dash-container'>
              <NewFilterGroup pageIdent='penalty' filtersData={penaltyFilters} isLoading={isFiltersLoading} getData={handleApplyFilters} />
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
                        filterDataSet.date_sale_filter?.weekdays.map(
                          (week) => ({
                            id: week,
                            label: week,
                          })
                        ) || []
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
                    />fect(() => {
  //   if (Object.keys(selectedYears ?? {}).length > 0) {
  //     localStorage.setItem('selectedYears', JSON.stringify(selectedYears));
  //   }
  //   if (Object.keys(selectedArticles ?? {}).length > 0) {
  //     localStorage.setItem(
  //       'selectedArticles',
  //       JSON.stringify(selectedArticles)
  //     );
  //   }
  //   if (Object.keys(selectedBrands ?? {}).length > 0) {
  //     localStorage.setItem('selectedBrands', JSON.stringify(selectedBrands));
  //   }
  //   if (Object.keys(selectedGroups ?? {}).length > 0) {
  //     localStorage.setItem('selectedGroups', JSON.stringify(selectedGroups));
  //   }
  //   if (Object.keys(selectedMonths ?? {}).length > 0) {
  //     localStorage.setItem('selectedMonths', JSON.stringify(selectedMonths));
  //   }
  //   if (Object.keys(selectedWeeks ?? {}).length > 0) {
  //     localStorage.setItem('selectedWeeks', JSON.stringify(selectedWeeks));
  //   }
  // }, [
  //   selectedYears,
  //   selectedMonths,
  //   selectedArticles,
  //   selectedBrands,
  //   selectedGroups,
  //   selectedWeeks,
  // ]);
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
            )} */}
            <div className='container dash-container'>
              <LogisticsTable data={penaltiesData} />
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

export default WeeklyReportPenaltiesPage;
