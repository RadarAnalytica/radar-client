import { useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from '../service/AuthContext';
import TablePL from '../components/TablePL';
import BottomNavigation from '../components/BottomNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPLReport } from '@/redux/reportPL/plReportActions';
import { fetchPLFilters } from '@/redux/reportPL/plFiltersAction';
import styles from './WeeklyReportPL.module.css';
import DemonstrationSection from '../components/DemonstrationSection';
import plFake from '../pages/images/goods-fake.png';
import NewFilterGroup from '../components/finReport/FilterGroup';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";

const WeeklyReportPL = () => {
  const { authToken, user } = useContext(AuthContext);
  const {isDemoMode} = useDemoMode();
  const dispatch = useDispatch();
  const { plData } = useSelector((state) => state?.plReportSlice);
  const { plFilters, isFiltersLoading } = useSelector((state) => state?.plFiltersSlice);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchPLFilters(
      authToken
    ));

  }, [authToken, dispatch]);

  const handleApplyFilters = useCallback(() => {
    setIsLoading(true);

    dispatch(fetchPLReport({ token: authToken })).then(() => {
      setIsLoading(false);
    });
  }, [authToken, dispatch, isFiltersLoading]);

  return (
    <div className='dashboard-page'>
      <MobilePlug />

      <div style={{ height: '100vh', zIndex: 999 }}>
        <Sidebar />
      </div>

      <div className='dashboard-content pb-3' style={{ padding: '0 32px' }}>
        <div style={{ width: '100%', padding: '20px 0' }} className="container dash-container">
          <Header title={'P&L'} titlePrefix={'Отчёт'} />
        </div>

        {isDemoMode &&
          <div className='mb-3'>
            <NoSubscriptionWarningBlock />
          </div>
        }

        {!user.is_report_downloaded &&
          <div className='mb-3'>
            <DemonstrationSection />
          </div>
        }

        <div className='container dash-container'>
          <NewFilterGroup pageIdent='pl' filtersData={plFilters} isLoading={isFiltersLoading} getData={handleApplyFilters} />
        </div>

        <div className='container dash-container'>
          <TablePL plData={plData} isLoading={isLoading} />
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportPL;
