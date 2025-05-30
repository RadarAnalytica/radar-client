import { useContext } from 'react';
import AuthContext from '../service/AuthContext';
import ExpenseTracker from '../components/ExpenseTracker';
import BottomNavigation from '../components/BottomNavigation';
import DemonstrationSection from '../components/DemonstrationSection';
import styles from './ExternalExpensesPage.module.css';
import plFake from '../pages/images/external-fake.png';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';

const ExternalExpensesPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='dashboard-page'>
      <MobilePlug />
      <div style={{ height: '100vh', zIndex: 999 }}>
        <Sidebar />
      </div>
      {/* <SideNav /> */}
      <div className='dashboard-content' style={{ padding: '0 32px' }}>
        <div style={{ margin: '20px 0' }}>
          <Header title={'Внешние расходы'} titlePrefix={'Отчёт'} />
        </div>
        {user.is_report_downloaded ? (
          <div className='container dash-container'>
            <ExpenseTracker />
          </div>
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

export default ExternalExpensesPage;
