import { useContext } from 'react';
import AuthContext from '../service/AuthContext';
import ExpenseTracker from '../components/ExpenseTracker';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import BottomNavigation from '../components/BottomNavigation';
import DemonstrationSection from '../components/DemonstrationSection';
import styles from './ExternalExpensesPage.module.css';
import plFake from '../pages/images/external-fake.png';

const ExternalExpensesPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content'>
        <TopNav title={'Внешние расходы'} subTitle={'Отчёт /'} />
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
