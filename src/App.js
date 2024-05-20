import './App.css';
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import Onboarding from './pages/Onboarding';
import AuthContext, { AuthProvider } from './service/AuthContext';
import ConfirmationPage from './pages/ConfirmationPage';
import DashboardPage from './pages/DashboardPage';
import { useContext } from 'react';
import MockUpPage from './pages/MockUpPage';
import ResetPage from './pages/ResetPage';
import RequestResetLink from './pages/RequestResetLink';
import LinkedShops from './pages/LinkedShops';
import MobileMenu from './components/MobileMenu';
import Calculate from './pages/Calculate';
import OrdersMap from './pages/OrdersMap';
import Settings from './pages/Settings';
import Spasibo from './pages/Spasibo';
import Instructions from './pages/Instructions';
import Monitoring from './pages/Monitoring';
import SupplyCount from './pages/SupplyCount';
import StockAnalysis from './pages/StockAnalysis';
import MainWidget from './pages/MainWidget';
import Politics from './pages/Politics';

function App() {

  const { user } = useContext(AuthContext)

  if (user) {
    return (
      <div className="App">

        <AuthProvider >
          <MobileMenu />
          <Routes>
            <Route path='/' element={<MockUpPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/spasibo' element={<Spasibo />} />
            <Route path='/politics' element={<Politics />} />
            <Route path='/instruction' element={<Instructions />} />
            <Route path='/development/onboarding' element={<Onboarding />} />
            <Route path='/development/dashboard' element={<DashboardPage />} />
            <Route path='/development/monitoring' element={<Monitoring />} />
            <Route path='/development/supply' element={<SupplyCount />} />
            <Route path='/development/home' element={<MainWidget />} />
            <Route path='/development/stock-analysis' element={<StockAnalysis />} />
            <Route path='/development/calculate' element={<Calculate />} />
            {/* <Route path='/development/settings' element={<Settings />} /> */}
            <Route path='/development/orders-map' element={<OrdersMap />} />
            <Route path='/development/linked-shops' element={<LinkedShops />} />
            <Route path='/reset' element={<RequestResetLink />} />
            <Route path='/confirmation/:email/:code' element={<ConfirmationPage />} />
            {/* <Route path='*' element={<Navigate to={'/development/dashboard'} replace />} /> */}
          </Routes>
        </AuthProvider>
      </div>
    );

  }

  return (
    <div className="App">

      <AuthProvider >
        <Routes>
          <Route path='/' element={<MockUpPage />} />
          {/* <Route path='/development/*' element={<Navigate to={'/signin'} replace />} /> */}
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/spasibo' element={<Spasibo />} />
          <Route path='/politics' element={<Politics />} />
          <Route path='/instruction' element={<Instructions />} />
          <Route path='/development/onboarding' element={<Onboarding />} />
          <Route path='/development/dashboard' element={<DashboardPage />} />
          <Route path='/development/monitoring' element={<Monitoring />} />
          <Route path='/development/supply' element={<SupplyCount />} />
          <Route path='/development/home' element={<MainWidget />} />
          <Route path='/development/linked-shops' element={<LinkedShops />} />
          <Route path='/development/stock-analysis' element={<StockAnalysis />} />
          <Route path='/development/calculate' element={<Calculate />} />
          {/* <Route path='/development/settings' element={<Settings />} /> */}
          <Route path='/development/orders-map' element={<OrdersMap />} />

          <Route path='/confirmation/:email/:code' element={<ConfirmationPage />} />
          <Route path='/restore/:email/:code' element={<ResetPage />} />
          <Route path='/reset' element={<RequestResetLink />} />
          {/* <Route path='*' element={<Navigate to={'/development/signin'} replace />} /> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
