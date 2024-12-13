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
  const { } = useContext(AuthContext);
  const user = {
    id: 2,
    role: 'admin',
    is_confirmed: true,
    is_onboarded: true,
    is_test_used: false,
    email: 'modinsv@yandex.ru',
    subscription_status: 'Smart',
    is_report_downloaded: !null,
  };

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
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
