import { useEffect, useContext, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByMonth } from '../redux/reportByMonth/reportByMonthActions';
import { fetchByMonthFilters } from '../redux/reportByMonth/byMonthFiltersAction';
import AuthContext from '../service/AuthContext';
import styles from './WeeklyReportByMonth.module.css';
import SalesTable from '../components/SaleTable';
import BottomNavigation from '../components/BottomNavigation';
import plFake from '../pages/images/month-fake.png';
import DemonstrationSection from '../components/DemonstrationSection';
import NewFilterGroup from '../components/finReport/FilterGroup'
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';


const WeeklyReportByMonth = () => {
  const { authToken, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { weeklyData } = useSelector(
    (state) => state.reportByMonthSlice
  );
  const { byMonthFilters, isFiltersLoading } = useSelector((state) => state?.byMonthFiltersSlice);

  useEffect(() => {
    dispatch(fetchByMonthFilters(
      authToken
    ))
  }, [authToken, dispatch]);

  const handleFetchReport = useCallback(() => {
    setLoading(true);
    dispatch(
      fetchReportByMonth({
        authToken: authToken,
      })
    ).then(() => {
      setLoading(false);
    })
  }, [authToken, dispatch, isFiltersLoading]);

  return (
    <div className='dashboard-page'>
      <MobilePlug />
      <div style={{ height: '100vh', zIndex: 999 }}>
        <Sidebar />
      </div>
      {/* <SideNav /> */}
      <div className='dashboard-content pb-3' style={{ padding: '0 32px' }}>
        <div style={{ width: '100%', padding: '20px 0' }} className="container dash-container">
          <Header title={'По месяцам'} titlePrefix={'Отчёт'} />
        </div>
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <NewFilterGroup
                pageIdent='month'
                filtersData={byMonthFilters}
                isLoading={isFiltersLoading}
                getData={handleFetchReport}
              />
            </div>
            <div className='container dash-container'>
              {!loading ? (
                <SalesTable tableData={weeklyData} />
              ) : (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className='loader'></span>
                </div>
              )}
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
