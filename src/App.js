import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import Onboarding from './pages/Onboarding';
import AuthContext, { AuthProvider } from './service/AuthContext';
import ConfirmationPage from './pages/ConfirmationPage';
import DashboardPage from './pages/DashboardPage';
import { useContext } from 'react';

function App() {

  // const { accessToken } = useContext(AuthContext)

  return (
    <div className="App">
      {/* <Router> */}
      <AuthProvider >

        <Routes>
          {/* <Route path='/' element={<Navigate to={<SignUpPage />} replace />} /> */}
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/confirmation/:email/:code' element={<ConfirmationPage />} />
        </Routes>
      </AuthProvider>
      {/* </Router> */}
    </div>
  );
}

export default App;
