import React, { useContext, useEffect } from 'react';
import SignInForm from '../containers/SignInForm';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../service/AuthContext';
import { Helmet } from 'react-helmet';

const SignInPage = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    const handleNavigation = () => {
      if (!user) return;

      if (user?.subscription_status === 'expired') {
        navigate('/tariffs');
      } else if (user.is_onboarded) {
        navigate('/');
      } else {
        navigate('/');
      }
    };
    handleNavigation();
  }, [navigate, user]);

  return (
    <div className='signin-page'>
      <Helmet>
        <title>Вход в личный кабинет Radar Analytica — сервис аналитики маркетплейсов</title>
        <meta name="description" content="Личный кабинет Radar Analytica — сервис аналитики маркетплейсов. Вход в аккаунт Радар Аналитика" />
      </Helmet>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
