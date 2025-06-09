import { useContext } from 'react';
import AuthContext from '../service/AuthContext';
import ExpenseTracker from '../components/ExpenseTracker';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import BottomNavigation from '../components/BottomNavigation';
import DemonstrationSection from '../components/DemonstrationSection';
import styles from './ExternalExpensesPage.module.css';
import plFake from '../pages/images/external-fake.png';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';

const ExternalExpensesPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <main className={styles.page}>
      <MobilePlug />
      {/* ------ SIDE BAR ------ */}
      <section className={styles.page__sideNavWrapper}>
        <Sidebar />
      </section>
      {/* ------ CONTENT ------ */}
      <section className={styles.page__content}>
        {/* header */}
        <div className={styles.page__headerWrapper}>
          <Header title='Внешние расходы' />
        </div>
        {user.is_report_downloaded ? (
          <div className={styles.page__widgetWrapper}>
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

        {/* !header */}
        <BottomNavigation />
      </section>
      {/* ---------------------- */}
    </main>
  )
};

export default ExternalExpensesPage;
