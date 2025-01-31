import { useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByMonth } from '../redux/reportByMonth/reportByMonthActions';
import { fetchByMonthFilters } from '../redux/reportByMonth/byMonthFiltersAction';
import AuthContext from '../service/AuthContext';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import styles from './WeeklyReportByMonth.module.css';
import SalesTable from '../components/SaleTable';
import BottomNavigation from '../components/BottomNavigation';
import plFake from '../pages/images/month-fake.png';
import DemonstrationSection from '../components/DemonstrationSection';
import NewFilterGroup from '../components/finReport/FilterGroup'


const WeeklyReportByMonth = () => {
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { weeklyData, loading, error } = useSelector(
    (state) => state.reportByMonthSlice
  );
  const { byMonthFilters, isFiltersLoading } = useSelector((state) => state?.byMonthFiltersSlice);

  useEffect(() => {  
    dispatch(fetchByMonthFilters(
      authToken
    ))
  }, [authToken, dispatch]);

  const handleFetchReport = useCallback(() => {
    dispatch(
      fetchReportByMonth({
        authToken: authToken,
      })
    );
  }, [authToken, dispatch, isFiltersLoading]);

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'По месяцам'} subTitle={'Отчёт /'} />
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <NewFilterGroup pageIdent='month' filtersData={byMonthFilters} isLoading={isFiltersLoading} getData={handleFetchReport} />
            </div>
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
