import { useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByGoods } from '@/redux/reportByGoods/reportByGoodsActions';
import { fetchByGoodsFilters } from '@/redux/reportByGoods/byGoodsFiltersAction';
import AuthContext from '../service/AuthContext';
import TableByGoods from '../components/TableByGoods';
import BottomNavigation from '../components/BottomNavigation';
import NewFilterGroup from '../components/finReport/FilterGroup'
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';

const WeeklyReportByGoods = () => {
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { weeklyData, loading, error } = useSelector(state => state.reportByGoodsSlice);
  const { byGoodsFilters, isFiltersLoading } = useSelector((state) => state?.byGoodsFiltersSlice);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchByGoodsFilters(
      authToken
    ));
  }, [authToken, dispatch]);

  const handleFetchReport = useCallback(() => {
    setIsLoading(true);
    dispatch(
      fetchReportByGoods({
        authToken: authToken,
      })
    ).then(() => {
      setIsLoading(false);
    });
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
          <Header title={'По товарам'} titlePrefix={'Отчёт'} />
        </div>
        <div className='container dash-container'>
          <NewFilterGroup pageIdent='goods' filtersData={byGoodsFilters} isLoading={isFiltersLoading} getData={handleFetchReport} />
        </div>
        <div className='container dash-container'>
          {!isLoading
            ? <TableByGoods data={weeklyData} />
            : <div style={{
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
          }
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};
export default WeeklyReportByGoods;
