import React, { useContext } from 'react';
import './styles.css';
import NavbarMainHome from '../components/NavbarMainHome';
import LimitedFooter from '../components/LimitedFooter';
import { useNavigate } from 'react-router-dom';
import SelectRate from '../components/SelectRate';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config'

const TariffsPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
  }
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
