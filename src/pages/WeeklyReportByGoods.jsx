import { useState, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByGoods } from '../redux/reportByGoods/reportByGoodsActions';
import AuthContext from '../service/AuthContext';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import styles from './WeeklyReportByGoods.module.css';
import TableByGoods from '../components/TableByGoods';
import BottomNavigation from '../components/BottomNavigation';
import plFake from '../pages/images/goods-fake.png';
import DemonstrationSection from '../components/DemonstrationSection';
import NewFilterGroup from '../components/finReport/FilterGroup';

const WeeklyReportByGoods = () => {
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { weeklyData } = useSelector((state) => state.reportByGoodsSlice);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchReport = useCallback(() => {
    setIsLoading(true);
    const storageItem = localStorage.getItem('goods');
    let currentPageData = JSON.parse(storageItem);
    currentPageData = currentPageData ? currentPageData : {};

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
    };
    dispatch(
      fetchReportByGoods({
        authToken: authToken,
        filters,
      })
    ).then(() => {
      setIsLoading(false);
    });
  }, [authToken, dispatch]);

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'По товарам'} subTitle={'Отчёт /'} />
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <NewFilterGroup pageIdent='goods' getData={handleFetchReport} />
            </div>
            <div className='container dash-container'>
              {!isLoading ? (
                <TableByGoods data={weeklyData} />
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
              <span className={styles.marginRight}></span>
            </span>
          </>
        )}
        <BottomNavigation />
      </div>
    </div>
  );
};
export default WeeklyReportByGoods;
