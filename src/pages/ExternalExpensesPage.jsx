import { useContext } from 'react';
import ExpenseTracker from '../components/ExpenseTracker';
import BottomNavigation from '../components/BottomNavigation';
import styles from './ExternalExpensesPage.module.css';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";
import AuthContext from '../service/AuthContext';
import DemonstrationSection from '../components/DemonstrationSection';

const ExternalExpensesPage = () => {
  const {isDemoMode} = useDemoMode();
  const { user } = useContext(AuthContext);

  return (
    <main className={styles.page}>
      <MobilePlug />

      <section className={styles.page__sideNavWrapper}>
        <Sidebar />
      </section>

      <section className={styles.page__content}>
        <div className={styles.page__headerWrapper}>
          <Header title='Внешние расходы' />
        </div>

        {isDemoMode &&
          <NoSubscriptionWarningBlock />
        }

        {!user.is_report_downloaded &&
          <DemonstrationSection />
        }

        <div className={styles.page__widgetWrapper}>
          <ExpenseTracker />
        </div>

        <BottomNavigation />
      </section>
    </main>
  );
};

export default ExternalExpensesPage;
