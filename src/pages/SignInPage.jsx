import React, { useContext, useEffect } from 'react';
import SignInForm from '../containers/SignInForm';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../service/AuthContext';

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
    //setTimeout(handleNavigation, 300);
  }, [navigate, user]);

  return (
    <div className='signin-page'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
