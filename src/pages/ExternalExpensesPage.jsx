import ExpenseTracker from '../components/ExpenseTracker';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import BottomNavigation from '../components/BottomNavigation';

const ExternalExpensesPage = () => {
  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'Внешние расходы'} subTitle={'Отчёт /'} />
        <div className='container dash-container'>
          <ExpenseTracker />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default ExternalExpensesPage;
