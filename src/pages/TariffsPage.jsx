import React, { useContext, useEffect } from 'react';
import './styles.css';
import NavbarMainHome from '../components/NavbarMainHome';
import LimitedFooter from '../components/LimitedFooter';
import { useNavigate, useLocation } from 'react-router-dom';
import SelectRate from '../components/SelectRate';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config';
import { useAppDispatch } from '../redux/hooks';
import { fetchMessages } from '../redux/messages/messagesSlice';
import FooterNewVersion from '../components/FooterNewVersion';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';

const TariffsPage = () => {
  const navigate = useNavigate();
  const { user, logout, authToken } = useContext(AuthContext);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const redirect = () => {
    if (!user) {
      navigate('/signup');
    } else {
      if (user?.is_onboarded) {
        user?.subscription_status === 'expired'
          ? navigate('/settings', {state: {tab: 'tariffs'}})
          : navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }
  };
  if (!user) {
    window.location.href = `${URL}/signup`;
  }

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

  return (
    <div
      className='page-white'
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <MobilePlug />
      <div className='container widbody-container container-xlwidth '>
        <NavbarMainHome onlyLogo />

        <div className='tariffs'>
          <SelectRate redirect={redirect} isShowText={true} />
        </div>
      </div>
      <FooterNewVersion />
    </div>
  );
};

export default TariffsPage;
