import { useState, useContext, useCallback } from 'react';
import AuthContext from '../service/AuthContext';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import TablePL from '../components/TablePL';
import BottomNavigation from '../components/BottomNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPLReport } from '../redux/reportPL/plReportActions';
import styles from './WeeklyReportPL.module.css';
import DemonstrationSection from '../components/DemonstrationSection';
import plFake from '../pages/images/goods-fake.png';
import NewFilterGroup from '../components/finReport/FilterGroup';

const WeeklyReportPL = () => {
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { plData } = useSelector((state) => state?.plReportSlice);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilters = useCallback(() => {
    setIsLoading(true);
    // Get the current active filters directly
    const storageItem = localStorage.getItem('pl');
    let currentPageData = JSON.parse(storageItem);
    currentPageData = currentPageData ? currentPageData : {};

    const brandFilter = currentPageData.brand.join(',');
    const groupFilter = currentPageData.group.join(',');

    dispatch(
      fetchPLReport({
        brandFilter,
        groupFilter,
        token: authToken,
      })
    ).then(() => {
      setIsLoading(false);
    });
  }, [authToken, dispatch]);

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'P&L'} subTitle={'Отчёт /'} />
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <NewFilterGroup pageIdent='pl' getData={handleApplyFilters} />
            </div>
            <div className='container dash-container'>
              {!isLoading ? (
                <TablePL plData={plData} />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    overflow: 'auto',
                    position: 'relative',
                    borderRadius: '16px',
                    boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.08)',
                    willChange: 'transform',
                    marginTop: '21px',
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
