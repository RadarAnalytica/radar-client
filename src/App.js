import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import Onboarding from './pages/Onboarding';
import AuthContext, { AuthProvider } from './service/AuthContext';
import ConfirmationPage from './pages/ConfirmationPage';
import DashboardPage from './pages/DashboardPage';
import { useContext } from 'react';
import MockUpPage from './pages/MockUpPage';

function App() {

  const { user } = useContext(AuthContext)

  console.log(user);

  if (user) {
    return (
      <div className="App">

        <AuthProvider >
          <Routes>
            <Route path='/' element={<MockUpPage />} />
            {/* <Route path='/development/signup' element={<SignUpPage />} />
            <Route path='/development/signin' element={<SignInPage />} /> */}
            <Route path='/development/onboarding' element={<Onboarding />} />
            <Route path='/development/dashboard' element={<DashboardPage />} />
            {/* <Route path='/development/confirmation/:email/:code' element={<ConfirmationPage />} /> */}
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
          <Route path='/development/signup' element={<SignUpPage />} />
          <Route path='/development/signin' element={<SignInPage />} />
          {/* <Route path='/development/onboarding' element={<Onboarding />} />
          <Route path='/development/dashboard' element={<DashboardPage />} />
          */}
          <Route path='/development/confirmation/:email/:code' element={<ConfirmationPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
