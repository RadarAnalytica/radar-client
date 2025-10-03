import ExpenseTracker from '../components/ExpenseTracker';
import BottomNavigation from '../components/BottomNavigation';
import styles from './ExternalExpensesPage.module.css';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';

const ExternalExpensesPage = () => {
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

        <div className={styles.page__widgetWrapper}>
          <ExpenseTracker />
        </div>

        <BottomNavigation />
      </section>
    </main>
  );
};

export default ExternalExpensesPage;
