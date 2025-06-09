import { useEffect, useContext, useCallback } from 'react';
import styles from './WeeklyReportPenaltiesPage.module.css';
import LogisticsTable from '../components/LogisticsTable';
import BottomNavigation from '../components/BottomNavigation';
import AuthContext from '../service/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPenaltiesData } from '../redux/reportPrnalties/penaltiesActions';
import { fetchPenaltyFilters } from '../redux/reportPrnalties/penaltyFiltersActions';
import DemonstrationSection from '../components/DemonstrationSection';
import plFake from '../pages/images/penalties-fake.png';
import NewFilterGroup from '../components/finReport/FilterGroup'
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';

const WeeklyReportPenaltiesPage = () => {
  const dispatch = useDispatch();
  const { penaltiesData, loading } = useSelector(
    (state) => state.penaltiesSlice
  );
  const { penaltyFilters, isFiltersLoading } = useSelector((state) => state?.penaltyFiltersSlice);
  const { authToken, user } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchPenaltyFilters(
      authToken
    ))
  }, [authToken, dispatch])

  const handleApplyFilters = useCallback(() => {
    dispatch(
      fetchPenaltiesData({
        token: authToken,
      })
    );
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
          <Header title={'Штрафы'} titlePrefix={'Отчёт'} />
        </div>
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <NewFilterGroup pageIdent='penalty' filtersData={penaltyFilters} isLoading={isFiltersLoading} getData={handleApplyFilters} />
            </div>
            <div className='container dash-container'>
              <LogisticsTable data={penaltiesData} loading={loading} />
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
