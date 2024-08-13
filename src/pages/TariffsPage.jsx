import React, { useContext, useEffect } from 'react';
import './styles.css';
import NavbarMainHome from '../components/NavbarMainHome';
import LimitedFooter from '../components/LimitedFooter';
import { useNavigate, useLocation  } from 'react-router-dom';
import SelectRate from '../components/SelectRate';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config'

const TariffsPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const redirect = () => {
    if (!user) {
      navigate('/signup')
    } else {
      if (user?.is_onboarded) {
        !user.subscription_status ? navigate('/tariffs') : navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }
    
  };
  if (!user) {
    window.location.href = `${URL}/signup`
  };

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
    if (location.search) {
      checkIdQueryParam();
    }
  }, [location.search]);

  return (
    <div className='page-white'>
      <div className='container widbody-container container-xlwidth'>
        <NavbarMainHome onlyLogo />
        <div className='tariffs'>
          <SelectRate redirect={redirect} />
        </div>
        <LimitedFooter />
      </div>
    </div>
  );
};

export default TariffsPage;
