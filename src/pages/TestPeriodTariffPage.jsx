import React, { useContext, useEffect } from 'react';
import AuthContext from '../service/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarMainHome from '../components/NavbarMainHome';
import LimitedFooter from '../components/LimitedFooter';
import SelectRate from '../components/SelectRate';

const TestPeriodTariffPage = () => {
  const navigate = useNavigate();
  const { user, logout, authToken } = useContext(AuthContext);
  const location = useLocation();
  const checkIdQueryParam = () => {
    const searchParams = new URLSearchParams(location.search);
    const idQueryParam = searchParams.get('id');
    if (idQueryParam && parseInt(idQueryParam) !== user.id) {
      logout();
      navigate('/signin');
    } else {
      return;
    }
  };

  useEffect(() => {
    if (user) {
      const refreshToken = async () => {
        await refreshUserToken();
      };

      // Initial token refresh
      refreshToken();

      // Set up interval to refresh token every minute
      const intervalId = setInterval(refreshToken, 60000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []);

  const refreshUserToken = async () => {
    try {
      const response = await fetch(`${URL}/api/user/refresh`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'JWT ' + authToken,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  useEffect(() => {
    if (location.search) {
      checkIdQueryParam();
    }
  }, [location.search]);

  const redirect = () => {
    if (!user) {
      navigate('/signup');
    } else {
      if (user?.is_onboarded) {
        user?.subscription_status === 'expired'
          ? navigate('/tariffs')
          : navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }
  };
  if (!user) {
    window.location.href = `${URL}/signup`;
  }

  return (
    <div className='page-white'>
      <div className='container widbody-container container-xlwidth '>
        <NavbarMainHome onlyLogo />
        <div className='tariffs'>
          <SelectRate redirect={redirect} />
        </div>
        <LimitedFooter />
      </div>
    </div>
  );
};

export default TestPeriodTariffPage;
