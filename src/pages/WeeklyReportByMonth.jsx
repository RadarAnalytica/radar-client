import { useContext, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByMonth } from '../redux/reportByMonth/reportByMonthActions';
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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { weeklyData } = useSelector(
    (state) => state.reportByMonthSlice
  );

  const handleFetchReport = useCallback(() => {
    setLoading(true);
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
    ).then(() => {
      setLoading(false);
    })
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
            <div className='container dash-container'>
              {!loading ? (<SalesTable tableData={weeklyData} />) : (
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